import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import NewsletterSignup from '@/components/NewsletterSignup';
import { MapPin, Phone, Mail, Clock, Send, Code, Cpu, Globe } from 'lucide-react';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Peter Muraya Ndungu | AI & IoT Developer Nairobi</title>
        <meta
          name="description"
          content="Connect with Peter Muraya Ndungu — Kenya's premier AI & IoT developer. Let's collaborate on cutting-edge web, AI, or IoT solutions for African markets."
        />
        <meta
          name="keywords"
          content="hire IoT developer Kenya, AI solutions Nairobi, web development expert Kenya, React TypeScript developer, smart systems Africa, AI integration services, IoT consultant Nairobi"
        />
        <link rel="canonical" href="https://petermuraya.github.io/muraya/contact" />
        
        {/* Open Graph / Social Media Meta */}
        <meta property="og:title" content="Contact Peter Muraya Ndungu | AI & IoT Specialist" />
        <meta
          property="og:description"
          content="Get in touch with Peter Muraya Ndungu for professional AI, IoT, and web development services in Kenya."
        />
        <meta property="og:url" content="https://petermuraya.github.io/muraya/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://petermuraya.github.io/muraya/assets/profile-banner.png" />
        <meta property="og:image:alt" content="Peter Muraya Ndungu - AI & IoT Developer" />
        <meta property="og:locale" content="en_KE" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sammie1604" />
        <meta name="twitter:creator" content="@sammie1604" />
        <meta name="twitter:title" content="Contact Peter Muraya Ndungu | AI & IoT Developer" />
        <meta name="twitter:description" content="Connect with a leading AI & IoT developer in Nairobi for your next tech project." />
        <meta name="twitter:image" content="https://petermuraya.github.io/muraya/assets/profile-banner.png" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Peter Muraya Ndungu",
            "description": "Contact page for Peter Muraya Ndungu, AI & IoT developer in Nairobi, Kenya",
            "url": "https://petermuraya.github.io/muraya/contact",
            "mainEntity": {
              "@type": "Person",
              "name": "Peter Muraya Ndungu",
              "jobTitle": "IoT & AI Developer",
              "email": "mailto:sammypeter1944@gmail.com",
              "telephone": "+254700471113",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Nairobi",
                "addressRegion": "Nairobi",
                "addressCountry": "Kenya"
              },
              "sameAs": [
                "https://www.linkedin.com/in/peter-muraya-ndungu/",
                "https://github.com/petermuraya",
                "https://twitter.com/sammie1604",
                "https://instagram.com/murayandungu"
              ],
              "knowsAbout": [
                "Artificial Intelligence",
                "Internet of Things",
                "React.js",
                "TypeScript",
                "Node.js",
                "Python",
                "Cloud Architecture"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Safaricom PLC"
              }
            },
            "potentialAction": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "telephone": "+254700471113",
              "email": "sammypeter1944@gmail.com",
              "areaServed": "Africa",
              "availableLanguage": "English"
            }
          }
        `}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-800">
        <Navigation />

        <main className="pt-20">
          {/* Hero Section with Glowing Effect */}
          <section className="relative py-24 px-4 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 to-transparent opacity-20 dark:opacity-30"></div>
            <div className="container mx-auto text-center relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                <span className="inline-block animate-float">👋</span> Let's Build the Future
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Connect with a <span className="font-semibold text-blue-600 dark:text-blue-400">visionary developer</span> crafting intelligent systems for Africa's digital transformation.
              </p>
              <div className="flex justify-center space-x-4">
                <a 
                  href="#contact-form" 
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center"
                >
                  <Send className="w-5 h-5 mr-2" /> Send Message
                </a>
                <a 
                  href="tel:+254700471113" 
                  className="px-8 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center"
                >
                  <Phone className="w-5 h-5 mr-2" /> Call Now
                </a>
              </div>
            </div>
          </section>

          {/* Contact Section with Futuristic Grid */}
          <section id="contact-form" className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-10">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                      Digital <span className="text-blue-600 dark:text-blue-400">Pathways</span> to Connect
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                      Whether you're envisioning an AI solution, IoT system, or cutting-edge web application, let's co-create something extraordinary.
                    </p>
                  </div>

                  {/* Futuristic Contact Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                          <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold text-lg ml-4 text-gray-900 dark:text-white">Digital Courier</h3>
                      </div>
                      <a 
                        href="mailto:sammypeter1944@gmail.com" 
                        className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                      >
                        sammypeter1944@gmail.com
                      </a>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-green-500/10 hover:-translate-y-1 transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400">
                          <Phone className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold text-lg ml-4 text-gray-900 dark:text-white">Voice Channel</h3>
                      </div>
                      <a 
                        href="tel:+254700471113" 
                        className="text-green-600 dark:text-green-400 hover:underline"
                      >
                        +254 700 471113
                      </a>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-red-500/10 hover:-translate-y-1 transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold text-lg ml-4 text-gray-900 dark:text-white">Geolocation</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">Nairobi, Kenya</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400">
                          <Clock className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold text-lg ml-4 text-gray-900 dark:text-white">Response Protocol</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">Within 24 hours</p>
                    </div>
                  </div>

                  {/* Social Links with Futuristic Icons */}
                  <div className="pt-6">
                    <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-4">Connect Through Digital Networks</h3>
                    <div className="flex space-x-4">
                      {[
                        { icon: <Globe className="w-5 h-5" />, url: "https://github.com/petermuraya", name: "GitHub" },
                        { icon: <Code className="w-5 h-5" />, url: "https://www.linkedin.com/in/peter-muraya-ndungu/", name: "LinkedIn" },
                        { icon: <Send className="w-5 h-5" />, url: "https://x.com/sammie1604", name: "Twitter" },
                        { icon: <Cpu className="w-5 h-5" />, url: "https://instagram.com/murayandungu", name: "Instagram" }
                      ].map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                          aria-label={social.name}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Form with Futuristic Design */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-25"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                      Send an <span className="text-blue-600 dark:text-blue-400">Encrypted</span> Message
                    </h3>
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section with Futuristic Accordion */}
          <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                Project <span className="text-blue-600 dark:text-blue-400">Protocols</span>
              </h2>

              <div className="space-y-6">
                {[
                  {
                    question: "What's your development process like?",
                    answer: "I follow an agile methodology with 2-week sprints, starting with discovery, moving to prototyping, then iterative development with continuous client feedback."
                  },
                  {
                    question: "Do you work with startups?",
                    answer: "Absolutely! I specialize in helping startups build their MVPs with scalable architectures that can grow with their business."
                  },
                  {
                    question: "What industries do you serve?",
                    answer: "I focus on healthcare technology, smart agriculture, tourism tech solutions, and general IoT/AI applications for African markets."
                  },
                  {
                    question: "How do you handle project security?",
                    answer: "Security is built into every layer of development, from secure coding practices to infrastructure hardening and regular penetration testing."
                  },
                  {
                    question: "What's your pricing structure?",
                    answer: "Projects are typically priced based on scope and complexity. I offer both fixed-price and time-and-materials contracts depending on project requirements."
                  }
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300"
                  >
                    <h3 className="font-semibold text-xl mb-3 text-gray-900 dark:text-white flex items-center">
                      <span className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full mr-3 text-sm">
                        {index + 1}
                      </span>
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 pl-9">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter with Futuristic Design */}
          <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="container mx-auto max-w-4xl">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100 dark:border-gray-700">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    Join My <span className="text-blue-600 dark:text-blue-400">Tech</span> Network
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Get exclusive insights on AI, IoT, and web development trends in Africa. Plus receive early access to my open-source projects.
                  </p>
                </div>
                <NewsletterSignup />
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