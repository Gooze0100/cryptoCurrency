import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LogUserService } from 'src/app/services/log-user.service';

import { binance } from 'ccxt';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, OnDestroy {
  constructor(protected logUserDataService: LogUserService) {}

  @ViewChild('form') searchForm: NgForm;
  public searchedResults: string[] = [];
  public isLoading: boolean;
  public isSubmitted: boolean = false;
  public title: string = '';
  protected _logKeywordsSubscription: Subscription;
  protected _logSelectedValueSubscription: Subscription;

  ngOnInit(): void {}

  /**
   * onSubmit gets the values from binance market and loads it.
   * Then data is pushed to Array.
   * Sets the values of title, loading variables which is used in HTML part.
   * Lastly subscribes to logUserDataService and logs keyword which was submitted.
   * @throws {Error} when subscription is not successful.
   * Resets searchForm.
   */
  async onSubmit() {
    if (this.searchForm.valid) {
      if (this.searchForm.value.cryptoCurrency !== '') {
        this.isLoading = true;
        this.isSubmitted = true;
        this.searchedResults = [];

        const currenciesArray: string[] = [];
        const exchange = new binance();
        const currencies = await exchange.loadMarkets();

        for (let i = 0; i < Object.keys(currencies).length; i++) {
          const symbol = currencies[`${Object.keys(currencies)[i]}`].symbol;
          currenciesArray.push(symbol);
        }

        currenciesArray.forEach((val) => {
          const value = this.searchForm.value.cryptoCurrency.toUpperCase();
          if (val.indexOf(value) > -1) {
            this.searchedResults.push(val);
          }
        });

        if (this.searchedResults.length !== 0) {
          this.isLoading = false;
          this.title = 'Currencies found:';
        } else if (this.searchedResults.length === 0) {
          this.isLoading = false;
          this.title = 'Currency not found';
        }

        this._logKeywordsSubscription = this.logUserDataService
          .logKeywords(this.searchForm.value.cryptoCurrency)
          .subscribe(
            () => {},
            (err) => {
              throw new Error(err);
            }
          );
        this.searchForm.reset();
      }
    }
  }

  /**
   * Logs selected crypto currency from dropdown with logUserDataService logSelectedValue function to the database.
   * @param {string} selectedValue selected crypto currency from dropdown
   */
  logSelectedValue(selectedValue: string) {
    this._logSelectedValueSubscription = this.logUserDataService
      .logSelectedValue(selectedValue)
      .subscribe(
        () => {},
        (err) => {
          throw new Error(err);
        }
      );
  }

  ngOnDestroy(): void {
    this._logKeywordsSubscription.unsubscribe();
  }
}
