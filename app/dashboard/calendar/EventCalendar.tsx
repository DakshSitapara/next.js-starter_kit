import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Event } from './CalendarPage'

interface EventCalendarProps {
  currentDate: Date
  setCurrentDate: (date: Date) => void
  events: Event[]
  setIsAddEventOpen: (isOpen: boolean) => void
  setIsViewEventOpen: (isOpen: boolean) => void
  setSelectedEvent: (event: Event | null) => void
}

const getEventTypeColor = (type: Event['type']) => {
  switch (type) {
    case 'meeting': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
    case 'deadline': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
    case 'reminder': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
    case 'personal': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
  }
}

export default function EventCalendar({
  currentDate,
  setCurrentDate,
  events,
  setIsAddEventOpen,
  setIsViewEventOpen,
  setSelectedEvent,
}: EventCalendarProps) {
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

  const formatDateForInput = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
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

  const days = getDaysInMonth(currentDate)
  const today = new Date()
  const todayString = formatDateForInput(today.getFullYear(), today.getMonth(), today.getDate())

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          <div className="flex gap-1">
            <Button className='rounded-full' variant="outline" size="sm" onClick={handlePreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button className='rounded-full' variant="outline" size="sm" onClick={handleNextMonth}>
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
                  setIsAddEventOpen(true)
                }}
              >
                <div className={`text-sm font-medium ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}`}>
                  {day}
                </div>
                <div className="mt-1 max-h-15 overflow-y-auto space-y-1 pr-1 custom-scroll">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      title={event.title}
                      className={`text-[10px] px-1 py-0.5 rounded cursor-pointer truncate hover:scale-105 transition-all ${getEventTypeColor(event.type)}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedEvent(event)
                        setIsViewEventOpen(true)
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}