import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../components/Loader';
import { getAllProducts } from '../redux/features/product/productSlice';
import useRedirectLoggedOut from '../hooks/useRedirectLoggedOut';
import { selectIsLoggedIn } from '../redux/features/auth';
import { useEffect } from 'react';
import { ProductList } from '../components';

const Dashboard = () => {
  useRedirectLoggedOut('/login');
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { isLoading, isSuccess, isError, message, products } = useSelector(
    state => state.product
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [dispatch, isLoggedIn, isError, message]);

  return (
    <div>
      <h2>Dashboard</h2>
      <ProductList />
    </div>
  );
};
export default Dashboard;
