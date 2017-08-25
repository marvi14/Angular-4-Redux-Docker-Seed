import { Injectable } from '@angular/core';
declare var swal: any;

@Injectable()
export class SweetAlertService {

	constructor() { }

	public showInformationMessage(title, message) {
		swal(title, message, 'question');
	}

	public showSuccessMessage(title, message) {
		swal(title, message, 'success');
	}

	public showErrorMessage(title, message) {
		swal(title, message, 'error');
	}

	public showConfirmationMessage(title, message, callback?, error?) {
		swal({
			title: title,
			text: message,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sure!',
			cancelButtonText: 'Cancel'
		}).then(function () {
			callback();
		}, function (dismiss) {
			error();
		});
	}

}