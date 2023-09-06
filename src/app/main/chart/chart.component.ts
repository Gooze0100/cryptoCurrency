import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import binance from 'ccxt/js/src/binance';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnDestroy {
  constructor(public _route: ActivatedRoute, protected router: Router) {}

  protected _routeChangeSubscription: Subscription;
  protected ohlcData: Array<Object> = [];
  protected ohlcData2: Array<Object> = [];
  public chart: any;
  public loading: boolean = true;
  public stockChartOptions: Object;
  protected newParam: string;
  protected minDate;
  protected maxDate;

  ngOnInit(): void {
    this._routeChangeSubscription = this._route.params.subscribe(
      (params: Observable<Params>) => {
        this._routeChangeHandler(params);

        if (this.newParam && this.newParam !== params['currency']) {
          window.location.reload();
        }

        if (this.loading) {
          this.stockChartOptions = {
            dataPointMinWidth: 0,
            exportEnabled: true,
            zoomEnabled: true,
            zoomType: 'x',
            theme: 'dark2',
            title: {
              text: this._route.snapshot.params['currency'],
            },
            showInLegend: false,
            charts: [
              {
                axisX: {
                  valueFormatString: 'DD-MMM',
                },
                axisY: {
                  title: 'Price',
                  includeZero: false,
                },
                data: [
                  {
                    type: 'ohlc',
                    color: '#A6E1FA',
                    showInLegend: false,
                    name: this._route.snapshot.params['currency'],
                    xValueFormatString: 'YYYY-MM-DD',
                    dataPoints: this.ohlcData,
                  },
                ],
              },
            ],
            toolTip: {
              enabled: true,
              shared: true,
              backgroundColor: '#0e6ba8',
              cornerRadius: 2,
            },
            navigator: {
              axisX: {
                valueFormatString: 'DD-MMM',
                labelFontColor: 'white',
              },
              slider: {
                minimum: this.minDate,
                maximum: this.maxDate,
              },
            },
            rangeSelector: {
              buttons: [
                {
                  range: 1,
                  rangeType: 'month',
                  label: '1 Month',
                },
                {
                  range: 2,
                  rangeType: 'month',
                  label: '2 Months',
                },
                {
                  rangeType: 'all',
                  label: 'Show All',
                },
              ],
              inputFields: {
                startValue: this.minDate,
                endValue: this.maxDate,
                valueType: 'dateTime',
                valueFormatString: 'YYYY-MM-DD',
              },
            },
          };
        }
        this.newParam = params['currency'];
      },
      (err) => {
        throw new Error(err);
      }
    );
  }

  /**
   * @param {string} params gives number to specific currency by name.
   * Using subscription to get data changed that has been changed.
   */
  async _routeChangeHandler(params: Observable<Params>) {
    this.ohlcData = [];
    const market = new binance();
    const data = await market.fetchOHLCV(
      params['currency'].toUpperCase(),
      '1d', // 1m - minute, 1d - day, 1M - month
      undefined, // undefined or timestamp
      undefined // undefined or number of how records to fetch
    );

    data.map((data) => {
      this.ohlcData.push({
        x: new Date(data[0]),
        y: [data[1], data[2], data[3], data[4]],
      });
      this.ohlcData2.push({
        x: new Date(data[0]),
        y: [data[4]],
      });
    });

    this.minDate = data[0][0];
    this.maxDate = data[data.length - 1][0];

    this.loading = false;
  }

  ngOnDestroy(): void {
    this._routeChangeSubscription.unsubscribe();
  }
}
