// AI sohbet konuları (AI Chat; ileride AI Talk da kullanabilir).
// Her konu: slug, title, description (kartta görünür), emoji (kart kapağı),
// scenario (AI'ya verilen rol/senaryo talimatı), opener (AI'nın sohbeti başlatan ilk mesajı).
// Yeni konu eklemek için ilgili seviyenin listesine bir nesne eklemek yeterli.

const FREE_TALK = {
  slug: 'free-talk',
  title: 'Free talk',
  description: 'Talk about anything you like.',
  emoji: '💬',
  scenario: 'There is no fixed topic. Let the learner choose what to talk about and follow their interests.',
};

const AI_TOPICS = {
  A1: [
    { ...FREE_TALK, opener: "Hi! I'm your English chat partner. What do you want to talk about today?" },
    {
      slug: 'introducing-yourself',
      title: 'Introducing yourself',
      description: 'Say your name, age, where you are from and what you do.',
      emoji: '👋',
      scenario:
        'You are meeting the learner for the first time. Ask simple questions about their name, age, city, country and job or school, one question at a time. Share simple facts about yourself too.',
      opener: "Hello! Nice to meet you. My name is Emma. What's your name?",
    },
    {
      slug: 'my-family',
      title: 'My family',
      description: 'Talk about your parents, brothers, sisters and pets.',
      emoji: '👨‍👩‍👧',
      scenario:
        'Talk about families. Ask about the people in the learner’s family, their names, ages and what they are like. Practise words like mother, father, brother, sister, grandparents.',
      opener: 'Hi! Today let’s talk about families. Do you have any brothers or sisters?',
    },
    {
      slug: 'daily-routine',
      title: 'Daily routine',
      description: 'What do you do every day, from morning to night?',
      emoji: '⏰',
      scenario:
        'Talk about daily routines using the present simple. Ask what time the learner gets up, has breakfast, goes to school or work, and goes to bed.',
      opener: 'Good morning! Let’s talk about your day. What time do you usually get up?',
    },
    {
      slug: 'food-i-like',
      title: 'Food I like',
      description: 'Your favourite food, drinks and meals.',
      emoji: '🍕',
      scenario:
        'Talk about food and drinks using like / don’t like. Ask about favourite food, breakfast, fruit, vegetables and drinks.',
      opener: "Hi! I'm hungry, so let's talk about food. What's your favourite food?",
    },
    {
      slug: 'my-home',
      title: 'My home',
      description: 'Describe your house or flat and your room.',
      emoji: '🏠',
      scenario:
        'Talk about homes using there is / there are. Ask about the learner’s house or flat, the rooms, and what is in their bedroom.',
      opener: 'Hello! Tell me about your home. Do you live in a house or a flat?',
    },
    {
      slug: 'hobbies',
      title: 'Hobbies',
      description: 'Sports, games and things you do in your free time.',
      emoji: '⚽',
      scenario:
        'Talk about hobbies and free time. Ask what the learner likes doing, which sports they play and what they do at the weekend.',
      opener: 'Hi! What do you like doing in your free time?',
    },
  ],

  A2: [
    { ...FREE_TALK, opener: 'Hi there! What would you like to chat about today?' },
    {
      slug: 'at-the-restaurant',
      title: 'At the restaurant',
      description: 'Order food and drinks from a waiter.',
      emoji: '🍽️',
      scenario:
        'Role-play: you are a friendly waiter in a restaurant and the learner is the customer. Offer the menu, take their order for drinks, main course and dessert, and later bring the bill. Invent a short menu with prices if they ask.',
      opener: 'Good evening and welcome! Here is the menu. Can I get you something to drink first?',
    },
    {
      slug: 'shopping-for-clothes',
      title: 'Shopping for clothes',
      description: 'Ask for sizes, colours and prices in a shop.',
      emoji: '👕',
      scenario:
        'Role-play: you are a shop assistant in a clothes shop and the learner is a customer. Help them find clothes, ask about size and colour, suggest the changing room and tell them the price.',
      opener: 'Hello! Welcome to our shop. Are you looking for anything special today?',
    },
    {
      slug: 'asking-for-directions',
      title: 'Asking for directions',
      description: 'Find your way around a new city.',
      emoji: '🗺️',
      scenario:
        'Role-play: the learner is a tourist in a city and you are a local person on the street. Give simple directions (turn left, go straight on, next to, opposite). Invent places like a museum, a station and a bank.',
      opener: 'Hi! You look a little lost. Can I help you find something?',
    },
    {
      slug: 'at-the-hotel',
      title: 'At the hotel',
      description: 'Check in, ask about your room and hotel services.',
      emoji: '🏨',
      scenario:
        'Role-play: you are a hotel receptionist and the learner is a guest checking in. Ask for their name and booking, explain breakfast time and Wi-Fi, and answer questions about the room.',
      opener: 'Good afternoon, welcome to the Seaside Hotel! Do you have a reservation?',
    },
    {
      slug: 'last-weekend',
      title: 'Last weekend',
      description: 'Talk about what you did using the past simple.',
      emoji: '📅',
      scenario:
        'Talk about last weekend using the past simple. Ask what the learner did, where they went, who they were with and whether they had a good time. Gently correct past tense mistakes.',
      opener: 'Hi! How was your weekend? What did you do?',
    },
    {
      slug: 'weather-and-seasons',
      title: 'Weather & seasons',
      description: 'Talk about the weather and your favourite season.',
      emoji: '🌦️',
      scenario:
        'Talk about the weather and seasons. Ask about today’s weather, the learner’s favourite season and what they like doing in summer and winter.',
      opener: "Hello! What's the weather like where you are today?",
    },
  ],

  B1: [
    { ...FREE_TALK, opener: "Hi! I'm happy to chat about anything — what's on your mind today?" },
    {
      slug: 'job-interview',
      title: 'Job interview',
      description: 'Practise answering common interview questions.',
      emoji: '💼',
      scenario:
        'Role-play: you are an interviewer at a company and the learner is a candidate. First ask which job they are applying for, then ask common interview questions (tell me about yourself, strengths, weaknesses, experience, why this job) one at a time. At the end give short, friendly feedback.',
      opener: 'Good morning, thank you for coming in today. Before we start, which position are you applying for?',
    },
    {
      slug: 'at-the-doctor',
      title: 'At the doctor',
      description: 'Describe symptoms and understand advice.',
      emoji: '🩺',
      scenario:
        'Role-play: you are a doctor and the learner is a patient. Ask about their symptoms, how long they have had them, and give simple advice. Keep it light and never give real medical diagnoses.',
      opener: 'Hello, please have a seat. What seems to be the problem today?',
    },
    {
      slug: 'travel-problems',
      title: 'Travel problems',
      description: 'Deal with a delayed flight or lost luggage.',
      emoji: '✈️',
      scenario:
        'Role-play: you work at an airport information desk. The learner has a travel problem (delayed flight, lost luggage or missed connection). Ask what happened and help them find a solution.',
      opener: 'Hello, this is the airport help desk. How can I help you today?',
    },
    {
      slug: 'making-plans',
      title: 'Making plans with friends',
      description: 'Suggest, accept and refuse invitations.',
      emoji: '🎉',
      scenario:
        'You are the learner’s friend. Make plans together for the weekend: suggest activities, agree on a time and place, and practise phrases like How about…?, Why don’t we…?, I’d love to but…',
      opener: "Hey! Are you free this weekend? I was thinking we could do something fun together.",
    },
    {
      slug: 'films-and-books',
      title: 'Describing a film or book',
      description: 'Talk about a story you enjoyed and why.',
      emoji: '🎬',
      scenario:
        'Talk about films and books. Ask the learner to describe a film or book they enjoyed: the story, the characters and their opinion. Share your own opinions too and ask follow-up questions.',
      opener: "Hi! I'm looking for something good to watch or read. What's a film or book you really enjoyed?",
    },
    {
      slug: 'giving-advice',
      title: 'Giving advice',
      description: 'Help a friend with a problem using should and could.',
      emoji: '🤝',
      scenario:
        'You are a friend with small everyday problems (for example: can’t sleep well, too much homework, want to save money). Tell the learner one problem at a time and ask for advice. React to their advice naturally.',
      opener: "Hi! Can I ask you for some advice? I can't sleep well these days. What should I do?",
    },
  ],

  B2: [
    { ...FREE_TALK, opener: 'Hi! What would you like to discuss today? I’m up for any topic.' },
    {
      slug: 'debate-technology',
      title: 'Debate: technology',
      description: 'Is technology making our lives better or worse?',
      emoji: '📱',
      scenario:
        'Have a friendly debate about technology (social media, smartphones, AI). Ask for the learner’s opinion, give counter-arguments, and encourage them to support their ideas with reasons and examples.',
      opener: 'Here’s a question to start with: do you think smartphones make our lives better or worse?',
    },
    {
      slug: 'environment-and-climate',
      title: 'Environment & climate',
      description: 'Discuss climate change and what we can do.',
      emoji: '🌍',
      scenario:
        'Discuss the environment and climate change: causes, effects and solutions at a personal and government level. Ask for the learner’s views and challenge them politely.',
      opener: 'Let’s talk about the environment. What do you think is the most serious environmental problem today?',
    },
    {
      slug: 'work-and-career',
      title: 'Work & career goals',
      description: 'Talk about your ambitions and the future of work.',
      emoji: '🚀',
      scenario:
        'Talk about careers: the learner’s goals, the skills they want to develop, work-life balance and the future of work (remote work, AI). Ask thoughtful follow-up questions.',
      opener: 'Where do you see yourself in five years? Tell me about your career goals.',
    },
    {
      slug: 'news-and-current-events',
      title: 'News & current events',
      description: 'Share your views on what’s happening in the world.',
      emoji: '📰',
      scenario:
        'Discuss news and current events in general terms (science, sport, culture, technology). Avoid sensitive political arguments; focus on opinions, causes and consequences. Ask how the learner usually follows the news.',
      opener: 'How do you usually keep up with the news? And has anything caught your attention recently?',
    },
    {
      slug: 'problem-at-work',
      title: 'Solving a problem at work',
      description: 'Discuss a workplace issue and find a solution.',
      emoji: '🧩',
      scenario:
        'Role-play: you are the learner’s colleague. A project is behind schedule and the team is stressed. Discuss the causes and agree on a plan together, using polite, professional language.',
      opener: "Have you got a minute? I'm a bit worried — our project is two weeks behind schedule. What do you think we should do?",
    },
    {
      slug: 'persuading-someone',
      title: 'Persuading someone',
      description: 'Convince someone to change their mind.',
      emoji: '🗣️',
      scenario:
        'You hold a mild opinion that the learner must change (for example: reading books is a waste of time, or holidays at home are better than travelling). Let them try to persuade you; slowly accept good arguments and point out weak ones.',
      opener: "Honestly, I think reading books is a waste of time — you can learn everything from videos now. Can you change my mind?",
    },
  ],
};

