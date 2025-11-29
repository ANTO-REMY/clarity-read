export interface Word {
  word: string;
  start: number;
  end: number;
}

export interface Sentence {
  text: string;
  start: number;
  end: number;
  words: Word[];
}

export interface ChapterPrep {
  characters: Array<{ name: string; description: string; icon?: string }>;
  vocabulary: Array<{ word: string; definition: string; example: string }>;
  summary: string;
}

export interface ChapterData {
  id: string;
  title: string;
  chapter: string;
  audioUrl: string;
  duration: number;
  sentences: Sentence[];
  prep?: ChapterPrep;
  content?: string; // For unsynced full text
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  category: string;
  level: string;
  totalChapters: number;
  chapters: Array<{ id: string; title: string; duration: string }>;
}

export const greatGatsbyChapter1: ChapterData = {
  id: "gatsby-ch1",
  title: "The Great Gatsby",
  chapter: "Chapter 1",
  audioUrl: "/audio/great-gatsby/greatgatsby_01_fitzgerald_64kb.mp3",
  duration: 2583, // 43:03 in seconds
  prep: {
    characters: [
      { name: "Nick Carraway", description: "The narrator, a young man from Minnesota who moves to New York." },
      { name: "Daisy Buchanan", description: "Nick's cousin and the object of Gatsby's affection." }
    ],
    vocabulary: [
      { word: "vulnerable", definition: "Easily hurt or influenced", example: "He was in a vulnerable state." },
      { word: "privy", definition: "Sharing in the knowledge of something secret", example: "I was privy to the secret details." }
    ],
    summary: "Nick Carraway introduces himself and describes his background. He mentions his move to West Egg and his mysterious neighbor, Jay Gatsby."
  },
  sentences: [
    {
      text: "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.",
      start: 0.5,
      end: 9.5,
      words: [
        { word: "In", start: 0.5, end: 0.8 },
        { word: "my", start: 0.8, end: 1.0 },
        { word: "younger", start: 1.0, end: 1.5 },
        { word: "and", start: 1.5, end: 1.7 },
        { word: "more", start: 1.7, end: 2.0 },
        { word: "vulnerable", start: 2.0, end: 2.8 },
        { word: "years", start: 2.8, end: 3.2 },
        { word: "my", start: 3.2, end: 3.4 },
        { word: "father", start: 3.4, end: 3.9 },
        { word: "gave", start: 3.9, end: 4.2 },
        { word: "me", start: 4.2, end: 4.4 },
        { word: "some", start: 4.4, end: 4.7 },
        { word: "advice", start: 4.7, end: 5.3 },
        { word: "that", start: 5.3, end: 5.5 },
        { word: "I've", start: 5.5, end: 5.8 },
        { word: "been", start: 5.8, end: 6.1 },
        { word: "turning", start: 6.1, end: 6.6 },
        { word: "over", start: 6.6, end: 6.9 },
        { word: "in", start: 6.9, end: 7.1 },
        { word: "my", start: 7.1, end: 7.3 },
        { word: "mind", start: 7.3, end: 7.8 },
        { word: "ever", start: 7.8, end: 8.2 },
        { word: "since", start: 8.2, end: 8.8 }
      ]
    },
    {
      text: "“Whenever you feel like criticizing any one,” he told me, “just remember that all the people in this world haven’t had the advantages that you’ve had.”",
      start: 9.5,
      end: 18.5,
      words: [
        { word: "Whenever", start: 9.5, end: 10.0 },
        { word: "you", start: 10.0, end: 10.2 },
        { word: "feel", start: 10.2, end: 10.5 },
        { word: "like", start: 10.5, end: 10.8 },
        { word: "criticizing", start: 10.8, end: 11.6 },
        { word: "any", start: 11.6, end: 11.9 },
        { word: "one", start: 11.9, end: 12.3 },
        { word: "he", start: 12.3, end: 12.5 },
        { word: "told", start: 12.5, end: 12.9 },
        { word: "me", start: 12.9, end: 13.2 },
        { word: "just", start: 13.2, end: 13.6 },
        { word: "remember", start: 13.6, end: 14.2 },
        { word: "that", start: 14.2, end: 14.4 },
        { word: "all", start: 14.4, end: 14.7 },
        { word: "the", start: 14.7, end: 14.9 },
        { word: "people", start: 14.9, end: 15.4 },
        { word: "in", start: 15.4, end: 15.6 },
        { word: "this", start: 15.6, end: 15.9 },
        { word: "world", start: 15.9, end: 16.4 },
        { word: "haven't", start: 16.4, end: 16.9 },
        { word: "had", start: 16.9, end: 17.2 },
        { word: "the", start: 17.2, end: 17.4 },
        { word: "advantages", start: 17.4, end: 18.2 },
        { word: "that", start: 18.2, end: 18.4 },
        { word: "you've", start: 18.4, end: 18.7 },
        { word: "had", start: 18.7, end: 19.0 }
      ]
    },
    {
      text: "He didn’t say any more, but we’ve always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that.",
      start: 18.5,
      end: 28.0,
      words: [
        { word: "He", start: 18.5, end: 18.7 },
        { word: "didn't", start: 18.7, end: 19.1 },
        { word: "say", start: 19.1, end: 19.4 },
        { word: "any", start: 19.4, end: 19.7 },
        { word: "more", start: 19.7, end: 20.1 },
        { word: "but", start: 20.1, end: 20.4 },
        { word: "we've", start: 20.4, end: 20.7 },
        { word: "always", start: 20.7, end: 21.1 },
        { word: "been", start: 21.1, end: 21.3 },
        { word: "unusually", start: 21.3, end: 22.0 },
        { word: "communicative", start: 22.0, end: 22.9 },
        { word: "in", start: 22.9, end: 23.1 },
        { word: "a", start: 23.1, end: 23.2 },
        { word: "reserved", start: 23.2, end: 23.8 },
        { word: "way", start: 23.8, end: 24.2 },
        { word: "and", start: 24.2, end: 24.5 },
        { word: "I", start: 24.5, end: 24.7 },
        { word: "understood", start: 24.7, end: 25.4 },
        { word: "that", start: 25.4, end: 25.6 },
        { word: "he", start: 25.6, end: 25.8 },
        { word: "meant", start: 25.8, end: 26.1 },
        { word: "a", start: 26.1, end: 26.2 },
        { word: "great", start: 26.2, end: 26.5 },
        { word: "deal", start: 26.5, end: 26.8 },
        { word: "more", start: 26.8, end: 27.2 },
        { word: "than", start: 27.2, end: 27.5 },
        { word: "that", start: 27.5, end: 27.8 }
      ]
    },
    {
      text: "In consequence, I’m inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores.",
      start: 28.0,
      end: 39.0,
      words: [
        { word: "In", start: 28.0, end: 28.2 },
        { word: "consequence", start: 28.2, end: 29.0 },
        { word: "I'm", start: 29.0, end: 29.3 },
        { word: "inclined", start: 29.3, end: 29.9 },
        { word: "to", start: 29.9, end: 30.1 },
        { word: "reserve", start: 30.1, end: 30.6 },
        { word: "all", start: 30.6, end: 30.9 },
        { word: "judgments", start: 30.9, end: 31.6 },
        { word: "a", start: 31.6, end: 31.8 },
        { word: "habit", start: 31.8, end: 32.2 },
        { word: "that", start: 32.2, end: 32.4 },
        { word: "has", start: 32.4, end: 32.7 },
        { word: "opened", start: 32.7, end: 33.1 },
        { word: "up", start: 33.1, end: 33.3 },
        { word: "many", start: 33.3, end: 33.6 },
        { word: "curious", start: 33.6, end: 34.2 },
        { word: "natures", start: 34.2, end: 34.8 },
        { word: "to", start: 34.8, end: 35.0 },
        { word: "me", start: 35.0, end: 35.2 },
        { word: "and", start: 35.2, end: 35.5 },
        { word: "also", start: 35.5, end: 35.9 },
        { word: "made", start: 35.9, end: 36.2 },
        { word: "me", start: 36.2, end: 36.4 },
        { word: "the", start: 36.4, end: 36.6 },
        { word: "victim", start: 36.6, end: 37.1 },
        { word: "of", start: 37.1, end: 37.3 },
        { word: "not", start: 37.3, end: 37.6 },
        { word: "a", start: 37.6, end: 37.7 },
        { word: "few", start: 37.7, end: 38.0 },
        { word: "veteran", start: 38.0, end: 38.5 },
        { word: "bores", start: 38.5, end: 39.0 }
      ]
    },
    {
      text: "The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person, and so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men.",
      start: 39.0,
      end: 54.0,
      words: [
        { word: "The", start: 39.0, end: 39.2 },
        { word: "abnormal", start: 39.2, end: 39.8 },
        { word: "mind", start: 39.8, end: 40.2 },
        { word: "is", start: 40.2, end: 40.4 },
        { word: "quick", start: 40.4, end: 40.8 },
        { word: "to", start: 40.8, end: 41.0 },
        { word: "detect", start: 41.0, end: 41.5 },
        { word: "and", start: 41.5, end: 41.7 },
        { word: "attach", start: 41.7, end: 42.2 },
        { word: "itself", start: 42.2, end: 42.6 },
        { word: "to", start: 42.6, end: 42.8 },
        { word: "this", start: 42.8, end: 43.1 },
        { word: "quality", start: 43.1, end: 43.6 },
        { word: "when", start: 43.6, end: 43.9 },
        { word: "it", start: 43.9, end: 44.1 },
        { word: "appears", start: 44.1, end: 44.6 },
        { word: "in", start: 44.6, end: 44.8 },
        { word: "a", start: 44.8, end: 44.9 },
        { word: "normal", start: 44.9, end: 45.4 },
        { word: "person", start: 45.4, end: 45.9 },
        { word: "and", start: 45.9, end: 46.2 },
        { word: "so", start: 46.2, end: 46.5 },
        { word: "it", start: 46.5, end: 46.7 },
        { word: "came", start: 46.7, end: 47.0 },
        { word: "about", start: 47.0, end: 47.4 },
        { word: "that", start: 47.4, end: 47.7 },
        { word: "in", start: 47.7, end: 47.9 },
        { word: "college", start: 47.9, end: 48.4 },
        { word: "I", start: 48.4, end: 48.6 },
        { word: "was", start: 48.6, end: 48.9 },
        { word: "unjustly", start: 48.9, end: 49.6 },
        { word: "accused", start: 49.6, end: 50.1 },
        { word: "of", start: 50.1, end: 50.3 },
        { word: "being", start: 50.3, end: 50.6 },
        { word: "a", start: 50.6, end: 50.7 },
        { word: "politician", start: 50.7, end: 51.5 },
        { word: "because", start: 51.5, end: 52.0 },
        { word: "I", start: 52.0, end: 52.2 },
        { word: "was", start: 52.2, end: 52.4 },
        { word: "privy", start: 52.4, end: 52.8 },
        { word: "to", start: 52.8, end: 53.0 },
        { word: "the", start: 53.0, end: 53.2 },
        { word: "secret", start: 53.2, end: 53.7 },
        { word: "griefs", start: 53.7, end: 54.2 },
        { word: "of", start: 54.2, end: 54.4 },
        { word: "wild", start: 54.4, end: 54.9 },
        { word: "unknown", start: 54.9, end: 55.5 },
        { word: "men", start: 55.5, end: 55.9 }
      ]
    },
    {
      text: "Most of the confidences were unsought—frequently I have feigned sleep, preoccupation, or a hostile levity when I realized by some unmistakable sign that an intimate revelation was quivering on the horizon.",
      start: 56.0,
      end: 68.0,
      words: [
        { word: "Most", start: 56.0, end: 56.3 },
        { word: "of", start: 56.3, end: 56.5 },
        { word: "the", start: 56.5, end: 56.7 },
        { word: "confidences", start: 56.7, end: 57.5 },
        { word: "were", start: 57.5, end: 57.8 },
        { word: "unsought", start: 57.8, end: 58.5 },
        { word: "frequently", start: 58.5, end: 59.2 },
        { word: "I", start: 59.2, end: 59.4 },
        { word: "have", start: 59.4, end: 59.7 },
        { word: "feigned", start: 59.7, end: 60.1 },
        { word: "sleep", start: 60.1, end: 60.6 },
        { word: "preoccupation", start: 60.6, end: 61.5 },
        { word: "or", start: 61.5, end: 61.7 },
        { word: "a", start: 61.7, end: 61.8 },
        { word: "hostile", start: 61.8, end: 62.4 },
        { word: "levity", start: 62.4, end: 63.0 },
        { word: "when", start: 63.0, end: 63.3 },
        { word: "I", start: 63.3, end: 63.5 },
        { word: "realized", start: 63.5, end: 64.1 },
        { word: "by", start: 64.1, end: 64.3 },
        { word: "some", start: 64.3, end: 64.6 },
        { word: "unmistakable", start: 64.6, end: 65.4 },
        { word: "sign", start: 65.4, end: 65.8 },
        { word: "that", start: 65.8, end: 66.0 },
        { word: "an", start: 66.0, end: 66.2 },
        { word: "intimate", start: 66.2, end: 66.8 },
        { word: "revelation", start: 66.8, end: 67.5 },
        { word: "was", start: 67.5, end: 67.7 },
        { word: "quivering", start: 67.7, end: 68.3 },
        { word: "on", start: 68.3, end: 68.5 },
        { word: "the", start: 68.5, end: 68.7 },
        { word: "horizon", start: 68.7, end: 69.3 }
      ]
    },
    {
      text: "When I came back from the East last autumn I felt that I wanted the world to be in uniform and at a sort of moral attention forever;",
      start: 70.0,
      end: 79.5,
      words: [
        { word: "When", start: 70.0, end: 70.3 },
        { word: "I", start: 70.3, end: 70.5 },
        { word: "came", start: 70.5, end: 70.8 },
        { word: "back", start: 70.8, end: 71.2 },
        { word: "from", start: 71.2, end: 71.5 },
        { word: "the", start: 71.5, end: 71.7 },
        { word: "East", start: 71.7, end: 72.1 },
        { word: "last", start: 72.1, end: 72.4 },
        { word: "autumn", start: 72.4, end: 73.0 },
        { word: "I", start: 73.0, end: 73.2 },
        { word: "felt", start: 73.2, end: 73.5 },
        { word: "that", start: 73.5, end: 73.7 },
        { word: "I", start: 73.7, end: 73.9 },
        { word: "wanted", start: 73.9, end: 74.3 },
        { word: "the", start: 74.3, end: 74.5 },
        { word: "world", start: 74.5, end: 74.9 },
        { word: "to", start: 74.9, end: 75.1 },
        { word: "be", start: 75.1, end: 75.3 },
        { word: "in", start: 75.3, end: 75.5 },
        { word: "uniform", start: 75.5, end: 76.1 },
        { word: "and", start: 76.1, end: 76.3 },
        { word: "at", start: 76.3, end: 76.5 },
        { word: "a", start: 76.5, end: 76.6 },
        { word: "sort", start: 76.6, end: 76.9 },
        { word: "of", start: 76.9, end: 77.1 },
        { word: "moral", start: 77.1, end: 77.5 },
        { word: "attention", start: 77.5, end: 78.2 },
        { word: "forever", start: 78.2, end: 79.0 }
      ]
    },
    {
      text: "I wanted no more riotous excursions with privileged glimpses into the human heart.",
      start: 79.5,
      end: 85.0,
      words: [
        { word: "I", start: 79.5, end: 79.7 },
        { word: "wanted", start: 79.7, end: 80.1 },
        { word: "no", start: 80.1, end: 80.3 },
        { word: "more", start: 80.3, end: 80.7 },
        { word: "riotous", start: 80.7, end: 81.3 },
        { word: "excursions", start: 81.3, end: 82.2 },
        { word: "with", start: 82.2, end: 82.5 },
        { word: "privileged", start: 82.5, end: 83.2 },
        { word: "glimpses", start: 83.2, end: 83.8 },
        { word: "into", start: 83.8, end: 84.1 },
        { word: "the", start: 84.1, end: 84.3 },
        { word: "human", start: 84.3, end: 84.7 },
        { word: "heart", start: 84.7, end: 85.0 }
      ]
    },
    {
      text: "Only Gatsby, the man who gives his name to this book, was exempt from my reaction—",
      start: 85.5,
      end: 92.0,
      words: [
        { word: "Only", start: 85.5, end: 85.9 },
        { word: "Gatsby", start: 85.9, end: 86.5 },
        { word: "the", start: 86.5, end: 86.7 },
        { word: "man", start: 86.7, end: 87.0 },
        { word: "who", start: 87.0, end: 87.3 },
        { word: "gives", start: 87.3, end: 87.7 },
        { word: "his", start: 87.7, end: 87.9 },
        { word: "name", start: 87.9, end: 88.2 },
        { word: "to", start: 88.2, end: 88.4 },
        { word: "this", start: 88.4, end: 88.7 },
        { word: "book", start: 88.7, end: 89.1 },
        { word: "was", start: 89.1, end: 89.4 },
        { word: "exempt", start: 89.4, end: 90.0 },
        { word: "from", start: 90.0, end: 90.3 },
        { word: "my", start: 90.3, end: 90.5 },
        { word: "reaction", start: 90.5, end: 91.3 }
      ]
    },
    {
      text: "Gatsby who represented everything for which I have an unaffected scorn.",
      start: 92.0,
      end: 97.5,
      words: [
        { word: "Gatsby", start: 92.0, end: 92.6 },
        { word: "who", start: 92.6, end: 92.9 },
        { word: "represented", start: 92.9, end: 93.7 },
        { word: "everything", start: 93.7, end: 94.5 },
        { word: "for", start: 94.5, end: 94.8 },
        { word: "which", start: 94.8, end: 95.1 },
        { word: "I", start: 95.1, end: 95.3 },
        { word: "have", start: 95.3, end: 95.6 },
        { word: "an", start: 95.6, end: 95.8 },
        { word: "unaffected", start: 95.8, end: 96.6 },
        { word: "scorn", start: 96.6, end: 97.2 }
      ]
    },
    {
      text: "If personality is an unbroken series of successful gestures, then there was something gorgeous about him,",
      start: 98.0,
      end: 106.0,
      words: [
        { word: "If", start: 98.0, end: 98.2 },
        { word: "personality", start: 98.2, end: 99.2 },
        { word: "is", start: 99.2, end: 99.4 },
        { word: "an", start: 99.4, end: 99.6 },
        { word: "unbroken", start: 99.6, end: 100.3 },
        { word: "series", start: 100.3, end: 100.9 },
        { word: "of", start: 100.9, end: 101.1 },
        { word: "successful", start: 101.1, end: 101.9 },
        { word: "gestures", start: 101.9, end: 102.6 },
        { word: "then", start: 102.6, end: 102.9 },
        { word: "there", start: 102.9, end: 103.2 },
        { word: "was", start: 103.2, end: 103.5 },
        { word: "something", start: 103.5, end: 104.1 },
        { word: "gorgeous", start: 104.1, end: 104.8 },
        { word: "about", start: 104.8, end: 105.2 },
        { word: "him", start: 105.2, end: 105.6 }
      ]
    },
    {
      text: "some heightened sensitivity to the promises of life, as if he were related to one of those intricate machines that register earthquakes ten thousand miles away.",
      start: 106.0,
      end: 118.0,
      words: [
        { word: "some", start: 106.0, end: 106.3 },
        { word: "heightened", start: 106.3, end: 107.1 },
        { word: "sensitivity", start: 107.1, end: 108.0 },
        { word: "to", start: 108.0, end: 108.2 },
        { word: "the", start: 108.2, end: 108.4 },
        { word: "promises", start: 108.4, end: 109.1 },
        { word: "of", start: 109.1, end: 109.3 },
        { word: "life", start: 109.3, end: 109.8 },
        { word: "as", start: 109.8, end: 110.0 },
        { word: "if", start: 110.0, end: 110.2 },
        { word: "he", start: 110.2, end: 110.4 },
        { word: "were", start: 110.4, end: 110.7 },
        { word: "related", start: 110.7, end: 111.3 },
        { word: "to", start: 111.3, end: 111.5 },
        { word: "one", start: 111.5, end: 111.8 },
        { word: "of", start: 111.8, end: 112.0 },
        { word: "those", start: 112.0, end: 112.4 },
        { word: "intricate", start: 112.4, end: 113.1 },
        { word: "machines", start: 113.1, end: 113.8 },
        { word: "that", start: 113.8, end: 114.0 },
        { word: "register", start: 114.0, end: 114.6 },
        { word: "earthquakes", start: 114.6, end: 115.5 },
        { word: "ten", start: 115.5, end: 115.8 },
        { word: "thousand", start: 115.8, end: 116.3 },
        { word: "miles", start: 116.3, end: 116.8 },
        { word: "away", start: 116.8, end: 117.3 }
      ]
    }
  ],
  content: `This responsiveness had nothing to do with that flabby impressionability which is dignified under the name of the "creative temperament"—it was an extraordinary gift for hope, a romantic readiness such as I have never found in any other person and which it is not likely I shall ever find again. No—Gatsby turned out all right at the end; it is what preyed on Gatsby, what foul dust floated in the wake of his dreams that temporarily closed out my interest in the abortive sorrows and short-winded elations of men.

My family have been prominent, well-to-do people in this Middle Western city for three generations. The Carraways are something of a clan, and we have a tradition that we're descended from the Dukes of Buccleuch, but the actual founder of my line was my grandfather's brother, who came here in fifty-one, sent a substitute to the Civil War, and started the wholesale hardware business that my father carries on to-day.

I never saw this great-uncle, but I'm supposed to look like him—with special reference to the rather hard-boiled painting that hangs in father's office. I graduated from New Haven in 1915, just a quarter of a century after my father, and a little later I participated in that delayed Teutonic migration known as the Great War. I enjoyed the counter-raid so thoroughly that I came back restless. Instead of being the warm centre of the world, the Middle West now seemed like the ragged edge of the universe—so I decided to go East and learn the bond business. Everybody I knew was in the bond business, so I supposed it could support one more single man. All my aunts and uncles talked it over as if they were choosing a prep school for me, and finally said, "Why—ye-es," with very grave, hesitant faces. Father agreed to finance me for a year, and after various delays I came East, permanently, I thought, in the spring of twenty-two.

The practical thing was to find rooms in the city, but it was a warm season, and I had just left a country of wide lawns and friendly trees, so when a young man at the office suggested that we take a house together in a commuting town, it sounded like a great idea. He found the house, a weather-beaten cardboard bungalow at eighty a month, but at the last minute the firm ordered him to Washington, and I went out to the country alone. I had a dog—at least I had him for a few days until he ran away—and an old Dodge and a Finnish woman, who made my bed and cooked breakfast and muttered Finnish wisdom to herself over the electric stove.

It was lonely for a day or so until one morning some man, more recently arrived than I, stopped me on the road.

"How do you get to West Egg village?" he asked helplessly.

I told him. And as I walked on I was lonely no longer. I was a guide, a pathfinder, an original settler. He had casually conferred on me the freedom of the neighborhood.

And so with the sunshine and the great bursts of leaves growing on the trees, just as things grow in fast movies, I had that familiar conviction that life was beginning over again with the summer.`
};

