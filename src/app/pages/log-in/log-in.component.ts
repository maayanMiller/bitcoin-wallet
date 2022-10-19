import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {lastValueFrom, Observable} from 'rxjs'
import {User} from 'src/app/models/user.model'
import {UserService} from 'src/app/services/user-services/user.service'

@Component({
	templateUrl: './log-in.component.html',
	styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
	user!: User
	user$!: Observable<User>
	constructor(private userService: UserService, private router: Router) {}

	ngOnInit(): void {
		this.user = this.userService.getEmptyUser()
	}

	async logIn() {
		// await lastValueFrom(this.userService.logIn(this.user))
		await this.userService.logIn(this.user).toPromise()
		this.router.navigate(['/'])
	}
}
