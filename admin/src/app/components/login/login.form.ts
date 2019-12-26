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
      email: new FormControl(this.model.email, {validators: [Validators.required, Validators.email]}),
      password: new FormControl(this.model.password, {validators: [Validators.required, Validators.minLength(5)]}),
    });

    this.formGroup.valueChanges.subscribe((data: any) => {
      this.model.email = data.email;
      this.model.password = data.password;
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
