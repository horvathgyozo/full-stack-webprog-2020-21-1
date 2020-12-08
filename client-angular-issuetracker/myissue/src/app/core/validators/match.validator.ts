import { AbstractControl } from '@angular/forms';

export class MatchValidation {
    static MatchPassword(abstractControl: AbstractControl) {
		let field = abstractControl.get('password').value;
		let fieldConfirm = abstractControl.get('passwordConfirm').value;
		if (field != fieldConfirm) {
			abstractControl.get('passwordConfirm').setErrors({MatchPassword: true});
		} else {
			abstractControl.get('passwordConfirm').setErrors(null);
			return null;
		}
	}

}
