import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
declare var $: any;

@Injectable()
export class FormValidations {

    constructor(private translate: TranslateService) { }

    init() {
        this.extendValidations();

        setTimeout(() => {
            $.extend($.validator.messages, {
                required: this.translate.instant('ERROR_REQUIRED_FIELD'),
                email: this.translate.instant('VALIDATOR_MESSAGE_EMAIL'),
                singleword: this.translate.instant('VALIDATOR_MESSAGE_SINGLEWORD'),
                confirmPassword: this.translate.instant('VALIDATOR_CONFIRM_PASSWORD')
            });
        });

        $.validator.setDefaults({
            highlight: (element, errorClass) => {
                // This is for waiting for all directives to finish before attaching the
                // validations to fields, so if you have *ngIf over a fields for example,
                // it will wait till the field is displayed or not.
                setTimeout(() => {
                    $(element).parent().addClass('has-error');
                });
            },
            unhighlight: (element) => {
                $(element).parent().removeClass('state-error');
                $(element).parent().removeClass('has-error');
                if ($(element).is(":radio")) {
                    setTimeout(() => {
                        $(element).parents('.radios-container').find('.radio label').css('color', 'rgba(0,0,0, 0.26)');
                        $(element).parents('.radios-container').find('.radio .circle').css('border', '1px solid rgba(0,0,0, .54)');
                    });
                }
            },
            errorPlacement: (error, element) => {
                if (element.is(":radio")) {
                    error.appendTo(element.parents('.radios-container'));
                    error.css('color', 'red');
                    setTimeout(() => {
                        $('.radio label').css('color', 'red');
                        $('.radio .circle').css('border', '1px solid rgba(255,0,0,0.6)')
                    });
                }
                else { // This is the default behavior 
                    error.insertAfter(element);
                    if (element.is('select')) {
                        setTimeout(() => {
                            $(element).change(function (element) {
                                $(this).valid();
                            });
                        });
                    }
                }
            }
        });
    }

    extendValidations() {
        //this is how we create a custom validation
        $.validator.addMethod('singleword', function (value, element, param) {
            var words = value.split(' ');
            return words.length == 1;
        });

        $.validator.addMethod('email', function (value, element) {
            return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{3,})$/i.test(value);
        });

        $.validator.addMethod('pmregex', function (value, element, regex) {
            if (regex) {
                var reg = new RegExp(regex, 'i');
                return reg.test(value);
            } else {
                return true;
            }
        }, function (params, element) {
            return element.attributes.pmregexmessage.value;
        });

        $.validator.addMethod('confirmPassword', function (value, element, password) {
            if (password) {
                return password === value;
            } else {
                return false;
            }
        });
    }

}