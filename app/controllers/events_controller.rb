class EventsController < ApplicationController
  def create
    @event = create_event
    @event = create_event_datetime

    if @event.save
      render json: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end


  private

  def create_event
    # TODO error handling if title or text is missing
    title = params[:event][:title]
    text = params[:event][:description]
    event = Event.new(title: title, description: text)
  end

  def create_event_datetime
    # TODO error handling if these aren't nums
    year = params[:event][:year].to_i
    event_date = DateTime.new(year)
    @event.year = year
    month = params[:event][:month]
    if !month.blank?
      event_date.change({month: month.to_i})
      @event.month = month.to_i
    end

    day = params[:event][:day]
    if !day.blank?
      event_date.change({day: day.to_i})
      @event.day = day.to_i
    end

    hour = params[:event][:hour]
    if !hour.blank?
      event_date.change({hour: hour.to_i})
      @event.hour = hour.to_i
    end

    minute = params[:event][:minute]
    if !minute.blank?
      event_date.change({minute: minute.to_i})
      @event.minute = minute.to_i
    end
    
    @event.date = event_date
    return @event
  end
end
