import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, empty } from 'rxjs';
import { AppComponent, Invoice } from '../app.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  myForm: FormGroup;

 
  items:FormArray



  private eventsSubscription: any

  @Input() events: Observable<void>
  @Input() currentSelectedInvoice 
  constructor(private fb: FormBuilder ,private ac:AppComponent) { }




  ngOnInit() {
 
    this.setFormValue()
    this.onChanges()
    this.eventsSubscription = this.events.subscribe(() =>
    { this.currentSelectedInvoice=this.ac.currentSelectedInvoice
      this.refresh()
    
   
      this.onChanges()
    })


   this.currentSelectedInvoice.line_items.forEach(element => {
     this.createNewEmptyItem()
   });


  }

  onChanges(): void {
    this.myForm.valueChanges.subscribe(val => {
      
     console.log(val)
     

    });
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
    invoice_due_date:this.currentSelectedInvoice.invoice_due_date,
    items:this.fb.array([])
  })

this.currentSelectedInvoice.line_items.forEach(element => {
    var n = this.fb.group({
      name: element.name,
      description:element.description, 
      quantity: element.quantity,
      price_cents:element.price_cents
    })
    this.items=this.myForm.get("items") as FormArray
    this.items.push(n)
});

}

createNewEmptyItem():FormGroup{
  return this.fb.group({
    name: "",
    description:"", 
    quantity: "",
    price_cents:""
  })

}



addItem(){
  this.items=this.myForm.get("items") as FormArray
  this.items.push(this.createNewEmptyItem())
}


removeItem(i){
  this.items=this.myForm.get("items") as FormArray
  this.items.removeAt(i)
}




refresh(){
  this.currentSelectedInvoice=this.ac.currentSelectedInvoice
  this.myForm.reset()
  this.setFormValue()
  
}







}
