// Seviye sınavları (Exams): her seviye (A1–B2) için ayrı, 85 dakikalık bir sınav.
//
// Bölümler ve soru sayıları (toplam 55 puan):
// - Listening: 2 kayıt x 5 soru (4 şıklı)
// - Reading: 2 metin x 5 soru (4 şıklı)
// - Grammar: 15 soru (4 şıklı)
// - Vocabulary: 10 soru (4 şıklı)
// - Writing: 2 kısa metin x 5 boşluk (kelime kutusundaki kelimeler yazılır)
//
// Çoktan seçmeli sorular [soru, [DOĞRU CEVAP, çeldirici, çeldirici, çeldirici]] şeklinde yazılır; doğru
// cevap her zaman ilk şıktır. Sınav ekranına gönderilirken soru metninden türetilen sabit bir konuma
// taşınır (her istekte aynı sıra çıkar ama doğru cevap hep aynı şıkta toplanmaz).
//
// Listening kayıtları data/listeningData.js ile aynı şekildedir (speakers + script) ve aynı script ile
// üretilir: npm run generate:listening (Cloudinary public ID: exams/listening/<seviye>/<slug>).
// Metni değiştirirsen: npm run generate:listening -- --force <slug>

const EXAM_LEVELS = ['A1', 'A2', 'B1', 'B2'];
const EXAM_DURATION_MINUTES = 85;
const PASS_PERCENT = 60;

