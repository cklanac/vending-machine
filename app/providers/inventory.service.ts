import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Product} from './product.interface';


@Injectable()
export class InventoryService {
  public products: Product[] = [];
  observable: Observable<Product>;
  private productObserver: any;
  private dataUrl = '/data/inventory.json';

  constructor(private http: Http) {
    this.observable = new Observable<Product>(observer => {
      this.productObserver = observer;
    });
    this.fetchInventory();
  }
  private fetchInventory(): void {
    this.http.get(this.dataUrl)
      .map(response => response.json())
      .map(stream => stream.map(res => {
        return {
          id: res.id,
          name: res.name,
          price: (res.price / 100),
          quantity: res.quantity,
          imageUrl: res.imageUrl
        };
      }))
      .subscribe(
      products => {
        console.log(products);

        this.products = products;
        products.forEach(product => this.productObserver.next(product));
      },
      error => console.log("fetch error", error)
      );
  }
  public decrementProduct(product) {
    var item = this.getProduct(product);
    if (item.quantity > 0) {
      item.quantity = --item.quantity;
      return true;
    } else {
      return false;
    } 
  }
  private getProduct(product) {
    console.log('prodcut', product);
    var item;
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].id === product.id ) {
        item = this.products[i];
        break;
      }
    }
    return item;
  }
}

