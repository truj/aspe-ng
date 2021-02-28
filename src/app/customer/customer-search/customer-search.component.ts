import { Component, OnInit } from '@angular/core';
import { Customer          } from '../customer';
import { CustomerService   } from '../customer.service';
import { CustomerFilter } from './customer-filter';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit {

  filter    = new CustomerFilter();
  isWaiting = true;
  hasError  = false;
  error     = 'unknown error';
  customers: Customer[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
  }

  filterChanged(): void {
    for (const field in this.filter) {
      if ('id' === field || 'firstName' === field || 'lastName' === field
        || 'email' === field || 'phone' === field || 'street' === field
        || 'zipcode' === field || 'city' === field) {
        if ('' === this.filter[field]) {
          this.filter[field] = undefined;
        }
      }
    }
  }

  search(): void {
    this.isWaiting = true;
    this.customerService.searchCustomers(this.filter).subscribe(
      (customers) => {
        this.customers = customers;
        this.isWaiting = false;
        this.hasError  = false;
      },
      (err) => {
        this.isWaiting = false;
        this.hasError  = true;
      },
    );
  }
}
