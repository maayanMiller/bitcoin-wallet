import {Component, OnDestroy, OnInit, Output} from '@angular/core'
import {Observable, Subscription} from 'rxjs'
import {User} from 'src/app/models/user.model'
import {UserService} from 'src/app/services/user-services/user.service'
import {BitcoinService} from 'src/app/services/bitcoin-services/Bitcoin.service'

@Component({
	selector: 'home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
	constructor(private userService: UserService, private bitcoinService: BitcoinService) {}
	user!: User
	user$!: Observable<User>
	userSubscription!: Subscription
	ans!: any
	imgs = {
		coins: '/imgs/coins.png',
		bitcoin: '',
	}

	async ngOnInit(): Promise<void> {
		this.userSubscription = this.userService.user$.subscribe((user) => (this.user = user))

		this.user$ = this.userService.user$
		// const user = JSON.parse(JSON.stringify(this.user$))
		// console.log('user:', user)
		if (this.user) {
			var ans = (await this.bitcoinService.getRate(this.user.coins)).subscribe((res: any) => {
				console.log('res:', res)
				this.ans = res
			})
		}
	}
	ngOnDestroy(): void {
		this.userSubscription.unsubscribe()
	}
}
