(() => {
    'use strict';
    let App = window.App || {};

    class Truck {
        constructor(truckId, db) {
            console.log('truck constructor');
            this.truckId = truckId;
            this.db = db;
        }
        createOrder(order) {
            console.log('Adding order for ', order.emailAddress);
            this.db.add(order.emailAddress, order);
        }
        deliverOrder(customerId) {
            console.log('Delivered order for ', this.db.get(customerId), ' ', customerId);
            this.db.remove(customerId);
        }
        printOrders() {
            let customerIdArray = Object.keys(this.db.getAll());
            console.log('Truck # ', this.truckId, ' has pending orders: ');
            customerIdArray.forEach(id => {
                console.log(this.db.get(id));
            });
        }

        static runTests(truck) {
            truck.createOrder({
                emailAddress: 'dr@no.com',
                coffee: 'decaf'
            });
            truck.createOrder({
                emailAddress: 'me@goldfinger.com',
                coffee: 'double mocha'
            });
            truck.createOrder({
                emailAddress: 'm@bond.com',
                coffee: 'earl grey'
            });
            truck.printOrders();

            truck.deliverOrder('m@bond.com');
            truck.deliverOrder('dr@no.com');
            truck.printOrders();

            truck.deliverOrder('me@bond.com');
            truck.printOrders();
        }
    }

    App.Truck = Truck;
    window.App = App;

})(window);