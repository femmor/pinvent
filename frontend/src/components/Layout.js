import { Header, Footer } from '../components';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div
        style={{
          minHeight: '80vh',
        }}
        className="--pad"
      >
        {children}
      </div>
      <Footer />
    </>
  );
};
export default Layout;
