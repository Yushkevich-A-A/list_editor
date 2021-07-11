!function(){"use strict";const t=new class{constructor(t=null){this.container=t,this.init()}init(){null!=this.container&&(this.drawWidget(),this.drawPopup())}drawWidget(){this.widget=document.createElement("div"),this.widget.classList.add("widget"),this.widget.innerHTML=' <div class="widget-header">\n                                <h1 class="title-widget">\n                                  Товары\n                                </h1>\n                                <div class="add-item"></div>\n                              </div>\n                              <div class="widget-content">\n                                <ul class="widget-list">\n                                  <li class="item row-head">\n                                    <div class="item-title item-name">\n                                      <p>Название</p>\n                                    </div>\n                                    <div class="item-title item-cost">\n                                      Стоимость\n                                    </div>\n                                    <div class="item-title item-action">\n                                      Действия\n                                    </div>\n                                  </li>\n                                  <li>\n                                    <ul class="data">\n                                    </ul>\n                                  </li>\n                                </ul>\n                              </div>',this.container.appendChild(this.widget),this.rowData=document.querySelector(".data")}drawWidgetList(t){this.rowData.innerHTML="";for(const e of t){const t=document.createElement("li");t.classList.add("item","row-data"),t.dataset.name=e.name.toLowerCase(),t.dataset.cost=e.cost,t.innerHTML='<div class="item-title name">\n                        <p class="name-text text"></p>\n                      </div>\n                      <div class="item-title cost">\n                        <p class="cost-text text"></p>\n                      </div>\n                      <div class="item-title action">\n                        <div class="edit-item"></div>\n                        <div class="delete-item"></div>\n                      </div>',this.rowData.appendChild(t),t.querySelector(".name-text").textContent=e.name,t.querySelector(".cost-text").textContent=this.drawNumberFormat(e.cost)}}drawPopup(){this.popup=document.createElement("div"),this.popup.classList.add("popup","disable"),this.form=document.createElement("form"),this.form.classList.add("form"),this.form.setAttribute("novalidate",!0),this.form.innerHTML='<div class="input-container name-container">\n                            <label class="label" for="input-name">Название</label>\n                            <input type="text" class="input input-name" id="input-name" required> \n                          </div>\n                          <div class="input-container cost-container">\n                            <label class="label" for="input-cost">Стоимость</label>\n                            <input type="text" class="input input-cost" id="input-cost" required> \n                          </div>\n                          <div class="button-container">\n                            <button class="button save">Coхранить</button>\n                            <button class="button cancel">Отмена</button>\n                          </div>',this.popup.appendChild(this.form),this.container.appendChild(this.popup),this.inputName=document.querySelector(".input-name"),this.inputCost=document.querySelector(".input-cost"),this.buttonSave=document.querySelector(".save"),this.buttonCancel=document.querySelector(".cancel")}closePopup(){this.form.reset(),delete this.form.dataset.type,this.popup.classList.add("disable")}openPopup(t){this.form.dataset.type=t,this.popup.classList.remove("disable")}drawNumberFormat(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")}}(document.body),e=new class{constructor(){}createError(t,e){t.focus();const i=document.createElement("div");i.className="form-error",i.textContent=e,t.offsetParent.appendChild(i),i.style.top=`${t.offsetTop+t.offsetHeight}px`,i.style.left=t.offsetLeft+t.offsetWidth/2-i.offsetWidth/2+"px"}deleteError(){const t=document.querySelector(".form-error");t&&t.parentElement.removeChild(t)}},i=new class{constructor(){}windowConfirm(t){const e=document.createElement("div");e.className="window-confirm-wrapper",e.innerHTML='<div class="window-confirm">\n                                  <div class="window-question">Вы уверены?</div>\n                                  <div class="confirm-buttons">\n                                    <button class=\'window-button button-conf\'>Да</button>\n                                    <button class=\'window-button button-canc\'>Нет</button>\n                                  </div>\n                                </div>',document.body.appendChild(e);const i=document.querySelector(".window-confirm");i.style.top=t.offsetTop+t.offsetHeight/2-i.offsetHeight/2+"px",i.style.left=t.offsetLeft+t.offsetWidth/2-i.offsetWidth/2+"px"}windowHid(){const t=document.querySelector(".window-confirm-wrapper");t&&t.parentElement.removeChild(t)}};new class{constructor(t,e,i){this.confirmDelete=i,this.error=e,this.widget=t,this.arr=[{name:"iphone6",cost:5e4},{name:"MI",cost:9e3}],this.init()}init(){this.drawList(),this.addListeners()}drawList(){this.widget.drawWidgetList(this.arr)}addListeners(){document.addEventListener("click",(t=>{t.preventDefault(),t.target.closest(".cancel")&&this.widget.closePopup(),t.target.closest(".add-item")&&this.widget.openPopup("add"),t.target.closest(".save")&&(this.error.deleteError(),this.checkValidate()),t.target.closest(".edit-item")&&this.drawEditPopup(t.target.closest(".row-data")),t.target.closest(".delete-item")&&(this.deleteElement=t.target.closest(".row-data"),this.confirmDelete.windowConfirm(this.deleteElement)),t.target.closest(".button-conf")&&(this.delete(this.deleteElement),this.confirmDelete.windowHid()),t.target.closest(".button-canc")&&(this.deleteElement=null,this.confirmDelete.windowHid())}))}delete(t){const e=this.arr.findIndex((e=>e.name===t.dataset.name));this.arr.splice(e,1),this.deleteElement=null,this.drawList()}addItem(){const t={};t.name=this.widget.inputName.value,t.cost=+this.widget.inputCost.value,this.arr.push(t),this.drawList()}editItem(){this.editElement.name=this.widget.inputName.value,this.editElement.cost=+this.widget.inputCost.value,this.drawList()}drawEditPopup(t){this.editElement=this.arr.find((e=>e.name.toLowerCase()===t.dataset.name)),this.widget.openPopup("edit"),this.widget.inputName.value=this.editElement.name,this.widget.inputCost.value=this.editElement.cost}submitItem(t){const{type:e}=t.dataset;"add"===e&&this.addItem(),"edit"===e&&this.editItem(),this.widget.closePopup()}checkValidate(){const{form:t}=this.widget,e=[...t.elements].find((t=>!t.validity.valid));if(e)return void this.error.createError(e,"Поле не должно быть пустым");const{inputCost:i}=this.widget;isNaN(+i.value)?this.error.createError(i,"Введите число"):0!=+i.value?+i.value>5e9?this.error.createError(i,"Не вводите космические числа"):this.submitItem(t):this.error.createError(i,"Введите число больше 0")}}(t,e,i)}();