// Kelime içeriği tek kaynaktan: her konunun Explanation sekmesi (vocabularyExplanations.js) VE egzersizleri
// (backend/utils/seed.js, dinamik import ile) bu dosyadan üretilir. Böylece ikisi her zaman aynı kelimeleri kullanır.
//
// Konu: 'SEVİYE::Başlık' (backend/data/vocabularyCurriculum.js ile birebir) → { intro, tip, words }
// Kelime: [emoji, kelime, türkçe, ingilizce tanım, cümle1 (___ ile), yanlış seçenek, cümle2 (___ ile)]
//   - Explanation: kelime + tanım + cümle1 (boşluk kelimeyle doldurulur)
//   - Exercise 1: cümle1, 2 seçenek (kelime + yanlış seçenek)
//   - Exercise 2: "Which word or phrase means ...?" — 4 seçenek (kelime + konudaki diğer 3 kelime)
//   - Exercise 3: cümle2 + (türkçe ipucu) — boşluk doldurma
// Kural: cümlelerdeki ___ tam olarak kelimenin bu yazılışıyla doldurulabilmeli (büyük/küçük harf önemsiz).
export const VOCABULARY_LESSONS = {
  // ───────────────────────────── A1 ─────────────────────────────
  'A1::Greetings and Introductions': {
    intro: 'Words and phrases for saying hello, goodbye and introducing yourself.',
    tip: 'Use "Good morning" before 12 pm, "Good afternoon" until about 6 pm and "Good evening" after that. "Good night" is only for saying goodbye at night.',
    words: [
      ['👋', 'hello', 'merhaba', 'a word you say when you meet someone', '___! How are you?', 'goodbye', 'You meet a friend in the street and say: "___, Tom!"'],
      ['🚶', 'goodbye', 'hoşça kal', 'a word you say when you leave', 'It is late and I have to go. ___!', 'hello', 'You leave a party and say: "___, everyone! See you soon."'],
      ['🌅', 'good morning', 'günaydın', 'a greeting you use early in the day', 'It is 8 am. "___, Mrs Smith!"', 'good night', 'At 9 am, the teacher says: "___, class!"'],
      ['🤝', 'nice to meet you', 'tanıştığıma memnun oldum', 'what you say when you meet someone for the first time', '"Hi, I\'m Anna." — "Hi Anna, I\'m Ben. ___."', 'see you tomorrow', '"This is my friend Leo." — "Hello Leo, ___."'],
      ['🙂', 'fine', 'iyi', 'well, OK (an answer to "How are you?")', '"How are you?" — "I\'m ___, thanks."', 'name', '"How are you today?" — "___, thank you. And you?"'],
      ['🪪', 'name', 'isim', 'what people call you', 'My ___ is Maria.', 'age', '"What\'s your ___?" — "It\'s David."'],
      ['👨', 'Mr', 'Bay', 'a title before a man\'s family name', 'This is ___ Brown, our teacher. He is very kind.', 'Mrs', 'For a man called John Smith, we say "___ Smith".'],
      ['🌙', 'good night', 'iyi geceler', 'what you say before you go to bed', 'It is 11 pm and I\'m going to bed. ___, Mum!', 'good morning', 'You say this to your family before you sleep: "___!"'],
      ['🌇', 'good evening', 'iyi akşamlar', 'a greeting you use after about 6 pm', 'It is 7 pm. "___, ladies and gentlemen!"', 'good morning', 'You arrive at a dinner party at 8 pm and say: "___!"'],
      ['👀', 'see you later', 'sonra görüşürüz', 'an informal way to say goodbye when you will meet again soon', "I'm going to the shop now. ___!", 'nice to meet you', 'Bye, Tom! ___ — at the café at six.'],
    ],
  },

  'A1::Numbers and Counting': {
    intro: 'Numbers help us count things and talk about age, prices and phone numbers.',
    tip: 'Thirteen (13) and thirty (30) sound similar. Stress the end in thirTEEN and the beginning in THIRty.',
    words: [
      ['1️⃣', 'one', 'bir', 'the number 1', 'I have ___ brother and two sisters.', 'ten', 'I only have ___ cat, not two.'],
      ['🔟', 'ten', 'on', 'the number 10', 'We have ___ fingers on our hands.', 'three', '5 + 5 = ___'],
      ['📅', 'twelve', 'on iki', 'the number 12', 'There are ___ months in a year.', 'twenty', '6 + 6 = ___'],
      ['⏱️', 'fifteen', 'on beş', 'the number 15', '10 + 5 = ___', 'fifty', 'A quarter of an hour is ___ minutes.'],
      ['💯', 'hundred', 'yüz', 'the number 100', 'One dollar is one ___ cents.', 'thousand', '10 × 10 = one ___'],
      ['🥇', 'first', 'birinci', 'number 1 in order', 'January is the ___ month of the year.', 'second', 'He won the race. He came ___.'],
      ['➕', 'plus', 'artı', 'the word for + in maths', 'Two ___ two is four.', 'minus', '3 + 4 = 7: three ___ four is seven.'],
      ['🧮', 'count', 'saymak', 'to say numbers in order (1, 2, 3...)', 'Can you ___ from one to ten?', 'spell', "Let's ___ the people in the room: one, two, three..."],
      ['2️⃣', 'twenty', 'yirmi', 'the number 20', '10 + 10 = ___', 'twelve', 'Two tens make ___.'],
      ['🥈', 'second', 'ikinci', 'number 2 in order', 'February is the ___ month of the year.', 'first', 'She came ___ in the race, after the winner.'],
    ],
  },

  'A1::The Alphabet and Spelling': {
    intro: 'Words for talking about letters and how to spell words in English.',
    tip: 'When you spell a name on the phone, say "double" for two same letters: B-E-double L = Bell.',
    words: [
      ['🔤', 'alphabet', 'alfabe', 'all the letters of a language in order', 'The English ___ has 26 letters.', 'word', 'A, B, C, D... is the start of the ___.'],
      ['🅰️', 'letter', 'harf', 'one sign like A, B or C', '"A" is the first ___ of the alphabet.', 'number', '"Z" is the last ___ of the alphabet.'],
      ['🗣️', 'spell', 'harf harf söylemek', 'to say or write the letters of a word in order', 'How do you ___ your name? — M-A-R-I-A.', 'count', 'Can you ___ "school", please? S-C-H-O-O-L.'],
      ['🔠', 'capital letter', 'büyük harf', 'a big letter, like A, B or C', 'Names start with a ___: Tom, London.', 'small letter', 'Write the first word of a sentence with a ___.'],
      ['🅾️', 'vowel', 'ünlü harf', 'one of the letters a, e, i, o, u', '"A" is a ___.', 'consonant', '"E", "I", "O" and "U" are letters. Each one is a ___.'],
      ['🅱️', 'consonant', 'ünsüz harf', 'a letter that is not a vowel, like b, c, d', '"B" is a ___.', 'vowel', '"T" is not a vowel. It is a ___.'],
      ['✌️', 'double', 'çift (aynı harften iki tane)', 'two of the same letter together', '"Book" has a ___ O.', 'single', 'In "apple" there is a ___ P.'],
      ['📝', 'word', 'kelime', 'a group of letters with a meaning', '"Dog" is a short ___.', 'letter', '"Hello" is a ___ with five letters.'],
      ['🔡', 'small letter', 'küçük harf', 'a letter that is not a capital, like a, b, c', 'In "apple", every letter is a ___.', 'capital letter', 'Write "b", not "B". Use a ___.'],
      ['📖', 'dictionary', 'sözlük', 'a book or app that tells you what words mean and how to spell them', "I don't know this word. I'll look it up in a ___.", 'menu', 'Check the spelling in a ___.'],
    ],
  },

  'A1::Jobs and Occupations': {
    intro: 'Common jobs and the people who do them.',
    tip: 'Use a / an before a job: She is a doctor. He is an engineer.',
    words: [
      ['👩‍⚕️', 'doctor', 'doktor', 'a person who helps sick people', 'I am ill. I need to see a ___.', 'teacher', 'She works in a hospital and helps sick people. She is a ___.'],
      ['👨‍🏫', 'teacher', 'öğretmen', 'a person who helps students learn at school', 'My ___ gives us homework every day.', 'driver', 'He teaches maths at a school. He is a ___.'],
      ['👨‍🍳', 'cook', 'aşçı', 'a person who makes food in a restaurant', 'The ___ makes great pizza.', 'nurse', 'In a restaurant kitchen, the ___ prepares the meals.'],
      ['🧑‍✈️', 'pilot', 'pilot', 'a person who flies a plane', 'The ___ is flying the plane to Rome.', 'farmer', 'You need a ___ to fly a plane.'],
      ['👩‍🌾', 'farmer', 'çiftçi', 'a person who grows food or keeps animals', 'The ___ has cows and sheep.', 'pilot', 'My uncle grows vegetables on his farm. He is a ___.'],
      ['👮', 'police officer', 'polis memuru', 'a person whose job is to stop crime', 'The ___ caught the thief.', 'waiter', 'Call a ___! Someone stole my bag!'],
      ['🧑‍🍽️', 'waiter', 'garson', 'a person who brings food to tables in a restaurant', 'The ___ brought us the menu.', 'doctor', 'In a café, the ___ takes your order.'],
      ['👷', 'engineer', 'mühendis', 'a person who designs machines, roads or bridges', 'My father is an ___. He designs cars.', 'actor', 'She designs bridges and roads. She is an ___.'],
      ['👩‍⚕️', 'nurse', 'hemşire', 'a person who looks after sick people in hospital', 'The ___ gave the patient some medicine.', 'pilot', 'She works with doctors and looks after patients. She is a ___.'],
      ['🚕', 'driver', 'şoför', 'a person who drives a bus, taxi or lorry', 'The bus ___ stopped at the station.', 'farmer', 'He drives a taxi. He is a taxi ___.'],
    ],
  },

  'A1::Personal Information': {
    intro: 'Words you need to give information about yourself, for example on a form.',
    tip: 'On forms, "first name" is your own name and "surname" (or "last name") is your family name.',
    words: [
      ['🎂', 'age', 'yaş', 'how old you are', '"What is your ___?" — "I\'m 25."', 'address', 'I am 30 years old. My ___ is 30.'],
      ['🏠', 'address', 'adres', 'the number, street and city where you live', 'My ___ is 12 Park Street, London.', 'age', 'Write your ___ on the letter: street, number and city.'],
      ['📞', 'phone number', 'telefon numarası', 'the numbers you use to call someone', 'My ___ is 0555 123 45 67.', 'surname', 'Can I call you? What\'s your ___?'],
      ['👪', 'surname', 'soyadı', 'your family name', 'My name is Anna Smith. Smith is my ___.', 'first name', 'In the name "John Brown", "Brown" is the ___.'],
      ['📧', 'email address', 'e-posta adresi', 'an address for sending messages on the internet', 'My ___ is tom@mail.com.', 'phone number', 'Please send the photos to my ___: anna@post.com.'],
      ['🗓️', 'date of birth', 'doğum tarihi', 'the day, month and year you were born', 'My ___ is 5 May 2001.', 'address', 'You were born on 3 June 1999. That is your ___.'],
      ['💍', 'married', 'evli', 'having a husband or wife', 'She has a husband. She is ___.', 'single', 'He has a wife and two children. He is ___.'],
      ['🌍', 'nationality', 'uyruk', 'the country you are a citizen of', '"What\'s your ___?" — "I\'m Turkish."', 'address', 'I am from Brazil. My ___ is Brazilian.'],
      ['🙂', 'first name', 'ad, isim', 'your own name, not your family name', 'In "Maria Lopez", Maria is the ___.', 'surname', 'Write your ___ here and your surname there.'],
      ['🧍', 'single', 'bekar', 'not married', "He doesn't have a wife. He is ___.", 'married', 'She is not married. She is ___.'],
    ],
  },

  'A1::Colors': {
    intro: 'The names of common colours and things that have these colours.',
    tip: 'British English writes "colour", American English writes "color". Both are correct.',
    words: [
      ['🔴', 'red', 'kırmızı', 'the colour of blood and strawberries', 'Strawberries are ___.', 'blue', 'Tomatoes and stop signs are ___.'],
      ['🔵', 'blue', 'mavi', 'the colour of the sky on a sunny day', 'On a sunny day, the sky is ___.', 'orange', 'The sea is usually ___.'],
      ['🟢', 'green', 'yeşil', 'the colour of grass and leaves', 'Grass is ___.', 'purple', 'Leaves on trees are ___ in summer.'],
      ['🟡', 'yellow', 'sarı', 'the colour of the sun and bananas', 'Bananas are ___.', 'black', 'Lemons are ___.'],
      ['⚫', 'black', 'siyah', 'the colour of the night sky', 'At night, the sky is ___.', 'pink', 'The opposite of white is ___.'],
      ['⚪', 'white', 'beyaz', 'the colour of snow and milk', 'Snow is ___.', 'brown', 'Milk is ___.'],
      ['🟤', 'brown', 'kahverengi', 'the colour of chocolate and coffee', 'Chocolate is ___.', 'white', 'Coffee beans are ___.'],
      ['🟠', 'orange', 'turuncu', 'the colour of carrots', 'Carrots are ___.', 'green', 'Mix red and yellow and you get ___.'],
      ['🟣', 'purple', 'mor', 'the colour you get when you mix red and blue', 'Mix red and blue to make ___.', 'yellow', 'Grapes and aubergines are often ___.'],
      ['🩷', 'pink', 'pembe', 'a light red colour', 'Flamingos are ___.', 'black', 'Mix red and white and you get ___.'],
    ],
  },

  'A1::Fruits and Vegetables': {
    intro: 'Common fruits and vegetables you can buy at the market.',
    tip: 'Use "an" before fruits that start with a vowel sound: an apple, an orange.',
    words: [
      ['🍎', 'apple', 'elma', 'a round red or green fruit that grows on trees', 'An ___ a day keeps the doctor away.', 'banana', 'This round fruit can be red or green: an ___.'],
      ['🍌', 'banana', 'muz', 'a long yellow fruit', 'A ___ is long and yellow.', 'carrot', 'Monkeys love this long yellow fruit: a ___.'],
      ['🍊', 'orange', 'portakal', 'a round fruit with the same name as its colour', 'I drink ___ juice every morning.', 'potato', 'This round fruit has the same name as its colour: an ___.'],
      ['🍓', 'strawberry', 'çilek', 'a small red fruit with seeds on the outside', 'I like ___ ice cream.', 'onion', 'A small red fruit with seeds on the outside: a ___.'],
      ['🥕', 'carrot', 'havuç', 'a long orange vegetable', 'Rabbits love to eat a ___.', 'grape', 'This long orange vegetable is good for your eyes: a ___.'],
      ['🥔', 'potato', 'patates', 'a vegetable we use to make chips', 'A baked ___ with cheese is delicious.', 'grape', 'We use this vegetable to make chips: a ___.'],
      ['🍅', 'tomato', 'domates', 'a soft red vegetable used in salads and sauces', 'I put a ___ in my salad.', 'banana', 'Ketchup is made from this red vegetable: the ___.'],
      ['🧅', 'onion', 'soğan', 'a vegetable that can make you cry when you cut it', 'Cutting an ___ makes me cry.', 'apple', 'This vegetable makes your eyes water when you cut it: an ___.'],
      ['🍇', 'grape', 'üzüm', 'a small round fruit that grows in bunches', 'Wine is made from a small fruit: the ___.', 'potato', 'This small green or purple fruit grows in bunches: a ___.'],
      ['🍉', 'watermelon', 'karpuz', 'a big green fruit that is red inside', 'A ___ is big and green outside, red inside.', 'lemon', 'In summer, I love eating a cold ___ with black seeds.'],
    ],
  },

  'A1::House and Home': {
    intro: 'Words for talking about your home and the parts of a house.',
    tip: 'Say "go home" and "at home" without "the": I go home at 5. I\'m at home now.',
    words: [
      ['🏠', 'home', 'ev, yuva', 'the place where you live', 'I go ___ after school.', 'house', 'After work, I go ___ and relax.'],
      ['🏢', 'flat', 'daire', 'a home on one floor of a big building', 'We live in a ___ on the fifth floor.', 'garden', 'A ___ is a home inside a big building.'],
      ['🌳', 'garden', 'bahçe', 'land next to a house with grass and flowers', 'We grow flowers in our ___.', 'roof', 'The children play outside in the ___.'],
      ['🪜', 'stairs', 'merdiven', 'steps you use to go up or down in a building', 'Take the ___ to the second floor.', 'window', 'The lift is broken, so we use the ___.'],
      ['🏚️', 'roof', 'çatı', 'the top part of a house', 'Rain falls on the ___ of the house.', 'stairs', 'The top part of a house is the ___.'],
      ['🚪', 'door', 'kapı', 'you open it to go into a room or house', 'Please close the ___ when you leave.', 'roof', 'Someone is knocking on the ___.'],
      ['🔑', 'key', 'anahtar', 'you use it to open a lock', "I can't open the door. I lost my ___.", 'sofa', 'You need a ___ to lock the front door.'],
      ['🙋', 'neighbour', 'komşu', 'a person who lives next to you', 'Our ___ lives in the house next door.', 'teacher', 'The man in the next flat is my ___.'],
      ['🪟', 'window', 'pencere', 'a glass opening in a wall that lets in light', "It's hot in here. Please open the ___.", 'roof', "Look out of the ___ — it's snowing!"],
      ['🛗', 'lift', 'asansör', 'a machine that carries people up and down in a building', 'Take the ___ to the tenth floor.', 'garden', 'The ___ is broken, so we use the stairs.'],
    ],
  },

  'A1::School and Classroom': {
    intro: 'Things and people you find at school and in the classroom.',
    tip: 'British English says "rubber"; American English says "eraser".',
    words: [
      ['📚', 'book', 'kitap', 'pages with text that you read', 'Open your ___ at page 10.', 'window', 'Please read page 5 of your ___.'],
      ['🧑‍🎓', 'student', 'öğrenci', 'a person who studies at a school', 'Every ___ has a desk in our class.', 'board', 'Ali studies at this school. He is a ___.'],
      ['✏️', 'pencil', 'kurşun kalem', 'you write with it and you can rub it out', 'Write your name with a ___.', 'chair', 'You can rub out what you write with a ___.'],
      ['🧽', 'rubber', 'silgi', 'a small object that removes pencil marks', 'I made a mistake. Can I borrow your ___?', 'ruler', 'You use a ___ to remove pencil marks.'],
      ['📏', 'ruler', 'cetvel', 'you use it to draw straight lines', 'Use a ___ to draw a straight line.', 'rubber', 'A ___ is often 30 centimetres long.'],
      ['🖥️', 'board', 'tahta', 'the big surface at the front of a classroom', 'The teacher writes on the ___.', 'bag', 'Look at the ___ at the front of the classroom.'],
      ['🎒', 'schoolbag', 'okul çantası', 'a bag for carrying books to school', 'I carry my books in my ___.', 'desk', 'Put your books in your ___ and go home.'],
      ['📝', 'homework', 'ev ödevi', 'work a teacher gives you to do at home', 'I do my ___ after school.', 'break', 'The teacher gave us maths ___ for tomorrow.'],
      ['🪑', 'desk', 'sıra, masa', 'a table you sit at to work or study', 'Put your books on your ___.', 'board', 'Every student has a ___ and a chair.'],
      ['⏸️', 'break', 'teneffüs', 'a short time to rest between lessons', 'We play football in the ___ between lessons.', 'homework', 'The ___ is 15 minutes long, and then the next lesson starts.'],
    ],
  },

  'A1::Basic Prepositions of Place': {
    intro: 'Small words that tell us where something is.',
    tip: 'Use "in" for inside, "on" for touching a surface and "under" for below.',
    words: [
      ['📦', 'in', 'içinde', 'inside something', 'My keys are ___ my pocket.', 'under', 'The milk is ___ the fridge.'],
      ['📖', 'on', 'üzerinde', 'touching the top of something', 'The book is ___ the table.', 'in', 'The picture is ___ the wall.'],
      ['🛏️', 'under', 'altında', 'below something', "My shoes are ___ the bed. I can't reach them!", 'in', "The ball rolled ___ the sofa and now I can't see it."],
      ['↔️', 'next to', 'yanında', 'at the side of something', 'The bank is ___ the post office.', 'in', 'Come and sit ___ me.'],
      ['🔲', 'between', 'arasında', 'in the middle of two things', 'The shop is ___ the bank and the café.', 'next to', 'B is ___ A and C.'],
      ['👀', 'in front of', 'önünde', 'facing something, before it', 'The teacher stands ___ the class.', 'under', 'Stand ___ the mirror to see yourself.'],
      ['🔙', 'behind', 'arkasında', 'at the back of something', 'The garden is ___ the house.', 'on', 'The child is hiding ___ the door.'],
      ['⬆️', 'above', 'yukarısında', 'higher than something', 'There is a lamp ___ the table.', 'under', 'The plane is flying ___ the clouds.'],
      ['⬇️', 'below', 'aşağısında', 'lower than something', 'The temperature is ___ zero. It is very cold.', 'above', 'Write your name ___ the line, not above it.'],
      ['🔄', 'around', 'etrafında', 'on every side of something', 'We sat ___ the table and had dinner.', 'under', 'There are trees all ___ the lake.'],
    ],
  },

  // ───────────────────────────── A2 ─────────────────────────────
  'A2::Feelings and Emotions': {
    intro: 'Adjectives to describe how you feel.',
    tip: 'Many feelings use "about": I\'m worried about the test. I\'m excited about the trip.',
    words: [
      ['😊', 'happy', 'mutlu', 'feeling good', "I got a present. I'm so ___!", 'angry', 'She is smiling because she is ___.'],
      ['😢', 'sad', 'üzgün', 'feeling unhappy', 'He is ___ because his dog is ill.', 'excited', 'She is crying because she feels ___.'],
      ['😠', 'angry', 'kızgın', 'feeling very annoyed', 'My dad was ___ because I broke the window.', 'bored', 'He is shouting because he is ___.'],
      ['😨', 'scared', 'korkmuş', 'afraid', 'The little boy is ___ of the dark.', 'proud', "She doesn't like spiders. She is ___ of them."],
      ['😴', 'tired', 'yorgun', 'needing rest or sleep', "I worked all day. I'm very ___.", 'surprised', 'After the long run, she felt ___.'],
      ['🥱', 'bored', 'sıkılmış', 'not interested because nothing is happening', 'The film was long and slow. I was ___.', 'excited', "There is nothing to do here. I'm ___."],
      ['🤩', 'excited', 'heyecanlı', 'very happy and full of energy about something', "We're going to the beach tomorrow! I'm so ___!", 'bored', 'The children are ___ about the party tomorrow.'],
      ['😟', 'worried', 'endişeli', 'thinking that something bad might happen', "She can't sleep because she is ___ about her exam.", 'happy', "My son is late. I'm ___ about him."],
      ['😮', 'surprised', 'şaşırmış', 'feeling something unexpected has happened', 'I was ___ to see her; I thought she was in London.', 'bored', 'He opened the door and everyone shouted "Happy birthday!" He was very ___.'],
      ['🦚', 'proud', 'gururlu', 'pleased about something you or someone close to you did', 'My parents were ___ of me when I passed the exam.', 'scared', 'She won the prize, and her teacher felt very ___ of her.'],
    ],
  },

  'A2::Health and Illness': {
    intro: 'Common illnesses and health problems.',
    tip: 'We say "I have a cold / a headache / a fever", but "I have toothache" often has no "a" in British English.',
    words: [
      ['🤒', 'fever', 'ateş', 'a high body temperature', 'Her temperature is 39°C. She has a ___.', 'cough', 'He feels very hot. He has a ___.'],
      ['😮‍💨', 'cough', 'öksürük', 'the noise you make when air comes out of your throat suddenly', 'I have a bad ___ and a sore throat.', 'broken leg', 'Smoking can give you a bad ___.'],
      ['🤧', 'cold', 'soğuk algınlığı', 'a common illness with a runny nose', 'I have a ___. My nose is running.', 'headache', 'You sneeze and have a runny nose. You have a ___.'],
      ['🤕', 'headache', 'baş ağrısı', 'a pain in your head', 'The music is too loud. I have a ___.', 'toothache', 'My head hurts. I have a ___.'],
      ['🦷', 'toothache', 'diş ağrısı', 'a pain in a tooth', 'I need to see the dentist because I have ___.', 'headache', 'Eating too many sweets can give you ___.'],
      ['🤢', 'sick', 'hasta, midesi bulanık', 'ill; feeling that you might vomit', 'I ate bad fish and now I feel ___.', 'well', 'He is ___ today, so he is not at school.'],
      ['💊', 'medicine', 'ilaç', 'something you take to get better', 'The doctor gave me some ___ for my cough.', 'homework', 'Take this ___ three times a day.'],
      ['🛌', 'rest', 'dinlenmek', 'to relax or sleep so you get better', 'You should stay in bed and ___.', 'run', 'When you are ill, you need to ___.'],
      ['🗣️', 'sore throat', 'boğaz ağrısı', 'a pain in your throat, often when you have a cold', 'It hurts when I swallow. I have a ___.', 'broken arm', 'Drink warm tea with honey for a ___.'],
      ['🦴', 'broken leg', 'kırık bacak', 'a leg with a broken bone', 'He fell while skiing and has a ___.', 'headache', "She can't walk because she has a ___."],
    ],
  },

  "A2::At the Doctor's": {
    intro: 'Words you need when you visit a doctor or a pharmacy.',
    tip: 'You "make an appointment" with a doctor and "take a prescription" to the pharmacy.',
    words: [
      ['🗓️', 'appointment', 'randevu', 'a fixed time to see a doctor', 'I have an ___ with the doctor at 10 am.', 'prescription', 'Call the clinic to make an ___.'],
      ['📋', 'prescription', 'reçete', 'a paper from the doctor that lets you get medicine', 'Take this ___ to the pharmacy.', 'appointment', 'The doctor wrote a ___ for antibiotics.'],
      ['💉', 'injection', 'iğne', 'medicine put into your body with a needle', 'The nurse gave me an ___ in my arm.', 'bandage', 'Children often cry when they get an ___.'],
      ['🌡️', 'temperature', 'vücut ısısı', 'how hot your body is', 'The nurse checked my ___. It was 38°C.', 'weight', 'Your normal body ___ is about 37°C.'],
      ['🏥', 'pharmacy', 'eczane', 'a shop where you buy medicine', 'You can buy medicine at the ___.', 'bakery', 'I took my prescription to the ___.'],
      ['🩹', 'symptom', 'belirti', 'a sign that you are ill', 'A high temperature is a ___ of flu.', 'cure', 'A cough is a common ___ of a cold.'],
      ['🩺', 'examine', 'muayene etmek', 'to look at a patient carefully', 'The doctor will ___ you now.', 'cook', 'First, the doctor will ___ your chest and listen to your heart.'],
      ['🧑‍⚕️', 'patient', 'hasta', 'a person who gets medical care', 'The ___ is waiting to see the doctor.', 'pharmacy', 'A person in hospital who is getting treatment is a ___.'],
      ['🩹', 'bandage', 'sargı bezi', 'a long piece of cloth you put around a wound', 'The nurse put a ___ on my arm.', 'injection', 'Wrap a ___ around the cut to stop the bleeding.'],
      ['🧑‍⚕️', 'dentist', 'diş hekimi', 'a doctor who looks after your teeth', 'I have toothache. I need to see the ___.', 'pharmacy', 'You should visit the ___ every six months to check your teeth.'],
    ],
  },

  'A2::Money and Payments': {
    intro: 'Words for paying for things and talking about money.',
    tip: 'Say "pay in cash" but "pay by card".',
    words: [
      ['💵', 'cash', 'nakit', 'money in coins and notes', 'Can I pay in ___?', 'card', "I don't have a card, so I'll pay with ___."],
      ['💳', 'credit card', 'kredi kartı', 'a plastic card you use to pay', 'I paid for the TV by ___.', 'coin', 'You type your PIN when you pay with a ___.'],
      ['🪙', 'coin', 'madeni para', 'a small round piece of money made of metal', 'I have a one-euro ___ in my pocket.', 'note', 'A ___ is round and made of metal.'],
      ['🧾', 'receipt', 'fiş', 'a piece of paper that shows what you paid', 'Keep the ___ in case you want to return it.', 'price', 'The shop gives you a ___ after you pay.'],
      ['🏧', 'cash machine', 'bankamatik', 'a machine in the street where you can take out money', 'I need money. Is there a ___ near here?', 'receipt', 'You can get cash from a ___ with your card.'],
      ['💰', 'change', 'para üstü', 'money you get back when you pay too much', 'The coffee is £2. I gave £5, so my ___ is £3.', 'tip', 'Here is your ___: three euros.'],
      ['🏷️', 'price', 'fiyat', 'how much something costs', 'What is the ___ of this shirt?', 'change', 'The ___ of the bag is 40 dollars.'],
      ['🐷', 'save', 'biriktirmek', 'to keep money so you can use it later', 'I want to ___ money for a new bike.', 'spend', 'She puts money in the bank every month to ___ for a holiday.'],
      ['🛍️', 'spend', 'harcamak', 'to use money to buy things', "Don't ___ all your money on sweets!", 'save', 'How much do you ___ on food every week?'],
      ['💶', 'note', 'kağıt para, banknot', 'a piece of paper money', 'I paid with a 20-euro ___.', 'coin', 'A ten-pound ___ is made of paper, not metal.'],
    ],
  },

  'A2::At the Airport': {
    intro: 'Words you need when you travel by plane.',
    tip: '"Luggage" is uncountable: say "a lot of luggage" or "two pieces of luggage", not "two luggages".',
    words: [
      ['🛂', 'passport', 'pasaport', 'an official document you need to travel to other countries', 'You need your ___ to fly to another country.', 'menu', 'Show your ___ at passport control.'],
      ['🎫', 'boarding pass', 'biniş kartı', 'a card that lets you get on the plane', 'Show your ___ at the gate.', 'suitcase', 'You get a ___ when you check in. It shows your seat number.'],
      ['🧳', 'luggage', 'bagaj', 'the bags and suitcases you take on a trip', 'We collected our ___ after the flight.', 'passport', 'Your bags and suitcases are your ___.'],
      ['🚪', 'gate', 'biniş kapısı', 'the place where you get on the plane', 'Our flight leaves from ___ 12.', 'seat', 'Go to the ___ 30 minutes before the plane leaves.'],
      ['🛫', 'take off', 'kalkış yapmak', 'when a plane leaves the ground', 'Please fasten your seatbelts. The plane will ___ in five minutes.', 'land', 'The plane is about to leave the ground: it is going to ___.'],
      ['🛬', 'land', 'iniş yapmak', 'when a plane comes down to the ground', 'The plane is coming down. We will ___ soon.', 'take off', 'The plane arrives and comes down to the ground: it will ___ at 9.'],
      ['✅', 'check in', 'check-in yapmak', 'to show your ticket and give your bags at the airport', 'You must ___ two hours before your flight.', 'land', 'At the desk, we ___ and give them our suitcases.'],
      ['⏱️', 'delayed', 'rötarlı', 'later than planned', 'Our flight is ___ because of the snow.', 'early', 'The plane was two hours ___ because of bad weather.'],
      ['💺', 'seat', 'koltuk', 'the place where you sit on a plane', 'My ___ is next to the window.', 'gate', 'Your ___ number is on your boarding pass: 14A.'],
      ['🔍', 'security', 'güvenlik kontrolü', 'the place where they check your bags and body for dangerous things', 'You have to take off your belt at ___.', 'restaurant', 'Put your laptop in a tray when you go through ___.'],
    ],
  },

  'A2::Household Chores': {
    intro: 'Jobs you do to keep your home clean and tidy.',
    tip: 'Many chores use "do": do the dishes, do the laundry, do the ironing. Others use "make": make the bed.',
    words: [
      ['🧺', 'do the laundry', 'çamaşır yıkamak', 'to wash clothes', 'I ___ on Sundays, so my clothes are always clean.', 'make the bed', 'My clothes are dirty. I need to ___.'],
      ['🍽️', 'do the dishes', 'bulaşık yıkamak', 'to wash plates, cups and pans', 'After dinner, I always ___ in the sink.', 'make the bed', "The plates and cups are dirty. Let's ___."],
      ['🛏️', 'make the bed', 'yatağı toplamak', 'to tidy the sheets and covers after sleeping', 'I ___ every morning and put the pillows straight.', 'do the dishes', 'Before you leave your bedroom, please ___.'],
      ['🧹', 'sweep the floor', 'yeri süpürmek', 'to clean the floor with a brush', 'There is sand everywhere. Can you ___?', 'iron the shirts', 'Take the brush and ___ in the kitchen.'],
      ['👕', 'iron', 'ütülemek', 'to make clothes smooth with a hot machine', 'My shirt is not smooth. I need to ___ it.', 'wash', 'Please ___ my shirt for the party; it is not smooth.'],
      ['🗑️', 'take out the rubbish', 'çöpü çıkarmak', 'to carry the bin bag outside', 'The bin is full. Please ___.', 'make the bed', "It's your turn to ___ to the bins outside."],
      ['🔌', 'vacuum', 'elektrikli süpürgeyle süpürmek', 'to clean carpets with an electric machine', 'I ___ the carpet every week.', 'iron', 'The carpet is dirty. I need to ___ it.'],
      ['🧸', 'tidy', 'toplamak, düzenlemek', 'to put things in the right place', 'Your room is a mess! Please ___ it.', 'iron', 'Put your toys away and ___ your room.'],
      ['🪴', 'water the plants', 'çiçekleri sulamak', 'to give water to plants', 'The flowers are dry. Can you ___?', 'iron the shirts', 'When we are on holiday, our neighbour comes to ___.'],
      ['🧽', 'dust', 'toz almak', 'to clean the small dirt from furniture', 'I ___ the shelves every week.', 'iron', "The table is grey with dirt. Let's ___ it."],
    ],
  },

  'A2::Communication and Social Media': {
    intro: 'Words for talking to people online and using social media.',
    tip: 'Use "on" with social media: on Instagram, on WhatsApp, on the internet.',
    words: [
      ['💬', 'message', 'mesaj', 'words you send to someone by phone or online', 'I sent her a ___ on WhatsApp.', 'password', "He didn't answer my ___."],
      ['🖼️', 'post', 'paylaşım', 'a photo or text you put on social media', 'Her last ___ got 500 likes.', 'call', 'I shared a ___ with photos from my holiday.'],
      ['👍', 'like', 'beğenmek', 'to click to show you enjoy a post', 'Please ___ and share my video!', 'delete', 'If you enjoy my photos, please ___ them.'],
      ['🔁', 'share', 'paylaşmak', 'to let other people see a post', 'You can ___ this video with your friends.', 'delete', '___ the link with your friends so they can see it.'],
      ['👥', 'follower', 'takipçi', 'a person who sees your posts on social media', 'Every new ___ can see my posts.', 'password', 'A person who follows your account is your ___.'],
      ['🔒', 'password', 'şifre', 'a secret word you use to log in', "Don't tell anyone your ___.", 'follower', "I forgot my ___, so I can't log in."],
      ['📲', 'download', 'indirmek', 'to copy an app or file onto your phone or computer', 'You can ___ the app for free.', 'call', 'Click here to ___ the file to your computer.'],
      ['📹', 'video call', 'görüntülü arama', 'a call where you can see the other person', 'I made a ___ to my grandma so she could see the baby.', 'text message', 'On a ___, you can see and hear the other person.'],
      ['🗑️', 'delete', 'silmek', 'to remove a message, photo or file', "I didn't like the photo, so I decided to ___ it.", 'share', 'Oops, wrong message! I need to ___ it.'],
      ['🔔', 'notification', 'bildirim', 'a message on your phone that tells you something new has happened', 'I got a ___: someone liked my photo.', 'password', 'My phone shows a ___ every time I get an email.'],
    ],
  },

  'A2::Music and Musical Instruments': {
    intro: 'Musical instruments and words for talking about music.',
    tip: 'Use "the" with instruments after "play": She plays the piano. He plays the drums.',
    words: [
      ['🎸', 'guitar', 'gitar', 'an instrument with six strings', 'He plays the ___; it has six strings.', 'drums', 'This instrument has six strings: the ___.'],
      ['🎹', 'piano', 'piyano', 'a big instrument with black and white keys', 'She plays the ___ with its black and white keys.', 'violin', 'This instrument has 88 black and white keys: the ___.'],
      ['🥁', 'drums', 'davul', 'instruments you hit with sticks', 'He hits the ___ with sticks.', 'flute', 'In a band, the ___ keep the rhythm.'],
      ['🎻', 'violin', 'keman', 'a small wooden instrument you play with a bow', 'You play the ___ with a bow under your chin.', 'piano', 'A small instrument with four strings that you hold under your chin: the ___.'],
      ['🎤', 'singer', 'şarkıcı', 'a person who sings', 'The ___ has a beautiful voice.', 'drummer', 'Adele is a famous ___.'],
      ['🎵', 'song', 'şarkı', 'a short piece of music with words', 'This is my favourite ___. I know all the words.', 'instrument', "Let's sing a ___ together."],
      ['🎫', 'concert', 'konser', 'a live music performance', 'We went to a rock ___ last night.', 'band', 'The band played a ___ in the park.'],
      ['🎶', 'band', 'müzik grubu', 'a group of musicians', 'My brother plays guitar in a ___.', 'song', 'The Beatles were a famous ___.'],
      ['🪈', 'flute', 'flüt', 'a long thin instrument you blow across', 'She blows across the ___ to play it.', 'drums', 'A ___ is a long, thin instrument made of metal or wood.'],
      ['🎧', 'listen to', 'dinlemek', 'to give attention to a sound or music', 'I ___ music on the bus every morning.', 'look at', 'Put on your headphones and ___ this new song.'],
    ],
  },

  'A2::Nature and Environment': {
    intro: 'Places in nature and words for protecting the environment.',
    tip: 'We use "the" with oceans, seas and rivers: the Pacific Ocean, the Black Sea, the Nile.',
    words: [
      ['🌲', 'forest', 'orman', 'a large area with many trees', 'There are many trees in the ___.', 'desert', 'Bears and wolves live in the ___.'],
      ['⛰️', 'mountain', 'dağ', 'a very high hill', 'Everest is the highest ___ in the world.', 'river', 'We climbed the ___ and saw snow at the top.'],
      ['🌊', 'ocean', 'okyanus', 'a very large area of salt water', 'The Pacific is the biggest ___.', 'forest', 'Whales live in the ___.'],
      ['🏜️', 'desert', 'çöl', 'a hot, dry place with sand', 'It almost never rains in the ___.', 'forest', 'The Sahara is a huge ___.'],
      ['♻️', 'recycle', 'geri dönüştürmek', 'to use old things again to make new things', 'We ___ bottles and paper.', 'pollute', "Don't throw away plastic — ___ it!"],
      ['🏭', 'pollution', 'kirlilik', 'dirty air, water or land', 'Cars cause air ___.', 'recycling', 'Factories cause a lot of water ___.'],
      ['🦋', 'wildlife', 'vahşi yaşam', 'animals and plants living in nature', 'The national park is full of ___.', 'traffic', 'Pollution is dangerous for ___ like birds and fish.'],
      ['🌍', 'planet', 'gezegen', 'a large round object in space, like Earth', 'Earth is our ___.', 'city', 'Mars is a red ___.'],
      ['🏞️', 'river', 'nehir', 'a long natural flow of water that goes to the sea', 'The Thames is a ___ in London.', 'desert', 'We went fishing in the ___.'],
      ['🗑️', 'litter', 'çöp (yerdeki)', 'rubbish that people leave on the ground', "Please don't drop ___ in the park.", 'wildlife', 'Pick up your ___ and put it in the bin.'],
    ],
  },

  'A2::Directions and Places': {
    intro: 'Words for asking for and giving directions in a town.',
    tip: 'To ask politely, say: "Excuse me, how do I get to the station?"',
    words: [
      ['⬅️', 'turn left', 'sola dönmek', 'to change direction to the left', '___ at the traffic lights, and the bank is on your left.', 'go straight on', 'Go to the corner and ___ onto Park Road.'],
      ['➡️', 'turn right', 'sağa dönmek', 'to change direction to the right', 'The hotel is on the right, so ___ here.', 'turn left', 'At the end of the street, ___; the shop is on your right.'],
      ['⬆️', 'go straight on', 'düz gitmek', 'to continue in the same direction', "Don't turn. ___ for 200 metres.", 'turn left', "Don't turn left or right — just ___."],
      ['🚦', 'traffic lights', 'trafik ışıkları', 'red, yellow and green lights that control cars', 'Stop when the ___ are red.', 'corner', 'Turn left at the ___ and the station is in front of you.'],
      ['📐', 'corner', 'köşe', 'the place where two streets meet', 'The café is on the ___ of Main Street and Hill Road.', 'bridge', "There's a bakery on the ___, where the two roads meet."],
      ['🌉', 'bridge', 'köprü', 'a structure that goes over a river or road', 'Walk across the ___ to the other side of the river.', 'corner', 'Cross the ___ over the river.'],
      ['✖️', 'crossroads', 'kavşak', 'a place where two roads cross', 'At the ___, turn right.', 'roof', 'A place where two roads cross each other is a ___.'],
      ['📍', 'opposite', 'karşısında', 'on the other side of the road, facing something', 'The bank is ___ the supermarket, across the road.', 'between', 'The school is ___ the park — just across the street.'],
      ['🗺️', 'map', 'harita', 'a picture that shows where streets and places are', "I'm lost. Let's look at the ___.", 'menu', 'Use the ___ on your phone to find the museum.'],
      ['🏁', 'at the end of', 'sonunda', 'in the last part of a street or road', 'The station is ___ this street.', 'between', 'Walk to the last building — the bank is ___ the road.'],
    ],
  },

  'A2::Common Collocations': {
    intro: 'Words that often go together in English, especially with make, do, take and have.',
    tip: 'Learn collocations as one unit: "make a mistake", not "do a mistake".',
    words: [
      ['📸', 'take a photo', 'fotoğraf çekmek', 'to use a camera to make a picture', 'Can you ___ of us, please?', 'make a photo', "Smile! I'm going to ___."],
      ['❌', 'make a mistake', 'hata yapmak', 'to do something wrong', "Everyone can ___. Don't worry.", 'do a mistake', "It's OK to ___ when you learn a language."],
      ['🛒', 'do the shopping', 'alışveriş yapmak', 'to buy food and things for the house', 'I ___ at the supermarket on Saturdays.', 'make the shopping', "We need milk and bread. Let's ___."],
      ['🎉', 'have a party', 'parti vermek', 'to invite people to celebrate', "We're going to ___ for my birthday.", 'do a party', "Let's ___ on Saturday and invite all our friends."],
      ['⏳', 'spend time', 'vakit geçirmek', 'to use your time doing something', 'I like to ___ with my family.', 'do time', 'Children should ___ outside every day.'],
      ['💤', 'have a rest', 'dinlenmek', 'to relax for a short time', 'You look tired. Sit down and ___.', 'make a rest', 'After the long walk, we stopped to ___.'],
      ['👂', 'pay attention', 'dikkat etmek', 'to listen to or look at something carefully', 'Please ___ to the teacher.', 'make attention', 'You must ___ when you cross the road.'],
      ['🗣️', 'tell the truth', 'doğruyu söylemek', 'to say what really happened', 'Always ___, even when it is difficult.', 'say the truth', 'I know you broke it. Please ___.'],
      ['🚿', 'take a shower', 'duş almak', 'to wash your body under water', 'I ___ every morning before work.', 'make a shower', 'After the football match, I went home to ___.'],
      ['🙌', 'make friends', 'arkadaş edinmek', 'to start new friendships', "It's easy to ___ at university.", 'do friends', 'She joined a club to ___ in her new town.'],
    ],
  },

  // ───────────────────────────── B1 ─────────────────────────────
  'B1::Friendship and Communication': {
    intro: 'Phrases for describing friendships and how people communicate.',
    tip: '"Fall out" (bozuşmak) and "make up" (barışmak) are opposites — both are phrasal verbs.',
    words: [
      ['🤝', 'get along with', 'iyi anlaşmak', 'to have a friendly relationship with someone', 'I ___ my new classmates very well.', 'fall out with', 'She is easy to talk to, so she can ___ everyone.'],
      ['💔', 'fall out', 'bozuşmak', 'to stop being friends after an argument', 'Friends sometimes ___ over silly things.', 'get along', 'If you argue a lot, you may ___ with your best friend.'],
      ['🫂', 'make up', 'barışmak', 'to become friends again after an argument', 'After the argument, they decided to ___ and say sorry.', 'fall out', 'We argued yesterday, but today we want to ___.'],
      ['📬', 'keep in touch', 'iletişimi sürdürmek', 'to continue to communicate with someone', "Let's ___ after you move to Canada.", 'lose touch', 'We live far apart, but we ___ by email.'],
      ['🔐', 'trust', 'güvenmek', 'to believe that someone is honest and reliable', 'I ___ my best friend with all my secrets.', 'doubt', 'A good friendship is based on ___.'],
      ['👂', 'listener', 'dinleyici', 'a person who listens', "She's a good ___; she always pays attention when I talk.", 'speaker', 'Someone who listens carefully to your problems is a good ___.'],
      ['😶', 'misunderstanding', 'yanlış anlaşılma', 'when someone understands something wrongly', 'There was a ___: she thought I said Monday, not Friday.', 'agreement', "I didn't mean that! It was just a ___."],
      ['🗯️', 'gossip', 'dedikodu', 'talk about other people\'s private lives', "Don't believe that ___ about her; it isn't true.", 'advice', 'People love to spread ___ about celebrities.'],
      ['🔕', 'lose touch', 'bağlantıyı kaybetmek', 'to stop communicating with someone over time', 'We ___ after she moved to Australia.', 'keep in touch', "Call your old friends so you don't ___ with them."],
      ['🫶', 'supportive', 'destekleyici', 'helpful and kind when someone has problems', 'My friends were very ___ when I was ill.', 'jealous', 'A good friend is ___ in difficult times.'],
    ],
  },

  'B1::Personality Traits': {
    intro: 'Adjectives for describing someone\'s character in more detail.',
    tip: 'Some traits have clear opposites: ambitious ↔ unambitious, patient ↔ impatient, modest ↔ arrogant.',
    words: [
      ['🧗', 'ambitious', 'hırslı', 'wanting very much to be successful', 'She is very ___; she wants to be the company director one day.', 'lazy', 'An ___ person has big goals for their career.'],
      ['🙏', 'reliable', 'güvenilir', 'someone you can trust to do what they promise', 'He is very ___; he always does what he says.', 'moody', 'I need a ___ person who will never be late.'],
      ['🐢', 'patient', 'sabırlı', 'able to wait calmly without getting angry', 'A good teacher must be ___ with young children.', 'rude', "Don't get angry. Be ___ — the bus will come soon."],
      ['🙄', 'arrogant', 'kibirli', 'thinking you are better than other people', 'He is so ___; he thinks he knows everything.', 'modest', 'An ___ person often looks down on other people.'],
      ['😎', 'easy-going', 'rahat, uysal', 'relaxed and not easily worried or annoyed', 'My dad is very ___; nothing makes him angry.', 'bad-tempered', 'She is ___ and happy to change plans at the last minute.'],
      ['🎭', 'moody', 'ruh hali değişken', 'often changing feelings, often unhappy', 'Teenagers can be ___: happy one minute, angry the next.', 'calm', 'He is so ___ — you never know how he will feel.'],
      ['🔍', 'curious', 'meraklı', 'wanting to know or learn about things', 'Children are ___; they ask lots of questions.', 'bored', 'She is ___ about other cultures and loves to travel.'],
      ['🥺', 'sensitive', 'hassas, duygusal', 'easily upset by what people say or do', 'He is very ___, so be careful what you say to him.', 'tough', "She cries easily; she's a very ___ person."],
      ['🌸', 'modest', 'alçakgönüllü', 'not talking much about your own achievements', 'She won three medals, but she is very ___ about it.', 'arrogant', "He is ___ and never says he's the best."],
      ['😤', 'bad-tempered', 'huysuz', 'often angry or easily annoyed', 'My neighbour is very ___; he shouts at everyone.', 'easy-going', "Don't ask him now; he's ___ in the mornings."],
    ],
  },

  'B1::Job Interviews': {
    intro: 'Vocabulary for applying for a job and talking about yourself in an interview.',
    tip: 'A common interview question is: "What are your strengths and weaknesses?" Prepare one example for each.',
    words: [
      ['📄', 'CV', 'özgeçmiş', 'a document listing your education and work experience', 'Send your ___ with your application.', 'salary', 'Your ___ shows your education and past jobs.'],
      ['✍️', 'application', 'başvuru', 'a formal request for a job', 'I sent my ___ for the job last week.', 'interview', 'The ___ form asks for your name and experience.'],
      ['💪', 'strength', 'güçlü yön', 'something you are good at', 'My biggest ___ is that I work well in a team.', 'weakness', '"What is your greatest ___?" — "I\'m very organised."'],
      ['🌱', 'weakness', 'zayıf yön', 'something you are not good at', 'My ___ is that I sometimes work too slowly.', 'strength', 'Interviewers often ask about your greatest ___.'],
      ['🧑‍💼', 'candidate', 'aday', 'a person who applies for a job', 'The best ___ for the job will start next month.', 'employer', 'Each ___ will have a 30-minute interview.'],
      ['🏢', 'employer', 'işveren', 'a person or company that gives people jobs', 'My ___ pays me every month.', 'employee', 'Your ___ is the company you work for.'],
      ['🎓', 'qualification', 'yeterlilik belgesi, diploma', 'an exam or course that shows you have a skill', 'You need a university ___ for this job.', 'hobby', 'A degree in nursing is a ___ for working in a hospital.'],
      ['💼', 'experience', 'deneyim', 'knowledge you get from doing a job', 'She has five years of ___ in marketing.', 'salary', 'This job needs two years of work ___.'],
      ['💷', 'salary', 'maaş', 'the money you earn every month or year from a job', 'The ___ for this job is £30,000 a year.', 'strength', 'Ask about the ___ at the end of the interview.'],
      ['🤝', 'interview', 'mülakat', 'a formal meeting where an employer asks you questions', 'I have a job ___ at 10 am tomorrow.', 'salary', 'Wear smart clothes to the ___.'],
    ],
  },

  'B1::Technology and Innovation': {
    intro: 'Words for talking about new inventions and how technology develops.',
    tip: '"Invention" is a new thing someone creates; "innovation" is a new idea or way of doing something.',
    words: [
      ['💡', 'invention', 'icat', 'something new that someone has created', 'The telephone was an important ___.', 'pollution', "The light bulb was Edison's most famous ___."],
      ['🧪', 'develop', 'geliştirmek', 'to create or improve something over time', 'The company wants to ___ a new electric car.', 'destroy', 'Scientists are working to ___ a better battery.'],
      ['🤖', 'robot', 'robot', 'a machine that can do work automatically', 'A ___ builds cars in this factory.', 'librarian', 'In some restaurants, a ___ brings your food.'],
      ['⚙️', 'device', 'cihaz', 'a machine or tool for a particular purpose', 'A smartwatch is a small electronic ___.', 'idea', 'A phone is a useful electronic ___.'],
      ['🆕', 'up-to-date', 'güncel', 'modern; with the latest information', 'This phone has the most ___ technology.', 'old-fashioned', 'Keep your software ___ to stay safe.'],
      ['🔋', 'battery', 'pil, batarya', 'something that stores electricity', 'My phone ___ is almost empty.', 'screen', 'Electric cars need a big ___.'],
      ['🚀', 'innovation', 'yenilik', 'a new idea or method', 'The internet was a huge ___ in communication.', 'tradition', 'Companies need ___ to stay successful.'],
      ['📡', 'wireless', 'kablosuz', 'working without cables', "My headphones are ___; they don't need a cable.", 'heavy', '___ internet lets you go online without cables.'],
      ['📲', 'update', 'güncellemek', 'to install the newest version of software', 'You should ___ your phone to fix the bugs.', 'destroy', 'My laptop needs to ___ before it restarts.'],
      ['🧑‍🔬', 'inventor', 'mucit', 'a person who creates something new', 'Thomas Edison was a famous ___.', 'customer', 'The ___ of the telephone was Alexander Graham Bell.'],
    ],
  },

  'B1::Crime and Punishment': {
    intro: 'Words for talking about crimes and what happens to criminals.',
    tip: 'A "thief" steals secretly; a "robber" steals using force or threats.',
    words: [
      ['🦹', 'thief', 'hırsız', 'a person who steals', 'The ___ stole my wallet.', 'judge', 'A person who takes things that are not theirs is a ___.'],
      ['🚔', 'arrest', 'tutuklamak', 'when the police take someone away because of a crime', 'The police want to ___ the man who robbed the bank.', 'thank', 'The police officer came to ___ him for stealing a car.'],
      ['🏛️', 'court', 'mahkeme', 'the place where a judge decides if someone is guilty', 'The case will go to ___ next month.', 'school', 'The judge works in a ___.'],
      ['⚖️', 'judge', 'hakim', 'the person who decides punishments in court', 'The ___ sent him to prison for two years.', 'witness', 'In court, the ___ decides the punishment.'],
      ['🔒', 'prison', 'hapishane', 'a building where criminals are kept', 'He spent five years in ___.', 'court', 'After the crime, she was sent to ___.'],
      ['😇', 'innocent', 'masum', 'not guilty of a crime', 'The court decided that he was ___, so he went home.', 'guilty', "She didn't do it; she is ___."],
      ['😈', 'guilty', 'suçlu', 'having done a crime', 'He stole the money, so the judge found him ___.', 'innocent', 'If you commit a crime, you are ___.'],
      ['💷', 'fine', 'para cezası', 'money you pay as a punishment', 'I got a £100 ___ for parking in the wrong place.', 'prize', 'If you drive too fast, you may have to pay a ___.'],
      ['🔫', 'robbery', 'soygun', 'stealing from a person or place, often with violence', 'There was a bank ___ yesterday.', 'wedding', 'Two men were arrested for the ___ of a jewellery shop.'],
      ['🧑‍⚖️', 'witness', 'tanık', 'a person who sees a crime happen', 'The police asked the ___ what she saw.', 'thief', 'A ___ described the robber to the police.'],
    ],
  },

  'B1::Law and Rules': {
    intro: 'Vocabulary for laws, rules and what is allowed or not allowed.',
    tip: 'A "law" is made by the government; a "rule" is made by a school, a club, a game, etc.',
    words: [
      ['📜', 'law', 'yasa', 'a rule made by the government', 'It is against the ___ to drive without a licence.', 'advice', 'The government made a new ___ about smoking.'],
      ['🚫', 'illegal', 'yasadışı', 'not allowed by law', 'It is ___ to steal.', 'legal', 'Selling drugs is ___.'],
      ['✅', 'legal', 'yasal', 'allowed by law', 'In many countries, it is ___ to drive at 18.', 'illegal', 'It is ___ to vote when you are 18.'],
      ['📏', 'rule', 'kural', 'something that tells you what you can or can\'t do', 'The school has a ___: no phones in class.', 'law', "In football, you can't touch the ball with your hands. That's a ___."],
      ['🙅', 'ban', 'yasaklamak', 'to officially say that something is not allowed', 'The city wants to ___ cars from the centre.', 'allow', 'Many countries ___ smoking in restaurants.'],
      ['🆗', 'permission', 'izin', 'when someone says you are allowed to do something', 'You need ___ from your parents to go on the trip.', 'punishment', 'Ask the teacher for ___ to leave the room.'],
      ['👮', 'obey', 'uymak', 'to do what a rule or law says', 'Drivers must ___ the speed limit.', 'break', 'Children should ___ their parents.'],
      ['💥', 'break the law', 'yasayı çiğnemek', 'to do something illegal', 'If you steal, you ___.', 'obey the law', 'Driving without a licence means you ___.'],
      ['⚠️', 'punishment', 'ceza', 'what happens to someone who breaks a rule or law', 'The ___ for stealing can be prison.', 'permission', 'Extra homework was his ___ for being late.'],
      ['🚸', 'allowed', 'izin verilen', 'permitted', 'Are dogs ___ in this park?', 'illegal', 'You are not ___ to smoke here.'],
    ],
  },

  'B1::Culture and Traditions': {
    intro: 'Words for talking about festivals, customs and traditions.',
    tip: 'A "custom" is a usual way of behaving; a "tradition" is a custom that has continued for a long time.',
    words: [
      ['🎎', 'tradition', 'gelenek', 'a custom that has existed for a long time', "It's a family ___ to eat together on Sundays.", 'invention', 'Giving presents at New Year is an old ___.'],
      ['🎆', 'festival', 'festival, bayram', 'a special day or period of celebration', 'Diwali is a ___ of lights in India.', 'factory', 'The town has a music ___ every summer.'],
      ['🙇', 'custom', 'âdet', 'a usual way of behaving in a society', "In Japan, it's a ___ to bow when you meet someone.", 'festival', 'Taking off your shoes at home is a ___ in Turkey.'],
      ['🎉', 'celebrate', 'kutlamak', 'to do something special for an important day', 'We ___ my birthday with a big party every year.', 'forget', 'How do you ___ New Year in your country?'],
      ['🏛️', 'heritage', 'miras', 'traditions and history from the past', 'The old city is part of our cultural ___.', 'pollution', "Museums protect a country's ___."],
      ['🛐', 'religion', 'din', 'a belief in a god or gods', 'Buddhism is a ___ followed by many people in Asia.', 'language', 'People of every ___ live in this city.'],
      ['💒', 'ceremony', 'tören', 'a formal event for a special occasion', 'The wedding ___ took place in a church.', 'meal', 'There was a ___ to open the new bridge.'],
      ['🍲', 'dish', 'yemek', 'food prepared in a particular way', 'Paella is a traditional Spanish ___.', 'festival', 'Kebab is a famous Turkish ___.'],
      ['🎊', 'national holiday', 'resmi tatil', "a day when a whole country celebrates and many people don't work", 'Republic Day is a ___ in Turkey.', 'working day', 'Schools and banks are closed on a ___.'],
      ['👘', 'costume', 'kostüm', 'special clothes worn for a festival or performance', "Each dancer's ___ was red and gold.", 'menu', 'For the festival, she wore a traditional ___.'],
    ],
  },

  'B1::Art and Literature': {
    intro: 'Words for talking about books, poems and works of art.',
    tip: 'A "novel" is a long story; a "short story" is much shorter. Both are "fiction".',
    words: [
      ['📖', 'novel', 'roman', 'a long story in a book', '"War and Peace" is a famous ___.', 'painting', 'She is writing a 300-page ___.'],
      ['✒️', 'poem', 'şiir', 'a piece of writing in lines that often rhyme', 'He wrote a short ___ about the sea.', 'sculpture', 'A ___ often has rhyming words.'],
      ['🖼️', 'painting', 'tablo', 'a picture made with paint', 'The Mona Lisa is a famous ___.', 'novel', 'There is a beautiful ___ of the sea on the wall.'],
      ['🗿', 'sculpture', 'heykel', 'a work of art made from stone, wood or metal', 'There is a large stone ___ in the park.', 'poem', "Michelangelo's David is a famous ___."],
      ['✍️', 'author', 'yazar', 'a person who writes books', 'J.K. Rowling is the ___ of Harry Potter.', 'reader', 'Who is the ___ of this book?'],
      ['🧙', 'character', 'karakter', 'a person in a story', 'Harry is the main ___ in the book.', 'author', 'My favourite ___ in the film is the funny dog.'],
      ['🖌️', 'exhibition', 'sergi', 'a public show of art', 'There is a new art ___ at the museum.', 'novel', "The gallery has an ___ of Picasso's paintings."],
      ['🧵', 'plot', 'olay örgüsü', 'the story of a book or film', 'The ___ of the novel is very exciting.', 'author', "Don't tell me the ___! I haven't read it yet."],
      ['🖋️', 'poet', 'şair', 'a person who writes poems', 'Shakespeare was a great ___.', 'painter', 'A ___ writes poems.'],
      ['🎨', 'gallery', 'galeri', 'a building where you can see art', 'We saw paintings by Van Gogh in the ___.', 'library', 'The new art ___ opens on Monday.'],
    ],
  },

  'B1::Accommodation Problems': {
    intro: 'Words for describing problems in a hotel and complaining politely.',
    tip: 'To complain politely, say: "I\'m afraid there\'s a problem with my room."',
    words: [
      ['🔊', 'noisy', 'gürültülü', 'with a lot of loud sound', "The room was very ___; I couldn't sleep.", 'quiet', 'Our room was next to the bar, so it was really ___.'],
      ['🦠', 'dirty', 'kirli', 'not clean', 'The bathroom was ___; there was hair in the sink.', 'spotless', 'The sheets were ___, so we asked for clean ones.'],
      ['🚿', 'out of order', 'bozuk, çalışmıyor', 'not working', 'The lift is ___, so we used the stairs.', 'fully booked', 'The shower is ___; there is no water.'],
      ['📢', 'complain', 'şikayet etmek', 'to say that you are not happy with something', 'I want to ___ about the noise in my room.', 'thank', 'If the room is dirty, you should ___ to the manager.'],
      ['🛎️', 'reception', 'resepsiyon', 'the desk where you check in at a hotel', 'Call ___ and ask for more towels.', 'kitchen', 'You get your room key at ___.'],
      ['💸', 'refund', 'para iadesi', 'money returned to you', 'The room was terrible, so I asked for a ___.', 'receipt', 'They gave us a full ___ because the hotel was closed.'],
      ['📅', 'overbooked', 'fazla rezervasyon almış', 'having more bookings than rooms', 'The hotel was ___, so there was no room for us.', 'empty', "When a hotel is ___, some guests can't get a room."],
      ['❄️', 'heating', 'ısıtma', 'a system that makes a building warm', "The ___ wasn't working, and the room was freezing.", 'wifi', "It's cold in here. Can you turn on the ___?"],
      ['🔑', 'key card', 'kartlı anahtar', 'a plastic card used to open a hotel room door', "My ___ doesn't work. I can't open the door.", 'receipt', 'Put the ___ in the slot to turn on the lights.'],
      ['🧳', 'check out', 'odadan çıkış yapmak', 'to pay and leave a hotel', 'We have to ___ before 11 am.', 'check in', 'After breakfast, we went to reception to ___.'],
    ],
  },

  'B1::Health and Lifestyle': {
    intro: 'Words for talking about healthy and unhealthy habits.',
    tip: '"Give up" means stop doing something (give up smoking); "take up" means start a new activity (take up yoga).',
    words: [
      ['🥗', 'healthy', 'sağlıklı', 'good for your body', 'Eating fruit and vegetables is ___.', 'harmful', 'She has a ___ diet with lots of fish and salad.'],
      ['🏃', 'work out', 'spor yapmak', 'to exercise to keep fit', 'I ___ at the gym three times a week.', 'give up', 'To stay fit, try to ___ every day.'],
      ['🚭', 'give up', 'bırakmak', 'to stop doing something, e.g. smoking', 'He wants to ___ smoking.', 'take up', "It's hard to ___ sugar, but it's good for you."],
      ['😫', 'stress', 'stres', 'worry caused by pressure', 'Too much work causes ___.', 'fitness', 'Yoga can help you reduce ___.'],
      ['⚖️', 'balanced diet', 'dengeli beslenme', 'eating the right amounts of different foods', 'A ___ includes fruit, vegetables, protein and grains.', 'junk food', 'Doctors recommend a ___ with many types of food.'],
      ['🍔', 'junk food', 'abur cubur', 'unhealthy food like burgers and crisps', 'Eating too much ___ is bad for you.', 'salad', 'Crisps and fizzy drinks are ___.'],
      ['💪', 'fit', 'formda', 'healthy and strong, especially from exercise', 'He runs every day, so he is very ___.', 'lazy', 'Swimming is a great way to keep ___.'],
      ['🔁', 'habit', 'alışkanlık', 'something you do regularly', 'Going to bed early is a good ___.', 'illness', 'Smoking is a bad ___.'],
      ['🚶', 'take up', 'başlamak (yeni bir aktiviteye)', 'to start a new hobby or activity', 'I want to ___ yoga this year.', 'give up', 'My doctor told me to ___ swimming.'],
      ['😴', 'lack of sleep', 'uykusuzluk', 'not getting enough sleep', '___ can make you tired and stressed.', 'Junk food', 'He feels terrible because of ___.'],
    ],
  },

  'B1::Food and Nutrition': {
    intro: 'Words for talking about what is in our food and how it affects our health.',
    tip: 'Most nutrient words are uncountable: protein, fat, fibre. But "vitamin" and "calorie" are countable.',
    words: [
      ['🥩', 'protein', 'protein', 'a nutrient in meat, eggs and beans that builds muscles', 'Eggs and meat are rich in ___.', 'sugar', 'Your muscles need ___ to grow.'],
      ['🍝', 'carbohydrates', 'karbonhidratlar', 'nutrients in bread, rice and pasta that give energy', 'Bread, rice and pasta are full of ___.', 'cholesterol', 'Athletes eat a lot of ___ before a race to get energy.'],
      ['🍊', 'vitamin', 'vitamin', 'a natural substance in food that you need to be healthy', 'Oranges contain a lot of ___ C.', 'protein', '___ D comes from the sun and some foods.'],
      ['🔥', 'calories', 'kalori', 'units that measure the energy in food', 'A chocolate bar has about 250 ___.', 'vitamins', 'If you want to lose weight, eat fewer ___.'],
      ['🧈', 'fat', 'yağ', 'a nutrient found in oil, butter and cheese', 'Butter contains a lot of ___.', 'fibre', 'Fried food is high in ___.'],
      ['🥦', 'fibre', 'lif', 'the part of plants that helps digestion', 'Vegetables and whole grains are high in ___.', 'fat', 'Eat brown bread; it has more ___ than white bread.'],
      ['🌭', 'processed food', 'işlenmiş gıda', 'food changed in a factory, often with added chemicals', 'Sausages and crisps are ___.', 'fresh food', 'Try to eat less ___ and more fresh vegetables.'],
      ['🍽️', 'portion', 'porsiyon', 'the amount of food for one person', 'This restaurant serves a very big ___ of chips.', 'recipe', 'Eat a small ___ of rice with your fish.'],
      ['🥬', 'organic', 'organik', 'grown without chemicals', 'These ___ vegetables are grown without chemicals.', 'processed', '___ food is often more expensive.'],
      ['🥛', 'dairy products', 'süt ürünleri', 'milk and food made from milk', 'Cheese and yogurt are ___.', 'carbohydrates', 'Some people cannot eat ___ like milk and butter.'],
    ],
  },

  'B1::Common Idioms': {
    intro: 'Everyday idioms: their meaning is different from the meaning of each word.',
    tip: 'Learn idioms in example sentences; translating them word by word usually doesn\'t work.',
    words: [
      ['🍰', 'a piece of cake', 'çocuk oyuncağı', 'very easy', 'The test was ___; I finished in ten minutes.', 'a pain in the neck', "Don't worry, the exam will be ___."],
      ['🌧️', 'under the weather', 'keyifsiz, hasta', 'feeling a little ill', "I'm feeling ___ today, so I'll stay at home.", 'over the moon', "She's ___; she has a cold."],
      ['🌙', 'over the moon', 'çok mutlu', 'extremely happy', 'She was ___ when she got the job.', 'under the weather', "We're ___ about the new baby!"],
      ['🔔', 'ring a bell', 'tanıdık gelmek', 'to sound familiar', 'Does the name Peter Smith ___?', 'break the ice', "That song doesn't ___. I've never heard it."],
      ['🧊', 'break the ice', 'buzları eritmek', 'to make people feel relaxed when they first meet', 'He told a joke to ___ at the meeting.', 'ring a bell', 'Games are a good way to ___ on the first day of school.'],
      ['💸', 'cost an arm and a leg', 'çok pahalı olmak', 'to be very expensive', 'That sports car must ___!', 'cost nothing', 'Holidays in Switzerland can ___.'],
      ['🌕', 'once in a blue moon', 'kırk yılda bir', 'very rarely', 'I see my cousins only ___.', 'every day', 'He eats fast food ___ — maybe once a year.'],
      ['👀', 'keep an eye on', 'göz kulak olmak', 'to watch something carefully', 'Can you ___ my bag while I go to the toilet?', 'turn a blind eye to', 'Please ___ the baby while I cook.'],
      ['😩', 'a pain in the neck', 'baş belası', 'a person or thing that is very annoying', 'This slow computer is ___!', 'a piece of cake', 'My little brother can be ___ sometimes.'],
      ['🙈', 'turn a blind eye to', 'görmezden gelmek', 'to pretend not to see something wrong', 'The teacher decided to ___ the students using phones.', 'keep an eye on', "You can't ___ cheating in an exam."],
    ],
  },

  'B1::Collocations': {
    intro: 'Common word partnerships with verbs like make, do, take, keep and break.',
    tip: '"Make" is often for creating something (make a decision); "do" is often for activities and work (do research).',
    words: [
      ['🎯', 'make a decision', 'karar vermek', 'to decide something', 'We need to ___ about the holiday today.', 'do a decision', "It's hard to ___ when you have many choices."],
      ['📈', 'make progress', 'ilerleme kaydetmek', 'to improve or get better', 'Practise every day and you will ___.', 'do progress', 'With a good teacher, students ___ quickly.'],
      ['📚', 'do research', 'araştırma yapmak', 'to study a subject carefully to find information', 'Scientists ___ to find new medicines.', 'make research', 'Before writing the essay, you should ___ online.'],
      ['🏅', 'take part in', 'katılmak', 'to join an activity', 'Twenty schools will ___ the competition.', 'make part in', 'Do you want to ___ the school play?'],
      ['🤞', 'keep a promise', 'sözünü tutmak', 'to do what you said you would do', 'He always tries to ___.', 'do a promise', "If you say you'll help, you must ___."],
      ['🏠', 'pay a visit', 'ziyaret etmek', 'to visit someone or somewhere', "Let's ___ to Grandma this weekend.", 'do a visit', "I'll ___ to my old school when I'm in town."],
      ['🤧', 'catch a cold', 'soğuk algınlığına yakalanmak', 'to become ill with a cold', "Wear a coat or you'll ___.", 'take a cold', "It's easy to ___ in winter."],
      ['🏆', 'break a record', 'rekor kırmak', 'to do better than anyone before', 'She hopes to ___ in the 100 metres.', 'make a record', 'Usain Bolt wanted to ___ at the Olympics.'],
      ['📞', 'make a phone call', 'telefon etmek', 'to call someone on the phone', 'Excuse me, I need to ___.', 'do a phone call', 'Can I use your phone to ___?'],
      ['🙈', 'tell a lie', 'yalan söylemek', 'to say something that is not true', 'Never ___ to your parents.', 'say a lie', 'He was afraid, so he decided to ___.'],
    ],
  },

  'B1::Word Formation': {
    intro: 'How prefixes and suffixes change words into new words (un-, -ive, -th, -able, -er, -less, -ery, -sion).',
    tip: 'Look at the word in the sentence: after "a / the" you usually need a noun; before a noun you usually need an adjective.',
    words: [
      ['😞', 'unhappy', 'mutsuz', 'not happy (un- + happy)', 'She was ___ because she lost her job.', 'happiness', 'The prefix un- turns "happy" into "___".'],
      ['🎨', 'creative', 'yaratıcı', 'good at making new things (create + -ive)', 'She is very ___; she paints and writes stories.', 'creation', 'create (verb) → ___ (adjective)'],
      ['💪', 'strength', 'güç', 'the noun from "strong"', "He doesn't have the ___ to lift that box.", 'strong', 'strong (adjective) → ___ (noun)'],
      ['😃', 'enjoyable', 'keyifli', 'pleasant (enjoy + -able)', 'We had a very ___ evening.', 'enjoyment', 'enjoy (verb) → ___ (adjective)'],
      ['🧑‍💼', 'manager', 'yönetici', 'the person who manages (manage + -er)', 'The ___ of the shop gave me a refund.', 'management', 'manage (verb) → ___ (the person)'],
      ['🫤', 'careless', 'dikkatsiz', 'without care (care + -less)', 'He made a ___ mistake in the test.', 'careful', 'care + -less → ___'],
      ['📦', 'delivery', 'teslimat', 'the noun from "deliver"', 'The ___ will arrive tomorrow.', 'deliver', 'deliver (verb) → ___ (noun)'],
      ['🤔', 'decision', 'karar', 'the noun from "decide"', 'It was a difficult ___.', 'decide', 'decide (verb) → ___ (noun)'],
      ['😊', 'happiness', 'mutluluk', 'the noun from "happy"', 'Money cannot buy ___.', 'happy', 'happy (adjective) → ___ (noun)'],
      ['🗣️', 'information', 'bilgi', 'the noun from "inform"', 'Can you give me some ___ about the course?', 'inform', 'inform (verb) → ___ (noun)'],
    ],
  },

  'B1::Synonyms and Antonyms': {
    intro: 'Synonyms are words with a similar meaning; antonyms are words with the opposite meaning.',
    tip: 'Using synonyms makes your writing more interesting: instead of "very big" again and again, say "huge".',
    words: [
      ['😀', 'glad', 'memnun', 'a synonym of "happy"', "I'm ___ you could come to the party.", 'sorry', 'happy = ___ (synonym, starts with g)'],
      ['🐘', 'huge', 'devasa', 'a synonym of "very big"', 'An elephant is ___.', 'tiny', 'very big = ___ (synonym, starts with h)'],
      ['🐜', 'tiny', 'minicik', 'a synonym of "very small"; the opposite of "huge"', 'An ant is ___.', 'huge', 'the opposite of "huge" = ___'],
      ['🚀', 'rapid', 'hızlı', 'a synonym of "fast"', 'There was a ___ increase in prices.', 'slow', 'fast = ___ (synonym, starts with r)'],
      ['🥶', 'freezing', 'dondurucu', 'a synonym of "very cold"; the opposite of "boiling"', "It's ___ outside; wear a hat and gloves.", 'boiling', 'the opposite of "boiling hot" = ___'],
      ['😩', 'exhausted', 'bitkin', 'a synonym of "very tired"', 'After the marathon, she was ___.', 'energetic', 'very tired = ___ (synonym, starts with e)'],
      ['🙅', 'reject', 'reddetmek', 'the opposite of "accept"', 'They decided to ___ the offer because the money was too low.', 'accept', 'the opposite of "accept" = ___'],
      ['🤫', 'silent', 'sessiz', 'the opposite of "noisy"', 'The classroom was completely ___ during the exam.', 'noisy', 'the opposite of "noisy" = ___'],
      ['💪', 'energetic', 'enerjik', 'the opposite of "exhausted"', 'After a good sleep, I feel ___.', 'exhausted', 'the opposite of "exhausted" = ___'],
      ['🎁', 'accept', 'kabul etmek', 'the opposite of "reject"', 'She decided to ___ the job offer.', 'reject', 'the opposite of "reject" = ___'],
    ],
  },

  'B1::Describing Experiences and Events': {
    intro: 'Strong adjectives for describing experiences, trips and events.',
    tip: 'Adjectives ending in -ing describe the experience (an embarrassing moment); -ed adjectives describe how you feel (I was embarrassed).',
    words: [
      ['😲', 'amazing', 'muhteşem', 'very surprising and great', 'The view from the top was ___!', 'awful', 'The concert was ___ — the best night of my life!'],
      ['😖', 'awful', 'berbat', 'very bad', "The food was ___; I couldn't eat it.", 'delicious', 'We had an ___ time; it rained every day.'],
      ['🎢', 'thrilling', 'heyecan verici', 'very exciting', 'The roller coaster was ___!', 'boring', 'It was a ___ match with a goal in the last minute.'],
      ['✨', 'unforgettable', 'unutulmaz', 'so special that you will always remember it', 'Our trip to Paris was ___.', 'ordinary', 'Meeting my favourite singer was an ___ moment.'],
      ['😬', 'embarrassing', 'utandırıcı', 'making you feel shy or silly', 'I fell over in front of everyone. It was so ___!', 'relaxing', "Forgetting your teacher's name is ___."],
      ['😌', 'relaxing', 'rahatlatıcı', 'making you feel calm', 'A hot bath is very ___.', 'stressful', 'We had a ___ day on the beach.'],
      ['😕', 'disappointing', 'hayal kırıklığı yaratan', 'not as good as you hoped', 'The film was ___; the book was much better.', 'fantastic', 'Losing the final was very ___ for the team.'],
      ['🕰️', 'memorable', 'akılda kalıcı', 'worth remembering', 'Our wedding day was very ___.', 'forgettable', 'It was a ___ holiday that we still talk about.'],
      ['😴', 'boring', 'sıkıcı', 'not interesting', 'The lecture was so ___ that I fell asleep.', 'thrilling', 'Three hours of waiting at the airport was really ___.'],
      ['😰', 'stressful', 'stresli', 'making you feel worried and under pressure', 'Moving house is very ___.', 'relaxing', 'The week before the exams was ___ for everyone.'],
    ],
  },

  // ───────────────────────────── B2 ─────────────────────────────
  'B2::Advanced Personality Vocabulary': {
    intro: 'More precise adjectives for describing character.',
    tip: 'Some words sound positive or negative depending on context: "assertive" is positive, "aggressive" is negative.',
    words: [
      ['🦁', 'assertive', 'kendinden emin, girişken', 'confident and able to say clearly what you want', 'You need to be ___ to ask for a pay rise.', 'timid', 'An ___ manager says clearly what she needs.'],
      ['📚', 'introverted', 'içe dönük', 'quiet and enjoying time alone', "He's quite ___ and prefers reading to going to parties.", 'outgoing', "Being ___ doesn't mean you are unfriendly."],
      ['🎤', 'outgoing', 'dışa dönük', 'friendly and enjoying meeting people', "She's very ___ and makes friends easily.", 'reserved', 'An ___ person loves parties.'],
      ['🧭', 'conscientious', 'işini titizlikle yapan', 'careful to do work well and thoroughly', 'A ___ student always checks her homework twice.', 'careless', 'He is ___ and never misses a deadline.'],
      ['🎲', 'impulsive', 'düşünmeden hareket eden', 'acting suddenly without thinking', 'He is ___ and often buys things he doesn\'t need.', 'cautious', "Don't be ___ — think before you decide."],
      ['🧱', 'resilient', 'dirençli', 'able to recover quickly from difficulties', 'Children are often ___ and adapt quickly to change.', 'fragile', "She lost her job but found a new one quickly; she's very ___."],
      ['🙇', 'modest', 'alçakgönüllü', 'not talking much about your own achievements', 'Despite winning, he remained ___.', 'boastful', 'She is ___ and never brags about her success.'],
      ['👁️', 'perceptive', 'sezgisi güçlü', 'quick to notice and understand things', 'A ___ teacher notices when a student is unhappy.', 'oblivious', 'She is very ___; she understood the problem immediately.'],
      ['🧊', 'reserved', 'çekingen, ketum', 'not showing your feelings or opinions easily', "She's quite ___ and doesn't talk much about herself.", 'outgoing', 'At first he seemed ___, but he is very funny when you know him.'],
      ['🐭', 'timid', 'ürkek', 'shy and easily frightened', 'The ___ child hid behind his mother.', 'assertive', 'She was too ___ to ask the teacher a question.'],
    ],
  },

  'B2::Human Behaviour and Psychology': {
    intro: 'Vocabulary for describing how people think, feel and behave.',
    tip: '"Empathy" means feeling with someone; "sympathy" means feeling sorry for someone.',
    words: [
      ['🔋', 'motivation', 'motivasyon', 'the reason or desire to do something', 'Lack of ___ is why many people stop going to the gym.', 'fatigue', 'Money is not the only ___ for working hard.'],
      ['🐑', 'peer pressure', 'akran baskısı', 'influence from people your age to behave like them', 'Many teenagers start smoking because of ___.', 'self-esteem', 'He tried to resist ___ from his classmates.'],
      ['💭', 'self-esteem', 'öz saygı', 'how much you value yourself', 'Praise can help children build ___.', 'peer pressure', 'Low ___ can make people feel worthless.'],
      ['🧩', 'cognitive', 'bilişsel', 'related to thinking and understanding', 'Puzzles can improve ___ skills.', 'physical', 'Memory and attention are ___ abilities.'],
      ['🔄', 'habitual', 'alışkanlık haline gelmiş', 'done regularly as a habit', "His ___ lateness annoyed his boss.", 'occasional', 'Checking your phone every minute can become ___.'],
      ['😰', 'anxiety', 'kaygı', 'a feeling of worry and nervousness', 'Exams cause ___ for many students.', 'relief', 'Breathing exercises can reduce ___.'],
      ['🪞', 'empathy', 'empati', "the ability to understand other people's feelings", 'Good doctors show ___ for their patients.', 'indifference', 'Having ___ means you can imagine how others feel.'],
      ['🎯', 'bias', 'önyargı', 'an unfair preference for or against something', 'Everyone has some unconscious ___.', 'evidence', 'Judges must make decisions without ___.'],
      ['😮‍💨', 'relief', 'rahatlama', 'a happy feeling when something unpleasant stops', 'It was a ___ to hear that everyone was safe.', 'anxiety', 'She passed the exam, and felt huge ___.'],
      ['🙄', 'indifference', 'kayıtsızlık', 'a lack of interest or care', "His ___ to other people's problems surprised me.", 'empathy', "The public's ___ to the election was clear: few people voted."],
    ],
  },

  'B2::Social Issues and Inequality': {
    intro: 'Vocabulary for discussing problems in society and unfair differences between groups.',
    tip: 'Many of these nouns are uncountable: poverty, inequality, unemployment, homelessness.',
    words: [
      ['🏚️', 'poverty', 'yoksulluk', 'the state of being very poor', 'Millions of people still live in ___.', 'luxury', 'The government wants to reduce child ___.'],
      ['⚖️', 'inequality', 'eşitsizlik', 'an unfair difference between groups of people', 'There is great ___ between rich and poor.', 'equality', 'Income ___ is growing in many countries.'],
      ['🚫', 'discrimination', 'ayrımcılık', 'unfair treatment because of race, gender, age, etc.', 'Racial ___ is against the law.', 'tolerance', 'Women still face ___ in some workplaces.'],
      ['🛏️', 'homelessness', 'evsizlik', 'having nowhere to live', '___ is a serious problem in big cities.', 'Tourism', 'Charities help people affected by ___.'],
      ['🤲', 'welfare', 'sosyal yardım', 'government help for people in need', 'The government spends billions on ___ every year.', 'fashion', 'Unemployed people may receive ___ payments.'],
      ['🧑‍🤝‍🧑', 'minority', 'azınlık', 'a small group that is different from the larger group', 'The law protects the rights of every ___ group.', 'luxury', 'Only a small ___ of people voted against it.'],
      ['📉', 'unemployment', 'işsizlik', 'not having a job', '___ rose to 10% last year.', 'Tourism', 'Many young people are affected by ___.'],
      ['🪨', 'marginalised', 'dışlanmış', 'treated as unimportant and pushed to the edge of society', '___ communities often have poor access to healthcare.', 'Privileged', 'The charity supports ___ groups who are ignored by society.'],
      ['🤝', 'tolerance', 'hoşgörü', 'accepting people who are different from you', 'Schools should teach ___ and respect.', 'discrimination', 'A healthy society needs ___ of different opinions.'],
      ['🎓', 'privileged', 'ayrıcalıklı', 'having advantages that others do not have', 'He grew up in a ___ family with lots of money.', 'marginalised', 'Only ___ students could afford the private school.'],
    ],
  },

  'B2::Politics and Government': {
    intro: 'Vocabulary for elections, government and political life.',
    tip: '"Politics" is the activity; a "policy" is a plan of action; a "politician" is a person.',
    words: [
      ['🗳️', 'election', 'seçim', 'when people vote to choose a government', 'The next general ___ is in May.', 'ceremony', 'Who won the presidential ___?'],
      ['🏛️', 'parliament', 'meclis', 'the group of people who make the laws', 'The new law was approved by ___.', 'the police', 'Members of ___ debate new laws.'],
      ['📜', 'policy', 'politika', 'a plan of action by a government or organisation', 'The government announced a new ___ on education.', 'election', "What is the party's ___ on immigration?"],
      ['🙋', 'candidate', 'aday', 'a person who wants to be elected', 'Each ___ gave a speech before the vote.', 'policy', 'She is the ___ for mayor.'],
      ['🕊️', 'democracy', 'demokrasi', 'a system where people choose their government by voting', 'In a ___, citizens elect their leaders.', 'dictatorship', 'Free elections are essential in a ___.'],
      ['🧑‍💼', 'minister', 'bakan', 'a member of the government in charge of a department', 'The health ___ visited the new hospital.', 'voter', 'The education ___ announced new school rules.'],
      ['📢', 'campaign', 'kampanya', 'organised activities to win an election', 'The election ___ lasted three months.', 'policy', 'She spent millions on her ___.'],
      ['🔧', 'reform', 'reform', 'a change to improve a system', 'The country needs tax ___.', 'tradition', 'The government promised ___ of the healthcare system.'],
      ['🧑‍🤝‍🧑', 'voter', 'seçmen', 'a person who votes in an election', 'Every ___ must show an ID card at the polling station.', 'minister', 'A ___ chooses a candidate in an election.'],
      ['👑', 'dictatorship', 'diktatörlük', 'a system where one person has total power', 'In a ___, people cannot choose their leader.', 'democracy', 'The country was a ___ for thirty years.'],
    ],
  },

  'B2::Economics and Global Markets': {
    intro: 'Vocabulary for describing economies, trade and international markets.',
    tip: '"Export" and "import" can be verbs (to ex-PORT) or nouns (an EX-port). The stress moves!',
    words: [
      ['📊', 'supply and demand', 'arz ve talep', 'how much of something is available and how much people want it', 'Prices depend on ___.', 'profit and loss', 'When ___ change, prices go up or down.'],
      ['🌐', 'trade', 'ticaret', 'buying and selling goods between countries', 'International ___ has grown very fast.', 'pollution', 'China and the USA do a lot of ___ with each other.'],
      ['🚢', 'export', 'ihraç etmek', 'to sell goods to another country', 'Turkey wants to ___ more cars to Europe.', 'import', 'Countries usually ___ the products they make cheaply.'],
      ['📦', 'import', 'ithal etmek', 'to buy goods from another country', "The UK doesn't grow bananas, so it has to ___ them.", 'export', 'Japan has little oil, so it must ___ it.'],
      ['📉', 'recession', 'durgunluk', 'a period when the economy gets smaller', 'Many people lost their jobs during the ___.', 'boom', 'The country is in ___; the economy has shrunk for six months.'],
      ['📈', 'growth', 'büyüme', 'an increase in the size of the economy', 'Economic ___ was 3% last year.', 'recession', 'The government wants faster economic ___.'],
      ['🏦', 'investor', 'yatırımcı', 'a person who puts money into a business to make a profit', 'An ___ bought 10% of the company.', 'employee', 'The ___ hopes the shares will rise in value.'],
      ['💱', 'tariff', 'gümrük vergisi', 'a tax on imported goods', 'The government put a ___ on foreign cars.', 'discount', 'A new ___ made imported steel more expensive.'],
      ['💥', 'boom', 'patlama (ekonomik)', 'a period when the economy grows very fast', 'During the economic ___, many new businesses opened.', 'recession', 'There was a housing ___ and prices doubled.'],
      ['💹', 'inflation', 'enflasyon', 'a general rise in prices', 'High ___ means your money buys less.', 'growth', 'The central bank raised interest rates to control ___.'],
    ],
  },

  'B2::Business and Entrepreneurship': {
    intro: 'Vocabulary for starting and running your own business.',
    tip: '"Revenue" is all the money a company receives; "profit" is what is left after costs.',
    words: [
      ['🚀', 'start-up', 'yeni kurulan şirket', 'a new small company', 'She left her job to launch a tech ___.', 'retirement', 'A new company that has just started is a ___.'],
      ['💡', 'entrepreneur', 'girişimci', 'a person who starts their own business', 'Steve Jobs was a famous ___.', 'employee', 'An ___ takes risks to build a business.'],
      ['💰', 'funding', 'finansman', 'money given for a project or business', 'The company received ___ from investors.', 'advice', "Without ___, the start-up couldn't grow."],
      ['🎯', 'target market', 'hedef pazar', 'the group of customers a business wants to sell to', 'Teenagers are the ___ for this game.', 'board of directors', 'Before launching, define your ___.'],
      ['🤝', 'partnership', 'ortaklık', 'an agreement to work together in business', 'The two companies formed a ___.', 'competition', 'They started the café as a ___ between two friends.'],
      ['💵', 'revenue', 'gelir, hasılat', 'money a business receives from sales', "The company's ___ increased by 20%.", 'debt', 'Sales bring in ___ for the company.'],
      ['⚠️', 'risk', 'risk', 'the possibility of losing something', 'Starting a business involves a lot of ___.', 'luck', 'Investing in a new company is a big ___.'],
      ['📝', 'business plan', 'iş planı', "a document describing a business's goals and strategy", 'Banks want to see a ___ before giving a loan.', 'CV', 'Write a ___ that explains how you will make money.'],
      ['📉', 'profit', 'kâr', 'money left after all costs are paid', 'The company made a ___ of one million dollars.', 'debt', 'If costs are higher than sales, there is no ___.'],
      ['🏁', 'launch', 'piyasaya sürmek', 'to start selling a new product', 'The company will ___ its new phone in May.', 'cancel', 'They plan to ___ the app next month.'],
    ],
  },

  'B2::Professional Communication': {
    intro: 'Vocabulary for emails, meetings and communication at work.',
    tip: 'The "agenda" is the plan before a meeting; the "minutes" are the record after it.',
    words: [
      ['📧', 'follow up', 'takip etmek', 'to contact someone again after a first meeting or message', "I'll ___ with an email after the meeting.", 'put off', "If they don't reply, ___ with a phone call."],
      ['📎', 'attachment', 'ek dosya', 'a file sent with an email', 'Please see the ___ for the full report.', 'signature', 'I forgot to add the ___ to my email.'],
      ['📅', 'agenda', 'gündem', 'a list of topics for a meeting', 'The first item on the ___ is the budget.', 'attachment', 'Please send the ___ before the meeting.'],
      ['📝', 'minutes', 'toplantı tutanağı', 'a written record of what was said at a meeting', "Who is taking the ___ at today's meeting?", 'agenda', 'The ___ of the last meeting were approved.'],
      ['🤝', 'negotiate', 'müzakere etmek', 'to discuss something to reach an agreement', 'We need to ___ a better price with the supplier.', 'postpone', 'The unions will ___ with management about salaries.'],
      ['🗣️', 'feedback', 'geri bildirim', 'comments about how well someone did', 'My manager gave me useful ___ on my presentation.', 'salary', 'Please give us your ___ on the new product.'],
      ['⏳', 'deadline', 'son teslim tarihi', 'the time by which something must be done', 'The ___ for the report is Friday.', 'agenda', 'We worked late to meet the ___.'],
      ['🎙️', 'presentation', 'sunum', 'a talk that gives information to an audience', 'She gave a ___ to the board of directors.', 'minutes', 'Use slides to make your ___ clearer.'],
      ['✍️', 'signature', 'imza (e-posta)', 'your name and details at the end of an email', 'Add your phone number to your email ___.', 'agenda', 'My job title is in my email ___.'],
      ['⏸️', 'postpone', 'ertelemek', 'to move an event to a later time', 'We have to ___ the meeting until Friday.', 'negotiate', "Can we ___ the call? I'm stuck in traffic."],
    ],
  },

  'B2::Academic Vocabulary': {
    intro: 'Words often used in essays, reports and academic texts.',
    tip: 'Academic linkers like "consequently" are more formal than "so". Use them in essays, not in chats.',
    words: [
      ['🔍', 'analyse', 'analiz etmek', 'to examine something in detail', 'Researchers ___ the data carefully.', 'ignore', 'In this essay, ___ the causes of the war.'],
      ['📌', 'significant', 'önemli, kayda değer', 'important or large enough to notice', 'There was a ___ increase in sales.', 'minor', 'The results show a ___ difference between the groups.'],
      ['🧾', 'evidence', 'kanıt', 'facts that show something is true', 'There is no ___ that the drug works.', 'opinion', 'Support your argument with ___.'],
      ['💭', 'concept', 'kavram', 'an abstract idea', 'Democracy is a difficult ___ to explain to children.', 'object', 'The ___ of time is hard to define.'],
      ['➡️', 'consequently', 'sonuç olarak', 'as a result', "He didn't study; ___, he failed.", 'however', 'The road was closed; ___, we were late.'],
      ['📖', 'define', 'tanımlamak', 'to explain the exact meaning of a word or idea', 'First, ___ the key terms in your essay.', 'delete', 'It is difficult to ___ "happiness".'],
      ['🔗', 'relevant', 'ilgili', 'connected to the subject being discussed', 'Only include ___ information in your answer.', 'irrelevant', 'This article is very ___ to my research.'],
      ['📐', 'approach', 'yaklaşım', 'a way of dealing with something', 'We need a new ___ to this problem.', 'result', 'The teacher uses a practical ___ to grammar.'],
      ['🎯', 'objective', 'amaç; nesnel', 'a goal; or not influenced by personal feelings', 'The main ___ of this study is to measure stress levels.', 'opinion', 'Scientists try to be ___ when they analyse results.'],
      ['🧩', 'interpret', 'yorumlamak', 'to explain the meaning of something', 'How do you ___ these results?', 'ignore', 'Different readers ___ the poem in different ways.'],
    ],
  },

  'B2::Research and Scientific Studies': {
    intro: 'Vocabulary for describing how scientific research is done and reported.',
    tip: '"Data" is often used with a singular verb in everyday English (the data shows), but plural in formal science (the data show).',
    words: [
      ['🧪', 'hypothesis', 'hipotez', 'an idea that can be tested', 'The experiment tested the ___ that sleep improves memory.', 'conclusion', 'Scientists form a ___ before doing an experiment.'],
      ['🔬', 'experiment', 'deney', 'a scientific test', 'We did an ___ to see how plants react to light.', 'opinion', 'The ___ was repeated three times.'],
      ['👥', 'sample', 'örneklem', 'a small group chosen from a larger population', 'The study used a ___ of 500 people.', 'hypothesis', 'A larger ___ gives more reliable results.'],
      ['📊', 'data', 'veri', 'facts and numbers collected for analysis', 'The researchers collected ___ from 20 schools.', 'theories', 'We analysed the ___ using special software.'],
      ['✅', 'findings', 'bulgular', 'the results of a study', 'The ___ of the study were published in a journal.', 'questions', 'The ___ suggest that exercise reduces stress.'],
      ['🔁', 'replicate', 'tekrarlamak (deneyi)', 'to repeat a study and get the same results', 'Other scientists could not ___ the results.', 'invent', 'A good experiment should be easy to ___.'],
      ['📰', 'peer review', 'hakem değerlendirmesi', 'the checking of research by other experts before it is published', 'Every article goes through ___ before it is published.', 'advertising', 'Other scientists check the work during ___.'],
      ['📉', 'correlation', 'korelasyon, ilişki', 'a connection between two things', 'There is a strong ___ between smoking and lung disease.', 'difference', 'A ___ does not always mean one thing causes the other.'],
      ['📋', 'survey', 'anket', 'a set of questions asked to many people', 'We did a ___ of 1,000 students about their sleep.', 'hypothesis', 'Please complete this short online ___.'],
      ['🔚', 'conclusion', 'sonuç', 'the final decision after studying the evidence', 'The ___ of the study is that coffee is not harmful.', 'hypothesis', 'In the ___, the author summarises the main findings.'],
    ],
  },

  'B2::Science and Technology': {
    intro: 'Vocabulary for scientific tools, discoveries and computer technology.',
    tip: 'A "telescope" looks at things far away; a "microscope" looks at very small things.',
    words: [
      ['🧬', 'genetic', 'genetik', 'related to genes', 'Some diseases are ___ and run in families.', 'digital', 'Eye colour is a ___ feature.'],
      ['🛰️', 'satellite', 'uydu', 'an object in space that sends signals to Earth', 'GPS uses ___ signals.', 'microscope', 'The ___ goes around the Earth every 90 minutes.'],
      ['🔭', 'telescope', 'teleskop', 'an instrument for seeing distant objects', 'We looked at the stars through a ___.', 'microscope', 'The Hubble ___ takes pictures of distant galaxies.'],
      ['🦠', 'microscope', 'mikroskop', 'an instrument for seeing very small things', 'You need a ___ to see bacteria.', 'telescope', 'Under the ___, the cells looked huge.'],
      ['⚛️', 'breakthrough', 'çığır açan buluş', 'an important new discovery', 'The vaccine was a major medical ___.', 'failure', 'Scientists announced a ___ in cancer research.'],
      ['💾', 'software', 'yazılım', 'programs that run on a computer', 'You need to update the ___ on your laptop.', 'hardware', 'This ___ helps you edit photos.'],
      ['🖥️', 'hardware', 'donanım', 'the physical parts of a computer', 'The keyboard and screen are ___.', 'software', 'If the computer won\'t switch on, it may be a ___ problem.'],
      ['♻️', 'renewable', 'yenilenebilir', 'able to be replaced naturally', 'Solar power is a ___ energy source.', 'harmful', 'Wind is a ___ resource.'],
      ['🧑‍🔬', 'laboratory', 'laboratuvar', 'a room where scientists do experiments', 'The scientists work in a ___.', 'library', 'The samples were tested in the ___.'],
      ['🌐', 'digital', 'dijital', 'using computer technology', 'Most photos today are ___.', 'genetic', 'We live in a ___ age.'],
    ],
  },

  'B2::Artificial Intelligence and Automation': {
    intro: 'Vocabulary for talking about AI, robots and machines that do work automatically.',
    tip: 'AI = artificial intelligence. We say "AI is changing..." (no "the").',
    words: [
      ['🧠', 'artificial intelligence', 'yapay zeka', 'computer systems that can think and learn like humans', '___ can now write texts and create images.', 'Renewable energy', 'Chatbots and self-driving cars are examples of ___.'],
      ['🏭', 'automation', 'otomasyon', 'using machines to do work instead of people', '___ has replaced many factory jobs.', 'Education', 'Robots in factories are an example of ___.'],
      ['🧮', 'algorithm', 'algoritma', 'a set of rules a computer follows to solve a problem', 'The app uses an ___ to recommend videos.', 'opinion', 'A search engine uses an ___ to rank results.'],
      ['📈', 'machine learning', 'makine öğrenmesi', 'when computers learn from data without being programmed step by step', '___ helps computers recognise faces.', 'Handwriting', 'With ___, the system gets better as it sees more data.'],
      ['🔄', 'replace', 'yerini almak', 'to take the place of something or someone', 'Will robots ___ human workers?', 'hire', 'In many shops, self-checkout machines ___ cashiers.'],
      ['🔐', 'data privacy', 'veri gizliliği', 'the protection of personal information', 'Many people are worried about ___ online.', 'data entry', "Apps must respect users' ___."],
      ['⚙️', 'automated', 'otomatik', 'done by machines without people', 'The factory is fully ___.', 'manual', 'Most car factories are now highly ___.'],
      ['💬', 'chatbot', 'sohbet robotu', 'a program that talks to people online', 'The ___ answered my questions on the website.', 'printer', 'Many companies use a ___ for customer service.'],
      ['🧑‍🏭', 'manual', 'el ile yapılan', 'done by people, not machines', '___ work in factories is becoming less common.', 'Automated', 'Before machines, all farm work was ___.'],
      ['🎯', 'accuracy', 'doğruluk', 'how correct something is', 'The ___ of AI translation has improved a lot.', 'emission', 'Doctors check the ___ of the AI diagnosis.'],
    ],
  },

  'B2::Climate and Sustainability': {
    intro: 'Vocabulary for climate action and living in a way that protects the planet.',
    tip: '"Sustainable" means it can continue for a long time without harming the environment.',
    words: [
      ['🌱', 'sustainable', 'sürdürülebilir', 'able to continue without harming the environment', 'We need ___ ways to produce food.', 'wasteful', 'Bamboo is a ___ material because it grows quickly.'],
      ['👣', 'carbon footprint', 'karbon ayak izi', 'the amount of CO₂ your activities produce', 'Flying increases your ___.', 'bank account', 'Cycling to work reduces your ___.'],
      ['☀️', 'solar power', 'güneş enerjisi', 'energy from the sun', 'Our house uses ___ from panels on the roof.', 'coal', 'Panels on the roof produce ___.'],
      ['🌫️', 'emissions', 'emisyonlar', 'gases sent into the air', 'Cars produce harmful ___.', 'vitamins', 'The country must cut its carbon ___.'],
      ['🛍️', 'reusable', 'yeniden kullanılabilir', 'able to be used again', 'Bring a ___ bag to the supermarket.', 'disposable', 'A ___ water bottle reduces plastic waste.'],
      ['💡', 'energy-efficient', 'enerji tasarruflu', 'using little energy', 'LED bulbs are more ___ than old bulbs.', 'old-fashioned', 'An ___ fridge saves money on electricity.'],
      ['🌳', 'reforestation', 'yeniden ağaçlandırma', 'planting trees where forests were cut down', '___ projects can help fight climate change.', 'Deforestation', 'Planting millions of trees where a forest was lost is called ___.'],
      ['🎯', 'net zero', 'net sıfır', 'producing no more greenhouse gas than is removed', 'Many countries aim to reach ___ by 2050.', 'full speed', 'The company promised to reach ___ emissions by 2040.'],
      ['🥤', 'disposable', 'tek kullanımlık', 'designed to be used once and thrown away', '___ plastic cups create a lot of waste.', 'Reusable', 'Try not to use ___ products.'],
      ['🌬️', 'wind farm', 'rüzgar santrali', 'a group of wind turbines that make electricity', 'A new ___ was built on the hills.', 'car park', 'The ___ produces clean energy for 10,000 homes.'],
    ],
  },

  'B2::Globalization': {
    intro: 'Vocabulary for describing how the world\'s economies and cultures are becoming connected.',
    tip: 'British English often writes "globalisation"; American English writes "globalization". Both are correct.',
    words: [
      ['🌍', 'multinational', 'çok uluslu', 'operating in many countries', 'Coca-Cola is a ___ company.', 'local', 'A ___ corporation has offices around the world.'],
      ['🔗', 'interconnected', 'birbirine bağlı', 'connected with each other', "Today's economies are deeply ___.", 'isolated', 'The world is so ___ that a crisis in one country affects others.'],
      ['🚚', 'outsource', 'dış kaynak kullanmak', 'to pay another company, often abroad, to do work', 'Many firms ___ customer service to other countries.', 'inherit', 'The company decided to ___ its IT department to India.'],
      ['🧳', 'migration', 'göç', 'moving from one country or region to another', '___ has changed the population of many cities.', 'Pollution', 'Economic ___ brings workers to richer countries.'],
      ['🏪', 'homogenisation', 'tekdüzeleşme', 'becoming the same everywhere', 'Some people fear the cultural ___ caused by global brands.', 'diversity', 'The same shops in every city is an example of ___.'],
      ['⛓️', 'supply chain', 'tedarik zinciri', 'the series of companies that make and deliver a product', 'The pandemic disrupted the global ___.', 'food chain', 'A problem anywhere in the ___ can delay products.'],
      ['🏘️', 'global village', 'küresel köy', 'the idea that the world is like one small community', 'Thanks to the internet, the world has become a ___.', 'ghost town', 'Technology has turned the world into a ___.'],
      ['🤝', 'free trade', 'serbest ticaret', 'trade between countries without taxes or limits', 'The two countries signed a ___ agreement.', 'divorce', '___ removes tariffs between countries.'],
      ['🏝️', 'isolated', 'yalıtılmış, izole', 'separated from other places or people', 'Before the internet, some villages were completely ___.', 'interconnected', 'Few countries are economically ___ today.'],
      ['🌈', 'diversity', 'çeşitlilik', 'a range of different things or people', 'Globalisation can reduce cultural ___.', 'homogenisation', 'Big cities are known for their ___ of cultures.'],
    ],
  },

  'B2::Journalism and Journalism Ethics': {
    intro: 'Vocabulary for news reporting and the rules journalists should follow.',
    tip: 'Ethical journalism is accurate, impartial and respects people\'s privacy.',
    words: [
      ['📰', 'journalist', 'gazeteci', 'a person who writes news for newspapers, TV or websites', 'The ___ interviewed the president.', 'surgeon', 'A ___ must check facts before publishing.'],
      ['✅', 'fact-check', 'doğruluğunu kontrol etmek', 'to check that information is true', 'Always ___ a story before you publish it.', 'exaggerate', 'Reporters should ___ every claim.'],
      ['🤐', 'source', 'kaynak', 'a person or document that gives information', 'The journalist refused to name her ___.', 'editor', 'A reliable ___ gave us the information.'],
      ['⚖️', 'impartial', 'tarafsız', 'not supporting any side', 'News reporting should be ___.', 'biased', 'An ___ journalist presents both sides of a story.'],
      ['📢', 'sensationalism', 'sansasyonculuk', 'presenting news in a shocking way to attract readers', 'Tabloids are often accused of ___.', 'accuracy', '"Shocking!" headlines are a form of ___.'],
      ['🕵️', 'investigative', 'araştırmacı', 'researching deeply to discover hidden facts', '___ journalism exposed the scandal.', 'Sports', 'An ___ reporter spent a year studying the case.'],
      ['🔏', 'privacy', 'mahremiyet', 'the right to keep your personal life private', "Photographers should respect people's ___.", 'popularity', 'Publishing private photos is an invasion of ___.'],
      ['✂️', 'editor', 'editör', 'a person who decides what is published', 'The ___ decided not to publish the story.', 'reader', 'The ___ corrected mistakes in the article.'],
      ['🎯', 'biased', 'taraflı', 'unfairly supporting one side', 'The article was ___; it only showed one opinion.', 'impartial', 'Some newspapers are politically ___.'],
      ['✔️', 'accuracy', 'doğruluk', 'being correct in every detail', 'Journalists must check the ___ of their facts.', 'sensationalism', '___ is more important than speed in news reporting.'],
    ],
  },

  'B2::Law and Justice': {
    intro: 'Vocabulary for courts, trials and legal rights.',
    tip: 'The "verdict" is the decision (guilty / not guilty); the "sentence" is the punishment.',
    words: [
      ['📜', 'legislation', 'mevzuat', 'laws made by a government', "New ___ protects workers' rights.", 'fashion', 'Parliament passed ___ against pollution.'],
      ['🧍', 'defendant', 'sanık', 'the person accused of a crime in court', 'The ___ was accused of fraud.', 'jury', 'In court, the ___ said he was innocent of all charges.'],
      ['👥', 'jury', 'jüri', 'a group of citizens who decide if someone is guilty', 'The ___ found him guilty after two days.', 'witness', 'Twelve members of the ___ listened to the evidence.'],
      ['👀', 'witness', 'tanık', 'a person who saw a crime', 'A ___ saw the robbery and called the police.', 'defendant', 'The ___ described the thief to the police.'],
      ['📃', 'verdict', 'karar (jüri)', 'the decision of a court', 'The jury reached a ___ of not guilty.', 'sentence', 'Everyone waited nervously for the ___.'],
      ['⛓️', 'sentence', 'ceza', 'the punishment given by a judge', 'He received a ten-year prison ___.', 'verdict', 'The judge gave her a ___ of 200 hours of community service.'],
      ['🔁', 'appeal', 'itiraz etmek', 'to ask a higher court to change a decision', 'His lawyer plans to ___ against the decision.', 'obey', 'If you disagree with the verdict, you can ___.'],
      ['🛡️', 'human rights', 'insan hakları', 'basic rights that every person should have', 'Freedom of speech is one of our ___.', 'hobbies', 'The organisation protects ___ around the world.'],
      ['🧑‍💼', 'lawyer', 'avukat', 'a person whose job is to give legal advice and speak in court', 'You should talk to a ___ before signing the contract.', 'witness', 'The ___ defended her client in court.'],
      ['🗂️', 'evidence', 'delil', 'facts or objects that prove something in court', 'There was not enough ___ to prove he was guilty.', 'legislation', 'The police found new ___ at the crime scene.'],
    ],
  },

  'B2::Cultural Differences': {
    intro: 'Vocabulary for discussing how cultures differ and how people adapt to new cultures.',
    tip: 'Be careful with "stereotypes": they are fixed ideas about a group and are often unfair.',
    words: [
      ['🌈', 'diversity', 'çeşitlilik', 'a range of different people or things', 'London is famous for its cultural ___.', 'uniformity', 'The company values ___ in its workforce.'],
      ['😳', 'culture shock', 'kültür şoku', 'confusion when you experience a very different culture', 'Many students experience ___ when they move abroad.', 'stage fright', 'At first, ___ made her feel lost in Japan.'],
      ['📏', 'norm', 'norm', 'a usual or accepted way of behaving', 'Tipping is the ___ in the USA.', 'exception', 'Shaking hands is the ___ in business meetings.'],
      ['🍴', 'etiquette', 'görgü kuralları', 'rules of polite behaviour', 'In Japan, business ___ includes bowing.', 'economy', 'Table ___ varies between countries.'],
      ['🏷️', 'stereotype', 'kalıp yargı', 'a fixed, often wrong, idea about a group of people', "It's a ___ that all British people drink tea.", 'fact', 'The idea that all Italians are loud is a ___.'],
      ['🧩', 'assimilate', 'kaynaşmak, uyum sağlamak', 'to become part of a new culture', 'Immigrants may ___ into the local culture over time.', 'resign', 'It took years for the family to ___ into their new country.'],
      ['🙊', 'taboo', 'tabu', 'a subject people avoid talking about', 'In some cultures, talking about money is ___.', 'compulsory', 'Death is a ___ subject in many societies.'],
      ['🌏', 'multicultural', 'çok kültürlü', 'with people of many cultures', 'Toronto is a very ___ city.', 'rural', 'Our school is very ___, with students from 40 countries.'],
      ['🎯', 'adapt', 'uyum sağlamak', 'to change your behaviour to fit a new situation', 'It took me months to ___ to life in Japan.', 'resign', 'Children usually ___ quickly to a new culture.'],
      ['🙇', 'gesture', 'jest, el hareketi', 'a movement of your hands or head that shows meaning', 'The "OK" ___ is rude in some countries.', 'taboo', 'Nodding is a ___ that means "yes" in many cultures.'],
    ],
  },

  'B2::Art, Literature and Philosophy': {
    intro: 'Vocabulary for discussing works of art, literary techniques and big ideas.',
    tip: 'A "metaphor" says something IS something else (Life is a journey); a "simile" uses like / as (as brave as a lion).',
    words: [
      ['🖼️', 'masterpiece', 'şaheser', 'an extremely good work of art', 'The Mona Lisa is a ___.', 'failure', '"Hamlet" is considered Shakespeare\'s ___.'],
      ['🎭', 'genre', 'tür', 'a category of art, music or literature', 'Science fiction is my favourite ___.', 'author', 'Crime fiction is a popular ___.'],
      ['🔮', 'metaphor', 'metafor, mecaz', 'describing something by saying it is something else', '"Life is a journey" is a ___.', 'fact', '"Time is money" is a common ___.'],
      ['🏛️', 'philosophy', 'felsefe', 'the study of ideas about life, knowledge and truth', 'Plato and Aristotle are famous figures in ___.', 'chemistry', 'She studies ___ and asks questions about the meaning of life.'],
      ['🤔', 'ethics', 'etik', 'moral principles about right and wrong', 'Medical ___ guide how doctors treat patients.', 'statistics', "Is it ever right to lie? That's a question of ___."],
      ['🎨', 'abstract', 'soyut', 'not showing real objects or people', "I don't understand ___ art; it's just shapes and colours.", 'realistic', 'Kandinsky painted ___ pictures.'],
      ['🗣️', 'narrator', 'anlatıcı', 'the person who tells a story', 'The ___ of the novel is a young girl.', 'reader', 'In this book, the ___ speaks directly to the reader.'],
      ['🌸', 'aesthetic', 'estetik', 'related to beauty and art', 'The building has great ___ value.', 'medical', 'Her ___ choices make the film beautiful to watch.'],
      ['⚖️', 'moral', 'ahlaki ders, öğüt', 'the lesson about right and wrong in a story', 'The ___ of the story is that honesty is important.', 'genre', 'Many fables end with a clear ___.'],
      ['🔍', 'interpretation', 'yorum', 'an explanation of the meaning of a work of art', 'Every reader has a different ___ of the poem.', 'masterpiece', 'The director gave a modern ___ of Hamlet.'],
    ],
  },

  'B2::Advanced Idioms and Expressions': {
    intro: 'Idioms that make your English sound natural at a higher level.',
    tip: 'Use idioms carefully in formal writing; they are most common in speaking and informal texts.',
    words: [
      ['🐘', 'the elephant in the room', 'herkesin bildiği ama konuşmadığı sorun', 'an obvious problem that people avoid discussing', 'Nobody mentioned the budget cuts, which were ___.', 'the tip of the iceberg', "Let's talk about ___: the company is losing money."],
      ['🧊', 'the tip of the iceberg', 'buzdağının görünen kısmı', 'a small part of a much bigger problem', 'These complaints are just ___.', 'the elephant in the room', 'The problems we know about are only ___.'],
      ['🔥', 'add fuel to the fire', 'yangına körükle gitmek', 'to make a bad situation worse', 'Shouting at him will only ___.', 'break the ice', "Please don't ___ by criticising her now."],
      ['🔨', 'hit the nail on the head', 'tam üstüne basmak', 'to describe exactly what is causing a problem', 'You ___ when you said we need more staff.', 'miss the boat', "She ___ — that's exactly the issue."],
      ['⛵', 'miss the boat', 'fırsatı kaçırmak', 'to be too late to take an opportunity', "If you don't apply today, you'll ___.", 'hit the nail on the head', "Buy the tickets now or you'll ___."],
      ['👀', 'see eye to eye', 'aynı fikirde olmak', 'to agree completely', "My boss and I don't always ___.", 'turn a blind eye', 'They rarely ___ on politics.'],
      ['🎁', 'a blessing in disguise', 'hayırlı bir aksilik', 'something that seems bad but turns out to be good', 'Losing that job was ___; I found a better one.', 'the last straw', 'The rain was ___ — we stayed in and met our new neighbours.'],
      ['🐪', 'the last straw', 'bardağı taşıran son damla', 'the final problem that makes you lose patience', 'When he was late again, it was ___.', 'a blessing in disguise', 'After months of noise, the party at 3 a.m. was ___.'],
      ['🦶', 'put your foot in it', 'pot kırmak', 'to say something that embarrasses or upsets someone by accident', 'I really ___ when I asked about her ex-husband.', 'see eye to eye', "Don't mention his job — you'll ___."],
      ['🧶', 'get the hang of', 'alışmak, işin püf noktasını kapmak', 'to learn how to do something after some practice', "Driving is hard at first, but you'll soon ___ it.", 'miss the boat', 'It took me a week to ___ the new software.'],
    ],
  },

  'B2::Advanced Collocations': {
    intro: 'Formal word partnerships often used in essays, reports and professional English.',
    tip: 'Many advanced collocations use specific verbs: conduct, pose, draw, raise, reach. Learn them as chunks.',
    words: [
      ['📋', 'conduct a survey', 'anket yapmak', 'to carry out a study by asking people questions', 'We will ___ to find out what customers think.', 'make a survey', 'The company plans to ___ among its employees.'],
      ['⏰', 'meet a deadline', 'teslim tarihine yetişmek', 'to finish something on time', 'We worked all night to ___.', 'catch a deadline', "If you can't ___, tell your manager early."],
      ['⚖️', 'reach a compromise', 'uzlaşmaya varmak', 'to agree by each side giving something up', 'After hours of talks, they managed to ___.', 'do a compromise', 'Both sides must give something to ___.'],
      ['📣', 'raise awareness', 'farkındalık yaratmak', 'to make more people know about an issue', 'The campaign aims to ___ of climate change.', 'rise awareness', 'Celebrities often help ___ of social problems.'],
      ['☠️', 'pose a threat', 'tehdit oluşturmak', 'to be a danger', 'Rising sea levels ___ to coastal cities.', 'put a threat', 'Cyber attacks can ___ to national security.'],
      ['🧠', 'draw a conclusion', 'sonuca varmak', 'to decide something from evidence', "It's too early to ___ from these results.", 'pull a conclusion', 'From the data, we can ___ that the drug works.'],
      ['📌', 'bear in mind', 'akılda tutmak', 'to remember and consider something', '___ that the museum closes at 5.', 'Carry in mind', 'Please ___ that prices may change.'],
      ['🧾', 'take into account', 'hesaba katmak', 'to consider something when deciding', 'You must ___ the cost of transport.', 'take into mind', 'The judge will ___ his young age.'],
      ['🔍', 'carry out research', 'araştırma yürütmek', 'to do a detailed study', 'The university will ___ into the causes of the disease.', 'make research', 'Scientists need funding to ___.'],
      ['🎯', 'achieve a goal', 'hedefe ulaşmak', 'to succeed in doing what you planned', 'Hard work helped her ___.', 'win a goal', 'Make a clear plan if you want to ___.'],
    ],
  },

  'B2::Word Formation and Derivatives': {
    intro: 'Building new words with prefixes (un-, mis-, ir-) and suffixes (-ity, -ation, -ific, -en, -ship).',
    tip: 'Negative prefixes depend on the word: un-predictable, ir-reversible, im-possible, in-correct, dis-honest.',
    words: [
      ['⚙️', 'reliability', 'güvenilirlik', 'the noun from "reliable"', 'The ___ of the data is questionable.', 'reliable', 'reliable (adjective) → ___ (noun)'],
      ['🌍', 'globalisation', 'küreselleşme', 'the noun from "globalise"', '___ has changed the way we work.', 'Global', 'globalise (verb) → ___ (noun)'],
      ['🎲', 'unpredictable', 'öngörülemez', 'impossible to predict (un- + predict + -able)', 'The weather in the mountains is ___, so always bring a coat.', 'predictable', 'un- + predict + -able → ___'],
      ['😕', 'misunderstand', 'yanlış anlamak', 'to understand wrongly (mis- + understand)', "Please don't ___ me; I'm trying to help.", 'understanding', 'mis- + understand → ___'],
      ['🔄', 'irreversible', 'geri döndürülemez', 'impossible to change back (ir- + reverse + -ible)', 'The damage to the forest may be ___.', 'reversal', 'ir- + reverse + -ible → ___'],
      ['🧪', 'scientific', 'bilimsel', 'the adjective from "science"', 'There is no ___ evidence for this claim.', 'scientist', 'science (noun) → ___ (adjective)'],
      ['🏋️', 'strengthen', 'güçlendirmek', 'the verb from "strength" (+ -en)', 'Exercise helps to ___ your muscles.', 'strength', 'strong → strength → ___ (verb)'],
      ['🪪', 'membership', 'üyelik', 'the noun from "member" (+ -ship)', 'Gym ___ costs £30 a month.', 'member', 'member + -ship → ___'],
      ['🚫', 'impossible', 'imkansız', 'not possible (im- + possible)', "It's ___ to finish all this work today.", 'possibility', 'im- + possible → ___'],
      ['🙃', 'dishonest', 'sahtekar, dürüst olmayan', 'not honest (dis- + honest)', 'It was ___ of him to lie about his age.', 'honesty', 'dis- + honest → ___'],
    ],
  },

  'B2::Synonyms, Antonyms and Nuance': {
    intro: 'Words with similar meanings but different strength or feeling (nuance).',
    tip: 'Synonyms are rarely identical: "furious" is much stronger than "annoyed", and "cheap" can sound negative while "affordable" sounds positive.',
    words: [
      ['🙂', 'content', 'halinden memnun', 'quietly happy and satisfied (calmer than "happy")', 'She was ___ with her simple life in the village.', 'ecstatic', 'Not ecstatic, just quietly satisfied: ___'],
      ['🤩', 'ecstatic', 'kendinden geçmiş', 'extremely happy (much stronger than "happy")', 'She was ___ when she won the lottery.', 'content', 'Much stronger than "happy": ___'],
      ['😡', 'furious', 'öfkeden deliye dönmüş', 'extremely angry', 'He was absolutely ___ — he shouted for an hour.', 'annoyed', 'Much stronger than "annoyed": ___'],
      ['😒', 'annoyed', 'canı sıkılmış', 'a little angry', 'I was slightly ___ that the bus was late.', 'furious', 'A little angry: ___'],
      ['👁️', 'glance', 'göz atmak', 'to look very quickly', 'I only had time to ___ at the newspaper.', 'stare', 'To look very quickly: ___'],
      ['😳', 'stare', 'dik dik bakmak', 'to look at something for a long time', "It's rude to ___ at people.", 'glance', 'To look at something for a long time: ___'],
      ['🏚️', 'cheap', 'ucuz (bazen kalitesiz)', 'low in price, sometimes also low in quality', 'The shoes were so ___ that they broke after a week.', 'affordable', 'Low in price and often low in quality: ___'],
      ['🏡', 'affordable', 'uygun fiyatlı', 'reasonably priced (a positive word)', 'The city needs more ___ homes for young families.', 'luxurious', 'A positive word for "not expensive": ___'],
      ['😢', 'heartbroken', 'kalbi kırık', 'extremely sad (much stronger than "sad")', 'She was ___ when her dog died.', 'content', 'Much stronger than "sad": ___'],
      ['🌫️', 'vague', 'belirsiz', 'not clear or detailed (the opposite of "precise")', 'His answer was so ___ that nobody understood it.', 'precise', 'The opposite of "precise": ___'],
    ],
  },

  'B2::Formal and Informal Vocabulary': {
    intro: 'Formal words for emails, letters and reports, and their informal equivalents.',
    tip: 'In formal writing, choose single formal verbs (assist, receive) instead of informal phrasal verbs (help out, get).',
    words: [
      ['📩', 'inquire', 'bilgi almak (resmi)', 'a formal word for "ask"', 'I am writing to ___ about the job vacancy.', 'chat', 'Formal: "ask about" → "___ about"'],
      ['🛒', 'purchase', 'satın almak (resmi)', 'a formal word for "buy"', 'Customers can ___ tickets online.', 'borrow', 'Formal: "buy" → "___"'],
      ['🤝', 'assist', 'yardım etmek (resmi)', 'a formal word for "help"', 'Our staff will be happy to ___ you.', 'hang out with', 'Formal: "help" → "___"'],
      ['📮', 'receive', 'almak (resmi)', 'a formal word for "get"', 'You will ___ a confirmation email.', 'grab', 'Formal: "get a letter" → "___ a letter"'],
      ['🛑', 'cease', 'sona erdirmek (resmi)', 'a formal word for "stop"', 'The company will ___ production next year.', 'kick off', 'Formal: "stop" → "___"'],
      ['🧔', 'guy', 'adam (gayriresmi)', 'an informal word for "man"', "He's a really nice ___.", 'lady', 'Informal: "a man" → "a ___"'],
      ['🤘', 'awesome', 'harika (gayriresmi)', 'an informal word for "excellent"', 'The party was ___!', 'adequate', 'Informal: "excellent" → "___"'],
      ['🏁', 'commence', 'başlamak (resmi)', 'a formal word for "begin"', 'The ceremony will ___ at 10 a.m.', 'hang out', 'Formal: "start" → "___"'],
      ['📢', 'inform', 'bildirmek (resmi)', 'a formal word for "tell"', 'We would like to ___ you that the office will close early.', 'hang out', 'Formal: "tell someone" → "___ someone"'],
      ['🤙', 'kids', 'çocuklar (gayriresmi)', 'an informal word for "children"', 'The ___ are playing in the garden.', 'adults', 'Informal: "children" → "___"'],
    ],
  },

  'B2::Linking Expressions and Discourse Markers': {
    intro: 'Words and phrases that connect ideas and organise your speaking and writing.',
    tip: 'At the start of a sentence, most linkers are followed by a comma: However, ... / Therefore, ...',
    words: [
      ['➕', 'furthermore', 'ayrıca', 'used to add another point (formal)', 'The plan is cheap. ___, it is easy to carry out.', 'However', 'To add another point formally: ___'],
      ['🔄', 'nevertheless', 'yine de', 'despite what was just said', 'It was raining. ___, we went for a walk.', 'Therefore', 'Despite that: ___ (starts with n)'],
      ['➡️', 'therefore', 'bu nedenle', 'as a result', 'He was ill; ___, he stayed at home.', 'however', 'As a result: ___ (starts with t)'],
      ['🔍', 'in other words', 'başka bir deyişle', 'used to explain something more simply', 'The project failed; ___, we wasted our money.', 'on the other hand', 'To say the same thing more simply: ___'],
      ['⚖️', 'on the other hand', 'öte yandan', 'used to give a contrasting point', 'The city is exciting. ___, it is very expensive.', 'In addition', 'To introduce the other side of an argument: ___'],
      ['📝', 'to sum up', 'özetlemek gerekirse', 'used to introduce a summary', '___, the benefits are greater than the costs.', 'For example', 'To start a conclusion: ___'],
      ['📌', 'for instance', 'örneğin', 'used to give an example', 'Some fruits, ___ oranges, are rich in vitamin C.', 'therefore', 'Another way to say "for example": ___'],
      ['💡', 'as a matter of fact', 'aslında', 'used to add surprising or true information', "I don't mind the cold. ___, I love winter.", 'As a result', 'Another way to say "in fact": ___'],
      ['🔀', 'whereas', 'oysa, -iken', 'used to compare two different facts', 'My sister loves sport, ___ I prefer reading.', 'therefore', 'To compare two opposite facts in one sentence: ___'],
      ['🎯', 'in addition', 'buna ek olarak', 'used to add another point', 'The hotel has a pool. ___, it has a gym.', 'However', 'Another way to say "furthermore": ___'],
    ],
  },

  'B2::Describing Trends and Statistics': {
    intro: 'Vocabulary for describing graphs, numbers and changes over time.',
    tip: 'Use an adjective + noun (a sharp rise) or a verb + adverb (rose sharply) to describe a trend.',
    words: [
      ['📈', 'increase', 'artmak', 'to go up', 'Unemployment is expected to ___ from 5% to 7%.', 'decrease', 'To go up: ___'],
      ['📉', 'decline', 'düşmek, azalmak', 'to go down gradually', 'The population is expected to ___ from 10 to 8 million.', 'rise', 'To go down slowly: ___'],
      ['🚀', 'soar', 'fırlamak', 'to rise very quickly to a high level', 'Analysts expect the share price to ___ from $10 to $50.', 'dip', 'To rise very fast and very high: ___'],
      ['〰️', 'fluctuate', 'dalgalanmak', 'to go up and down', 'Oil prices ___ a lot from month to month.', 'stabilise', 'To keep going up and down: ___'],
      ['➖', 'remain stable', 'sabit kalmak', 'to stay the same', 'Inflation is expected to ___ at 2% all year.', 'soar', 'To stay at the same level: ___'],
      ['🔝', 'peak', 'zirveye ulaşmak', 'to reach the highest point', 'Sales usually ___ in December before Christmas.', 'bottom out', 'To reach the highest point: ___'],
      ['🥧', 'proportion', 'oran', 'a part of a whole', 'A large ___ of students live at home.', 'increase', 'A part compared with the whole: ___'],
      ['⚡', 'sharp', 'keskin, ani', 'sudden and large (describing a change)', 'There was a ___ fall of 40% in sales last month.', 'slight', 'The opposite of "slight" when describing a change: ___'],
      ['🔽', 'slight', 'hafif, küçük', 'small (describing a change)', 'There was a ___ rise of just 1% in prices.', 'sharp', 'The opposite of "sharp" when describing a change: ___'],
      ['📊', 'average', 'ortalama', 'the number you get by adding amounts and dividing by how many there are', 'The ___ age of students in the class is 21.', 'peak', 'The ___ of 2, 4 and 6 is 4.'],
    ],
  },

  'B2::Abstract Nouns and Concepts': {
    intro: 'Nouns for ideas, feelings and qualities that you cannot touch.',
    tip: 'Most abstract nouns are uncountable and are used without "a": freedom, justice, wisdom.',
    words: [
      ['🕊️', 'freedom', 'özgürlük', 'the right to act or speak as you want', '___ of speech is a basic right.', 'Slavery', 'Prisoners lose their ___.'],
      ['⚖️', 'justice', 'adalet', 'fairness in the way people are treated', "The victims' families want ___.", 'luxury', 'The courts exist to deliver ___.'],
      ['🦉', 'wisdom', 'bilgelik', 'knowledge and good judgement that come from experience', 'Grandparents often have great ___.', 'ignorance', 'With age comes ___.'],
      ['🤝', 'trust', 'güven', 'the belief that someone is honest and reliable', '___ takes years to build and seconds to break.', 'Anger', 'Without ___, a relationship cannot survive.'],
      ['🌅', 'hope', 'umut', 'a feeling that something good will happen', 'Even in difficult times, never lose ___.', 'weight', 'The news of the rescue gave everyone ___.'],
      ['🏆', 'success', 'başarı', 'achieving what you wanted', 'Hard work is the key to ___.', 'failure', 'The film was a huge ___ at the box office.'],
      ['🧘', 'well-being', 'iyi oluş', 'the state of being healthy and happy', 'Regular exercise is important for mental ___.', 'illness', "Companies should care about their employees' ___."],
      ['🌀', 'uncertainty', 'belirsizlik', 'not knowing what will happen', 'There is a lot of ___ about the future of the economy.', 'certainty', 'The crisis created ___ for investors.'],
      ['😐', 'ignorance', 'cehalet', 'a lack of knowledge or information', '___ is no excuse for breaking the law.', 'Wisdom', 'Many problems are caused by fear and ___.'],
      ['🪞', 'identity', 'kimlik', 'who a person is; the qualities that make them different', 'Language is an important part of cultural ___.', 'luxury', 'Teenagers often struggle to find their ___.'],
    ],
  },

  'B2::Commonly Confused Words': {
    intro: 'Pairs of words that look or sound similar but have different meanings.',
    tip: 'A memory trick: Affect is the Action (verb); Effect is the End result (noun).',
    words: [
      ['🔀', 'affect', 'etkilemek (fiil)', 'verb: to have an influence on something', 'Lack of sleep can ___ your concentration.', 'effect', 'The noun is "effect"; the verb is "___".'],
      ['💥', 'effect', 'etki (isim)', 'noun: a result or an influence', 'The medicine had a good ___.', 'affect', 'The verb is "affect"; the noun is "___".'],
      ['🔍', 'lose', 'kaybetmek', 'to stop having something', "Don't ___ your keys!", 'loose', 'The opposite of "find" is "___".'],
      ['👖', 'loose', 'bol', 'not tight', 'These trousers are too ___; I need a belt.', 'lose', 'The opposite of "tight" is "___".'],
      ['💬', 'advice', 'tavsiye (isim)', 'noun: an opinion about what someone should do', 'Can you give me some ___?', 'advise', 'The verb is "advise"; the noun is "___".'],
      ['🧑‍🏫', 'advise', 'tavsiye etmek (fiil)', 'verb: to tell someone what they should do', 'I ___ you to see a doctor.', 'advice', 'The noun is "advice"; the verb is "___".'],
      ['🏫', 'principal', 'okul müdürü; ana', 'the head of a school; main', 'The school ___ gave a speech.', 'principle', 'The head of a school is also called the ___.'],
      ['📜', 'principle', 'ilke', 'a basic rule or belief', 'Honesty is an important ___ for me.', 'principal', 'A basic moral rule or belief: ___'],
      ['⏩', 'than', '-den (karşılaştırma)', 'used in comparisons', 'My brother is taller ___ me.', 'then', 'Used in comparisons: bigger ___'],
      ['⏭️', 'then', 'sonra, o zaman', 'next; after that; at that time', 'First we ate, and ___ we went to the cinema.', 'than', 'Used for time order: first..., ___...'],
    ],
  },
};

