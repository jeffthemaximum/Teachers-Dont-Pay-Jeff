class EventsController < ApplicationController

  skip_before_filter :verify_authenticity_token, :only => :destroy
  
  def create
    @event = create_event
    @event = create_event_datetime
    @event = connect_to_timeline
    @event = connect_to_document
    if @event.save
      render :json => @event.to_hash_with_documents
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def update
    @event = find_event
    @event = update_event
    @event = edit_event_datetime

    if @event.save
      render json: @event.to_hash_with_documents
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @event = find_event
    if @event.hide!
      render json: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end


  private

  def find_event
    event = Event.find(params[:id])
    if event.timeline.share_token == params[:event][:share_token]
      return event
    else
      return false
    end
  end

  def connect_to_timeline
    timeline_share_token = params[:event][:share_token]
    timeline = Timeline.find_by(share_token: timeline_share_token)
    @event.timeline = timeline
    return @event
  end

  def update_event
    title = params[:event][:title]
    description = params[:event][:description]
    @event.title = title
    @event.description = description
    return @event
  end

  def create_event
    # TODO error handling if title or text is missing
    title = params[:event][:title]
    text = params[:event][:description]
    event = Event.new(title: title, description: text)
  end

  def edit_event_datetime
    year = params[:event][:year].to_i
    event_date = DateTime.new(year)
    @event.year = year
    month = params[:event][:month]

    if adding(:month) || editing(:month)
      event_date = event_date.change({month: month.to_i})
      @event.month = month.to_i
    elsif removing(:month)
      @event.month = nil
    end

    day = params[:event][:day]
    if adding(:day) || editing(:day)
      event_date = event_date.change({day: day.to_i})
      @event.day = day.to_i
    elsif removing(:day)
      @event.day = nil
    end

    hour = params[:event][:hour]
    if adding(:hour) || editing(:hour)
      event_date = event_date.change({hour: hour.to_i})
      @event.hour = hour.to_i
    elsif removing(:hour)
      @event.hour = nil
    end

    minute = params[:event][:minute]
    if adding(:minute) || editing(:minute)
      event_date = event_date.change({minute: minute.to_i})
      @event.minute = minute.to_i
    elsif removing(:minute)
      @event.minute = nil
    end

    @event.date = event_date
    return @event

  end

  def connect_to_document
    documents_params = params[:event][:documents]
    if !documents_params.blank?
      documents_ids = documents_params.map{|d| d["id"]}
      documents_ids.each do |d_id|
        document = Document.find(d_id)
        @event.documents << document
      end
    end
    return @event
  end

  def adding(time)
    @event.send(time).blank? && !params[:event][time].blank?
  end

  def editing(time)
    !@event.send(time).blank? && !params[:event][time].blank?
  end

  def removing(time)
    !@event.send(time).blank? && params[:event][time].blank?
  end

  def create_event_datetime
    # TODO error handling if these aren't nums
    year = params[:event][:year].to_i
    event_date = DateTime.new(year)
    @event.year = year
    month = params[:event][:month]
    if !month.blank?
      event_date = event_date.change({month: month.to_i})
      @event.month = month.to_i
    end

    day = params[:event][:day]
    if !day.blank?
      event_date = event_date.change({day: day.to_i})
      @event.day = day.to_i
    end

    hour = params[:event][:hour]
    if !hour.blank?
      event_date = event_date.change({hour: hour.to_i})
      @event.hour = hour.to_i
    end

    minute = params[:event][:minute]
    if !minute.blank?
      event_date = event_date.change({minute: minute.to_i})
      @event.minute = minute.to_i
    end
    
    @event.date = event_date
    return @event
  end
end
