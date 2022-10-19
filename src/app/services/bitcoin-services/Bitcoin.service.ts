import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {UtilService} from '../util-services/util.service'
@Injectable({
	providedIn: 'root',
})
export class BitcoinService {
	constructor(private http: HttpClient, private utilService: UtilService) {}
	bitcoinValues!: any
	bitCoinPrices!: any
	data: any
	values$: any
	prices$: any
	async getRate(coins: number) {
		return this.http.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
	}
	async getMarketPrice() {
		return await this.getData('market-price')
	}
	async getConfirmedTransactions() {
		return await this.getData('trade-volume')
	}
	async load(key: string) {
		return await this.utilService.load(key)
	}
	async store(key: string, value: any) {
		this.utilService.store(key, value)
	}
	async getData(val: string) {
		return this.http.get(
			`https://api.blockchain.info/charts/${val}?timespan=5months&format=json&cors=true`
		)
	}
}
