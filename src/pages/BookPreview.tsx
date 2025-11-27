import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Bell, Star, Lock, BookOpen, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { allBooks } from "@/lib/bookData";

const BookPreview = () => {
    const navigate = useNavigate();
    const { bookId } = useParams();

    const book = allBooks.find(b => b.id === bookId) || {
        title: "Book Not Found",
        author: "Unknown Author",
        cover: "bg-gray-500",
        description: "The requested book could not be found.",
        rating: 0,
        reviews: 0,
        releaseDate: "Unknown"
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className={`absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full ${book.cover} opacity-20 blur-[100px] animate-pulse`} />
                <div className={`absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full ${book.cover} opacity-20 blur-[100px] animate-pulse delay-1000`} />
            </div>

            {/* Header */}
            <div className="relative z-10 p-6">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/library")}
                    className="hover:bg-background/50 backdrop-blur-sm"
                >
                    <ChevronLeft className="w-6 h-6" />
                </Button>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto w-full">

                {/* Glass Card */}
                <div className="relative group perspective-1000">
                    <div className={`w-48 h-72 sm:w-64 sm:h-96 rounded-xl shadow-2xl ${book.cover} flex items-center justify-center mb-8 transform transition-transform duration-500 group-hover:rotate-y-12 group-hover:scale-105 relative z-20`}>
                        <BookOpen className="w-16 h-16 text-white/90 drop-shadow-md" />

                        {/* Lock Overlay */}
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Lock className="w-12 h-12 text-white/90" />
                        </div>
                    </div>

                    {/* Reflection/Shadow */}
                    <div className={`absolute -bottom-8 left-4 right-4 h-4 bg-black/20 blur-xl rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-500`} />
                </div>

                <div className="space-y-6 max-w-lg mx-auto">
                    <div className="space-y-2">
                        <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary border-primary/20 backdrop-blur-md">
                            Premium Content
                        </Badge>
                        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
                            {book.title}
                        </h1>
                        <p className="text-xl text-muted-foreground font-medium">
                            by {book.author}
                        </p>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                        {book.description}
                    </p>

                    <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="font-semibold text-foreground">{book.rating}</span>
                            <span>({book.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{book.releaseDate}</span>
                        </div>
                    </div>

                    <Card className="p-6 bg-card/50 backdrop-blur-xl border-primary/10 shadow-xl mt-8">
                        <div className="flex flex-col items-center gap-4">
                            <div className="text-center">
                                <h3 className="font-semibold text-lg mb-1">Coming Soon to Clarity Read</h3>
                                <p className="text-sm text-muted-foreground">
                                    We're currently processing this title with our active reading engine.
                                </p>
                            </div>
                            <Button size="lg" className="w-full sm:w-auto gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                                <Bell className="w-4 h-4" />
                                Notify Me When Available
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default BookPreview;
