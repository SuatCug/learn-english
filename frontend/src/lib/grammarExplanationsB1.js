// B1 grammar "Explanation" içerikleri — şema için bkz. grammarExplanations.js
export const B1_EXPLANATIONS = {
  'B1::Present perfect continuous': {
    heading: 'Present Perfect Continuous',
    intro: [
      'We use the present perfect continuous for an action that **started in the past and is still continuing**, or that has **just stopped** and has a result now.',
      "I**'ve been waiting** for an hour. (I'm still waiting.) / I'm tired because I**'ve been running**. (I just stopped.)",
    ],
    tables: [
      {
        heading: 'Form',
        columns: ['', 'Form', 'Example'],
        rows: [
          ['Positive', 'have / has + **been** + verb-ing', 'She **has been learning** English since 2020.'],
          ['Negative', "haven't / hasn't + **been** + verb-ing", "They **haven't been working** here for long."],
          ['Question', 'Have / Has + subject + **been** + verb-ing?', '**How long have** you **been waiting**?'],
        ],
      },
      {
        heading: 'for and since',
        columns: ['Word', 'Used with', 'Example'],
        rows: [
          ['**for**', 'a period of time', 'for two hours, for ten years, for a long time'],
          ['**since**', 'a starting point', "since 9 o'clock, since Monday, since 2015, since I was a child"],
        ],
      },
    ],
    notes: [
      'We often ask **How long...?** with this tense: How long have you been living here?',
      "Stative verbs (know, like, believe, be, have = own) are **not** used in the continuous: I've **known** him for years. (not: I've been knowing)",
      'Simple vs continuous: I**\'ve read** the book. (finished) / I**\'ve been reading** the book. (activity, maybe not finished)',
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['have / has + been + verb-ing → an activity from the past **until now** (+ for / since).'],
    },
  },

  'B1::Past perfect vs past simple': {
    heading: 'Past Perfect vs Past Simple',
    intro: 'When we talk about two actions in the past, we use the **past perfect** (had + past participle) for the action that happened **first**, and the **past simple** for the later one.',
    tables: [
      {
        columns: ['Tense', 'Form', 'Use', 'Example'],
        rows: [
          ['Past simple', 'verb-ed / irregular', 'finished action at a past time; actions in order', 'She **opened** the door and **went** in.'],
          ['Past perfect', '**had** + past participle', 'action **before** another past action', 'When I arrived, the film **had** already **started**.'],
        ],
      },
      {
        heading: 'Compare',
        columns: ['Sentence', 'Meaning'],
        rows: [
          ['When I arrived, the train **left**.', 'I arrived → then the train left (I saw it leave).'],
          ['When I arrived, the train **had left**.', 'The train left → then I arrived (I missed it).'],
        ],
      },
    ],
    notes: [
      'Common words with the past perfect: **already**, **just**, **never**, **by the time**, **before**, **after**.',
      "If the order is clear (with before / after), the past simple is also possible: After he **(had) finished**, he left.",
      "Negative: **hadn't** + past participle. Question: **Had** you ever ... before?",
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['Earlier action → **had + V3**. Later action → **past simple**.'],
    },
  },

  'B1::Future time clauses: when, until, as soon as': {
    heading: 'Future Time Clauses: when, until, as soon as...',
    intro: "After time words like **when, as soon as, until, before, after, once**, we use the **present simple** to talk about the future — **not will**. The main clause uses will, going to or an imperative.",
    tables: [
      {
        columns: ['Time word', 'Meaning', 'Example'],
        rows: [
          ['**when**', 'at the time that', "I'll call you **when** I **get** home."],
          ['**as soon as**', 'immediately when', "**As soon as** she **arrives**, we'll eat."],
          ['**until**', 'up to the time that', "We'll wait **until** the rain **stops**."],
          ['**before / after**', 'earlier / later than', "**After** I **finish** university, I'll travel."],
          ['**once**', 'after (something is completed)', "**Once** you **submit** the form, you'll get an email."],
        ],
      },
    ],
    notes: [
      "Wrong: I'll call you when I **will get** home. Right: I'll call you when I **get** home.",
      'The time clause can come first or second. If it comes first, use a comma: When I get home, I\'ll call you.',
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['Main clause: **will** + verb. Time clause: **when / until / as soon as** + **present simple**.'],
    },
  },

  'B1::Should have, could have, would have': {
    heading: 'Should have, Could have, Would have',
    intro: 'These modal forms talk about the **past** — things that did not happen. The form is always **modal + have + past participle**.',
    tables: [
      {
        columns: ['Form', 'Meaning', 'Example'],
        rows: [
          ['**should have** + V3', 'it was a good idea, but you didn\'t do it (regret / criticism)', 'I **should have studied** harder.'],
          ["**shouldn't have** + V3", 'it was a bad idea, but you did it', "You **shouldn't have eaten** so much."],
          ['**could have** + V3', 'it was possible, but it didn\'t happen', 'He **could have had** an accident.'],
          ['**would have** + V3', 'I wanted to / it would be the result, but it didn\'t happen', 'I **would have helped** you, but I was busy.'],
        ],
      },
    ],
    notes: [
      "In speech: should've, could've, would've. Don't write 'should of'.",
      'Would have is often used in the third conditional: If I had known, I **would have told** you.',
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['should / could / would + **have** + **past participle** → past situations that didn\'t happen.'],
    },
  },

  "B1::Needn't / don't need to": {
    heading: "Needn't / Don't need to",
    intro: "We use **needn't** and **don't need to** to say that something is **not necessary**. They mean the same in the present.",
    tables: [
      {
        columns: ['Form', 'Example'],
        rows: [
          ["**needn't** + base verb", "You **needn't bring** any food."],
          ["**don't / doesn't need to** + verb", "She **doesn't need to work** on Saturdays."],
          ["**didn't need to** + verb (past)", "We **didn't need to wait**. The bus came immediately."],
          ['**Do** I **need to** ...? (question)', '**Do** I **need to** bring my passport?'],
        ],
      },
      {
        heading: "needn't vs mustn't",
        columns: ['', 'Meaning', 'Example'],
        rows: [
          ["**needn't**", 'not necessary (you can if you want)', "You **needn't** come."],
          ["**mustn't**", 'not allowed (don\'t do it!)', "You **mustn't** park here."],
        ],
      },
    ],
    notes: [
      "After **needn't**, no 'to': You needn't **worry**. After **don't need**, use 'to': You don't need **to** worry.",
      "Needn't is a little more formal / British. Don't need to is very common in all English.",
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ["needn't + verb = don't need **to** + verb = not necessary.  |  mustn't = prohibited."],
    },
  },

  'B1::Modal verbs in the past': {
    heading: 'Modal Verbs in the Past',
    intro: 'Most modal verbs have no past form, so we use other verbs to talk about ability, obligation and permission in the past.',
    tables: [
      {
        columns: ['Present', 'Past', 'Example'],
        rows: [
          ['can (ability)', '**could** / **couldn\'t**', 'When I was five, I **could** swim.'],
          ['can (one success)', '**was / were able to**', 'He **was able to** finish the race, even though he was injured.'],
          ['must / have to', '**had to**', 'Yesterday I **had to** work late.'],
          ["don't have to", "**didn't have to**", "She **didn't have to** pay. It was free."],
          ['can / may (permission)', '**was / were allowed to**', 'We **were allowed to** stay up late.'],
        ],
      },
    ],
    notes: [
      "**Must** has no past form: I **had to** go. (not: I musted go)",
      "For one specific achievement, use **was able to / managed to**, not could: We **were able to** get the last tickets. (In the negative, couldn't is fine: I couldn't find my keys.)",
      'Questions: **Did** you **have to** ...? / **Could** you ...? / **Were** you **allowed to** ...?',
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['can → could  |  must → had to  |  may/can (permission) → was allowed to'],
    },
  },

  'B1::Past simple passive': {
    heading: 'Past Simple Passive',
    intro: 'We use the passive when the action is more important than who did it, or when we don\'t know who did it. Past simple passive: **was / were + past participle**.',
    tables: [
      {
        columns: ['', 'Form', 'Example'],
        rows: [
          ['Positive', 'was / were + V3', 'The Mona Lisa **was painted** by Leonardo da Vinci.'],
          ['Negative', "wasn't / weren't + V3", "The tickets **weren't sold** online."],
          ['Question', 'Was / Were + subject + V3?', '**Was** the film **made** in Hollywood?'],
        ],
      },
      {
        heading: 'Active → Passive',
        columns: ['Active', 'Passive'],
        rows: [
          ['Someone **stole** my bike.', 'My bike **was stolen**.'],
          ['They **built** these houses in 1920.', 'These houses **were built** in 1920.'],
          ['Bell **invented** the telephone.', 'The telephone **was invented** by Bell.'],
        ],
      },
    ],
    notes: [
      'Use **by** to say who did the action — only if it is important.',
      'Singular subject → **was**; plural subject → **were**.',
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['was / were + **past participle** (+ by ...)'],
    },
  },

  'B1::Present perfect passive': {
    heading: 'Present Perfect Passive',
    intro: 'Present perfect passive: **has / have + been + past participle**. We use it for recent actions with a result now, when the person who did it is not important.',
    tables: [
      {
        columns: ['', 'Form', 'Example'],
        rows: [
          ['Positive', 'has / have + been + V3', 'My car **has been stolen**!'],
          ['Negative', "hasn't / haven't + been + V3", "The work **hasn't been finished** yet."],
          ['Question', 'Has / Have + subject + been + V3?', '**Have** the tickets **been booked** yet?'],
        ],
      },
      {
        heading: 'Active → Passive',
        columns: ['Active', 'Passive'],
        rows: [
          ['They **have built** a new school.', 'A new school **has been built**.'],
          ['Someone **has eaten** my sandwich.', 'My sandwich **has been eaten**.'],
        ],
      },
    ],
    notes: ['Just, already and yet are common: The hospital **has just been opened**. / It **hasn\'t been fixed yet**.'],
    keyPoint: {
      title: 'Key Point',
      lines: ['has / have + **been** + past participle'],
    },
  },

  'B1::Passive with modal verbs': {
    heading: 'Passive with Modal Verbs',
    intro: 'After modal verbs (can, could, must, should, might, will...) the passive is **modal + be + past participle**.',
    tables: [
      {
        columns: ['Modal', 'Passive', 'Example'],
        rows: [
          ['must', '**must be** + V3', 'This form **must be completed** in black ink.'],
          ['can / can\'t', '**can be** + V3', "The car **can't be repaired**."],
          ['should', '**should be** + V3', 'This medicine **should be taken** after meals.'],
          ['will', '**will be** + V3', 'The tickets **will be sent** by email.'],
          ['might / could', '**might be** + V3', 'The meeting **might be cancelled**.'],
          ['have to', '**has to be** + V3', 'The letter **has to be posted** today.'],
        ],
      },
    ],
    notes: [
      'Negative: modal + **not be** + V3: Phones **must not be used**.',
      'Question: Modal + subject + **be** + V3? **Can** this jacket **be washed**?',
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['modal + **be** + past participle (never "modal + been" in this structure)'],
    },
  },

  'B1::Reported speech: Questions': {
    heading: 'Reported Speech: Questions',
    intro: 'When we report a question, we use **normal word order** (subject + verb), we **don\'t use do / does / did**, and the tense usually moves **one step back**.',
    tables: [
      {
        heading: 'Two types of questions',
        columns: ['Direct question', 'Reported question'],
        rows: [
          ['"Where **do you live**?"', 'She asked me where **I lived**.'],
          ['"What time **is it**?"', 'He asked what time **it was**.'],
          ['"**Are you** hungry?" (yes/no)', 'He asked me **if / whether I was** hungry.'],
          ['"**Can you** swim?" (yes/no)', 'She asked **if I could** swim.'],
        ],
      },
      {
        heading: 'Tense changes',
        columns: ['Direct', 'Reported'],
        rows: [
          ['present simple / continuous', 'past simple / continuous'],
          ['past simple / present perfect', 'past perfect'],
          ['will / can', 'would / could'],
        ],
      },
    ],
    notes: [
      'Yes/no questions → **if** or **whether**. Wh- questions → keep the question word.',
      'No question mark at the end: She asked where I lived**.**',
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['asked (me) + question word / if + **subject + verb** (no do/does/did, tense back)'],
    },
  },

  'B1::Reported speech: Commands and requests': {
    heading: 'Reported Speech: Commands and Requests',
    intro: 'To report commands we use **tell + person + (not) to + verb**. To report requests we use **ask + person + (not) to + verb**.',
    tables: [
      {
        columns: ['Direct', 'Reported'],
        rows: [
          ['"Sit down."', 'The teacher **told us to sit** down.'],
          ['"Don\'t be late."', 'She **told me not to be** late.'],
          ['"Please help me."', 'He **asked me to help** him.'],
          ['"Could you open the window?"', 'She **asked me to open** the window.'],
          ['"Please don\'t smoke."', 'She **asked him not to smoke**.'],
        ],
      },
    ],
    notes: [
      "**Tell** always needs a person: told **me** (not: told to me / said me).",
      "Negative: **not to** + verb (not: to not / don't).",
      'Change pronouns and time words: me → him/her, tomorrow → the next day, here → there.',
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['Command: **told** + person + (not) **to** + verb  |  Request: **asked** + person + (not) **to** + verb'],
    },
  },

  'B1::Reporting verbs': {
    heading: 'Reporting Verbs',
    intro: 'Instead of say and tell, we can use reporting verbs that show the **purpose** of what someone said. Each verb has its own pattern.',
    tables: [
      {
        columns: ['Pattern', 'Verbs', 'Example'],
        rows: [
          ['verb + **to** + verb', 'offer, promise, refuse, agree, threaten', 'He **offered to help** me.'],
          ['verb + person + **to** + verb', 'advise, remind, warn, tell, ask, encourage', 'She **reminded me to buy** milk.'],
          ['verb + **-ing**', 'suggest, deny, admit, recommend', 'She **suggested going** to the cinema.'],
          ['verb + person + **not to** + verb', 'warn, tell, advise', 'He **warned me not to swim** there.'],
        ],
      },
    ],
    notes: [
      "**Suggest** is not followed by person + to: She suggested **going**. (not: suggested me to go)",
      'Deny = say you didn\'t do it. Admit = say you did it.',
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['offer / promise / refuse / agree + **to**  |  advise / remind / warn + **person + to**  |  suggest / deny / admit + **-ing**'],
    },
  },

  'B1::Make, let, allow': {
    heading: 'Make, Let, Allow',
    intro: 'These verbs talk about **forcing** someone to do something or **giving permission**.',
    tables: [
      {
        columns: ['Verb', 'Meaning', 'Pattern', 'Example'],
        rows: [
          ['**make**', 'force / cause', 'make + person + **base verb**', 'My mum **made me clean** my room. / Onions **make me cry**.'],
          ['**let**', 'give permission', 'let + person + **base verb**', 'My parents **let me stay** out late.'],
          ['**allow**', 'give permission (more formal)', 'allow + person + **to** + verb', 'The school **allows students to use** phones.'],
          ['**be allowed to**', 'have permission', 'be allowed **to** + verb', "We **aren't allowed to eat** in the library."],
        ],
      },
    ],
    notes: [
      "After make and let, **no 'to'**: let me **go** (not: let me to go).",
      "**Let** has no passive. Use **be allowed to**: Visitors **are not allowed to** take photos. (not: are not let)",
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['make / let + person + **verb**  |  allow + person + **to** + verb'],
    },
  },

  'B1::Non-defining relative clauses': {
    heading: 'Non-defining Relative Clauses',
    intro: 'A non-defining relative clause gives **extra information** about a person or thing we already know. The sentence is complete without it. It is always between **commas**.',
    tables: [
      {
        columns: ['Pronoun', 'Used for', 'Example'],
        rows: [
          ['**who**', 'people', 'My brother, **who** lives in London, is a doctor.'],
          ['**which**', 'things / animals / places', 'Paris, **which** is the capital of France, is beautiful.'],
          ['**whose**', 'possession', 'Tom, **whose** car was stolen, called the police.'],
          ['**where**', 'places', 'Our hotel, **where** we stayed for a week, was lovely.'],
          ['**when**', 'times', 'In 2010, **when** I was a student, I lived in Rome.'],
          ['**which** (whole clause)', 'the whole idea before it', 'She passed the exam, **which** surprised everyone.'],
        ],
      },
    ],
    notes: [
      "**Don't use that** in non-defining clauses: My phone, **which** I bought last year... (not: that I bought)",
      'We cannot leave out the pronoun in a non-defining clause.',
      'Defining vs non-defining: My sister **who lives in Rome** (I have more than one sister) / My sister, **who lives in Rome**, (I have one sister).',
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['Extra information → **commas** + who / which / whose / where / when — **never that**.'],
    },
  },

  'B1::Relative pronouns and adverbs': {
    heading: 'Relative Pronouns and Adverbs',
    intro: 'Relative pronouns and adverbs join two ideas into one sentence and tell us **which** person, thing, place or time we mean.',
    tables: [
      {
        columns: ['Word', 'Refers to', 'Example'],
        rows: [
          ['**who / that**', 'people', 'The woman **who** lives next door is a nurse.'],
          ['**which / that**', 'things, animals', 'The film **which** we watched was boring.'],
          ['**whose**', 'possession (his / her / their)', 'The man **whose** car was stolen called the police.'],
          ['**where**', 'places (= in / at which)', 'That is the restaurant **where** we had our first date.'],
          ['**when**', 'times', 'I remember the day **when** we met.'],
          ['**why**', 'reasons (the reason why)', "That's the reason **why** I left."],
        ],
      },
    ],
    notes: [
      'When who / which / that is the **object**, we can leave it out: The book (that) I told you about.',
      "**Where** replaces a preposition + place: the café **where** I work = the café (that) I work **in**. But: the town **which** I visited (visit has no preposition).",
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['person → who  |  thing → which  |  possession → whose  |  place → where  |  time → when  |  reason → why'],
    },
  },

  'B1::Indirect questions': {
    heading: 'Indirect Questions',
    intro: 'Indirect questions are **more polite** than direct questions. They start with a phrase like **Can you tell me...? / Do you know...? / I wonder...** and use **normal word order** (subject + verb).',
    tables: [
      {
        columns: ['Direct question', 'Indirect question'],
        rows: [
          ['Where **is the station**?', 'Can you tell me where **the station is**?'],
          ['What time **does the film start**?', 'Do you know what time **the film starts**?'],
          ['Why **did he leave**?', 'I wonder why **he left**.'],
          ['**Is she** coming? (yes/no)', 'Do you know **if / whether she is** coming?'],
        ],
      },
      {
        heading: 'Useful starters',
        columns: ['Starter', 'Ends with'],
        rows: [
          ['Can you tell me ... / Do you know ... / Could you tell me ...', '**?**'],
          ["I wonder ... / I'd like to know ... / I'm not sure ...", '**.**'],
        ],
      },
    ],
    notes: [
      "Don't use **do / does / did** in the indirect part: Do you know where she **works**? (not: where does she work)",
      'Yes/no questions → **if / whether**.',
      'Unlike reported speech, the tense does not change: Do you know where he **is**?',
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['Starter + question word / if + **subject + verb**'],
    },
  },

  'B1::So and such: so tired, such a nice day': {
    heading: 'So and Such',
    intro: '**So** and **such** make an adjective stronger. We often use them with **that** to show a result: It was **so** cold **that** we stayed at home.',
    tables: [
      {
        columns: ['Form', 'Example'],
        rows: [
          ['**so** + adjective', 'The film was **so boring**!'],
          ['**so** + adverb', 'He drives **so fast**.'],
          ['**so** + much / many / few / little', 'There were **so many** people.'],
          ['**such a / an** + adjective + singular noun', 'He is **such a good** teacher.'],
          ['**such** + adjective + plural noun', 'They are **such nice** people.'],
          ['**such** + adjective + uncountable noun', 'It was **such good** food.'],
          ['so / such ... **that** + result', "I was **so** tired **that** I fell asleep."],
        ],
      },
    ],
    notes: [
      "If there is a **noun**, use **such**. If there is **no noun**, use **so**: so nice / such a nice day.",
      "Don't use 'a' with plural or uncountable nouns: such **terrible weather** (not: such a terrible weather).",
    ],
    keyPoint: {
      title: 'Key Point',
      lines: ['so + adjective  |  such (a/an) + adjective + **noun**'],
    },
  },
};
