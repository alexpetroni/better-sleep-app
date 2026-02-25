import type { SleepArchetype, SleepArchetypeId } from '$lib/types';

export const sleepArchetypes: Record<SleepArchetypeId, SleepArchetype> = {
	A: {
		id: 'A',
		name: 'Comutare Lentă',
		nameEn: 'Slow Switch-Off',
		description:
			'Mintea și corpul tău nu reușesc să „coboare turația" seara. Stai treaz ore întregi, deși ești obosit.',
		keyPhrase: 'Nu pot opri mintea seara'
	},
	B: {
		id: 'B',
		name: 'Trezire Nocturnă',
		nameEn: 'Night Waker',
		description:
			'Adormi relativ ușor, dar te trezești între 2 și 4 dimineața și nu mai poți readormit.',
		keyPhrase: 'Mă trezesc la 3 dimineața și gata'
	},
	C: {
		id: 'C',
		name: 'Trezire Timpurie',
		nameEn: 'Early Riser',
		description:
			'Te trezești cu mult înainte de alarmă — la 4 sau 5 dimineața — și nu mai poți dormi, deși ai nevoie.',
		keyPhrase: 'Mă trezesc prea devreme, fără alarmă'
	},
	D: {
		id: 'D',
		name: 'Somn Ușor',
		nameEn: 'Light Sleeper',
		description:
			'Orice zgomot, mișcare sau schimbare de lumină te trezește. Somnul tău este superficial și fragil.',
		keyPhrase: 'Mă trezesc de la orice'
	},
	E: {
		id: 'E',
		name: 'Somn Neodihnitor',
		nameEn: 'Non-Restorative Sleep',
		description:
			'Dormi un număr suficient de ore, dar te trezești la fel de obosit ca atunci când te-ai culcat.',
		keyPhrase: 'Dorm, dar nu mă odihnesc'
	},
	F: {
		id: 'F',
		name: 'Nocturn',
		nameEn: 'Night Owl',
		description:
			'Nu ți-e somn până foarte târziu — la 1, 2, sau 3 noaptea. Dimineața e un chin.',
		keyPhrase: 'Nu mi-e somn până la 2-3 noaptea'
	},
	G: {
		id: 'G',
		name: 'Trezire Autonomă',
		nameEn: 'Autonomic Waker',
		description:
			'Te trezești brusc cu palpitații, transpirații, foame intensă sau senzație de panică.',
		keyPhrase: 'Mă trezesc cu inima care bate tare'
	},
	H: {
		id: 'H',
		name: 'Somn Fragmentat',
		nameEn: 'Fragmented Sleep',
		description:
			'Somnul tău e întrerupt constant — te trezești de 3-5 ori pe noapte, fără un motiv clar.',
		keyPhrase: 'Mă trezesc de mai multe ori în fiecare noapte'
	}
};

export const allArchetypeIds: SleepArchetypeId[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
