import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppComponent, Invoice } from '../app.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { element } from 'protractor';

registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  myForm: FormGroup;

 sumArray:number[]=[]
 sumAll:number =0
 line_items:FormArray


  private eventsSubscription: any

  @Input() events: Observable<void>
  @Input() currentSelectedInvoice:Invoice 
  constructor(private fb: FormBuilder ,private appcomponent:AppComponent) { }




  ngOnInit() {
 
    this.setFormValue()
    this.onChanges()

    this.eventsSubscription = this.events.subscribe(() =>
    { this.currentSelectedInvoice=this.appcomponent.currentSelectedInvoice
      this.refresh()
    
   
      this.onChanges()
    })
    


   this.currentSelectedInvoice.line_items.forEach(() => {
     this.createNewEmptyItem()
   });


  }

  onChanges(): void {
    this.myForm.valueChanges.subscribe(() => {
      
      this.calcSum()
     

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
    line_items:this.fb.array([])
  })

  if(this.currentSelectedInvoice.line_items.length>0){
    var c=0
this.currentSelectedInvoice.line_items.forEach(element => {
    
    var n = this.fb.group({
      name: element.name,
      description:element.description, 
      quantity: element.quantity,
      price_cents: element.price_cents
    
    })
    this.line_items=this.myForm.get("line_items") as FormArray
    this.line_items.push(n)


});
this.calcSum()
}


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
  this.line_items=this.myForm.get("line_items") as FormArray
  this.line_items.push(this.createNewEmptyItem())
}


removeItem(i){
  this.line_items=this.myForm.get("line_items") as FormArray
  this.line_items.removeAt(i)
}




refresh(){
  this.currentSelectedInvoice=this.appcomponent.currentSelectedInvoice
  this.myForm.reset()
  this.setFormValue()
  
}



saveCurrentChanges(){
  var a= this.appcomponent.invoicesList.findIndex(    x => x== this.currentSelectedInvoice      )



  this.appcomponent.invoicesList[a]=this.myForm.value



  this.appcomponent.currentSelectedInvoice =this.myForm.value
  this.appcomponent.calcBNT()
}


calcSum(){
  this.sumArray=[]
  var a= this.line_items=this.myForm.get("line_items").value

  a.forEach(element => {
    this.sumArray.push( element.price_cents*element.quantity)   
  });
 
  this.sumAll=0
  this.sumArray.forEach(element => {
    this.sumAll=this.sumAll+element
  });

}

deleteCurrentInvoice(){
  if (confirm('Are you sure you want to delete this Invoice?')) {
    var a=this.appcomponent.invoicesList.findIndex( element => element== this.currentSelectedInvoice)
    this.appcomponent.invoicesList.splice(a,1)
 
    this.appcomponent.selectInvoice(0)
console.log(a)
} else {
    // Do nothing!
}

}

}
