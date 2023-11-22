import { Component } from '@angular/core';
import { getApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  public products!: any;
  public firebaseApp = getApp();
  public db = getFirestore(this.firebaseApp);
  public currentProduct:any = [];


  async ngOnInit() {
    const categoryName = 'culinasia-special';
    await this.get()
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].category === categoryName) {
        this.currentProduct.push(this.products[i]);
        document.querySelector<any>(`.${categoryName}`).classList.add('active');
      }
    }
  }

  async get() {
    const products: any = [];
    const q = query(collection(this.db, "products"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const user: any = doc.data();
      user.id = doc.id;
      products.push(user);
    });
    this.products = products;
  }
}
