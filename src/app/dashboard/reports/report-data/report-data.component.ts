import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from '../../../global-variables.service';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report-data',
  templateUrl: './report-data.component.html',
  styleUrls: ['./report-data.component.css']
})
export class ReportDataComponent implements OnInit {

  showRanges;
  date1;
  date2;
  minDate;
  maxDate;

  branchId=localStorage.getItem("zakaBranchId");
  currency= localStorage.getItem("zakabranchCurrency");
  stats;
  constructor(private global:GlobalVariablesService,
    private reportService: ReportService) { }

  ngOnInit() {
    this.setToday();
  }

  getDataByDates(){
    this.global.showLoading("Loading....");
       this.reportService.getStats(this.branchId, this.date1,
        this.date2).subscribe(res=>{
          this.global.stopLoading();
          this.stats = res.data
        },err=>{
          this.global.stopLoading();
          this.global.showErrorMessage("Une erreur s'est produite")
        })

  }

  setAllTime(){

    let date1 = new Date(0).getTime();
    let date2 = new Date().getTime();
    this.date1 = date1;
    this.date2 = date2;
    this.getDataByDates()
  }
  setToday(){

    let date1 = new Date().setHours(0,0,0,0);
    let date2 = new Date().getTime();
    this.date1 = date1;
    this.date2 = date2;
    this.getDataByDates()
  }

  setYesterday(){
    let date1 = new Date().setHours(-24,0,0,0);
    let date2 = new Date().setHours(0,0,0,0);
    this.date1 = date1;
    this.date2 = date2;
    this.getDataByDates()
  }

  setThisWeek(){
    let date1 = this.getMonday(new Date()).getTime();
    let date2 = new Date().getTime();
    this.date1 = date1;
    this.date2 = date2;
    this.getDataByDates()
  }

  setThisMonth(){
    var date = new Date();
    let date1 = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    let date2 = new Date().getTime();

    this.date1 = date1;
    this.date2 = date2;
    this.getDataByDates()
  }

  setThisYear(){

    let date1 = new Date(new Date().getFullYear(), 0, 1).getTime();
    let date2 = new Date().getTime();
    this.date1 = date1;
    this.date2 = date2;
    this.getDataByDates()
  }


  getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
    }




    stringToDate(_date,_format,_delimiter)
  {
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            return formatedDate;
  }

  onShowRanges(){
    if(this.showRanges){
      this.showRanges=false
    }else{
      this.showRanges=true
    }
  }


  onDate1(e){
    this.minDate =e.target.value;
    this.date1 =new Date(e.target.value).getTime();
    if(this.date2){

    }
    console.log(new Date(e.target.value).getTime())
  }

  onDate2(e){
    this.date2 =new Date(e.target.value).getTime();
    this.maxDate =e.target.value;
    console.log(this.date1);
    console.log(this.date2);
    if(!this.date1){
      alert("Veillez selectionner la date de depart")

    }else{
      this.getDataByDates();
    }
  }
}
