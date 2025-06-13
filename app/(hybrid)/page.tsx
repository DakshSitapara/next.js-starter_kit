'use client'

import { useState, useEffect } from "react";
import { AuthService } from "@/lib/useAuth";
import { ArrowRight, Github, Sparkles, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useAuthUser } from "@/hooks/useAuthUser";
import { useUserInitial } from "@/hooks/useUserInitial";

export default function Page() {

    const { user, isAuthenticated, loading } = useAuthUser();
    const { initial, avatarColor } = useUserInitial(user?.name, user?.email);

  return (
    <div className="items-center-safe dark:bg-black">
      {/* Top-right About Us button and if user is login than show avatar */}
      <div className="flex flex-col-1 gap-2 absolute top-4 right-4 z-50 mt-1">
        <div className="flex items-center gap-1">
          {loading ? (
              <div>Loading...</div>
            ) :isAuthenticated && user ? (
                    <div className="flex items-center gap-3">
                      <Link aria-label="user" href="/dashboard">
                        <Tooltip>
                          <TooltipTrigger asChild>
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${avatarColor}`}>
                                  {initial}
                              </div>
                          </TooltipTrigger>
                            <TooltipContent className="bg-transparent text-black dark:text-white">
                              <div className="flex flex-col items-start gap-1">
                                <p className="text-sm">{user.name}</p>
                                {/* <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    AuthService.logout();
                                    location.reload(); // or use router.replace("/")
                                  }}
                                >
                                  Logout
                                </Button> */}
                              </div>
                            </TooltipContent>
                        </Tooltip>                 
                      </Link>
                    </div>
                ) : (
                  <></>
                )}
        </div>
      </div>

      <section
        className="relative flex flex-col items-center justify-center py-53.5"
        aria-label="Nextjs Starter Kit Hero"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>
        </div>

        <div className="space-y-6 text-center max-w-4xl px-4">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-fit rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30 px-4 py-1 mb-6"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-blue-900 dark:text-blue-200">
              <Sparkles className="h-4 w-4" />
              <span>The Ultimate Next.js Starter Kit</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white animate-gradient-x pb-2"
          >
            Build Faster with <br className="hidden sm:block" />
            Next Starter
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-500 dark:text-gray-300 max-w-2xl mx-auto"
          >
            This is a Demo Next.js starter kit.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center items-center gap-4 pt-4"
          >
            <Link href="/login">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 h-12"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link
              href="https://github.com/DakshSitapara/next.js-starter_kit"
              target="_blank"
              className="flex items-center gap-2 rounded-full px-6 py-2 h-12 border-2 text-gray-300 bg-gray-950 hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors"
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5 bg-transparent" aria-label="GitHub icon" />
              <span>Star on GitHub</span>
            </Link>
            <Link href="/about-us">
            {/* <Tooltip>
              <TooltipTrigger asChild> */}
                <Button 
                  aria-label="About Us"
                  size="lg"
                  variant="default"
                  className="rounded-full px-6 h-12 border-2"
                >
                  <MessageCircleQuestion className="h-6 w-6" />
                      <span>About Us</span>
                </Button>
              {/* </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="p-2 rounded-lg bg-transparent text-black dark:text-white"
              >
                <p>About Us</p>
              </TooltipContent>
            </Tooltip> */}

            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
