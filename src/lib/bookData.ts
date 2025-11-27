export interface Book {
    id: string;
    title: string;
    author: string;
    category: string;
    level: string;
    duration: string;
    totalTime: string;
    chapters: number;
    cover: string;
    description?: string;
    rating?: number;
    reviews?: number;
    releaseDate?: string;
}

export const allBooks: Book[] = [
    {
        id: "great-gatsby",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        level: "advanced",
        duration: "9h 32m",
        totalTime: "9h 32m",
        chapters: 9,
        cover: "bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-600",
        description: "The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted 'gin was the national drink and sex the national obsession,' it is an exquisitely crafted tale of America in the 1920s.",
        rating: 4.9,
        reviews: 2450,
        releaseDate: "Available Now"
    },
    {
        id: "science-made-simple",
        title: "Science Made Simple",
        author: "Dr. Emily Roberts",
        category: "Science",
        level: "beginner",
        duration: "4-6 hours",
        totalTime: "5h 30m",
        chapters: 18,
        cover: "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600",
        description: "An engaging exploration of the fundamental principles that govern our universe, designed to make complex concepts accessible to everyone.",
        rating: 4.8,
        reviews: 1240,
        releaseDate: "Coming Fall 2025"
    },
    {
        id: "history-ancient-rome",
        title: "History of Ancient Rome",
        author: "Marcus Williams",
        category: "History",
        level: "intermediate",
        duration: "6-8 hours",
        totalTime: "7h 15m",
        chapters: 24,
        cover: "bg-gradient-to-br from-red-500 via-orange-600 to-amber-700",
        description: "Journey back in time to explore the rise and fall of one of the greatest empires in history. From the early republic to the fall of the west.",
        rating: 4.7,
        reviews: 890,
        releaseDate: "Coming Soon"
    },
    {
        id: "building-confidence",
        title: "Building Confidence",
        author: "Lisa Anderson",
        category: "Self-Help",
        level: "beginner",
        duration: "3-5 hours",
        totalTime: "4h 20m",
        chapters: 12,
        cover: "bg-gradient-to-br from-purple-400 via-pink-500 to-rose-600",
        description: "Practical strategies and daily exercises to help you build unshakeable self-confidence and overcome social anxiety.",
        rating: 4.6,
        reviews: 560,
        releaseDate: "Coming Soon"
    },
    {
        id: "ai-machine-learning",
        title: "AI and Machine Learning",
        author: "David Chen",
        category: "Technology",
        level: "advanced",
        duration: "8-10 hours",
        totalTime: "9h 45m",
        chapters: 30,
        cover: "bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700",
        description: "A comprehensive guide to the technologies shaping our future. Understand neural networks, deep learning, and the ethics of AI.",
        rating: 4.9,
        reviews: 3200,
        releaseDate: "Coming Soon"
    },
    {
        id: "understanding-psychology",
        title: "Understanding Psychology",
        author: "Dr. Sarah Mitchell",
        category: "Education",
        level: "intermediate",
        duration: "5-7 hours",
        totalTime: "6h 30m",
        chapters: 20,
        cover: "bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600",
        description: "Unlock the secrets of the human mind. Learn about cognitive biases, emotional intelligence, and behavioral patterns.",
        rating: 4.8,
        reviews: 1500,
        releaseDate: "Coming Soon"
    }
];

export const continueReadingBooks = [
    {
        id: "great-gatsby",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        progress: 45,
        cover: "bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-600"
    },
    {
        id: "history-ancient-rome",
        title: "History of Ancient Rome",
        author: "Marcus Williams",
        progress: 78,
        cover: "bg-gradient-to-br from-red-500 via-orange-600 to-amber-700"
    },
    {
        id: "ai-machine-learning",
        title: "AI and Machine Learning",
        author: "David Chen",
        progress: 23,
        cover: "bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700"
    }
];
