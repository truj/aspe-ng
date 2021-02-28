import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitializorComponent    } from './init/initializor/initializor.component';
import { ProductSearchComponent  } from './product/product-search/product-search.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { DashboardComponent      } from './dashboard/dashboard.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { CustomerSearchComponent } from './customer/customer-search/customer-search.component';
import { UserSearchComponent } from './user/user-search/user-search.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';

const routes: Routes = [
  { path: '',             component: DashboardComponent       },
  { path: 'init',         component: InitializorComponent     },
  { path: 'customers',    component: CustomerSearchComponent  },
  { path: 'customer/:id', component: CustomerDetailsComponent },
  { path: 'customer/new', component: CustomerDetailsComponent },
  { path: 'products',     component: ProductSearchComponent   },
  { path: 'product/:id',  component: ProductDetailsComponent  },
  { path: 'product/new',  component: ProductDetailsComponent  },
  { path: 'users',        component: UserSearchComponent      },
  { path: 'user/:id',     component: UserDetailsComponent     },
  { path: 'user/new',     component: UserDetailsComponent     },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
