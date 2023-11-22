import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {
  public products!: any;
  public firebaseApp = getApp();
  public db = getFirestore(this.firebaseApp);
  public currentProduct!: any;
  public basket:any = [];

  constructor(private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    const pathName = this.activatedRoute.snapshot.paramMap.get('path') as string;

    await this.get();
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].path === pathName) {
        this.currentProduct = this.products[i];
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

  addToCart() {
    this.currentProduct.count = 1;
    for (let i = 0; i < this.basket.length; i++) {
      if (this.basket[i] == this.currentProduct && this.currentProduct.count === 1) {
        this.currentProduct.count++;
      } else {

      }
    }
    this.basket.push(this.currentProduct);
    localStorage.setItem('basket', JSON.stringify(this.basket));
  }
}
