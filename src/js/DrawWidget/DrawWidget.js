import './DrawWidget.css';

export default class DrawWidget {
  constructor(container = null) {
    this.container = container;
    this.drawWidget();
    this.drawPopup();
  }

  drawWidget() {
    this.widget = document.createElement('div');
    this.widget.classList.add('widget');
    this.widget.innerHTML = ` <div class="widget-header">
                                <h1 class="title-widget">
                                  Товары
                                </h1>
                                <div class="add-item"></div>
                              </div>
                              <div class="widget-content">
                                <ul class="widget-list">
                                  <li class="item row-head">
                                    <div class="item-title item-name">
                                      <p>Название</p>
                                    </div>
                                    <div class="item-title item-cost">
                                      Стоимость
                                    </div>
                                    <div class="item-title item-action">
                                      Действия
                                    </div>
                                  </li>
                                  <li>
                                    <ul class="data">
                                    </ul>
                                  </li>
                                </ul>
                              </div>`;
    document.body.appendChild(this.widget);
    this.rowData = document.querySelector('.data');
  }

  drawWidgetList(list) {
    this.rowData.innerHTML = '';
    for (const i of list) {
      const li = document.createElement('li');
      li.classList.add('item', 'row-data');
      li.dataset.name = i.name.toLowerCase();
      li.dataset.cost = i.cost;
      li.innerHTML = `<div class="item-title name">
                        <p class="name-text text"></p>
                      </div>
                      <div class="item-title cost">
                        <p class="cost-text text"></p>
                      </div>
                      <div class="item-title action">
                        <div class="edit-item"></div>
                        <div class="delete-item"></div>
                      </div>`;
      this.rowData.appendChild(li);

      const name = li.querySelector('.name-text');
      name.textContent = i.name;

      const cost = li.querySelector('.cost-text');
      cost.textContent = this.drawNumberFormat(i.cost);
    }
  }

  drawPopup() {
    this.popup = document.createElement('div');
    this.popup.classList.add('popup', 'disable');//

    this.form = document.createElement('form');
    this.form.classList.add('form');
    this.form.setAttribute('novalidate', true);
    this.form.innerHTML = `<div class="input-container name-container">
                            <label class="label" for="input-name">Название</label>
                            <input type="text" class="input input-name" id="input-name" required> 
                          </div>
                          <div class="input-container cost-container">
                            <label class="label" for="input-cost">Стоимость</label>
                            <input type="text" class="input input-cost" id="input-cost" required> 
                          </div>
                          <div class="button-container">
                            <button class="button save">Coхранить</button>
                            <button class="button cancel">Отмена</button>
                          </div>`;

    this.popup.appendChild(this.form);
    document.body.appendChild(this.popup);

    this.inputName = document.querySelector('.input-name');
    this.inputCost = document.querySelector('.input-cost');
    this.buttonSave = document.querySelector('.save');
    this.buttonCancel = document.querySelector('.cancel');
  }

  closePopup() {
    this.form.reset();
    delete this.form.dataset.type;
    this.popup.classList.add('disable');
  }

  openPopup(valueDataSet) {
    this.form.dataset.type = valueDataSet;
    this.popup.classList.remove('disable');
  }

  drawNumberFormat(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');// Сознаюсь!! регулярку подсмотрел в интернете!
  }
}
