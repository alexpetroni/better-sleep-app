import { writable, derived } from 'svelte/store';
import type {
	DiagnosticState,
	DiagnosticStep,
	SleepArchetypeId,
	ExternalSaboteurId,
	InternalSaboteurId,
	EmotionalSaboteurId,
	DiagnosticResult
} from '$lib/types';
import { calculateDiagnosticResult } from '$lib/data/scoring';

function createInitialState(): DiagnosticState {
	return {
		currentStep: 1,
		selectedArchetype: null,
		externalSaboteurs: [],
		internalSaboteurs: [],
		emotionalSaboteurs: [],
		safetyAnswers: {},
		safetyScore: 0
	};
}

export const diagnosticState = writable<DiagnosticState>(createInitialState());
export const isComplete = writable(false);

export const currentStep = derived(diagnosticState, ($state) => $state.currentStep);

export const progress = derived(diagnosticState, ($state) => ({
	current: $state.currentStep,
	total: 6,
	percentage: (($state.currentStep - 1) / 5) * 100
}));

export const result = derived(diagnosticState, ($state): DiagnosticResult | null => {
	if ($state.currentStep < 6 || !$state.selectedArchetype) return null;
	return calculateDiagnosticResult($state);
});

export function selectArchetype(archetypeId: SleepArchetypeId): void {
	diagnosticState.update((s) => ({ ...s, selectedArchetype: archetypeId, currentStep: 2 }));
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
