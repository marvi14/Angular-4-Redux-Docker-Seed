import { Directive, Input, ElementRef, Renderer } from "@angular/core";
declare var $: any;

@Directive({
    selector: '[smart-validate-form]'
})
export class SmartValidateFormDirective {

    constructor(private element: ElementRef, private renderer: Renderer) {
        setTimeout(() => {
            $(element.nativeElement).find('[smart-validate-input]').each(function () {
                var $input = $(this);

                $input.keypress(() => {
                    setTimeout(() => {
                        $input.valid();
                    });
                });

                $input.blur(() => {
                    $input.valid();
                });

                $input.bind('DOMSubtreeModified', () => {
                    setTimeout(() => {
                        if ($input.val())
                            $input.closest('.label-floating').removeClass('is-empty');
                    });
                });

            });
        });
    }
}