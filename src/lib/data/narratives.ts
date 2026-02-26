import type {
	SleepArchetypeId,
	MorningStateId,
	ArchetypeNarrative,
	CausalLabelId,
	CausalLabelFragment,
	CausalLabel,
	Demographics,
	AdaptationPhaseId,
	ScenarioId,
	PillarId,
	PillarStatus,
	Pillar,
	ProtocolPhase
} from '$lib/types';
import { pillars } from './pillars';

// ═══════════════════════════════════════
// A) Archetype narratives
// ═══════════════════════════════════════

export const archetypeNarratives: Record<SleepArchetypeId, ArchetypeNarrative> = {
	A: {
		recognition:
			'Ești obosit, te-ai culcat la oră rezonabilă, dar mintea nu se oprește. Gânduri, planuri, conversații reluate, scenarii de mâine — toate se învârt în buclă. Și cu cât încerci mai tare să adormi, cu atât pare mai imposibil. Nu e o chestiune de disciplină sau de voință.',
		mechanism:
			'Seara, sistemul nervos ar trebui să facă o tranziție: din modul activ (numit simpatic — cel care te ține alert ziua) în modul de repaus (parasimpatic — cel care permite somnul). La tine, tranziția asta nu se face complet. Cortizolul, hormonul care te ține treaz și vigilent, rămâne ridicat seara. Iar melatonina, hormonul care semnalează somnul, nu primește spațiu să crească. Practic, creierul e încă în „modul zi" când tu vrei să dormi.'
	},
	B: {
		recognition:
			'Adormi fără probleme — oboseala te prinde repede. Dar undeva la 2, 3, 4 dimineața, te trezești. Nu de la un zgomot, nu de la un vis. Pur și simplu te trezești, și de-acolo somnul nu mai vine. Stai în pat, aștepți, dar dimineața te găsește deja epuizat.',
		mechanism:
			'Trezirile din mijlocul nopții sunt aproape întotdeauna un semnal metabolic sau hormonal. Zahărul din sânge scade pe parcursul nopții (un lucru normal), dar când scăderea e prea bruscă sau prea accentuată, corpul reacționează eliberând cortizol și adrenalină — hormoni de alertă — ca să compenseze. E un mecanism de protecție care funcționează corect, doar că e calibrat prea sensibil.'
	},
	C: {
		recognition:
			'Te trezești la 4 sau 5 dimineața, fără alarmă, cu ochii deschiși și senzația că somnul s-a terminat. Dar nu s-a terminat — corpul încă avea nevoie de odihnă. Creierul vrea să pornească ziua, dar nu a terminat de recuperat. Rezultatul: un deficit cronic care se acumulează zi de zi.',
		mechanism:
			'Ceasul biologic intern — cel care dictează când adormi și când te trezești — e deplasat spre dimineață. Cortizolul, care în mod normal crește gradual spre ora 6-7, începe să urce cu 2-3 ore mai devreme. Ciclul de somn se scurtează de la capăt: se pierd exact fazele de somn REM și profund care sunt concentrate spre dimineață. Dezechilibrele hormonale pot accelera și mai mult trezirea.'
	},
	D: {
		recognition:
			'Un zgomot din stradă, partenerul care se mișcă, o schimbare de lumină — orice te trezește. Dormi „cu un ochi deschis", mereu parțial vigilent. Dimineața, chiar dacă ai stat 7-8 ore în pat, simți că nu te-ai odihnit cu adevărat.',
		mechanism:
			'Creierul nu intră suficient în fazele profunde ale somnului. Sistemul nervos rămâne parțial activat — ca un paznic care nu se relaxează niciodată complet. Asta se întâmplă de obicei când corpul nu se simte în siguranță la nivel biologic. Nu e vorba de frică conștientă, ci de un semnal profund, automat: sistemul nervos nu a primit confirmarea că e sigur să coboare garda.'
	},
	E: {
		recognition:
			'Dormi suficiente ore, adormi destul de repede, și totuși dimineața te trezești la fel de obosit ca seara. Sau chiar mai obosit. Când spui asta cuiva, auzi „dar tu dormi bine!". Și tu știi că ceva nu e în regulă, dar nu poți pune degetul pe ce anume.',
		mechanism:
			'Somnul are mai multe faze, iar nu toate contează la fel pentru odihnă. Fazele profunde (unde corpul se repară fizic) și cele REM (unde creierul se reorganizează) sunt cele esențiale. La tine, aceste faze sunt probabil scurtate sau fragmentate. În plus, sistemul glimfatic — o rețea care curăță creierul de deșeuri metabolice — funcționează doar în somnul profund. Când acea fază e insuficientă, toxinele se acumulează și oboseala persistă indiferent de câte ore dormi.'
	},
	F: {
		recognition:
			'Nu ți-e somn până la 1, 2, poate 3 noaptea. Nu că nu vrei să dormi — corpul pur și simplu nu e pregătit. Dimineața e un chin, mai ales când trebuie să te trezești „la oră normală". Trăiești practic într-un fus orar diferit de cei din jur.',
		mechanism:
			'Ceasul biologic intern e natural deplasat: melatonina — hormonul care semnalează somnul — se eliberează la tine cu câteva ore mai târziu decât la majoritatea oamenilor. Lumina artificială seara (ecrane, LED-uri) amplifică decalajul, iar lipsa luminii naturale dimineața împiedică recalibrarea. Ajungi cu un deficit cronic de somn, mascat de funcționare pe cofeină și pilot automat.'
	},
	G: {
		recognition:
			'Te trezești brusc, cu inima care bate tare, transpirații, sau o senzație de panică. Uneori o foame intensă te scoate din somn. Trezirile astea sunt diferite de cele obișnuite: vin cu senzații fizice puternice, nu doar cu „m-am trezit".',
		mechanism:
			'Corpul declanșează un răspuns de urgență în timpul nopții. Cel mai frecvent, cauza e o scădere bruscă a zahărului din sânge. Când glicemia scade sub un anumit prag, corpul eliberează adrenalină și cortizol — hormoni de alertă — ca să compenseze. Rezultatul: trezire bruscă cu inima care bate, transpirații sau tremur. E un mecanism de supraviețuire care funcționează corect, dar se declanșează când nu ar trebui.'
	},
	H: {
		recognition:
			'Nu te trezești o dată, ci de 3, 4, 5 ori pe noapte. Uneori readormi, alteori nu. Dimineața simți că nu ai dormit deloc, deși ai stat 7-8 ore în pat. Somnul vine în bucăți care nu se lipesc niciodată într-un întreg.',
		mechanism:
			'Un ciclu complet de somn durează aproximativ 90 de minute și trece prin mai multe faze: somn ușor, somn profund, somn REM. La tine, ciclurile nu reușesc să se completeze — fiecare trezire resetează procesul. Fazele profunde și REM, care sunt cele mai vulnerabile la întreruperi, suferă cel mai mult. Un lucru important: somnul fragmentat afectează sănătatea mai mult decât un somn scurt dar continuu.'
	}
};