export const greatGatsbyBook: Book = {
  id: "great-gatsby",
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  cover: "bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-600",
  category: "Fiction",
  level: "advanced",
  totalChapters: 9,
  chapters: [
    { id: "gatsby-ch1", title: "Chapter 1", duration: "43:03" },
    { id: "gatsby-ch2", title: "Chapter 2", duration: "29:39" },
    { id: "gatsby-ch3", title: "Chapter 3", duration: "39:38" },
    { id: "gatsby-ch4", title: "Chapter 4", duration: "37:18" },
    { id: "gatsby-ch5", title: "Chapter 5", duration: "30:01" },
    { id: "gatsby-ch6", title: "Chapter 6", duration: "29:11" },
    { id: "gatsby-ch7", title: "Chapter 7", duration: "62:56" },
    { id: "gatsby-ch8", title: "Chapter 8", duration: "30:57" },
    { id: "gatsby-ch9", title: "Chapter 9", duration: "35:16" }
  ]
};

export const greatGatsbyChapter2: ChapterData = {
  id: "gatsby-ch2",
  title: "The Great Gatsby",
  chapter: "Chapter 2",
  audioUrl: "/audio/great-gatsby/greatgatsby_02_fitzgerald_64kb.mp3",
  duration: 1779, // 29:39 in seconds
  sentences: [],
  content: "About half way between West Egg and New York the motor road hastily joins the railroad and runs beside it for a quarter of a mile, so as to shrink away from a certain desolate area of land. This is a valley of ashes—a fantastic farm where ashes grow like wheat into ridges and hills and grotesque gardens; where ashes take the forms of houses and chimneys and rising smoke and, finally, with a transcendent effort, of men who move dimly and already crumbling through the powdery air."
};

