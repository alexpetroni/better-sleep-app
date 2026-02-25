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
	| 'NEUROMOTOR'
	| 'DEFICIENCY'
	| 'INFLAMMATORY'
	| 'EMOTIONAL';

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
	| 'LATE_EATING'
	| 'INTENSE_EVENING_EXERCISE'
	| 'PARTNER_DISTURBANCE'
	| 'WORKING_IN_BED'
	| 'EVENING_FLUIDS'
	| 'NICOTINE'
	| 'BAD_MATTRESS'
	| 'POOR_VENTILATION'
	| 'STIMULANT_MEDICATION'
	| 'SUBSTANCE_WITHDRAWAL';

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
	| 'RLS'
	| 'IRON_MAGNESIUM_DEFICIT'
	| 'CHRONIC_INFLAMMATION'
	| 'BRUXISM'
	| 'DYSBIOSIS';

// ═══════════════════════════════════════
// EMOTIONAL SABOTEURS (Step 4)
// ═══════════════════════════════════════

export type EmotionalSaboteurId =
	| 'UNRESOLVED_TRAUMA'
	| 'DEPRESSION'
	| 'CHRONIC_ANXIETY'
	| 'RELATIONAL_STRESS';

// ═══════════════════════════════════════
// SABOTEUR ITEM (shared for steps 2 & 3)
// ═══════════════════════════════════════

export interface SaboteurItem {
	id: string;
	label: string;
	pillarImpact: PillarId[];
	causalLabel?: CausalLabelId;
	details?: string;
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
// SAFETY ASSESSMENT (Step 5)
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
// SCENARIOS (Step 6 output)
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
// NARRATIVES (result page)
// ═══════════════════════════════════════

export interface ArchetypeNarrative {
	recognition: string; // Paragraph 1: experience validation
	mechanism: string; // Paragraph 2: biological explanation
}

export interface CausalLabelFragment {
	inlinePhrase: string; // Short phrase that integrates into a sentence
}

// ═══════════════════════════════════════
// DEMOGRAPHICS (Step 6)
// ═══════════════════════════════════════

export type BiologicalSex = 'M' | 'F' | 'UNSPECIFIED';
export type AgeRange = '18_30' | '31_45' | '46_55' | '56_PLUS';
export type MenopauseStatus = 'PRE' | 'PERI' | 'POST' | 'UNSURE' | 'NA';
export type BodyType = 'SLIM' | 'AVERAGE' | 'OVERWEIGHT' | 'UNSPECIFIED';

export interface Demographics {
	sex: BiologicalSex;
	ageRange: AgeRange;
	menopauseStatus: MenopauseStatus;
	bodyType: BodyType;
}

// ═══════════════════════════════════════
// DIAGNOSTIC STATE
// ═══════════════════════════════════════

export type DiagnosticStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type SaboteurDominance = 'EXTERNAL' | 'INTERNAL' | 'EMOTIONAL' | 'MIXED' | 'NONE';

export interface DiagnosticState {
	currentStep: DiagnosticStep;
	selectedArchetype: SleepArchetypeId | null;
	externalSaboteurs: ExternalSaboteurId[];
	internalSaboteurs: InternalSaboteurId[];
	emotionalSaboteurs: EmotionalSaboteurId[];
	safetyAnswers: Record<string, boolean>;
	safetyScore: number;
	demographics: Demographics | null;
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
	emotionalSaboteurCount: number;
	selectedExternalSaboteurs: { id: ExternalSaboteurId; label: string }[];
	selectedInternalSaboteurs: { id: InternalSaboteurId; label: string }[];
	selectedEmotionalSaboteurs: { id: EmotionalSaboteurId; label: string }[];
	safetyScore: number;
	safetyCompromised: boolean;
	scenario: Scenario;
	compromisedPillars: { pillar: Pillar; status: PillarStatus }[];
	protocol: ProtocolPhase[];
	demographics: Demographics | null;
}