// ═══════════════════════════════════════
// A1) Morning state fragments
// ═══════════════════════════════════════

export const morningStateFragments: Record<MorningStateId, string> = {
	MORNING_OK:
		'Dimineața te simți relativ ok — ceea ce înseamnă că corpul reușește să se odihnească parțial, dar nu complet. E un semn bun: baza există, iar intervențiile pot avea efect rapid.',
	CALM_TIRED:
		'Dimineața te simți obosit, dar fără tensiune — un semn că somnul a fost insuficient ca durată sau profunzime, dar sistemul nervos nu e în alertă. Corpul cere mai mult somn profund, nu mai mult calm.',
	TENSE_TIRED:
		'Dimineața vii deja cu tensiune în corp — nu e oboseala normală de „încă nu m-am trezit", ci una care vine cu presiune, strângere, urgență. Sistemul nervos nu s-a oprit cu adevărat peste noapte.',
	FOGGY_HEAVY:
		'Dimineața simți cap greu, ceață mentală, parcă nu te-ai trezit cu adevărat. E un semn clasic că sistemul glimfatic — procesul de curățare a creierului care funcționează doar în somnul profund — nu a avut suficient timp să-și facă treaba.',
	IRRITABLE_EMPTY:
		'Dimineața vine cu iritabilitate și un gol interior. Nu e oboseală fizică — e o epuizare emoțională care se acumulează noapte de noapte. Când somnul nu oferă spațiu de procesare emoțională, dimineața aduce ce a rămas nedigerat.',
	ALERT_WIRED:
		'Te trezești surprinzător de alert — parcă n-ai fi dormit, dar nu ești obosit. E un semn paradoxal: cortizolul, hormonul de alertă, e deja ridicat de dimineața devreme. Corpul funcționează pe adrenalină, nu pe odihnă reală.'
};

// ═══════════════════════════════════════
// A1b) Onset fragments (when onset is secondary)
// ═══════════════════════════════════════

