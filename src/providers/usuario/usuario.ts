// import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PouchDb} from 'pouchdb'

@Injectable()
export class usuarioProvider {

	public data: any;
	public db: any;
	public remote: any;

	// constructor(public http: HttpClient) {
	//   console.log('Hello UsuarioProvider Provider');
	// }

	constructor() {
		this.db = new PouchDb("usuario");
		this.remote = 'http://localhost:5984/usuario';

		let options = {
			live: true,
			retry: true,
			continuous: true
		};

		this.db.sync(this.remote, options);
	}

	public createUsuario(usuario: any){
		this.db.post(usuario);
	}

	public getUsuarios() {
		if (this.data) {
			return Promise.resolve(this.data);
		}

		return new Promise(resolve =>
			this.db.allDocs({
				include_docs: true
			}).then((result) => {
				this.data = [];

				let docs = result.rows.map((row) => {
					this.data.push(row.doc);
				});

				resolve(this.data);

				this.db.cnhanges({live: true, since: 'now', include_docs: true}).on('change', (change) => {
					this.handleChange(change);
				})
			})
		)
	}

	public handleChange(change: any) {

	}
}
