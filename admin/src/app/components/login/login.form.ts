import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from './login.model';

export default class LoginForm {
  private formBuilder: FormBuilder;
  public formGroup: FormGroup;
  public model: LoginModel;

  constructor(model: LoginModel) {
    this.formBuilder = new FormBuilder();
    this.model = model;
    this.createForm();
  }

  public createForm() {
    this.formGroup = this.formBuilder.group({
      email: new FormControl(this.model.email, { validators: [Validators.required, Validators.email]}),
      password: new FormControl(this.model.password, { validators: [Validators.required]}),
    });
  }
}
