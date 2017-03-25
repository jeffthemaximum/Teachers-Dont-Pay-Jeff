class TimelinesController < ApplicationController
  before_action :no_container

  def show
    @timeline = Timeline.find_by(share_token: params[:share_token])
    @sharing = true
    if @timeline
      render 'pages/timeline'
    else
      redirect_to timeline_path
    end
  end

  def edit
    @timeline = Timeline.find_by(edit_token: params[:edit_token])
    @editing = true
    if @timeline
      render 'pages/timeline'
    else
      redirect_to timeline_path
    end
  end
    
end
