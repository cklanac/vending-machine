import { Injectable } from '@angular/core';

@Injectable()
export class TransactionService {

  constructor() { 
  }

  public processTransaction(cardNumber){
    //TODO: change to promise
    if (this.isValid(cardNumber)) {
      return true;
    } else {
      return false;
    }
  }

  private isValid(cardNumber) {    
    let result = false;
    if (this.isNumbericOnly(cardNumber) && this.isCorrectLength(cardNumber)) {
      result = true;
    }
    return result;
  }

  private isNumbericOnly(ccNumber) {
    // Some people, when confronted with a problem, think "I know, I'll use regular expressions." Now they have two problems.
    // ^ = start of string anchor
    // \d = digits character class
    // $ = end of string anchor 
    return /^\d+$/.test(ccNumber);
  }

  private isCorrectLength(ccNumber) {    
    return (ccNumber.toString().length === 16) ? true : false;
  }
}