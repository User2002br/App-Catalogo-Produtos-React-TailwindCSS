import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import NewProduct from "./pages/NewProduct";
import EditProduct from "./pages/EditProduct";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

// Cria uma instância do QueryClient para o React Query.
const queryClient = new QueryClient();

// Componente principal da aplicação.
const App = () => (
  // Provedor do React Query para gerenciamento de estado do servidor.
  <QueryClientProvider client={queryClient}>
    {/* Provedor para habilitar tooltips em toda a aplicação. */}
    <TooltipProvider>
      {/* Componentes para exibir notificações (toasts). */}
      <Toaster />
      <Sonner />
      {/* Provedor de roteamento para a aplicação. */}
      <BrowserRouter>
        <Routes>
          {/* Definição das rotas da aplicação. */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProductPage />} />
          <Route path="/novo" element={<NewProduct />} />
          <Route path="/editar/:id" element={<EditProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
