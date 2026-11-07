// Writing konularının "Explanation" sekmesi için yapılandırılmış içerik.
// Anahtar: `${level}::${title}` (backend/data/writingData.js başlıklarıyla birebir aynı olmalı).
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
  "A1::An Email Introducing Yourself": {
    heading: "Writing an Email to Introduce Yourself",
    textType: "Informal Email",
    intro: "This is a friendly email to someone you don't know yet, like a new e-pal. You give basic information about yourself and ask some questions.",
    structure: [
      { step: "Greeting", detail: "Start with Hi or Hello and the person's name." },
      { step: "Who you are", detail: "Give your name, age and where you live." },
      { step: "Family and school", detail: "Say who you live with and something about your school or job." },
      { step: "Free time", detail: "Write about your hobbies, pets or favourite things." },
      { step: "Questions and ending", detail: "Ask the reader two or three questions and finish with a friendly closing." },
    ],
    usefulLanguage: [
      { heading: "Talking about yourself", phrases: ["My name is...","I'm ... years old.","I live in...","I've got / I have..."] },
      { heading: "Asking and closing", phrases: ["What about you?","Do you have any...?","Please write back soon!","Best wishes,"] },
    ],
    tips: [
      "Use the present simple for facts about you.",
      "Ask questions so your e-pal has something to answer.",
      "Keep each paragraph about one topic.",
    ],
  },

  "A1::A Note to Your Neighbour": {
    heading: "Writing a Short Note to a Neighbour",
    textType: "Note",
    intro: "A note is a short, polite message. You use it to tell someone about something that will happen, to ask for something or to say sorry.",
    structure: [
      { step: "Greeting", detail: "Use Dear or Hello and the person's name." },
      { step: "Introduce yourself", detail: "Say who you are, if the reader doesn't know you." },
      { step: "The reason", detail: "Explain why you are writing: what, when and where." },
      { step: "Be polite", detail: "Say sorry for any problem, or invite the person." },
      { step: "Contact and ending", detail: "Give your phone number and say thank you." },
    ],
    usefulLanguage: [
      { heading: "Being polite", phrases: ["I'm very sorry about...","Thank you for your understanding.","You are very welcome."] },
      { heading: "Giving information", phrases: ["I'm writing because...","It starts at... and finishes at...","If there is a problem, please..."] },
    ],
    tips: [
      "Keep it short — a note is not a long letter.",
      "Always include times and days.",
      "Use polite words like please, sorry and thank you.",
    ],
  },

  "A1::My Favourite Place in Town": {
    heading: "Describing a Favourite Place",
    textType: "Descriptive Paragraph",
    intro: "In this text you describe a place you love: where it is, what it looks like, what you do there and why you like it.",
    structure: [
      { step: "Introduce the place", detail: "Say the name of the place and where it is." },
      { step: "Describe it", detail: "Write what it looks like. Use there is / there are and adjectives." },
      { step: "What you do there", detail: "Say when you go, who you go with and what you do." },
      { step: "Why you like it", detail: "Give one or two reasons." },
    ],
    usefulLanguage: [
      { heading: "Describing", phrases: ["It's in / near / next to...","There is a... / There are lots of...","It's small but friendly."] },
      { heading: "Giving reasons", phrases: ["I love it because...","It's the perfect place to...","The best thing about it is..."] },
    ],
    tips: [
      "Use adjectives like quiet, friendly, old, beautiful.",
      "Say how often you go: every Saturday, sometimes, often.",
      "Finish with the reason why it is your favourite.",
    ],
  },

  "A1::A Text Message Changing Plans": {
    heading: "Writing a Message to Change Plans",
    textType: "Text Message",
    intro: "A text message is short and informal. When you change plans, you say sorry, explain why and suggest a new plan.",
    structure: [
      { step: "Say sorry", detail: "Start by saying you can't do the plan." },
      { step: "Give a reason", detail: "Explain why in one short sentence." },
      { step: "Suggest a new plan", detail: "Give a new day, time and place." },
      { step: "Ask for an answer", detail: "Ask your friend to reply." },
    ],
    usefulLanguage: [
      { heading: "Changing plans", phrases: ["I'm really sorry, but I can't...","Can we go on ... instead?","Is ... OK for you?"] },
      { heading: "Suggesting and ending", phrases: ["We can meet at...","Let me know what you think!","Sorry again!"] },
    ],
    tips: [
      "Keep sentences short and clear.",
      "Always give the new time and place.",
      "Emojis are OK in messages to friends, but not in formal writing.",
    ],
  },

  "A1::My Best Friend": {
    heading: "Describing a Person",
    textType: "Descriptive Paragraph",
    intro: "In this text you describe someone important to you: what they look like, what they are like as a person and why they are special.",
    structure: [
      { step: "Introduce the person", detail: "Say who they are and how you know them." },
      { step: "Appearance", detail: "Describe what they look like: height, hair, eyes, clothes." },
      { step: "Personality", detail: "Describe their character and give examples." },
      { step: "What you do together", detail: "Write about your shared interests and activities." },
      { step: "Why they are special", detail: "Finish with your feelings about the person." },
    ],
    usefulLanguage: [
      { heading: "Appearance", phrases: ["She is tall / short / slim.","He has short curly hair.","She always wears..."] },
      { heading: "Personality", phrases: ["She is kind / funny / clever.","He is good at...","We both love..."] },
    ],
    tips: [
      "Use be for personality (She is kind) and have got / has for appearance (She has long hair).",
      "Give an example for each personality adjective.",
      "Put adjectives before nouns: a lovely smile, not a smile lovely.",
    ],
  },

  "A1::A Lost Pet Poster": {
    heading: "Writing a Poster",
    textType: "Poster / Notice",
    intro: "A poster gives important information quickly. People read it in the street, so it must be short, clear and easy to understand.",
    structure: [
      { step: "Headline", detail: "Write a short, big title that catches attention: LOST CAT!" },
      { step: "Description", detail: "Describe the animal or object: colour, size, special features." },
      { step: "When and where", detail: "Say the date and the place." },
      { step: "What to do", detail: "Tell readers what to do and how to contact you." },
    ],
    usefulLanguage: [
      { heading: "Describing", phrases: ["She is a small white cat with...","She is wearing a red collar.","She is ... years old."] },
      { heading: "Asking for help", phrases: ["Have you seen...?","If you see her, please call...","There is a reward for..."] },
    ],
    tips: [
      "Use capital letters only for the headline.",
      "Put the phone number where people can see it easily.",
      "Use imperatives: Please call..., Don't try to...",
    ],
  },

  "A1::A Birthday Card": {
    heading: "Writing a Birthday Card",
    textType: "Card",
    intro: "A birthday card is a short, warm message. You wish the person a happy birthday and tell them why they are special to you.",
    structure: [
      { step: "Greeting and wish", detail: "Start with Dear... and Happy birthday!" },
      { step: "Your good wishes", detail: "Say what you hope for them today." },
      { step: "A personal message", detail: "Say thank you or remember a happy moment together." },
      { step: "Ending", detail: "Finish with a warm closing like Lots of love." },
    ],
    usefulLanguage: [
      { heading: "Wishes", phrases: ["Happy birthday!","I hope you have a wonderful day.","Enjoy your special day!"] },
      { heading: "Warm endings", phrases: ["Lots of love,","Love and hugs,","Thinking of you,"] },
    ],
    tips: [
      "Keep it short and personal.",
      "Mention a special memory — it makes the card warmer.",
      "Exclamation marks are fine in cards!",
    ],
  },

  "A1::My Favourite Food": {
    heading: "Writing About Your Favourite Food",
    textType: "Descriptive Paragraph",
    intro: "In this text you describe a dish you love: what it is, how people make or eat it, and why it is special to you.",
    structure: [
      { step: "Introduce the food", detail: "Say what it is and where it comes from." },
      { step: "Describe it", detail: "Explain what is in it and how you make or cook it." },
      { step: "When you eat it", detail: "Say when, where and who you eat it with." },
      { step: "Why you love it", detail: "Give your reasons and your feelings." },
    ],
    usefulLanguage: [
      { heading: "Describing food", phrases: ["It's a traditional dish.","It's made with...","It tastes / smells / looks..."] },
      { heading: "Explaining steps", phrases: ["First, you...","Then / After that, you...","Finally, you add..."] },
    ],
    tips: [
      "Use the present simple with you to explain how to make something.",
      "Use adjectives for taste: delicious, sweet, spicy, salty.",
      "Finish with a question to the reader.",
    ],
  },

  "A1::An Online Advert: Selling My Bike": {
    heading: "Writing an Advert to Sell Something",
    textType: "Online Advert",
    intro: "An advert tells people about something you want to sell. It must give all the important information in a short and attractive way.",
    structure: [
      { step: "Title", detail: "Say what you are selling and the price." },
      { step: "Why you are selling", detail: "Give a short reason." },
      { step: "Description", detail: "Describe the item: age, condition, colour, features." },
      { step: "Who it's for", detail: "Say who the item is perfect for." },
      { step: "Contact details", detail: "Say where and when people can see it and how to contact you." },
    ],
    usefulLanguage: [
      { heading: "Describing the item", phrases: ["It's in very good condition.","It's two years old.","It has..."] },
      { heading: "Selling", phrases: ["It's perfect for...","The price includes...","Please call or send a message to..."] },
    ],
    tips: [
      "Put the price in the title.",
      "Be honest about the condition.",
      "Make contact details very clear.",
    ],
  },

  "A1::A Diary Entry: My Sunday": {
    heading: "Writing a Diary Entry",
    textType: "Diary Entry",
    intro: "A diary is a personal text about your day. You write what you did and how you felt, usually in the past simple.",
    structure: [
      { step: "Date and greeting", detail: "Write the date and Dear Diary." },
      { step: "Morning", detail: "Say what you did in the morning." },
      { step: "Afternoon", detail: "Describe the afternoon's activities." },
      { step: "Evening", detail: "Write about the evening and your feelings." },
      { step: "Ending", detail: "Say how you feel now or what happens tomorrow." },
    ],
    usefulLanguage: [
      { heading: "Past time", phrases: ["Today was...","In the morning, I went...","After that, we had..."] },
      { heading: "Feelings", phrases: ["It was a lovely / terrible day.","I was very tired / happy.","I laughed a lot."] },
    ],
    tips: [
      "Use the past simple for finished actions: went, had, played.",
      "Write in time order: morning, afternoon, evening.",
      "Say how you felt — a diary is personal.",
    ],
  },

  "A2::An Email Asking a Friend for Advice": {
    heading: "Writing an Email Asking for Advice",
    textType: "Informal Email",
    intro: "In this email you explain a problem or a decision to a friend and ask for their opinion.",
    structure: [
      { step: "Greeting", detail: "Say hello and ask a friendly question." },
      { step: "Reason for writing", detail: "Say that you need advice." },
      { step: "Explain the situation", detail: "Describe the problem and the options clearly." },
      { step: "Ask for advice", detail: "Ask direct questions." },
      { step: "Ending", detail: "Ask them to reply and say when you need an answer." },
    ],
    usefulLanguage: [
      { heading: "Asking for advice", phrases: ["I'm writing because I need your advice.","What do you think I should do?","Which ... do you think is better?"] },
      { heading: "Comparing options", phrases: ["The first option is...","It's cheaper / more expensive, but...","On the other hand..."] },
    ],
    tips: [
      "Explain both options with advantages and disadvantages.",
      "Use comparatives: cheaper, more interesting, better.",
      "End with a clear question.",
    ],
  },

  "A2::A Story: A Terrible Morning": {
    heading: "Writing a Short Story",
    textType: "Narrative",
    intro: "A story describes a series of events in the past. A good story has a clear beginning, a problem and an ending — sometimes with a surprise.",
    structure: [
      { step: "Beginning", detail: "Set the scene: when, where and who." },
      { step: "The problem", detail: "Describe what went wrong." },
      { step: "Events", detail: "Tell what happened next, in order." },
      { step: "Ending", detail: "Explain how the story finished — a surprise ending is great." },
    ],
    usefulLanguage: [
      { heading: "Sequencing", phrases: ["First, ... Then, ...","Finally, ...","A week later, ..."] },
      { heading: "Past tenses", phrases: ["When I woke up, it was...","While we were driving, ...","I was getting more and more nervous."] },
    ],
    tips: [
      "Use the past simple for main events and the past continuous for background.",
      "Include feelings: nervous, worried, relieved.",
      "Direct speech ('Don't worry,' she said.) makes a story more alive.",
    ],
  },

  "A2::A Restaurant Review": {
    heading: "Writing a Restaurant Review",
    textType: "Review",
    intro: "A review gives your opinion about a place so that other people can decide if they want to go. It describes good and bad points and gives a recommendation.",
    structure: [
      { step: "Introduction", detail: "Say the name, where it is, when you went and why." },
      { step: "Atmosphere", detail: "Describe what the place looks and feels like." },
      { step: "Food", detail: "Describe what you ate and how good it was." },
      { step: "Service and prices", detail: "Comment on the staff and the cost." },
      { step: "Recommendation", detail: "Say who you would recommend it to." },
    ],
    usefulLanguage: [
      { heading: "Positive opinions", phrases: ["The atmosphere was lovely.","It was the best I've ever eaten.","The prices are reasonable."] },
      { heading: "Negative points and advice", phrases: ["..., but the service was quite slow.","I would definitely recommend...","Don't go if..."] },
    ],
    tips: [
      "Include both positive and negative points — it makes your review more believable.",
      "Use interesting adjectives: crispy, fresh, cosy, friendly.",
      "Give a star rating at the top.",
    ],
  },

  "A2::An Apology Message to a Friend": {
    heading: "Writing an Apology to a Friend",
    textType: "Informal Message",
    intro: "An apology message says sorry for something you did or didn't do. You explain why it happened and offer to make things better.",
    structure: [
      { step: "Say sorry", detail: "Apologise clearly at the beginning." },
      { step: "Explain", detail: "Say what happened and why." },
      { step: "Show you care", detail: "Say something positive about the other person." },
      { step: "Make it better", detail: "Offer something to make up for it." },
      { step: "Ending", detail: "Apologise again and finish warmly." },
    ],
    usefulLanguage: [
      { heading: "Apologising", phrases: ["I'm really sorry I...","I feel terrible.","Sorry again."] },
      { heading: "Making it better", phrases: ["Can I make it up to you?","Let me take you out for...","I promise I'll..."] },
    ],
    tips: [
      "Apologise at the start, not only at the end.",
      "Give a reason, but don't make too many excuses.",
      "Offer a solution to show you really mean it.",
    ],
  },

  "A2::A Blog Post: My First Week at a New School": {
    heading: "Writing a Blog Post",
    textType: "Blog Post",
    intro: "A blog post is a personal, chatty text for readers online. You share your experiences and feelings and often ask readers to comment.",
    structure: [
      { step: "Catchy title", detail: "Write a short title that says what the post is about." },
      { step: "Introduction", detail: "Talk to your readers and give the background." },
      { step: "Main experiences", detail: "Describe what happened, good and bad." },
      { step: "Your feelings", detail: "Say how you feel now." },
      { step: "Ending", detail: "Ask your readers a question." },
    ],
    usefulLanguage: [
      { heading: "Chatty style", phrases: ["So, I've survived...","As some of you know, ...","Let's just say..."] },
      { heading: "Talking to readers", phrases: ["Has anyone else ever...?","Tell me about it in the comments!","What do you think?"] },
    ],
    tips: [
      "Write as if you are talking to a friend.",
      "Use the present perfect for recent experiences: I've joined, I've met.",
      "Short paragraphs are easier to read online.",
    ],
  },

  "A2::A Notice: Lost Property": {
    heading: "Writing a Notice",
    textType: "Notice",
    intro: "A notice is a short public text that gives information or instructions to a group of people. Its language is clear and quite formal.",
    structure: [
      { step: "Heading", detail: "Write a short, clear title in capital letters." },
      { step: "What and where", detail: "Say what was found, where and when." },
      { step: "Description", detail: "Describe the item without giving every detail." },
      { step: "What to do", detail: "Explain how and when people can collect it." },
      { step: "Extra information", detail: "Add any important rules or deadlines." },
    ],
    usefulLanguage: [
      { heading: "Giving information", phrases: ["A black backpack was found in...","The desk is open from... to...","Please note: ..."] },
      { heading: "Instructions", phrases: ["If this ... belongs to you, please...","You will need to...","Students are reminded to..."] },
    ],
    tips: [
      "Use the passive (was found, will be sent) — it sounds more formal.",
      "Don't describe everything — the owner must prove the item is theirs.",
      "Always include times, dates and places.",
    ],
  },

  "A2::An Email to a Teacher Explaining an Absence": {
    heading: "Writing an Email to a Teacher",
    textType: "Semi-formal Email",
    intro: "This email to a teacher is polite and clear. You explain why you missed something and ask about what you need to do next.",
    structure: [
      { step: "Subject line", detail: "Write a short subject that explains the email." },
      { step: "Greeting and reason", detail: "Use Dear + title + surname and say why you are writing." },
      { step: "Explanation", detail: "Explain what happened briefly." },
      { step: "Requests", detail: "Ask polite questions about work you missed." },
      { step: "Ending", detail: "Thank the teacher and sign off politely." },
    ],
    usefulLanguage: [
      { heading: "Explaining", phrases: ["I'm writing to tell you that...","I'm sorry for missing...","I have attached..."] },
      { heading: "Polite requests", phrases: ["Could you please tell me...?","Is it possible to...?","Thank you for your understanding."] },
    ],
    tips: [
      "Use Mr / Mrs / Ms + surname, not the teacher's first name.",
      "Don't use emojis or very informal language.",
      "Keep the explanation short — focus on the requests.",
    ],
  },

  "A2::Describing a Festival in My Country": {
    heading: "Describing a Festival",
    textType: "Descriptive Article",
    intro: "In this text you describe a festival or celebration: when it happens, what people do and why it is important.",
    structure: [
      { step: "Introduce the festival", detail: "Give its name and say when it takes place." },
      { step: "Traditions", detail: "Describe what people do, wear and say." },
      { step: "Food", detail: "Write about special food or drinks." },
      { step: "Other activities", detail: "Mention travel, visits or events." },
      { step: "Personal opinion", detail: "Say what the festival means to you." },
    ],
    usefulLanguage: [
      { heading: "Describing traditions", phrases: ["It takes place in / at...","On the first day, people...","It is also known as..."] },
      { heading: "Explaining", phrases: ["That's why...","It's a time to...","The best thing about it is..."] },
    ],
    tips: [
      "Use the present simple for traditions that happen every year.",
      "Explain words your reader may not know.",
      "Add your personal feelings at the end.",
    ],
  },

  "A2::Then and Now: How My Town Has Changed": {
    heading: "Writing About Changes: Then and Now",
    textType: "Descriptive Essay",
    intro: "In this text you compare a place in the past with the same place today, and describe positive and negative changes.",
    structure: [
      { step: "Introduction", detail: "Introduce the place and say that it has changed." },
      { step: "In the past", detail: "Describe what it was like before." },
      { step: "Now", detail: "Describe what it is like today." },
      { step: "Good and bad changes", detail: "Give positive and negative effects." },
      { step: "Conclusion", detail: "Give your personal feelings." },
    ],
    usefulLanguage: [
      { heading: "The past", phrases: ["When I was a child, ...","There were only a few...","We used to..."] },
      { heading: "Change", phrases: ["It has changed a lot.","Now, there are dozens of...","Houses are much more expensive than before."] },
    ],
    tips: [
      "Use used to and the past simple for the past, the present simple for now.",
      "Use the present perfect for changes: has changed, have sold.",
      "Give both sides — positive and negative changes.",
    ],
  },

  "A2::Instructions: A Simple Recipe": {
    heading: "Writing Instructions: A Recipe",
    textType: "Instructions",
    intro: "A recipe tells the reader exactly how to make something. It lists the ingredients and gives the steps in order using imperatives.",
    structure: [
      { step: "Title", detail: "Say what the dish is and how many people it is for." },
      { step: "Introduction", detail: "One or two sentences to make the dish sound good." },
      { step: "Ingredients", detail: "List everything you need with amounts." },
      { step: "Method", detail: "Give numbered steps in the correct order." },
      { step: "Tip", detail: "Add a helpful extra piece of advice." },
    ],
    usefulLanguage: [
      { heading: "Imperatives", phrases: ["Peel the bananas.","Add the eggs.","Don't make them too big."] },
      { heading: "Sequencing", phrases: ["First, ...","..., then ...","Cook for about one minute."] },
    ],
    tips: [
      "Start each step with a verb: Add, Mix, Heat, Serve.",
      "Use numbers for the steps.",
      "Give exact amounts and times.",
    ],
  },

  "B1::A Story Ending with 'I'll Never Forget That Day'": {
    heading: "Writing a Story with a Given Ending",
    textType: "Narrative",
    intro: "In some exams you must write a story that ends with a given sentence. Plan your story so that everything leads naturally to that final line.",
    structure: [
      { step: "Opening", detail: "Set the scene and introduce the characters. Create atmosphere." },
      { step: "Build-up", detail: "Describe events that lead to a problem." },
      { step: "Climax", detail: "The most dramatic moment — show the characters' feelings." },
      { step: "Resolution", detail: "Explain how the problem was solved." },
      { step: "Final sentence", detail: "End with the exact sentence given in the task." },
    ],
    usefulLanguage: [
      { heading: "Narrative tenses", phrases: ["They were laughing as they climbed.","He had seen them earlier.","As soon as they reached the top, ..."] },
      { heading: "Creating tension", phrases: ["They could hardly see...","It was getting colder by the minute.","After what felt like hours, ..."] },
    ],
    tips: [
      "Plan the ending first, then work backwards.",
      "Use a mix of past simple, past continuous and past perfect.",
      "Include feelings and direct speech to bring the story to life.",
    ],
  },

  "B1::A Formal Email to a Language School": {
    heading: "Writing a Formal Email Asking for Information",
    textType: "Formal Email",
    intro: "A formal email to an organisation asks for specific information. It is polite, well organised and avoids informal language.",
    structure: [
      { step: "Greeting", detail: "Use Dear Sir or Madam if you don't know the name." },
      { step: "Reason for writing", detail: "Say why you are writing and where you saw the information." },
      { step: "Background", detail: "Give a little relevant information about yourself." },
      { step: "Questions", detail: "Ask your questions in separate paragraphs using linking words." },
      { step: "Closing", detail: "Use a formal closing sentence and Yours faithfully." },
    ],
    usefulLanguage: [
      { heading: "Polite requests", phrases: ["I would be grateful if you could...","Could you tell me whether...?","I would like to know..."] },
      { heading: "Organising", phrases: ["Firstly, ... Secondly, ...","Finally, ...","I look forward to receiving your reply."] },
    ],
    tips: [
      "Don't use contractions (I am, not I'm).",
      "Use indirect questions — they are more polite.",
      "Yours faithfully if you don't know the name; Yours sincerely if you do.",
    ],
  },

  "B1::A For and Against Essay: Homework": {
    heading: "Writing a For and Against Essay",
    textType: "Discursive Essay",
    intro: "A for and against essay looks at both sides of an issue in a balanced way before giving your own opinion in the conclusion.",
    structure: [
      { step: "Introduction", detail: "Introduce the topic and say there are different opinions." },
      { step: "Arguments for", detail: "Give two or three points on one side, with examples." },
      { step: "Arguments against", detail: "Give two or three points on the other side." },
      { step: "Your opinion", detail: "Say what you think — often a balanced view." },
      { step: "Conclusion", detail: "Summarise the main idea in one or two sentences." },
    ],
    usefulLanguage: [
      { heading: "Presenting both sides", phrases: ["On the one hand, ...","On the other hand, ...","Critics point out that..."] },
      { heading: "Opinion and conclusion", phrases: ["In my opinion, ...","To sum up, ...","There are good arguments on both sides."] },
    ],
    tips: [
      "Keep the body paragraphs balanced — similar length for each side.",
      "Don't give your opinion until the end.",
      "Use linking words: while, since, such as, however.",
    ],
  },

  "B1::A Review of a Mobile App": {
    heading: "Writing a Product or App Review",
    textType: "Review",
    intro: "A review describes a product and gives your honest opinion of it, so that readers can decide whether to buy or download it.",
    structure: [
      { step: "Introduction", detail: "Name the product and say why you got it." },
      { step: "Description", detail: "Explain what it does and how it works." },
      { step: "Positive points", detail: "Describe what you like, with examples." },
      { step: "Negative points", detail: "Describe any problems." },
      { step: "Recommendation", detail: "Say who you would recommend it to." },
    ],
    usefulLanguage: [
      { heading: "Describing", phrases: ["The idea is simple: ...","It turns ... into...","It's very easy to use."] },
      { heading: "Evaluating", phrases: ["I also like the fact that...","However, it isn't perfect.","I'd recommend it to anyone who..."] },
    ],
    tips: [
      "Use personal experience to make your review believable.",
      "Balance positive and negative points.",
      "Make your final recommendation clear.",
    ],
  },

  "B1::An Article: The Perfect Day Off": {
    heading: "Writing a Magazine Article",
    textType: "Article",
    intro: "An article is written for a magazine or website. It should be interesting and lively, speak directly to the reader and often uses headings.",
    structure: [
      { step: "Catchy title", detail: "Write a title that makes people want to read." },
      { step: "Introduction", detail: "Talk to the reader and introduce the topic, maybe with a question." },
      { step: "Main points", detail: "Give your ideas in short sections with headings." },
      { step: "Conclusion", detail: "Finish with a final thought or question to the reader." },
    ],
    usefulLanguage: [
      { heading: "Engaging the reader", phrases: ["We all look forward to...","How many of us actually...?","So why not give it a try?"] },
      { heading: "Giving advice", phrases: ["Start slowly.","Instead of..., try...","One of the best ways to... is..."] },
    ],
    tips: [
      "Use you to speak directly to the reader.",
      "Headings make an article easier to read.",
      "Use imperatives for tips: Try, Go, Call.",
    ],
  },

  "B1::A Letter to a Newspaper About Local Parks": {
    heading: "Writing a Letter to a Newspaper",
    textType: "Formal Letter",
    intro: "A letter to the editor responds to an article or a local issue. You describe a problem, give your opinion and suggest solutions.",
    structure: [
      { step: "Opening", detail: "Say what you are responding to and give your general opinion." },
      { step: "The problem", detail: "Describe the situation, using your own experience." },
      { step: "Solutions", detail: "Make two or three clear suggestions." },
      { step: "Conclusion", detail: "Explain why the issue is important and call for action." },
    ],
    usefulLanguage: [
      { heading: "Opinion", phrases: ["I am writing in response to...","I completely agree that...","I believe the council should..."] },
      { heading: "Suggestions", phrases: ["Firstly, ... should be repaired.","It would be a good idea to...","If ... doesn't act now, ..."] },
    ],
    tips: [
      "Use the passive for suggestions: should be repaired, should be installed.",
      "Personal experience makes your argument stronger.",
      "Keep a polite, formal tone even if you are angry.",
    ],
  },

  "B1::An Informal Email Giving Advice": {
    heading: "Writing an Email Giving Advice",
    textType: "Informal Email",
    intro: "In this email you reply to a friend who has a problem. You show sympathy and give practical advice in a friendly way.",
    structure: [
      { step: "Opening", detail: "Thank them for their email and show sympathy." },
      { step: "Advice 1", detail: "Give your first piece of advice with a reason." },
      { step: "Advice 2 and 3", detail: "Add more tips, using personal experience." },
      { step: "Ending", detail: "Encourage your friend and ask them to reply." },
    ],
    usefulLanguage: [
      { heading: "Giving advice", phrases: ["If I were you, I'd...","Why don't you...?","Whatever you do, don't..."] },
      { heading: "Showing sympathy", phrases: ["I'm sorry to hear...","I remember exactly how that feels.","I'm sure you'll do well."] },
    ],
    tips: [
      "Use a friendly, informal style with contractions.",
      "Explain why each piece of advice works.",
      "Use linking words: First of all, Secondly, Another thing...",
    ],
  },

  "B1::A Report on a School Trip": {
    heading: "Writing a Report",
    textType: "Report",
    intro: "A report gives factual information about something that happened and makes recommendations. It uses headings and a neutral, formal style.",
    structure: [
      { step: "Title and Introduction", detail: "State the purpose of the report and where the information comes from." },
      { step: "Positive aspects", detail: "Describe what went well, with facts or figures." },
      { step: "Problems", detail: "Describe what went wrong." },
      { step: "Recommendations", detail: "Suggest specific improvements." },
      { step: "Conclusion", detail: "Give an overall evaluation." },
    ],
    usefulLanguage: [
      { heading: "Introducing", phrases: ["The purpose of this report is to...","The information is based on...","Most students (82%) said..."] },
      { heading: "Recommending", phrases: ["I would recommend + -ing...","It would also be a good idea to...","Overall, the trip was a success."] },
    ],
    tips: [
      "Use headings for each section.",
      "Be objective — use facts and figures, not emotional language.",
      "Recommendations should be specific and practical.",
    ],
  },

  "B1::A Biography: Marie Curie": {
    heading: "Writing a Biography",
    textType: "Biography",
    intro: "A biography tells the story of a person's life in chronological order, focusing on the most important events and achievements.",
    structure: [
      { step: "Introduction", detail: "Say who the person is and why they are important." },
      { step: "Early life", detail: "Write about their birth, family and education." },
      { step: "Main achievements", detail: "Describe the key events of their career." },
      { step: "Difficulties", detail: "Mention challenges they faced and how they dealt with them." },
      { step: "Later life and legacy", detail: "Explain how they are remembered today." },
    ],
    usefulLanguage: [
      { heading: "Life events", phrases: ["She was born in... in...","At that time, ...","In 1903, they won..."] },
      { heading: "Achievements", phrases: ["She was the first woman to...","Despite..., she continued...","Today, she is remembered as..."] },
    ],
    tips: [
      "Use the past simple and put events in time order.",
      "Include dates, but don't just make a list of them.",
      "Choose the most important events — not every detail.",
    ],
  },

  "B1::A Job Application Email: Summer Volunteer": {
    heading: "Writing a Job or Volunteer Application",
    textType: "Application Email",
    intro: "An application email persuades the reader that you are the right person for a job or volunteer position. It is formal, positive and well organised.",
    structure: [
      { step: "Opening", detail: "Say which position you are applying for and where you saw it." },
      { step: "About you", detail: "Introduce yourself and explain your interest." },
      { step: "Experience", detail: "Describe relevant experience, even if it is not exactly the same." },
      { step: "Skills and qualities", detail: "Show why you would be good at the job." },
      { step: "Availability and closing", detail: "Say when you are available and end formally." },
    ],
    usefulLanguage: [
      { heading: "Applying", phrases: ["I am writing to apply for...","I am particularly interested in...","Please find my CV attached."] },
      { heading: "Selling yourself", phrases: ["I have some relevant experience.","I am used to working...","I would be very grateful for the opportunity to..."] },
    ],
    tips: [
      "Connect your experience to the job, even if it isn't the same.",
      "Show enthusiasm, but stay formal.",
      "Yours sincerely when you know the person's name.",
    ],
  },

  "B2::A Proposal for Improving Your Town": {
    heading: "Writing a Proposal",
    textType: "Proposal",
    intro: "A proposal suggests a plan or changes to someone in authority. It describes the current situation, makes recommendations and explains their benefits, using a formal style and headings.",
    structure: [
      { step: "Introduction", detail: "State the aim of the proposal and how you gathered information." },
      { step: "Current situation", detail: "Describe the problems clearly and objectively." },
      { step: "Recommendations", detail: "Suggest specific measures, often as bullet points." },
      { step: "Benefits", detail: "Explain how the changes would help." },
      { step: "Conclusion", detail: "Anticipate objections and make a final recommendation." },
    ],
    usefulLanguage: [
      { heading: "Proposing", phrases: ["The aim of this proposal is to...","In order to address these issues, ...","I would like to propose the following measures:"] },
      { heading: "Persuading", phrases: ["These changes would undoubtedly...","Experience from other towns suggests that...","I am convinced that the advantages would far outweigh..."] },
    ],
    tips: [
      "Proposals look to the future (would, could); reports look at the past.",
      "Use headings and bullet points.",
      "Show that you have considered possible objections.",
    ],
  },

  "B2::An Essay: Should Public Transport Be Free?": {
    heading: "Writing an Essay: Discussing a Question",
    textType: "Discursive Essay",
    intro: "This essay discusses a controversial question, considers arguments on both sides with evidence and reaches a reasoned conclusion.",
    structure: [
      { step: "Introduction", detail: "Present the topic with context and say what the essay will do." },
      { step: "Arguments for", detail: "Develop the strongest points in favour, with explanation." },
      { step: "Arguments against", detail: "Present counter-arguments and evidence." },
      { step: "Conclusion", detail: "Give your reasoned opinion, possibly with an alternative solution." },
    ],
    usefulLanguage: [
      { heading: "Presenting arguments", phrases: ["The most compelling argument in favour of ... is...","Supporters argue that...","Critics question whether..."] },
      { heading: "Concluding", phrases: ["On balance, I believe that...","Nevertheless, there are serious concerns.","... is likely to have a greater impact."] },
    ],
    tips: [
      "Support each argument with an explanation or example.",
      "Use formal linkers: thereby, nevertheless, furthermore.",
      "A strong conclusion may suggest a compromise or alternative.",
    ],
  },

  "B2::A Book Review": {
    heading: "Writing a Book Review",
    textType: "Review",
    intro: "A book review summarises the plot without giving away the ending, evaluates the strengths and weaknesses of the book and recommends it (or not) to particular readers.",
    structure: [
      { step: "Introduction", detail: "Give the title, author and a general impression." },
      { step: "Plot summary", detail: "Describe the setting and the main situation — no spoilers!" },
      { step: "Strengths", detail: "Comment on structure, characters, style." },
      { step: "Weaknesses", detail: "Mention any criticisms in a balanced way." },
      { step: "Recommendation", detail: "Say who would enjoy the book." },
    ],
    usefulLanguage: [
      { heading: "Describing", phrases: ["The story is set in...","Chapters alternate between...","The characters are richly drawn."] },
      { heading: "Evaluating", phrases: ["What makes the novel stand out is...","If I have one criticism, it is that...","It would appeal to anyone who..."] },
    ],
    tips: [
      "Use the present simple to summarise the plot.",
      "Never reveal the ending.",
      "Use precise adjectives: gripping, thought-provoking, neat, complex.",
    ],
  },

  "B2::A Letter of Recommendation": {
    heading: "Writing a Letter of Recommendation",
    textType: "Formal Letter",
    intro: "A letter of recommendation (a reference) describes someone's abilities and character to support their application for a job or course. It must be formal, positive and supported by examples.",
    structure: [
      { step: "Opening", detail: "Say who you are recommending, for what, and how you know them." },
      { step: "Skills and responsibilities", detail: "Describe their role and main strengths." },
      { step: "A specific example", detail: "Give one concrete situation that shows their qualities." },
      { step: "Personal qualities", detail: "Describe their character and how they work with others." },
      { step: "Closing", detail: "Give a strong final recommendation and offer further contact." },
    ],
    usefulLanguage: [
      { heading: "Recommending", phrases: ["I am writing to recommend...","I have no hesitation in recommending...","She would make a valuable contribution to..."] },
      { heading: "Describing qualities", phrases: ["She proved to be exceptionally...","What impressed me most was...","Her attention to detail was outstanding."] },
    ],
    tips: [
      "Use To whom it may concern when you don't know who will read it.",
      "Support every quality with evidence.",
      "Keep the tone positive and professional.",
    ],
  },

  "B2::An Article: The Art of Doing Nothing": {
    heading: "Writing an Opinion Article",
    textType: "Article",
    intro: "A B2-level article engages the reader with a lively style, presents an idea supported by evidence and leaves the reader with something to think about.",
    structure: [
      { step: "Title", detail: "A short, intriguing title." },
      { step: "Hook", detail: "Open with a question or surprising statement addressed to the reader." },
      { step: "Context", detail: "Explain the situation or common belief." },
      { step: "Development", detail: "Present evidence, examples and your argument." },
      { step: "Practical advice and ending", detail: "Give suggestions and finish with a memorable final line." },
    ],
    usefulLanguage: [
      { heading: "Engaging the reader", phrases: ["When did you last...?","If you can't remember, you're far from alone.","So how can we...?"] },
      { heading: "Presenting ideas", phrases: ["A growing body of research suggests that...","It's no coincidence that...","It turns out that..."] },
    ],
    tips: [
      "Use rhetorical questions to involve the reader.",
      "Mix short and long sentences for rhythm.",
      "End with a strong, memorable sentence.",
    ],
  },

  "B2::A Report on Workplace Wellbeing": {
    heading: "Writing a Formal Report",
    textType: "Report",
    intro: "A formal report presents the findings of an investigation clearly and objectively, then makes recommendations based on those findings.",
    structure: [
      { step: "Introduction", detail: "State the purpose and the source of information." },
      { step: "Findings", detail: "Present results, using figures, under clear headings." },
      { step: "Problems", detail: "Identify the main areas of concern." },
      { step: "Recommendations", detail: "Suggest specific actions, often in a list." },
      { step: "Conclusion", detail: "Summarise and state the expected outcome." },
    ],
    usefulLanguage: [
      { heading: "Reporting findings", phrases: ["This report sets out to...","Almost half (47%) said...","On the positive side, ..."] },
      { heading: "Recommending", phrases: ["In light of these findings, it is recommended that...","... is a cause for concern.","If the measures are implemented, we can expect..."] },
    ],
    tips: [
      "Use an impersonal style: it is recommended that..., the results show...",
      "Support each point with data.",
      "The subjunctive (that a policy be introduced) sounds very formal.",
    ],
  },

  "B2::A Letter to the Editor About Tourism": {
    heading: "Writing a Persuasive Letter to the Editor",
    textType: "Formal Letter",
    intro: "A persuasive letter to the editor responds to a public issue. It acknowledges the other side, presents a clear argument with evidence and calls for specific action.",
    structure: [
      { step: "Opening", detail: "Refer to the article and state your position." },
      { step: "Background", detail: "Show your connection to the issue and acknowledge positive points." },
      { step: "Main argument", detail: "Develop your strongest concern with evidence." },
      { step: "Alternative", detail: "Suggest a better approach." },
      { step: "Call to action", detail: "Say clearly what you want to happen." },
    ],
    usefulLanguage: [
      { heading: "Responding and conceding", phrases: ["I read with great interest your recent article...","While I appreciate..., I believe...","Tourism has undoubtedly..."] },
      { heading: "Persuading", phrases: ["What concerns me most is...","Rather than..., the council should...","I urge the council to..."] },
    ],
    tips: [
      "Acknowledge the opposing view — it makes you sound reasonable.",
      "Use emphatic structures: What concerns me most is...",
      "End with a specific, clear request.",
    ],
  },

  "B2::A Problem-Solution Essay: Food Waste": {
    heading: "Writing a Problem-Solution Essay",
    textType: "Problem-Solution Essay",
    intro: "This essay identifies the causes of a problem and proposes practical solutions, usually considering different groups who could take action.",
    structure: [
      { step: "Introduction", detail: "Present the problem, show why it matters and outline the essay." },
      { step: "Causes", detail: "Explain the main causes, with examples." },
      { step: "Solutions (large scale)", detail: "Suggest what governments or businesses could do." },
      { step: "Solutions (individual)", detail: "Suggest what ordinary people could do." },
      { step: "Conclusion", detail: "Summarise and give a final, balanced statement." },
    ],
    usefulLanguage: [
      { heading: "Causes", phrases: ["The causes vary depending on...","This is due to...","By contrast, in wealthier countries..."] },
      { heading: "Solutions", phrases: ["Tackling this issue requires...","Governments could invest in...","Individuals, too, have an important role to play."] },
    ],
    tips: [
      "Link each solution clearly to a cause.",
      "Use modal verbs for suggestions: could, should, would.",
      "Include a real example or statistic if you can.",
    ],
  },

  "B2::A Narrative: A Turning Point": {
    heading: "Writing a Narrative About a Turning Point",
    textType: "Narrative",
    intro: "A B2-level narrative tells a meaningful story with well-developed characters, a clear structure and a range of narrative tenses and descriptive language.",
    structure: [
      { step: "Background", detail: "Describe the situation before the turning point." },
      { step: "The setting", detail: "Explain where and how the important events began." },
      { step: "Development", detail: "Introduce a key character and show how the narrator changes." },
      { step: "Turning point", detail: "Describe the moment of decision." },
      { step: "Ending", detail: "Show the consequences — ideally with a satisfying final line." },
    ],
    usefulLanguage: [
      { heading: "Narrative tenses", phrases: ["I had always believed that...","She had been in hospital for months.","I was witnessing..."] },
      { heading: "Description and reflection", phrases: ["I was struck by the way...","For the first time in my life, ...","To my surprise, ..."] },
    ],
    tips: [
      "Use the past perfect to show what happened before the main events.",
      "Show character through actions and dialogue, not only description.",
      "Link the ending back to something from earlier in the story.",
    ],
  },

  "B2::A Speech Welcoming New Students": {
    heading: "Writing a Speech",
    textType: "Speech",
    intro: "A speech is written to be heard, not read. It addresses the audience directly, uses a personal tone and is organised so listeners can follow it easily.",
    structure: [
      { step: "Greeting", detail: "Welcome the audience and introduce yourself." },
      { step: "Connection", detail: "Share a personal experience the audience can relate to." },
      { step: "Main points", detail: "Give two to four clearly signposted points." },
      { step: "Conclusion", detail: "Sum up and finish with a warm or memorable line." },
    ],
    usefulLanguage: [
      { heading: "Addressing the audience", phrases: ["Good morning, everyone, and welcome to...","On behalf of..., I'd like to...","Let me reassure you: ..."] },
      { heading: "Signposting", phrases: ["So, what advice can I give you?","First, ... Second, ...","Finally, ... Once again, ..."] },
    ],
    tips: [
      "Signpost clearly — listeners can't go back and re-read.",
      "A little humour helps the audience relax.",
      "Use you and we to create a connection.",
    ],
  },

};
