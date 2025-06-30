
import Header from '../components/Header';
import ProductForm from '../components/ProductForm';

// Página para criar um novo produto.
const NewProduct = () => {
  return (
    <div>
      <Header />
      {/* O formulário de produto é reutilizado aqui. */}
      <ProductForm />
    </div>
  );
};

export default NewProduct;
