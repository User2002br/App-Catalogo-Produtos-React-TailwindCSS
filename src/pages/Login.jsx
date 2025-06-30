import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Componente da página de Login.
const Login = () => {
  // Estado para os campos de nome e senha.
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  // Função para lidar com o envio do formulário de login.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Busca o usuário na API com base no nome e senha.
      const response = await fetch(
        `https://68571fd521f5d3463e54823d.mockapi.io/catalog/users?name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        toast({ title: 'Sucesso', description: 'Login realizado com sucesso' });
        // generate validation signature
        const generateSignature = (length) => {
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.';
          let sig = '';
          for (let i = 0; i < length; i++) {
            sig += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          return sig;
        };
        const signature = generateSignature(1024);
        const payload = { signature, clearance: data[0].clearance };
        // Armazena o payload de validação em um cookie.
        document.cookie = `account_validation_signature=${btoa(JSON.stringify(payload))}; path=/;`;
        navigate('/');
      } else {
        toast({
          title: 'Erro',
          description: 'Nome ou senha inválidos',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha no login, tente novamente',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-xl shadow-2xl p-6 border-2 border-gradient-to-r from-blue-200 to-purple-200">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-2">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border-2 border-blue-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gradient-to-br from-white to-blue-50 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border-2 border-blue-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gradient-to-br from-white to-blue-50 px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;