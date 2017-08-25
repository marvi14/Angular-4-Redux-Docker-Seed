import { Injectable } from '@angular/core';
import { PushNotificationsService } from 'angular2-notifications';

@Injectable()
export class PushNotifications {

	private registration: ServiceWorkerRegistration;

	constructor(private _push: PushNotificationsService) { }

	public subscribe() {
		navigator.serviceWorker.register('push-service-worker.js').then((registration) => {
			this.registration = registration;
			this.registration.pushManager.getSubscription().then((subscription) => {
				if (!subscription) {
					const applicationServerKey = this.urlB64ToUint8Array("BLGF5dtnaZIYuCpFR6T-uP12_KQ9ArN40G_k_otq_Lke-iC5Qi7ZWIh65FBizOw0-3IOfx9wYhPAS1UFbjiOqAo");
					this.registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey }).then((subscriptionResult) => {
						this.updateSubscriptionOnServer(subscriptionResult);
						this.handlePushServiceWorker();
					});
				} else {
					this.updateSubscriptionOnServer(subscription);
					this.handlePushServiceWorker();
				}
			});
		}).catch((err) => {
			this.show('Error', 'Service Worker registration failed: ' + err);
		});
	}

	private handlePushServiceWorker() {
		// ensure service worker is ready
		navigator.serviceWorker.ready.then(function (reg) {
			// Inits communication with the Service Worker
			navigator.serviceWorker.controller.postMessage("initServiceWorkerCommunication");
			// listening for messages from service worker
			navigator.serviceWorker.addEventListener('message', function (event) {
				var pushData = event.data;
				alert(pushData.name);
			});
		});
	}

	private urlB64ToUint8Array(base64String) {
		const padding = '='.repeat((4 - base64String.length % 4) % 4);
		const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
		const rawData = window.atob(base64);
		const outputArray = new Uint8Array(rawData.length);
		for (let i = 0; i < rawData.length; ++i) {
			outputArray[i] = rawData.charCodeAt(i);
		}
		return outputArray;
	}

	public show(title, message, callback?) {
		this._push.create(title, { body: message, icon: 'https://docs.nativescript.org/img/cli-getting-started/angular/chapter0/Angular_logo.png' }).subscribe(
			res => setTimeout(() => res.notification.close(), 5000),
			err => console.log(err)
		);
	}

	public unsubscribe() {
		if (this.registration) {
			this.registration.pushManager.getSubscription().then((subscription) => {
				if (subscription) {
					subscription.unsubscribe();
					this.updateSubscriptionOnServer(null);
				}
			});
		}
	}

	private updateSubscriptionOnServer(subscription) {
		// TODO: Send subscription to application server
		console.log(JSON.stringify(subscription));
	}

	//In case we want to do something when the user click the push, we must implement a callback and pass it to the subscrive
	// onNotificationShown(res, callback) {
	// 	setTimeout(() => res.notification.close(), 5000);
	// 	res.notification.onclick(function(){
	// 		console.log('click en la push');
	// 	});
	// }

}