export const greatGatsbyChapter3: ChapterData = {
  id: "gatsby-ch3",
  title: "The Great Gatsby",
  chapter: "Chapter 3",
  audioUrl: "/audio/great-gatsby/greatgatsby_03_fitzgerald_64kb.mp3",
  duration: 2378, // 39:38 in seconds
  sentences: [],
  content: "There was music from my neighbor's house through the summer nights. In his blue gardens men and girls came and went like moths among the whisperings and the champagne and the stars. At high tide in the afternoon I watched his guests diving from the tower of his raft, or taking the sun on the hot sand of his beach while his two motor-boats slit the waters of the Sound, drawing aquaplanes over cataracts of foam."
};

export const greatGatsbyChapter4: ChapterData = {
  id: "gatsby-ch4",
  title: "The Great Gatsby",
  chapter: "Chapter 4",
  audioUrl: "/audio/great-gatsby/greatgatsby_04_fitzgerald_64kb.mp3",
  duration: 2238, // 37:18 in seconds
  sentences: [],
  content: "On Sunday morning while church bells rang in the villages alongshore, the world and its mistress returned to Gatsby's house and twinkled hilariously on his lawn. 'He's a bootlegger,' said the young ladies, moving somewhere between his cocktails and his flowers. 'One time he killed a man who had found out that he was nephew to Von Hindenburg and second cousin to the devil.'"
};

