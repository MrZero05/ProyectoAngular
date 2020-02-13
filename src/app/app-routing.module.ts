import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { CategoryComponent } from './components/category/category.component';
import { ContactComponent } from './components/contact/contact.component';
import { LayoutComponent } from './layout/layout.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AutenticadoGuard } from './core/guard/autenticado.guard';

const routes: Routes = [
  { path: '', redirectTo: 'layout', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'errorPage', component: ErrorPageComponent },
  {
    path: 'layout', component: LayoutComponent, canActivate: [AutenticadoGuard],
     children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'product/:id', component: ProductsComponent },
      { path: 'shoppingcart', component: ShoppingcartComponent },
      { path: 'category/:id', component: CategoryComponent },
      { path: 'contactus', component: ContactComponent },
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'errorPage' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
