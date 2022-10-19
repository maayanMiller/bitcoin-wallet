import {Component, Input, OnDestroy, OnInit} from '@angular/core'
import {Subscription} from 'rxjs'
import {Contact} from 'src/app/models/contact.model'
import {User} from 'src/app/models/user.model'
import {UserService} from 'src/app/services/user-services/user.service'

@Component({
	selector: 'transfer-fund',
	templateUrl: './transfer-fund.component.html',
	styleUrls: ['./transfer-fund.component.scss'],
})
export class TransferFundComponent implements OnInit, OnDestroy {
	@Input() contact!: Contact

	constructor(private userService: UserService) {}
	user!: User
	amount: number = 0
	userSubscriber!: Subscription

	ngOnInit(): void {
		this.userSubscriber = this.userService.user$.subscribe((user) => {
			this.user = user
			console.log('this.user:', this.user)
		})
	}
	ngOnDestroy(): void {
		this.userSubscriber.unsubscribe()
	}

	transfer() {
		this.userService.addMove(this.contact, this.amount)
	}
}