export const onsetFragments: Record<'A' | 'F', string> = {
	A: 'Pe lângă asta, și adormirea e dificilă — mintea nu se oprește ușor seara, ceea ce amplifică oboseala de a doua zi.',
	F: 'Pe lângă asta, ceasul tău biologic e decalat — somnul vine foarte târziu, ceea ce scurtează durata reală de odihnă.'
};

// ═══════════════════════════════════════
// A2) Personalized archetype mechanism (demographics-aware)
// ═══════════════════════════════════════

export function getArchetypeMechanism(id: SleepArchetypeId, demographics: Demographics | null): string {
	const base = archetypeNarratives[id].mechanism;
	if (id !== 'C' || !demographics) return base;

	const isMale = demographics.sex === 'M';
	const isFemale = demographics.sex === 'F';
	const isPost = isFemale && demographics.menopauseStatus === 'POST';
	const isPrePeri = isFemale && (demographics.menopauseStatus === 'PRE' || demographics.menopauseStatus === 'PERI');

	const prefix = 'Ceasul biologic intern — cel care dictează când adormi și când te trezești — e deplasat spre dimineață. Cortizolul, care în mod normal crește gradual spre ora 6-7, începe să urce cu 2-3 ore mai devreme. Ciclul de somn se scurtează de la capăt: se pierd exact fazele de somn REM și profund care sunt concentrate spre dimineață.';

	if (isPrePeri) {
		return `${prefix} Progesteron scăzut sau estrogen fluctuant pot accelera și mai mult trezirea.`;
	}
	if (isPost) {
		return `${prefix} Scăderea estrogenului după menopauză poate accelera și mai mult trezirea.`;
	}
	if (isMale) {
		return `${prefix} Testosteronul scăzut sau dezechilibrele de cortizol pot accelera și mai mult trezirea.`;
	}
	return base;
}

// ═══════════════════════════════════════
// B) Causal label fragments
// ═══════════════════════════════════════

export const causalLabelFragments: Record<CausalLabelId, CausalLabelFragment> = {
	GASTROINTESTINAL: {
		inlinePhrase:
			'refluxul sau digestia perturbată — acidul gastric poate activa reflexe de protecție care te trezesc, chiar dacă nu simți arsura conștient'
	},
	PAIN: {
		inlinePhrase:
			'durerea cronică — ține sistemul nervos în alertă permanentă și reduce accesul la somnul profund'
	},
	HISTAMINE: {
		inlinePhrase:
			'histamina crescută seara — o moleculă de „trezie" care, când e în exces, produce congestie, mâncărimi și treziri'
	},
	METABOLIC: {
		inlinePhrase:
			'glicemia instabilă — când zahărul din sânge scade brusc noaptea, corpul eliberează hormoni de alertă care te trezesc'
	},
	HORMONAL: {
		inlinePhrase:
			'un dezechilibru hormonal (progesteron, estrogen sau tiroidă) care afectează direct temperatura corporală și producția de melatonină'
	},
	RESPIRATORY: {
		inlinePhrase:
			'obstrucția căilor aeriene — când respirația se blochează în somn, creierul te trezește ca să respiri, uneori de zeci de ori pe noapte'
	},
	UROLOGICAL: {
		inlinePhrase:
			'trezirile frecvente pentru urinat — fiecare trezire întrerupe un ciclu de somn, iar ciclurile incomplete nu regenerează'
	},
	NEUROMOTOR: {
		inlinePhrase:
			'senzațiile din picioare la culcare — un semn clasic de dezechilibru de fier sau dopamină care împiedică relaxarea'
	},
	DEFICIENCY: {
		inlinePhrase:
			'un deficit de fier sau magneziu — minerale esențiale pentru relaxarea musculară și calmarea semnalelor nervoase'
	},
	INFLAMMATORY: {
		inlinePhrase:
			'inflamația cronică — citokinele inflamatorii țin sistemul imunitar în alertă și sabotează somnul profund'
	},
	EMOTIONAL: {
		inlinePhrase:
			'o încărcătură emoțională profundă — când sistemul nervos poartă o povară nerezolvată, corpul rămâne în hipervigilență și nu se lasă în somn'
	}
};

// ═══════════════════════════════════════
// B2) Personalized HORMONAL fragment
// ═══════════════════════════════════════

