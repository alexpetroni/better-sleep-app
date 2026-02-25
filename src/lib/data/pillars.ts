import type { Pillar, PillarId, AdaptationPhase, AdaptationPhaseId, Scenario, ScenarioId, CausalLabel, CausalLabelId } from '$lib/types';

export const pillars: Record<PillarId, Pillar> = {
	CIRCADIAN_COHERENCE: {
		id: 'CIRCADIAN_COHERENCE',
		name: 'Coerența Circadiană',
		nameEn: 'Circadian Coherence',
		description: 'Ritmul natural zi-noapte al corpului tău — ceasul biologic intern'
	},
	NEUROVEGETATIVE_SAFETY: {
		id: 'NEUROVEGETATIVE_SAFETY',
		name: 'Siguranța Neurovegetativă',
		nameEn: 'Neurovegetative Safety',
		description: 'Capacitatea sistemului nervos de a coborî garda și a permite somnul'
	},
	METABOLIC_QUIET: {
		id: 'METABOLIC_QUIET',
		name: 'Liniștea Metabolică',
		nameEn: 'Metabolic Quiet',
		description: 'Stabilitatea glicemiei, digestiei și metabolismului pe timpul nopții'
	},
	HORMONAL_HARMONY: {
		id: 'HORMONAL_HARMONY',
		name: 'Armonia Hormonală',
		nameEn: 'Hormonal Harmony',
		description: 'Echilibrul hormonal care susține ciclul somn-veghe (melatonină, cortizol, progesteron)'
	},
	MITOCHONDRIAL_INTEGRITY: {
		id: 'MITOCHONDRIAL_INTEGRITY',
		name: 'Integritatea Mitocondrială',
		nameEn: 'Mitochondrial Integrity',
		description: 'Capacitatea celulelor de a produce energie — fără ea, oboseala persistă'
	},
	GLYMPHATIC_FLOW: {
		id: 'GLYMPHATIC_FLOW',
		name: 'Fluxul Glimfatic',
		nameEn: 'Glymphatic Flow',
		description: 'Sistemul de curățare al creierului care funcționează doar în somnul profund'
	},
	RESPIRATORY_STABILITY: {
		id: 'RESPIRATORY_STABILITY',
		name: 'Stabilitatea Respiratorie',
		nameEn: 'Respiratory Stability',
		description: 'Respirația continuă și neobstrucționată pe parcursul nopții'
	},
	EMOTIONAL_CLOSURE: {
		id: 'EMOTIONAL_CLOSURE',
		name: 'Închiderea Emoțională',
		nameEn: 'Emotional Closure',
		description: 'Capacitatea de a „închide" ziua emoțional — de a lăsa grijile pentru mâine'
	}
};

export const allPillarIds: PillarId[] = [
	'CIRCADIAN_COHERENCE',
	'NEUROVEGETATIVE_SAFETY',
	'METABOLIC_QUIET',
	'HORMONAL_HARMONY',
	'MITOCHONDRIAL_INTEGRITY',
	'GLYMPHATIC_FLOW',
	'RESPIRATORY_STABILITY',
	'EMOTIONAL_CLOSURE'
];

// ═══════════════════════════════════════
// ADAPTATION PHASES (derived from safety score)
// ═══════════════════════════════════════

export const adaptationPhases: Record<AdaptationPhaseId, AdaptationPhase> = {
	EARLY_ALERT: {
		id: 'EARLY_ALERT',
		name: 'Alertă Inițială',
		description: 'Corpul tău încă compensează bine, dar semnalele există. Este momentul ideal pentru intervenție.'
	},
	ACTIVE_COMPENSATION: {
		id: 'ACTIVE_COMPENSATION',
		name: 'Compensare Activă',
		description: 'Funcționezi, dar pe rezerve. Oboseala și iritabilitatea sunt vizibile. Corpul cere atenție.'
	},
	ADAPTIVE_EXHAUSTION: {
		id: 'ADAPTIVE_EXHAUSTION',
		name: 'Epuizare Adaptativă',
		description: 'Sistemul de adaptare a cedat. Paradoxul: ești epuizat dar nu poți dormi. Prioritatea e restaurarea resurselor.'
	}
};

// ═══════════════════════════════════════
// SCENARIOS
// ═══════════════════════════════════════

export const scenarios: Record<ScenarioId, Scenario> = {
	LIFESTYLE: {
		id: 'LIFESTYLE',
		title: 'Corecție Lifestyle',
		description: 'Problema ta dominantă vine din obiceiuri și mediu. Vestea bună: sunt în controlul tău. Schimbări simple dar consistente pot transforma somnul tău.'
	},
	MEDICAL: {
		id: 'MEDICAL',
		title: 'Investigație Medicală',
		description: 'Corpul tău trimite semnale interne care perturbă somnul. E important să investighezi cauzele fiziologice cu un specialist.'
	},
	NEUROENDOCRINE: {
		id: 'NEUROENDOCRINE',
		title: 'Reglare Neuroendocrină',
		description: 'Sistemul tău nervos e suprasolicitat. Prioritatea e să restabilim siguranța biologică — corpul trebuie să simtă că e sigur să se oprească.'
	},
	GRADUAL: {
		id: 'GRADUAL',
		title: 'Intervenție Graduală',
		description: 'Ai factori multipli, moderați, pe mai multe niveluri. Abordarea corectă e graduală: un lucru la un moment dat, în ordinea corectă.'
	}
};

// ═══════════════════════════════════════
// CAUSAL LABELS
// ═══════════════════════════════════════

export const causalLabels: Record<CausalLabelId, CausalLabel> = {
	GASTROINTESTINAL: {
		id: 'GASTROINTESTINAL',
		name: 'Gastrointestinal',
		description: 'Refluxul sau digestia perturbată afectează calitatea somnului și respirația nocturnă.'
	},
	PAIN: {
		id: 'PAIN',
		name: 'Durere Cronică',
		description: 'Durerea cronică menține sistemul nervos în alertă, împiedicând somnul profund.'
	},
	HISTAMINE: {
		id: 'HISTAMINE',
		name: 'Histamină',
		description: 'Histamina crescută seara produce congestie, mâncărimi și treziri — creierul nu primește semnalul de somn.'
	},
	METABOLIC: {
		id: 'METABOLIC',
		name: 'Metabolic',
		description: 'Glicemia instabilă produce treziri nocturne prin activarea cortizolului când zahărul din sânge scade.'
	},
	HORMONAL: {
		id: 'HORMONAL',
		name: 'Hormonal',
		description: 'Dezechilibrele hormonale (progesteron, estrogen, tiroidă) afectează direct arhitectura somnului.'
	},
	RESPIRATORY: {
		id: 'RESPIRATORY',
		name: 'Respirator',
		description: 'Obstrucția căilor aeriene (sforăit, apnee) fragmentează somnul și reduce oxigenarea creierului.'
	},
	UROLOGICAL: {
		id: 'UROLOGICAL',
		name: 'Urologic',
		description: 'Trezirile frecvente pentru urinat fragmentează somnul și împiedică ciclurile complete de somn profund.'
	},
	NEUROMOTOR: {
		id: 'NEUROMOTOR',
		name: 'Neuromotor',
		description: 'Sindromul picioarelor neliniștite semnalează un dezechilibru de fier sau dopamină care perturbă adormirea.'
	}
};
