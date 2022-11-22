import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../redux/features/product/productSlice';
import useRedirectLoggedOut from '../hooks/useRedirectLoggedOut';
import { selectIsLoggedIn } from '../redux/features/auth';
import { useEffect } from 'react';
import { DashboardSummary, ProductList } from '../components';

const Dashboard = () => {
  useRedirectLoggedOut('/login');
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { isLoading, isError, message, products } = useSelector(
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
      <DashboardSummary products={products} />
      <ProductList products={products} isLoading={isLoading} />
    </div>
  );
};
export default Dashboard;
