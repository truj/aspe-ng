import { Component, OnInit } from '@angular/core';
import { ProductFilter } from './product-filter';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {

  filter: ProductFilter;
  isWaiting = false;
  hasError  = false;
  error = 'no error';
  products: Product[] = [];

  constructor(private service: ProductService) {
    this.filter = new ProductFilter();
  }

  ngOnInit(): void {
  }

  filterHasChanged(): void {
  }

  search(): void {
    this.isWaiting = true;
    this.hasError = false;
    this.service.getProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (err) => {
        this.error = err;
        this.hasError = true;
      },
      () => {
        this.isWaiting = false;
      },
    );
  }

  isPriceFilterSet(type: string): boolean {
    if ('min' === type) {
      if (undefined === this.filter.priceMin) { return false; }
      if (''        === this.filter.priceMin) { return false; }
      if (isNaN(+this.filter.priceMin))       { return false; }
      return true;
    }
    else if ('max' === type) {
      if (undefined === this.filter.priceMax) { return false; }
      if (''        === this.filter.priceMax) { return false; }
      if (isNaN(+this.filter.priceMax))       { return false; }
      return true;
    }
    else {
      throw new Error('invalid price type');
    }
  }

}
