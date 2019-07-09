import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Invoice } from '../app.component';





@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() invoices_local
  @Input() currentSelectedInvoice
  @Output() newInvoice = new EventEmitter();
  @Output() selctNewInvoice= new EventEmitter();
   constructor() { }

  importJson(){
  var newJson= prompt("json eingeben","")
    console.log(newJson)

  }


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

  selectCurrentInvoice(i){
    this.selctNewInvoice.emit(i)
  }

  exportJson(){
      console.log(this.currentSelectedInvoice)
  }


  ngOnInit() {
  }



}
