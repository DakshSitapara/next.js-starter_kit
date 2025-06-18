'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, Clock, MapPin, Users, Search } from 'lucide-react'
import { Event } from './CalendarPage'

interface SearchDialogProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  events: Event[]
  setSelectedEvent: (event: Event | null) => void
  setIsViewEventOpen: (isOpen: boolean) => void
}

export default function SearchDialog({
  isOpen,
  setIsOpen,
  events,
  setSelectedEvent,
  setIsViewEventOpen,
}: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

    const handleDialogChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setSearchQuery('')
      setDateFilter('')
      setTypeFilter('all')
    }
  }

  const filteredEvents = events.filter(event => {
    const matchesQuery =
      searchQuery === '' ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDate = dateFilter === '' || event.date === dateFilter
    const matchesType = typeFilter === 'all' || event.type === typeFilter
    return matchesQuery && matchesDate && matchesType
  })

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
  <Dialog open={isOpen} onOpenChange={handleDialogChange}>
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-center">Search Events</DialogTitle>
      </DialogHeader>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search by title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-full"
              autoFocus
              aria-label="Search events"
            />
          </div>

          {/* Date Filter */}
          <div className="sm:w-35 w-full">
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              placeholder="Filter by date"
              className="w-full"
            />
          </div>

          {/* Type Filter */}
          <div className="sm:w-30 w-full">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className=" w-full">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
                <SelectItem value="reminder">Reminder</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Events card */}
        <Card>
        <CardContent className={`${filteredEvents.length > 3 ? 'h-[250px] overflow-y-auto custom-scroll' : ' h-full overflow-y-auto custom-scroll'}`}>
            <div className="space-y-4">
              {filteredEvents.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                  No events match your search criteria.
                </p>
              )}
              {filteredEvents
                .sort(
                  (a, b) =>
                    new Date(a.date + ' ' + a.time).getTime() -
                    new Date(b.date + ' ' + b.time).getTime()
                )
                .map((event) => (
                  <div
                    key={event.id}
                    className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsViewEventOpen(true);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                          {event.title}
                        </h4>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex justify-items-center-safe gap-1">
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
                      <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DialogContent>
  </Dialog>
);
}