export const greatGatsbyChapter5: ChapterData = {
  id: "gatsby-ch5",
  title: "The Great Gatsby",
  chapter: "Chapter 5",
  audioUrl: "/audio/great-gatsby/greatgatsby_05_fitzgerald_64kb.mp3",
  duration: 1801, // 30:01 in seconds
  sentences: [],
  content: "When I came home to West Egg that night I was afraid for a moment that my house was on fire. Two o'clock and the whole corner of the peninsula was blazing with light, which fell unreal on the shrubbery and made thin elongating glints upon the roadside wires. Turning a corner, I saw that it was Gatsby's house, lit from tower to cellar."
};

export const greatGatsbyChapter6: ChapterData = {
  id: "gatsby-ch6",
  title: "The Great Gatsby",
  chapter: "Chapter 6",
  audioUrl: "/audio/great-gatsby/greatgatsby_06_fitzgerald_64kb.mp3",
  duration: 1751, // 29:11 in seconds
  sentences: [],
  content: "About this time an ambitious young reporter from New York arrived one morning at Gatsby's door and asked him if he had anything to say. 'Anything to say about what?' inquired Gatsby politely. 'Why—any statement to give out.' It was a random shot, and yet the reporter's instinct was right. Gatsby's notoriety, spread about by the hundreds who had accepted his hospitality and so become authorities upon his past, had increased all summer until he fell just short of being news."
};

