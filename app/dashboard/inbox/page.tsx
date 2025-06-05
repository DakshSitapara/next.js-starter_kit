
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Mail, Search, Plus, Star, Trash, CheckCircle, XCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inbox',
  description: 'Manage your messages and stay updated.',
};

const messages = [
  {
    id: 1,
    sender: 'john@example.com',
    subject: 'Team Meeting Notes',
    preview: 'Here are the notes from our last team meeting...',
    time: '10:30 AM',
    date: 'Today',
    status: 'unread',
    important: true,
  },
  {
    id: 2,
    sender: 'sarah@example.com',
    subject: 'Project Update',
    preview: 'The project is on track for the deadline...',
    time: '9:15 AM',
    date: 'Today',
    status: 'read',
    important: false,
  },
  {
    id: 3,
    sender: 'client@company.com',
    subject: 'Feedback on Proposal',
    preview: 'Thank you for the proposal, here’s our feedback...',
    time: 'Yesterday',
    date: 'Yesterday',
    status: 'unread',
    important: true,
  },
  {
    id: 4,
    sender: 'support@vendor.com',
    subject: 'Invoice #1234',
    preview: 'Your invoice is ready for payment...',
    time: 'Mar 14',
    date: 'Mar 14',
    status: 'read',
    important: false,
  },
];

const filters = [
  { label: 'All', count: 24 },
  { label: 'Unread', count: 8 },
  { label: 'Important', count: 5 },
];

export default function InboxPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Inbox</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your messages and stay updated.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Compose
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Messages
              </CardTitle>
              <div className="flex items-center gap-4 mt-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-10 bg-transparent border-gray-300 dark:border-gray-600"
                  />
                </div>
                <div className="flex gap-2">
                  {filters.map((filter) => (
                    <Badge key={filter.label} variant="secondary" className="px-3 py-1">
                      {filter.label} ({filter.count})
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${
                      message.status === 'unread' ? 'font-medium bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-900 dark:text-white">
                            {message.sender}
                          </span>
                          {message.important && (
                            <Star className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {message.subject}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {message.preview}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {message.date === 'Today' || message.date === 'Yesterday'
                          ? message.date
                          : message.time}
                      </span>
                      <Badge
                        variant={message.status === 'unread' ? 'default' : 'secondary'}
                      >
                        {message.status}
                      </Badge>
                      <Button variant="ghost" size="icon" title="Mark as Read">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Mark All as Read
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Archive Selected
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  View Sent Messages
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}