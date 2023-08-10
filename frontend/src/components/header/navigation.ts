/* eslint-disable @typescript-eslint/no-explicit-any */
export const loggedNavigation: { dest: string; text: string; class?: boolean, click?: () => void }[] = [
		{
			dest: '#',
			text: 'Ajouter',
			class: true,
			click: () => (window as any).add_book.showModal(),
		},
		{ dest: '/', text: 'Accueil' },
		{ dest: '#', text: 'Bibliothèque' },
	];

export const notLoggedNavigation: {
		dest: string;
		text: string;
		class?: boolean;
	}[] = [
		{
			dest: '/register',
			text: "S'inscrire",
			class: true,
		},
		{ dest: '/login', text: 'Connexion' },
	];