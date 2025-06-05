
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { MessageCircleQuestion, Mail, Github, Twitter } from 'lucide-react';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our team and mission.',
};

const teamMembers = [
  {
    name: 'Daksh Sitapara',
    role: 'Lead Developer',
    bio: 'Daksh is passionate about building scalable web applications.',
  },
  {
    name: 'Abc Xyz',
    role: 'UI/UX Designer',
    bio: 'Abc crafts intuitive and beautiful user interfaces.',
  },
  {
    name: 'Xyz Abc',
    role: 'Product Manager',
    bio: 'Xyz ensures our product meets user needs.',
  },
];

export default function AboutUsPage() {

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">About Us</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Learn more about our app and the team behind it.
          </p>
      </div>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Get in Touch
            </Button>
          </HoverCardTrigger>
          <HoverCardContent side="right" className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Contact Us</h4>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <a
                  href="mailto:dakshsitapara6@gmail.com"
                  target="_blank"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  dakshsitapara6@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4 text-gray-500" />
                <a
                  href="http://github.com/DakshSitapara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  GitHub
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Twitter className="h-4 w-4 text-gray-500" />
                <a
                  href="https://x.com/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Twitter
                </a>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
    </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircleQuestion className="h-5 w-5" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            This app was built to demonstrate a modern dashboard interface using Next.js,
            React, and Tailwind CSS. It includes a collapsible sidebar, theming options,
            and modular components. Our goal is to provide a seamless and efficient user
            experience for managing tasks, messages, and settings.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Meet the Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {member.role}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}