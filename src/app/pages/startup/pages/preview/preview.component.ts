import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Startup } from 'src/app/core/interfaces/startups.interface';
import { StartupsService } from 'src/app/core/services/startups.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit {
  key: string = '';
  startup: Startup = {
    emailAddress: '',
    name: '',
    sectors: [],
    websiteUrl: '',
  };
  loading = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _startupService: StartupsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((result) => {
      if (result['key']) {
        this.key = result['key'];
        this.getById();
      }
    });
  }
  getById() {
    this._startupService.getById(this.key).subscribe((result: any) => {
      if (result) {
        this.startup = result;
        this.loading = false;
      }
    });
  }
}