const LEVEL_EXAMS = {
  A1: {
    listening: [
      {
        slug: 'exam-a1-clothes-shop',
        title: 'At the clothes shop',
        speakers: { A: { name: 'Shop assistant', voice: 'alan' }, C: { name: 'Customer', voice: 'jenny' } },
        script: [
          ['A', 'Hello. Can I help you?'],
          ['C', "Yes, please. I'm looking for a jumper for my brother. It's his birthday on Saturday."],
          ['A', 'OK. How old is he?'],
          ['C', "He's fifteen."],
          ['A', 'And what colour does he like?'],
          ['C', "He likes blue and green. He doesn't like red."],
          ['A', "This blue jumper is very popular. It's twenty-five pounds."],
          ['C', "Hmm, that's a bit expensive. Do you have a cheaper one?"],
          ['A', 'Yes. This green one is eighteen pounds.'],
          ['C', 'Great. Do you have it in medium?'],
          ['A', 'Yes, here you are.'],
          ['C', "Perfect. I'll take it. Can I pay by card?"],
          ['A', 'Of course you can.'],
        ],
        questions: [
          ['Who is the jumper for?', ['Her brother', 'Her father', 'Her friend', 'Her son']],
          ['When is the birthday?', ['On Saturday', 'On Sunday', 'On Friday', 'Today']],
          ["Which colour doesn't he like?", ['Red', 'Blue', 'Green', 'Black']],
          ['How much is the green jumper?', ['Eighteen pounds', 'Twenty-five pounds', 'Fifteen pounds', 'Eight pounds']],
          ['How does the customer pay?', ['By card', 'In cash', 'By phone', "She doesn't pay"]],
        ],
      },
      {
        slug: 'exam-a1-my-new-flat',
        title: 'My new flat',
        speakers: { D: { name: 'Daniel', voice: 'northern' } },
        script: [
          [
            'D',
            "Hi, I'm Daniel. I'm twenty-three and I'm a student at university. I study music. Last month I moved into a new flat. It's small, but it's very nice. It has one bedroom, a kitchen and a bathroom. There isn't a garden, but there is a big balcony. I love sitting there in the evening. My flat is on the third floor, and there is no lift, so I walk up the stairs every day! The flat is near the city centre. There's a supermarket next to my building and a park across the road. I go running in the park every morning. I live with my cat, Lucky. She's black and white and she sleeps all day. My parents live in a small village, about one hour from the city. I visit them every Sunday.",
          ],
        ],
        questions: [
          ['What does Daniel study?', ['Music', 'Art', 'History', 'Medicine']],
          ['How many bedrooms does the flat have?', ['One', 'Two', 'Three', 'Four']],
          ['Which floor is the flat on?', ['The third floor', 'The first floor', 'The second floor', 'The ground floor']],
          ['Where does Daniel go running?', ['In the park', 'In the city centre', 'On the balcony', 'In the village']],
          ['When does Daniel visit his parents?', ['Every Sunday', 'Every Saturday', 'Every evening', 'Once a month']],
        ],
      },
    ],
    reading: [
      {
        title: 'A holiday email',
        text: "Hi Maria,\n\nHow are you? I'm on holiday with my family in Scotland! We're in a small hotel near a beautiful lake. The weather isn't very good — it's cold and it rains every afternoon — but we're happy.\n\nIn the mornings, we walk by the lake or ride bikes. My little sister, Emma, loves the horses on the farm next to the hotel. She feeds them apples every day. My dad likes fishing, but he never catches any fish!\n\nThe food in the hotel is delicious. My favourite is the fish soup. We go home next Tuesday. See you at school on Wednesday!\n\nLove,\nLucy",
        questions: [
          ["Where is Lucy's hotel?", ['Near a lake', 'In a big city', 'Next to the sea', 'On a mountain']],
          ['What is the weather like?', ['Cold and rainy', 'Hot and sunny', 'Warm and windy', 'Snowy']],
          ['What does Emma give the horses?', ['Apples', 'Carrots', 'Bread', 'Fish']],
          ["What is true about Lucy's dad?", ["He doesn't catch any fish", 'He catches a lot of fish', "He doesn't like fishing", 'He cooks fish soup']],
          ['When does Lucy go back to school?', ['On Wednesday', 'On Tuesday', 'On Monday', 'On Friday']],
        ],
      },
      {
        title: "Ken's job",
        text: "Ken Sato is a chef. He is forty years old and he lives in London with his wife and two children. Ken comes from Japan, but he lives in England now.\n\nHe works in a Japanese restaurant in the city centre. He starts work at eleven o'clock in the morning and finishes at eleven o'clock at night. It's a long day, but he loves his job. He doesn't work on Mondays. On Mondays, he stays at home and cooks for his family. His children love his food, but their favourite meal is pizza!\n\nKen's wife, Sarah, is a teacher. She works at a primary school near their home. At the weekend, the family often goes to the park or visits Sarah's parents in Brighton.",
        questions: [
          ['Where is Ken from?', ['Japan', 'England', 'China', 'Italy']],
          ['What time does Ken finish work?', ["At eleven o'clock at night", "At eleven o'clock in the morning", 'At midnight', "At seven o'clock in the evening"]],
          ['What does Ken do on Mondays?', ['He cooks for his family at home', 'He works at the restaurant', 'He visits Brighton', 'He teaches at a school']],
          ["What is the children's favourite meal?", ['Pizza', 'Sushi', 'Fish soup', 'Pasta']],
          ["Where do Sarah's parents live?", ['In Brighton', 'In London', 'In Japan', 'Near the school']],
        ],
      },
    ],
    grammar: [
      ['My sister ___ a doctor.', ['is', 'am', 'are', 'be']],
      ['___ you like coffee?', ['Do', 'Does', 'Are', 'Is']],
      ['He ___ to school by bus every day.', ['goes', 'go', 'going', 'is go']],
      ['There ___ two apples on the table.', ['are', 'is', 'be', 'am']],
      ['This is ___ umbrella.', ['an', 'a', 'some', 'any']],
      ["I can't find my keys. Where are ___?", ['they', 'them', 'it', 'their']],
      ['We usually have lunch ___ one o\'clock.', ['at', 'in', 'on', 'by']],
      ['Look! The children ___ in the garden.', ['are playing', 'play', 'plays', 'is playing']],
      ['She ___ got a new bike.', ['has', 'have', 'is', 'does']],
      ["That's not my bag. It's ___.", ["Tom's", 'Tom', 'of Tom', "Toms'"]],
      ['My birthday is ___ June.', ['in', 'on', 'at', 'to']],
      ['___ is your favourite colour?', ['What', 'Who', 'Where', 'When']],
      ['They ___ like vegetables.', ["don't", "doesn't", "aren't", "isn't"]],
      ['I ___ swim very well.', ['can', 'cans', 'am', 'do']],
      ["Please ___ the door. It's cold.", ['close', 'closes', 'closing', 'to close']],
    ],
    vocabulary: [
      ["My mother's brother is my ___.", ['uncle', 'cousin', 'nephew', 'aunt']],
      ["I'm ___. Can I have a glass of water?", ['thirsty', 'hungry', 'tired', 'cold']],
      ['We buy bread at the ___.', ['bakery', 'library', 'bank', 'post office']],
      ["The opposite of 'cheap' is ___.", ['expensive', 'small', 'new', 'easy']],
      ['I brush my ___ with toothpaste.', ['teeth', 'hair', 'hands', 'nose']],
      ["It's very ___ today. Take your umbrella!", ['rainy', 'sunny', 'hot', 'dry']],
      ['A ___ works in a hospital and helps doctors.', ['nurse', 'waiter', 'pilot', 'farmer']],
      ['Monday, Tuesday, ___, Thursday.', ['Wednesday', 'Friday', 'Sunday', 'Saturday']],
      ['I wear a ___ on my head when it\'s sunny.', ['hat', 'glove', 'sock', 'shoe']],
      ['My flat has a small ___ where I cook.', ['kitchen', 'bedroom', 'bathroom', 'garage']],
    ],
    writing: [
      {
        title: 'About me',
        text: "Hello! My ___ is Carla. I'm ___ Spain, but now I ___ in Manchester with my husband. I ___ in a big shop in the city centre. I ___ my job because my colleagues are very friendly.",
        answers: ['name', 'from', 'live', 'work', 'like'],
      },
      {
        title: 'My weekend',
        text: "On Saturdays, I ___ get up late — at about eleven o'clock. In the afternoon, I go to the cinema ___ my friends. I ___ go to bed early on Saturday ___ I love watching films at night. On Sunday, I clean my flat ___ cook a big lunch.",
        answers: ['usually', 'with', 'never', 'because', 'and'],
      },
    ],
  },

  A2: {
    listening: [
      {
        slug: 'exam-a2-weekend-plans',
        title: 'Plans for Saturday',
        speakers: { K: { name: 'Kate', voice: 'cori' }, B: { name: 'Ben', voice: 'alan' } },
        script: [
          ['K', "Hi Ben, it's Kate. Are you free on Saturday?"],
          ['B', "Hi Kate. On Saturday morning I'm playing football, but I'm free in the afternoon. Why?"],
          ['K', "There's a new exhibition at the science museum. I'd love to see it. Do you want to come?"],
          ['B', 'Sounds great. How much are the tickets?'],
          ['K', "They're usually twelve pounds, but students pay only eight."],
          ['B', "Perfect, I've still got my student card. How are we going to get there?"],
          ['K', "We could take the train. It's faster than the bus."],
          ['B', 'OK. Shall we meet at the station at two?'],
          ['K', "Two is a bit early for me. I'm having lunch with my grandmother. What about half past two?"],
          ['B', "Fine. And after the museum, let's have dinner at that Mexican restaurant near the river."],
          ['K', "Good idea! I haven't been there for ages."],
        ],
        questions: [
          ['What is Ben doing on Saturday morning?', ['Playing football', 'Visiting the museum', 'Having lunch with his grandmother', 'Studying at home']],
          ['How much does a student ticket cost?', ['Eight pounds', 'Twelve pounds', 'Ten pounds', 'Twenty pounds']],
          ['How are they going to travel to the museum?', ['By train', 'By bus', 'By car', 'On foot']],
          ["Why can't Kate meet at two o'clock?", ['She is having lunch with her grandmother', 'She is playing football', 'The museum opens later', 'She has to work']],
          ['Where do they plan to go after the museum?', ['To a Mexican restaurant', 'To the cinema', 'For a walk by the river', "To Kate's house"]],
        ],
      },
      {
        slug: 'exam-a2-town-tour',
        title: 'A town tour',
        speakers: { H: { name: 'Helen', voice: 'jenny' } },
        script: [
          [
            'H',
            "Good morning, everyone, and welcome to Chester! My name is Helen and I'll be your guide today. Our tour takes about two hours. First, we're going to walk along the old city walls. They're nearly two thousand years old, and from the top you can see the whole town. Please be careful, because the stones can be slippery when it's wet. After that, we'll visit the cathedral. It's free to go inside, but please be quiet, because there's sometimes a service. Then we'll stop for thirty minutes at the market, where you can buy souvenirs or have a coffee. The tour finishes at the river at about twelve o'clock. If you want, you can take a boat trip from there — the boats leave every half an hour. Oh, and one more thing: please don't forget your bags on the bus. Right, let's go!",
          ],
        ],
        questions: [
          ['How long does the tour take?', ['About two hours', 'About one hour', 'Thirty minutes', 'All day']],
          ['Why should people be careful on the walls?', ['The stones can be slippery', 'The walls are very high', 'There are a lot of cars', 'The walls are being repaired']],
          ['What does Helen say about the cathedral?', ["It's free to go inside", 'The tickets are expensive', "It's closed today", 'Photos are not allowed']],
          ['How long is the stop at the market?', ['Thirty minutes', 'One hour', 'Fifteen minutes', 'Two hours']],
          ['Where does the tour finish?', ['At the river', 'At the market', 'At the cathedral', 'On the bus']],
        ],
      },
    ],
    reading: [
      {
        title: 'A month without social media',
        text: "Last year, nineteen-year-old Jake Miller decided to stop using social media for one month. 'I was spending about five hours a day on my phone,' he says. 'I was always tired and I didn't have time for my hobbies.'\n\nThe first week was very difficult. Jake often picked up his phone without thinking, and he felt bored in the evenings. 'I didn't know what to do with my free time,' he explains. But in the second week, things started to change. He started reading again and joined a local climbing club. He also began cooking dinner for his family twice a week.\n\nBy the end of the month, Jake was sleeping better and felt much happier. 'I thought I would miss my online friends, but actually I spent more time with my real friends,' he says. Now he uses social media for only thirty minutes a day. 'I don't think it's bad,' he says, 'but it's easy to use it too much.'",
        questions: [
          ['Why did Jake decide to stop using social media?', ['He was tired and had no time for hobbies', 'His parents asked him to', 'His phone was broken', 'He wanted to save money']],
          ['How did Jake feel in the first week?', ['Bored', 'Happy', 'Relaxed', 'Excited']],
          ['What did Jake NOT do during the month?', ['He started a new job', 'He joined a climbing club', 'He read books', 'He cooked for his family']],
          ['What surprised Jake?', ['He spent more time with his real friends', 'He missed his online friends a lot', "He didn't sleep well", 'He forgot how to cook']],
          ["What is Jake's opinion of social media now?", ["It's not bad, but it's easy to use it too much", 'It is terrible and everyone should stop using it', 'It is the best way to make friends', 'It is only useful for work']],
        ],
      },
      {
        title: 'Summer courses',
        text: "GREENFIELD COMMUNITY CENTRE — SUMMER COURSES\n\nPhotography for Beginners\nLearn how to take great photos with your phone or camera. Every Tuesday evening, 7–9 pm, from 4 July to 15 August. Price: £60 for the whole course. You need to bring your own camera or phone.\n\nCooking Around the World\nEvery week we cook food from a different country — Italy, India, Mexico and more! Saturday mornings, 10 am–12 pm. Price: £15 per class. All ingredients are included. Maximum 12 people, so book early!\n\nSpanish for Travellers\nPlanning a holiday in Spain or South America? Learn useful phrases for hotels, restaurants and shops. Monday and Wednesday evenings, 6–7 pm. Price: £80. The course is for complete beginners — you don't need to know any Spanish.\n\nTo book, visit the reception desk or call 01632 960 471. Students and people over 65 get a 20% discount on all courses.",
        questions: [
          ['What must people bring to the photography course?', ['A camera or a phone', 'Their own food', 'A notebook', 'Nothing']],
          ['How often does the photography course meet?', ['Once a week', 'Twice a week', 'Every day', 'Once a month']],
          ['Why should people book the cooking class early?', ['There are only a few places', 'The price will go up', 'It only happens once', 'The ingredients are expensive']],
          ['Who is the Spanish course for?', ["People who don't speak any Spanish", 'People who already speak some Spanish', 'Spanish teachers', 'Children only']],
          ['Who can pay less for the courses?', ['Students and people over 65', 'Everyone who books online', 'People who take two courses', 'Children under 12']],
        ],
      },
    ],
    grammar: [
      ['I ___ to the cinema last weekend.', ['went', 'go', 'have gone', 'was go']],
      ['She ___ TV when the phone rang.', ['was watching', 'watched', 'is watching', 'watches']],
      ['Have you finished your homework ___?', ['yet', 'already', 'just', 'still']],
      ['This book is ___ than the film.', ['more interesting', 'interestinger', 'most interesting', 'the more interesting']],
      ["You ___ smoke in the hospital. It's not allowed.", ["mustn't", "don't have to", "needn't", 'can']],
      ['Look at those black clouds! It ___ rain.', ['is going to', 'will to', 'going', 'rains']],
      ["We don't have ___ milk. Can you buy some?", ['much', 'many', 'a few', 'few']],
      ["I've lived here ___ 2015.", ['since', 'for', 'from', 'ago']],
      ['If you heat ice, it ___.', ['melts', 'melted', 'will melting', 'is melt']],
      ['She drives very ___.', ['carefully', 'careful', 'more careful', 'care']],
      ['___ you ever been to Paris?', ['Have', 'Did', 'Were', 'Do']],
      ['He enjoys ___ in the mountains.', ['walking', 'to walk', 'walk', 'walked']],
      ["It's the ___ day of the year.", ['hottest', 'hotter', 'most hot', 'hot']],
      ["I'm sorry, I ___ come to your party tomorrow. I have to work.", ["can't", "mustn't", "couldn't", "don't"]],
      ['When I was a child, I ___ play with my friends in the street.', ['used to', 'use to', 'was used', 'am used to']],
    ],
    vocabulary: [
      ["I'm going to ___ a table at the restaurant for 8 pm.", ['book', 'make', 'take', 'do']],
      ['Can you ___ me your pen? I forgot mine.', ['lend', 'borrow', 'take', 'keep']],
      ["My grandfather is ___. He doesn't work any more.", ['retired', 'unemployed', 'busy', 'bored']],
      ['We missed the train, so we had to ___ for the next one.', ['wait', 'stay', 'stop', 'look']],
      ['The film was so ___ that I fell asleep.', ['boring', 'bored', 'exciting', 'interested']],
      ['I need to ___ some money from the cash machine.', ['take out', 'put on', 'give up', 'turn off']],
      ['She ___ her driving test on the first try.', ['passed', 'won', 'succeeded', 'earned']],
      ["Could you turn ___ the music? It's too loud.", ['down', 'up', 'on', 'in']],
      ['My flight was ___ because of the snow, so I waited at the airport for three hours.', ['delayed', 'arrived', 'booked', 'checked']],
      ["Don't forget to ___ your seatbelt.", ['fasten', 'close', 'tie', 'lock']],
    ],
    writing: [
      {
        title: 'An email to a friend',
        text: "Hi Sam,\n\n___ for your email. I'm sorry I didn't write back sooner — I've been really busy with exams. I ___ you're well. ___ you like to come to my house on Friday? My parents are cooking a barbecue. I'm looking ___ to seeing you!\n\n___ wishes,\nElla",
        answers: ['Thanks', 'hope', 'Would', 'forward', 'Best'],
      },
      {
        title: 'A bad day',
        text: "Last Monday was a disaster. ___, I woke up late because my alarm didn't ring. ___ I ran to the bus stop, but the bus had already left. I was waiting for the next one ___ it started to rain heavily. ___ an hour, I arrived at work, completely wet. ___, at five o'clock, I went home and slept for twelve hours!",
        answers: ['First', 'Then', 'when', 'After', 'Finally'],
      },
    ],
  },

  B1: {
    listening: [
      {
        slug: 'exam-b1-holiday-problems',
        title: 'A trip to Lisbon',
        speakers: { J: { name: 'Jack', voice: 'northern' }, M: { name: 'Mia', voice: 'jenny' } },
        script: [
          ['J', 'So, how was your trip to Lisbon? You must have had a great time.'],
          ['M', 'Well, it was a bit of a mixed experience, to be honest. The city was amazing, but the first two days were a nightmare.'],
          ['J', 'Why? What happened?'],
          ['M', 'The airline lost my suitcase. I had to wear the same clothes for two days until they found it.'],
          ['J', 'Oh no! Did they pay you anything?'],
          ['M', 'They gave me fifty euros to buy a few things, which helped a bit. And then the hotel turned out to be next to a building site, so the noise started at seven every morning.'],
          ['J', "Couldn't you change rooms?"],
          ['M', 'I asked, but the hotel was fully booked. In the end I moved to a small apartment I found online. It was cheaper and much quieter.'],
          ['J', 'Good thinking. And the rest of the trip?'],
          ['M', 'Fantastic. I took a day trip to Sintra, which was the highlight — the palaces there are incredible. And the food... I must have eaten about twenty custard tarts.'],
          ['J', 'Would you go back?'],
          ['M', "Definitely, but next time I'll only take hand luggage!"],
        ],
        questions: [
          ['What was the problem when Mia arrived?', ['The airline lost her suitcase', 'Her flight was cancelled', 'She lost her passport', 'The hotel cancelled her booking']],
          ['What did the airline do?', ['It gave her fifty euros', 'It paid for a new hotel', 'It gave her a free flight', 'Nothing at all']],
          ["Why didn't Mia change rooms at the hotel?", ['The hotel had no free rooms', 'The other rooms were too expensive', 'The manager refused to help', "She didn't ask"]],
          ['What was the best part of the trip for Mia?', ['The day trip to Sintra', 'The apartment', 'The food at the hotel', 'The nightlife in Lisbon']],
          ['What will Mia do differently next time?', ['Travel with only hand luggage', 'Stay in an apartment from the start', 'Choose a different airline', 'Visit a different city']],
        ],
      },
      {
        slug: 'exam-b1-repair-cafe',
        title: 'The repair café',
        speakers: { R: { name: 'Speaker', voice: 'alan' } },
        script: [
          [
            'R',
            "Have you ever thrown away a toaster or a lamp just because one small part stopped working? If so, you're not alone. Every year, millions of electrical items end up in rubbish bins, even though many of them could easily be fixed. That's why, three years ago, a group of neighbours in our town started a repair café. It takes place on the first Saturday of every month in the community hall on Bridge Street, from ten until two. The idea is simple: you bring something that's broken, and one of our volunteers helps you repair it. We don't just fix things for you — we show you how to do it yourself, so next time you might not need us. Most of our volunteers are retired engineers and electricians, but we also have people who are great at sewing and repairing clothes. The service is completely free, although many visitors leave a small donation, which we use to buy tools and spare parts. Last year we repaired over eight hundred items. Our biggest challenge now is space: the hall is getting too small, so we're looking for a larger place. If you can help, please get in touch.",
          ],
        ],
        questions: [
          ['When does the repair café take place?', ['On the first Saturday of every month', 'Every Saturday morning', 'On the last Sunday of the month', 'Every weekday afternoon']],
          ['What is special about the way the volunteers work?', ['They teach visitors to do the repairs themselves', 'They only repair electrical items', "They collect items from people's homes", 'They sell the repaired items']],
          ['Who are most of the volunteers?', ['Retired engineers and electricians', 'University students', 'Professional tailors', 'Local shop owners']],
          ['What is the donation money used for?', ['Tools and spare parts', 'Renting the hall', 'Paying the volunteers', 'Advertising']],
          ['What is the main problem the repair café has now?', ['It needs a bigger place', "It doesn't have enough volunteers", 'Too few people visit it', 'It has no money']],
        ],
      },
    ],
    reading: [
      {
        title: 'The benefits of boredom',
        text: "Most of us try hard to avoid boredom. As soon as we have a spare minute — waiting for a bus or standing in a queue — we reach for our phones. But some psychologists now believe that being bored from time to time might actually be good for us.\n\nIn one well-known study, researchers asked a group of volunteers to do a very dull task: copying numbers from a telephone directory for fifteen minutes. Afterwards, the volunteers, together with a second group who hadn't done the boring task, were asked to think of as many uses as possible for two plastic cups. Surprisingly, the people who had been bored came up with more creative ideas.\n\nThe explanation, according to the researchers, is that when our minds have nothing to focus on, they begin to wander. This 'daydreaming' allows the brain to make unexpected connections between ideas, which is the basis of creativity.\n\nThis doesn't mean that all boredom is positive. Long periods of boredom, especially at work, can lead to stress and a lack of motivation. However, experts suggest that we should stop filling every quiet moment with entertainment. Next time you're waiting for a train, try leaving your phone in your pocket. You might be surprised by the ideas that come to you.",
        questions: [
          ['According to the first paragraph, what do most people do when they have a spare minute?', ['Use their phones', 'Talk to strangers', 'Read a book', 'Daydream']],
          ['What did the volunteers in the first group have to do?', ['Copy numbers for fifteen minutes', 'Think of uses for plastic cups', 'Wait in a queue', 'Read a telephone directory aloud']],
          ['What was the result of the study?', ['The bored group had more creative ideas', 'Both groups had the same number of ideas', 'The bored group gave up quickly', 'The second group was more creative']],
          ['Why, according to the researchers, can boredom increase creativity?', ['A wandering mind connects ideas in new ways', 'Bored people try harder to impress others', 'Boredom makes people more relaxed', 'It helps people concentrate on one idea']],
          ['What does the writer say about long periods of boredom?', ['They can cause stress and low motivation', 'They are always good for creativity', 'They only happen at school', 'They help people sleep better']],
        ],
      },
      {
        title: 'From hobby to business',
        text: "When Priya Desai started making candles in her kitchen five years ago, she never imagined it would become her full-time job. At the time, she was working as an accountant in a busy London office. 'I needed something to help me relax after work,' she remembers. 'A friend showed me how to make a simple candle, and I was hooked.'\n\nAt first, Priya gave her candles to friends and family as presents. Then a neighbour suggested selling them at the local Sunday market. 'I was nervous because I didn't think anyone would pay for them,' she says. 'But I sold everything in the first two hours.'\n\nEncouraged by this success, Priya opened an online shop. For two years, she ran the business in the evenings and at weekends while continuing to work as an accountant. It was exhausting. 'I was sleeping about five hours a night,' she admits. Finally, when there were too many online orders to manage, she decided to leave her job.\n\nToday, Priya employs four people and sells her candles to shops all over the UK. She says her accounting background has been extremely useful. 'Lots of small businesses fail because the owners don't understand the money side. I've never had that problem.' Her advice to others? 'Start small, and don't leave your job until you're sure.'",
        questions: [
          ['Why did Priya start making candles?', ['To relax after work', 'To earn extra money', 'Because she had lost her job', 'To give her friends a business idea']],
          ['How did Priya feel before her first day at the market?', ['Nervous', 'Confident', 'Excited', 'Bored']],
          ['What happened at the market?', ['She sold all her candles quickly', 'Nobody bought her candles', 'She met her first employee', 'She decided to leave her job']],
          ['Why did Priya finally leave her accounting job?', ['She had too many online orders', 'She was fired', 'She wanted to travel', "Her boss didn't like her business"]],
          ['How has her accounting experience helped her?', ['She understands the financial side of business', 'She can make candles faster', 'She found shops through old clients', "She doesn't need to pay her employees"]],
        ],
      },
    ],
    grammar: [
      ['I ___ here for five years, and I still love it.', ['have been living', 'am living', 'lived', 'live']],
      ['By the time we arrived, the film ___.', ['had already started', 'already started', 'has already started', 'was already starting']],
      ['If I ___ more time, I would learn to play the guitar.', ['had', 'have', 'will have', 'would have']],
      ['The museum ___ in 1890.', ['was built', 'built', 'has built', 'is building']],
      ['She asked me where I ___.', ['lived', 'do live', 'did I live', 'live I']],
      ['You ___ have told me about the party! I would have come.', ['should', 'must', 'can', 'will']],
      ['This is the town ___ I was born.', ['where', 'which', 'who', 'what']],
      ["I'm not used to ___ up so early.", ['getting', 'get', 'got', 'have got']],
      ['He told me that he ___ the report the next day.', ['would finish', 'will finish', 'finishes', 'has finished']],
      ['I wish I ___ speak French.', ['could', 'can', 'will', 'would']],
      ["We'd better leave now, ___ we'll miss the bus.", ['otherwise', 'unless', 'although', 'however']],
      ['The more you practise, the ___ you will become.', ['better', 'best', 'good', 'more good']],
      ["I'm looking forward ___ you next week.", ['to seeing', 'to see', 'seeing', 'for seeing']],
      ['She ___ be at home — her car is outside.', ['must', "can't", 'should', "mustn't"]],
      ['___ it was raining, we went for a walk.', ['Although', 'Despite', 'However', 'Because']],
    ],
    vocabulary: [
      ["I'm sorry, but I can't ___ to buy a new car this year.", ['afford', 'spend', 'cost', 'pay']],
      ['She has ___ a lot of progress with her English this term.', ['made', 'done', 'got', 'taken']],
      ['The company had to ___ fifty workers because of the crisis.', ['lay off', 'take on', 'put up', 'set up']],
      ["Could you ___ the children while I'm at the shops?", ['look after', 'look for', 'look up', 'look into']],
      ["He's very ___ — he always tells the truth.", ['honest', 'generous', 'ambitious', 'patient']],
      ['The weather ___ says it will snow tomorrow.', ['forecast', 'prediction', 'guess', 'view']],
      ['I ran out ___ petrol on the motorway.', ['of', 'from', 'off', 'with']],
      ['Our flight was ___ because of a strike, so we had to stay another night.', ['cancelled', 'missed', 'booked', 'landed']],
      ["It's hard to ___ a decision when you're tired.", ['make', 'do', 'get', 'have']],
      ["She's been ___ for jobs for months, but she hasn't had an interview yet.", ['applying', 'attending', 'requiring', 'suggesting']],
    ],
    writing: [
      {
        title: 'City or countryside?',
        text: "Many people believe that living in a big city is better than living in the countryside. ___, cities offer more job opportunities and better public transport. In ___, there are many museums, theatres and restaurants. ___, city life also has some disadvantages. For ___, the air is often polluted and housing is expensive. In ___, both places have advantages, and the best choice depends on each person's lifestyle.",
        answers: ['Firstly', 'addition', 'However', 'example', 'conclusion'],
      },
      {
        title: 'A letter of complaint',
        text: "Dear Sir or Madam,\n\nI am writing to ___ about a pair of headphones I ordered from your website on 3 March. When I ___ the parcel a week later, I found that the headphones were damaged and did not work. I would like a full ___ as soon as possible. I have attached a photo of the product as ___ of the damage. I look ___ to hearing from you.\n\nYours faithfully,\nDaniel Brooks",
        answers: ['complain', 'received', 'refund', 'evidence', 'forward'],
      },
    ],
  },

  B2: {
    listening: [
      {
        slug: 'exam-b2-remote-work',
        title: 'The truth about remote work',
        speakers: { I: { name: 'Interviewer', voice: 'cori' }, E: { name: 'Professor Ellis', voice: 'alan' } },
        script: [
          ['I', 'With me today is Professor Mark Ellis, who has spent the last decade studying how remote work affects productivity. Professor, is working from home really as productive as companies claim?'],
          ['E', "It depends enormously on the type of task. For focused, individual work — writing reports, analysing data — people at home often outperform their office-based colleagues, mainly because they're interrupted far less."],
          ['I', 'So where does it fall short?'],
          ['E', 'Collaboration, and particularly the kind of informal learning that happens when you overhear a more experienced colleague dealing with a problem. Junior staff tend to suffer most. We found that new employees working entirely from home received significantly less feedback than those in the office.'],
          ['I', 'Is the answer a hybrid model, then?'],
          ['E', "Hybrid can work, but only if it's coordinated. One mistake I see constantly is companies letting everyone choose their own office days. You end up with people commuting for an hour only to sit on video calls with colleagues who stayed at home."],
          ['I', 'That sounds rather pointless.'],
          ['E', "Exactly. The organisations that get it right agree on shared anchor days, when whole teams are in together, and they keep the other days for deep, concentrated work."],
          ['I', "And what about wellbeing? There's been a lot written about loneliness."],
          ['E', "It's real, but I think it's been somewhat exaggerated. What concerns me more is that the boundary between work and home disappears. Without a commute, many people simply never switch off."],
        ],
        questions: [
          ['According to Professor Ellis, why are people often more productive at home on individual tasks?', ['They are interrupted less often', 'They work longer hours', 'They have better equipment', 'They are under less pressure']],
          ['Which group does remote work affect most negatively?', ['Junior employees', 'Senior managers', 'People with long commutes', 'Employees with families']],
          ['What mistake does he say companies often make with hybrid work?', ['Letting employees choose their office days individually', 'Forcing staff to come in every day', 'Holding too many video calls', 'Reducing office space too quickly']],
          ["What are 'anchor days'?", ['Days when whole teams are in the office together', 'Days reserved for video meetings', 'Days when staff cannot be contacted', 'Days off given as a reward']],
          ["What is the professor's view on loneliness among remote workers?", ['It exists but has been overstated', 'It is the most serious problem', 'It only affects young people', 'It has been completely ignored']],
        ],
      },
      {
        slug: 'exam-b2-decoy-effect',
        title: 'The decoy effect',
        speakers: { S: { name: 'Speaker', voice: 'jenny' } },
        script: [
          [
            'S',
            "Today I'd like to talk about something that probably influences your shopping decisions more often than you realise: the decoy effect. Imagine a cinema selling popcorn in two sizes: a small one for three pounds and a large one for seven. Most people choose the small one, because the large seems overpriced. Now the cinema adds a third option — a medium for six pounds fifty. Hardly anyone buys the medium, but that isn't the point. Suddenly, the large looks like a bargain, since for just fifty pence more you get far more popcorn. Sales of the large size go up dramatically. The medium is what we call a decoy: an option designed not to be chosen, but to make another option look more attractive. What makes this effect so powerful is that it works even when people are aware of it. In experiments, participants who had been told about decoys still tended to be influenced by them, although slightly less. The lesson isn't that all businesses are trying to trick you, but it might be worth asking yourself, next time you upgrade to the larger size, whether you actually wanted it — or whether the option in the middle simply made the decision for you.",
          ],
        ],
        questions: [
          ["In the speaker's example, why do most people originally choose the small popcorn?", ['The large one seems too expensive', "They aren't very hungry", 'The small one is healthier', 'The large one is sold out']],
          ['What is the purpose of the medium-sized popcorn?', ['To make the large size look like good value', 'To be the most popular option', 'To replace the small size', 'To attract children']],
          ['What happens after the medium size is introduced?', ['More people buy the large size', 'Most people buy the medium size', 'Sales of popcorn fall', 'The price of the large size goes up']],
          ['What did the experiments show about people who knew about decoys?', ['They were still influenced, though slightly less', 'They were no longer influenced at all', 'They were influenced even more strongly', 'They refused to buy anything']],
          ["What is the speaker's main message?", ['Ask yourself whether you really want the option you choose', 'Businesses always try to trick customers', 'Never buy the largest size', 'Cinemas charge too much for food']],
        ],
      },
    ],
    reading: [
      {
        title: 'Rewilding: letting nature take the lead',
        text: "For centuries, conservation in Britain meant carefully managing the land: cutting hedges, controlling grazing and protecting individual species. Rewilding takes a radically different approach. Rather than deciding exactly what a landscape should look like, its supporters argue that we should restore natural processes and then, as far as possible, step back.\n\nThe best-known example is the Knepp estate in West Sussex. Faced with years of financial losses from intensive farming, the owners decided in 2001 to abandon conventional agriculture altogether. They introduced free-roaming cattle, pigs, ponies and deer — animals whose grazing and digging mimic the behaviour of the large wild herbivores that once lived in Britain. Within two decades, the estate had become home to some of the country's rarest species, including turtle doves and purple emperor butterflies, which had been declining almost everywhere else.\n\nNot everyone is convinced. Some farmers worry that taking land out of food production could threaten food security, while others feel that rewilding projects are often imposed by wealthy landowners or outsiders with little understanding of rural communities. The reintroduction of predators such as lynx is especially controversial, with sheep farmers fearing for their livestock.\n\nSupporters respond that rewilding need not replace farming, but can exist alongside it, particularly on poor-quality land that is barely profitable anyway. They also point to the economic benefits: Knepp now earns more from eco-tourism, camping and nature safaris than it ever did from farming. Whether such success can be repeated on a larger scale, however, remains an open question.",
        questions: [
          ['How does rewilding differ from traditional conservation in Britain?', ['It restores natural processes rather than closely managing the land', 'It focuses on protecting individual species', 'It involves more hedge-cutting and grazing control', 'It is mainly carried out by farmers']],
          ['Why did the owners of Knepp stop conventional farming?', ['It was losing them money', 'The government told them to', 'The land was too polluted', 'They wanted to attract tourists']],
          ['What role do the cattle, pigs and ponies play at Knepp?', ['Their behaviour copies that of wild animals that once lived there', 'They are raised to be sold for meat', 'They protect the land from predators', 'They are kept mainly for tourists to see']],
          ['Which of the following is NOT mentioned as a criticism of rewilding?', ['It is too expensive for the government to fund', 'It could reduce food production', 'It is sometimes imposed by outsiders', 'Reintroduced predators could harm livestock']],
          ['What does the writer suggest in the final sentence?', ["It is uncertain whether Knepp's success can be repeated widely", 'Rewilding will soon replace farming', 'Eco-tourism is less profitable than farming', 'Most farmers now support rewilding']],
        ],
      },
      {
        title: "Why we think we're above average",
        text: "Ask a group of drivers to rate their own driving skills, and something curious happens: the vast majority place themselves above average. Statistically, of course, this is impossible — not everyone can be better than most people. Psychologists call this tendency 'illusory superiority', and it appears in almost every area of life, from people's estimates of their own intelligence to their sense of humour.\n\nOne explanation, proposed by researchers David Dunning and Justin Kruger, is that the skills needed to perform a task well are often the same skills needed to judge performance. In other words, people who lack ability in a particular area may also lack the ability to recognise their mistakes. In their experiments, participants who scored lowest on tests of grammar and logic greatly overestimated how well they had done, while the highest scorers actually tended to underestimate themselves slightly — perhaps because they assumed that tasks they found easy must be easy for everyone.\n\nInterestingly, the effect is not equally strong across cultures. Some studies have found that participants from East Asian countries are more likely to underrate their abilities, which researchers link to cultural values that emphasise self-improvement over self-promotion.\n\nIs illusory superiority always harmful? Not necessarily. A degree of overconfidence can motivate people to attempt challenges they might otherwise avoid, and it may protect against anxiety. Problems arise, however, when it prevents us from seeking advice or learning from feedback — a risk that is greatest, ironically, for those who need improvement most.",
        questions: [
          ["Why does the writer describe the drivers' self-ratings as 'impossible'?", ['Not everyone can be better than most people', 'Most drivers have never taken a test', 'The drivers were lying deliberately', 'Driving skill cannot be measured']],
          ['According to Dunning and Kruger, why do less skilled people overestimate their ability?', ['They lack the skills to recognise their own mistakes', 'They are more competitive than others', "They don't care about the results", 'They have received too much praise']],
          ['Why might the highest scorers underestimate themselves?', ['They assume tasks they find easy are easy for everyone', 'They are naturally anxious', 'They want to appear modest', 'They misunderstood the questions']],
          ['What does the writer say about cultural differences?', ['People from some East Asian countries are more likely to underrate themselves', 'The effect is the same in every culture', 'Western participants underestimate themselves most', 'Culture has no link to self-assessment']],
          ['According to the final paragraph, when does illusory superiority become a problem?', ['When it stops people seeking advice or learning from feedback', 'When it makes people too anxious', 'When people attempt new challenges', 'When it is shared by a whole group']],
        ],
      },
    ],
    grammar: [
      ['Had I known about the traffic, I ___ earlier.', ['would have left', 'would leave', 'had left', 'will have left']],
      ['Not only ___ late, but he also forgot the documents.', ['did he arrive', 'he arrived', 'arrived he', 'he did arrive']],
      ['The report ___ by the time the manager arrives tomorrow.', ['will have been finished', 'will be finishing', 'has been finished', 'would finish']],
      ["I'd rather you ___ smoke in the house.", ["didn't", "don't", "won't", "wouldn't"]],
      ['She is said ___ a fortune on the stock market last year.', ['to have made', 'to make', 'having made', 'that she made']],
      ['___ the bad weather, the match went ahead as planned.', ['Despite', 'Although', 'Even though', 'In spite']],
      ["It's high time we ___ a decision.", ['made', 'make', 'will make', 'have made']],
      ['The candidate, ___ experience impressed everyone, was offered the job.', ['whose', 'who', 'which', 'whom']],
      ["You needn't ___ so much food yesterday — half of it is still in the fridge.", ['have bought', 'buy', 'bought', 'to buy']],
      ['Hardly ___ the house when it started to rain.', ['had we left', 'we had left', 'did we leave', 'we left']],
      ['If I had studied harder at school, I ___ a better job now.', ['would have', 'would have had', 'will have', 'had']],
      ['He denied ___ the window.', ['breaking', 'to break', 'break', 'that he break']],
      ['By this time next year, I ___ at this company for a decade.', ['will have been working', 'will work', 'am working', 'have worked']],
      ['The new policy, ___ was introduced last month, has been very unpopular.', ['which', 'that', 'what', 'who']],
      ['She suggested ___ a taxi because it was late.', ['taking', 'to take', 'take', 'us to take']],
    ],
    vocabulary: [
      ['The government has introduced new measures to ___ unemployment.', ['tackle', 'settle', 'raise', 'perform']],
      ['Despite the setbacks, the team ___ to finish the project on time.', ['managed', 'succeeded', 'achieved', 'accomplished']],
      ["His argument doesn't hold ___ — there's no evidence to support it.", ['water', 'air', 'ground', 'weight']],
      ["The company's profits have ___ since the new CEO took over.", ['soared', 'raised', 'lifted', 'grown up']],
      ["She was ___ by the news of her promotion and couldn't stop smiling.", ['thrilled', 'terrified', 'devastated', 'puzzled']],
      ['We need to ___ the pros and cons before making a final decision.', ['weigh up', 'take up', 'make up', 'bring up']],
      ["The scientist's findings were met with ___ by other researchers, who doubted the results.", ['scepticism', 'enthusiasm', 'admiration', 'approval']],
      ["It's a ___ conclusion that he'll win — no one else stands a chance.", ['foregone', 'final', 'fixed', 'decided']],
      ['The new law will ___ into force next year.', ['come', 'go', 'get', 'put']],
      ['Her speech was so ___ that many people in the audience were in tears.', ['moving', 'moved', 'touchy', 'sensitive']],
    ],
    writing: [
      {
        title: 'Online learning',
        text: "Online learning has transformed education over the past decade. Some argue that it is less effective than classroom teaching, ___ others believe it offers unique advantages. Students can study at their own pace and revisit difficult material. ___, online courses are often cheaper and accessible to people in remote areas. ___, many learners struggle with motivation when they study alone. Dropout rates for online courses are high; ___, providers are now experimenting with live sessions and peer groups. Overall, online learning can be highly effective, ___ that it is well designed and students receive enough support.",
        answers: ['whereas', 'Furthermore', 'Nevertheless', 'consequently', 'provided'],
      },
      {
        title: 'A survey report',
        text: "This report presents the results of a survey ___ among 200 employees in March. The vast ___ of respondents (78%) said they would prefer more flexible working hours. A ___ number also complained about the lack of quiet spaces in the office, many of ___ described the open-plan layout as distracting. It is therefore ___ that the company introduce a flexible schedule and create several silent work areas.",
        answers: ['conducted', 'majority', 'significant', 'whom', 'recommended'],
      },
    ],
  },
};