// Hazır cevaplar: sohbet açılınca AI'nın ilk sorusunun (opener) altında çıkan, tıklanınca gönderilen
// 3 örnek cevap. Her biri o konunun ilk sorusuna doğrudan cevaptır ve seviyeye uygundur.
// Öğrenci ilk mesajını gönderince kaybolur.
const SUGGESTIONS = {
  A1: {
    'free-talk': ["Let's talk about my school.", "Let's talk about food.", "Let's talk about my weekend."],
    'introducing-yourself': ['My name is Ali.', "Hi Emma! I'm Zeynep.", "Nice to meet you. I'm Mert."],
    'my-family': ['Yes, I have one brother.', 'Yes, I have two sisters.', "No, I don't. I'm an only child."],
    'daily-routine': ['I get up at seven o’clock.', 'I usually get up at half past six.', 'I get up at eight at the weekend.'],
    'food-i-like': ['My favourite food is pizza.', 'I love pasta and chicken.', 'I like Turkish food, like kebab.'],
    'my-home': ['I live in a flat.', 'I live in a house with a garden.', 'I live in a small flat with my family.'],
    hobbies: ['I like playing football.', 'I like reading books.', 'I like drawing and music.'],
  },
  A2: {
    'free-talk': ["I'd like to talk about travelling.", "Let's talk about films.", 'Can we chat about my last holiday?'],
    'at-the-restaurant': ['A cola, please.', "I'd like some water, please.", 'Can I have an orange juice, please?'],
    'shopping-for-clothes': ["Yes, I'm looking for a jacket.", "I'm looking for a blue T-shirt.", "I'm just looking, thanks."],
    'asking-for-directions': ["Yes, please. Where's the train station?", 'How can I get to the museum?', 'Is there a bank near here?'],
    'at-the-hotel': ['Yes, I have a reservation.', 'Yes, my name is Ayşe Yılmaz.', "No, I don't. Do you have a room for tonight?"],
    'last-weekend': ['I went to the cinema with my friends.', 'I visited my grandparents.', 'I stayed at home and watched TV.'],
    'weather-and-seasons': ["It's sunny and warm today.", "It's cold and rainy here.", "It's cloudy, but it isn't raining."],
  },
  B1: {
    'free-talk': ["I'd like to talk about my plans for the summer.", "Let's discuss a film I watched recently.", 'Can we talk about learning languages?'],
    'job-interview': ["I'm applying for the software developer position.", "I'm applying for the sales assistant job.", "I'm interested in the marketing assistant role."],
    'at-the-doctor': ["I've had a headache for three days.", "I've got a sore throat and a cough.", "My stomach has been hurting since yesterday."],
    'travel-problems': ['My flight has been delayed.', "My suitcase hasn't arrived.", "I've missed my connecting flight."],
    'making-plans': ["Sure! How about going to the cinema?", "I'd love to. Why don't we go for a picnic?", "Yes, I'm free on Saturday afternoon."],
    'films-and-books': ['I really enjoyed the film Inception.', 'I loved reading Harry Potter.', 'My favourite book is The Little Prince.'],
    'giving-advice': ["You should stop using your phone before bed.", "Why don't you try drinking herbal tea?", 'Maybe you should go to bed earlier.'],
  },
  B2: {
    'free-talk': ["I'd like to discuss the future of education.", "Let's talk about the impact of social media.", 'Could we discuss work-life balance?'],
    'debate-technology': ['On the whole, I think they make our lives better.', "Honestly, I think they're doing more harm than good.", 'It depends on how we use them.'],
    'environment-and-climate': ['In my view, air pollution is the most serious problem.', 'I think climate change is the biggest threat we face.', 'Plastic waste in the oceans worries me the most.'],
    'work-and-career': ["I'd like to be leading a team by then.", "I'm hoping to start my own business.", "I'd love to be working abroad in five years."],
    'news-and-current-events': ['I mostly follow the news on my phone.', 'I usually read news websites in the morning.', "To be honest, I don't follow the news very often."],
    'problem-at-work': ['Maybe we should split the tasks more clearly.', 'I think we need to talk to the manager about the deadline.', 'What if we work on the most important parts first?'],
    'persuading-someone': ["I see your point, but books improve your imagination.", "I'm afraid I disagree. Reading helps you focus.", 'Videos are useful, but books go into much more detail.'],
  },
};

