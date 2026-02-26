import { writable, derived } from 'svelte/store';
import type {
	DiagnosticState,
	DiagnosticStep,
	OnsetAnswerId,
	MaintenanceAnswerId,
	MorningStateId,
	ExternalSaboteurId,
	InternalSaboteurId,
	EmotionalSaboteurId,
	Demographics,
	DiagnosticResult
} from '$lib/types';
import { calculateDiagnosticResult, deriveArchetypesFromStep1 } from '$lib/data/scoring';

function createInitialState(): DiagnosticState {
	return {
		currentStep: 1,
		onsetAnswer: null,
		maintenanceAnswer: null,
		selectedArchetype: null,
		secondaryArchetype: null,
		morningState: null,
		externalSaboteurs: [],
		internalSaboteurs: [],
		emotionalSaboteurs: [],
		safetyAnswers: {},
		safetyScore: 0,
		demographics: null
	};
}

export const diagnosticState = writable<DiagnosticState>(createInitialState());
export const isComplete = writable(false);

export const currentStep = derived(diagnosticState, ($state) => $state.currentStep);

export const progress = derived(diagnosticState, ($state) => ({
	current: $state.currentStep,
	total: 7,
	percentage: (($state.currentStep - 1) / 6) * 100
}));

export const result = derived(diagnosticState, ($state): DiagnosticResult | null => {
	if ($state.currentStep < 7 || !$state.selectedArchetype) return null;
	return calculateDiagnosticResult($state);
});

export function submitStep1(
	onset: OnsetAnswerId,
	maintenance: MaintenanceAnswerId,
	morningState: MorningStateId
): void {
	const { primary, secondary } = deriveArchetypesFromStep1(onset, maintenance);
	diagnosticState.update((s) => ({
		...s,
		onsetAnswer: onset,
		maintenanceAnswer: maintenance,
		selectedArchetype: primary,
		secondaryArchetype: secondary,
		morningState,
		currentStep: 2
	}));
}

export function submitExternalSaboteurs(selected: ExternalSaboteurId[]): void {
	diagnosticState.update((s) => ({ ...s, externalSaboteurs: selected, currentStep: 3 }));
}

export function submitInternalSaboteurs(selected: InternalSaboteurId[]): void {
	diagnosticState.update((s) => ({ ...s, internalSaboteurs: selected, currentStep: 4 }));
}

export function submitEmotionalSaboteurs(selected: EmotionalSaboteurId[]): void {
	diagnosticState.update((s) => ({ ...s, emotionalSaboteurs: selected, currentStep: 5 }));
}

export function submitSafetyAnswers(answers: Record<string, boolean>): void {
	const score = Object.values(answers).filter(Boolean).length;
	diagnosticState.update((s) => ({
		...s,
		safetyAnswers: answers,
		safetyScore: score,
		currentStep: 6 as DiagnosticStep
	}));
}

export function submitDemographics(demographics: Demographics): void {
	diagnosticState.update((s) => ({
		...s,
		demographics,
		currentStep: 7 as DiagnosticStep
	}));
	isComplete.set(true);
}

export function goBackOneStep(): void {
	diagnosticState.update((s) => {
		const newStep = Math.max(1, s.currentStep - 1) as DiagnosticStep;
		return { ...s, currentStep: newStep };
	});
	isComplete.set(false);
}

export function resetDiagnostic(): void {
	diagnosticState.set(createInitialState());
	isComplete.set(false);
}
