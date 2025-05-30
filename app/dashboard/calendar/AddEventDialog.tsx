import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { Event } from './CalendarPage'
import { useState } from 'react'

interface AddEventDialogProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  setEvents: (events: Event[] | ((prevEvents: Event[]) => Event[])) => void
}

export default function AddEventDialog({ isOpen, setIsOpen, setEvents }: AddEventDialogProps) {
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

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      toast.error('Please fill in the required fields (title and date)')
      return
    }

    const event: Event = {
      ...newEvent,
      id: Date.now().toString(),
    }

    setEvents(prevEvents => [...prevEvents, event])
    toast.success(`${newEvent.title} has been scheduled successfully`)

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
    setIsOpen(false)
  }

    const handleClose = () => {
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
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Add New Event</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Event Title *</Label>
            <Input
              autoFocus
              id="title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              placeholder="Enter event title"
              className="mt-2"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              placeholder="Event description"
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
                required
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
                required
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
            <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}