import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../core/service/authentication.service";
import {AccountService} from "../../../core/service/account.service";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  form: FormGroup;
  display = false;
  message!: string;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService) {
    this.form = this.formBuilder.group({
      emailAddress: this.formBuilder.control(null, [Validators.required]),
    })
  }

  ngOnInit(): void {

  }

  forgotPassword() {
    this.accountService.forgotPassword(this.form.value.emailAddress).subscribe({
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
