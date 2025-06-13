import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CalendarIcon, Clock, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { parse } from 'date-fns';
import { ErrorBoundary } from 'react-error-boundary';
import { Event } from './CalendarPage';

interface EventListProps {
  events: Event[];
  setIsViewEventOpen: (isOpen: boolean) => void;
  setSelectedEvent: (event: Event | null) => void;
}

export default function EventList({ events, setIsViewEventOpen, setSelectedEvent }: EventListProps) {
  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'deadline': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      case 'reminder': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'personal': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  return (
    <Card className="max-h-[70vh] flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">Upcoming Events</CardTitle>
      </CardHeader>
      <ErrorBoundary fallback={<p className="p-4 text-red-500">Error loading events</p>}>
        <CardContent className="flex-1 overflow-y-auto custom-scroll">
          <div className="space-y-4 mt-1">
            {events.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No upcoming events.</p>
            ) : (
              events
                .sort((a, b) =>
                  parse(`${a.date} ${a.time}`, 'yyyy-MM-dd HH:mm', new Date()).getTime() -
                  parse(`${b.date} ${b.time}`, 'yyyy-MM-dd HH:mm', new Date()).getTime()
                )
                .map(event => (
                  <div
                    key={event.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`View event: ${event.title}`}
                    className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-transform cursor-pointer hover:scale-105"
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsViewEventOpen(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedEvent(event);
                        setIsViewEventOpen(true);
                      }
                    }}
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
                      <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                    </div>
                  </div>
                ))
            )}
          </div>
        </CardContent>
      </ErrorBoundary>
    </Card>
  );
}