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
}, re = new Map(g.map((e) => [_[e], ne[e]])), ie = new Map(h.map((e) => [te[e], e]));
function ae(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = re.get(n) ?? ie.get(n);
		e && t.add(e);
	}
	return h.filter((e) => t.has(e));
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
		source: "explicit"
	};
	if (e.inferFromWeaponProperties) {
		let t = fe(e.weaponPropertyKeys, e.weaponPropertyMapping);
		if (t.length > 0) return {
			categories: t,
			source: "weaponProperty"
		};
	}
	if (e.inferFromWeaponTypes) {
		let t = fe(e.weaponTypeKeys, e.weaponTypeMapping);
		if (t.length > 0) return {
			categories: t,
			source: "weaponType"
		};
	}
	return {
		categories: [],
		source: "none"
	};
}
function ue(e) {
	return e.trim().toLowerCase().replaceAll(/[^a-z0-9]/g, "");
}
function y(e) {
	let t = de(e), n = {};
	for (let [e, r] of Object.entries(t ?? {})) he(r) && (n[ue(e)] = r);
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
	let n = y(t);
	return pe(e.flatMap((e) => {
		let t = n[ue(e)];
		return t && t !== "none" ? [t] : [];
	}));
}
function pe(e) {
	let t = new Set(e);
	return h.filter((e) => t.has(e));
}
function me(e) {
	return typeof e == "string" && h.includes(e);
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
function b(e) {
	let t = e.toLowerCase();
	if (t === "head" || t === "body") return t;
	if (t.endsWith("arm")) return "arm";
	if (t.endsWith("leg")) return "leg";
}
function ve(e) {
	return e ? "upInArms" : "core";
}
//#endregion
//#region src/module/settings.ts
var x = "enableCriticalReplacement", S = "enableNaturalOneCriticals", C = "inferDamageFromWeaponProperties", w = "inferDamageFromWeaponTypes", T = "weaponPropertyDamageMapping", E = "weaponTypeDamageMapping", D = JSON.stringify(se), O = JSON.stringify(ce), ye = JSON.stringify({
	hack: "cutting",
	impale: "piercing",
	pummel: "crushing",
	slash: "cutting"
});
function be() {
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
		default: D,
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
		default: O,
		type: String
	}), r(`${e} | Settings registered`, A());
}
function k() {
	return !!game.settings.get(e, x);
}
function xe() {
	return !!game.settings.get(e, S);
}
async function Se() {
	if (!game.user.isGM) {
		r(`${e} | Skipping mapping setting normalization for non-GM user.`);
		return;
	}
	r(`${e} | Normalizing stored mapping settings.`), await De(T, D), await De(E, O), r(`${e} | Mapping settings normalized`, A());
}
function Ce() {
	return !!game.settings.get(e, C);
}
function we() {
	return !!game.settings.get(e, w);
}
function Te() {
	return y(game.settings.get(e, T));
}
function Ee() {
	return y(game.settings.get(e, E));
}
async function De(t, n) {
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
	t === "weaponPropertyDamageMapping" && Oe(i, ye) && (r(`${e} | Upgrading untouched weapon property mapping defaults`, { key: t }), await game.settings.set(e, t, n));
}
function Oe(e, t) {
	return JSON.stringify(y(e)) === t;
}
function A() {
	return {
		debugConsoleLogging: j(n),
		enableCriticalReplacement: j(x),
		enableNaturalOneCriticals: j(S),
		inferDamageFromWeaponProperties: j(C),
		inferDamageFromWeaponTypes: j(w),
		weaponPropertyDamageMapping: ke(T),
		weaponTypeDamageMapping: ke(E)
	};
}
function ke(e) {
	let t = j(e);
	return {
		key: e,
		type: typeof t,
		value: t
	};
}
function j(t) {
	try {
		return game.settings.settings.has(`wfrp4e-expanded-critical-hits.${t}`) ? game.settings.get(e, t) : "<not registered>";
	} catch (e) {
		return `<error: ${e instanceof Error ? e.message : String(e)}>`;
	}
}
//#endregion
//#region src/module/wfrp4e/natural-one-critical.ts
var M = Symbol.for(`${e}.naturalOneCriticalPatch`), N = {
	installed: !1,
	message: "Natural 1 critical patch has not run."
};
function Ae() {
	return { ...N };
}
function je() {
	let t = game.wfrp4e?.rolls;
	if (!t?.TestWFRP) {
		Ie(!1, "WFRP4e roll classes were not available.");
		return;
	}
	let n = Me(t.TestWFRP), r = Ne([t.WeaponTest, t.TraitTest]);
	N = {
		installed: n,
		message: n ? `Natural 1 critical patch installed. Attack wrappers installed: ${r}.` : "TestWFRP.isCriticalFumble could not be patched."
	}, n || a(`${e} | ${N.message}`);
}
function Me(e) {
	let t = e.prototype;
	if (F(t).isCriticalFumble) return !0;
	let n = Object.getOwnPropertyDescriptor(t, "isCriticalFumble");
	return n?.get ? (Object.defineProperty(t, "isCriticalFumble", {
		configurable: n.configurable,
		enumerable: n.enumerable,
		get() {
			return P(this) ? "critical" : n.get?.call(this);
		}
	}), Fe(t, "isCriticalFumble"), !0) : !1;
}
function Ne(e) {
	let t = 0;
	for (let n of e) {
		let e = n?.prototype;
		if (!e || F(e).computeProperties) continue;
		let r = e.computeProperties;
		r && (e.computeProperties = function(...e) {
			P(this) && Pe(this);
			let t = r.apply(this, e);
			return P(this) && Pe(this), t;
		}, Fe(e, "computeProperties"), t += 1);
	}
	return t;
}
function P(e) {
	return xe() && ge({
		roll: e.result?.roll,
		target: e.result?.target
	});
}
function Pe(e) {
	e.result && (e.result.color_green = !0, e.result.critical ||= game.i18n.localize("Critical"));
}
function Fe(e, t) {
	let n = F(e);
	n[t] = !0, Object.defineProperty(e, M, {
		configurable: !0,
		value: n
	});
}
function F(e) {
	return Object.prototype.hasOwnProperty.call(e, M) ? Reflect.get(e, M) : {};
}
function Ie(t, n) {
	N = {
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
function I(e) {
	return {
		criticalLocation: e.criticalLocation,
		messageId: e.messageId,
		returnResult: e.returnResult,
		sourceItemUuid: e.sourceItemUuid
	};
}
function ze(e) {
	let t = Be(e);
	if (t) return {
		id: t.id,
		name: t.name,
		type: t.type,
		uuid: t.uuid
	};
}
function Be(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/critical-replacement/failure.ts
function L(t, n, r) {
	return o(`${e} | ${t}`, r), ui.notifications?.error(t), [
		"<div class=\"wfrp4e chat-card\">",
		"<h3>Expanded Critical Hit Failed</h3>",
		`<p>${R(t)}</p>`,
		`<p><strong>Table:</strong> ${R(n)}</p>`,
		"</div>"
	].join("");
}
function R(e) {
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
function Ve(e, t) {
	if (!Ue(e)) return;
	let n = t.criticalLocation;
	if (e.type !== "critical" || typeof n != "string") return e;
	let r = e.toObject, i = Item?.implementation;
	if (typeof r != "function" || typeof i != "function") return e;
	let a = r.call(e), o = z(z(a, "system"), "location"), s = game.wfrp4e?.config?.locations ?? {};
	return o.key = n, o.value = s[n] ?? n, new i(a);
}
function z(e, t) {
	let n = He(e[t]);
	if (n) return n;
	let r = {};
	return e[t] = r, r;
}
function He(e) {
	return typeof e == "object" && e ? e : void 0;
}
function Ue(e) {
	let t = e;
	return typeof t == "object" && !!t && typeof t.postItem == "function";
}
//#endregion
//#region src/module/wfrp4e/runtime-values.ts
function B(e) {
	return Array.isArray(e) ? e : [];
}
function V(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/quality-extraction.ts
function We(e) {
	let t = Ge(e);
	return {
		explicitCategories: ae(t),
		weaponPropertyKeys: t,
		weaponTypeKeys: Ke(e)
	};
}
function Ge(e) {
	let t = V(e), n = V(t?.system), r = V(t?.properties), i = V(n?.properties), a = [V(r?.qualities), V(i?.qualities)], o = /* @__PURE__ */ new Set();
	for (let e of a) for (let t of Object.keys(e ?? {})) o.add(t);
	let s = B(V(n?.qualities)?.value);
	for (let e of s) {
		let t = V(e)?.name;
		typeof t == "string" && o.add(t);
	}
	return [...o];
}
function Ke(e) {
	let t = V(V(e)?.system), n = /* @__PURE__ */ new Set();
	for (let e of [
		t?.weaponGroup,
		t?.group,
		t?.weaponType,
		t?.weaponClass,
		t?.ammunitionGroup,
		t?.ammoGroup,
		t?.category
	]) H(e, n);
	return [...n];
}
function H(e, t) {
	if (typeof e == "string") {
		t.add(e);
		return;
	}
	if (Array.isArray(e)) {
		for (let n of e) H(n, t);
		return;
	}
	let n = V(e);
	if (n) for (let e of [
		"key",
		"id",
		"name",
		"label",
		"value",
		"type"
	]) H(n[e], t);
}
//#endregion
//#region src/module/wfrp4e/critical-replacement.ts
var U = !1;
function qe() {
	if (U) {
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
		let s = Qe(t);
		if (!k() || !s) return s && r(`${e} | Critical replacement fallthrough`, {
			table: t,
			reason: "replacement disabled",
			options: I(a)
		}), i(t, a, o);
		let c = Xe(t, a), l;
		r(`${e} | Critical replacement inspecting WFRP critical roll`, {
			table: t,
			location: c,
			options: I(a)
		});
		try {
			l = await Ze(a);
		} catch (e) {
			return L("Expanded Critical Hits could not resolve the critical source item. See the browser console for details.", t, e);
		}
		let u = We(l), d = le({
			...u,
			inferFromWeaponProperties: Ce(),
			inferFromWeaponTypes: we(),
			weaponPropertyMapping: Te(),
			weaponTypeMapping: Ee()
		}), f = oe(d.categories);
		if (r(`${e} | Critical replacement damage category resolution`, {
			table: t,
			location: c,
			sourceItem: ze(l),
			categoryClues: u,
			categoryResolution: d,
			chosenCategory: f,
			inferFromWeaponProperties: Ce(),
			inferFromWeaponTypes: we()
		}), !c || !f) return r(`${e} | Critical replacement fallthrough`, {
			table: t,
			reason: c ? "damage category unavailable" : "location unavailable"
		}), i(t, a, o);
		let p = ve(!!game.settings.get("wfrp4e", "uiaCrits")), m = _e(p, f, c);
		if (!n(m)) return L(`Expanded Critical Hits table ${m} is missing from the module compendium.`, m);
		r(`${e} | Critical replacement rolling expanded table`, {
			table: t,
			expandedTableKey: m,
			ruleset: p,
			category: f,
			location: c
		});
		try {
			let e = await Je(m, a, o);
			if (e !== void 0) return e;
		} catch (e) {
			return L(`Expanded Critical Hits could not roll ${m}. See the browser console for details.`, m, e);
		}
		return L(`Expanded Critical Hits could not use WFRP's RollTable API for ${m}.`, m);
	}, U = !0, r(`${e} | Critical replacement patch installed.`);
}
async function Je(e, t, n) {
	let r = game.wfrp4e?.tables?.rollTable;
	if (typeof r != "function") return;
	let i = await r.call(game.wfrp4e.tables, e, t, n);
	if (await Ye(i, t)) return null;
	let a = W(i);
	return t.returnResult ? i : a?.result;
}
async function Ye(t, n) {
	let i = W(W(t)?.object)?.documentUuid;
	if (typeof i != "string") return r(`${e} | Expanded critical result had no document UUID`, { result: t }), !1;
	let a = Ve(await fromUuid(i), n);
	if (!a) throw Error(`Could not resolve expanded critical item ${i}.`);
	return r(`${e} | Posting expanded critical item`, {
		documentUuid: i,
		messageId: n.messageId,
		criticalLocation: n.criticalLocation
	}), await a.postItem(void 0, { "flags.wfrp4e.sourceMessageId": n.messageId }), !0;
}
function Xe(e, t) {
	let n = t.criticalLocation;
	return b(typeof n == "string" ? n : e.replace(/^crit/i, ""));
}
async function Ze(e) {
	let t = e.sourceItemUuid;
	if (typeof t == "string") return await fromUuid(t);
	let n = e.messageId;
	if (typeof n != "string") return;
	let r = W(W(game.messages.get(n)?.system)?.test), i = W(r?.preData);
	return r?.item ?? r?.weapon ?? i?.item;
}
function Qe(e) {
	return /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function W(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/support.ts
var G = "ech-wounding-properties", $e = new Set(Object.values(_));
function et(e) {
	let t = { ...e };
	for (let e of g) t[_[e]] = v[e];
	return t;
}
function K(e) {
	return at(e) || ot(e);
}
function tt(e) {
	return e?.type === "spell" || e?.type === "prayer";
}
function nt(e) {
	let t = B(V(V(e?.system)?.qualities)?.value), n = [];
	for (let e of t) {
		let t = V(e)?.name;
		if (typeof t != "string") continue;
		let r = lt(t);
		r && n.push(v[r]);
	}
	return n;
}
function rt(e) {
	if (!(typeof e != "object" || !e)) return e;
}
function it(e) {
	if (typeof e != "object" || !e) return;
	let t = e;
	if (!(t.qualities !== void 0 && !Array.isArray(t.qualities))) return t;
}
function at(e) {
	return e?.type === "weapon" || e?.type === "ammunition" || e?.system?.isWeapon === !0;
}
function ot(e) {
	return (e?.type === "spell" || e?.type === "prayer") && st(e.system);
}
function st(e) {
	let t = V(e?.damage), n = V(e?.magicMissile);
	return ct(t?.value) || ct(t?.dice) || t?.addSL === !0 || n?.value === !0;
}
function ct(e) {
	return typeof e == "number" ? e !== 0 : typeof e == "string" && e.trim().length > 0;
}
function lt(e) {
	return g.find((t) => _[t] === e);
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/actions.ts
var ut = `.${G}__sheet-row a[data-ech-action="configureProperties"]`, dt = /* @__PURE__ */ new Map(), ft = !1;
function pt() {
	ft ||= (document.addEventListener("click", gt, !0), !0);
}
function mt(e) {
	return e?.uuid;
}
function ht(e, t) {
	dt.set(e, t);
}
function q(e) {
	let t = yt();
	!e || !t || new t(e).render(!0);
}
function gt(e) {
	let t = _t(e.target);
	t && (e.preventDefault(), e.stopPropagation(), vt(t));
}
function _t(e) {
	if (e instanceof Element) return e.closest(ut) ?? void 0;
}
async function vt(e) {
	let t = e.closest(`.${G}__sheet-row`)?.dataset.echItemUuid;
	if (!t) return;
	let n = await fromUuid(t);
	if (!xt(n)) return;
	let r = dt.get(t);
	if (r) {
		r(n);
		return;
	}
	q(n);
}
function yt() {
	let e = game.wfrp4e?.apps?.ItemProperties;
	if (bt(e)) return e;
}
function bt(e) {
	return typeof e == "function";
}
function xt(e) {
	return typeof e == "object" && !!e;
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
function St(e, t, n) {
	let r = document.createElement("div");
	r.classList.add("attribute-box", "top-label", `${G}__sheet-row`);
	let i = mt(n);
	i && (r.dataset.echItemUuid = i, ht(i, wt(e, n)));
	let a = document.createElement("div");
	a.classList.add("label"), a.style.gridColumn = "1 / span 12", a.innerHTML = "<label><a data-ech-action=\"configureProperties\">Damage Type <i class=\"fas fa-cog\"></i></a></label>";
	let o = document.createElement("div");
	o.classList.add("field"), o.style.gridColumn = "1 / span 12";
	let s = document.createElement("input");
	return s.type = "text", s.value = t.join(","), s.readOnly = !0, o.append(s), r.append(a, o), Ct(r, n), r;
}
function Ct(e, t) {
	e.querySelector("a[data-ech-action=\"configureProperties\"]")?.addEventListener("click", (e) => {
		e.preventDefault(), q(t);
	});
}
function wt(e, t) {
	return Tt(e) || ((e) => {
		q(e ?? t);
	});
}
function Tt(e) {
	if (typeof e != "object" || !e) return;
	let t = e.constructor?.DEFAULT_OPTIONS?.actions?.configureProperties;
	if (typeof t == "function") return (e) => {
		t.call({ document: e });
	};
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/sheet.ts
function Et(t) {
	if (!(t instanceof HTMLElement)) {
		r(`${e} | ItemProperties render hook skipped: element is not HTMLElement`, { elementType: typeof t });
		return;
	}
	let n = t.querySelector(".property-column");
	if (!n) {
		r(`${e} | ItemProperties render hook skipped: quality column not found.`);
		return;
	}
	let i = Ot(n);
	if (i.length === 0) {
		r(`${e} | ItemProperties render hook found no damage type rows`, { checkboxCount: n.querySelectorAll("input[type=\"checkbox\"]").length });
		return;
	}
	r(`${e} | Grouping ItemProperties damage type rows`, { woundingRowCount: i.length });
	let a = n.querySelector(`.${G}`), o = a ?? document.createElement("div");
	a || (o.classList.add(G), o.append(kt()));
	for (let e of i) o.append(e);
	let s = n.querySelector("input[name=\"custom-quality\"]")?.parentElement;
	if (s) {
		s.before(o);
		return;
	}
	n.append(o);
}
function Dt(t, n) {
	if (!(n instanceof HTMLElement)) {
		r(`${e} | Item sheet render hook skipped: element is not HTMLElement`, {
			applicationName: J(t),
			elementType: typeof n
		});
		return;
	}
	let i = rt(t), a = i?.document ?? i?.item;
	if (!K(a)) {
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
	let o = jt(n);
	if (!o) {
		r(`${e} | Item sheet qualities box not found; trying standalone damage row`, { document: Y(a) }), At(t, n, a);
		return;
	}
	let s = o.querySelector(".field input");
	if (!s) {
		r(`${e} | Item sheet qualities input not found`, { document: Y(a) });
		return;
	}
	let c = Mt(s.value);
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
	}), s.value = c.normal.join(","), o.parentElement?.querySelector(`.${G}__sheet-row`)?.remove(), o.after(St(t, c.wounding, a));
}
function Ot(e) {
	let t = e.querySelectorAll("input[type=\"checkbox\"]"), n = [];
	for (let e of t) {
		if (!$e.has(e.name)) continue;
		let t = e.closest(".form-group");
		t && n.push(t);
	}
	return n;
}
function kt() {
	let e = document.createElement("h2");
	return e.classList.add("property-header", `${G}__header`), e.textContent = "Damage Type", e;
}
function At(t, n, i) {
	if (!tt(i)) {
		r(`${e} | Standalone damage type row skipped: unsupported document`, { document: Y(i) });
		return;
	}
	if (n.querySelector(".ech-wounding-properties__sheet-row")) {
		r(`${e} | Standalone damage type row skipped: row already exists`, { document: Y(i) });
		return;
	}
	let a = Nt(n);
	if (!a) {
		r(`${e} | Standalone damage type row skipped: damage fieldset not found`, { document: Y(i) });
		return;
	}
	let o = nt(i);
	r(`${e} | Appending standalone damage type row`, {
		document: Y(i),
		labels: o
	}), a.after(St(t, o, i));
}
function jt(e) {
	let t = e.querySelectorAll("a[data-action=\"configureProperties\"]");
	for (let e of t) if (e.textContent.trim().startsWith("Qualities")) return e.closest(".attribute-box") ?? void 0;
}
function Mt(e) {
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
function Nt(e) {
	let t = e.querySelectorAll("fieldset");
	for (let e of t) if (e.querySelector("legend")?.textContent.trim() === "Damage") return e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/display.ts
var Pt = !1;
function Ft() {
	if (Pt) {
		r(`${e} | Wounding property display hooks already installed.`);
		return;
	}
	pt(), Hooks.on("preRenderItemProperties", (e, t) => {
		It(e, t);
	}), Hooks.on("renderItemProperties", (e, t) => {
		Et(t);
	}), Hooks.on("renderApplicationV2", (e, t) => {
		Dt(e, t);
	}), Pt = !0, r(`${e} | Wounding property display hooks installed.`);
}
function It(t, n) {
	let i = rt(t), a = it(n), o = i?.document;
	if (!i || !a || !K(o)) {
		r(`${e} | Skipping ItemProperties damage type context append`, {
			applicationName: Lt(t),
			hasItemProperties: !!i,
			hasRenderContext: !!a,
			document: X(o),
			supportsDamageTypeProperties: K(o)
		});
		return;
	}
	r(`${e} | Appending damage types to ItemProperties context`, {
		applicationName: Lt(t),
		document: X(o),
		originalQualityCount: Object.keys(i.qualities ?? {}).length,
		renderedQualityCount: a.qualities?.length ?? 0
	}), i.qualities = et(i.qualities ?? {}), a.qualities ??= [];
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
		document: X(o),
		renderedQualityCount: a.qualities.length
	});
}
function Lt(e) {
	if (!(typeof e != "object" || !e)) return e.constructor?.name;
}
function X(e) {
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
var Z = !1;
function Q() {
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
	}), Rt(), Ft();
}
function Rt() {
	let t = game.wfrp4e?.utility, n = t?.qualityList;
	if (Z || !t || !n) {
		r(`${e} | Quality list patch skipped`, {
			qualityListPatchInstalled: Z,
			hasUtility: !!t,
			hasOriginalQualityList: !!n
		});
		return;
	}
	t.qualityList = function(e) {
		let t = n.call(this, e);
		return e === "armor" ? t : et(t);
	}, Z = !0, r(`${e} | Quality list patch installed.`);
}
//#endregion
//#region src/module/wfrp4e/zero-wound-critical-links.ts
var zt = "data-ech-source-item-uuid", Bt = "data-ech-critical-location", Vt = !1;
function Ht() {
	Vt ||= (Ut(), document.addEventListener("click", qt, !0), !0);
}
function Ut() {
	let e = CONFIG.Actor?.documentClass?.prototype, t = e?.applyDamage;
	typeof t != "function" || !e || (e.applyDamage = async function(e, n = {}) {
		let r = await t.call(this, e, n), i = Wt(n);
		return typeof r != "string" || !i || !r.includes("critical-roll") ? r : Kt(r, i, Gt(n));
	});
}
function Wt(e) {
	let t = $($(e.sourceTest)?.item), n = $($($(e.opposedTest)?.attackerTest)?.item), r = $(e.sourceItem), i = t?.uuid ?? n?.uuid ?? r?.uuid;
	return typeof i == "string" ? i : void 0;
}
function Gt(e) {
	let t = $($(e.opposedTest)?.result)?.hitloc, n = $(t)?.value, r = e.loc, i;
	return typeof n == "string" ? i = n : typeof r == "string" && (i = r), i && b(i) ? i : void 0;
}
function Kt(e, t, n) {
	let r = [`${zt}="${Qt(t)}"`, n ? `${Bt}="${Qt(n)}"` : void 0].filter(Boolean).join(" ");
	return e.replaceAll(/<a\b(?![^>]*\bdata-ech-source-item-uuid=)(?=[^>]*\bcritical-roll\b)/g, `<a ${r}`);
}
function qt(e) {
	let t = e.target;
	if (!(t instanceof Element) || !k()) return;
	let n = t.closest(`[data-action="clickTable"][${zt}]`);
	!(n instanceof HTMLElement) || !Zt(n.dataset.table) || (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), Jt(n).catch((e) => {
		Yt("Expanded Critical Hits could not roll an annotated zero-wound critical. See the browser console for details.", e);
	}));
}
async function Jt(e) {
	let t = e.dataset.table, n = game.wfrp4e?.tables?.formatChatRoll;
	if (!t || typeof n != "function") return;
	let r = e.closest("[data-message-id]")?.dataset.messageId, i = Number.parseInt(e.dataset.modifier ?? "0", 10) || 0, a = await n(t, {
		criticalLocation: e.dataset.echCriticalLocation ?? Xt(r),
		messageId: r,
		modifier: i,
		showRoll: !0,
		sourceItemUuid: e.dataset.echSourceItemUuid
	}, e.dataset.column);
	if (typeof a != "string" || a.length === 0) return;
	let o = game.wfrp4e?.utility?.chatDataSetup, s = typeof o == "function" ? o("", game.settings.get("core", "rollMode"), !0) : { content: "" };
	s.content = a, await ChatMessage.create(s);
}
function Yt(t, n) {
	o(`${e} | ${t}`, n), ui.notifications?.error(t);
}
function Xt(e) {
	if (!e) return;
	let t = $($($(game.messages.get(e)?.system)?.test)?.result)?.hitloc, n = $(t)?.result;
	return typeof n == "string" ? n : void 0;
}
function Zt(e) {
	return typeof e == "string" && /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function Qt(e) {
	return e.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function $(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/hooks/register-module-hooks.ts
function $t() {
	Hooks.once("init", () => {
		i(`${e} | Initializing`), be(), r(`${e} | init hook running`, {
			foundryVersion: game.version,
			systemId: game.system?.id,
			userIsGM: game.user?.isGM
		}), Ft(), Q();
	}), Hooks.once("ready", () => {
		en();
	});
}
async function en() {
	if (r(`${e} | ready hook running`, {
		foundryVersion: game.version,
		systemId: game.system?.id,
		userIsGM: game.user?.isGM,
		settings: A(),
		wfrpConfigAvailable: !!game.wfrp4e?.config,
		wfrpTablesAvailable: !!game.wfrp4e?.tables
	}), game.system.id !== "wfrp4e") {
		a(`${e} | Loaded outside ${t}; skipping WFRP integration.`);
		return;
	}
	Re(), await Se(), r(`${e} | ready hook after mapping normalization`, { settings: A() }), Q(), await d(), je(), qe(), Ht(), i(`${e} | Ready`);
}
//#endregion
//#region src/main.ts
$t();
//#endregion

//# sourceMappingURL=wfrp4e-expanded-critical-hits.mjs.map