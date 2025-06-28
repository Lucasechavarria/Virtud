import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BookingPlatform from "./components/BookingPlatform"; // Import BookingPlatform
import { auth } from "./firebaseConfig"; // Import auth
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged
import { useEffect, useState } from "react"; // Import useEffect and useState

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState<any | null>(null); // State to hold the authenticated user
  const [loadingAuth, setLoadingAuth] = useState(true); // State to track auth loading

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  if (loadingAuth) {
    // Optionally render a loading spinner or placeholder while auth state is determined
    return <div>Cargando...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="virtud-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Render BookingPlatform if user is authenticated, otherwise render Index */}
              <Route path="/" element={user ? <BookingPlatform /> : <Index />} />
              {/* Redirect authenticated users from login/register routes if they exist */}
              {/* <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} /> */}
              {/* <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} /> */}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
 );
}

export default App;
