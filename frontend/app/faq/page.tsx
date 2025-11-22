"use client";

import { useState } from "react";
import { WebsiteNavbar } from "@/components/website/WebsiteNavbar";
import { Footer } from "@/components/website/Footer";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "How do I get started with CommUnity?",
      answer:
        "Getting started is easy! Simply sign up for an account, complete your profile with your skills and interests, and start browsing volunteer opportunities. Our smart matching system will suggest events that align with your preferences.",
    },
    {
      question: "Is CommUnity free to use?",
      answer:
        "Yes, CommUnity is completely free for volunteers. Organizations may have different pricing plans depending on their needs, but individual volunteers can use all core features at no cost.",
    },
    {
      question: "How does the gamification system work?",
      answer:
        "You earn XP (experience points) for attending events, completing tasks, and making an impact. As you accumulate XP, you unlock badges and achievements. You can also compete on leaderboards to see how you rank against other volunteers in your community.",
    },
    {
      question: "Can organizations post events on CommUnity?",
      answer:
        "Yes! Organizations can create accounts, post volunteer opportunities, manage events, and track volunteer attendance. Organizations have access to a dedicated dashboard with analytics and volunteer management tools.",
    },
    {
      question: "How does the matching algorithm work?",
      answer:
        "Our matching algorithm considers multiple factors including your skills, availability, location, and cause preferences. It uses a weighted scoring system to suggest the best volunteer opportunities for you, helping you find events where you can make the most impact.",
    },
    {
      question: "Can I track my volunteering hours?",
      answer:
        "Absolutely! CommUnity automatically tracks your attendance at events and calculates your total volunteering hours. You can view your impact statistics, including hours volunteered, events attended, and achievements unlocked, all in your profile dashboard.",
    },
    {
      question: "What types of volunteer opportunities are available?",
      answer:
        "CommUnity hosts a wide variety of volunteer opportunities across different causes including education, healthcare, environmental conservation, food service, construction, marketing, and more. You can filter events by cause, location, date, and required skills.",
    },
    {
      question: "How do I communicate with organizations?",
      answer:
        "CommUnity has a built-in messaging system that allows you to communicate directly with organizations and other volunteers. You can ask questions about events, coordinate details, and stay updated on opportunities.",
    },
    {
      question: "What if I need to cancel my event registration?",
      answer:
        "You can cancel your registration for an event through your dashboard. We recommend canceling as early as possible so organizations can adjust their planning. Some events may have cancellation policies, which will be clearly stated in the event details.",
    },
    {
      question: "How do leaderboards work?",
      answer:
        "Leaderboards rank volunteers based on their XP, achievements, and impact. You can view global leaderboards, local leaderboards (by location), and category-based leaderboards (by cause type). Leaderboards are updated in real-time as volunteers earn points.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <WebsiteNavbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Find answers to common questions about CommUnity
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white pr-4">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 py-4 bg-white dark:bg-gray-900">
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Still have questions */}
            <div className="mt-12 p-6 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Still have questions?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Can't find the answer you're looking for? Please reach out to our
                friendly team.
              </p>
              <a
                href="/contact"
                className="inline-block px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

