import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of ([
      // {id: 1, name: 'nn', type: 'tt', price: 20.35},
      // {id: 2, name: 'nn', type: 'tt', price: 20.35},
      // {id: 3, name: 'nn', type: 'tt', price: 20.35},
      // {id: 4, name: 'nn', type: 'tt', price: 20.35},
      // {id: 5, name: 'nn', type: 'tt', price: 20.35},
      // {id: 6, name: 'nn', type: 'tt', price: 20.35},
      // {id: 7, name: 'nn', type: 'tt', price: 20.35},
    ]);
  }

  getEmptyProduct(): Product {
    return {
      name: '',
      type: '',
      price: 0,
    };
  }

  getProduct(id: number): Observable<Product> {
    return of ({name: 'nn', type: 'tt', price: 20.35});
  }

  saveProduct(product: Product): Observable<Product> {
    if (product.id) {
      return of (product);
    }
    return of ({name: '', type: '', price: 0.00});
    // return of ({id: 25, name: 'New Product', type: 'tt', price: 101.35});
  }
}
