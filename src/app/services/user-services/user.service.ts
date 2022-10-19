import {Injectable} from '@angular/core'
import {BehaviorSubject, of} from 'rxjs'
import {Contact} from 'src/app/models/contact.model'
import {Move} from 'src/app/models/move.model'
import {User} from '../../models/user.model'
import {UtilService} from '../util-services/util.service'

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private KEY = 'USER_DB'
	private _userDb: User = this.utilService.load(this.KEY)

	private _user$ = new BehaviorSubject<User>(this.utilService.load(this.KEY) || null)
	public user$ = this._user$.asObservable()

	constructor(private utilService: UtilService) {}

	public loadUser(): void {
		let user = this._userDb
		this._user$.next(user)
	}

	public logIn(newUser: User) {
		this.utilService.store(this.KEY, newUser)
		this._userDb = newUser
		this._user$.next(this._userDb)
		return of()
	}

	public getEmptyUser(): User {
		const newUser = {
			_id: this.utilService.getRandomId(),
			name: '',
			coins: 100,
			moves: [],
		}
		return newUser
	}
	public isUserLogged(): boolean {
		const user = this._user$.getValue()
		return !!user
	}

	public addMove(contact: Contact, amount: number) {
		let newMove: Move = {
			toId: this.utilService.getRandomId(),
			to: contact.name,
			at: Date.now(),
			amount: amount,
		}
		const editedUser = {...this._user$.value}
		console.log('editedUser:', editedUser)
		editedUser.coins -= amount
		editedUser.moves.unshift(newMove)
		this.utilService.store(this.KEY, editedUser)
		console.log('editedUser2:', editedUser)
		this._user$.next(editedUser)
	}
}
