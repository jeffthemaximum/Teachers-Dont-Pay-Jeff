class RandomStudentsController < ApplicationController

  def create
    rs = RandomStudent.create!({
      name: student_params['name'],
      random_list_id: student_params['randomListId']
    })
    @random_list = rs.random_list
    render json: @random_list.to_json(:include => :random_students)
  end

  private

  def student_params
    params.permit(:name, :randomListId)
  end
end
