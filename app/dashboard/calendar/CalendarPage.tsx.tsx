'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Calendar as CalendarIcon, Clock, MapPin, Users, Plus, ChevronLeft, ChevronRight, Edit, Trash } from 'lucide-react'
import { toast } from 'sonner'

interface Event {
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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

const [events, setEvents] = useState<Event[]>(() => {
  if (typeof window !== 'undefined') {
    const savedEvents = localStorage.getItem('calendarEvents');
    return savedEvents ? JSON.parse(savedEvents) : [];
  }
  return [];
});


  const [newEvent, setNewEvent] = useState<Event>({
    id: '',
    title: '',
    description: '',
    date: '',
    time: '09:00',
    duration: '1 hour',
    location: '',
    attendees: 1,
    type: 'meeting',
  })

  // Save events to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events))
  }, [events])

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (number | null)[] = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    return days
  }

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date)
  }

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      toast({
        title: 'Error',
        description: 'Please fill in the required fields (title and date)',
        variant: 'destructive',
      })
      return
    }

    const event: Event = {
      ...newEvent,
      id: Date.now().toString(),
    }

    setEvents([...events, event])
    toast({
      title: 'Event Added',
      description: `${newEvent.title} has been scheduled successfully`,
    })

    setNewEvent({
      id: '',
      title: '',
      description: '',
      date: '',
      time: '09:00',
      duration: '1 hour',
      location: '',
      attendees: 1,
      type: 'meeting',
    })
    setIsAddEventOpen(false)
  }

  const handleEditEvent = () => {
    if (!selectedEvent?.title || !selectedEvent?.date) {
      toast({
        title: 'Error',
        description: 'Please fill in the required fields (title and date)',
        variant: 'destructive',
      })
      return
    }

    setEvents(events.map(event => (event.id === selectedEvent.id ? selectedEvent : event)))
    toast({
      title: 'Event Updated',
      description: `${selectedEvent.title} has been updated successfully`,
    })
    setIsEditEventOpen(false)
    setSelectedEvent(null)
  }

  const handleDeleteEvent = (id: string) => {
    const eventToDelete = events.find(event => event.id === id)
    setEvents(events.filter(event => event.id !== id))
    toast({
      title: 'Event Deleted',
      description: `${eventToDelete?.title} has been deleted successfully`,
    })
    setIsViewEventOpen(false)
    setSelectedEvent(null)
  }

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event)
    setIsViewEventOpen(true)
  }

  const handleEditFromView = (event: Event) => {
    setSelectedEvent(event)
    setIsViewEventOpen(false)
    setIsEditEventOpen(true)
  }

  const formatDateForInput = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800'
      case 'deadline': return 'bg-red-100 text-red-800'
      case 'reminder': return 'bg-yellow-100 text-yellow-800'
      case 'personal': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const days = getDaysInMonth(currentDate)
  const today = new Date()
  const todayString = formatDateForInput(today.getFullYear(), today.getMonth(), today.getDate())

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            {/* <CalendarIcon className="h-8 w-8 text-blue-600" /> */}
            Calendar
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your schedule and upcoming events.</p>
        </div>

        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">Add New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Enter event title"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Event description"
                  rows={2}
                  className="mt-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Select value={newEvent.duration} onValueChange={(value) => setNewEvent({ ...newEvent, duration: value })}>
                    <SelectTrigger className="mt-2 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30 minutes">30 minutes</SelectItem>
                      <SelectItem value="1 hour">1 hour</SelectItem>
                      <SelectItem value="1.5 hours">1.5 hours</SelectItem>
                      <SelectItem value="2 hours">2 hours</SelectItem>
                      <SelectItem value="3 hours">3 hours</SelectItem>
                      <SelectItem value="All day">All day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={newEvent.type} onValueChange={(value: Event['type']) => setNewEvent({ ...newEvent, type: value })}>
                    <SelectTrigger className="mt-2 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="deadline">Deadline</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder="Event location"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="attendees">Number of Attendees</Label>
                <Input
                  id="attendees"
                  type="number"
                  min="1"
                  value={newEvent.attendees}
                  onChange={(e) => setNewEvent({ ...newEvent, attendees: parseInt(e.target.value) || 1 })}
                  className="mt-2"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddEvent} className="flex-1">Add Event</Button>
                <Button variant="outline" onClick={() => setIsAddEventOpen(false)} className="flex-1">Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Event Dialog */}
      <Dialog open={isEditEventOpen} onOpenChange={setIsEditEventOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Edit Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Event Title *</Label>
              <Input
                id="edit-title"
                value={selectedEvent?.title || ''}
                onChange={(e) => setSelectedEvent({ ...selectedEvent!, title: e.target.value })}
                placeholder="Enter event title"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={selectedEvent?.description || ''}
                onChange={(e) => setSelectedEvent({ ...selectedEvent!, description: e.target.value })}
                placeholder="Event description"
                rows={2}
                className="mt-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="edit-date">Date *</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={selectedEvent?.date || ''}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent!, date: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="edit-time">Time</Label>
                <Input
                  id="edit-time"
                  type="time"
                  value={selectedEvent?.time || ''}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent!, time: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="edit-duration">Duration</Label>
                <Select
                  value={selectedEvent?.duration || ''}
                  onValueChange={(value) => setSelectedEvent({ ...selectedEvent!, duration: value })}
                >
                  <SelectTrigger className="mt-2 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 minutes">30 minutes</SelectItem>
                    <SelectItem value="1 hour">1 hour</SelectItem>
                    <SelectItem value="1.5 hours">1.5 hours</SelectItem>
                    <SelectItem value="2 hours">2 hours</SelectItem>
                    <SelectItem value="3 hours">3 hours</SelectItem>
                    <SelectItem value="All day">All day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-type">Type</Label>
                <Select
                  value={selectedEvent?.type || ''}
                  onValueChange={(value: Event['type']) => setSelectedEvent({ ...selectedEvent!, type: value })}
                >
                  <SelectTrigger className="mt-2 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="reminder">Reminder</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={selectedEvent?.location || ''}
                onChange={(e) => setSelectedEvent({ ...selectedEvent!, location: e.target.value })}
                placeholder="Event location"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="edit-attendees">Number of Attendees</Label>
              <Input
                id="edit-attendees"
                type="number"
                min="1"
                value={selectedEvent?.attendees || 1}
                onChange={(e) => setSelectedEvent({ ...selectedEvent!, attendees: parseInt(e.target.value) || 1 })}
                className="mt-2"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleEditEvent} className="flex-1">Save Changes</Button>
              <Button variant="outline" onClick={() => { setIsEditEventOpen(false); setSelectedEvent(null); }} className="flex-1">Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Event Dialog */}
      <Dialog open={isViewEventOpen} onOpenChange={setIsViewEventOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Description</Label>
              <p className="mt-2 text-gray-600">{selectedEvent?.description || 'No description'}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Date</Label>
                <p className="mt-2 text-gray-600">{selectedEvent?.date}</p>
              </div>
              <div>
                <Label>Time</Label>
                <p className="mt-2 text-gray-600">{selectedEvent?.time}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Duration</Label>
                <p className="mt-2 text-gray-600">{selectedEvent?.duration}</p>
              </div>
              <div>
                <Label>Type</Label>
                <Badge className={`mt-2 ${getEventTypeColor(selectedEvent?.type || 'meeting')}`}>
                  {selectedEvent?.type}
                </Badge>
              </div>
            </div>
            <div>
              <Label>Location</Label>
              <p className="mt-2 text-gray-600">{selectedEvent?.location || 'No location'}</p>
            </div>
            <div>
              <Label>Attendees</Label>
              <p className="mt-2 text-gray-600">{selectedEvent?.attendees} {selectedEvent?.attendees === 1 ? 'attendee' : 'attendees'}</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleEditFromView(selectedEvent!)}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteEvent(selectedEvent!.id)}
                className="flex-1"
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleNextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  if (day === null) {
                    return <div key={index} className="p-2 h-24"></div>
                  }

                  const dateString = formatDateForInput(currentDate.getFullYear(), currentDate.getMonth(), day)
                  const dayEvents = getEventsForDate(dateString)
                  const isToday = dateString === todayString

                  return (
                    <div
                      key={index}
                      className={`p-2 h-24 border rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                        isToday ? 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700' : 'border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => {
                        setNewEvent({ ...newEvent, date: dateString })
                        setIsAddEventOpen(true)
                      }}
                    >
                      <div className={`text-sm font-medium ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}`}>
                        {day}
                      </div>
                      <div className="mt-1 space-y-1">
                        {dayEvents.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className="text-xs p-1 rounded truncate bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleViewEvent(event)
                            }}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No upcoming events.</p>
                )}
                {events
                  .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())
                  .slice(0, 5)
                  .map(event => (
                    <div
                      key={event.id}
                      className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      onClick={() => handleViewEvent(event)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">{event.title}</h4>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3" />
                              {event.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {event.time}
                            </span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </div>
                          )}
                          {event.attendees > 1 && (
                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                              <Users className="h-3 w-3" />
                              {event.attendees} attendees
                            </div>
                          )}
                        </div>
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}