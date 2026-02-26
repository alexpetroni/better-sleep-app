import type {
	DiagnosticState,
	DiagnosticResult,
	Demographics,
	SaboteurDominance,
	PillarId,
	PillarStatus,
	ProtocolPhase,
	ProtocolPhaseId,
	ProtocolAction,
	AdaptationPhaseId,
	CausalLabel,
	SleepArchetypeId,
	MorningStateId,
	OnsetAnswerId,
	MaintenanceAnswerId,
	ExternalSaboteurId,
	InternalSaboteurId,
	EmotionalSaboteurId
} from '$lib/types';
import { sleepArchetypes } from './archetypes';
import { pillars, allPillarIds, adaptationPhases, scenarios, causalLabels } from './pillars';
import { step2Items, step3Items, step4Items, step5Questions } from './steps';
import { pillarActions } from './protocols';

// Archetype → pillar seeds: each archetype contributes hits to relevant pillars
const archetypePillarSeeds: Record<SleepArchetypeId, PillarId[]> = {
	A: ['NEUROVEGETATIVE_SAFETY', 'EMOTIONAL_CLOSURE'],
	B: ['METABOLIC_QUIET', 'NEUROVEGETATIVE_SAFETY'],
	C: ['CIRCADIAN_COHERENCE', 'HORMONAL_HARMONY'],
	D: ['NEUROVEGETATIVE_SAFETY'],
	E: ['GLYMPHATIC_FLOW', 'MITOCHONDRIAL_INTEGRITY'],
	F: ['CIRCADIAN_COHERENCE'],
	G: ['NEUROVEGETATIVE_SAFETY', 'METABOLIC_QUIET'],
	H: ['NEUROVEGETATIVE_SAFETY', 'GLYMPHATIC_FLOW']
};

// Morning state → pillar seeds: each morning state contributes 0-2 pillar hits
const morningStatePillarSeeds: Record<MorningStateId, PillarId[]> = {
	MORNING_OK: [],
	CALM_TIRED: ['GLYMPHATIC_FLOW'],
	TENSE_TIRED: ['NEUROVEGETATIVE_SAFETY', 'EMOTIONAL_CLOSURE'],
	FOGGY_HEAVY: ['GLYMPHATIC_FLOW', 'METABOLIC_QUIET'],
	IRRITABLE_EMPTY: ['EMOTIONAL_CLOSURE'],
	ALERT_WIRED: ['NEUROVEGETATIVE_SAFETY']
};

// Derive primary + secondary archetype from onset + maintenance answers
export function deriveArchetypesFromStep1(
	onset: OnsetAnswerId,
	maintenance: MaintenanceAnswerId
): { primary: SleepArchetypeId; secondary: SleepArchetypeId | null } {
	// 1. maintenance ≠ NORMAL → primary = maintenance ID
	if (maintenance !== 'MAINTENANCE_NORMAL') {
		const primary = maintenance as SleepArchetypeId;
		// onset problematic → secondary
		const secondary = onset !== 'ONSET_NORMAL' ? (onset as SleepArchetypeId) : null;
		return { primary, secondary };
	}
	// 2. maintenance NORMAL, onset ≠ NORMAL → primary = onset ID
	if (onset !== 'ONSET_NORMAL') {
		return { primary: onset as SleepArchetypeId, secondary: null };
	}
	// 3. both NORMAL → primary = E (unrefreshing sleep)
	return { primary: 'E', secondary: null };
}

export function calculateDiagnosticResult(state: DiagnosticState): DiagnosticResult {
	const archetype = sleepArchetypes[state.selectedArchetype!];

	const derivedCausalLabels = deriveCausalLabels(state);

	const externalCount = state.externalSaboteurs.length;
	const internalCount = state.internalSaboteurs.length;
	const emotionalCount = state.emotionalSaboteurs.length;
	const saboteurDominance = classifySaboteurDominance(externalCount, internalCount, emotionalCount);

	const safetyCompromised = state.safetyScore >= 3;
	const adaptationPhase = deriveAdaptationPhase(state.safetyScore);

	const scenarioId = determineScenario(saboteurDominance, safetyCompromised, externalCount + internalCount + emotionalCount);
	const scenario = scenarios[scenarioId];

	const compromisedPillars = calculateCompromisedPillars(state);

	const protocol = generateProtocol(compromisedPillars.map((cp) => cp.pillar.id));
	const personalizedProtocol = personalizeProtocol(protocol, state.demographics, state.internalSaboteurs);

	const selectedExternalSaboteurs = state.externalSaboteurs.map((id) => {
		const item = step2Items.find((i) => i.id === id);
		return { id: id as ExternalSaboteurId, label: item?.label ?? id };
	});

	const selectedInternalSaboteurs = state.internalSaboteurs.map((id) => {
		const item = step3Items.find((i) => i.id === id);
		return { id: id as InternalSaboteurId, label: item?.label ?? id };
	});

	const selectedEmotionalSaboteurs = state.emotionalSaboteurs.map((id) => {
		const item = step4Items.find((i) => i.id === id);
		return { id: id as EmotionalSaboteurId, label: item?.label ?? id };
	});

	const secondaryArchetype = state.secondaryArchetype
		? sleepArchetypes[state.secondaryArchetype]
		: null;

	return {
		archetype,
		secondaryArchetype,
		morningState: state.morningState!,
		causalLabels: derivedCausalLabels,
		adaptationPhase: adaptationPhases[adaptationPhase],
		saboteurDominance,
		externalSaboteurCount: externalCount,
		internalSaboteurCount: internalCount,
		emotionalSaboteurCount: emotionalCount,
		selectedExternalSaboteurs,
		selectedInternalSaboteurs,
		selectedEmotionalSaboteurs,
		safetyScore: state.safetyScore,
		safetyCompromised,
		scenario,
		compromisedPillars,
		protocol: personalizedProtocol,
		demographics: state.demographics
	};
}

