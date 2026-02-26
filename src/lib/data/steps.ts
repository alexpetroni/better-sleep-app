import type {
	OnsetAnswerId,
	MaintenanceAnswerId,
	MorningStateId,
	SaboteurItem,
	SafetyQuestion,
	ExternalSaboteurId,
	InternalSaboteurId,
	EmotionalSaboteurId,
	BiologicalSex,
	AgeRange,
	MenopauseStatus,
	BodyType
} from '$lib/types';

// ═══════════════════════════════════════
// STEP 1A — Onset: "Cum adormi?" (single-select)
// ═══════════════════════════════════════

export interface Step1OnsetOption {
	id: OnsetAnswerId;
	label: string;
}

export const step1OnsetOptions: Step1OnsetOption[] = [
	{ id: 'ONSET_NORMAL', label: 'Adorm relativ ușor' },
	{ id: 'A', label: 'Adorm greu (>30 minute)' },
	{ id: 'F', label: 'Nu mi-e somn până foarte târziu' }
];

// ═══════════════════════════════════════
// STEP 1B — Maintenance: "Ce se întâmplă pe parcursul nopții?" (single-select)
// ═══════════════════════════════════════

export interface Step1MaintenanceOption {
	id: MaintenanceAnswerId;
	label: string;
}

export const step1MaintenanceOptions: Step1MaintenanceOption[] = [
	{ id: 'MAINTENANCE_NORMAL', label: 'Dorm continuu, fără probleme' },
	{ id: 'B', label: 'Mă trezesc între 2–4 AM și nu mai pot readormi' },
	{ id: 'C', label: 'Mă trezesc prea devreme (4-5 AM)' },
	{ id: 'D', label: 'Somnul meu e foarte ușor, mă trezesc de la orice' },
	{ id: 'G', label: 'Mă trezesc cu palpitații / transpirații / foame' },
	{ id: 'H', label: 'Somnul meu e fragmentat constant' }
];

// ═══════════════════════════════════════
// STEP 1C — Morning State (single-select, progressive reveal)
// ═══════════════════════════════════════

export interface Step1MorningOption {
	id: MorningStateId;
	label: string;
}

export const step1MorningOptions: Step1MorningOption[] = [
	{ id: 'MORNING_OK', label: 'Mă simt relativ ok dimineața' },
	{ id: 'CALM_TIRED', label: 'Obosit/ă, dar relativ calm/ă' },
	{ id: 'TENSE_TIRED', label: 'Obosit/ă și deja tensionat/ă / presat/ă' },
	{ id: 'FOGGY_HEAVY', label: 'Ceață mentală, corp greu, parcă nu m-am trezit' },
	{ id: 'IRRITABLE_EMPTY', label: 'Iritat/ă, vid interior, fără chef de nimic' },
	{ id: 'ALERT_WIRED', label: 'Surprinzător de alert/ă, parcă n-aș fi dormit' }
];

// ═══════════════════════════════════════
// STEP 2 — External Saboteurs (multi-select)
// ═══════════════════════════════════════

