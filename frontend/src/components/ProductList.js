import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from '../redux/features/product/filterSlice';
import { Loader } from '../components/Loader';
import { FaEdit, FaTrashAlt, AiOutlineEye } from '../utils/icons';
import Search from './Search';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert';

import '../styles/productList.scss';
import {
  deleteProduct,
  getAllProducts,
} from '../redux/features/product/productSlice';

const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState('');

  const filteredProducts = useSelector(selectFilteredProducts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const delProduct = id => {
    dispatch(deleteProduct(id));
    dispatch(getAllProducts());
  };

  const confirmDelete = id => {
    confirmAlert({
      title: 'Delete Product',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => delProduct(id),
        },
        {
          label: 'Cancel',
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  // Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = e => {
    const newOffset = (e.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };

  // Filtered Products
  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

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
                {currentItems?.map((product, index) => {
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
                          <AiOutlineEye
                            size={25}
                            color="purple"
                            onClick={() => navigate(`/products/${id}`)}
                          />
                        </span>
                        <span>
                          <FaEdit
                            size={20}
                            color="green"
                            onClick={() => navigate(`/edit-product/${id}`)}
                          />
                        </span>
                        <span onClick={() => confirmDelete(id)}>
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
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};
export default ProductList;
