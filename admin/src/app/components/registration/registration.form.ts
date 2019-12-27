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
      firstName: new FormControl(this.model.firstName, {validators: [Validators.required]}),
      lastName: new FormControl(this.model.lastName, {validators: [Validators.required]}),
      email: new FormControl(this.model.email, {validators: [Validators.required, Validators.email]}),
      password: new FormControl(this.model.password, {validators: [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]}),
      confirmPassword: new FormControl(this.model.confirmPassword, {validators: [Validators.required]})
    });

    this.formGroup.valueChanges.subscribe((data: any) => {
      this.model.firstName = data.firstName;
      this.model.lastName = data.lastName;
      this.model.email = data.email;
      this.model.password = data.password;
      this.model.confirmPassword = data.confirmPassword;
    });
  }

  public getControl(name: string) {
    return this.formGroup.get(name);
  }

  public patchForm(data: any): void {
    this.formGroup.patchValue(data);
    Object.keys(data).forEach(field => {
      this.model[field] = data[field];
    });
  }
}
