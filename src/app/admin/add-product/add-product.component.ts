import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getApp } from '@firebase/app';
import { getAuth, signOut } from '@firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  public showAdd: boolean = true;
  public firebaseApp = getApp();
  public db = getFirestore(this.firebaseApp);
  public storage = getStorage();
  public products!: any;
  public url: string = '';
  public path: any = '';
  public showText: boolean = false;
  public showEditBtn: boolean = false;
  public id: any;
  public auth = getAuth();

  constructor(public router: Router) {}

  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/']);
      localStorage.removeItem('currentUser');
    }).catch((e) => {
      console.error(e);
    });
  }

  async ngOnInit() {
    await this.get();
  }

  resetForms() {
    document.querySelector<any>('.product-name').value = '',
      document.querySelector<any>('.product-path').value = ''
  }

  async addProduct() {
    try {
      const docRef = await addDoc(collection(this.db, 'products'), {
        name: document.querySelector<any>('.product-name').value,
        path: document.querySelector<any>('.product-path').value,
        weight: document.querySelector<any>('.product-weight').value,
        description: document.querySelector<any>('.product-description').value,
        category: document.querySelector<any>('#category').value,
        price: document.querySelector<any>('#price').value,
        url: this.url
      })
      this.showText = false;
      this.resetForms();
      this.showAdd = !this.showAdd;
      this.get();
    } catch (e) {
      console.log(e);
    }
  }

  showAddFunc() {
    this.showAdd = !this.showAdd;
    this.showEditBtn = false;
    this.get();
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

  async delete(id: any) {
    await deleteDoc(doc(this.db, 'products', id))
    this.get();
    this.deleteImg(id)
  }

  deleteImg(id: any) {
    try {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
          const task = ref(this.storage, this.products[i].url);
          deleteObject(task).then(() => {
            this.showText = false;
          })
        }
      }
    } catch (e) {
      console.log(e);
    }

  }

  upload($event: any) {
    this.path = $event.target.files[0];
    this.uploadFile('images', this.path.name, this.path)
      .then((data: any) => {
        console.log(data);
      })
      .catch((e: any) => {
        console.error(e);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null) {
    const path = `${folder}/${name}`;

    if (file) {
      try {
        const stroageRef = ref(this.storage, path);
        const task = uploadBytesResumable(stroageRef, file);
        await task;
        this.url = await getDownloadURL(stroageRef);
      }
      catch (e: any) {
        console.log(e);

      }
    } else {
      console.log('wrong format');
    }
    this.showText = true;
    return Promise.resolve(this.url);
  }


  async edit(id: any) {
    this.showAddFunc();
    setTimeout(() => {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
          this.url = this.products[i].url;
          document.querySelector<any>('.product-name').value = this.products[i].name;
          document.querySelector<any>('.product-path').value = this.products[i].path;
          document.querySelector<any>('.product-weight').value = this.products[i].weight;
          document.querySelector<any>('.product-description').value = this.products[i].description;
          document.querySelector<any>('#price').value = this.products[i].price
        }
      }
    });
    this.showEditBtn = true;
    this.id = id;
  }

  async saveProduct() {
    const updatedProduct = {
      name: document.querySelector<any>('.product-name').value,
      path: document.querySelector<any>('.product-path').value,
      weight: document.querySelector<any>('.product-weight').value,
      description: document.querySelector<any>('.product-description').value,
      url: this.url,
      price: document.querySelector<any>('#price').value
    }

    const productRef = doc(this.db, "products", this.id);
    await updateDoc(productRef, updatedProduct);
    this.get();
    this.resetForms();
    this.showText = false;
    this.showAdd = !this.showAdd;
  }
}
