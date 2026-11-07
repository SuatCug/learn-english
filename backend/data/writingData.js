// Writing konuları: seed (utils/seed.js) ve kart resmi yükleme scripti (utils/uploadTopicImages.js) kullanır.
// Kart resmi adı listedeki sıradan ve başlıktan türetilir (data/topicImages.js) — konu eklerken/sıra
// değiştirirken resim dosya adlarını da buna göre güncelle.

// Kart resmi henüz hazır olmayan seviyeler: seed bu seviyelerin konularına resim atamaz (kategori
// illüstrasyonu görünür). Resimler topic-images/rwl/Writing/<seviye>/ altına konup yüklenince buradan çıkar.
const WRITING_IMAGES_PENDING = [];

// Writing: her konu tek bir egzersiz — "kelime kutusu" + 10 boşluklu özgün bir örnek metin.
// passage = "kelime1 | kelime2 | ...\n---\nMetin ___ ile ___." Başlıklar frontend/src/lib/writingExplanations.js
// anahtarlarıyla (`${level}::${title}`) eşleşir; başlık değişirse oradaki anahtarı da güncelle.
const WRITING_DATA = {
  A1: [
    {
      title: "An Email Introducing Yourself",
      instructions: 'Complete the text below with the words in the box.',
      passage: `and | in | watching | with | Do | about | works | back | are | have
---
Hi Clara,

My name is Yusuf, and I'm your new e-pal! I'm fourteen years old, and I live ___ Bursa, a big city in the north-west of Turkey.

I live with my parents and my little sister, Asya. She's six, ___ she's very funny. My dad is a mechanic, and my mum ___ in a bank.

I go to Atatürk Secondary School. My favourite subjects ___ English and PE. I don't like history very much.

In my free time, I play volleyball ___ my friends. I also like ___ films, especially comedies.

I ___ a pet bird. His name is Limon, because he's yellow!

What ___ you? Where do you live? ___ you have any brothers or sisters?

Please write ___ soon!

Best wishes,
Yusuf`,
      questions: [
        ['Blank 1', "in", "Şehir için 'live in' kullanılır."],
        ['Blank 2', "and", "İki bilgiyi bağlar: 'and' = ve."],
        ['Blank 3', "works", "3. tekil şahıs (she) ile fiile -s eklenir."],
        ['Blank 4', "are", "Çoğul özneyle (subjects) 'are' kullanılır."],
        ['Blank 5', "with", "'with my friends' = arkadaşlarımla."],
        ['Blank 6', "watching", "'like + fiil-ing': like watching."],
        ['Blank 7', "have", "1. tekil şahısla 'I have' kullanılır."],
        ['Blank 8', "about", "'What about you?' = Peki ya sen?"],
        ['Blank 9', "Do", "Present simple soru: 'Do you have...?' kalıbı."],
        ['Blank 10', "back", "'write back' = cevap yazmak."],
      ],
    },
    {
      title: "A Note to Your Neighbour",
      instructions: 'Complete the text below with the words in the box.',
      passage: `on | promise | wishes | at | from | for | sorry | like | because | be
---
Dear Mrs Kaplan,

Hello! I'm Elena, your new neighbour ___ flat 5. My family and I moved in last week.

I'm writing ___ we are having a small party on Saturday evening for my son's birthday. He's going to ___ twelve! There are about ten children, so it might be a little noisy. I'm very ___ about that.

The party starts ___ five o'clock and finishes at nine. After nine, it will be quiet, I ___!

Would you ___ to come and have some cake with us? You are very welcome.

If there is a problem, please knock ___ our door or call me. My number is 0532 555 12 34.

Thank you ___ your understanding.

Best ___,
Elena`,
      questions: [
        ['Blank 1', "from", "'from flat 5' = 5 numaralı daireden."],
        ['Blank 2', "because", "Sebep bildirir: 'because' = çünkü."],
        ['Blank 3', "be", "'be going to be' = olacak."],
        ['Blank 4', "sorry", "'I'm sorry' = özür dilerim."],
        ['Blank 5', "at", "Saatle 'at' kullanılır."],
        ['Blank 6', "promise", "'I promise' = söz veriyorum."],
        ['Blank 7', "like", "'Would you like to + fiil' kalıbı."],
        ['Blank 8', "on", "'knock on the door' = kapıyı çalmak."],
        ['Blank 9', "for", "'Thank you for + isim' kalıbı."],
        ['Blank 10', "wishes", "'Best wishes' kapanış ifadesi."],
      ],
    },
    {
      title: "My Favourite Place in Town",
      instructions: 'Complete the text below with the words in the box.',
      passage: `homemade | or | is | with | near | are | usually | because | called | but
---
My favourite place in my town is a small café ___ The Blue Door. It's in an old street ___ the river.

The café isn't very big. There are only eight tables, ___ it's always warm and friendly. The walls ___ yellow, and there are lots of old photos of the town on them. There's also a big bookshelf ___ books in English and Turkish. You can read them for free!

I go there every Saturday morning with my best friend, Derya. We ___ have hot chocolate and a piece of carrot cake. The cakes are ___, and they are delicious.

The owner ___ an old man called Mr Erol. He's very kind, and he always remembers our names.

I love The Blue Door ___ it's quiet and relaxing. It's the perfect place to talk, read ___ just watch the people in the street.`,
      questions: [
        ['Blank 1', "called", "'a café called...' = ... adında bir kafe."],
        ['Blank 2', "near", "'near the river' = nehrin yakınında."],
        ['Blank 3', "but", "Zıtlık: 'but' = ama."],
        ['Blank 4', "are", "Çoğul özneyle 'are' kullanılır."],
        ['Blank 5', "with", "'a bookshelf with books' = kitaplarla dolu raf."],
        ['Blank 6', "usually", "Sıklık zarfı: 'usually' = genellikle."],
        ['Blank 7', "homemade", "'homemade' = ev yapımı."],
        ['Blank 8', "is", "Tekil özneyle 'is' kullanılır."],
        ['Blank 9', "because", "Sebep bildirir: 'because' = çünkü."],
        ['Blank 10', "or", "Seçenek bildirir: 'or' = ya da."],
      ],
    },
    {
      title: "A Text Message Changing Plans",
      instructions: 'Complete the text below with the words in the box.',
      passage: `know | by | again | after | can | bring | think | is | meet | on
---
Hi Mert! 😊

I'm really sorry, but I can't ___ you at the cinema at six today. My mum ___ ill, and I have to look ___ my little brother this evening. 😕

Can we go ___ Saturday instead? There's a film at four o'clock and another one at seven. I ___ four o'clock is better, because I have to be home ___ eight.

We ___ meet in front of the cinema at half past three and buy popcorn. 🍿

Oh, and can you ___ my book? I left it at your house last week.

Let me ___ what you think!

Sorry ___!

Zehra`,
      questions: [
        ['Blank 1', "meet", "'meet you' = seninle buluşmak."],
        ['Blank 2', "is", "Tekil özneyle 'is' kullanılır."],
        ['Blank 3', "after", "'look after' = bakmak, ilgilenmek."],
        ['Blank 4', "on", "Günlerle 'on' kullanılır: on Saturday."],
        ['Blank 5', "think", "'I think...' = bence."],
        ['Blank 6', "by", "'by eight' = en geç sekizde."],
        ['Blank 7', "can", "Olasılık/öneri: 'We can' = -ebiliriz."],
        ['Blank 8', "bring", "'bring' = getirmek."],
        ['Blank 9', "know", "'Let me know' = bana haber ver."],
        ['Blank 10', "again", "'Sorry again' = tekrar özür dilerim."],
      ],
    },
    {
      title: "My Best Friend",
      instructions: 'Complete the text below with the words in the box.',
      passage: `often | makes | at | has | lucky | together | who | funny | met | both
---
My best friend's name is Zoe. We ___ in primary school when we were seven, and now we are fifteen.

Zoe is tall and slim. She ___ long dark hair and brown eyes, and she always wears colourful clothes. She has a lovely smile.

Zoe is very kind and ___. She always ___ me laugh when I'm sad. She is also very good ___ music. She plays the piano and sings in the school choir.

We have a lot in common. We ___ love animals, and we both want to be vets in the future. We often walk ___ to school, and at the weekend we go to the park with my dog.

But we are different too. Zoe is very organised, but I'm not. She always does her homework early, and I ___ forget mine!

I think a good friend is someone ___ listens to you and helps you. Zoe is that kind of friend, and I'm very ___ to have her.`,
      questions: [
        ['Blank 1', "met", "Geçmiş zaman: 'meet → met' = tanıştık."],
        ['Blank 2', "has", "3. tekil şahısla 'has' kullanılır."],
        ['Blank 3', "funny", "Kişilik sıfatı: 'funny' = komik."],
        ['Blank 4', "makes", "'make someone laugh' = birini güldürmek."],
        ['Blank 5', "at", "'good at' = bir şeyde iyi olmak."],
        ['Blank 6', "both", "'We both like' = ikimiz de seviyoruz."],
        ['Blank 7', "together", "'walk together' = birlikte yürümek."],
        ['Blank 8', "often", "Sıklık zarfı: 'often' = sık sık."],
        ['Blank 9', "who", "Kişiyi niteleyen ilgi zamiri: 'who' ."],
        ['Blank 10', "lucky", "'lucky' = şanslı."],
      ],
    },
    {
      title: "A Lost Pet Poster",
      instructions: 'Complete the text below with the words in the box.',
      passage: `call | who | don't | post | scared | with | loves | is | on | seen
---
LOST CAT! PLEASE HELP!

Have you ___ our cat, Pamuk?

Pamuk is a small white cat ___ green eyes and a black spot on her nose. She is three years old, and she ___ wearing a red collar with a little bell.

She went missing ___ Tuesday, 4th March, from our garden on Lale Street, near the ___ office.

Pamuk is very friendly, but she is a bit shy with strangers. She ___ fish, so she may be near the fish shop.

If you see her, please ___ try to catch her. She may be ___. Please ___ us immediately on 0541 222 33 44.

There is a reward of 1,000 lira for anyone ___ finds her.

We miss her very much. Thank you!

The Aydın family`,
      questions: [
        ['Blank 1', "seen", "Present perfect soru: 'Have you seen...?' = gördünüz mü?"],
        ['Blank 2', "with", "'a cat with green eyes' = yeşil gözlü kedi."],
        ['Blank 3', "is", "Tekil özneyle 'is' kullanılır."],
        ['Blank 4', "on", "Tarihlerle 'on' kullanılır."],
        ['Blank 5', "post", "'post office' = postane."],
        ['Blank 6', "loves", "3. tekil şahıs: loves."],
        ['Blank 7', "don't", "Olumsuz emir: 'please don't' kalıbı."],
        ['Blank 8', "scared", "'scared' = korkmuş."],
        ['Blank 9', "call", "Emir kipi: 'Please call...' = lütfen arayın."],
        ['Blank 10', "who", "Kişiyi niteleyen ilgi zamiri: 'anyone who' ."],
      ],
    },
    {
      title: "A Birthday Card",
      instructions: 'Complete the text below with the words in the box.',
      passage: `remember | special | and | with | you | everything | best | have | in | to
---
Dear Grandma,

Happy 70th birthday! 🎂

I hope you ___ a wonderful day with all the family. I'm so sorry I can't be ___ you today. I'm still in Germany for my studies, but I'm thinking of ___!

Thank you for ___. You are the ___ grandmother in the world. I ___ all the summers in your garden, eating your delicious cherry jam and listening ___ your stories.

I have a little present for you. It's ___ the post, so it's going to arrive next week. I hope you like it!

I'm coming home in July. Then we can make cherry jam together again.

Enjoy your ___ day!

Lots of love ___ hugs,
Can`,
      questions: [
        ['Blank 1', "have", "'have a wonderful day' = harika bir gün geçirmek."],
        ['Blank 2', "with", "'be with you' = seninle olmak."],
        ['Blank 3', "you", "Nesne zamiri: 'thinking of you' = seni düşünüyorum."],
        ['Blank 4', "everything", "'Thank you for everything' = her şey için teşekkürler."],
        ['Blank 5', "best", "Üstünlük: 'the best' = en iyi."],
        ['Blank 6', "remember", "'I remember' = hatırlıyorum."],
        ['Blank 7', "to", "'listen to' kalıbı."],
        ['Blank 8', "in", "'in the post' = postada, yolda."],
        ['Blank 9', "special", "'your special day' = özel günün."],
        ['Blank 10', "and", "Ekleme: 'love and hugs' ."],
      ],
    },
    {
      title: "My Favourite Food",
      instructions: 'Complete the text below with the words in the box.',
      passage: `Sometimes | reminds | long | world | usually | top | from | and | with | happy
---
My favourite food is mantı. It's a traditional Turkish dish, and my grandmother makes the best mantı in the ___!

Mantı are very small pieces of dough ___ meat inside. You cook them in water, and then you put yoghurt with garlic on ___. After that, you add hot butter with red pepper. It looks beautiful, ___ it smells wonderful.

Making mantı takes a ___ time. My grandmother cuts the dough into hundreds of tiny squares. ___ I help her, but my mantı are always too big!

We ___ eat mantı on Sundays, when all the family visits my grandparents. We sit around a big table and talk for hours.

I love mantı because it's delicious, but also because it ___ me of my family. When I eat it, I feel ___.

Do you know any traditional dishes ___ your country?`,
      questions: [
        ['Blank 1', "world", "'the best in the world' = dünyanın en iyisi."],
        ['Blank 2', "with", "'with meat inside' = içi etli."],
        ['Blank 3', "top", "'on top' = üstüne."],
        ['Blank 4', "and", "Ekleme: 'and' bağlacı."],
        ['Blank 5', "long", "'a long time' = uzun zaman."],
        ['Blank 6', "Sometimes", "Sıklık zarfı: 'Sometimes' = bazen."],
        ['Blank 7', "usually", "Sıklık zarfı: 'usually' = genellikle."],
        ['Blank 8', "reminds", "'remind me of' = bana hatırlatmak."],
        ['Blank 9', "happy", "'feel happy' = mutlu hissetmek."],
        ['Blank 10', "from", "'dishes from your country' = ülkenden yemekler."],
      ],
    },
    {
      title: "An Online Advert: Selling My Bike",
      instructions: 'Complete the text below with the words in the box.',
      passage: `Please | see | my | includes | and | in | bought | or | first | for
---
FOR SALE: Blue mountain bike — 2,500 lira

I'm selling ___ mountain bike because it's too small for me now.

The bike is two years old, and it's ___ very good condition. It's blue ___ black, and it has 21 gears. The tyres are new — I ___ them last month.

It's perfect ___ a teenager between 11 and 14 years old. It's great for riding in the park ___ in the countryside.

The price ___ a helmet, a bike lock and a small light.

You can ___ the bike at my house in Çankaya, Ankara, any evening after six o'clock or at the weekend.

___ call or send a message to Arda on 0555 111 22 33.

First come, ___ served!`,
      questions: [
        ['Blank 1', "my", "İyelik sıfatı: 'my bike' = bisikletim."],
        ['Blank 2', "in", "'in very good condition' = çok iyi durumda."],
        ['Blank 3', "and", "Ekleme: 'and' bağlacı."],
        ['Blank 4', "bought", "Geçmiş zaman: 'buy → bought' = satın aldım."],
        ['Blank 5', "for", "'perfect for' = için mükemmel."],
        ['Blank 6', "or", "Seçenek: 'or' = ya da."],
        ['Blank 7', "includes", "'The price includes' = fiyata dahil."],
        ['Blank 8', "see", "'see the bike' = bisikleti görmek."],
        ['Blank 9', "Please", "Kibar istek: 'Please call or send...' ."],
        ['Blank 10', "first", "'First come, first served' = ilk gelen alır."],
      ],
    },
    {
      title: "A Diary Entry: My Sunday",
      instructions: 'Complete the text below with the words in the box.',
      passage: `after | were | was | did | on | went | with | for | so | but
---
Sunday, 9th November

Dear Diary,

Today ___ a lovely day! I woke up late, at ten o'clock, because I was very tired ___ the school trip yesterday.

In the morning, I had breakfast ___ my family. My dad made pancakes with honey. They ___ delicious!

After breakfast, my sister and I ___ to the park. It was sunny ___ cold. We played with our dog, Fındık, and we fed the ducks ___ the lake.

In the afternoon, I ___ my homework. It wasn't easy — I had a lot of maths! Then I called my best friend, Ece, and we talked ___ an hour.

In the evening, we watched a funny film together. I laughed a lot.

Now I'm in bed. Tomorrow is Monday, and I have a test, ___ I need to sleep early.

Good night!`,
      questions: [
        ['Blank 1', "was", "Geçmiş zaman: 'Today was' = bugün ... idi."],
        ['Blank 2', "after", "'after the school trip' = okul gezisinden sonra."],
        ['Blank 3', "with", "'with my family' = ailemle."],
        ['Blank 4', "were", "Çoğul özneyle geçmiş: 'They were' ."],
        ['Blank 5', "went", "Geçmiş zaman: 'go → went' = gittik."],
        ['Blank 6', "but", "Zıtlık: 'but' = ama."],
        ['Blank 7', "on", "'on the lake' = gölde."],
        ['Blank 8', "did", "Geçmiş zaman: 'do → did' = yaptım."],
        ['Blank 9', "for", "Süre: 'for an hour' = bir saat boyunca."],
        ['Blank 10', "so", "Sonuç: 'so' = bu yüzden."],
      ],
    },
  ],
  A2: [
    {
      title: "An Email Asking a Friend for Advice",
      instructions: 'Complete the text below with the words in the box.',
      passage: `went | more | where | for | on | it | need | by | could | like
---
Hi Sara,

How are you? I hope you're enjoying your new job!

I'm writing because I ___ your advice. You know I've been learning English for three years. Well, my teacher says I can go ___ a summer language course abroad, and my parents have agreed to pay for ___!

The problem is that I can't decide ___ to go. There are two options. The first one is a four-week course in Dublin. It's cheaper, and I ___ stay with a host family. The second option is a two-week course in London. It's ___ expensive, but the school is very famous, and there are lots of trips to museums.

You ___ to Ireland last year, didn't you? What was it ___? Which course do you think is better ___ me?

Please write back soon. I have to tell the school ___ Friday!

Love,
Nehir`,
      questions: [
        ['Blank 1', "need", "'I need your advice' = tavsiyene ihtiyacım var."],
        ['Blank 2', "on", "'go on a course' = kursa gitmek."],
        ['Blank 3', "it", "Tekil nesne zamiri: 'pay for it' ."],
        ['Blank 4', "where", "'decide where to go' = nereye gideceğine karar vermek."],
        ['Blank 5', "could", "Olasılık: 'I could stay' = kalabilirim."],
        ['Blank 6', "more", "Karşılaştırma: 'more expensive' ."],
        ['Blank 7', "went", "Geçmiş zaman: 'go → went' = gittin."],
        ['Blank 8', "like", "'What was it like?' = nasıldı?"],
        ['Blank 9', "for", "'better for me' = benim için daha iyi."],
        ['Blank 10', "by", "Son tarih: 'by Friday' = en geç cuma."],
      ],
    },
    {
      title: "A Story: A Terrible Morning",
      instructions: 'Complete the text below with the words in the box.',
      passage: `lost | later | when | ring | was | Finally | at | too | while | without
---
It was Monday morning, and it was the most important day of my year: my job interview at a big hotel.

Unfortunately, my alarm didn't ___. When I woke up, it was already half past eight, and my interview was ___ nine! I jumped out of bed, got dressed quickly and ran out of the house ___ breakfast.

At the bus stop, I waited and waited, but the bus didn't come. ___, I decided to take a taxi. But ___ we were driving through the city centre, there was a terrible traffic jam. I ___ getting more and more nervous.

I arrived at the hotel at quarter past nine. I was sure I had ___ the job. But ___ I told the manager what had happened, she smiled.

'Don't worry,' she said. 'I was late ___ this morning — I was in the same traffic jam!'

We both laughed, and the interview went really well. A week ___, they called me: I got the job!`,
      questions: [
        ['Blank 1', "ring", "'the alarm didn't ring' = alarm çalmadı."],
        ['Blank 2', "at", "Saatle 'at' kullanılır."],
        ['Blank 3', "without", "'without breakfast' = kahvaltısız."],
        ['Blank 4', "Finally", "Sıralama: 'Finally' = sonunda."],
        ['Blank 5', "while", "'while we were driving' = biz giderken (süregelen eylem)."],
        ['Blank 6', "was", "Geçmiş zaman: 'I was getting' — past continuous."],
        ['Blank 7', "lost", "Past perfect: 'had lost' = kaybetmiştim."],
        ['Blank 8', "when", "'when I told her' = ona anlattığımda."],
        ['Blank 9', "too", "'too' = de/da (cümle sonunda)."],
        ['Blank 10', "later", "'A week later' = bir hafta sonra."],
      ],
    },
    {
      title: "A Restaurant Review",
      instructions: 'Complete the text below with the words in the box.',
      passage: `ever | lovely | near | each | to | recommend | busy | but | and | with
---
★★★★☆ Luna Pizzeria, Kadıköy

Last Friday, I went to Luna Pizzeria with three friends ___ celebrate my birthday. It's a small Italian restaurant ___ the ferry station.

The atmosphere was ___. There were candles on the tables and soft music, and the walls were decorated ___ old photos of Naples.

The food was excellent. We shared two pizzas — a classic margherita and one with mushrooms and cheese. The bases were thin and crispy, ___ the tomatoes were really fresh. For dessert, I had tiramisu, which was the best I've ___ eaten.

The waiters were friendly, ___ the service was quite slow. We waited forty minutes for our pizzas because the restaurant was very ___.

The prices are reasonable — we paid about 400 lira ___, including drinks.

I would definitely ___ Luna Pizzeria, especially for a special occasion. But book a table and don't go if you're in a hurry!`,
      questions: [
        ['Blank 1', "to", "Amaç: 'to celebrate' = kutlamak için."],
        ['Blank 2', "near", "'near the station' = istasyona yakın."],
        ['Blank 3', "lovely", "'lovely' = hoş, güzel."],
        ['Blank 4', "with", "'decorated with' = ile süslenmiş."],
        ['Blank 5', "and", "Ekleme: 'and' bağlacı."],
        ['Blank 6', "ever", "Present perfect ile 'ever' = şimdiye kadar."],
        ['Blank 7', "but", "Zıtlık: 'but' = ama."],
        ['Blank 8', "busy", "'busy' = kalabalık, yoğun."],
        ['Blank 9', "each", "'each' = kişi başı."],
        ['Blank 10', "recommend", "'recommend' = tavsiye etmek."],
      ],
    },
    {
      title: "An Apology Message to a Friend",
      instructions: 'Complete the text below with the words in the box.',
      passage: `amazing | until | her | missed | and | make | front | was | to | so
---
Hi Deniz,

I'm really sorry I ___ your concert last night. I know how important it was ___ you, and I feel terrible.

I want to explain what happened. I ___ on my way to the concert hall when my sister called me. She had fallen off her bike ___ hurt her arm, and my parents were away. I had to take ___ to the hospital. We were there ___ midnight. Don't worry — her arm isn't broken!

I wanted to call you, but my phone battery was dead, ___ I couldn't.

I heard from Melis that the concert was ___ and that you played brilliantly. I'm so proud of you!

Can I ___ it up to you? Let me take you out for dinner this weekend — my treat. And next time you play, I promise I'll be in the ___ row!

Sorry again.

Your friend,
Bora`,
      questions: [
        ['Blank 1', "missed", "Geçmiş zaman: 'missed' = kaçırdım."],
        ['Blank 2', "to", "'important to you' = senin için önemli."],
        ['Blank 3', "was", "Geçmiş zaman: 'I was on my way' ."],
        ['Blank 4', "and", "Ekleme: 'and' bağlacı."],
        ['Blank 5', "her", "Nesne zamiri (sister): 'take her' ."],
        ['Blank 6', "until", "'until midnight' = gece yarısına kadar."],
        ['Blank 7', "so", "Sonuç: 'so' = bu yüzden."],
        ['Blank 8', "amazing", "'amazing' = harika."],
        ['Blank 9', "make", "'make it up to you' = telafi etmek."],
        ['Blank 10', "front", "'in the front row' = ön sırada."],
      ],
    },
    {
      title: "A Blog Post: My First Week at a New School",
      instructions: 'Complete the text below with the words in the box.',
      passage: `from | Let's | joined | so | to | but | lost | helpful | about | know
---
My First Week at Riverside High

So, I've survived my first week at my new school! As some of you know, my family moved ___ Leeds last month because of my mum's new job. I was really nervous ___ starting at a new school, especially in the middle of the year.

On the first day, I didn't ___ anyone, and the building was so big that I got ___ three times! But a girl in my class called Amira offered to show me around. She's been really ___ all week.

The lessons are quite different ___ my old school. The classes are smaller, and the teachers ask us to work in groups a lot. My favourite subject ___ far is drama — we're preparing a play for the end of term!

The worst thing is the school lunch. ___ just say I'm going to bring sandwiches from now on. 😅

I still miss my old friends, ___ I think I'm going to be happy here. I've already ___ the photography club, and I'm meeting Amira and her friends at the cinema on Saturday.

Has anyone else ever changed schools? Tell me about it in the comments!`,
      questions: [
        ['Blank 1', "to", "'move to + yer' kalıbı."],
        ['Blank 2', "about", "'nervous about' = ... konusunda gergin."],
        ['Blank 3', "know", "'know anyone' = kimseyi tanımamak."],
        ['Blank 4', "lost", "'get lost' = kaybolmak."],
        ['Blank 5', "helpful", "'helpful' = yardımsever."],
        ['Blank 6', "from", "'different from' = -den farklı."],
        ['Blank 7', "so", "'so far' = şimdiye kadar."],
        ['Blank 8', "Let's", "'Let's just say...' = diyelim ki..."],
        ['Blank 9', "but", "Zıtlık: 'but' = ama."],
        ['Blank 10', "joined", "Present perfect: 'I've joined' = katıldım."],
      ],
    },
    {
      title: "A Notice: Lost Property",
      instructions: 'Complete the text below with the words in the box.',
      passage: `from | to | belongings | also | belongs | and | for | with | in | within
---
FOUND IN THE LIBRARY

A black backpack was found ___ the second-floor study room on Wednesday afternoon, 12th April.

Inside the backpack, there is a laptop, two notebooks ___ a pencil case. There is also a key ring ___ a small teddy bear on it.

If this backpack ___ to you, please come to the library reception desk. The desk is open ___ 9 a.m. to 6 p.m., Monday to Friday.

To collect the backpack, you will need ___ show your student card. You will ___ need to describe something inside the bag, ___ example the name on one of the notebooks.

Please note: if nobody collects the backpack ___ 30 days, it will be sent to the main lost property office in the Student Centre.

Students are reminded to keep their ___ with them at all times.

Thank you.
Library Staff`,
      questions: [
        ['Blank 1', "in", "'in the study room' = çalışma odasında."],
        ['Blank 2', "and", "Ekleme: 'and' bağlacı."],
        ['Blank 3', "with", "'a key ring with a teddy bear' = ayıcıklı anahtarlık."],
        ['Blank 4', "belongs", "'belong to' = ait olmak."],
        ['Blank 5', "from", "'from ... to ...' saat aralığı."],
        ['Blank 6', "to", "'need to + fiil' kalıbı."],
        ['Blank 7', "also", "'also' = ayrıca."],
        ['Blank 8', "for", "'for example' = örneğin."],
        ['Blank 9', "within", "'within 30 days' = 30 gün içinde."],
        ['Blank 10', "belongings", "'belongings' = eşyalar."],
      ],
    },
    {
      title: "An Email to a Teacher Explaining an Absence",
      instructions: 'Complete the text below with the words in the box.',
      passage: `back | have | extra | for | sure | better | couldn't | to | as | please
---
Subject: Absence from class on Monday

Dear Mrs Walker,

I'm writing to tell you that I ___ come to your English class on Monday, 15th October. I'm sorry ___ missing the lesson.

On Sunday night, I had a high temperature and a bad sore throat. My mother took me ___ the doctor on Monday morning, and he told me to stay at home and rest for two days. I ___ attached a copy of the doctor's note.

I'm feeling much ___ now, and I'll be ___ at school tomorrow.

Could you ___ tell me what homework I need to do? I've asked my classmate Jamal, but he wasn't ___ about the exercises in the workbook.

Also, I know there's a vocabulary test next week. Is it possible to have ___ time to prepare, or should I take it on the same day ___ everyone else?

Thank you for your understanding.

Best regards,
Eren Polat`,
      questions: [
        ['Blank 1', "couldn't", "Geçmiş yetenek olumsuz: 'couldn't come' = gelemedim."],
        ['Blank 2', "for", "'sorry for + isim' kalıbı."],
        ['Blank 3', "to", "'take someone to the doctor' kalıbı."],
        ['Blank 4', "have", "'I have attached' = ekledim."],
        ['Blank 5', "better", "'feel better' = daha iyi hissetmek."],
        ['Blank 6', "back", "'be back' = geri dönmek."],
        ['Blank 7', "please", "Kibar istek: 'Could you please tell me' ."],
        ['Blank 8', "sure", "'not sure' = emin değil."],
        ['Blank 9', "extra", "'extra time' = ek zaman."],
        ['Blank 10', "as", "'the same day as' = ile aynı gün."],
      ],
    },
    {
      title: "Describing a Festival in My Country",
      instructions: 'Complete the text below with the words in the box.',
      passage: `kiss | new | why | for | known | to | of | when | receive | lasts
---
One of the most important festivals in Turkey is Ramazan Bayramı, also ___ as the Sugar Feast. It takes place at the end of Ramadan, the month ___ many people don't eat or drink during the day.

The festival ___ for three days. On the first morning, people wake up early, put on ___ or their best clothes and visit their families. Children ___ the hands of older relatives and ___ sweets or a little money. That's why children love this festival so much!

Food is a very important part of the celebrations. Families prepare big meals, and every house has sweets such as baklava and Turkish delight. That's ___ it's called the Sugar Feast!

During the holiday, many people travel ___ their hometowns, so the roads and bus stations are very busy. Others visit friends and neighbours they haven't seen ___ a long time.

For me, the best thing about the festival is that the whole family is together. My grandparents' house is full ___ people, noise and laughter. It's a time to forgive, share and feel thankful.`,
      questions: [
        ['Blank 1', "known", "'also known as' = olarak da bilinen."],
        ['Blank 2', "when", "Zaman bildiren ilgi zamiri: 'the month when' ."],
        ['Blank 3', "lasts", "'last' = sürmek."],
        ['Blank 4', "new", "'new clothes' = yeni kıyafetler."],
        ['Blank 5', "kiss", "'kiss the hands' = el öpmek."],
        ['Blank 6', "receive", "'receive' = almak, kabul etmek."],
        ['Blank 7', "why", "'That's why' = bu yüzden."],
        ['Blank 8', "to", "'travel to + yer' kalıbı."],
        ['Blank 9', "for", "Süre: 'for a long time' ."],
        ['Blank 10', "of", "'full of' = ile dolu."],
      ],
    },
    {
      title: "Then and Now: How My Town Has Changed",
      instructions: 'Complete the text below with the words in the box.',
      passage: `sold | was | away | However | than | used | were | has | from | now
---
I was born in Fethiye, a small town on the south coast of Turkey. In the last fifteen years, it ___ changed a lot.

When I was a child, Fethiye was a quiet fishing town. There ___ only a few hotels, and most people worked as fishermen or farmers. We ___ to play football in the street because there weren't many cars.

Now, Fethiye is a popular tourist destination. There are dozens of hotels, restaurants and souvenir shops along the seafront. In summer, thousands of tourists arrive ___ all over the world, and the streets are full of people.

Some changes have been positive. There are more jobs, and the town ___ has a new hospital and a modern sports centre. Young people don't need to move ___ to find work.

___, other changes are not so good. Houses are much more expensive ___ before, and the beaches are very crowded. Many of the old fishing families have ___ their homes.

I still love my town, but sometimes I miss the quiet place it ___ when I was young.`,
      questions: [
        ['Blank 1', "has", "Present perfect: 'it has changed' ."],
        ['Blank 2', "were", "Çoğul isimle geçmiş: 'There were' ."],
        ['Blank 3', "used", "'used to + fiil' = eskiden ... -ırdı."],
        ['Blank 4', "from", "'from all over the world' = dünyanın her yerinden."],
        ['Blank 5', "now", "'now' = artık, şimdi."],
        ['Blank 6', "away", "'move away' = başka yere taşınmak."],
        ['Blank 7', "However", "Zıtlık başlatır: 'However' = ancak."],
        ['Blank 8', "than", "Karşılaştırma: 'more expensive than' ."],
        ['Blank 9', "sold", "Present perfect: 'have sold' = sattılar."],
        ['Blank 10', "was", "Geçmiş zaman: 'the place it was' = eskiden olduğu yer."],
      ],
    },
    {
      title: "Instructions: A Simple Recipe",
      instructions: 'Complete the text below with the words in the box.',
      passage: `worry | with | into | too | immediately | until | then | over | need | First
---
EASY BANANA PANCAKES (for 2 people)

These pancakes are healthy, delicious and very easy to make. You only ___ three ingredients!

Ingredients:
• 2 ripe bananas
• 2 eggs
• 4 tablespoons of flour
• a little butter for the pan

Method:
1. ___, peel the bananas and put them in a bowl. Mash them ___ a fork until they are smooth.

2. Add the eggs and the flour, and mix everything together ___ you have a thick mixture.

3. Heat a little butter in a frying pan ___ a medium heat.

4. Pour two tablespoons of the mixture ___ the pan for each pancake. Don't make them ___ big, or they'll be difficult to turn.

5. Cook the pancakes for about one minute, ___ turn them over carefully and cook the other side.

6. Serve them ___ with honey, yoghurt or fresh fruit.

Tip: Don't ___ if your first pancake isn't perfect. Nobody's first pancake is!`,
      questions: [
        ['Blank 1', "need", "'You only need' = sadece ... gerekli."],
        ['Blank 2', "First", "Sıralama: 'First' = önce."],
        ['Blank 3', "with", "'with a fork' = çatalla."],
        ['Blank 4', "until", "'until' = -ene kadar."],
        ['Blank 5', "over", "'over a medium heat' = orta ateşte."],
        ['Blank 6', "into", "Hareket: 'pour into the pan' = tavaya dökmek."],
        ['Blank 7', "too", "'too big' = fazla büyük."],
        ['Blank 8', "then", "Sıralama: 'then' = sonra."],
        ['Blank 9', "immediately", "'immediately' = hemen."],
        ['Blank 10', "worry", "'Don't worry if...' = ... olursa endişelenme."],
      ],
    },
  ],
  B1: [
    {
      title: "A Story Ending with 'I'll Never Forget That Day'",
      instructions: 'Complete the text below with the words in the box.',
      passage: `Although | colder | where | as | never | had | off | were | hardly | so
---
The sky was grey and heavy when Elif and her brother Kaan set off up the mountain path. The weather forecast had promised sunshine, ___ they hadn't brought warm clothes.

For the first two hours, everything went well. They ___ laughing and taking photos as they climbed higher. But ___ soon as they reached the top, thick fog came down, and they could ___ see their own hands.

'Which way is the path?' Kaan asked nervously. Elif had no idea. Their phones had no signal, and it was getting ___ by the minute.

They decided to stay where they were rather than risk walking ___ the edge of a cliff. They sat close together behind a rock, sharing their last chocolate bar. ___ they were terrified, they tried to keep each other's spirits up by telling jokes.

After what felt like hours, they heard a dog barking. A few minutes later, a shepherd appeared out of the fog. He ___ seen them earlier from the valley and had come to check they were safe.

He led them down to his village, ___ his wife gave them hot soup and blankets. That evening, sitting by the fire, Elif looked at her brother and smiled.

I'll ___ forget that day.`,
      questions: [
        ['Blank 1', "so", "Sonuç: 'so' = bu yüzden."],
        ['Blank 2', "were", "Past continuous: 'were laughing' ."],
        ['Blank 3', "as", "'as soon as' = -er -mez."],
        ['Blank 4', "hardly", "'hardly' = neredeyse hiç."],
        ['Blank 5', "colder", "Karşılaştırma: 'getting colder' = soğuyor."],
        ['Blank 6', "off", "'walk off the edge' = kenardan düşmek."],
        ['Blank 7', "Although", "'Although' = -e rağmen."],
        ['Blank 8', "had", "Past perfect: 'had seen' = görmüştü."],
        ['Blank 9', "where", "Yer bildiren ilgi zamiri: 'where his wife...' ."],
        ['Blank 10', "never", "'I'll never forget' = asla unutmayacağım."],
      ],
    },
    {
      title: "A Formal Email to a Language School",
      instructions: 'Complete the text below with the words in the box.',
      passage: `found | Since | answer | receiving | cost | rather | about | if | whether | for
---
Subject: Enquiry about intensive English courses

Dear Sir or Madam,

I am writing to ask for information ___ the intensive English courses at your school, which I ___ on your website.

I am a 24-year-old engineer from Turkey, and I am planning to study in London for four weeks this summer. My current level is B1, and I would like to improve my speaking skills in particular, as I need English ___ my job.

I would be grateful if you could ___ the following questions:

Firstly, how many students are there in each class? I would prefer a small group, ___ possible.

Secondly, do you offer any courses in Business English? ___ I often have meetings with international clients, this would be very useful for me.

Thirdly, could you tell me ___ you can help with accommodation? I would like to stay with a host family ___ than in a hotel.

Finally, I would like to know the total ___ of a four-week course, including accommodation.

I look forward to ___ your reply.

Yours faithfully,
Ozan Çelik`,
      questions: [
        ['Blank 1', "about", "'information about' kalıbı."],
        ['Blank 2', "found", "Geçmiş zaman: 'find → found' = buldum."],
        ['Blank 3', "for", "'need English for my job' kalıbı."],
        ['Blank 4', "answer", "'answer the following questions' kalıbı."],
        ['Blank 5', "if", "Koşul: 'if possible' = mümkünse."],
        ['Blank 6', "Since", "Sebep: 'Since' = -dığı için."],
        ['Blank 7', "whether", "Dolaylı soru: 'whether' = -ip -mediğini."],
        ['Blank 8', "rather", "'rather than' = -den ziyade."],
        ['Blank 9', "cost", "'the total cost' = toplam maliyet."],
        ['Blank 10', "receiving", "'look forward to + fiil-ing': receiving your reply."],
      ],
    },
    {
      title: "A For and Against Essay: Homework",
      instructions: 'Complete the text below with the words in the box.',
      passage: `amount | out | on | but | without | Recently | as | later | while | Having
---
Should schools stop giving homework?

Homework has been part of school life for generations. ___, however, some schools have decided to reduce or even ban it. There are good arguments ___ both sides of this debate.

On the one hand, homework gives students a chance to practise what they have learned in class. Many teachers believe that ___ regular practice, students quickly forget new information. Homework also teaches important skills such ___ time management and working independently, which students will need ___ in life.

On the other hand, many students already spend six or seven hours a day at school. ___ to do two or three more hours of homework every evening can lead to stress and tiredness. Critics also point ___ that homework is unfair, since some students have parents who can help them, ___ others have to work alone or don't have a quiet place to study.

In my opinion, homework should not be banned completely, ___ it should be limited. Short, meaningful tasks, such as reading or preparing for a discussion, can be useful without taking over students' free time.

To sum up, the ___ of homework matters more than whether it exists at all.`,
      questions: [
        ['Blank 1', "Recently", "'Recently' = son zamanlarda."],
        ['Blank 2', "on", "'on both sides' = her iki tarafta."],
        ['Blank 3', "without", "'without' = olmadan."],
        ['Blank 4', "as", "'such as' = gibi."],
        ['Blank 5', "later", "'later in life' = hayatın ilerleyen dönemlerinde."],
        ['Blank 6', "Having", "Gerund özne: 'Having to do...' ."],
        ['Blank 7', "out", "'point out' = belirtmek."],
        ['Blank 8', "while", "Karşıtlık: 'while' = oysa, -ken."],
        ['Blank 9', "but", "Zıtlık: 'but' = ama."],
        ['Blank 10', "amount", "'the amount of homework' = ödev miktarı."],
      ],
    },
    {
      title: "A Review of a Mobile App",
      instructions: 'Complete the text below with the words in the box.',
      passage: `keeps | more | when | around | Overall | into | replace | that | simple | which
---
FitQuest — ★★★★☆

I downloaded FitQuest two months ago because I wanted to get fit, but I find going to the gym really boring. The app turns exercise ___ a game, and I have to say, it actually works!

The idea is simple. You go for a walk or a run, and the app creates a story ___ you. For example, you might be escaping from zombies or searching for hidden treasure. The faster you move, the ___ points you get. It sounds silly, but it really ___ me motivated. I've been running three times a week since I started, which is a personal record!

The graphics are ___ but attractive, and the app is very easy to use. I also like the fact ___ you can join challenges with friends and compare your progress.

However, the app isn't perfect. The free version has quite a lot of adverts, which can be annoying ___ you're in the middle of a run. To remove them, you have to pay a monthly subscription, ___ I think is a bit expensive. It also uses a lot of battery.

___, I'd recommend FitQuest to anyone who finds exercise boring. It won't ___ a personal trainer, but it's a fun way to get moving.`,
      questions: [
        ['Blank 1', "into", "'turn into' = -e dönüştürmek."],
        ['Blank 2', "around", "'around you' = etrafında."],
        ['Blank 3', "more", "'The faster..., the more...' kalıbı."],
        ['Blank 4', "keeps", "'keeps me motivated' = motive tutuyor."],
        ['Blank 5', "simple", "'simple but attractive' = sade ama çekici."],
        ['Blank 6', "that", "'the fact that' = ... olması."],
        ['Blank 7', "when", "Zaman: 'when you're in the middle of...' ."],
        ['Blank 8', "which", "Önceki ifadeyi niteleyen ilgi zamiri."],
        ['Blank 9', "Overall", "'Overall' = genel olarak."],
        ['Blank 10', "replace", "'replace' = yerini almak."],
      ],
    },
    {
      title: "An Article: The Perfect Day Off",
      instructions: 'Complete the text below with the words in the box.',
      passage: `preferably | Instead | wake | feel | notice | about | enjoy | by | look | while
---
HOW TO SPEND THE PERFECT DAY OFF

We all ___ forward to our days off, but how many of us actually use them well? Too often, we spend the whole day scrolling on our phones and then feel guilty ___ wasting it. Here are some ideas for a day off that you'll really remember.

Start slowly
Don't set an alarm. Wake up naturally and ___ a long breakfast — ___ outside, if the weather is good. A slow morning tells your brain that today is different.

Get outside
Spending time in nature is one of the best ways to relax. Go for a walk in the park, cycle along the coast or simply sit ___ the water. Leave your phone in your pocket and ___ what's around you.

Try something new
Visit a museum you've never been to, take a cooking class or explore a part of your city you don't know. New experiences make days ___ longer and more memorable.

Spend time with people you love
Call a friend you haven't seen for a ___, or invite your family for dinner. Good conversations are worth more than any TV series.

End the day early
___ of staying up late, go to bed at a reasonable time. You'll ___ up feeling rested and ready for the week ahead.

So next time you have a free day, why not give it a try?`,
      questions: [
        ['Blank 1', "look", "'look forward to' = dört gözle beklemek."],
        ['Blank 2', "about", "'feel guilty about' = ... için suçlu hissetmek."],
        ['Blank 3', "enjoy", "'enjoy' = keyfini çıkarmak."],
        ['Blank 4', "preferably", "'preferably' = tercihen."],
        ['Blank 5', "by", "'sit by the water' = suyun kenarında oturmak."],
        ['Blank 6', "notice", "'notice' = fark etmek."],
        ['Blank 7', "feel", "'make + nesne + feel' kalıbı."],
        ['Blank 8', "while", "'for a while' = bir süredir."],
        ['Blank 9', "Instead", "'Instead of' = yerine."],
        ['Blank 10', "wake", "'wake up' = uyanmak."],
      ],
    },
    {
      title: "A Letter to a Newspaper About Local Parks",
      instructions: 'Complete the text below with the words in the box.',
      passage: `avoid | become | else | where | immediately | often | support | for | to | suggest
---
Dear Editor,

I am writing in response ___ your article last week about the poor condition of parks in our town. I completely agree that something needs to be done, and I would like to ___ some solutions.

As a mother of two young children, I visit Central Park almost every day. Sadly, it has ___ a place that many families now ___. The playground equipment is old and broken, there is litter everywhere, and the toilets have been closed ___ over a year. In the evenings, groups of teenagers gather there because there is nowhere ___ for them to go.

I believe the council should take action ___. Firstly, the playground should be repaired so that children can play safely. Secondly, more rubbish bins should be installed, and they should be emptied more ___. Finally, it would be a good idea to create a youth centre or sports area ___ teenagers can meet.

Parks are not a luxury. They are one of the few places where people of all ages can meet, exercise and relax for free. If the council doesn't act now, we may lose them altogether.

I hope other readers will ___ this campaign.

Yours faithfully,
Gül Şahin`,
      questions: [
        ['Blank 1', "to", "'in response to' = yanıt olarak."],
        ['Blank 2', "suggest", "'suggest' = önermek."],
        ['Blank 3', "become", "Present perfect: 'has become' = ... haline geldi."],
        ['Blank 4', "avoid", "'avoid' = kaçınmak."],
        ['Blank 5', "for", "Süre: 'for over a year' ."],
        ['Blank 6', "else", "'nowhere else' = başka hiçbir yer."],
        ['Blank 7', "immediately", "'immediately' = hemen."],
        ['Blank 8', "often", "'more often' = daha sık."],
        ['Blank 9', "where", "Yer bildiren ilgi zamiri: 'where teenagers can...' ."],
        ['Blank 10', "support", "'support' = desteklemek."],
      ],
    },
    {
      title: "An Informal Email Giving Advice",
      instructions: 'Complete the text below with the words in the box.',
      passage: `whatever | make | sure | with | about | easier | If | all | whether | used
---
Hi Ali,

Thanks for your email. I'm sorry to hear you're feeling so stressed ___ your exams — I remember exactly how that feels!

You asked for my advice, so here are a few things that really helped me last year.

First of ___, ___ a study plan. Write down all your exams and decide how much time you need for each subject. It's much ___ to stay calm when you can see everything on paper.

Secondly, don't try to study for hours without a break. I ___ to do that, and I couldn't remember anything! Study for about forty-five minutes, then take a short break. Go for a walk or have a snack.

Another thing that helped me was studying ___ a friend. Explaining things to someone else is a great way to check ___ you really understand them.

And ___ you do, don't stay up all night before an exam. Sleep is really important for your memory.

___ I were you, I'd also turn off my phone while studying. It's amazing how much time you save!

I'm ___ you'll do well. Let me know how it goes!

Take care,
Aslı`,
      questions: [
        ['Blank 1', "about", "'stressed about' = ... konusunda stresli."],
        ['Blank 2', "all", "'First of all' = her şeyden önce."],
        ['Blank 3', "make", "'make a plan' = plan yapmak."],
        ['Blank 4', "easier", "Karşılaştırma: 'much easier' ."],
        ['Blank 5', "used", "'used to + fiil' = eskiden ... -ırdım."],
        ['Blank 6', "with", "'study with a friend' = bir arkadaşla çalışmak."],
        ['Blank 7', "whether", "'check whether' = ... olup olmadığını kontrol etmek."],
        ['Blank 8', "whatever", "'whatever you do' = ne yaparsan yap."],
        ['Blank 9', "If", "Koşul: 'If I were you' = senin yerinde olsam."],
        ['Blank 10', "sure", "'I'm sure' = eminim."],
      ],
    },
    {
      title: "A Report on a School Trip",
      instructions: 'Complete the text below with the words in the box.',
      passage: `enough | also | Nevertheless | on | recommend | evaluate | repeating | which | with | lunch
---
Report on the Year 10 trip to the Science Museum

Introduction
The purpose of this report is to ___ the Year 10 trip to the Science Museum on 14th March and to make suggestions for future trips. The information is based ___ a survey of the 45 students who took part.

Positive aspects
Most students (82%) said they enjoyed the trip. The interactive space exhibition was the most popular part, ___ many students saying it helped them understand topics they had studied in class. The guided workshop on electricity was ___ described as useful and fun.

Problems
___, there were some problems. Firstly, the coach left school forty minutes late, ___ meant that we missed part of the planned programme. Secondly, many students felt that there was not ___ free time to explore the museum independently. Finally, several students complained that the museum café was very crowded and expensive.

Recommendations
In the future, I would ___ booking the coach earlier and asking the company to confirm the departure time. It would also be a good idea to include at least one hour of free time and to ask students to bring a packed ___.

Conclusion
Overall, the trip was a success, and I would strongly recommend ___ it next year with the changes suggested above.`,
      questions: [
        ['Blank 1', "evaluate", "'evaluate' = değerlendirmek."],
        ['Blank 2', "on", "'based on' = -e dayanarak."],
        ['Blank 3', "with", "'with many students saying...' kalıbı."],
        ['Blank 4', "also", "'also' = ayrıca."],
        ['Blank 5', "Nevertheless", "Zıtlık: 'Nevertheless' = yine de."],
        ['Blank 6', "which", "Önceki cümleyi niteleyen ilgi zamiri."],
        ['Blank 7', "enough", "'not enough time' = yeterli zaman yok."],
        ['Blank 8', "recommend", "'recommend + fiil-ing' = önermek."],
        ['Blank 9', "lunch", "'packed lunch' = yanına alınan öğle yemeği."],
        ['Blank 10', "repeating", "'recommend repeating' = tekrarlanmasını önermek."],
      ],
    },
    {
      title: "A Biography: Marie Curie",
      instructions: 'Complete the text below with the words in the box.',
      passage: `achievement | caused | born | that | lived | in | which | along | Despite | Determined
---
Marie Curie was one of the most important scientists in history, and the first woman ever to win a Nobel Prize.

She was ___ Maria Skłodowska in Warsaw, Poland, in 1867. Her parents were both teachers, and from an early age she showed a great interest ___ science. However, at that time women were not allowed to study at university in Poland.

___ to continue her education, she moved to Paris in 1891 and studied physics and mathematics at the Sorbonne. She had very little money and often ___ on bread and tea, but she finished top of her class.

In Paris, she met Pierre Curie, a fellow scientist, and they married in 1895. Together they studied radioactivity, a word ___ Marie herself invented. In 1898, they discovered two new elements, polonium and radium. In 1903, they won the Nobel Prize in Physics, ___ with Henri Becquerel.

Tragically, Pierre was killed in a street accident in 1906. ___ her grief, Marie continued their work and became the first female professor at the Sorbonne. In 1911, she won a second Nobel Prize, this time in Chemistry.

During the First World War, she developed mobile X-ray units ___ helped to treat thousands of injured soldiers.

Marie Curie died in 1934 from an illness ___ by years of working with radioactive materials. Today, she is remembered as a symbol of courage and scientific ___.`,
      questions: [
        ['Blank 1', "born", "'be born' = doğmak."],
        ['Blank 2', "in", "'interest in' = ... ilgi."],
        ['Blank 3', "Determined", "'Determined to' = ... kararlı."],
        ['Blank 4', "lived", "Geçmiş zaman: 'lived on bread' = ekmekle yaşadı."],
        ['Blank 5', "that", "İlgi zamiri: 'a word that she invented' ."],
        ['Blank 6', "along", "'along with' = ile birlikte."],
        ['Blank 7', "Despite", "'Despite + isim' = -e rağmen."],
        ['Blank 8', "which", "İlgi zamiri: 'units which helped' ."],
        ['Blank 9', "caused", "'caused by' = ... nedeniyle oluşan."],
        ['Blank 10', "achievement", "'scientific achievement' = bilimsel başarı."],
      ],
    },
    {
      title: "A Job Application Email: Summer Volunteer",
      instructions: 'Complete the text below with the words in the box.',
      passage: `sincerely | throughout | working | confidently | on | opportunity | for | which | in | experience
---
Subject: Application for Summer Volunteer — Sea Turtle Project

Dear Ms Demir,

I am writing to apply for a place ___ your Sea Turtle Conservation Project in Dalyan this summer, which I read about on the WWF Turkey website.

I am a 20-year-old biology student at Ege University, and I am particularly interested ___ marine life. Protecting endangered animals is something I feel very strongly about, ___ is why I chose to study biology in the first place.

Although I have not worked on a turtle project before, I have some relevant ___. Last year, I volunteered for three months at a wildlife rescue centre, where I helped to care ___ injured birds. I also took part in several beach-cleaning events in Izmir.

I am hard-working and responsible, and I am used to ___ outdoors in hot weather. I get on well with people from different backgrounds, and I can communicate ___ in English, which I understand would be useful when talking to tourists.

I am available ___ July and August, and I am happy to work night shifts, as I know that turtles usually lay their eggs at night.

I would be very grateful for the ___ to join your team. Please find my CV attached.

Thank you for considering my application.

Yours ___,
Burak Er`,
      questions: [
        ['Blank 1', "on", "'a place on the project' = projede yer."],
        ['Blank 2', "in", "'interested in' = ile ilgilenmek."],
        ['Blank 3', "which", "Önceki ifadeyi niteleyen ilgi zamiri."],
        ['Blank 4', "experience", "'relevant experience' = ilgili deneyim."],
        ['Blank 5', "for", "'care for' = bakmak."],
        ['Blank 6', "working", "'be used to + fiil-ing' = alışkın olmak."],
        ['Blank 7', "confidently", "'confidently' = kendinden emin bir şekilde."],
        ['Blank 8', "throughout", "'throughout' = boyunca."],
        ['Blank 9', "opportunity", "'the opportunity to' = fırsat."],
        ['Blank 10', "sincerely", "Adı bilinen alıcıya (Dear Ms Demir) 'Yours sincerely' ."],
      ],
    },
  ],
  B2: [
    {
      title: "A Proposal for Improving Your Town",
      instructions: 'Complete the text below with the words in the box.',
      passage: `Furthermore | making | starting | In | aim | off | by | rather | undoubtedly | outweigh
---
Proposal: Making the town centre more pedestrian-friendly

Introduction
The ___ of this proposal is to suggest ways of making Merkez Street and the surrounding area safer and more attractive for pedestrians. It is based on observations made over a two-week period and on conversations with local residents and shop owners.

Current situation
At present, the town centre is dominated ___ traffic. Pavements are narrow and frequently blocked by parked cars, ___ it difficult for elderly people and parents with pushchairs to get around. Air quality is poor, particularly during rush hour, and several shop owners reported that customers are put ___ by the noise and congestion.

Recommendations
___ order to address these issues, I would like to propose the following measures:
• Closing Merkez Street to private vehicles between 10 a.m. and 7 p.m., with exceptions for deliveries and emergency services.
• Widening the pavements and introducing benches, trees and outdoor seating for cafés.
• Improving bus services to the centre and providing a secure bicycle parking area.

Benefits
These changes would ___ make the town centre more pleasant to visit. Experience from other towns suggests that pedestrianisation tends to increase, ___ than reduce, the number of shoppers. ___, cleaner air and less noise would benefit residents' health.

Conclusion
While some drivers may initially object, I am convinced that the long-term advantages would far ___ the inconvenience. I therefore recommend that the council consider a six-month trial ___ next spring.`,
      questions: [
        ['Blank 1', "aim", "'The aim of this proposal' = bu önerinin amacı."],
        ['Blank 2', "by", "Edilgen: 'dominated by' = ... tarafından hâkim olunan."],
        ['Blank 3', "making", "Sonuç bildiren ortaç: 'making it difficult' ."],
        ['Blank 4', "off", "'put off' = caydırmak."],
        ['Blank 5', "In", "'In order to' = -mek için."],
        ['Blank 6', "undoubtedly", "'undoubtedly' = şüphesiz."],
        ['Blank 7', "rather", "'rather than' = -den ziyade."],
        ['Blank 8', "Furthermore", "Ek bilgi: 'Furthermore' = ayrıca."],
        ['Blank 9', "outweigh", "'outweigh' = ağır basmak."],
        ['Blank 10', "starting", "'starting next spring' = gelecek bahardan itibaren."],
      ],
    },
    {
      title: "An Essay: Should Public Transport Be Free?",
      instructions: 'Complete the text below with the words in the box.',
      passage: `balance | impact | for | such | that | thereby | address | Nevertheless | compelling | Supporters
---
In recent years, a number of cities around the world, most notably Tallinn in Estonia and the whole of Luxembourg, have made public transport free for residents. ___ argue that this policy could solve many urban problems, while critics question whether it is affordable or even effective. This essay will examine both sides of the argument.

The most ___ argument in favour of free public transport is environmental. If buses and trains cost nothing, more people would be encouraged to leave their cars at home, ___ reducing traffic congestion and air pollution. Free transport would also benefit low-income groups, ___ whom travel costs can represent a significant proportion of their budget.

___, there are serious concerns. Running a transport network is extremely expensive, and if passengers no longer pay, the cost must be met through higher taxes or cuts to other services. Furthermore, evidence from cities ___ have tried the scheme suggests that the increase in passengers often comes from people who previously walked or cycled, rather than from drivers. In ___ cases, the environmental benefits may be limited.

On ___, I believe that making public transport free is not, by itself, the most effective solution. Investment in more frequent, reliable services is likely to have a greater ___, since many people choose their cars not because of cost but because public transport is slow or inconvenient. Reduced fares for students, pensioners and those on low incomes would ___ the issue of fairness at a far lower cost.`,
      questions: [
        ['Blank 1', "Supporters", "'Supporters' = destekçiler."],
        ['Blank 2', "compelling", "'compelling' = ikna edici, güçlü."],
        ['Blank 3', "thereby", "'thereby' = böylece."],
        ['Blank 4', "for", "'for whom' — kişi için ilgi zamiri."],
        ['Blank 5', "Nevertheless", "Zıtlık: 'Nevertheless' = yine de."],
        ['Blank 6', "that", "İlgi zamiri: 'cities that have tried' ."],
        ['Blank 7', "such", "'In such cases' = bu gibi durumlarda."],
        ['Blank 8', "balance", "'On balance' = genel olarak değerlendirildiğinde."],
        ['Blank 9', "impact", "'impact' = etki."],
        ['Blank 10', "address", "'address the issue' = sorunu ele almak."],
      ],
    },
    {
      title: "A Book Review",
      instructions: 'Complete the text below with the words in the box.',
      passage: `that | can't | complex | exactly | appeal | after | set | alternate | when | If
---
THE SILENT HOUR by Meryem Aksoy — ★★★★☆

Few debut novels manage to combine a gripping plot with genuine emotional depth, but Meryem Aksoy's The Silent Hour does ___ that.

The story is ___ in a small coastal town in the Aegean, where a fishing boat disappears during a storm with three men on board. Twenty years later, Nur, the daughter of one of the missing fishermen, returns to the town ___ her mother's death. While clearing out the family home, she discovers a bundle of letters ___ suggest the boat's disappearance was no accident.

What makes the novel stand out is its structure. Chapters ___ between Nur's investigation in the present and her father's final weeks in the past, gradually revealing the truth from two directions. Aksoy handles this skilfully, and the moment ___ the two timelines finally meet is genuinely shocking.

The characters are richly drawn. Nur, in particular, is a ___ heroine: determined and brave, but also stubborn and, at times, unfair to those who try to help her.

___ I have one criticism, it is that the middle section moves rather slowly, with a few too many descriptions of the landscape. Some readers may also find the ending a little too neat.

Nevertheless, this is a beautifully written and thought-provoking novel about grief, secrets and the price of silence. It would ___ to anyone who enjoys literary mysteries, and I ___ wait to see what Aksoy writes next.`,
      questions: [
        ['Blank 1', "exactly", "'exactly that' = tam olarak bunu."],
        ['Blank 2', "set", "'be set in' = ... de geçmek."],
        ['Blank 3', "after", "'after her mother's death' = annesinin ölümünden sonra."],
        ['Blank 4', "that", "İlgi zamiri: 'letters that suggest' ."],
        ['Blank 5', "alternate", "'alternate between' = arasında gidip gelmek."],
        ['Blank 6', "when", "Zaman bildiren ilgi zamiri."],
        ['Blank 7', "complex", "'complex' = karmaşık, çok boyutlu."],
        ['Blank 8', "If", "Koşul: 'If I have one criticism' kalıbı."],
        ['Blank 9', "appeal", "'appeal to' = hitap etmek."],
        ['Blank 10', "can't", "'can't wait to' = sabırsızlanmak."],
      ],
    },
    {
      title: "A Letter of Recommendation",
      instructions: 'Complete the text below with the words in the box.',
      passage: `proved | managed | contribution | contact | willing | hesitation | recall | for | however | popular
---
To whom it may concern,

I am writing to recommend Ms Selin Aydın for the position of Assistant Event Manager at your company. I have known Selin ___ three years, during which time she worked as an event coordinator in my team at Blue Sky Events.

From the moment she joined us, Selin ___ to be an exceptionally organised and reliable member of staff. She was responsible for planning a wide range of events, from small business lunches to international conferences with over five hundred guests. Her attention to detail was outstanding, and I cannot ___ a single occasion on which she missed a deadline.

What impressed me most, ___, was her ability to remain calm under pressure. On one occasion, the main speaker at a conference cancelled just two hours before he was due to appear. Selin ___ to find a replacement, reorganise the programme and inform all the guests, without any disruption to the event.

Selin also has excellent interpersonal skills. She is ___ with both colleagues and clients, and she is always ___ to help others. Her fluent English and good knowledge of German were a great asset when dealing with international clients.

I have no ___ in recommending Selin for this position. I am confident that she would make a valuable ___ to your organisation.

Please do not hesitate to ___ me if you require any further information.

Yours faithfully,
Ahmet Koç
Events Director, Blue Sky Events`,
      questions: [
        ['Blank 1', "for", "Süre: 'for three years' ."],
        ['Blank 2', "proved", "'prove to be' = ... olduğunu kanıtlamak."],
        ['Blank 3', "recall", "'recall' = hatırlamak (resmi)."],
        ['Blank 4', "however", "Cümle içi zıtlık: ', however,' ."],
        ['Blank 5', "managed", "'manage to' = başarmak."],
        ['Blank 6', "popular", "'popular with' = ... arasında sevilen."],
        ['Blank 7', "willing", "'willing to' = istekli."],
        ['Blank 8', "hesitation", "'I have no hesitation in...' = hiç tereddüt etmeden."],
        ['Blank 9', "contribution", "'contribution to' = katkı."],
        ['Blank 10', "contact", "'contact me' = benimle iletişime geçmek."],
      ],
    },
    {
      title: "An Article: The Art of Doing Nothing",
      instructions: 'Complete the text below with the words in the box.',
      passage: `harm | wander | seen | Start | to | discover | Unlike | urge | without | turns
---
THE ART OF DOING NOTHING

When did you last do absolutely nothing? Not scrolling, not listening to a podcast, not planning tomorrow's tasks — just sitting, staring out of the window and letting your mind ___? If you can't remember, you're far from alone.

In a culture that values productivity above almost everything else, doing nothing has come to be ___ as laziness. We fill every spare moment, convinced that time not spent achieving something is time wasted. Yet a growing body of research suggests that this constant activity may be doing us more ___ than good.

When we stop focusing on specific tasks, a network of brain regions becomes active that is linked ___ creativity, memory and self-reflection. It's no coincidence that so many people report having their best ideas in the shower or on a long walk. Rest, it ___ out, is not the opposite of productivity but an essential part of it.

The Dutch even have a word for it: niksen, the practice of deliberately doing nothing. ___ meditation, it has no rules or goals. You simply allow yourself to be idle, ___ feeling guilty.

So how can we bring a little more nothing into our lives? ___ small. Leave your phone in another room for twenty minutes. Sit on a park bench and resist the ___ to check your messages. Look at the clouds.

It may feel uncomfortable at first. But you might ___ that doing nothing is one of the most useful things you can do.`,
      questions: [
        ['Blank 1', "wander", "'let your mind wander' = zihnini serbest bırakmak."],
        ['Blank 2', "seen", "'be seen as' = olarak görülmek."],
        ['Blank 3', "harm", "'do more harm than good' = yarardan çok zarar vermek."],
        ['Blank 4', "to", "'linked to' = ile bağlantılı."],
        ['Blank 5', "turns", "'it turns out' = ortaya çıkıyor ki."],
        ['Blank 6', "Unlike", "'Unlike' = -in aksine."],
        ['Blank 7', "without", "'without feeling guilty' = suçlu hissetmeden."],
        ['Blank 8', "Start", "Emir kipi: 'Start small' = küçük başla."],
        ['Blank 9', "urge", "'resist the urge' = dürtüye direnmek."],
        ['Blank 10', "discover", "'discover' = keşfetmek."],
      ],
    },
    {
      title: "A Report on Workplace Wellbeing",
      instructions: 'Complete the text below with the words in the box.',
      passage: `In | checking | source | into | However | realistic | concern | much | sets | side
---
Report: Staff wellbeing at Nova Software

Introduction
This report ___ out to assess the current level of staff wellbeing at Nova Software and to recommend measures to improve it. It is based on an anonymous online survey completed by 120 employees (76% of staff) in September.

Main findings
Overall, the results were mixed. On the positive ___, 78% of respondents said they enjoyed their work and felt that their colleagues were supportive. Flexible working hours were particularly appreciated.

___, a significant number of employees reported high levels of stress. Almost half (47%) said they regularly worked more than ten hours a day, and 38% admitted ___ work emails at weekends. Many respondents felt that deadlines were often unrealistic and that meetings took up too ___ of their time.

The office environment was another ___ of dissatisfaction. Employees complained about noise in the open-plan area and a lack of quiet spaces for concentrated work.

Recommendations
___ light of these findings, it is recommended that:
• a policy be introduced discouraging emails outside working hours;
• managers review project timelines with their teams to ensure they are ___;
• the number of meetings be reduced, and no meetings be scheduled on Friday afternoons;
• two meeting rooms be converted ___ quiet working areas.

Conclusion
Although staff are generally positive about their work, the current levels of stress are a cause for ___. If the measures above are implemented, we can expect improvements in both wellbeing and productivity.`,
      questions: [
        ['Blank 1', "sets", "'set out to' = ... amaçlamak."],
        ['Blank 2', "side", "'On the positive side' = olumlu tarafta."],
        ['Blank 3', "However", "Zıtlık: 'However' = ancak."],
        ['Blank 4', "checking", "'admit + fiil-ing' = itiraf etmek."],
        ['Blank 5', "much", "Sayılamayan isimle 'too much time' ."],
        ['Blank 6', "source", "'a source of' = ... kaynağı."],
        ['Blank 7', "In", "'In light of these findings' = bu bulgular ışığında."],
        ['Blank 8', "realistic", "'realistic' = gerçekçi."],
        ['Blank 9', "into", "'convert into' = -e dönüştürmek."],
        ['Blank 10', "concern", "'a cause for concern' = endişe sebebi."],
      ],
    },
    {
      title: "A Letter to the Editor About Tourism",
      instructions: 'Complete the text below with the words in the box.',
      passage: `What | Having | outlined | where | reconsider | beyond | throughout | appreciate | those | replaced
---
Dear Editor,

I read with great interest your recent article, 'Tourism: Our Town's Golden Future', in which the mayor ___ plans to double the number of visitors to Kaş over the next five years. While I ___ the economic benefits tourism brings, I believe these plans are short-sighted and could seriously damage the very things that make our town special.

___ lived in Kaş for over thirty years, I have witnessed enormous changes. Tourism has undoubtedly created jobs and improved local services. However, it has also pushed house prices ___ the reach of many young families, and in summer our narrow streets and small beaches are already overcrowded.

___ concerns me most is the environmental impact. The proposed new hotel complex would be built on one of the last undeveloped stretches of coastline, an area ___ endangered sea turtles lay their eggs. Once this land is lost, it can never be ___.

Rather than simply attracting more tourists, the council should focus on attracting the right kind of tourism: visitors who stay longer, respect the local environment and spend money in locally owned businesses. Spreading visits more evenly ___ the year would also reduce pressure on the town in July and August.

I urge the council to ___ its plans and to hold a public consultation before any final decision is made. Our town's future should be decided by ___ who live here, not only by those who profit from it.

Yours faithfully,
Hülya Arslan`,
      questions: [
        ['Blank 1', "outlined", "'outline' = ana hatlarıyla anlatmak."],
        ['Blank 2', "appreciate", "'appreciate' = takdir etmek, anlamak."],
        ['Blank 3', "Having", "'Having lived here...' = ... yaşamış biri olarak."],
        ['Blank 4', "beyond", "'beyond the reach of' = ulaşılamayacak kadar."],
        ['Blank 5', "What", "'What concerns me most is...' kalıbı."],
        ['Blank 6', "where", "Yer bildiren ilgi zamiri."],
        ['Blank 7', "replaced", "Edilgen: 'can never be replaced' ."],
        ['Blank 8', "throughout", "'throughout the year' = yıl boyunca."],
        ['Blank 9', "reconsider", "'reconsider' = yeniden düşünmek."],
        ['Blank 10', "those", "'those who live here' = burada yaşayanlar."],
      ],
    },
    {
      title: "A Problem-Solution Essay: Food Waste",
      instructions: 'Complete the text below with the words in the box.',
      passage: `depending | due | significantly | However | when | that | while | instead | requires | what
---
It is estimated that around one third of all the food produced in the world is lost or wasted. At a time ___ millions of people go hungry, this is not only an economic problem but also a moral and environmental one. This essay will examine the main causes of food waste and suggest some possible solutions.

The causes of the problem vary ___ on the region. In developing countries, much food is lost before it even reaches consumers, ___ to poor storage facilities and inadequate transport. In wealthier countries, by contrast, the majority of waste occurs in shops and households. Supermarkets often reject fruit and vegetables that are perfectly edible but do not look perfect, ___ consumers buy more than they need and throw away food that has passed its 'best before' date, even when it is still safe to eat.

Tackling this issue ___ action at several levels. Governments could invest in better storage and refrigeration in developing countries, which would allow farmers to sell more of ___ they produce. In richer nations, supermarkets should be encouraged — or even required by law, as in France — to donate unsold food to charities ___ of throwing it away.

Individuals, too, have an important role to play. Planning meals, writing shopping lists and understanding the difference between 'use by' and 'best before' dates could ___ reduce household waste.

In conclusion, food waste is a complex problem with no single solution. ___, if governments, businesses and consumers all take responsibility, it is a problem ___ can be dramatically reduced.`,
      questions: [
        ['Blank 1', "when", "Zaman bildiren ilgi zamiri: 'At a time when' ."],
        ['Blank 2', "depending", "'depending on' = -e bağlı olarak."],
        ['Blank 3', "due", "'due to' = nedeniyle."],
        ['Blank 4', "while", "Karşıtlık: 'while' = -ken, oysa."],
        ['Blank 5', "requires", "'requires' = gerektirir."],
        ['Blank 6', "what", "'what they produce' = ürettikleri şey."],
        ['Blank 7', "instead", "'instead of' = yerine."],
        ['Blank 8', "significantly", "'significantly' = önemli ölçüde."],
        ['Blank 9', "However", "Zıtlık: 'However' = ancak."],
        ['Blank 10', "that", "İlgi zamiri: 'a problem that can be...' ."],
      ],
    },
    {
      title: "A Narrative: A Turning Point",
      instructions: 'Complete the text below with the words in the box.',
      passage: `before | finally | take | company | expected | unlikely | surprise | as | by | witnessing
---
I had always believed that I would become a lawyer, like my father and his father before him. It was simply what was ___ of me, and I had never seriously questioned it. Then, in the summer I turned nineteen, everything changed.

I had taken a summer job at a hospital in Ankara, mainly to earn some money ___ starting university. My task was to help in the children's ward — reading stories, playing games and keeping young patients ___.

That was where I met Ela. She was eight years old, had been in hospital for months, and had a way of looking at you ___ if she could see straight through you. On my first day, she beat me at chess three times in a row and then told me, quite seriously, that I was 'too nervous to be a good player'.

Over the following weeks, we became ___ friends. I watched the doctors and nurses who cared for her, and I was struck ___ the way they combined scientific knowledge with endless patience and kindness. For the first time in my life, I felt I was ___ work that truly mattered to me.

On my last day, Ela gave me a drawing of the two of us playing chess. Underneath, in careful letters, she had written: 'Dr Emre'.

That evening, I told my parents I wanted to study medicine. My father was silent for a long time. Then, to my ___, he smiled. 'I wondered how long it would ___ you,' he said.

Ela made a full recovery. I still have her drawing on my wall — and twelve years later, I ___ deserve the title she gave me.`,
      questions: [
        ['Blank 1', "expected", "Edilgen: 'was expected' = beklenen."],
        ['Blank 2', "before", "'before starting university' ."],
        ['Blank 3', "company", "'keep someone company' = birine eşlik etmek."],
        ['Blank 4', "as", "'as if' = sanki."],
        ['Blank 5', "unlikely", "'unlikely friends' = beklenmedik dostlar."],
        ['Blank 6', "by", "'be struck by' = ... den etkilenmek."],
        ['Blank 7', "witnessing", "Past continuous: 'I was witnessing' = tanık oluyordum."],
        ['Blank 8', "surprise", "'to my surprise' = şaşırtıcı biçimde."],
        ['Blank 9', "take", "'how long it would take' = ne kadar süreceği."],
        ['Blank 10', "finally", "'finally' = sonunda."],
      ],
    },
    {
      title: "A Speech Welcoming New Students",
      instructions: 'Complete the text below with the words in the box.',
      passage: `me | wait | and | than | quickest | Finally | behalf | cleverer | of | afraid
---
Good morning, everyone, and welcome to Kent College!

My name is Deniz, and I'm the president of the Student Council. On ___ of all the students here, I'd like to say how delighted we are to have you with us.

I remember sitting exactly where you are now, three years ago, feeling a mixture ___ excitement and terror. I didn't know anyone, I was worried about getting lost — which I did, several times — and I was convinced that everyone else was ___ than me. If you're feeling the same way, let me reassure you: it's completely normal, and it doesn't last long.

So, what advice can I give you? First, get involved. We have over forty clubs and societies, from robotics to rock climbing. Joining one is the ___ way to make friends who share your interests.

Second, don't be ___ to ask for help. Your teachers are here to support you, ___ so are we. The Student Council office is on the ground floor, and our door is always open.

Third — and this is the one I wish someone had told ___ — don't try to be perfect. You will make mistakes. You'll get a bad mark or two. That's how you learn, and it's not the end of the world.

___, enjoy it. These years will go by faster ___ you think, and one day you might be standing up here giving this speech yourself.

Once again, welcome. We can't ___ to get to know you. Thank you!`,
      questions: [
        ['Blank 1', "behalf", "'On behalf of' = adına."],
        ['Blank 2', "of", "'a mixture of' = ... karışımı."],
        ['Blank 3', "cleverer", "Karşılaştırma: 'cleverer than me' ."],
        ['Blank 4', "quickest", "Üstünlük: 'the quickest way' = en hızlı yol."],
        ['Blank 5', "afraid", "'afraid to' = ... korkmak."],
        ['Blank 6', "and", "Ekleme: 'and' bağlacı."],
        ['Blank 7', "me", "Nesne zamiri: 'told me' ."],
        ['Blank 8', "Finally", "Son maddeyi başlatır: 'Finally' = son olarak."],
        ['Blank 9', "than", "Karşılaştırma: 'faster than you think' ."],
        ['Blank 10', "wait", "'can't wait to' = sabırsızlanmak."],
      ],
    },
  ],
};

module.exports = { WRITING_DATA, WRITING_IMAGES_PENDING };
