import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserPasswordModel } from "./user-profile.model";

export default class UserPasswordForm {
  private formBuilder: FormBuilder;
  public formGroup: FormGroup;
  public model: UserPasswordModel;

  constructor(model: UserPasswordModel) {
    this.formBuilder = new FormBuilder();
    this.model = model;
    this.createForm();
  }

  public createForm() {
    this.formGroup = this.formBuilder.group({
      password: new FormControl(this.model.password, { validators: [Validators.required, Validators.minLength(5)]}),
      confirmPassword: new FormControl(this.model.confirmPassword, { validators: [Validators.required, Validators.minLength(5)]}),
    });
  }
}
