import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { DeliveryPageComponent } from './delivery-page/delivery-page.component';
import { MainComponent } from './main/main.component';
import { ProductsComponent } from './products/products.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { CabinetComponent } from './cabinet/cabinet.component';
import { BasketComponent } from './basket/basket.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'admin', canActivate: [AuthGuard],  component: AdminMainComponent},
  {path: 'add-product', canActivate: [AuthGuard], component: AddProductComponent},
  {path: 'product/:category', component: ProductsComponent},
  {path: 'delivery', component: DeliveryPageComponent},
  {path: 'products/:path', component: ProductInfoComponent},
  {path: 'cabinet', component: CabinetComponent, canActivate: [AuthGuard]},
  {path: 'basket', component: BasketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
