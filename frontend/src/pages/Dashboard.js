import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../components/Loader';
import {
  selectIsLoading,
  selectIsSuccess,
  selectIsError,
  selectMessage,
  selectProducts,
} from '../redux/features/product/productSlice';
import { getAllProducts } from '../redux/features/product/productSlice';
import useRedirectLoggedOut from '../hooks/useRedirectLoggedOut';

const Dashboard = () => {
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  useRedirectLoggedOut('/login');
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
};
export default Dashboard;
