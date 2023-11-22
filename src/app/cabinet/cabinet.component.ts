import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent {
  public name!:string;
  public lastName!:string;
  public email!:string;
  public auth = getAuth();

  constructor(public router: Router) {}


  ngOnInit() {
      const user:any = JSON.parse(localStorage.getItem('currentUser') || '{}');
      console.log('currentUser', user);
      this.name = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
  }

  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/']);
      localStorage.removeItem('currentUser');
      window.location.reload();
    }).catch((e) => {
      console.error(e);
    });
  }
}
