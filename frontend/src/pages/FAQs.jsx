import React, { useState } from 'react';

const FAQs = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I create a new task?",
      answer: "To create a new task, navigate to the Task Form page by clicking on 'Task Form' in the navigation menu. Fill in the task details including title, description, status, priority, and due date. Click the 'Save' button to create your task."
    },
    {
      question: "Can I edit or delete tasks?",
      answer: "Yes, you can edit or delete tasks from the Task List page. Each task has edit and delete buttons. Click on edit to modify task details or delete to remove the task completely."
    },
    {
      question: "How do I change the status of a task?",
      answer: "To change the status of a task, go to the Task List page, find the task you want to update, and click the 'Edit' button. In the edit form, you can change the status dropdown to 'To Do', 'In Progress', or 'Completed', then save your changes."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security seriously. All user data is encrypted and stored securely. We use JWT tokens for authentication and ensure that users can only access their own tasks."
    },
    {
      question: "Can I use Task Manager on mobile devices?",
      answer: "Absolutely! Task Manager is fully responsive and works on all devices including smartphones, tablets, and desktop computers."
    },
    {
      question: "How do I switch between dark and light mode?",
      answer: "You can easily toggle between dark and light mode by clicking the sun/moon icon in the navigation bar. Your preference will be remembered for future sessions."
    },
    {
      question: "Can I sort or filter my tasks?",
      answer: "Yes, the Task List page allows you to filter tasks by status and sort them by different criteria such as due date, priority, or creation date."
    },
    {
      question: "How do I report a bug or request a feature?",
      answer: "Please contact our support team at support@taskmanager.com with any bug reports or feature requests. We welcome your feedback and are continuously working to improve the application."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-200">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h1 className="text-3xl font-bold text-white">Frequently Asked Questions</h1>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 dark:border-gray-700 rounded-lg transition-colors duration-200"
              >
                <button
                  className="flex justify-between items-center w-full p-4 text-left font-medium text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 transform transition-transform duration-200 ${openFAQ === index ? 'rotate-180' : ''}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </button>
                {openFAQ === index && (
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-300">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-gray-700 dark:text-gray-300 transition-colors duration-200">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Still have questions?</h2>
            <p>If you couldn't find the answer to your question, please feel free to reach out to our support team:</p>
            <p className="mt-2">
              <a href="mailto:support@taskmanager.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@taskmanager.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs; 