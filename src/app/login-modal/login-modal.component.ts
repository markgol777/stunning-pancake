import { Component } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { Subscription } from 'rxjs';
import { getApp } from 'firebase/app';
import { doc } from '@angular/fire/firestore';
import { collection, getDocs, getFirestore, query, setDoc } from 'firebase/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {
  public showSignUp: boolean = false;
  public firebaseApp = getApp();
  public auth = getAuth();
  public db = getFirestore(this.firebaseApp);
  public loginSubscription!: Subscription;
  public users!: any;

  constructor(private router: Router) { }

  loginUser() {
    const user = {
      email: document.querySelector<any>('.email').value,
      password: document.querySelector<any>('.password').value
    }

    this.login(user.email, user.password);
  }

  async login(email: string, password: string) {
    let uid;
    signInWithEmailAndPassword(this.auth, email, password).then(async (userCredential) => {
      const user = userCredential.user;
      uid = user.email;

      await this.get();

      for (let i = 0; i < this.users.length; i++) {
        if (uid === this.users[i].email) {
          localStorage.setItem('currentUser', JSON.stringify(this.users[i]));

          if (this.users[i].role === 'USER') {
            this.router.navigate(['/cabinet']);
          }
          if (this.users[i].role === 'ADMIN') {
            this.router.navigate(['/admin']);
          }
        }
      }
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`error code: ${errorCode}, error message: ${errorMessage}`);
      });


  }

  async signUp() {
    const newUser = {
      email: document.querySelector<any>('.email-sign-up').value,
      firstName: document.querySelector<any>('.first-name').value,
      lastName: document.querySelector<any>('.last-name').value,
      password: document.querySelector<any>('.password-sign-up').value,
      role: 'USER'
    }

    const docRef = doc(this.db, 'user', 'test1234');
    setDoc(docRef, {name: 'test1234', country: 'Ukraine', message: 'we sure miss Ukraine.'})
      .then(() => {
        console.log('Document created successfully with custom ID');
      })
      .catch((error) => {
        console.error('Error creating document with custom ID: ', error);
      });

    createUserWithEmailAndPassword(this.auth, document.querySelector<any>('.email-sign-up').value, document.querySelector<any>('.password-sign-up').value)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const newUserObj = { id: user.uid, ...newUser }

        localStorage.setItem('currentUser', JSON.stringify(newUserObj));
      })
      .catch((e) => {
        const errorCode = e.code;
        const errorMessage = e.message;
      })
  }

  async get() {
    const users: any = [];
    const q = query(collection(this.db, "users"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const user: any = doc.data();
      user.id = doc.id;
      users.push(user);
    });
    this.users = users;
  }

  show() {
    this.showSignUp = !this.showSignUp
  }
}
