'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Search, User, Mail, FileText } from 'lucide-react';

const searchResults = [
  {
    id: 1,
    type: 'user',
    title: 'John Doe',
    description: 'john@example.com',
    icon: User,
  },
  {
    id: 2,
    type: 'message',
    title: 'Project Update',
    description: 'The project is on track...',
    icon: Mail,
  },
  {
    id: 3,
    type: 'document',
    title: 'Q1 Report',
    description: 'Financial summary for Q1 2025',
    icon: FileText,
  },
  {
    id: 4,
    type: 'user',
    title: 'Sarah Smith',
    description: 'sarah@example.com',
    icon: User,
  },
];

const filters = [
  { label: 'All', count: 50 },
  { label: 'Users', count: 20 },
  { label: 'Messages', count: 15 },
  { label: 'Documents', count: 15 },
];

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Search</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Find users, messages, and documents quickly.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Advanced Search
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Results
              </CardTitle>
              <div className="flex items-center gap-4 mt-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search anything..."
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
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <result.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {result.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {result.description}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">{result.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Recent Searches
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Saved Searches
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Clear History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}