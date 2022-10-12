const NumberText = ({ number, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{number}</h3>
      <p
        className="--color-white"
        style={{
          opacity: 0.7,
        }}
      >
        {text}
      </p>
    </div>
  );
};
export default NumberText;
