import type { PillarId, ProtocolAction } from '$lib/types';

type PhaseActions = {
	remove: ProtocolAction[];
	repair: ProtocolAction[];
	regulate: ProtocolAction[];
};

// ── Shared action texts (used in multiple pillars — must be identical for deduplication) ──

const SHARED = {
	NO_ALCOHOL: 'Fără alcool seara (perturbă somnul profund și împiedică curățarea creierului noaptea)',
	NO_STIMULATING_CONTENT: 'Fără conținut stimulant seara (știri, social media, jocuri, discuții aprinse)',
	DAILY_MOVEMENT: '20-30 minute mișcare zilnică (plimbare rapidă, zone 2)',
	HYDRATION: 'Hidratare adecvată, concentrată în prima parte a zilei',
	OMEGA3: 'Omega-3 zilnic (susține echilibrul hormonal și sănătatea creierului)'
} as const;

export const pillarActions: Record<PillarId, PhaseActions> = {
	CIRCADIAN_COHERENCE: {
		remove: [
			{ text: 'Stop cofeină după ora 14:00', pillar: 'CIRCADIAN_COHERENCE', priority: 1 },
			{ text: 'Fără ecrane 90 de minute înainte de somn', pillar: 'CIRCADIAN_COHERENCE', priority: 2 },
			{ text: 'Asigură întuneric complet în dormitor', pillar: 'CIRCADIAN_COHERENCE', priority: 3 }
		],
		repair: [
			{ text: '15 minute lumină naturală dimineața (primele 30 min după trezire)', pillar: 'CIRCADIAN_COHERENCE', priority: 1 },
			{ text: 'Stabilizează ora de culcare (±30 min zilnic)', pillar: 'CIRCADIAN_COHERENCE', priority: 2 }
		],
		regulate: [
			{ text: 'Creează un ritual de seară constant (aceleași acțiuni, aceeași ordine)', pillar: 'CIRCADIAN_COHERENCE', priority: 1 },
			{ text: 'Dimineața: lumină → mișcare → hidratare (în această ordine)', pillar: 'CIRCADIAN_COHERENCE', priority: 2 }
		]
	},
	NEUROVEGETATIVE_SAFETY: {
		remove: [
			{ text: SHARED.NO_STIMULATING_CONTENT, pillar: 'NEUROVEGETATIVE_SAFETY', priority: 1 },
			{ text: 'Răcorește dormitorul la 18-20°C (aer condiționat, fereastră deschisă, ventilator)', pillar: 'NEUROVEGETATIVE_SAFETY', priority: 2 },
			{ text: 'Elimină surse de zgomot din dormitor (sau folosește dopuri)', pillar: 'NEUROVEGETATIVE_SAFETY', priority: 3 },
			{ text: 'Evită nicotina cu 4h înainte de somn', pillar: 'NEUROVEGETATIVE_SAFETY', priority: 3 }
		],
		repair: [
			{ text: '10 minute respirație vagală seara (expir mai lung decât inspir)', pillar: 'NEUROVEGETATIVE_SAFETY', priority: 1 },
			{ text: SHARED.DAILY_MOVEMENT, pillar: 'NEUROVEGETATIVE_SAFETY', priority: 2 }
		],
		regulate: [
			{ text: 'Rutină de descărcare a stresului seara (scris 5 min, stretching)', pillar: 'NEUROVEGETATIVE_SAFETY', priority: 1 },
			{ text: 'Practică grounding: contact cu pământul, duș călduț seara', pillar: 'NEUROVEGETATIVE_SAFETY', priority: 2 }
		]
	},
	METABOLIC_QUIET: {
		remove: [
			{ text: SHARED.NO_ALCOHOL, pillar: 'METABOLIC_QUIET', priority: 1 },
			{ text: 'Evită mesele grele cu minim 3 ore înainte de somn', pillar: 'METABOLIC_QUIET', priority: 2 }
		],
		repair: [
			{ text: 'Proteină + grăsime la cină (stabilizează glicemia nocturnă)', pillar: 'METABOLIC_QUIET', priority: 1 },
			{ text: 'Gustare mică proteică înainte de somn dacă ai treziri de foame', pillar: 'METABOLIC_QUIET', priority: 2 }
		],
		regulate: [
			{ text: 'Magneziu glicinat seara (sprijină metabolismul și relaxarea)', pillar: 'METABOLIC_QUIET', priority: 1 },
			{ text: 'Glicină înainte de somn (susține somnul profund)', pillar: 'METABOLIC_QUIET', priority: 2 }
		]
	},
	HORMONAL_HARMONY: {
		remove: [
			{ text: 'Reduce expunerea la perturbatori endocrini (plastice, produse chimice)', pillar: 'HORMONAL_HARMONY', priority: 2 }
		],
		repair: [
			{ text: SHARED.OMEGA3, pillar: 'HORMONAL_HARMONY', priority: 1 },
			{ text: 'Carbohidrați complecși la cină (susțin producția de serotonină/melatonină)', pillar: 'HORMONAL_HARMONY', priority: 2 }
		],
		regulate: [
			{ text: 'Consultă un specialist pentru suport hormonal (progesteron, tiroidă)', pillar: 'HORMONAL_HARMONY', priority: 1 },
			{ text: 'Reglare temperatură corporală seara (baie caldă 90 min înainte)', pillar: 'HORMONAL_HARMONY', priority: 2 }
		]
	},
	MITOCHONDRIAL_INTEGRITY: {
		remove: [
			{ text: 'Reduce dependența de cofeină (scade progresiv, nu brusc)', pillar: 'MITOCHONDRIAL_INTEGRITY', priority: 2 }
		],
		repair: [
			{ text: SHARED.DAILY_MOVEMENT, pillar: 'MITOCHONDRIAL_INTEGRITY', priority: 1 },
			{ text: SHARED.HYDRATION, pillar: 'MITOCHONDRIAL_INTEGRITY', priority: 2 }
		],
		regulate: [
			{ text: 'CoQ10 sau PQQ pentru suport mitocondrial (consultă un specialist)', pillar: 'MITOCHONDRIAL_INTEGRITY', priority: 1 },
			{ text: 'Expunere la frig controlat (duș rece scurt dimineața)', pillar: 'MITOCHONDRIAL_INTEGRITY', priority: 3 }
		]
	},
	GLYMPHATIC_FLOW: {
		remove: [
			{ text: SHARED.NO_ALCOHOL, pillar: 'GLYMPHATIC_FLOW', priority: 1 }
		],
		repair: [
			{ text: 'Dormit pe o parte (facilitează drenajul glimfatic)', pillar: 'GLYMPHATIC_FLOW', priority: 1 },
			{ text: SHARED.HYDRATION, pillar: 'GLYMPHATIC_FLOW', priority: 2 }
		],
		regulate: [
			{ text: 'Asigură minimum 7 ore de somn continuu', pillar: 'GLYMPHATIC_FLOW', priority: 1 },
			{ text: SHARED.OMEGA3, pillar: 'GLYMPHATIC_FLOW', priority: 2 }
		]
	},
	RESPIRATORY_STABILITY: {
		remove: [
			{ text: 'Evită somnul pe spate dacă sforăi', pillar: 'RESPIRATORY_STABILITY', priority: 1 }
		],
		repair: [
			{ text: 'Respirație nazală (practică ziua, consideră plasture nocturn)', pillar: 'RESPIRATORY_STABILITY', priority: 1 },
			{ text: 'Elevație ușoară a capului (15-20°) dacă ai reflux', pillar: 'RESPIRATORY_STABILITY', priority: 2 },
			{ text: 'Ventilează dormitorul 15 min înainte de culcare', pillar: 'RESPIRATORY_STABILITY', priority: 2 }
		],
		regulate: [
			{ text: 'Evaluare pentru apnee de somn (polisomnografie) dacă sforăi regulat', pillar: 'RESPIRATORY_STABILITY', priority: 1 },
			{ text: 'Exerciții de întărire a musculaturii orofaringiene', pillar: 'RESPIRATORY_STABILITY', priority: 3 }
		]
	},
	EMOTIONAL_CLOSURE: {
		remove: [
			{ text: 'Fără discuții dificile sau decizii importante după ora 20:00', pillar: 'EMOTIONAL_CLOSURE', priority: 1 },
			{ text: SHARED.NO_STIMULATING_CONTENT, pillar: 'EMOTIONAL_CLOSURE', priority: 2 }
		],
		repair: [
			{ text: 'Jurnal de 5 minute seara: scrie ce gânduri/griji ai, apoi „închide" caietul', pillar: 'EMOTIONAL_CLOSURE', priority: 1 },
			{ text: 'Lista de „mâine" — scrie 3 lucruri de făcut mâine, apoi eliberează mintea', pillar: 'EMOTIONAL_CLOSURE', priority: 2 }
		],
		regulate: [
			{ text: 'Practică recunoștința seara (3 lucruri pentru care ești recunoscător)', pillar: 'EMOTIONAL_CLOSURE', priority: 2 },
			{ text: 'Tranziție conștientă zi→seară: schimbă hainele, spală-te pe față, semnalizează corpului', pillar: 'EMOTIONAL_CLOSURE', priority: 1 },
			{ text: 'Consideră psihoterapie (EMDR, terapie cognitivă) dacă ai experiențe nerezolvate', pillar: 'EMOTIONAL_CLOSURE', priority: 1 }
		]
	}
};
