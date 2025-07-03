import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "@/components/PrivateRoute"; // Import PrivateRoute
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BookingPlatform from "./components/BookingPlatform"; // Import BookingPlatform
import UserProfile from "@/components/UserProfile"; // Import UserProfile
import InscripcionForm from "./components/InscripcionForm"; // Importar el nuevo componente

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="virtud-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Rutas públicas */}
              <Route path="/" element={<Index />} />
              <Route path="/inscripcion" element={<InscripcionForm />} /> {/* Nueva ruta para el formulario de inscripción */}

              {/* Rutas protegidas */}
              <Route path="/booking" element={<PrivateRoute><BookingPlatform /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />

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
