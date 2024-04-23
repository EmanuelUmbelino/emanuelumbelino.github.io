import { FormControl, FormGroup } from "@angular/forms";

export interface Contact {
    name: string;
    email: string;
    message: string;
}

export type ContactControls = { [key in keyof Contact]: FormControl };
export  type ContactFormGroup = FormGroup<ContactControls> & { value: Contact, controls: ContactControls };
