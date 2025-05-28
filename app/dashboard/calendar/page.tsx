import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarIcon, Plus, Clock } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Team Meeting",
    time: "09:00 AM",
    date: "Today",
    type: "meeting",
    attendees: 5
  },
  {
    id: 2,
    title: "Product Review",
    time: "02:00 PM",
    date: "Today",
    type: "review",
    attendees: 3
  },
  {
    id: 3,
    title: "Client Call",
    time: "11:00 AM",
    date: "Tomorrow",
    type: "call",
    attendees: 2
  },
  {
    id: 4,
    title: "Project Deadline",
    time: "All Day",
    date: "Mar 15",
    type: "deadline",
    attendees: 8
  },
]

const upcomingEvents = [
  { title: "Weekly Standup", time: "10:00 AM", type: "meeting" },
  { title: "Code Review", time: "03:00 PM", type: "review" },
  { title: "Client Presentation", time: "04:30 PM", type: "presentation" },
]

export default function Calendar() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600 mt-2">Manage your schedule and upcoming events.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Event
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                March 2024
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 2; // Offset for month start
                  const isCurrentMonth = day > 0 && day <= 31;
                  const isToday = day === 14;
                  const hasEvent = [5, 8, 14, 22, 28].includes(day);
                  
                  return (
                    <div
                      key={i}
                      className={`
                        h-10 flex items-center justify-center text-sm cursor-pointer rounded-md
                        ${isCurrentMonth ? 'text-gray-900 hover:bg-gray-100' : 'text-gray-300'}
                        ${isToday ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                        ${hasEvent && !isToday ? 'bg-blue-100 text-blue-600' : ''}
                      `}
                    >
                      {isCurrentMonth ? day : ''}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                      <p className="text-xs text-gray-500">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Schedule Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Block Time
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  View All Events
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <CalendarIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.date} at {event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">
                    {event.attendees} attendees
                  </Badge>
                  <Badge variant={
                    event.type === 'meeting' ? 'default' :
                    event.type === 'deadline' ? 'destructive' : 'secondary'
                  }>
                    {event.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}