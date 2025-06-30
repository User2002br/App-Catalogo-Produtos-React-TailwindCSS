import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Plus, Filter, ArrowDownUp } from 'lucide-react';
import { getValidationPayload } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// Componente do cabeçalho da aplicação.
const Header = ({ categories, selectedCategory, onCategoryChange, sortOrder, onSortChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // Obtém o payload de validação para verificar as permissões do usuário.
  const payload = getValidationPayload();
  const clearance = payload?.clearance;

  // Função para fazer logout, limpando os cookies de autenticação.
  const handleLogout = () => {
    document.cookie = 'account_validation_signature=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'account_clearance=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/login');
  };

  // Efeito para redirecionar para a página de login se não houver assinatura de validação.
  useEffect(() => {
    if (!payload?.signature) navigate('/login');
  }, [payload]);

  const categoryButtonClasses = (category) => 
    `px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap shadow-md ${
      selectedCategory === category 
      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105' 
      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 transform hover:scale-105'
    }`;

  // Mostra os filtros apenas na página inicial.
  const showFilters = location.pathname === '/';

  return (
    <header className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 shadow-lg border-b-2 border-gradient-to-r from-blue-200 to-purple-200 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-all duration-200 transform hover:scale-105">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
              TailBuy
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {/* Botão para adicionar novo produto, visível apenas para administradores. */}
            {clearance === 'admin' && (
              <Link
                to="/novo"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg border border-blue-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Produto
              </Link>
            )}
            {/* Botão de Sair ou Login, dependendo do estado de autenticação. */}
            {clearance ? (
              <button 
                onClick={handleLogout} 
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg border border-blue-300"
              >
                Sair
              </button>
            ) : (
              <button 
                onClick={() => navigate('/login')} 
                className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
              >
                Login
              </button>
            )}
          </div>
        </div>
        {/* Barra de Filtros e Ordenação */}
        {showFilters && categories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-4 py-3 border-t border-blue-100">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <Filter className="h-5 w-5 text-blue-600 flex-shrink-0" />
                {categories.map(category => (
                  <button 
                    key={category} 
                    onClick={() => onCategoryChange(category)}
                    className={categoryButtonClasses(category)}
                  >
                    {category}
                  </button>
                ))}
            </div>
            <div className="flex items-center flex-shrink-0">
                <ArrowDownUp className="h-5 w-5 text-purple-600 mr-2" />
                <select 
                    value={sortOrder} 
                    onChange={(e) => onSortChange(e.target.value)}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="default">Padrão</option>
                    <option value="price-asc">Menor Preço</option>
                    <option value="price-desc">Maior Preço</option>
                </select>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
