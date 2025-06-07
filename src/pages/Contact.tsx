import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import NewsletterSignup from '@/components/NewsletterSignup';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Peter Muraya Ndungu | AI & IoT Developer Nairobi</title>
        <meta
          name="description"
          content="Reach out to Peter Muraya Ndungu — AI & IoT developer based in Nairobi, Kenya. Let's collaborate on your next web, AI, or IoT project."
        />
        <meta
          name="keywords"
          content="Peter Muraya Ndungu, AI developer Kenya, IoT developer Nairobi, web development, React developer, TypeScript expert, AI engineer Safaricom, hire IoT developer"
        />
        <meta property="og:title" content="Contact Peter Muraya Ndungu" />
        <meta
          property="og:description"
          content="Get in touch with Peter Muraya Ndungu for professional AI, IoT, and web development services."
        />
        <meta property="og:url" content="https://petermuraya.github.io/muraya/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://petermuraya.github.io/muraya/assets/profile-banner.png" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Peter Muraya Ndungu",
            "jobTitle": "IoT & AI Developer",
            "url": "https://petermuraya.github.io/muraya",
            "email": "mailto:sammypeter1944@gmail.com",
            "telephone": "+254700471113",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Nairobi",
              "addressCountry": "KE"
            },
            "sameAs": [
              "https://www.linkedin.com/in/peter-muraya-ndungu/",
              "https://github.com/petermuraya",
              "https://twitter.com/sammie1604",
              "https://instagram.com/murayandungu"
            ],
            "description": "Peter Muraya Ndungu is a professional IoT and AI developer based in Nairobi, Kenya, specializing in React, TypeScript, IoT systems, and AI integrations. Currently interning at Safaricom PLC."
          }
        `}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Navigation />

        <main className="pt-20">
          <section className="py-20 px-4">
            <div className="container mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Let's Work Together
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Have a project in mind? Want to collaborate? Or just want to say hello?
                I'd love to hear from you!
              </p>
            </div>
          </section>

          <section className="py-16 px-4">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Get in Touch</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                      Ready to bring your ideas to life? Let's discuss your project and see how we can create something amazing together.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-4">
                        <Mail className="w-6 h-6 text-blue-600 mr-3" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">sammypeter1944@gmail.com</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-4">
                        <Phone className="w-6 h-6 text-green-600 mr-3" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">+254 700 471113</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-4">
                        <MapPin className="w-6 h-6 text-red-600 mr-3" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">Location</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">Nairobi, Kenya</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-4">
                        <Clock className="w-6 h-6 text-purple-600 mr-3" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">Response Time</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">Within 24 hours</p>
                    </div>
                  </div>

                  <div className="pt-8">
                    <NewsletterSignup />
                  </div>
                </div>

                <div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Frequently Asked Questions</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Repeatable FAQ cards */}
                {[
                  {
                    question: "What's your typical project timeline?",
                    answer:
                      "Project timelines vary based on complexity, but most web, AI, or IoT projects take 2-8 weeks from initial consultation to launch."
                  },
                  {
                    question: "Do you work with international clients?",
                    answer:
                      "Absolutely! I work with clients worldwide and am flexible with different time zones and communication preferences."
                  },
                  {
                    question: "What technologies do you specialize in?",
                    answer:
                      "I specialize in React, TypeScript, Node.js, Python, modern IoT systems, and AI integration solutions."
                  },
                  {
                    question: "Do you provide ongoing support?",
                    answer:
                      "Yes! I offer maintenance packages and ongoing support to ensure your project continues to run smoothly after launch."
                  }
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
                  >
                    <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