export const step2Items: SaboteurItem[] = [
	// — Ritm și program —
	{
		id: 'IRREGULAR_SCHEDULE' satisfies ExternalSaboteurId,
		label: 'Programul meu de somn variază mult',
		pillarImpact: ['CIRCADIAN_COHERENCE']
	},
	{
		id: 'NO_MORNING_LIGHT' satisfies ExternalSaboteurId,
		label: 'Nu am lumină naturală dimineața',
		pillarImpact: ['CIRCADIAN_COHERENCE', 'HORMONAL_HARMONY']
	},
	{
		id: 'NO_DAILY_MOVEMENT' satisfies ExternalSaboteurId,
		label: 'Nu fac mișcare zilnic',
		pillarImpact: ['MITOCHONDRIAL_INTEGRITY', 'NEUROVEGETATIVE_SAFETY']
	},
	// — Obiceiuri seara —
	{
		id: 'SCREENS_LATE' satisfies ExternalSaboteurId,
		label: 'Stau pe ecrane după ora 22:00',
		pillarImpact: ['CIRCADIAN_COHERENCE', 'EMOTIONAL_CLOSURE']
	},
	{
		id: 'WORKING_IN_BED' satisfies ExternalSaboteurId,
		label: 'Lucrez sau stau pe telefon în pat',
		pillarImpact: ['EMOTIONAL_CLOSURE', 'CIRCADIAN_COHERENCE']
	},
	{
		id: 'LATE_EATING' satisfies ExternalSaboteurId,
		label: 'Mănânc mult sau târziu seara (sub 2h înainte de somn)',
		pillarImpact: ['METABOLIC_QUIET']
	},
	{
		id: 'EVENING_FLUIDS' satisfies ExternalSaboteurId,
		label: 'Beau multe lichide seara',
		pillarImpact: ['METABOLIC_QUIET']
	},
	{
		id: 'INTENSE_EVENING_EXERCISE' satisfies ExternalSaboteurId,
		label: 'Fac sport intens seara (sub 3h înainte de somn)',
		pillarImpact: ['NEUROVEGETATIVE_SAFETY']
	},
	// — Substanțe —
	{
		id: 'CAFFEINE_LATE' satisfies ExternalSaboteurId,
		label: 'Beau cofeină după ora 14:00',
		pillarImpact: ['CIRCADIAN_COHERENCE']
	},
	{
		id: 'EVENING_ALCOHOL' satisfies ExternalSaboteurId,
		label: 'Beau alcool seara',
		pillarImpact: ['METABOLIC_QUIET', 'GLYMPHATIC_FLOW']
	},
	{
		id: 'NICOTINE' satisfies ExternalSaboteurId,
		label: 'Fumez sau folosesc nicotină (țigări, vape)',
		pillarImpact: ['NEUROVEGETATIVE_SAFETY', 'CIRCADIAN_COHERENCE']
	},
	{
		id: 'STIMULANT_MEDICATION' satisfies ExternalSaboteurId,
		label: 'Iau medicamente care pot afecta somnul (corticosteroizi, antidepresive, stimulante)',
		pillarImpact: ['CIRCADIAN_COHERENCE', 'NEUROVEGETATIVE_SAFETY']
	},
	{
		id: 'SUBSTANCE_WITHDRAWAL' satisfies ExternalSaboteurId,
		label: 'Am redus recent o substanță (somnifere, alcool, benzodiazepine)',
		pillarImpact: ['NEUROVEGETATIVE_SAFETY']
	},
	// — Dormitor —
	{
		id: 'BEDROOM_NOT_DARK' satisfies ExternalSaboteurId,
		label: 'Dormitorul nu e complet întunecat',
		pillarImpact: ['HORMONAL_HARMONY']
	},
	{
		id: 'WARM_BEDROOM' satisfies ExternalSaboteurId,
		label: 'Dormitorul meu e prea cald noaptea',
		pillarImpact: ['NEUROVEGETATIVE_SAFETY']
	},
	{
		id: 'POOR_VENTILATION' satisfies ExternalSaboteurId,
		label: 'Dormitorul e slab ventilat (aer închis)',
		pillarImpact: ['RESPIRATORY_STABILITY']
	},
	{
		id: 'BAD_MATTRESS' satisfies ExternalSaboteurId,
		label: 'Salteaua sau perna mea sunt inconfortabile',
		pillarImpact: ['GLYMPHATIC_FLOW']
	},
	{
		id: 'PARTNER_DISTURBANCE' satisfies ExternalSaboteurId,
		label: 'Partenerul mă deranjează noaptea (sforăit, mișcare)',
		pillarImpact: ['GLYMPHATIC_FLOW']
	},
	{
		id: 'CHILD_NOISE_WAKING' satisfies ExternalSaboteurId,
		label: 'Copil / zgomot mă trezește',
		pillarImpact: ['NEUROVEGETATIVE_SAFETY']
	}
];

// ═══════════════════════════════════════
// STEP 3 — Internal Saboteurs (multi-select)
// ═══════════════════════════════════════

