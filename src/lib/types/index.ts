// ═══════════════════════════════════════
// SLEEP ARCHETYPES (8, mapped 1:1 to patterns)
// ═══════════════════════════════════════

export type SleepArchetypeId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';

export interface SleepArchetype {
	id: SleepArchetypeId;
	name: string;
	nameEn: string;
	description: string;
	keyPhrase: string;
}

// ═══════════════════════════════════════
// CAUSAL LABELS (derived from internal saboteurs)
// ═══════════════════════════════════════

export type CausalLabelId =
	| 'GASTROINTESTINAL'
	| 'PAIN'
	| 'HISTAMINE'
	| 'METABOLIC'
	| 'HORMONAL'
	| 'RESPIRATORY'
	| 'UROLOGICAL'
	| 'NEUROMOTOR';

export interface CausalLabel {
	id: CausalLabelId;
	name: string;
	description: string;
}

// ═══════════════════════════════════════
// EXTERNAL SABOTEURS (Step 2)
// ═══════════════════════════════════════

export type ExternalSaboteurId =
	| 'CAFFEINE_LATE'
	| 'SCREENS_LATE'
	| 'NO_MORNING_LIGHT'
	| 'IRREGULAR_SCHEDULE'
	| 'EVENING_ALCOHOL'
	| 'NO_DAILY_MOVEMENT'
	| 'CHILD_NOISE_WAKING'
	| 'BEDROOM_NOT_DARK'
	| 'WARM_BEDROOM'
	| 'LATE_EATING';

// ═══════════════════════════════════════
// INTERNAL SABOTEURS (Step 3)
// ═══════════════════════════════════════

export type InternalSaboteurId =
	| 'REFLUX'
	| 'CHRONIC_PAIN'
	| 'HISTAMINE'
	| 'BLOOD_SUGAR'
	| 'HORMONAL'
	| 'APNEA'
	| 'NOCTURIA'
	| 'RLS';

// ═══════════════════════════════════════
// SABOTEUR ITEM (shared for steps 2 & 3)
// ═══════════════════════════════════════

export interface SaboteurItem {
	id: string;
	label: string;
	pillarImpact: PillarId[];
	causalLabel?: CausalLabelId;
}

// ═══════════════════════════════════════
// PILLARS (8 pillars of regenerative sleep)
// ═══════════════════════════════════════

export type PillarId =
	| 'CIRCADIAN_COHERENCE'
	| 'NEUROVEGETATIVE_SAFETY'
	| 'METABOLIC_QUIET'
	| 'HORMONAL_HARMONY'
	| 'MITOCHONDRIAL_INTEGRITY'
	| 'GLYMPHATIC_FLOW'
	| 'RESPIRATORY_STABILITY'
	| 'EMOTIONAL_CLOSURE';

export interface Pillar {
	id: PillarId;
	name: string;
	nameEn: string;
	description: string;
}

export type PillarStatus = 'OK' | 'COMPROMISED' | 'CRITICAL';

// ═══════════════════════════════════════
// SAFETY ASSESSMENT (Step 4)
// ═══════════════════════════════════════

export interface SafetyQuestion {
	id: string;
	text: string;
	pillarImpact: PillarId[];
}

// ═══════════════════════════════════════
// ADAPTATION PHASE (derived from safety score, replaces Selye)
// ═══════════════════════════════════════

export type AdaptationPhaseId = 'EARLY_ALERT' | 'ACTIVE_COMPENSATION' | 'ADAPTIVE_EXHAUSTION';

export interface AdaptationPhase {
	id: AdaptationPhaseId;
	name: string;
	description: string;
}

// ═══════════════════════════════════════
// SCENARIOS (Step 5 output)
// ═══════════════════════════════════════

export type ScenarioId = 'LIFESTYLE' | 'MEDICAL' | 'NEUROENDOCRINE' | 'GRADUAL';

export interface Scenario {
	id: ScenarioId;
	title: string;
	description: string;
}

// ═══════════════════════════════════════
// PROTOCOL
// ═══════════════════════════════════════

export type ProtocolPhaseId = 'REMOVE' | 'REPAIR' | 'REGULATE';

export interface ProtocolAction {
	text: string;
	pillar: PillarId;
	priority: number;
}

export interface ProtocolPhase {
	id: ProtocolPhaseId;
	name: string;
	description: string;
	actions: ProtocolAction[];
}

// ═══════════════════════════════════════
// DIAGNOSTIC STATE
// ═══════════════════════════════════════

export type DiagnosticStep = 1 | 2 | 3 | 4 | 5;

export type SaboteurDominance = 'EXTERNAL' | 'INTERNAL' | 'BOTH' | 'NONE';

export interface DiagnosticState {
	currentStep: DiagnosticStep;
	selectedArchetype: SleepArchetypeId | null;
	externalSaboteurs: ExternalSaboteurId[];
	internalSaboteurs: InternalSaboteurId[];
	safetyAnswers: Record<string, boolean>;
	safetyScore: number;
}

// ═══════════════════════════════════════
// DIAGNOSTIC RESULT (final output)
// ═══════════════════════════════════════

export interface DiagnosticResult {
	archetype: SleepArchetype;
	causalLabels: CausalLabel[];
	adaptationPhase: AdaptationPhase;
	saboteurDominance: SaboteurDominance;
	externalSaboteurCount: number;
	internalSaboteurCount: number;
	selectedExternalSaboteurs: { id: ExternalSaboteurId; label: string }[];
	selectedInternalSaboteurs: { id: InternalSaboteurId; label: string }[];
	safetyScore: number;
	safetyCompromised: boolean;
	scenario: Scenario;
	compromisedPillars: { pillar: Pillar; status: PillarStatus }[];
	protocol: ProtocolPhase[];
}
