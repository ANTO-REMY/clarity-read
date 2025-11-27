import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import FontSelection from "./pages/FontSelection";
import ColorTheme from "./pages/ColorTheme";
import Library from "./pages/Library";
import Reader from "./pages/Reader";
import ChapterSelection from "./pages/ChapterSelection";
import BookPreview from "./pages/BookPreview";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/font-selection" element={<FontSelection />} />
          <Route path="/color-theme" element={<ColorTheme />} />
          <Route path="/library" element={<Library />} />
          <Route path="/book/:bookId" element={<ChapterSelection />} />
          <Route path="/book-preview/:bookId" element={<BookPreview />} />
          <Route path="/reader/:chapterId" element={<Reader />} />
          <Route path="/reader" element={<Reader />} /> {/* Fallback for existing links */}
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