export const step3Items: SaboteurItem[] = [
	{
		id: 'REFLUX' satisfies InternalSaboteurId,
		label: 'Simt arsuri în stomac sau gust acid în gură, mai ales când mă culc',
		pillarImpact: ['METABOLIC_QUIET', 'RESPIRATORY_STABILITY'],
		causalLabel: 'GASTROINTESTINAL',
		details: 'Când te culci, acidul urcă din stomac și irită esofagul. Asta activează reflexe de protecție care te trezesc, chiar dacă nu simți arsura conștient.'
	},
	{
		id: 'CHRONIC_PAIN' satisfies InternalSaboteurId,
		label: 'Am dureri care nu trec: de spate, articulare, de cap, sau în alte zone',
		pillarImpact: ['NEUROVEGETATIVE_SAFETY', 'EMOTIONAL_CLOSURE'],
		causalLabel: 'PAIN',
		details: 'Durerea ține sistemul nervos în alertă permanentă. Chiar și când adormi, creierul rămâne vigilent și nu permite somnul profund restaurator.'
	},
	{
		id: 'HISTAMINE' satisfies InternalSaboteurId,
		label: 'Seara am nasul înfundat, mâncărimi pe piele sau obrajii înroșiți, fără motiv clar',
		pillarImpact: ['METABOLIC_QUIET', 'GLYMPHATIC_FLOW'],
		causalLabel: 'HISTAMINE',
		details: 'Histamina e o moleculă de „trezie". Când nivelul ei crește seara (alergii, intoleranțe, stres), creierul primește semnal de alertă în loc de semnal de somn.'
	},
	{
		id: 'BLOOD_SUGAR' satisfies InternalSaboteurId,
		label: 'Mă trezesc noaptea cu foame, tremur, transpirații sau inima care bate tare',
		pillarImpact: ['METABOLIC_QUIET', 'HORMONAL_HARMONY'],
		causalLabel: 'METABOLIC',
		details: 'Când zahărul din sânge scade brusc noaptea, corpul eliberează cortizol și adrenalină ca să compenseze. Te trezești cu inima care bate, transpirații sau senzație de foame.'
	},
	{
		id: 'HORMONAL' satisfies InternalSaboteurId,
		label: 'Am bufeuri, transpirații nocturne, ciclu neregulat sau schimbări legate de vârstă',
		pillarImpact: ['HORMONAL_HARMONY'],
		causalLabel: 'HORMONAL',
		details: 'Progesteronul, estrogenul și hormonii tiroidieni influențează direct temperatura corporală și producția de melatonină. Când fluctuează, somnul devine instabil.'
	},
	{
		id: 'APNEA' satisfies InternalSaboteurId,
		label: 'Sforăi, am pauze de respirație în somn sau mă trezesc cu gura uscată și oboseală',
		pillarImpact: ['RESPIRATORY_STABILITY', 'GLYMPHATIC_FLOW'],
		causalLabel: 'RESPIRATORY',
		details: 'Când căile aeriene se blochează în somn, creierul te trezește pentru a respira. Asta poate apărea de zeci de ori pe noapte fără să-ți amintești.'
	},
	{
		id: 'NOCTURIA' satisfies InternalSaboteurId,
		label: 'Mă trezesc de 2+ ori pe noapte ca să merg la baie',
		pillarImpact: ['NEUROVEGETATIVE_SAFETY', 'HORMONAL_HARMONY'],
		causalLabel: 'UROLOGICAL',
		details: 'Trezirile repetate fragmentează ciclurile de somn. Dacă te trezești de 2+ ori, nu mai ajungi în fazele profunde de regenerare. Cauza poate fi hormonală, nu doar legată de lichide.'
	},
	{
		id: 'RLS' satisfies InternalSaboteurId,
		label: 'Simt nevoia să-mi mișc picioarele seara, un disconfort care nu mă lasă să stau liniștit/ă',
		pillarImpact: ['NEUROVEGETATIVE_SAFETY', 'MITOCHONDRIAL_INTEGRITY'],
		causalLabel: 'NEUROMOTOR',
		details: 'Senzația de disconfort în picioare e legată de un dezechilibru de dopamină sau fier. Apare tipic seara, exact când încerci să te relaxezi.'
	},
	{
		id: 'IRON_MAGNESIUM_DEFICIT' satisfies InternalSaboteurId,
		label: 'Am crampe musculare, oboseală permanentă, sau mi s-a spus că am fierul/magneziul scăzut',
		pillarImpact: ['NEUROVEGETATIVE_SAFETY', 'MITOCHONDRIAL_INTEGRITY'],
		causalLabel: 'DEFICIENCY',
		details: 'Fierul e necesar pentru dopamină (care reglează mișcarea și relaxarea). Magneziul relaxează mușchii și calmează sistemul nervos. Fără ele, corpul nu poate „coborî turațiile".'
	},
	{
		id: 'CHRONIC_INFLAMMATION' satisfies InternalSaboteurId,
		label: 'Am dureri difuze, ceață mentală sau o boală autoimună diagnosticată',
		pillarImpact: ['GLYMPHATIC_FLOW', 'MITOCHONDRIAL_INTEGRITY'],
		causalLabel: 'INFLAMMATORY',
		details: 'Inflamația cronică eliberează citokine care perturbă somnul profund. După perioade de boală sau stres intens, somnul devine superficial și neodihnitor.'
	},
	{
		id: 'BRUXISM' satisfies InternalSaboteurId,
		label: 'Mă trezesc cu maxilarul încleștat sau mi s-a spus că scrâșnesc din dinți noaptea',
		pillarImpact: ['NEUROVEGETATIVE_SAFETY'],
		causalLabel: 'NEUROMOTOR',
		details: 'Scrâșnitul dinților e un semn că sistemul nervos rămâne activat și în somn. Frecvent legat de stres, anxietate sau probleme de ocluzie dentară.'
	},
	{
		id: 'DYSBIOSIS' satisfies InternalSaboteurId,
		label: 'Am frecvent balonare, disconfort abdominal sau intoleranțe alimentare',
		pillarImpact: ['METABOLIC_QUIET', 'GLYMPHATIC_FLOW'],
		causalLabel: 'GASTROINTESTINAL',
		details: 'Intestinul produce ~95% din serotonina corpului (precursorul melatoninei). Când flora intestinală e perturbată, producția de melatonină are de suferit.'
	}
];

