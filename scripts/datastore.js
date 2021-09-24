(function (window) {
    'use strict';
    let App = window.App || {};
    class DataStore {
        constructor() {
            console.log('running the Datastore function');
            this.data = {};
        }
        add(key, val) { this.data[key] = val; }
        get(key) { return this.data[key]; }
        remove(key) { delete this.data[key]; }
        getAll() { return this.data; }
    }

    App.DataStore = DataStore;
    window.App = App;
})(window);