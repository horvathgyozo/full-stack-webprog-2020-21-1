import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
	selector: '[appNameFormat]'
})
export class NameFormatDirective {

	constructor(
		private control: NgControl
	) { }

	@HostListener('input',['$event']) onEvent($event) {
		let str: string = this.control.value;
		this.control.control.setValue(this.setNameFormat(str));
	}

	private setNameFormat(str: string): string {
		str = str.charAt(0).toUpperCase() + str.slice(1);
		if (str.indexOf(' ') > 0 || str.indexOf('-') > 0) {
			for (let i=1; i<str.length; i++) {
				if ((str.charAt(i-1) === ' ' || str.charAt(i-1) === '-') && str.charAt(i) !== str.charAt(i).toUpperCase()) {
					str = str.slice(0,i) + str.charAt(i).toUpperCase() + str.slice(i+1);
				}
			}
		}
		return str;
	}

}
