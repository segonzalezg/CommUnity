import { WebsiteNavbar } from "@/components/website/WebsiteNavbar";
import { Footer } from "@/components/website/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <WebsiteNavbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About CommUnity
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Empowering communities through meaningful connections and
              gamified volunteering
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              CommUnity was born from a simple belief: volunteering should be
              accessible, rewarding, and fun. We're on a mission to bridge the
              gap between passionate volunteers and organizations that need their
              help.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              By gamifying the volunteering experience, we make it easier for
              people to discover opportunities, track their impact, and stay
              motivated to continue making a difference in their communities.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Community First
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We believe in the power of community and the positive impact
                  that comes from people working together.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Transparency
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We're committed to transparency in how we operate, how we
                  match volunteers, and how we track impact.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Innovation
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We continuously innovate to make volunteering more accessible,
                  engaging, and impactful for everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Story
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                CommUnity started when our founders noticed a common problem:
                many people wanted to volunteer but didn't know where to start,
                and organizations struggled to find the right volunteers for their
                events.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We realized that by combining modern technology with gamification
                principles, we could create a platform that makes volunteering
                more engaging and accessible. Our smart matching algorithm
                connects volunteers with opportunities that align with their
                skills and interests, while our gamification system rewards
                consistent participation and impact.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Today, CommUnity is helping thousands of volunteers make a
                meaningful difference in their communities, one event at a time.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

