// B2 grammar "Explanation" içerikleri — şema için bkz. grammarExplanations.js
export const B2_EXPLANATIONS = {
  'B2::Future continuous': {
    heading: 'Future Continuous',
    intro: 'We use the future continuous (**will be + verb-ing**) for an action that will be **in progress** at a specific time in the future: This time tomorrow, I**\'ll be lying** on a beach.',
    tables: [
      {
        columns: ['', 'Form', 'Example'],
        rows: [
          ['Positive', 'will be + verb-ing', 'At 10 am, she **will be taking** her exam.'],
          ['Negative', "won't be + verb-ing", "I **won't be working** tomorrow."],
          ['Question', 'Will + subject + be + verb-ing?', '**Will** you **be using** the car tonight?'],
        ],
      },
      {
        heading: 'Uses',
        columns: ['Use', 'Example'],
        rows: [
          ['action in progress at a future time', "Don't call at 8. We**'ll be having** dinner."],
          ['polite question about plans', '**Will** you **be coming** to the party?'],
          ['future events that are expected / routine', "I**'ll be seeing** Tom at work tomorrow."],
        ],
      },
    ],
    notes: ['Time expressions: this time tomorrow / next week, at 8 pm tomorrow, in ten years\' time.'],
    keyPoint: { title: 'Key Point', lines: ['will **be** + verb-ing → in progress at a moment in the future.'] },
  },

  'B2::Future perfect': {
    heading: 'Future Perfect',
    intro: 'We use the future perfect (**will have + past participle**) for an action that will be **completed before** a certain time in the future: By 2030, I**\'ll have finished** university.',
    tables: [
      {
        columns: ['', 'Form', 'Example'],
        rows: [
          ['Positive', 'will have + V3', 'By Friday, she **will have written** the report.'],
          ['Negative', "won't have + V3", "I **won't have finished** by 6."],
          ['Question', 'Will + subject + have + V3?', '**Will** you **have finished** the book by Monday?'],
        ],
      },
    ],
    notes: [
      'Typical time words: **by** (by 2030, by Friday, by then), **by the time** + present simple, **before**.',
      'With stative verbs we use it for duration: In June, we **will have been** married for ten years.',
    ],
    keyPoint: { title: 'Key Point', lines: ['**by** + future time → will **have** + past participle (finished before then).'] },
  },

  'B2::Future perfect continuous': {
    heading: 'Future Perfect Continuous',
    intro: 'We use the future perfect continuous (**will have been + verb-ing**) to talk about **how long** an action will have continued up to a point in the future.',
    tables: [
      {
        columns: ['', 'Form', 'Example'],
        rows: [
          ['Positive', 'will have been + verb-ing', 'By June, I **will have been working** here for five years.'],
          ['Negative', "won't have been + verb-ing", "She **won't have been waiting** long."],
          ['Question', 'How long will + subject + have been + verb-ing?', '**How long will** you **have been studying** by then?'],
        ],
      },
      {
        heading: 'Compare',
        columns: ['Tense', 'Focus', 'Example'],
        rows: [
          ['Future perfect', 'completion', 'By 6, I **will have written** 3 reports.'],
          ['Future perfect continuous', 'duration', 'By 6, I **will have been writing** for 8 hours.'],
        ],
      },
    ],
    notes: ['It is usually used with **for** + a period of time and **by** + a future point.'],
    keyPoint: { title: 'Key Point', lines: ['by + future point + **for** + duration → will have been + verb-ing.'] },
  },

  'B2::Past perfect: Advanced structures': {
    heading: 'Past Perfect: Advanced Structures',
    intro: 'At B2, the past perfect appears in several fixed structures for emphasis, regret and unreal past situations.',
    tables: [
      {
        columns: ['Structure', 'Example'],
        rows: [
          ['**No sooner had** + subject + V3 + **than** ...', '**No sooner had I** arrived **than** the phone rang.'],
          ['**Hardly / Scarcely had** + subject + V3 + **when** ...', '**Hardly had we** left **when** it started to rain.'],
          ['It was the first / best ... (that) + past perfect', 'It was the first time I **had seen** snow.'],
          ['wish + past perfect (regret)', "I wish I **hadn't said** that."],
          ['If + past perfect (third conditional)', 'If I **had known**, I would have told you.'],
          ['past perfect continuous (duration before a past moment)', 'He was exhausted. He **had been running** for hours.'],
        ],
      },
    ],
    notes: [
      'After **No sooner / Hardly / Scarcely** at the start, we use **inversion** (had + subject).',
      'No sooner → **than**; Hardly / Scarcely → **when**.',
    ],
    keyPoint: { title: 'Key Point', lines: ['No sooner had I ... than / Hardly had I ... when → one action immediately after another.'] },
  },

  'B2::Advanced tense review': {
    heading: 'Advanced Tense Review',
    intro: 'Choosing the right tense depends on **time** (past, present, future) and **aspect** (simple, continuous, perfect).',
    tables: [
      {
        columns: ['Tense', 'Main use', 'Example'],
        rows: [
          ['Present simple', 'habits, facts, timetables', 'He **cycles** to work. The train **leaves** at 6.'],
          ['Present continuous', 'now, temporary, arrangements', 'Look! It**\'s snowing**.'],
          ['Present perfect', 'experience, result now, unfinished time', "I**'ve seen** it three times. She**'s lost** her keys."],
          ['Present perfect continuous', 'duration until now', "I**'ve been working** here since 2015."],
          ['Past simple', 'finished past action', 'We **were** in Paris in 2019.'],
          ['Past continuous', 'in progress in the past', 'While I **was cooking**, the lights went out.'],
          ['Past perfect (continuous)', 'before another past action', 'They **had been walking** for two hours when it rained.'],
          ['Future continuous', 'in progress in the future', "This time next year, I**'ll be living** in Canada."],
          ['Future perfect', 'completed before a future time', 'By the end of the month, we**\'ll have completed** it.'],
        ],
      },
    ],
    notes: [
      "Stative verbs (know, believe, own, like) don't use continuous forms: I**'ve known** her for years.",
      "Signal words help: **yet / ever / since** → present perfect; **ago / last / in 2019** → past simple; **by the time** → perfect tenses.",
    ],
    keyPoint: { title: 'Key Point', lines: ['Ask: When? (time) and Is it complete, in progress, or before another time? (aspect)'] },
  },

  "B2::Must have, might have, can't have": {
    heading: "Must have, Might have, Can't have",
    intro: 'We use **modal + have + past participle** to make **deductions** (logical guesses) about the past.',
    tables: [
      {
        columns: ['Form', 'How sure?', 'Example'],
        rows: [
          ['**must have** + V3', "I'm sure it happened (≈ 95%)", 'The ground is wet. It **must have rained**.'],
          ['**might / may / could have** + V3', 'maybe it happened (≈ 50%)', 'He **might have gone** home.'],
          ["**can't / couldn't have** + V3", "I'm sure it didn't happen", "She **can't have seen** me. She didn't say hello."],
          ['**might not / may not have** + V3', "maybe it didn't happen", "She **might not have heard**."],
        ],
      },
    ],
    notes: [
      "The opposite of must have is **can't have** (not: mustn't have).",
      'For "be": must have **been**, can\'t have **been**: You must have been tired.',
    ],
    keyPoint: { title: 'Key Point', lines: ["sure → must have  |  possible → might have  |  impossible → can't have (+ V3)"] },
  },

  'B2::Should have, could have, would have: Advanced': {
    heading: 'Should have, Could have, Would have: Advanced',
    intro: 'At B2 we use these past modals with more precise meanings, in conditionals and in the passive.',
    tables: [
      {
        columns: ['Form', 'Meaning', 'Example'],
        rows: [
          ['should / ought to have + V3', 'criticism / regret', 'I **ought to have called** you. Sorry.'],
          ['could have + V3', 'a possibility or chance that wasn\'t used; reproach', 'You **could have warned** me!'],
          ['would have + V3', 'unreal past result / intention', 'I **would have gone**, but I was too tired.'],
          ['might have + V3', 'possible result in an unreal past', 'He **might have been promoted** if he had worked harder.'],
          ['should have been + V3 (passive)', 'it should have been done', 'They **should have been told** about the risks.'],
        ],
      },
    ],
    notes: [
      'In third conditionals: If I\'d known, I **would have cooked**. / ... I **could have helped**. / ... I **might have stayed**.',
      '**Needn\'t have** (it happened but wasn\'t necessary) is different — see the next topic.',
    ],
    keyPoint: { title: 'Key Point', lines: ['modal + have + V3 (active) / modal + have **been** + V3 (passive)'] },
  },

  "B2::Needn't have vs didn't need to": {
    heading: "Needn't have vs Didn't need to",
    intro: 'Both talk about something that was **not necessary** in the past, but they have an important difference.',
    tables: [
      {
        columns: ['Form', 'Meaning', 'Example'],
        rows: [
          ["**needn't have** + V3", 'you **did** it, but it wasn\'t necessary', "I **needn't have bought** milk. There was plenty in the fridge."],
          ["**didn't need to** + verb", "it wasn't necessary (usually you **didn't** do it)", "We **didn't need to take** a taxi, so we walked."],
        ],
      },
    ],
    notes: [
      "**Needn't have** + past participle: You needn't have **waited**.",
      "**Didn't need to** + base verb: She didn't need **to work**.",
      "Didn't need to can also be used when we did it, if the context makes it clear: You **didn't need to come** — but I'm glad you did.",
    ],
    keyPoint: { title: 'Key Point', lines: ["needn't have done = did it unnecessarily  |  didn't need to do = wasn't necessary (and probably didn't)"] },
  },

  'B2::Third conditional': {
    heading: 'Third Conditional',
    intro: 'We use the third conditional to imagine a **different past** — situations that did **not** happen — and their results. It often expresses regret or criticism.',
    tables: [
      {
        columns: ['If clause', 'Main clause', 'Example'],
        rows: [
          ['If + **past perfect**', '**would have** + V3', 'If I **had studied**, I **would have passed**.'],
          ["If + **hadn't** + V3", "**wouldn't have** + V3", "If it **hadn't rained**, we **wouldn't have stayed** home."],
          ['If + past perfect', '**could / might have** + V3', 'They **could have won** if they **had played** better.'],
        ],
      },
      {
        heading: 'Real past → third conditional',
        columns: ['What happened', 'Third conditional'],
        rows: [
          ["I didn't know, so I didn't help.", 'If I **had known**, I **would have helped**.'],
          ['She left late and missed the train.', "If she **hadn't left** late, she **wouldn't have missed** the train."],
        ],
      },
    ],
    notes: [
      "**Don't use would** in the if-clause: If I **had** known (not: If I would have known).",
      "Short forms: If I**'d** known, I**'d have** told you. ('d = had in the if-clause, would in the main clause)",
    ],
    keyPoint: { title: 'Key Point', lines: ['If + had + V3, would have + V3 → imaginary past.'] },
  },

  'B2::Inverted conditionals: Had I known...': {
    heading: 'Inverted Conditionals: Had I known...',
    intro: 'In **formal** English we can leave out **if** and put the auxiliary verb **before** the subject.',
    tables: [
      {
        columns: ['Normal', 'Inverted', 'Type'],
        rows: [
          ['If I **had** known, ...', '**Had I** known, I would have told you.', 'third conditional'],
          ["If we **hadn't** missed the bus, ...", '**Had we not** missed the bus, ...', 'third (negative)'],
          ['If I **were** rich, ...', '**Were I** rich, I would travel.', 'second conditional'],
          ['If he studied / were to study, ...', '**Were he to** study harder, he would pass.', 'second (future)'],
          ['If you need help, ...', '**Should you** need help, please call me.', 'first conditional'],
        ],
      },
    ],
    notes: [
      "In the negative, **not** comes after the subject: **Had it not** been for your help... (not: Hadn't it been)",
      '**Should you...** is very common in formal letters and emails: Should you have any questions, please contact us.',
    ],
    keyPoint: { title: 'Key Point', lines: ['Had + subject + V3  |  Were + subject (+ to)  |  Should + subject + base verb'] },
  },

  "B2::Alternatives to 'if'": {
    heading: "Alternatives to 'if'",
    intro: "Several words and phrases can replace **if** to show different kinds of conditions.",
    tables: [
      {
        columns: ['Word', 'Meaning', 'Example'],
        rows: [
          ['**unless**', 'if ... not', "We'll go out **unless** it rains."],
          ['**as long as / so long as**', 'only if (condition)', 'You can borrow my car **as long as** you drive carefully.'],
          ['**provided / providing (that)**', 'only if (formal)', "I'll come **provided that** I can leave early."],
          ['**on condition that**', 'only if (very formal)', 'You can stay **on condition that** you are quiet.'],
          ['**in case**', 'because something might happen', 'Take an umbrella **in case** it rains.'],
          ['**suppose / supposing**', 'imagine that', '**Supposing** you won the lottery, what would you do?'],
          ['**otherwise**', 'if not (after the first sentence)', "Hurry up, **otherwise** we'll be late."],
          ['**but for** + noun', 'if it weren\'t / hadn\'t been for', '**But for** your help, I would have failed.'],
        ],
      },
    ],
    notes: [
      "**Unless** already means 'if not', so don't use another negative: **Unless** you hurry (not: Unless you don't hurry).",
      "**In case** ≠ if: Take an umbrella **in case** it rains (take it now). / Take an umbrella **if** it rains (only take it when it rains).",
    ],
    keyPoint: { title: 'Key Point', lines: ['unless = if not  |  as long as / provided = only if  |  in case = as a precaution'] },
  },

  'B2::Have / get something done': {
    heading: 'Have / Get Something Done',
    intro: 'We use **have / get + object + past participle** when **someone else** does a job for us (usually we pay them): I **had my hair cut**. (A hairdresser cut it.)',
    tables: [
      {
        columns: ['Tense', 'Example'],
        rows: [
          ['Present simple', 'She **gets her nails done** every week.'],
          ['Present continuous', 'We **are having our house painted**.'],
          ['Past simple', 'I **had my passport renewed** last week.'],
          ['Present perfect', '**Have** you **had your bike fixed** yet?'],
          ['Future / going to', "She**'s going to get her car repaired**."],
          ['Modal', 'You **should have that tooth checked**.'],
        ],
      },
    ],
    notes: [
      '**Get** is more informal than **have**.',
      'It can also describe something bad that happened to us: He **had his phone stolen** on the train.',
      'Word order matters: I had **my hair cut** (someone did it) ≠ I had cut my hair (I did it — past perfect).',
    ],
    keyPoint: { title: 'Key Point', lines: ['have / get + **object** + **past participle**'] },
  },

  'B2::Passive infinitives and gerunds': {
    heading: 'Passive Infinitives and Gerunds',
    intro: 'Infinitives and -ing forms also have passive forms. Use them when the subject **receives** the action.',
    tables: [
      {
        columns: ['Form', 'Structure', 'Example'],
        rows: [
          ['Passive infinitive', '**to be** + V3', 'She wants **to be invited** to the party.'],
          ['Passive gerund', '**being** + V3', 'I hate **being told** what to do.'],
        ],
      },
      {
        heading: 'Which one?',
        columns: ['After...', 'Use', 'Example'],
        rows: [
          ['want, hope, expect, would like, agree, need', 'to be + V3', 'I expect **to be promoted** soon.'],
          ['enjoy, hate, like, avoid, deny, remember', 'being + V3', 'She avoided **being photographed**.'],
          ['prepositions (of, on, about, without...)', 'being + V3', 'He was afraid of **being caught**.'],
          ['be + to (instructions / plans)', 'to be + V3', 'The rules are **to be followed**.'],
        ],
      },
    ],
    notes: ['**Need + -ing** has a passive meaning too: The car needs **washing** = The car needs **to be washed**.'],
    keyPoint: { title: 'Key Point', lines: ['to be + V3 (after verbs + to)  |  being + V3 (after verbs + -ing and prepositions)'] },
  },

  'B2::Reporting verbs and structures': {
    heading: 'Reporting Verbs and Structures',
    intro: 'Many reporting verbs are followed by a **preposition + -ing**, or by an **object + to + verb**. Learning the pattern with the verb is essential.',
    tables: [
      {
        columns: ['Pattern', 'Verbs', 'Example'],
        rows: [
          ['verb + person + **of** + -ing', 'accuse', 'She **accused him of lying**.'],
          ['verb + **for** + -ing', 'apologise', 'He **apologised for being** late.'],
          ['verb + person + **for** + -ing / noun', 'blame, thank, criticise', 'She **blamed me for** the mistake.'],
          ['verb + **on** + -ing', 'insist', 'They **insisted on paying**.'],
          ['verb + person + **on** + -ing', 'congratulate', 'She **congratulated me on passing**.'],
          ['verb + person + **to** + verb', 'encourage, persuade, warn, advise', 'They **persuaded me to accept** the job.'],
          ['verb + **to** + verb', 'threaten, offer, refuse, promise', 'He **threatened to call** the police.'],
          ['verb + -ing', 'recommend, suggest, deny, admit', 'He **recommended visiting** the museum.'],
          ['verb + (to person) + **that**', 'explain, admit, suggest', 'She **explained to me that** it was cancelled.'],
        ],
      },
    ],
    notes: ["**Explain** never takes a direct person object: explain **to me** (not: explain me)."],
    keyPoint: { title: 'Key Point', lines: ['accuse of · apologise for · blame for · insist on · congratulate on'] },
  },

  'B2::Reporting with passive structures': {
    heading: 'Reporting with Passive Structures',
    intro: "In formal English (news, reports) we often use passive reporting verbs (**say, believe, think, report, know, expect, consider**) to talk about what people in general say, without naming them.",
    tables: [
      {
        columns: ['Structure', 'Example'],
        rows: [
          ['**It is said / believed / reported that** + clause', '**It is said that** the president will resign.'],
          ['Subject + **is said / believed to** + verb (present)', 'She **is said to be** very rich.'],
          ['Subject + **is thought to be** + verb-ing (in progress)', 'He **is believed to be living** in Spain.'],
          ['Subject + **is thought to have** + V3 (past)', 'The thief **is thought to have left** the country.'],
          ['Subject + **is reported to have been** + V3 (past passive)', 'He **is reported to have been injured**.'],
        ],
      },
    ],
    notes: [
      'Use **to have + V3** when the action happened **before** the time of reporting.',
      'Past reporting: **It was thought that** the earth was flat.',
    ],
    keyPoint: { title: 'Key Point', lines: ['It is said that ... = Subject is said to (have) ...'] },
  },

  'B2::Reduced relative clauses': {
    heading: 'Reduced Relative Clauses',
    intro: 'We can shorten relative clauses by leaving out **who / which / that + be** and using a **participle**. This makes writing more concise.',
    tables: [
      {
        columns: ['Full clause', 'Reduced', 'Rule'],
        rows: [
          ['The man **who is sitting** next to me ...', 'The man **sitting** next to me ...', 'active → verb-ing'],
          ['People **who live** in big cities ...', 'People **living** in big cities ...', 'active (any tense) → verb-ing'],
          ['The car **which was damaged** ...', 'The car **damaged** in the accident ...', 'passive → past participle'],
          ['The book **which was written** by Orwell ...', 'The book **written** by Orwell ...', 'passive → past participle'],
          ['He was the first person **who walked** on the moon.', 'He was the first person **to walk** on the moon.', 'after first / last / only → to + verb'],
        ],
      },
    ],
    notes: ['Only **defining** clauses where the relative pronoun is the **subject** can be reduced like this.'],
    keyPoint: { title: 'Key Point', lines: ['active → -ing  |  passive → V3  |  the first / last / only → to + verb'] },
  },

  'B2::Noun clauses': {
    heading: 'Noun Clauses',
    intro: 'A noun clause works like a **noun** in the sentence: it can be the subject, the object or come after be. It starts with **that, what, wh- words, if / whether**.',
    tables: [
      {
        columns: ['Starts with', 'Example', 'Function'],
        rows: [
          ['**that**', '**That she is late again** surprises nobody.', 'subject'],
          ['**that**', 'I think **that you are right**.', 'object'],
          ['**what** (= the thing that)', '**What he said** was not true.', 'subject'],
          ['wh- word', "I don't know **where she lives**.", 'object'],
          ['**if / whether**', 'I wonder **whether he will come**.', 'object'],
          ['the fact that', '**The fact that he apologised** helped.', 'subject'],
          ['It + be + adjective + that', 'It is obvious **that he is lying**.', 'delayed subject'],
        ],
      },
    ],
    notes: [
      'Noun clauses use **normal word order**: I don\'t know where **she lives** (not: where does she live).',
      'Instead of a long that-clause as subject, we usually use **It**: It is strange that nobody called.',
    ],
    keyPoint: { title: 'Key Point', lines: ['that / what / wh- / if-whether + subject + verb = one "noun" in the sentence.'] },
  },

  'B2::Concession clauses: although, even though, whereas': {
    heading: 'Concession Clauses: although, even though, whereas...',
    intro: 'Concession clauses show **contrast**: something is true, but there is a surprising result or a different situation.',
    tables: [
      {
        columns: ['Word', 'Followed by', 'Example'],
        rows: [
          ['**although / though**', 'clause', '**Although** it was raining, we went for a walk.'],
          ['**even though**', 'clause (stronger)', '**Even though** he worked hard, he failed.'],
          ['**while / whereas**', 'clause (comparison of two facts)', 'She is rich, **whereas** her brother is poor.'],
          ['**despite / in spite of**', 'noun / -ing', '**Despite** the rain, ... / **In spite of** feeling ill, ...'],
          ['**despite the fact that**', 'clause', '**Despite the fact that** he was tired, he kept going.'],
          ['**however** + adj / adv', 'clause', '**However** hard I try, I can\'t do it.'],
          ['adjective + **as** + subject + verb', '(formal)', '**Tired as** she was, she finished the race.'],
        ],
      },
    ],
    notes: [
      "**Despite / in spite of** cannot be followed directly by a clause: Despite **it was** raining ✗ → Despite **the rain** ✓ / Despite **the fact that** it was raining ✓",
      "Don't use **but** with although: Although it was cold, we went out. (not: Although it was cold, but we went out.)",
    ],
    keyPoint: { title: 'Key Point', lines: ['although / even though / whereas + clause  |  despite / in spite of + noun or -ing'] },
  },

  'B2::Emphasis and fronting': {
    heading: 'Emphasis and Fronting',
    intro: 'English has several ways to **emphasise** part of a sentence: auxiliary do, exclamations, cleft sentences and moving words to the front (fronting).',
    tables: [
      {
        columns: ['Technique', 'Example'],
        rows: [
          ['**do / does / did** + base verb', 'I **do like** your haircut! / She **did call** you.'],
          ['**What** + clause + **is / was**', '**What I need is** a holiday.'],
          ['**How** + adjective!', '**How beautiful** the view was!'],
          ['**What a / an** + noun!', '**What a mess** you have made!'],
          ['**So** + adjective + inversion + that', '**So tired was she** that she fell asleep.'],
          ['**Such** + be + noun + that', '**Such was the noise** that we couldn\'t sleep.'],
          ['Adjective + **as** + subject + verb', '**Strange as it may seem**, I enjoyed it.'],
          ['Fronting the object', '**This book** I will never forget.'],
        ],
      },
    ],
    notes: ['Emphatic **do** is stressed in speech: I **DO** like it.'],
    keyPoint: { title: 'Key Point', lines: ['do + verb · What I need is ... · So + adjective + was she ... · How / What a ...!'] },
  },

  'B2::Advanced word order': {
    heading: 'Advanced Word Order',
    intro: 'English word order is quite fixed. At B2 you need to control the position of adverbs, objects, adjectives and inversion after negative words.',
    tables: [
      {
        columns: ['Rule', 'Example'],
        rows: [
          ['Frequency adverbs: before the main verb, after **be**', 'I **usually go** ... / He **is always** late.'],
          ['Mid adverbs: after the first auxiliary', 'They **should probably** have been told.'],
          ['**still** in negatives: before the auxiliary', "I **still don't** understand."],
          ['give / send + person + thing', 'He gave **me the book**. / He gave the book **to me**.'],
          ['Phrasal verbs + pronoun: pronoun in the middle', 'Turn **it off**. (not: turn off it)'],
          ['Adjective order: opinion → size → age → colour → material', 'a **lovely old wooden** table'],
          ['Place before time', 'We arrived **at the hotel late**.'],
          ['Negative adverb first → inversion', '**Only then did I** realise. / **Rarely have I** seen ...'],
        ],
      },
    ],
    notes: ["**Not only** at the start also needs inversion: **Not only was he** late, but he also forgot the tickets."],
    keyPoint: { title: 'Key Point', lines: ['Subject + verb + object + manner + place + time; inversion after negative adverbs.'] },
  },

  'B2::Advanced question structures': {
    heading: 'Advanced Question Structures',
    intro: 'B2 questions include subject questions, questions with prepositions at the end, embedded phrases and question tags.',
    tables: [
      {
        columns: ['Structure', 'Example'],
        rows: [
          ['Subject question (no do / did)', '**Who broke** the window?'],
          ['Object question (do / did)', '**Who did you tell**?'],
          ['Preposition at the end (informal)', 'Who did you give the book **to**?'],
          ['Preposition first + whom (formal)', '**To whom** did you send the letter?'],
          ['Who / What do you think + verb', '**Who do you think will win**?'],
          ['What ... like? (description)', '**What is the weather like**?'],
          ['Negative questions', "**Haven't** you finished yet? / **Why didn't** you call?"],
          ['Question tags', "You're coming, **aren't you**? / I'm late, **aren't I**?"],
        ],
      },
    ],
    notes: [
      "Tags after negative words (nobody, never) are **positive**: Nobody called, **did they**?",
      "Let's ... → **shall we**? / Everyone / nobody → **they**.",
    ],
    keyPoint: { title: 'Key Point', lines: ['Subject question → no auxiliary. Object question → auxiliary + subject + verb.'] },
  },

  'B2::Whatever, whoever, wherever...': {
    heading: 'Whatever, Whoever, Wherever...',
    intro: 'Words with **-ever** mean "it doesn\'t matter what / who / where..." or "any...".',
    tables: [
      {
        columns: ['Word', 'Meaning', 'Example'],
        rows: [
          ['**whatever**', 'anything / it doesn\'t matter what', '**Whatever** you do, don\'t tell Mum.'],
          ['**whoever**', 'any person who', '**Whoever** wins will get a prize.'],
          ['**wherever**', 'any place / it doesn\'t matter where', 'You can sit **wherever** you like.'],
          ['**whenever**', 'every time / at any time', 'Call me **whenever** you need help.'],
          ['**whichever**', 'any one (from a limited choice)', 'Take **whichever** cake you want.'],
          ['**however** + adj / adv', 'it doesn\'t matter how', '**However** hard I try, I can\'t open it.'],
        ],
      },
    ],
    notes: ["**No matter + what / who / where / how** has the same meaning: **No matter what** happens = **Whatever** happens."],
    keyPoint: { title: 'Key Point', lines: ['-ever = it doesn\'t matter ... / any ...'] },
  },

  'B2::Passive infinitives': {
    heading: 'Passive Infinitives',
    intro: 'The passive infinitive (**to be + V3**) and the perfect passive infinitive (**to have been + V3**) are used after verbs, adjectives and in reporting structures.',
    tables: [
      {
        columns: ['Form', 'Time', 'Example'],
        rows: [
          ['**to be** + V3', 'present / future', 'The report needs **to be finished** by Monday.'],
          ['**to have been** + V3', 'past (before now)', 'The castle is said **to have been built** in 1200.'],
          ['modal + **be** + V3', 'present / future', 'The rules **must be obeyed**.'],
          ['too / enough + **to be** + V3', '', 'The children are too young **to be left** alone.'],
          ['noun + **to be** + V3', '', 'There is a lot of work **to be done**.'],
        ],
      },
    ],
    notes: [
      'Common verbs: seem, appear, need, hope, expect, want, claim + passive infinitive.',
      'Compare: He seems **to have lost** his keys (active: he lost them) / The keys seem **to have been lost** (passive).',
    ],
    keyPoint: { title: 'Key Point', lines: ['to be + V3 (now / future)  |  to have been + V3 (past)'] },
  },

  'B2::Nominalisation': {
    heading: 'Nominalisation',
    intro: 'Nominalisation means turning **verbs and adjectives into nouns**. It makes writing more formal and academic: They **decided** → The **decision**...',
    tables: [
      {
        heading: 'Common suffixes',
        columns: ['Suffix', 'Verb / adjective → noun'],
        rows: [
          ['-tion / -sion', 'decide → decision, reduce → reduction, discuss → discussion'],
          ['-ment', 'develop → development, improve → improvement, agree → agreement'],
          ['-al / -ure', 'arrive → arrival, refuse → refusal, fail → failure'],
          ['-ance / -ence', 'perform → performance, important → importance, absent → absence'],
          ['-ity / -ness', 'able → ability, available → availability, kind → kindness'],
          ['other', 'grow → growth, analyse → analysis, increase → an increase'],
        ],
      },
      {
        heading: 'Verb sentence → noun phrase',
        columns: ['Verb-based', 'Nominalised'],
        rows: [
          ['Prices **increased** quickly.', 'There was a **rapid increase** in prices.'],
          ['He **arrived late**, which surprised us.', 'His **late arrival** surprised us.'],
        ],
      },
    ],
    notes: ['Adverbs often become **adjectives**: increased **quickly** → a **rapid** increase.'],
    keyPoint: { title: 'Key Point', lines: ['verb / adjective → noun = more formal, more concise writing.'] },
  },

  'B2::Formal vs informal grammar': {
    heading: 'Formal vs Informal Grammar',
    intro: 'Formal English (letters, reports, emails to strangers) uses different grammar and vocabulary from informal English (friends, messages).',
    tables: [
      {
        columns: ['Informal', 'Formal'],
        rows: [
          ['If you need help, ...', '**Should you** require assistance, ...'],
          ['Who did you speak to?', '**To whom** did you speak?'],
          ['Can you send it?', '**Would you mind** sending it? / **I would be grateful if** you could send it.'],
          ['I want to know ...', '**I would like** to know ...'],
          ["I'm gonna / wanna", 'I **will** / I **would like to**'],
          ['Sorry about ...', 'We **apologise** for ...'],
          ['Get back to me.', 'I **look forward to hearing** from you.'],
          ["We're sorry to tell you ...", 'We **regret to inform** you ...'],
          ['Here\'s my CV.', 'Please find **attached** my CV.'],
        ],
      },
      {
        heading: 'Letter endings',
        columns: ['Opening', 'Ending'],
        rows: [
          ['Dear Mr Smith (name known)', 'Yours **sincerely**'],
          ['Dear Sir or Madam (name unknown)', 'Yours **faithfully**'],
        ],
      },
    ],
    notes: ['Formal style also uses more **passives** (It should be noted that...) and **nominalisation**, and avoids contractions.'],
    keyPoint: { title: 'Key Point', lines: ['Formal = inversion, whom, passives, full forms, polite modals (would, should).'] },
  },
};
