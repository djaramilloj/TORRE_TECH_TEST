import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchDataService } from '../../core/fetch-data.service';

@Component({
  selector: 'app-opportunities-details',
  templateUrl: './opportunities-details.component.html',
  styleUrls: ['./opportunities-details.component.scss']
})
export class OpportunitiesDetailsComponent implements OnInit {
  opId: string;
  job: any;
  constructor(
    private actRoute: ActivatedRoute,
    // services
    private fetchdata: FetchDataService, 
  ) { }

  ngOnInit(): void {
    this.opId = this.actRoute.snapshot.params.id;
    this.getDetails();
  }

  getDetails() {
    this.fetchdata.getJobDetails(this.opId)
      .toPromise()
      .then(data => {
        console.log(data);
        this.job = data;
      })
      .catch(error => {
        console.error(error);
        alert('Internal server error');
      })
  }

}
