import { useDispatch, useSelector } from 'react-redux';
import {
  CALC_STORE_VALUE,
  selectTotalStoreValue,
} from '../redux/features/product/productSlice';
import {
  AiFillDollarCircle,
  BsCart4,
  BsCartX,
  BiCategory,
} from '../utils/icons';
import '../styles/DashboardSummary.scss';
import InfoBox from './InfoBox';
import { useEffect } from 'react';

const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

const DashboardSummary = ({ products }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
  }, [dispatch, products]);

  return (
    <div className="dashboard-summary">
      <h3 className="--mt">Inventory Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={productIcon}
          title="Total Products"
          count={products.length}
          bgColor="card1"
        />
        <InfoBox
          icon={earningIcon}
          title="Total Store Value "
          count={`$${totalStoreValue.toLocaleString()}`}
          bgColor="card2"
        />
        <InfoBox
          icon={outOfStockIcon}
          title="Out of Stock"
          count={0}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title="All Categories"
          count={0}
          bgColor="card4"
        />
      </div>
    </div>
  );
};
export default DashboardSummary;
