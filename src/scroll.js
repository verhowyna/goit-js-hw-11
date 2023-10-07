const input = document.querySelector(".search-input");

export const btnUp = document.querySelector('.go-up');
btnUp.addEventListener('click', () => {
   window.scrollTo(0, 0);
   input.value = "";
});