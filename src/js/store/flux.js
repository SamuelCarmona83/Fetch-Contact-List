const getState = ({ getStore, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			title: "Titulo para hacer una prueba",
			contId: 0,
			contacts: []
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			loadContacts: async () => {
				// const auxStore = getStore();
				// Services
				try {
					let resp = await fetch("https://assets.breatheco.de/apis/fake/contact/agenda/bicho_lovers");
					let data = await resp.json();
					const imagen =
						"https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?w=740&t=st=1682895038~exp=1682895638~hmac=ca33bcd0e0441e977c6ee1aac60c6e86f44c146c68def83605e0c1102b4282d4";
					setStore({ contacts: data.map(contacto => ({ ...contacto, imagen })) });
				} catch (err) {
					// eslint-disable-next-line no-console
					console.log(err);
				}
			},
			newContact: async newItem => {
				let auxStore = getStore();
				// setStore({ contId: auxStore.contId + 1 });
				// newItem.id = auxStore.contId;
				const imagen =
					"https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?w=740&t=st=1682895038~exp=1682895638~hmac=ca33bcd0e0441e977c6ee1aac60c6e86f44c146c68def83605e0c1102b4282d4";

				try {
					let resp = await fetch("https://assets.breatheco.de/apis/fake/contact/", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ ...newItem, agenda_slug: "bicho_lovers" })
					});
					let data = await resp.json();
					setStore({ contacts: [...auxStore.contacts, { ...data, imagen }] });
					alert("New Contact added successfully!");
				} catch (err) {
					// eslint-disable-next-line no-console
					console.log(err);
				}

				//auxStore = getStore();
			},
			removeContact: target => {
				//cambia el precio de un producto
				const auxStore = getStore();
				// eslint-disable-next-line no-console
				console.log(target);
				setStore({ contacts: auxStore.contacts.filter(item => item.id != target.id) });
			},
			editContact: target => {
				const auxStore = getStore();
				let auxContact = auxStore.contacts.find(item => item.id == target.id);
				auxContact.fullName = target.fullName;
				auxContact.email = target.email;
				auxContact.address = target.address;
				auxContact.phone = target.phone;
				// eslint-disable-next-line no-console
				console.log(auxStore.contacts);
				alert("Contact edited successfully!");
			}
		}
	};
};

export default getState;
