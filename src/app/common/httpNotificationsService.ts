import { Injectable } from '@angular/core';
declare var $: any;

@Injectable()
export class HttpNotificationsService {
    //private type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];
    constructor() { }

    public showErrorNotification(error) {
        $.notify({
            icon: "notifications",
            message: error
        }, {
                type: 'danger',
                timer: 3000,
                placement: {
                    from: 'bottom',
                    align: 'right'
                }
            });

        //hack to change the notification icon
        setTimeout(() => {
            $('.alert-danger').addClass('alert-with-icon');
            $('span.notifications').replaceWith('<i data-notify="icon" class="material-icons">warning</i>');
        });
    }

    public showNotification(msg) {
        $.notify({
            icon: "notifications",
            message: msg
        }, {
                type: 'success',
                timer: 3000,
                placement: {
                    from: 'bottom',
                    align: 'right'
                }
            });

        //hack to change the notification icon
        setTimeout(() => {
            $('.alert-success').addClass('alert-with-icon');
            $('span.notifications').replaceWith('<i data-notify="icon" class="material-icons">thumb_up</i>');
        });
    }

}