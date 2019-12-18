import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationModel } from './registration.model';

export default class RegistrationForm {
  private formBuilder: FormBuilder;
  public formGroup: FormGroup;
  public model: RegistrationModel;

  constructor(model: RegistrationModel) {
    this.formBuilder = new FormBuilder();
    this.model = model;
    this.createForm();
  }

  public createForm() {
    this.formGroup = this.formBuilder.group({
      firstName: new FormControl(this.model.firstName, { validators: [Validators.required]}),
      lastName: new FormControl(this.model.lastName, { validators: [Validators.required]}),
      email: new FormControl(this.model.email, { validators: [Validators.required, Validators.email]}),
      password: new FormControl(this.model.password, { validators: [Validators.required, Validators.minLength(5)]}),
      role: new FormControl(this.model.role, { validators: [Validators.required]}),
    });
  }
}
