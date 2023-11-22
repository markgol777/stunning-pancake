import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from 'src/app/login-modal/login-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private dialogRef: MatDialog, private translate: TranslateService) {
    const language = localStorage.getItem('language') || '{}';
    this.translate.setDefaultLang(language);
  }
  public login!: any;
  public loginText = 'Вхід';

  ngOnInit(): void {
    this.changeText()
  }

  switchLanguage(language: any) {
    this.translate.use(language.target.value);
    localStorage.setItem('language', language.target.value);
  }

  openDialog() {
    this.dialogRef.open(LoginModalComponent)
  }

  changeText() {
    const currentUser: any = JSON.parse(`${localStorage.getItem('currentUser')}`);
    if (currentUser && currentUser.role === 'ADMIN') {
      this.loginText = 'admin';
      this.login = '/admin'
    } else if (currentUser && currentUser.role === 'USER') {
      this.loginText = 'cabinet';
      this.login = '/cabinet'
    }
  }

  menuOnClick() {
    document.getElementById("menu-bar")?.classList.toggle("change");
    document.getElementById("nav")?.classList.toggle("change");
    document.getElementById("menu-bg")?.classList.toggle("change-bg");
  }
}
