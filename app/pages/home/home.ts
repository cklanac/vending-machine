import {Component} from '@angular/core';
// import {NavController} from 'ionic-angular';
import {ModalController, Platform, NavParams, ViewController} from 'ionic-angular';
import {PurchasePage} from '../purchase/purchase';
import {InventoryService} from '../../providers/inventory.service';
import {Product}  from '../../providers/product.interface';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  private products: Product[] = [];
  constructor(
    public modalCtrl: ModalController,
    private inventory: InventoryService) {
    this.products = this.inventory.products;
  }

  purchase(product) {
    let modal = this.modalCtrl.create(PurchasePage, product);
    modal.present();
  }
  ngOnInit(): void {
    // this.products = this.inventory.products;
    this.inventory.observable.subscribe(product => {
      this.products.push(product);
    });
  }
}
