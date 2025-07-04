'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import EventCalendar from './EventCalendar'
import EventList from './EventList'
import AddEventDialog from './AddEventDialog'
import EditEventDialog from './EditEventDialog'
import ViewEventDialog from './ViewEventDialog'
import DeleteConfirmDialog from './DeleteConfirmDialog'
import SearchDialog from './SearchDialog'
import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { AuthService } from '@/lib/useAuth'

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [isEditEventOpen, setIsEditEventOpen] = useState(false)
  const [isViewEventOpen, setIsViewEventOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')

  const [events, setEvents] = useState<Event[]>(() => {
  if (typeof window !== 'undefined') {
    const currentUser = localStorage.getItem('authUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      const storedEventsKey = `calendarEvents_${user.user}`;
      const storedEvents = localStorage.getItem(storedEventsKey);
      return storedEvents ? JSON.parse(storedEvents) : [];
    }
    return [];
  }
  return [];
});

useEffect(() => {
  const currentUser = localStorage.getItem('authUser');
  if (currentUser) {
    const user = JSON.parse(currentUser);
    const storedEventsKey = `calendarEvents_${user.user}`;
    localStorage.setItem(storedEventsKey, JSON.stringify(events));
  }
}, [events]);

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault()
      setIsSearchOpen(true)
    }
  }
  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [])

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!AuthService.isAuthenticated()) {
          router.replace('/login');
        } else {
          const userData = AuthService.getAuthUser();
          setUser(userData);
        }
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return  (
    <div className="space-y-6 custom-scroll">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">Calendar</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your schedule and upcoming events.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2 text-sm font-medium transition-colors duration-200 rounded-lg bg-gray-200 text-gray-400  tex font-sans"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Open event search"
          >
            <Search className="h-4 w-4" />
            Search Events
            <kbd className="ml-2 px-2 py-1 text-xs font-mono bg-white dark:bg-black text-gray-500 dark:text-gray-100 rounded-md">
              Ctrl+K
            </kbd>
          </Button>
          <Button
            onClick={() => {
              const today = new Date().toISOString().split("T")[0];
              setSelectedDate(today);
              setIsAddEventOpen(true);
            }}
            className="flex items-center gap-2 font-medium text-sm  transition-colors duration-200 font-sans"
            aria-label="Add new event"
          >
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </div>
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
            setSelectedDate={setSelectedDate}
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
        selectedDate={selectedDate}
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
      
      <SearchDialog
        isOpen={isSearchOpen}
        setIsOpen={setIsSearchOpen}
        events={events}
        setSelectedEvent={setSelectedEvent}
        setIsViewEventOpen={setIsViewEventOpen}
      />
    </div>
  )
}