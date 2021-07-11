import './WidgetWindowConfirm.css';

export default class WidgetWindowConfirm {
  constructor() {
  }

  windowConfirm(deleteBlock) {
    const windowConfirm = document.createElement('div');
    windowConfirm.className= 'window-confirm-wrapper';
    windowConfirm.innerHTML = `<div class="window-confirm">
                                  <div class="window-question">Вы уверены?</div>
                                  <div class="confirm-buttons">
                                    <button class='window-button button-conf'>Да</button>
                                    <button class='window-button button-canc'>Нет</button>
                                  </div>
                                </div>` ;

    document.body.appendChild(windowConfirm);

    const confirmWindow = document.querySelector('.window-confirm');

    confirmWindow.style.top = `${deleteBlock.offsetTop + deleteBlock.offsetHeight /2 - confirmWindow.offsetHeight /2 }px`;
    confirmWindow.style.left = `${deleteBlock.offsetLeft + deleteBlock.offsetWidth /2 - confirmWindow.offsetWidth /2 }px`;

  }

  windowHid() {
    const windowConfirm = document.querySelector('.window-confirm-wrapper');
    if (windowConfirm) {
      windowConfirm.parentElement.removeChild(windowConfirm);
    }
  }
}