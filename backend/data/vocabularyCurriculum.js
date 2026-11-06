// Vocabulary müfredatı (A1–B2). Konu kartı resimleri bu listeden üretildi; sıra = kartlardaki sıra.
//
// Her satır: [dosya, başlık, kaynak]
// - dosya: resim dosyasının adı (uzantısız). Cloudinary public ID'si: topics/vocabulary/<seviye>/<dosya>
// - başlık: uygulamada görünen konu başlığı
// - kaynak: içeriği (sorular + Explanation sekmesi) bu yeni konuya taşınan ESKİ konu, `SEVIYE::Eski başlık`.
//   null ise konu yeni; henüz sorusu ve açıklaması yok.
const VOCABULARY_CURRICULUM = {
  A1: [
    ['01-common-things', 'Common Things', 'A1::Common Things'],
    ['02-common-verbs-and-verb-phrases', 'Common Verbs and Verb Phrases', 'A1::Common Verbs and Verb Phrases'],
    ['03-family-and-relatives', 'Family and Relatives', 'A1::Family and Relatives'],
    ['04-opposite-adjectives', 'Opposite Adjectives', 'A1::Opposite Adjectives'],
    ['05-daily-routines', 'Daily Routines', 'A1::Daily Routines'],
    ['06-days-months-and-seasons', 'Days, Months and Seasons', 'A1::Days, Months, Seasons and Dates'],
    ['07-food-and-meals', 'Food and Meals', 'A1::Food and Meals'],
    ['08-countries-and-nationalities', 'Countries and Nationalities', 'A1::Countries and Nationalities'],
    ['09-shops-and-shopping', 'Shops and Shopping', 'A1::Shops and Shopping'],
    ['10-parts-of-the-body', 'Parts of the Body', 'A1::Parts of the Body'],
    ['11-clothes', 'Clothes', 'A1::Clothes'],
    ['12-the-house', 'The House: Rooms and Things', 'A1::The House: Rooms, Parts, and Things'],
    ['13-places-in-a-town', 'Places in a Town', 'A1::Places in a Town'],
    ['14-at-the-restaurant', 'At the Restaurant', 'A1::At the Restaurant'],
    ['15-eating-and-drinking-utensils', 'Eating and Drinking Utensils', 'A1::Eating and Drinking Utensils'],
    ['16-movement-verbs', 'Movement Verbs', 'A1::Movement Verbs'],
    ['17-time-words', 'Time Words', 'A1::Time Words'],
    ['18-basic-phrasal-verbs', 'Basic Phrasal Verbs', 'A1::Basic Phrasal Verbs'],
  ],
  A2: [
    ['01-jobs', 'Jobs', null],
    ['02-weather', 'The Weather', 'A2::The Weather'],
    ['03-transport', 'Transport', 'B1::Transport'],
    ['04-free-time-activities', 'Free Time Activities', 'A2::Hobbies and Free Time'],
    ['05-sports', 'Sports', null],
    ['06-animals', 'Animals', 'B1::Animals and Their Bodies and Sounds'],
    ['07-health-and-illness', 'Health and Illness', null],
    ['08-feelings-and-emotions', 'Feelings and Emotions', null],
    ['09-describing-people', 'Describing People', "A2::Describing People's Appearance"],
    ['10-holidays-and-travel', 'Holidays and Travel', 'A2::Holidays'],
    ['11-school-subjects', 'School Subjects', null],
    ['12-technology', 'Technology', 'A2::Technology'],
    ['13-kitchen-and-cooking', 'Kitchen and Cooking', null],
    ['14-nature-and-landscape', 'Nature and Landscape', 'A2::The Countryside'],
    ['15-money-and-prices', 'Money and Prices', null],
    ['16-music-and-instruments', 'Music and Instruments', null],
    ['17-containers-and-quantities', 'Containers and Quantities', 'A2::Containers and Quantities'],
    ['18-furniture', 'Furniture', null],
  ],
  B1: [
    ['01-work-and-careers', 'Work and Careers', 'B1::Work'],
    ['02-education', 'Education', 'B1::Education'],
    ['03-health-and-fitness', 'Health and Fitness', null],
    ['04-the-environment', 'The Environment', 'B1::Pollution and How to Stop It'],
    ['05-money-and-banking', 'Money and Banking', 'B1::Money'],
    ['06-media-and-news', 'Media and News', 'B1::News and Media'],
    ['07-travel-and-tourism', 'Travel and Tourism', 'B1::Hotels and Accommodation'],
    ['08-relationships', 'Relationships', 'B1::Relationships'],
    ['09-personality-adjectives', 'Personality Adjectives', "A2::Describing People's Personality"],
    ['10-food-and-cooking', 'Food and Cooking', 'B1::Food and Cooking'],
    ['11-houses-and-homes', 'Houses and Homes', 'B1::Houses and Buildings'],
    ['12-shopping-and-consumerism', 'Shopping and Consumerism', 'A2::Shops and Shopping'],
    ['13-technology-and-the-internet', 'Technology and the Internet', 'B2::Technology: Managing Your Devices'],
    ['14-crime-and-law', 'Crime and Law', null],
    ['15-weather-and-climate', 'Weather and Climate', null],
    ['16-entertainment', 'Entertainment', 'B1::Types of Movies and TV Shows'],
    ['17-sport-and-competition', 'Sport and Competition', 'B1::Sport'],
    ['18-common-phrasal-verbs', 'Common Phrasal Verbs', 'A2::Common Phrasal Verbs'],
  ],
  B2: [
    ['01-business-and-economy', 'Business and the Economy', 'B2::Money and Finance'],
    ['02-science-and-research', 'Science and Research', null],
    ['03-politics-and-society', 'Politics and Society', 'B2::War and Peace'],
    ['04-climate-change', 'Climate Change', 'B2::Pollution and the Environment'],
    ['05-health-and-medicine', 'Health and Medicine', 'B2::Health and Sickness'],
    ['06-psychology-and-emotions', 'Psychology and Emotions', 'B2::Feelings and Emotions'],
    ['07-crime-and-justice', 'Crime and Justice', null],
    ['08-media-and-advertising', 'Media and Advertising', 'B2::News and Media'],
    ['09-technology-and-innovation', 'Technology and Innovation', null],
    ['10-work-and-employment', 'Work and Employment', 'B2::Work and Jobs'],
    ['11-travel-and-culture', 'Travel and Culture', 'B2::Tourism'],
    ['12-higher-education', 'Higher Education', 'B2::Education'],
    ['13-arts-and-literature', 'Arts and Literature', 'B2::Talking About Movies'],
    ['14-urban-life', 'Urban Life', 'B2::Cars, Roads and Traffic'],
    ['15-idioms', 'Idioms', null],
    ['16-collocations', 'Collocations', null],
    ['17-advanced-phrasal-verbs', 'Advanced Phrasal Verbs', 'B2::Phrasal Verbs I'],
    ['18-word-formation', 'Word Formation', null],
  ],
};

const vocabularyImageId = (level, file) => `topics/vocabulary/${level.toLowerCase()}/${file}`;

// Seed'in kullandığı düz liste: { title, category, level, image, description, source }
const vocabularyTopics = Object.entries(VOCABULARY_CURRICULUM).flatMap(([level, rows]) =>
  rows.map(([file, title, source]) => ({
    title,
    category: 'vocabulary',
    level,
    image: vocabularyImageId(level, file),
    description: `${title} temalı kelime seti.`,
    source,
  }))
);

module.exports = { VOCABULARY_CURRICULUM, vocabularyTopics, vocabularyImageId };
