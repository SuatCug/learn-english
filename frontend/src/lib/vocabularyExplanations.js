// Vocabulary konularının "Explanation" sekmesi için yapılandırılmış içerik.
// Anahtar: `${level}::${title}` (bkz. proje hafızası: aynı başlık farklı seviyelerde tekrar edebiliyor).
// Bir konu burada yoksa LessonPage, topic.description'ı düz metin olarak göstermeye devam eder.
// Görsel kullanılmıyor — sadece emoji (varsa) ve metin.
//
// Şema:
// {
//   heading: string,
//   intro: string,
//   groups: [{ heading?: string, words: [{ emoji?: string, word: string, meaning: string, example?: string }] }],
//   tips?: string[],
// }
export const VOCABULARY_EXPLANATIONS = {
  'A1::Common Things': {
    heading: 'Common Things',
    intro: 'Everyday objects you use or see all the time.',
    groups: [
      {
        words: [
          { emoji: '📱', word: 'phone', meaning: 'a device for calling and texting', example: 'I left my **phone** at home.' },
          { emoji: '🔑', word: 'key', meaning: 'used to lock or unlock a door', example: 'Have you seen my **keys**?' },
          { emoji: '👜', word: 'bag', meaning: 'used to carry things', example: 'She put her books in her **bag**.' },
          { emoji: '⌚', word: 'watch', meaning: 'worn on the wrist to tell the time', example: 'He checked his **watch**.' },
          { emoji: '📖', word: 'book', meaning: 'pages with writing to read', example: "I'm reading a good **book**." },
          { emoji: '💻', word: 'computer', meaning: 'a machine for work and the internet', example: 'I use my **computer** every day.' },
          { emoji: '🖊️', word: 'pen', meaning: 'used for writing', example: 'Can I borrow a **pen**?' },
          { emoji: '💡', word: 'lamp', meaning: 'gives light', example: 'Turn on the **lamp**, please.' },
        ],
      },
    ],
    tips: ['Learn each noun together with a common verb (use a phone, carry a bag) to remember it better.'],
  },

  'A1::Basic Vocabulary: Family': {
    heading: 'Family Members',
    intro: 'The people in your immediate family.',
    groups: [
      {
        words: [
          { emoji: '👩', word: 'mother', meaning: 'your female parent', example: 'My **mother** is a teacher.' },
          { emoji: '👨', word: 'father', meaning: 'your male parent', example: 'My **father** works in a bank.' },
          { emoji: '👧', word: 'sister', meaning: 'a female sibling', example: 'I have one **sister**.' },
          { emoji: '👦', word: 'brother', meaning: 'a male sibling', example: 'My **brother** is older than me.' },
          { emoji: '👵', word: 'grandmother', meaning: "your mother's or father's mother", example: 'I visit my **grandmother** every Sunday.' },
          { emoji: '👴', word: 'grandfather', meaning: "your mother's or father's father", example: 'My **grandfather** tells great stories.' },
          { emoji: '👩‍🦱', word: 'aunt', meaning: "your parent's sister", example: 'My **aunt** lives in Spain.' },
          { emoji: '🧑', word: 'uncle', meaning: "your parent's brother", example: 'My **uncle** has two dogs.' },
          { emoji: '🧒', word: 'cousin', meaning: "your aunt's or uncle's child", example: 'My **cousin** and I are the same age.' },
        ],
      },
    ],
    tips: ["Use possessive adjectives (my, his, her) with family words: my mother, her brother."],
  },

  'A1::Parts of the Body': {
    heading: 'Parts of the Body',
    intro: 'The main parts of the human body.',
    groups: [
      {
        words: [
          { emoji: '👁️', word: 'eye', meaning: 'used to see', example: 'She has blue **eyes**.' },
          { emoji: '👂', word: 'ear', meaning: 'used to hear', example: 'He whispered in my **ear**.' },
          { emoji: '✋', word: 'hand', meaning: 'at the end of your arm', example: 'Wash your **hands** before eating.' },
          { emoji: '🦵', word: 'leg', meaning: 'used for walking', example: 'He hurt his **leg** playing football.' },
          { emoji: '🦶', word: 'foot', meaning: 'at the end of your leg', example: 'My **feet** hurt after the walk.' },
          { emoji: '💪', word: 'arm', meaning: 'connects your hand to your shoulder', example: 'She broke her **arm**.' },
          { emoji: '👃', word: 'nose', meaning: 'used to smell', example: 'His **nose** is red from the cold.' },
          { emoji: '👄', word: 'mouth', meaning: 'used to eat and speak', example: 'Open your **mouth**, please.' },
          { emoji: '💇', word: 'hair', meaning: 'grows on your head', example: 'She has long black **hair**.' },
        ],
      },
    ],
    tips: ["Use 'has got' with body parts for physical descriptions: She's got green eyes."],
  },

  'A1::Shops and Shopping': {
    heading: 'Shops and Shopping',
    intro: 'Common shops and words you need when shopping.',
    groups: [
      {
        words: [
          { emoji: '🛒', word: 'supermarket', meaning: 'a large shop selling food and other goods', example: 'I buy vegetables at the **supermarket**.' },
          { emoji: '🥖', word: 'bakery', meaning: 'a shop that sells bread and cakes', example: 'The **bakery** smells amazing in the morning.' },
          { emoji: '💊', word: "chemist's", meaning: 'a shop that sells medicine', example: "I need to go to the **chemist's** for some aspirin." },
          { emoji: '📚', word: 'bookshop', meaning: 'a shop that sells books', example: 'I bought this novel at the **bookshop**.' },
          { emoji: '🧾', word: 'receipt', meaning: 'proof of payment', example: 'Keep your **receipt** in case you want to return it.' },
          { emoji: '💵', word: 'cash', meaning: 'money in coins and notes', example: 'Do you have any **cash** on you?' },
          { emoji: '🏷️', word: 'price', meaning: 'how much something costs', example: "What's the **price** of this jacket?" },
          { emoji: '🧍', word: 'queue', meaning: 'a line of people waiting', example: 'There was a long **queue** at the till.' },
        ],
      },
    ],
    tips: ["Shop names often end in \"-'s\": a butcher's, a chemist's — meaning 'the shop of the butcher/chemist'."],
  },

  'A1::Countries and Nationalities': {
    heading: 'Countries and Nationalities',
    intro: 'Some common countries and their nationality adjectives.',
    groups: [
      {
        words: [
          { emoji: '🇫🇷', word: 'France', meaning: 'French', example: 'She is **French** — she comes from **France**.' },
          { emoji: '🇯🇵', word: 'Japan', meaning: 'Japanese', example: 'He is **Japanese** — he comes from **Japan**.' },
          { emoji: '🇮🇹', word: 'Italy', meaning: 'Italian', example: 'This car is **Italian**.' },
          { emoji: '🇹🇷', word: 'Turkey', meaning: 'Turkish', example: 'She speaks **Turkish**.' },
          { emoji: '🇪🇸', word: 'Spain', meaning: 'Spanish', example: 'We are learning **Spanish**.' },
          { emoji: '🇩🇪', word: 'Germany', meaning: 'German', example: 'He drives a **German** car.' },
          { emoji: '🇧🇷', word: 'Brazil', meaning: 'Brazilian', example: 'The music is **Brazilian**.' },
          { emoji: '🇨🇳', word: 'China', meaning: 'Chinese', example: 'They are learning **Chinese**.' },
        ],
      },
    ],
    tips: ['Nationality adjectives are always capitalized in English: French, not french.'],
  },

  'A1::Food and Meals': {
    heading: 'Food and Meals',
    intro: 'Words for meals and basic food.',
    groups: [
      {
        words: [
          { emoji: '🍳', word: 'breakfast', meaning: 'the first meal of the day', example: 'I have **breakfast** at 7am.' },
          { emoji: '🥪', word: 'lunch', meaning: 'the midday meal', example: 'We have **lunch** at school.' },
          { emoji: '🍽️', word: 'dinner', meaning: 'the evening meal', example: "What's for **dinner** tonight?" },
          { emoji: '🍪', word: 'snack', meaning: 'a small amount of food between meals', example: 'I had a **snack** in the afternoon.' },
          { emoji: '🍞', word: 'bread', meaning: 'a basic food made from flour', example: 'Can you buy some **bread**?' },
          { emoji: '🍚', word: 'rice', meaning: 'small grains, a staple food', example: 'We eat **rice** with the meal.' },
          { emoji: '🥦', word: 'vegetables', meaning: 'plants used as food', example: 'Eat more **vegetables**!' },
          { emoji: '🍎', word: 'fruit', meaning: 'the sweet part of a plant, e.g. an apple', example: 'I eat **fruit** every day.' },
        ],
      },
    ],
    tips: ["'Bread', 'rice', and 'fruit' are usually uncountable — say 'some bread', not 'a bread'."],
  },

  'A1::Daily Routines': {
    heading: 'Daily Routine Verbs',
    intro: 'The verbs and phrases we use to talk about a typical day.',
    groups: [
      {
        words: [
          { emoji: '⏰', word: 'wake up', meaning: 'to stop sleeping', example: 'I **wake up** at 7am.' },
          { emoji: '🛏️', word: 'get up', meaning: 'to get out of bed', example: 'I **get up** straight after waking up.' },
          { emoji: '🚿', word: 'have a shower', meaning: 'to wash yourself', example: 'I **have a shower** every morning.' },
          { emoji: '👕', word: 'get dressed', meaning: 'to put your clothes on', example: 'She **gets dressed** quickly.' },
          { emoji: '🚶', word: 'go to work', meaning: 'to travel to your job', example: 'He **goes to work** by bus.' },
          { emoji: '🏠', word: 'come home', meaning: 'to return to your house', example: 'I **come home** at 6pm.' },
          { emoji: '🌙', word: 'go to bed', meaning: 'to lie down to sleep', example: 'I **go to bed** at 11pm.' },
        ],
      },
    ],
    tips: ['Remember the -s ending for he/she/it: she wakes up, he gets dressed.'],
  },

  'A1::Opposite Adjectives': {
    heading: 'Opposite Adjectives',
    intro: 'Adjective pairs with opposite meanings.',
    groups: [
      {
        words: [
          { word: 'big ↔ small', meaning: 'size', example: 'An elephant is **big**; a mouse is **small**.' },
          { word: 'hot ↔ cold', meaning: 'temperature', example: 'Coffee is **hot**; ice is **cold**.' },
          { word: 'happy ↔ sad', meaning: 'feeling', example: 'She was **happy**, but he looked **sad**.' },
          { word: 'easy ↔ difficult', meaning: 'level of challenge', example: 'Maths is **difficult** for me, but English is **easy**.' },
          { word: 'fast ↔ slow', meaning: 'speed', example: 'A cheetah is **fast**; a turtle is **slow**.' },
          { word: 'new ↔ old', meaning: 'age', example: 'I bought a **new** phone; my **old** one broke.' },
          { word: 'expensive ↔ cheap', meaning: 'price', example: 'This restaurant is **expensive**; that café is **cheap**.' },
          { word: 'clean ↔ dirty', meaning: 'condition', example: 'My room is **clean**, but my shoes are **dirty**.' },
        ],
      },
    ],
    tips: ['Learn adjectives in opposite pairs — it helps you remember both words at the same time.'],
  },

  'A1::Family and Relatives': {
    heading: 'Family and Relatives',
    intro: 'Words for extended family and relationships by marriage.',
    groups: [
      {
        words: [
          { emoji: '👦', word: 'nephew', meaning: "your brother's or sister's son", example: 'My **nephew** is five years old.' },
          { emoji: '👧', word: 'niece', meaning: "your brother's or sister's daughter", example: 'My **niece** loves drawing.' },
          { emoji: '👰', word: 'mother-in-law', meaning: "your husband's or wife's mother", example: 'My **mother-in-law** is visiting this weekend.' },
          { emoji: '🧔', word: 'stepfather', meaning: "your mother's new husband, not your birth father", example: 'My **stepfather** works as an engineer.' },
          { emoji: '👯', word: 'twins', meaning: 'two children born at the same time to the same mother', example: 'They are **twins** — they look identical.' },
          { emoji: '🧑', word: 'only child', meaning: 'a child with no brothers or sisters', example: "I'm an **only child**." },
          { emoji: '👴', word: 'relative', meaning: 'a member of your family', example: 'We have **relatives** all over the country.' },
        ],
      },
    ],
    tips: ["Add '-in-law' to a family word to describe relatives by marriage: mother-in-law, brother-in-law."],
  },

  'A1::Common Verbs and Verb Phrases': {
    heading: 'Common Verbs',
    intro: 'Some of the most frequent verbs in English, used in everyday phrases.',
    groups: [
      {
        words: [
          { emoji: '🚶', word: 'go', meaning: 'to move from one place to another', example: 'I **go** to school by bus.' },
          { emoji: '🚗', word: 'come', meaning: 'to move towards the speaker', example: 'Can you **come** here, please?' },
          { emoji: '🛠️', word: 'make', meaning: 'to create something', example: 'She **makes** delicious cakes.' },
          { emoji: '✅', word: 'do', meaning: 'to perform an action or activity', example: 'I **do** my homework every evening.' },
          { emoji: '📦', word: 'take', meaning: 'to carry or move something with you', example: '**Take** an umbrella — it might rain.' },
          { emoji: '🎁', word: 'give', meaning: 'to hand something to someone', example: 'He **gave** me a present.' },
          { emoji: '📥', word: 'get', meaning: 'to receive or obtain', example: 'I **got** a letter today.' },
          { emoji: '🏠', word: 'have', meaning: 'to possess or own', example: 'I **have** a bicycle.' },
        ],
      },
    ],
    tips: ['Learn the fixed phrases these verbs form: make a decision, do homework, take a photo.'],
  },

  'A1::Days, Months, Seasons and Dates': {
    heading: 'Days, Months, Seasons and Dates',
    intro: 'The words we use to talk about the calendar, and the prepositions that go with them.',
    groups: [
      {
        heading: 'Seasons',
        words: [
          { emoji: '🌸', word: 'spring', meaning: 'the season after winter', example: 'Flowers bloom in **spring**.' },
          { emoji: '☀️', word: 'summer', meaning: 'the hottest season', example: 'We go to the beach in **summer**.' },
          { emoji: '🍂', word: 'autumn', meaning: 'the season after summer (AmE: fall)', example: 'Leaves fall in **autumn**.' },
          { emoji: '❄️', word: 'winter', meaning: 'the coldest season', example: 'It often snows in **winter**.' },
        ],
      },
      {
        heading: 'Saying dates',
        words: [
          { word: 'on + day', meaning: 'used with days', example: 'The meeting is **on** Monday.' },
          { word: 'in + month', meaning: 'used with months', example: 'My birthday is **in** July.' },
          { word: 'in + season', meaning: 'used with seasons', example: 'It often rains **in** autumn.' },
          { word: 'in + year', meaning: 'used with years', example: 'She was born **in** 2010.' },
        ],
      },
    ],
    tips: ['Learn the 7 days (Monday–Sunday) and 12 months (January–December) as full lists, then practice with the right preposition.'],
  },

  'A1::Clothes': {
    heading: 'Clothes',
    intro: 'Common items of clothing.',
    groups: [
      {
        words: [
          { emoji: '👕', word: 'shirt', meaning: 'worn on the upper body', example: "He's wearing a blue **shirt**." },
          { emoji: '👖', word: 'trousers', meaning: 'worn on the legs (AmE: pants)', example: 'These **trousers** are too long.' },
          { emoji: '👗', word: 'dress', meaning: 'a one-piece garment for women', example: 'She bought a new **dress**.' },
          { emoji: '👟', word: 'shoes', meaning: 'worn on the feet', example: 'I need new **shoes** for running.' },
          { emoji: '🧥', word: 'jacket', meaning: 'a short coat', example: "Put on your **jacket** — it's cold." },
          { emoji: '🧢', word: 'hat', meaning: 'worn on the head', example: 'He always wears a **hat** in summer.' },
          { emoji: '🧦', word: 'socks', meaning: 'worn on the feet, under shoes', example: "My **socks** don't match." },
        ],
      },
    ],
    tips: ["'Trousers', 'shoes', 'socks', and 'glasses' are always plural: My trousers are new, not 'is new'."],
  },

  'A1::The House: Rooms, Parts, and Things': {
    heading: 'The House: Rooms and Parts',
    intro: 'The main rooms and parts of a house.',
    groups: [
      {
        words: [
          { emoji: '🍳', word: 'kitchen', meaning: 'where you cook', example: 'She is cooking in the **kitchen**.' },
          { emoji: '🛁', word: 'bathroom', meaning: 'where you wash', example: 'The **bathroom** is upstairs.' },
          { emoji: '🛏️', word: 'bedroom', meaning: 'where you sleep', example: 'My **bedroom** is small but cosy.' },
          { emoji: '🛋️', word: 'living room', meaning: 'where the family relaxes or watches TV', example: 'We watch TV in the **living room**.' },
          { emoji: '🌳', word: 'garden', meaning: 'an outdoor area with plants', example: 'The children are playing in the **garden**.' },
          { emoji: '🚪', word: 'door', meaning: 'used to enter or exit a room', example: 'Please close the **door**.' },
          { emoji: '🪟', word: 'window', meaning: 'lets in light and air', example: 'Open the **window**, please.' },
          { emoji: '🏠', word: 'roof', meaning: 'covers the top of the house', example: 'Snow covered the **roof**.' },
        ],
      },
    ],
  },

  'A1::Places in a Town': {
    heading: 'Places in a Town',
    intro: 'Common buildings and places you find in a town.',
    groups: [
      {
        words: [
          { emoji: '🏦', word: 'bank', meaning: 'where you keep and manage money', example: 'I need to go to the **bank**.' },
          { emoji: '🏥', word: 'hospital', meaning: 'where sick people are treated', example: 'She works at the **hospital**.' },
          { emoji: '🏫', word: 'school', meaning: 'where children study', example: 'My children go to that **school**.' },
          { emoji: '🌳', word: 'park', meaning: 'a green public area', example: 'We had a picnic in the **park**.' },
          { emoji: '🎬', word: 'cinema', meaning: 'where you watch films', example: "Let's go to the **cinema** tonight." },
          { emoji: '📚', word: 'library', meaning: 'where you borrow books', example: 'I borrowed this book from the **library**.' },
          { emoji: '🚉', word: 'station', meaning: 'where trains or buses stop', example: 'Meet me at the **station**.' },
          { emoji: '⛪', word: 'church', meaning: 'a building for religious worship', example: 'They got married at the **church**.' },
        ],
      },
    ],
  },

  'A1::At the Restaurant': {
    heading: 'At the Restaurant',
    intro: 'Useful words for eating out.',
    groups: [
      {
        words: [
          { emoji: '📋', word: 'menu', meaning: 'a list of food and drinks available', example: 'Can I see the **menu**, please?' },
          { emoji: '🧑‍🍳', word: 'waiter/waitress', meaning: 'a person who serves food in a restaurant', example: 'The **waiter** brought our drinks.' },
          { emoji: '📝', word: 'order', meaning: 'to ask for food or drink', example: 'Are you ready to **order**?' },
          { emoji: '🧾', word: 'bill', meaning: 'the paper showing how much to pay', example: 'Can we have the **bill**, please?' },
          { emoji: '🥗', word: 'starter', meaning: 'a small dish before the main meal', example: "I'll have soup as a **starter**." },
          { emoji: '🍝', word: 'main course', meaning: 'the biggest dish of the meal', example: "For my **main course**, I'll have pasta." },
          { emoji: '🍰', word: 'dessert', meaning: 'a sweet dish at the end of a meal', example: 'Shall we order **dessert**?' },
        ],
      },
    ],
  },

  'A1::Eating and Drinking Utensils': {
    heading: 'Eating and Drinking Utensils',
    intro: 'The items we use to eat and drink at the table.',
    groups: [
      {
        words: [
          { emoji: '🍴', word: 'fork', meaning: 'used to pick up food', example: 'Use your **fork** to eat the salad.' },
          { emoji: '🔪', word: 'knife', meaning: 'used to cut food', example: 'Be careful with that **knife**.' },
          { emoji: '🥄', word: 'spoon', meaning: 'used to eat soup or liquid food', example: 'I need a **spoon** for my soup.' },
          { emoji: '🍽️', word: 'plate', meaning: 'a flat dish for food', example: 'Put the food on your **plate**.' },
          { emoji: '🥛', word: 'glass', meaning: 'used for cold drinks', example: 'Can I have a **glass** of water?' },
          { emoji: '☕', word: 'cup', meaning: 'used for hot drinks', example: 'She had a **cup** of tea.' },
          { emoji: '🥣', word: 'bowl', meaning: 'a round, deep dish', example: 'He ate cereal from a **bowl**.' },
          { emoji: '🧻', word: 'napkin', meaning: 'used to clean your mouth or hands', example: 'Please pass me a **napkin**.' },
        ],
      },
    ],
  },

  'A1::Movement Verbs': {
    heading: 'Movement Verbs',
    intro: 'Verbs that describe how we move.',
    groups: [
      {
        words: [
          { emoji: '🚶', word: 'walk', meaning: 'to move on foot at a normal speed', example: 'I **walk** to school every day.' },
          { emoji: '🏃', word: 'run', meaning: 'to move fast on foot', example: 'She **runs** every morning.' },
          { emoji: '🤸', word: 'jump', meaning: 'to push yourself off the ground', example: 'The dog **jumped** over the fence.' },
          { emoji: '🏊', word: 'swim', meaning: 'to move through water', example: 'We **swim** in the sea in summer.' },
          { emoji: '🧗', word: 'climb', meaning: 'to go up using your hands and feet', example: 'They **climbed** the mountain.' },
          { emoji: '✈️', word: 'fly', meaning: 'to travel through the air', example: 'We **flew** to London.' },
          { emoji: '🚗', word: 'drive', meaning: 'to control a car', example: 'He **drives** to work every day.' },
          { emoji: '🚴', word: 'ride', meaning: 'to travel on a bike or horse', example: 'She **rides** her bike to school.' },
        ],
      },
    ],
  },

  'A1::Time Words': {
    heading: 'Time Words',
    intro: 'Common words for talking about when things happen.',
    groups: [
      {
        words: [
          { emoji: '⏱️', word: 'now', meaning: 'at this moment', example: "I'm busy **now** — can I call you later?" },
          { emoji: '⏳', word: 'later', meaning: 'at a time after now', example: "I'll see you **later**." },
          { emoji: '🔜', word: 'soon', meaning: 'in a short time from now', example: 'The bus will arrive **soon**.' },
          { emoji: '⬅️', word: 'yesterday', meaning: 'the day before today', example: 'I saw her **yesterday**.' },
          { emoji: '📅', word: 'today', meaning: 'this day', example: 'What are you doing **today**?' },
          { emoji: '➡️', word: 'tomorrow', meaning: 'the day after today', example: 'We are leaving **tomorrow**.' },
          { emoji: '🔁', word: 'always', meaning: '100% of the time', example: 'She **always** arrives early.' },
          { emoji: '🚫', word: 'never', meaning: '0% of the time — not ever', example: 'I **never** eat meat.' },
        ],
      },
    ],
  },

  'A1::Basic Phrasal Verbs': {
    heading: 'Basic Phrasal Verbs',
    intro: 'Simple two-word verbs used very often in everyday English.',
    groups: [
      {
        words: [
          { emoji: '⬆️', word: 'get up', meaning: 'to rise from bed', example: 'I **get up** at 7am.' },
          { emoji: '⬇️', word: 'sit down', meaning: 'to move into a sitting position', example: 'Please **sit down**.' },
          { emoji: '🧍', word: 'stand up', meaning: 'to rise to a standing position', example: 'Everyone **stood up** when the teacher entered.' },
          { emoji: '🔛', word: 'turn on', meaning: 'to switch on a device', example: '**Turn on** the light, please.' },
          { emoji: '🔴', word: 'turn off', meaning: 'to switch off a device', example: '**Turn off** the TV.' },
          { emoji: '👕', word: 'put on', meaning: 'to place clothing on your body', example: '**Put on** your coat.' },
          { emoji: '🧥', word: 'take off', meaning: 'to remove clothing', example: '**Take off** your shoes, please.' },
          { emoji: '🔍', word: 'look for', meaning: 'to try to find something', example: "I'm **looking for** my keys." },
        ],
      },
    ],
  },

  'A2::Technology': {
    heading: 'Technology',
    intro: 'Everyday words for devices and the internet.',
    groups: [
      {
        words: [
          { emoji: '💻', word: 'laptop', meaning: 'a portable computer', example: 'I do my homework on my **laptop**.' },
          { emoji: '📱', word: 'smartphone', meaning: 'a mobile phone with internet access', example: 'She checks her **smartphone** constantly.' },
          { emoji: '🔌', word: 'charger', meaning: 'used to recharge a battery', example: 'Can I borrow your phone **charger**?' },
          { emoji: '📶', word: 'wifi', meaning: 'a wireless internet connection', example: "What's the **wifi** password here?" },
          { emoji: '🖥️', word: 'screen', meaning: 'the display of a device', example: 'My phone **screen** is cracked.' },
          { emoji: '📲', word: 'app', meaning: 'a program on a phone or tablet', example: 'I downloaded a new **app**.' },
          { emoji: '🔒', word: 'password', meaning: 'a secret code used to access something', example: 'I forgot my **password**.' },
          { emoji: '🔋', word: 'battery', meaning: 'stores power for a device', example: 'My **battery** is almost dead.' },
        ],
      },
    ],
  },

  'A2::Everyday Problems and Solutions': {
    heading: 'Everyday Problems and Solutions',
    intro: 'Common small problems, and the language for fixing them.',
    groups: [
      {
        words: [
          { emoji: '🔧', word: 'broken', meaning: 'not working / damaged', example: 'My phone is **broken**.' },
          { emoji: '🗺️', word: 'lost', meaning: 'not knowing where you are', example: 'We got **lost** in the city.' },
          { emoji: '⏰', word: 'late', meaning: 'after the expected time', example: "Sorry I'm **late**." },
          { emoji: '🚫', word: 'out of order', meaning: 'not working (a machine)', example: 'The lift is **out of order**.' },
          { emoji: '🚧', word: 'stuck', meaning: 'unable to move or continue', example: 'We were **stuck** in traffic.' },
          { emoji: '🤦', word: 'forget', meaning: 'to fail to remember', example: 'I always **forget** my umbrella.' },
          { emoji: '🛠️', word: 'fix', meaning: 'to repair something', example: 'Can you **fix** my bike?' },
          { emoji: '✅', word: 'solve', meaning: 'to find an answer to a problem', example: 'We need to **solve** this problem quickly.' },
        ],
      },
    ],
  },

  'A2::Words with Prepositions': {
    heading: 'Words with Prepositions',
    intro: 'Verbs and adjectives that are always followed by the same preposition.',
    groups: [
      {
        words: [
          { word: 'depend on', meaning: 'to rely on', example: 'It **depends on** the weather.' },
          { word: 'listen to', meaning: 'to pay attention to sound', example: 'I **listen to** music every day.' },
          { word: 'arrive at/in', meaning: 'to reach a place', example: 'We **arrived at** the station.' },
          { word: 'good at', meaning: 'skilled in', example: 'She is **good at** maths.' },
          { word: 'afraid of', meaning: 'scared of', example: 'He is **afraid of** spiders.' },
          { word: 'interested in', meaning: 'curious about', example: "I'm **interested in** history." },
          { word: 'married to', meaning: 'a spouse of', example: 'She is **married to** a doctor.' },
          { word: 'wait for', meaning: 'to stay until something happens', example: 'We **waited for** the bus.' },
        ],
      },
    ],
    tips: ['These preposition combinations are fixed — learn them as a pair, not as two separate words.'],
  },

  "A2::Describing People's Appearance": {
    heading: "Describing People's Appearance",
    intro: 'Words for describing how someone looks.',
    groups: [
      {
        words: [
          { emoji: '📏', word: 'tall / short', meaning: 'height', example: 'He is quite **tall**; his sister is **short**.' },
          { emoji: '💪', word: 'slim', meaning: 'thin in an attractive way', example: 'She has a **slim** figure.' },
          { emoji: '➰', word: 'curly hair', meaning: 'hair with curls', example: 'He has **curly hair**.' },
          { emoji: '👨‍🦲', word: 'bald', meaning: 'having no hair on the head', example: 'My uncle is **bald**.' },
          { emoji: '🧔', word: 'beard', meaning: 'facial hair on the chin', example: 'He has a short **beard**.' },
          { emoji: '🟤', word: 'freckles', meaning: 'small brown spots on the skin', example: 'She has **freckles** on her nose.' },
          { emoji: '🎨', word: 'tattoo', meaning: 'a permanent design on the skin', example: 'He has a **tattoo** on his arm.' },
          { emoji: '👓', word: 'wear glasses', meaning: 'to use glasses to see', example: 'I **wear glasses** for reading.' },
        ],
      },
    ],
  },

  "A2::Describing People's Personality": {
    heading: "Describing People's Personality",
    intro: 'Adjectives for describing what someone is like.',
    groups: [
      {
        words: [
          { emoji: '💖', word: 'kind', meaning: 'caring and gentle towards others', example: 'She is very **kind** to strangers.' },
          { emoji: '😂', word: 'funny', meaning: 'able to make people laugh', example: 'He always tells **funny** jokes.' },
          { emoji: '😳', word: 'shy', meaning: 'nervous with other people', example: "He's a bit **shy** at first." },
          { emoji: '🎁', word: 'generous', meaning: 'happy to give and share', example: 'She is very **generous** with her time.' },
          { emoji: '🐴', word: 'stubborn', meaning: "refusing to change one's mind", example: 'My grandfather is quite **stubborn**.' },
          { emoji: '🤝', word: 'honest', meaning: 'telling the truth', example: "You can trust him — he's very **honest**." },
          { emoji: '🛋️', word: 'lazy', meaning: 'not willing to work or make an effort', example: "Don't be so **lazy** — help me clean!" },
          { emoji: '💪', word: 'confident', meaning: 'sure of yourself', example: 'She gave a **confident** speech.' },
        ],
      },
    ],
  },

  'A2::Shops and Shopping': {
    heading: 'Shops and Shopping',
    intro: 'More useful vocabulary for shopping trips and returns.',
    groups: [
      {
        words: [
          { emoji: '👗', word: 'try on', meaning: 'to put on clothes to see if they fit', example: 'Can I **try on** this jacket?' },
          { emoji: '🚪', word: 'fitting room', meaning: 'a small room to try on clothes', example: 'The **fitting rooms** are at the back.' },
          { emoji: '🏷️', word: 'sale / discount', meaning: 'a reduced price', example: 'These shoes are 30% off in the **sale**.' },
          { emoji: '💰', word: 'refund', meaning: 'money given back for a returned item', example: 'I asked for a **refund**.' },
          { emoji: '🔄', word: 'exchange', meaning: 'to swap an item for another', example: 'Can I **exchange** this for a bigger size?' },
          { emoji: '📏', word: 'size', meaning: 'how big or small something is', example: 'Do you have this in a bigger **size**?' },
          { emoji: '🧑‍🤝‍🧑', word: 'customer', meaning: 'a person who buys something', example: 'The shop was full of **customers**.' },
        ],
      },
    ],
  },

  'A2::Housework': {
    heading: 'Housework',
    intro: 'Common household chores.',
    groups: [
      {
        words: [
          { emoji: '🧹', word: 'clean', meaning: 'to remove dirt', example: 'I **clean** my room every Saturday.' },
          { emoji: '🍽️', word: 'wash the dishes', meaning: 'to clean plates and cups after eating', example: "It's your turn to **wash the dishes**." },
          { emoji: '🧺', word: 'do the laundry', meaning: 'to wash clothes', example: 'I **do the laundry** on Sundays.' },
          { emoji: '🧹', word: 'vacuum', meaning: 'to clean floors with a vacuum cleaner', example: 'Can you **vacuum** the living room?' },
          { emoji: '🧼', word: 'tidy up', meaning: 'to put things in order', example: 'Please **tidy up** your desk.' },
          { emoji: '👔', word: 'iron', meaning: 'to make clothes smooth with heat', example: 'I need to **iron** my shirt.' },
          { emoji: '🗑️', word: 'take out the rubbish', meaning: 'to remove the trash', example: 'Can you **take out the rubbish**?' },
          { emoji: '🛏️', word: 'make the bed', meaning: 'to tidy your bed after sleeping', example: 'I always **make the bed** in the morning.' },
        ],
      },
    ],
  },

  'A2::Clothes': {
    heading: 'Clothes and Accessories',
    intro: 'More clothing items and accessories, beyond the basics.',
    groups: [
      {
        words: [
          { emoji: '🧣', word: 'scarf', meaning: 'worn around the neck', example: 'She wore a warm **scarf**.' },
          { emoji: '🧤', word: 'gloves', meaning: 'worn on the hands', example: "Put on your **gloves** — it's freezing." },
          { emoji: '👔', word: 'tie', meaning: 'worn around the neck with a shirt, formal', example: 'He wore a suit and **tie**.' },
          { emoji: '👢', word: 'boots', meaning: 'shoes that cover the ankle', example: 'I need new **boots** for winter.' },
          { emoji: '🩱', word: 'swimsuit', meaning: 'worn for swimming', example: "Don't forget your **swimsuit**." },
          { emoji: '👘', word: 'uniform', meaning: 'special clothes worn for school or work', example: 'Students wear a **uniform** at this school.' },
          { emoji: '🎽', word: 'tracksuit', meaning: 'worn for sport or exercise', example: 'He wears a **tracksuit** to the gym.' },
          { emoji: '👛', word: 'belt', meaning: 'worn around the waist', example: 'His trousers need a **belt**.' },
        ],
      },
    ],
  },

  'A2::Containers and Quantities': {
    heading: 'Containers and Quantities',
    intro: 'How we describe quantities of food and other items.',
    groups: [
      {
        words: [
          { emoji: '🍾', word: 'a bottle of', meaning: 'used for liquids', example: 'a **bottle of** water' },
          { emoji: '🥫', word: 'a can of', meaning: 'used for canned food or drinks', example: 'a **can of** soup' },
          { emoji: '📦', word: 'a box of', meaning: 'used for solid items in a box', example: 'a **box of** chocolates' },
          { emoji: '🛍️', word: 'a bag of', meaning: 'used for loose items', example: 'a **bag of** rice' },
          { emoji: '🍯', word: 'a jar of', meaning: 'used for jam, honey, etc.', example: 'a **jar of** honey' },
          { emoji: '🥛', word: 'a carton of', meaning: 'used for milk or juice', example: 'a **carton of** milk' },
          { emoji: '🍰', word: 'a piece of', meaning: 'a single part of something', example: 'a **piece of** cake' },
          { emoji: '🍫', word: 'a bar of', meaning: 'used for chocolate or soap', example: 'a **bar of** chocolate' },
        ],
      },
    ],
  },

  'A2::The Countryside': {
    heading: 'The Countryside',
    intro: 'Vocabulary for describing rural areas.',
    groups: [
      {
        words: [
          { emoji: '🌾', word: 'field', meaning: 'an open area of land used for crops or animals', example: 'The cows are in the **field**.' },
          { emoji: '🚜', word: 'farm', meaning: 'land used to grow crops or raise animals', example: 'They live on a **farm**.' },
          { emoji: '🌲', word: 'forest', meaning: 'a large area of trees', example: 'We walked through the **forest**.' },
          { emoji: '🏞️', word: 'river', meaning: 'a flowing body of water', example: 'We swam in the **river**.' },
          { emoji: '⛰️', word: 'hill', meaning: 'a raised area of land, smaller than a mountain', example: 'We walked up the **hill**.' },
          { emoji: '🏘️', word: 'village', meaning: 'a small settlement, smaller than a town', example: 'My grandparents live in a small **village**.' },
          { emoji: '🥾', word: 'path', meaning: 'a track for walking', example: 'Follow the **path** through the woods.' },
        ],
      },
    ],
  },

  'A2::Holidays': {
    heading: 'Holidays',
    intro: 'Vocabulary for talking about trips and vacations.',
    groups: [
      {
        words: [
          { emoji: '🧳', word: 'pack a suitcase', meaning: 'to put clothes in a suitcase for travel', example: 'I need to **pack my suitcase** tonight.' },
          { emoji: '📸', word: 'go sightseeing', meaning: 'to visit famous or interesting places', example: 'We went **sightseeing** in Rome.' },
          { emoji: '🏖️', word: 'sunbathe', meaning: 'to lie in the sun to get a tan', example: 'They **sunbathed** on the beach all day.' },
          { emoji: '🎁', word: 'souvenir', meaning: 'an item you buy to remember a trip', example: 'I bought a **souvenir** for my mum.' },
          { emoji: '🧳', word: 'tourist', meaning: 'a person visiting a place on holiday', example: 'The city was full of **tourists**.' },
          { emoji: '🏨', word: 'resort', meaning: 'a holiday destination with hotels and facilities', example: 'We stayed at a beach **resort**.' },
          { emoji: '📅', word: 'book a holiday', meaning: 'to reserve a trip in advance', example: 'We **booked our holiday** online.' },
        ],
      },
    ],
  },

  'A2::Giving Directions': {
    heading: 'Giving Directions',
    intro: 'Phrases used to explain how to get somewhere.',
    groups: [
      {
        words: [
          { emoji: '⬅️', word: 'turn left/right', meaning: 'change direction', example: '**Turn left** at the bank.' },
          { emoji: '⬆️', word: 'go straight on', meaning: 'continue in the same direction', example: '**Go straight on** for 200 metres.' },
          { emoji: '🚸', word: 'cross the road', meaning: 'to walk to the other side of a road', example: '**Cross the road** at the traffic lights.' },
          { emoji: '📍', word: 'on the corner', meaning: 'where two streets meet', example: 'The café is **on the corner**.' },
          { emoji: '👉', word: 'next to', meaning: 'beside', example: 'The bank is **next to** the post office.' },
          { emoji: '↔️', word: 'opposite', meaning: 'facing, on the other side', example: 'The park is **opposite** the school.' },
          { emoji: '🔄', word: 'roundabout', meaning: 'a circular road junction', example: 'Take the second exit at the **roundabout**.' },
          { emoji: '🚦', word: 'traffic lights', meaning: 'lights that control traffic', example: 'Turn right at the **traffic lights**.' },
        ],
      },
    ],
  },

  'A2::Say, Tell, Speak, Talk, etc.': {
    heading: 'Say, Tell, Speak, Talk',
    intro: 'These four verbs all relate to communication, but each is used differently.',
    groups: [
      {
        words: [
          { word: 'say', meaning: '+ something (no personal object)', example: 'She **said** she was tired.' },
          { word: 'tell', meaning: '+ someone (needs a personal object)', example: 'She **told** me she was tired.' },
          { word: 'speak', meaning: 'formal — to use a language or address someone', example: 'Do you **speak** English?' },
          { word: 'talk', meaning: 'an informal conversation', example: 'We **talked** for hours.' },
        ],
      },
    ],
    tips: ["'Tell' always needs a person as its object (tell me), while 'say' does not (say something)."],
  },

  'A2::Hobbies and Free Time': {
    heading: 'Hobbies and Free Time',
    intro: 'Common activities people do in their free time.',
    groups: [
      {
        words: [
          { emoji: '🎨', word: 'painting', meaning: 'creating pictures with paint', example: 'She enjoys **painting** landscapes.' },
          { emoji: '🌱', word: 'gardening', meaning: 'growing plants and flowers', example: 'My dad loves **gardening**.' },
          { emoji: '♟️', word: 'playing chess', meaning: 'a strategy board game', example: 'He plays **chess** every weekend.' },
          { emoji: '🧶', word: 'knitting', meaning: 'making clothes from wool', example: 'My grandmother is **knitting** a scarf.' },
          { emoji: '🎣', word: 'fishing', meaning: 'catching fish for sport or food', example: 'We went **fishing** at the lake.' },
          { emoji: '📷', word: 'photography', meaning: 'taking photos as a hobby', example: 'His hobby is **photography**.' },
          { emoji: '🎲', word: 'board games', meaning: 'games played on a board', example: 'We played **board games** all evening.' },
        ],
      },
    ],
  },

  'A2::In a Hotel': {
    heading: 'In a Hotel',
    intro: 'Useful words for a hotel stay.',
    groups: [
      {
        words: [
          { emoji: '🛎️', word: 'check in', meaning: 'to register on arrival', example: 'We **checked in** at 3pm.' },
          { emoji: '🚪', word: 'check out', meaning: 'to leave and pay before departure', example: '**Check-out** is at 11am.' },
          { emoji: '🛎️', word: 'reception', meaning: 'the front desk of a hotel', example: 'Ask at **reception** for towels.' },
          { emoji: '🍽️', word: 'room service', meaning: 'food delivered to your hotel room', example: 'We ordered breakfast from **room service**.' },
          { emoji: '🗝️', word: 'key card', meaning: 'a card used to open your hotel room', example: 'I lost my **key card**.' },
          { emoji: '📅', word: 'reservation', meaning: 'a booking made in advance', example: 'I have a **reservation** for two nights.' },
          { emoji: '🛏️', word: 'double room', meaning: 'a room with a bed for two people', example: 'We booked a **double room**.' },
        ],
      },
    ],
  },

  'A2::The Weather': {
    heading: 'The Weather',
    intro: 'Words for describing different kinds of weather.',
    groups: [
      {
        words: [
          { emoji: '☀️', word: 'sunny', meaning: 'with bright sunshine', example: "It's **sunny** today." },
          { emoji: '🌧️', word: 'rainy', meaning: 'with rain', example: 'It was **rainy** all weekend.' },
          { emoji: '☁️', word: 'cloudy', meaning: 'covered with clouds', example: "It's quite **cloudy** this morning." },
          { emoji: '💨', word: 'windy', meaning: 'with strong wind', example: "It's too **windy** to go sailing." },
          { emoji: '❄️', word: 'snowy', meaning: 'with snow', example: 'We had a **snowy** Christmas.' },
          { emoji: '🌫️', word: 'foggy', meaning: 'with fog, hard to see far', example: "Drive carefully — it's **foggy**." },
          { emoji: '⛈️', word: 'stormy', meaning: 'with strong wind and rain or thunder', example: 'It was a **stormy** night.' },
          { emoji: '🌡️', word: 'temperature', meaning: 'how hot or cold it is', example: "What's the **temperature** today?" },
        ],
      },
    ],
  },

  'A2::Common Phrasal Verbs': {
    heading: 'Common Phrasal Verbs',
    intro: 'Everyday two- and three-word verbs.',
    groups: [
      {
        words: [
          { emoji: '🐾', word: 'look after', meaning: 'to take care of', example: 'Can you **look after** my dog?' },
          { emoji: '🚭', word: 'give up', meaning: 'to stop doing something', example: 'He **gave up** smoking.' },
          { emoji: '🔍', word: 'find out', meaning: 'to discover', example: 'I need to **find out** the time.' },
          { emoji: '🤝', word: 'get on', meaning: 'to have a good relationship', example: 'I **get on** well with my sister.' },
          { emoji: '⏳', word: 'put off', meaning: 'to postpone', example: 'We **put off** the meeting.' },
          { emoji: '📉', word: 'run out of', meaning: 'to have none left', example: 'We **ran out of** milk.' },
          { emoji: '😊', word: 'look forward to', meaning: 'to be excited about something coming', example: "I'm **looking forward to** the holidays." },
          { emoji: '🔙', word: 'come back', meaning: 'to return', example: 'She **came back** late last night.' },
        ],
      },
    ],
  },

  'A2::Towns and Cities': {
    heading: 'Towns and Cities',
    intro: 'Vocabulary for describing urban areas.',
    groups: [
      {
        words: [
          { emoji: '👥', word: 'crowded', meaning: 'full of people', example: 'The market was very **crowded**.' },
          { emoji: '🏘️', word: 'suburb', meaning: 'a residential area outside the city centre', example: 'We live in a quiet **suburb**.' },
          { emoji: '🏙️', word: 'city centre', meaning: 'the main area of a city (AmE: downtown)', example: 'The shops are in the **city centre**.' },
          { emoji: '🏢', word: 'skyscraper', meaning: 'a very tall building', example: 'New York has many **skyscrapers**.' },
          { emoji: '🚗', word: 'traffic jam', meaning: 'a long line of slow-moving traffic', example: 'We were stuck in a **traffic jam**.' },
          { emoji: '🚌', word: 'public transport', meaning: 'buses, trains, etc. for everyone', example: 'I use **public transport** to get to work.' },
          { emoji: '🚶', word: 'pedestrian', meaning: 'a person walking', example: 'This street is for **pedestrians** only.' },
          { emoji: '🏡', word: 'neighbourhood', meaning: 'the area around where you live', example: "It's a friendly **neighbourhood**." },
        ],
      },
    ],
  },

  'B1::The Body: Parts and Actions': {
    heading: 'The Body: Actions',
    intro: 'Verbs that describe things we do with our bodies.',
    groups: [
      {
        words: [
          { emoji: '👍', word: 'nod', meaning: 'to move your head up and down (yes)', example: 'She **nodded** in agreement.' },
          { emoji: '🤷', word: 'shrug', meaning: "to raise your shoulders (I don't know)", example: 'He just **shrugged** and walked away.' },
          { emoji: '👋', word: 'wave', meaning: 'to move your hand to say hello or goodbye', example: 'She **waved** at me from across the street.' },
          { emoji: '😉', word: 'blink', meaning: 'to close and open your eyes quickly', example: 'He **blinked** in surprise.' },
          { emoji: '🥱', word: 'yawn', meaning: 'to open your mouth wide when tired', example: 'I **yawned** during the meeting.' },
          { emoji: '🙆', word: 'stretch', meaning: 'to extend your arms, legs, or body', example: 'I **stretch** every morning.' },
          { emoji: '💨', word: 'breathe', meaning: 'to take air in and out', example: '**Breathe** deeply and relax.' },
          { emoji: '💦', word: 'sweat', meaning: 'to produce liquid on your skin from heat or exercise', example: 'I was **sweating** after the run.' },
        ],
      },
    ],
  },

  'B1::More Daily Routines': {
    heading: 'More Daily Routine Verbs',
    intro: 'Verbs for describing a busier, more varied daily schedule.',
    groups: [
      {
        words: [
          { emoji: '🚋', word: 'commute', meaning: 'to travel to work regularly', example: 'She **commutes** by train every day.' },
          { emoji: '🛍️', word: 'run errands', meaning: 'to do small tasks like shopping or the post office', example: 'I need to **run errands** this afternoon.' },
          { emoji: '🛀', word: 'unwind', meaning: 'to relax after a stressful day', example: 'I like to **unwind** with a book.' },
          { emoji: '📺', word: 'catch up on', meaning: 'to do something you fell behind on', example: 'I need to **catch up on** some sleep.' },
          { emoji: '🔀', word: 'multitask', meaning: 'to do several things at once', example: 'She can **multitask** really well.' },
          { emoji: '⏳', word: 'procrastinate', meaning: 'to delay doing something', example: 'Stop **procrastinating** and start studying!' },
          { emoji: '☕', word: 'take a break', meaning: 'to stop for a short rest', example: "Let's **take a break** for coffee." },
        ],
      },
    ],
  },

  'B1::Sport': {
    heading: 'Sport',
    intro: 'Common words used to talk about sports and competitions.',
    groups: [
      {
        words: [
          { emoji: '⚽', word: 'score a goal', meaning: 'to put the ball in the goal', example: 'He **scored a goal** in the last minute.' },
          { emoji: '🏆', word: 'win / lose', meaning: 'to come first / not to win', example: 'Our team **won** the match.' },
          { emoji: '🧑‍⚖️', word: 'referee', meaning: 'the official who controls a match', example: 'The **referee** showed a red card.' },
          { emoji: '🤝', word: 'teammate', meaning: 'a person on the same team as you', example: 'My **teammate** passed me the ball.' },
          { emoji: '🏅', word: 'championship', meaning: 'a competition to decide the best team or player', example: 'They won the national **championship**.' },
          { emoji: '🏋️', word: 'gym', meaning: 'a place to exercise', example: 'I go to the **gym** three times a week.' },
          { emoji: '🏟️', word: 'stadium', meaning: 'a large sports venue', example: 'The **stadium** was full for the final.' },
          { emoji: '🧑‍🏫', word: 'coach', meaning: 'a person who trains a team or athlete', example: 'Our **coach** is very strict.' },
        ],
      },
    ],
  },

  'B1::Free Time Activities': {
    heading: 'Free Time Activities',
    intro: 'More ways people spend their leisure time.',
    groups: [
      {
        words: [
          { emoji: '🎤', word: 'go to concerts', meaning: 'to attend live music events', example: 'We **go to concerts** every summer.' },
          { emoji: '🍽️', word: 'eat out', meaning: 'to have a meal at a restaurant', example: 'We **eat out** most Fridays.' },
          { emoji: '📺', word: 'binge-watch', meaning: 'to watch many episodes in a row', example: 'I **binge-watched** the whole series.' },
          { emoji: '🧩', word: 'do puzzles', meaning: 'to solve puzzles as a hobby', example: 'She loves **doing puzzles** on rainy days.' },
          { emoji: '🥳', word: 'socialize', meaning: 'to spend time with other people', example: 'He likes to **socialize** at weekends.' },
          { emoji: '🏋️', word: 'work out', meaning: 'to exercise', example: 'I **work out** at the gym.' },
          { emoji: '🔨', word: 'DIY', meaning: '"do it yourself" — home improvement projects', example: 'He spent the weekend doing **DIY**.' },
        ],
      },
    ],
  },

  'B1::Houses and Buildings': {
    heading: 'Houses and Buildings',
    intro: 'Types of housing and words related to buying or renting.',
    groups: [
      {
        words: [
          { emoji: '🏠', word: 'detached house', meaning: 'a house standing alone, not joined to another', example: 'They live in a **detached house**.' },
          { emoji: '🏘️', word: 'terraced house', meaning: 'a house joined to others in a row', example: 'Many people in the UK live in **terraced houses**.' },
          { emoji: '🏢', word: 'apartment block', meaning: 'a building divided into flats', example: 'She lives on the 5th floor of an **apartment block**.' },
          { emoji: '🏡', word: 'cottage', meaning: 'a small house, often in the countryside', example: 'We rented a **cottage** for the weekend.' },
          { emoji: '💰', word: 'mortgage', meaning: 'a loan used to buy a house', example: 'They took out a **mortgage** to buy their home.' },
          { emoji: '🧑', word: 'tenant', meaning: 'a person who rents a property', example: 'The **tenant** pays rent every month.' },
          { emoji: '🧑‍💼', word: 'landlord', meaning: 'a person who owns and rents out property', example: 'Our **landlord** fixed the heating quickly.' },
          { emoji: '🔑', word: 'estate agent', meaning: 'a person who helps buy, sell, or rent property', example: 'We contacted an **estate agent** to find a flat.' },
        ],
      },
    ],
  },

  'B1::Transport': {
    heading: 'Transport',
    intro: 'Vocabulary for talking about travel and getting around.',
    groups: [
      {
        words: [
          { emoji: '💵', word: 'fare', meaning: 'the money you pay for a journey', example: 'The bus **fare** is £2.' },
          { emoji: '🚉', word: 'platform', meaning: 'where you wait for a train', example: 'The train leaves from **platform** 4.' },
          { emoji: '🚆', word: 'board', meaning: 'to get on a train, plane, or bus', example: 'Passengers can now **board** the train.' },
          { emoji: '⏱️', word: 'delayed', meaning: 'later than planned', example: 'Our flight was **delayed** by two hours.' },
          { emoji: '🏃', word: 'catch a train', meaning: 'to get to the train on time', example: "I need to **catch** the 8 o'clock **train**." },
          { emoji: '🚗', word: 'traffic', meaning: 'vehicles on the road', example: "There's a lot of **traffic** this morning." },
          { emoji: '🚌', word: 'commuter', meaning: 'a person who travels to work regularly', example: 'The train was full of **commuters**.' },
        ],
      },
    ],
  },

  'B1::Hotels and Accommodation': {
    heading: 'Hotels and Accommodation',
    intro: 'More detailed vocabulary about staying in a hotel.',
    groups: [
      {
        words: [
          { emoji: '🛁', word: 'en-suite', meaning: 'a bathroom connected directly to a bedroom', example: 'The room has an **en-suite** bathroom.' },
          { emoji: '🏨', word: 'amenities', meaning: 'useful facilities, e.g. a pool or gym', example: 'The hotel has great **amenities**.' },
          { emoji: '🍽️', word: 'half board', meaning: 'breakfast and dinner included', example: 'We booked **half board**.' },
          { emoji: '🚪', word: 'vacancy', meaning: 'an available room', example: 'The hotel had no **vacancies**.' },
          { emoji: '🎁', word: 'complimentary', meaning: 'free, included', example: 'Breakfast is **complimentary**.' },
          { emoji: '🧑‍💼', word: 'concierge', meaning: 'a hotel staff member who helps guests', example: 'Ask the **concierge** for restaurant recommendations.' },
          { emoji: '🏡', word: 'guesthouse', meaning: 'a small, informal hotel', example: 'We stayed at a lovely **guesthouse**.' },
          { emoji: '💳', word: 'deposit', meaning: 'money paid in advance', example: 'We paid a **deposit** to secure the room.' },
        ],
      },
    ],
  },

  'B1::Food and Cooking': {
    heading: 'Food and Cooking',
    intro: 'Basic cooking verbs and words.',
    groups: [
      {
        words: [
          { emoji: '♨️', word: 'boil', meaning: 'to cook in hot water', example: '**Boil** the pasta for 10 minutes.' },
          { emoji: '🍳', word: 'fry', meaning: 'to cook in hot oil', example: '**Fry** the onions until golden.' },
          { emoji: '🍞', word: 'bake', meaning: 'to cook in an oven', example: 'She **baked** a chocolate cake.' },
          { emoji: '🔥', word: 'grill', meaning: 'to cook over or under direct heat', example: 'We **grilled** some vegetables.' },
          { emoji: '🔪', word: 'chop', meaning: 'to cut into small pieces', example: '**Chop** the vegetables finely.' },
          { emoji: '🥣', word: 'mix', meaning: 'to combine ingredients', example: '**Mix** the flour and sugar together.' },
          { emoji: '🧂', word: 'ingredient', meaning: 'a food item used in a recipe', example: 'Salt is a common **ingredient**.' },
          { emoji: '📖', word: 'recipe', meaning: 'instructions for cooking a dish', example: 'I found this **recipe** online.' },
        ],
      },
    ],
  },

  'B1::Work': {
    heading: 'Work',
    intro: 'Common vocabulary for talking about jobs and the workplace.',
    groups: [
      {
        words: [
          { emoji: '📝', word: 'apply for a job', meaning: 'to formally ask for a job', example: 'I **applied for** a new **job** last week.' },
          { emoji: '🗣️', word: 'interview', meaning: 'a meeting to assess a job candidate', example: 'I have a job **interview** tomorrow.' },
          { emoji: '📈', word: 'promotion', meaning: 'a move to a higher position', example: 'She got a **promotion** last month.' },
          { emoji: '💰', word: 'salary', meaning: 'the money you earn from a job', example: 'His **salary** increased this year.' },
          { emoji: '🧑‍🤝‍🧑', word: 'colleague', meaning: 'a person you work with', example: 'I had lunch with a **colleague**.' },
          { emoji: '🚪', word: 'resign', meaning: 'to formally leave a job', example: 'He decided to **resign** from his position.' },
          { emoji: '⏰', word: 'deadline', meaning: 'the date or time something must be finished', example: 'The **deadline** for the report is Friday.' },
          { emoji: '🕘', word: 'overtime', meaning: 'extra hours worked beyond normal', example: 'I worked **overtime** this week.' },
        ],
      },
    ],
  },

  'B1::Money': {
    heading: 'Money',
    intro: 'Vocabulary for talking about personal finance.',
    groups: [
      {
        words: [
          { emoji: '📊', word: 'budget', meaning: 'a plan for spending money', example: 'We need to stick to our **budget**.' },
          { emoji: '🐖', word: 'save', meaning: 'to keep money for later', example: 'I **save** 10% of my salary.' },
          { emoji: '💸', word: 'spend', meaning: 'to use money to buy things', example: 'I **spent** too much this weekend.' },
          { emoji: '🤲', word: 'borrow', meaning: 'to take money that must be paid back', example: 'Can I **borrow** some money?' },
          { emoji: '🤝', word: 'lend', meaning: 'to give money that will be paid back', example: 'He **lent** me $50.' },
          { emoji: '📉', word: 'debt', meaning: 'money that you owe', example: 'She paid off her **debt**.' },
          { emoji: '📈', word: 'invest', meaning: 'to put money into something to make a profit', example: 'They **invested** in a new business.' },
          { emoji: '💵', word: 'income', meaning: 'the money you earn', example: 'His monthly **income** is quite high.' },
        ],
      },
    ],
  },

  'B1::Education': {
    heading: 'Education',
    intro: 'Vocabulary for schools, universities, and studying.',
    groups: [
      {
        words: [
          { emoji: '📝', word: 'enrol', meaning: 'to officially join a course or school', example: 'She **enrolled** in a new course.' },
          { emoji: '💵', word: 'tuition fees', meaning: 'money paid for education', example: 'University **tuition fees** are high.' },
          { emoji: '🎓', word: 'degree', meaning: 'a university qualification', example: 'He has a **degree** in economics.' },
          { emoji: '🎓', word: 'graduate', meaning: 'to complete a degree or course', example: 'She **graduated** last year.' },
          { emoji: '🗣️', word: 'lecture', meaning: 'a formal talk that teaches a subject', example: 'The **lecture** was two hours long.' },
          { emoji: '💰', word: 'scholarship', meaning: "money given to support a student's study", example: 'He won a **scholarship** to study abroad.' },
          { emoji: '📚', word: 'curriculum', meaning: 'the subjects taught in a course', example: 'Maths is part of the **curriculum**.' },
          { emoji: '📝', word: 'exam', meaning: 'a formal test of knowledge', example: 'I have an **exam** next week.' },
        ],
      },
    ],
  },

  'B1::Relationships': {
    heading: 'Relationships',
    intro: 'Vocabulary for talking about friendships and romantic relationships.',
    groups: [
      {
        words: [
          { emoji: '🤝', word: 'get on well', meaning: 'to have a good relationship', example: 'I **get on well** with my flatmate.' },
          { emoji: '💔', word: 'fall out', meaning: 'to argue and stop being friends', example: 'They **fell out** over money.' },
          { emoji: '💔', word: 'break up', meaning: 'to end a romantic relationship', example: 'They **broke up** last month.' },
          { emoji: '💍', word: 'propose', meaning: 'to ask someone to marry you', example: 'He **proposed** to her on the beach.' },
          { emoji: '💑', word: 'engaged', meaning: 'having agreed to marry', example: 'They got **engaged** last year.' },
          { emoji: '💒', word: 'get married', meaning: 'to become married', example: 'They **got married** in June.' },
          { emoji: '👪', word: 'in-laws', meaning: "your husband's or wife's family", example: 'We spent Christmas with my **in-laws**.' },
          { emoji: '👯', word: 'close friend', meaning: 'a very good friend', example: "She's my **close friend** from university." },
        ],
      },
    ],
  },

  'B1::News and Media': {
    heading: 'News and Media',
    intro: 'Vocabulary for talking about newspapers, TV news, and journalism.',
    groups: [
      {
        words: [
          { emoji: '📰', word: 'headline', meaning: 'the title of a news story', example: 'The **headline** caught my attention.' },
          { emoji: '🎙️', word: 'journalist', meaning: 'a person who writes or reports news', example: 'She works as a **journalist**.' },
          { emoji: '📡', word: 'broadcast', meaning: 'to send out on TV or radio', example: 'The match was **broadcast** live.' },
          { emoji: '🚨', word: 'breaking news', meaning: 'important news happening right now', example: 'This just in — **breaking news**.' },
          { emoji: '📄', word: 'article', meaning: 'a piece of writing in a newspaper or magazine', example: 'I read an interesting **article** today.' },
          { emoji: '🔎', word: 'source', meaning: 'where information comes from', example: 'The journalist protected her **source**.' },
          { emoji: '🗞️', word: 'press', meaning: 'newspapers and journalists in general', example: 'The **press** covered the event widely.' },
          { emoji: '📺', word: 'coverage', meaning: 'how much a topic is reported', example: 'The election got a lot of **coverage**.' },
        ],
      },
    ],
  },

  'B1::Animals and Their Bodies and Sounds': {
    heading: 'Animals: Bodies and Sounds',
    intro: 'Body parts specific to animals, and the sounds they make.',
    groups: [
      {
        heading: 'Body parts',
        words: [
          { emoji: '🐾', word: 'paw', meaning: "an animal's foot", example: 'The dog hurt its **paw**.' },
          { emoji: '🐒', word: 'tail', meaning: "the part at the back of an animal's body", example: 'The cat wagged its **tail**.' },
          { emoji: '🐻', word: 'fur', meaning: 'the soft hair covering an animal', example: 'The bear has thick **fur**.' },
          { emoji: '🦅', word: 'wings', meaning: 'used by birds and insects to fly', example: 'The eagle spread its **wings**.' },
          { emoji: '🐱', word: 'claws', meaning: "sharp nails on an animal's feet", example: 'The cat scratched with its **claws**.' },
          { emoji: '🐦', word: 'beak', meaning: "a bird's mouth", example: 'The bird has a sharp **beak**.' },
        ],
      },
      {
        heading: 'Sounds',
        words: [
          { emoji: '🐕', word: 'bark', meaning: 'the sound a dog makes', example: 'The dog **barked** at the postman.' },
          { emoji: '🐱', word: 'meow', meaning: 'the sound a cat makes', example: 'The kitten **meowed** for food.' },
          { emoji: '🦁', word: 'roar', meaning: 'the loud sound a lion makes', example: 'We heard the lion **roar**.' },
        ],
      },
    ],
  },

  'B1::Types of Movies and TV Shows': {
    heading: 'Types of Movies and TV Shows',
    intro: 'Vocabulary for talking about films and television genres.',
    groups: [
      {
        words: [
          { emoji: '😱', word: 'thriller', meaning: 'an exciting, suspenseful film', example: 'I love a good **thriller**.' },
          { emoji: '😂', word: 'sitcom', meaning: 'a funny TV series about everyday life', example: 'This **sitcom** always makes me laugh.' },
          { emoji: '🎥', word: 'documentary', meaning: 'a factual film about a real subject', example: 'We watched a **documentary** about space.' },
          { emoji: '❤️', word: 'romantic comedy', meaning: 'a funny film about love', example: 'She loves **romantic comedies**.' },
          { emoji: '👻', word: 'horror', meaning: 'a scary film', example: 'I hate watching **horror** films.' },
          { emoji: '🎨', word: 'animated film', meaning: 'a film made with drawings or CGI characters', example: 'Kids love **animated films**.' },
          { emoji: '📺', word: 'series', meaning: 'a TV show with multiple episodes', example: 'We binge-watched the whole **series**.' },
          { emoji: '📻', word: 'soap opera', meaning: 'a long-running drama series', example: 'My grandmother watches a **soap opera** every day.' },
        ],
      },
    ],
  },

  'B1::Phone Talk': {
    heading: 'Phone Talk',
    intro: 'Phrases used for making and receiving phone calls.',
    groups: [
      {
        words: [
          { emoji: '📵', word: 'hang up', meaning: 'to end a phone call', example: 'She **hung up** without saying goodbye.' },
          { emoji: '✋', word: 'hold on', meaning: 'to wait for a moment', example: "**Hold on**, I'll check for you." },
          { emoji: '☎️', word: 'put through', meaning: 'to connect a caller to someone', example: "I'll **put you through** to the manager." },
          { emoji: '📞', word: 'engaged / busy', meaning: 'the line is already in use', example: 'The line was **engaged**.' },
          { emoji: '📩', word: 'voicemail', meaning: 'a recorded message left on a phone', example: 'He left me a **voicemail**.' },
          { emoji: '🔢', word: 'dial', meaning: 'to enter a phone number', example: '**Dial** the number and press call.' },
          { emoji: '💬', word: 'text', meaning: 'to send a written message', example: "I'll **text** you later." },
          { emoji: '📵', word: 'missed call', meaning: 'a call you did not answer', example: 'You have three **missed calls**.' },
        ],
      },
    ],
  },

  'B1::Age and Life Stages': {
    heading: 'Age and Life Stages',
    intro: 'Words for describing different stages of life.',
    groups: [
      {
        words: [
          { emoji: '👶', word: 'infant', meaning: 'a very young baby', example: 'The **infant** slept peacefully.' },
          { emoji: '🧒', word: 'toddler', meaning: 'a young child who has just learned to walk', example: 'The **toddler** loves playing with blocks.' },
          { emoji: '🧑‍🎓', word: 'teenager', meaning: 'a person aged 13 to 19', example: 'My daughter is a **teenager** now.' },
          { emoji: '🧑', word: 'adult', meaning: 'a fully grown person', example: 'This film is for **adults** only.' },
          { emoji: '🧔', word: 'middle-aged', meaning: 'roughly between 45 and 65 years old', example: 'He is a **middle-aged** man.' },
          { emoji: '👴', word: 'elderly', meaning: 'old (a polite word for old people)', example: 'She takes care of her **elderly** parents.' },
          { emoji: '🏖️', word: 'retire', meaning: 'to stop working, usually due to age', example: 'My father **retired** last year.' },
          { emoji: '👨‍👩‍👧‍👦', word: 'generation', meaning: 'people born and living around the same time', example: 'Three **generations** live in that house.' },
        ],
      },
    ],
  },

  'B1::Pollution and How to Stop It': {
    heading: 'Pollution and How to Stop It',
    intro: 'Vocabulary for talking about environmental problems and solutions.',
    groups: [
      {
        words: [
          { emoji: '🏭', word: 'air pollution', meaning: 'harmful substances in the air', example: '**Air pollution** is a big problem in cities.' },
          { emoji: '♻️', word: 'recycle', meaning: 'to reuse waste materials', example: 'We **recycle** paper and plastic.' },
          { emoji: '🌫️', word: 'greenhouse gases', meaning: 'gases that trap heat and warm the planet', example: 'Cars produce **greenhouse gases**.' },
          { emoji: '☀️', word: 'renewable energy', meaning: "energy from sources that don't run out, e.g. sun or wind", example: 'Solar power is a form of **renewable energy**.' },
          { emoji: '🗑️', word: 'litter', meaning: 'rubbish left in public places', example: "Please don't drop **litter** on the ground." },
          { emoji: '👣', word: 'carbon footprint', meaning: 'the amount of CO2 caused by your activities', example: 'Flying increases your **carbon footprint**.' },
          { emoji: '🌱', word: 'sustainable', meaning: 'not harmful to the environment long-term', example: 'They use **sustainable** farming methods.' },
          { emoji: '💨', word: 'emissions', meaning: 'gases released into the air', example: 'The factory reduced its **emissions**.' },
        ],
      },
    ],
  },

  'B1+::The Weather and Natural Disasters': {
    heading: 'The Weather and Natural Disasters',
    intro: 'Vocabulary for extreme weather and natural disaster events.',
    groups: [
      {
        words: [
          { emoji: '🥵', word: 'heatwave', meaning: 'a long period of very hot weather', example: 'The **heatwave** lasted two weeks.' },
          { emoji: '🏜️', word: 'drought', meaning: 'a long period without rain', example: 'The **drought** damaged the crops.' },
          { emoji: '🌊', word: 'flood', meaning: 'water covering land that is usually dry', example: 'The **flood** destroyed many homes.' },
          { emoji: '🌍', word: 'earthquake', meaning: 'a sudden shaking of the ground', example: 'The **earthquake** caused a lot of damage.' },
          { emoji: '🌀', word: 'hurricane', meaning: 'a violent tropical storm', example: 'The **hurricane** hit the coast.' },
          { emoji: '⛈️', word: 'thunderstorm', meaning: 'a storm with thunder and lightning', example: 'We had a **thunderstorm** last night.' },
          { emoji: '🔥', word: 'wildfire', meaning: 'an uncontrolled fire in forests or grassland', example: 'The **wildfire** spread quickly.' },
          { emoji: '🌨️', word: 'blizzard', meaning: 'a severe snowstorm with strong wind', example: 'The **blizzard** closed all the roads.' },
        ],
      },
    ],
  },

  'B1+::Health Problems and Injuries': {
    heading: 'Health Problems and Injuries',
    intro: 'Vocabulary for describing minor injuries and illnesses.',
    groups: [
      {
        words: [
          { emoji: '🦵', word: 'sprain', meaning: 'to injure a joint by twisting it', example: 'She **sprained** her ankle playing tennis.' },
          { emoji: '🟣', word: 'bruise', meaning: 'a dark mark on the skin from an injury', example: 'He has a big **bruise** on his leg.' },
          { emoji: '🩹', word: 'cut', meaning: 'a wound where the skin is broken', example: 'She has a **cut** on her finger.' },
          { emoji: '🤒', word: 'fever', meaning: 'a higher than normal body temperature', example: 'He has a high **fever**.' },
          { emoji: '🔴', word: 'rash', meaning: 'red spots on the skin', example: 'The cream gave her a **rash**.' },
          { emoji: '🎈', word: 'swollen', meaning: 'bigger than normal because of injury or illness', example: 'His ankle is **swollen**.' },
          { emoji: '🦴', word: 'broken bone', meaning: 'a bone that has cracked', example: 'He has a **broken bone** in his arm.' },
          { emoji: '🤧', word: 'allergic reaction', meaning: "the body's negative response to a substance", example: 'She had an **allergic reaction** to peanuts.' },
        ],
      },
    ],
  },

  'B1+::Air Travel': {
    heading: 'Air Travel',
    intro: 'Vocabulary for the airport and flying.',
    groups: [
      {
        words: [
          { emoji: '🛄', word: 'check-in', meaning: 'the process before a flight where you get your boarding pass', example: '**Check-in** opens two hours before the flight.' },
          { emoji: '🎫', word: 'boarding pass', meaning: 'a document that lets you board a plane', example: 'Please have your **boarding pass** ready.' },
          { emoji: '🛂', word: 'security', meaning: 'checks made before flying', example: 'The queue at **security** was long.' },
          { emoji: '🛋️', word: 'departure lounge', meaning: 'the waiting area before boarding', example: 'We waited in the **departure lounge**.' },
          { emoji: '🧳', word: 'luggage', meaning: 'bags and suitcases you take on a trip', example: 'My **luggage** was lost.' },
          { emoji: '⏳', word: 'layover', meaning: 'a stop between two flights', example: 'We had a 3-hour **layover** in Paris.' },
          { emoji: '🛃', word: 'customs', meaning: 'where officials check goods entering a country', example: 'We went through **customs** quickly.' },
          { emoji: '✈️', word: 'turbulence', meaning: 'rough, shaking movement during a flight', example: 'The plane hit some **turbulence**.' },
        ],
      },
    ],
  },

  'B1+::Crime and Punishment': {
    heading: 'Crime and Punishment',
    intro: 'Vocabulary for the legal process and punishments.',
    groups: [
      {
        words: [
          { emoji: '🚓', word: 'arrest', meaning: 'to take someone into police custody', example: 'The police **arrested** the suspect.' },
          { emoji: '⚖️', word: 'trial', meaning: 'a legal process to decide guilt', example: 'The **trial** lasted three weeks.' },
          { emoji: '📜', word: 'verdict', meaning: 'the decision of a court', example: 'The jury reached a **verdict**.' },
          { emoji: '⛓️', word: 'sentence', meaning: 'the punishment given by a court', example: 'He received a five-year **sentence**.' },
          { emoji: '🏢', word: 'prison', meaning: 'a place where criminals are kept', example: 'He spent two years in **prison**.' },
          { emoji: '💰', word: 'fine', meaning: 'money paid as a punishment', example: 'She had to pay a **fine** for speeding.' },
          { emoji: '🔍', word: 'evidence', meaning: 'facts that prove something', example: 'There was no **evidence** against him.' },
          { emoji: '🧑‍⚖️', word: 'witness', meaning: 'a person who saw a crime happen', example: 'The **witness** described the thief.' },
        ],
      },
    ],
  },

  'B1+::Types of Crime and Offenders': {
    heading: 'Types of Crime and Offenders',
    intro: 'Vocabulary for common crimes and the people who commit them.',
    groups: [
      {
        words: [
          { emoji: '🏠', word: 'burglary', meaning: 'entering a building illegally to steal', example: 'There was a **burglary** on our street.' },
          { emoji: '👜', word: 'theft', meaning: 'the act of stealing', example: 'Bike **theft** is common here.' },
          { emoji: '💳', word: 'fraud', meaning: 'deceiving someone for money', example: 'He was found guilty of **fraud**.' },
          { emoji: '🎨', word: 'vandalism', meaning: 'deliberately damaging property', example: 'The wall was covered in **vandalism**.' },
          { emoji: '🛍️', word: 'shoplifting', meaning: 'stealing from a shop', example: 'She was caught **shoplifting**.' },
          { emoji: '🦹', word: 'burglar', meaning: 'a person who breaks in to steal', example: 'The **burglar** entered through the window.' },
          { emoji: '🥷', word: 'thief', meaning: 'a person who steals', example: 'The **thief** ran away with her bag.' },
          { emoji: '🕴️', word: 'fraudster', meaning: 'a person who commits fraud', example: 'The **fraudster** tricked many people.' },
        ],
      },
    ],
  },

  'B1+::Clothes': {
    heading: 'Clothes: Fabrics and Style',
    intro: 'Vocabulary for describing the fabric, pattern, and fit of clothes.',
    groups: [
      {
        words: [
          { word: 'cotton', meaning: 'a natural, light fabric', example: 'This shirt is made of **cotton**.' },
          { word: 'wool', meaning: 'a warm fabric made from sheep', example: 'She wore a **wool** sweater.' },
          { word: 'striped', meaning: 'having lines or stripes', example: 'He wore a **striped** shirt.' },
          { word: 'checked', meaning: 'having a pattern of squares', example: 'She likes **checked** skirts.' },
          { word: 'tailored', meaning: 'made or adjusted to fit well', example: 'He wore a perfectly **tailored** suit.' },
          { word: 'loose-fitting', meaning: 'not tight, roomy', example: 'I prefer **loose-fitting** clothes.' },
          { word: 'formal wear', meaning: 'clothes for special or formal occasions', example: 'The event requires **formal wear**.' },
          { word: 'casual wear', meaning: 'informal, everyday clothes', example: '**Casual wear** is fine for the party.' },
        ],
      },
    ],
  },

  'B1+::Technology': {
    heading: 'Technology',
    intro: 'More advanced vocabulary for devices, software, and online safety.',
    groups: [
      {
        words: [
          { emoji: '⬆️', word: 'upgrade', meaning: 'to improve a device or software', example: 'I need to **upgrade** my phone.' },
          { emoji: '🦠', word: 'malware', meaning: 'harmful software', example: 'The computer was infected with **malware**.' },
          { emoji: '💾', word: 'backup', meaning: 'a copy of data kept safe', example: 'Always keep a **backup** of your files.' },
          { emoji: '☁️', word: 'cloud storage', meaning: 'storing data online', example: 'I save my photos to **cloud storage**.' },
          { emoji: '⚠️', word: 'glitch', meaning: 'a small technical fault', example: 'There was a **glitch** in the app.' },
          { emoji: '🔄', word: 'update', meaning: 'a new version of software', example: 'Install the latest **update**.' },
          { emoji: '🕵️', word: 'hack', meaning: 'to gain unauthorized access to data', example: 'The website was **hacked**.' },
          { emoji: '🔐', word: 'encrypt', meaning: 'to protect data by coding it', example: 'The messages are **encrypted**.' },
        ],
      },
    ],
  },

  'B1+::Personality': {
    heading: 'Personality',
    intro: 'More nuanced adjectives for describing character.',
    groups: [
      {
        words: [
          { emoji: '🚀', word: 'ambitious', meaning: 'wanting to achieve success', example: 'She is very **ambitious** in her career.' },
          { emoji: '😌', word: 'easy-going', meaning: 'relaxed, not easily worried', example: "He's an **easy-going** person." },
          { emoji: '😤', word: 'arrogant', meaning: 'having too much confidence, unpleasantly proud', example: 'He can be quite **arrogant** sometimes.' },
          { emoji: '🥺', word: 'sensitive', meaning: 'easily affected emotionally', example: "She's very **sensitive** to criticism." },
          { emoji: '🤝', word: 'reliable', meaning: 'able to be trusted or depended on', example: 'He is a **reliable** colleague.' },
          { emoji: '⚡', word: 'impulsive', meaning: 'acting without thinking first', example: 'She made an **impulsive** decision.' },
          { emoji: '🧠', word: 'open-minded', meaning: 'willing to consider new ideas', example: "He is very **open-minded**." },
          { emoji: '💬', word: 'assertive', meaning: 'confident and direct', example: 'You need to be more **assertive** at work.' },
        ],
      },
    ],
  },

  'B1+::Business': {
    heading: 'Business',
    intro: 'Vocabulary for talking about companies and the business world.',
    groups: [
      {
        words: [
          { emoji: '💼', word: 'entrepreneur', meaning: 'a person who starts a business', example: 'She is a successful **entrepreneur**.' },
          { emoji: '💰', word: 'revenue', meaning: 'the money a business earns', example: "The company's **revenue** grew last year." },
          { emoji: '🤝', word: 'merger', meaning: 'two companies joining into one', example: 'The **merger** created a huge company.' },
          { emoji: '📈', word: 'shareholder', meaning: 'a person who owns shares in a company', example: 'The **shareholders** approved the deal.' },
          { emoji: '🗣️', word: 'negotiate', meaning: 'to discuss in order to reach an agreement', example: 'They **negotiated** a better price.' },
          { emoji: '🚀', word: 'launch', meaning: 'to introduce a new product', example: 'They **launched** a new app.' },
          { emoji: '🏁', word: 'competitor', meaning: 'a rival business', example: 'Our main **competitor** lowered its prices.' },
          { emoji: '📊', word: 'profit margin', meaning: 'the percentage of profit made', example: 'They increased their **profit margin**.' },
        ],
      },
    ],
  },

  'B1+::Houses and Home Words': {
    heading: 'Houses and Home Words',
    intro: 'Vocabulary for describing a home and moving house.',
    groups: [
      {
        words: [
          { emoji: '🛠️', word: 'renovate', meaning: 'to repair and improve a building', example: 'They **renovated** the old kitchen.' },
          { emoji: '📐', word: 'spacious', meaning: 'having a lot of space', example: 'The flat is very **spacious**.' },
          { emoji: '🕯️', word: 'cosy', meaning: 'warm and comfortable', example: 'The living room feels really **cosy**.' },
          { emoji: '📦', word: 'storage', meaning: 'space for keeping things', example: 'We need more **storage** in the garage.' },
          { emoji: '🖼️', word: 'décor', meaning: 'the style of furniture and decoration in a room', example: 'I love the **décor** in this café.' },
          { emoji: '🛋️', word: 'furnished', meaning: 'with furniture already included', example: 'We rented a **furnished** apartment.' },
          { emoji: '🔨', word: 'fixer-upper', meaning: 'a house that needs a lot of repair', example: 'They bought a **fixer-upper** cheaply.' },
          { emoji: '📦', word: 'move in', meaning: 'to start living in a new home', example: 'We **move in** next week.' },
        ],
      },
    ],
  },

  'B1+::Fears and Phobias': {
    heading: 'Fears and Phobias',
    intro: 'Vocabulary for talking about fears and anxiety.',
    groups: [
      {
        words: [
          { emoji: '😱', word: 'phobia', meaning: 'an extreme, irrational fear', example: 'She has a **phobia** of heights.' },
          { emoji: '🚪', word: 'claustrophobia', meaning: 'fear of small, enclosed spaces', example: 'He avoids lifts because of his **claustrophobia**.' },
          { emoji: '🕷️', word: 'arachnophobia', meaning: 'fear of spiders', example: 'My sister has **arachnophobia**.' },
          { emoji: '😨', word: 'terrified', meaning: 'extremely afraid', example: 'She was **terrified** of the dark as a child.' },
          { emoji: '😰', word: 'anxiety', meaning: 'a feeling of worry or nervousness', example: 'He suffers from **anxiety** before exams.' },
          { emoji: '💥', word: 'panic attack', meaning: 'a sudden, intense feeling of fear', example: 'She had a **panic attack** on the plane.' },
          { emoji: '💪', word: 'overcome a fear', meaning: 'to succeed in controlling a fear', example: 'He finally **overcame his fear** of flying.' },
        ],
      },
    ],
  },

  'B1+::The Animal World': {
    heading: 'The Animal World',
    intro: 'Vocabulary for talking about wildlife and nature.',
    groups: [
      {
        words: [
          { emoji: '🦁', word: 'predator', meaning: 'an animal that hunts other animals', example: 'The lion is a top **predator**.' },
          { emoji: '🦌', word: 'prey', meaning: 'an animal hunted by another', example: 'The deer was easy **prey**.' },
          { emoji: '🌳', word: 'habitat', meaning: 'the natural environment of an animal', example: 'The rainforest is their natural **habitat**.' },
          { emoji: '🐼', word: 'endangered', meaning: 'at risk of extinction', example: 'Pandas are an **endangered** species.' },
          { emoji: '🐘', word: 'mammal', meaning: 'a warm-blooded animal that feeds milk to its young', example: 'Whales are **mammals**, not fish.' },
          { emoji: '🦖', word: 'extinct', meaning: 'no longer existing', example: 'Dinosaurs became **extinct** millions of years ago.' },
          { emoji: '🦎', word: 'camouflage', meaning: 'coloring that helps an animal hide', example: 'The chameleon uses **camouflage** to hide.' },
          { emoji: '🦢', word: 'migrate', meaning: 'to move to another area, often seasonally', example: 'Birds **migrate** south in winter.' },
        ],
      },
    ],
  },

  'B1+::Describing Books': {
    heading: 'Describing Books',
    intro: 'Vocabulary for talking about the elements of a novel or story.',
    groups: [
      {
        words: [
          { emoji: '📖', word: 'plot', meaning: 'the sequence of events in a story', example: 'The **plot** was full of surprises.' },
          { emoji: '🦸', word: 'protagonist', meaning: 'the main character of a story', example: 'The **protagonist** faces many challenges.' },
          { emoji: '🏞️', word: 'setting', meaning: 'where and when a story takes place', example: 'The **setting** is a small village in the 1800s.' },
          { emoji: '📚', word: 'page-turner', meaning: "a very exciting book that's hard to put down", example: 'This novel is a real **page-turner**.' },
          { emoji: '😲', word: 'gripping', meaning: 'exciting and holding your attention', example: 'The story was **gripping** from the start.' },
          { emoji: '❓', word: 'cliffhanger', meaning: 'an exciting, unresolved ending to a chapter', example: 'The chapter ended on a **cliffhanger**.' },
          { emoji: '🔀', word: 'twist', meaning: 'an unexpected change in the plot', example: 'The ending has a great **twist**.' },
          { emoji: '🏆', word: 'bestseller', meaning: 'a very popular, best-selling book', example: 'Her new novel became a **bestseller**.' },
        ],
      },
    ],
  },

  'B1+::Word Pairs': {
    heading: 'Word Pairs',
    intro: "Fixed expressions made of two words joined by 'and' or 'or', always used in the same order.",
    groups: [
      {
        words: [
          { word: 'salt and pepper', meaning: 'a common seasoning pair', example: 'Pass the **salt and pepper**, please.' },
          { word: 'sooner or later', meaning: 'eventually', example: "**Sooner or later**, he'll have to apologize." },
          { word: 'back and forth', meaning: 'moving repeatedly between two places', example: 'She walked **back and forth** nervously.' },
          { word: 'give and take', meaning: 'compromise between people', example: 'A good relationship needs **give and take**.' },
          { word: 'black and white', meaning: 'clearly one way or the other', example: "The issue isn't **black and white**." },
          { word: 'safe and sound', meaning: 'unharmed, safe', example: 'They arrived home **safe and sound**.' },
          { word: 'now and then', meaning: 'occasionally', example: 'We meet up **now and then**.' },
        ],
      },
    ],
    tips: ["Word pairs (also called 'binomials') are fixed — the word order never changes: salt and pepper, not pepper and salt."],
  },

  'B1+::Travel': {
    heading: 'Travel',
    intro: 'Vocabulary for planning and going on trips.',
    groups: [
      {
        words: [
          { emoji: '🗺️', word: 'itinerary', meaning: 'a planned route or schedule for a trip', example: 'Our **itinerary** includes three cities.' },
          { emoji: '🎒', word: 'backpacking', meaning: 'traveling cheaply with a backpack', example: 'They went **backpacking** around Asia.' },
          { emoji: '😴', word: 'jet lag', meaning: 'tiredness after a long flight across time zones', example: 'I have terrible **jet lag**.' },
          { emoji: '💱', word: 'currency exchange', meaning: 'changing one currency for another', example: 'We need to find a **currency exchange**.' },
          { emoji: '📄', word: 'visa', meaning: 'official permission to enter a country', example: 'You need a **visa** to visit.' },
          { emoji: '🚌', word: 'guided tour', meaning: 'a tour led by a guide', example: 'We joined a **guided tour** of the museum.' },
          { emoji: '🏨', word: 'accommodation', meaning: 'a place to stay', example: 'We booked our **accommodation** in advance.' },
          { emoji: '🧭', word: 'off the beaten track', meaning: 'not a popular tourist destination', example: 'We love finding places **off the beaten track**.' },
        ],
      },
    ],
  },

  'B1+::Everyday Problems': {
    heading: 'Everyday Problems',
    intro: 'More advanced vocabulary for describing everyday difficulties.',
    groups: [
      {
        words: [
          { emoji: '⏰', word: 'run late', meaning: 'to be behind schedule', example: 'Sorry, I **ran late** because of traffic.' },
          { emoji: '📅', word: 'miss a deadline', meaning: 'to fail to finish on time', example: 'We **missed the deadline** for the project.' },
          { emoji: '🔍', word: 'misplace', meaning: 'to lose something temporarily', example: 'I **misplaced** my glasses again.' },
          { emoji: '⚙️', word: 'malfunction', meaning: 'to stop working correctly', example: 'The printer **malfunctioned** during the meeting.' },
          { emoji: '😩', word: 'inconvenience', meaning: 'a problem that causes difficulty', example: 'The delay caused a lot of **inconvenience**.' },
          { emoji: '💪', word: 'cope with', meaning: 'to deal successfully with a difficulty', example: 'She copes well **with** stress.' },
          { emoji: '🚧', word: 'run into difficulties', meaning: 'to encounter problems', example: 'We **ran into difficulties** with the plan.' },
          { emoji: '🛠️', word: 'sort out', meaning: 'to solve or organize a problem', example: 'I need to **sort out** this issue today.' },
        ],
      },
    ],
  },

  'B1+::Social Media Actions': {
    heading: 'Social Media Actions',
    intro: 'Verbs used for talking about social media use.',
    groups: [
      {
        words: [
          { emoji: '📤', word: 'post', meaning: 'to publish content online', example: 'She **posted** a photo of her trip.' },
          { emoji: '❤️', word: 'like', meaning: 'to show approval of a post', example: 'He **liked** my comment.' },
          { emoji: '🔁', word: 'share', meaning: "to send someone else's post to others", example: 'I **shared** the article with my friends.' },
          { emoji: '💬', word: 'comment', meaning: 'to write a response to a post', example: 'She **commented** on my photo.' },
          { emoji: '➕', word: 'follow', meaning: "to subscribe to someone's updates", example: 'I **follow** a lot of travel accounts.' },
          { emoji: '🏷️', word: 'tag', meaning: "to link someone's name to a post or photo", example: 'He **tagged** me in the picture.' },
          { emoji: '📈', word: 'go viral', meaning: 'to spread very quickly online', example: 'The video **went viral** overnight.' },
          { emoji: '🚫', word: 'block', meaning: 'to stop someone from contacting you online', example: 'She **blocked** the spam account.' },
        ],
      },
    ],
  },

  'B1+::B1+ Phrasal Verbs I': {
    heading: 'B1+ Phrasal Verbs I',
    intro: 'Common phrasal verbs at this level.',
    groups: [
      {
        words: [
          { emoji: '🔍', word: 'come across', meaning: 'to find by chance', example: 'I **came across** an old photo.' },
          { emoji: '💘', word: 'fall for', meaning: 'to fall in love with', example: 'He **fell for** her immediately.' },
          { emoji: '📞', word: 'get through', meaning: 'to succeed in contacting someone', example: 'I finally **got through** to the office.' },
          { emoji: '⏳', word: 'hold up', meaning: 'to delay', example: 'Sorry, I was **held up** at work.' },
          { emoji: '🔎', word: 'look into', meaning: 'to investigate', example: 'We will **look into** the issue.' },
          { emoji: '💪', word: 'pull through', meaning: 'to survive a difficult situation', example: 'The patient **pulled through** after surgery.' },
          { emoji: '🎨', word: 'take up', meaning: 'to start a new hobby or activity', example: 'She **took up** painting last year.' },
          { emoji: '📉', word: 'wear off', meaning: 'to gradually disappear', example: 'The pain will **wear off** soon.' },
        ],
      },
    ],
  },

  'B2::Food and Food Products': {
    heading: 'Food and Food Products',
    intro: 'Vocabulary for talking about how food is made and its qualities.',
    groups: [
      {
        words: [
          { emoji: '🥫', word: 'processed food', meaning: 'food that has been industrially prepared', example: 'Try to avoid too much **processed food**.' },
          { emoji: '🌱', word: 'organic', meaning: 'grown without artificial chemicals', example: 'She only buys **organic** vegetables.' },
          { emoji: '🧪', word: 'additive', meaning: 'a substance added to food', example: 'This juice has no **additives**.' },
          { emoji: '🧊', word: 'preservative', meaning: 'a substance that stops food going bad', example: 'The bread contains **preservatives**.' },
          { emoji: '🍚', word: 'staple food', meaning: 'a basic food eaten regularly', example: 'Rice is a **staple food** in Asia.' },
          { emoji: '🧀', word: 'dairy product', meaning: 'food made from milk', example: 'Cheese and yoghurt are **dairy products**.' },
          { emoji: '🥗', word: 'nutritious', meaning: 'good for your health', example: 'Salads are **nutritious**.' },
          { emoji: '⏳', word: 'perishable', meaning: 'likely to go bad quickly', example: 'Milk is a **perishable** item.' },
        ],
      },
    ],
  },

  'B2::The Human Voice and Other Sounds': {
    heading: 'The Human Voice and Other Sounds',
    intro: 'Verbs and nouns for describing different kinds of sounds.',
    groups: [
      {
        words: [
          { emoji: '🤫', word: 'whisper', meaning: 'to speak very quietly', example: 'She **whispered** the secret to me.' },
          { emoji: '😶', word: 'mumble', meaning: 'to speak unclearly and quietly', example: 'He **mumbled** an apology.' },
          { emoji: '😱', word: 'shriek', meaning: 'to make a high, loud sound of fear or excitement', example: 'She **shrieked** when she saw the spider.' },
          { emoji: '🗣️', word: 'murmur', meaning: 'a low, continuous sound of talking', example: 'There was a **murmur** in the crowd.' },
          { emoji: '🚪', word: 'creak', meaning: 'a sharp, unpleasant sound, e.g. from a door', example: 'The old door **creaked** open.' },
          { emoji: '🐝', word: 'buzz', meaning: 'a continuous low sound, like an insect', example: 'I could hear the **buzz** of the fly.' },
          { emoji: '🔊', word: 'echo', meaning: 'a sound that repeats or bounces back', example: 'His voice **echoed** in the empty hall.' },
        ],
      },
    ],
  },

  'B2::Socializing and Social Events': {
    heading: 'Socializing and Social Events',
    intro: 'Vocabulary for talking about parties and get-togethers.',
    groups: [
      {
        words: [
          { emoji: '🎉', word: 'host', meaning: 'to organize or hold an event', example: 'She **hosted** the party at her flat.' },
          { emoji: '🥂', word: 'mingle', meaning: 'to move around talking to different people', example: 'Guests **mingled** at the reception.' },
          { emoji: '🍕', word: 'get-together', meaning: 'an informal social meeting', example: 'We had a small **get-together** last weekend.' },
          { emoji: '👨‍👩‍👧', word: 'reunion', meaning: "an event where people who haven't seen each other meet again", example: 'The school **reunion** was fun.' },
          { emoji: '💬', word: 'small talk', meaning: 'light, informal conversation', example: 'They made **small talk** while waiting.' },
          { emoji: '📩', word: 'RSVP', meaning: 'to reply to an invitation', example: 'Please **RSVP** by Friday.' },
          { emoji: '☕', word: 'catch up', meaning: 'to talk and share recent news', example: "Let's **catch up** over coffee." },
          { emoji: '👥', word: 'gathering', meaning: 'a group of people meeting together', example: 'It was a small family **gathering**.' },
        ],
      },
    ],
  },

  'B2::Talking About Movies': {
    heading: 'Talking About Movies',
    intro: 'Vocabulary for discussing and reviewing films.',
    groups: [
      {
        words: [
          { emoji: '🎟️', word: 'box office', meaning: 'ticket sales, or where tickets are sold', example: 'The film topped the **box office**.' },
          { emoji: '🔀', word: 'plot twist', meaning: 'an unexpected turn in the story', example: 'The **plot twist** surprised everyone.' },
          { emoji: '🎬', word: 'cast', meaning: 'the actors in a film', example: 'The **cast** includes several famous actors.' },
          { emoji: '🎵', word: 'soundtrack', meaning: 'the music in a film', example: 'I love the **soundtrack** of that movie.' },
          { emoji: '2️⃣', word: 'sequel', meaning: 'a film that continues an earlier story', example: 'They are making a **sequel**.' },
          { emoji: '🔤', word: 'subtitle', meaning: 'translated text shown on screen', example: 'I watched it with English **subtitles**.' },
          { emoji: '💥', word: 'blockbuster', meaning: 'a very successful, popular film', example: "It was the summer's biggest **blockbuster**." },
          { emoji: '⭐', word: 'critically acclaimed', meaning: 'praised highly by critics', example: 'The film was **critically acclaimed**.' },
        ],
      },
    ],
  },

  'B2::Technology: Managing Your Devices': {
    heading: 'Managing Your Devices',
    intro: 'Vocabulary for maintaining and troubleshooting technology.',
    groups: [
      {
        words: [
          { emoji: '🔄', word: 'sync', meaning: 'to update data across devices', example: 'My phone **syncs** with my laptop.' },
          { emoji: '🔁', word: 'factory reset', meaning: 'to erase all data and restore original settings', example: 'I did a **factory reset** on my old phone.' },
          { emoji: '💾', word: 'storage space', meaning: 'available memory for files', example: 'I need more **storage space**.' },
          { emoji: '🔔', word: 'notification', meaning: 'an alert from an app or device', example: 'I got a **notification** about the update.' },
          { emoji: '📵', word: 'screen time', meaning: 'time spent looking at a screen', example: 'My **screen time** was too high last week.' },
          { emoji: '✈️', word: 'airplane mode', meaning: 'a setting that disables wireless connections', example: 'Please switch to **airplane mode**.' },
          { emoji: '🔃', word: 'restart', meaning: 'to turn a device off and on again', example: 'Try to **restart** your computer.' },
          { emoji: '🔌', word: 'compatible', meaning: 'able to work together', example: "This charger isn't **compatible** with my phone." },
        ],
      },
    ],
  },

  'B2::Phrasal Verbs I': {
    heading: 'Phrasal Verbs I',
    intro: 'Common phrasal verbs at upper-intermediate level.',
    groups: [
      {
        words: [
          { word: 'bring about', meaning: 'to cause something to happen', example: 'The new law **brought about** big changes.' },
          { word: 'carry out', meaning: 'to perform, or do something planned', example: 'They **carried out** a survey.' },
          { word: 'come up with', meaning: 'to think of an idea or plan', example: 'She **came up with** a great solution.' },
          { word: 'do away with', meaning: 'to get rid of something', example: 'They **did away with** the old rule.' },
          { word: 'fall through', meaning: 'to fail to happen', example: 'Our holiday plans **fell through**.' },
          { word: 'get by', meaning: 'to manage with what you have', example: 'We **get by** on a small budget.' },
          { word: 'make up for', meaning: 'to compensate for something', example: 'He tried to **make up for** his mistake.' },
          { word: 'put up with', meaning: 'to tolerate', example: "I can't **put up with** this noise." },
        ],
      },
    ],
  },

  'B2::Phrasal Verbs II': {
    heading: 'Phrasal Verbs II',
    intro: 'More common phrasal verbs at upper-intermediate level.',
    groups: [
      {
        words: [
          { word: 'account for', meaning: 'to explain something, or make up a part of it', example: 'Tourism **accounts for** 20% of income.' },
          { word: 'break down', meaning: 'to stop working, or to become very upset', example: 'She **broke down** in tears.' },
          { word: 'catch up on', meaning: 'to do something you fell behind on', example: 'I need to **catch up on** emails.' },
          { word: 'come across as', meaning: 'to give a particular impression', example: 'He **comes across as** very confident.' },
          { word: 'get away with', meaning: 'to avoid punishment for something', example: 'He **got away with** cheating.' },
          { word: 'hold on to', meaning: 'to keep, not let go of', example: '**Hold on to** your ticket.' },
          { word: 'look up to', meaning: 'to admire and respect', example: 'She **looks up to** her older sister.' },
          { word: 'stand up for', meaning: 'to defend or support', example: 'You should **stand up for** your beliefs.' },
        ],
      },
    ],
  },

  'B2::Relationships': {
    heading: 'Relationships',
    intro: 'More advanced vocabulary for describing relationships.',
    groups: [
      {
        words: [
          { word: 'compatible', meaning: 'suited to each other', example: 'They are very **compatible**.' },
          { word: 'commitment', meaning: 'dedication to a relationship', example: 'Marriage requires **commitment**.' },
          { word: 'take someone for granted', meaning: 'to not appreciate someone enough', example: "Don't **take** her **for granted**." },
          { word: 'drift apart', meaning: 'to gradually become less close', example: 'They **drifted apart** after university.' },
          { word: 'on good/bad terms', meaning: 'having a good or bad relationship with someone', example: "We're on **good terms** with our neighbours." },
          { word: 'mutual respect', meaning: 'respect shared between two people', example: 'Their friendship is based on **mutual respect**.' },
          { word: 'long-distance relationship', meaning: 'a relationship where partners live far apart', example: 'They are in a **long-distance relationship**.' },
          { word: 'trust', meaning: "belief in someone's honesty or reliability", example: '**Trust** is essential in a relationship.' },
        ],
      },
    ],
  },

  'B2::Challenges and Achievements': {
    heading: 'Challenges and Achievements',
    intro: 'Vocabulary for talking about difficulties and success.',
    groups: [
      {
        words: [
          { emoji: '💪', word: 'overcome', meaning: 'to succeed in dealing with a problem', example: 'She **overcame** many obstacles.' },
          { emoji: '🎯', word: 'milestone', meaning: 'an important stage or event', example: 'Graduating was a huge **milestone**.' },
          { emoji: '💡', word: 'breakthrough', meaning: 'an important discovery or development', example: 'Scientists made a major **breakthrough**.' },
          { emoji: '✅', word: 'accomplish', meaning: 'to succeed in doing something', example: 'We **accomplished** our goal.' },
          { emoji: '📉', word: 'setback', meaning: 'a problem that delays progress', example: 'The project suffered a **setback**.' },
          { emoji: '🔁', word: 'persevere', meaning: 'to continue despite difficulty', example: 'She **persevered** and finished the marathon.' },
          { emoji: '🏆', word: 'triumph', meaning: 'a great victory or achievement', example: 'It was a **triumph** for the whole team.' },
          { emoji: '🌟', word: 'fulfil potential', meaning: 'to achieve what you are capable of', example: 'He finally **fulfilled his potential**.' },
        ],
      },
    ],
  },

  'B2::Feelings and Emotions': {
    heading: 'Feelings and Emotions',
    intro: 'More nuanced vocabulary for emotional states.',
    groups: [
      {
        words: [
          { emoji: '😵', word: 'overwhelmed', meaning: 'having too much to deal with', example: 'She felt **overwhelmed** by the workload.' },
          { emoji: '😤', word: 'frustrated', meaning: 'annoyed at not being able to do something', example: 'He was **frustrated** with the slow internet.' },
          { emoji: '😌', word: 'relieved', meaning: 'no longer worried', example: 'I was **relieved** to hear the news.' },
          { emoji: '🥹', word: 'nostalgic', meaning: 'sentimental about the past', example: 'This song makes me **nostalgic**.' },
          { emoji: '😒', word: 'envious', meaning: 'wanting what someone else has', example: "I'm a bit **envious** of her success." },
          { emoji: '🤩', word: 'ecstatic', meaning: 'extremely happy', example: 'She was **ecstatic** about the news.' },
          { emoji: '😠', word: 'resentful', meaning: 'bitter or angry about something unfair', example: 'He felt **resentful** about being ignored.' },
          { emoji: '😐', word: 'indifferent', meaning: 'not interested or caring', example: 'He seemed **indifferent** to the result.' },
        ],
      },
    ],
  },

  'B2::News and Media': {
    heading: 'News and Media',
    intro: 'More advanced vocabulary about the press and how it operates.',
    groups: [
      {
        words: [
          { word: 'censorship', meaning: 'control of what can be published or said', example: 'The country has strict **censorship**.' },
          { word: 'propaganda', meaning: 'biased information used to influence people', example: 'It was clearly **propaganda**.' },
          { word: 'tabloid', meaning: 'a newspaper with sensational, short stories', example: 'The story appeared in a **tabloid**.' },
          { word: 'editorial', meaning: "an article giving the newspaper's opinion", example: 'The **editorial** criticized the government.' },
          { word: 'bias', meaning: 'unfair favoritism towards a side', example: 'The report showed clear **bias**.' },
          { word: 'credible', meaning: 'believable, trustworthy', example: 'Is this a **credible** source?' },
          { word: 'misinformation', meaning: 'false or inaccurate information', example: 'Social media spreads a lot of **misinformation**.' },
        ],
      },
    ],
  },

  'B2::War and Peace': {
    heading: 'War and Peace',
    intro: 'Vocabulary for talking about conflict and diplomacy.',
    groups: [
      {
        words: [
          { emoji: '⚔️', word: 'conflict', meaning: 'a serious disagreement or fight', example: 'The **conflict** lasted for years.' },
          { emoji: '🕊️', word: 'ceasefire', meaning: 'an agreement to stop fighting', example: 'Both sides agreed to a **ceasefire**.' },
          { emoji: '💣', word: 'invasion', meaning: 'entering a country by force', example: 'The **invasion** shocked the world.' },
          { emoji: '⚰️', word: 'casualty', meaning: 'a person killed or injured', example: 'There were many **casualties**.' },
          { emoji: '📜', word: 'treaty', meaning: 'a formal agreement between countries', example: 'They signed a peace **treaty**.' },
          { emoji: '🧳', word: 'refugee', meaning: 'a person forced to leave their country', example: 'The war created millions of **refugees**.' },
          { emoji: '🤝', word: 'negotiate peace', meaning: 'to discuss in order to end a conflict', example: 'Leaders met to **negotiate peace**.' },
          { emoji: '🪖', word: 'armed forces', meaning: "a country's military", example: 'The **armed forces** were deployed.' },
        ],
      },
    ],
  },

  'B2::Tourism': {
    heading: 'Tourism',
    intro: 'Vocabulary for talking about the tourism industry.',
    groups: [
      {
        words: [
          { emoji: '🧳', word: 'mass tourism', meaning: 'tourism involving very large numbers of people', example: '**Mass tourism** damages some beaches.' },
          { emoji: '🌿', word: 'eco-tourism', meaning: 'tourism focused on protecting nature', example: '**Eco-tourism** is growing in popularity.' },
          { emoji: '🏛️', word: 'heritage site', meaning: 'a place of historical importance', example: 'The castle is a UNESCO **heritage site**.' },
          { emoji: '🖼️', word: 'cultural attraction', meaning: 'a place of cultural interest', example: "The museum is the city's main **cultural attraction**." },
          { emoji: '💸', word: 'tourist trap', meaning: 'a place that overcharges tourists', example: 'That restaurant is a **tourist trap**.' },
          { emoji: '📉', word: 'off-season', meaning: 'the quieter time of year for tourism', example: 'We travel in the **off-season** to save money.' },
          { emoji: '🧳', word: 'package holiday', meaning: 'a trip with flights and hotels booked together', example: 'We booked a **package holiday** to Greece.' },
          { emoji: '🌍', word: 'local customs', meaning: 'traditional practices of a place', example: 'Respect the **local customs** when traveling.' },
        ],
      },
    ],
  },

  'B2::Pollution and the Environment': {
    heading: 'Pollution and the Environment',
    intro: 'More advanced vocabulary for environmental issues.',
    groups: [
      {
        words: [
          { emoji: '🌳', word: 'biodiversity', meaning: 'the variety of life in an area', example: 'The rainforest has huge **biodiversity**.' },
          { emoji: '🪓', word: 'deforestation', meaning: 'clearing large areas of forest', example: '**Deforestation** threatens many species.' },
          { emoji: '🌎', word: 'ecosystem', meaning: 'a community of living things and their environment', example: 'Pollution damages the marine **ecosystem**.' },
          { emoji: '⛽', word: 'fossil fuels', meaning: 'coal, oil, and gas', example: 'We rely too much on **fossil fuels**.' },
          { emoji: '☀️', word: 'ozone layer', meaning: "a layer protecting Earth from the sun's UV rays", example: 'The **ozone layer** is recovering slowly.' },
          { emoji: '☢️', word: 'toxic waste', meaning: 'harmful, poisonous waste material', example: 'The factory produced **toxic waste**.' },
          { emoji: '🐢', word: 'conservation', meaning: 'protecting nature and resources', example: 'They work in wildlife **conservation**.' },
          { emoji: '🌡️', word: 'global warming', meaning: "the rise in Earth's temperature", example: '**Global warming** is affecting the climate.' },
        ],
      },
    ],
  },

  'B2::Money and Finance': {
    heading: 'Money and Finance',
    intro: 'Vocabulary for talking about personal and national finance.',
    groups: [
      {
        words: [
          { word: 'inflation', meaning: 'a general rise in prices', example: '**Inflation** has increased the cost of living.' },
          { word: 'interest rate', meaning: 'the cost of borrowing money', example: 'The bank raised its **interest rate**.' },
          { word: 'currency', meaning: 'the money used in a country', example: 'The local **currency** is the euro.' },
          { word: 'asset', meaning: 'something valuable that you own', example: 'Property is a valuable **asset**.' },
          { word: 'loan', meaning: 'money borrowed that must be paid back', example: 'They took out a **loan** to buy a car.' },
          { word: 'stock market', meaning: 'where shares of companies are traded', example: 'The **stock market** fell sharply today.' },
          { word: 'tax', meaning: 'money paid to the government', example: 'We pay **tax** on our income.' },
          { word: 'exchange rate', meaning: 'the value of one currency compared to another', example: 'The **exchange rate** changes daily.' },
        ],
      },
    ],
  },

  'B2::Cars, Roads and Traffic': {
    heading: 'Cars, Roads and Traffic',
    intro: 'Vocabulary for driving and road conditions.',
    groups: [
      {
        words: [
          { emoji: '🛣️', word: 'motorway', meaning: 'a large road for fast traffic', example: 'We drove on the **motorway**.' },
          { emoji: '🚦', word: 'speed limit', meaning: 'the maximum legal speed', example: 'The **speed limit** here is 50 km/h.' },
          { emoji: '🚸', word: 'pedestrian crossing', meaning: 'a place for people to cross the road safely', example: 'Use the **pedestrian crossing**.' },
          { emoji: '🚗', word: 'overtake', meaning: 'to pass another vehicle', example: 'It is dangerous to **overtake** here.' },
          { emoji: '🚧', word: 'roadworks', meaning: 'repairs being done on a road', example: 'There are **roadworks** on the main road.' },
          { emoji: '🚙', word: 'congestion', meaning: 'heavy traffic that blocks movement', example: 'Traffic **congestion** is worse in the mornings.' },
          { emoji: '🔧', word: 'breakdown', meaning: 'when a vehicle stops working', example: 'We had a **breakdown** on the motorway.' },
        ],
      },
    ],
  },

  'B2::Health and Sickness': {
    heading: 'Health and Sickness',
    intro: 'Vocabulary for describing illness and medical care.',
    groups: [
      {
        words: [
          { emoji: '⏳', word: 'chronic', meaning: 'lasting a long time, of an illness', example: 'He has a **chronic** condition.' },
          { emoji: '🤒', word: 'symptom', meaning: 'a sign of illness', example: 'A high temperature is a common **symptom**.' },
          { emoji: '🩺', word: 'diagnosis', meaning: 'identification of an illness', example: 'The doctor gave a clear **diagnosis**.' },
          { emoji: '💊', word: 'prescription', meaning: "a doctor's order for medicine", example: 'She picked up her **prescription**.' },
          { emoji: '💪', word: 'recover', meaning: 'to get better after illness', example: 'He **recovered** quickly.' },
          { emoji: '🦠', word: 'contagious', meaning: 'able to spread to others', example: 'The flu is very **contagious**.' },
          { emoji: '🏥', word: 'treatment', meaning: 'medical care given for an illness', example: 'She is having **treatment** for her back.' },
          { emoji: '🛡️', word: 'immune system', meaning: "the body's defense against illness", example: 'A healthy diet boosts your **immune system**.' },
        ],
      },
    ],
  },

  'B2::Work and Jobs': {
    heading: 'Work and Jobs',
    intro: 'More advanced vocabulary for the workplace.',
    groups: [
      {
        words: [
          { word: 'workload', meaning: 'the amount of work you have to do', example: 'My **workload** has increased.' },
          { word: 'redundant', meaning: 'having lost a job because it is no longer needed', example: 'He was made **redundant** last year.' },
          { word: 'freelance', meaning: 'working independently, not for one employer', example: 'She works as a **freelance** designer.' },
          { word: 'appraisal', meaning: 'a formal review of work performance', example: 'I have my annual **appraisal** next week.' },
          { word: 'job security', meaning: 'confidence of keeping your job', example: 'The role offers good **job security**.' },
          { word: 'burnout', meaning: 'extreme tiredness from work stress', example: 'She experienced **burnout** after months of overwork.' },
          { word: 'perks', meaning: 'extra benefits from a job', example: 'The company offers great **perks**.' },
          { word: 'sick leave', meaning: 'time off work due to illness', example: 'He is on **sick leave** this week.' },
        ],
      },
    ],
  },

  'B2::Education': {
    heading: 'Education',
    intro: 'More advanced vocabulary about schools, universities, and learning.',
    groups: [
      {
        words: [
          { word: 'literacy', meaning: 'the ability to read and write', example: 'The programme improves **literacy** rates.' },
          { word: 'academic', meaning: 'related to education or school', example: 'She has a strong **academic** record.' },
          { word: 'dropout', meaning: 'a person who leaves school before finishing', example: 'The school reduced its **dropout** rate.' },
          { word: 'vocational training', meaning: 'training for a specific job or trade', example: 'He did **vocational training** as a mechanic.' },
          { word: 'plagiarism', meaning: "copying someone else's work", example: '**Plagiarism** is taken very seriously.' },
          { word: 'assessment', meaning: 'evaluation of student performance', example: 'The final **assessment** is next month.' },
          { word: 'distance learning', meaning: 'studying remotely, not in person', example: 'She completed her degree through **distance learning**.' },
          { word: 'mentor', meaning: 'an experienced person who advises and guides', example: 'My **mentor** helped me a lot.' },
        ],
      },
    ],
  },

  'C1::Feelings and Reactions': {
    heading: 'Feelings and Reactions',
    intro: 'Precise adjectives for describing emotional reactions.',
    groups: [
      {
        words: [
          { word: 'taken aback', meaning: 'very surprised', example: 'I was **taken aback** by his rudeness.' },
          { word: 'appalled', meaning: 'shocked and disgusted', example: 'She was **appalled** at the conditions.' },
          { word: 'elated', meaning: 'extremely happy', example: 'He was **elated** after winning.' },
          { word: 'apprehensive', meaning: 'anxious about something in the future', example: "I'm a bit **apprehensive** about the exam." },
          { word: 'indignant', meaning: 'angry because something seems unfair', example: 'She was **indignant** at the accusation.' },
          { word: 'wistful', meaning: 'sadly thinking about something desired', example: 'He gave a **wistful** smile.' },
          { word: 'disgruntled', meaning: 'annoyed or dissatisfied', example: '**Disgruntled** customers complained.' },
          { word: 'awestruck', meaning: 'filled with amazement', example: 'We were **awestruck** by the view.' },
        ],
      },
    ],
  },

  'C1::Ways of Walking': {
    heading: 'Ways of Walking',
    intro: 'Precise verbs for different manners of walking.',
    groups: [
      {
        words: [
          { emoji: '🚶‍♂️', word: 'stride', meaning: 'to walk with long, confident steps', example: 'He **strode** into the room.' },
          { emoji: '🚶', word: 'stroll', meaning: 'to walk slowly and casually', example: 'We **strolled** along the beach.' },
          { emoji: '🥴', word: 'stagger', meaning: 'to walk unsteadily', example: 'He **staggered** home after the party.' },
          { emoji: '🤫', word: 'tiptoe', meaning: 'to walk quietly on your toes', example: 'She **tiptoed** past the sleeping baby.' },
          { emoji: '🥾', word: 'march', meaning: 'to walk with firm, regular steps', example: 'The soldiers **marched** in formation.' },
          { emoji: '🦵', word: 'limp', meaning: 'to walk unevenly because of an injury', example: 'He **limped** off the field.' },
          { emoji: '🚶‍♀️', word: 'wander', meaning: 'to walk without a clear direction', example: 'We **wandered** around the old town.' },
          { emoji: '👣', word: 'stomp', meaning: 'to walk with heavy, deliberate steps, often angrily', example: 'She **stomped** out of the room.' },
        ],
      },
    ],
  },

  'C1::Vague Language: Imprecision': {
    heading: 'Vague Language',
    intro: 'Expressions used to make a statement deliberately less exact or precise.',
    groups: [
      {
        words: [
          { word: 'sort of / kind of', meaning: 'used to make a statement less exact', example: "It's **sort of** difficult to explain." },
          { word: 'or so', meaning: 'approximately', example: 'It took an hour **or so**.' },
          { word: 'and stuff like that', meaning: 'and other similar things', example: 'We talked about work **and stuff like that**.' },
          { word: 'a bit of a', meaning: 'somewhat, softening a statement', example: "It's **a bit of a** problem." },
          { word: 'roughly', meaning: 'approximately', example: 'It costs **roughly** $50.' },
          { word: 'more or less', meaning: 'approximately, almost', example: 'The project is **more or less** finished.' },
          { word: 'thingy / whatsit', meaning: "informal words for an object you can't name", example: 'Pass me that **thingy** over there.' },
        ],
      },
    ],
    tips: ['Vague language softens statements and is common in informal spoken English — avoid it in formal writing.'],
  },

  'C1::Idiomatic Infinitive Phrases': {
    heading: 'Idiomatic Infinitive Phrases',
    intro: 'Fixed to-infinitive phrases used to introduce or comment on a statement.',
    groups: [
      {
        words: [
          { word: 'to cut a long story short', meaning: 'to summarize quickly', example: '**To cut a long story short**, we missed the flight.' },
          { word: 'to be honest', meaning: 'used to give a frank opinion', example: "**To be honest**, I didn't enjoy the film." },
          { word: 'to say the least', meaning: 'used to show something is an understatement', example: 'The service was slow, **to say the least**.' },
          { word: 'to make matters worse', meaning: 'and the situation became even more difficult', example: '**To make matters worse**, it started raining.' },
          { word: 'needless to say', meaning: 'obviously', example: '**Needless to say**, we were exhausted.' },
          { word: 'to top it all off', meaning: 'as a final, often unwelcome, addition', example: 'And **to top it all off**, we got a parking ticket.' },
        ],
      },
    ],
  },

  'C1::Adverb-Adjective Collocations': {
    heading: 'Adverb-Adjective Collocations',
    intro: "Fixed adverb-adjective pairs that sound more natural than 'very' + adjective.",
    groups: [
      {
        words: [
          { word: 'bitterly disappointed', meaning: 'very disappointed', example: 'She was **bitterly disappointed** with the result.' },
          { word: 'deeply concerned', meaning: 'very worried', example: 'We are **deeply concerned** about the situation.' },
          { word: 'highly unlikely', meaning: 'very improbable', example: "It's **highly unlikely** to rain today." },
          { word: 'blissfully unaware', meaning: 'happily not knowing about something', example: 'He was **blissfully unaware** of the danger.' },
          { word: 'painfully obvious', meaning: 'extremely clear', example: 'It was **painfully obvious** he was lying.' },
          { word: 'utterly convinced', meaning: 'completely certain', example: "I'm **utterly convinced** she's right." },
          { word: 'ridiculously expensive', meaning: 'extremely and unreasonably expensive', example: 'This hotel is **ridiculously expensive**.' },
          { word: 'perfectly reasonable', meaning: 'completely fair or sensible', example: 'That seems like a **perfectly reasonable** request.' },
        ],
      },
    ],
    tips: ["Learn these adverb-adjective pairs as fixed chunks — not every intensifier combines naturally with every adjective."],
  },

  'C1::Eating and Drinking': {
    heading: 'Eating and Drinking',
    intro: 'More precise and idiomatic verbs for eating and drinking.',
    groups: [
      {
        words: [
          { emoji: '🐭', word: 'nibble', meaning: 'to eat in small bites', example: 'She **nibbled** on some crackers.' },
          { emoji: '😋', word: 'devour', meaning: 'to eat quickly and eagerly', example: 'He **devoured** the whole pizza.' },
          { emoji: '😌', word: 'savour', meaning: 'to enjoy food slowly', example: 'She **savoured** every bite of the cake.' },
          { emoji: '🥤', word: 'gulp down', meaning: 'to drink or eat quickly', example: 'He **gulped down** his coffee.' },
          { emoji: '🍿', word: 'munch', meaning: 'to chew steadily and noisily', example: 'They **munched** on popcorn during the film.' },
          { emoji: '🍽️', word: 'gorge oneself', meaning: 'to eat a large amount greedily', example: 'We **gorged ourselves** at the buffet.' },
          { emoji: '🍴', word: 'be starving', meaning: 'to be extremely hungry', example: "I'm **starving** — let's eat!" },
          { emoji: '🍫', word: 'have a sweet tooth', meaning: 'to love sweet food', example: 'She **has a sweet tooth**.' },
        ],
      },
    ],
  },

  'C1::Time and Place Idioms': {
    heading: 'Time and Place Idioms',
    intro: 'Common idioms for describing when and where things happen.',
    groups: [
      {
        words: [
          { word: 'in the nick of time', meaning: 'at the last possible moment', example: 'We arrived **in the nick of time**.' },
          { word: 'once in a blue moon', meaning: 'very rarely', example: 'He visits **once in a blue moon**.' },
          { word: 'out of the blue', meaning: 'suddenly, unexpectedly', example: 'She called me **out of the blue**.' },
          { word: 'in broad daylight', meaning: 'during the day, openly', example: 'The robbery happened **in broad daylight**.' },
          { word: 'in the middle of nowhere', meaning: 'in a very remote place', example: 'Their house is **in the middle of nowhere**.' },
          { word: 'on the spot', meaning: 'immediately, at that exact place', example: 'He was hired **on the spot**.' },
          { word: 'around the clock', meaning: 'all day and night', example: 'The factory operates **around the clock**.' },
        ],
      },
    ],
  },

  'C1::Government and Politics': {
    heading: 'Government and Politics',
    intro: 'Vocabulary for discussing political systems and processes.',
    groups: [
      {
        words: [
          { word: 'legislation', meaning: 'laws considered as a group', example: 'New **legislation** was passed last month.' },
          { word: 'constituency', meaning: 'a district represented by an elected official', example: 'She represents a large **constituency**.' },
          { word: 'ballot', meaning: 'a vote, often written and secret', example: 'They cast their **ballot** in the election.' },
          { word: 'coalition', meaning: 'a temporary alliance between parties', example: 'A **coalition** government was formed.' },
          { word: 'referendum', meaning: 'a public vote on a single issue', example: 'The country held a **referendum** on independence.' },
          { word: 'cabinet', meaning: 'the senior ministers of a government', example: 'The Prime Minister met with the **cabinet**.' },
          { word: 'opposition', meaning: 'the party not in power', example: 'The **opposition** criticized the new policy.' },
          { word: 'manifesto', meaning: "a party's public declaration of policy", example: 'They published their election **manifesto**.' },
        ],
      },
    ],
  },

  'C2::Advanced Idiomatic Expressions': {
    heading: 'Advanced Idiomatic Expressions',
    intro: 'Widely used idioms for advanced, natural-sounding English.',
    groups: [
      {
        words: [
          { word: 'bite the bullet', meaning: 'to face something difficult bravely', example: 'We just have to **bite the bullet** and start.' },
          { word: 'burn the midnight oil', meaning: 'to work late into the night', example: 'She **burned the midnight oil** before the exam.' },
          { word: 'let the cat out of the bag', meaning: 'to reveal a secret accidentally', example: 'He **let the cat out of the bag** about the surprise.' },
          { word: 'throw in the towel', meaning: 'to give up', example: 'After years of trying, they **threw in the towel**.' },
          { word: 'read between the lines', meaning: 'to understand a hidden meaning', example: 'You need to **read between the lines** here.' },
          { word: 'the tip of the iceberg', meaning: 'a small visible part of a much bigger problem', example: 'These complaints are just **the tip of the iceberg**.' },
          { word: 'cut corners', meaning: 'to do something in the cheapest or easiest way, often badly', example: 'They **cut corners** on safety.' },
        ],
      },
    ],
  },

  'C2::Literary and Rhetorical Devices': {
    heading: 'Literary and Rhetorical Devices',
    intro: 'Terms for techniques used in literature and persuasive writing.',
    groups: [
      {
        words: [
          { word: 'metaphor', meaning: 'describing something as if it were something else', example: "'Time is a thief' is a **metaphor**." },
          { word: 'alliteration', meaning: 'repetition of the same starting sound', example: "'Peter Piper picked' uses **alliteration**." },
          { word: 'irony', meaning: 'a contrast between expectation and reality', example: 'It was pure **irony** that the fire station burned down.' },
          { word: 'hyperbole', meaning: 'deliberate exaggeration for effect', example: "'I've told you a million times' is **hyperbole**." },
          { word: 'foreshadowing', meaning: 'hinting at future events in a story', example: 'The dark clouds were **foreshadowing** in the novel.' },
          { word: 'juxtaposition', meaning: 'placing two contrasting things side by side', example: 'The **juxtaposition** of wealth and poverty was striking.' },
          { word: 'personification', meaning: 'giving human qualities to non-human things', example: "'The wind whispered' is **personification**." },
          { word: 'rhetorical question', meaning: 'a question asked for effect, not an answer', example: "'Who wouldn't want that?' is a **rhetorical question**." },
        ],
      },
    ],
  },

  'C2::Specialized Academic Terminology': {
    heading: 'Specialized Academic Terminology',
    intro: 'Common terms used in academic writing and research.',
    groups: [
      {
        words: [
          { word: 'hypothesis', meaning: 'a proposed explanation to be tested', example: 'The researcher tested her **hypothesis**.' },
          { word: 'methodology', meaning: 'the methods used in research', example: "The study's **methodology** was well designed." },
          { word: 'empirical', meaning: 'based on observation or experiment, not theory', example: 'The claim lacks **empirical** evidence.' },
          { word: 'paradigm', meaning: 'a typical model or pattern of something', example: 'This represents a new **paradigm** in medicine.' },
          { word: 'correlation', meaning: 'a relationship between two variables', example: 'There is a strong **correlation** between the two factors.' },
          { word: 'qualitative', meaning: 'relating to quality or description, not numbers', example: 'They used **qualitative** interviews.' },
          { word: 'quantitative', meaning: 'relating to numbers or measurable data', example: 'The **quantitative** data supported the theory.' },
          { word: 'peer-reviewed', meaning: 'checked by other experts before publication', example: 'It was published in a **peer-reviewed** journal.' },
        ],
      },
    ],
  },

  'C2::Subtle Connotations': {
    heading: 'Subtle Connotations',
    intro: 'Word pairs that share a literal meaning but carry different emotional associations.',
    groups: [
      {
        words: [
          { word: 'slim (positive) vs skinny (negative)', meaning: 'both mean thin, but skinny sounds less flattering', example: 'She looks **slim**; he looks a bit **skinny**.' },
          { word: 'curious (positive) vs nosy (negative)', meaning: 'both mean interested in others, but nosy is critical', example: "He's **curious** about people; she's just **nosy**." },
          { word: 'confident (positive) vs arrogant (negative)', meaning: 'both show self-belief, but arrogant is excessive', example: "She's **confident**, not **arrogant**." },
          { word: 'frugal (positive) vs stingy (negative)', meaning: 'both mean careful with money, but stingy is unkind', example: "He's **frugal**, not **stingy**." },
          { word: 'assertive (positive) vs pushy (negative)', meaning: 'both mean direct, but pushy is too forceful', example: 'Be **assertive**, not **pushy**.' },
          { word: 'unique (positive) vs weird (negative)', meaning: 'both mean unusual, but weird is judgmental', example: 'Her style is **unique**, not **weird**.' },
        ],
      },
    ],
    tips: ["Two words can share a literal meaning but carry very different connotations — choose carefully depending on your attitude."],
  },

  'C2::Professional and Legal Vocabulary': {
    heading: 'Professional and Legal Vocabulary',
    intro: 'Formal vocabulary used in business and legal contexts.',
    groups: [
      {
        words: [
          { word: 'liability', meaning: 'legal responsibility for something', example: 'The company denied **liability** for the accident.' },
          { word: 'breach of contract', meaning: 'failing to follow the terms of an agreement', example: 'They sued for **breach of contract**.' },
          { word: 'jurisdiction', meaning: 'the authority of a court to make decisions', example: "This falls outside the court's **jurisdiction**." },
          { word: 'litigation', meaning: 'the process of taking legal action', example: 'The dispute led to lengthy **litigation**.' },
          { word: 'defendant / plaintiff', meaning: 'the accused / the person bringing the case', example: 'The **defendant** pleaded not guilty.' },
          { word: 'terms and conditions', meaning: 'the rules of an agreement', example: 'Read the **terms and conditions** carefully.' },
          { word: 'compliance', meaning: 'acting according to rules or laws', example: 'The company ensures **compliance** with regulations.' },
          { word: 'indemnity', meaning: 'security or protection against financial loss', example: 'The policy provides **indemnity** for damages.' },
        ],
      },
    ],
  },

  'C2::Advanced Collocations': {
    heading: 'Advanced Collocations',
    intro: 'Sophisticated verb-noun collocations for formal, precise English.',
    groups: [
      {
        words: [
          { word: 'reach a consensus', meaning: 'to come to a general agreement', example: 'The committee **reached a consensus**.' },
          { word: 'exercise caution', meaning: 'to be careful', example: 'Drivers should **exercise caution** in fog.' },
          { word: 'pose a threat', meaning: 'to be a danger', example: 'The virus **poses a threat** to public health.' },
          { word: 'harbour doubts', meaning: 'to have doubts, usually secretly', example: 'She **harboured doubts** about the plan.' },
          { word: 'draw a conclusion', meaning: 'to decide something based on evidence', example: "It's too early to **draw a conclusion**." },
          { word: 'exert influence', meaning: 'to use your power to affect something', example: 'He **exerted influence** over the decision.' },
          { word: 'bear responsibility', meaning: 'to be responsible for something', example: 'They must **bear responsibility** for the failure.' },
          { word: 'forge a relationship', meaning: 'to build a strong relationship over time', example: 'The two countries **forged a relationship**.' },
        ],
      },
    ],
  },

  'C2::Figurative Language': {
    heading: 'Figurative Language',
    intro: 'Vivid figurative expressions used to describe situations and feelings.',
    groups: [
      {
        words: [
          { word: 'a rollercoaster of emotions', meaning: 'a period with many ups and downs of feeling', example: 'The trial was **a rollercoaster of emotions**.' },
          { word: 'a ray of hope', meaning: 'a small sign that something good might happen', example: 'The new treatment offers **a ray of hope**.' },
          { word: 'a storm is brewing', meaning: 'trouble is developing', example: 'You could feel **a storm brewing** in the office.' },
          { word: 'walking on eggshells', meaning: 'being very careful not to upset someone', example: "I feel like I'm **walking on eggshells** around him." },
          { word: 'an uphill battle', meaning: 'a difficult struggle', example: 'Recovering from the injury was **an uphill battle**.' },
          { word: 'a drop in the ocean', meaning: 'a very small amount compared to what is needed', example: 'The donation was **a drop in the ocean**.' },
        ],
      },
    ],
  },

  'C2::Register and Tone': {
    heading: 'Register and Tone',
    intro: 'Vocabulary for describing how formal, direct, or emotionally loaded language is.',
    groups: [
      {
        words: [
          { word: 'colloquial', meaning: 'informal, conversational language', example: "'Gonna' is a **colloquial** form of 'going to'." },
          { word: 'candid', meaning: 'honest and direct, sometimes blunt', example: 'He gave a **candid** answer.' },
          { word: 'diplomatic', meaning: 'tactful, careful not to offend', example: 'She gave a **diplomatic** response to a difficult question.' },
          { word: 'condescending', meaning: 'showing a feeling of superiority', example: 'His tone was quite **condescending**.' },
          { word: 'sarcastic', meaning: 'saying the opposite of what you mean, to mock', example: '"Great job," he said **sarcastically**.' },
          { word: 'understated', meaning: 'expressed in a subtle, restrained way', example: 'His achievements were **understated** in the report.' },
        ],
      },
    ],
    tips: ['Register is about formality (formal ↔ informal); tone is about attitude (serious, sarcastic, diplomatic) — adjust both to your audience.'],
  },
};
