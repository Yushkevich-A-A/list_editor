import './WidgetController.css';

export default class WidgetController {
  constructor(widget, error, confirm) {
    this.confirmDelete = confirm;
    this.error = error;
    this.widget = widget;
    this.arr = [
      {name: 'iphone6', cost: 50000},
      {name: 'MI', cost: 9000}
    ];
    this.init();
  }

  init() {
    this.drawList();
    this.addListeners()
  }

  drawList() {
    this.widget.drawWidgetList(this.arr);
  }

  addListeners() {
    document.addEventListener('click', event => {
      event.preventDefault();
      if(event.target.closest('.cancel')) {
        this.widget.closePopup();
      }
      if(event.target.closest('.add-item')) {
        this.widget.openPopup('add');
      }
      if(event.target.closest('.save')) {
        this.error.deleteError();
        this.checkValidate();
      }
      if(event.target.closest('.edit-item')) {
        this.drawEditPopup(event.target.closest('.row-data'));
      }
      if(event.target.closest('.delete-item')) {
        this.deleteElement = event.target.closest('.row-data');
        this.confirmDelete.windowConfirm(this.deleteElement);
      }
      if(event.target.closest('.button-conf')) {
        this.delete(this.deleteElement);
        this.confirmDelete.windowHid();
      }
      if(event.target.closest('.button-canc')) {
        this.deleteElement = null;
        this.confirmDelete.windowHid();
      }
    });
  }

  delete(element) {
    const index = this.arr.findIndex( item => item.name === element.dataset.name)
    this.arr.splice(index, 1);
    this.deleteElement = null;
    this.drawList();
  }

  addItem() {
    const obj = {};
    obj.name = this.widget.inputName.value;
    obj.cost = +this.widget.inputCost.value;
    this.arr.push(obj);
    this.drawList();
  }

  editItem() {
    this.editElement.name = this.widget.inputName.value;
    this.editElement.cost = +this.widget.inputCost.value;
    this.drawList();
  }

  drawEditPopup(element) {
    this.editElement = this.arr.find(item => item.name.toLowerCase() === element.dataset.name);
    this.widget.openPopup('edit');
    this.widget.inputName.value = this.editElement.name;
    this.widget.inputCost.value = this.editElement.cost;
  }

  submitItem(form) {
    const type = form.dataset.type;
    if (type === 'add') {
      this.addItem();
    }
    if (type === 'edit') {
      this.editItem();
    }
    this.widget.closePopup();
  }

  checkValidate() {
    const form = this.widget.form;
    const first= [...form.elements].find(item=>!item.validity.valid);
    if (first) {
      this.error.createError(first, 'Поле не должно быть пустым');
      return;
    }
    const inputCost = this.widget.inputCost
    if (isNaN(+inputCost.value)) {
      this.error.createError(inputCost, 'Введите число');
      return;
    }
    if (+inputCost.value === 0) {
      this.error.createError(inputCost, 'Введите число больше 0');
      return;
    }
    if (+inputCost.value > 5000000000) {
      this.error.createError(inputCost, 'Не вводите космические числа');
      return;
    }
    this.submitItem(form);
  }
}