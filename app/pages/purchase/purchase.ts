import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {ModalController, Platform, NavParams, ViewController} from 'ionic-angular';
import {InventoryService} from '../../providers/inventory.service';
import {TransactionService} from '../../providers/transaction.service';

@Component({
  templateUrl: 'build/pages/purchase/purchase.html'
})
export class PurchasePage {
  private product;
  private deposited: number = 0;
  private ccNumber: number = 1234567890123456;
  private mode: string = 'credit';

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    private inventory: InventoryService,
    private alertController: AlertController,
    public transaction: TransactionService) {
    this.product = this.params.get('product');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  private deposit(amount) {
    this.deposited += (amount / 100);
  }

  private purchase() {
    var res = this.inventory.decrementProduct(this.product);
    if (res) {
      this.dispenseProduct();
      this.notifyUser('Item Dispensed!', 'Thank you for your business.');
    } else {
      this.returnDeposit();
      this.notifyUser('Not Available', 'Your deposit has been returned');
    }
  }

  private processTransaction() {
    if (this.transaction.processTransaction(this.ccNumber)) {
      var res = this.inventory.decrementProduct(this.product);
      if (res) {
        this.dispenseProduct();
        this.notifyUser('Not Available', 'Your deposit has been returned');
      } else {
        this.notifyUser('Not Available', 'Your credit card has not been charged');
      }
      
    }
  }

  private notifyUser(title, subTitle) {
    var alert = this.alertController.create({
      title: title,
      subTitle: subTitle,
      enableBackdropDismiss: false,
      buttons: [{
        text: 'Ok',
        handler: () => {
          let trans = alert.dismiss();
          trans.then(() => {
            this.dismiss();
          });
        }
      }]
    });
    alert.present();
  }

  private returnDeposit() {
    console.warn('Return deposit to user');
  }
  private dispenseProduct() {
    console.info('Dispense Product');
  }


  private switchMode() {
    console.log("returnChange");
    console.log("clear ccNumber");

  }

  /** <input type=number> allows for letter "e" for  */
  private preventExponent(e) {
    if (e.which === 101) {
      e.preventDefault();
    }
  }
  /** disable paste so user cannot paste in non-numeric characters */
  private preventPaste(e) {
    e.preventDefault();
  }

}

