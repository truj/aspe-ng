import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  exists   = false;
  hasError = false;
  error    = '';
  product: Product = this.service.getEmptyProduct();

  constructor(private route: ActivatedRoute, private service: ProductService) {
  }

  ngOnInit(): void {
    const id: string|null = this.route.snapshot.paramMap.get('id');
    if (id && +id) {
      this.exists = true;
      this.service.getProduct(+id).subscribe(
        (product) => this.product = product,
        (err) => this.hasError = true,
      );
    }
  }

  save(): void {
    this.error   = '';
    this.service.saveProduct(this.product).subscribe(
      (product) => {
        this.product = product;
        this.exists  = true;
      },
      (err) => {
        this.error = err;
      },
    );
  }

}
