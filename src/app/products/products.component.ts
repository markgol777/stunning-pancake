import { AbstractType, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  public products!: any;
  public firebaseApp = getApp();
  public db = getFirestore(this.firebaseApp);
  public currentProduct:any = [];

  constructor(private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
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
