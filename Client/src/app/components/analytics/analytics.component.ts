import { Component, OnInit ,ChangeDetectorRef} from "@angular/core";
import {AdminServiceService} from './../../services/admin-service.service'

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.css"]
})
export class AnalyticsComponent implements OnInit {
  constructor(private admin : AdminServiceService,private ref:ChangeDetectorRef) {
    this.getPieChartResult()
  }
  // Pie
  public pieChartLabels: string[] = [
    "Adhar",
    "Passport",
    "Pan Card"
  ];
  public pieChartData: number[] =  [300, 500, 100];
  public pieChartType: string = "pie";

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  getPieChartResult(){
    this.admin.getPieChartResult().subscribe(data=>{
      console.log(data.message)
      this.pieChartData = data.message
      this.ref.detectChanges();
    })
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Adhar'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Passport'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'PanCard'}
  ];
 
  // events
  public chartClickedBar(e:any):void {
    console.log(e);
  }
 
  public chartHoveredBar(e:any):void {
    console.log(e);
  }

  ngOnInit() {
    
  }
}
