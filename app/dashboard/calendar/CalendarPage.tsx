'use client'

import { useState, useEffect } from 'react'
import EventCalendar from './EventCalendar'
import EventList from './EventList'
import AddEventDialog from './AddEventDialog'
import EditEventDialog from './EditEventDialog'
import ViewEventDialog from './ViewEventDialog'
import DeleteConfirmDialog from './DeleteConfirmDialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  duration: string
  location: string
  attendees: number
  type: 'meeting' | 'deadline' | 'reminder' | 'personal'
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [isEditEventOpen, setIsEditEventOpen] = useState(false)
  const [isViewEventOpen, setIsViewEventOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const [events, setEvents] = useState<Event[]>(() => {
    if (typeof window !== 'undefined') {
      const savedEvents = localStorage.getItem('calendarEvents')
      return savedEvents ? JSON.parse(savedEvents) : []
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events))
  }, [events])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">Calendar</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your schedule and upcoming events.</p>
        </div>
        <Button onClick={() => setIsAddEventOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EventCalendar
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            events={events}
            setIsAddEventOpen={setIsAddEventOpen}
            setIsViewEventOpen={setIsViewEventOpen}
            setSelectedEvent={setSelectedEvent}
          />
        </div>
        <div>
          <EventList
            events={events}
            setIsViewEventOpen={setIsViewEventOpen}
            setSelectedEvent={setSelectedEvent}
          />
        </div>
      </div>

      <AddEventDialog
        isOpen={isAddEventOpen}
        setIsOpen={setIsAddEventOpen}
        setEvents={setEvents}
      />
      
      <EditEventDialog
        isOpen={isEditEventOpen}
        setIsOpen={setIsEditEventOpen}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        setEvents={setEvents}
      />
      
      <ViewEventDialog
        isOpen={isViewEventOpen}
        setIsOpen={setIsViewEventOpen}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        setIsEditEventOpen={setIsEditEventOpen}
        setIsDeleteConfirmOpen={setIsDeleteConfirmOpen}
      />
      
      <DeleteConfirmDialog
        isOpen={isDeleteConfirmOpen}
        setIsOpen={setIsDeleteConfirmOpen}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        setEvents={setEvents}
        setIsViewEventOpen={setIsViewEventOpen}
      />
    </div>
  )
}