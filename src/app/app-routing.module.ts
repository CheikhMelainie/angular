import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { NewProductsComponent } from './new-products/new-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';

const routes: Routes = [
  {path: "login", component:LoginComponent},
  {path: "", component:LoginComponent},
  {path: "admin", component:AdminTemplateComponent, canActivate:[AuthenticationGuard],
   children:[
    {path: "products", component:ProductsComponent},
    {path: "customers", component:CustomersComponent},
    {path: "newProduct", component:NewProductsComponent},
    {path: "editProduct/:id", component:EditProductsComponent},
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
