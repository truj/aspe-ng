// angular core related
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// layout and styling
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

// app related
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './core/menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InitializorComponent } from './init/initializor/initializor.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductSearchComponent } from './product/product-search/product-search.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { MdbModule } from 'mdb-angular-ui-kit';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { CustomerSearchComponent } from './customer/customer-search/customer-search.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { UserSearchComponent } from './user/user-search/user-search.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    InitializorComponent,
    ProductListComponent,
    ProductSearchComponent,
    ProductDetailsComponent,
    CustomerDetailsComponent,
    CustomerSearchComponent,
    CustomerListComponent,
    UserSearchComponent,
    UserListComponent,
    UserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MdbModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
