import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../../core/service/account.service";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  form: FormGroup;
  display = false;
  message !: string;

  constructor(private formBuilder: FormBuilder, private accountService : AccountService) {
    this.form = this.formBuilder.group({
      confirmationKeyValue: this.formBuilder.control(null, [Validators.required]),
      newPassword: this.formBuilder.control(null, [Validators.required]),
      confirmedNewPassword: this.formBuilder.control(null, [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  resetPassword() {
    this.accountService.resetPassword(this.form.value).subscribe({
      next:(response) => {
        this.message = response;
        this.display = true;
        this.form.reset();
      },error:(err)=> {
        const errObject = JSON.parse(err.error);
        this.message = errObject.message;
        this.display = true;
      }
    });
  }
}
