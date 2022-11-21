import { useState } from 'react';
import { Loader } from '../components/Loader';
import { FaEdit, FaTrashAlt, AiOutlineEye } from '../utils/icons';
import Search from './Search';

import '../styles/productList.scss';

const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState('');

  const onChange = e => {
    if (search.length === 0) {
      setSearch('');
    }

    setSearch(e.target.value);
  };

  const shortenText = (text, n) => {
    if (text.length <= n) {
      return text;
    }
    return `${text.slice(0, n)}...`;
  };

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <Search value={search} onChange={e => onChange(e)} />
          </span>
        </div>

        {isLoading && (
          <Loader size={35} borderColor="white" borderTopColor="#007bff" />
        )}

        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>No products found, please add a product.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, index) => {
                  const { id, name, category, price, quantity } = product;
                  return (
                    <tr key={id}>
                      <td>{index + 1}.</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>${price.toLocaleString()}</td>
                      <td>{quantity}</td>
                      <td>${(price * quantity).toLocaleString()}</td>
                      <td className="icons">
                        <span>
                          <AiOutlineEye size={25} color="purple" />
                        </span>
                        <span>
                          <FaEdit size={20} color="green" />
                        </span>
                        <span>
                          <FaTrashAlt size={20} color="red" />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductList;
