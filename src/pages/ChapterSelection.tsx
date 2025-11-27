import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Clock, Play, BookOpen } from "lucide-react";
import { greatGatsbyBook } from "@/lib/audioData";

const ChapterSelection = () => {
    const navigate = useNavigate();
    const { bookId } = useParams();

    // In a real app, we'd fetch the book based on bookId
    // For now, we'll just use our hardcoded Gatsby book if the ID matches
    const book = bookId === "great-gatsby" ? greatGatsbyBook : null;

    if (!book) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4">Book not found</h1>
                <Button onClick={() => navigate("/library")}>Return to Library</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-card border-b border-border sticky top-0 z-10">
                <div className="max-w-3xl mx-auto p-4 sm:p-6">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate("/library")}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <h1 className="text-lg font-semibold text-foreground">Book Details</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto p-4 sm:p-6">
                {/* Book Info */}
                <div className="flex flex-col sm:flex-row gap-6 mb-8">
                    <div className={`w-32 h-48 sm:w-48 sm:h-72 rounded-lg shadow-lg flex-shrink-0 mx-auto sm:mx-0 ${book.cover} flex items-center justify-center`}>
                        <BookOpen className="w-12 h-12 text-white/90" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{book.title}</h2>
                        <p className="text-lg text-muted-foreground mb-4">{book.author}</p>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-6">
                            <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">
                                {book.category}
                            </span>
                            <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium">
                                {book.level}
                            </span>
                            <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {book.totalChapters} Chapters
                            </span>
                        </div>
                        <Button
                            size="lg"
                            className="w-full sm:w-auto"
                            onClick={() => navigate(`/reader/${book.chapters[0].id}`)}
                        >
                            <Play className="w-4 h-4 mr-2" />
                            Start Reading
                        </Button>
                    </div>
                </div>

                {/* Chapters List */}
                <h3 className="text-xl font-semibold mb-4">Chapters</h3>
                <div className="space-y-3">
                    {book.chapters.map((chapter, index) => (
                        <Card
                            key={chapter.id}
                            className="p-4 hover:bg-muted/50 transition-colors cursor-pointer flex items-center justify-between group"
                            onClick={() => navigate(`/reader/${chapter.id}`)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    {index + 1}
                                </div>
                                <div>
                                    <h4 className="font-medium text-foreground">{chapter.title}</h4>
                                    <p className="text-xs text-muted-foreground">{chapter.duration}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <Play className="w-4 h-4" />
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChapterSelection;
