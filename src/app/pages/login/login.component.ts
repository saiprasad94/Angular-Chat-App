import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { $ } from 'protractor';
import { Alert } from 'src/app/classes/alert';
import { AlertType } from 'src/app/enums/alert-type.enum';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup;
  private subscriptions: Subscription[] = [];
  private returnUrl : string;

  constructor(
    private fb: FormBuilder, 
    private alertService: AlertService,
    private loadingService:LoadingService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) { 
    this.createForm();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/chat';
  }

  private createForm():void {
    this.loginForm = this.fb.group({
        email: ['', [Validators.required,Validators.email]],
        password: ['',[Validators.required,Validators.minLength(8)]]
    })
  }

  public submit():void{
    

    if (this.loginForm.valid){
      this.loadingService.isLoading.next(true);
      const{email,password} = this.loginForm.value;

      this.subscriptions.push(
        this.auth.login(email, password).subscribe(success =>{
          if (success){
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.loadingService.isLoading.next(false);
          }
        })
      );
      
      
    } else{
      const failedLoginAlert = new Alert('your email or password is invalied', AlertType.Danger);
      setTimeout(() =>{
        this.loadingService.isLoading.next(false);
        this.alertService.alerts.next(failedLoginAlert);
      },2000);
      
    }

    
  }

}
