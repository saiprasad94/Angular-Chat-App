import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { $ } from 'protractor';
import { Alert } from 'src/app/classes/alert';
import { AlertType } from 'src/app/enums/alert-type.enum';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm : FormGroup;

  constructor(private fb: FormBuilder, private alertservice:AlertService) { 
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm():void {
    this.signupForm = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required,Validators.email]],
        password: ['',[Validators.required,Validators.minLength(8)]]
    })
  }

  public submit():void{
    if (this.signupForm.valid){
      const{firstName,lastName,email,password} = this.signupForm.value;
    console.log(`FirstName: ${firstName}, LastName: ${lastName}Email: ${email}, Password: ${password}`);


    } else {
      const failedSignUpAlert = new Alert('your signup details are invalied',AlertType.Danger);
      this.alertservice.alerts.next(failedSignUpAlert);
    }

    
  }

}