// Konu kartlarının Türkçesi (arayüz Türkçe seçiliyken gösterilir): slug → [başlık, açıklama].
// Hazır cevaplar (suggestions) ve sohbetin kendisi İngilizce kalır.
const AI_TOPICS_TR = {
  'free-talk': ['Serbest sohbet', 'İstediğin her şey hakkında konuş.'],
  'introducing-yourself': ['Kendini tanıtma', 'Adını, yaşını, nereli olduğunu ve ne iş yaptığını söyle.'],
  'my-family': ['Ailem', 'Annen, baban, kardeşlerin ve evcil hayvanların hakkında konuş.'],
  'daily-routine': ['Günlük rutin', 'Sabahtan akşama her gün neler yapıyorsun?'],
  'food-i-like': ['Sevdiğim yiyecekler', 'En sevdiğin yiyecekler, içecekler ve öğünler.'],
  'my-home': ['Evim', 'Evini ya da daireni ve odanı anlat.'],
  hobbies: ['Hobiler', 'Sporlar, oyunlar ve boş zamanında yaptıkların.'],
  'at-the-restaurant': ['Restoranda', 'Garsondan yemek ve içecek siparişi ver.'],
  'shopping-for-clothes': ['Kıyafet alışverişi', 'Mağazada beden, renk ve fiyat sor.'],
  'asking-for-directions': ['Yol sorma', 'Yeni bir şehirde yolunu bul.'],
  'at-the-hotel': ['Otelde', 'Giriş yap, odan ve otel hizmetleri hakkında soru sor.'],
  'last-weekend': ['Geçen hafta sonu', 'Past simple kullanarak neler yaptığını anlat.'],
  'weather-and-seasons': ['Hava ve mevsimler', 'Hava durumu ve en sevdiğin mevsim hakkında konuş.'],
  'job-interview': ['İş görüşmesi', 'Sık sorulan mülakat sorularını cevaplama pratiği yap.'],
  'at-the-doctor': ['Doktorda', 'Belirtilerini anlat ve tavsiyeleri anla.'],
  'travel-problems': ['Seyahat sorunları', 'Rötar yapan bir uçuş ya da kayıp bagajla başa çık.'],
  'making-plans': ['Arkadaşlarla plan yapma', 'Davet et, kabul et ya da kibarca reddet.'],
  'films-and-books': ['Bir film ya da kitabı anlatma', 'Beğendiğin bir hikâyeyi ve nedenini anlat.'],
  'giving-advice': ['Tavsiye verme', 'Should ve could kullanarak bir arkadaşının sorununa yardım et.'],
  'debate-technology': ['Tartışma: teknoloji', 'Teknoloji hayatımızı iyileştiriyor mu, kötüleştiriyor mu?'],
  'environment-and-climate': ['Çevre ve iklim', 'İklim değişikliğini ve neler yapabileceğimizi tartış.'],
  'work-and-career': ['İş ve kariyer hedefleri', 'Hedeflerin ve işin geleceği hakkında konuş.'],
  'news-and-current-events': ['Haberler ve gündem', 'Dünyada olup bitenler hakkındaki görüşlerini paylaş.'],
  'problem-at-work': ['İş yerinde bir sorunu çözme', 'İş yerindeki bir sorunu tartış ve çözüm bul.'],
  'persuading-someone': ['Birini ikna etme', 'Birini fikrini değiştirmeye ikna et.'],
};

const LEVELS = Object.keys(AI_TOPICS);

// Kartlarda ve sohbet ekranında gösterilecek alanlar (senaryo/ilk mesaj gizli kalır).
const publicTopics = (level) =>
  (AI_TOPICS[level] ?? []).map(({ slug, title, description, emoji }) => ({
    slug,
    title,
    description,
    titleTr: AI_TOPICS_TR[slug]?.[0] ?? null,
    descriptionTr: AI_TOPICS_TR[slug]?.[1] ?? null,
    emoji,
    suggestions: SUGGESTIONS[level]?.[slug] ?? [],
  }));

const findTopic = (level, slug) => (AI_TOPICS[level] ?? []).find((t) => t.slug === slug) ?? null;

module.exports = { AI_TOPICS, AI_TOPICS_TR, LEVELS, publicTopics, findTopic };
