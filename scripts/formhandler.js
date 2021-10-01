(() => {
    'use strict';
    let App = window.App || {};
    let $ = window.jQuery;

    class FormHandler {
        constructor(selector) {
            if (!selector) {
                throw new Error('No selector provided');
            }
            this.$formElement = $(selector);

            if (this.$formElement.length === 0) {
                throw new Error('Could not find element with selector: ', selector);
            }
        }

        addSubmitHandler(fn) {
            this.$formElement.on('submit', function (event) {
                event.preventDefault();
                let data = {};

                $(this).serializeArray().forEach(item => {
                    data[item.name] = item.value;
                });
                console.log(data);
                fn(data);
                this.reset();
                this.elements[0].focus();
            });
        }
    }
    App.FormHandler = FormHandler;
    window.App = App;
})(window);