// Seviye Testi (placement) Listening bölümü: 2 kayıt x 5 soru (3 şıklı), kolaydan zora.
// - Kayıt 1 (A1–A2): iki arkadaş telefonda buluşma ayarlıyor — net bilgiler (saat, yer, kişi).
// - Kayıt 2 (B1–B2): radyo röportajı — ana fikir, çıkarım, konuşmacının tutumu.
//
// Kayıtlar seviye sınavlarıyla aynı şekilde üretilir (speakers + script, Piper sesleri):
//   npm run generate:listening   (Cloudinary public ID: placement/listening/<slug>)
// Metni değiştirirsen: npm run generate:listening -- --force <slug>
// Seviye sınavlarındaki kayıtlardan bilerek farklıdır (sınav cevapları önceden duyulmasın).
//
// Sorular [soru, [DOĞRU CEVAP, çeldirici, çeldirici]] şeklinde yazılır; seed'de şıklar sabit bir sırayla
// karıştırılır (doğru cevap hep ilk şıkta kalmaz).

const PLACEMENT_LISTENING = [
  {
    slug: 'placement-cinema-plans',
    title: 'Plans for Saturday',
    level: 'A2', // ses hızı (generateListeningAudio STYLE)
    speakers: { T: { name: 'Tom', voice: 'alan' }, L: { name: 'Lucy', voice: 'jenny' } },
    script: [
      ['T', 'Hi Lucy, it’s Tom. Are you free on Saturday?'],
      ['L', 'Hi Tom! Yes, I am. Why?'],
      ['T', 'There’s a new film at the cinema. Do you want to come with me and my sister, Anna?'],
      ['L', 'I’d love to. What time does it start?'],
      ['T', 'At half past seven. Let’s meet outside the cinema at seven o’clock.'],
      ['L', 'OK. Can we go by bus? My bike is broken.'],
      ['T', 'Sure. The number twelve bus stops right in front of the cinema.'],
      ['L', 'Great. Should I bring anything?'],
      ['T', 'Just bring some money for popcorn. I’ll buy the tickets online tonight.'],
      ['L', 'Perfect. Oh wait — I have a piano lesson until six thirty. But that’s fine, I can still be there at seven.'],
      ['T', 'Good. See you on Saturday!'],
    ],
    questions: [
      ['Who is going to the cinema with Tom?', ['Lucy and his sister', 'Lucy and his brother', 'Only Lucy']],
      ['What time does the film start?', ['At 7:30', 'At 7:00', 'At 6:30']],
      ['How will Lucy get to the cinema?', ['By bus', 'By bike', 'On foot']],
      ['What should Lucy bring?', ['Money for popcorn', 'The tickets', 'Her piano book']],
      [
        'Why does Lucy mention her piano lesson?',
        [
          'She is busy before the film, but she can still arrive on time',
          'She cannot come to the cinema',
          'She wants to meet later, at half past seven',
        ],
      ],
    ],
  },
  {
    slug: 'placement-repair-cafe',
    title: 'A radio interview',
    level: 'B1',
    speakers: { H: { name: 'Host', voice: 'northern' }, M: { name: 'Maria', voice: 'cori' } },
    script: [
      ['H', 'Today I’m talking to Maria Lopez, who started a repair café in her town two years ago. Maria, what exactly is a repair café?'],
      [
        'M',
        'It’s a free monthly meeting where people bring broken things — toasters, lamps, clothes, bicycles — and volunteers help them fix them. The idea isn’t that we repair everything for you. We repair things together, so you learn how to do it yourself.',
      ],
      ['H', 'How did it start?'],
      [
        'M',
        'Honestly, it started out of frustration. My washing machine stopped working, and the shop told me it would be cheaper to buy a new one. I found that hard to accept — it was only five years old. A neighbour who used to be an engineer fixed it in twenty minutes. That made me wonder how many things we throw away for no good reason.',
      ],
      ['H', 'Was it easy to find volunteers?'],
      [
        'M',
        'Surprisingly, yes. Lots of retired people have skills they don’t get to use any more, and they enjoy teaching them. What was harder was convincing people to come. At first, many assumed it was some kind of business and that we would try to sell them something.',
      ],
      ['H', 'And now?'],
      [
        'M',
        'Now we usually have around sixty visitors, and we manage to repair about three out of four items. Of course, we can’t fix everything, and I’d never claim that repair cafés will solve the problem of waste on their own. But they change the way people think about the things they own — and that, to me, is the real point.',
      ],
    ],
    questions: [
      [
        'What happens at a repair café?',
        [
          'Volunteers help people repair their own broken things',
          'People sell old things they no longer need',
          'Engineers repair items for a small fee',
        ],
      ],
      [
        'What gave Maria the idea for the repair café?',
        [
          'A neighbour easily fixed a machine a shop wanted her to replace',
          'She trained as an engineer when she was younger',
          'She saw a repair café in another town',
        ],
      ],
      [
        'According to Maria, what was the hardest part at the beginning?',
        [
          'Getting people to trust the idea and come',
          'Finding people with the right skills',
          'Finding a free place to meet',
        ],
      ],
      ['About how many items do they manage to repair?', ['Three out of four', 'Almost all of them', 'About half of them']],
      [
        'What is Maria’s attitude to repair cafés at the end?',
        [
          'They will not end waste alone, but they change how people think',
          'They are the best solution to the problem of waste',
          'They are less useful than she first expected',
        ],
      ],
    ],
  },
];

const placementAudioId = (slug) => `placement/listening/${slug}`;

// Sabit ama soruya göre değişen bir sıralama: doğru cevap her soruda aynı şıkta durmasın.
const arrangeOptions = (question, options) => {
  const seed = [...question].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const shift = seed % options.length;
  return [...options.slice(shift), ...options.slice(0, shift)];
};

// Seed için Question kayıtları: order değerleri okuma bölümünden (1..55) önce gelir.
const placementListeningQuestions = () =>
  PLACEMENT_LISTENING.flatMap((recording, g) =>
    recording.questions.map(([title, options], i) => ({
      type: 'multiple-choice',
      title,
      options: arrangeOptions(title, options),
      correctAnswer: options[0],
      level: g === 0 ? 'A2' : 'B1',
      section: 'listening',
      exerciseGroup: g + 1,
      audio: placementAudioId(recording.slug),
      order: -100 + g * 10 + i,
    }))
  );

// generateListeningAudio.js için kayıt listesi.
const placementListeningItems = () =>
  PLACEMENT_LISTENING.map((item) => ({ level: item.level, item, publicId: placementAudioId(item.slug) }));

module.exports = { PLACEMENT_LISTENING, placementAudioId, placementListeningQuestions, placementListeningItems };
