import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signOut } from "firebase/auth";

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent {
  public auth = getAuth();

  constructor(public router: Router) {}

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