// ── Üreticiler ────────────────────────────────────────────────────────────────
const hash = (text) => [...text].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
// Doğru cevabı seçenekler arasında sabit ama "rastgele" bir yere koyar (hep ilk sırada olmasın).
const spread = (answer, others, seed) => {
  const position = hash(seed) % (others.length + 1);
  return [...others.slice(0, position), answer, ...others.slice(position)];
};
const fill = (sentence, word) => sentence.replace('___', `**${word}**`);

// Explanation sekmesi verisi (VocabularyExplanation bileşeninin şeması).
export const lessonExplanation = (title, lesson) => ({
  heading: title,
  intro: lesson.intro,
  groups: [
    {
      words: lesson.words.map(([emoji, word, , meaning, sentence]) => ({ emoji, word, meaning, example: fill(sentence, word) })),
    },
  ],
  tips: lesson.tip ? [lesson.tip] : [],
});

// Egzersizler: { 1: [[soru, seçenekler, doğru, açıklama]], 2: [...], 3: [[soru, doğru, açıklama]] }
export const lessonExercises = (lesson) => {
  const all = lesson.words.map((w) => w[1]);
  const note = (word, tr) => `'${word}' = ${tr}.`;
  return {
    1: lesson.words.map(([, word, tr, , s1, wrong]) => [s1, spread(word, [wrong], s1), word, note(word, tr)]),
    2: lesson.words.map(([, word, tr, meaning], i) => {
      const others = [1, 3, 5].map((k) => all[(i + k) % all.length]);
      const title = `Which word or phrase means "${meaning}"?`;
      return [title, spread(word, others, title), word, note(word, tr)];
    }),
    3: lesson.words.map(([, word, tr, , , , s2]) => [`${s2} (${tr})`, word, note(word, tr)]),
  };
};
