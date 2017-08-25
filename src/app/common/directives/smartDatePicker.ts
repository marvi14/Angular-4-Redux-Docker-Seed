import { Directive, Input, ElementRef, Renderer } from "@angular/core";
declare var $: any;

@Directive({
    selector: '[smart-datepicker]'
})
export class SmartDatepickerDirective {
    private domElement: any;
    private datepickerOptions: any = {
        format: 'MM/DD/YYYY',
        icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-chevron-up",
            down: "fa fa-chevron-down",
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right',
            today: 'fa fa-screenshot',
            clear: 'fa fa-trash',
            close: 'fa fa-remove'
        }
    };

    constructor(private element: ElementRef, private renderer: Renderer) {
        this.domElement = element.nativeElement;
        setTimeout(() => {
            if (this.domElement.attributes.format)
                this.datepickerOptions.format = this.domElement.attributes.format.nodeValue;

            $(this.domElement).datetimepicker(this.datepickerOptions).on("dp.change", (event) => {
                let inputEvent = new Event("input", { bubbles: true });
                this.renderer.invokeElementMethod(this.domElement, "dispatchEvent", [inputEvent]);
            });
        });
    }
}

@Directive({
    selector: '[minDate]'
})
export class MinDateDirective {
    private domElement: any;
    @Input() set minDate(min: any) {
        setTimeout(() => {
            if (min) {
                $(this.domElement).data("DateTimePicker").minDate(min);
            }
        });
    }

    constructor(private element: ElementRef, private renderer: Renderer) {
        this.domElement = element.nativeElement;
    }
}

@Directive({
    selector: '[maxDate]'
})
export class MaxDateDirective {
    private domElement: any;
    @Input() set maxDate(max: any) {
        setTimeout(() => {
            if (max) {
                $(this.domElement).data("DateTimePicker").maxDate(max);
            }
        });
    }

    constructor(private element: ElementRef, private renderer: Renderer) {
        this.domElement = element.nativeElement;
    }
}