const SECTION_META = {
  listening: {
    label: 'Listening',
    instructions: 'Listen to each recording and choose the best answer (A, B, C or D) for each question.',
  },
  reading: {
    label: 'Reading',
    instructions: 'Read each text carefully and choose the best answer (A, B, C or D) for each question.',
  },
  grammar: {
    label: 'Grammar',
    instructions: 'Choose the best option (A, B, C or D) to complete each sentence.',
  },
  vocabulary: {
    label: 'Vocabulary',
    instructions: 'Choose the best option (A, B, C or D) to complete each sentence.',
  },
  writing: {
    label: 'Writing',
    instructions: 'Complete each text by typing the correct word from the word box into each gap. Use each word once.',
  },
};

const SECTION_ORDER = ['listening', 'reading', 'grammar', 'vocabulary', 'writing'];

const examAudioId = (level, slug) => `exams/listening/${level.toLowerCase()}/${slug}`;

const hash = (text) => [...text].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);

// [DOĞRU, ...çeldiriciler] -> doğru cevap sabit ama soruya göre değişen bir konumda.
const placeOptions = (question, options) => {
  const [correct, ...others] = options;
  const position = hash(question) % options.length;
  return [...others.slice(0, position), correct, ...others.slice(position)];
};

const buildTranscript = ({ speakers, script }) => {
  const isDialogue = Object.keys(speakers).length > 1;
  return script.map(([code, text]) => (isDialogue ? `${speakers[code].name}: ${text}` : text)).join('\n\n');
};

