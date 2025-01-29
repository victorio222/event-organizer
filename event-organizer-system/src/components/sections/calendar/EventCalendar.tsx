import React, { useState, useCallback } from 'react'
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import EventModal from './EventModal'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface Event {
  id: number
  title: string
  start: Date
  end: Date
}

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      console.log('Selected slot:', { start, end })
      setSelectedEvent({ id: 0, title: '', start, end })
      setIsModalOpen(true)
    },
    []
  )

  const handleSelectEvent = useCallback((event: Event) => {
    console.log('Selected event:', event)
    setSelectedEvent(event)
    setIsModalOpen(true)
  }, [])

  const handleSaveEvent = useCallback((event: Event) => {
    if (event.id === 0) {
      const newEvent = { ...event, id: Date.now() }
      console.log('Saving new event:', newEvent)
      setEvents((prevEvents) => [...prevEvents, newEvent])
    } else {
      console.log('Updating event:', event)
      setEvents((prevEvents) =>
        prevEvents.map((e) => (e.id === event.id ? event : e))
      )
    }
    setIsModalOpen(false)
  }, [])

  const handleDeleteEvent = useCallback((eventId: number) => {
    console.log('Deleting event:', eventId)
    setEvents((prevEvents) => prevEvents.filter((e) => e.id !== eventId))
    setIsModalOpen(false)
  }, [])

  return (
    <div className="h-screen p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Event Organizer Calendar</h1>
      <div className="flex-grow">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          selectable
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          defaultView={Views.MONTH}
          toolbar={true}
        />
      </div>
      {isModalOpen && (
        <EventModal
          event={selectedEvent}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

export default Calendar

