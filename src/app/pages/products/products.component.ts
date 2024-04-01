import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../services/product.model';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../shared/table/table.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        console.log(this.products);
      },
    });
  }
}
