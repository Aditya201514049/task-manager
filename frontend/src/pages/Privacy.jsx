import React from 'react';

const Privacy = () => {
  const lastUpdated = 'January 1, 2023';

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-200">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        </div>
        
        <div className="p-6 text-gray-700 dark:text-gray-300">
          <p className="text-sm mb-6">Last Updated: {lastUpdated}</p>
          
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">1. Introduction</h2>
            <p>
              Task Manager ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web application.
              Please read this Privacy Policy carefully. By using Task Manager, you consent to the practices described in this policy.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">2. Information We Collect</h2>
            <div className="mb-3">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Personal Information</h3>
              <p>We may collect personal information that you voluntarily provide when registering for our service, including:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Name</li>
                <li>Email address</li>
                <li>Password (stored in encrypted form)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Usage Data</h3>
              <p>We automatically collect certain information when you use Task Manager, including:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Access time</li>
                <li>Pages viewed</li>
                <li>Features used</li>
              </ul>
            </div>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We may use the information we collect for various purposes, including to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide, maintain, and improve Task Manager</li>
              <li>Process and complete transactions</li>
              <li>Send administrative information, such as updates or security alerts</li>
              <li>Respond to your comments or inquiries</li>
              <li>Personalize your experience</li>
              <li>Monitor usage patterns to improve our service</li>
              <li>Protect against unauthorized access or potential security threats</li>
            </ul>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
              over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">5. Cookies and Similar Technologies</h2>
            <p className="mb-3">
              We use cookies and similar tracking technologies to track activity on our service and store certain information.
              Cookies are files with a small amount of data which may include an anonymous unique identifier.
            </p>
            <p>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              However, if you do not accept cookies, you may not be able to use some portions of our service.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">6. Third-Party Services</h2>
            <p>
              We may employ third-party companies and individuals to facilitate our service, provide the service on our behalf,
              perform service-related activities, or assist us in analyzing how our service is used. These third parties have
              access to your personal information only to perform these tasks on our behalf and are obligated not to disclose
              or use it for any other purpose.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">7. Children's Privacy</h2>
            <p>
              Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable
              information from children under 13. If you are a parent or guardian and you are aware that your child has
              provided us with personal information, please contact us.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy
              periodically for any changes.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@taskmanager.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                privacy@taskmanager.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 