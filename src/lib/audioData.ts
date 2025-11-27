export interface WordTiming {
  word: string;
  start: number;
  end: number;
}

export interface SentenceTiming {
  text: string;
  start: number;
  end: number;
  words: WordTiming[];
}

export interface ChapterData {
  id: string;
  title: string;
  audioUrl: string;
  duration: number;
  sentences: SentenceTiming[];
}

export const scienceMadeSimpleChapter1: ChapterData = {
  id: "science-ch1",
  title: "Science Made Simple - Chapter 1",
  audioUrl: "/audio/science-made-simple-ch1.mp3",
  duration: 180,
  sentences: [
    {
      text: "Science is all around us, from the moment we wake up to the time we go to sleep.",
      start: 0,
      end: 5.2,
      words: [
        { word: "Science", start: 0, end: 0.6 },
        { word: "is", start: 0.7, end: 0.9 },
        { word: "all", start: 1.0, end: 1.2 },
        { word: "around", start: 1.3, end: 1.7 },
        { word: "us,", start: 1.8, end: 2.1 },
        { word: "from", start: 2.4, end: 2.7 },
        { word: "the", start: 2.8, end: 2.9 },
        { word: "moment", start: 3.0, end: 3.4 },
        { word: "we", start: 3.5, end: 3.7 },
        { word: "wake", start: 3.8, end: 4.1 },
        { word: "up", start: 4.2, end: 4.4 },
        { word: "to", start: 4.5, end: 4.6 },
        { word: "the", start: 4.7, end: 4.8 },
        { word: "time", start: 4.9, end: 5.1 },
        { word: "we", start: 5.2, end: 5.3 },
        { word: "go", start: 5.4, end: 5.6 },
        { word: "to", start: 5.7, end: 5.8 },
        { word: "sleep.", start: 5.9, end: 6.3 }
      ]
    },
    {
      text: "It helps us understand how things work and why things happen the way they do.",
      start: 6.5,
      end: 11.8,
      words: [
        { word: "It", start: 6.5, end: 6.7 },
        { word: "helps", start: 6.8, end: 7.2 },
        { word: "us", start: 7.3, end: 7.5 },
        { word: "understand", start: 7.6, end: 8.4 },
        { word: "how", start: 8.5, end: 8.8 },
        { word: "things", start: 8.9, end: 9.2 },
        { word: "work", start: 9.3, end: 9.7 },
        { word: "and", start: 9.9, end: 10.1 },
        { word: "why", start: 10.2, end: 10.5 },
        { word: "things", start: 10.6, end: 10.9 },
        { word: "happen", start: 11.0, end: 11.4 },
        { word: "the", start: 11.5, end: 11.6 },
        { word: "way", start: 11.7, end: 11.9 },
        { word: "they", start: 12.0, end: 12.2 },
        { word: "do.", start: 12.3, end: 12.6 }
      ]
    },
    {
      text: "When you turn on a light switch, electricity flows through wires to make the bulb glow.",
      start: 13.0,
      end: 18.5,
      words: [
        { word: "When", start: 13.0, end: 13.3 },
        { word: "you", start: 13.4, end: 13.6 },
        { word: "turn", start: 13.7, end: 14.0 },
        { word: "on", start: 14.1, end: 14.3 },
        { word: "a", start: 14.4, end: 14.5 },
        { word: "light", start: 14.6, end: 14.9 },
        { word: "switch,", start: 15.0, end: 15.5 },
        { word: "electricity", start: 15.8, end: 16.5 },
        { word: "flows", start: 16.6, end: 17.0 },
        { word: "through", start: 17.1, end: 17.5 },
        { word: "wires", start: 17.6, end: 18.0 },
        { word: "to", start: 18.1, end: 18.2 },
        { word: "make", start: 18.3, end: 18.6 },
        { word: "the", start: 18.7, end: 18.8 },
        { word: "bulb", start: 18.9, end: 19.2 },
        { word: "glow.", start: 19.3, end: 19.7 }
      ]
    },
    {
      text: "That's physics in action, the study of matter and energy.",
      start: 20.0,
      end: 24.2,
      words: [
        { word: "That's", start: 20.0, end: 20.4 },
        { word: "physics", start: 20.5, end: 21.1 },
        { word: "in", start: 21.2, end: 21.4 },
        { word: "action,", start: 21.5, end: 22.0 },
        { word: "the", start: 22.3, end: 22.4 },
        { word: "study", start: 22.5, end: 22.9 },
        { word: "of", start: 23.0, end: 23.2 },
        { word: "matter", start: 23.3, end: 23.7 },
        { word: "and", start: 23.8, end: 24.0 },
        { word: "energy.", start: 24.1, end: 24.6 }
      ]
    },
    {
      text: "When you eat breakfast, your body breaks down the food into nutrients that give you energy.",
      start: 25.0,
      end: 31.0,
      words: [
        { word: "When", start: 25.0, end: 25.3 },
        { word: "you", start: 25.4, end: 25.6 },
        { word: "eat", start: 25.7, end: 26.0 },
        { word: "breakfast,", start: 26.1, end: 26.8 },
        { word: "your", start: 27.0, end: 27.2 },
        { word: "body", start: 27.3, end: 27.7 },
        { word: "breaks", start: 27.8, end: 28.2 },
        { word: "down", start: 28.3, end: 28.6 },
        { word: "the", start: 28.7, end: 28.8 },
        { word: "food", start: 28.9, end: 29.2 },
        { word: "into", start: 29.3, end: 29.6 },
        { word: "nutrients", start: 29.7, end: 30.3 },
        { word: "that", start: 30.4, end: 30.6 },
        { word: "give", start: 30.7, end: 31.0 },
        { word: "you", start: 31.1, end: 31.3 },
        { word: "energy.", start: 31.4, end: 31.9 }
      ]
    },
    {
      text: "That's biology and chemistry working together to keep you alive and healthy.",
      start: 32.2,
      end: 37.0,
      words: [
        { word: "That's", start: 32.2, end: 32.6 },
        { word: "biology", start: 32.7, end: 33.4 },
        { word: "and", start: 33.5, end: 33.7 },
        { word: "chemistry", start: 33.8, end: 34.5 },
        { word: "working", start: 34.6, end: 35.1 },
        { word: "together", start: 35.2, end: 35.7 },
        { word: "to", start: 35.8, end: 35.9 },
        { word: "keep", start: 36.0, end: 36.3 },
        { word: "you", start: 36.4, end: 36.6 },
        { word: "alive", start: 36.7, end: 37.1 },
        { word: "and", start: 37.2, end: 37.4 },
        { word: "healthy.", start: 37.5, end: 38.0 }
      ]
    }
  ]
};

export const mockBooks = {
  "the-great-gatsby": {
    id: "gatsby-ch1",
    title: "The Great Gatsby - Chapter 1",
    audioUrl: "/audio/mock-gatsby.mp3",
    duration: 540,
    sentences: [
      {
        text: "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.",
        start: 0,
        end: 7.5,
        words: []
      },
      {
        text: "\"Whenever you feel like criticizing any one,\" he told me, \"just remember that all the people in this world haven't had the advantages that you've had.\"",
        start: 8.0,
        end: 16.0,
        words: []
      }
    ]
  }
};
