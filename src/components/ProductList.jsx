import { useState, useEffect } from 'react';
import { getProdutos } from '../api/produtos';
import ProductCard from './ProductCard';
import { Loader2, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Componente que exibe a lista de produtos, agora controlado por props.
const ProductList = ({ selectedCategory, sortOrder }) => {
  const [produtos, setProdutos] = useState([]);
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProdutos();
  }, []);

  useEffect(() => {
    filterAndSortProdutos();
  }, [produtos, selectedCategory, sortOrder]);

  const fetchProdutos = async () => {
    try {
      setLoading(true);
      const response = await getProdutos();
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os produtos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProdutos = () => {
    let processedProdutos = [...produtos];

    if (selectedCategory && selectedCategory !== 'Todas') {
      processedProdutos = processedProdutos.filter(produto => produto.category === selectedCategory);
    }

    if (sortOrder === 'price-desc') {
      processedProdutos.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'price-asc') {
      processedProdutos.sort((a, b) => a.price - b.price);
    }

    setFilteredProdutos(processedProdutos);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
        <div className="flex items-center space-x-2 bg-white p-6 rounded-xl shadow-lg border-2 border-gradient-to-r from-blue-200 to-purple-200">
          <Loader2 className="h-8 w-8 animate-spin bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Carregando produtos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {filteredProdutos.length > 0 ? (
        filteredProdutos.map(produto => (
          <ProductCard key={produto.id} produto={produto} />
        ))
      ) : (
        <div className="col-span-full text-center py-12">
            <Package className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhum produto encontrado</h3>
            <p className="mt-1 text-sm text-gray-500">Tente ajustar seus filtros.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
