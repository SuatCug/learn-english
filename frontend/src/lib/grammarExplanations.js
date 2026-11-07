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
import { B1_EXPLANATIONS } from './grammarExplanationsB1';
import { B2_EXPLANATIONS } from './grammarExplanationsB2';

export const GRAMMAR_EXPLANATIONS = {
  "A1::Subject pronouns: I, you, he, she, it, we, they": {
    heading: 'Subject Pronouns: I, you, he, she, it, we, they',
    intro: [
      'A subject pronoun replaces a noun that is the **subject** of the sentence — the person or thing that does the action. It usually comes **before the verb**.',
      'We use pronouns so we don\'t repeat names: **Emma** is a teacher. **She** works in a school.',
    ],
    tables: [
      {
        heading: 'Singular',
        columns: ['Pronoun', 'Used for', 'Example'],
        rows: [
          ['**I**', 'the speaker (me)', '**I** am a student.'],
          ['**you**', 'the person I am talking to', '**You** are my friend.'],
          ['**he**', 'one man or boy', 'Tom is 12. **He** likes football.'],
          ['**she**', 'one woman or girl', 'Anna is a doctor. **She** works in a hospital.'],
          ['**it**', 'one thing, animal or place', 'I have a cat. **It** is black.'],
        ],
      },
      {
        heading: 'Plural',
        columns: ['Pronoun', 'Used for', 'Example'],
        rows: [
          ['**we**', 'the speaker + other people', 'Ali and I are friends. **We** play tennis.'],
          ['**you**', 'two or more people I am talking to', 'Ben and you are late. **You** are always late!'],
          ['**they**', 'other people, things or animals', 'My parents are at home. **They** are tired.'],
        ],
      },
    ],
    notes: [
      '**I** is always written with a capital letter, even in the middle of a sentence: My sister and **I** are tall.',
      '**You** is the same in the singular and the plural.',
      '**It** is for things, animals and places: The car is new. **It** is fast. (For a pet we know well, we can also use he or she.)',
      '**They** is for people **and** things in the plural: The shoes are new. **They** are nice.',
      'A sentence in English always needs a subject: **It** is cold. (not: Is cold.)',
    ],
    keyPoint: {
      title: 'Key Point: How to choose the pronoun',
      lines: [
        'One man → **he**  |  One woman → **she**  |  One thing / animal → **it**',
        'Me + other people → **we**  |  Other people / things → **they**',
        'Subject pronouns come **before the verb**: **She** is happy. (not: Her is happy.)',
      ],
    },
  },

  "A1::'To be': Positive, negative and questions": {
    heading: "'To be': Positive, Negative and Questions",
    intro: [
      "The verb 'to be' has three forms in the present: **am**, **is**, **are**. We use the same verb to make positive sentences, negative sentences and questions — we don't need 'do' or 'does'.",
      "**Negative:** add **not** after am / is / are. **Question:** put am / is / are **before** the subject.",
    ],
    tables: [
      {
        heading: 'Positive',
        columns: ['Full form', 'Short form', 'Example'],
        rows: [
          ['I **am**', "I**'m**", "I**'m** a student."],
          ['He / She / It **is**', "He**'s** / She**'s** / It**'s**", "She**'s** from Spain."],
          ['We / You / They **are**', "We**'re** / You**'re** / They**'re**", "They**'re** at home."],
        ],
      },
      {
        heading: 'Negative',
        columns: ['Full form', 'Short form', 'Example'],
        rows: [
          ['I **am not**', "I**'m not**", "I**'m not** tired."],
          ['He / She / It **is not**', "He **isn't** / He**'s not**", "It **isn't** cold today."],
          ['We / You / They **are not**', "We **aren't** / We**'re not**", "They **aren't** here."],
        ],
      },
      {
        heading: 'Questions',
        columns: ['Question', 'Example'],
        rows: [
          ['**Am** I ...?', '**Am** I late?'],
          ['**Is** he / she / it ...?', '**Is** she your sister?'],
          ['**Are** we / you / they ...?', '**Are** you hungry?'],
          ['Question word + **am / is / are** ...?', 'Where **is** the station? How old **are** you?'],
        ],
      },
      {
        heading: 'Short Answers',
        columns: ['Question', 'Yes', 'No'],
        rows: [
          ['Are you a student?', 'Yes, I **am**.', "No, I**'m not**."],
          ['Is he Turkish?', 'Yes, he **is**.', "No, he **isn't**."],
          ['Are they friends?', 'Yes, they **are**.', "No, they **aren't**."],
        ],
      },
    ],
    notes: [
      "There is **no** short form 'amn't'. Use **I'm not**: I'm not ready. (not: I amn't ready.)",
      "Don't use short forms in **positive short answers**: Yes, I **am**. (not: Yes, I'm.) / Yes, she **is**. (not: Yes, she's.)",
      "Don't use 'do' with 'to be': **Are** you happy? (not: Do you are happy?) / She **isn't** here. (not: She doesn't is here.)",
      "Singular noun → **is**: My car **is** red. Plural noun → **are**: My shoes **are** new.",
    ],
    keyPoint: {
      title: 'Key Point: Word order',
      lines: [
        'Positive: Subject + **am/is/are** — She **is** happy.',
        'Negative: Subject + **am/is/are + not** — She **is not (isn\'t)** happy.',
        'Question: **Am/Is/Are** + subject? — **Is** she happy? — Yes, she is. / No, she isn\'t.',
      ],
    },
  },

  "A1::Articles: a / an": {
    heading: 'Articles: a / an',
    intro: [
      'We use **a** or **an** before a **singular countable noun** when we talk about one thing or person for the first time, or when it is not a specific one: I have **a** brother. She eats **an** apple.',
      'The choice between a and an depends on the **sound** at the start of the next word, not the letter.',
    ],
    tables: [
      {
        heading: 'a + consonant sound',
        columns: ['Rule', 'Example'],
        rows: [
          ['b, c, d, f, g... sounds', '**a** book, **a** cat, **a** dog'],
          ['h that we pronounce', '**a** house, **a** horse'],
          ['u / eu with a "you" /ju:/ sound', '**a** university, **a** uniform, **a** European city'],
        ],
      },
      {
        heading: 'an + vowel sound',
        columns: ['Rule', 'Example'],
        rows: [
          ['a, e, i, o, u sounds', '**an** apple, **an** egg, **an** island, **an** orange, **an** umbrella'],
          ['silent h', '**an** hour, **an** honest man'],
          ['adjective starting with a vowel sound', '**an** old car, **an** interesting book'],
        ],
      },
      {
        heading: 'When we use a / an',
        columns: ['Use', 'Example'],
        rows: [
          ['one thing or person (singular)', 'I need **a** pen.'],
          ['jobs', 'She is **a** teacher. He is **an** engineer.'],
          ['saying what something is', "It's **an** animal. That's **a** bus."],
          ['with There is', 'There is **a** park near my house.'],
        ],
      },
    ],
    notes: [
      "Don't use a / an with **plural** nouns: I have two **cats**. (not: two a cats)",
      "Don't use a / an with **uncountable** nouns: I drink **water**. (not: a water)",
      'If there is an **adjective** before the noun, look at the adjective: **a** big apple / **an** old book.',
      "Don't forget a / an with jobs: She is **a** nurse. (not: She is nurse.)",
    ],
    keyPoint: {
      title: 'Key Point: Listen to the first sound',
      lines: [
        'Consonant sound → **a**: a dog, a house, a university',
        'Vowel sound → **an**: an egg, an hour, an old man',
      ],
    },
  },

  "A1::Present simple: Negatives and questions": {
    heading: 'Present Simple: Negatives and Questions',
    intro: [
      "In the present simple we use the helping verb **do / does** to make negatives and questions. After do / does / don't / doesn't, the main verb is always in the **base form** (no -s).",
    ],
    tables: [
      {
        heading: 'Negative',
        columns: ['Subject', 'do / does + not', 'Example'],
        rows: [
          ['I / You / We / They', "**don't** (do not)", "I **don't like** coffee."],
          ['He / She / It', "**doesn't** (does not)", "She **doesn't eat** meat."],
        ],
      },
      {
        heading: 'Questions',
        columns: ['do / does', 'Subject + verb', 'Example'],
        rows: [
          ['**Do**', 'I / you / we / they + verb', '**Do** you **speak** English?'],
          ['**Does**', 'he / she / it + verb', '**Does** he **work** in a bank?'],
          ['Question word + **do / does**', 'subject + verb', 'Where **do** you **live**? What time **does** it **start**?'],
        ],
      },
      {
        heading: 'Short Answers',
        columns: ['Question', 'Yes', 'No'],
        rows: [
          ['Do you like tea?', 'Yes, I **do**.', "No, I **don't**."],
          ['Does she drive?', 'Yes, she **does**.', "No, she **doesn't**."],
          ['Do they live here?', 'Yes, they **do**.', "No, they **don't**."],
        ],
      },
    ],
    notes: [
      "The **-s** goes on does / doesn't, not on the main verb: She **doesn't work**. (not: She doesn't works.) / **Does** he **play**? (not: Does he plays?)",
      "In short answers we repeat **do / does**, not the main verb: Yes, I **do**. (not: Yes, I like.)",
      "Don't use do / does with the verb 'to be': **Are** you happy? (not: Do you are happy?)",
    ],
    keyPoint: {
      title: 'Key Point: Word order',
      lines: [
        "Negative: Subject + **don't / doesn't** + verb — He **doesn't play** tennis.",
        'Question: **Do / Does** + subject + verb? — **Does** he **play** tennis?',
        "Short answer: Yes, he **does**. / No, he **doesn't**.",
      ],
    },
  },

  "A1::Would like / Would you like?": {
    heading: 'Would like / Would you like?',
    intro: [
      "**Would like** is a polite way to say **want**. We use it to ask for things, to offer things and to talk about wishes.",
      "**I'd like** a coffee, please. (= I want a coffee.)  **Would you like** some cake? (= Do you want some cake?)",
    ],
    tables: [
      {
        heading: 'Positive and Negative',
        columns: ['Form', 'Example'],
        rows: [
          ['Subject + **would like** + noun', "I **would like** (I**'d like**) a sandwich."],
          ['Subject + **would like to** + verb', "She **would like to** visit Paris."],
          ["Subject + **wouldn't like** (to)", "He **wouldn't like** to live there."],
        ],
      },
      {
        heading: 'Questions and Answers',
        columns: ['Question', 'Answer'],
        rows: [
          ['**Would you like** a drink?', 'Yes, **please**. / No, **thank you**.'],
          ['**Would you like to** come with us?', "Yes, I **would**. / No, I **wouldn't**. / I'd love to!"],
          ['What **would you like** to eat?', "I**'d like** a pizza, please."],
        ],
      },
      {
        heading: 'like vs would like',
        columns: ['', 'Meaning', 'Example'],
        rows: [
          ['**like**', 'enjoy, in general', 'I **like** coffee. (I always enjoy it.)'],
          ['**would like**', 'want, now or in the future', "I**'d like** a coffee. (I want one now.)"],
          ['**Do you like...?**', 'asking about general taste', '**Do you like** cats? — Yes, I do.'],
          ['**Would you like...?**', 'offering something', '**Would you like** a cat? — Yes, please!'],
        ],
      },
    ],
    notes: [
      "The short form of I would is **I'd**: I'd like, you'd like, he'd like, we'd like, they'd like.",
      "After would like, use **to + verb**: I'd like **to go**. (not: I'd like go.)",
      'Would like does not change: He **would like**. (not: He would likes.)',
      "Don't use the short form in a positive short answer: Yes, I **would**. (not: Yes, I'd.)",
      "**I want** can sound rude in shops and restaurants. **I'd like** is more polite.",
    ],
    keyPoint: {
      title: 'Key Point',
      lines: [
        "Asking politely: **I'd like** + noun / **to** + verb.",
        'Offering: **Would you like** + noun / **to** + verb?',
        'Answering: **Yes, please.** / **No, thank you.**',
      ],
    },
  },

  "A2::Past continuous": {
    heading: 'Past Continuous',
    intro: [
      'We use the past continuous for an action that was **in progress** at a specific time in the past: At 8 pm yesterday, I **was having** dinner.',
      'It is also used for a longer action that was interrupted by a shorter one (past simple): I **was cooking** when the phone **rang**.',
    ],
    tables: [
      {
        heading: 'Positive',
        columns: ['Subject', 'was / were + verb-ing', 'Example'],
        rows: [
          ['I / He / She / It', '**was** + verb-ing', 'She **was reading** at 10 pm.'],
          ['We / You / They', '**were** + verb-ing', 'They **were watching** TV.'],
        ],
      },
      {
        heading: 'Negative',
        columns: ['Subject', "wasn't / weren't + verb-ing", 'Example'],
        rows: [
          ['I / He / She / It', "**wasn't** (was not)", "He **wasn't listening**."],
          ['We / You / They', "**weren't** (were not)", "We **weren't sleeping**."],
        ],
      },
      {
        heading: 'Questions',
        columns: ['Question', 'Example'],
        rows: [
          ['**Was** I / he / she / it + verb-ing?', '**Was** it **raining**?'],
          ['**Were** we / you / they + verb-ing?', '**Were** you **working** at 9?'],
          ['Question word + was / were ...?', 'What **were** you **doing** at midnight?'],
        ],
      },
      {
        heading: 'Short Answers',
        columns: ['Question', 'Yes', 'No'],
        rows: [
          ['Was she cooking?', 'Yes, she **was**.', "No, she **wasn't**."],
          ['Were they playing?', 'Yes, they **were**.', "No, they **weren't**."],
        ],
      },
    ],
    notes: [
      'Common time expressions: **at 8 o\'clock yesterday**, **at that time**, **all morning**, **when** + past simple, **while** + past continuous.',
      'Spelling of -ing: make → **making**, run → **running**, study → **studying**.',
    ],
    keyPoint: {
      title: 'Key Point',
      lines: [
        'was / were + verb-ing = an action **in progress** in the past.',
        'Long action (past continuous) + short action (past simple): I **was walking** home when I **saw** Tom.',
      ],
    },
  },

  "A2::Already, yet, just": {
    heading: 'Already, Yet, Just',
    intro: 'We often use **already**, **yet** and **just** with the **present perfect** (have / has + past participle) to talk about time.',
    tables: [
      {
        columns: ['Word', 'Meaning', 'Sentence type', 'Position', 'Example'],
        rows: [
          ['**just**', 'a very short time ago', 'positive', 'between have/has and the verb', "I've **just** finished."],
          ['**already**', 'earlier than expected / before now', 'positive', 'between have/has and the verb', "She's **already** left."],
          ['**yet**', 'until now (we expect it to happen)', 'negative & questions', 'at the end of the sentence', "I haven't eaten **yet**. / Have you finished **yet**?"],
        ],
      },
    ],
    notes: [
      "Don't use **yet** in positive sentences: I've **already** done it. (not: I've done it yet.)",
      "**Already** in a question shows surprise: Have you **already** finished? That was quick!",
      "Short forms are common: I've, you've, he's, she's, we've, they've.",
    ],
    keyPoint: {
      title: 'Key Point: Word order',
      lines: [
        'have / has + **just / already** + past participle: We have **just** arrived.',
        "haven't / hasn't + past participle + ... + **yet**: He hasn't called **yet**.",
      ],
    },
  },

  "A2::Let's / Shall we?": {
    heading: "Let's / Shall we? / Shall I?",
    intro: "We use **Let's** and **Shall we...?** to make suggestions, and **Shall I...?** to offer help. After all of them we use the **base form** of the verb (no 'to').",
    tables: [
      {
        columns: ['Form', 'Use', 'Example'],
        rows: [
          ["**Let's** + verb", 'suggestion (you and me)', "**Let's go** to the beach."],
          ["**Let's not** + verb", 'negative suggestion', "**Let's not be** late."],
          ['**Shall we** + verb?', 'suggestion as a question', '**Shall we watch** a film?'],
          ['**Shall I** + verb?', 'offering to help', '**Shall I open** the window?'],
          ['What / Where **shall we** + verb?', 'asking for ideas', 'What **shall we do** tonight?'],
          ["Let's ..., **shall we?**", 'question tag after Let\'s', "Let's meet at 7, **shall we**?"],
        ],
      },
      {
        heading: 'Answering',
        columns: ['Suggestion', 'Yes', 'No'],
        rows: [
          ['Shall we go out?', "Yes, **let's**! / Good idea!", "No, **let's not**. / I'd rather not."],
          ['Shall I help you?', 'Yes, **please**.', "No, **thanks**. I'm OK."],
        ],
      },
    ],
    notes: [
      "**Let's** = Let **us**. We don't use the long form in everyday English.",
      "Negative is **Let's not**, not Don't let's (that is very informal) and never Let's don't.",
    ],
    keyPoint: {
      title: 'Key Point',
      lines: [
        "Let's / Shall we / Shall I + **base verb**: Let's **eat**. (not: Let's to eat / Let's eating)",
      ],
    },
  },

  "A2::Must / mustn't": {
    heading: "Must / Mustn't",
    intro: [
      'We use **must** to say that something is **necessary** or a **rule**: You **must** wear a seatbelt.',
      "We use **mustn't** to say that something is **not allowed** (prohibited): You **mustn't** smoke here.",
    ],
    tables: [
      {
        columns: ['Form', 'Meaning', 'Example'],
        rows: [
          ['**must** + verb', 'it is necessary / a rule', 'Students **must** wear a uniform.'],
          ['**must** + verb', 'I think it is important (personal)', 'I **must** call my mum tonight.'],
          ["**mustn't** + verb", "don't do it! / it is not allowed", "You **mustn't** touch that. It's hot!"],
        ],
      },
      {
        heading: 'Form',
        columns: ['Subject', 'Positive', 'Negative'],
        rows: [
          ['I / You / He / She / It / We / They', '**must** go', "**mustn't** (must not) go"],
        ],
      },
    ],
    notes: [
      'Must is the same for every subject: He **must** go. (not: He musts go.)',
      'After must / mustn\'t, use the **base form** without to: You must **wait**. (not: must to wait)',
      "Don't use do / does with must: You **mustn't** park here. (not: You don't must park here.)",
      "**Mustn't** ≠ **don't have to**: You **mustn't** go (= it is not allowed). You **don't have to** go (= it is not necessary).",
    ],
    keyPoint: {
      title: 'Key Point',
      lines: [
        'must = necessary / a rule  |  mustn\'t = prohibited',
        'must / mustn\'t + **base verb** (no -s, no to)',
      ],
    },
  },

  "A2::Be able to": {
    heading: 'Be Able To',
    intro: [
      '**Be able to** means the same as **can**: it talks about **ability** or **possibility**. I **can** swim = I **am able to** swim.',
      "We need **be able to** when we can't use can: after **will**, after **to**, and in the **present perfect**.",
    ],
    tables: [
      {
        columns: ['Tense', 'Form', 'Example'],
        rows: [
          ['Present', '**am / is / are able to**', 'She **is able to** speak three languages.'],
          ['Past', '**was / were able to**', 'We **were able to** find the hotel.'],
          ['Future', '**will be able to**', "I'll **be able to** help you tomorrow."],
          ['Present perfect', '**have / has been able to**', "I **haven't been able to** sleep this week."],
          ['After "to"', '**to be able to**', "I'd like **to be able to** play the guitar."],
        ],
      },
      {
        heading: 'Negatives and Questions',
        columns: ['Form', 'Example'],
        rows: [
          ["isn't / wasn't / weren't able to", "They **weren't able to** come."],
          ["won't be able to", "He **won't be able to** win."],
          ['Are you able to ...? / Will you be able to ...?', '**Will** you **be able to** come?'],
        ],
      },
    ],
    notes: [
      "There is no future or infinitive of can: **will be able to** (not: will can) / **to be able to** (not: to can).",
      'After able, always use **to + base verb**: able **to open** (not: able open).',
    ],
    keyPoint: {
      title: 'Key Point',
      lines: [
        'can → be able to: will **be able to** / want **to be able to** / have **been able to**',
      ],
    },
  },

  "A2::Adverbs of degree: very, quite, really...": {
    heading: 'Adverbs of Degree: very, quite, really, too, enough...',
    intro: 'Adverbs of degree tell us **how much** — they make an adjective or adverb stronger or weaker: It\'s **very** cold. / It\'s **a bit** cold.',
    tables: [
      {
        heading: 'Strong → weak',
        columns: ['Adverb', 'Meaning', 'Example'],
        rows: [
          ['**extremely**', 'very, very', "I'm **extremely** tired."],
          ['**really / very**', 'a lot', 'The film was **really** good. / It\'s **very** hot.'],
          ['**quite**', 'more than a little, but not very', 'The test was **quite** easy.'],
          ['**a bit / a little**', 'a small amount', 'The soup is **a bit** salty.'],
        ],
      },
      {
        heading: 'Too and enough',
        columns: ['Form', 'Meaning', 'Example'],
        rows: [
          ['**too** + adjective', 'more than we want (a problem)', "It's **too** expensive. I can't buy it."],
          ['**too** + adjective + **to** + verb', '', 'The coffee is **too hot to drink**.'],
          ['adjective + **enough**', 'as much as we need', 'The room is **big enough**.'],
          ["**not** + adjective + **enough** + **to** + verb", 'less than we need', "He isn't **old enough to drive**."],
        ],
      },
    ],
    notes: [
      'Most adverbs of degree go **before** the adjective: **very** nice, **really** big. But **enough** goes **after** it: big **enough**.',
      '**Very** ≠ **too**: It\'s **very** hot (but OK). It\'s **too** hot (a problem — I can\'t go out).',
      "With verbs, use **very much** / **a lot** at the end: I like it **very much**. (not: I very like it.)",
    ],
    keyPoint: {
      title: 'Key Point',
      lines: [
        'very / really / quite / a bit / too + **adjective**',
        'adjective + **enough**',
      ],
    },
  },

  "A2::Zero conditional": {
    heading: 'Zero Conditional',
    intro: 'We use the zero conditional for things that are **always true**: facts, science and general habits. The result **always** happens when the condition happens.',
    tables: [
      {
        columns: ['If clause', 'Main clause', 'Example'],
        rows: [
          ['If + **present simple**', '**present simple**', 'If you **heat** ice, it **melts**.'],
          ['If + **present simple**', '**present simple**', "If I **drink** coffee at night, I **don't sleep**."],
          ['**When** + present simple', '**present simple**', 'When it **rains**, the grass **gets** wet.'],
        ],
      },
      {
        heading: 'Questions',
        columns: ['Form', 'Example'],
        rows: [
          ['What happens if ...?', 'What **happens** if you **mix** oil and water?'],
          ['Do / Does ... if ...?', '**Do** plants **die** if they **don\'t get** water?'],
        ],
      },
    ],
    notes: [
      'The if-clause can come first or second. When it comes first, use a **comma**: If it rains, I take a bus. / I take a bus **if** it rains.',
      'In the zero conditional, **if** and **when** mean almost the same.',
      "Don't use **will** in the zero conditional: If you heat water, it **boils**. (not: it will boil — that is the first conditional for one specific situation.)",
    ],
    keyPoint: {
      title: 'Key Point',
      lines: [
        'If + present simple, present simple → a general truth.',
        'If you **freeze** water, it **becomes** ice.',
      ],
    },
  },

  "A2::Time connectors: first, then, after that...": {
    heading: 'Time Connectors: first, then, after that, finally...',
    intro: 'Time connectors show the **order** of events. We use them in stories, instructions and when we describe our day.',
    tables: [
      {
        heading: 'Order of events',
        columns: ['Connector', 'Use', 'Example'],
        rows: [
          ['**First / First of all**', 'the first step', '**First**, I wake up at 7.'],
          ['**Then / Next**', 'the next step', '**Then** I have a shower. **Next**, I get dressed.'],
          ['**After that**', 'the next step', '**After that**, I have breakfast.'],
          ['**Finally**', 'the last step', '**Finally**, I leave the house.'],
        ],
      },
      {
        heading: 'Before / after',
        columns: ['Form', 'Example'],
        rows: [
          ['**before** + clause', 'I brush my teeth **before** I go to bed.'],
          ['**after** + noun', '**After** dinner, we watched a film.'],
          ['**after** + verb-ing', '**After** eating, she washed the dishes.'],
          ['**before** + verb-ing', 'Read the question **before** answering.'],
        ],
      },
    ],
    notes: [
      'We usually put a **comma** after First, Next, After that and Finally at the start of a sentence: **First,** cut the bread.',
      "**Then** is often used with and: I had lunch **and then** I went home.",
      "**After** needs a noun or -ing (after **lunch**); **after that** stands alone (After that, we left). Don't say: After, we left.",
    ],
    keyPoint: {
      title: 'Key Point',
      lines: [
        'First → Then / Next → After that → Finally',
      ],
    },
  },

  "A1::The verb 'to be': am, is, are": {
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

  "A1::This, that, these, those": {
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

  "A1::Possessive adjectives: my, your, his, her...": {
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

  "A1::Singular and plural nouns": {
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

  "A1::Adjectives: old, interesting, expensive...": {
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

  "A1::Present simple: Form and use": {
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

  "A1::Question words: what, where, who, when...": {
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

  "A1::Adverbs of frequency: always, usually, never...": {
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

  "A1::Object pronouns: me, you, him, her...": {
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

  "A1::Possessive 's: Mike's car": {
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

  "A1::Prepositions of time: at, in, on": {
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

  "A1::Prepositions of place: at, in, on": {
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

  "A1::Can / can't": {
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

  "A1::Present continuous": {
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

  "A1::Present simple vs present continuous": {
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

  "A1::Imperatives: Sit down! Don't talk!": {
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

  "A2::Was / were: Past simple of 'be'": {
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

  "A2::Past simple: Regular and irregular verbs": {
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

  "A2::Past simple: Negatives and questions": {
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

  "A2::Verb patterns: want to do, enjoy doing": {
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

  "A1::Have got / has got": {
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

  "A2::Countable and uncountable nouns": {
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

  "A1::There is / there are": {
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

  "A2::There or it?": {
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

  "A1::Next to, behind, under, between...": {
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

  "A2::Much, many, a lot of": {
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

  "A2::Comparative adjectives: older than, more important than": {
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

  "A2::Superlative adjectives: the oldest, the most important": {
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

  "A2::Will: Predictions and decisions": {
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

  "A2::Be going to: Plans and predictions": {
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

  "A2::Adverbs of manner: slowly, carefully...": {
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

  "A2::A / an, the or no article": {
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

  "A1::And, but, or, because": {
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

  "A1::Basic word order": {
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

  "A2::This vs it: What's the difference?": {
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

  "A1::Basic question forms": {
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

  "A2::Past simple vs past continuous": {
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

  "B1::Expressing purpose: to, for, so that": {
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

  "A2::Although, however, so": {
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

  "A2::Present continuous for future arrangements": {
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

  "A2::Relative clauses: who, which, that, where": {
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

  "A2::Present perfect": {
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

  "B1::Present perfect vs past simple": {
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

  "A2::Something, anything, nothing, everything": {
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

  "B1::Comparative and superlative adverbs": {
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

  "A2::Too, too much, too many, enough": {
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

  "A2::A few, a little": {
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

  "B1::Verb patterns": {
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

  "A2::Have to / don't have to": {
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

  "A2::Should / shouldn't: Advice": {
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

  "A2::First conditional": {
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

  "A1::Whose? and possessive pronouns: mine, yours...": {
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

  "B1::Present simple passive": {
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

  "B1::Used to / didn't use to": {
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

  "A2::Might / might not: Possibility": {
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

  "A2::Prepositions of movement: along, across, over...": {
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

  "B1::So, neither, either: So do I, neither do I": {
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

  "B1::Past perfect": {
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

  "B2::Reported speech: Advanced": {
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

  "B1::Stative vs dynamic verbs": {
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

  "B1::Phrasal verbs: Separable and inseparable": {
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

  "B1::May, might, could: Possibility": {
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

  "B2::Present perfect vs past simple: Advanced": {
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

  "B1::Present perfect simple vs continuous": {
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

  "B2::Articles: Advanced uses": {
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

  "A2::Could: Ability and possibility": {
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

  "B1::Must, have to, should: Obligation and advice": {
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

  "A2::Reflexive pronouns: myself, yourself...": {
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

  "B1::Past simple, past continuous, past perfect": {
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

  "B1::Review of all verb tenses": {
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

  "B1::Used to, be used to, get used to": {
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

  "B2::Advanced passive structures": {
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

  "B1::Active vs passive": {
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

  "B1::Must / can't: Deduction": {
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

  "B1::Second conditional": {
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

  "B1::Third conditional: Introduction": {
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

  "B1::Reported speech: Statements": {
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

  "B1::Gerunds vs infinitives": {
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

  "B2::Determiners and quantifiers": {
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

  "A2::Each, every, all": {
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

  "B1::Both, either, neither": {
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

  "A2::Some, any, no": {
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

  "B1::Defining relative clauses": {
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

  "B1::Question tags": {
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

  "B1::Despite, in spite of, therefore, however": {
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

  "B2::Advanced prepositions": {
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

  "A2::Present perfect with for and since": {
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

  "B2::Complex phrasal verbs": {
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

  "B2::Adverbial clauses": {
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

  "B2::Narrative tenses": {
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

  "B2::Linking devices and discourse markers": {
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

  "B2::Speculation and deduction": {
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

  "B2::Inversion: Never have I...": {
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

  "B2::Passive reporting structures: It is said that...": {
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

  "B2::Advanced verb patterns": {
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

  "B1::Unless, as long as, provided that": {
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

  "B2::Advanced conditional structures": {
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

  "B2::Mixed conditionals": {
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

  "B2::Advanced modal expressions": {
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

  "B2::Perfect gerunds and infinitives": {
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

  "B2::Future in the past": {
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

  "B2::Ellipsis and substitution": {
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

  "B2::Cleft sentences": {
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

  "B2::Relative clauses: Advanced": {
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

  "B2::Participle clauses": {
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

  "B2::Advanced adjective and adverb structures": {
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

  // B1/B2 konularının bir kısmı ayrı dosyalarda (dosya boyutu için).
  ...B1_EXPLANATIONS,
  ...B2_EXPLANATIONS,
};
