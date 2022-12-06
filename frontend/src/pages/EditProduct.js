import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { ProductForm } from '../components';
import {
  getAllProducts,
  getProduct,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from '../redux/features/product/productSlice';
import { Loader } from '../components/Loader';

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const productEdit = useSelector(selectProduct);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  // Handles image preview, product image and description
  useEffect(() => {
    setProduct(productEdit);
    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ''
    );
  }, [productEdit]);

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

  const [product, setProduct] = useState(productEdit);
  const [imagePreview, setImagePreview] = useState(null);
  const [productImage, setProductImage] = useState('');
  const [description, setDescription] = useState('');

  // Save product
  const saveProduct = async e => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', product?.name);
    formData.append('category', product?.category);
    formData.append('quantity', product?.quantity);
    formData.append('price', product?.price);
    formData.append('description', description);
    if (productImage) {
      formData.append('image', productImage);
    }

    dispatch(updateProduct({ id, formData }));

    // Refresh all products
    dispatch(getAllProducts());

    navigate('/dashboard');
  };

  return (
    <>
      {isLoading && (
        <Loader size={35} borderColor="white" borderTopColor="#007bff" />
      )}
      <h3 className="--mt">Edit Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </>
  );
};
export default EditProduct;
