import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {usuarioProvider} from '../../providers/usuario/usuario';

@Component({
	selector: 'page-contact',
	templateUrl: 'contact.html'
})
export class ContactPage {

	public usuarios: any;

	constructor(public navCtrl: NavController,
	            public usuarioService: usuarioProvider) {

		this.usuarioService.getUsuarios().then((data) => {
			this.usuarios = data;
			}

		)


	}

}