function getHormonalFragment(demographics: Demographics | null): string {
	if (!demographics) return causalLabelFragments.HORMONAL.inlinePhrase;

	const isMale = demographics.sex === 'M';
	const isFemale = demographics.sex === 'F';
	const isPost = isFemale && demographics.menopauseStatus === 'POST';

	if (isMale) {
		return 'un dezechilibru hormonal (testosteron, cortizol sau tiroidă) care afectează direct temperatura corporală și producția de melatonină';
	}
	if (isPost) {
		return 'scăderea hormonilor după menopauză (estrogen, progesteron) care afectează direct temperatura corporală și producția de melatonină';
	}
	return causalLabelFragments.HORMONAL.inlinePhrase;
}

// ═══════════════════════════════════════
// C) buildCausesNarrative
// ═══════════════════════════════════════

export function buildCausesNarrative(labels: CausalLabel[], demographics?: Demographics | null): string {
	if (labels.length === 0) {
		return 'Din răspunsurile tale nu apar cauze interne semnificative. Asta e o veste bună — schimbările de stil de viață și mediu vor avea cel mai mare efect în cazul tău.';
	}

	const getFragment = (id: CausalLabelId): string => {
		if (id === 'HORMONAL') return getHormonalFragment(demographics ?? null);
		return causalLabelFragments[id].inlinePhrase;
	};

	if (labels.length === 1) {
		const fragment = getFragment(labels[0].id);
		return `Pe lângă tiparul de somn, din răspunsurile tale apare și ${fragment}. Protocolul de mai jos ține cont de asta.`;
	}

	const fragments = labels.map((l) => getFragment(l.id));
	const list = joinRomanian(fragments);
	return `Pe lângă tiparul de somn, apar mai mulți factori care contribuie: ${list}. Fiecare e luat în calcul în protocolul tău.`;
}

// ═══════════════════════════════════════
// D) Adaptation phase narratives
// ═══════════════════════════════════════

export const adaptationNarratives: Record<AdaptationPhaseId, string> = {
	EARLY_ALERT:
		'Corpul tău încă funcționează bine. Sistemele de compensare sunt active și eficiente. Dar semnalele există, chiar dacă sunt subtile: poate o oboseală care nu era acolo acum un an, poate o iritabilitate care a devenit „normală", poate o concentrare care nu mai e ce era. Ești într-un moment bun pentru intervenție — schimbări relativ mici acum pot avea un efect mare și pot preveni o deteriorare reală.',
	ACTIVE_COMPENSATION:
		'Funcționezi, dar pe rezerve. Corpul compensează activ lipsa de somn reparator: cu cofeină, cu adrenalină, cu voință pură. Oboseala, iritabilitatea și dificultățile de concentrare sunt deja vizibile — poate nu pentru toată lumea, dar pentru tine, da. Mecanismele de compensare încă funcționează, dar nu la nesfârșit. E un moment bun să intervii, înainte ca rezervele să se epuizeze.',
	ADAPTIVE_EXHAUSTION:
		'Sistemul de adaptare al corpului a ajuns la limită. Probabil trăiești deja un paradox care pare să nu aibă sens: ești profund epuizat, dar nu poți dormi. Pare contradictoriu, dar e biologic real — când corpul e prea obosit, sistemul nervos rămâne în alertă tocmai pentru că nu mai are resurse să se relaxeze. Prioritatea acum nu e „să dormi mai bine". E să restaurezi resursele de bază ale corpului, pas cu pas.'
};

// ═══════════════════════════════════════
// E) Scenario narratives
// ═══════════════════════════════════════

export const scenarioNarratives: Record<ScenarioId, string> = {
	LIFESTYLE:
		'Ceea ce apare din răspunsurile tale e că factorii dominanți sunt legați de obiceiuri și mediu — lucruri pe care le controlezi direct. Nu ai nevoie de suplimente complicate sau intervenții medicale ca prim pas. Câteva schimbări concrete, aplicate cu consistență, pot transforma calitatea somnului.',
	MEDICAL:
		'Răspunsurile tale indică factori interni — fiziologici — care perturbă somnul. Nu înseamnă neapărat ceva grav. Înseamnă că există cauze în corp care răspund bine la intervenția corectă, dar care de obicei nu se rezolvă doar cu „igienă de somn". Un medic de medicină funcțională sau un specialist în somn poate fi un aliat foarte bun aici.',
	NEUROENDOCRINE:
		'Ce apare cel mai clar e că sistemul nervos e suprasolicitat. Într-o situație ca asta, prioritatea nu e încă o regulă de somn sau încă o tehnică. E ceva mai fundamental: corpul trebuie să primească semnalul, la nivel profund, că e sigur să coboare garda. Mai puțină disciplină, mai mult calm. Mai puțin „trebuie", mai mult „e ok".',
	GRADUAL:
		'Din răspunsurile tale apar factori pe mai multe niveluri: externi, interni, poate și emoționali. Nu e neapărat mai grav — dar înseamnă că abordarea corectă e graduală. Un lucru la un moment dat, în ordinea care contează cel mai mult. Protocolul de mai jos reflectă exact această ordine.'
};

