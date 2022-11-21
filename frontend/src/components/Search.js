import { BiSearch } from '../utils/icons';

import styles from '../styles/Search.module.scss';

const Search = ({ value, onChange }) => {
  return (
    <div className={styles.search}>
      <BiSearch size={18} className={styles.icon} />
      <input
        type="text"
        name="search"
        value={value}
        placeholder="Search products..."
        onChange={onChange}
      />
    </div>
  );
};
export default Search;
