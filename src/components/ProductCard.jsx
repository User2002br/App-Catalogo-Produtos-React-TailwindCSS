import { Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

// Componente que representa um card de produto na lista.
const ProductCard = ({ produto }) => {
  // Função para formatar o preço para o formato de moeda brasileiro.
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <Link 
      to={`/produto/${produto.id}`} 
      className="block bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gradient-to-r from-blue-200 to-purple-200 h-full flex flex-col transform hover:-translate-y-1 min-w-[160px] max-w-[200px] mx-auto"
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 p-1">
        <img
         src={produto.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'}
         alt={produto.name}
         className="w-[128px] h-[128px] object-cover mx-auto rounded-lg shadow-md border-2 border-gradient-to-r from-blue-300 to-purple-300"
        />
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">
            <Tag className="h-3 w-3 mr-1" />
            {produto.category || 'Sem categoria'}
          </span>
        </div>
      </div>
      
      <div className="p-2 bg-gradient-to-br from-white to-blue-50 flex-grow flex flex-col">
        <div>
          <h3 className="text-xs font-semibold text-blue-800 mb-1 line-clamp-2">
            {produto.name}
          </h3>
          
          <p className="text-gray-700 text-xs mb-2 line-clamp-2">
            {produto.description || 'Descrição não disponível.'}
          </p>
        </div>
        
        <div className="flex items-center mt-auto pt-2">
          <span className="text-base font-bold text-blue-900">
            {formatPrice(produto.price)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
