import { Component, OnInit, Input } from '@angular/core';





@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() invoices_local
  @Input() currentSelectedInvoice
   constructor() { }

  importJson(){
  var newJson= prompt("json eingeben","")
    console.log(newJson)
  }


  exportJson(){
      console.log(this.currentSelectedInvoice)
  }


  ngOnInit() {
  }

}
