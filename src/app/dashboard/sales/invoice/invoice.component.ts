import { Component, OnInit, Inject } from '@angular/core';
import { SaleService } from 'src/app/services/sale.service';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalVariablesService } from 'src/app/global-variables.service';
import * as jspdf from 'jspdf';  
  
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

sale;
currency;
hideActions:boolean=false;
showContent:boolean=false;
  constructor(private saleService: SaleService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<InvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data,private gloabal:GlobalVariablesService) { }


  ngOnInit() {
    this.currency = localStorage.getItem("zakaBranchCurrency")
    this.sale=this.data;
    console.log(this.sale)
      
  }

  public savePdf()  
  {  
    this.showContent=true;
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save(this.data.saleNumber+'.pdf'); // Generated PDF   
    });  
    //this.showContent=false;
  }
}
