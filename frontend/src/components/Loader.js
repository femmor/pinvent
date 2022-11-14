import '../styles/Loader.scss';
import ReactDOM from 'react-dom';

export const Loader = ({ size, borderColor, borderTopColor }) => {
  return ReactDOM.createPortal(
    <div className="loader-container">
      <div
        size={size}
        className="loader"
        style={{
          border: `3px solid ${borderColor}`,
          borderTopColor: `${borderTopColor}`,
        }}
      ></div>
    </div>,
    document.getElementById('loader')
  );
};

export const Spinner = () => {
  return (
    <div className="loader">
      <div className="loader-container">
        <div className="loader" />
        <div className="loader" />
        <div className="loader" />
      </div>
    </div>
  );
};