const mcQuestion = (id, [text, options]) => ({
  id,
  text,
  options: placeOptions(text, options),
  correctAnswer: options[0],
});

// Bir seviyenin sınavını, cevapları da içeren tam haliyle kurar. Sınav ekranına gönderilmeden önce
// toPublicExam ile cevaplar çıkarılır; puanlama answerKey üzerinden yapılır.
const buildExam = (level) => {
  const raw = LEVEL_EXAMS[level];
  if (!raw) return null;

  const sections = {
    listening: raw.listening.map((item, g) => ({
      title: item.title,
      audio: examAudioId(level, item.slug),
      transcript: buildTranscript(item),
      questions: item.questions.map((q, i) => mcQuestion(`${level}-L${g + 1}-${i + 1}`, q)),
    })),
    reading: raw.reading.map((item, g) => ({
      title: item.title,
      passage: item.text,
      questions: item.questions.map((q, i) => mcQuestion(`${level}-R${g + 1}-${i + 1}`, q)),
    })),
    grammar: [{ questions: raw.grammar.map((q, i) => mcQuestion(`${level}-G-${i + 1}`, q)) }],
    vocabulary: [{ questions: raw.vocabulary.map((q, i) => mcQuestion(`${level}-V-${i + 1}`, q)) }],
    writing: raw.writing.map((item, g) => ({
      title: item.title,
      passage: item.text,
      // Kelime kutusu alfabetik: boşlukların sırasını ele vermez.
      wordBank: [...item.answers].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
      questions: item.answers.map((answer, i) => ({ id: `${level}-W${g + 1}-${i + 1}`, correctAnswer: answer })),
    })),
  };

  return {
    level,
    title: `${level} Level Exam`,
    durationMinutes: EXAM_DURATION_MINUTES,
    passPercent: PASS_PERCENT,
    sections: SECTION_ORDER.map((key) => ({ key, ...SECTION_META[key], groups: sections[key] })),
  };
};

const toPublicExam = (exam) => ({
  ...exam,
  maxScore: countQuestions(exam),
  sections: exam.sections.map((section) => ({
    ...section,
    groups: section.groups.map(({ transcript, ...group }) => ({
      ...group,
      questions: group.questions.map(({ correctAnswer, ...q }) => q),
    })),
  })),
});

const countQuestions = (exam) =>
  exam.sections.reduce((sum, s) => sum + s.groups.reduce((n, g) => n + g.questions.length, 0), 0);

// Listening ses üretimi için (utils/generateListeningAudio.js): { level, item, publicId } listesi.
const examListeningItems = () =>
  EXAM_LEVELS.flatMap((level) =>
    LEVEL_EXAMS[level].listening.map((item) => ({ level, item, publicId: examAudioId(level, item.slug) }))
  );

module.exports = {
  EXAM_LEVELS,
  EXAM_DURATION_MINUTES,
  PASS_PERCENT,
  SECTION_ORDER,
  buildExam,
  toPublicExam,
  countQuestions,
  examListeningItems,
};
