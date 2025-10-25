import { EmailScenario } from "./emailTypes";

export const emailScenarios: EmailScenario[] = [
  {
    id: 1,
    title: 'Lost Bag at Restaurant',
    category: 'Personal Communication',
    difficulty: 'Beginner',
    timeLimit: 9,
    wordLimit: { min: 100 },
    situation: "You and your friends had dinner at a restaurant yesterday. You think you left a bag at the restaurant. Write an email to the restaurant manager. You should write at 80-120 words. Your ideas must come from the following three themes:",
    keyPoints: [
      "describe your situation. (who you were with, where you sat, etc.)",
      "what the bag looks like and what the bag was in?",
      "tell them how to contact you."
    ],
    sampleEmail: `Dear Restaurant Manager,

I hope this email finds you well. I am writing to inquire about a bag that I believe I left at your restaurant yesterday evening.

I was dining with three friends at approximately 7:30 PM, and we were seated at a table near the window on the second floor. During our meal, I placed my black leather handbag under the table, and I think I forgot to take it when we left around 9:00 PM.

The bag is a medium-sized black leather purse with silver buckles and contains my wallet, phone charger, and some personal documents. It was placed in a small brown paper shopping bag.

Could you please check if anyone has found it? If so, please contact me at this email address or call me at (555) 123-4567. I would be happy to come by at your convenience to collect it.

Thank you very much for your time and assistance.

Best regards,
Sarah Johnson`,
    tags: ['personal', 'inquiry', 'lost item', 'restaurant'],
    isNew: true,
    isMarked: false,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Complaint About Hotel Service',
    category: 'Business Communication',
    difficulty: 'Intermediate',
    timeLimit: 9,
    wordLimit: { min: 100 },
    situation: "You stayed at a hotel last weekend and experienced poor service. Write an email to the hotel manager to express your dissatisfaction. You should write at 100-150 words. Your ideas must come from the following three themes:",
    keyPoints: [
      "describe the specific problems you encountered during your stay.",
      "explain how these issues affected your experience and mood.",
      "suggest what the hotel should do to improve or compensate."
    ],
    sampleEmail: `Dear Hotel Manager,

I am writing to express my disappointment with the service I received during my recent stay at your hotel from March 15-17, 2024, in room 312.

Several issues significantly impacted my experience. The air conditioning was not working properly, making the room uncomfortably warm. Additionally, the Wi-Fi connection was extremely slow and frequently disconnected, which affected my work. Most concerning was that housekeeping did not clean my room on the second day despite my request.

These problems made my stay very frustrating and stressful, especially since I had chosen your hotel based on its reputation for excellent service. As a business traveler, reliable amenities are essential for my productivity.

I would appreciate a partial refund for the inconvenience and assurance that these issues will be addressed to prevent future guests from experiencing similar problems.

I look forward to your prompt response and resolution.

Sincerely,
Michael Chen`,
    tags: ['complaint', 'business', 'hotel', 'service'],
    isNew: false,
    isMarked: true,
    pracStatus: 'In Progress',
    hasExplanation: true,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-20'
  },
  {
    id: 3,
    title: 'Job Application Follow-up',
    category: 'Professional Communication',
    difficulty: 'Advanced',
    timeLimit: 9,
    wordLimit: { min: 100 },
    situation: "You applied for a marketing position at a company two weeks ago but haven't heard back. Write a follow-up email to the hiring manager. You should write at 120-180 words. Your ideas must come from the following three themes:",
    keyPoints: [
      "remind them of your application and express continued interest.",
      "highlight your key qualifications and what you can contribute.",
      "politely ask about the status and next steps in the process."
    ],
    sampleEmail: `Dear Ms. Rodriguez,

I hope this email finds you well. I am writing to follow up on my application for the Marketing Specialist position that I submitted two weeks ago. I remain very interested in this opportunity and would like to reiterate my enthusiasm for joining your team.

Since submitting my application, I have been reflecting on how my background aligns with your company's goals. With my five years of digital marketing experience and proven track record in social media campaign management, I am confident I can contribute to your marketing department's continued success. My recent certification in Google Analytics and experience with SEO optimization would be particularly valuable for the role.

I understand that you likely have many qualified candidates to review. Could you please provide an update on the status of my application and let me know about the next steps in your hiring process? I would be happy to provide any additional information you might need.

Thank you for your time and consideration. I look forward to hearing from you soon.

Best regards,
Jennifer Thompson`,
    tags: ['job application', 'professional', 'follow-up', 'career'],
    isNew: true,
    isMarked: false,
    pracStatus: 'Undone',
    hasExplanation: false,
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18'
  },
  {
    id: 4,
    title: 'Invitation to Birthday Party',
    category: 'Social Communication',
    difficulty: 'Beginner',
    timeLimit: 9,
    wordLimit: { min: 100 },
    situation: "You are organizing a birthday party for your best friend. Write an email to invite mutual friends. You should write at 90-130 words. Your ideas must come from the following three themes:",
    keyPoints: [
      "explain the occasion and why you're organizing the party.",
      "provide all the important details (date, time, location, etc.).",
      "ask them to confirm attendance and mention any special arrangements."
    ],
    sampleEmail: `Dear Friends,

I hope you're all doing well! I'm excited to let you know that I'm organizing a surprise birthday party for our dear friend Emma, who is turning 25 this month.

The party will be held on Saturday, March 23rd, at 6:00 PM at my house (123 Oak Street). We'll have dinner, cake, music, and lots of fun activities planned. I've also arranged for Emma's favorite chocolate cake from the bakery downtown.

Since this is a surprise party, please keep it confidential! Could you please reply by March 20th to confirm if you can attend? Also, if you could arrive by 5:45 PM to help set up and hide before Emma arrives, that would be wonderful.

Looking forward to celebrating Emma together and making this a memorable birthday for her!

Best wishes,
Alex`,
    tags: ['invitation', 'social', 'birthday', 'party'],
    isNew: false,
    isMarked: false,
    pracStatus: 'Done',
    hasExplanation: true,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-15'
  },
  {
    id: 5,
    title: 'Request for Course Extension',
    category: 'Academic Communication',
    difficulty: 'Intermediate',
    timeLimit: 9,
    wordLimit: { min: 100 },
    situation: "You are enrolled in an online course but need extra time to complete it due to unexpected circumstances. Write an email to your instructor. You should write at 110-160 words. Your ideas must come from the following three themes:",
    keyPoints: [
      "explain your current situation and the challenges you're facing.",
      "describe your progress so far and commitment to completing the course.",
      "request a specific extension and propose a new completion timeline."
    ],
    sampleEmail: `Dear Professor Williams,

I hope you are well. I am writing to request an extension for completing the Advanced Data Analytics course that I enrolled in this semester.

Unfortunately, I have encountered some unexpected personal circumstances that have significantly impacted my study schedule. My father was recently hospitalized, and I have been spending considerable time caring for him and managing family responsibilities. This has made it challenging to dedicate the necessary time to coursework.

Despite these challenges, I have completed approximately 70% of the course modules and am determined to finish successfully. The material is extremely valuable for my career development, and I don't want to waste the progress I've already made.

Would it be possible to grant me a two-week extension to complete the remaining assignments and final project? I believe this additional time would allow me to submit quality work that reflects my true capabilities.

Thank you for your understanding and consideration.

Respectfully,
David Park`,
    tags: ['academic', 'extension', 'request', 'education'],
    isNew: false,
    isMarked: true,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12'
  },
  {
    id: 6,
    title: 'Booking Cancellation Request',
    category: 'Customer Service',
    difficulty: 'Beginner',
    timeLimit: 9,
    wordLimit: { min: 100 },
    situation: "You booked a flight but need to cancel due to emergency. Write an email to the airline customer service. You should write at 85-125 words. Your ideas must come from the following three themes:",
    keyPoints: [
      "provide your booking details and explain the reason for cancellation.",
      "describe the emergency situation that requires you to cancel.",
      "ask about refund policies and request assistance with the cancellation."
    ],
    sampleEmail: `Dear Customer Service Team,

I am writing to request the cancellation of my flight booking due to an unexpected family emergency.

My booking details are as follows: Confirmation number ABC123, Flight AA456 from New York to Los Angeles, scheduled for departure on April 5th, 2024, under the name Robert Smith.

Unfortunately, my grandmother was suddenly admitted to the hospital yesterday evening, and her condition is critical. I need to remain with my family during this difficult time and cannot travel as planned.

Could you please assist me with canceling this booking and let me know about your refund policy for emergency situations? I understand there may be cancellation fees, but I would appreciate any consideration given the circumstances.

I can provide medical documentation if required. Please contact me at your earliest convenience.

Thank you for your understanding.

Sincerely,
Robert Smith`,
    tags: ['cancellation', 'emergency', 'travel', 'customer service'],
    isNew: true,
    isMarked: false,
    pracStatus: 'In Progress',
    hasExplanation: false,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-22'
  }
];