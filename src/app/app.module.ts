import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { initializeApp } from "firebase/app";
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { provideFirebaseApp } from '@angular/fire/app';
import { ToastrModule } from 'ngx-toastr';
import { ProductsComponent } from './products/products.component';
import { DeliveryPageComponent } from './delivery-page/delivery-page.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { getAuth } from "firebase/auth";
import { CabinetComponent } from './cabinet/cabinet.component';
import { BasketComponent } from './basket/basket.component';
import { TranslateHttpLoader}  from '@ngx-translate/http-loader'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const firebaseConfig = {
  apiKey: "AIzaSyD0h4s7aPUkcA9dNIK3lSOc_-i7hjAkeX4",
  authDomain: "noa-ua-accc9.firebaseapp.com",
  projectId: "noa-ua-accc9",
  storageBucket: "noa-ua-accc9.appspot.com",
  messagingSenderId: "301772426373",
  appId: "1:301772426373:web:7ef32c262113c1d8e2adec",
  measurementId: "G-HQCZBD7XPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    AdminMainComponent,
    AddProductComponent,
    ProductsComponent,
    DeliveryPageComponent,
    ProductInfoComponent,
    LoginModalComponent,
    CabinetComponent,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    provideFirebaseApp(() => app),
    provideStorage(() => getStorage()),
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
