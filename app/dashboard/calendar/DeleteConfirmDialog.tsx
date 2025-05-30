import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { Event } from './CalendarPage'

interface DeleteConfirmDialogProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  selectedEvent: Event | null
  setSelectedEvent: (event: Event | null) => void
  setEvents: (events: Event[] | ((prevEvents: Event[]) => Event[])) => void
  setIsViewEventOpen: (isOpen: boolean) => void
}

export default function DeleteConfirmDialog({
  isOpen,
  setIsOpen,
  selectedEvent,
  setSelectedEvent,
  setEvents,
  setIsViewEventOpen,
}: DeleteConfirmDialogProps) {
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events => events.filter(event => event.id !== selectedEvent.id))
      toast.success(`${selectedEvent.title} has been deleted successfully`)
      setIsOpen(false)
      setIsViewEventOpen(false)
      setSelectedEvent(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the event "{selectedEvent?.title}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          <Button
            variant="destructive"
            onClick={handleDeleteEvent}
            className="flex-1"
          >
            Delete
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setIsOpen(false)
              setIsViewEventOpen(true)
            }}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}