import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduto, updateProduto, getProdutoById } from '../api/produtos';
import { ArrowLeft, Save, Loader2, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Formulário para criar ou editar um produto.
const ProductForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  
  // Estados para controle de carregamento e dados do formulário.
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(isEdit);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: ''
  });
  
  // Estado para erros de validação.
  const [errors, setErrors] = useState({});

  // Lista de categorias disponíveis.
  const categorias = [
    'Eletrônicos',
    'Roupas',
    'Casa e Jardim',
    'Esportes',
    'Livros',
    'Beleza',
    'Outros'
  ];

  // Efeito para buscar os dados do produto se estiver no modo de edição.
  useEffect(() => {
    if (isEdit && id) {
      fetchProduto();
    }
  }, [isEdit, id]);

  // Função para buscar um produto específico da API.
  const fetchProduto = async () => {
    try {
      setLoadingProduct(true);
      const response = await getProdutoById(id);
      const produto = response.data;
      setFormData({
        name: produto.name || '',
        price: produto.price || '',
        description: produto.description || '',
        image: produto.image || '',
        category: produto.category || ''
      });
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o produto",
        variant: "destructive",
      });
      navigate('/');
    } finally {
      setLoadingProduct(false);
    }
  };

  // Manipulador de mudança para os campos do formulário.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Função para validar o formulário antes do envio.
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.price) {
      newErrors.price = 'Preço é obrigatório';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Preço deve ser um número positivo';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    if (!formData.category) {
      newErrors.category = 'Categoria é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manipulador de envio do formulário.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      const produtoData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      // Chama a função de update ou create dependendo do modo.
      if (isEdit) {
        await updateProduto(id, produtoData);
        toast({
          title: "Sucesso",
          description: "Produto atualizado com sucesso!",
        });
      } else {
        await createProduto(produtoData);
        toast({
          title: "Sucesso",
          description: "Produto criado com sucesso!",
        });
      }

      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      toast({
        title: "Erro",
        description: `Não foi possível ${isEdit ? 'atualizar' : 'criar'} o produto`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Exibe um indicador de carregamento enquanto o produto está sendo buscado.
  if (loadingProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 flex items-center justify-center">
        <div className="flex items-center space-x-2 bg-white p-6 rounded-xl shadow-lg border-2 border-gradient-to-r from-blue-200 to-purple-200">
          <Loader2 className="h-8 w-8 animate-spin bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Carregando produto...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 mb-6 transition-colors font-semibold"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar à lista
        </button>

        <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-xl shadow-2xl p-6 border-2 border-gradient-to-r from-blue-200 to-purple-200">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-6">
            {isEdit ? 'Editar Produto' : 'Novo Produto'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-2">
                Nome do Produto *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gradient-to-br from-white to-blue-50 ${
                  errors.name ? 'border-red-500' : 'border-blue-300'
                }`}
                placeholder="Digite o nome do produto"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-2">
                Preço *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gradient-to-br from-white to-blue-50 ${
                  errors.price ? 'border-red-500' : 'border-blue-300'
                }`}
                placeholder="0.00"
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-2">
                Categoria *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gradient-to-br from-white to-blue-50 ${
                  errors.category ? 'border-red-500' : 'border-blue-300'
                }`}
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-2">
                URL da Imagem
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Image className="h-5 w-5 text-purple-500" />
                </div>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gradient-to-br from-white to-blue-50"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
              <p className="mt-1 text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Cole o link de uma imagem para o produto (opcional)
              </p>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-2">
                Descrição *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gradient-to-br from-white to-blue-50 ${
                  errors.description ? 'border-red-500' : 'border-blue-300'
                }`}
                placeholder="Descreva o produto..."
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-2 border-2 border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-lg hover:from-gray-100 hover:to-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <Save className="h-5 w-5 mr-2" />
                )}
                {isEdit ? 'Atualizar' : 'Criar'} Produto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