function deriveCausalLabels(state: DiagnosticState): CausalLabel[] {
	const labels: CausalLabel[] = [];
	for (const sabId of state.internalSaboteurs) {
		const item = step3Items.find((i) => i.id === sabId);
		if (item?.causalLabel) {
			const label = causalLabels[item.causalLabel];
			if (!labels.some((l) => l.id === label.id)) {
				labels.push(label);
			}
		}
	}
	for (const sabId of state.emotionalSaboteurs) {
		const item = step4Items.find((i) => i.id === sabId);
		if (item?.causalLabel) {
			const label = causalLabels[item.causalLabel];
			if (!labels.some((l) => l.id === label.id)) {
				labels.push(label);
			}
		}
	}
	return labels;
}

function classifySaboteurDominance(
	externalCount: number,
	internalCount: number,
	emotionalCount: number
): SaboteurDominance {
	// Thresholds: external ≥3/19, internal ≥2/12, emotional ≥2/4
	// TODO: external threshold stays at ≥3 (16% of 19). Reconsider after real data collection.
	const externalDominant = externalCount >= 3;
	const internalDominant = internalCount >= 2;
	const emotionalDominant = emotionalCount >= 2;

	const dominantCount = [externalDominant, internalDominant, emotionalDominant].filter(Boolean).length;
	if (dominantCount >= 2) return 'MIXED';
	if (externalDominant) return 'EXTERNAL';
	if (internalDominant) return 'INTERNAL';
	if (emotionalDominant) return 'EMOTIONAL';
	return 'NONE';
}

function deriveAdaptationPhase(safetyScore: number): AdaptationPhaseId {
	if (safetyScore <= 1) return 'EARLY_ALERT';
	if (safetyScore <= 3) return 'ACTIVE_COMPENSATION';
	return 'ADAPTIVE_EXHAUSTION';
}

function determineScenario(
	saboteurType: SaboteurDominance,
	safetyCompromised: boolean,
	totalSaboteurs: number
): import('$lib/types').ScenarioId {
	if (safetyCompromised && saboteurType === 'INTERNAL') return 'MEDICAL';
	if (safetyCompromised && saboteurType === 'EMOTIONAL') return 'MEDICAL';
	if (safetyCompromised) return 'NEUROENDOCRINE';
	if (saboteurType === 'MIXED') return 'GRADUAL';
	if (saboteurType === 'EXTERNAL') return 'LIFESTYLE';
	if (saboteurType === 'INTERNAL') return 'MEDICAL';
	if (saboteurType === 'EMOTIONAL') return 'MEDICAL';
	if (totalSaboteurs > 0) return 'GRADUAL';
	return 'LIFESTYLE';
}

