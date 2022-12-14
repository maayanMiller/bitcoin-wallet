import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {Contact} from 'src/app/models/contact.model'
import {ContactService} from 'src/app/services/contact-services/contact.service'
import {FormBuilder} from '@angular/forms'
import {NgForm} from '@angular/forms'
import {HostListener} from '@angular/core'

@Component({
	selector: 'contact-edit-page',
	templateUrl: './contact-edit-page.component.html',
	styleUrls: ['./contact-edit-page.component.scss'],
})
export class ContactEditPageComponent implements OnInit {
	// form!: FormGroup
	constructor(
		private contactService: ContactService,
		private router: Router,
		private route: ActivatedRoute,
		private fb: FormBuilder
	) {}

	contact!: Contact
	title: string = ''
	top: string = '0px'

	ngOnInit(): void {
		this.route.data.subscribe(({contact}) => {
			if (contact) {
				this.title = 'EDIT'
				this.contact = JSON.parse(JSON.stringify(contact))
			} else {
				this.title = 'ADD'
				this.contact = this.contactService.getEmptyContact() as Contact
			}
		})
	}

	@HostListener('window:scroll', [])
	onWindowScroll() {
		// do some stuff here when the window is scrolled
		const verticalOffset = window.scrollY
		this.top = verticalOffset + 'px'
	}

	onCancel(event: MouseEvent) {
		event.stopPropagation()
		this.router.navigateByUrl('/contacts')
	}

	async onSaveContact(form: NgForm) {
		this.contactService.saveContact(this.contact)
		this.router.navigateByUrl('/contacts')
	}
}
