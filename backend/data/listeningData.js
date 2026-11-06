// Listening konuları: her konu bir ses kaydı (TTS ile üretilir, Cloudinary'de durur) + 5 çoktan seçmeli soru.
//
// Alanlar:
// - slug: ses dosyasının adı. Cloudinary public ID'si: topics/listening/<seviye>/<slug> (resource_type: video)
// - speakers: konuşmacı kodu -> { name, voice }. voice = Piper sesi: cori, jenny (kadın), alan, northern (erkek)
//   — bkz. utils/generateListeningAudio.js > VOICES.
//   Tek konuşmacılı (monolog) kayıtlarda transkriptte isim gösterilmez.
// - script: [konuşmacı kodu, metin] satırları; ses bu sırayla üretilip birleştirilir.
// - questions: [soru, seçenekler, doğru cevap, açıklama] (Reading ile aynı şekil).
//
// Metni değiştirirsen sesini yeniden üretmek için: npm run generate:listening -- --force <slug>

const LISTENING_DATA = {
  A1: [
    {
      slug: 'meeting-a-new-classmate',
      title: 'Meeting a New Classmate',
      speakers: { A: { name: 'Anna', voice: 'cori' }, T: { name: 'Tom', voice: 'alan' } },
      script: [
        ['A', 'Hi! Are you new here?'],
        ['T', "Yes, I am. It's my first day. My name is Tom."],
        ['A', "Nice to meet you, Tom. I'm Anna. Where are you from?"],
        ['T', "I'm from Canada, from Toronto. And you?"],
        ['A', "I'm from Italy. I live near the school, on Green Street."],
        ['T', 'Oh, I live on Green Street too! At number twelve.'],
        ['A', "Really? I'm at number twenty. We're neighbours!"],
        ['T', 'Great! What time does the class start?'],
        ['A', "At nine o'clock. Our teacher is Mr. Brown. He's very nice."],
        ['T', 'Good. Do you want to have lunch together later?'],
        ['A', 'Sure! The cafeteria is on the second floor.'],
      ],
      questions: [
        ['Where is Tom from?', ['Italy', 'Canada', 'England', 'Spain'], 'Canada', "Tom says 'I'm from Canada, from Toronto.'"],
        ['Where does Anna live?', ['On Green Street', 'On Park Road', 'Near the station', 'In Toronto'], 'On Green Street', "Anna says 'I live near the school, on Green Street.'"],
        ["What is Tom's house number?", ['Two', 'Twenty', 'Twelve', 'Ten'], 'Twelve', "Tom says 'I live on Green Street too! At number twelve.'"],
        ['What time does the class start?', ["At eight o'clock", "At ten o'clock", "At nine o'clock", 'At half past nine'], "At nine o'clock", "Anna says 'At nine o'clock.'"],
        ['Where is the cafeteria?', ['On the first floor', 'On the second floor', 'Next to the classroom', 'On Green Street'], 'On the second floor', "Anna says 'The cafeteria is on the second floor.'"],
      ],
    },
    {
      slug: 'my-daily-routine',
      title: 'My Daily Routine',
      speakers: { S: { name: 'Sam', voice: 'northern' } },
      script: [
        [
          'S',
          "Hello! My name is Sam and I'm a nurse. I work at a big hospital in the city. Every day, I get up at six o'clock. I have a shower and I eat breakfast. I usually have eggs and a cup of coffee. I go to work by bus. The bus takes thirty minutes. I start work at half past seven. At work, I help the doctors and I talk to the patients. I have lunch at one o'clock with my friend Laura. She is a nurse too. I finish work at four o'clock. In the evening, I cook dinner and I watch TV. I don't watch TV for a long time because I'm always tired. I go to bed at ten o'clock. On Saturdays and Sundays, I don't work. I play tennis and I visit my parents.",
        ],
      ],
      questions: [
        ["What is Sam's job?", ['A doctor', 'A teacher', 'A nurse', 'A bus driver'], 'A nurse', "Sam says 'I'm a nurse.'"],
        ['What time does Sam get up?', ["At six o'clock", "At seven o'clock", 'At half past six', "At five o'clock"], "At six o'clock", "Sam says 'Every day, I get up at six o'clock.'"],
        ['How does Sam go to work?', ['By car', 'By bike', 'On foot', 'By bus'], 'By bus', "Sam says 'I go to work by bus.'"],
        ['Who is Laura?', ["Sam's sister", 'A friend and a nurse', 'A doctor', 'A patient'], 'A friend and a nurse', "Sam has lunch 'with my friend Laura. She is a nurse too.'"],
        ['What does Sam do at the weekend?', ['He works at the hospital', 'He plays tennis and visits his parents', 'He watches TV all day', 'He cooks for his friends'], 'He plays tennis and visits his parents', "Sam says 'I play tennis and I visit my parents.'"],
      ],
    },
    {
      slug: 'at-the-cafe',
      title: 'At the Café',
      speakers: { W: { name: 'Waiter', voice: 'alan' }, C: { name: 'Customer', voice: 'jenny' } },
      script: [
        ['W', 'Good morning! What would you like?'],
        ['C', "Good morning. Can I have a cup of tea, please?"],
        ['W', 'Of course. With milk?'],
        ['C', 'Yes, please. No sugar.'],
        ['W', 'Anything to eat?'],
        ['C', "Hmm... Do you have chocolate cake?"],
        ['W', "Sorry, we don't have chocolate cake today. We have apple cake and cheese sandwiches."],
        ['C', "OK, an apple cake, please. How much is that?"],
        ['W', "The tea is two pounds and the cake is three pounds fifty. So that's five pounds fifty."],
        ['C', 'Here you are. Can I sit by the window?'],
        ['W', 'Yes, of course. I can bring your order to the table.'],
      ],
      questions: [
        ['What drink does the customer order?', ['Coffee', 'Orange juice', 'Tea', 'Hot chocolate'], 'Tea', "The customer says 'Can I have a cup of tea, please?'"],
        ['How does the customer like her drink?', ['With milk and sugar', 'With milk, no sugar', 'With sugar, no milk', 'With lemon'], 'With milk, no sugar', "She says 'Yes, please. No sugar.' when the waiter asks 'With milk?'"],
        ["Why doesn't she get chocolate cake?", ['It is too expensive', "The café doesn't have it today", "She doesn't like it", 'It is finished at lunch'], "The café doesn't have it today", "The waiter says 'Sorry, we don't have chocolate cake today.'"],
        ['How much does she pay in total?', ['Two pounds', 'Three pounds fifty', 'Five pounds fifty', 'Five pounds'], 'Five pounds fifty', "The waiter says 'So that's five pounds fifty.'"],
        ['Where does she want to sit?', ['Outside', 'By the window', 'Near the door', 'At the bar'], 'By the window', "She asks 'Can I sit by the window?'"],
      ],
    },
    {
      slug: 'my-family-photo',
      title: 'My Family Photo',
      speakers: { L: { name: 'Lucy', voice: 'cori' } },
      script: [
        [
          'L',
          "This is a photo of my family. It's from my birthday last year. The tall man with glasses is my dad. His name is David and he's a taxi driver. The woman next to him is my mum, Helen. She has long red hair, like me. She's a teacher at a primary school. The little boy with the football is my brother, Jack. He's seven years old and he loves sport. The old woman in the chair is my grandma. She's eighty, but she's very active. She walks in the park every morning. And the dog in the photo is our dog, Max. He's brown and white, and he's very friendly. I'm the girl in the blue dress, in the middle. I'm twelve in this photo. I love this picture because we are all happy.",
        ],
      ],
      questions: [
        ["What does Lucy's dad do?", ['He is a teacher', 'He is a taxi driver', 'He is a doctor', 'He is a football player'], 'He is a taxi driver', "Lucy says 'he's a taxi driver.'"],
        ["What is special about Lucy's mum's hair?", ['It is short and black', 'It is long and red, like Lucy\'s', 'It is grey', 'It is blonde'], "It is long and red, like Lucy's", "Lucy says 'She has long red hair, like me.'"],
        ['How old is Jack?', ['Five', 'Seven', 'Twelve', 'Eight'], 'Seven', "Lucy says 'He's seven years old.'"],
        ['What does Grandma do every morning?', ['She reads the newspaper', 'She cooks breakfast', 'She walks in the park', 'She plays with Max'], 'She walks in the park', "Lucy says 'She walks in the park every morning.'"],
        ['What is Lucy wearing in the photo?', ['A red dress', 'A blue dress', 'A football shirt', 'Glasses'], 'A blue dress', "Lucy says 'I'm the girl in the blue dress.'"],
      ],
    },
    {
      slug: 'where-is-the-bank',
      title: 'Where Is the Bank?',
      speakers: { M: { name: 'Man', voice: 'northern' }, W: { name: 'Woman', voice: 'jenny' } },
      script: [
        ['M', 'Excuse me. Is there a bank near here?'],
        ['W', "Yes, there's a bank on King Street. It's not far."],
        ['M', 'How do I get there?'],
        ['W', "Go straight on, past the supermarket. Then turn left at the traffic lights. That's King Street."],
        ['M', 'Turn left at the traffic lights. OK.'],
        ['W', "The bank is on the right, between the post office and a small bookshop."],
        ['M', 'Is it open now?'],
        ['W', "Yes, it's open until five o'clock today."],
        ['M', 'Great. Is it far to walk?'],
        ['W', 'No, about five minutes.'],
        ['M', 'Thank you very much!'],
        ['W', "You're welcome."],
      ],
      questions: [
        ['What street is the bank on?', ['Green Street', 'King Street', 'Park Road', 'High Street'], 'King Street', "The woman says 'there's a bank on King Street.'"],
        ['What does the man do at the traffic lights?', ['Turn right', 'Go straight on', 'Turn left', 'Cross the road'], 'Turn left', "The woman says 'turn left at the traffic lights.'"],
        ['What is next to the bank?', ['A supermarket and a café', 'A post office and a bookshop', 'A school and a park', 'Two shops'], 'A post office and a bookshop', "The bank is 'between the post office and a small bookshop.'"],
        ['When does the bank close today?', ["At four o'clock", "At six o'clock", "At five o'clock", 'At half past five'], "At five o'clock", "The woman says 'it's open until five o'clock today.'"],
        ['How long is the walk to the bank?', ['About two minutes', 'About five minutes', 'About fifteen minutes', 'About half an hour'], 'About five minutes', "The woman says 'No, about five minutes.'"],
      ],
    },
  ],

  A2: [
    {
      slug: 'weekend-plans',
      title: 'Weekend Plans',
      speakers: { J: { name: 'Jess', voice: 'cori' }, M: { name: 'Mark', voice: 'alan' } },
      script: [
        ['J', 'Hi Mark! Are you doing anything this weekend?'],
        ['M', "Not much. On Saturday morning I'm going to clean my flat. It's a mess! Why?"],
        ['J', "Some friends and I are going to the beach on Sunday. Do you want to come?"],
        ['M', "That sounds great! How are you getting there?"],
        ['J', "We're going by train. It leaves at half past eight, so it's an early start."],
        ['M', "Half past eight on a Sunday? Wow. What's the weather going to be like?"],
        ['J', "The forecast says it's going to be sunny and warm, about twenty-five degrees."],
        ['M', 'Perfect. Should I bring anything?'],
        ['J', "We're having a picnic, so maybe bring some drinks. Emma's making sandwiches."],
        ['M', "OK, I'll bring drinks and some fruit. Where should we meet?"],
        ['J', "Let's meet at the station café at eight fifteen."],
        ['M', "Great. See you there — and don't forget your sun cream!"],
      ],
      questions: [
        ['What is Mark going to do on Saturday morning?', ['Go to the beach', 'Clean his flat', 'Meet Emma', 'Buy a train ticket'], 'Clean his flat', "Mark says 'On Saturday morning I'm going to clean my flat.'"],
        ['How are they travelling to the beach?', ['By car', 'By bus', 'By train', 'By bike'], 'By train', "Jess says 'We're going by train.'"],
        ['What is the weather going to be like?', ['Cloudy and cool', 'Rainy', 'Sunny and warm', 'Windy'], 'Sunny and warm', "Jess says 'it's going to be sunny and warm, about twenty-five degrees.'"],
        ['What is Mark going to bring?', ['Sandwiches', 'Drinks and fruit', 'A cake', 'Sun cream for everyone'], 'Drinks and fruit', "Mark says 'I'll bring drinks and some fruit.'"],
        ['What time are they meeting?', ['At half past eight', 'At eight o\'clock', 'At eight fifteen', 'At nine o\'clock'], 'At eight fifteen', "Jess says 'Let's meet at the station café at eight fifteen.'"],
      ],
    },
    {
      slug: 'a-message-from-the-dentist',
      title: 'A Message from the Dentist',
      speakers: { R: { name: 'Receptionist', voice: 'jenny' } },
      script: [
        [
          'R',
          "Hello, this is a message for Mr. Daniel Carter. This is Sarah calling from Smile Dental Clinic. I'm calling about your appointment with Dr. Patel on Thursday the fourteenth at ten thirty. I'm afraid Dr. Patel is ill this week, so we need to change the time of your appointment. We have two free times next week: Monday at nine o'clock in the morning, or Wednesday at three fifteen in the afternoon. Could you please call us back and tell us which time is better for you? Our phone number is 0 2 0, 7 9 4 6, 3 3 8 1. The clinic is open from eight a.m. to six p.m., Monday to Friday. Also, please remember to bring your new insurance card with you. We're sorry about the change. Thank you, and have a nice day.",
        ],
      ],
      questions: [
        ['Why is the receptionist calling?', ['To remind Mr. Carter about a payment', 'To change his appointment', 'To cancel his insurance', 'To ask about his health'], 'To change his appointment', "Sarah says 'we need to change the time of your appointment.'"],
        ['Why does the appointment need to change?', ['The clinic is closed', 'Mr. Carter is ill', 'Dr. Patel is ill', 'The clinic is moving'], 'Dr. Patel is ill', "Sarah says 'Dr. Patel is ill this week.'"],
        ['When was the original appointment?', ['Monday at nine o\'clock', 'Thursday at ten thirty', 'Wednesday at three fifteen', 'Friday at ten o\'clock'], 'Thursday at ten thirty', "The appointment was 'on Thursday the fourteenth at ten thirty.'"],
        ['Which is one of the new times offered?', ['Wednesday at three fifteen', 'Tuesday at nine o\'clock', 'Friday at three o\'clock', 'Thursday at ten thirty'], 'Wednesday at three fifteen', "The free times are 'Monday at nine o'clock... or Wednesday at three fifteen.'"],
        ['What must Mr. Carter bring?', ['His passport', 'His old appointment card', 'His new insurance card', 'His medicine'], 'His new insurance card', "Sarah says 'please remember to bring your new insurance card.'"],
      ],
    },
    {
      slug: 'buying-a-train-ticket',
      title: 'Buying a Train Ticket',
      speakers: { P: { name: 'Passenger', voice: 'alan' }, C: { name: 'Clerk', voice: 'cori' } },
      script: [
        ['P', "Hello. I'd like a ticket to Manchester, please."],
        ['C', 'Single or return?'],
        ['P', "Return, please. I'm coming back on Friday."],
        ['C', 'And when do you want to travel today?'],
        ['P', "As soon as possible. What time is the next train?"],
        ['C', "The next one is at eleven forty, but it's a slow train. It stops at every station and takes three hours. There's a fast train at twelve fifteen. That one only takes two hours."],
        ['P', "Then I'll take the twelve fifteen. How much is it?"],
        ['C', "A standard return is sixty-four pounds. Do you have a railcard?"],
        ['P', 'Yes, I have a student railcard.'],
        ['C', "Great, then it's forty-two pounds."],
        ['P', 'Can I pay by card?'],
        ['C', "Of course. Your train leaves from platform seven."],
      ],
      questions: [
        ['Where is the passenger going?', ['London', 'Liverpool', 'Manchester', 'Leeds'], 'Manchester', "The passenger says 'I'd like a ticket to Manchester.'"],
        ['When is the passenger coming back?', ['Tomorrow', 'On Friday', 'On Sunday', 'Next week'], 'On Friday', "The passenger says 'I'm coming back on Friday.'"],
        ['Why does he choose the twelve fifteen train?', ['It is cheaper', 'It is faster', 'It is less busy', 'It leaves earlier'], 'It is faster', "The twelve fifteen 'only takes two hours', while the slow train takes three."],
        ['How much does he pay?', ['Sixty-four pounds', 'Forty-two pounds', 'Thirty-two pounds', 'Fifty pounds'], 'Forty-two pounds', "With the student railcard, the clerk says 'then it's forty-two pounds.'"],
        ['Which platform does the train leave from?', ['Platform two', 'Platform eleven', 'Platform seven', 'Platform four'], 'Platform seven', "The clerk says 'Your train leaves from platform seven.'"],
      ],
    },
    {
      slug: 'my-last-holiday',
      title: 'My Last Holiday',
      speakers: { K: { name: 'Kate', voice: 'cori' } },
      script: [
        [
          'K',
          "Last summer, I went to Portugal with my best friend, Mia. We stayed in Lisbon for a week. Our hotel was small but very clean, and it was only ten minutes from the old town. On the first day, we walked around the city and took lots of photos. Lisbon has a lot of hills, so our legs were very tired in the evening! On the third day, we took a train to the beach. The water was cold, but the weather was beautiful. We also ate a lot of fish, and I tried the famous custard tarts. They were delicious — I ate six in one day! The only problem was on the last day. Mia lost her phone in a taxi. We called the taxi company and, luckily, the driver brought it back to our hotel. It was a wonderful holiday, and I want to go back next year.",
        ],
      ],
      questions: [
        ['Who did Kate travel with?', ['Her sister', 'Her best friend', 'Her parents', 'Alone'], 'Her best friend', "Kate says 'I went to Portugal with my best friend, Mia.'"],
        ['Why were their legs tired?', ['They went hiking in the mountains', 'Lisbon has a lot of hills', 'They walked to the beach', 'Their hotel was far from the city'], 'Lisbon has a lot of hills', "Kate says 'Lisbon has a lot of hills, so our legs were very tired.'"],
        ['What was the water like at the beach?', ['Warm', 'Dirty', 'Cold', 'Very deep'], 'Cold', "Kate says 'The water was cold, but the weather was beautiful.'"],
        ['How many custard tarts did Kate eat in one day?', ['Two', 'Four', 'Six', 'Ten'], 'Six', "Kate says 'I ate six in one day!'"],
        ["How did Mia get her phone back?", ['She found it in the hotel', 'The taxi driver brought it to the hotel', 'A police officer found it', 'She bought a new one'], 'The taxi driver brought it to the hotel', "Kate says 'the driver brought it back to our hotel.'"],
      ],
    },
    {
      slug: 'the-weekend-weather-forecast',
      title: 'The Weekend Weather Forecast',
      speakers: { F: { name: 'Presenter', voice: 'northern' } },
      script: [
        [
          'F',
          "Good evening, and here is the weather forecast for the weekend. Tomorrow, Saturday, will start cloudy in the north, with some rain in the morning. In the afternoon, the rain will stop and it will be dry, but quite cool, with temperatures of around twelve degrees. In the south, it will be much nicer: sunny all day, with temperatures of up to nineteen degrees. On Sunday, everything changes. A strong wind will come from the west, and there will be heavy rain across the whole country in the afternoon. So if you're planning a picnic or a day at the beach, Saturday is the better day. Drivers should be careful on Sunday evening, because there may be fog on the roads in the east. Next week will be warmer and drier. Have a good weekend!",
        ],
      ],
      questions: [
        ['What will the weather be like on Saturday morning in the north?', ['Sunny', 'Cloudy with some rain', 'Foggy', 'Windy and dry'], 'Cloudy with some rain', "Saturday 'will start cloudy in the north, with some rain in the morning.'"],
        ['What will the highest temperature be in the south on Saturday?', ['Twelve degrees', 'Fifteen degrees', 'Nineteen degrees', 'Twenty-five degrees'], 'Nineteen degrees', "In the south: 'temperatures of up to nineteen degrees.'"],
        ['What will happen on Sunday afternoon?', ['It will be sunny everywhere', 'There will be heavy rain across the country', 'It will snow in the north', 'The wind will stop'], 'There will be heavy rain across the country', "'there will be heavy rain across the whole country in the afternoon.'"],
        ['Which day is better for a picnic?', ['Saturday', 'Sunday', 'Both days', 'Neither day'], 'Saturday', "The presenter says 'Saturday is the better day.'"],
        ['Why should drivers be careful on Sunday evening?', ['There may be ice', 'There may be fog in the east', 'There will be snow', 'The roads will be busy'], 'There may be fog in the east', "'there may be fog on the roads in the east.'"],
      ],
    },
  ],

  B1: [
    {
      slug: 'a-job-interview',
      title: 'A Job Interview',
      speakers: { I: { name: 'Interviewer', voice: 'northern' }, C: { name: 'Clara', voice: 'cori' } },
      script: [
        ['I', "Thanks for coming in, Clara. So, why are you interested in working at our bookshop?"],
        ['C', "Well, I've loved books since I was a child, and I've been coming to this shop for years. I really like that you organise events for local writers."],
        ['I', "That's nice to hear. Have you worked in a shop before?"],
        ['C', "Yes, I worked in a clothes shop for two years while I was at university. I dealt with customers every day and I was responsible for the till at weekends."],
        ['I', 'And why did you leave that job?'],
        ['C', "I moved to this city after I graduated, so it was too far to travel. Since then I've been working part-time in a café, but I'd prefer a job that's connected to books."],
        ['I', "The job includes some evening work when we have events. Would that be a problem?"],
        ['C', "Not at all. I'm actually quite flexible, except on Tuesday mornings, because I do a Spanish course."],
        ['I', "Fine. One last question: what would you do if a customer asked for a book we didn't have?"],
        ['C', "I'd check if we could order it, tell them how long it would take, and maybe suggest a similar book they could look at in the meantime."],
        ['I', "Great answer. We'll let you know by Friday."],
      ],
      questions: [
        ['Why does Clara want to work at the bookshop?', ['The pay is better than at the café', "She loves books and likes the shop's events", 'It is close to her university', 'Her friend works there'], "She loves books and likes the shop's events", "Clara says she has loved books since childhood and likes 'that you organise events for local writers.'"],
        ['What was Clara responsible for in her previous shop job?', ['Ordering new clothes', 'The till at weekends', 'Training new staff', 'Organising events'], 'The till at weekends', "She says 'I was responsible for the till at weekends.'"],
        ['Why did Clara leave the clothes shop?', ['She didn\'t like the manager', 'She moved to another city', 'The shop closed', 'She started a Spanish course'], 'She moved to another city', "She says 'I moved to this city after I graduated, so it was too far to travel.'"],
        ['When is Clara NOT available?', ['In the evenings', 'At weekends', 'On Tuesday mornings', 'On Friday afternoons'], 'On Tuesday mornings', "She is flexible 'except on Tuesday mornings, because I do a Spanish course.'"],
        ['What would Clara do if a book was not in the shop?', ['Send the customer to another shop', 'Try to order it and suggest something similar', 'Tell the customer to buy it online', 'Ask the manager to decide'], 'Try to order it and suggest something similar', "She would 'check if we could order it' and 'suggest a similar book.'"],
      ],
    },
    {
      slug: 'museum-audio-guide',
      title: 'Museum Audio Guide',
      speakers: { G: { name: 'Guide', voice: 'northern' } },
      script: [
        [
          'G',
          "Welcome to room four of the City History Museum. In this room, you can see how people in our city lived about two hundred years ago. On your left is a model of the old market square. At that time, the market was open every day except Sunday, and farmers came from villages up to twenty kilometres away to sell their vegetables and animals. In the glass case in front of you, you'll find tools that were used by the city's shoemakers. Shoemaking was once the most important industry here; in fact, almost one in five workers made shoes. If you look closely, you'll notice that many of the tools were made by hand from wood. Now, please turn to the large painting on the right wall. It shows the great fire of 1835, which destroyed nearly half of the old town. After the fire, the city decided that all new buildings had to be made of stone instead of wood. When you're ready, continue through the door on your right to room five, where you can try on some traditional clothes.",
        ],
      ],
      questions: [
        ['What does room four show?', ['Modern city life', 'How people lived about two hundred years ago', 'The history of painting', 'Traditional clothes from around the world'], 'How people lived about two hundred years ago', "The guide says 'you can see how people in our city lived about two hundred years ago.'"],
        ['When was the old market closed?', ['On Saturdays', 'On Sundays', 'In winter', 'On Mondays'], 'On Sundays', "The market 'was open every day except Sunday.'"],
        ['What was once the most important industry in the city?', ['Farming', 'Shoemaking', 'Building', 'Painting'], 'Shoemaking', "'Shoemaking was once the most important industry here.'"],
        ['What happened after the fire of 1835?', ['The market was moved', 'New buildings had to be made of stone', 'The shoemakers left the city', 'The museum was built'], 'New buildings had to be made of stone', "'all new buildings had to be made of stone instead of wood.'"],
        ['What can visitors do in room five?', ['Watch a film about the fire', 'Buy souvenirs', 'Try on traditional clothes', 'Make their own shoes'], 'Try on traditional clothes', "In room five 'you can try on some traditional clothes.'"],
      ],
    },
    {
      slug: 'returning-a-faulty-product',
      title: 'Returning a Faulty Product',
      speakers: { C: { name: 'Customer', voice: 'alan' }, A: { name: 'Assistant', voice: 'jenny' } },
      script: [
        ['C', 'Hi. I bought these headphones here last week, but there seems to be a problem with them.'],
        ['A', "I'm sorry to hear that. What's wrong with them?"],
        ['C', "The left side keeps cutting out. It works for a few minutes and then the sound just stops. I've tried them with my phone and my laptop, and it's the same."],
        ['A', 'I see. Do you have the receipt?'],
        ['C', "Yes, here it is. I paid eighty-five pounds for them, so I'm a bit disappointed."],
        ['A', "I completely understand. Since you bought them less than thirty days ago, you can either have a full refund or exchange them for a new pair."],
        ['C', "Hmm. Is the new pair the same model? I'm worried it might happen again."],
        ['A', "It would be the same model, but it's quite rare for this to happen. Alternatively, we have a slightly better model for ninety-five pounds. You'd just need to pay the difference."],
        ['C', "Ten pounds more... Does that one have a longer guarantee?"],
        ['A', 'Yes, it comes with a two-year guarantee instead of one.'],
        ['C', "OK, in that case I'll take the better model."],
      ],
      questions: [
        ['What is wrong with the headphones?', ['They are too small', 'The left side stops working', "They don't connect to his phone", 'The battery is broken'], 'The left side stops working', "The customer says 'The left side keeps cutting out.'"],
        ['How much did the customer originally pay?', ['Seventy-five pounds', 'Eighty-five pounds', 'Ninety-five pounds', 'Ten pounds'], 'Eighty-five pounds', "He says 'I paid eighty-five pounds for them.'"],
        ['Why can the customer get a refund or an exchange?', ['He is a regular customer', 'He bought them less than thirty days ago', 'He has a two-year guarantee', 'The manager agreed'], 'He bought them less than thirty days ago', "The assistant says 'Since you bought them less than thirty days ago...'"],
        ['Why is the customer unsure about the same model?', ['It is more expensive', 'He thinks the problem might happen again', 'It is not in stock', 'It has a different colour'], 'He thinks the problem might happen again', "He says 'I'm worried it might happen again.'"],
        ['What does the customer decide to do?', ['Get a full refund', 'Exchange them for the same model', 'Pay ten pounds more for a better model', 'Repair the old headphones'], 'Pay ten pounds more for a better model', "He chooses the ninety-five pound model with a two-year guarantee: 'I'll take the better model.'"],
      ],
    },
    {
      slug: 'learning-a-language-as-an-adult',
      title: 'Podcast: Learning a Language as an Adult',
      speakers: { H: { name: 'Host', voice: 'cori' } },
      script: [
        [
          'H',
          "Welcome back to Learning Matters. Today I want to talk about something many of you have asked me about: is it too late to learn a new language as an adult? A lot of people believe that children learn languages much more easily than adults. And it's true that children are often better at copying accents. But research shows that adults actually have some important advantages. For example, adults are usually better at understanding grammar rules, and they can use what they already know about their first language. The real problem for most adults isn't their brain — it's time. Between work and family, it's hard to practise every day. So here's my advice. First, study a little every day instead of a lot once a week. Even fifteen minutes is enough. Second, don't be afraid of making mistakes. Children make hundreds of mistakes and nobody laughs at them, so be kind to yourself. And third, find something you enjoy, like films, songs or podcasts, in the language you're learning. Next week, I'll be talking to a woman who learned Japanese at the age of sixty-two.",
        ],
      ],
      questions: [
        ['What is the main topic of the podcast?', ['Why children learn faster', 'Whether adults can successfully learn a new language', 'How to teach children grammar', 'The best language to learn'], 'Whether adults can successfully learn a new language', "The host asks 'is it too late to learn a new language as an adult?'"],
        ['What are children often better at, according to the host?', ['Understanding grammar rules', 'Copying accents', 'Studying every day', 'Learning vocabulary'], 'Copying accents', "'children are often better at copying accents.'"],
        ['What is the biggest problem for most adult learners?', ['Their memory', 'Their age', 'Finding time to practise', 'Bad teachers'], 'Finding time to practise', "'The real problem for most adults isn't their brain — it's time.'"],
        ['How often does the host suggest studying?', ['A lot once a week', 'A little every day', 'Two hours at the weekend', 'Only when you have free time'], 'A little every day', "'study a little every day instead of a lot once a week.'"],
        ['Who will be on next week\'s show?', ['A Japanese teacher', 'A child who speaks five languages', 'A woman who learned Japanese at sixty-two', 'A scientist who studies the brain'], 'A woman who learned Japanese at sixty-two', "'I'll be talking to a woman who learned Japanese at the age of sixty-two.'"],
      ],
    },
    {
      slug: 'planning-a-surprise-party',
      title: 'Planning a Surprise Party',
      speakers: { N: { name: 'Nina', voice: 'jenny' }, B: { name: 'Ben', voice: 'alan' } },
      script: [
        ['N', "Ben, have you got a minute? It's about Dad's surprise party."],
        ['B', "Sure. Have you booked the restaurant yet?"],
        ['N', "That's the problem. The Italian place we wanted is fully booked on Saturday. They've only got a table on Sunday."],
        ['B', "Sunday won't work. Dad always visits Grandma on Sunday afternoons, and he'd get suspicious if we changed that."],
        ['N', "Exactly. So I was thinking... why don't we have it at my place instead? My flat's big enough for twenty people if we move the sofa."],
        ['B', "That could actually be better. It's more personal. But who's going to cook for twenty people?"],
        ['N', "I'll make the main dishes, and I've asked Aunt Rosa to bring her famous chocolate cake."],
        ['B', "Perfect. I'll sort out the drinks and the music, then. How are we going to get Dad to your flat without him guessing?"],
        ['N', "I'll tell him my washing machine's broken and ask him to come and look at it. He can never say no to fixing things."],
        ['B', "Ha! That's brilliant. What time?"],
        ['N', "Seven o'clock. Tell everyone to arrive by half past six, and to park around the corner so he doesn't see their cars."],
      ],
      questions: [
        ['Why can\'t they use the Italian restaurant on Saturday?', ['It is too expensive', 'It is fully booked', 'It is closed for repairs', 'Dad doesn\'t like Italian food'], 'It is fully booked', "Nina says 'The Italian place we wanted is fully booked on Saturday.'"],
        ['Why won\'t Sunday work?', ['Ben is busy on Sunday', 'The restaurant is closed', 'Dad always visits Grandma on Sunday afternoons', 'Aunt Rosa can\'t come'], 'Dad always visits Grandma on Sunday afternoons', "Ben says 'Dad always visits Grandma on Sunday afternoons.'"],
        ['Where will the party be?', ['At a restaurant', "At Nina's flat", "At Grandma's house", "At Ben's house"], "At Nina's flat", "Nina suggests 'why don't we have it at my place instead?' and Ben agrees."],
        ['What is Ben responsible for?', ['The main dishes', 'The chocolate cake', 'The drinks and the music', 'Fixing the washing machine'], 'The drinks and the music', "Ben says 'I'll sort out the drinks and the music.'"],
        ['How will Nina get her dad to the party?', ['She will say it is her birthday', 'She will ask him to fix her washing machine', 'She will invite him for dinner', 'Ben will drive him there'], 'She will ask him to fix her washing machine', "Nina says 'I'll tell him my washing machine's broken and ask him to come and look at it.'"],
      ],
    },
  ],

  B2: [
    {
      slug: 'working-four-days-a-week',
      title: 'Radio Interview: Working Four Days a Week',
      speakers: { P: { name: 'Presenter', voice: 'northern' }, R: { name: 'Dr. Reed', voice: 'cori' } },
      script: [
        ['P', "My guest today is Dr. Laura Reed, who has spent the last two years studying companies that switched to a four-day working week. Dr. Reed, what did you find?"],
        ['R', "The headline result is that, in most of the sixty companies we followed, productivity stayed the same or even rose slightly, despite employees working around twenty percent fewer hours."],
        ['P', "That sounds almost too good to be true. How is that possible?"],
        ['R', "It's less mysterious than it sounds. When people know they only have four days, they become much more disciplined about how they use their time. Meetings got shorter, and a lot of unnecessary ones simply disappeared."],
        ['P', "Were there any sectors where it didn't work so well?"],
        ['R', "Yes. It was considerably harder in businesses that need staff available every day, such as hospitals or customer support. Those companies had to introduce rotating schedules, which some employees found confusing."],
        ['P', "And what about the workers themselves?"],
        ['R', "Overwhelmingly positive. Reported stress levels fell, and sick days dropped by about a third. Interestingly, the benefit most people mentioned wasn't rest, but having time for things like appointments and errands, which freed up their weekends."],
        ['P', "Would you recommend it to every company?"],
        ['R', "Not without careful planning. The firms that struggled were the ones that simply removed a day without rethinking how work was organised. You can't just squeeze five days of habits into four."],
      ],
      questions: [
        ["What was the main finding of Dr. Reed's study?", ['Productivity fell by twenty percent', 'Productivity stayed the same or rose slightly', 'Most companies returned to five days', 'Employees worked longer hours each day'], 'Productivity stayed the same or rose slightly', "She says 'productivity stayed the same or even rose slightly.'"],
        ['According to Dr. Reed, why did productivity not fall?', ['Companies hired more staff', 'Employees used their time more carefully', 'Employees worked at weekends', 'Salaries increased'], 'Employees used their time more carefully', "'they become much more disciplined about how they use their time.'"],
        ['Which kind of business found the change more difficult?', ['Technology start-ups', 'Businesses needing staff every day', 'Small family businesses', 'Banks and finance companies'], 'Businesses needing staff every day', "It was harder 'in businesses that need staff available every day, such as hospitals or customer support.'"],
        ['What benefit did employees mention most?', ['Having more time to rest', 'Earning more money', 'Having time for appointments and errands', 'Shorter journeys to work'], 'Having time for appointments and errands', "The benefit most people mentioned was 'having time for things like appointments and errands.'"],
        ['Why did some companies struggle?', ['Their employees refused to change', 'They removed a day without reorganising work', 'They introduced too many meetings', 'They were too small'], 'They removed a day without reorganising work', "'The firms that struggled were the ones that simply removed a day without rethinking how work was organised.'"],
      ],
    },
    {
      slug: 'how-sleep-affects-memory',
      title: 'Lecture: How Sleep Affects Memory',
      speakers: { L: { name: 'Lecturer', voice: 'northern' } },
      script: [
        [
          'L',
          "Good morning, everyone. Last week we looked at how memories are formed. Today I'd like to focus on what happens to those memories while we sleep, because it turns out that sleep is far from a passive state. For a long time, scientists assumed that sleep simply protected memories from interference — in other words, that we remembered things better simply because nothing new was happening. However, research over the past two decades suggests that the brain actively processes and strengthens memories during sleep. In one well-known type of experiment, participants learn a list of word pairs in the evening. Half of them then sleep normally, while the other half stay awake. When tested the next day, the group that slept consistently remembers more. What's more, deep sleep appears to be particularly important for facts, whereas the dreaming stage, known as REM sleep, seems to play a bigger role in skills and emotional memories. One practical implication is rather uncomfortable for students: staying up all night before an exam may be one of the least effective ways to prepare. You might feel productive, but you're depriving your brain of the very process it needs to hold on to what you've studied. For next week, please read chapter six, which looks at how stress affects memory.",
        ],
      ],
      questions: [
        ['What did scientists originally believe about sleep and memory?', ['Sleep damages new memories', 'Sleep simply protects memories from interference', 'Dreams create new memories', 'Sleep has no effect on memory'], 'Sleep simply protects memories from interference', "Scientists 'assumed that sleep simply protected memories from interference.'"],
        ['What does more recent research suggest?', ['The brain actively strengthens memories during sleep', 'Only short naps help memory', 'Sleep is completely passive', 'Staying awake improves memory'], 'The brain actively strengthens memories during sleep', "'the brain actively processes and strengthens memories during sleep.'"],
        ['In the experiment described, which group remembered more?', ['The group that stayed awake', 'The group that slept normally', 'Both groups remembered the same', 'The group that took notes'], 'The group that slept normally', "'the group that slept consistently remembers more.'"],
        ['Which type of memory is REM sleep more connected with?', ['Facts and dates', 'Skills and emotional memories', 'Word pairs', 'Short-term memories only'], 'Skills and emotional memories', "REM sleep 'seems to play a bigger role in skills and emotional memories.'"],
        ['What is the lecturer\'s advice for students, implied in the lecture?', ['Study through the night before an exam', "Don't stay up all night before an exam", 'Only study in the morning', 'Sleep less to have more time to study'], "Don't stay up all night before an exam", "'staying up all night before an exam may be one of the least effective ways to prepare.'"],
      ],
    },
    {
      slug: 'should-cities-ban-cars',
      title: 'Debate: Should Cities Ban Cars from the Centre?',
      speakers: { M: { name: 'Marcus', voice: 'northern' }, E: { name: 'Elena', voice: 'jenny' } },
      script: [
        ['M', "I'll be honest, I think banning cars from the city centre is long overdue. The air quality in our main square is among the worst in the country, and most car journeys in the centre are under three kilometres. People could easily walk or cycle."],
        ['E', "I understand the environmental argument, Marcus, but I think you're overlooking who actually depends on cars. Older people, people with disabilities, parents with young children — for them, three kilometres isn't always easy."],
        ['M', "That's a fair point, but most car-free schemes include exceptions for exactly those groups, as well as for deliveries and emergency vehicles."],
        ['E', "In theory, yes. But my bigger concern is the small shops. Several cities that introduced bans saw shops in the centre lose customers, at least in the first year, because people simply drove to out-of-town shopping centres instead."],
        ['M', "Actually, the longer-term data tends to show the opposite. Once streets become more pleasant, people spend more time there, and footfall often recovers and then increases."],
        ['E', "Possibly, but a lot of small businesses can't survive a difficult first year. If the city goes ahead, it needs to support them financially during the transition."],
        ['M', "I'd agree with that. And public transport would have to improve before the ban, not after."],
        ['E', "Well, on that, at least, we're in complete agreement."],
      ],
      questions: [
        ['What is one of Marcus\'s main arguments for the ban?', ['Car parks are too expensive', 'Most car journeys in the centre are short', 'Cars cause too many accidents', 'Public transport is already excellent'], 'Most car journeys in the centre are short', "Marcus says 'most car journeys in the centre are under three kilometres.'"],
        ['What does Elena think Marcus is overlooking?', ['The cost of new bike lanes', 'People who depend on cars', 'The opinion of tourists', 'The effect on house prices'], 'People who depend on cars', "Elena says 'you're overlooking who actually depends on cars.'"],
        ['What is Elena\'s bigger concern?', ['Air quality', 'Traffic outside the city', 'The effect on small shops', 'Delivery times'], 'The effect on small shops', "She says 'my bigger concern is the small shops.'"],
        ['What does Marcus say the longer-term data shows?', ['Shops continue to lose customers', 'Footfall often recovers and then increases', 'People move out of the city', 'Air quality does not improve'], 'Footfall often recovers and then increases', "Marcus says 'footfall often recovers and then increases.'"],
        ['What do Marcus and Elena completely agree on?', ['The ban should start immediately', 'Public transport must improve before the ban', 'Cars should be allowed at weekends', 'Shops should move out of the centre'], 'Public transport must improve before the ban', "Marcus says public transport 'would have to improve before the ban', and Elena says 'on that, at least, we're in complete agreement.'"],
      ],
    },
    {
      slug: 'a-village-powered-by-the-sun',
      title: 'News Report: A Village Powered by the Sun',
      speakers: { R: { name: 'Reporter', voice: 'cori' } },
      script: [
        [
          'R',
          "Five years ago, the small mountain village of Valdoria was facing an uncertain future. Its electricity supply was unreliable, power cuts were common in winter, and young people were leaving for the city. Today, the village produces more energy than it uses. The change began when a group of residents formed an energy cooperative. Rather than waiting for help from the government, they raised money from local families and a regional bank to install solar panels on the roofs of public buildings and on a disused field outside the village. The project wasn't without its difficulties. Some residents initially objected to the panels on the field, arguing that they would spoil the view, so the cooperative agreed to plant a line of trees to hide them. Now, any extra electricity is sold to the national grid, and the profits are reinvested in the community. Last year, they paid for a new heating system for the village school and free bus passes for elderly residents. Perhaps most significantly, the population has started to grow again for the first time in decades, as families are attracted by lower energy bills. Several nearby villages have already visited Valdoria to learn how they might copy its success.",
        ],
      ],
      questions: [
        ['What was one problem Valdoria faced five years ago?', ['It had too many tourists', 'Its electricity supply was unreliable', 'It had no school', 'Its roads were dangerous'], 'Its electricity supply was unreliable', "'Its electricity supply was unreliable, power cuts were common in winter.'"],
        ['How was the solar project funded?', ['Entirely by the government', 'By local families and a regional bank', 'By a large energy company', 'By selling the village field'], 'By local families and a regional bank', "'they raised money from local families and a regional bank.'"],
        ['Why did some residents object at first?', ['They thought it was too expensive', 'They thought the panels would spoil the view', 'They wanted wind turbines instead', "They didn't trust the bank"], 'They thought the panels would spoil the view', "Some residents argued 'that they would spoil the view.'"],
        ['What happens to the money from extra electricity?', ['It is shared among residents as cash', 'It is reinvested in the community', 'It is paid to the government', 'It is used to buy more land'], 'It is reinvested in the community', "'the profits are reinvested in the community.'"],
        ['What is described as perhaps the most significant result?', ['The new school heating system', 'Visits from nearby villages', 'The population growing again', 'Free bus passes'], 'The population growing again', "'Perhaps most significantly, the population has started to grow again for the first time in decades.'"],
      ],
    },
    {
      slug: 'the-psychology-of-procrastination',
      title: 'Podcast: The Psychology of Procrastination',
      speakers: { H: { name: 'Host', voice: 'alan' }, S: { name: 'Dr. Shah', voice: 'cori' } },
      script: [
        ['H', "Today we're talking about something we're all guilty of: procrastination. Dr. Priya Shah is a psychologist who studies why we put things off. Dr. Shah, is procrastination just laziness?"],
        ['S', "That's the most common misconception. Lazy people simply don't want to do anything. Procrastinators, on the other hand, often care a great deal — sometimes too much. Procrastination is mainly a way of avoiding uncomfortable emotions, like boredom, anxiety or the fear of not doing something well."],
        ['H', "So it's an emotional problem rather than a time-management problem?"],
        ['S', "Largely, yes. That's why a new calendar app rarely solves it. You can plan your day perfectly and still spend the afternoon tidying your desk instead of writing that report."],
        ['H', 'Guilty as charged. So what actually helps?'],
        ['S', "One technique I recommend is to make the first step ridiculously small. Not 'write the report', but 'open the document and write one sentence'. Once you've started, the anxiety usually fades, and continuing is much easier than starting."],
        ['H', "And what about people who say they work better under pressure?"],
        ['S', "Some genuinely do, but in studies, most people who claim this actually produce lower-quality work at the last minute. They remember the relief of finishing, not the quality of what they produced."],
        ['H', "One final tip for our listeners?"],
        ['S', "Be kind to yourself. Research shows that people who forgive themselves for procrastinating are less likely to do it again, because they're not adding guilt to the emotions they're already avoiding."],
      ],
      questions: [
        ['According to Dr. Shah, what is the most common misconception about procrastination?', ['That it is caused by stress', 'That it is just laziness', 'That it only affects students', 'That it can be cured quickly'], 'That it is just laziness', "When asked if it is laziness, she says 'That's the most common misconception.'"],
        ['What does Dr. Shah say procrastination mainly is?', ['A lack of planning skills', 'A way of avoiding uncomfortable emotions', 'A sign of low intelligence', 'A result of too much free time'], 'A way of avoiding uncomfortable emotions', "'Procrastination is mainly a way of avoiding uncomfortable emotions.'"],
        ['Why does a calendar app rarely solve procrastination?', ['Most apps are too complicated', "The problem is emotional, not about time management", 'People forget to use them', 'They make people more anxious'], "The problem is emotional, not about time management", "She agrees it is 'largely' an emotional problem, 'That's why a new calendar app rarely solves it.'"],
        ['What technique does Dr. Shah recommend?', ['Setting strict deadlines', 'Working only under pressure', 'Making the first step very small', 'Rewarding yourself with breaks'], 'Making the first step very small', "'make the first step ridiculously small.'"],
        ['Why are people who forgive themselves less likely to procrastinate again?', ['They have more free time', "They don't add guilt to the emotions they're avoiding", 'They become more organised', 'They care less about the result'], "They don't add guilt to the emotions they're avoiding", "'because they're not adding guilt to the emotions they're already avoiding.'"],
      ],
    },
  ],
};

const listeningAudioId = (level, slug) => `topics/listening/${level.toLowerCase()}/${slug}`;

// Transkript: diyaloglarda "İsim: metin", monologlarda sadece metin; satırlar boş satırla ayrılır.
const buildTranscript = ({ speakers, script }) => {
  const isDialogue = Object.keys(speakers).length > 1;
  return script.map(([code, text]) => (isDialogue ? `${speakers[code].name}: ${text}` : text)).join('\n\n');
};

// Seçenekler frontend'de karıştırılmadığı için doğru cevabın yeri soru metninden türetilen sabit bir
// konuma taşınır: her seed'de aynı sıra çıkar ama doğru cevap hep aynı şıkta toplanmaz.
const hash = (text) => [...text].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);

const withSpreadAnswers = (questions) =>
  questions.map(([title, options, answer, explanation]) => {
    const others = options.filter((o) => o !== answer);
    const position = hash(title) % options.length;
    return [title, [...others.slice(0, position), answer, ...others.slice(position)], answer, explanation];
  });

module.exports = { LISTENING_DATA, listeningAudioId, buildTranscript, withSpreadAnswers };
