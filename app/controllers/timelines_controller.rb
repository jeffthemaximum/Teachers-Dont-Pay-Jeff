class TimelinesController < ApplicationController
  before_action :no_container

  def new
    session.delete(:timeline_share_token)
    redirect_to timeline_path
  end

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

  def update
    @timeline = Timeline.find params[:id]
    if @timeline
      @timeline.title = params[:timeline_title]
      if @timeline.save
        render json: @timeline
      else
        render json: @timeline.errors, status: :unprocessable_entity
      end
    else
      render json: "not found", status: :unprocessable_entity
    end
  end
    
end
