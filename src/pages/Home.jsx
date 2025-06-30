import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import { getProdutos } from '../api/produtos';

// Página inicial da aplicação.
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [sortOrder, setSortOrder] = useState('default');
  const [categories, setCategories] = useState([]);

  // Busca os produtos para extrair as categorias.
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getProdutos();
        const uniqueCategories = ['Todas', ...new Set(response.data.map(p => p.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100">
      <Header 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 bg-gradient-to-br from-white via-blue-50 to-purple-50 p-6 rounded-xl shadow-lg border-2 border-gradient-to-r from-blue-200 to-purple-200">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-2">
            Catálogo de Produtos
          </h1>
          <p className="text-gray-700 font-medium">
            Descubra nossos produtos incríveis
          </p>
        </div>
        
        <ProductList 
          selectedCategory={selectedCategory} 
          sortOrder={sortOrder}
        />
      </main>
    </div>
  );
};

export default Home;

