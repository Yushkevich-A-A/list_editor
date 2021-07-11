import './WidgetError.css';

export default class WidgetError {
  constructor() {}

  createError(element, textError) {
    element.focus();
    const error = document.createElement('div');
    error.className = 'form-error';
    error.textContent = textError;
    element.offsetParent.appendChild(error);
    error.style.top = `${element.offsetTop + element.offsetHeight}px`;
    error.style.left = `${element.offsetLeft + element.offsetWidth / 2 - error.offsetWidth / 2}px`;
  }

  deleteError() {
    const error = document.querySelector('.form-error');
    if (error) {
      error.parentElement.removeChild(error);
    }
  }
}
