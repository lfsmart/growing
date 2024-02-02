
window.addEventListener('DOMContentLoaded', () => {
  const inputDom = document.querySelector( '#input' );
  const val = localStorage.getItem( 'name' );
  inputDom.value = val;
});