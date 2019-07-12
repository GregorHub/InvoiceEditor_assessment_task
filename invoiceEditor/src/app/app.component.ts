import { Component, Output, EventEmitter } from '@angular/core';

import raw_invoices from 'src/assets/raw_invoices.json'; // Import the Invoice Data 
import { Subject } from 'rxjs';



interface lineItems {
name
description:string
quantity:number
price_cents:number


}

export interface Invoice {
  customer_id:number,
  customer_name: string
  customer_contact_person: string
  customer_address: string
  customer_zip:string,
  customer_city: string
  iban: string
  bic: string
  account_owner: string
  mandate_reference: string
  mandate_city: string
  mandate_date: string
  mandate_signee: string
  invoice_number: string
  invoice_period: string
  invoice_date: string
  invoice_due_date:string
  line_items:lineItems[]


}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'invoiceEditor';
  invoicesList:Invoice[];
  currentSelectedInvoice:Invoice;
  calcArray:number[]=[]
  sum:number=0
  constructor(){

      this.invoicesList=raw_invoices
      this.currentSelectedInvoice=this.invoicesList[0]
      this.calcBNT()
  }

 /**
  * ads new invoice
  * listens to event in child 
  * @param $event Invoice
  */
  addNewInvoice($event){

   this.invoicesList.push($event)


   this.currentSelectedInvoice=this.invoicesList[this.invoicesList.length-1]
   this.emitEventToChild()
   this.calcBNT()
  }

/**
 * select Invoice by Index
 * @param $event Index
 */
  selectInvoice($event){

    this.currentSelectedInvoice=this.invoicesList[$event]



    this.emitEventToChild()
    this.calcBNT()
  }


/**
 * calculates the Value of the Invoice
 */

calcBNT(){
  this.sum=0
  this.calcArray=[]
 
this.invoicesList.forEach(element => {
  
  var c=0
  if(element.line_items.length>0){
  element.line_items.forEach(el => {
    c=c+(el.price_cents*el.quantity)
  });
}
  this.calcArray.push(c)
this.sum=this.sum+c
});
}


private eventsSubject: Subject<void> = new Subject<void>();

/**
 * event emit to track changes 
 * listend by the editor 
 */
emitEventToChild() {
  this.eventsSubject.next()

}


}
