import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Olympic } from '../core/models/Olympic';
import { OlympicService } from '../core/services/olympic.service';
import { Observable, of } from 'rxjs';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of();
  countryInfo: Olympic | undefined;

  constructor(private router: ActivatedRoute , private olympicService: OlympicService) { }
  name? : string;
  ngOnInit(): void {
    this.name = this.router.snapshot.params['name'];
    if (this.name) {
      this.olympicService.getCountryInfo(this.name).subscribe(info => {
        this.countryInfo = info;
        this.renderLineChart(this.countryInfo);
      });
    }    
   
  }

  renderLineChart(countryInfo: Olympic | undefined): void {
    if (countryInfo) {
      const chartOptions: Highcharts.Options = {
        chart: {
          type: 'line',
        },
        title: {
          text: `Medals for ${countryInfo.country}`,
        },
        xAxis: {
          categories: countryInfo.participations.map(participation => participation.year.toString()),
        },
        yAxis: {
          title: {
            text: 'Medals Count',
          },
        },
        series: [
          {
            name: 'Medals',
            data: countryInfo.participations.map(participation => participation.medalsCount),
          },
        ] as Highcharts.SeriesOptionsType[], 
      };
      Highcharts.chart('lineChart', chartOptions);
    }
    
  }

}
