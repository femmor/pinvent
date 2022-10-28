const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="--flex-center --py2">
      <p>All rights reserved &copy; {year}</p>
    </div>
  );
};
export default Footer;
