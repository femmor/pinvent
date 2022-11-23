import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useRedirectLoggedOut from '../hooks/useRedirectLoggedOut';
import { selectIsLoggedIn } from '../redux/features/auth';
import { getProduct } from '../redux/features/product/productSlice';
import { Card } from '../components';
import { Loader } from '../components/Loader';
import DOMPurify from 'dompurify';

import '../styles/ProductDetail.scss';

const ProductDetails = () => {
  useRedirectLoggedOut('/login');
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { isLoading, isError, message, product } = useSelector(
    state => state.product
  );

  const { id } = useParams();

  const dispatch = useDispatch();

  const stockStatus = num => {
    if (parseInt(num) === 0) {
      return <span className="--color-danger">Out of stock</span>;
    }
    return <span className="--color-success">In stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProduct(id));
    }
    if (isError) {
      console.log(message);
    }
  }, [dispatch, id, isLoggedIn, isError, message]);

  return (
    <div className="product-detail">
      <h3 className="--mt">Product Details</h3>
      <Card cardClass="card">
        {isLoading && (
          <Loader size={35} borderColor="white" borderTopColor="#007bff" />
        )}
        {product && (
          <div className="detail">
            <Card cardClass="group">
              {product?.image ? (
                <img
                  className="product-image"
                  src={product.image.filePath}
                  alt={product.image.fileName}
                />
              ) : (
                <p>This product has no image</p>
              )}
            </Card>
            <h4>Availability: {stockStatus(product.quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Name:</span> &nbsp; {product.name}
            </h4>
            <p>
              <b>SKU:</b> {product.sku}
            </p>
            <p>
              <b>Category:</b> {product.category}
            </p>

            <p>
              <b>Price:</b> ${product.price}
            </p>

            <p>
              <b>Quantity in Stock:</b> {product.quantity}
            </p>

            <p>
              <b>Total Value in Stock:</b> $
              {(product.quantity * product.price).toLocaleString()}
            </p>
            <hr />
            <div>
              <h4>Product Description:</h4>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description),
                }}
              ></p>
            </div>
            <hr />
            <code className="--color-dark">
              Created on: {product.createdAt.toLocaleString('en-US')}
            </code>
            <br />
            <code className="--color-dark">
              Last updated on: {product.updatedAt.toLocaleString('en-US')}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};
export default ProductDetails;
