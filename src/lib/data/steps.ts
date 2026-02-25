import type {
	SleepArchetypeId,
	SaboteurItem,
	SafetyQuestion,
	ExternalSaboteurId,
	InternalSaboteurId
} from '$lib/types';

// ═══════════════════════════════════════
// STEP 1 — Sleep Pattern (single-select)
// ═══════════════════════════════════════

export interface Step1Option {
	id: SleepArchetypeId;
	label: string;
}

export const step1Options: Step1Option[] = [
	{ id: 'A', label: 'Adorm greu (>30 minute)' },
	{ id: 'B', label: 'Mă trezesc între 2–4 AM' },
	{ id: 'C', label: 'Mă trezesc prea devreme' },
	{ id: 'D', label: 'Mă trezesc frecvent din zgomote / ușor' },
	{ id: 'E', label: 'Dorm dar mă trezesc obosit' },
	{ id: 'F', label: 'Nu mi-e somn până foarte târziu' },
	{ id: 'G', label: 'Mă trezesc cu palpitații / foame' },
	{ id: 'H', label: 'Somnul meu e fragmentat constant' }
];

// ═══════════════════════════════════════
// STEP 2 — External Saboteurs (multi-select)
// ═══════════════════════════════════════

export const step2Items: SaboteurItem[] = [
	{
		id: 'CAFFEINE_LATE' satisfies ExternalSaboteurId,
		label: 'Beau cofeină după ora 14:00',
		pillarImpact: ['CIRCADIAN_COHERENCE', 'NEUROVEGETATIVE_SAFETY']
	},
	{
		id: 'SCREENS_LATE' satisfies ExternalSaboteurId,
		label: 'Stau pe ecrane după ora 22:00',
		pillarImpact: ['CIRCADIAN_COHERENCE', 'EMOTIONAL_CLOSURE']
	},
	{
		id: 'NO_MORNING_LIGHT' satisfies ExternalSaboteurId,
		label: 'Nu am lumină naturală dimineața',
		pillarImpact: ['CIRCADIAN_COHERENCE']
	},
	{
		id: 'IRREGULAR_SCHEDULE' satisfies ExternalSaboteurId,
		label: 'Programul meu de somn variază mult',
		pillarImpact: ['CIRCADIAN_COHERENCE']
	},
	{
		id: 'EVENING_ALCOHOL' satisfies ExternalSaboteurId,
		label: 'Beau alcool seara',
		pillarImpact: ['METABOLIC_QUIET', 'GLYMPHATIC_FLOW']
	},
	{
		id: 'NO_DAILY_MOVEMENT' satisfies ExternalSaboteurId,
		label: 'Nu fac mișcare zilnic',
		pillarImpact: ['MITOCHONDRIAL_INTEGRITY', 'NEUROVEGETATIVE_SAFETY']
	},
	{
		id: 'CHILD_NOISE_WAKING' satisfies ExternalSaboteurId,
		label: 'Copil / zgomot mă trezește',
		pillarImpact: ['NEUROVEGETATIVE_SAFETY']
	},
	{
		id: 'BEDROOM_NOT_DARK' satisfies ExternalSaboteurId,
		label: 'Dormitorul nu e complet întunecat',
		pillarImpact: ['CIRCADIAN_COHERENCE']
	}
];

// ═══════════════════════════════════════
// STEP 3 — Internal Saboteurs (multi-select)
// ═══════════════════════════════════════

export const step3Items: SaboteurItem[] = [
	{
		id: 'REFLUX' satisfies InternalSaboteurId,
		label: 'Am reflux gastric (arsuri, regurgitare)',
		pillarImpact: ['METABOLIC_QUIET', 'RESPIRATORY_STABILITY'],
		causalLabel: 'GASTROINTESTINAL'
	},
	{
		id: 'CHRONIC_PAIN' satisfies InternalSaboteurId,
		label: 'Am dureri cronice',
		pillarImpact: ['NEUROVEGETATIVE_SAFETY'],
		causalLabel: 'PAIN'
	},
	{
		id: 'HISTAMINE' satisfies InternalSaboteurId,
		label: 'Am simptome de histamină (mâncărimi, congestie, flush)',
		pillarImpact: ['METABOLIC_QUIET', 'GLYMPHATIC_FLOW'],
		causalLabel: 'HISTAMINE'
	},
	{
		id: 'BLOOD_SUGAR' satisfies InternalSaboteurId,
		label: 'Am glicemie instabilă (foame, tremur, transpirații nocturne)',
		pillarImpact: ['METABOLIC_QUIET'],
		causalLabel: 'METABOLIC'
	},
	{
		id: 'HORMONAL' satisfies InternalSaboteurId,
		label: 'Am dezechilibru hormonal (perimenopauză, andropauză, tiroidă, ciclu)',
		pillarImpact: ['HORMONAL_HARMONY'],
		causalLabel: 'HORMONAL'
	},
	{
		id: 'APNEA' satisfies InternalSaboteurId,
		label: 'Am sforăit / suspiciune de apnee de somn',
		pillarImpact: ['RESPIRATORY_STABILITY', 'GLYMPHATIC_FLOW'],
		causalLabel: 'RESPIRATORY'
	},
	{
		id: 'NOCTURIA' satisfies InternalSaboteurId,
		label: 'Mă trezesc frecvent pentru a urina',
		pillarImpact: ['NEUROVEGETATIVE_SAFETY'],
		causalLabel: 'UROLOGICAL'
	},
	{
		id: 'RLS' satisfies InternalSaboteurId,
		label: 'Am picioare neliniștite (nevoia de a le mișca, mai ales seara)',
		pillarImpact: ['NEUROVEGETATIVE_SAFETY', 'MITOCHONDRIAL_INTEGRITY'],
		causalLabel: 'NEUROMOTOR'
	}
];

// ═══════════════════════════════════════
// STEP 4 — Biological Safety (yes/no × 5)
// ═══════════════════════════════════════

export const step4Questions: SafetyQuestion[] = [
	{
		id: 'S1',
		text: 'Mă simt în alertă seara, chiar dacă sunt obosit/ă?',
		pillarImpact: ['NEUROVEGETATIVE_SAFETY']
	},
	{
		id: 'S2',
		text: 'Mintea mea nu poate „închide" ziua?',
		pillarImpact: ['EMOTIONAL_CLOSURE']
	},
	{
		id: 'S3',
		text: 'Am nevoie de stimulente (cofeină) ca să funcționez dimineața?',
		pillarImpact: ['MITOCHONDRIAL_INTEGRITY']
	},
	{
		id: 'S4',
		text: 'Mă trezesc obosit/ă aproape zilnic?',
		pillarImpact: ['GLYMPHATIC_FLOW', 'MITOCHONDRIAL_INTEGRITY']
	},
	{
		id: 'S5',
		text: 'Simt pulsul ridicat sau tensiune în corp noaptea?',
		pillarImpact: ['NEUROVEGETATIVE_SAFETY']
	}
];

// Step metadata for UI
export const stepMeta = [
	{ number: 1, title: 'Tiparul', subtitle: 'Care e problema ta dominantă?' },
	{ number: 2, title: 'Externi', subtitle: 'Ce faci tu care afectează somnul?' },
	{ number: 3, title: 'Interni', subtitle: 'Ce face corpul tău noaptea?' },
	{ number: 4, title: 'Siguranță', subtitle: 'Se simte corpul tău în siguranță?' },
	{ number: 5, title: 'Rezultat', subtitle: 'Analiza ta personalizată' }
] as const;
