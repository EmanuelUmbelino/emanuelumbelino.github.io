import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactControls, ContactFormGroup } from '@modules/portfolio/models/contact.model';
import { mail } from '@env/mail';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  form: ContactFormGroup = new FormGroup<ContactControls>({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required),
  }) as ContactFormGroup;

  get mailString() {
    const subject = `Hi, I'm ${this.form.value.name}`;
    return `mailto:${mail.senderEmail}?Subject=${subject}&body=${this.form.value.message}`;
  }
}
