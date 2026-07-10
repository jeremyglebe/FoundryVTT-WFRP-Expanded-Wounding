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
		criticalItems: await ee(c, "Items"),
		criticalTables: await ee(l, "Tables")
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
async function ee(e, t) {
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
var h = [
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
], g = [
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
], te = {
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
}, _ = {
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
}, ne = {
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
}, v = {
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
}, re = {
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
}, ie = new Map(g.map((e) => [_[e], re[e]])), ae = new Map(h.map((e) => [te[e], e]));
function oe(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = ie.get(n) ?? ae.get(n);
		e && t.add(e);
	}
	return h.filter((e) => t.has(e));
}
function se(e, t = Math.random()) {
	if (e.length !== 0) return e[Math.min(Math.floor(t * e.length), e.length - 1)];
}
//#endregion
//#region src/functions/critical-hits/damage-inference/index.ts
var ce = {
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
}, le = {
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
function ue(e) {
	if (e.explicitCategories.length > 0) return {
		categories: me(e.explicitCategories),
		matches: [],
		source: "explicit"
	};
	if (e.inferFromWeaponProperties) {
		let t = fe(e.weaponPropertyKeys, e.weaponPropertyMapping);
		if (t.length > 0) return {
			categories: pe(t),
			matches: t,
			source: "weaponProperty"
		};
	}
	if (e.inferFromWeaponTypes) {
		let t = fe(e.weaponTypeKeys, e.weaponTypeMapping);
		if (t.length > 0) return {
			categories: pe(t),
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
function y(e) {
	return e.trim().toLowerCase().replaceAll(/[^a-z0-9]/g, "");
}
function b(e) {
	let t = de(e), n = {};
	for (let [e, r] of Object.entries(t ?? {})) ge(r) && (n[y(e)] = r);
	return n;
}
function de(e) {
	if (typeof e == "string") try {
		return de(JSON.parse(e));
	} catch {
		return;
	}
	if (typeof e == "object" && e && !Array.isArray(e)) return e;
}
function fe(e, t) {
	let n = b(t), r = e.flatMap((e) => {
		let t = n[y(e)];
		return t && t !== "none" ? [{
			category: t,
			key: e
		}] : [];
	}), i = /* @__PURE__ */ new Set();
	return h.flatMap((e) => r.filter((t) => {
		let n = `${e}:${y(t.key)}`;
		return t.category !== e || i.has(n) ? !1 : (i.add(n), !0);
	}));
}
function pe(e) {
	return me(e.map((e) => e.category));
}
function me(e) {
	let t = new Set(e);
	return h.filter((e) => t.has(e));
}
function he(e) {
	return typeof e == "string" && h.includes(e);
}
function ge(e) {
	return e === "none" || he(e);
}
//#endregion
//#region src/functions/critical-hits/natural-one-critical/index.ts
function _e(e) {
	let t = Number(e.roll), n = Number(e.target);
	return t === 1 && t <= n;
}
//#endregion
//#region src/functions/critical-hits/table-keys.ts
function ve(e, t, n) {
	return `ech-crit-${e}-${t}-${n}`.toLowerCase();
}
function ye(e) {
	let t = e.toLowerCase();
	if (t === "head" || t === "body") return t;
	if (t.endsWith("arm")) return "arm";
	if (t.endsWith("leg")) return "leg";
}
function be(e) {
	return e ? "upInArms" : "core";
}
//#endregion
//#region src/module/settings.ts
var x = "enableCriticalReplacement", S = "enableNaturalOneCriticals", C = "inferDamageFromWeaponProperties", w = "inferDamageFromWeaponTypes", T = "weaponPropertyDamageMapping", E = "weaponTypeDamageMapping", xe = JSON.stringify(ce), Se = JSON.stringify(le), Ce = JSON.stringify({
	hack: "cutting",
	impale: "piercing",
	pummel: "crushing",
	slash: "cutting"
});
function we() {
	game.settings.register(e, n, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.debugConsoleLogging.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.debugConsoleLogging.hint",
		scope: "client",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, x, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, S, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableNaturalOneCriticals.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableNaturalOneCriticals.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, C, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponProperties.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponProperties.hint",
		scope: "world",
		config: !0,
		default: !0,
		type: Boolean
	}), game.settings.register(e, T, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponPropertyDamageMapping.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponPropertyDamageMapping.hint",
		scope: "world",
		config: !1,
		default: xe,
		type: String
	}), game.settings.register(e, w, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponTypes.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponTypes.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, E, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponTypeDamageMapping.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponTypeDamageMapping.hint",
		scope: "world",
		config: !1,
		default: Se,
		type: String
	}), r(`${e} | Settings registered`, j());
}
function D() {
	return !!game.settings.get(e, x);
}
function Te() {
	return !!game.settings.get(e, S);
}
async function Ee() {
	if (!game.user.isGM) {
		r(`${e} | Skipping mapping setting normalization for non-GM user.`);
		return;
	}
	r(`${e} | Normalizing stored mapping settings.`), await A(T, xe), await A(E, Se), r(`${e} | Mapping settings normalized`, j());
}
function O() {
	return !!game.settings.get(e, C);
}
function k() {
	return !!game.settings.get(e, w);
}
function De() {
	return b(game.settings.get(e, T));
}
function Oe() {
	return b(game.settings.get(e, E));
}
async function A(t, n) {
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
	t === "weaponPropertyDamageMapping" && ke(i, Ce) && (r(`${e} | Upgrading untouched weapon property mapping defaults`, { key: t }), await game.settings.set(e, t, n));
}
function ke(e, t) {
	return JSON.stringify(b(e)) === t;
}
function j() {
	return {
		debugConsoleLogging: N(n),
		enableCriticalReplacement: N(x),
		enableNaturalOneCriticals: N(S),
		inferDamageFromWeaponProperties: N(C),
		inferDamageFromWeaponTypes: N(w),
		weaponPropertyDamageMapping: M(T),
		weaponTypeDamageMapping: M(E)
	};
}
function M(e) {
	let t = N(e);
	return {
		key: e,
		type: typeof t,
		value: t
	};
}
function N(t) {
	try {
		return game.settings.settings.has(`wfrp4e-expanded-critical-hits.${t}`) ? game.settings.get(e, t) : "<not registered>";
	} catch (e) {
		return `<error: ${e instanceof Error ? e.message : String(e)}>`;
	}
}
//#endregion
//#region src/module/wfrp4e/natural-one-critical.ts
var P = Symbol.for(`${e}.naturalOneCriticalPatch`), F = {
	installed: !1,
	message: "Natural 1 critical patch has not run."
};
function Ae() {
	return { ...F };
}
function je() {
	let t = game.wfrp4e?.rolls;
	if (!t?.TestWFRP) {
		Ie(!1, "WFRP4e roll classes were not available.");
		return;
	}
	let n = Me(t.TestWFRP), r = Ne([t.WeaponTest, t.TraitTest]);
	F = {
		installed: n,
		message: n ? `Natural 1 critical patch installed. Attack wrappers installed: ${r}.` : "TestWFRP.isCriticalFumble could not be patched."
	}, n || a(`${e} | ${F.message}`);
}
function Me(e) {
	let t = e.prototype;
	if (L(t).isCriticalFumble) return !0;
	let n = Object.getOwnPropertyDescriptor(t, "isCriticalFumble");
	return n?.get ? (Object.defineProperty(t, "isCriticalFumble", {
		configurable: n.configurable,
		enumerable: n.enumerable,
		get() {
			return I(this) ? "critical" : n.get?.call(this);
		}
	}), Fe(t, "isCriticalFumble"), !0) : !1;
}
function Ne(e) {
	let t = 0;
	for (let n of e) {
		let e = n?.prototype;
		if (!e || L(e).computeProperties) continue;
		let r = e.computeProperties;
		r && (e.computeProperties = function(...e) {
			I(this) && Pe(this);
			let t = r.apply(this, e);
			return I(this) && Pe(this), t;
		}, Fe(e, "computeProperties"), t += 1);
	}
	return t;
}
function I(e) {
	return Te() && _e({
		roll: e.result?.roll,
		target: e.result?.target
	});
}
function Pe(e) {
	e.result && (e.result.color_green = !0, e.result.critical ||= game.i18n.localize("Critical"));
}
function Fe(e, t) {
	let n = L(e);
	n[t] = !0, Object.defineProperty(e, P, {
		configurable: !0,
		value: n
	});
}
function L(e) {
	return Object.prototype.hasOwnProperty.call(e, P) ? Reflect.get(e, P) : {};
}
function Ie(t, n) {
	F = {
		installed: t,
		message: n
	}, a(`${e} | ${n}`);
}
//#endregion
//#region src/module/api/create-module-api.ts
function Le() {
	return {
		getExpandedCriticalsCompendiumStatus: f,
		getNaturalOneCriticalPatchStatus: Ae
	};
}
//#endregion
//#region src/module/api/register-module-api.ts
function Re() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let t = game.modules.get(e);
	if (!t) throw Error(`Foundry module registry entry was not found for ${e}.`);
	t.api = Le();
}
//#endregion
//#region src/module/wfrp4e/critical-replacement/debug.ts
function ze(e) {
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
	if (!Ke(e)) return;
	let n = t.criticalLocation;
	if (e.type !== "critical" || typeof n != "string") return e;
	let r = e.toObject, i = Item?.implementation;
	if (typeof r != "function" || typeof i != "function") return e;
	let a = r.call(e), o = We(We(a, "system"), "location"), s = game.wfrp4e?.config?.locations ?? {};
	return o.key = n, o.value = s[n] ?? n, new i(a);
}
function We(e, t) {
	let n = Ge(e[t]);
	if (n) return n;
	let r = {};
	return e[t] = r, r;
}
function Ge(e) {
	return typeof e == "object" && e ? e : void 0;
}
function Ke(e) {
	let t = e;
	return typeof t == "object" && !!t && typeof t.postItem == "function";
}
//#endregion
//#region src/module/wfrp4e/runtime-values.ts
function qe(e) {
	return Array.isArray(e) ? e : [];
}
function z(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/quality-extraction.ts
function Je(e) {
	let t = Ye(e);
	return {
		explicitCategories: oe(t),
		weaponPropertyKeys: t,
		weaponTypeKeys: Xe(e)
	};
}
function Ye(e) {
	let t = z(e), n = z(t?.system), r = z(t?.properties), i = z(n?.properties), a = [z(r?.qualities), z(i?.qualities)], o = /* @__PURE__ */ new Set();
	for (let e of a) for (let t of Object.keys(e ?? {})) o.add(t);
	let s = qe(z(n?.qualities)?.value);
	for (let e of s) {
		let t = z(e)?.name;
		typeof t == "string" && o.add(t);
	}
	return [...o];
}
function Xe(e) {
	let t = z(z(e)?.system), n = /* @__PURE__ */ new Set();
	for (let e of [
		t?.weaponGroup,
		t?.group,
		t?.weaponType,
		t?.weaponClass,
		t?.ammunitionGroup,
		t?.ammoGroup,
		t?.category
	]) B(e, n);
	return [...n];
}
function B(e, t) {
	if (typeof e == "string") {
		t.add(e);
		return;
	}
	if (Array.isArray(e)) {
		for (let n of e) B(n, t);
		return;
	}
	let n = z(e);
	if (n) for (let e of [
		"key",
		"id",
		"name",
		"label",
		"value",
		"type"
	]) B(n[e], t);
}
//#endregion
//#region src/module/wfrp4e/damage-category-resolution.ts
function V(e) {
	let t = Je(e);
	return {
		clues: t,
		resolution: ue({
			...t,
			inferFromWeaponProperties: O(),
			inferFromWeaponTypes: k(),
			weaponPropertyMapping: De(),
			weaponTypeMapping: Oe()
		})
	};
}
//#endregion
//#region src/module/wfrp4e/critical-replacement.ts
var Ze = !1;
function Qe() {
	if (Ze) {
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
		let s = rt(t);
		if (!D() || !s) return s && r(`${e} | Critical replacement fallthrough`, {
			table: t,
			reason: "replacement disabled",
			options: ze(a)
		}), i(t, a, o);
		let c = tt(t, a), l;
		r(`${e} | Critical replacement inspecting WFRP critical roll`, {
			table: t,
			location: c,
			options: ze(a)
		});
		try {
			l = await nt(a);
		} catch (e) {
			return R("Expanded Critical Hits could not resolve the critical source item. See the browser console for details.", t, e);
		}
		let { clues: u, resolution: d } = V(l), f = se(d.categories);
		if (r(`${e} | Critical replacement damage category resolution`, {
			table: t,
			location: c,
			sourceItem: Be(l),
			categoryClues: u,
			categoryResolution: d,
			chosenCategory: f,
			inferFromWeaponProperties: O(),
			inferFromWeaponTypes: k()
		}), !c || !f) return r(`${e} | Critical replacement fallthrough`, {
			table: t,
			reason: c ? "damage category unavailable" : "location unavailable"
		}), i(t, a, o);
		let p = be(!!game.settings.get("wfrp4e", "uiaCrits")), m = ve(p, f, c);
		if (!n(m)) return R(`Expanded Critical Hits table ${m} is missing from the module compendium.`, m);
		r(`${e} | Critical replacement rolling expanded table`, {
			table: t,
			expandedTableKey: m,
			ruleset: p,
			category: f,
			location: c
		});
		try {
			let e = await $e(m, a, o);
			if (e !== void 0) return e;
		} catch (e) {
			return R(`Expanded Critical Hits could not roll ${m}. See the browser console for details.`, m, e);
		}
		return R(`Expanded Critical Hits could not use WFRP's RollTable API for ${m}.`, m);
	}, Ze = !0, r(`${e} | Critical replacement patch installed.`);
}
async function $e(e, t, n) {
	let r = game.wfrp4e?.tables?.rollTable;
	if (typeof r != "function") return;
	let i = await r.call(game.wfrp4e.tables, e, t, n);
	if (await et(i, t)) return null;
	let a = H(i);
	return t.returnResult ? i : a?.result;
}
async function et(t, n) {
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
function tt(e, t) {
	let n = t.criticalLocation;
	return ye(typeof n == "string" ? n : e.replace(/^crit/i, ""));
}
async function nt(e) {
	let t = e.sourceItemUuid;
	if (typeof t == "string") return await fromUuid(t);
	let n = e.messageId;
	if (typeof n != "string") return;
	let r = H(H(game.messages.get(n)?.system)?.test), i = H(r?.preData);
	return r?.item ?? r?.weapon ?? i?.item;
}
function rt(e) {
	return /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function H(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/support.ts
var U = "ech-wounding-properties", it = new Set(Object.values(_));
function W(e) {
	let t = { ...e };
	for (let e of g) t[_[e]] = v[e];
	return t;
}
function G(e) {
	return lt(e) || ut(e);
}
function at(e) {
	return e?.type === "spell" || e?.type === "prayer";
}
function ot(e) {
	let t = qe(z(z(e?.system)?.qualities)?.value), n = [];
	for (let e of t) {
		let t = z(e)?.name;
		if (typeof t != "string") continue;
		let r = pt(t);
		r && n.push(v[r]);
	}
	return n;
}
function st(e) {
	if (!(typeof e != "object" || !e)) return e;
}
function ct(e) {
	if (typeof e != "object" || !e) return;
	let t = e;
	if (!(t.qualities !== void 0 && !Array.isArray(t.qualities))) return t;
}
function lt(e) {
	return e?.type === "weapon" || e?.type === "ammunition" || e?.system?.isWeapon === !0;
}
function ut(e) {
	return (e?.type === "spell" || e?.type === "prayer") && dt(e.system);
}
function dt(e) {
	let t = z(e?.damage), n = z(e?.magicMissile);
	return ft(t?.value) || ft(t?.dice) || t?.addSL === !0 || n?.value === !0;
}
function ft(e) {
	return typeof e == "number" ? e !== 0 : typeof e == "string" && e.trim().length > 0;
}
function pt(e) {
	return g.find((t) => _[t] === e);
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/actions.ts
var mt = `.${U}__sheet-row a[data-ech-action="configureProperties"]`, ht = /* @__PURE__ */ new Map(), gt = !1;
function _t() {
	gt ||= (document.addEventListener("click", bt, !0), !0);
}
function vt(e) {
	return e?.uuid;
}
function yt(e, t) {
	ht.set(e, t);
}
function K(e) {
	let t = Ct();
	!e || !t || new t(e).render(!0);
}
function bt(e) {
	let t = xt(e.target);
	t && (e.preventDefault(), e.stopPropagation(), St(t));
}
function xt(e) {
	if (e instanceof Element) return e.closest(mt) ?? void 0;
}
async function St(e) {
	let t = e.closest(`.${U}__sheet-row`)?.dataset.echItemUuid;
	if (!t) return;
	let n = await fromUuid(t);
	if (!Tt(n)) return;
	let r = ht.get(t);
	if (r) {
		r(n);
		return;
	}
	K(n);
}
function Ct() {
	let e = game.wfrp4e?.apps?.ItemProperties;
	if (wt(e)) return e;
}
function wt(e) {
	return typeof e == "function";
}
function Tt(e) {
	return typeof e == "object" && !!e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/actor-sheet.ts
var Et = /* @__PURE__ */ new WeakSet();
function q(e, t) {
	if (!(t instanceof HTMLElement)) return;
	let n = Dt(t, "combat"), r = Dt(t, "trappings");
	n && (Ot(n), kt(e, n)), r && (At(e, r), !Et.has(r) && (new MutationObserver(() => {
		At(e, r);
	}).observe(r, {
		childList: !0,
		subtree: !0
	}), Et.add(r)));
}
function Dt(e, t) {
	return e.matches(`section[data-tab="${t}"]`) ? e : e.querySelector(`section[data-tab="${t}"]`) ?? void 0;
}
function Ot(e) {
	let t = new Set(Object.values(v)), n = e.querySelectorAll(".item-property-row a[data-action=\"itemPropertyDropdown\"][data-type=\"qualities\"]");
	for (let e of n) t.has(e.textContent.trim()) && e.classList.add("ech-wounding-property-combat-text");
}
function kt(e, t) {
	let n = t.querySelectorAll(".list-row[data-uuid] .item-property-row:not([data-ech-inference-checked=\"true\"])");
	for (let t of n) {
		t.dataset.echInferenceChecked = "true";
		let n = Nt(e, t);
		if (It(n)) for (let e of n.categories) t.append(Lt("combat", e, n));
	}
}
function At(e, t) {
	jt(t), Mt(e, t);
}
function jt(e) {
	let t = new Set(Object.values(v)), n = e.querySelectorAll(".tags .tag:not(.ech-inferred-damage-type)");
	for (let e of n) t.has(e.textContent.trim()) && e.classList.add("ech-wounding-property-trappings-badge");
}
function Mt(e, t) {
	let n = t.querySelectorAll(".list-row[data-uuid] .tags:not([data-ech-inference-checked=\"true\"])");
	for (let t of n) {
		t.dataset.echInferenceChecked = "true";
		let n = Nt(e, t);
		if (It(n)) for (let e of n.categories) t.append(Lt("trappings", e, n));
	}
}
function Nt(t, n) {
	let i = n.closest(".list-row[data-uuid]")?.dataset.uuid;
	if (i) try {
		let n = Pt(t, i);
		if (!Ft(n)) {
			r(`${e} | Inferred damage display skipped for ${i}: item unavailable or unsupported.`);
			return;
		}
		let a = V(n).resolution;
		return r(`${e} | Inferred damage display resolved ${i}: source=${a.source} categories=${a.categories.join(",") || "none"}`), a;
	} catch (t) {
		r(`${e} | Could not display inferred damage type`, {
			error: t,
			uuid: i
		});
		return;
	}
}
function Pt(e, t) {
	let n = z(e), r = z((z(n?.actor) ?? z(n?.document))?.items), i = r?.get, a = t.split(".").at(-1);
	if (!(typeof i != "function" || !a)) return i.call(r, a);
}
function Ft(e) {
	let t = z(e), n = z(t?.system);
	return t?.type === "weapon" || t?.type === "ammunition" || n?.isWeapon === !0;
}
function It(e) {
	return e?.source === "weaponProperty" || e?.source === "weaponType";
}
function Lt(e, t, n) {
	let r = document.createElement(e === "combat" ? "span" : "div"), i = Rt(t, n.source, n.matches);
	return r.classList.add("ech-inferred-damage-type", `ech-inferred-damage-type--${e}`), e === "trappings" && r.classList.add("tag"), r.dataset.echDamageCategory = t, r.dataset.tooltip = i, r.setAttribute("aria-label", i), r.textContent = ne[t], r;
}
function Rt(e, t, n) {
	let r = n.filter((t) => t.category === e).map((e) => zt(e.key, t)), i = t === "weaponProperty" ? "item property" : "weapon type";
	return r.length > 0 ? `Inferred from ${r.join(", ")}` : `Inferred from ${i}`;
}
function zt(e, t) {
	if (t === "weaponProperty") {
		let t = game.wfrp4e?.utility?.qualityList?.() ?? {}, n = y(e);
		for (let [e, r] of Object.entries(t)) if (y(e) === n || y(r) === n) return r;
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
function Bt(e, t, n) {
	let r = document.createElement("div");
	r.classList.add("attribute-box", "top-label", `${U}__sheet-row`);
	let i = vt(n);
	i && (r.dataset.echItemUuid = i, yt(i, Ht(e, n)));
	let a = document.createElement("div");
	a.classList.add("label"), a.style.gridColumn = "1 / span 12", a.innerHTML = "<label><a data-ech-action=\"configureProperties\">Damage Type <i class=\"fas fa-cog\"></i></a></label>";
	let o = document.createElement("div");
	o.classList.add("field"), o.style.gridColumn = "1 / span 12";
	let s = document.createElement("input");
	return s.type = "text", s.value = t.join(","), s.readOnly = !0, o.append(s), r.append(a, o), Vt(r, n), r;
}
function Vt(e, t) {
	e.querySelector("a[data-ech-action=\"configureProperties\"]")?.addEventListener("click", (e) => {
		e.preventDefault(), K(t);
	});
}
function Ht(e, t) {
	return Ut(e) || ((e) => {
		K(e ?? t);
	});
}
function Ut(e) {
	if (typeof e != "object" || !e) return;
	let t = e.constructor?.DEFAULT_OPTIONS?.actions?.configureProperties;
	if (typeof t == "function") return (e) => {
		t.call({ document: e });
	};
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/sheet.ts
function Wt(t) {
	if (!(t instanceof HTMLElement)) {
		r(`${e} | ItemProperties render hook skipped: element is not HTMLElement`, { elementType: typeof t });
		return;
	}
	let n = t.querySelector(".property-column");
	if (!n) {
		r(`${e} | ItemProperties render hook skipped: quality column not found.`);
		return;
	}
	let i = Kt(n);
	if (i.length === 0) {
		r(`${e} | ItemProperties render hook found no damage type rows`, { checkboxCount: n.querySelectorAll("input[type=\"checkbox\"]").length });
		return;
	}
	r(`${e} | Grouping ItemProperties damage type rows`, { woundingRowCount: i.length });
	let a = n.querySelector(`.${U}`), o = a ?? document.createElement("div");
	a || (o.classList.add(U), o.append(qt()));
	for (let e of i) o.append(e);
	let s = n.querySelector("input[name=\"custom-quality\"]")?.parentElement;
	if (s) {
		s.before(o);
		return;
	}
	n.append(o);
}
function Gt(t, n) {
	if (!(n instanceof HTMLElement)) {
		r(`${e} | Item sheet render hook skipped: element is not HTMLElement`, {
			applicationName: J(t),
			elementType: typeof n
		});
		return;
	}
	let i = st(t), a = i?.document ?? i?.item;
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
	let o = Yt(n);
	if (!o) {
		r(`${e} | Item sheet qualities box not found; trying standalone damage row`, { document: Y(a) }), Jt(t, n, a);
		return;
	}
	let s = o.querySelector(".field input");
	if (!s) {
		r(`${e} | Item sheet qualities input not found`, { document: Y(a) });
		return;
	}
	let c = Xt(s.value);
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
	}), s.value = c.normal.join(","), o.parentElement?.querySelector(`.${U}__sheet-row`)?.remove(), o.after(Bt(t, c.wounding, a));
}
function Kt(e) {
	let t = e.querySelectorAll("input[type=\"checkbox\"]"), n = [];
	for (let e of t) {
		if (!it.has(e.name)) continue;
		let t = e.closest(".form-group");
		t && n.push(t);
	}
	return n;
}
function qt() {
	let e = document.createElement("h2");
	return e.classList.add("property-header", `${U}__header`), e.textContent = "Damage Type", e;
}
function Jt(t, n, i) {
	if (!at(i)) {
		r(`${e} | Standalone damage type row skipped: unsupported document`, { document: Y(i) });
		return;
	}
	if (n.querySelector(".ech-wounding-properties__sheet-row")) {
		r(`${e} | Standalone damage type row skipped: row already exists`, { document: Y(i) });
		return;
	}
	let a = Zt(n);
	if (!a) {
		r(`${e} | Standalone damage type row skipped: damage fieldset not found`, { document: Y(i) });
		return;
	}
	let o = ot(i);
	r(`${e} | Appending standalone damage type row`, {
		document: Y(i),
		labels: o
	}), a.after(Bt(t, o, i));
}
function Yt(e) {
	let t = e.querySelectorAll("a[data-action=\"configureProperties\"]");
	for (let e of t) if (e.textContent.trim().startsWith("Qualities")) return e.closest(".attribute-box") ?? void 0;
}
function Xt(e) {
	let t = [], n = [], r = new Set(Object.values(v));
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
function Zt(e) {
	let t = e.querySelectorAll("fieldset");
	for (let e of t) if (e.querySelector("legend")?.textContent.trim() === "Damage") return e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/display.ts
var Qt = !1, $t = Symbol.for(`${e}.woundingPropertiesContextPatched`);
function en() {
	if (_t(), nn(), Qt) {
		r(`${e} | Wounding property display hooks already installed.`);
		return;
	}
	Hooks.on("renderItemProperties", (e, t) => {
		Wt(t);
	}), Hooks.on("renderApplicationV2", (e, t) => {
		Gt(e, t), q(e, t), tn(e) && X(e);
	}), Hooks.on("renderBaseWFRP4eActorSheet", (e, t) => {
		q(e, t), X(e);
	}), Qt = !0, r(`${e} | Wounding property display hooks installed.`);
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
function tn(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e.actor;
	return typeof t == "object" && !!t;
}
function nn() {
	let t = rn()?.prototype, n = t?._prepareContext;
	if (!t || !n) {
		r(`${e} | ItemProperties context patch skipped: application unavailable.`);
		return;
	}
	if (an(n)) {
		r(`${e} | ItemProperties context patch already installed.`);
		return;
	}
	let i = async function(...e) {
		let t = this.document;
		G(t) && (this.qualities = W(this.qualities ?? {}));
		let r = await n.apply(this, e);
		return on(this, r), r;
	};
	Object.defineProperty(i, $t, { value: !0 }), t._prepareContext = i, r(`${e} | ItemProperties context patch installed.`);
}
function rn() {
	let e = game.wfrp4e?.apps?.ItemProperties;
	return typeof e == "function" ? e : void 0;
}
function an(e) {
	return !!e[$t];
}
function on(t, n) {
	let i = st(t), a = ct(n), o = i?.document;
	if (!i || !a || !G(o)) {
		r(`${e} | Skipping ItemProperties damage type context append`, {
			applicationName: sn(t),
			hasItemProperties: !!i,
			hasRenderContext: !!a,
			document: Z(o),
			supportsDamageTypeProperties: G(o)
		});
		return;
	}
	r(`${e} | Appending damage types to ItemProperties context`, {
		applicationName: sn(t),
		document: Z(o),
		originalQualityCount: Object.keys(i.qualities ?? {}).length,
		renderedQualityCount: a.qualities?.length ?? 0
	}), i.qualities = W(i.qualities ?? {}), a.qualities ??= [];
	for (let e of g) {
		let t = _[e];
		a.qualities.some((e) => e.key === t) || a.qualities.push({
			existing: i.document?.originalProperties?.qualities?.[t],
			hasValue: !1,
			key: t,
			name: v[e]
		});
	}
	r(`${e} | ItemProperties context after damage type append`, {
		document: Z(o),
		renderedQualityCount: a.qualities.length
	});
}
function sn(e) {
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
function cn() {
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
	for (let e of g) {
		let t = _[e];
		i[t] = "Expanded Critical Hits damage type marker. A critical hit may roll on the matching expanded critical table.", n[t] = !1;
	}
	r(`${e} | Damage qualities registered`, {
		count: g.length,
		qualityKeys: g.map((e) => _[e])
	}), ln(), en();
}
function ln() {
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
var un = "data-ech-source-item-uuid", dn = "data-ech-critical-location", fn = !1;
function pn() {
	fn ||= (mn(), document.addEventListener("click", vn, !0), !0);
}
function mn() {
	let e = CONFIG.Actor?.documentClass?.prototype, t = e?.applyDamage;
	typeof t != "function" || !e || (e.applyDamage = async function(e, n = {}) {
		let r = await t.call(this, e, n), i = hn(n);
		return typeof r != "string" || !i || !r.includes("critical-roll") ? r : _n(r, i, gn(n));
	});
}
function hn(e) {
	let t = $($(e.sourceTest)?.item), n = $($($(e.opposedTest)?.attackerTest)?.item), r = $(e.sourceItem), i = t?.uuid ?? n?.uuid ?? r?.uuid;
	return typeof i == "string" ? i : void 0;
}
function gn(e) {
	let t = $($(e.opposedTest)?.result)?.hitloc, n = $(t)?.value, r = e.loc, i;
	return typeof n == "string" ? i = n : typeof r == "string" && (i = r), i && ye(i) ? i : void 0;
}
function _n(e, t, n) {
	let r = [`${un}="${Cn(t)}"`, n ? `${dn}="${Cn(n)}"` : void 0].filter(Boolean).join(" ");
	return e.replaceAll(/<a\b(?![^>]*\bdata-ech-source-item-uuid=)(?=[^>]*\bcritical-roll\b)/g, `<a ${r}`);
}
function vn(e) {
	let t = e.target;
	if (!(t instanceof Element) || !D()) return;
	let n = t.closest(`[data-action="clickTable"][${un}]`);
	!(n instanceof HTMLElement) || !Sn(n.dataset.table) || (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), yn(n).catch((e) => {
		bn("Expanded Critical Hits could not roll an annotated zero-wound critical. See the browser console for details.", e);
	}));
}
async function yn(e) {
	let t = e.dataset.table, n = game.wfrp4e?.tables?.formatChatRoll;
	if (!t || typeof n != "function") return;
	let r = e.closest("[data-message-id]")?.dataset.messageId, i = Number.parseInt(e.dataset.modifier ?? "0", 10) || 0, a = await n(t, {
		criticalLocation: e.dataset.echCriticalLocation ?? xn(r),
		messageId: r,
		modifier: i,
		showRoll: !0,
		sourceItemUuid: e.dataset.echSourceItemUuid
	}, e.dataset.column);
	if (typeof a != "string" || a.length === 0) return;
	let o = game.wfrp4e?.utility?.chatDataSetup, s = typeof o == "function" ? o("", game.settings.get("core", "rollMode"), !0) : { content: "" };
	s.content = a, await ChatMessage.create(s);
}
function bn(t, n) {
	o(`${e} | ${t}`, n), ui.notifications?.error(t);
}
function xn(e) {
	if (!e) return;
	let t = $($($(game.messages.get(e)?.system)?.test)?.result)?.hitloc, n = $(t)?.result;
	return typeof n == "string" ? n : void 0;
}
function Sn(e) {
	return typeof e == "string" && /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function Cn(e) {
	return e.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function $(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/hooks/register-module-hooks.ts
function wn() {
	Hooks.once("init", () => {
		i(`${e} | Initializing`), we(), r(`${e} | init hook running`, {
			foundryVersion: game.version,
			systemId: game.system?.id,
			userIsGM: game.user?.isGM
		}), en(), cn();
	}), Hooks.once("ready", () => {
		Tn();
	});
}
async function Tn() {
	if (r(`${e} | ready hook running`, {
		foundryVersion: game.version,
		systemId: game.system?.id,
		userIsGM: game.user?.isGM,
		settings: j(),
		wfrpConfigAvailable: !!game.wfrp4e?.config,
		wfrpTablesAvailable: !!game.wfrp4e?.tables
	}), game.system.id !== "wfrp4e") {
		a(`${e} | Loaded outside ${t}; skipping WFRP integration.`);
		return;
	}
	Re(), await Ee(), r(`${e} | ready hook after mapping normalization`, { settings: j() }), cn(), await d(), je(), Qe(), pn(), i(`${e} | Ready`);
}
//#endregion
//#region src/main.ts
wn();
//#endregion

//# sourceMappingURL=wfrp4e-expanded-critical-hits.mjs.map