import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../core/api.service';
import { Customer } from './customer';
import { CustomerFilter } from './customer-search/customer-filter';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private apiService: ApiService<Customer, Customer>, private apiServiceList: ApiService<Customer[], CustomerFilter>) {}

  saveCustomer(customer: Customer): Observable<Customer> {
    if (customer.id) {
      return this.apiService.put('/customer/update/' + customer.id, customer);
    }
    else {
      return this.apiService.post('/customer/create', customer);
    }
  }

  getEmptyCustomer(): Customer {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      street: '',
      city: '',
    };
  }

  getCustomer(id: number): Observable<Customer> {
    return this.apiService.get('/customer/' + id);
  }

  searchCustomers(filter: CustomerFilter): Observable<Customer[]> {
    return this.apiServiceList.post('/customer/search', filter);
  }
}