// ═══════════════════════════════════════
// F) buildPillarsNarrative
// ═══════════════════════════════════════

export function buildPillarsNarrative(
	compromisedPillars: { pillar: Pillar; status: PillarStatus }[]
): string {
	if (compromisedPillars.length === 0) {
		return 'Niciun pilon de regenerare nu e afectat critic. Protocolul se va concentra pe consolidarea generală a calității somnului.';
	}

	const critical = compromisedPillars
		.filter((cp) => cp.status === 'CRITICAL')
		.map((cp) => cp.pillar.name.toLowerCase());
	const compromised = compromisedPillars
		.filter((cp) => cp.status === 'COMPROMISED')
		.map((cp) => cp.pillar.name.toLowerCase());

	const parts: string[] = [];

	if (critical.length > 0) {
		const list = joinRomanian(critical);
		parts.push(
			critical.length === 1
				? `Zona cea mai afectată e ${list} — aici protocolul va pune accent în mod special`
				: `Zonele cele mai afectate sunt ${list} — aici protocolul va pune accent în mod special`
		);
	}

	if (compromised.length > 0) {
		const list = joinRomanian(compromised);
		if (critical.length > 0) {
			parts.push(
				compromised.length === 1
					? `și ${list} necesită atenție`
					: `și ${list} necesită atenție`
			);
		} else {
			parts.push(
				compromised.length === 1
					? `Zona care necesită atenție e ${list}`
					: `Zonele care necesită atenție sunt ${list}`
			);
		}
	}

	return parts.join('. ') + '.';
}

// ═══════════════════════════════════════
// G) buildProtocolPhaseNarrative
// ═══════════════════════════════════════

const phaseIntros: Record<string, string> = {
	REMOVE: 'Prima fază se concentrează pe ce trebuie oprit sau eliminat — factorii care sabotează activ somnul în acest moment.',
	REPAIR: 'A doua fază reconstruiește bazele — obiceiurile și condițiile care permit somnului să se repare natural.',
	REGULATE: 'A treia fază e de reglare fină — optimizări mai avansate, de aplicat după ce primele două faze sunt stabile.'
};

const connectors = ['Apoi, ', 'Un alt pas: ', 'Pe lângă asta, '];

function lowercaseFirst(s: string): string {
	if (!s) return s;
	return s.charAt(0).toLowerCase() + s.slice(1);
}

export function buildProtocolPhaseNarrative(phase: ProtocolPhase): string {
	if (phase.actions.length === 0) {
		return phaseIntros[phase.id] + ' În cazul tău, nu sunt necesare acțiuni specifice aici — ceea ce e o veste bună.';
	}

	const parts: string[] = [phaseIntros[phase.id]];

	phase.actions.forEach((action, i) => {
		if (i === 0) {
			parts.push(action.text + '.');
		} else {
			const connector = connectors[(i - 1) % connectors.length];
			parts.push(connector + lowercaseFirst(action.text) + '.');
		}
	});

	return parts.join(' ');
}

// ═══════════════════════════════════════
// H) Emotional dominance narrative
// ═══════════════════════════════════════

export const emotionalDominanceNarrative =
	'Ce apare din răspunsurile tale e că factorii dominanți sunt de natură emoțională. Sistemul nervos poartă o povară care depășește ceea ce tehnicile de igienă a somnului pot rezolva. Într-o situație ca asta, cel mai eficient prim pas poate fi psihoterapia — în special EMDR, terapia cognitivă sau terapia somatică. Un terapeut specializat în traumă sau anxietate poate ajuta la restabilirea sentimentului de siguranță interioară de care corpul are nevoie ca să se lase în somn.';

// ═══════════════════════════════════════
// Helper: Romanian list join ("a, b și c")
// ═══════════════════════════════════════

function joinRomanian(items: string[]): string {
	if (items.length === 0) return '';
	if (items.length === 1) return items[0];
	return items.slice(0, -1).join(', ') + ' și ' + items[items.length - 1];
}
