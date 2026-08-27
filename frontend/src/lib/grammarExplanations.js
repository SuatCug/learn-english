// Grammar konularının "Explanation" sekmesi için yapılandırılmış içerik.
// Anahtar: `${level}::${title}` (bkz. proje hafızası: aynı başlık farklı seviyelerde tekrar edebiliyor).
// Bir konu burada yoksa LessonPage, topic.description'ı düz metin olarak göstermeye devam eder.
//
// Şema:
// {
//   heading: string,
//   intro: string | string[],
//   tables: [{ heading?: string, columns: string[], rows: string[][] }],  // hücrede **kalın** kullanılabilir
//   notes?: string[],       // tablolardan sonra, keyPoint'ten önce ek paragraflar
//   keyPoint?: { title: string, lines: string[] },
// }
export const GRAMMAR_EXPLANATIONS = {
  "A1::Present simple forms of 'to be': am/is/are": {
    heading: "Present Simple: 'to be' (am, is, are)",
    intro: "In English, the verb 'to be' (am, is, are) is used to describe or identify people, places, and things.",
    tables: [
      {
        heading: 'Affirmative (Positive) Sentences',
        columns: ['Subject', "Verb 'to be'", 'Example'],
        rows: [
          ['I', '**am**', 'I **am** a student.'],
          ['He / She / It', '**is**', 'She **is** 25 years old.'],
          ['We / You / They', '**are**', 'We **are** friends.'],
        ],
      },
      {
        heading: 'Negative Sentences',
        columns: ['Subject', "'to be' + not", 'Example'],
        rows: [
          ['I', '**am not**', 'I **am not** a doctor.'],
          ['He / She / It', '**is not**', 'He **is not** hungry.'],
          ['We / You / They', '**are not**', 'They **are not** at home.'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point: Contractions',
      lines: [
        "I am -> I'm  |  I am not -> I'm not",
        "She is -> She's  |  She is not -> She isn't",
        "They are -> They're  |  They are not -> They aren't",
      ],
    },
  },

  'A1::This, that, these, those': {
    heading: "This, That, These, Those",
    intro:
      "We use 'this' and 'that' with singular nouns, and 'these' and 'those' with plural nouns. 'This/these' are for things near us; 'that/those' are for things farther away.",
    tables: [
      {
        columns: ['', 'Near (this / these)', 'Far (that / those)'],
        rows: [
          ['Singular', '**This** is my phone.', "**That** is your bag."],
          ['Plural', '**These** are my keys.', '**Those** are nice shoes.'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["'This' and 'that' take a singular verb (is); 'these' and 'those' take a plural verb (are)."],
    },
  },

  'A1::Possessive adjectives and subject pronouns (I/my, you/your, etc.)': {
    heading: 'Possessive Adjectives and Subject Pronouns',
    intro: "Subject pronouns replace the subject of a sentence; possessive adjectives show who something belongs to and go before a noun.",
    tables: [
      {
        columns: ['Subject pronoun', 'Possessive adjective', 'Example'],
        rows: [
          ['I', 'my', 'This is **my** book.'],
          ['you', 'your', 'Is that **your** car?'],
          ['he', 'his', '**His** name is Tom.'],
          ['she', 'her', '**Her** dog is small.'],
          ['it', 'its', 'The cat licked **its** paw.'],
          ['we', 'our', '**Our** house is big.'],
          ['they', 'their', '**Their** car is red.'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["Possessive adjectives never change for plural nouns: **my** books, not mys books."],
    },
  },

  'A1::A/an, plurals: Singular and plural forms': {
    heading: "A / An and Plural Nouns",
    intro: "We use 'a' before a consonant sound and 'an' before a vowel sound.",
    tables: [
      {
        heading: "A or An",
        columns: ['Rule', 'Example'],
        rows: [
          ["Use **a** before a consonant sound", '**a** dog, **a** university'],
          ["Use **an** before a vowel sound", '**an** apple, **an** hour'],
        ],
      },
      {
        heading: 'Plural Nouns',
        columns: ['Rule', 'Singular → Plural'],
        rows: [
          ['Most nouns: add **-s**', 'book → **books**'],
          ['-s, -ss, -sh, -ch, -x: add **-es**', 'bus → **buses**, box → **boxes**'],
          ['Consonant + y: **y → ies**', 'city → **cities**'],
          ['Irregular plurals', 'child → **children**, man → **men**, foot → **feet**'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["'An' depends on the sound, not the spelling: **an** hour (silent h), **a** university (sounds like 'yoo')."],
    },
  },

  'A1::Adjectives: Old, interesting, expensive, etc.': {
    heading: 'Adjectives',
    intro: "Adjectives describe nouns. In English they usually go before the noun, or after the verb 'be'.",
    tables: [
      {
        columns: ['Position', 'Example'],
        rows: [
          ['Before a noun', 'an **old** car, an **interesting** book'],
          ["After 'be'", 'The car is **old**. The book is **interesting**.'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['Adjectives never change form: two **old** cars, not two olds cars.'],
    },
  },

  "A1::Present simple: I do, I don't, Do I?": {
    heading: "Present Simple: Affirmative, Negative, Question",
    intro: 'We use the present simple for habits, routines, and facts.',
    tables: [
      {
        columns: ['Type', 'Subject', 'Form', 'Example'],
        rows: [
          ['Affirmative', 'I / you / we / they', '**verb**', 'I **work** every day.'],
          ['Affirmative', 'he / she / it', '**verb + s**', 'She **works** every day.'],
          ['Negative', 'I / you / we / they', "**don't** + verb", "I **don't work** on Sundays."],
          ['Negative', 'he / she / it', "**doesn't** + verb", "She **doesn't work** on Sundays."],
          ['Question', '—', '**Do/Does** + subject + verb?', '**Do** you **work** here? **Does** she **work** here?'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['Only the he/she/it form changes (adds -s) — the verb stays the same for every other subject.'],
    },
  },

  'A1::Questions: Word order and question words': {
    heading: 'Question Words and Word Order',
    intro: "Question words ask for specific information and go at the start of the question.",
    tables: [
      {
        columns: ['Question word', 'Asks about', 'Example'],
        rows: [
          ['What', 'a thing', "**What** is your name?"],
          ['Where', 'a place', '**Where** do you live?'],
          ['When', 'a time', '**When** does the film start?'],
          ['Who', 'a person', '**Who** is that man?'],
          ['Why', 'a reason', '**Why** are you late?'],
          ['How', 'manner / amount', '**How** are you?'],
        ],
      },
    ],
    notes: ["Word order: (question word) + auxiliary (do/does/is/are) + subject + verb."],
  },

  'A1::Adverbs of frequency with present simple': {
    heading: 'Adverbs of Frequency',
    intro: 'Adverbs of frequency say how often something happens.',
    tables: [
      {
        columns: ['Adverb', 'Frequency', 'Example'],
        rows: [
          ['always', '100%', 'I **always** brush my teeth.'],
          ['usually', '~80%', 'She **usually** walks to work.'],
          ['often', '~60%', 'We **often** eat pizza.'],
          ['sometimes', '~40%', 'They **sometimes** play tennis.'],
          ['rarely', '~10%', 'He **rarely** watches TV.'],
          ['never', '0%', 'I **never** eat meat.'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["Frequency adverbs go before the main verb, but after the verb 'be': I **always** go. / I am **always** late."],
    },
  },

  'A1::Object pronouns vs subject pronouns: Me or I, she or her?': {
    heading: 'Subject Pronouns vs Object Pronouns',
    intro: 'Subject pronouns come before the verb; object pronouns come after the verb or a preposition.',
    tables: [
      {
        columns: ['Subject pronoun', 'Object pronoun', 'Example'],
        rows: [
          ['I', 'me', '**I** like **her**. She likes **me**.'],
          ['you', 'you', '**You** called **him**.'],
          ['he', 'him', '**He** saw **me**.'],
          ['she', 'her', '**She** helped **us**.'],
          ['we', 'us', '**We** invited **them**.'],
          ['they', 'them', '**They** thanked **her**.'],
        ],
      },
    ],
  },

  "A1::Whose, possessive 's: Whose is this? It's Mike's": {
    heading: "Whose and Possessive 's",
    intro: "We use 'whose' to ask who owns something, and 's to show possession.",
    tables: [
      {
        columns: ['Use', 'Example'],
        rows: [
          ['Question with whose', "**Whose** is this bag? — It's **Mike's**."],
          ["Possessive 's (singular)", "**Mike's** car is new."],
          ["Possessive s' (plural ending in -s)", "The **students'** books are here."],
          ["Irregular plural + 's", "The **children's** toys."],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["Add **'s** to a singular noun (the dog**'s** tail); add just an apostrophe to a plural noun ending in -s (the dogs**'** tails)."],
    },
  },

  'A1::At, in, on: Prepositions of time': {
    heading: 'Prepositions of Time: At, In, On',
    intro: 'We use different prepositions of time for clock times, longer periods, and days/dates.',
    tables: [
      {
        columns: ['Preposition', 'Used with', 'Example'],
        rows: [
          ['at', 'clock times, night, weekend', '**at** 7 o\'clock, **at** night'],
          ['in', 'months, years, seasons, parts of the day', '**in** May, **in** 2024, **in** the morning'],
          ['on', 'days, dates', '**on** Monday, **on** 1 May'],
        ],
      },
    ],
  },

  'A1::At, in, on: Prepositions of place': {
    heading: 'Prepositions of Place: At, In, On',
    intro: 'We use different prepositions of place for points, enclosed spaces, and surfaces.',
    tables: [
      {
        columns: ['Preposition', 'Used with', 'Example'],
        rows: [
          ['at', 'a point or address', '**at** the bus stop, **at** 22 Main Street'],
          ['in', 'an enclosed space', '**in** the box, **in** London'],
          ['on', 'a surface', '**on** the table, **on** the wall'],
        ],
      },
    ],
  },

  "A1::Can, can't: Ability, possibility, permission": {
    heading: "Can, Can't",
    intro: "We use 'can' for ability, permission, and possibility.",
    tables: [
      {
        columns: ['Use', 'Example'],
        rows: [
          ['Ability', 'I **can** swim.'],
          ['Inability', "She **can't** drive."],
          ['Permission', '**Can** I open the window?'],
          ['Possibility', 'It **can** be cold in winter.'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["'Can' never changes form and is followed by the base verb: She **can swim**, not she cans swims."],
    },
  },

  "A1::Present continuous: I'm doing, I'm not doing, Are you doing?": {
    heading: 'Present Continuous',
    intro: 'We use the present continuous for actions happening now or around now.',
    tables: [
      {
        columns: ['Type', 'Example'],
        rows: [
          ['Affirmative', 'I **am working** now.'],
          ['Negative', "She **isn't working** today."],
          ['Question', '**Are** you **working**?'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["Form: am/is/are + verb-**ing**."],
    },
  },

  'A1::Present simple or present continuous?': {
    heading: 'Present Simple or Present Continuous?',
    intro: 'The present simple is for habits and facts; the present continuous is for actions happening now or temporary situations.',
    tables: [
      {
        columns: ['Present simple', 'Present continuous'],
        rows: [
          ['Habits & routines: I **play** tennis every week.', 'Now: I **am playing** tennis now.'],
          ['Facts: Water **boils** at 100°C.', 'Temporary: I **am staying** with friends this week.'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["Stative verbs like know, like, want, and believe are not usually used in the continuous form."],
    },
  },

  "A1::The imperative: Sit down! Don't talk!": {
    heading: 'The Imperative',
    intro: 'We use the imperative to give orders, instructions, and requests. It uses the base form of the verb with no subject.',
    tables: [
      {
        columns: ['Type', 'Example'],
        rows: [
          ['Affirmative', '**Sit down**! **Close** the door.'],
          ['Negative', "**Don't talk**! **Don't be** late."],
        ],
      },
    ],
  },

  "A1::Was/were: Past simple of 'be'": {
    heading: "Past Simple of 'To Be': Was / Were",
    intro: "'Was' and 'were' are the past forms of 'be'.",
    tables: [
      {
        columns: ['Subject', 'Form', 'Example'],
        rows: [
          ['I / he / she / it', '**was**', 'I **was** at home yesterday.'],
          ['you / we / they', '**were**', 'They **were** at the party.'],
          ['Negative', "**wasn't** / **weren't**", "She **wasn't** happy."],
        ],
      },
    ],
  },

  'A1::Past simple: Regular/irregular verbs': {
    heading: 'Past Simple: Regular and Irregular Verbs',
    intro: 'Regular verbs follow a spelling pattern; irregular verbs have their own past form to learn by heart.',
    tables: [
      {
        columns: ['Type', 'Rule', 'Example'],
        rows: [
          ['Regular', '+ **ed**', 'work → **worked**'],
          ['Regular (ends in -e)', '+ **d**', 'live → **lived**'],
          ['Regular (consonant + y)', '**y → ied**', 'study → **studied**'],
          ['Irregular', 'no pattern — learn by heart', 'go → **went**, see → **saw**, have → **had**'],
        ],
      },
    ],
  },

  'A1::Past simple: Negatives and questions': {
    heading: 'Past Simple: Negatives and Questions',
    intro: "We form past simple negatives and questions with 'did', and the main verb stays in the base form.",
    tables: [
      {
        columns: ['Type', 'Form', 'Example'],
        rows: [
          ['Negative', "**didn't** + base verb", "I **didn't go** to school."],
          ['Question', '**Did** + subject + base verb?', '**Did** you **go** to school?'],
          ['Short answer', '—', "Yes, I **did**. / No, I **didn't**."],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["The main verb always stays in the base form after did/didn't, even for irregular verbs: **Did** you **go**? not Did you went?"],
    },
  },

  'A1::Verbs + to + infinitive and verbs + -ing': {
    heading: 'Verb Patterns: To-Infinitive and -Ing',
    intro: 'Some verbs are followed by to + infinitive, and others by the -ing form.',
    tables: [
      {
        columns: ['Pattern', 'Common verbs', 'Example'],
        rows: [
          ['verb + to-infinitive', 'want, would like, decide, plan, hope', 'I **want to go** home.'],
          ['verb + -ing', 'enjoy, like, love, hate, finish', 'She **enjoys reading** books.'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['Some verbs (like, love, hate, start) can take either form with little change in meaning: I **like swimming**. / I **like to swim**.'],
    },
  },

  "A1::Would you like...? I'd like...": {
    heading: "Would You Like...? I'd Like...",
    intro: "'Would you like...?' is a polite way to offer something; 'I'd like...' is a polite way to say what you want.",
    tables: [
      {
        columns: ['Use', 'Example'],
        rows: [
          ['Offer', '**Would you like** some tea?'],
          ['Request', "**I'd like** a coffee, please."],
          ['Answer', "Yes, **I'd love to**. / No, thank you."],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["'I'd like' (= I would like) is more polite than 'I want'."],
    },
  },

  'A1::Have got': {
    heading: 'Have Got',
    intro: "'Have got' means the same as 'have' for possession, and is common in British English speech.",
    tables: [
      {
        columns: ['Type', 'Example'],
        rows: [
          ['Affirmative', "I**'ve got** a new phone. She**'s got** two brothers."],
          ['Negative', "I **haven't got** a car."],
          ['Question', "**Have** you **got** a pet? / **Has** she **got** a car?"],
        ],
      },
    ],
  },

  'A1::A, some, any: Countable and uncountable nouns': {
    heading: 'A, Some, Any',
    intro: "We use 'a/an' with singular countable nouns, 'some' in affirmative sentences, and 'any' in negatives and questions.",
    tables: [
      {
        columns: ['Word', 'Used with', 'Example'],
        rows: [
          ['a / an', 'a singular countable noun', 'I have **a** banana.'],
          ['some', 'plural/uncountable, affirmative sentences', 'I have **some** apples / **some** water.'],
          ['any', 'plural/uncountable, negatives & questions', "I don't have **any** apples. Do you have **any** milk?"],
        ],
      },
    ],
  },

  'A1::There is, there are / there was, there were': {
    heading: 'There Is / There Are, There Was / There Were',
    intro: "We use 'there is/are/was/were' to say that something exists.",
    tables: [
      {
        columns: ['Form', 'Use', 'Example'],
        rows: [
          ['There is', 'singular, present', '**There is** a book on the table.'],
          ['There are', 'plural, present', '**There are** three chairs.'],
          ['There was', 'singular, past', '**There was** a cat in the garden.'],
          ['There were', 'plural, past', '**There were** many people.'],
        ],
      },
    ],
  },

  'A1::There or It': {
    heading: "There or It",
    intro: "We use 'there' to say something exists, and 'it' for weather, time, distance, and identifying things.",
    tables: [
      {
        columns: ['Word', 'Use', 'Example'],
        rows: [
          ['there', 'existence of something', '**There** is a park near my house.'],
          ['it', 'weather, time, distance, identifying', "**It**'s raining. **It**'s 5 o'clock. **It**'s John."],
        ],
      },
    ],
  },

  'A1::Next to, under, between, in front of, behind, over, etc.': {
    heading: 'Prepositions of Place',
    intro: 'These prepositions describe where something is in relation to something else.',
    tables: [
      {
        columns: ['Preposition', 'Meaning', 'Example'],
        rows: [
          ['next to', 'beside', 'The lamp is **next to** the bed.'],
          ['under', 'below', 'The cat is **under** the table.'],
          ['between', 'in the middle of two things', 'The bank is **between** the shop and the café.'],
          ['in front of', 'before, facing', 'She is standing **in front of** the house.'],
          ['behind', 'at the back of', 'The garden is **behind** the house.'],
          ['over', 'above, covering', 'A bridge goes **over** the river.'],
        ],
      },
    ],
  },

  'A1::Much, many, a lot of, a little, a few': {
    heading: 'Much, Many, A Lot Of, A Little, A Few',
    intro: 'These words say how much or how many of something there is.',
    tables: [
      {
        columns: ['Word', 'Used with', 'Example'],
        rows: [
          ['much', 'uncountable, questions/negatives', "I don't have **much** time."],
          ['many', 'countable, questions/negatives', "There aren't **many** people."],
          ['a lot of', 'both, affirmative sentences', 'She has **a lot of** friends.'],
          ['a little', 'uncountable — small amount', 'I have **a little** money.'],
          ['a few', 'countable — small number', 'I have **a few** friends.'],
        ],
      },
    ],
  },

  'A1::Comparative adjectives: Older than, more important than, etc.': {
    heading: 'Comparative Adjectives',
    intro: 'We use comparative adjectives to compare two people or things.',
    tables: [
      {
        columns: ['Adjective type', 'Rule', 'Example'],
        rows: [
          ['Short (1 syllable)', '+ **er**', 'old → **older**'],
          ['Ending in -y', '**y → ier**', 'happy → **happier**'],
          ['Long (2+ syllables)', '**more** + adjective', 'important → **more important**'],
          ['Irregular', '—', 'good → **better**, bad → **worse**'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['Use **than** after a comparative: My car is faster **than** yours.'],
    },
  },

  'A1::Superlative adjectives: The oldest, the most important, etc.': {
    heading: 'Superlative Adjectives',
    intro: 'We use superlative adjectives to compare one thing with all the others in a group.',
    tables: [
      {
        columns: ['Adjective type', 'Rule', 'Example'],
        rows: [
          ['Short (1 syllable)', '**the** + **est**', 'old → **the oldest**'],
          ['Ending in -y', '**the** + **iest**', 'happy → **the happiest**'],
          ['Long (2+ syllables)', '**the most** + adjective', 'important → **the most important**'],
          ['Irregular', '—', 'good → **the best**, bad → **the worst**'],
        ],
      },
    ],
  },

  "A1::'Will' and 'shall': Future": {
    heading: "Will and Shall",
    intro: "We use 'will' for predictions, instant decisions, and promises; 'shall' is mainly used for offers and suggestions.",
    tables: [
      {
        columns: ['Use', 'Example'],
        rows: [
          ['Prediction', 'It **will** rain tomorrow.'],
          ['Instant decision', "I'm thirsty — I **will** get some water."],
          ['Promise', 'I **will** help you.'],
          ['Offer / suggestion', '**Shall** I open the window? **Shall** we dance?'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["Form: will/shall + base verb, same for every subject. Contraction: I'll, you'll, she'll, etc."],
    },
  },

  'A1::Be going to: Plans and predictions': {
    heading: 'Be Going To',
    intro: "We use 'be going to' for plans already decided, and for predictions based on what we can see now.",
    tables: [
      {
        columns: ['Use', 'Example'],
        rows: [
          ['Plan / intention', 'I **am going to** study medicine.'],
          ['Prediction from evidence', "Look at those clouds — it**'s going to** rain."],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["Use 'be going to' for decisions made before speaking; use 'will' for decisions made at the moment of speaking."],
    },
  },

  'A1::Adverbs of manner (slowly) or adjectives (slow)?': {
    heading: 'Adverbs of Manner or Adjectives?',
    intro: 'Adjectives describe nouns; adverbs of manner describe verbs and usually end in -ly.',
    tables: [
      {
        columns: ['Type', 'Rule', 'Example'],
        rows: [
          ['Adjective', 'describes a noun', 'She is a **careful** driver.'],
          ['Adverb', 'describes a verb, usually adjective + **ly**', 'She drives **carefully**.'],
          ['Irregular', 'good → well, fast → fast, hard → hard', 'He plays **well**.'],
        ],
      },
    ],
  },

  'A1::A/an, the, no article: The use of articles in English': {
    heading: 'Articles: A/An, The, or No Article',
    intro: "We use 'a/an' the first time we mention something, 'the' for something specific or already known, and no article for general plural or uncountable nouns.",
    tables: [
      {
        columns: ['Article', 'Use', 'Example'],
        rows: [
          ['a / an', 'first mention, one of many', 'I saw **a** dog.'],
          ['the', 'specific, already known', '**The** dog is barking (we know which one).'],
          ['no article', 'general plural / uncountable nouns', '**Dogs** are loyal animals. I like **music**.'],
        ],
      },
    ],
  },

  'A1::Conjunctions: And, but, or, so, because': {
    heading: 'Conjunctions: And, But, Or, So, Because',
    intro: 'Conjunctions join words, phrases, or clauses together.',
    tables: [
      {
        columns: ['Conjunction', 'Use', 'Example'],
        rows: [
          ['and', 'adds information', 'I like tea **and** coffee.'],
          ['but', 'contrast', 'She is tired **but** happy.'],
          ['or', 'choice', 'Do you want tea **or** coffee?'],
          ['so', 'result', 'It was raining, **so** I took an umbrella.'],
          ['because', 'reason', 'I stayed home **because** I was ill.'],
        ],
      },
    ],
  },

  'A1::Basic word order in English': {
    heading: 'Basic Word Order',
    intro: 'English sentences usually follow a fixed order: subject, then verb, then object.',
    tables: [
      {
        columns: ['Position', 'Element', 'Example'],
        rows: [
          ['1', 'Subject', '**She**'],
          ['2', 'Verb', '**reads**'],
          ['3', 'Object', '**a book**'],
          ['4', 'Place', '**at home**'],
          ['5', 'Time', '**every evening**'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['Standard order: Subject + Verb + Object + Place + Time.'],
    },
  },

  "A1::The difference between 'this' and 'it'": {
    heading: "This or It",
    intro: "We use 'this' to introduce or point to something new or nearby, and 'it' to refer back to something already mentioned.",
    tables: [
      {
        columns: ['Word', 'Use', 'Example'],
        rows: [
          ['this', 'introducing / pointing to something new', '**This** is my new phone.'],
          ['it', 'referring back to something already mentioned', 'I bought a phone. **It** is very fast.'],
        ],
      },
    ],
  },

  'A2::Asking questions in English: Question forms': {
    heading: 'Asking Questions: Question Forms',
    intro: 'Most English questions use an auxiliary verb (do/does/did, be, or a modal) before the subject.',
    tables: [
      {
        columns: ['Tense', 'Question form', 'Example'],
        rows: [
          ['Present simple', '**Do/Does** + subject + verb?', '**Does** she **live** here?'],
          ['Past simple', '**Did** + subject + verb?', '**Did** they **arrive** yesterday?'],
          ["Verb 'be'", '**Am/Is/Are** + subject...?', '**Are** you ready?'],
          ['With modal', '**Can/Should/Will** + subject + verb?', '**Can** you **help** me?'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['Word order in a question: auxiliary/modal + subject + main verb (the subject and verb swap places compared to a statement).'],
    },
  },

  'A2::Subject questions, questions with preposition': {
    heading: 'Subject Questions and Questions with a Preposition',
    intro: 'A subject question asks about the subject itself, so it uses no extra auxiliary. A question with a preposition usually puts the preposition at the end.',
    tables: [
      {
        columns: ['Type', 'Example'],
        rows: [
          ['Subject question', '**Who called** you? (not: Who did call you?)'],
          ['Object question', '**Who did** you **call**?'],
          ['Question with preposition', "**Who** is she talking **to**?"],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["In a subject question, the question word replaces the subject, so the word order stays like a statement: **Who** broke the window? (subject) vs. **What** did he break? (object)."],
    },
  },

  'A2::Present simple vs present continuous': {
    heading: 'Present Simple vs Present Continuous',
    intro: 'The present simple is for habits, routines, and permanent facts; the present continuous is for actions in progress now or temporary situations.',
    tables: [
      {
        columns: ['Present simple', 'Present continuous'],
        rows: [
          ['I **work** in a bank. (routine)', 'I **am working** late today. (now / temporary)'],
          ['She **lives** in Paris. (permanent)', "She **is living** with a friend this month. (temporary)"],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['Stative verbs (know, believe, want, love, own) are not usually used in the continuous form.'],
    },
  },

  'A2::Past simple: Form and use': {
    heading: 'Past Simple: Form and Use',
    intro: 'We use the past simple for completed actions at a specific time in the past.',
    tables: [
      {
        columns: ['Type', 'Form', 'Example'],
        rows: [
          ['Affirmative', 'verb + **-ed** (or irregular form)', 'I **visited** Rome last year.'],
          ['Negative', "**didn't** + base verb", "I **didn't visit** London."],
          ['Question', '**Did** + subject + base verb?', '**Did** you **visit** Rome?'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['We often use the past simple with time expressions like yesterday, last week, in 2020, two days ago.'],
    },
  },

  'A2::Past continuous and past simple': {
    heading: 'Past Continuous and Past Simple',
    intro: 'We often use the past continuous for a longer action in progress, interrupted by a shorter action in the past simple.',
    tables: [
      {
        columns: ['Use', 'Example'],
        rows: [
          ['Longer action (past continuous)', 'I **was watching** TV...'],
          ['Interrupting action (past simple)', '...when the phone **rang**.'],
          ['Two actions happening together', 'I **was reading** while she **was cooking**.'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['Form of past continuous: was/were + verb-ing.'],
    },
  },

  "A2::Expressing purpose with 'to' and 'for'": {
    heading: "Expressing Purpose: To and For",
    intro: "We use 'to' + infinitive or 'for' + noun to explain why we do something.",
    tables: [
      {
        columns: ['Pattern', 'Example'],
        rows: [
          ['to + infinitive', 'I went to the shop **to buy** some milk.'],
          ['for + noun', 'I went to the shop **for** some milk.'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["Use 'for' before a noun (**for** a coffee), and 'to' before a verb (**to** get a coffee)."],
    },
  },

  'A2::However, although, because, so, and time connectors': {
    heading: 'Connectors: However, Although, Because, So',
    intro: 'Connectors join ideas to show contrast, reason, or result.',
    tables: [
      {
        columns: ['Connector', 'Meaning', 'Example'],
        rows: [
          ['however', 'contrast (starts a new sentence)', "It was raining. **However**, we went out."],
          ['although', 'contrast (joins one sentence)', '**Although** it was raining, we went out.'],
          ['because', 'reason', 'We stayed in **because** it was raining.'],
          ['so', 'result', 'It was raining, **so** we stayed in.'],
        ],
      },
    ],
  },

  "A2::'Will' vs 'be going to': Future forms": {
    heading: "Will vs Be Going To",
    intro: "'Will' is for decisions made now and predictions in general; 'be going to' is for plans already decided and predictions based on evidence.",
    tables: [
      {
        columns: ['Form', 'Use', 'Example'],
        rows: [
          ['will', 'instant decision, general prediction', "I'm tired — I **will** go to bed."],
          ['be going to', 'plan / decided in advance', 'I **am going to** visit my parents this weekend.'],
          ['be going to', 'prediction based on evidence now', "Look at the sky — it**'s going to** rain."],
        ],
      },
    ],
  },

  'A2::Present continuous for future arrangements': {
    heading: 'Present Continuous for Future Arrangements',
    intro: 'We use the present continuous to talk about fixed arrangements in the future — plans already organized with a time and place.',
    tables: [
      {
        columns: ['Use', 'Example'],
        rows: [
          ['Fixed arrangement', "I**'m meeting** my dentist at 5pm tomorrow."],
          ['With a future time expression', "We**'re flying** to Rome next Friday."],
        ],
      },
    ],
  },

  'A2::Defining relative clauses: Who, which, that, where': {
    heading: 'Defining Relative Clauses',
    intro: 'A defining relative clause gives essential information about a noun, telling us exactly which person or thing we mean.',
    tables: [
      {
        columns: ['Pronoun', 'Used for', 'Example'],
        rows: [
          ['who / that', 'people', "The woman **who** called is my aunt."],
          ['which / that', 'things', "This is the book **which** I told you about."],
          ['where', 'places', "That's the café **where** we met."],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['No commas are used with defining relative clauses, because the information is necessary.'],
    },
  },

  'A2::Present perfect: Form and use': {
    heading: 'Present Perfect: Form and Use',
    intro: 'The present perfect connects the past to the present — for experiences, changes, and unfinished time periods.',
    tables: [
      {
        columns: ['Type', 'Form', 'Example'],
        rows: [
          ['Affirmative', "**have/has** + past participle", "I **have visited** Paris."],
          ['Negative', "**haven't/hasn't** + past participle", "She **hasn't finished** yet."],
          ['Question', '**Have/Has** + subject + past participle?', '**Have** you **seen** this film?'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['Common time words: already, yet, just, ever, never, since, for.'],
    },
  },

  'A2::Present perfect or past simple?': {
    heading: 'Present Perfect or Past Simple?',
    intro: 'The past simple is for finished actions at a definite past time; the present perfect is for past actions without a stated time, or that connect to now.',
    tables: [
      {
        columns: ['Past simple', 'Present perfect'],
        rows: [
          ["I **visited** Rome **in 2019**.", "I **have visited** Rome. (no exact time — an experience)"],
          ['She **finished** the report **yesterday**.', "She **has** just **finished** the report."],
        ],
      },
    ],
  },

  'A2::Something, anything, nothing, etc.': {
    heading: 'Something, Anything, Nothing, Everything',
    intro: 'These indefinite pronouns refer to things (or people/places with -one/-body/-where) without saying exactly what/who/where.',
    tables: [
      {
        columns: ['Word', 'Use', 'Example'],
        rows: [
          ['something', 'affirmative sentences', 'I have **something** to tell you.'],
          ['anything', 'negatives and questions', "I don't have **anything** to say. Is there **anything** to eat?"],
          ['nothing', 'negative meaning, positive verb', "There is **nothing** in the fridge."],
          ['everything', 'the whole amount', '**Everything** is ready.'],
        ],
      },
    ],
  },

  'A2::Comparative and superlative adjectives and adverbs': {
    heading: 'Comparative and Superlative Adjectives and Adverbs',
    intro: 'We use comparatives to compare two things and superlatives to compare one thing with a whole group.',
    tables: [
      {
        columns: ['Form', 'Rule', 'Example'],
        rows: [
          ['Comparative (short)', '+ **er** + than', 'faster **than**'],
          ['Comparative (long)', '**more** + adjective + than', 'more interesting **than**'],
          ['Superlative (short)', 'the + **est**', 'the fastest'],
          ['Superlative (long)', 'the **most** + adjective', 'the most interesting'],
          ['Adverbs', '**more/most** + adverb (usually)', 'She runs **more quickly than** me.'],
        ],
      },
    ],
  },

  'A2::Too, too much, too many, enough': {
    heading: 'Too, Too Much, Too Many, Enough',
    intro: "'Too' means more than necessary (a problem); 'enough' means the right amount.",
    tables: [
      {
        columns: ['Word', 'Used with', 'Example'],
        rows: [
          ['too + adjective', 'adjective', "This coffee is **too hot**."],
          ['too much', 'uncountable nouns', "There is **too much** noise."],
          ['too many', 'countable nouns', "There are **too many** people."],
          ['enough', 'after adjective / before noun', "It isn't warm **enough**. I don't have **enough** money."],
        ],
      },
    ],
  },

  'A2::Much, many, little, few, some, any: Quantifiers': {
    heading: 'Quantifiers: Much, Many, Little, Few, Some, Any',
    intro: 'Quantifiers show approximate amounts or numbers.',
    tables: [
      {
        columns: ['Word', 'Used with', 'Example'],
        rows: [
          ['much / many', 'uncountable / countable, negatives & questions', "I don't have **much** time. There aren't **many** eggs."],
          ['little / few', 'uncountable / countable, small amount (almost none)', "We have **little** money. There are **few** solutions."],
          ['some', 'both, affirmative sentences', 'I bought **some** bread.'],
          ['any', 'both, negatives and questions', "I didn't buy **any** bread."],
        ],
      },
    ],
  },

  'A2::Most, most of, the most': {
    heading: "Most, Most Of, The Most",
    intro: "'Most' is used generally, 'most of' is used with a specific group, and 'the most' is the superlative form.",
    tables: [
      {
        columns: ['Form', 'Use', 'Example'],
        rows: [
          ['most + noun', 'general statement', '**Most** people like music.'],
          ['most of + the/my/these...', 'a specific, defined group', '**Most of** my friends live abroad.'],
          ['the most + adjective', 'superlative', 'This is **the most** expensive hotel.'],
        ],
      },
    ],
  },

  'A2::Infinitives and gerunds: Verb patterns': {
    heading: 'Infinitives and Gerunds',
    intro: 'Some verbs are followed by the to-infinitive, some by the -ing form (gerund), and some by either.',
    tables: [
      {
        columns: ['Pattern', 'Example verbs', 'Example'],
        rows: [
          ['verb + to-infinitive', 'want, need, decide, hope, promise', 'She **decided to leave**.'],
          ['verb + -ing', 'enjoy, avoid, finish, suggest, mind', 'He **suggested going** for a walk.'],
          ['verb + either', 'start, begin, like, love, hate', 'It **started to rain** / **started raining**.'],
        ],
      },
    ],
  },

  "A2::How to use the verb 'go' in English": {
    heading: "The Verb 'Go'",
    intro: "'Go' is used with a variety of prepositions and patterns to talk about movement and activities.",
    tables: [
      {
        columns: ['Pattern', 'Example'],
        rows: [
          ['go + to + place', 'I **go to** school by bus.'],
          ['go + -ing (activity)', 'We **go swimming** every Friday.'],
          ['go + adjective (change of state)', 'The milk has **gone bad**.'],
        ],
      },
    ],
  },

  "A2::Have to, don't have to, must, mustn't": {
    heading: "Have To, Don't Have To, Must, Mustn't",
    intro: "'Have to' and 'must' express obligation; 'don't have to' means it's not necessary, and 'mustn't' means it's forbidden.",
    tables: [
      {
        columns: ['Form', 'Meaning', 'Example'],
        rows: [
          ['have to / must', 'obligation, necessary', 'I **have to work** tomorrow. You **must wear** a seatbelt.'],
          ["don't have to", 'not necessary (choice)', "You **don't have to** come if you're busy."],
          ["mustn't", 'prohibited, forbidden', "You **mustn't smoke** here."],
        ],
      },
    ],
  },

  "A2::Should, shouldn't": {
    heading: "Should, Shouldn't",
    intro: "We use 'should' to give advice or say what we think is right.",
    tables: [
      {
        columns: ['Use', 'Example'],
        rows: [
          ['Advice', 'You **should** see a doctor.'],
          ['Negative advice', "You **shouldn't** work so hard."],
          ['Opinion', "I think they **should** lower the prices."],
        ],
      },
    ],
  },

  'A2::First conditional and future time clauses': {
    heading: 'First Conditional and Future Time Clauses',
    intro: 'The first conditional talks about real, possible future situations and their results.',
    tables: [
      {
        columns: ['Clause', 'Tense', 'Example'],
        rows: [
          ['If-clause', 'present simple', '**If** it **rains**,'],
          ['Result clause', 'will + base verb', "we **will stay** at home."],
          ['Time clause', 'present simple after when/as soon as', "I'**ll call** you **when I arrive**."],
        ],
      },
    ],
  },

  'A2::Subject and object pronouns, possessive pronouns and adjectives': {
    heading: 'Pronouns and Possessives',
    intro: 'These forms show who is doing an action, who receives it, and who owns something.',
    tables: [
      {
        columns: ['Subject', 'Object', 'Possessive adjective', 'Possessive pronoun'],
        rows: [
          ['I', 'me', 'my', 'mine'],
          ['you', 'you', 'your', 'yours'],
          ['he', 'him', 'his', 'his'],
          ['she', 'her', 'her', 'hers'],
          ['we', 'us', 'our', 'ours'],
          ['they', 'them', 'their', 'theirs'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['A possessive pronoun replaces a noun completely: This is **my** book → This book is **mine**.'],
    },
  },

  'A2::Second conditional': {
    heading: 'Second Conditional',
    intro: 'The second conditional talks about unreal or unlikely present/future situations and their imagined results.',
    tables: [
      {
        columns: ['Clause', 'Form', 'Example'],
        rows: [
          ['If-clause', 'past simple', '**If** I **won** the lottery,'],
          ['Result clause', 'would + base verb', "I **would travel** the world."],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["With 'be', we often use 'were' for all subjects: If I **were** you, I would rest."],
    },
  },

  "A2::Present and past simple passive: 'be' + past participle": {
    heading: 'Passive Voice: Present and Past Simple',
    intro: 'We use the passive when the action is more important than who did it, or the doer is unknown.',
    tables: [
      {
        columns: ['Tense', 'Form', 'Example'],
        rows: [
          ['Present simple passive', 'am/is/are + past participle', 'English **is spoken** here.'],
          ['Past simple passive', 'was/were + past participle', 'The house **was built** in 1990.'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['Add "by + agent" only if it is important to say who did the action: The Mona Lisa **was painted by** Leonardo da Vinci.'],
    },
  },

  "A2::Used to, didn't use to: Past habits and states": {
    heading: 'Used To',
    intro: "'Used to' describes past habits or states that are no longer true.",
    tables: [
      {
        columns: ['Type', 'Example'],
        rows: [
          ['Affirmative', 'I **used to play** football every weekend.'],
          ['Negative', "She **didn't use to like** coffee."],
          ['Question', '**Did** you **use to live** here?'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["Don't confuse 'used to + verb' (past habit) with 'be used to + -ing' (be accustomed to something)."],
    },
  },

  'A2::Might, might not: Possibility': {
    heading: 'Might, Might Not',
    intro: "'Might' expresses possibility — something that could happen but isn't certain.",
    tables: [
      {
        columns: ['Use', 'Example'],
        rows: [
          ['Possibility', 'It **might** rain later.'],
          ['Negative possibility', "She **might not** come to the party."],
        ],
      },
    ],
  },

  'A2::Prepositions of movement: Along, across, over, etc.': {
    heading: 'Prepositions of Movement',
    intro: 'These prepositions describe the direction or path of movement.',
    tables: [
      {
        columns: ['Preposition', 'Meaning', 'Example'],
        rows: [
          ['along', 'following a line', 'We walked **along** the beach.'],
          ['across', 'from one side to the other', 'She swam **across** the river.'],
          ['over', 'above and across', 'The ball flew **over** the fence.'],
          ['through', 'from one side to the other, inside', 'We drove **through** the tunnel.'],
          ['into', 'entering', 'He walked **into** the room.'],
        ],
      },
    ],
  },

  'A2::So, neither: So am I, neither do I, etc.': {
    heading: 'So and Neither',
    intro: "We use 'so' to agree with a positive statement and 'neither' to agree with a negative one.",
    tables: [
      {
        columns: ['Statement', 'Agreement', 'Example'],
        rows: [
          ['Positive', "**so** + auxiliary + subject", "I like tea. — **So do** I."],
          ['Negative', "**neither** + auxiliary + subject", "I don't like coffee. — **Neither do** I."],
        ],
      },
    ],
  },

  'A2::Review of all pre-intermediate verb tenses (CEFR A2)': {
    heading: 'Review of Pre-Intermediate Verb Tenses',
    intro: 'This is a quick overview of the main tenses studied up to A2 level.',
    tables: [
      {
        columns: ['Tense', 'Form', 'Example'],
        rows: [
          ['Present simple', 'verb / verb+s', 'I **work**. She **works**.'],
          ['Present continuous', 'am/is/are + -ing', 'I **am working**.'],
          ['Past simple', 'verb+ed / irregular', 'I **worked**. I **went**.'],
          ['Past continuous', 'was/were + -ing', 'I **was working**.'],
          ['Present perfect', 'have/has + past participle', 'I **have worked**.'],
          ['Future (will / going to)', 'will + verb / am going to + verb', "I **will work**. I**'m going to** work."],
        ],
      },
    ],
  },

  'A2::Past perfect': {
    heading: 'Past Perfect',
    intro: 'The past perfect describes an action that happened before another action or time in the past.',
    tables: [
      {
        columns: ['Type', 'Form', 'Example'],
        rows: [
          ['Affirmative', '**had** + past participle', 'The train **had left** before we arrived.'],
          ['Negative', "**hadn't** + past participle", "She **hadn't finished** her homework."],
          ['Question', '**Had** + subject + past participle?', '**Had** you **met** him before?'],
        ],
      },
    ],
  },

  'A2::Reported speech / Indirect speech': {
    heading: 'Reported Speech',
    intro: "When we report what someone said, we usually move the tense one step back into the past.",
    tables: [
      {
        columns: ['Direct speech', 'Reported speech'],
        rows: [
          ['"I **am** tired," she said.', 'She said (that) she **was** tired.'],
          ['"I **will help** you," he said.', 'He said (that) he **would help** me.'],
          ['"I **have finished**," she said.', 'She said (that) she **had finished**.'],
        ],
      },
    ],
  },

  'A2::Verbs with two objects': {
    heading: 'Verbs with Two Objects',
    intro: "Some verbs (give, send, show, buy, tell) can take an indirect object (person) and a direct object (thing).",
    tables: [
      {
        columns: ['Pattern', 'Example'],
        rows: [
          ['verb + person + thing', 'I **gave her** a present.'],
          ['verb + thing + to/for + person', 'I **gave** a present **to her**.'],
        ],
      },
    ],
  },

  "A2::The different uses of the verb 'get'": {
    heading: "The Verb 'Get'",
    intro: "'Get' is very common in English and has many meanings depending on context.",
    tables: [
      {
        columns: ['Meaning', 'Example'],
        rows: [
          ['receive', 'I **got** a letter today.'],
          ['become', "It's **getting** dark."],
          ['arrive', 'What time did you **get** home?'],
          ['buy', "Can you **get** some milk?"],
          ['understand', "I don't **get** the joke."],
        ],
      },
    ],
  },

  "A2::Do vs Make: What's the difference?": {
    heading: 'Do vs Make',
    intro: "'Do' is often used for general activities and work; 'make' is often used for creating or producing something.",
    tables: [
      {
        columns: ['Verb', 'Common collocations'],
        rows: [
          ['do', "do homework, do the housework, do a favor, do exercise"],
          ['make', "make a cake, make a decision, make a mistake, make friends"],
        ],
      },
    ],
  },

  'A2::Stative vs dynamic verbs (or non-action vs action verbs)': {
    heading: 'Stative and Dynamic Verbs',
    intro: 'Dynamic verbs describe actions and can be used in the continuous form; stative verbs describe states and are usually not.',
    tables: [
      {
        columns: ['Type', 'Examples', 'Example sentence'],
        rows: [
          ['Stative', 'know, believe, want, like, own, need', 'I **know** the answer. (not: I am knowing)'],
          ['Dynamic', 'run, eat, write, play, work', "She **is running** in the park."],
        ],
      },
    ],
  },

  'A2::Phrasal verbs: Transitive / intransitive, separable / inseparable': {
    heading: 'Phrasal Verbs: Types',
    intro: 'Phrasal verbs can take an object (transitive) or not (intransitive), and some can be split (separable) while others cannot.',
    tables: [
      {
        columns: ['Type', 'Example'],
        rows: [
          ['Intransitive (no object)', "The plane **took off**."],
          ['Transitive, separable', "**Turn** the light **off**. / **Turn off** the light."],
          ['Transitive, inseparable', "I'**m looking after** the children. (not: looking the children after)"],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['With separable phrasal verbs, a pronoun object must go between the verb and the particle: **Turn it off**, not Turn off it.'],
    },
  },

  'A2::No longer, any longer, anymore': {
    heading: 'No Longer, Any Longer, Anymore',
    intro: 'These expressions show that a situation has changed and is no longer true.',
    tables: [
      {
        columns: ['Expression', 'Position', 'Example'],
        rows: [
          ['no longer', 'before the verb (formal)', 'She **no longer** works here.'],
          ['not... any longer', 'end of a negative sentence', "She doesn't work here **any longer**."],
          ['not... anymore', 'end of a negative sentence', "She doesn't work here **anymore**."],
        ],
      },
    ],
  },

  'A2::On time vs In time, At the end vs In the end': {
    heading: 'On Time vs In Time, At the End vs In the End',
    intro: 'These similar expressions have different meanings.',
    tables: [
      {
        columns: ['Expression', 'Meaning', 'Example'],
        rows: [
          ['on time', 'punctual, not late', 'The train arrived **on time**.'],
          ['in time', 'before the last moment / with enough time', 'We got there just **in time** for the film.'],
          ['at the end', 'the physical/final point of something', 'There is a quiz **at the end** of the chapter.'],
          ['in the end', 'finally, after a process (= eventually)', "**In the end**, we decided to stay home."],
        ],
      },
    ],
  },

  "A2::May and might: What's the difference?": {
    heading: 'May vs Might',
    intro: "'May' and 'might' both express possibility; 'may' can also be used for formal permission.",
    tables: [
      {
        columns: ['Use', 'Example'],
        rows: [
          ['Possibility (may/might — similar meaning)', 'It **may/might** rain later.'],
          ['Formal permission (may)', '**May** I come in?'],
        ],
      },
    ],
  },

  'A2::Auxiliary verbs: do, be and have': {
    heading: 'Auxiliary Verbs: Do, Be, Have',
    intro: 'Auxiliary (helping) verbs combine with a main verb to form questions, negatives, and different tenses.',
    tables: [
      {
        columns: ['Auxiliary', 'Used for', 'Example'],
        rows: [
          ['do/does/did', 'present/past simple questions & negatives', "**Do** you **like** tea? I **don't like** it."],
          ['am/is/are/was/were', 'continuous tenses, passive', 'She **is working**. It **was built** in 1990.'],
          ['have/has/had', 'perfect tenses', 'I **have finished**. She **had left**.'],
        ],
      },
    ],
  },

  'B1::Present simple or present continuous': {
    heading: 'Present Simple or Present Continuous',
    intro: 'The present simple describes routines and permanent situations; the present continuous describes actions now or temporary situations.',
    tables: [
      {
        columns: ['Use', 'Present simple', 'Present continuous'],
        rows: [
          ['Routine', 'I **play** football on Sundays.', '—'],
          ['Now', '—', 'I **am playing** football now.'],
          ['Permanent situation', 'She **lives** in Madrid.', '—'],
          ['Temporary situation', '—', "She**'s living** in Madrid for a few months."],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['Stative verbs (know, believe, want, love) are not normally used in the continuous form.'],
    },
  },

  'B1::Future forms: Will, be going to, present continuous': {
    heading: 'Future Forms: Will, Be Going To, Present Continuous',
    intro: 'English has several ways to talk about the future, depending on how certain or planned the action is.',
    tables: [
      {
        columns: ['Form', 'Use', 'Example'],
        rows: [
          ['will', 'prediction, instant decision', 'It **will** be sunny tomorrow.'],
          ['be going to', 'plan, prediction from evidence', "I**'m going to** call her later."],
          ['present continuous', 'fixed arrangement', "We**'re having** dinner with them on Friday."],
        ],
      },
    ],
  },

  'B1::Past simple or present perfect?': {
    heading: 'Past Simple or Present Perfect?',
    intro: 'The past simple is for finished actions at a definite past time; the present perfect is for past actions without a stated time or that connect to now.',
    tables: [
      {
        columns: ['Past simple', 'Present perfect'],
        rows: [
          ['I **visited** Rome **in 2019**.', "I **have visited** Rome. (an experience, no exact time)"],
          ['She **finished** the report **yesterday**.', "She **has** just **finished** the report."],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['A finished time word (yesterday, last week, in 2019) always needs the past simple, never the present perfect.'],
    },
  },

  'B1::Present perfect simple and present perfect continuous': {
    heading: 'Present Perfect Simple and Continuous',
    intro: 'The present perfect simple focuses on the result or number of times; the present perfect continuous focuses on the duration of an activity.',
    tables: [
      {
        columns: ['Form', 'Focus', 'Example'],
        rows: [
          ['Present perfect simple', 'result / completed action', "I**'ve written** three emails today."],
          ['Present perfect continuous', 'duration / ongoing activity', "I**'ve been writing** emails all morning."],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["The continuous form often answers 'how long?'; the simple form often answers 'how many/how much?'."],
    },
  },

  'B1::During, for, while': {
    heading: 'During, For, While',
    intro: 'These words all relate to time but are used with different structures.',
    tables: [
      {
        columns: ['Word', 'Used with', 'Example'],
        rows: [
          ['during', 'a noun (a period of time)', 'It rained **during** the night.'],
          ['for', 'a length of time', 'I waited **for** two hours.'],
          ['while', 'a clause (subject + verb)', 'I fell asleep **while** I was reading.'],
        ],
      },
    ],
  },

  'B1::Comparative and superlative adjectives and adverbs': {
    heading: 'Comparative and Superlative Adjectives and Adverbs',
    intro: 'We use comparatives to compare two things and superlatives to compare one thing with a whole group.',
    tables: [
      {
        columns: ['Form', 'Rule', 'Example'],
        rows: [
          ['Comparative (short)', '+ **er** + than', 'faster **than**'],
          ['Comparative (long)', '**more** + adjective + than', 'more interesting **than**'],
          ['Superlative (short)', 'the + **est**', 'the fastest'],
          ['Superlative (long)', 'the **most** + adjective', 'the most interesting'],
          ['Adverbs', '**more/most** + adverb (usually)', 'She runs **more quickly than** me.'],
        ],
      },
    ],
  },

  'B1::A(n), the, no article': {
    heading: 'Articles: A/An, The, or No Article',
    intro: "We use 'a/an' for something non-specific, 'the' for something specific or already known, and no article for general plural/uncountable nouns.",
    tables: [
      {
        columns: ['Article', 'Use', 'Example'],
        rows: [
          ['a / an', 'non-specific, first mention', 'I need **a** pen.'],
          ['the', 'specific, already known, unique', '**The** sun rises in the east.'],
          ['no article', 'general plural / uncountable nouns', '**Cats** are independent animals.'],
        ],
      },
    ],
  },

  'B1::Another, other, others, the other, the others': {
    heading: 'Another, Other, Others, The Other, The Others',
    intro: "These words all mean 'additional' or 'different', but each is used in a different way.",
    tables: [
      {
        columns: ['Word', 'Use', 'Example'],
        rows: [
          ['another', 'one more (singular, indefinite)', 'Can I have **another** coffee?'],
          ['other', 'indefinite, + plural noun', 'I have **other** plans.'],
          ['others', 'indefinite, plural pronoun (no noun)', 'Some like tea, **others** like coffee.'],
          ['the other', 'the remaining one (definite, singular)', "One shoe is here; where's **the other**?"],
          ['the others', 'the remaining ones (definite, plural)', 'Two students left; **the others** stayed.'],
        ],
      },
    ],
  },

  'B1::Can, could, be able to: Ability and possibility': {
    heading: 'Can, Could, Be Able To',
    intro: "These express ability, in the present, past, or other tenses.",
    tables: [
      {
        columns: ['Form', 'Use', 'Example'],
        rows: [
          ['can', 'present ability / possibility', 'I **can** speak French.'],
          ['could', 'general past ability', 'I **could** swim when I was five.'],
          ['be able to', 'all tenses, esp. a specific past achievement', 'I **was able to** finish on time.'],
        ],
      },
    ],
  },

  'B1::Have to, must, should: Obligation, prohibition, necessity, advice': {
    heading: 'Have To, Must, Should',
    intro: 'These modal expressions show different levels of obligation, prohibition, and advice.',
    tables: [
      {
        columns: ['Modal', 'Meaning', 'Example'],
        rows: [
          ['have to', 'external obligation (a rule)', 'I **have to** wear a uniform at work.'],
          ['must', 'strong obligation, often from the speaker', 'You **must** call her back.'],
          ['should', 'advice, recommendation', 'You **should** drink more water.'],
          ["mustn't", 'prohibition', "You **mustn't** park here."],
        ],
      },
    ],
  },

  'B1::Reflexive pronouns: Myself, yourself, etc.': {
    heading: 'Reflexive Pronouns',
    intro: 'We use reflexive pronouns when the subject and the object of a verb are the same person or thing.',
    tables: [
      {
        columns: ['Subject', 'Reflexive pronoun', 'Example'],
        rows: [
          ['I', 'myself', 'I cut **myself**.'],
          ['you', 'yourself', 'Did you hurt **yourself**?'],
          ['he / she / it', 'himself / herself / itself', 'He taught **himself** Spanish.'],
          ['we', 'ourselves', 'We enjoyed **ourselves**.'],
          ['they', 'themselves', 'They introduced **themselves**.'],
        ],
      },
    ],
  },

  'B1::-Ed/-ing adjectives: Adjectives from verbs': {
    heading: '-Ed and -Ing Adjectives',
    intro: "'-ed' adjectives describe how a person feels; '-ing' adjectives describe the thing or person that causes the feeling.",
    tables: [
      {
        columns: ['Type', 'Describes', 'Example'],
        rows: [
          ['-ed', 'the person who feels something', 'I was **bored** by the film.'],
          ['-ing', 'the thing/person causing the feeling', 'The film was **boring**.'],
        ],
      },
    ],
  },

  'B1::Past simple, past continuous, past perfect': {
    heading: 'Past Simple, Past Continuous, Past Perfect',
    intro: 'These three past tenses combine to show the order and nature of past events.',
    tables: [
      {
        columns: ['Tense', 'Use', 'Example'],
        rows: [
          ['Past simple', 'a completed action', 'I **finished** work at 6.'],
          ['Past continuous', 'an action in progress at a time', 'I **was cooking** at 6.'],
          ['Past perfect', 'an action before another past action', 'I **had finished** work before she arrived.'],
        ],
      },
    ],
  },

  'B1::Review of all intermediate verb tenses (CEFR B1)': {
    heading: 'Review of Intermediate Verb Tenses',
    intro: 'This is a quick overview of the main tenses studied up to B1 level.',
    tables: [
      {
        columns: ['Tense', 'Form', 'Example'],
        rows: [
          ['Present simple', 'verb / verb+s', 'I **work**. She **works**.'],
          ['Present continuous', 'am/is/are + -ing', 'I **am working**.'],
          ['Past simple', 'verb+ed / irregular', 'I **worked**. I **went**.'],
          ['Past continuous', 'was/were + -ing', 'I **was working**.'],
          ['Present perfect (simple/continuous)', 'have/has (+been) + verb(-ing)', "I **have worked**. I**'ve been working**."],
          ['Past perfect', 'had + past participle', 'I **had worked**.'],
          ['Future (will / going to)', 'will + verb / am going to + verb', "I **will work**. I**'m going to** work."],
        ],
      },
    ],
  },

  'B1::Usually, used to, be used to, get used to': {
    heading: 'Usually, Used To, Be Used To, Get Used To',
    intro: "These similar-looking expressions have different meanings: frequency, past habit, and familiarity.",
    tables: [
      {
        columns: ['Expression', 'Meaning', 'Example'],
        rows: [
          ['usually', 'adverb of frequency', 'I **usually** wake up at 7.'],
          ['used to + infinitive', 'a past habit, not true now', 'I **used to** smoke.'],
          ['be used to + -ing', 'accustomed to something', "I**'m used to** working nights."],
          ['get used to + -ing', 'becoming accustomed', "I**'m getting used to** the new schedule."],
        ],
      },
    ],
  },

  'B1::Passive verb forms': {
    heading: 'Passive Verb Forms',
    intro: 'The passive is formed with the verb "be" + past participle, and changes across all tenses.',
    tables: [
      {
        columns: ['Tense', 'Active', 'Passive'],
        rows: [
          ['Present simple', 'They **make** cars here.', 'Cars **are made** here.'],
          ['Past simple', 'They **built** the bridge in 1990.', 'The bridge **was built** in 1990.'],
          ['Present perfect', 'They **have finished** the project.', 'The project **has been finished**.'],
          ['Future', 'They **will announce** the results.', 'The results **will be announced**.'],
        ],
      },
    ],
  },

  'B1::Active and passive voice': {
    heading: 'Active and Passive Voice',
    intro: 'The active voice focuses on who does the action; the passive voice focuses on the action or the receiver of it.',
    tables: [
      {
        columns: ['Voice', 'Structure', 'Example'],
        rows: [
          ['Active', 'subject + verb + object', 'Shakespeare **wrote** this play.'],
          ['Passive', "object → subject + be + past participle (+ by...)", 'This play **was written by** Shakespeare.'],
        ],
      },
    ],
    notes: ['We use the passive when the action is more important than who did it, or when the agent is unknown or obvious.'],
  },

  "B1::Modal verbs of deduction: Must, may, might, could, can't": {
    heading: 'Modal Verbs of Deduction',
    intro: 'We use these modal verbs to say how certain we are about something, based on evidence.',
    tables: [
      {
        columns: ['Modal', 'Certainty', 'Example'],
        rows: [
          ['must', 'almost certain (positive conclusion)', 'He **must** be tired — he worked all night.'],
          ["can't", 'almost certain (negative conclusion)', "She **can't** be at home; the lights are off."],
          ['may / might / could', 'possible, not certain', 'They **might** be stuck in traffic.'],
        ],
      },
    ],
  },

  'B1::First conditional, future time clauses': {
    heading: 'First Conditional and Future Time Clauses',
    intro: 'The first conditional talks about real, possible future situations and their results.',
    tables: [
      {
        columns: ['Clause', 'Tense', 'Example'],
        rows: [
          ['If-clause', 'present simple', '**If** it **rains**,'],
          ['Result clause', 'will + base verb', "we **will stay** at home."],
          ['Time clause', 'present simple after when/as soon as', "I'**ll call** you **when I arrive**."],
        ],
      },
    ],
  },

  'B1::Second conditional: Unreal situations': {
    heading: 'Second Conditional',
    intro: 'The second conditional talks about unreal or unlikely present/future situations and their imagined results.',
    tables: [
      {
        columns: ['Clause', 'Form', 'Example'],
        rows: [
          ['If-clause', 'past simple', '**If** I **won** the lottery,'],
          ['Result clause', 'would + base verb', 'I **would travel** the world.'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["With 'be', we often use 'were' for all subjects: If I **were** you, I would rest."],
    },
  },

  'B1::First and second conditionals': {
    heading: 'First and Second Conditionals Compared',
    intro: 'The first conditional is for real, possible situations; the second is for unreal or unlikely ones.',
    tables: [
      {
        columns: ['Conditional', 'Use', 'Example'],
        rows: [
          ['First', 'real / possible future', '**If** it **rains**, I **will stay** home.'],
          ['Second', 'unreal / unlikely present-future', '**If** I **won** the lottery, I **would travel**.'],
        ],
      },
    ],
  },

  'B1::Third conditional: Past unreal situations': {
    heading: 'Third Conditional',
    intro: 'The third conditional talks about an imaginary result in the past — the real situation was actually different.',
    tables: [
      {
        columns: ['Clause', 'Form', 'Example'],
        rows: [
          ['If-clause', '**had** + past participle', '**If** I **had studied**,'],
          ['Result clause', '**would have** + past participle', 'I **would have passed** the exam.'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['The real situation was the opposite: in fact, I did not study, and I did not pass.'],
    },
  },

  'B1::Indirect speech / Reported speech': {
    heading: 'Indirect Speech',
    intro: 'When we report what someone said, we usually move the tense one step back into the past.',
    tables: [
      {
        columns: ['Direct speech', 'Reported speech'],
        rows: [
          ['"I **am** tired," she said.', 'She said (that) she **was** tired.'],
          ['"I **will help** you," he said.', 'He said (that) he **would help** me.'],
          ['"Where do you **live**?" she asked.', 'She asked where I **lived**.'],
        ],
      },
    ],
  },

  'B1::Gerund or infinitive: Do, to do, doing': {
    heading: 'Gerund or Infinitive',
    intro: 'Some verbs change meaning depending on whether they are followed by the gerund (-ing) or the to-infinitive.',
    tables: [
      {
        columns: ['Verb + form', 'Meaning', 'Example'],
        rows: [
          ['remember + to-infinitive', 'a future obligation', '**Remember to lock** the door.'],
          ['remember + -ing', 'a memory of the past', 'I **remember locking** the door.'],
          ['stop + to-infinitive', 'stop in order to do something', 'I **stopped to buy** milk.'],
          ['stop + -ing', 'stop an action', 'I **stopped smoking**.'],
        ],
      },
    ],
  },

  'B1::Much, many, a lot, little, few, some, any, no: Quantifiers': {
    heading: 'Quantifiers',
    intro: 'Quantifiers show approximate amounts or numbers of countable and uncountable nouns.',
    tables: [
      {
        columns: ['Word', 'Used with', 'Example'],
        rows: [
          ['much / many', 'uncountable / countable, negatives & questions', "I don't have **much** time. There aren't **many** eggs."],
          ['a lot (of)', 'both, affirmative sentences', 'She has **a lot of** friends.'],
          ['little / few', 'uncountable / countable, small amount (almost none)', 'We have **little** money. There are **few** solutions.'],
          ['some / any', 'both, affirmative / negatives & questions', "I bought **some** bread. I didn't buy **any**."],
          ['no', 'with a noun, negative meaning', 'There is **no** milk left.'],
        ],
      },
    ],
  },

  'B1::All, both: Quantifiers': {
    heading: 'All, Both',
    intro: "'All' refers to a whole group (three or more); 'both' refers to two things together.",
    tables: [
      {
        columns: ['Word', 'Use', 'Example'],
        rows: [
          ['all', 'the whole group (3+)', '**All** the students passed.'],
          ['both', 'two things together', '**Both** my sisters live abroad.'],
        ],
      },
    ],
  },

  'B1::Both, either, neither: Quantifiers': {
    heading: 'Both, Either, Neither',
    intro: "These quantifiers refer to two things: 'both' means the two together, 'either' means one of two, and 'neither' means not one nor the other.",
    tables: [
      {
        columns: ['Word', 'Meaning', 'Example'],
        rows: [
          ['both', 'the two, together', '**Both** answers are correct.'],
          ['either', 'one or the other (of two)', 'You can take **either** road.'],
          ['neither', 'not one nor the other (of two)', '**Neither** answer is correct.'],
        ],
      },
    ],
  },

  'B1::Any, no, none: Quantifiers': {
    heading: 'Any, No, None',
    intro: "'Any' is used in negatives/questions with a noun, 'no' has a negative meaning with a noun, and 'none' is used alone.",
    tables: [
      {
        columns: ['Word', 'Use', 'Example'],
        rows: [
          ['any', 'negatives & questions, + noun', "I don't have **any** money. Is there **any** left?"],
          ['no', 'with a noun, negative meaning', 'There is **no** answer.'],
          ['none', 'alone, without a noun', 'How much is left? — **None**.'],
        ],
      },
    ],
  },

  'B1::So, such, such a, so much, so many': {
    heading: 'So, Such, Such A, So Much, So Many',
    intro: "'So' is used before an adjective or adverb; 'such' is used before a noun (with or without an adjective).",
    tables: [
      {
        columns: ['Word', 'Used with', 'Example'],
        rows: [
          ['so', 'adjective / adverb (no noun)', 'The film was **so** boring.'],
          ['such a', 'singular countable noun (+ adjective)', "She's **such a** kind person."],
          ['such', 'plural / uncountable noun (+ adjective)', 'They are **such** good friends.'],
          ['so much', 'uncountable noun', 'There is **so much** traffic.'],
          ['so many', 'plural countable noun', 'There are **so many** people.'],
        ],
      },
    ],
  },

  'B1::Defining and non-defining relative clauses': {
    heading: 'Defining and Non-Defining Relative Clauses',
    intro: 'A defining clause gives essential information (no commas); a non-defining clause gives extra, non-essential information (with commas).',
    tables: [
      {
        columns: ['Type', 'Punctuation', 'Example'],
        rows: [
          ['Defining', 'no commas, essential info', 'The man **who called** is my brother.'],
          ['Non-defining', 'commas, extra info', 'My brother, **who lives in Rome**, called me.'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["'That' can replace who/which in defining clauses, but never in non-defining clauses."],
    },
  },

  "B1::Question tags: Aren't you? don't you?": {
    heading: 'Question Tags',
    intro: 'A question tag is a short question added to the end of a statement, often to check information.',
    tables: [
      {
        columns: ['Statement type', 'Tag', 'Example'],
        rows: [
          ['Positive statement', 'negative tag', "You **are** tired, **aren't you**?"],
          ['Negative statement', 'positive tag', "You **don't** like fish, **do you**?"],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['The tag uses the same auxiliary as the main sentence (or do/does/did for the present/past simple).'],
    },
  },

  'B1::Clauses of contrast, purpose and reason': {
    heading: 'Clauses of Contrast, Purpose and Reason',
    intro: 'These connectors join two ideas by showing contrast, purpose, or reason.',
    tables: [
      {
        columns: ['Type', 'Connector', 'Example'],
        rows: [
          ['Contrast', 'although, even though, despite', '**Although** it was raining, we went out.'],
          ['Purpose', 'to, in order to, so that', 'I saved money **in order to** buy a car.'],
          ['Reason', 'because, since, as', '**Since** it was late, we went home.'],
        ],
      },
    ],
  },

  'B1::Verb + preposition: Dependent prepositions': {
    heading: 'Verb + Preposition',
    intro: 'Many verbs are always followed by the same preposition — these combinations need to be learned together.',
    tables: [
      {
        columns: ['Verb + preposition', 'Example'],
        rows: [
          ['depend on', 'It **depends on** the weather.'],
          ['listen to', 'I **listened to** the radio.'],
          ['apologize for', 'He **apologized for** being late.'],
          ['believe in', 'She **believes in** hard work.'],
          ['wait for', 'We **waited for** the bus.'],
        ],
      },
    ],
  },

  'B1::Adjective + preposition: Dependent prepositions': {
    heading: 'Adjective + Preposition',
    intro: 'Many adjectives are always followed by the same preposition — these combinations need to be learned together.',
    tables: [
      {
        columns: ['Adjective + preposition', 'Example'],
        rows: [
          ['afraid of', 'She is **afraid of** spiders.'],
          ['good at', 'He is **good at** maths.'],
          ['interested in', "I'm **interested in** history."],
          ['married to', 'She is **married to** a doctor.'],
          ['proud of', 'We are **proud of** you.'],
        ],
      },
    ],
  },

  "B1::Had better... It's time...": {
    heading: "Had Better and It's Time",
    intro: "'Had better' gives strong advice with a warning; 'it's time' says something should happen now.",
    tables: [
      {
        columns: ['Expression', 'Use', 'Example'],
        rows: [
          ['had better + base verb', 'strong advice, warning of a consequence', "You **had better** hurry, or you'll miss the bus."],
          ["it's time + past simple", 'something should happen now', "It**'s time** you **went** to bed."],
        ],
      },
    ],
  },

  "B1::For, since, from: What's the difference?": {
    heading: 'For, Since, From',
    intro: 'These words are all connected to time but used differently.',
    tables: [
      {
        columns: ['Word', 'Used for', 'Example'],
        rows: [
          ['for', 'a period / duration', "I've lived here **for** ten years."],
          ['since', 'a starting point in time', "I've lived here **since** 2015."],
          ['from', "a starting point (often paired with 'to')", 'The shop is open **from** 9 **to** 5.'],
        ],
      },
    ],
  },

  "B1::Compound adjectives with numbers: 'a two-day trip'": {
    heading: 'Compound Adjectives with Numbers',
    intro: 'We can combine a number and a noun to make a hyphenated adjective before another noun.',
    tables: [
      {
        columns: ['Pattern', 'Example'],
        rows: [
          ['number + noun (hyphenated)', 'a **two-day** trip, a **five-year-old** child'],
          ['number + unit as adjective', 'a **ten-minute** walk, a **three-hour** flight'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['The noun inside the compound adjective stays singular: a **two-day** trip, not a two-days trip.'],
    },
  },

  'B1::B1 Phrasal verbs 1: Exercises and explanation': {
    heading: 'B1 Phrasal Verbs 1',
    intro: 'Common phrasal verbs used in everyday situations.',
    tables: [
      {
        columns: ['Phrasal verb', 'Meaning', 'Example'],
        rows: [
          ['look after', 'take care of', 'Can you **look after** my dog?'],
          ['give up', 'quit, stop doing', 'She decided to **give up** smoking.'],
          ['put off', 'postpone', 'We had to **put off** the meeting.'],
          ['carry on', 'continue', 'Please **carry on** with your work.'],
          ['turn out', 'result, end up', 'The party **turned out** to be fun.'],
          ['come across', 'find by chance', 'I **came across** an old photo.'],
          ['run out of', 'have none left', 'We **ran out of** milk.'],
          ['get over', 'recover from', 'It took her months to **get over** the breakup.'],
          ['go on', 'continue', "Please **go on**; I'm listening."],
          ['break down', 'stop working (a machine)', 'My car **broke down**.'],
        ],
      },
    ],
  },

  'B1::B1 Phrasal verbs 2: Exercises and explanation': {
    heading: 'B1 Phrasal Verbs 2',
    intro: 'More common phrasal verbs used in everyday situations.',
    tables: [
      {
        columns: ['Phrasal verb', 'Meaning', 'Example'],
        rows: [
          ['set up', 'establish', 'They plan to **set up** a business.'],
          ['find out', 'discover', 'I need to **find out** what happened.'],
          ['work out', 'turn out well', 'Everything **worked out** in the end.'],
          ['take off', 'depart (aircraft)', 'The plane will **take off** soon.'],
          ['put up with', 'tolerate', "I can't **put up with** this noise."],
          ['look forward to', 'anticipate happily', "I'm **looking forward to** the concert."],
          ['hold on', 'wait', '**Hold on** a moment.'],
          ['get along with', 'have a good relationship', 'She **gets along with** everyone.'],
          ['come up with', 'think of (an idea)', 'He **came up with** a great idea.'],
          ['cut down on', 'reduce', "I'm trying to **cut down on** sugar."],
        ],
      },
    ],
  },

  'B1::B1 Phrasal verbs 3: Exercises and explanation': {
    heading: 'B1 Phrasal Verbs 3',
    intro: 'More common phrasal verbs used in everyday situations.',
    tables: [
      {
        columns: ['Phrasal verb', 'Meaning', 'Example'],
        rows: [
          ['bring up', 'raise (a child)', "My parents **brought** me **up** to be honest."],
          ['deal with', 'handle', "I don't know how to **deal with** this."],
          ['figure out', 'understand, solve', 'I finally **figured out** the solution.'],
          ['get away with', 'avoid punishment', 'He always **gets away with** lying.'],
          ['go through', 'experience something difficult', "She's **going through** a difficult time."],
          ['hang out', 'spend time casually', 'We usually **hang out** at the mall.'],
          ['make up', 'reconcile', 'They **made up** after their argument.'],
          ['point out', 'indicate', 'The teacher **pointed out** my mistakes.'],
          ['take after', 'resemble', 'She **takes after** her mother.'],
          ['turn down', 'reject', 'He **turned down** the job offer.'],
        ],
      },
    ],
  },

  'B1::Would rather & Would sooner': {
    heading: 'Would Rather and Would Sooner',
    intro: "'Would rather' and 'would sooner' express preference — what someone would prefer to do.",
    tables: [
      {
        columns: ['Expression', 'Use', 'Example'],
        rows: [
          ['would rather + base verb', 'preference (same subject)', "I**'d rather stay** home tonight."],
          ['would rather + subject + past simple', "preference about someone else's action", "I**'d rather** you **called** me tomorrow."],
          ['would sooner + base verb', 'same as would rather, less common', "I**'d sooner walk** than take the bus."],
        ],
      },
    ],
  },

  'B1+::Questions: Different types': {
    heading: 'Question Types',
    intro: 'English uses several question structures, from simple yes/no questions to polite indirect questions.',
    tables: [
      {
        columns: ['Type', 'Example'],
        rows: [
          ['Yes/No question', '**Do** you like coffee?'],
          ['Wh- question', '**Where** do you live?'],
          ['Subject question', '**Who** called you?'],
          ['Question tag', "You're coming, **aren't you**?"],
          ['Indirect question', 'Could you tell me **where the station is**?'],
        ],
      },
    ],
  },

  'B1+::Indirect questions': {
    heading: 'Indirect Questions',
    intro: 'Indirect questions are a more polite way to ask something, often starting with a phrase like "Could you tell me...?".',
    tables: [
      {
        columns: ['Direct question', 'Indirect question'],
        rows: [
          ['**Where** is the station?', 'Could you tell me **where the station is**?'],
          ['**What** time is it?', 'Do you know **what time it is**?'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["In indirect questions, the word order changes to subject + verb, and we don't use do/does/did."],
    },
  },

  'B1+::Auxiliary verbs: Different uses': {
    heading: 'Auxiliary Verbs: Different Uses',
    intro: 'Auxiliary verbs (do, be, have) combine with a main verb for questions, negatives, tenses, and even emphasis.',
    tables: [
      {
        columns: ['Auxiliary', 'Use', 'Example'],
        rows: [
          ['do / does / did', 'questions, negatives, emphasis', 'I **do** like it! (emphasis)'],
          ['be', 'continuous tenses, passive', '**She is** working. It **was** built.'],
          ['have', 'perfect tenses', 'I **have** finished.'],
        ],
      },
    ],
  },

  'B1+::The ... the ... comparatives': {
    heading: 'The ... The ... Comparatives',
    intro: "This structure shows that two things change together — as one increases or decreases, so does the other.",
    tables: [
      {
        columns: ['Pattern', 'Example'],
        rows: [
          ['the + comparative, the + comparative', '**The more** you practice, **the better** you get.'],
          ['the + comparative, the + comparative', "**The sooner** we leave, **the earlier** we'll arrive."],
        ],
      },
    ],
  },

  'B1+::Present perfect simple or continuous': {
    heading: 'Present Perfect Simple or Continuous',
    intro: 'The simple form emphasizes the result of an action; the continuous form emphasizes the activity and its duration.',
    tables: [
      {
        columns: ['Present perfect simple', 'Present perfect continuous'],
        rows: [
          ["I**'ve painted** the fence. (it's finished)", "I**'ve been painting** the fence all day. (may not be finished)"],
          ['Focus: the completed result', 'Focus: the ongoing activity / duration'],
        ],
      },
    ],
  },

  'B1+::Adjectives without noun': {
    heading: 'Adjectives Without a Noun',
    intro: "'The' + adjective can refer to a whole group of people, used without a noun.",
    tables: [
      {
        columns: ['Pattern', 'Example'],
        rows: [
          ['the + adjective (a group of people)', '**the rich**, **the elderly**, **the unemployed**'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["This structure always takes a plural verb: **The rich are** getting richer."],
    },
  },

  'B1+::Adjective order': {
    heading: 'Adjective Order',
    intro: 'When we use more than one adjective before a noun, they usually follow a fixed order.',
    tables: [
      {
        columns: ['Order', 'Category', 'Examples'],
        rows: [
          ['1', 'Opinion', 'beautiful, lovely'],
          ['2', 'Size', 'big, small'],
          ['3', 'Age', 'old, young'],
          ['4', 'Shape', 'round, square'],
          ['5', 'Color', 'red, blue'],
          ['6', 'Origin', 'Italian, French'],
          ['7', 'Material', 'wooden, cotton'],
        ],
      },
    ],
    notes: ['Example: a **lovely small old round wooden** table.'],
  },

  'B1+::So, such (a), so much, so many': {
    heading: 'So, Such (A), So Much, So Many',
    intro: "'So' goes before an adjective or adverb; 'such (a)' goes before a noun.",
    tables: [
      {
        columns: ['Word', 'Used with', 'Example'],
        rows: [
          ['so', 'adjective / adverb', 'The film was **so** boring.'],
          ['such a', 'singular countable noun', "She's **such a** kind person."],
          ['so much / so many', 'uncountable / plural countable noun', 'There is **so much** traffic. There are **so many** cars.'],
        ],
      },
    ],
  },

  'B1+::Narrative tenses: All past tenses': {
    heading: 'Narrative Tenses',
    intro: 'When telling a story, we combine several past tenses to show the order and background of events.',
    tables: [
      {
        columns: ['Tense', 'Use', 'Example'],
        rows: [
          ['Past simple', 'main events in the story', 'She **opened** the door.'],
          ['Past continuous', 'background action', 'The rain **was falling**.'],
          ['Past perfect', 'an earlier event', 'She **had left** before I arrived.'],
          ['Past perfect continuous', 'a longer earlier action', 'She **had been waiting** for an hour.'],
        ],
      },
    ],
  },

  'B1+::Position of adverbs and adverb phrases': {
    heading: 'Position of Adverbs',
    intro: 'Different types of adverbs usually go in different positions in a sentence.',
    tables: [
      {
        columns: ['Type', 'Position', 'Example'],
        rows: [
          ['Frequency', "before the main verb, after 'be'", 'I **always** arrive on time.'],
          ['Manner', 'usually end of clause', 'She sang **beautifully**.'],
          ['Time / place', 'usually end of clause', 'We arrived **yesterday**.'],
        ],
      },
    ],
  },

  'B1+::Future continuous and future perfect': {
    heading: 'Future Continuous and Future Perfect',
    intro: 'The future continuous describes an action in progress at a future time; the future perfect describes an action completed before a future time.',
    tables: [
      {
        columns: ['Tense', 'Form', 'Example'],
        rows: [
          ['Future continuous', 'will be + -ing', 'This time tomorrow, I **will be flying** to Rome.'],
          ['Future perfect', 'will have + past participle', 'By next year, I **will have finished** my degree.'],
        ],
      },
    ],
  },

  'B1+::Review of all upper-intermediate verb tenses (CEFR B2.1)': {
    heading: 'Review of Upper-Intermediate Verb Tenses',
    intro: 'This is a quick overview of the tenses studied up to B1+ / B2.1 level.',
    tables: [
      {
        columns: ['Tense', 'Form', 'Example'],
        rows: [
          ['Present perfect continuous', "have/has been + -ing", "I**'ve been studying** for hours."],
          ['Past perfect (simple/continuous)', "had (+been) + verb(-ing)", "I **had finished**. I **had been waiting**."],
          ['Future continuous', 'will be + -ing', 'I **will be traveling** next week.'],
          ['Future perfect', 'will have + past participle', 'I **will have finished** by Friday.'],
        ],
      },
    ],
  },

  'B1+::Zero and first conditional and future time clauses': {
    heading: 'Zero and First Conditional',
    intro: 'The zero conditional describes general truths and facts; the first conditional describes real, possible future situations.',
    tables: [
      {
        columns: ['Conditional', 'Use', 'Example'],
        rows: [
          ['Zero', 'general truths, facts', '**If** you **heat** water, it **boils**.'],
          ['First', 'real future possibility', '**If** it **rains**, we **will stay** home.'],
        ],
      },
    ],
  },

  'B1+::Second and third conditionals: Unreal conditionals': {
    heading: 'Second and Third Conditionals',
    intro: 'The second conditional imagines an unreal present or future; the third conditional imagines an unreal past.',
    tables: [
      {
        columns: ['Conditional', 'Use', 'Example'],
        rows: [
          ['Second', 'unreal present / future', '**If** I **had** more time, I **would learn** Japanese.'],
          ['Third', 'unreal past', '**If** I **had known**, I **would have helped**.'],
        ],
      },
    ],
  },

  'B1+::Wishes and regrets: I wish/if only': {
    heading: 'Wishes and Regrets',
    intro: "We use 'wish' and 'if only' to talk about things we would like to be different, in the present or the past.",
    tables: [
      {
        columns: ['Structure', 'Use', 'Example'],
        rows: [
          ['wish/if only + past simple', 'wish about the present', 'I **wish** I **had** more time.'],
          ['wish/if only + past perfect', 'regret about the past', 'I **wish** I **had studied** harder.'],
          ["wish + would", "annoyance about someone else's behaviour", "I **wish** you**'d stop** interrupting."],
        ],
      },
    ],
  },

  'B1+::Participles as adjectives: -ed/-ing adjectives': {
    heading: 'Participles as Adjectives',
    intro: "Present participles (-ing) and past participles (-ed) can both work as adjectives, with different meanings.",
    tables: [
      {
        columns: ['Form', 'Describes', 'Example'],
        rows: [
          ['-ing (present participle)', 'the cause of a feeling', 'The news was **surprising**.'],
          ['-ed (past participle)', 'the person who feels it', 'I was **surprised** by the news.'],
        ],
      },
    ],
  },

  'B1+::Used to, be used to, get used to': {
    heading: 'Used To, Be Used To, Get Used To',
    intro: "These similar-looking expressions have different meanings: past habit, and familiarity with a situation.",
    tables: [
      {
        columns: ['Expression', 'Meaning', 'Example'],
        rows: [
          ['used to + infinitive', 'a past habit, not true now', 'I **used to** smoke.'],
          ['be used to + -ing', 'accustomed to something', "I**'m used to** working nights."],
          ['get used to + -ing', 'becoming accustomed', "I**'m getting used to** the new schedule."],
        ],
      },
    ],
  },

  'B1+::Would and used to: Past habits and repeated actions': {
    heading: 'Would and Used To',
    intro: "Both describe past habits, but only 'used to' can describe past states.",
    tables: [
      {
        columns: ['Word', 'Use', 'Example'],
        rows: [
          ['used to', 'past habits AND past states', 'I **used to** live in Paris. I **used to** play tennis.'],
          ['would', 'past habits only (no states)', 'Every summer, we **would visit** our grandparents.'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["'Would' cannot describe a past state — say **used to live**, not would live."],
    },
  },

  'B1+::Gerund or infinitive: Verb patterns': {
    heading: 'Gerund or Infinitive: Verb Patterns',
    intro: 'Some verbs change meaning depending on whether they are followed by the gerund (-ing) or the to-infinitive.',
    tables: [
      {
        columns: ['Verb + form', 'Meaning', 'Example'],
        rows: [
          ['try + to-infinitive', 'make an effort', 'I **tried to open** the jar.'],
          ['try + -ing', 'experiment with something', 'I **tried opening** the window for fresh air.'],
          ['forget + to-infinitive', 'forget an obligation', 'I **forgot to call** her.'],
          ['forget + -ing', 'forget a memory (often negative)', "I'll never **forget meeting** him."],
        ],
      },
    ],
  },

  'B1+::Past modal verbs of deduction': {
    heading: 'Past Modal Verbs of Deduction',
    intro: 'We use modal + have + past participle to guess about something that happened in the past.',
    tables: [
      {
        columns: ['Modal', 'Certainty', 'Example'],
        rows: [
          ['must have + past participle', 'almost certain (positive)', 'She **must have left** already.'],
          ["can't have + past participle", 'almost certain (negative)', "He **can't have forgotten**."],
          ['might/could have + past participle', 'possible', 'They **might have missed** the train.'],
        ],
      },
    ],
  },

  'B1+::Likely, unlikely, bound, definitely, probably: Probability': {
    heading: 'Expressing Probability',
    intro: 'These words and expressions show how certain or uncertain we are about something.',
    tables: [
      {
        columns: ['Expression', 'Meaning', 'Example'],
        rows: [
          ['be likely to', 'probable', "It**'s likely to** rain later."],
          ['be unlikely to', 'improbable', "She**'s unlikely to** come."],
          ['be bound to', 'almost certain', "He**'s bound to** be late again."],
          ['definitely', 'certain (adverb)', "I**'ll definitely** call you."],
          ['probably', 'likely (adverb)', "She**'ll probably** agree."],
        ],
      },
    ],
  },

  'B1+::Would rather, would prefer: Expressing preference': {
    heading: 'Would Rather, Would Prefer',
    intro: 'These structures express what someone prefers to do.',
    tables: [
      {
        columns: ['Expression', 'Structure', 'Example'],
        rows: [
          ['would rather', '+ base verb (same subject)', "I**'d rather stay** in."],
          ['would prefer', '+ to-infinitive', "I**'d prefer to stay** in."],
          ['would rather', '+ subject + past simple (different subject)', "I**'d rather** you **didn't** smoke here."],
        ],
      },
    ],
  },

  'B1+::Verbs of the senses: look, sound, feel, etc.': {
    heading: 'Verbs of the Senses',
    intro: "Verbs like look, sound, feel, taste, and smell are followed by an adjective, or by 'like' + a noun.",
    tables: [
      {
        columns: ['Verb', 'Pattern', 'Example'],
        rows: [
          ['look / sound / feel', '+ adjective', 'You **look tired**. That **sounds great**.'],
          ['look / sound / feel like', '+ noun', 'It **sounds like** a good idea.'],
        ],
      },
    ],
  },

  'B1+::The passive voice: All tenses': {
    heading: 'The Passive Voice: All Tenses',
    intro: 'The passive is formed with the correct tense of "be" + past participle, and it can be used in almost every tense.',
    tables: [
      {
        columns: ['Tense', 'Passive form', 'Example'],
        rows: [
          ['Present continuous', 'am/is/are being + past participle', 'The room **is being cleaned**.'],
          ['Present perfect', 'have/has been + past participle', 'The letter **has been sent**.'],
          ['Modal', 'modal + be + past participle', 'The work **must be finished** today.'],
        ],
      },
    ],
  },

  'B1+::The passive with reporting verbs: It is said that ...': {
    heading: 'Passive with Reporting Verbs',
    intro: "We use this passive structure to report general opinions or beliefs without saying who holds them.",
    tables: [
      {
        columns: ['Pattern', 'Example'],
        rows: [
          ['It is + past participle + that...', '**It is said that** he is very rich.'],
          ['Subject + is + past participle + to-infinitive', 'He **is said to be** very rich.'],
        ],
      },
    ],
  },

  'B1+::Have something done': {
    heading: 'Have Something Done',
    intro: "We use 'have/get something done' when someone else does a service for us.",
    tables: [
      {
        columns: ['Structure', 'Meaning', 'Example'],
        rows: [
          ['have + object + past participle', 'arrange for someone else to do something', 'I **had my hair cut** yesterday.'],
          ['get + object + past participle', 'same meaning, more informal', 'I **got my car fixed**.'],
        ],
      },
    ],
  },

  "B1+::Reporting verbs: Admit doing, refuse to do, etc.": {
    heading: 'Reporting Verbs',
    intro: 'Different reporting verbs are followed by different patterns — some by -ing, some by to-infinitive.',
    tables: [
      {
        columns: ['Verb', 'Pattern', 'Example'],
        rows: [
          ['admit', '+ -ing', 'He **admitted stealing** the money.'],
          ['refuse', '+ to-infinitive', 'She **refused to answer**.'],
          ['suggest', '+ -ing', 'I **suggested going** to the cinema.'],
          ['promise', '+ to-infinitive', 'He **promised to help**.'],
        ],
      },
    ],
  },

  'B1+::Clauses of contrast and purpose': {
    heading: 'Clauses of Contrast and Purpose',
    intro: 'These connectors join two ideas by showing contrast or purpose.',
    tables: [
      {
        columns: ['Type', 'Connector', 'Example'],
        rows: [
          ['Contrast', 'whereas, while, despite, in spite of', '**Despite** the rain, we went out.'],
          ['Purpose', 'so as to, in order not to', 'She left early **so as to** avoid traffic.'],
        ],
      },
    ],
  },

  'B1+::Whatever, whenever, wherever, whoever, however': {
    heading: 'Whatever, Whenever, Wherever, Whoever, However',
    intro: "These '-ever' words mean 'it doesn't matter what/when/where/who/how'.",
    tables: [
      {
        columns: ['Word', 'Meaning', 'Example'],
        rows: [
          ['whatever', 'no matter what', '**Whatever** happens, stay calm.'],
          ['whenever', 'no matter when', 'Come **whenever** you like.'],
          ['wherever', 'no matter where', 'Sit **wherever** you want.'],
          ['whoever', 'no matter who', '**Whoever** wins, we celebrate.'],
          ['however', 'no matter how', '**However** hard it is, keep trying.'],
        ],
      },
    ],
  },

  'B1+::Quantifiers: All, most, both, either, neither, any, no, none': {
    heading: 'Quantifiers Review',
    intro: 'A quick reference for the most common English quantifiers.',
    tables: [
      {
        columns: ['Word', 'Use', 'Example'],
        rows: [
          ['all / most', 'the whole group / almost all of it', '**All** the seats were full. **Most** people agreed.'],
          ['both / either / neither', 'two things: together / one of / not one of', '**Both** are correct. Take **either** one. **Neither** is correct.'],
          ['any / no / none', 'questions & negatives / with a noun / alone', "There isn't **any** left. There is **no** milk. — **None**."],
        ],
      },
    ],
  },

  "B1+::Already, still, yet: What's the difference?": {
    heading: 'Already, Still, Yet',
    intro: "'Already' shows something happened sooner than expected; 'still' shows continuation; 'yet' is used in negatives and questions about something expected.",
    tables: [
      {
        columns: ['Word', 'Use', 'Example'],
        rows: [
          ['already', 'affirmative — sooner than expected', "I**'ve already finished**."],
          ['still', 'continuing (affirmative or negative)', "She **still** works there. He **still** hasn't called."],
          ['yet', 'negatives & questions — up to now', "I **haven't finished yet**. Have you finished **yet**?"],
        ],
      },
    ],
  },

  "B1+::Needn't, don't need to, didn't need to, needn't have": {
    heading: "Needn't and Don't Need To",
    intro: 'These expressions show that something is/was not necessary.',
    tables: [
      {
        columns: ['Expression', 'Meaning', 'Example'],
        rows: [
          ["don't need to / needn't", 'no obligation (now or in general)', "You **don't need to** bring anything."],
          ["didn't need to", "it wasn't necessary (may or may not have happened)", "I **didn't need to** go, so I stayed home."],
          ["needn't have + past participle", "it wasn't necessary, but it was done anyway", "You **needn't have brought** a gift."],
        ],
      },
    ],
  },

  'B1+::Pretty, rather, quite, fairly: Adverbs of degree': {
    heading: 'Adverbs of Degree',
    intro: 'These adverbs modify adjectives and adverbs, showing different strengths of meaning.',
    tables: [
      {
        columns: ['Adverb', 'Strength', 'Example'],
        rows: [
          ['fairly', 'moderate', 'The test was **fairly** easy.'],
          ['quite', 'moderate to strong', 'The film was **quite** good.'],
          ['rather', 'strong, often about something negative', "It's **rather** cold today."],
          ['pretty', 'strong (informal)', "I'm **pretty** sure she's right."],
        ],
      },
    ],
  },

  'B1+::When I do vs When I have done: Future time clauses': {
    heading: 'Future Time Clauses',
    intro: "In future time clauses (after when, after, as soon as, etc.) we use the present simple or present perfect, never 'will'.",
    tables: [
      {
        columns: ['Clause', 'Tense', 'Example'],
        rows: [
          ['when I do (general / simultaneous)', 'present simple', "I**'ll call** you **when I arrive**."],
          ['when I have done (completed first)', 'present perfect', "I**'ll call** you **when I have finished**."],
        ],
      },
    ],
  },

  "B1+::Do or Make: Which is it?": {
    heading: 'Do or Make',
    intro: "'Do' is often used for general activities and work; 'make' is often used for creating or producing something.",
    tables: [
      {
        columns: ['Verb', 'Common collocations'],
        rows: [
          ['do', 'do homework, do the housework, do a favor, do business'],
          ['make', 'make a cake, make a decision, make a mistake, make an effort'],
        ],
      },
    ],
  },

  'B1+::Double negatives in English': {
    heading: 'Double Negatives',
    intro: 'Standard English avoids using two negative words together in the same clause.',
    tables: [
      {
        columns: ['Incorrect', 'Correct'],
        rows: [
          ["I don't have no money.", 'I **don\'t have any** money. / I **have no** money.'],
          ["She didn't say nothing.", "She **didn't say anything**. / She **said nothing**."],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["Use 'any/anything' with a negative verb, or 'no/nothing' with a positive verb — never both together."],
    },
  },

  'B2::Have: Auxiliary or main verb': {
    heading: 'Have: Auxiliary or Main Verb',
    intro: "'Have' can be an auxiliary verb (in perfect tenses) or a main verb (meaning possess or experience).",
    tables: [
      {
        columns: ['Use', 'Example'],
        rows: [
          ['Auxiliary (perfect tenses)', '**I have** finished. **Have** you **seen** it?'],
          ['Main verb (possession / action)', '**I have** a car. **I have** breakfast at 8.'],
        ],
      },
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['As a main verb, "have" usually uses do/does/did for questions and negatives: **Do** you **have** a car?'],
    },
  },

  'B2::Clauses of contrast, purpose, reason and result': {
    heading: 'Clauses of Contrast, Purpose, Reason and Result',
    intro: 'These connectors link two ideas together in different logical ways.',
    tables: [
      {
        columns: ['Type', 'Connector', 'Example'],
        rows: [
          ['Contrast', 'although, despite, whereas', '**Despite** the cost, we bought it.'],
          ['Purpose', 'so that, in order to', "We left early **so that** we wouldn't be late."],
          ['Reason', 'since, as, due to', '**Due to** the storm, the flight was cancelled.'],
          ['Result', 'so, such...that, therefore', 'It was so cold **that** we stayed in.'],
        ],
      },
    ],
  },

  'B2::Generic or common-gender pronouns': {
    heading: 'Generic Pronouns',
    intro: "We use generic pronouns to refer to a person without specifying their gender.",
    tables: [
      {
        columns: ['Pronoun', 'Use', 'Example'],
        rows: [
          ['they / them / their', 'a person of unspecified gender', 'Someone left **their** bag here.'],
          ['one', 'formal generic subject', '**One** should always be polite.'],
          ['you (generic)', 'informal generic subject', "**You** never know what will happen."],
        ],
      },
    ],
  },

  'B2::Reflexive and reciprocal pronouns': {
    heading: 'Reflexive and Reciprocal Pronouns',
    intro: 'Reflexive pronouns show the subject and object are the same; reciprocal pronouns show an action shared between people.',
    tables: [
      {
        columns: ['Type', 'Pronoun', 'Example'],
        rows: [
          ['Reflexive', 'myself, yourself, himself...', 'He hurt **himself**.'],
          ['Reciprocal', 'each other, one another', 'They love **each other**.'],
        ],
      },
    ],
  },

  "B2::'There' and 'it': Preparatory subjects": {
    heading: "There and It as Preparatory Subjects",
    intro: "'There' introduces the existence of something; 'it' introduces an infinitive or clause as the real subject.",
    tables: [
      {
        columns: ['Word', 'Use', 'Example'],
        rows: [
          ['there', 'introduces existence', '**There** seems to be a problem.'],
          ['it', 'preparatory subject for an infinitive/clause', '**It** is important to arrive early.'],
        ],
      },
    ],
  },

  'B2::Narrative tenses, used to, would': {
    heading: 'Narrative Tenses, Used To, Would',
    intro: 'Storytelling combines several past tenses along with used to/would for repeated actions.',
    tables: [
      {
        columns: ['Tense / expression', 'Use', 'Example'],
        rows: [
          ['Past simple', 'main events', 'He **walked** into the room.'],
          ['Past continuous', 'background', 'Music **was playing**.'],
          ['Past perfect', 'earlier events', 'She **had already left**.'],
          ['used to / would', 'repeated past actions', 'We **used to** / **would** meet every Friday.'],
        ],
      },
    ],
  },

  'B2::Get: Different meanings': {
    heading: "The Verb 'Get': Different Meanings",
    intro: "'Get' is one of the most flexible verbs in English, with many different meanings.",
    tables: [
      {
        columns: ['Meaning', 'Example'],
        rows: [
          ['become', 'It **got** cold.'],
          ['receive', 'I **got** a message.'],
          ['arrive', 'We **got** home late.'],
          ['understand', 'I **get** it now.'],
          ['have something done', 'I **got** my hair cut.'],
        ],
      },
    ],
  },

  'B2::Discourse markers: Linking words': {
    heading: 'Discourse Markers',
    intro: 'Discourse markers connect ideas across sentences and show the relationship between them.',
    tables: [
      {
        columns: ['Marker', 'Function', 'Example'],
        rows: [
          ['however', 'contrast', 'The plan failed. **However**, we learned a lot.'],
          ['moreover', 'addition', 'The hotel was cheap. **Moreover**, it was close to the beach.'],
          ['therefore', 'result', 'It was raining; **therefore**, we cancelled the picnic.'],
          ['in other words', 'clarification', "He's frugal — **in other words**, he doesn't like spending money."],
        ],
      },
    ],
  },

  'B2::Speculation and deduction: Modal verbs and expressions': {
    heading: 'Speculation and Deduction',
    intro: 'We use modal verbs and expressions to show how certain we are about something.',
    tables: [
      {
        columns: ['Expression', 'Certainty', 'Example'],
        rows: [
          ['must', 'almost certain', 'He **must** be the new manager.'],
          ['may / might / could', 'possible', 'She **might** be running late.'],
          ["can't", 'almost certain, negative', "That **can't** be true."],
          ["it's likely/possible that", 'varying certainty', "**It's likely that** she'll agree."],
        ],
      },
    ],
  },

  'B2::Inversion with negative adverbials: Adding emphasis': {
    heading: 'Inversion with Negative Adverbials',
    intro: 'When a negative adverbial expression starts a sentence, the subject and auxiliary verb invert, like in a question.',
    tables: [
      {
        columns: ['Adverbial', 'Example'],
        rows: [
          ['Never', '**Never have** I seen such a mess.'],
          ['Not only...but also', '**Not only did** she win, **but** she also broke the record.'],
          ['No sooner...than', '**No sooner had** we sat down **than** the phone rang.'],
        ],
      },
    ],
  },

  'B2::Distancing: Expressions and passive of reporting verbs': {
    heading: 'Distancing Expressions',
    intro: 'These structures let a speaker report something without saying exactly who said it, creating distance from the claim.',
    tables: [
      {
        columns: ['Pattern', 'Example'],
        rows: [
          ['It is said/believed/thought that...', '**It is believed that** the painting is a fake.'],
          ['Subject + is said/believed + to-infinitive', 'The painting **is believed to be** a fake.'],
        ],
      },
    ],
  },

  "B2::Wish, rather, if only, it's time: Unreal uses of past tenses": {
    heading: 'Unreal Uses of Past Tenses',
    intro: "These expressions use a past tense to talk about the present or future, not the past.",
    tables: [
      {
        columns: ['Expression', 'Tense used', 'Example'],
        rows: [
          ['wish / if only', 'past simple (present wish)', 'I **wish** I **knew** the answer.'],
          ['wish / if only', 'past perfect (past regret)', 'I **wish** I **had known**.'],
          ['would rather', "past simple (about someone else)", "I**'d rather** you **left** now."],
          ["it's time", 'past simple', "It**'s time** we **went** home."],
        ],
      },
    ],
  },

  'B2::Verb + object + infinitive/gerund: Verb patterns': {
    heading: 'Verb + Object + Infinitive/Gerund',
    intro: 'Some verbs take an object followed by an infinitive, a base verb, or an -ing form.',
    tables: [
      {
        columns: ['Pattern', 'Example'],
        rows: [
          ['verb + object + to-infinitive', 'I **want you to come**.'],
          ['verb + object + base verb (after make/let)', 'She **made him apologize**.'],
          ['verb + object + -ing', 'I **saw him leaving**.'],
        ],
      },
    ],
  },

  'B2::Unless, even if, provided, as long as, etc.: Other expressions in conditionals': {
    heading: 'Other Conditional Expressions',
    intro: "Besides 'if', several other expressions can introduce a condition.",
    tables: [
      {
        columns: ['Expression', 'Meaning', 'Example'],
        rows: [
          ['unless', 'except if (= if not)', "**Unless** you hurry, you'll be late."],
          ['provided / providing (that)', 'on condition that', 'You can go **provided that** you finish your homework.'],
          ['as long as', 'on condition that', "**As long as** you're happy, I'm happy."],
          ['even if', 'regardless of', "**Even if** it rains, we'll go."],
        ],
      },
    ],
  },

  "B2::All conditionals: Mixed conditionals, alternatives to 'if', inversion": {
    heading: "Advanced Conditionals",
    intro: "Beyond the standard conditionals, English allows mixed time frames and alternatives to 'if'.",
    tables: [
      {
        columns: ['Type', 'Example'],
        rows: [
          ['Mixed conditional (past → present)', '**If** I **had studied** medicine, I **would be** a doctor now.'],
          ['Alternative to if', '**Should you need** help, call me. (= if you need)'],
          ['Inversion', "**Were I** you, I'd apologize. (= if I were you)"],
        ],
      },
    ],
  },

  "B2::Mixed conditionals: If I were you, I wouldn't have done it": {
    heading: 'Mixed Conditionals',
    intro: 'Mixed conditionals combine different time frames in the if-clause and the result clause.',
    tables: [
      {
        columns: ['Time mix', 'Example'],
        rows: [
          ['Present result of a past condition', '**If** I **had left** earlier, I **would be** home by now.'],
          ['Past result of a present/general condition', "**If** I **were** more careful, I **wouldn't have broken** it."],
        ],
      },
    ],
  },

  'B2::Modal verbs: Permission, obligation, prohibition, necessity': {
    heading: 'Modal Verbs: Permission, Obligation, Prohibition, Necessity',
    intro: 'Modal verbs express different levels of permission, obligation, and necessity.',
    tables: [
      {
        columns: ['Modal', 'Use', 'Example'],
        rows: [
          ['can / may', 'permission', '**May** I leave early?'],
          ['must / have to', 'obligation', 'You **must** wear a helmet.'],
          ["mustn't", 'prohibition', "You **mustn't** enter."],
          ["needn't / don't have to", 'lack of necessity', "You **needn't** stay."],
        ],
      },
    ],
  },

  'B2::Verbs of the senses': {
    heading: 'Verbs of the Senses',
    intro: "Verbs like see and hear can take an object plus the base verb (a whole action) or the -ing form (an action in progress).",
    tables: [
      {
        columns: ['Pattern', 'Meaning', 'Example'],
        rows: [
          ['see/hear + object + base verb', 'the whole action was witnessed', 'I **saw him fall**.'],
          ['see/hear + object + -ing', 'part of an action in progress', 'I **saw him falling** (as it happened).'],
        ],
      },
    ],
  },

  'B2::Gerunds and infinitives: Complex forms': {
    heading: 'Complex Gerund and Infinitive Forms',
    intro: 'Gerunds and infinitives also have perfect and passive forms for more advanced meanings.',
    tables: [
      {
        columns: ['Form', 'Structure', 'Example'],
        rows: [
          ['Perfect gerund', 'having + past participle', '**Having finished** the report, she left.'],
          ['Perfect infinitive', 'to have + past participle', 'He seems **to have left** already.'],
          ['Passive gerund', 'being + past participle', "I don't like **being told** what to do."],
        ],
      },
    ],
  },

  'B2::Future forms: Expressing future time': {
    heading: 'Future Forms',
    intro: 'English has several future forms, chosen depending on plans, predictions, arrangements, or schedules.',
    tables: [
      {
        columns: ['Form', 'Use', 'Example'],
        rows: [
          ['will', 'prediction, decision', 'It **will rain**.'],
          ['be going to', 'plan, evidence', "It**'s going to** rain."],
          ['present continuous', 'fixed arrangement', "I**'m meeting** her tomorrow."],
          ['present simple', 'timetable', 'The train **leaves** at 6.'],
        ],
      },
    ],
  },

  'B2::Other ways to express future: Be about to, be due to, etc.': {
    heading: 'Other Ways to Express the Future',
    intro: 'These expressions describe the future with different degrees of imminence or schedule.',
    tables: [
      {
        columns: ['Expression', 'Meaning', 'Example'],
        rows: [
          ['be about to', 'very near future', 'The film **is about to** start.'],
          ['be due to', 'scheduled', 'The plane **is due to** land at 10.'],
          ['be on the point of + -ing', 'immediate future', 'She **was on the point of** leaving.'],
        ],
      },
    ],
  },

  'B2::Future in the past': {
    heading: 'Future in the Past',
    intro: 'We use these forms to talk about something that was future from a point in the past.',
    tables: [
      {
        columns: ['Form', 'Use', 'Example'],
        rows: [
          ['was/were going to', 'a plan that did not happen', 'I **was going to** call you, but I forgot.'],
          ['would', 'a future action seen from the past', 'He said he **would** call later.'],
        ],
      },
    ],
  },

  'B2::Ellipsis and substitution: Omitting or replacing words': {
    heading: 'Ellipsis and Substitution',
    intro: 'Ellipsis omits words that are understood from context; substitution replaces them with a shorter word.',
    tables: [
      {
        columns: ['Technique', 'Example'],
        rows: [
          ['Ellipsis (omitting)', "She can swim, but I can't."],
          ['Substitution (replacing)', 'I need a pen. Do you have **one**?'],
        ],
      },
    ],
  },

  'B2::Compound nouns and possessive forms': {
    heading: 'Compound Nouns and Possessive Forms',
    intro: 'English combines nouns and possessive structures in several ways.',
    tables: [
      {
        columns: ['Type', 'Example'],
        rows: [
          ['Compound noun (noun + noun)', 'a **bus stop**, a **coffee cup**'],
          ["Possessive 's (people)", "**Tom's** car"],
          ['Of-possessive (things)', 'the roof **of the house**'],
        ],
      },
    ],
  },

  'B2::Cleft sentences: Adding emphasis': {
    heading: 'Cleft Sentences',
    intro: 'Cleft sentences split a sentence into two parts to emphasize a particular piece of information.',
    tables: [
      {
        columns: ['Pattern', 'Example'],
        rows: [
          ['It + be + emphasized part + that...', '**It was John who** broke the vase.'],
          ['What + clause + be...', '**What I need** is a holiday.'],
        ],
      },
    ],
  },

  'B2::Relative clauses: Defining and non-defining': {
    heading: 'Relative Clauses',
    intro: 'Defining clauses give essential information; non-defining clauses (with commas) add extra information.',
    tables: [
      {
        columns: ['Type', 'Example'],
        rows: [
          ['Defining', 'The book **that I bought** is great.'],
          ['Non-defining', 'This book, **which I bought yesterday**, is great.'],
          ['With preposition (formal / informal)', "The company **for which** she works is huge. / The company she works **for** is huge."],
        ],
      },
    ],
  },

  'B2::Participle clauses': {
    heading: 'Participle Clauses',
    intro: 'Participle clauses shorten a sentence by replacing a clause with a participle form.',
    tables: [
      {
        columns: ['Type', 'Example'],
        rows: [
          ['-ing (active)', '**Feeling tired**, she went to bed.'],
          ['-ed (passive)', '**Written in 1990**, the book is still popular.'],
          ['having + past participle', '**Having finished** dinner, we watched TV.'],
        ],
      },
    ],
  },

  'B2::Passive verbs with two objects': {
    heading: 'Passive with Two Objects',
    intro: "Verbs with two objects (give, send, offer) can form the passive in two ways.",
    tables: [
      {
        columns: ['Active', 'Passive'],
        rows: [
          ['They gave **her** a prize.', '**She was given** a prize. / A prize **was given to her**.'],
        ],
      },
    ],
  },

  "B2::Possessive 's with time expressions: Two hours' walk": {
    heading: "Possessive 's with Time Expressions",
    intro: "We can use 's (or just an apostrophe for plurals) with time expressions to describe a duration.",
    tables: [
      {
        columns: ['Pattern', 'Example'],
        rows: [
          ["plural time noun + '", "a **two hours'** walk, **ten minutes'** break"],
          ["singular time noun + 's", "a **day's** work"],
        ],
      },
    ],
  },

  'B2::Compound adjectives in English': {
    heading: 'Compound Adjectives',
    intro: 'Compound adjectives combine two or more words, usually hyphenated, into a single describing word.',
    tables: [
      {
        columns: ['Pattern', 'Example'],
        rows: [
          ['adjective + noun-ed', 'a **kind-hearted** person'],
          ['noun + past participle', 'a **sun-dried** tomato'],
          ['adverb + past participle', 'a **well-known** author'],
        ],
      },
    ],
  },

  'B2::50 common Noun + Preposition collocations': {
    heading: 'Noun + Preposition Collocations',
    intro: 'Many nouns are always followed by the same preposition — these need to be learned as fixed pairs.',
    tables: [
      {
        columns: ['Noun + preposition', 'Example'],
        rows: [
          ['reason for', 'the **reason for** his absence'],
          ['solution to', 'a **solution to** the problem'],
          ['increase in', 'an **increase in** prices'],
          ['interest in', 'an **interest in** art'],
          ['relationship with', 'a good **relationship with** her boss'],
        ],
      },
    ],
  },

  'B2::Comparative structures: Modifying comparatives': {
    heading: 'Modifying Comparatives',
    intro: 'We can make a comparative stronger or weaker by adding a modifying word before it.',
    tables: [
      {
        columns: ['Modifier', 'Strength', 'Example'],
        rows: [
          ['much / a lot / far', 'large difference', 'This is **much bigger** than that.'],
          ['a bit / slightly', 'small difference', "She's **a bit taller** than me."],
          ['by far', 'the biggest difference (with superlatives)', 'This is **by far** the best option.'],
        ],
      },
    ],
  },

  "B2::Reduced infinitives: Omitting the infinitive phrase after 'to'": {
    heading: 'Reduced Infinitives',
    intro: "To avoid repeating a whole infinitive phrase, we can leave just 'to' standing for it.",
    tables: [
      {
        columns: ['Full form', 'Reduced form'],
        rows: [
          ["I don't want to go, but I have **to go**.", "I don't want to go, but I have **to**."],
          ['She asked me to help, so I decided **to help her**.', 'She asked me to help, so I decided **to**.'],
        ],
      },
    ],
  },

  'C1::Advanced present simple and present continuous': {
    heading: 'Advanced Present Simple and Present Continuous',
    intro: 'At advanced level, these tenses take on some special uses beyond routines and current actions.',
    tables: [
      {
        columns: ['Use', 'Example'],
        rows: [
          ['Present simple for scheduled future events', 'The conference **starts** at 9am sharp.'],
          ["Present continuous for an irritating habit (+ always)", "He**'s always** interrupting me."],
          ['Present simple in live commentary / narration', 'He **passes** the ball to Smith, who **shoots**...'],
        ],
      },
    ],
  },

  'C1::Advanced past simple, past continuous & past perfect': {
    heading: 'Advanced Uses of Past Tenses',
    intro: 'Past tenses are also used for politeness and for describing unreal or hypothetical situations.',
    tables: [
      {
        columns: ['Tense', 'Advanced use', 'Example'],
        rows: [
          ['Past simple', 'a polite, tentative tone', 'I **wondered** if you could help.'],
          ['Past continuous', 'a polite, indirect request', 'I **was hoping** you could help me.'],
          ['Past perfect', "the 'unreal past' in wishes/conditionals", 'If only I **had known**.'],
        ],
      },
    ],
  },

  'C1::Advanced modal verbs: will, would and should': {
    heading: 'Advanced Modal Verbs: Will, Would, Should',
    intro: 'Beyond their basic meanings, these modals can express characteristic behaviour, politeness, and formal conditions.',
    tables: [
      {
        columns: ['Modal', 'Advanced use', 'Example'],
        rows: [
          ['will', 'characteristic behaviour / insistence', 'He **will** keep interrupting people.'],
          ['would', 'typical past behaviour / hypothetical politeness', 'She **would** always help others. **Would** you mind?'],
          ['should', "expectation / formal condition (= if)", 'The parcel **should** arrive tomorrow. **Should** you need anything...'],
        ],
      },
    ],
  },

  'C1::Advanced modal verbs: can / be able to, may / might': {
    heading: 'Advanced Modal Verbs: Can, May, Might',
    intro: 'These modals can express general truths, criticism, strong possibility, and suggestion.',
    tables: [
      {
        columns: ['Modal', 'Advanced use', 'Example'],
        rows: [
          ['can', 'general truths / criticism of behaviour', 'Smoking **can** cause serious illness. You **can** be so rude sometimes!'],
          ['may well', 'fairly strong possibility', 'She **may well** be right.'],
          ['might as well', 'suggestion when there is no better option', 'We **might as well** leave now.'],
        ],
      },
    ],
  },

  'C1::The subjunctive in English: Present and past': {
    heading: 'The Subjunctive',
    intro: 'The subjunctive uses the base form of the verb (present subjunctive) or "were" (past subjunctive) in specific formal or hypothetical contexts.',
    tables: [
      {
        columns: ['Type', 'Use', 'Example'],
        rows: [
          ['Present subjunctive', 'after verbs like suggest, insist, demand', 'I suggest that he **be** informed.'],
          ['Past subjunctive', "in unreal conditions/wishes with 'be'", "If I **were** rich, I'd travel more."],
        ],
      },
    ],
  },

  'C1::The perfect tenses: Forms and uses': {
    heading: 'The Perfect Tenses',
    intro: 'The three perfect tenses all connect one point in time to an earlier action.',
    tables: [
      {
        columns: ['Tense', 'Form', 'Example'],
        rows: [
          ['Present perfect', 'have/has + past participle', 'I **have visited** ten countries.'],
          ['Past perfect', 'had + past participle', 'I **had visited** Rome before I moved there.'],
          ['Future perfect', 'will have + past participle', 'By 2030, I **will have retired**.'],
        ],
      },
    ],
  },

  'C1::Advanced participle clauses': {
    heading: 'Advanced Participle Clauses',
    intro: 'Participle clauses can replace whole clauses of reason, time, or sequence in more formal writing.',
    tables: [
      {
        columns: ['Type', 'Example'],
        rows: [
          ['Reason (active)', '**Not knowing** what to say, she stayed silent.'],
          ['Reason (passive)', '**Being asked** to leave, he felt embarrassed.'],
          ['Time / sequence', '**Having finished** the report, she submitted it.'],
        ],
      },
    ],
  },

  'C1::Advanced word order': {
    heading: 'Advanced Word Order',
    intro: 'Fronting and inversion move words to the front of a sentence for emphasis, common in formal or literary English.',
    tables: [
      {
        columns: ['Structure', 'Example'],
        rows: [
          ['Fronting for emphasis', '**Never before** had I seen such beauty.'],
          ['Inversion after a negative adverbial', '**Rarely does** he complain.'],
          ['Fronted time adverbial', '**Only then did** I understand.'],
        ],
      },
    ],
  },

  'C2::Nuanced Modality': {
    heading: 'Nuanced Modality',
    intro: 'Advanced modal expressions convey subtle shades of certainty, unrealized possibility, and past preference.',
    tables: [
      {
        columns: ['Expression', 'Nuance', 'Example'],
        rows: [
          ['could have + past participle', 'an unrealized past possibility', 'She **could have** won, but she gave up.'],
          ['was/were to + infinitive', 'a formal destiny or arrangement', "He **was to** become one of the era's great writers."],
          ['would rather/sooner have + past participle', 'a past preference that was not fulfilled', "I**'d rather have** stayed home."],
        ],
      },
    ],
  },

  'C2::Advanced Inversion and Fronting': {
    heading: 'Advanced Inversion and Fronting',
    intro: 'Literary and formal English often moves emphasized elements to the front of the sentence, triggering inversion.',
    tables: [
      {
        columns: ['Device', 'Example'],
        rows: [
          ['Negative inversion', '**Under no circumstances should** you sign this.'],
          ['Fronting for focus', '**Gone are** the days of cheap travel.'],
          ['Conditional inversion', '**Had I known**, I would have acted differently.'],
        ],
      },
    ],
  },

  'C2::Ellipsis and Substitution': {
    heading: 'Ellipsis and Substitution',
    intro: 'Advanced writing avoids repetition by omitting understood words (ellipsis) or replacing them with a short substitute.',
    tables: [
      {
        columns: ['Technique', 'Example'],
        rows: [
          ['Ellipsis of a repeated verb', "She wanted to go, but he didn't (want to)."],
          ["Substitution with 'so' / 'not'", 'Will it rain? I hope **so** / I hope **not**.'],
          ['Ellipsis in comparisons', 'He earns more than she (earns).'],
        ],
      },
    ],
  },

  'C2::Discourse Markers and Cohesion': {
    heading: 'Discourse Markers and Cohesion',
    intro: 'Advanced discourse markers create precise logical links between ideas in formal writing and speech.',
    tables: [
      {
        columns: ['Marker', 'Function', 'Example'],
        rows: [
          ['notwithstanding', 'formal contrast', 'The results, **notwithstanding** their flaws, were significant.'],
          ['that said', 'concession', "It's expensive. **That said**, it's worth it."],
          ['by the same token', 'parallel reasoning', '**By the same token**, we should reconsider the policy.'],
        ],
      },
    ],
  },

  'C2::Advanced Conditionals and Hypotheticals': {
    heading: 'Advanced Conditionals and Hypotheticals',
    intro: 'At this level, conditionals can be inverted, implied without "if", or introduced with "suppose".',
    tables: [
      {
        columns: ['Structure', 'Example'],
        rows: [
          ['Inverted mixed conditional', '**Had she studied** law, she **would be** a judge now.'],
          ['Implied conditional (no if)', 'With more funding, the project **would succeed**.'],
          ["Hypothetical with 'suppose'", '**Suppose** you **had told** her — what then?'],
        ],
      },
    ],
  },

  'C2::Nominalization': {
    heading: 'Nominalization',
    intro: 'Nominalization turns verbs or adjectives into nouns, a technique common in academic and formal writing to sound more objective.',
    tables: [
      {
        columns: ['Verb / adjective', 'Nominalized form', 'Example'],
        rows: [
          ['decide', 'decision', 'They reached a **decision**. (rather than: They decided)'],
          ['apply', 'application', 'The **application** of this rule is complex.'],
          ['responsible', 'responsibility', 'She took **responsibility** for the error.'],
        ],
      },
    ],
  },

  'C2::Idiomatic and Figurative Language': {
    heading: 'Idiomatic and Figurative Language',
    intro: 'Idioms carry a meaning that is different from the literal meaning of their words.',
    tables: [
      {
        columns: ['Expression', 'Meaning', 'Example'],
        rows: [
          ['a blessing in disguise', 'something good that seemed bad at first', 'Losing that job was **a blessing in disguise**.'],
          ['bite the bullet', 'to face something difficult', 'We just have to **bite the bullet** and start.'],
          ['once in a blue moon', 'very rarely', 'He visits **once in a blue moon**.'],
        ],
      },
    ],
  },

  'C2::Register and Formality Shifts': {
    heading: 'Register and Formality Shifts',
    intro: 'Skilled writers and speakers adjust vocabulary and structure to match a formal or informal context.',
    tables: [
      {
        columns: ['Informal', 'Formal'],
        rows: [
          ['find out', 'ascertain'],
          ['a lot of', 'numerous / a great deal of'],
          ['get', 'obtain / receive'],
          ["can't stand", 'cannot tolerate'],
        ],
      },
    ],
  },
};
