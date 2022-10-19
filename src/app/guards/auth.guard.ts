import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router'
import {UserService} from '../services/user-services/user.service'

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(public userService: UserService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const isAuth = this.userService.isUserLogged()
		const isTargetLoggedIn = state.url.endsWith('login')

		if (!isAuth && !isTargetLoggedIn) {
			this.router.navigateByUrl('/login')
			return false
		} else if (isAuth && isTargetLoggedIn) {
			this.router.navigateByUrl('/')
			return false
		} else {
			return true
		}
	}
}
