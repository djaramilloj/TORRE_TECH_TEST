import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../../core/fetch-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opportunities-list',
  templateUrl: './opportunities-list.component.html',
  styleUrls: ['./opportunities-list.component.scss']
})
export class OpportunitiesListComponent implements OnInit {
  opportunities: Array <any> = [];
  searchedOpportunities: Array<any> = [];
  showSize: boolean = false;
  size: number;
  constructor(
    // services
    private fetchdata: FetchDataService,
    
    // angular
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  search() {
    this.fetchdata.searchTopJobs(this.size)
      .toPromise()
      .then(data => { 
        console.log(data);
        
        const rta: any = data;
        this.searchedOpportunities = rta.results;
      })
      .catch(error => {
        console.error(error);
      })
  }

  details(opId) {
    this.router.navigate(['lists/opportunities/', opId]);
  }
}
