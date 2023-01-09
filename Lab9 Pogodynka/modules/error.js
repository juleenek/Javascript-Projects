const errorMsg = document.querySelector('.error-msg');

export const createErrorMsg = () => {
  errorMsg.classList.remove('invisible');
};

export const removeErrorMsg = () => {
  errorMsg.classList.add('invisible');
};
