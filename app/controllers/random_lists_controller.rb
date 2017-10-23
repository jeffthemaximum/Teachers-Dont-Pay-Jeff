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
    rs.picked = true
    rs.save!
    @random_list.reload
    render json: @random_list.to_json(:include => :random_students)
  end

  private

    def list_params
      params.permit(:randomListId)
    end


end