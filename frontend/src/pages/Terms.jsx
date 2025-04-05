import React from 'react';

const Terms = () => {
  const lastUpdated = 'January 1, 2023';

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-200">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
        </div>
        
        <div className="p-6 text-gray-700 dark:text-gray-300">
          <p className="text-sm mb-6">Last Updated: {lastUpdated}</p>
          
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Task Manager service, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">2. Description of Service</h2>
            <p>
              Task Manager provides a web-based platform for users to create, organize, and manage tasks. 
              The service includes features for setting task priorities, due dates, and tracking task status.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">3. User Accounts</h2>
            <p className="mb-3">
              To use Task Manager, you must create an account by providing accurate and complete information.
              You are responsible for maintaining the security of your account and password.
              Task Manager cannot and will not be liable for any loss or damage resulting from your failure to comply with this security obligation.
            </p>
            <p>
              You are responsible for all activities that occur under your account.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">4. User Content</h2>
            <p className="mb-3">
              You retain all rights to any content you submit, post, or display on or through Task Manager.
              By submitting content to Task Manager, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content in connection with providing the service to you.
            </p>
            <p>
              You are solely responsible for your content and the consequences of posting or publishing it.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">5. Prohibited Uses</h2>
            <p className="mb-3">You agree not to use Task Manager for any purpose that is illegal or prohibited by these Terms, including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Violating any applicable law or regulation</li>
              <li>Infringing upon the rights of others</li>
              <li>Attempting to gain unauthorized access to another user's account</li>
              <li>Distributing malware or harmful code</li>
              <li>Interfering with the proper functioning of the service</li>
            </ul>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">6. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at any time for violations of these Terms
              or for any other reason at our sole discretion. Upon termination, your right to use the service will immediately cease.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of significant changes
              by posting the new Terms on our website or through the service. Your continued use of Task Manager after
              such changes constitutes your agreement to the revised Terms.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">8. Disclaimer of Warranties</h2>
            <p>
              Task Manager is provided "as is" without warranties of any kind, whether express or implied.
              We do not warrant that the service will be uninterrupted, secure, or error-free.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">9. Limitation of Liability</h2>
            <p>
              In no event shall Task Manager be liable for any indirect, incidental, special, consequential, or punitive damages,
              including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">10. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at{' '}
              <a href="mailto:legal@taskmanager.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                legal@taskmanager.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms; 