// ═══════════════════════════════════════
// STEP 4 — Emotional Saboteurs (multi-select)
// ═══════════════════════════════════════

export const step4Items: SaboteurItem[] = [
	{
		id: 'UNRESOLVED_TRAUMA' satisfies EmotionalSaboteurId,
		label: 'Am trecut printr-o pierdere, un divorț sau o experiență grea care încă mă afectează',
		pillarImpact: ['NEUROVEGETATIVE_SAFETY', 'EMOTIONAL_CLOSURE'],
		causalLabel: 'EMOTIONAL'
	},
	{
		id: 'DEPRESSION' satisfies EmotionalSaboteurId,
		label: 'Dimineața nu am chef de nimic, parcă totul e gri și fără rost',
		pillarImpact: ['EMOTIONAL_CLOSURE', 'CIRCADIAN_COHERENCE'],
		causalLabel: 'EMOTIONAL'
	},
	{
		id: 'CHRONIC_ANXIETY' satisfies EmotionalSaboteurId,
		label: 'Simt un nod în stomac sau în piept care nu trece, o neliniște de fond, tot timpul',
		pillarImpact: ['NEUROVEGETATIVE_SAFETY', 'EMOTIONAL_CLOSURE'],
		causalLabel: 'EMOTIONAL'
	},
	{
		id: 'RELATIONAL_STRESS' satisfies EmotionalSaboteurId,
		label: 'Acasă e tensiune, relația cu partenerul sau familia mă consumă',
		pillarImpact: ['NEUROVEGETATIVE_SAFETY', 'EMOTIONAL_CLOSURE'],
		causalLabel: 'EMOTIONAL'
	}
];

// ═══════════════════════════════════════
// STEP 5 — Biological Safety (yes/no × 5)
// ═══════════════════════════════════════

export const step5Questions: SafetyQuestion[] = [
	{
		id: 'S1',
		text: 'Mă simt în alertă seara, chiar dacă sunt obosit/ă?',
		pillarImpact: ['NEUROVEGETATIVE_SAFETY']
	},
	{
		id: 'S2',
		text: 'Gândurile zilei mă urmăresc seara în pat?',
		pillarImpact: ['EMOTIONAL_CLOSURE']
	},
	{
		id: 'S3',
		text: 'Simt că energia mea a scăzut semnificativ în ultimele luni?',
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
	{ number: 1, title: 'Tiparul', subtitle: 'Cum arată somnul tău?' },
	{ number: 2, title: 'Externi', subtitle: 'Ce faci tu care afectează somnul?' },
	{ number: 3, title: 'Interni', subtitle: 'Ce face corpul tău noaptea?' },
	{ number: 4, title: 'Emoții', subtitle: 'Ce simți tu?' },
	{ number: 5, title: 'Siguranță', subtitle: 'Se simte corpul tău în siguranță?' },
	{ number: 6, title: 'Profil', subtitle: 'Câteva detalii despre tine' },
	{ number: 7, title: 'Rezultat', subtitle: 'Analiza ta personalizată' }
] as const;

// ═══════════════════════════════════════
// STEP 6 — Demographics options
// ═══════════════════════════════════════

export const sexOptions: { id: BiologicalSex; label: string }[] = [
	{ id: 'M', label: 'Bărbat' },
	{ id: 'F', label: 'Femeie' },
	{ id: 'UNSPECIFIED', label: 'Prefer să nu răspund' }
];

export const ageRangeOptions: { id: AgeRange; label: string }[] = [
	{ id: '18_30', label: '18–30 ani' },
	{ id: '31_45', label: '31–45 ani' },
	{ id: '46_55', label: '46–55 ani' },
	{ id: '56_PLUS', label: '56+ ani' }
];

export const menopauseOptions: { id: MenopauseStatus; label: string }[] = [
	{ id: 'PRE', label: 'Premenopauză' },
	{ id: 'PERI', label: 'Perimenopauză' },
	{ id: 'POST', label: 'Postmenopauză' },
	{ id: 'UNSURE', label: 'Nu sunt sigură' }
];

export const bodyTypeOptions: { id: BodyType; label: string }[] = [
	{ id: 'SLIM', label: 'Subțire' },
	{ id: 'AVERAGE', label: 'Bine proporționat(ă)' },
	{ id: 'OVERWEIGHT', label: 'Supraponderal(ă)' },
	{ id: 'UNSPECIFIED', label: 'Prefer să nu răspund' }
];
