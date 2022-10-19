import {Component, Input, OnInit} from '@angular/core'
import {BehaviorSubject, Observable, Subscription} from 'rxjs'
import {Contact} from 'src/app/models/contact.model'
import {User} from 'src/app/models/user.model'
import {UserService} from 'src/app/services/user-services/user.service'

@Component({
	selector: 'move-list',
	templateUrl: './move-list.component.html',
	styleUrls: ['./move-list.component.scss'],
})
export class MoveListComponent implements OnInit {
	constructor(private userService: UserService) {}
	user!: User
	user$!: Observable<User>
	userSubscriber!: Subscription
	@Input() contact!: Contact
	isMovesToContact!: boolean

	ngOnInit(): void {
		this.userSubscriber = this.userService.user$.subscribe((user) => {
			this.user = user
		})
		this.isMovesToContact = this.user.moves.some((move) => move.to === this.contact?.name)
	}
}
