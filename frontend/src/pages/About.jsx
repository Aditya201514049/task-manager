import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-200">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h1 className="text-3xl font-bold text-white">About Task Manager</h1>
        </div>
        
        <div className="p-6 text-gray-700 dark:text-gray-300">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Our Mission</h2>
            <p className="mb-4">
              Task Manager is designed to help individuals and teams organize their work efficiently.
              We believe that productivity starts with clear organization and visibility of tasks.
            </p>
            <p>
              Our goal is to provide a simple yet powerful tool that helps you stay on top of your tasks,
              meet deadlines, and collaborate effectively with your team.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Create and organize tasks with customizable categories</li>
              <li>Set due dates and priorities for better time management</li>
              <li>Track progress with task status updates</li>
              <li>User-friendly interface with dark and light mode options</li>
              <li>Secure account management</li>
              <li>Mobile-responsive design for on-the-go task management</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Our Team</h2>
            <p>
              Task Manager is developed by a passionate team of developers dedicated to creating
              tools that enhance productivity and simplify workflow management. We continuously
              improve our application based on user feedback and emerging best practices in task
              management.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Contact Us</h2>
            <p className="mb-4">
              We'd love to hear from you! If you have any questions, suggestions, or feedback,
              please don't hesitate to reach out.
            </p>
            <p className="font-medium">
              Email: <a href="mailto:support@taskmanager.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@taskmanager.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About; 