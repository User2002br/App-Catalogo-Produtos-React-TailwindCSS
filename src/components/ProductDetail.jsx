import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProdutoById, deleteProduto } from '../api/produtos';
import { ArrowLeft, Tag, Trash2, Edit, Loader2, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getValidationPayload } from '../utils/auth';

// Componente para exibir os detalhes de um produto.
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  // Obtém o payload de validação para verificar as permissões do usuário.
  const payload = getValidationPayload();
  const clearance = payload?.clearance;
  // Estados para o produto, carregamento e exclusão.
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // Efeito para buscar o produto quando o ID na URL muda.
  useEffect(() => {
    fetchProduto();
  }, [id]);

  // Função para buscar os dados do produto da API.
  const fetchProduto = async () => {
    try {
      setLoading(true);
      const response = await getProdutoById(id);
      setProduto(response.data);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      toast({
        title: "Erro",
        description: "Produto não encontrado",
        variant: "destructive",
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  // Função para deletar o produto.
  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja deletar este produto?')) {
      return;
    }

    try {
      setDeleting(true);
      await deleteProduto(id);
      toast({
        title: "Sucesso",
        description: "Produto deletado com sucesso!",
      });
      navigate('/');
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      toast({
        title: "Erro",
        description: "Não foi possível deletar o produto",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  // Função para formatar o preço para o formato de moeda brasileiro.
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  // Exibe um indicador de carregamento enquanto os dados são buscados.
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 flex items-center justify-center">
        <div className="flex items-center space-x-2 bg-white p-6 rounded-xl shadow-lg border-2 border-gradient-to-r from-blue-200 to-purple-200">
          <Loader2 className="h-8 w-8 animate-spin bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Carregando produto...</span>
        </div>
      </div>
    );
  }

  // Exibe uma mensagem se o produto não for encontrado.
  if (!produto) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg border-2 border-gradient-to-r from-blue-200 to-purple-200">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-2">Produto não encontrado</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Voltar à lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 mb-6 transition-colors font-semibold"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar à lista
        </button>

        <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-xl shadow-2xl overflow-hidden border-2 border-gradient-to-r from-blue-200 to-purple-200">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2 bg-gradient-to-br from-blue-100 to-purple-100 p-4">
              <img
                src={produto.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                alt={produto.name}
                className="h-48 md:h-80 w-full object-cover rounded-xl shadow-lg border-4 border-gradient-to-r from-blue-300 to-purple-300"
              />
            </div>
            
            <div className="p-8 md:w-1/2 bg-gradient-to-br from-white to-purple-50">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 mb-3 shadow-lg">
                    <Tag className="h-4 w-4 mr-1" />
                    {produto.category}
                  </span>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-2">
                    {produto.name}
                  </h1>
                </div>
                
                {/* Renderiza os botões de editar e deletar apenas para administradores. */}
                {clearance === 'admin' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/editar/${produto.id}`)}
                      className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      title="Editar produto"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="p-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105"
                      title="Deletar produto"
                    >
                      {deleting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Trash2 className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  {formatPrice(produto.price)}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-3">Descrição</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                  {produto.description}
                </p>
              </div>

              {/* Botão de comprar para usuários não-admin */}
              {clearance !== 'admin' && (
                <div className="mt-8">
                  <button
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Comprar Agora
                  </button>
                </div>
              )}

              <div className="border-t border-gradient-to-r from-blue-200 to-purple-200 pt-6 mt-8 bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ID do Produto:</span>
                    <p className="text-gray-900 font-semibold">{produto.id}</p>
                  </div>
                  <div>
                    <span className="font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Categoria:</span>
                    <p className="text-gray-900 font-semibold">{produto.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
