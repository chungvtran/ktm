import { Output, Input, OnInit } from '@angular/core';
import { ReportFilters } from '@app/_models/ReportFilters';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import * as _ from 'underscore';
import { ListOfReports } from '@app/_models/dummies';
import { SelectFilter } from '@app/_models/SelectFilter';

export abstract class ReportBaseComponent {
  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);
  
  private static filters: ReportFilters = {
    selectedReport: null,
    selectedKudosType: null,
    selectedTeam: null,
    selectedTeams: [],
    dateRange: [],
    subFilter: null
  }


  constructor(protected router: Router, protected activatedRoute: ActivatedRoute){
    this.filter.selectedReport = this.getSelectedReportFromRoute();
    this.filter.subFilter = this.initialSubFilter();
    activatedRoute.queryParams.subscribe(x=> {
      let extras = this.router.getCurrentNavigation().extras
      if (extras && extras.state) {
        if(extras.state.data){
          this.filter = history.state.data.filters;
        }
        this.onReportNavigated(this.router.getCurrentNavigation().extras.state.data)
      }
    });
  }

  onReportNavigated(data: any){ } //placeholder as an event handler after the report navigated
  
  initialSubFilter(): any {
    return {
      data: null,
      visible: false,
      detailReportType: null 
    }
  }

  getSelectedReportFromRoute(){
    return _.find(ListOfReports, (x:SelectFilter) => x.routeUrl == this.currentRoute());
  }

  currentRoute(): string {
    return this.router.url.split('?')[0];
  }

  navigateToUrl(url: string = this.currentRoute(), resetSubFilter: boolean = false){    
    if (resetSubFilter) this.filter.subFilter = this.initialSubFilter();
    let navigationExtras: NavigationExtras = {
      queryParams: { timeStamp: _.now()},
      state: {
        data: { filters: this.filter}
      }
    };
    this.router.navigate([url], navigationExtras);
  }
  
  reloadPage(){ this.navigateToUrl(); }

  get filter() {
    return ReportBaseComponent.filters
  }
  set filter(val: ReportFilters){
    ReportBaseComponent.filters = val;
  }
}