import "./back-to-top.styles.css";

export const BackToTop = ({ visibility }) => {
  console.log('VISIBILITY: ', visibility);
  return (
    visibility && (
      <a href="#main-header"
        className="back-to-top"
        title="Back to Top"></a>
    )
  );
};
