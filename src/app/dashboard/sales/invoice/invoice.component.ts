import { Component, OnInit, Inject } from '@angular/core';
import { SaleService } from '../../../services/sale.service';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalVariablesService } from '../../../global-variables.service';
import * as jspdf from 'jspdf';
import { PrintDriver } from 'ng-thermal-print/lib/drivers/PrintDriver';
import { PrintService, UsbDriver, WebPrintDriver } from 'ng-thermal-print';
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
items;
status: boolean = false;
    usbPrintDriver: UsbDriver;
  constructor(private saleService: SaleService,
    private datePipe: DatePipe,
    private printService: PrintService,
    public dialogRef: MatDialogRef<InvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data,private gloabal:GlobalVariablesService) {
      this.usbPrintDriver = new UsbDriver();
        this.printService.isConnected.subscribe(result => {
            this.status = result;
            if (result) {
                console.log('Connected to printer!!!');
            } else {
            console.log('Not connected to printer.');
            }
        });
    }


  ngOnInit() {
    this.currency = localStorage.getItem("zakaBranchCurrency");
    this.sale=this.data;
    console.log(this.sale);
    this.saleService.findSaleItems(this.sale.offlineIdentifier).subscribe(res=>{
      this.items=res.body.data;
      console.log(res)
    })
  }

  requestUsb() {
    this.usbPrintDriver.requestUsb().subscribe(result => {
        this.printService.setDriver(this.usbPrintDriver, 'ESC/POS');
        this.printInvoice()
    }, err=>{
      console.log("COULD NOT CONNECT")
    });
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

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(this.data.saleNumber+'.pdf'); // Generated PDF
    });
    //this.showContent=false;
  }

   printInvoice()
{
  var getpanel = document.getElementById("contentToConvert");
  var MainWindow = window.open('', '', 'height=500,width=800');
  MainWindow.document.write('<html><head><title></title>');
  MainWindow.document.write("<link rel=\"stylesheet\" href=\"styles/Print.css\" type=\"text/css\"/>");
  MainWindow.document.write('</head><body onload="window.print();window.close()">');
  MainWindow.document.write(getpanel.innerHTML);
  MainWindow.document.write('</body></html>');
  // MainWindow.document.close();
  this.printService.init()
      .setBold(true)
      .writeLine('Hello World!')
      .setBold(false)
      .feed(4)
      .cut('full')
      .flush();
  return false;
}
sendMail(){

}

}
