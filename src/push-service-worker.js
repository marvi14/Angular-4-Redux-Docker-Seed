self.addEventListener('push', function (event) {
    const title = '4iiz';
    const options = {
        body: 'Incoming Call',
        icon: 'assets/img/angular2-logo.png',
        data: event.data.text()
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    //send to Angular service the push payload
    angularClient.postMessage(JSON.parse(event.notification.data));
});

let angularClient;
self.addEventListener('message', event => {
    // if message is a "initServiceWorkerCommunication" string, we store the client sent the message into angularClient variable
    if (event.data == "initServiceWorkerCommunication") {
        angularClient = event.source;
    }
});