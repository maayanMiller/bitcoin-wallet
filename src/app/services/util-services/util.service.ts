import {Injectable} from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class UtilService {
	constructor() {}

	public getRandomId(length = 10): string {
		let result = ''
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length))
		}
		return result
	}
	public store(key: string, any: any): void {
		localStorage[key] = JSON.stringify(any)
	}

	public load(key: string): any {
		var str = localStorage[key] || 'null'
		return JSON.parse(str)
	}
}
