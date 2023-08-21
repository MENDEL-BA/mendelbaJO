import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import * as Highcharts from 'highcharts';
import { Olympic } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.olympics$.subscribe(olympicsData => {
      this.renderPieChart(olympicsData);
    });
  }

  renderPieChart(olympicsData: Olympic[]): void {
    const chartData = olympicsData?.map(country => ({
      //id : +country.id,
      name: country.country,
      y: country.participations.reduce((totalMedals: any, participation: { medalsCount: any; }) => totalMedals + participation.medalsCount, 0)
    }));

    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'pie'
      },
      title: {
        text: '',
      },
      subtitle: {
        text: '', 
      },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function (event : any) {
                      location.href = `http://localhost:4200/details/${this.name}`;
                    }
                }
            }
        }
    },
      series: [{
        type: 'pie',
        data: chartData
      }]
    };

    Highcharts.chart('pieChart', chartOptions);
  }

}