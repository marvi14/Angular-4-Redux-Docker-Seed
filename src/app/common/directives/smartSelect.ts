import { Directive, Input, ElementRef, Renderer, Output, EventEmitter } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
declare var $: any;

@Directive({
    selector: '[smart-select]',
    exportAs: 'smartSelect'
})
export class SmartSelectDirective {
    private domElement: any;
    @Output() onItemSelect = new EventEmitter();
    @Output() onDataSourceChange = new EventEmitter();
    @Input() set dataSource(elements: any) {
        setTimeout(() => {
            if (elements) {
                $(this.domElement).selectpicker('refresh');
                this.onDataSourceChange.emit();
            }
        });
    }

    @Input() set limit(amount: number) {
        setTimeout(() => {
            if (amount) {
                $(this.domElement).on('change', () => {
                    this.disableItems(amount);
                });
            }
        });
    }

    private disableItems(amount) {
        // Get selected options.
        var selectedOptions = $('#' + this.domElement.id + ' option:selected');
        if (selectedOptions.length >= amount) {
            // Disable all other options.
            var nonSelectedOptions = $('#' + this.domElement.id + ' option').filter(function () {
                return !$(this).is(':selected');
            });

            nonSelectedOptions.each((val, element) => {
                var li = this.getItemFromOption(element);
                li.addClass('disabled');
            });
        }
        else {
            // Enable all options.
            $('#' + this.domElement.id + ' option').each((val, element) => {
                var li = this.getItemFromOption(element);
                li.removeClass('disabled');
            });
        }
    }

    constructor(private element: ElementRef, private renderer: Renderer, private translate: TranslateService) {
        this.domElement = element.nativeElement;
        setTimeout(() => {
            $(this.domElement).selectpicker();
            $('.bs-searchbox input').attr("placeholder", translate.instant('SEARCH'));

            if (this.domElement.attributes.multiple) {
                $(this.domElement).on('change', () => {
                    var selected = $(this.domElement).val();
                    this.onItemSelect.emit(selected);
                });
            }
        });
    }

    public selectItems(values) {
        $(this.domElement).selectpicker('val', values);

        if (this.domElement.attributes['ng-reflect-limit'])
            this.disableItems(parseInt(this.domElement.attributes['ng-reflect-limit'].textContent));
    }

    private getItemFromOption(element) {
        var searchTerm;
        if (element.innerText.split('-').length > 1) {
            var chapterPage = element.innerText.split('-')[0].trim();
            var chapterNumber = element.innerText.split('-')[1].trim();
            searchTerm = chapterPage + ' - ' + chapterNumber;
        } else {
            searchTerm = element.innerText;
        }
        return $($(this.domElement).parent()).find("span:contains('" + searchTerm + "')").closest("li");
    }
}