(function (window) {
    'use strict';
    const FORM_SELECTOR = '[data-coffee-order="form"]';
    const CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    let App = window.App;
    let Truck = App.Truck;
    let DataStore = App.DataStore;
    let FormHandler = App.FormHandler;
    let CheckList = App.CheckList;

    let truck = new Truck('ncc-1701', new DataStore());
    window.truck = truck;

    let checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(truck.deliverOrder.bind(truck));
    let formHandler = new FormHandler(FORM_SELECTOR);
    formHandler.addSubmitHandler(data => {
        truck.createOrder.call(truck, data);
        checkList.addRow.call(checkList, data);
    });

    console.log(formHandler);
})(window);