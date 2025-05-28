'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Plus, Clock } from "lucide-react";

const events = [
  { id: 1, title: "Team Meeting", time: "09:00 AM", date: "2025-05-05", type: "meeting", attendees: 5 },
  { id: 2, title: "Product Review", time: "02:00 PM", date: "2025-05-08", type: "review", attendees: 3 },
  { id: 3, title: "Client Call", time: "11:00 AM", date: "2025-05-14", type: "call", attendees: 2 },
  { id: 4, title: "Project Deadline", time: "All Day", date: "2025-05-28", type: "deadline", attendees: 8 },
];

const upcomingEvents = [
  { title: "Weekly Standup", time: "10:00 AM", type: "meeting" },
  { title: "Code Review", time: "03:00 PM", type: "review" },
  { title: "Client Presentation", time: "04:30 PM", type: "presentation" },
];

export default function Calendar() {
  const now = new Date();
  const year = 2025;
  const month = 4; 
  const today = new Date();

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  const startDay = startDate.getDay(); 

  const daysInMonth = endDate.getDate();
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - startDay + 1;
    if (day > 0 && day <= daysInMonth) {
      return new Date(year, month, day);
    }
    return null;
  });

  const getDateString = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  const eventDates = events.map((e) => e.date);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Calendar</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your schedule and upcoming events.</p>
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
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <CalendarIcon className="h-5 w-5" />
                May 2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((date, i) => {
                  const isToday =
                    date &&
                    today.getDate() === date.getDate() &&
                    today.getMonth() === date.getMonth() &&
                    today.getFullYear() === date.getFullYear();

                  const hasEvent = date && eventDates.includes(getDateString(date));

                  return (
                    <div
                      key={i}
                      className={`h-10 flex items-center justify-center text-sm rounded-md cursor-pointer
                        ${date ? 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700' : 'text-gray-300 dark:text-gray-600'}
                        ${isToday ? 'bg-blue-600 dark:bg-blue-500 text-white' : ''}
                        ${hasEvent && !isToday ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : ''}
                      `}
                    >
                      {date ? date.getDate() : ''}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Clock className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">{event.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600">
                  Schedule Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600">
                  Block Time
                </Button>
                <Button variant="outline" className="w-full justify-start text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600">
                  View All Events
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{event.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {event.date} at {event.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    {event.attendees} attendees
                  </Badge>
                  <Badge
                    variant={
                      event.type === 'meeting' ? 'default' :
                      event.type === 'deadline' ? 'destructive' : 'secondary'
                    }
                    className={`
                      ${event.type === 'meeting' ? 'bg-blue-600 dark:bg-blue-500 text-white' : ''}
                      ${event.type === 'deadline' ? 'bg-red-600 dark:bg-red-500 text-white' : ''}
                      ${event.type !== 'meeting' && event.type !== 'deadline' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100' : ''}
                    `}
                  >
                    {event.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
