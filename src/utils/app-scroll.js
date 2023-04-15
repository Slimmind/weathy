export function appScroll(scrolled) {
  const currentScrollPos = window.pageYOffset;
  let prevScrollPos = scrolled;

  if (prevScrollPos > currentScrollPos) {
    console.log('UP');
  } else {
    console.log('DOWN');
  }

  prevScrollPos = currentScrollPos;
}
