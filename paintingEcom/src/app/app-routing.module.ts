import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CartViewComponent } from './cart/cart-view/cart-view.component';


const routes: Routes = [
  {path:'',redirectTo:'/products',pathMatch:"full"}, //Home page - redirects to list of products 
  {path:'products',component:ProductListComponent},
  {path:'cart' , component:CartViewComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
