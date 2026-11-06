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
  "A1::Common Things": {
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

  "A1::Parts of the Body": {
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

  "A1::Shops and Shopping": {
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

  "A1::Countries and Nationalities": {
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

  "A1::Food and Meals": {
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

  "A1::Daily Routines": {
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

  "A1::Opposite Adjectives": {
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

  "A1::Family and Relatives": {
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

  "A1::Common Verbs and Verb Phrases": {
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

  "A1::Days, Months and Seasons": {
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

  "A1::Clothes": {
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

  "A1::The House: Rooms and Things": {
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

  "A1::Places in a Town": {
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

  "A1::At the Restaurant": {
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

  "A1::Eating and Drinking Utensils": {
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

  "A1::Movement Verbs": {
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

  "A1::Time Words": {
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

  "A1::Basic Phrasal Verbs": {
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

  "A2::Technology": {
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

  "A2::Describing People": {
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

  "B1::Personality Adjectives": {
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

  "B1::Shopping and Consumerism": {
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

  "A2::Containers and Quantities": {
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

  "A2::Nature and Landscape": {
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

  "A2::Holidays and Travel": {
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

  "A2::Free Time Activities": {
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

  "A2::The Weather": {
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

  "B1::Common Phrasal Verbs": {
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

  "B1::Sport and Competition": {
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

  "B1::Houses and Homes": {
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

  "A2::Transport": {
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

  "B1::Travel and Tourism": {
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

  "B1::Food and Cooking": {
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

  "B1::Work and Careers": {
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

  "B1::Money and Banking": {
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

  "B1::Education": {
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

  "B1::Relationships": {
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

  "B1::Media and News": {
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

  "A2::Animals": {
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

  "B1::Entertainment": {
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

  "B1::The Environment": {
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

  "B2::Arts and Literature": {
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

  "B1::Technology and the Internet": {
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

  "B2::Advanced Phrasal Verbs": {
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

  "B2::Psychology and Emotions": {
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

  "B2::Media and Advertising": {
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

  "B2::Politics and Society": {
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

  "B2::Travel and Culture": {
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

  "B2::Climate Change": {
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

  "B2::Business and the Economy": {
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

  "B2::Urban Life": {
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

  "B2::Health and Medicine": {
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

  "B2::Work and Employment": {
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

  "B2::Higher Education": {
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

};
