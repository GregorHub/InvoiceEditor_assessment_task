import { Component } from '@angular/core';

import raw_invoices from 'src/assets/raw_invoices.json';



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
  line_items:{}
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'invoiceEditor';
  invoicesList:Invoice[];

  constructor(){

      this.invoicesList=raw_invoices
      this.currentSelectedInvoice=this.invoicesList[0]
  }

 
  addNewInvoice($event){
   console.log($event)
   this.invoicesList.push($event)


   this.currentSelectedInvoice=this.invoicesList[this.invoicesList.length-1]
  }

  selectInvoice($event){
    this.currentSelectedInvoice=this.invoicesList[$event]
  }


  currentSelectedInvoice;



}
