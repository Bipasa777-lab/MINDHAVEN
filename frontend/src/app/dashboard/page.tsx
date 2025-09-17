'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const statsData = [
  { 
    title: 'Mood Check-ins', 
    value: '7 Days', 
    subtitle: 'Current Streak', 
    bgGradient: 'from-blue-400 to-blue-600', 
    type: 'mood'
  },
  { 
    title: 'Resource Use', 
    value: '10', 
    subtitle: 'This Month', 
    bgGradient: 'from-indigo-400 to-indigo-600', 
    type: 'resources'
  },
  { 
    title: 'Next Appointment', 
    value: 'Sep 17', 
    subtitle: '10:00 am', 
    bgGradient: 'from-purple-400 to-purple-600', 
    type: 'appointment'
  },
];

const actionCards = [
  {
    title: 'Start AI Chat',
    href: '/dashboard/ai-chart-support',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-2 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 14h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: 'Take Screening',
    href: '/dashboard/mental-screening',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M12 4v16" />
      </svg>
    ),
  },
  {
    title: 'Book Counselor',
    href: '/dashboard/book-appointment',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
];

// Dummy data
const recentChats = [
  { id: 1, text: "I feel anxious before exams", date: "Sep 12, 10:00 AM" },
  { id: 2, text: "I want tips for better sleep", date: "Sep 13, 9:00 PM" },
  { id: 3, text: "How to manage stress?", date: "Sep 14, 8:30 PM" },
];

// Added links here 👇
const recentVideos = [
  { id: 1, title: "Mindfulness Meditation Guide", watchedOn: "Sep 10", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { id: 2, title: "Coping with Anxiety", watchedOn: "Sep 11", link: "https://www.youtube.com/watch?v=abcd1234" },
  { id: 3, title: "Gratitude Practice", watchedOn: "Sep 13", link: "https://www.youtube.com/watch?v=wxyz5678" },
];

const appointment = {
  next: { date: "Sep 17", time: "10:00 AM", counselor: "Dr. Rahul Mehta" },
  meetLink: "https://meet.google.com/xyz-dummy-link", // Dummy Google Meet link
};

export default function DashboardPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (type: string) => {
    setExpanded(expanded === type ? null : type); // toggle only one section
  };

  return (
    <main className="bg-gradient-to-br from-[#a3d2ff] via-[#d4eaff] to-[#ffffff] min-h-screen w-full scroll-smooth">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white/40 backdrop-blur-md flex items-center px-6 z-30 shadow-md">
        <img src="/min.svg" alt="Mind Heaven Logo" className="w-16 h-16 rounded-full" />
        <span className="ml-3 font-bold text-2xl text-black">Mind Haven</span>
      </header>

      {/* Page Content */}
      <div className="pt-28 px-6 md:px-8 flex flex-col items-center">
        {/* Welcome Section */}
        <motion.header
          className="text-3xl md:text-4xl font-bold text-black mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Mind Haven
        </motion.header>

        <motion.p
          className="text-lg md:text-xl text-gray-800 mb-10 text-center max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Explore your mental health journey with AI-powered insights and support.
        </motion.p>

        {/* Stats Section */}
        <section className="flex flex-col gap-6 w-full max-w-3xl">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card 
                className={`w-full bg-gradient-to-r ${stat.bgGradient} rounded-xl border-none shadow-xl cursor-pointer`}
                onClick={() => toggleExpand(stat.type)}
              >
                <CardContent className="p-6 flex flex-col justify-center">
                  <div className="text-white text-lg font-medium">
                    {stat.title}
                    <br />
                    <span className="text-3xl font-bold">{stat.value}</span>
                  </div>
                  <div className="text-white text-sm font-normal mt-1">{stat.subtitle}</div>
                </CardContent>
              </Card>

              {/* Expandable content */}
              {expanded === stat.type && stat.type === "mood" && (
                <div className="mt-2 bg-white shadow-md rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Recent Chats</h3>
                  <ul className="space-y-2">
                    {recentChats.map((chat) => (
                      <li key={chat.id} className="text-sm text-gray-700 border-b pb-1">
                        <span className="font-medium">{chat.text}</span>
                        <div className="text-xs text-gray-500">{chat.date}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {expanded === stat.type && stat.type === "resources" && (
                <div className="mt-2 bg-white shadow-md rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Recently Watched Videos</h3>
                  <ul className="space-y-2">
                    {recentVideos.map((video) => (
                      <li key={video.id} className="text-sm text-gray-700 border-b pb-1">
                        <a 
                          href={video.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {video.title}
                        </a>
                        <span className="text-xs text-gray-500 ml-2">(Watched on {video.watchedOn})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {expanded === stat.type && stat.type === "appointment" && (
                <div className="mt-2 bg-white shadow-md rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Next Appointment</h3>
                  <div className="text-sm text-gray-700 mb-4">
                    <b>Date:</b> {appointment.next.date}, {appointment.next.time} with {appointment.next.counselor}
                  </div>
                  <Button 
                    asChild 
                    className="bg-green-600 hover:bg-green-700 text-white w-full"
                  >
                    <a href={appointment.meetLink} target="_blank" rel="noopener noreferrer">
                      Join Counseling (Google Meet)
                    </a>
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </section>

        {/* Action Cards */}
        <section className="flex flex-wrap justify-center gap-6 mt-8 w-full max-w-3xl">
          {actionCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              whileHover={{ scale: 1.08 }}
            >
              <Link href={card.href} className="flex-1 min-w-[150px] max-w-[180px]">
                <Card
                  className="h-32 bg-gradient-to-r from-blue-200 to-blue-300 rounded-xl shadow-lg cursor-pointer transition-transform flex flex-col items-center justify-center"
                >
                  <CardContent className="flex flex-col items-center justify-center">
                    {card.svg}
                    <div className="text-center font-medium text-sm md:text-base text-gray-900">{card.title}</div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </section>
      </div>
    </main>
  );
}
