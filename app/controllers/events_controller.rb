class EventsController < ApplicationController

  def show
    @event = Event.find(params[:id])
    # @venue = Venue.find_or_create_by_event(@event)
    @artist = @event.artists.first
    @groups = @event.groups
  end

  def create
    @event = Event.find_by(event_id: event_params[:event_id]) || Event.create(event_params)
    if @event
      render partial: "groups/form", locals: {event: @event, group: Group.new }
    else
      flash["notice"] = "error occurred"
    end

  end

  def index
    @songkick = Songkick.new
    @events = Event.paginate(page: params[:page], per_page: 15).where('start >= ?',Time.now).order('start ASC')

    if request.xhr?
      render @events
    end

  end

  def has_groups
    events = []
    Group.find_each {|group| events << group.event }
    render json: events
  end

  def paginate_events
    binding.pry
  end

  private

  def event_params
    params.require(:show).permit(:title, :url, :venue, :event_id, :city, :latitude, :longitude, :time, :date)
  end

end
