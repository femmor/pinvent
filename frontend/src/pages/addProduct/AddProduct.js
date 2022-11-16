import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { ProductForm } from '../../components';
import { selectIsLoading } from '../../redux/features/product/productSlice';
import { createProduct } from '../../redux/features/product/productSlice';

const initialState = {
  name: '',
  category: '',
  quantity: '',
  price: '',
};

const AddProduct = () => {
  const [product, setProduct] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);
  const [productImage, setProductImage] = useState('');
  const [description, setDescription] = useState('');

  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Destructure initial product state
  const { name, category, quantity, price } = product;

  // Handle input change
  const handleInputChange = e => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle image change
  const handleImageChange = e => {
    const imgUrl = e.target.files[0];
    setProductImage(imgUrl);
    setImagePreview(URL.createObjectURL(imgUrl));
  };

  // Generate product sku
  const generateProductSku = category => {
    const startLetter = `${category.slice(0, 3).toUpperCase()}`;
    const uniqueNumber = Date.now();
    const sku = `${startLetter}-${uniqueNumber}`;
    return sku;
  };

  // Save product
  const saveProduct = async e => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', name);
    formData.append('category', category);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('sku', generateProductSku(category));
    formData.append('image', productImage);

    console.log(...formData);

    dispatch(createProduct(formData));

    navigate('/dashboard');
  };

  return (
    <div className="add-product">
      <h3 className="--mt">Add New Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        isLoading={isLoading}
        setDescription={setDescription}
        handleChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};
export default AddProduct;
