import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Invoice } from '../app.component';





@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() invoices_local
  @Input() calcArray
  @Input() sum
  @Input() currentSelectedInvoice:Invoice
  @Output() newInvoice = new EventEmitter();
  @Output() selctNewInvoice= new EventEmitter();
   constructor() { }

   /**
    * imports new Invoice
    */
  importJson(){
  var newJson= prompt("json eingeben","")
    console.log(newJson)

    var newInvoice:Invoice= JSON.parse( newJson)
    console.log(newInvoice)
    this.newInvoice.emit(newInvoice)

  }

/**
 * creates new Invoice
 * 
 */
  addNewInvoice(){

    var newInvoice= {
      customer_id:0,
      customer_name: "a",
      customer_contact_person: "",
      customer_address: "",
      customer_zip:"",
      customer_city: "",
      iban: "",
      bic: "",
      account_owner: "",
      mandate_reference: "",
      mandate_city: "",
      mandate_date: "",
      mandate_signee: "",
      invoice_number: "",
      invoice_period: "",
      invoice_date: "",
      invoice_due_date:"",
      line_items:{}
    }

   

    this.newInvoice.emit(newInvoice)

  }

  /**
   * Select a new CurrentInvoice at Index i
   * @param i Index
   */
  selectCurrentInvoice(i){
    this.selctNewInvoice.emit(i)
    console.log(i)
  }

  /**
   * export Invoice in JSON Format to Console
   */
  exportJson(){
      console.log(this.currentSelectedInvoice)
  }


  ngOnInit() {
  }



}
