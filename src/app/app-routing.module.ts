import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitializorComponent } from './init/initializor/initializor.component';
import { ProductSearchComponent } from './product/product-search/product-search.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '',            component: DashboardComponent},
  {path: 'init',        component: InitializorComponent},
  {path: 'products',    component: ProductSearchComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'product/new', component: ProductDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
