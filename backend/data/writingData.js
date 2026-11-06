// Writing konuları: seed (utils/seed.js) ve kart resmi yükleme scripti (utils/uploadTopicImages.js) kullanır.
// Kart resmi adı listedeki sıradan ve başlıktan türetilir (data/topicImages.js) — konu eklerken/sıra
// değiştirirken resim dosya adlarını da buna göre güncelle.

// Writing: her konu tek bir egzersiz — "kelime kutusu" + 10 boşluklu tek bir metin
// (test-english.com formatı). passage = "kelime1 | kelime2 | ...\n---\nMetin ___ ile ___.".
const WRITING_DATA = {
  A1: [
    {
      title: 'Writing About My Family',
      instructions: 'Complete the text below with the words in the box.',
      passage: `'s got | Her | dad's | reading | than | taller | at | in | loves | works
---
Dear Marta,

Thank you for your letter! I want to tell you about my family. We live ___ a small town in the south of England.

My ___ name is Peter. He's 45 years old, and he ___ as an engineer in the city. He has short black hair and blue eyes. He ___ cooking, and he makes the best pasta in the world!

My mum's name is Anna. She ___ long red hair and green eyes. She's a little shorter ___ my dad. She works ___ a big hospital near our house. She likes ___ books in her free time.

I've got a younger sister. ___ name's Emma. She's 10 years old, and she's got brown hair like me. But she is much ___ than me already!

We also have a cat called Whiskers.

What about your family?

Love,
Sam`,
      questions: [
        ['Blank 1', 'in', "'live in a place' kalıbı kullanılır."],
        ['Blank 2', "dad's", "İyelik eki: 'dad's name' = babamın adı."],
        ['Blank 3', 'works', "3. tekil şahıs (he) ile 'works' kullanılır."],
        ['Blank 4', 'loves', "3. tekil şahıs (he) ile 'loves' kullanılır."],
        ['Blank 5', "'s got", "'she's got' = sahiplik ifadesi (has got)."],
        ['Blank 6', 'than', "Karşılaştırma yaparken 'shorter than' kullanılır."],
        ['Blank 7', 'at', "'work at a hospital' kalıbı kullanılır."],
        ['Blank 8', 'reading', "'like + fiil-ing' kalıbı: 'likes reading'."],
        ['Blank 9', 'Her', "Kız kardeşten bahsederken iyelik zamiri 'Her' kullanılır."],
        ['Blank 10', 'taller', "Karşılaştırma sıfatı: 'taller than'."],
      ],
    },
    {
      title: 'Writing About My Daily Routine',
      instructions: 'Complete the text below with the words in the box.',
      passage: `then | breakfast | dinner | up | home | watch | to | before | bed | until
---
Every day, I get ___ at seven o'clock. I have a shower and I eat ___ with my family. After that, I go ___ school by bus. School starts at eight thirty, so I always leave ___ eight fifteen.

I study ___ half past three in the afternoon. Then I walk ___ and I do my homework. In the evening, we have ___ together at seven o'clock. After dinner, I ___ TV for an hour, and ___ I read a book. Finally, I go to ___ at ten o'clock.`,
      questions: [
        ['Blank 1', 'up', "'get up' = kalkmak."],
        ['Blank 2', 'breakfast', "'have breakfast' = kahvaltı yapmak."],
        ['Blank 3', 'to', "'go to school' kalıbı kullanılır."],
        ['Blank 4', 'before', "'leave before a time' = bir saatten önce çıkmak."],
        ['Blank 5', 'until', "'study until a time' = bir saate kadar çalışmak."],
        ['Blank 6', 'home', "'walk home' = eve yürümek."],
        ['Blank 7', 'dinner', "'have dinner' = akşam yemeği yemek."],
        ['Blank 8', 'watch', "'watch TV' = televizyon izlemek."],
        ['Blank 9', 'then', "Sıralama bağlacı: sonra."],
        ['Blank 10', 'bed', "'go to bed' = yatağa gitmek."],
      ],
    },
    {
      title: 'My Hobby',
      instructions: 'Complete the text below with the words in the box.',
      passage: `on | band | since | to | every | because | with | favourite | enjoy | concerts
---
My ___ hobby is playing the guitar. I have been playing ___ I was eight years old. I ___ it because it helps me relax after a busy day at school.

I practise ___ day for thirty minutes, usually ___ my older brother, who also plays. We like making music together ___ we both love rock songs.

Last year, we started a small ___ with two friends from school. We meet ___ Saturdays to rehearse in my garage. We have even played at two school ___, and everyone said we did a great job!

I really think music is a wonderful way ___ express your feelings.`,
      questions: [
        ['Blank 1', 'favourite', "'favourite' = en sevilen."],
        ['Blank 2', 'since', "'since + zaman noktası' = -den beri."],
        ['Blank 3', 'enjoy', "'enjoy + isim/fiil-ing' = keyif almak."],
        ['Blank 4', 'every', "'every day' = her gün."],
        ['Blank 5', 'with', "'practise with someone' = biriyle birlikte çalışmak."],
        ['Blank 6', 'because', 'Sebep bağlacı: çünkü.'],
        ['Blank 7', 'band', "'form a band' = grup kurmak."],
        ['Blank 8', 'on', "'on Saturdays' = belirli günler için 'on' kullanılır."],
        ['Blank 9', 'concerts', "Okul konserleri: 'school concerts'."],
        ['Blank 10', 'to', "'a way to do something' kalıbı kullanılır."],
      ],
    },
    {
      title: 'Essay About My Neighbourhood',
      instructions: 'Complete the text below with the words in the box.',
      passage: `friendly | corner | quiet | shops | near | walk | Next | buy | live | love
---
I ___ in a small neighbourhood in the north of the city. It is very ___ and safe, so I like living here.

There is a park ___ my house, and I go there every morning. ___ to the park, there is a school where many children study. On the ___ of my street, there are some small ___ where I can ___ fruit and bread every day.

My neighbours are very ___, and we often talk when we meet. I like to ___ around the streets in the evening because it is calm and beautiful.

I really ___ my neighbourhood, and I don't want to move away.`,
      questions: [
        ['Blank 1', 'live', "'live in a place' = bir yerde yaşamak."],
        ['Blank 2', 'quiet', "'quiet' = sakin, sessiz."],
        ['Blank 3', 'near', "'near my house' = evime yakın."],
        ['Blank 4', 'Next', "'next to' = yanında (cümle başında büyük harf)."],
        ['Blank 5', 'corner', "'on the corner' = köşede."],
        ['Blank 6', 'shops', 'Çoğul isim: dükkanlar.'],
        ['Blank 7', 'buy', "'buy fruit and bread' = meyve ve ekmek satın almak."],
        ['Blank 8', 'friendly', "'friendly' = arkadaş canlısı."],
        ['Blank 9', 'walk', "'walk around' = etrafta yürümek."],
        ['Blank 10', 'love', "1. tekil şahıs: 'I love'."],
      ],
    },
    {
      title: 'A Description of My House',
      instructions: 'Complete the text below with the words in the box.',
      passage: `small | Upstairs | garden | two | kitchen | enough | bedrooms | big | bathroom | living
---
I live in a ___ house with ___ floors. On the ground floor, there is a ___ room where we watch TV, and a ___ where my mum cooks delicious meals. There is also a ___ with a shower and a bath.

___, there are three ___: mine, my sister's, and my parents'. My room is quite ___, but I love it because it has a big window.

Behind the house, there is a beautiful ___ with flowers and a tree. We often have breakfast there in summer.

I really enjoy living here because everyone has ___ space.`,
      questions: [
        ['Blank 1', 'big', "'big house' = büyük ev."],
        ['Blank 2', 'two', 'Sayı sıfatı: iki.'],
        ['Blank 3', 'living', "'living room' = oturma odası."],
        ['Blank 4', 'kitchen', "'kitchen' = mutfak."],
        ['Blank 5', 'bathroom', "'bathroom' = banyo."],
        ['Blank 6', 'Upstairs', "'upstairs' = üst katta (cümle başı büyük harf)."],
        ['Blank 7', 'bedrooms', 'Çoğul isim: yatak odaları.'],
        ['Blank 8', 'small', "'small' = küçük."],
        ['Blank 9', 'garden', "'garden' = bahçe."],
        ['Blank 10', 'enough', "'enough space' = yeterli alan."],
      ],
    },
    {
      title: 'How to Write a Personal Profile',
      instructions: 'Complete the text below with the words in the box.',
      passage: `hobbies | currently | name | study | speak | from | hope | years | friendly | enjoy
---
My ___ is Elena, and I am ___ Poland. I am 19 ___ old, and I am ___ studying English at a language school.

In my free time, I ___ reading books and playing tennis. My other ___ include cooking and painting. I can ___ two languages: Polish and English.

People say I am a ___ and hard-working person. I like to ___ hard and always try my best.

In the future, I ___ to become a translator.`,
      questions: [
        ['Blank 1', 'name', "'my name is' kalıbı."],
        ['Blank 2', 'from', "'from + ülke' = -den (köken)."],
        ['Blank 3', 'years', "'years old' = yaşında."],
        ['Blank 4', 'currently', "'currently' = şu anda."],
        ['Blank 5', 'enjoy', "'enjoy + fiil-ing' = keyif almak."],
        ['Blank 6', 'hobbies', 'Çoğul isim: hobiler.'],
        ['Blank 7', 'speak', "'speak a language' = bir dil konuşmak."],
        ['Blank 8', 'friendly', "'friendly' = arkadaş canlısı."],
        ['Blank 9', 'study', "'study hard' = çok çalışmak."],
        ['Blank 10', 'hope', "'hope to do something' = bir şey yapmayı ummak."],
      ],
    },
    {
      title: 'How to Write an Invitation',
      instructions: 'Complete the text below with the words in the box.',
      passage: `wear | party | RSVP | on | invite | bring | birthday | food | hope | at
---
Dear Sam,

I would like to ___ you to my ___ ___! It will be ___ Saturday, 14th June, ___ 6 o'clock in the evening.

We will have music, games, and lots of ___. Please don't ___ a present; just come and have fun! You don't need to ___ anything special, just something comfortable.

Please ___ by Wednesday so I know how many people are coming.

I ___ you can come!

Love,
Katie`,
      questions: [
        ['Blank 1', 'invite', "'invite someone to' = birini davet etmek."],
        ['Blank 2', 'birthday', "'birthday party' = doğum günü partisi."],
        ['Blank 3', 'party', 'Bileşik isim: parti.'],
        ['Blank 4', 'on', "Tarihlerden önce 'on' kullanılır: 'on Saturday'."],
        ['Blank 5', 'at', "Saatlerden önce 'at' kullanılır: 'at 6 o'clock'."],
        ['Blank 6', 'food', "'lots of food' = bol yiyecek."],
        ['Blank 7', 'bring', "'bring a present' = hediye getirmek."],
        ['Blank 8', 'wear', "'wear something' = bir şey giymek."],
        ['Blank 9', 'RSVP', 'Fransızca kısaltma: lütfen yanıt verin (katılım bildirme).'],
        ['Blank 10', 'hope', "'I hope' = umuyorum."],
      ],
    },
    {
      title: 'Describing a Photograph',
      instructions: 'Complete the text below with the words in the box.',
      passage: `background | wearing | photo | holding | standing | sunny | taken | smiling | together | looks
---
This is a ___ of my family. It was ___ last summer during our holiday at the beach.

In the photo, my parents are ___ in the middle, and they are ___ casual summer clothes. My mum is ___ happily at the camera.

In the ___, you can see the sea and some boats. My little brother is ___ an ice cream, and he ___ very happy.

It was a ___ day, and we all had a wonderful time ___.`,
      questions: [
        ['Blank 1', 'photo', "'a photo of' = birinin fotoğrafı."],
        ['Blank 2', 'taken', "'was taken' = edilgen yapı, çekildi."],
        ['Blank 3', 'standing', "'be standing' = ayakta durmak (şimdiki zaman)."],
        ['Blank 4', 'wearing', "'be wearing' = giyiyor olmak."],
        ['Blank 5', 'smiling', "'be smiling' = gülümsüyor olmak."],
        ['Blank 6', 'background', "'in the background' = arka planda."],
        ['Blank 7', 'holding', "'be holding' = elinde tutuyor olmak."],
        ['Blank 8', 'looks', "'look + sıfat' = görünmek."],
        ['Blank 9', 'sunny', "'a sunny day' = güneşli bir gün."],
        ['Blank 10', 'together', "'together' = birlikte."],
      ],
    },
    {
      title: 'Writing an Email Giving Instructions',
      instructions: 'Complete the text below with the words in the box.',
      passage: `opposite | past | straight | left | station | until | arrive | right | turn | walk
---
Hi Marco,

Here are the directions to my house from the train ___.

When you leave the station, ___ left and go ___ on for two minutes. Then, ___ the traffic lights, turn ___ into Green Street.

Continue ___ the small bridge, and you will see a bakery on your ___. My house is ___ the bakery, on the corner.

It only takes about ten minutes to ___ there if you ___, or five minutes by car.

See you soon!

Anna`,
      questions: [
        ['Blank 1', 'station', "'train station' = tren istasyonu."],
        ['Blank 2', 'turn', "'turn left' = sola dönmek."],
        ['Blank 3', 'straight', "'go straight on' = düz devam etmek."],
        ['Blank 4', 'until', "'until' = -e kadar."],
        ['Blank 5', 'right', "'turn right' = sağa dönmek."],
        ['Blank 6', 'past', "'go past something' = bir şeyin yanından/önünden geçmek."],
        ['Blank 7', 'left', "'on your left' = solunuzda."],
        ['Blank 8', 'opposite', "'opposite' = karşısında."],
        ['Blank 9', 'arrive', "'arrive there' = oraya varmak."],
        ['Blank 10', 'walk', "'if you walk' = eğer yürürsen."],
      ],
    },
    {
      title: 'My Weekend Plans',
      instructions: 'Complete the text below with the words in the box.',
      passage: `meet | afternoon | Saturday | going | forward | plan | relax | morning | visit | evening
---
This weekend, I have a lot of ___ activities. On ___, I am ___ to ___ my grandparents in the countryside. We usually have lunch together in the ___.

In the ___, I am going to ___ my friends at the cinema to watch a new film.

On Sunday, I don't have any plans. I just want to ___ at home and read a book. In the ___, I will probably cook dinner for my family.

I am really looking ___ to this weekend!`,
      questions: [
        ['Blank 1', 'plan', "'plan' = plan (isim)."],
        ['Blank 2', 'Saturday', 'Gün adı: Cumartesi.'],
        ['Blank 3', 'going', "'be going to' = gelecek zaman kalıbı."],
        ['Blank 4', 'visit', "'visit someone' = birini ziyaret etmek."],
        ['Blank 5', 'morning', "'in the morning' = sabahleyin."],
        ['Blank 6', 'afternoon', "'in the afternoon' = öğleden sonra."],
        ['Blank 7', 'meet', "'meet someone' = biriyle buluşmak."],
        ['Blank 8', 'relax', "'relax at home' = evde dinlenmek."],
        ['Blank 9', 'evening', "'in the evening' = akşamleyin."],
        ['Blank 10', 'forward', "'look forward to' = dört gözle beklemek."],
      ],
    },
  ],
  A2: [
    {
      title: 'Writing and Responding to an Informal Email Invitation',
      instructions: 'Complete the text below with the words in the box.',
      passage: `sounds | plans | delighted | catch | bring | reply | invited | instead | definitely | unfortunately
---
Hi Chloe,

Thank you so much for the email! I am really ___ that you have ___ me to your barbecue next Saturday.

I would ___ love to come, but ___, I already have other ___ that day — my cousin's wedding.

Could we meet ___ the week after? That ___ like a great idea to me!

Should I ___ anything to the wedding? Just joking! I would love to ___ up with you soon and hear about the barbecue.

Please ___ when you get a chance!

Best,
Maria`,
      questions: [
        ['Blank 1', 'delighted', "'delighted that' = çok memnun."],
        ['Blank 2', 'invited', "'have invited' = present perfect, davet etmek."],
        ['Blank 3', 'definitely', "'would definitely' = kesinlikle."],
        ['Blank 4', 'unfortunately', 'Zarf: ne yazık ki.'],
        ['Blank 5', 'plans', "'have plans' = planları olmak."],
        ['Blank 6', 'instead', "'meet instead' = onun yerine."],
        ['Blank 7', 'sounds', "'sounds like' = kulağa ... gibi gelmek."],
        ['Blank 8', 'bring', "'bring something' = bir şey getirmek."],
        ['Blank 9', 'catch', "'catch up with someone' = biriyle görüşüp sohbet etmek."],
        ['Blank 10', 'reply', "'reply soon' = yakında yanıtlamak."],
      ],
    },
    {
      title: 'My Last Holiday',
      instructions: 'Complete the text below with the words in the box.',
      passage: `tried | souvenirs | went | relaxing | stayed | unforgettable | visited | return | weather | enjoyed
---
Last summer, I ___ to Greece with my family. We ___ in a small hotel near the beach for ten days.

We ___ many beautiful islands by boat, and the ___ was sunny every day. I really ___ swimming in the clear blue sea.

One day, we ___ some traditional Greek food at a local restaurant — it was delicious! In the evenings, we usually had a ___ walk along the beach.

Before we left, I bought some ___ for my friends. It was such an ___ trip, and I can't wait to ___ to Greece one day!`,
      questions: [
        ['Blank 1', 'went', "'go' fiilinin geçmiş hali (went)."],
        ['Blank 2', 'stayed', "'stay in a hotel' = otelde kalmak (geçmiş zaman)."],
        ['Blank 3', 'visited', "'visit' fiilinin geçmiş hali."],
        ['Blank 4', 'weather', "'the weather' = hava durumu."],
        ['Blank 5', 'enjoyed', "'enjoy + fiil-ing' geçmiş zaman."],
        ['Blank 6', 'tried', "'try' fiilinin geçmiş hali: denedik."],
        ['Blank 7', 'relaxing', "'a relaxing walk' = rahatlatıcı bir yürüyüş."],
        ['Blank 8', 'souvenirs', 'Çoğul isim: hediyelik eşyalar.'],
        ['Blank 9', 'unforgettable', "'unforgettable' = unutulmaz."],
        ['Blank 10', 'return', "'return to a place' = bir yere geri dönmek."],
      ],
    },
    {
      title: "Writing an Essay About Someone's Job",
      instructions: 'Complete the text below with the words in the box.',
      passage: `skills | challenging | patient | works | rewarding | requires | responsible | shifts | career | colleagues
---
My aunt Laura ___ as a nurse at a busy hospital in London. She is ___ for taking care of patients and helping doctors during operations.

She works closely with her ___, and together they make an excellent team. Being a nurse is very ___ because it ___ a lot of energy and concentration. My aunt has to be ___ and calm, even when things get difficult.

She often works night ___, which can be tiring, but she says the job is very ___ because she helps people every single day. She has excellent ___, like communication and quick thinking.

My aunt has always loved her ___ and hopes to become a senior nurse in the future.`,
      questions: [
        ['Blank 1', 'works', "3. tekil şahıs: 'works as'."],
        ['Blank 2', 'responsible', "'responsible for' = -den sorumlu."],
        ['Blank 3', 'colleagues', 'Çoğul isim: iş arkadaşları.'],
        ['Blank 4', 'challenging', "'challenging' = zorlu."],
        ['Blank 5', 'requires', "3. tekil şahıs: 'requires'."],
        ['Blank 6', 'patient', "'be patient' = sabırlı olmak."],
        ['Blank 7', 'shifts', "'night shifts' = gece vardiyaları."],
        ['Blank 8', 'rewarding', "'rewarding' = tatmin edici."],
        ['Blank 9', 'skills', 'Çoğul isim: beceriler.'],
        ['Blank 10', 'career', "'her career' = kariyeri."],
      ],
    },
    {
      title: 'Writing a Postcard',
      instructions: 'Complete the text below with the words in the box.',
      passage: `amazing | beautiful | relaxing | weather | souvenir | wish | delicious | visited | spending | postcard
---
Dear Grandma,

Greetings from Italy! I am ___ a wonderful week here with my family. The ___ is warm and sunny every day.

Yesterday, we ___ an ___ old castle on a hill. The views were absolutely stunning! We also tried some ___ pizza and ice cream — my favourite!

The beach here is ___, and it's very ___ just lying in the sun. I bought you a small ___ from a local market.

I ___ you were here with us! I will send this ___ today.

Love,
Sophie`,
      questions: [
        ['Blank 1', 'spending', "'be spending time' = zaman geçiriyor olmak."],
        ['Blank 2', 'weather', "'the weather' = hava durumu."],
        ['Blank 3', 'visited', 'Geçmiş zaman: ziyaret ettik.'],
        ['Blank 4', 'amazing', "'an amazing castle' = muhteşem bir kale."],
        ['Blank 5', 'delicious', "'delicious pizza' = lezzetli pizza."],
        ['Blank 6', 'beautiful', "'the beach is beautiful' = plaj güzel."],
        ['Blank 7', 'relaxing', "'relaxing' = rahatlatıcı."],
        ['Blank 8', 'souvenir', "'a souvenir' = hediyelik eşya."],
        ['Blank 9', 'wish', "'I wish you were here' = keşke burada olsaydın kalıbı."],
        ['Blank 10', 'postcard', "'send this postcard' = bu kartpostalı göndermek."],
      ],
    },
    {
      title: 'How to Write an Application Letter for a Summer Job',
      instructions: 'Complete the text below with the words in the box.',
      passage: `reliable | references | position | applying | interview | enclosed | hardworking | opportunity | experience | available
---
Dear Mr. Johnson,

I am writing because I am ___ for the summer ___ advertised at your café.

I have some previous ___ working in customer service, and I am ___ from June to September. I consider myself a ___ and ___ person who always arrives on time.

I have ___ my CV with this letter, along with two ___ from my previous employer.

I would be very grateful for the ___ to work with your team, and I hope you will consider me for an ___.

Yours sincerely,
Tom Baker`,
      questions: [
        ['Blank 1', 'applying', "'be applying for' = başvuruyor olmak."],
        ['Blank 2', 'position', "'the position' = pozisyon, iş."],
        ['Blank 3', 'experience', "'previous experience' = önceki deneyim."],
        ['Blank 4', 'available', "'be available' = müsait olmak."],
        ['Blank 5', 'hardworking', "'a hardworking person' = çalışkan bir kişi."],
        ['Blank 6', 'reliable', "'reliable' = güvenilir."],
        ['Blank 7', 'enclosed', "'have enclosed' = iliştirdim (resmi yazışma)."],
        ['Blank 8', 'references', 'Çoğul isim: referanslar.'],
        ['Blank 9', 'opportunity', "'the opportunity to' = fırsat."],
        ['Blank 10', 'interview', "'an interview' = mülakat."],
      ],
    },
    {
      title: 'How to Write an Email to Book a Hotel Room',
      instructions: 'Complete the text below with the words in the box.',
      passage: `arrive | booking | double | deposit | confirm | breakfast | reservation | includes | nights | available
---
Dear Sir or Madam,

I would like to make a ___ for a ___ room from 10th to 14th August, that's four ___.

Could you please tell me if a room is ___ for those dates? We will ___ in the afternoon on the 10th.

Does the price ___ breakfast, and until what time is ___ served?

Please could you ___ my ___ by email, and let me know if a ___ is required.

Thank you very much,
Helen White`,
      questions: [
        ['Blank 1', 'reservation', "'make a reservation' = rezervasyon yapmak."],
        ['Blank 2', 'double', "'a double room' = çift kişilik oda."],
        ['Blank 3', 'nights', 'Çoğul isim: geceler.'],
        ['Blank 4', 'available', "'be available' = müsait olmak."],
        ['Blank 5', 'arrive', "'we will arrive' = geleceğiz."],
        ['Blank 6', 'includes', "3. tekil şahıs: 'includes'."],
        ['Blank 7', 'breakfast', "'breakfast is served' = kahvaltı servis edilir."],
        ['Blank 8', 'confirm', "'confirm my booking' = rezervasyonumu onaylamak."],
        ['Blank 9', 'booking', "'my booking' = rezervasyonum."],
        ['Blank 10', 'deposit', "'a deposit' = depozito."],
      ],
    },
    {
      title: 'How to Write an Opinion Essay',
      instructions: 'Complete the text below with the words in the box.',
      passage: `addition | disadvantages | However | important | argue | conclusion | opinion | Overall | believe | advantages
---
In my ___, social media has both positive and negative effects on young people.

Firstly, there are many ___ to using social media. It helps people stay in touch with friends and family, even when they live far away. In ___, it allows students to find useful information for school quickly.

___, there are also some ___. Many young people spend too much time online instead of studying or exercising. Some experts ___ that this can affect mental health.

I ___ that it is ___ to use social media carefully and not too often.

In ___, ___, I think social media can be useful if we use it responsibly.`,
      questions: [
        ['Blank 1', 'opinion', "'in my opinion' = bence."],
        ['Blank 2', 'advantages', 'Çoğul isim: avantajlar.'],
        ['Blank 3', 'addition', "'in addition' = ayrıca."],
        ['Blank 4', 'However', 'Zıtlık bağlacı: ancak (cümle başı büyük harf).'],
        ['Blank 5', 'disadvantages', 'Çoğul isim: dezavantajlar.'],
        ['Blank 6', 'argue', "3. çoğul şahıs: 'argue'."],
        ['Blank 7', 'believe', "'I believe that' = inanıyorum ki."],
        ['Blank 8', 'important', "'it is important to' = önemlidir."],
        ['Blank 9', 'conclusion', "'in conclusion' = sonuç olarak."],
        ['Blank 10', 'Overall', "'overall' = genel olarak (cümle başı büyük harf)."],
      ],
    },
    {
      title: 'A Thank-You Email',
      instructions: 'Complete the text below with the words in the box.',
      passage: `kindness | thoroughly | grateful | wonderful | gift | generous | appreciate | again | hospitality | thoughtful
---
Dear Aunt Susan,

I just wanted to write and say how ___ I am for the lovely birthday ___ you sent me. It was so ___ of you to remember!

I really ___ your ___, especially because I know how busy you are. You are always so ___ to everyone in the family.

I ___ enjoyed my visit last month too. Thank you so much for your ___ during my stay — it was a ___ few days.

Thank you ___ for everything!

Love,
Ella`,
      questions: [
        ['Blank 1', 'grateful', "'grateful for' = minnettar."],
        ['Blank 2', 'gift', "'birthday gift' = doğum günü hediyesi."],
        ['Blank 3', 'thoughtful', "'thoughtful' = düşünceli."],
        ['Blank 4', 'appreciate', "'appreciate something' = takdir etmek, değer vermek."],
        ['Blank 5', 'kindness', "'your kindness' = nezaketiniz."],
        ['Blank 6', 'generous', "'generous' = cömert."],
        ['Blank 7', 'thoroughly', "'thoroughly enjoyed' = son derece."],
        ['Blank 8', 'hospitality', "'your hospitality' = misafirperverliğiniz."],
        ['Blank 9', 'wonderful', "'a wonderful few days' = harika birkaç gün."],
        ['Blank 10', 'again', "'thank you again' = tekrar teşekkürler."],
      ],
    },
    {
      title: 'A Biography of Someone You Know',
      instructions: 'Complete the text below with the words in the box.',
      passage: `achievements | grew | dedicated | born | married | retired | moved | admire | inspired | graduated
---
My grandfather was ___ in a small village in 1948. He ___ up on a farm with his six brothers and sisters.

When he was twenty, he ___ to the city to study engineering, and he ___ from university four years later. He ___ my grandmother in 1975, and they have been together ever since.

Throughout his career, my grandfather had many ___, including designing bridges in three different countries. He was always a ___ and hardworking man.

He ___ at the age of sixty-five, but he still stays busy with his garden.

My grandfather has always ___ me with his determination, and I really ___ him.`,
      questions: [
        ['Blank 1', 'born', "'was born' = doğdu (edilgen)."],
        ['Blank 2', 'grew', "'grow up' fiilinin geçmiş hali."],
        ['Blank 3', 'moved', "'move to a place' geçmiş zaman."],
        ['Blank 4', 'graduated', "'graduate from university' = üniversiteden mezun olmak."],
        ['Blank 5', 'married', "'marry someone' geçmiş zaman."],
        ['Blank 6', 'achievements', 'Çoğul isim: başarılar.'],
        ['Blank 7', 'dedicated', "'dedicated' = özverili."],
        ['Blank 8', 'retired', "'retire' fiilinin geçmiş hali: emekli oldu."],
        ['Blank 9', 'inspired', "'inspire someone' geçmiş zaman."],
        ['Blank 10', 'admire', "'I admire him' = ona hayranım."],
      ],
    },
    {
      title: 'My Favourite Photograph',
      instructions: 'Complete the text below with the words in the box.',
      passage: `memories | precious | expression | captures | remind | framed | moment | laughing | cherish | taken
---
My favourite photograph ___ a special ___ from my childhood. It shows me and my grandfather ___ together in the garden.

Every time I look at this photo, it brings back happy ___ of the summers we spent together. I love his ___ in the picture — he looks so relaxed and happy.

This photo is very ___ to me because my grandfather passed away two years ago. It ___ me of all the wonderful times we shared.

The photo was ___ by my mother, and I have ___ it and put it on my wall.

I will always ___ this photograph.`,
      questions: [
        ['Blank 1', 'captures', "3. tekil şahıs: 'captures'."],
        ['Blank 2', 'moment', "'a special moment' = özel bir an."],
        ['Blank 3', 'laughing', "'be laughing' = gülüyor olmak."],
        ['Blank 4', 'memories', 'Çoğul isim: anılar.'],
        ['Blank 5', 'expression', "'his expression' = ifadesi."],
        ['Blank 6', 'precious', "'precious' = değerli."],
        ['Blank 7', 'remind', "'remind someone of' = birine hatırlatmak."],
        ['Blank 8', 'taken', "'was taken by' = tarafından çekildi (edilgen)."],
        ['Blank 9', 'framed', "'have framed it' = çerçeveletmek."],
        ['Blank 10', 'cherish', "'cherish something' = kıymetini bilmek, değer vermek."],
      ],
    },
  ],
  B1: [
    {
      title: 'Writing an Opinion Essay',
      instructions: 'Complete the text below with the words in the box.',
      passage: `essential | drawback | isolated | commute | flexibility | overall | balance | productivity | convinced | disagree
---
In recent years, more and more people have started working from home, and I am ___ that this trend has many benefits.

Firstly, working from home gives employees much more ___ over their schedule. They can organise their day around personal responsibilities, which often improves their work-life ___.

Secondly, without a daily ___ to the office, workers save valuable time and money. Many studies also show that ___ actually increases when people work in a comfortable environment.

However, there is one significant ___: some employees feel ___ from their colleagues, which can affect teamwork and motivation.

Some people ___ with this idea and prefer working in an office. Even so, I believe that ___, remote work offers more advantages than disadvantages, as long as workers make an ___ effort to stay connected with their team.`,
      questions: [
        ['Blank 1', 'convinced', "'be convinced that' = ikna olmuş olmak."],
        ['Blank 2', 'flexibility', "'flexibility' = esneklik."],
        ['Blank 3', 'balance', "'work-life balance' = iş-yaşam dengesi."],
        ['Blank 4', 'commute', "'daily commute' = günlük işe gidiş geliş."],
        ['Blank 5', 'productivity', "'productivity' = verimlilik."],
        ['Blank 6', 'drawback', "'a significant drawback' = önemli bir dezavantaj."],
        ['Blank 7', 'isolated', "'feel isolated' = yalnız/izole hissetmek."],
        ['Blank 8', 'disagree', "'disagree with' = katılmamak."],
        ['Blank 9', 'overall', "'overall' = genel olarak."],
        ['Blank 10', 'essential', "'an essential effort' = temel/gerekli çaba."],
      ],
    },
    {
      title: 'How to Write an Email to a Friend Giving News',
      instructions: 'Complete the text below with the words in the box.',
      passage: `moving | thrilled | update | recently | apartment | Guess | catch | promoted | exciting | Meanwhile
---
Hi Jack,

___ what? I have some really ___ news to share with you!

I ___ got ___ at work, so I am now the manager of my department. I'm absolutely ___ about the new opportunity!

___, I've also found a new ___ in the city centre, and I'm ___ in next month. It's much bigger than my old flat.

I'd love to ___ up soon and hear your ___ too.

Talk soon,
Ben`,
      questions: [
        ['Blank 1', 'Guess', "'guess what' = tahmin et (cümle başı büyük harf)."],
        ['Blank 2', 'exciting', "'exciting news' = heyecan verici haber."],
        ['Blank 3', 'recently', "'recently' = yakın zamanda."],
        ['Blank 4', 'promoted', "'get promoted' = terfi almak."],
        ['Blank 5', 'thrilled', "'be thrilled about' = çok heyecanlı olmak."],
        ['Blank 6', 'Meanwhile', "'meanwhile' = bu arada (cümle başı büyük harf)."],
        ['Blank 7', 'apartment', "'a new apartment' = yeni bir daire."],
        ['Blank 8', 'moving', "'be moving in' = taşınıyor olmak."],
        ['Blank 9', 'catch', "'catch up' = görüşüp sohbet etmek."],
        ['Blank 10', 'update', "'your update' = haberlerin, güncel durumun."],
      ],
    },
    {
      title: 'How to Write a Past Story from a Given Sentence',
      instructions: 'Complete the text below with the words in the box.',
      passage: `shelter | drenched | Eventually | forgotten | relieved | umbrella | hurried | suddenly | arriving | realised
---
It was raining heavily when Sarah left the house. She had ___ walked only a few metres when she ___ that she had ___ her ___ at home.

Within minutes, she was completely ___. She ___ towards a bus stop to find ___ from the storm.

___, after waiting for almost twenty minutes, the rain stopped, and the sun came out. Sarah felt ___ and continued her walk to work, finally ___ only ten minutes late.`,
      questions: [
        ['Blank 1', 'suddenly', "'had suddenly walked' = zarf, aniden."],
        ['Blank 2', 'realised', 'Geçmiş zaman: fark etti.'],
        ['Blank 3', 'forgotten', "'had forgotten' = past perfect, unutmuştu."],
        ['Blank 4', 'umbrella', "'her umbrella' = şemsiyesi."],
        ['Blank 5', 'drenched', "'completely drenched' = sırılsıklam."],
        ['Blank 6', 'hurried', 'Geçmiş zaman: aceleyle gitti.'],
        ['Blank 7', 'shelter', "'find shelter' = sığınak bulmak."],
        ['Blank 8', 'Eventually', "'eventually' = sonunda (cümle başı büyük harf)."],
        ['Blank 9', 'relieved', "'feel relieved' = rahatlamak."],
        ['Blank 10', 'arriving', "'finally arriving' = -ing yapısı, sonunda varış."],
      ],
    },
    {
      title: 'How to Write a Hotel Review After a Stay',
      instructions: 'Complete the text below with the words in the box.',
      passage: `spotless | friendly | value | located | comfortable | disappointed | recommend | Overall | spacious | stayed
---
I recently ___ at the Grandview Hotel for three nights, and overall I had a great experience.

The room was ___ and very ___ — I didn't find a single speck of dust! The bed was extremely ___, and I slept very well.

The staff were incredibly ___ and helpful throughout my stay. The hotel is also perfectly ___, just a short walk from the city centre.

The only thing that ___ me slightly was the slow Wi-Fi connection. However, this was a minor issue.

___, I would definitely ___ this hotel to other travellers. It offers excellent ___ for money.`,
      questions: [
        ['Blank 1', 'stayed', "'stayed at a hotel' = otelde kaldı."],
        ['Blank 2', 'spacious', "'spacious' = ferah."],
        ['Blank 3', 'spotless', "'spotless' = tertemiz."],
        ['Blank 4', 'comfortable', "'comfortable' = rahat."],
        ['Blank 5', 'friendly', "'friendly staff' = güler yüzlü personel."],
        ['Blank 6', 'located', "'perfectly located' = mükemmel konumlanmış."],
        ['Blank 7', 'disappointed', "'disappointed me' = beni hayal kırıklığına uğrattı."],
        ['Blank 8', 'Overall', "'overall' = genel olarak (cümle başı büyük harf)."],
        ['Blank 9', 'recommend', "'recommend something' = tavsiye etmek."],
        ['Blank 10', 'value', "'value for money' = paranın karşılığı."],
      ],
    },
    {
      title: 'How to Write an Article',
      instructions: 'Complete the text below with the words in the box.',
      passage: `structure | quote | tone | headline | statistics | paragraph | audience | conclude | engaging | research
---
Writing a good magazine article requires careful planning. First, choose a catchy ___ that will grab the reader's attention immediately.

Before you start writing, think about your target ___ and what kind of information they want to read. Do some ___ to make sure your facts are accurate, and include interesting ___ to support your points.

An ___ opening paragraph is essential — try starting with a surprising fact or a relevant ___ from an expert.

Organise your article with a clear ___: an introduction, several body paragraphs, and a conclusion. Each ___ should focus on one main idea.

Keep a consistent ___ throughout the article that matches your audience, and always ___ with a strong final thought.`,
      questions: [
        ['Blank 1', 'headline', "'a catchy headline' = dikkat çekici başlık."],
        ['Blank 2', 'audience', "'target audience' = hedef kitle."],
        ['Blank 3', 'research', "'do research' = araştırma yapmak."],
        ['Blank 4', 'statistics', 'Çoğul isim: istatistikler.'],
        ['Blank 5', 'engaging', "'an engaging paragraph' = ilgi çekici paragraf."],
        ['Blank 6', 'quote', "'a relevant quote' = ilgili bir alıntı."],
        ['Blank 7', 'structure', "'a clear structure' = net bir yapı."],
        ['Blank 8', 'paragraph', "'each paragraph' = her paragraf."],
        ['Blank 9', 'tone', "'a consistent tone' = tutarlı bir üslup."],
        ['Blank 10', 'conclude', "'conclude with' = ... ile sonlandırmak."],
      ],
    },
    {
      title: 'Email Making Plans for a Visit',
      instructions: 'Complete the text below with the words in the box.',
      passage: `accommodation | flexible | confirm | itinerary | arrange | look | convenient | suggest | planning | sightseeing
---
Hi Laura,

I hope you're well! I'm ___ to visit you next month, and I wanted to discuss some details.

Would it be ___ for you if I arrived on the 15th? I'm quite ___ with dates, so let me know what works best for you.

I'd love to do some ___ while I'm there — maybe we could visit the old town and the museum? I'll leave the ___ mostly up to you, since you know the city better than me.

Could you also ___ whether I should book my own ___, or if I could stay with you? I don't want to be any trouble.

Please ___ anything else you think I should see, and I'll ___ my train tickets straight away.

I really ___ forward to seeing you soon!

Best,
Tom`,
      questions: [
        ['Blank 1', 'planning', "'be planning to' = planlıyor olmak."],
        ['Blank 2', 'convenient', "'convenient' = uygun, elverişli."],
        ['Blank 3', 'flexible', "'flexible with dates' = tarihler konusunda esnek."],
        ['Blank 4', 'sightseeing', "'do some sightseeing' = gezip görme."],
        ['Blank 5', 'itinerary', "'the itinerary' = seyahat planı."],
        ['Blank 6', 'confirm', "'confirm whether' = teyit etmek."],
        ['Blank 7', 'accommodation', "'book accommodation' = konaklama ayırtmak."],
        ['Blank 8', 'suggest', "'suggest something' = önermek."],
        ['Blank 9', 'arrange', "'arrange train tickets' = tren biletlerini ayarlamak."],
        ['Blank 10', 'look', "'look forward to' = dört gözle beklemek."],
      ],
    },
    {
      title: 'How to Write an Email Cover Letter',
      instructions: 'Complete the text below with the words in the box.',
      passage: `availability | attached | qualifications | position | sincerely | consider | suited | contribute | regarding | enthusiastic
---
Dear Ms. Adams,

I am writing ___ the marketing assistant ___ advertised on your website.

I believe my ___ make me well ___ for this role. I have two years of experience in digital marketing and I am ___ about the opportunity to work for your company.

I have ___ my CV for your review, which provides further details about my background.

I am confident that I could ___ valuable skills to your team. Regarding my ___, I am able to start immediately.

I would be grateful if you could ___ my application, and I look forward to hearing from you.

Yours ___,
Daniel Cooper`,
      questions: [
        ['Blank 1', 'regarding', "'writing regarding' = ... hakkında yazıyorum."],
        ['Blank 2', 'position', "'the position' = pozisyon."],
        ['Blank 3', 'qualifications', 'Çoğul isim: nitelikler.'],
        ['Blank 4', 'suited', "'well suited for' = için uygun."],
        ['Blank 5', 'enthusiastic', "'enthusiastic about' = hevesli."],
        ['Blank 6', 'attached', "'have attached' = ekledim (resmi yazışma)."],
        ['Blank 7', 'contribute', "'contribute skills' = katkıda bulunmak."],
        ['Blank 8', 'availability', "'my availability' = müsaitlik durumum."],
        ['Blank 9', 'consider', "'consider my application' = başvurumu değerlendirmek."],
        ['Blank 10', 'sincerely', "'Yours sincerely' = resmi mektup kapanışı."],
      ],
    },
    {
      title: 'A Product Review',
      instructions: 'Complete the text below with the words in the box.',
      passage: `lightweight | worth | quality | drawback | purchased | recommend | battery | impressed | Overall | durable
---
I ___ this wireless speaker last month, and I have to say I am really ___ with the ___.

The sound is excellent, and the speaker itself is very ___ and ___ — I've dropped it twice and it still works perfectly!

The only ___ is the ___ life, which only lasts about six hours on a full charge. This can be a little inconvenient for long trips.

___, though, I think this is a great product, and I would definitely ___ it to anyone looking for a reliable speaker. It's ___ the price.

Rating: 4.5 out of 5 stars`,
      questions: [
        ['Blank 1', 'purchased', "'purchased' = satın aldım (formal, geçmiş zaman)."],
        ['Blank 2', 'impressed', "'be impressed with' = etkilenmiş olmak."],
        ['Blank 3', 'quality', "'the quality' = kalite."],
        ['Blank 4', 'durable', "'durable' = dayanıklı."],
        ['Blank 5', 'lightweight', "'lightweight' = hafif."],
        ['Blank 6', 'drawback', "'the only drawback' = tek dezavantaj."],
        ['Blank 7', 'battery', "'battery life' = pil ömrü."],
        ['Blank 8', 'Overall', "'overall' = genel olarak (cümle başı büyük harf)."],
        ['Blank 9', 'recommend', "'recommend it' = tavsiye etmek."],
        ['Blank 10', 'worth', "'worth the price' = fiyatına değer."],
      ],
    },
    {
      title: 'Describing Your Home',
      instructions: 'Complete the text below with the words in the box.',
      passage: `cosy | decorated | surrounded | spacious | furniture | modern | natural | favourite | located | peaceful
---
My home is ___ in a quiet suburb, just outside the city centre. It's a ___ two-storey house with plenty of room for my whole family.

The living room is bright and full of ___ light, thanks to the large windows. I have ___ it with warm colours and comfortable ___.

My ___ room in the house is definitely the kitchen, where we spend most of our time cooking and talking together. It has a ___, ___ design, with all new appliances.

The garden is small but very ___, ___ by tall trees that give us plenty of privacy.

I love coming home every day because it always feels calm and welcoming.`,
      questions: [
        ['Blank 1', 'located', "'be located in' = konumlanmış olmak."],
        ['Blank 2', 'spacious', "'spacious' = ferah."],
        ['Blank 3', 'natural', "'natural light' = doğal ışık."],
        ['Blank 4', 'decorated', "'have decorated' = dekore ettim."],
        ['Blank 5', 'furniture', 'Toplu isim: mobilya.'],
        ['Blank 6', 'favourite', "'my favourite room' = en sevdiğim oda."],
        ['Blank 7', 'modern', "'modern' = modern."],
        ['Blank 8', 'cosy', "'cosy' = sıcak/rahat (ev ortamı için)."],
        ['Blank 9', 'peaceful', "'peaceful' = huzurlu."],
        ['Blank 10', 'surrounded', "'surrounded by' = ile çevrili."],
      ],
    },
  ],
  B2: [
    {
      title: 'Formal Email or Letter Asking for Information',
      instructions: 'Complete the text below with the words in the box.',
      passage: `prospectus | clarify | forth | obliged | stipulated | correspondence | particulars | regard | prompt | enquiring
---
Dear Sir or Madam,

I am writing with ___ to the postgraduate course advertised on your website. I would be grateful if you could provide further ___ about the programme.

I am ___ whether the course fees stated include accommodation, or whether this is arranged separately, as it is not clearly set ___ on your website.

Could you also send me a copy of the course ___, along with information regarding the entry requirements ___ for international applicants?

I would appreciate it if you could ___ whether scholarships are currently available for this course.

I look forward to your ___ reply, and I would be much ___ if you could respond within the next two weeks.

Thank you for your time, and I look forward to your ___.

Yours faithfully,
Robert Chen`,
      questions: [
        ['Blank 1', 'regard', "'with regard to' = ... ile ilgili olarak (resmi ifade)."],
        ['Blank 2', 'particulars', "'further particulars' = ayrıntılar (resmi)."],
        ['Blank 3', 'enquiring', "'be enquiring whether' = sorup öğrenmek istemek."],
        ['Blank 4', 'forth', "'set forth' = ortaya koymak, belirtmek."],
        ['Blank 5', 'prospectus', "'course prospectus' = kurs tanıtım kitapçığı."],
        ['Blank 6', 'stipulated', "'stipulated for' = belirtilen, şart koşulan."],
        ['Blank 7', 'clarify', "'clarify whether' = netleştirmek."],
        ['Blank 8', 'prompt', "'a prompt reply' = hızlı bir yanıt."],
        ['Blank 9', 'obliged', "'much obliged' = minnettar (resmi ifade)."],
        ['Blank 10', 'correspondence', "'your correspondence' = yazışmanız."],
      ],
    },
    {
      title: 'Writing Formal Letter of Complaint',
      instructions: 'Complete the text below with the words in the box.',
      passage: `rectify | defective | regret | inconvenience | promptly | compensation | dissatisfied | refund | unacceptable | purchased
---
Dear Customer Service Team,

I am writing to express my extreme dissatisfaction regarding a product I recently ___ from your online store.

The item I received was clearly ___, as it stopped working after only two days of use. I am thoroughly ___ with the quality of this product.

I ___ to inform you that this is not the level of service I expected from your company. This situation is entirely ___, especially considering the price I paid.

I would like to request a full ___, and I trust you will ___ this matter as soon as possible.

Furthermore, given the significant ___ this has caused me, I believe some form of ___ would be appropriate.

I hope you will address this issue ___ and take steps to prevent similar problems in the future.

Yours faithfully,
Diane Foster`,
      questions: [
        ['Blank 1', 'purchased', "'purchased from' = satın aldım (resmi geçmiş zaman)."],
        ['Blank 2', 'defective', "'clearly defective' = açıkça kusurlu."],
        ['Blank 3', 'dissatisfied', "'thoroughly dissatisfied' = son derece memnuniyetsiz."],
        ['Blank 4', 'regret', "'I regret to inform you' = resmi şikayet kalıbı."],
        ['Blank 5', 'unacceptable', "'entirely unacceptable' = tamamen kabul edilemez."],
        ['Blank 6', 'refund', "'a full refund' = tam iade."],
        ['Blank 7', 'rectify', "'rectify this matter' = bu durumu düzeltmek."],
        ['Blank 8', 'inconvenience', "'the significant inconvenience' = önemli rahatsızlık."],
        ['Blank 9', 'compensation', "'some form of compensation' = bir tür tazminat."],
        ['Blank 10', 'promptly', "'address this issue promptly' = bu konuyu hızlıca ele almak."],
      ],
    },
    {
      title: 'Writing a Discussion Essay: Discuss Two Views and Give Your Opinion',
      instructions: 'Complete the text below with the words in the box.',
      passage: `merit | counterargument | perspective | contend | reconcile | viewpoint | undermine | Personally | whereas | standpoint
---
There has long been debate about whether zoos should continue to exist. Some ___ that zoos play a vital role in conservation and education, ___ others believe they cause unnecessary suffering to animals.

From one ___, zoos allow endangered species to be protected and bred in safe environments, and they give the public valuable opportunities to learn about wildlife. This ___ certainly has some ___, particularly regarding conservation efforts for critically endangered animals.

However, a common ___ is that many zoo enclosures fail to replicate an animal's natural habitat, which can severely ___ their wellbeing.

From the opposing ___, animal rights supporters argue that no amount of educational value justifies keeping wild animals in captivity.

It is difficult to fully ___ these two positions, as both raise legitimate ethical concerns.

___, I believe that modern zoos focused on conservation can be justified, provided that animal welfare remains the top priority.`,
      questions: [
        ['Blank 1', 'contend', "'some contend that' = bazıları iddia eder ki (resmi)."],
        ['Blank 2', 'whereas', 'Zıtlık bağlacı: oysa, halbuki.'],
        ['Blank 3', 'standpoint', "'from one standpoint' = bir bakış açısından."],
        ['Blank 4', 'viewpoint', "'this viewpoint' = bu görüş."],
        ['Blank 5', 'merit', "'has some merit' = bir miktar geçerliliği/değeri var."],
        ['Blank 6', 'counterargument', "'a common counterargument' = yaygın bir karşı argüman."],
        ['Blank 7', 'undermine', "'undermine their wellbeing' = refahlarını zedelemek."],
        ['Blank 8', 'perspective', "'the opposing perspective' = karşıt bakış açısı."],
        ['Blank 9', 'reconcile', "'reconcile these positions' = bu görüşleri uzlaştırmak."],
        ['Blank 10', 'Personally', "'personally, I believe' = şahsen (cümle başı büyük harf)."],
      ],
    },
    {
      title: 'Opinion Essay – Agree or Disagree with a Statement',
      instructions: 'Complete the text below with the words in the box.',
      passage: `meaningful | Paradoxically | redefine | virtual | facilitate | Arguably | assertion | largely | isolate | disagree
---
The ___ that technology has made people less social is one I ___ with, at least in its simplest form.

While it is true that people now spend more time looking at screens, technology has ___ not eliminated, but rather ___ the way people connect with one another.

Social media and messaging apps ___ ___ relationships across great distances, something that would have been impossible a few decades ago.

___, some critics argue that constant screen use can actually ___ people from those physically around them, replacing real conversations with shallow ___ interactions.

___, I would argue that technology itself is neutral; its effect on our social lives depends entirely on how we choose to use it.`,
      questions: [
        ['Blank 1', 'assertion', "'the assertion that' = iddia (resmi isim)."],
        ['Blank 2', 'disagree', "'disagree with' = katılmamak."],
        ['Blank 3', 'largely', "'largely not eliminated' = büyük ölçüde."],
        ['Blank 4', 'redefine', "'redefine the way' = yeniden tanımlamak."],
        ['Blank 5', 'facilitate', "'facilitate relationships' = ilişkileri kolaylaştırmak."],
        ['Blank 6', 'meaningful', "'meaningful relationships' = anlamlı ilişkiler."],
        ['Blank 7', 'Paradoxically', "'paradoxically' = paradoksal olarak (cümle başı büyük harf)."],
        ['Blank 8', 'isolate', "'isolate people' = insanları izole etmek."],
        ['Blank 9', 'virtual', "'virtual interactions' = sanal etkileşimler."],
        ['Blank 10', 'Arguably', "'arguably' = tartışmasız biçimde/muhtemelen (cümle başı büyük harf)."],
      ],
    },
    {
      title: 'A Formal Letter of Apology',
      instructions: 'Complete the text below with the words in the box.',
      passage: `shortcomings | utmost | assure | jeopardise | rectified | goodwill | oversight | reassure | Regrettably | inconvenienced
---
Dear Mr. Whitfield,

I am writing to offer my sincere apologies regarding the delay in delivering your order.

___, due to an administrative ___, your shipment was not processed on time. I fully understand that this may have significantly ___ you, and for that, I am truly sorry.

Please ___ you that we take this matter extremely seriously, and the issue has now been ___. Steps have also been taken to ensure such ___ do not occur again in the future.

We place the ___ importance on customer satisfaction, and we certainly do not wish this incident to ___ our valued relationship with you.

As a gesture of ___, we would like to offer you a discount on your next order.

I hope this reassures you of our commitment to service, and I would like to ___ you that we remain fully dedicated to resolving this matter.

Yours sincerely,
Customer Relations Team`,
      questions: [
        ['Blank 1', 'Regrettably', "'regrettably' = maalesef, ne yazık ki (cümle başı büyük harf)."],
        ['Blank 2', 'oversight', "'an administrative oversight' = idari bir ihmal/hata."],
        ['Blank 3', 'inconvenienced', "'significantly inconvenienced' = ciddi şekilde rahatsız etmiş olmak."],
        ['Blank 4', 'assure', "'assure you that' = sizi temin ederim ki."],
        ['Blank 5', 'rectified', "'has been rectified' = düzeltildi (edilgen)."],
        ['Blank 6', 'shortcomings', "'such shortcomings' = bu tür eksiklikler/hatalar."],
        ['Blank 7', 'utmost', "'the utmost importance' = en büyük önem."],
        ['Blank 8', 'jeopardise', "'jeopardise our relationship' = ilişkimizi tehlikeye atmak."],
        ['Blank 9', 'goodwill', "'a gesture of goodwill' = iyi niyet göstergesi."],
        ['Blank 10', 'reassure', "'reassure you that' = sizi rahatlatmak/güvence vermek."],
      ],
    },
    {
      title: 'A Report',
      instructions: 'Complete the text below with the words in the box.',
      passage: `findings | highlighted | conducted | recommend | respondents | Overall | conclude | purpose | majority | survey
---
Introduction
The ___ of this report is to present the results of a recent employee satisfaction ___ ___ within the company.

Findings
The ___ of ___ indicated that they were generally satisfied with their working conditions. However, several employees ___ concerns regarding the lack of career development opportunities.

Conclusion
___, employee morale appears to be relatively high, although certain areas require attention.

Recommendations
Based on these ___, I would ___ that the company introduce more regular training sessions.

To ___, addressing these concerns could significantly improve staff retention in the long term.`,
      questions: [
        ['Blank 1', 'purpose', "'the purpose of' = amacı."],
        ['Blank 2', 'survey', "'a satisfaction survey' = memnuniyet anketi."],
        ['Blank 3', 'conducted', "'was conducted' = gerçekleştirildi (edilgen, rapor dili)."],
        ['Blank 4', 'majority', "'the majority of' = çoğunluğu."],
        ['Blank 5', 'respondents', "'respondents' = ankete katılanlar."],
        ['Blank 6', 'highlighted', "'highlighted concerns' = endişeleri vurguladı."],
        ['Blank 7', 'Overall', "'overall' = genel olarak (rapor başlığında, büyük harf)."],
        ['Blank 8', 'findings', "'these findings' = bu bulgular."],
        ['Blank 9', 'recommend', "'I would recommend that' = tavsiye ederim ki."],
        ['Blank 10', 'conclude', "'to conclude' = sonuç olarak."],
      ],
    },
    {
      title: 'A Film Review',
      instructions: 'Complete the text below with the words in the box.',
      passage: `portrayal | pacing | evokes | soundtrack | masterfully | verdict | cinematography | standout | predictable | gripping
---
'Beyond the Horizon' is a truly ___ thriller that keeps audiences on the edge of their seats from beginning to end.

The ___ is breathtaking, with sweeping shots of the desert landscape that perfectly ___ a sense of isolation. Director Elena Marsh has ___ crafted a tense atmosphere throughout the film.

Lead actor James Carter delivers a ___ performance, bringing real emotional depth to his troubled character. His ___ of a grieving father is both convincing and moving.

The film's ___ also deserves praise, with a haunting score that perfectly complements each scene.

My only criticism concerns the film's ___ in the final act, which occasionally feels rushed. The ending is also somewhat ___, which is a shame given how original the rest of the story feels.

Final ___: despite a few minor flaws, this is an outstanding film well worth watching.`,
      questions: [
        ['Blank 1', 'gripping', "'a truly gripping thriller' = gerçekten sürükleyici bir gerilim filmi."],
        ['Blank 2', 'cinematography', "'the cinematography' = görüntü yönetimi."],
        ['Blank 3', 'evokes', '3. tekil şahıs: uyandırır.'],
        ['Blank 4', 'masterfully', "'masterfully crafted' = ustalıkla oluşturulmuş."],
        ['Blank 5', 'standout', "'a standout performance' = göz alıcı bir performans."],
        ['Blank 6', 'portrayal', "'his portrayal of' = ...canlandırışı."],
        ['Blank 7', 'soundtrack', "'the film's soundtrack' = filmin müzikleri."],
        ['Blank 8', 'pacing', "'the pacing' = anlatım temposu."],
        ['Blank 9', 'predictable', "'somewhat predictable' = bir nebze tahmin edilebilir."],
        ['Blank 10', 'verdict', "'final verdict' = nihai değerlendirme/karar."],
      ],
    },
    {
      title: 'Writing an Article for the First Exam',
      instructions: 'Complete the text below with the words in the box.',
      passage: `subheading | anecdote | wrap | hook | informal | catchy | headline | rhetorical | engage | readership
---
Writing an article for an exam like this requires a slightly different approach from an essay. Start with a ___ ___ that will immediately grab your ___'s attention.

Begin your article with a strong ___ — perhaps a surprising fact, a short personal ___, or an interesting question — to ___ your readers from the very first line.

You can use ___ questions throughout the article to keep readers thinking and involved. Using headings or a ___ can also help organise longer articles into clear sections.

Since articles are usually less formal than essays, feel free to use a more ___ and conversational tone, as if you're speaking directly to the reader.

Finally, ___ up your article with a memorable final thought or a call to action that leaves a lasting impression.`,
      questions: [
        ['Blank 1', 'catchy', "'a catchy headline' = dikkat çekici bir başlık."],
        ['Blank 2', 'headline', "'headline' = başlık."],
        ['Blank 3', 'readership', "'your readership' = okuyucu kitlen."],
        ['Blank 4', 'hook', "'a strong hook' = güçlü bir giriş cümlesi (dikkat çekici)."],
        ['Blank 5', 'anecdote', "'a personal anecdote' = kişisel bir anekdot."],
        ['Blank 6', 'engage', "'engage your readers' = okuyucularını ilgilendirmek."],
        ['Blank 7', 'rhetorical', "'rhetorical questions' = retorik sorular."],
        ['Blank 8', 'subheading', "'a subheading' = alt başlık."],
        ['Blank 9', 'informal', "'a more informal tone' = daha samimi bir üslup."],
        ['Blank 10', 'wrap', "'wrap up' = toparlamak."],
      ],
    },
    {
      title: 'Writing an Email Cover Letter',
      instructions: 'Complete the text below with the words in the box.',
      passage: `proficient | forefront | aligns | portfolio | proactive | esteemed | endorse | articulate | spearheaded | exceeding
---
Dear Hiring Committee,

I am writing to express my strong interest in the Senior Marketing Manager position at your ___ organisation.

In my current role, I have ___ several successful campaigns that increased brand engagement by over forty percent, consistently ___ targets set by senior management.

I am highly ___ in data analysis tools and have built a strong ___ of projects demonstrating measurable results.

I believe my experience closely ___ with the requirements outlined in your job posting, and I am confident I could keep your brand at the ___ of industry trends.

I have always been a ___ professional, actively seeking new challenges rather than waiting for opportunities to arise.

I would be delighted to ___ further how my skills could benefit your team, and I am happy to provide references who can ___ my work ethic and achievements.

Kind regards,
Sofia Reyes`,
      questions: [
        ['Blank 1', 'esteemed', "'your esteemed organisation' = saygın kuruluşunuz (resmi)."],
        ['Blank 2', 'spearheaded', "'have spearheaded' = öncülük ettim/yönettim."],
        ['Blank 3', 'exceeding', "'exceeding targets' = hedefleri aşmak."],
        ['Blank 4', 'proficient', "'highly proficient in' = son derece yetkin."],
        ['Blank 5', 'portfolio', "'a portfolio of projects' = proje portföyü."],
        ['Blank 6', 'aligns', "'aligns with' = ile örtüşür/uyumludur."],
        ['Blank 7', 'forefront', "'at the forefront of' = ön saflarında."],
        ['Blank 8', 'proactive', "'a proactive professional' = proaktif bir profesyonel."],
        ['Blank 9', 'articulate', "'articulate further' = daha ayrıntılı açıklamak."],
        ['Blank 10', 'endorse', "'endorse my work ethic' = çalışma etiğimi onaylamak/desteklemek."],
      ],
    },
  ],
};

module.exports = { WRITING_DATA };
