import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProfileModel } from "./user-profile.model";

export default class UserProfileForm {
  private formBuilder: FormBuilder;
  public formGroup: FormGroup;
  public model: UserProfileModel;

  constructor(model: UserProfileModel) {
    this.formBuilder = new FormBuilder();
    this.model = model;
    this.createForm();
  }

  public createForm() {
    this.formGroup = this.formBuilder.group({
      firstName: new FormControl(this.model.firstName, { validators: [Validators.required]}),
      lastName: new FormControl(this.model.lastName, { validators: [Validators.required]}),
      email: new FormControl(this.model.email, { validators: [Validators.required, Validators.email]}),
      role: new FormControl(this.model.lastName, { validators: [Validators.required]})
    });
  }
}
