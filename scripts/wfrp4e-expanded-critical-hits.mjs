//#region src/module/constants.ts
var e = "wfrp4e-expanded-critical-hits", t = "wfrp4e", n = "debugConsoleLogging";
//#endregion
//#region src/module/logging.ts
function r(e, ...t) {
	s() && console.debug(e, ...t);
}
function i(e, ...t) {
	console.info(e, ...t);
}
function a(e, ...t) {
	console.warn(e, ...t);
}
function o(e, ...t) {
	console.error(e, ...t);
}
function s() {
	try {
		return localStorage.getItem("wfrp4e-expanded-critical-hits.debug") === "true" ? !0 : game?.settings?.settings?.has("wfrp4e-expanded-critical-hits.debugConsoleLogging") ? !!game.settings.get(e, n) : !1;
	} catch {
		return !1;
	}
}
//#endregion
//#region src/module/wfrp4e/critical-compendiums.ts
var c = "expanded-critical-wounds", l = "expanded-critical-tables", u = !1;
async function d() {
	if (u) return;
	let t = game.wfrp4e?.tables, n = t?.findTable?.bind(t);
	if (!t || typeof n != "function") {
		a(`${e} | WFRP table lookup API was unavailable.`);
		return;
	}
	let r = await m();
	r.size === 0 && a(`${e} | No expanded critical RollTables were found in the module pack.`), t.findTable = (e) => n(e) || r.get(e.toLowerCase()), u = !0;
}
async function f() {
	return {
		criticalItems: await h(c, "Items"),
		criticalTables: await h(l, "Tables")
	};
}
function p(t) {
	return `${e}.${t}`;
}
async function m() {
	let e = /* @__PURE__ */ new Map(), t = game.packs.get(p(l));
	if (!t) return e;
	let n = await t.getDocuments();
	for (let t of n) {
		let n = t.getFlag("wfrp4e", "key");
		typeof n == "string" && e.set(n.toLowerCase(), t);
	}
	return e;
}
async function h(e, t) {
	let n = p(e), r = game.packs.get(n);
	return r ? {
		documentCount: r.index?.size ?? (await r.getDocuments()).length,
		isAvailable: !0,
		label: r.title ?? t,
		packId: n
	} : {
		documentCount: 0,
		isAvailable: !1,
		label: t,
		packId: n
	};
}
//#endregion
//#region src/types/critical-hits.ts
var g = [
	"arrowsBolts",
	"bullets",
	"crushing",
	"cutting",
	"flameEnergy",
	"piercing",
	"shrapnelShot",
	"sling",
	"teethClaws",
	"unarmed"
], _ = [
	"arrows",
	"bolts",
	"bullets",
	"claws",
	"crushing",
	"cutting",
	"energy",
	"flame",
	"piercing",
	"shot",
	"shrapnel",
	"sling",
	"teeth",
	"unarmed"
], ee = {
	arrowsBolts: "echarrowbolt",
	bullets: "echbullet",
	crushing: "echcrushing",
	cutting: "echcutting",
	flameEnergy: "echflameenergy",
	piercing: "echpiercing",
	shrapnelShot: "echshrapnelshot",
	sling: "echsling",
	teethClaws: "echteethclaws",
	unarmed: "echunarmed"
}, v = {
	arrows: "echwoundingarrows",
	bolts: "echwoundingbolts",
	bullets: "echwoundingbullets",
	claws: "echwoundingclaws",
	crushing: "echwoundingcrushing",
	cutting: "echwoundingcutting",
	energy: "echwoundingenergy",
	flame: "echwoundingflame",
	piercing: "echwoundingpiercing",
	shot: "echwoundingshot",
	shrapnel: "echwoundingshrapnel",
	sling: "echwoundingsling",
	teeth: "echwoundingteeth",
	unarmed: "echwoundingunarmed"
}, te = {
	arrowsBolts: "Arrows/Bolts",
	bullets: "Bullets",
	crushing: "Crushing",
	cutting: "Cutting",
	flameEnergy: "Flame & Energy",
	piercing: "Piercing",
	shrapnelShot: "Shrapnel & Shot",
	sling: "Sling",
	teethClaws: "Teeth & Claws",
	unarmed: "Unarmed"
}, y = {
	arrows: "Arrows",
	bolts: "Bolts",
	bullets: "Bullets",
	claws: "Claws",
	crushing: "Crushing",
	cutting: "Cutting",
	energy: "Energy",
	flame: "Flame",
	piercing: "Piercing",
	shot: "Shot",
	shrapnel: "Shrapnel",
	sling: "Sling",
	teeth: "Teeth",
	unarmed: "Unarmed"
}, ne = {
	arrows: "arrowsBolts",
	bolts: "arrowsBolts",
	bullets: "bullets",
	claws: "teethClaws",
	crushing: "crushing",
	cutting: "cutting",
	energy: "flameEnergy",
	flame: "flameEnergy",
	piercing: "piercing",
	shot: "shrapnelShot",
	shrapnel: "shrapnelShot",
	sling: "sling",
	teeth: "teethClaws",
	unarmed: "unarmed"
}, re = new Map(_.map((e) => [v[e], ne[e]])), ie = new Map(g.map((e) => [ee[e], e]));
function ae(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = re.get(n) ?? ie.get(n);
		e && t.add(e);
	}
	return g.filter((e) => t.has(e));
}
function oe(e, t = Math.random()) {
	if (e.length !== 0) return e[Math.min(Math.floor(t * e.length), e.length - 1)];
}
//#endregion
//#region src/functions/critical-hits/damage-inference/index.ts
var se = {
	accurate: "none",
	blackpowder: "bullets",
	blast: "shrapnelShot",
	damaging: "none",
	defensive: "none",
	distract: "none",
	entangle: "none",
	fast: "none",
	hack: "cutting",
	impact: "crushing",
	impale: "piercing",
	incendiary: "flameEnergy",
	magical: "none",
	penetrating: "none",
	pistol: "bullets",
	poisonous: "none",
	precise: "none",
	pummel: "crushing",
	recoverable: "none",
	repeater: "none",
	salvo: "bullets",
	shield: "crushing",
	slash: "cutting",
	slashing: "cutting",
	spread: "shrapnelShot",
	siege: "none",
	trapblade: "cutting",
	trip: "none",
	unbreakable: "none",
	volley: "arrowsBolts",
	warpstone: "flameEnergy",
	wrap: "none",
	zzap: "flameEnergy",
	blinding: "none",
	durable: "none",
	fine: "none",
	lightweight: "none",
	practical: "none"
}, ce = {
	basic: "none",
	blackpowder: "bullets",
	bow: "arrowsBolts",
	brawling: "unarmed",
	cavalry: "none",
	crossbow: "arrowsBolts",
	entangling: "none",
	engineering: "shrapnelShot",
	explosive: "shrapnelShot",
	explosives: "shrapnelShot",
	fencing: "piercing",
	flail: "crushing",
	parrying: "none",
	parry: "none",
	polarm: "none",
	polearm: "none",
	sling: "sling",
	throwing: "piercing",
	twohanded: "none"
};
function le(e) {
	if (e.explicitCategories.length > 0) return {
		categories: pe(e.explicitCategories),
		matches: [],
		source: "explicit"
	};
	if (e.inferFromWeaponProperties) {
		let t = de(e.weaponPropertyKeys, e.weaponPropertyMapping);
		if (t.length > 0) return {
			categories: fe(t),
			matches: t,
			source: "weaponProperty"
		};
	}
	if (e.inferFromWeaponTypes) {
		let t = de(e.weaponTypeKeys, e.weaponTypeMapping);
		if (t.length > 0) return {
			categories: fe(t),
			matches: t,
			source: "weaponType"
		};
	}
	return {
		categories: [],
		matches: [],
		source: "none"
	};
}
function b(e) {
	return e.trim().toLowerCase().replaceAll(/[^a-z0-9]/g, "");
}
function x(e) {
	let t = ue(e), n = {};
	for (let [e, r] of Object.entries(t ?? {})) he(r) && (n[b(e)] = r);
	return n;
}
function ue(e) {
	if (typeof e == "string") try {
		return ue(JSON.parse(e));
	} catch {
		return;
	}
	if (typeof e == "object" && e && !Array.isArray(e)) return e;
}
function de(e, t) {
	let n = x(t), r = e.flatMap((e) => {
		let t = n[b(e)];
		return t && t !== "none" ? [{
			category: t,
			key: e
		}] : [];
	}), i = /* @__PURE__ */ new Set();
	return g.flatMap((e) => r.filter((t) => {
		let n = `${e}:${b(t.key)}`;
		return t.category !== e || i.has(n) ? !1 : (i.add(n), !0);
	}));
}
function fe(e) {
	return pe(e.map((e) => e.category));
}
function pe(e) {
	let t = new Set(e);
	return g.filter((e) => t.has(e));
}
function me(e) {
	return typeof e == "string" && g.includes(e);
}
function he(e) {
	return e === "none" || me(e);
}
//#endregion
//#region src/functions/critical-hits/natural-one-critical/index.ts
function ge(e) {
	let t = Number(e.roll), n = Number(e.target);
	return t === 1 && t <= n;
}
//#endregion
//#region src/functions/critical-hits/table-keys.ts
function _e(e, t, n) {
	return `ech-crit-${e}-${t}-${n}`.toLowerCase();
}
function ve(e) {
	let t = e.toLowerCase();
	if (t === "head" || t === "body") return t;
	if (t.endsWith("arm")) return "arm";
	if (t.endsWith("leg")) return "leg";
}
function ye(e) {
	return e ? "upInArms" : "core";
}
//#endregion
//#region src/module/settings.ts
var S = "enableCriticalReplacement", C = "enableNaturalOneCriticals", w = "inferDamageFromWeaponProperties", T = "inferDamageFromWeaponTypes", E = "weaponPropertyDamageMapping", D = "weaponTypeDamageMapping", O = JSON.stringify(se), be = JSON.stringify(ce), xe = JSON.stringify({
	hack: "cutting",
	impale: "piercing",
	pummel: "crushing",
	slash: "cutting"
});
function Se() {
	game.settings.register(e, n, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.debugConsoleLogging.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.debugConsoleLogging.hint",
		scope: "client",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, S, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, C, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableNaturalOneCriticals.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableNaturalOneCriticals.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, w, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponProperties.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponProperties.hint",
		scope: "world",
		config: !0,
		default: !0,
		type: Boolean
	}), game.settings.register(e, E, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponPropertyDamageMapping.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponPropertyDamageMapping.hint",
		scope: "world",
		config: !1,
		default: O,
		type: String
	}), game.settings.register(e, T, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponTypes.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponTypes.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, D, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponTypeDamageMapping.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponTypeDamageMapping.hint",
		scope: "world",
		config: !1,
		default: be,
		type: String
	}), r(`${e} | Settings registered`, k());
}
function Ce() {
	return !!game.settings.get(e, S);
}
function we() {
	return !!game.settings.get(e, C);
}
async function Te() {
	if (!game.user.isGM) {
		r(`${e} | Skipping mapping setting normalization for non-GM user.`);
		return;
	}
	r(`${e} | Normalizing stored mapping settings.`), await Ae(E, O), await Ae(D, be), r(`${e} | Mapping settings normalized`, k());
}
function Ee() {
	return !!game.settings.get(e, w);
}
function De() {
	return !!game.settings.get(e, T);
}
function Oe() {
	return x(game.settings.get(e, E));
}
function ke() {
	return x(game.settings.get(e, D));
}
async function Ae(t, n) {
	let i = game.settings.get(e, t);
	if (typeof i == "object" && i) {
		r(`${e} | Normalizing object mapping setting to JSON string`, {
			key: t,
			value: i
		}), await game.settings.set(e, t, JSON.stringify(i));
		return;
	}
	if (i === "[object Object]") {
		r(`${e} | Resetting invalid object-string mapping setting`, { key: t }), await game.settings.set(e, t, n);
		return;
	}
	t === "weaponPropertyDamageMapping" && je(i, xe) && (r(`${e} | Upgrading untouched weapon property mapping defaults`, { key: t }), await game.settings.set(e, t, n));
}
function je(e, t) {
	return JSON.stringify(x(e)) === t;
}
function k() {
	return {
		debugConsoleLogging: A(n),
		enableCriticalReplacement: A(S),
		enableNaturalOneCriticals: A(C),
		inferDamageFromWeaponProperties: A(w),
		inferDamageFromWeaponTypes: A(T),
		weaponPropertyDamageMapping: Me(E),
		weaponTypeDamageMapping: Me(D)
	};
}
function Me(e) {
	let t = A(e);
	return {
		key: e,
		type: typeof t,
		value: t
	};
}
function A(t) {
	try {
		return game.settings.settings.has(`wfrp4e-expanded-critical-hits.${t}`) ? game.settings.get(e, t) : "<not registered>";
	} catch (e) {
		return `<error: ${e instanceof Error ? e.message : String(e)}>`;
	}
}
//#endregion
//#region src/module/wfrp4e/natural-one-critical.ts
var j = Symbol.for(`${e}.naturalOneCriticalPatch`), M = {
	installed: !1,
	message: "Natural 1 critical patch has not run."
};
function Ne() {
	return { ...M };
}
function Pe() {
	let t = game.wfrp4e?.rolls;
	if (!t?.TestWFRP) {
		Le(!1, "WFRP4e roll classes were not available.");
		return;
	}
	let n = Fe(t.TestWFRP), r = Ie([t.WeaponTest, t.TraitTest]);
	M = {
		installed: n,
		message: n ? `Natural 1 critical patch installed. Attack wrappers installed: ${r}.` : "TestWFRP.isCriticalFumble could not be patched."
	}, n || a(`${e} | ${M.message}`);
}
function Fe(e) {
	let t = e.prototype;
	if (I(t).isCriticalFumble) return !0;
	let n = Object.getOwnPropertyDescriptor(t, "isCriticalFumble");
	return n?.get ? (Object.defineProperty(t, "isCriticalFumble", {
		configurable: n.configurable,
		enumerable: n.enumerable,
		get() {
			return N(this) ? "critical" : n.get?.call(this);
		}
	}), F(t, "isCriticalFumble"), !0) : !1;
}
function Ie(e) {
	let t = 0;
	for (let n of e) {
		let e = n?.prototype;
		if (!e || I(e).computeProperties) continue;
		let r = e.computeProperties;
		r && (e.computeProperties = function(...e) {
			N(this) && P(this);
			let t = r.apply(this, e);
			return N(this) && P(this), t;
		}, F(e, "computeProperties"), t += 1);
	}
	return t;
}
function N(e) {
	return we() && ge({
		roll: e.result?.roll,
		target: e.result?.target
	});
}
function P(e) {
	e.result && (e.result.color_green = !0, e.result.critical ||= game.i18n.localize("Critical"));
}
function F(e, t) {
	let n = I(e);
	n[t] = !0, Object.defineProperty(e, j, {
		configurable: !0,
		value: n
	});
}
function I(e) {
	return Object.prototype.hasOwnProperty.call(e, j) ? Reflect.get(e, j) : {};
}
function Le(t, n) {
	M = {
		installed: t,
		message: n
	}, a(`${e} | ${n}`);
}
//#endregion
//#region src/module/api/create-module-api.ts
function Re() {
	return {
		getExpandedCriticalsCompendiumStatus: f,
		getNaturalOneCriticalPatchStatus: Ne
	};
}
//#endregion
//#region src/module/api/register-module-api.ts
function ze() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let t = game.modules.get(e);
	if (!t) throw Error(`Foundry module registry entry was not found for ${e}.`);
	t.api = Re();
}
//#endregion
//#region src/module/wfrp4e/critical-replacement/debug.ts
function L(e) {
	return {
		criticalLocation: e.criticalLocation,
		messageId: e.messageId,
		returnResult: e.returnResult,
		sourceItemUuid: e.sourceItemUuid
	};
}
function Be(e) {
	let t = Ve(e);
	if (t) return {
		id: t.id,
		name: t.name,
		type: t.type,
		uuid: t.uuid
	};
}
function Ve(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/critical-replacement/failure.ts
function R(t, n, r) {
	return o(`${e} | ${t}`, r), ui.notifications?.error(t), [
		"<div class=\"wfrp4e chat-card\">",
		"<h3>Expanded Critical Hit Failed</h3>",
		`<p>${He(t)}</p>`,
		`<p><strong>Table:</strong> ${He(n)}</p>`,
		"</div>"
	].join("");
}
function He(e) {
	return e.replace(/[&<>"']/g, (e) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#39;"
	})[e] ?? e);
}
//#endregion
//#region src/module/wfrp4e/critical-replacement/item-posting.ts
function Ue(e, t) {
	if (!Ge(e)) return;
	let n = t.criticalLocation;
	if (e.type !== "critical" || typeof n != "string") return e;
	let r = e.toObject, i = Item?.implementation;
	if (typeof r != "function" || typeof i != "function") return e;
	let a = r.call(e), o = z(z(a, "system"), "location"), s = game.wfrp4e?.config?.locations ?? {};
	return o.key = n, o.value = s[n] ?? n, new i(a);
}
function z(e, t) {
	let n = We(e[t]);
	if (n) return n;
	let r = {};
	return e[t] = r, r;
}
function We(e) {
	return typeof e == "object" && e ? e : void 0;
}
function Ge(e) {
	let t = e;
	return typeof t == "object" && !!t && typeof t.postItem == "function";
}
//#endregion
//#region src/module/wfrp4e/runtime-values.ts
function Ke(e) {
	return Array.isArray(e) ? e : [];
}
function B(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/quality-extraction.ts
function qe(e) {
	let t = Je(e);
	return {
		explicitCategories: ae(t),
		weaponPropertyKeys: t,
		weaponTypeKeys: Ze(e)
	};
}
function Je(e) {
	let t = B(e), n = B(t?.system), r = B(t?.properties), i = B(n?.properties), a = [B(r?.qualities), B(i?.qualities)], o = /* @__PURE__ */ new Set();
	for (let e of a) for (let t of Object.keys(e ?? {})) o.add(t);
	let s = Ke(B(n?.qualities)?.value);
	for (let e of s) {
		let t = B(e), n = t?.name;
		typeof n == "string" && Ye(t) && o.add(n);
	}
	return [...o];
}
function Ye(e) {
	let t = e?.group;
	return Xe(t) ? e?.active === !0 : !0;
}
function Xe(e) {
	return typeof e == "number" ? Number.isFinite(e) : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e));
}
function Ze(e) {
	let t = B(B(e)?.system), n = /* @__PURE__ */ new Set();
	for (let e of [
		t?.weaponGroup,
		t?.group,
		t?.weaponType,
		t?.weaponClass,
		t?.ammunitionGroup,
		t?.ammoGroup,
		t?.category
	]) V(e, n);
	return [...n];
}
function V(e, t) {
	if (typeof e == "string") {
		t.add(e);
		return;
	}
	if (Array.isArray(e)) {
		for (let n of e) V(n, t);
		return;
	}
	let n = B(e);
	if (n) for (let e of [
		"key",
		"id",
		"name",
		"label",
		"value",
		"type"
	]) V(n[e], t);
}
//#endregion
//#region src/module/wfrp4e/damage-category-resolution.ts
function Qe(e) {
	let t = qe(e);
	return {
		clues: t,
		resolution: le({
			...t,
			inferFromWeaponProperties: Ee(),
			inferFromWeaponTypes: De(),
			weaponPropertyMapping: Oe(),
			weaponTypeMapping: ke()
		})
	};
}
//#endregion
//#region src/module/wfrp4e/critical-replacement.ts
var $e = !1;
function et() {
	if ($e) {
		r(`${e} | Critical replacement patch already installed.`);
		return;
	}
	let t = game.wfrp4e?.tables;
	if (!t || typeof t.findTable != "function" || typeof t.formatChatRoll != "function") {
		r(`${e} | Critical replacement patch skipped: WFRP table API unavailable`, {
			hasTables: !!t,
			hasFindTable: typeof t?.findTable == "function",
			hasFormatChatRoll: typeof t?.formatChatRoll == "function"
		});
		return;
	}
	let n = t.findTable.bind(t), i = t.formatChatRoll.bind(t);
	t.formatChatRoll = async (t, a = {}, o = null) => {
		let s = at(t);
		if (!Ce() || !s) return s && r(`${e} | Critical replacement fallthrough`, {
			table: t,
			reason: "replacement disabled",
			options: L(a)
		}), i(t, a, o);
		let c = rt(t, a), l;
		r(`${e} | Critical replacement inspecting WFRP critical roll`, {
			table: t,
			location: c,
			options: L(a)
		});
		try {
			l = await it(a);
		} catch (e) {
			return R("Expanded Critical Hits could not resolve the critical source item. See the browser console for details.", t, e);
		}
		let { clues: u, resolution: d } = Qe(l), f = oe(d.categories);
		if (r(`${e} | Critical replacement damage category resolution`, {
			table: t,
			location: c,
			sourceItem: Be(l),
			categoryClues: u,
			categoryResolution: d,
			chosenCategory: f,
			inferFromWeaponProperties: Ee(),
			inferFromWeaponTypes: De()
		}), !c || !f) return r(`${e} | Critical replacement fallthrough`, {
			table: t,
			reason: c ? "damage category unavailable" : "location unavailable"
		}), i(t, a, o);
		let p = ye(!!game.settings.get("wfrp4e", "uiaCrits")), m = _e(p, f, c);
		if (!n(m)) return R(`Expanded Critical Hits table ${m} is missing from the module compendium.`, m);
		r(`${e} | Critical replacement rolling expanded table`, {
			table: t,
			expandedTableKey: m,
			ruleset: p,
			category: f,
			location: c
		});
		try {
			let e = await tt(m, a, o);
			if (e !== void 0) return e;
		} catch (e) {
			return R(`Expanded Critical Hits could not roll ${m}. See the browser console for details.`, m, e);
		}
		return R(`Expanded Critical Hits could not use WFRP's RollTable API for ${m}.`, m);
	}, $e = !0, r(`${e} | Critical replacement patch installed.`);
}
async function tt(e, t, n) {
	let r = game.wfrp4e?.tables?.rollTable;
	if (typeof r != "function") return;
	let i = await r.call(game.wfrp4e.tables, e, t, n);
	if (await nt(i, t)) return null;
	let a = H(i);
	return t.returnResult ? i : a?.result;
}
async function nt(t, n) {
	let i = H(H(t)?.object)?.documentUuid;
	if (typeof i != "string") return r(`${e} | Expanded critical result had no document UUID`, { result: t }), !1;
	let a = Ue(await fromUuid(i), n);
	if (!a) throw Error(`Could not resolve expanded critical item ${i}.`);
	return r(`${e} | Posting expanded critical item`, {
		documentUuid: i,
		messageId: n.messageId,
		criticalLocation: n.criticalLocation
	}), await a.postItem(void 0, { "flags.wfrp4e.sourceMessageId": n.messageId }), !0;
}
function rt(e, t) {
	let n = t.criticalLocation;
	return ve(typeof n == "string" ? n : e.replace(/^crit/i, ""));
}
async function it(e) {
	let t = e.sourceItemUuid;
	if (typeof t == "string") return await fromUuid(t);
	let n = e.messageId;
	if (typeof n != "string") return;
	let r = H(H(game.messages.get(n)?.system)?.test), i = H(r?.preData);
	return r?.item ?? r?.weapon ?? i?.item;
}
function at(e) {
	return /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function H(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/support.ts
var U = "ech-wounding-properties", ot = new Set(Object.values(v));
function W(e) {
	let t = { ...e };
	for (let e of _) t[v[e]] = y[e];
	return t;
}
function G(e) {
	return dt(e) || ft(e);
}
function st(e) {
	return e?.type === "spell" || e?.type === "prayer";
}
function ct(e) {
	let t = Ke(B(B(e?.system)?.qualities)?.value), n = [];
	for (let e of t) {
		let t = B(e)?.name;
		if (typeof t != "string") continue;
		let r = ht(t);
		r && n.push(y[r]);
	}
	return n;
}
function lt(e) {
	if (!(typeof e != "object" || !e)) return e;
}
function ut(e) {
	if (typeof e != "object" || !e) return;
	let t = e;
	if (!(t.qualities !== void 0 && !Array.isArray(t.qualities))) return t;
}
function dt(e) {
	return e?.type === "weapon" || e?.type === "ammunition" || e?.system?.isWeapon === !0;
}
function ft(e) {
	return (e?.type === "spell" || e?.type === "prayer") && pt(e.system);
}
function pt(e) {
	let t = B(e?.damage), n = B(e?.magicMissile);
	return mt(t?.value) || mt(t?.dice) || t?.addSL === !0 || n?.value === !0;
}
function mt(e) {
	return typeof e == "number" ? e !== 0 : typeof e == "string" && e.trim().length > 0;
}
function ht(e) {
	return _.find((t) => v[t] === e);
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/actions.ts
var gt = `.${U}__sheet-row a[data-ech-action="configureProperties"]`, _t = /* @__PURE__ */ new Map(), vt = !1;
function yt() {
	vt ||= (document.addEventListener("click", St, !0), !0);
}
function bt(e) {
	return e?.uuid;
}
function xt(e, t) {
	_t.set(e, t);
}
function K(e) {
	let t = Tt();
	!e || !t || new t(e).render(!0);
}
function St(e) {
	let t = Ct(e.target);
	t && (e.preventDefault(), e.stopPropagation(), wt(t));
}
function Ct(e) {
	if (e instanceof Element) return e.closest(gt) ?? void 0;
}
async function wt(e) {
	let t = e.closest(`.${U}__sheet-row`)?.dataset.echItemUuid;
	if (!t) return;
	let n = await fromUuid(t);
	if (!Dt(n)) return;
	let r = _t.get(t);
	if (r) {
		r(n);
		return;
	}
	K(n);
}
function Tt() {
	let e = game.wfrp4e?.apps?.ItemProperties;
	if (Et(e)) return e;
}
function Et(e) {
	return typeof e == "function";
}
function Dt(e) {
	return typeof e == "object" && !!e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/actor-sheet.ts
var Ot = /* @__PURE__ */ new WeakSet();
function q(e, t) {
	if (!(t instanceof HTMLElement)) return;
	let n = kt(t, "combat"), r = kt(t, "trappings");
	n && (At(n), jt(e, n)), r && (Mt(e, r), !Ot.has(r) && (new MutationObserver(() => {
		Mt(e, r);
	}).observe(r, {
		childList: !0,
		subtree: !0
	}), Ot.add(r)));
}
function kt(e, t) {
	return e.matches(`section[data-tab="${t}"]`) ? e : e.querySelector(`section[data-tab="${t}"]`) ?? void 0;
}
function At(e) {
	let t = new Set(Object.values(y)), n = e.querySelectorAll(".item-property-row a[data-action=\"itemPropertyDropdown\"][data-type=\"qualities\"]");
	for (let e of n) t.has(e.textContent.trim()) && e.classList.add("ech-wounding-property-combat-text");
}
function jt(e, t) {
	let n = t.querySelectorAll(".list-row[data-uuid] .item-property-row:not([data-ech-inference-checked=\"true\"])");
	for (let t of n) {
		t.dataset.echInferenceChecked = "true";
		let n = Ft(e, t);
		if (Rt(n)) for (let e of n.categories) t.append(zt("combat", e, n));
	}
}
function Mt(e, t) {
	Nt(t), Pt(e, t);
}
function Nt(e) {
	let t = new Set(Object.values(y)), n = e.querySelectorAll(".tags .tag:not(.ech-inferred-damage-type)");
	for (let e of n) t.has(e.textContent.trim()) && e.classList.add("ech-wounding-property-trappings-badge");
}
function Pt(e, t) {
	let n = t.querySelectorAll(".list-row[data-uuid] .tags:not([data-ech-inference-checked=\"true\"])");
	for (let t of n) {
		t.dataset.echInferenceChecked = "true";
		let n = Ft(e, t);
		if (Rt(n)) for (let e of n.categories) t.append(zt("trappings", e, n));
	}
}
function Ft(t, n) {
	let i = n.closest(".list-row[data-uuid]")?.dataset.uuid;
	if (i) try {
		let n = It(t, i);
		if (!Lt(n)) {
			r(`${e} | Inferred damage display skipped for ${i}: item unavailable or unsupported.`);
			return;
		}
		let a = Qe(n).resolution;
		return r(`${e} | Inferred damage display resolved ${i}: source=${a.source} categories=${a.categories.join(",") || "none"}`), a;
	} catch (t) {
		r(`${e} | Could not display inferred damage type`, {
			error: t,
			uuid: i
		});
		return;
	}
}
function It(e, t) {
	let n = B(e), r = B((B(n?.actor) ?? B(n?.document))?.items), i = r?.get, a = t.split(".").at(-1);
	if (!(typeof i != "function" || !a)) return i.call(r, a);
}
function Lt(e) {
	let t = B(e), n = B(t?.system);
	return t?.type === "weapon" || t?.type === "ammunition" || n?.isWeapon === !0;
}
function Rt(e) {
	return e?.source === "weaponProperty" || e?.source === "weaponType";
}
function zt(e, t, n) {
	let r = document.createElement(e === "combat" ? "span" : "div"), i = Bt(t, n.source, n.matches);
	return r.classList.add("ech-inferred-damage-type", `ech-inferred-damage-type--${e}`), e === "trappings" && r.classList.add("tag"), r.dataset.echDamageCategory = t, r.dataset.tooltip = i, r.setAttribute("aria-label", i), r.textContent = te[t], r;
}
function Bt(e, t, n) {
	let r = n.filter((t) => t.category === e).map((e) => Vt(e.key, t)), i = t === "weaponProperty" ? "item property" : "weapon type";
	return r.length > 0 ? `Inferred from ${r.join(", ")}` : `Inferred from ${i}`;
}
function Vt(e, t) {
	if (t === "weaponProperty") {
		let t = game.wfrp4e?.utility?.qualityList?.() ?? {}, n = b(e);
		for (let [e, r] of Object.entries(t)) if (b(e) === n || b(r) === n) return r;
	}
	return e.replaceAll(/([a-z])([A-Z])/g, "$1 $2").replaceAll(/[_-]+/g, " ").trim().replaceAll(/\b\w/g, (e) => e.toUpperCase());
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/debug.ts
function J(e) {
	if (!(typeof e != "object" || !e)) return e.constructor?.name;
}
function Y(e) {
	if (e) return {
		id: e.id,
		name: e.name,
		type: e.type,
		uuid: e.uuid
	};
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/sheet-box.ts
function Ht(e, t, n) {
	let r = document.createElement("div");
	r.classList.add("attribute-box", "top-label", `${U}__sheet-row`);
	let i = bt(n);
	i && (r.dataset.echItemUuid = i, xt(i, Wt(e, n)));
	let a = document.createElement("div");
	a.classList.add("label"), a.style.gridColumn = "1 / span 12", a.innerHTML = "<label><a data-ech-action=\"configureProperties\">Damage Type <i class=\"fas fa-cog\"></i></a></label>";
	let o = document.createElement("div");
	o.classList.add("field"), o.style.gridColumn = "1 / span 12";
	let s = document.createElement("input");
	return s.type = "text", s.value = t.join(","), s.readOnly = !0, o.append(s), r.append(a, o), Ut(r, n), r;
}
function Ut(e, t) {
	e.querySelector("a[data-ech-action=\"configureProperties\"]")?.addEventListener("click", (e) => {
		e.preventDefault(), K(t);
	});
}
function Wt(e, t) {
	return Gt(e) || ((e) => {
		K(e ?? t);
	});
}
function Gt(e) {
	if (typeof e != "object" || !e) return;
	let t = e.constructor?.DEFAULT_OPTIONS?.actions?.configureProperties;
	if (typeof t == "function") return (e) => {
		t.call({ document: e });
	};
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/sheet.ts
function Kt(t) {
	if (!(t instanceof HTMLElement)) {
		r(`${e} | ItemProperties render hook skipped: element is not HTMLElement`, { elementType: typeof t });
		return;
	}
	let n = t.querySelector(".property-column");
	if (!n) {
		r(`${e} | ItemProperties render hook skipped: quality column not found.`);
		return;
	}
	let i = Jt(n);
	if (i.length === 0) {
		r(`${e} | ItemProperties render hook found no damage type rows`, { checkboxCount: n.querySelectorAll("input[type=\"checkbox\"]").length });
		return;
	}
	r(`${e} | Grouping ItemProperties damage type rows`, { woundingRowCount: i.length });
	let a = n.querySelector(`.${U}`), o = a ?? document.createElement("div");
	a || (o.classList.add(U), o.append(Yt()));
	for (let e of i) o.append(e);
	let s = n.querySelector("input[name=\"custom-quality\"]")?.parentElement;
	if (s) {
		s.before(o);
		return;
	}
	n.append(o);
}
function qt(t, n) {
	if (!(n instanceof HTMLElement)) {
		r(`${e} | Item sheet render hook skipped: element is not HTMLElement`, {
			applicationName: J(t),
			elementType: typeof n
		});
		return;
	}
	let i = lt(t), a = i?.document ?? i?.item;
	if (!G(a)) {
		r(`${e} | Item sheet render hook skipped: unsupported document`, {
			applicationName: J(t),
			document: Y(a)
		});
		return;
	}
	r(`${e} | Item sheet render hook inspecting supported document`, {
		applicationName: J(t),
		document: Y(a)
	});
	let o = Zt(n);
	if (!o) {
		r(`${e} | Item sheet qualities box not found; trying standalone damage row`, { document: Y(a) }), Xt(t, n, a);
		return;
	}
	let s = o.querySelector(".field input");
	if (!s) {
		r(`${e} | Item sheet qualities input not found`, { document: Y(a) });
		return;
	}
	let c = Qt(s.value);
	if (c.wounding.length === 0) {
		r(`${e} | Item sheet qualities contain no damage type labels`, {
			document: Y(a),
			displayedQualities: s.value
		});
		return;
	}
	r(`${e} | Splitting item sheet damage type labels into their own row`, {
		document: Y(a),
		normalQualities: c.normal,
		woundingQualities: c.wounding
	}), s.value = c.normal.join(","), o.parentElement?.querySelector(`.${U}__sheet-row`)?.remove(), o.after(Ht(t, c.wounding, a));
}
function Jt(e) {
	let t = e.querySelectorAll("input[type=\"checkbox\"]"), n = [];
	for (let e of t) {
		if (!ot.has(e.name)) continue;
		let t = e.closest(".form-group");
		t && n.push(t);
	}
	return n;
}
function Yt() {
	let e = document.createElement("h2");
	return e.classList.add("property-header", `${U}__header`), e.textContent = "Damage Type", e;
}
function Xt(t, n, i) {
	if (!st(i)) {
		r(`${e} | Standalone damage type row skipped: unsupported document`, { document: Y(i) });
		return;
	}
	if (n.querySelector(".ech-wounding-properties__sheet-row")) {
		r(`${e} | Standalone damage type row skipped: row already exists`, { document: Y(i) });
		return;
	}
	let a = $t(n);
	if (!a) {
		r(`${e} | Standalone damage type row skipped: damage fieldset not found`, { document: Y(i) });
		return;
	}
	let o = ct(i);
	r(`${e} | Appending standalone damage type row`, {
		document: Y(i),
		labels: o
	}), a.after(Ht(t, o, i));
}
function Zt(e) {
	let t = e.querySelectorAll("a[data-action=\"configureProperties\"]");
	for (let e of t) if (e.textContent.trim().startsWith("Qualities")) return e.closest(".attribute-box") ?? void 0;
}
function Qt(e) {
	let t = [], n = [], r = new Set(Object.values(y));
	for (let i of e.split(",")) {
		let e = i.trim();
		if (e) {
			if (r.has(e)) {
				n.push(e);
				continue;
			}
			t.push(e);
		}
	}
	return {
		normal: t,
		wounding: n
	};
}
function $t(e) {
	let t = e.querySelectorAll("fieldset");
	for (let e of t) if (e.querySelector("legend")?.textContent.trim() === "Damage") return e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/display.ts
var en = !1, tn = Symbol.for(`${e}.woundingPropertiesContextPatched`);
function nn() {
	if (yt(), an(), en) {
		r(`${e} | Wounding property display hooks already installed.`);
		return;
	}
	Hooks.on("renderItemProperties", (e, t) => {
		Kt(t);
	}), Hooks.on("renderApplicationV2", (e, t) => {
		qt(e, t), q(e, t), rn(e) && X(e);
	}), Hooks.on("renderBaseWFRP4eActorSheet", (e, t) => {
		q(e, t), X(e);
	}), en = !0, r(`${e} | Wounding property display hooks installed.`);
}
function X(t, n = 5) {
	typeof t != "object" || !t || requestAnimationFrame(() => {
		let i = t.element;
		if (i instanceof HTMLElement && i.isConnected) {
			r(`${e} | Styling committed WFRP actor sheet with ${i.querySelectorAll(".item-property-row").length} property rows.`), q(t, i);
			return;
		}
		if (n > 1) {
			X(t, n - 1);
			return;
		}
		r(`${e} | Committed WFRP actor sheet element was unavailable.`);
	});
}
function rn(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e.actor;
	return typeof t == "object" && !!t;
}
function an() {
	let t = on()?.prototype, n = t?._prepareContext;
	if (!t || !n) {
		r(`${e} | ItemProperties context patch skipped: application unavailable.`);
		return;
	}
	if (sn(n)) {
		r(`${e} | ItemProperties context patch already installed.`);
		return;
	}
	let i = async function(...e) {
		let t = this.document;
		G(t) && (this.qualities = W(this.qualities ?? {}));
		let r = await n.apply(this, e);
		return cn(this, r), r;
	};
	Object.defineProperty(i, tn, { value: !0 }), t._prepareContext = i, r(`${e} | ItemProperties context patch installed.`);
}
function on() {
	let e = game.wfrp4e?.apps?.ItemProperties;
	return typeof e == "function" ? e : void 0;
}
function sn(e) {
	return !!e[tn];
}
function cn(t, n) {
	let i = lt(t), a = ut(n), o = i?.document;
	if (!i || !a || !G(o)) {
		r(`${e} | Skipping ItemProperties damage type context append`, {
			applicationName: ln(t),
			hasItemProperties: !!i,
			hasRenderContext: !!a,
			document: Z(o),
			supportsDamageTypeProperties: G(o)
		});
		return;
	}
	r(`${e} | Appending damage types to ItemProperties context`, {
		applicationName: ln(t),
		document: Z(o),
		originalQualityCount: Object.keys(i.qualities ?? {}).length,
		renderedQualityCount: a.qualities?.length ?? 0
	}), i.qualities = W(i.qualities ?? {}), a.qualities ??= [];
	for (let e of _) {
		let t = v[e];
		a.qualities.some((e) => e.key === t) || a.qualities.push({
			existing: i.document?.originalProperties?.qualities?.[t],
			hasValue: !1,
			key: t,
			name: y[e]
		});
	}
	r(`${e} | ItemProperties context after damage type append`, {
		document: Z(o),
		renderedQualityCount: a.qualities.length
	});
}
function ln(e) {
	if (!(typeof e != "object" || !e)) return e.constructor?.name;
}
function Z(e) {
	if (typeof e != "object" || !e) return;
	let t = e;
	return {
		id: t.id,
		name: t.name,
		type: t.type,
		uuid: t.uuid
	};
}
//#endregion
//#region src/module/wfrp4e/damage-qualities.ts
var Q = !1;
function un() {
	let t = game.wfrp4e?.config;
	if (!t) {
		r(`${e} | Damage quality registration skipped: WFRP config unavailable.`);
		return;
	}
	let n = t.propertyHasValue, i = t.qualityDescriptions;
	if (!n || !i) {
		r(`${e} | Damage quality registration skipped: WFRP property config missing`, {
			hasPropertyHasValue: !!n,
			hasQualityDescriptions: !!i
		});
		return;
	}
	for (let e of _) {
		let t = v[e];
		i[t] = "Expanded Critical Hits damage type marker. A critical hit may roll on the matching expanded critical table.", n[t] = !1;
	}
	r(`${e} | Damage qualities registered`, {
		count: _.length,
		qualityKeys: _.map((e) => v[e])
	}), dn(), nn();
}
function dn() {
	let t = game.wfrp4e?.utility, n = t?.qualityList;
	if (Q || !t || !n) {
		r(`${e} | Quality list patch skipped`, {
			qualityListPatchInstalled: Q,
			hasUtility: !!t,
			hasOriginalQualityList: !!n
		});
		return;
	}
	t.qualityList = function(e) {
		let t = n.call(this, e);
		return e === "armor" ? t : W(t);
	}, Q = !0, r(`${e} | Quality list patch installed.`);
}
//#endregion
//#region src/module/wfrp4e/zero-wound-critical-links.ts
var fn = "data-ech-source-item-uuid", pn = "data-ech-critical-location", mn = !1;
function hn() {
	mn ||= (gn(), document.addEventListener("click", bn, !0), !0);
}
function gn() {
	let e = CONFIG.Actor?.documentClass?.prototype, t = e?.applyDamage;
	typeof t != "function" || !e || (e.applyDamage = async function(e, n = {}) {
		let r = await t.call(this, e, n), i = _n(n);
		return typeof r != "string" || !i || !r.includes("critical-roll") ? r : yn(r, i, vn(n));
	});
}
function _n(e) {
	let t = $($(e.sourceTest)?.item), n = $($($(e.opposedTest)?.attackerTest)?.item), r = $(e.sourceItem), i = t?.uuid ?? n?.uuid ?? r?.uuid;
	return typeof i == "string" ? i : void 0;
}
function vn(e) {
	let t = $($(e.opposedTest)?.result)?.hitloc, n = $(t)?.value, r = e.loc, i;
	return typeof n == "string" ? i = n : typeof r == "string" && (i = r), i && ve(i) ? i : void 0;
}
function yn(e, t, n) {
	let r = [`${fn}="${Tn(t)}"`, n ? `${pn}="${Tn(n)}"` : void 0].filter(Boolean).join(" ");
	return e.replaceAll(/<a\b(?![^>]*\bdata-ech-source-item-uuid=)(?=[^>]*\bcritical-roll\b)/g, `<a ${r}`);
}
function bn(e) {
	let t = e.target;
	if (!(t instanceof Element) || !Ce()) return;
	let n = t.closest(`[data-action="clickTable"][${fn}]`);
	!(n instanceof HTMLElement) || !wn(n.dataset.table) || (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), xn(n).catch((e) => {
		Sn("Expanded Critical Hits could not roll an annotated zero-wound critical. See the browser console for details.", e);
	}));
}
async function xn(e) {
	let t = e.dataset.table, n = game.wfrp4e?.tables?.formatChatRoll;
	if (!t || typeof n != "function") return;
	let r = e.closest("[data-message-id]")?.dataset.messageId, i = Number.parseInt(e.dataset.modifier ?? "0", 10) || 0, a = await n(t, {
		criticalLocation: e.dataset.echCriticalLocation ?? Cn(r),
		messageId: r,
		modifier: i,
		showRoll: !0,
		sourceItemUuid: e.dataset.echSourceItemUuid
	}, e.dataset.column);
	if (typeof a != "string" || a.length === 0) return;
	let o = game.wfrp4e?.utility?.chatDataSetup, s = typeof o == "function" ? o("", game.settings.get("core", "rollMode"), !0) : { content: "" };
	s.content = a, await ChatMessage.create(s);
}
function Sn(t, n) {
	o(`${e} | ${t}`, n), ui.notifications?.error(t);
}
function Cn(e) {
	if (!e) return;
	let t = $($($(game.messages.get(e)?.system)?.test)?.result)?.hitloc, n = $(t)?.result;
	return typeof n == "string" ? n : void 0;
}
function wn(e) {
	return typeof e == "string" && /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function Tn(e) {
	return e.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function $(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/hooks/register-module-hooks.ts
function En() {
	Hooks.once("init", () => {
		i(`${e} | Initializing`), Se(), r(`${e} | init hook running`, {
			foundryVersion: game.version,
			systemId: game.system?.id,
			userIsGM: game.user?.isGM
		}), nn(), un();
	}), Hooks.once("ready", () => {
		Dn();
	});
}
async function Dn() {
	if (r(`${e} | ready hook running`, {
		foundryVersion: game.version,
		systemId: game.system?.id,
		userIsGM: game.user?.isGM,
		settings: k(),
		wfrpConfigAvailable: !!game.wfrp4e?.config,
		wfrpTablesAvailable: !!game.wfrp4e?.tables
	}), game.system.id !== "wfrp4e") {
		a(`${e} | Loaded outside ${t}; skipping WFRP integration.`);
		return;
	}
	ze(), await Te(), r(`${e} | ready hook after mapping normalization`, { settings: k() }), un(), await d(), Pe(), et(), hn(), i(`${e} | Ready`);
}
//#endregion
//#region src/main.ts
En();
//#endregion

//# sourceMappingURL=wfrp4e-expanded-critical-hits.mjs.map