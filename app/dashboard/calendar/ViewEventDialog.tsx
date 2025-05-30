import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Edit, Trash } from 'lucide-react'
import { Event } from './CalendarPage'

interface ViewEventDialogProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  selectedEvent: Event | null
  setSelectedEvent: (event: Event | null) => void
  setIsEditEventOpen: (isOpen: boolean) => void
  setIsDeleteConfirmOpen: (isOpen: boolean) => void
}

export default function ViewEventDialog({
  isOpen,
  setIsOpen,
  selectedEvent,
  setSelectedEvent,
  setIsEditEventOpen,
  setIsDeleteConfirmOpen,
}: ViewEventDialogProps) {
  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800'
      case 'deadline': return 'bg-red-100 text-red-800'
      case 'reminder': return 'bg-yellow-100 text-yellow-800'
      case 'personal': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
              onClick={() => {
                setIsOpen(false)
                setIsEditEventOpen(true)
              }}
              className="flex-1"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setIsOpen(false)
                setIsDeleteConfirmOpen(true)
              }}
              className="flex-1"
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}