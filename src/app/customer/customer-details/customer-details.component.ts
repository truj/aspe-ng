import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  isReady       = false;
  idFormatError = false;
  saveError     = false;
  fetchError    = false;
  exists        = false;
  customer: Customer = this.service.getEmptyCustomer();

  constructor(private route: ActivatedRoute, private service: CustomerService) {
  }

  ngOnInit(): void {
    const id: string|null = this.route.snapshot.paramMap.get('id');
    if (id) {
      if (+id) {
        this.exists = true;
        this.service.getCustomer(+id).subscribe(
          (customer) => {
            this.customer   = customer;
            this.fetchError = false;
            this.isReady    = true;
          },
          (err) => {
            this.fetchError = true;
            this.isReady    = true;
          },
        );
      }
      else if ('new' === id) {
        this.isReady = true;
      }
      else {
        this.idFormatError = true;
        this.isReady       = true;
      }
    }
  }

  save(): void {
    this.service.saveCustomer(this.customer).subscribe(
      (res) => {
        this.customer  = res;
        this.exists    = true;
        this.saveError = false;
        this.isReady   = true;
      },
      (err) => {
        this.saveError = true;
        this.isReady   = true;
      },
    );
  }
}
