
import Header from '../components/Header';
import ProductForm from '../components/ProductForm';

// Página para editar um produto existente.
const EditProduct = () => {
  return (
    <div>
      <Header />
      {/* O formulário de produto é reutilizado aqui, com a propriedade isEdit=true. */}
      <ProductForm isEdit={true} />
    </div>
  );
};

export default EditProduct;
