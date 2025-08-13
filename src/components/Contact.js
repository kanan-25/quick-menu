'use client'

import { useState } from 'react'
import { ButtonLoader } from '@/components/Loader';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    reason: 'general',
    agreed: false
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission with delay
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Thank you for your message! We\'ll get back to you soon.'
      });

      // In a real application, you would send the form data to your server here
      console.log('Form submitted:', formData);
    } catch (error) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Something went wrong. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-gray-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 w-72 h-72 bg-teal-100 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute right-0 bottom-1/3 w-96 h-96 bg-emerald-100 rounded-full opacity-20 translate-x-1/3"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="lg:pr-12">
            <div className="inline-block px-4 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-semibold mb-4">
              Get In Touch
            </div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl mb-6">
              Let's Start a Conversation
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Have questions about Quick Menu? Want to see how we can help your restaurant?
              Our team is ready to assist you.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Email Us</h3>
                  <p className="mt-1 text-gray-600">We'll respond within 24 hours</p>
                  <a href="mailto:support@quickmenu.com" className="mt-2 inline-block text-teal-600 hover:text-teal-700 font-medium">
                    support@quickmenu.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Call Us</h3>
                  <p className="mt-1 text-gray-600">Mon-Fri from 8am to 5pm</p>
                  <a href="tel:+1234567890" className="mt-2 inline-block text-teal-600 hover:text-teal-700 font-medium">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Visit Us</h3>
                  <p className="mt-1 text-gray-600">Come say hello at our office</p>
                  <p className="mt-2 text-teal-600">
                    123 Restaurant Row<br />
                    Suite 456<br />
                    Foodie City, FC 12345
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <a href="/" className="text-gray-500 hover:text-teal-600">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="/" className="text-gray-500 hover:text-teal-600">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="/" className="text-gray-500 hover:text-teal-600">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-xl p-8">
            {formStatus.submitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 text-teal-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-6">{formStatus.message}</p>
                <button
                  onClick={() => setFormStatus({submitted: false, error: false, message: ''})}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h3>

                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                  {/* First Name */}
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm transition-colors duration-200 px-4 py-3"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm transition-colors duration-200 px-4 py-3"
                    />
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm transition-colors duration-200 px-4 py-3"
                    />
                  </div>

                  {/* Phone */}
                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm transition-colors duration-200 px-4 py-3"
                    />
                    <p className="mt-1 text-xs text-gray-500">Optional</p>
                  </div>

                  {/* Company */}
                  <div className="sm:col-span-2">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                      Company / Restaurant
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm transition-colors duration-200 px-4 py-3"
                    />
                  </div>

                  {/* Reason for Contact */}
                  <div className="sm:col-span-2">
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                      What can we help you with?
                    </label>
                    <select
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm transition-colors duration-200 px-4 py-3"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="demo">Request a Demo</option>
                      <option value="pricing">Pricing Information</option>
                      <option value="partnership">Partnership Opportunity</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm transition-colors duration-200 px-4 py-3"
                    />
                  </div>

                  {/* Agreement */}
                  <div className="sm:col-span-2">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <input
                          id="agreed"
                          name="agreed"
                          type="checkbox"
                          checked={formData.agreed}
                          onChange={handleChange}
                          required
                          className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 transition-colors duration-200"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-500">
                          By selecting this, you agree to our{' '}
                          <a href="/" className="font-medium text-teal-600 hover:text-teal-500">
                            Privacy Policy
                          </a>{' '}
                          and{' '}
                          <a href="/" className="font-medium text-teal-600 hover:text-teal-500">
                            Terms of Services
                          </a>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200 ${
                      isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-teal-600 hover:bg-teal-700'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <ButtonLoader size="sm" color="white" />
                        Sending Message...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
