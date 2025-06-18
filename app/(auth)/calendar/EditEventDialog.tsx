import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { Event } from './CalendarPage'

interface EditEventDialogProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  selectedEvent: Event | null
  setSelectedEvent: (event: Event | null) => void
  setEvents: (events: Event[] | ((prevEvents: Event[]) => Event[])) => void
}

export default function EditEventDialog({
  isOpen,
  setIsOpen,
  selectedEvent,
  setSelectedEvent,
  setEvents,
}: EditEventDialogProps) {
  const handleEditEvent = () => {
    if (!selectedEvent?.title || !selectedEvent?.date) {
      toast.error('Please fill in the required fields (title and date)')
      return
    }

    setEvents(events => events.map(event => (event.id === selectedEvent.id ? selectedEvent : event)))
    toast.success(`${selectedEvent.title} has been updated successfully`)
    setIsOpen(false)
    setSelectedEvent(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <Button variant="outline" onClick={() => { setIsOpen(false); setSelectedEvent(null); }} className="flex-1">Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}