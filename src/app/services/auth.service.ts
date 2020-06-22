import { Observable, of } from 'rxjs';
import {AlertType} from './../enums/alert-type.enum';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../classes/user';
import {AlertService} from './alert.service';
import {Alert} from './../classes/alert';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser : Observable<User | null>;

  constructor(
    private router:Router,
    private alertService: AlertService
  ) { 
    this.currentUser = of(null);
  }

  public sigup(firstName: String, lastName: string ,emial: string,password: string): Observable<boolean>{
    return of(true);
  }

  public login( email: string, password: string ): Observable<boolean>{
    return of(true);
  }

  public logout(): void{
    this.router.navigate(['/login']);
    this.alertService.alerts.next(new Alert('sucessfullly logedout',AlertType.Success))
  }

}
