
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://68571fd521f5d3463e54823d.mockapi.io/catalog'
});

// Buscar todos os produtos
export const getProdutos = () => api.get('/produtos');

// Buscar um produto por ID
export const getProdutoById = (id) => api.get(`/produtos/${id}`);

// Criar novo produto
export const createProduto = (data) => api.post('/produtos', data);

// Atualizar produto
export const updateProduto = (id, data) => api.put(`/produtos/${id}`, data);

// Deletar produto
export const deleteProduto = (id) => api.delete(`/produtos/${id}`);
