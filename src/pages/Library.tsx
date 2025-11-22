import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Settings, Search, BookOpen, Clock, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    progress: 45,
    duration: "4h 30m",
    cover: "bg-gradient-to-br from-amber-400 to-orange-500",
    lastRead: "2 days ago"
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    progress: 12,
    duration: "6h 15m",
    cover: "bg-gradient-to-br from-blue-400 to-cyan-500",
    lastRead: "1 week ago"
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    progress: 78,
    duration: "5h 45m",
    cover: "bg-gradient-to-br from-red-400 to-pink-500",
    lastRead: "Today"
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    progress: 0,
    duration: "7h 20m",
    cover: "bg-gradient-to-br from-purple-400 to-indigo-500",
    lastRead: "Not started"
  },
];

const Library = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Library</h1>
            <p className="text-sm text-muted-foreground">4 books in progress</p>
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate("/settings")}
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="max-w-4xl mx-auto px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search your library..." 
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>
      </div>

      {/* Book List */}
      <div className="max-w-4xl mx-auto p-4 space-y-3">
        {books.map((book) => (
          <Card 
            key={book.id}
            className="p-4 cursor-pointer hover:border-primary/50 transition-all"
            onClick={() => navigate("/reader")}
          >
            <div className="flex gap-4">
              {/* Book Cover */}
              <div className={`w-20 h-28 rounded-md ${book.cover} flex items-center justify-center flex-shrink-0 shadow-md`}>
                <BookOpen className="w-8 h-8 text-white/80" />
              </div>

              {/* Book Info */}
              <div className="flex-1 min-w-0 space-y-2">
                <div>
                  <h3 className="font-semibold text-lg text-card-foreground truncate">
                    {book.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {book.author}
                  </p>
                </div>

                {/* Progress Bar */}
                {book.progress > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{book.progress}% complete</span>
                      <span>{book.duration}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {book.progress === 0 && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{book.duration}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-muted-foreground">
                    {book.lastRead}
                  </span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add New Book Button */}
      <div className="max-w-4xl mx-auto px-4 pb-6 pt-2">
        <Button variant="outline" className="w-full h-12">
          + Add New Book
        </Button>
      </div>
    </div>
  );
};

export default Library;
