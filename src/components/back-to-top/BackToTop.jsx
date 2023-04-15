import { useEffect, useRef } from 'react';
import "./back-to-top.styles.css";

export const BackToTop = () => {
  const btnRef = useRef(null);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log('CLICK');
  };

  // const handleScroll = () => {
  //   console.log('POSITION: ', window.scrollY);
  //   if (window.scrollY > 200) {
  //     btnRef.current.classList.add('visible');
  //   } else {
  //     btnRef.current.classList.remove('visible');
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <button
      ref={btnRef}
      className="back-to-top"
      title="Back to Top"
      onClick={handleClick}></button>
  );
};
