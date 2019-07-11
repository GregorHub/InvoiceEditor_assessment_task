import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  myForm: FormGroup;







  private eventsSubscription: any

  @Input() events: Observable<void>
  @Input() currentSelectedInvoice 
  constructor(private fb: FormBuilder ,private ac:AppComponent) { }




  ngOnInit() {

    this.setFormValue()

    this.eventsSubscription = this.events.subscribe(() =>
    { this.currentSelectedInvoice=this.ac.currentSelectedInvoice
      this.refresh()
    
      console.log(this.currentSelectedInvoice)
      
  console.log("refreseh")    

    })
  }

setFormValue(){

 
  this.myForm=this.fb.group({
    customer_id:this.currentSelectedInvoice.customer_id,
    customer_name:this.currentSelectedInvoice.customer_name,
    customer_contact_person:this.currentSelectedInvoice.customer_contact_person,
    customer_address: this.currentSelectedInvoice.customer_address,
    customer_zip: this.currentSelectedInvoice.customer_zip,
    customer_city: this.currentSelectedInvoice.	customer_city,
    iban: 		this.currentSelectedInvoice.iban,
    bic: 	this.currentSelectedInvoice.bic,
    account_owner: 	this.currentSelectedInvoice.account_owner,
    mandate_reference:this.currentSelectedInvoice.mandate_reference,
    mandate_city: 	this.currentSelectedInvoice.mandate_city,
    mandate_date: 	this.currentSelectedInvoice. mandate_date,
    mandate_signee: this.currentSelectedInvoice.mandate_signee,
    invoice_number: this.currentSelectedInvoice.invoice_number,
    invoice_period: this.currentSelectedInvoice.invoice_period	,
    invoice_date: 	this.currentSelectedInvoice.invoice_date,
    invoice_due_date:this.currentSelectedInvoice.invoice_due_date



  })
}

refresh(){
  this.currentSelectedInvoice=this.ac.currentSelectedInvoice
  this.myForm.reset()
  this.setFormValue()

}


}
