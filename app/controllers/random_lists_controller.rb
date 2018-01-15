class RandomListsController < ApplicationController

  def index

    # check signed in
    if !user_signed_in?
      return redirect_to user_session_path
    end

    # find current user
    u = current_user

    # get or create random list
    if u.random_lists.any?
      @random_list = u.random_lists.last
    else
      @random_list = RandomList.create!( user: u )
    end

  end

  def pick
    @random_list = RandomList.find(list_params['randomListId'])
    rs = @random_list.random_students.where({picked: false}).shuffle.first
    rs.pick!
    @random_list.order.push(rs.id)
    @random_list.save!
    render json: @random_list.to_json(:include => :random_students)
  end

  def undo
    @random_list = RandomList.find(list_params['randomListId'])
    if @random_list.order.empty? || no_picked
      @random_list.unpick_all!
    else
      last_picked_id = @random_list.order.pop
      last_picked_student = RandomStudent.find(last_picked_id)
      last_picked_student.unpick!
      @random_list.save!
    end

    render json: @random_list.to_json(:include => :random_students)
  end

  def redo
    @random_list = RandomList.find(list_params['randomListId'])
    unless @random_list.order.empty? || no_picked || no_unpicked
      # find student where picked:false and picked_at -> last
      rs = @random_list.random_students.where({picked: false}).where.not(unpicked_at: nil).order('unpicked_at DESC').first
      # pick them
      rs.pick!
      @random_list.order.push(rs.id)
      @random_list.save!
    end
    render json: @random_list.to_json(:include => :random_students)
  end

  private

    def no_picked
      !@random_list.random_students.where({picked: false}).any?
    end

    def no_unpicked
      !@random_list.random_students.where({picked: false}).where.not(unpicked_at: nil).any?
    end

    def list_params
      params.permit(:randomListId)
    end

end