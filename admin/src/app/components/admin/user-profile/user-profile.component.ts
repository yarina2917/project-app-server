import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationModel } from '../../registration/registration.model';
import { roles } from '../user';
import RegistrationForm from '../../registration/registration.form';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public model: RegistrationModel;
  public form: RegistrationForm;
  public updateInfo: string = '';
  public userInfo = null;
  public roles = roles;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.usersService.getOne(data.id)
        .subscribe(res => {
          console.log('res', res)
          this.userInfo = res;
          this.model = new RegistrationModel();
          this.form = new RegistrationForm(this.userInfo);
        });
    });
  }

  public update() {
    this.usersService.update(this.form.formGroup.value, this.userInfo._id)
      .subscribe(
        () => this.updateInfo = 'Information was updated',
        (err) => {
          console.log(err)
          this.updateInfo = err.error.message
        }
      );
  }

}
