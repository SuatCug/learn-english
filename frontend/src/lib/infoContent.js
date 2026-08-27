// Footer'daki "Info" bağlantıları için içerik. Her giriş bir `sections` dizisinden oluşur;
// her section isteğe bağlı bir `heading`, `paragraphs` ve/veya bir `list` ({ type, items })
// içerebilir. `list.type`: 'ordered' (numaralı adımlar), 'checklist' (✓ işaretli liste) veya
// 'unordered' (düz madde işaretli liste). InfoPage.jsx bu şemayı generik olarak render eder.
export const INFO_CONTENT = {
  'about-us': {
    title: 'About us',
    sections: [
      {
        heading: 'Who we are',
        paragraphs: [
          "At learnenglish we provide everything you need to practice and improve your English. Our platform offers focused online exercises in the key areas that matter: grammar, vocabulary, reading and writing.",
          "We're a small team of English teachers and e-learning enthusiasts. We've built our lessons and exercises around one simple idea — short, clear practice with instant feedback beats long, passive lessons. Our goal is a learning platform that adapts to your level, your pace and your goals.",
          "In today's fast-paced world, more and more people need to improve their English for work, study or everyday life — but finding time for lessons isn't always easy. With learnenglish, you can practice at your own pace, from anywhere, whenever you have a few minutes to spare.",
        ],
      },
      {
        heading: 'How it works',
        list: {
          type: 'ordered',
          items: [
            'Start with our free placement test to find your approximate CEFR level, from A1 to C2.',
            'Based on your result, work through grammar, vocabulary, reading and writing lessons built for your level.',
            'Every exercise gives you instant feedback, so you always know what you got right and why.',
            'Track your progress on your profile — streak, badges, and how far you are from your next level.',
          ],
        },
      },
      {
        heading: 'What we offer',
        list: {
          type: 'checklist',
          items: [
            'Clear grammar explanations with three different exercise types for every topic.',
            'Vocabulary lessons with example sentences and exercises with personalized feedback.',
            'Reading passages with comprehension questions at every level.',
            'Guided writing exercises with word banks and instant, inline feedback.',
            'A free, CEFR-aligned placement test to find your starting level in minutes.',
            'Instant marking on every answer, so you learn from your mistakes as you go.',
            'Streaks, badges and progress tracking to keep you motivated.',
            'Classroom tools for teachers — assign lessons, run live quiz games, and follow your students’ progress.',
          ],
        },
      },
    ],
  },

  'terms-of-use': {
    title: 'Terms of Use',
    sections: [
      {
        paragraphs: [
          'These Terms of Use ("Terms") govern your access to and use of learnenglish, including our website, exercises, tests, and any related classroom features (together, the "Service"). By creating an account or otherwise using the Service, you agree to be bound by these Terms. If you don\'t agree with them, please don\'t use learnenglish.',
        ],
      },
      {
        heading: 'Your account',
        paragraphs: [
          "You must provide accurate information when you sign up, and you're responsible for keeping your password confidential and for all activity that happens under your account.",
          "Accounts are personal — please don't share your login with other people or create multiple accounts to get around any limits we put in place. If you're a teacher, you're responsible for the classroom(s) you create and for how you use the results your students generate there.",
        ],
      },
      {
        heading: 'Acceptable use',
        paragraphs: ['You agree to use learnenglish only for personal learning, teaching, or classroom purposes. In particular, you agree not to:'],
        list: {
          type: 'unordered',
          items: [
            'Copy, scrape, or redistribute our exercises, questions, or explanations outside the platform',
            "Attempt to interfere with, disrupt, or gain unauthorized access to the Service or other users' accounts",
            'Use bots, scripts, or other automated tools to complete exercises or inflate your progress, streak, or badges',
            "Upload or share anything illegal, abusive, or that infringes someone else's rights through the classroom or live game features",
          ],
        },
      },
      {
        heading: 'Content and intellectual property',
        paragraphs: [
          'All lessons, exercises, explanations, and other learning materials on learnenglish are owned by us or our content partners and are protected by copyright. You may use them for your own learning, but you may not resell, republish, or otherwise distribute them without our written permission.',
        ],
      },
      {
        heading: 'Classrooms and premium features',
        paragraphs: [
          "Some features — such as creating a classroom, assigning lessons, and running live quiz games — are available to teacher and premium accounts. We may change what's included in these features over time, and we'll do our best to give you notice before any significant change.",
        ],
      },
      {
        heading: 'Termination',
        paragraphs: [
          'You can stop using learnenglish and permanently delete your account at any time from your profile page. We may suspend or terminate accounts that violate these Terms, abuse the Service, or put other users at risk.',
        ],
      },
      {
        heading: 'Changes to these Terms',
        paragraphs: [
          "We may update these Terms as the platform evolves — for example, to reflect a new feature or a change in how we operate. If we make material changes, we'll do our best to let you know. Continuing to use learnenglish after changes take effect means you accept the updated Terms.",
        ],
      },
    ],
  },

  'privacy-policy': {
    title: 'Privacy Policy',
    sections: [
      {
        paragraphs: [
          'This Privacy Policy explains what personal data learnenglish collects, why we collect it, and how you can control it. We try to keep this simple: we collect what we need to run your account, and nothing more.',
        ],
      },
      {
        heading: 'What we collect',
        paragraphs: [
          'When you create an account, we collect your name, email address, and password (stored securely — never in plain text). As you use the platform, we also record your learning activity: completed exercises, scores, the level you place into or study at, your streak, and any badges you earn.',
          "If you join a classroom, your teacher can see the assignments you've completed and your scores for them. If you create a classroom as a teacher, we store the classroom name, its join code, and the list of students who've joined.",
        ],
      },
      {
        heading: 'How we use your data',
        paragraphs: [
          "We use your data to run your account, show you your own progress and statistics, recommend a level after the placement test, and — where relevant — share your classroom results with your teacher. We don't use your data to show you third-party ads.",
        ],
      },
      {
        heading: 'Data sharing',
        paragraphs: [
          'We do not sell your personal data to third parties. We may share limited data with service providers who help us run the platform — for example, hosting or email delivery — under agreements that require them to protect your data and use it only for that purpose.',
        ],
      },
      {
        heading: 'Data retention and deletion',
        paragraphs: [
          "We keep your account data for as long as your account is active. You can permanently delete your account — along with your progress, badges, and classroom memberships — at any time from your profile page. This action can't be undone.",
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You can review and update your name and email at any time from your profile. If you have questions about your data, or want to request a copy of it, contact us at support@learnenglish.app.',
        ],
      },
    ],
  },

  'cookie-policy': {
    title: 'Cookie Policy',
    sections: [
      {
        paragraphs: [
          'This Cookie Policy explains how learnenglish uses cookies and similar local storage technologies when you visit our site.',
        ],
      },
      {
        heading: 'What are cookies',
        paragraphs: [
          "Cookies — and similar technologies like your browser's local storage — are small pieces of data that a website stores in your browser. They can be used to remember information about your visit, such as whether you're logged in or which preferences you've set.",
        ],
      },
      {
        heading: 'How we use them',
        paragraphs: [
          "learnenglish uses local browser storage strictly to keep you signed in between visits and to remember short-lived interface preferences, like which tab you had open on a lesson. We don't use cookies for advertising, and we don't use third-party tracking or analytics cookies.",
        ],
      },
      {
        heading: 'Managing cookies',
        paragraphs: [
          "Because we only use strictly necessary storage, there's nothing to opt out of beyond logging out or clearing your browser's site data. If you clear this data, you'll simply need to log in again the next time you visit.",
        ],
      },
    ],
  },

  'cookie-declaration': {
    title: 'Cookie Declaration',
    sections: [
      {
        paragraphs: ['Below is a breakdown of the categories of local browser storage learnenglish uses.'],
      },
      {
        heading: 'Strictly necessary',
        paragraphs: [
          "Used to keep you logged in via your session token, and to remember short-lived UI state such as your last opened exercise tab. These are essential for the Service to work and can't be switched off.",
        ],
      },
      {
        heading: 'Functional',
        paragraphs: [
          "We may store small preferences locally — such as an in-progress answer — so you don't lose your place if you accidentally refresh the page.",
        ],
      },
      {
        heading: 'Analytics and advertising',
        paragraphs: [
          "None at this time. We don't currently run any analytics, advertising, or third-party tracking scripts on learnenglish. If that ever changes, we'll update this page and ask for your consent where required.",
        ],
      },
      {
        heading: 'How to clear this data',
        paragraphs: [
          "You can remove everything we've stored in your browser at any time by clearing this site's data from your browser settings. You'll need to log in again afterwards.",
        ],
      },
    ],
  },

  'contact-us': {
    title: 'Contact us',
    sections: [
      {
        paragraphs: [
          "Questions, feedback, or something not working the way it should? We'd genuinely love to hear from you — learnenglish is a small team, and every message gets read.",
        ],
      },
      {
        heading: 'General questions and support',
        paragraphs: [
          'For anything related to your account, a bug you\'ve spotted, or general feedback, email us at support@learnenglish.app. If you can, include your account email and which lesson or page you were on — it helps us track things down faster.',
        ],
      },
      {
        heading: 'Teachers and classrooms',
        paragraphs: [
          "If you're a teacher with questions about setting up a classroom, assignments, or the live quiz game, mention that in your email and we'll make sure it gets to the right place.",
        ],
      },
      {
        heading: 'Response times',
        paragraphs: [
          'We usually reply within a couple of business days. During busier periods it might take a little longer, but we do read and respond to every message.',
        ],
      },
    ],
  },

  'request-topic': {
    title: 'Request a topic for a lesson',
    sections: [
      {
        paragraphs: [
          "Missing a grammar point, a word list, or a reading topic you'd like to practice? Tell us and we'll consider it for a future update.",
        ],
      },
      {
        heading: 'What to include',
        paragraphs: ['Send your suggestion to topics@learnenglish.app with:'],
        list: {
          type: 'unordered',
          items: [
            "The level you'd like it for (A1 to C2)",
            'The category — Grammar, Vocabulary, Reading, or Writing',
            "A short description of the topic, and, if you have one, an example sentence or question showing what you mean",
          ],
        },
      },
      {
        heading: 'What happens next',
        paragraphs: [
          "We review requests regularly and prioritize the ones we hear most often. We can't promise every topic will be added, but we do read every suggestion — and a lot of what's already on learnenglish came from requests just like yours.",
        ],
      },
    ],
  },

  'cookie-consent': {
    title: 'Change your cookie consent',
    sections: [
      {
        paragraphs: [
          "learnenglish only uses strictly necessary local storage — the kind needed to keep you signed in. We don't run analytics or advertising cookies that would require your consent under cookie law.",
        ],
      },
      {
        heading: "Why there's no consent toggle",
        paragraphs: [
          "Because we don't use any non-essential cookies, there isn't a preferences panel to manage here — there's simply nothing optional to turn on or off.",
        ],
      },
      {
        heading: 'Clearing your data anyway',
        paragraphs: [
          "If you'd still like to remove everything we've stored in your browser, you can clear this site's data from your browser settings at any time. You'll just need to log in again afterwards.",
        ],
      },
    ],
  },
};
