(() => {
    'use strict';
    const FORM_SELECTOR = '[data-coffee-order="form"]';
    const CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    const PAYMENT_FORM_SELECTOR = '[data-payment-order="form"]';
    let $ = window.jQuery;
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
    // once initial html DOM has loaded then run this clause to load the payment html form
    $(document).ready(() => {
        // for FormHandler to detect payment form element on load run callback function
        $('#paymentForm').load('../payment-form.html', () => {
            // execute after post-processing and html insertion performed - instantiate new FormHandler for payment form
            let paymentHandler = new FormHandler(PAYMENT_FORM_SELECTOR);
            paymentHandler.addSubmitHandler(data => {
                let title = data?.title ? data.title : '';
                const description = 'Thank you for your payment, ' + title + ' ' + data.username;
                let $div = $('<div></div>', {
                    'class': 'modal',
                    'id': 'payment-modal',
                });
                let $p = $('<p></p>');
                $p.append(description);
                $div.append($p);
                $div.append('<a href="#" rel="modal:close">Done</a>');

                $($div).modal();
            });
        });
    });

})(window);