export const greatGatsbyChapter7: ChapterData = {
  id: "gatsby-ch7",
  title: "The Great Gatsby",
  chapter: "Chapter 7",
  audioUrl: "/audio/great-gatsby/greatgatsby_07_fitzgerald_64kb.mp3",
  duration: 3776, // 62:56 in seconds
  sentences: [],
  content: "It was when curiosity about Gatsby was at its highest that the lights in his house failed to go on one Saturday night—and, as obscurely as it had begun, his career as Trimalchio was over. Only gradually did I become aware that the automobiles which turned expectantly into his drive stayed for just a minute and then drove sulkily away. Wondering if he were sick I went over to find out—an unfamiliar butler with a villainous face squinted at me suspiciously from the door."
};

export const greatGatsbyChapter8: ChapterData = {
  id: "gatsby-ch8",
  title: "The Great Gatsby",
  chapter: "Chapter 8",
  audioUrl: "/audio/great-gatsby/greatgatsby_08_fitzgerald_64kb.mp3",
  duration: 1857, // 30:57 in seconds
  sentences: [],
  content: "I couldn't sleep all night; a fog-horn was groaning incessantly on the Sound, and I tossed half-sick between grotesque reality and savage, frightening dreams. Toward dawn I heard a taxi go up Gatsby's drive, and immediately I jumped out of bed and began to dress—I felt that I had something to tell him, something to warn him about, and morning would be too late."
};

