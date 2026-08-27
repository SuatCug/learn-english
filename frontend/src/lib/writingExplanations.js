// Writing konularının "Explanation" sekmesi için yapılandırılmış içerik.
// Anahtar: `${level}::${title}` (bkz. proje hafızası: aynı başlık farklı seviyelerde tekrar edebiliyor).
// Bir konu burada yoksa LessonPage, topic.description'ı düz metin olarak göstermeye devam eder.
//
// Şema:
// {
//   heading: string,
//   textType: string,                       // ör. "Informal Email", "Opinion Essay"
//   intro: string,
//   structure: [{ step: string, detail: string }],       // adım adım paragraf/plan
//   usefulLanguage: [{ heading: string, phrases: string[] }],
//   tips: string[],
// }
export const WRITING_EXPLANATIONS = {
  'A1::Writing About My Daily Routine': {
    heading: 'Writing About a Daily Routine',
    textType: 'Descriptive Paragraph',
    intro: 'This type of writing describes what you do every day, in the order it happens, using the present simple and time expressions.',
    structure: [
      { step: 'Morning', detail: 'Say what time you wake up and what you do first (get up, have breakfast, get dressed).' },
      { step: 'During the day', detail: 'Describe your school or work activities and when they happen.' },
      { step: 'Evening', detail: 'Describe what you do after school or work, dinner, and free time.' },
      { step: 'Night', detail: 'Say what time you go to bed.' },
    ],
    usefulLanguage: [
      { heading: 'Time expressions', phrases: ["at seven o'clock", 'in the morning / afternoon / evening', 'before / after breakfast', 'from... to...'] },
      { heading: 'Sequencing words', phrases: ['First,', 'Then,', 'After that,', 'Finally,'] },
    ],
    tips: [
      'Use the present simple for routines and habits.',
      "Start each sentence with a different time expression so it doesn't sound repetitive.",
      'Keep the order logical: morning, then afternoon, then evening.',
    ],
  },

  'A1::My Hobby': {
    heading: 'Writing About a Hobby',
    textType: 'Descriptive Paragraph',
    intro: 'This type of writing describes an activity you enjoy in your free time — what it is, when and how often you do it, and why you like it.',
    structure: [
      { step: 'Introduce the hobby', detail: 'Say what your hobby is and how long you have been doing it.' },
      { step: 'Describe the activity', detail: 'Explain what you do, where, and with whom.' },
      { step: 'Say how often', detail: 'Use adverbs of frequency (always, usually, once a week).' },
      { step: 'Give your opinion', detail: 'Explain why you enjoy it and how it makes you feel.' },
    ],
    usefulLanguage: [
      { heading: 'Introducing a hobby', phrases: ['My favourite hobby is...', "I've been interested in... since..."] },
      { heading: 'Frequency', phrases: ['once/twice a week', 'every weekend', 'in my free time'] },
      { heading: 'Giving reasons', phrases: ['I like it because...', 'It makes me feel...'] },
    ],
    tips: [
      'Use the present simple to talk about a regular hobby.',
      'Add one specific example, like a memorable time you did it.',
      'Finish with a short sentence about why it matters to you.',
    ],
  },

  'A1::Essay About My Neighbourhood': {
    heading: 'Writing About Your Neighbourhood',
    textType: 'Descriptive Essay',
    intro: "This essay describes the area where you live — its location, what's around, and what you like or dislike about it.",
    structure: [
      { step: 'Introduction', detail: 'Say where your neighbourhood is and give a general impression.' },
      { step: 'What there is', detail: 'Describe the shops, parks, and places nearby.' },
      { step: 'People and atmosphere', detail: 'Describe the people and what it feels like to live there.' },
      { step: 'Conclusion', detail: 'Say what you like most, or would change, about it.' },
    ],
    usefulLanguage: [
      { heading: 'Location', phrases: ["It's located in...", "It's near / close to..."] },
      { heading: 'Description', phrases: ['There is/are...', "It's a quiet / friendly / busy area."] },
      { heading: 'Opinion', phrases: ['What I like most is...', 'The only problem is...'] },
    ],
    tips: [
      'Organize ideas into clear paragraphs: location, facilities, then opinion.',
      'Use adjectives to make the description vivid.',
      'End with a personal opinion about the area.',
    ],
  },

  'A1::A Description of My House': {
    heading: 'Describing Your House',
    textType: 'Descriptive Paragraph',
    intro: 'This type of writing describes the rooms and layout of a house, usually moving from one area to another in a logical order.',
    structure: [
      { step: 'Introduction', detail: 'Say what kind of house or flat it is and where it is.' },
      { step: 'Ground floor', detail: 'Describe the rooms on the ground floor.' },
      { step: 'Upstairs', detail: 'Describe the bedrooms and bathroom, if there are any.' },
      { step: 'Favourite part', detail: 'Say which room you like best and why.' },
    ],
    usefulLanguage: [
      { heading: 'Location words', phrases: ['Upstairs / Downstairs, there is...', 'Next to the kitchen...'] },
      { heading: 'Description', phrases: ['It has... bedrooms.', 'There is a small / big garden.'] },
      { heading: 'Opinion', phrases: ['My favourite room is... because...'] },
    ],
    tips: [
      'Describe rooms in a logical order, for example downstairs then upstairs.',
      "Use 'there is/there are' for lists of rooms and furniture.",
      'Add a personal comment about your favourite part of the house.',
    ],
  },

  'A1::How to Write a Personal Profile': {
    heading: 'Writing a Personal Profile',
    textType: 'Personal Profile',
    intro: "A personal profile introduces who you are — your name, age, where you're from, and your interests — often used for a website, app, or introduction.",
    structure: [
      { step: 'Basic information', detail: 'Name, age, nationality, and where you live.' },
      { step: 'Work or studies', detail: 'What you do — your job or your studies.' },
      { step: 'Interests', detail: 'Your hobbies and the things you enjoy.' },
      { step: 'A personal detail', detail: 'One interesting or personal fact about you.' },
    ],
    usefulLanguage: [
      { heading: 'Introducing yourself', phrases: ['My name is...', "I'm from...", "I'm... years old."] },
      { heading: 'Talking about interests', phrases: ['In my free time, I...', "I'm interested in..."] },
    ],
    tips: [
      'Keep sentences short and clear.',
      'Use the present simple throughout.',
      'Organize information from general (name/age) to specific (interests).',
    ],
  },

  'A1::How to Write an Invitation': {
    heading: 'Writing an Invitation',
    textType: 'Informal Invitation',
    intro: 'An invitation tells someone about an event and asks them to come — it needs to give all the practical details clearly.',
    structure: [
      { step: 'Greeting', detail: 'Start with "Hi/Dear [Name],".' },
      { step: 'The event', detail: 'Say what the event is, and when and where it is.' },
      { step: 'Extra details', detail: 'Mention things like what to bring, or what to wear.' },
      { step: 'Ask them to reply', detail: 'Ask them to let you know if they can come (RSVP).' },
    ],
    usefulLanguage: [
      { heading: 'Announcing the event', phrases: ["I'm having a... party.", "I'd like to invite you to..."] },
      { heading: 'Giving details', phrases: ['It starts at... on...', 'It would be great if you could bring...'] },
      { heading: 'Asking for a reply', phrases: ['Please let me know if you can come.', 'Hope to see you there!'] },
    ],
    tips: [
      "Include the key details: what, when, where, and who.",
      'Keep the tone friendly and enthusiastic.',
      'Always ask for a reply at the end.',
    ],
  },

  'A1::Describing a Photograph': {
    heading: 'Describing a Photograph',
    textType: 'Descriptive Paragraph',
    intro: 'This type of writing describes what is happening in a picture — the people, the place, and the atmosphere.',
    structure: [
      { step: 'General view', detail: 'Say what the photo shows in general.' },
      { step: 'Foreground', detail: 'Describe what or who is in the front of the photo.' },
      { step: 'Background', detail: 'Describe what is behind or around them.' },
      { step: 'Atmosphere', detail: 'Say how the photo makes you feel.' },
    ],
    usefulLanguage: [
      { heading: 'Describing position', phrases: ['In the foreground / background...', 'On the left / right...'] },
      { heading: 'Describing people', phrases: ['He/She is wearing...', 'They look happy / tired.'] },
    ],
    tips: [
      'Use the present continuous for actions happening in the photo (he is smiling).',
      'Move systematically from foreground to background.',
      'Finish with your impression of the photo.',
    ],
  },

  'A1::Writing an Email Giving Instructions': {
    heading: 'Writing an Email with Instructions',
    textType: 'Informal Email',
    intro: 'This type of email explains to someone, step by step, how to do something — for example, how to get somewhere or how to use something.',
    structure: [
      { step: 'Greeting', detail: 'Start with "Hi [Name],".' },
      { step: 'Introduce the task', detail: 'Say what you are explaining how to do.' },
      { step: 'Step-by-step instructions', detail: 'List the steps in order, using sequencing words.' },
      { step: 'Closing', detail: 'Offer more help if needed, and sign off.' },
    ],
    usefulLanguage: [
      { heading: 'Sequencing', phrases: ['First,', 'Next,', 'After that,', 'Finally,'] },
      { heading: 'Giving instructions', phrases: ['You need to...', 'Make sure you...', "Don't forget to..."] },
    ],
    tips: [
      'Use the imperative for instructions, e.g. turn left, press the button.',
      'Number or order the steps clearly.',
      'Keep sentences short and easy to follow.',
    ],
  },

  'A1::Writing About My Family': {
    heading: 'Writing About Your Family',
    textType: 'Descriptive Paragraph',
    intro: 'This type of writing introduces the members of your family, describing who they are, what they look like, and what they do.',
    structure: [
      { step: 'Introduction', detail: 'Say how many people are in your family.' },
      { step: 'Describe each person', detail: 'Name, age, appearance, and job/school for each family member.' },
      { step: 'Personality and likes', detail: 'Say something about their personality or what they enjoy.' },
      { step: 'Conclusion', detail: 'A short closing comment about your family.' },
    ],
    usefulLanguage: [
      { heading: 'Introducing family members', phrases: ['My... is called...', 'There are... people in my family.'] },
      { heading: 'Describing appearance', phrases: ["He/She has got... hair and... eyes."] },
      { heading: 'Describing personality', phrases: ["He/She is very...", 'He/She loves...'] },
    ],
    tips: [
      "Use 'have got' or 'has got' for physical descriptions.",
      'Describe one family member per sentence or two, to stay organized.',
      'Use possessive adjectives correctly: my, his, her, their.',
    ],
  },

  'A1::My Weekend Plans': {
    heading: 'Writing About Weekend Plans',
    textType: 'Informal Paragraph',
    intro: 'This type of writing talks about what you are going to do in the near future, usually your plans for the weekend.',
    structure: [
      { step: 'Introduction', detail: 'Say generally what kind of weekend you are expecting.' },
      { step: 'Saturday plans', detail: 'Describe what you are doing on Saturday.' },
      { step: 'Sunday plans', detail: 'Describe what you are doing on Sunday.' },
      { step: 'Feelings', detail: 'Say how you feel about your plans.' },
    ],
    usefulLanguage: [
      { heading: 'Talking about plans', phrases: ["I'm going to...", "I'm meeting... on Saturday."] },
      { heading: 'Time expressions', phrases: ['On Saturday morning,', 'In the afternoon,', 'Later that day,'] },
    ],
    tips: [
      "Use 'going to' or the present continuous for fixed plans.",
      'Organize your ideas by day: Saturday, then Sunday.',
      'End with how you feel about the weekend ahead.',
    ],
  },

  'A2::My Favourite Photograph': {
    heading: 'Describing Your Favourite Photograph',
    textType: 'Descriptive Paragraph',
    intro: 'This type of writing describes a photograph that is special to you — what it shows, the story behind it, and why you love it.',
    structure: [
      { step: 'Introduction', detail: 'Say what the photo shows and when/where it was taken.' },
      { step: 'Description', detail: 'Describe the people, the place, and what they are doing.' },
      { step: 'Background story', detail: 'Explain the occasion or memory behind the photo.' },
      { step: 'Why it matters', detail: 'Say why this photograph is your favourite.' },
    ],
    usefulLanguage: [
      { heading: 'Setting the scene', phrases: ['This photo was taken in/at...', 'It shows...'] },
      { heading: 'Describing actions', phrases: ['In the photo, everyone is + verb-ing', 'You can see...'] },
      { heading: 'Explaining importance', phrases: ['This photo means a lot to me because...', 'It reminds me of...'] },
    ],
    tips: [
      'Use the past simple to say when and where the photo was taken.',
      'Use the present continuous to describe what is happening in the photo now.',
      'Finish with a personal reason why the photo is special.',
    ],
  },

  'A2::Writing and Responding to an Informal Email Invitation': {
    heading: 'Responding to an Informal Invitation',
    textType: 'Informal Email',
    intro: 'This type of email accepts or declines an invitation from a friend, giving a reason and suggesting an alternative if needed.',
    structure: [
      { step: 'Greeting', detail: 'Thank them for the invitation.' },
      { step: 'Accept or decline', detail: 'Say clearly whether you can come or not.' },
      { step: 'Give a reason', detail: 'If declining, explain why; if accepting, add an extra detail.' },
      { step: 'Closing', detail: 'Suggest meeting another time if declining, then sign off warmly.' },
    ],
    usefulLanguage: [
      { heading: 'Thanking', phrases: ['Thanks for inviting me to...'] },
      { heading: 'Accepting', phrases: ["I'd love to come!", 'Count me in.'] },
      { heading: 'Declining', phrases: ["I'm afraid I can't make it because...", "Sorry, I'll have to miss it."] },
    ],
    tips: [
      'Always thank the person for the invitation first.',
      'Give a clear yes or no early in the email.',
      "If you can't come, suggest an alternative plan.",
    ],
  },

  'A2::My Last Holiday': {
    heading: 'Writing About Your Last Holiday',
    textType: 'Narrative Paragraph',
    intro: 'This type of writing describes a past trip, in the order events happened, using the past simple.',
    structure: [
      { step: 'Introduction', detail: 'Say where you went, when, and with whom.' },
      { step: 'What you did', detail: 'Describe the main activities, in the order they happened.' },
      { step: 'A highlight', detail: 'Describe your favourite moment in more detail.' },
      { step: 'Conclusion', detail: 'Say how you felt about the holiday overall.' },
    ],
    usefulLanguage: [
      { heading: 'Starting a story', phrases: ['Last summer, I went to...', 'Two months ago,...'] },
      { heading: 'Sequencing', phrases: ['On the first day,', 'Later that week,', 'In the end,'] },
      { heading: 'Giving opinions', phrases: ['It was an amazing experience.', 'I really enjoyed...'] },
    ],
    tips: [
      'Use the past simple for completed actions.',
      'Use time expressions to link events in order.',
      'Add adjectives to make the description more interesting.',
    ],
  },

  "A2::Writing an Essay About Someone's Job": {
    heading: "Writing About Someone's Job",
    textType: 'Descriptive Essay',
    intro: "This essay describes what a person's job involves — their daily tasks, the skills it needs, and what they think about it.",
    structure: [
      { step: 'Introduction', detail: 'Say who the person is and what their job is.' },
      { step: 'Daily tasks', detail: 'Describe what they do during a typical working day.' },
      { step: 'Skills and qualities', detail: 'Mention the skills or qualities needed for the job.' },
      { step: 'Opinion', detail: 'Say what they like, or dislike, about the job.' },
    ],
    usefulLanguage: [
      { heading: 'Introducing the job', phrases: ['... works as a...', '... has been a... for... years.'] },
      { heading: 'Describing tasks', phrases: ['A typical day involves...', 'Every day, he/she...'] },
      { heading: 'Skills', phrases: ['You need to be... to do this job.', 'It requires...'] },
    ],
    tips: [
      "Use the present simple to describe a person's current job and routine.",
      'Organize the essay by task, then skills, then opinion.',
      'Include one specific detail to make it feel personal.',
    ],
  },

  'A2::Writing a Postcard': {
    heading: 'Writing a Postcard',
    textType: 'Informal Postcard',
    intro: "A postcard is a very short, informal message sent while on holiday, describing where you are and what you're doing.",
    structure: [
      { step: 'Greeting', detail: 'Start with "Dear [Name]," or "Hi [Name],".' },
      { step: 'Where you are', detail: 'Say where you are and what it is like.' },
      { step: 'What you are doing', detail: 'Mention one or two activities or highlights.' },
      { step: 'Closing', detail: 'A short friendly closing line and sign-off.' },
    ],
    usefulLanguage: [
      { heading: 'Describing the place', phrases: ['The weather is...', 'The scenery is...'] },
      { heading: 'Describing activities', phrases: ["I've been...", 'Yesterday we...'] },
      { heading: 'Closing', phrases: ['Wish you were here!', 'See you soon!'] },
    ],
    tips: [
      'Keep it very short — a postcard has limited space.',
      "Use the present perfect continuous ('I've been...') for a general holiday update.",
      'Be positive and enthusiastic in tone.',
    ],
  },

  'A2::How to Write an Application Letter for a Summer Job': {
    heading: 'Writing a Job Application Letter',
    textType: 'Formal Letter',
    intro: 'This letter applies for a job, explaining your interest, relevant experience, and availability, in a polite and organized way.',
    structure: [
      { step: 'Greeting', detail: '"Dear Sir/Madam," or "Dear Mr/Ms [Surname],".' },
      { step: 'Opening', detail: 'Say which job you are applying for and where you saw it advertised.' },
      { step: 'Your suitability', detail: 'Mention relevant skills, experience, or personal qualities.' },
      { step: 'Availability', detail: 'Say when you are available to start work.' },
      { step: 'Closing', detail: 'Thank them and say you look forward to hearing from them.' },
    ],
    usefulLanguage: [
      { heading: 'Opening', phrases: ['I am writing to apply for the position of...', 'I saw your advertisement in...'] },
      { heading: 'Showing suitability', phrases: ['I have experience in...', 'I am a hard-working and reliable person.'] },
      { heading: 'Closing', phrases: ['I look forward to hearing from you.', 'Yours faithfully,'] },
    ],
    tips: [
      'Keep a polite, formal tone throughout — avoid contractions.',
      'Mention specific skills that match the job.',
      "End with 'Yours faithfully,' if you don't know the person's name.",
    ],
  },

  'A2::How to Write an Email to Book a Hotel Room': {
    heading: 'Booking a Hotel Room by Email',
    textType: 'Formal Email',
    intro: 'This email requests a hotel reservation, giving all the necessary details and asking any questions about the stay.',
    structure: [
      { step: 'Greeting', detail: '"Dear Sir/Madam," if you don\'t know the name.' },
      { step: 'The request', detail: 'State the dates, number of guests, and room type you need.' },
      { step: 'Questions', detail: 'Ask anything you need to know, e.g. about breakfast, parking, or price.' },
      { step: 'Closing', detail: 'Ask them to confirm the booking and thank them.' },
    ],
    usefulLanguage: [
      { heading: 'Making a request', phrases: ['I would like to book a room for...', 'I am writing to enquire about availability...'] },
      { heading: 'Asking questions', phrases: ['Could you tell me whether...', 'I would also like to know...'] },
      { heading: 'Closing', phrases: ['I look forward to your confirmation.', 'Yours faithfully,'] },
    ],
    tips: [
      'State the exact dates and number of people clearly.',
      'Use polite question forms, e.g. "Could you tell me...?".',
      'Keep the email organized: the request first, then any questions.',
    ],
  },

  'A2::How to Write an Opinion Essay': {
    heading: 'Writing an Opinion Essay',
    textType: 'Opinion Essay',
    intro: 'This essay presents and supports your personal opinion about a topic, using clear reasons and examples.',
    structure: [
      { step: 'Introduction', detail: 'Introduce the topic and state your opinion clearly.' },
      { step: 'Reason 1', detail: 'Give your first reason, with an example.' },
      { step: 'Reason 2', detail: 'Give your second reason, with an example.' },
      { step: 'Conclusion', detail: 'Restate your opinion in different words.' },
    ],
    usefulLanguage: [
      { heading: 'Giving your opinion', phrases: ['In my opinion,', 'I think that...'] },
      { heading: 'Adding reasons', phrases: ['Firstly,', 'Also,', 'Another reason is...'] },
      { heading: 'Concluding', phrases: ['In conclusion,', 'For these reasons,...'] },
    ],
    tips: [
      'State your opinion clearly in the introduction.',
      'Support each reason with a short example.',
      'Use linking words to connect your ideas.',
    ],
  },

  'A2::A Thank-You Email': {
    heading: 'Writing a Thank-You Email',
    textType: 'Informal Email',
    intro: 'This email thanks someone for something they did — a gift, help, or hospitality — in a warm and sincere way.',
    structure: [
      { step: 'Greeting', detail: '"Hi [Name],".' },
      { step: 'The thanks', detail: 'Say clearly what you are thanking them for.' },
      { step: 'Why it mattered', detail: 'Explain why you appreciated it, or how you used or enjoyed it.' },
      { step: 'Closing', detail: 'A warm closing line and sign-off.' },
    ],
    usefulLanguage: [
      { heading: 'Thanking', phrases: ['Thank you so much for...', 'I really appreciate...'] },
      { heading: 'Explaining why', phrases: ['It meant a lot to me because...', "I've already..."] },
      { heading: 'Closing', phrases: ['Thanks again!', 'Speak soon,'] },
    ],
    tips: [
      'Say thank you in the very first sentence.',
      'Be specific about what you are thankful for.',
      'Keep the tone warm and genuine.',
    ],
  },

  'A2::A Biography of Someone You Know': {
    heading: 'Writing a Short Biography',
    textType: 'Biography',
    intro: "A biography tells the story of someone's life — where they were born, key events, and what they are doing now.",
    structure: [
      { step: 'Introduction', detail: 'Say who the person is and why they are interesting.' },
      { step: 'Early life', detail: 'Where and when they were born, and their background.' },
      { step: 'Key events', detail: 'Important achievements or events in their life, in order.' },
      { step: 'Conclusion', detail: 'What they are doing now, or their situation today.' },
    ],
    usefulLanguage: [
      { heading: 'Starting a biography', phrases: ['... was born in...', '... grew up in...'] },
      { heading: 'Sequencing events', phrases: ['After that,', 'A few years later,', 'Eventually,'] },
      { heading: 'Describing the present', phrases: ['Today, he/she...', 'He/She is currently...'] },
    ],
    tips: [
      "Use the past simple for past events and the present simple for the person's life now.",
      'Put events in chronological order.',
      'Focus on the most interesting or important facts.',
    ],
  },

  'B1::Writing an Opinion Essay': {
    heading: 'Writing an Opinion Essay',
    textType: 'Opinion Essay',
    intro: 'At this level, an opinion essay should present your view clearly, support it with developed reasons, and briefly acknowledge another point of view.',
    structure: [
      { step: 'Introduction', detail: 'Introduce the topic and state your opinion.' },
      { step: 'Body paragraph 1', detail: 'Your strongest reason, with an example or explanation.' },
      { step: 'Body paragraph 2', detail: 'A second reason, with support.' },
      { step: 'Counter-argument', detail: 'Briefly mention an opposing view and respond to it.' },
      { step: 'Conclusion', detail: 'Summarize and restate your opinion.' },
    ],
    usefulLanguage: [
      { heading: 'Giving opinions', phrases: ['I strongly believe that...', 'From my point of view,'] },
      { heading: 'Acknowledging other views', phrases: ['Some people argue that...', 'Although it is true that...'] },
      { heading: 'Concluding', phrases: ['Taking everything into account,', 'All things considered,'] },
    ],
    tips: [
      'Develop each reason with an example, not just a list of points.',
      'Use linking words to make your argument flow logically.',
      'Address one counter-argument to make your essay more balanced.',
    ],
  },

  'B1::How to Write an Email to a Friend Giving News': {
    heading: 'Writing an Email Giving News',
    textType: 'Informal Email',
    intro: 'This email shares recent news with a friend, in a friendly and conversational tone.',
    structure: [
      { step: 'Greeting', detail: 'Start informally and ask how they are.' },
      { step: 'Introduce the news', detail: 'Say what has happened, using natural, exciting language.' },
      { step: 'Give details', detail: 'Explain more about the news and how you feel about it.' },
      { step: 'Closing', detail: 'Ask about their news too, and sign off.' },
    ],
    usefulLanguage: [
      { heading: 'Introducing news', phrases: ['Guess what?', "I've got some news for you.", "You'll never believe what happened!"] },
      { heading: 'Reacting / feelings', phrases: ['I was so excited/surprised when...', "I couldn't believe it!"] },
      { heading: 'Closing', phrases: ['Anyway, write back and tell me your news!', 'Take care,'] },
    ],
    tips: [
      'Use an informal, enthusiastic tone, with exclamation marks where appropriate.',
      'Use the past simple and past continuous to narrate what happened.',
      'Show interest in the reader by asking a question back.',
    ],
  },

  'B1::How to Write a Past Story from a Given Sentence': {
    heading: 'Writing a Past Story',
    textType: 'Narrative Story',
    intro: 'This type of writing turns a given sentence into a short, complete story, using a range of past tenses to show the order of events.',
    structure: [
      { step: 'Setting the scene', detail: 'Introduce the time, place, and characters, often using the past continuous.' },
      { step: 'The problem or event', detail: 'Introduce the main event or complication.' },
      { step: 'What happened next', detail: 'Develop the action in a logical sequence.' },
      { step: 'Ending', detail: 'Resolve the story and say how it ended.' },
    ],
    usefulLanguage: [
      { heading: 'Setting the scene', phrases: ['One day,', 'It was a sunny afternoon when...'] },
      { heading: 'Sequencing', phrases: ['Suddenly,', 'Just then,', 'Eventually,'] },
      { heading: 'Background / earlier events', phrases: ['She had already...', 'He realized that...'] },
    ],
    tips: [
      'Combine past simple (events), past continuous (background), and past perfect (earlier events).',
      'Give the story a clear beginning, middle, and end.',
      'Use the given sentence naturally within the story, not just at the start.',
    ],
  },

  'B1::How to Write a Hotel Review After a Stay': {
    heading: 'Writing a Hotel Review',
    textType: 'Review',
    intro: 'A hotel review shares your experience of a stay, describing the facilities, service, and whether you would recommend it.',
    structure: [
      { step: 'Introduction', detail: 'Name the hotel and give your overall impression.' },
      { step: 'Facilities and rooms', detail: 'Describe the room, facilities, and location.' },
      { step: 'Service and staff', detail: 'Comment on the staff and the service you received.' },
      { step: 'Recommendation', detail: 'Say whether you would recommend it, and to whom.' },
    ],
    usefulLanguage: [
      { heading: 'Introducing', phrases: ['I recently stayed at...', 'I spent... nights at...'] },
      { heading: 'Positive comments', phrases: ['One of the best things was...', 'The staff were extremely helpful.'] },
      { heading: 'Negative comments', phrases: ['On the downside,', 'Unfortunately,...'] },
      { heading: 'Recommending', phrases: ['I would definitely recommend this hotel to...', 'Overall, I would give it... out of 5.'] },
    ],
    tips: [
      'Balance positive and negative points for a fair review.',
      'Use specific details (the room, the view, breakfast) to sound authentic.',
      'End with a clear recommendation.',
    ],
  },

  'B1::How to Write an Article': {
    heading: 'Writing a Magazine Article',
    textType: 'Article',
    intro: 'An article informs or entertains readers about a topic, using an engaging title and a friendly, informative style.',
    structure: [
      { step: 'Title', detail: 'Choose a catchy, relevant title.' },
      { step: 'Introduction', detail: 'Grab attention with a question, fact, or anecdote.' },
      { step: 'Main body', detail: 'Develop the topic in clear paragraphs, each with one main idea.' },
      { step: 'Conclusion', detail: 'End with a comment, opinion, or call to action.' },
    ],
    usefulLanguage: [
      { heading: 'Grabbing attention', phrases: ['Have you ever...?', 'Imagine...'] },
      { heading: 'Engaging the reader', phrases: ['You might be surprised to learn that...', 'As you probably know,'] },
      { heading: 'Concluding', phrases: ['So, next time you..., remember...', 'All in all,'] },
    ],
    tips: [
      'Use a friendly, conversational tone and address the reader directly (you).',
      'Use a catchy title, and maybe subheadings, to organize the article.',
      'Vary sentence length to keep the reader interested.',
    ],
  },

  'B1::Email Making Plans for a Visit': {
    heading: 'Writing an Email Making Plans',
    textType: 'Informal Email',
    intro: 'This email arranges the details of a visit with a friend — when, where, and what you will do together.',
    structure: [
      { step: 'Greeting', detail: 'Start informally and mention the upcoming visit.' },
      { step: 'Suggest plans', detail: 'Suggest dates, activities, or places to go.' },
      { step: 'Ask for their input', detail: 'Ask what they would like to do, or if the plan works for them.' },
      { step: 'Closing', detail: "Confirm you're looking forward to it, and sign off." },
    ],
    usefulLanguage: [
      { heading: 'Suggesting', phrases: ["Why don't we...?", 'How about...?', 'I thought we could...'] },
      { heading: 'Asking for opinions', phrases: ['What do you think?', 'Does that sound good to you?'] },
      { heading: 'Closing', phrases: ["I can't wait to see you!", 'Let me know what you think.'] },
    ],
    tips: [
      'Make clear, specific suggestions, such as dates and places, rather than vague ones.',
      'Ask questions to involve the reader in the planning.',
      'Keep the tone friendly and flexible.',
    ],
  },

  'B1::How to Write an Email Cover Letter': {
    heading: 'Writing an Email Cover Letter',
    textType: 'Formal Email',
    intro: 'A cover letter is sent with a CV to apply for a job, briefly explaining why you are a good candidate.',
    structure: [
      { step: 'Greeting', detail: '"Dear Mr/Ms [Surname]," or "Dear Sir/Madam,".' },
      { step: 'Opening', detail: 'Say which position you are applying for.' },
      { step: 'Your qualifications', detail: 'Briefly highlight your relevant skills and experience.' },
      { step: 'Closing', detail: 'Refer to your attached CV and say you look forward to hearing from them.' },
    ],
    usefulLanguage: [
      { heading: 'Opening', phrases: ['I am writing to apply for...', 'Please find attached my CV for...'] },
      { heading: 'Highlighting skills', phrases: ['I have... years of experience in...', 'I believe I would be a good fit because...'] },
      { heading: 'Closing', phrases: ['I look forward to hearing from you.', 'Yours sincerely,'] },
    ],
    tips: [
      'Keep it short — a cover letter should be brief and to the point.',
      'Match your skills directly to the job requirements.',
      'Use a formal, professional tone throughout.',
    ],
  },

  'B1::A Product Review': {
    heading: 'Writing a Product Review',
    textType: 'Review',
    intro: 'A product review describes an item you have used, its features, and whether you would recommend it to others.',
    structure: [
      { step: 'Introduction', detail: 'Name the product and say why you bought it.' },
      { step: 'Description', detail: 'Describe its main features and what it is used for.' },
      { step: 'Pros and cons', detail: "Explain what you liked and didn't like about it." },
      { step: 'Recommendation', detail: 'Say if you would recommend it and to whom.' },
    ],
    usefulLanguage: [
      { heading: 'Introducing the product', phrases: ['I bought this... a few months ago.', 'I decided to try...'] },
      { heading: 'Positive points', phrases: ['What I like most about it is...', 'It works really well.'] },
      { heading: 'Negative points', phrases: ['The only downside is...', 'It could be improved by...'] },
      { heading: 'Recommending', phrases: ["I'd definitely recommend this to...", "I'd give it... stars out of 5."] },
    ],
    tips: [
      'Describe both good and bad points for a balanced review.',
      'Use specific examples of how you used the product.',
      'End with a clear star rating or recommendation.',
    ],
  },

  'B1::Describing Your Home': {
    heading: 'Describing Your Home',
    textType: 'Descriptive Paragraph',
    intro: 'This type of writing gives a detailed, well-organized description of your home, including its atmosphere and what makes it special.',
    structure: [
      { step: 'General impression', detail: 'Say what type of home it is and give a general impression.' },
      { step: 'Room by room', detail: 'Describe the main rooms, moving logically through the space.' },
      { step: 'Atmosphere', detail: 'Describe the atmosphere or feeling of the home.' },
      { step: 'Personal connection', detail: 'Explain what makes it special to you.' },
    ],
    usefulLanguage: [
      { heading: 'Describing layout', phrases: ['As you walk in,', 'To the left/right of the hallway,'] },
      { heading: 'Describing atmosphere', phrases: ['It has a cosy/warm/spacious feel.', 'It always feels...'] },
      { heading: 'Personal connection', phrases: ['What makes it special is...', "I've always loved..."] },
    ],
    tips: [
      'Guide the reader through the space in a logical order, as if walking through it.',
      "Use a range of descriptive adjectives, not just 'nice' or 'big'.",
      'Add a personal, emotional detail at the end.',
    ],
  },

  'B1+::A For and Against Essay – A Balanced Essay': {
    heading: 'Writing a For and Against Essay',
    textType: 'For and Against Essay',
    intro: 'This essay presents both sides of an argument in a balanced, neutral way, before giving a personal conclusion.',
    structure: [
      { step: 'Introduction', detail: 'Introduce the topic neutrally, without giving your opinion yet.' },
      { step: 'Arguments for', detail: 'Present the main arguments in favour, one per paragraph.' },
      { step: 'Arguments against', detail: 'Present the main arguments against, one per paragraph.' },
      { step: 'Conclusion', detail: 'Give your own opinion, based on the arguments presented.' },
    ],
    usefulLanguage: [
      { heading: 'Arguments for', phrases: ['One argument in favour of... is that', 'Supporters of... claim that'] },
      { heading: 'Arguments against', phrases: ['On the other hand,', 'Critics argue that'] },
      { heading: 'Concluding', phrases: ['Having considered both sides,', 'On balance, I believe...'] },
    ],
    tips: [
      "Keep your own opinion out of the 'for' and 'against' sections.",
      'Use a new paragraph for each argument.',
      'Give a clear personal opinion only in the conclusion.',
    ],
  },

  'B1+::Giving Your Opinion': {
    heading: 'Giving Your Opinion',
    textType: 'Opinion Paragraph',
    intro: 'This type of writing clearly expresses and justifies your point of view on a given topic.',
    structure: [
      { step: 'State your opinion', detail: 'Say clearly what you think, right at the start.' },
      { step: 'Reason 1', detail: 'Explain your first reason with an example.' },
      { step: 'Reason 2', detail: 'Explain a second reason with an example.' },
      { step: 'Conclusion', detail: 'Sum up your view in a final sentence.' },
    ],
    usefulLanguage: [
      { heading: 'Stating opinion', phrases: ['Personally, I feel that...', 'As far as I am concerned,'] },
      { heading: 'Supporting it', phrases: ['This is mainly because...', 'A good example of this is...'] },
      { heading: 'Concluding', phrases: ['To sum up,', 'Overall,'] },
    ],
    tips: [
      'Be direct — state your opinion clearly rather than hinting at it.',
      'Support opinions with real examples, not just general statements.',
      'Keep the paragraph focused on one central idea.',
    ],
  },

  'B1+::A Book Review': {
    heading: 'Writing a Book Review',
    textType: 'Review',
    intro: 'A book review gives your opinion of a book you have read, summarizing the plot without giving away the ending.',
    structure: [
      { step: 'Introduction', detail: 'Give the title, author, and genre of the book.' },
      { step: 'Plot summary', detail: 'Briefly summarize the story, without spoiling the ending.' },
      { step: 'Your opinion', detail: 'Say what you liked or disliked about the characters, plot, or style.' },
      { step: 'Recommendation', detail: 'Say who you would recommend the book to.' },
    ],
    usefulLanguage: [
      { heading: 'Introducing', phrases: ['... is a... novel written by...'] },
      { heading: 'Summarizing without spoiling', phrases: ['The story follows...', 'Without giving too much away,'] },
      { heading: 'Opinion', phrases: ['What makes this book stand out is...', 'I found the ending a little...'] },
      { heading: 'Recommending', phrases: ['I would recommend this book to anyone who enjoys...'] },
    ],
    tips: [
      'Never reveal the ending or major plot twists.',
      'Comment on both the story and the writing style.',
      'End with a clear recommendation for a specific type of reader.',
    ],
  },

  'B1+::Informal Email Responding to News': {
    heading: 'Responding to News by Email',
    textType: 'Informal Email',
    intro: 'This email reacts to news your friend has told you — good or bad — showing genuine interest and support.',
    structure: [
      { step: 'React to the news', detail: 'Respond immediately with an appropriate reaction.' },
      { step: 'Ask follow-up questions', detail: 'Show interest by asking for more details.' },
      { step: 'Offer support or congratulations', detail: 'Depending on the news, offer help or congratulate them.' },
      { step: 'Closing', detail: 'End warmly and offer to talk more soon.' },
    ],
    usefulLanguage: [
      { heading: 'Reacting to good news', phrases: ["That's fantastic news!", "I'm so happy for you!"] },
      { heading: 'Reacting to bad news', phrases: ["I'm so sorry to hear that.", 'That must be really difficult.'] },
      { heading: 'Following up', phrases: ['How are you feeling about it?', 'What happens next?'] },
    ],
    tips: [
      'Match your tone to the type of news — celebratory or sympathetic.',
      'Ask genuine follow-up questions to show you care.',
      "Avoid jumping straight to your own news — focus on theirs first.",
    ],
  },

  "B1+::Writing a 'How-To' Article for a Blog or Magazine": {
    heading: "Writing a 'How-To' Article",
    textType: 'How-To Article',
    intro: 'A how-to article explains, step by step, how to do or achieve something, in a clear and engaging way.',
    structure: [
      { step: 'Title and introduction', detail: 'A clear title and a short introduction explaining what readers will learn.' },
      { step: 'Steps', detail: 'Present the process in a logical order, often with subheadings or numbers.' },
      { step: 'Tips', detail: 'Add useful tips or common mistakes to avoid.' },
      { step: 'Conclusion', detail: 'A short closing encouraging the reader to try it themselves.' },
    ],
    usefulLanguage: [
      { heading: 'Introducing the topic', phrases: ['Ever wondered how to...?', "In this article, you'll learn..."] },
      { heading: 'Giving steps', phrases: ['Start by...', "Once you've done that,", 'The next step is to...'] },
      { heading: 'Giving tips', phrases: ['A useful tip is to...', 'Try to avoid...'] },
    ],
    tips: [
      'Number or clearly separate each step.',
      'Use imperatives for instructions, e.g. start, add, mix.',
      'Keep an encouraging, friendly tone throughout.',
    ],
  },

  "B1+::How to Write an Apology Email - Saying Sorry to Your Friend": {
    heading: 'Writing an Apology Email to a Friend',
    textType: 'Informal Email',
    intro: "This email apologizes to a friend for something you did or didn't do, explaining what happened and making things right.",
    structure: [
      { step: 'Apologize immediately', detail: 'Start by clearly saying sorry.' },
      { step: 'Explain what happened', detail: 'Give a brief, honest explanation, without making excuses.' },
      { step: 'Make it right', detail: 'Say what you will do to fix the situation.' },
      { step: 'Closing', detail: 'Apologize again and express hope that things are okay.' },
    ],
    usefulLanguage: [
      { heading: 'Apologizing', phrases: ["I'm really sorry that...", 'I feel terrible about...'] },
      { heading: 'Explaining', phrases: ['What happened was...', "I honestly didn't mean to..."] },
      { heading: 'Making it right', phrases: ["I promise I'll...", 'Let me make it up to you by...'] },
    ],
    tips: [
      "Apologize early and sincerely — don't bury it in the email.",
      'Take responsibility rather than blaming others.',
      'Suggest a specific way to make things better.',
    ],
  },

  'B1+::Narrative Writing Step by Step': {
    heading: 'Narrative Writing Step by Step',
    textType: 'Narrative Story',
    intro: 'This guide breaks down how to plan and write an engaging short story, from the opening line to the ending.',
    structure: [
      { step: 'Plan the story', detail: 'Decide on the characters, setting, and main event before writing.' },
      { step: 'Write an engaging opening', detail: 'Start with an interesting line to hook the reader.' },
      { step: 'Build the action', detail: 'Develop events with tension, using a variety of past tenses.' },
      { step: 'End memorably', detail: 'Finish with a satisfying or surprising conclusion.' },
    ],
    usefulLanguage: [
      { heading: 'Engaging openings', phrases: ['Little did I know that...', 'It was the kind of day when...'] },
      { heading: 'Building tension', phrases: ['Without warning,', 'My heart was racing as...'] },
      { heading: 'Concluding', phrases: ['Looking back,', 'From that day on,'] },
    ],
    tips: [
      'Plan your story before writing to keep it focused.',
      'Show feelings and reactions, not just events.',
      'Avoid a rushed ending — give it a proper conclusion.',
    ],
  },

  'B1+::An Informal Email – Asking for and Giving Advice': {
    heading: 'Asking for and Giving Advice by Email',
    textType: 'Informal Email',
    intro: 'This email either asks a friend for advice about a problem, or replies with helpful suggestions.',
    structure: [
      { step: 'Explain the situation', detail: 'Describe the problem or situation clearly.' },
      { step: 'Ask for or give advice', detail: 'Ask what they think you should do, or suggest possible solutions.' },
      { step: 'Give reasons', detail: 'Explain why a particular option might be best.' },
      { step: 'Closing', detail: 'Thank them for listening, or wish them luck, and sign off.' },
    ],
    usefulLanguage: [
      { heading: 'Asking for advice', phrases: ['What do you think I should do?', "I don't know what to do about..."] },
      { heading: 'Giving advice', phrases: ['If I were you, I would...', "Why don't you try...?"] },
      { heading: 'Closing', phrases: ['Let me know how it goes.', 'Thanks for listening.'] },
    ],
    tips: [
      'Describe the problem clearly before asking for or giving advice.',
      'Use modal verbs (should, could, might) to soften advice.',
      'Give a reason for each suggestion you make.',
    ],
  },

  'B1+::Describing a Photo': {
    heading: 'Describing a Photo',
    textType: 'Descriptive Paragraph',
    intro: 'At this level, describing a photo means going beyond simple facts to speculate about the situation and context.',
    structure: [
      { step: 'General description', detail: 'Say what the photo shows overall.' },
      { step: 'Details', detail: 'Describe specific people, objects, and their positions.' },
      { step: 'Speculation', detail: 'Guess what is happening, or what might happen next.' },
      { step: 'Impression', detail: 'Give your overall impression or feeling about the photo.' },
    ],
    usefulLanguage: [
      { heading: 'Describing', phrases: ['In the picture, I can see...', 'It appears to be...'] },
      { heading: 'Speculating', phrases: ['It looks like...', 'They might be...', 'Perhaps...'] },
      { heading: 'Giving an impression', phrases: ['The photo gives a sense of...', 'Overall, it conveys...'] },
    ],
    tips: [
      'Use modal verbs (might, could, may) for speculation.',
      'Move from general description to more specific speculation.',
      'Avoid just listing objects — comment on the mood or story too.',
    ],
  },

  'B2::Writing a Discussion Essay: Discuss Two Views and Give Your Opinion': {
    heading: 'Writing a Discussion Essay',
    textType: 'Discussion Essay',
    intro: 'This essay discusses two different viewpoints on an issue in a balanced way, before giving your own opinion in the conclusion.',
    structure: [
      { step: 'Introduction', detail: 'Introduce the issue and mention that there are differing views.' },
      { step: 'View 1', detail: 'Present the first viewpoint with supporting reasons.' },
      { step: 'View 2', detail: 'Present the second, contrasting viewpoint with supporting reasons.' },
      { step: 'Your opinion', detail: 'State and justify your own opinion.' },
      { step: 'Conclusion', detail: 'Summarize the discussion and restate your view.' },
    ],
    usefulLanguage: [
      { heading: 'Presenting a view', phrases: ['It is often said that...', 'Advocates of this view argue that...'] },
      { heading: 'Contrasting views', phrases: ['However, others believe that...', 'A contrasting view is that...'] },
      { heading: 'Giving your opinion', phrases: ['Having weighed up both sides, I believe...'] },
    ],
    tips: [
      'Present both views fairly, using neutral language.',
      'Save your personal opinion mainly for the final section.',
      'Use formal linking words to structure the discussion clearly.',
    ],
  },

  'B2::Writing Formal Letter of Complaint': {
    heading: 'Writing a Formal Letter of Complaint',
    textType: 'Formal Letter',
    intro: 'This letter complains about a poor product or service, explaining the problem clearly and requesting a solution.',
    structure: [
      { step: 'Greeting', detail: '"Dear Sir/Madam," or the relevant name.' },
      { step: 'State the problem', detail: 'Explain clearly what went wrong and when.' },
      { step: 'Give details', detail: 'Add specific details or evidence, and how it affected you.' },
      { step: 'Request action', detail: 'State exactly what you want done, e.g. a refund, replacement, or apology.' },
      { step: 'Closing', detail: 'A firm but polite closing, expecting a response.' },
    ],
    usefulLanguage: [
      { heading: 'Stating the problem', phrases: ['I am writing to complain about...', 'I was extremely disappointed to find that...'] },
      { heading: 'Adding details', phrases: ['To make matters worse,', 'Furthermore,'] },
      { heading: 'Requesting action', phrases: ['I would like to request a full refund.', 'I trust you will resolve this matter promptly.'] },
    ],
    tips: [
      'Stay polite and formal, even though you are complaining.',
      'Be specific: dates, order numbers, exactly what went wrong.',
      'State clearly what outcome you expect.',
    ],
  },

  'B2::Formal Email or Letter Asking for Information': {
    heading: 'Asking for Information',
    textType: 'Formal Email/Letter',
    intro: 'This letter or email requests specific information from a company or organization, in a clear and polite way.',
    structure: [
      { step: 'Greeting', detail: '"Dear Sir/Madam," if the name is unknown.' },
      { step: 'State your purpose', detail: 'Say why you are writing and where you saw the information or advert.' },
      { step: 'Ask your questions', detail: 'List your questions clearly, perhaps as separate points.' },
      { step: 'Closing', detail: 'Thank them in advance and ask for a prompt reply.' },
    ],
    usefulLanguage: [
      { heading: 'Stating purpose', phrases: ['I am writing to enquire about...', 'I would like some further information regarding...'] },
      { heading: 'Asking questions', phrases: ['Could you please tell me...?', 'I would also be grateful if you could confirm...'] },
      { heading: 'Closing', phrases: ['I look forward to your reply.', 'Thank you for your time.'] },
    ],
    tips: [
      'List separate questions clearly, perhaps in separate paragraphs or points.',
      'Keep a formal, polite tone throughout.',
      'Thank the reader in advance for their help.',
    ],
  },

  'B2::Opinion Essay – Agree or Disagree with a Statement': {
    heading: 'Agree or Disagree Essay',
    textType: 'Opinion Essay',
    intro: 'This essay responds to a given statement, clearly saying whether you agree or disagree and why.',
    structure: [
      { step: 'Introduction', detail: 'Restate the topic and clearly say whether you agree or disagree.' },
      { step: 'Reason 1', detail: 'Your first argument supporting your position.' },
      { step: 'Reason 2', detail: 'A second argument, developed with an example.' },
      { step: 'Counter-argument', detail: 'Acknowledge and respond to the opposing view.' },
      { step: 'Conclusion', detail: 'Restate your position firmly.' },
    ],
    usefulLanguage: [
      { heading: 'Agreeing / disagreeing', phrases: ['I completely agree/disagree with the statement that...'] },
      { heading: 'Supporting your view', phrases: ['This is evident when...', 'A clear example of this is...'] },
      { heading: 'Addressing the other side', phrases: ['While it is true that..., I still believe...'] },
    ],
    tips: [
      'State your position clearly from the very first paragraph.',
      'Use specific examples or evidence to support your view.',
      'Acknowledge the opposing view briefly, then explain why you still hold yours.',
    ],
  },

  'B2::A Formal Letter of Apology': {
    heading: 'Writing a Formal Letter of Apology',
    textType: 'Formal Letter',
    intro: 'This letter apologizes formally, on behalf of yourself or a company, for a mistake or problem.',
    structure: [
      { step: 'Greeting', detail: '"Dear Mr/Ms [Surname]," or "Dear Sir/Madam,".' },
      { step: 'Apologize', detail: 'State clearly what you are apologizing for.' },
      { step: 'Explain', detail: 'Give a brief, professional explanation of what happened.' },
      { step: 'Offer a solution', detail: 'Explain what you will do to correct the situation or compensate.' },
      { step: 'Closing', detail: 'A formal, respectful closing.' },
    ],
    usefulLanguage: [
      { heading: 'Apologizing', phrases: ['I am writing to apologize for...', 'Please accept my sincere apologies for...'] },
      { heading: 'Explaining', phrases: ['This occurred due to...', 'Unfortunately,...'] },
      { heading: 'Offering a solution', phrases: ['As a gesture of goodwill, we would like to offer...', 'We will ensure that this does not happen again.'] },
    ],
    tips: [
      'Apologize clearly and take responsibility, without excessive excuses.',
      'Offer a concrete solution or form of compensation.',
      'Maintain a formal, professional tone throughout.',
    ],
  },

  'B2::A Report': {
    heading: 'Writing a Report',
    textType: 'Report',
    intro: 'A report presents information and findings on a topic in a clear, objective, and organized way, usually for a specific reader.',
    structure: [
      { step: 'Introduction', detail: 'State the purpose of the report.' },
      { step: 'Findings', detail: 'Present the information, often under clear subheadings.' },
      { step: 'Analysis', detail: 'Comment briefly on what the findings show.' },
      { step: 'Recommendations', detail: 'Suggest actions based on the findings.' },
    ],
    usefulLanguage: [
      { heading: 'Introducing', phrases: ['The purpose of this report is to...', 'This report examines...'] },
      { heading: 'Presenting findings', phrases: ['It was found that...', 'The data shows that...'] },
      { heading: 'Recommending', phrases: ['It is recommended that...', 'I would suggest...'] },
    ],
    tips: [
      'Use clear subheadings to organize different sections.',
      'Keep the tone objective and factual, not personal.',
      'End with specific, actionable recommendations.',
    ],
  },

  'B2::A Film Review': {
    heading: 'Writing a Film Review',
    textType: 'Review',
    intro: 'A film review gives your opinion of a film, describing the plot briefly and evaluating its different elements.',
    structure: [
      { step: 'Introduction', detail: 'Give the title, director or genre, and a general impression.' },
      { step: 'Plot summary', detail: 'Briefly summarize the story without spoilers.' },
      { step: 'Evaluation', detail: 'Comment on the acting, direction, effects, or music.' },
      { step: 'Recommendation', detail: 'Say who would enjoy this film and give a rating.' },
    ],
    usefulLanguage: [
      { heading: 'Introducing', phrases: ['... is a... film directed by...'] },
      { heading: 'Evaluating', phrases: ['The acting was outstanding.', 'The plot was somewhat predictable.'] },
      { heading: 'Recommending', phrases: ['This film is a must-see for fans of...', 'I would give it... out of 5 stars.'] },
    ],
    tips: [
      'Avoid revealing major plot twists or the ending.',
      'Comment on specific elements: acting, plot, direction, music.',
      'Support your opinions with specific examples from the film.',
    ],
  },

  'B2::Writing an Article for the First Exam': {
    heading: 'Writing an Article (Exam Style)',
    textType: 'Article',
    intro: 'This is an engaging article written for an exam task, aimed at a general readership, with a clear structure and interesting content.',
    structure: [
      { step: 'Title', detail: 'A short, catchy title related to the topic.' },
      { step: 'Introduction', detail: 'An engaging opening that draws the reader in.' },
      { step: 'Main body', detail: 'Develop the topic in 2-3 organized paragraphs.' },
      { step: 'Conclusion', detail: 'A memorable closing thought or recommendation.' },
    ],
    usefulLanguage: [
      { heading: 'Engaging openings', phrases: ['We all know the feeling of...', 'Nowadays, it seems that...'] },
      { heading: 'Organizing ideas', phrases: ['Firstly,', 'What is more,', 'On top of that,'] },
      { heading: 'Concluding', phrases: ['All things considered,', 'So, why not give it a try?'] },
    ],
    tips: [
      'Write a catchy, relevant title.',
      'Use a range of vocabulary and varied sentence structures to impress the examiner.',
      'Keep an engaging, semi-formal tone appropriate for a general audience.',
    ],
  },

  'B2::Writing an Email Cover Letter': {
    heading: 'Writing an Email Cover Letter',
    textType: 'Formal Email',
    intro: 'At this level, a cover letter should present your qualifications persuasively and professionally, tailored to the specific role.',
    structure: [
      { step: 'Greeting', detail: '"Dear Mr/Ms [Surname]," or "Dear Sir/Madam,".' },
      { step: 'Opening', detail: 'State the position and where you found it.' },
      { step: 'Your qualifications', detail: 'Highlight relevant experience and achievements with specific examples.' },
      { step: 'Why this company', detail: 'Show genuine interest in the specific role or organization.' },
      { step: 'Closing', detail: 'Refer to your CV and request an interview.' },
    ],
    usefulLanguage: [
      { heading: 'Opening', phrases: ['I am writing to apply for the position of...'] },
      { heading: 'Highlighting achievements', phrases: ['In my previous role, I successfully...', 'I have a proven track record of...'] },
      { heading: 'Closing', phrases: ['I would welcome the opportunity to discuss...', 'Yours sincerely,'] },
    ],
    tips: [
      'Give specific, quantifiable examples of your achievements.',
      'Show that you have researched the company or role.',
      'Keep it to one page and end with a clear call to action.',
    ],
  },

  'C1::How to Write a Formal Email or Letter for C1 Advanced': {
    heading: 'Writing an Advanced Formal Email or Letter',
    textType: 'Formal Email/Letter',
    intro: 'At C1 level, formal correspondence should use precise, sophisticated language while remaining clear and well-organized.',
    structure: [
      { step: 'Greeting', detail: '"Dear Mr/Ms [Surname]," or "Dear Sir/Madam,".' },
      { step: 'Opening', detail: 'State your purpose clearly and formally in the opening line.' },
      { step: 'Development', detail: 'Develop your points in logically ordered paragraphs, using formal linking devices.' },
      { step: 'Closing', detail: 'Summarize your request or main point and state your expectations.' },
      { step: 'Sign-off', detail: '"Yours faithfully," or "Yours sincerely," followed by your full name.' },
    ],
    usefulLanguage: [
      { heading: 'Formal opening', phrases: ['I am writing with regard to...', 'I am writing on behalf of...'] },
      { heading: 'Formal linking', phrases: ['Moreover,', 'Nevertheless,', 'With this in mind,'] },
      { heading: 'Formal closing', phrases: ['I would be most grateful if...', 'I trust this matter will receive your prompt attention.'] },
    ],
    tips: [
      'Use a wide range of formal vocabulary and avoid repetition.',
      'Use passive constructions where appropriate to sound objective.',
      'Ensure the structure is logical, with clear transitions between paragraphs.',
    ],
  },

  'C1::A Problem Solution Essay': {
    heading: 'Writing a Problem-Solution Essay',
    textType: 'Problem-Solution Essay',
    intro: 'This essay identifies one or more problems related to a topic and proposes realistic solutions for each.',
    structure: [
      { step: 'Introduction', detail: 'Introduce the general issue and its significance.' },
      { step: 'Problem 1 and solution', detail: 'Describe a specific problem, then propose a solution.' },
      { step: 'Problem 2 and solution', detail: 'Describe a second problem, then propose a solution.' },
      { step: 'Conclusion', detail: 'Summarize the problems and solutions, and give a final recommendation.' },
    ],
    usefulLanguage: [
      { heading: 'Presenting problems', phrases: ['One of the most pressing issues is...', 'This has led to...'] },
      { heading: 'Proposing solutions', phrases: ['A possible solution would be to...', 'This problem could be addressed by...'] },
      { heading: 'Concluding', phrases: ['If these measures were implemented,...'] },
    ],
    tips: [
      'Pair each problem directly with a realistic, specific solution.',
      'Use formal, impersonal language throughout.',
      'Support the conclusion with a summary of the expected outcomes.',
    ],
  },

  'C1::Describing Visual Data': {
    heading: 'Describing Visual Data',
    textType: 'Data Commentary',
    intro: 'This type of writing describes and interprets information shown in a chart, graph, or table, highlighting key trends.',
    structure: [
      { step: 'Introduction', detail: 'State what the chart or graph shows and its overall subject.' },
      { step: 'Overview', detail: 'Summarize the most significant overall trend or trends.' },
      { step: 'Specific details', detail: 'Describe and compare specific figures or categories.' },
      { step: 'Conclusion', detail: 'Summarize the key finding or its implication.' },
    ],
    usefulLanguage: [
      { heading: 'Introducing data', phrases: ['The chart illustrates...', 'The graph shows the number of... over...'] },
      { heading: 'Describing trends', phrases: ['There was a significant increase/decrease in...', '... remained stable / fluctuated.'] },
      { heading: 'Comparing', phrases: ['In contrast,', 'Compared to...,', '... was considerably higher than...'] },
    ],
    tips: [
      'Start with an overview before going into specific details.',
      'Use a wide range of trend vocabulary: rise, fall, peak, plummet, fluctuate.',
      'Avoid simply listing every number — focus on the most significant patterns.',
    ],
  },

  'C1::An Advanced Essay': {
    heading: 'Writing an Advanced Essay',
    textType: 'Advanced Essay',
    intro: 'This essay develops a sophisticated argument on an abstract or complex topic, using precise language and a clear structure.',
    structure: [
      { step: 'Introduction', detail: 'Introduce the topic and outline your main argument or thesis.' },
      { step: 'Body paragraphs', detail: 'Develop distinct points, each with evidence, examples, or analysis.' },
      { step: 'Counter-argument', detail: 'Address an opposing view and refute or qualify it.' },
      { step: 'Conclusion', detail: 'Synthesize the argument and offer a final, considered judgement.' },
    ],
    usefulLanguage: [
      { heading: 'Presenting an argument', phrases: ['It could be argued that...', 'A compelling case can be made for...'] },
      { heading: 'Analysing', phrases: ['This suggests that...', 'The implication of this is...'] },
      { heading: 'Concluding', phrases: ['In light of the above,', 'Ultimately,'] },
    ],
    tips: [
      'Develop a clear central argument (thesis) from the introduction.',
      'Use precise, varied vocabulary and complex sentence structures.',
      'Support every claim with reasoning, evidence, or an example.',
    ],
  },

  'C1::How to Write a Proposal': {
    heading: 'Writing a Proposal',
    textType: 'Proposal',
    intro: 'A proposal suggests a plan of action to solve a problem or achieve an improvement, aimed at persuading the reader to approve it.',
    structure: [
      { step: 'Introduction', detail: 'State the purpose and background of the proposal.' },
      { step: 'Current situation', detail: 'Describe the current problem or situation that needs addressing.' },
      { step: 'Proposed solution', detail: 'Describe your suggested plan of action in detail.' },
      { step: 'Benefits and conclusion', detail: 'Explain the expected benefits and recommend approval.' },
    ],
    usefulLanguage: [
      { heading: 'Introducing', phrases: ['The aim of this proposal is to...', 'This proposal outlines...'] },
      { heading: 'Suggesting', phrases: ['I would suggest that...', 'It is recommended that...'] },
      { heading: 'Highlighting benefits', phrases: ['This would result in...', 'The main benefit of this would be...'] },
    ],
    tips: [
      'Use clear headings to separate sections of the proposal.',
      'Focus on practical, feasible suggestions.',
      'End with a strong, persuasive case for approval.',
    ],
  },

  'C1::How to Write a C1 Advanced Report': {
    heading: 'Writing an Advanced Report',
    textType: 'Report',
    intro: 'At C1 level, a report should present findings and recommendations with precision, using an objective and formal register.',
    structure: [
      { step: 'Introduction', detail: 'State the purpose and scope of the report clearly.' },
      { step: 'Findings', detail: 'Present findings under clear subheadings, with supporting detail.' },
      { step: 'Evaluation', detail: 'Critically analyze the findings and their implications.' },
      { step: 'Recommendations', detail: 'Give specific, well-justified recommendations.' },
    ],
    usefulLanguage: [
      { heading: 'Introducing', phrases: ['This report aims to assess...', 'The following report outlines...'] },
      { heading: 'Presenting findings', phrases: ['The findings indicate that...', 'It became apparent that...'] },
      { heading: 'Recommending', phrases: ['It is strongly recommended that...', 'Consideration should be given to...'] },
    ],
    tips: [
      'Use formal subheadings to organize the report clearly.',
      'Maintain an objective, evidence-based tone throughout.',
      'Make recommendations specific and directly linked to the findings.',
    ],
  },
};
