import type {
	DiagnosticState,
	DiagnosticResult,
	SaboteurDominance,
	PillarId,
	PillarStatus,
	ProtocolPhase,
	ProtocolPhaseId,
	ProtocolAction,
	AdaptationPhaseId,
	CausalLabel
} from '$lib/types';
import { sleepArchetypes } from './archetypes';
import { pillars, allPillarIds, adaptationPhases, scenarios, causalLabels } from './pillars';
import { step2Items, step3Items, step4Questions } from './steps';
import { pillarActions } from './protocols';

export function calculateDiagnosticResult(state: DiagnosticState): DiagnosticResult {
	const archetype = sleepArchetypes[state.selectedArchetype!];

	const derivedCausalLabels = deriveCausalLabels(state);

	const externalCount = state.externalSaboteurs.length;
	const internalCount = state.internalSaboteurs.length;
	const saboteurDominance = classifySaboteurDominance(externalCount, internalCount);

	const safetyCompromised = state.safetyScore >= 3;
	const adaptationPhase = deriveAdaptationPhase(state.safetyScore);

	const scenarioId = determineScenario(saboteurDominance, safetyCompromised);
	const scenario = scenarios[scenarioId];

	const compromisedPillars = calculateCompromisedPillars(state);

	const protocol = generateProtocol(compromisedPillars.map((cp) => cp.pillar.id));

	return {
		archetype,
		causalLabels: derivedCausalLabels,
		adaptationPhase: adaptationPhases[adaptationPhase],
		saboteurDominance,
		externalSaboteurCount: externalCount,
		internalSaboteurCount: internalCount,
		safetyScore: state.safetyScore,
		safetyCompromised,
		scenario,
		compromisedPillars,
		protocol
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
	return labels;
}

function classifySaboteurDominance(
	externalCount: number,
	internalCount: number
): SaboteurDominance {
	const externalDominant = externalCount >= 3;
	const internalDominant = internalCount >= 2;
	if (externalDominant && internalDominant) return 'BOTH';
	if (externalDominant) return 'EXTERNAL';
	if (internalDominant) return 'INTERNAL';
	return 'NONE';
}

function deriveAdaptationPhase(safetyScore: number): AdaptationPhaseId {
	if (safetyScore <= 1) return 'EARLY_ALERT';
	if (safetyScore <= 3) return 'ACTIVE_COMPENSATION';
	return 'ADAPTIVE_EXHAUSTION';
}

function determineScenario(
	saboteurType: SaboteurDominance,
	safetyCompromised: boolean
): import('$lib/types').ScenarioId {
	if (safetyCompromised) return 'NEUROENDOCRINE';
	if (saboteurType === 'EXTERNAL') return 'LIFESTYLE';
	if (saboteurType === 'INTERNAL') return 'MEDICAL';
	if (saboteurType === 'BOTH') return 'GRADUAL';
	return 'LIFESTYLE';
}

function calculateCompromisedPillars(
	state: DiagnosticState
): { pillar: import('$lib/types').Pillar; status: PillarStatus }[] {
	const pillarHits: Record<PillarId, number> = {} as Record<PillarId, number>;
	for (const id of allPillarIds) {
		pillarHits[id] = 0;
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

	for (const [qId, answer] of Object.entries(state.safetyAnswers)) {
		if (answer) {
			const question = step4Questions.find((q) => q.id === qId);
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