export const greatGatsbyChapter9: ChapterData = {
  id: "gatsby-ch9",
  title: "The Great Gatsby",
  chapter: "Chapter 9",
  audioUrl: "/audio/great-gatsby/greatgatsby_09_fitzgerald_64kb.mp3",
  duration: 2116, // 35:16 in seconds
  sentences: [],
  content: "After two years I remember the rest of that day, and that night and the next day, only as an endless drill of police and photographers and newspaper men in and out of Gatsby's front door. A rope stretched across the main gate and a policeman by it kept out the curious, but little boys soon discovered that they could enter through my yard, and there were always a few of them clustered open-mouthed about the pool."
};

export const scienceMadeSimpleChapter1: ChapterData = {
  id: "science-ch1",
  title: "Science Made Simple",
  chapter: "Chapter 1: The Basics of Physics",
  audioUrl: "/audio/science-made-simple-ch1.mp3",
  duration: 180, // 3 minutes
  sentences: [
    {
      text: "Science is the systematic study of the structure and behavior of the physical and natural world.",
      start: 0,
      end: 8,
      words: [
        { word: "Science", start: 0, end: 0.8 },
        { word: "is", start: 0.8, end: 1.0 },
        { word: "the", start: 1.0, end: 1.2 },
        { word: "systematic", start: 1.2, end: 2.0 },
        { word: "study", start: 2.0, end: 2.5 },
        { word: "of", start: 2.5, end: 2.7 },
        { word: "the", start: 2.7, end: 2.9 },
        { word: "structure", start: 2.9, end: 3.5 },
        { word: "and", start: 3.5, end: 3.8 },
        { word: "behavior", start: 3.8, end: 4.5 },
        { word: "of", start: 4.5, end: 4.7 },
        { word: "the", start: 4.7, end: 4.9 },
        { word: "physical", start: 4.9, end: 5.5 },
        { word: "and", start: 5.5, end: 5.8 },
        { word: "natural", start: 5.8, end: 6.5 },
        { word: "world", start: 6.5, end: 7.0 }
      ]
    },
    {
      text: "Through observation and experiment, we learn how the universe works.",
      start: 8,
      end: 14,
      words: [
        { word: "Through", start: 8.0, end: 8.5 },
        { word: "observation", start: 8.5, end: 9.5 },
        { word: "and", start: 9.5, end: 9.8 },
        { word: "experiment", start: 9.8, end: 10.8 },
        { word: "we", start: 10.8, end: 11.0 },
        { word: "learn", start: 11.0, end: 11.5 },
        { word: "how", start: 11.5, end: 11.8 },
        { word: "the", start: 11.8, end: 12.0 },
        { word: "universe", start: 12.0, end: 12.8 },
        { word: "works", start: 12.8, end: 13.5 }
      ]
    },
    {
      text: "Physics is a branch of science that studies matter and energy.",
      start: 14,
      end: 20,
      words: [
        { word: "Physics", start: 14.0, end: 14.8 },
        { word: "is", start: 14.8, end: 15.0 },
        { word: "a", start: 15.0, end: 15.2 },
        { word: "branch", start: 15.2, end: 15.8 },
        { word: "of", start: 15.8, end: 16.0 },
        { word: "science", start: 16.0, end: 16.6 },
        { word: "that", start: 16.6, end: 16.9 },
        { word: "studies", start: 16.9, end: 17.5 },
        { word: "matter", start: 17.5, end: 18.0 },
        { word: "and", start: 18.0, end: 18.3 },
        { word: "energy", start: 18.3, end: 19.0 }
      ]
    }
  ]
};

// Chapter Registry for dynamic chapter lookup
export const chapterRegistry: Record<string, ChapterData> = {
  'gatsby-ch1': greatGatsbyChapter1,
  'gatsby-ch2': greatGatsbyChapter2,
  'gatsby-ch3': greatGatsbyChapter3,
  'gatsby-ch4': greatGatsbyChapter4,
  'gatsby-ch5': greatGatsbyChapter5,
  'gatsby-ch6': greatGatsbyChapter6,
  'gatsby-ch7': greatGatsbyChapter7,
  'gatsby-ch8': greatGatsbyChapter8,
  'gatsby-ch9': greatGatsbyChapter9,
  'science-ch1': scienceMadeSimpleChapter1,
};

export function getChapterById(chapterId: string): ChapterData | null {
  return chapterRegistry[chapterId] || null;
}
