import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Settings, Search, BookOpen, Clock, Play, Grid3x3, List, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const continueReadingBooks = [
  {
    id: 1,
    title: "The Great Adventure",
    author: "Sarah Johnson",
    progress: 45,
    cover: "bg-gradient-to-br from-amber-500 via-orange-500 to-pink-500"
  },
  {
    id: 2,
    title: "Historical Mysteries",
    author: "James Patterson",
    progress: 78,
    cover: "bg-gradient-to-br from-amber-600 via-yellow-600 to-orange-700"
  },
  {
    id: 3,
    title: "Digital Innovation",
    author: "Robert Kim",
    progress: 23,
    cover: "bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800"
  }
];

const allBooks = [
  {
    id: 4,
    title: "Science Made Simple",
    author: "Dr. Emily Roberts",
    category: "Science",
    level: "beginner",
    duration: "4-6 hours",
    totalTime: "5h 30m",
    chapters: 18,
    cover: "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600"
  },
  {
    id: 5,
    title: "History of Ancient Rome",
    author: "Marcus Williams",
    category: "History",
    level: "intermediate",
    duration: "6-8 hours",
    totalTime: "7h 15m",
    chapters: 24,
    cover: "bg-gradient-to-br from-red-500 via-orange-600 to-amber-700"
  },
  {
    id: 6,
    title: "Building Confidence",
    author: "Lisa Anderson",
    category: "Self-Help",
    level: "beginner",
    duration: "3-5 hours",
    totalTime: "4h 20m",
    chapters: 12,
    cover: "bg-gradient-to-br from-purple-400 via-pink-500 to-rose-600"
  },
  {
    id: 7,
    title: "AI and Machine Learning",
    author: "David Chen",
    category: "Technology",
    level: "advanced",
    duration: "8-10 hours",
    totalTime: "9h 45m",
    chapters: 30,
    cover: "bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700"
  },
  {
    id: 8,
    title: "Understanding Psychology",
    author: "Dr. Sarah Mitchell",
    category: "Education",
    level: "intermediate",
    duration: "5-7 hours",
    totalTime: "6h 30m",
    chapters: 20,
    cover: "bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600"
  }
];

const categories = [
  { id: "all", name: "All Books", count: null },
  { id: "fiction", name: "Fiction", count: 1 },
  { id: "science", name: "Science", count: 1 },
  { id: "history", name: "History", count: 1 },
  { id: "self-help", name: "Self-Help", count: 1 },
  { id: "technology", name: "Technology", count: 1 },
  { id: "education", name: "Education", count: 1 }
];

const readingLevels = [
  { id: "beginner", name: "Beginner", color: "text-green-600" },
  { id: "intermediate", name: "Intermediate", color: "text-orange-600" },
  { id: "advanced", name: "Advanced", color: "text-red-600" }
];

const Library = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("science");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recently-added");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const toggleLevel = (levelId: string) => {
    setSelectedLevels(prev => 
      prev.includes(levelId) 
        ? prev.filter(id => id !== levelId)
        : [...prev, levelId]
    );
  };

  const filteredBooks = allBooks.filter(book => {
    if (selectedCategory !== "all" && book.category.toLowerCase() !== selectedCategory) {
      return false;
    }
    if (selectedLevels.length > 0 && !selectedLevels.includes(book.level)) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Your Library</h1>
              <p className="text-sm text-muted-foreground mt-1">Discover and continue your reading journey</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/settings")}
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search books by title, author, or category..." 
              className="pl-10 h-11 text-base bg-background"
            />
          </div>
        </div>
      </div>

      {/* Continue Reading Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Continue Reading</h2>
          <Clock className="w-5 h-5 text-primary" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {continueReadingBooks.map((book) => (
            <Card 
              key={book.id}
              className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => navigate("/reader")}
            >
              <div className="p-4">
                <div className="flex gap-3 mb-3">
                  <div className={`w-16 h-24 rounded-md ${book.cover} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <BookOpen className="w-6 h-6 text-white/90" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{book.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>
                  <Button size="sm" variant="ghost" className="w-full mt-2 group-hover:bg-primary/10">
                    <Play className="w-4 h-4 mr-2" />
                    Continue
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card className="p-4 sticky top-24">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-foreground">Categories</h3>
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary">Show All</Button>
                </div>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === cat.id
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {cat.id === "all" && <Grid3x3 className="w-4 h-4" />}
                        {cat.name}
                      </span>
                      {cat.count && <span className="text-xs opacity-70">({cat.count})</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide text-foreground mb-3">Reading Level</h3>
                <div className="space-y-2">
                  {readingLevels.map((level) => (
                    <div key={level.id} className="flex items-center gap-2">
                      <Checkbox 
                        id={level.id}
                        checked={selectedLevels.includes(level.id)}
                        onCheckedChange={() => toggleLevel(level.id)}
                      />
                      <label 
                        htmlFor={level.id} 
                        className={`text-sm cursor-pointer ${level.color}`}
                      >
                        {level.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Books Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recently-added">Recently Added</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="author">Author</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-1 bg-muted rounded-md p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" : "space-y-3"}>
              {filteredBooks.map((book) => (
                <Card 
                  key={book.id}
                  className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => navigate("/reader")}
                >
                  <div className={`${book.cover} h-48 flex items-center justify-center`}>
                    <BookOpen className="w-12 h-12 text-white/90" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{book.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">by {book.author}</p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          book.level === "beginner" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                          book.level === "intermediate" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" :
                          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {book.level}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {book.duration}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {book.totalTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {book.chapters} chapters
                      </span>
                    </div>

                    <Button size="sm" variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                      <Play className="w-4 h-4 mr-2" />
                      Start Reading
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
