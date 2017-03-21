class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception,
                       if: proc { request.headers["X-Auth"] != "tutorial_secret" }

  def try_to_link_timeline_to_user(timeline)
    # return if user not signed in 
    return unless current_user
    # check if user is already associated with timeline
    return if current_user.user_timeline_relationships.where(timeline_id: timeline.id).exists?
    current_user.user_timeline_relationships.create!(timeline: timeline)
  end
end