function calculateCompromisedPillars(
	state: DiagnosticState
): { pillar: import('$lib/types').Pillar; status: PillarStatus }[] {
	const pillarHits: Record<PillarId, number> = {} as Record<PillarId, number>;
	for (const id of allPillarIds) {
		pillarHits[id] = 0;
	}

	// Archetype seeds
	if (state.selectedArchetype) {
		const seeds = archetypePillarSeeds[state.selectedArchetype];
		for (const pillarId of seeds) {
			pillarHits[pillarId]++;
		}
	}

	// Secondary archetype seeds
	if (state.secondaryArchetype) {
		const seeds = archetypePillarSeeds[state.secondaryArchetype];
		for (const pillarId of seeds) {
			pillarHits[pillarId]++;
		}
	}

	// Morning state seeds
	if (state.morningState) {
		const seeds = morningStatePillarSeeds[state.morningState];
		for (const pillarId of seeds) {
			pillarHits[pillarId]++;
		}
	}

	for (const sabId of state.externalSaboteurs) {
		const item = step2Items.find((i) => i.id === sabId);
		if (item) {
			for (const pillarId of item.pillarImpact) {
				pillarHits[pillarId]++;
			}
		}
	}

	for (const sabId of state.internalSaboteurs) {
		const item = step3Items.find((i) => i.id === sabId);
		if (item) {
			for (const pillarId of item.pillarImpact) {
				pillarHits[pillarId]++;
			}
		}
	}

	for (const sabId of state.emotionalSaboteurs) {
		const item = step4Items.find((i) => i.id === sabId);
		if (item) {
			for (const pillarId of item.pillarImpact) {
				pillarHits[pillarId]++;
			}
		}
	}

	for (const [qId, answer] of Object.entries(state.safetyAnswers)) {
		if (answer) {
			const question = step5Questions.find((q) => q.id === qId);
			if (question) {
				for (const pillarId of question.pillarImpact) {
					pillarHits[pillarId]++;
				}
			}
		}
	}

	return Object.entries(pillarHits)
		.filter(([, hits]) => hits > 0)
		.map(([id, hits]) => ({
			pillar: pillars[id as PillarId],
			status: (hits >= 3 ? 'CRITICAL' : 'COMPROMISED') as PillarStatus
		}))
		.sort((a, b) => {
			const order: Record<PillarStatus, number> = { CRITICAL: 0, COMPROMISED: 1, OK: 2 };
			return order[a.status] - order[b.status];
		});
}

function generateProtocol(
	compromisedPillarIds: PillarId[]
): ProtocolPhase[] {
	return [
		buildPhase('REMOVE', 'Elimină Sabotorii', 'Primii pași: oprește ce îți sabotează somnul activ.', compromisedPillarIds),
		buildPhase('REPAIR', 'Repară Terenul', 'Reconstruiește bazele unui somn sănătos.', compromisedPillarIds),
		buildPhase('REGULATE', 'Reglează Axa', 'Optimizare și intervenții mai avansate.', compromisedPillarIds)
	];
}

function buildPhase(
	id: ProtocolPhaseId,
	name: string,
	description: string,
	pillarIds: PillarId[]
): ProtocolPhase {
	const allActions: ProtocolAction[] = [];
	const phaseKey = id === 'REMOVE' ? 'remove' : id === 'REPAIR' ? 'repair' : 'regulate';

	for (const pillarId of pillarIds) {
		const pool = pillarActions[pillarId];
		if (pool) {
			allActions.push(...pool[phaseKey]);
		}
	}

	const unique = deduplicateActions(allActions);
	const sorted = unique.sort((a, b) => a.priority - b.priority);
	const selected = sorted.slice(0, 5);

	return { id, name, description, actions: selected };
}

function deduplicateActions(actions: ProtocolAction[]): ProtocolAction[] {
	const seen = new Set<string>();
	return actions.filter((action) => {
		if (seen.has(action.text)) return false;
		seen.add(action.text);
		return true;
	});
}

function personalizeProtocol(
	phases: ProtocolPhase[],
	demographics: Demographics | null,
	internalSaboteurs: string[]
): ProtocolPhase[] {
	if (!demographics) return phases;

	const isMale = demographics.sex === 'M';
	const isFemale = demographics.sex === 'F';
	const isPeriPost = isFemale && (demographics.menopauseStatus === 'PERI' || demographics.menopauseStatus === 'POST');
	const isPre = isFemale && demographics.menopauseStatus === 'PRE';
	const hasApnea = internalSaboteurs.includes('APNEA');
	const isOverweight = demographics.bodyType === 'OVERWEIGHT';

	const hormonalRegulateOld = 'Consultă un specialist pentru suport hormonal (progesteron, tiroidă)';

	return phases.map((phase) => {
		let actions = phase.actions.map((action) => {
			if (action.text === hormonalRegulateOld) {
				if (isPeriPost) {
					return { ...action, text: 'Discută cu ginecologul despre suport hormonal adaptat menopauzei' };
				} else if (isPre) {
					return { ...action, text: 'Consultă un medic pentru evaluarea ciclului hormonal (progesteron, tiroidă)' };
				} else if (isMale) {
					return { ...action, text: 'Consultă un medic pentru evaluarea hormonilor (testosteron, tiroidă, cortizol)' };
				}
			}
			return action;
		});

		// Add weight action for RESPIRATORY_STABILITY if overweight + apnea
		if (isOverweight && hasApnea && phase.id === 'REPAIR') {
			const hasWeightAction = actions.some((a) => a.text.includes('greutăți') || a.text.includes('greutatea'));
			if (!hasWeightAction) {
				actions = [
					...actions,
					{
						text: 'Reducerea greutății poate îmbunătăți respirația în somn',
						pillar: 'RESPIRATORY_STABILITY' as PillarId,
						priority: 2
					}
				];
			}
		}

		return { ...phase, actions };
	});
}
