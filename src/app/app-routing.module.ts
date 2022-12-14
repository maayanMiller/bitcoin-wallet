import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {AuthGuard} from './guards/auth.guard'
import {ContactAppComponent} from './pages/contact-app/contact-app.component'
import {ContactDetailsComponent} from './pages/contact-details/contact-details.component'
import {ContactEditPageComponent} from './pages/contact-edit-page/contact-edit-page.component'
import {HomePageComponent} from './pages/home-page/home-page.component'
import {LogInComponent} from './pages/log-in/log-in.component'
import {StatisticPageComponent} from './pages/statistic-page/statistic-page.component'
import {ContactResolver} from './services/contact-resolver/contact.resolver'

const routes: Routes = [
	{path: '', component: HomePageComponent},
	{path: 'login', component: LogInComponent, canActivate: [AuthGuard]},
	{
		path: 'contacts',
		component: ContactAppComponent,
		canActivate: [AuthGuard],

		children: [
			{
				path: 'edit/:id',
				component: ContactEditPageComponent,
				resolve: {contact: ContactResolver},
			},
			{path: 'edit', component: ContactEditPageComponent},
		],
	},
	{
		path: 'contacts/:id',
		component: ContactDetailsComponent,
		resolve: {contact: ContactResolver},
	},
	{path: 'statistic', component: StatisticPageComponent, canActivate: [AuthGuard]},
]

@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash: true})],
	exports: [RouterModule],
})
export class AppRoutingModule {}
