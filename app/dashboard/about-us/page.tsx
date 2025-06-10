import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { MessageCircleQuestion, Mail, Github, Twitter } from 'lucide-react';
import type { Metadata } from 'next';

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            About Us
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
            Learn more about our app and the team behind it.
          </p>
        </div>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Get in Touch
            </Button>
          </HoverCardTrigger>
          <HoverCardContent
            side="right"
            className="w-80 bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-5 transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700"
          >
            <div className="space-y-4">
              <h4 className="text-base font-bold text-gray-900 dark:text-white">
                Contact Us
              </h4>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <a
                  href="mailto:dakshsitapara6@gmail.com"
                  target="_blank"
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200"
                >
                  dakshsitapara6@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Github className="h-5 w-5 text-gray-500" />
                <a
                  href="http://github.com/DakshSitapara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200"
                >
                  GitHub
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Twitter className="h-5 w-5 text-gray-500" />
                <a
                  href="https://x.com/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200"
                >
                  Twitter
                </a>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-semibold text-gray-900 dark:text-white">
            <MessageCircleQuestion className="h-6 w-6 text-blue-500" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            This app was built to demonstrate a modern dashboard interface using Next.js,
            React, and Tailwind CSS. It includes a collapsible sidebar, theming options,
            and modular components. Our goal is to provide a seamless and efficient user
            experience for managing tasks, messages, and settings.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
            Meet the Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="p-5 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
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