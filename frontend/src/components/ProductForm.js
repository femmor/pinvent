import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import '../styles/ProductForm.scss';
import Card from './Card';

const ProductForm = ({
  product,
  imagePreview,
  description,
  setDescription,
  handleChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
    <div className="add-product">
      <Card cardClass={'card'}>
        <form onSubmit={saveProduct}>
          <Card cardClass={'group'}>
            <label htmlFor="product-image">Product Image</label>
            <code className="--color-dark">
              Supported formats: jpeg, jpg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={e => handleImageChange(e)}
            />
            {imagePreview === null ? (
              <p>No image set for this product</p>
            ) : (
              <div className="image-preview">
                <img src={imagePreview} alt="product" />
              </div>
            )}
          </Card>
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product?.name}
            onChange={e => handleChange(e)}
          />
          <label htmlFor="product-category">Product Category:</label>
          <input
            type="text"
            name="category"
            placeholder="Product Category"
            value={product?.category}
            onChange={e => handleChange(e)}
          />
          <label htmlFor="product-price">Product Price:</label>
          <input
            type="text"
            name="price"
            placeholder="Product Price"
            value={product?.price}
            onChange={e => handleChange(e)}
          />
          <label htmlFor="product-quantity">Product Quantity:</label>
          <input
            type="text"
            name="quantity"
            placeholder="Product Quantity"
            value={product?.quantity}
            onChange={e => handleChange(e)}
          />
          <label htmlFor="product-description">Product Description:</label>
          <ReactQuill
            tabIndex={0}
            placeholder="Enter product description..."
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['clean'],
  ],
};

ProductForm.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'color',
  'background',
  'align',
  'list',
  'indent',
];

export default ProductForm;
