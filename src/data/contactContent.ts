/**
 * Client-editable Contact page content catalog.
 * Content managers edit this file to update the inquiry intro narrative,
 * selectable project classification categories, office operating hours,
 * and form confirmation messaging.
 *
 * All editable items are labeled with // EDIT: or // TEMP: markers.
 */

export interface ContactFormFieldLabels {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  projectLocation: string;
  message: string;
}

export interface ContactValidationMessages {
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  projectTypeRequired: string;
  messageRequired: string;
  messageMinLength: string;
  spamDetected: string;
  tooFast: string;
}

export interface ContactContent {
  seo: {
    title: string;
    description: string;
  };
  header: {
    eyebrow: {
      number: string;
      label: string;
    };
    title: string;
    intro: string;
  };
  officeHours: {
    title: string;
    // EDIT: Studio working hours
    hours: string[];
    // EDIT: Consultation note
    note: string;
  };
  directChannels: {
    title: string;
    description: string;
    whatsappLabel: string;
    callLabel: string;
    emailLabel: string;
  };
  projectTypes: string[];
  form: {
    title: string;
    description: string;
    labels: ContactFormFieldLabels;
    placeholders: {
      name: string;
      email: string;
      phone: string;
      projectTypeSelect: string;
      projectLocation: string;
      message: string;
    };
    validation: ContactValidationMessages;
    submit: {
      idle: string;
      submitting: string;
      retry: string;
    };
    success: {
      title: string;
      message: string;
      sendAnother: string;
    };
    error: {
      title: string;
      message: string;
      fallbackPrefix: string;
    };
  };
  map: {
    title: string;
    subtitle: string;
    showMapButton: string;
    openInGoogleMaps: string;
    ariaLabel: string;
  };
}

export const contactContent: ContactContent = {
  seo: {
    // EDIT: Contact SEO title
    title: 'Contact the Studio',
    // EDIT: Contact SEO description
    description:
      'Initiate a dialogue with Sadik Agaria Architects. Inquire about new commissions, private residential architecture, civic masterplanning, or media requests.',
  },

  header: {
    eyebrow: {
      number: '05',
      label: 'Contact & Dialogue',
    },
    // EDIT: Main contact headline
    title: 'Begin an Architectural Conversation',
    // EDIT: Editorial intro
    intro:
      'Every landmark begins with a conversation. We welcome inquiries from private clients, institutions, and civic patrons looking to realize exceptional spaces with enduring tectonic character.',
  },

  officeHours: {
    title: 'Studio Operating Hours',
    hours: [
      // EDIT: Regular office hours
      'Monday – Friday: 09:00 – 18:00 EST',
      'Saturday & Sunday: Closed for site research',
    ],
    // EDIT: Consultation note
    note: 'In-person atelier consultations and site visits are arranged by appointment.',
  },

  directChannels: {
    title: 'Direct Inquiries',
    description:
      'For immediate client consultations, architectural press inquiries, or general communications, you may reach our team directly through the following channels.',
    whatsappLabel: 'Message via WhatsApp',
    callLabel: 'Direct Line',
    emailLabel: 'Inquiry Inbox',
  },

  // EDIT: Selectable project types in the inquiry form
  projectTypes: [
    'Private Residential Sanctuary',
    'Commercial & Cultural Architecture',
    'Interior Architecture & Bespoke Millwork',
    'Landscape Design & Masterplanning',
    'Historic Preservation & Adaptive Reuse',
    'Architectural Fellowship / Press Inquiry',
    'Other Spatial Commission',
  ],

  form: {
    title: 'Project Inquiry Form',
    description:
      'Please tell us about your project vision, location, and timeline. Our partners review all inquiries and respond within two business days.',
    labels: {
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Telephone (Optional)',
      projectType: 'Project Typology',
      projectLocation: 'Site / City Location (Optional)',
      message: 'Project Scope & Narrative',
    },
    placeholders: {
      name: 'e.g. Katherine Thorne',
      email: 'katherine@example.com',
      phone: '+1 (555) 019-2834',
      projectTypeSelect: 'Select a project category...',
      projectLocation: 'e.g. Kyoto, Japan or Hudson Valley, NY',
      message:
        'Please describe the site, approximate timeline, budget parameters, and any key architectural aspirations...',
    },
    validation: {
      nameRequired: 'Please enter your full name.',
      emailRequired: 'Please provide a valid email address.',
      emailInvalid: 'Please enter a valid email format (e.g. name@domain.com).',
      projectTypeRequired: 'Please select a project typology.',
      messageRequired: 'Please provide a brief summary of your project.',
      messageMinLength: 'Please enter at least 20 characters describing your inquiry.',
      spamDetected: 'Automated submission detected. Please refresh and try again.',
      tooFast: 'Please take a moment before submitting to ensure accuracy.',
    },
    submit: {
      idle: 'Transmit Inquiry',
      submitting: 'Transmitting Inquiry...',
      retry: 'Retry Submission',
    },
    success: {
      title: 'Inquiry Successfully Received',
      message:
        'Thank you for reaching out to Sadik Agaria Architects. Your inquiry has been routed to our partners. We will review your project overview and respond within two business days.',
      sendAnother: 'Send Another Message',
    },
    error: {
      title: 'Unable to Transmit Inquiry',
      message:
        'An unexpected network error occurred while submitting the form. Your information has been preserved.',
      fallbackPrefix: 'Please retry or reach us directly via our direct studio channels:',
    },
  },

  map: {
    title: 'Studio Location & Atelier',
    subtitle: 'Visiting Our New York Studio',
    showMapButton: 'Load Interactive Map',
    openInGoogleMaps: 'Open in Google Maps ↗',
    ariaLabel: 'Google Maps showing studio location',
  },
};
