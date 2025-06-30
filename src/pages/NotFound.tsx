import { useLocation } from "react-router-dom";
import { useEffect } from "react";

// Componente para a página 404 (Não Encontrado).
const NotFound = () => {
  const location = useLocation();

  // Efeito para logar no console a rota não encontrada que o usuário tentou acessar.
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
      <div className="text-center bg-gradient-to-br from-white via-blue-50 to-purple-50 p-8 rounded-xl shadow-2xl border-2 border-gradient-to-r from-blue-200 to-purple-200">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6 font-medium">Oops! Página não encontrada</p>
        <a 
          href="/" 
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Voltar ao Início
        </a>
      </div>
    </div>
  );
};

export default NotFound;
