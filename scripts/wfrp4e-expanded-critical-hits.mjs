//#region src/module/constants.ts
var e = "wfrp4e-expanded-critical-hits", t = "wfrp4e";
//#endregion
//#region src/module/logging.ts
function n(e, ...t) {
	console.info(e, ...t);
}
function r(e, ...t) {
	console.warn(e, ...t);
}
function i(e, ...t) {
	console.error(e, ...t);
}
//#endregion
//#region src/module/wfrp4e/critical-compendiums.ts
var a = "expanded-critical-wounds", o = "expanded-critical-tables", s = !1;
async function c() {
	if (s) return;
	let t = game.wfrp4e?.tables, n = t?.findTable?.bind(t);
	if (!t || typeof n != "function") {
		r(`${e} | WFRP table lookup API was unavailable.`);
		return;
	}
	let i = await d();
	i.size === 0 && r(`${e} | No expanded critical RollTables were found in the module pack.`), t.findTable = (e) => n(e) || i.get(e.toLowerCase()), s = !0;
}
async function l() {
	return {
		criticalItems: await f(a, "Items"),
		criticalTables: await f(o, "Tables")
	};
}
function u(t) {
	return `${e}.${t}`;
}
async function d() {
	let e = /* @__PURE__ */ new Map(), t = game.packs.get(u(o));
	if (!t) return e;
	let n = await t.getDocuments();
	for (let t of n) {
		let n = t.getFlag("wfrp4e", "key");
		typeof n == "string" && e.set(n.toLowerCase(), t);
	}
	return e;
}
async function f(e, t) {
	let n = u(e), r = game.packs.get(n);
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
//#region src/module/api/create-module-api.ts
function ee() {
	return { getExpandedCriticalsCompendiumStatus: l };
}
//#endregion
//#region src/module/api/register-module-api.ts
function te() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let t = game.modules.get(e);
	if (!t) throw Error(`Foundry module registry entry was not found for ${e}.`);
	t.api = ee();
}
//#endregion
//#region src/types/critical-hits.ts
var p = [
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
], m = [
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
], ne = {
	hack: "cutting",
	impale: "piercing",
	pummel: "crushing",
	slash: "cutting"
}, re = {
	basic: "cutting",
	blackpowder: "bullets",
	bow: "arrowsBolts",
	brawling: "unarmed",
	cavalry: "cutting",
	crossbow: "arrowsBolts",
	engineering: "shrapnelShot",
	explosives: "shrapnelShot",
	fencing: "piercing",
	flail: "crushing",
	parry: "cutting",
	polearm: "piercing",
	sling: "sling",
	throwing: "piercing",
	twohanded: "cutting"
};
function ie(e) {
	if (e.explicitCategories.length > 0) return {
		categories: y(e.explicitCategories),
		source: "explicit"
	};
	if (e.inferFromWeaponProperties) {
		let t = v(e.weaponPropertyKeys, e.weaponPropertyMapping);
		if (t.length > 0) return {
			categories: t,
			source: "weaponProperty"
		};
	}
	if (e.inferFromWeaponTypes) {
		let t = v(e.weaponTypeKeys, e.weaponTypeMapping);
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
function h(e) {
	return e.trim().toLowerCase().replaceAll(/[^a-z0-9]/g, "");
}
function g(e) {
	let t = _(e), n = {};
	for (let [e, r] of Object.entries(t ?? {})) ae(r) && (n[h(e)] = r);
	return n;
}
function _(e) {
	if (typeof e == "string") try {
		return _(JSON.parse(e));
	} catch {
		return;
	}
	if (typeof e == "object" && e && !Array.isArray(e)) return e;
}
function v(e, t) {
	let n = g(t);
	return y(e.flatMap((e) => {
		let t = n[h(e)];
		return t ? [t] : [];
	}));
}
function y(e) {
	let t = new Set(e);
	return p.filter((e) => t.has(e));
}
function ae(e) {
	return typeof e == "string" && p.includes(e);
}
//#endregion
//#region src/module/settings.ts
var b = "enableCriticalReplacement", x = "inferDamageFromWeaponProperties", S = "inferDamageFromWeaponTypes", C = "weaponPropertyDamageMapping", w = "weaponTypeDamageMapping", T = JSON.stringify(ne), E = JSON.stringify(re);
function oe() {
	game.settings.register(e, b, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, x, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponProperties.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponProperties.hint",
		scope: "world",
		config: !0,
		default: !0,
		type: Boolean
	}), game.settings.register(e, C, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponPropertyDamageMapping.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponPropertyDamageMapping.hint",
		scope: "world",
		config: !0,
		default: T,
		type: String
	}), game.settings.register(e, S, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponTypes.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponTypes.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, w, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponTypeDamageMapping.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponTypeDamageMapping.hint",
		scope: "world",
		config: !0,
		default: E,
		type: String
	});
}
function D() {
	return !!game.settings.get(e, b);
}
async function se() {
	game.user.isGM && (await O(C, T), await O(w, E));
}
function ce() {
	return !!game.settings.get(e, x);
}
function le() {
	return !!game.settings.get(e, S);
}
function ue() {
	return g(game.settings.get(e, C));
}
function de() {
	return g(game.settings.get(e, w));
}
async function O(t, n) {
	let r = game.settings.get(e, t);
	if (typeof r == "object" && r) {
		await game.settings.set(e, t, JSON.stringify(r));
		return;
	}
	r === "[object Object]" && await game.settings.set(e, t, n);
}
//#endregion
//#region src/functions/critical-hits/damage-categories.ts
var fe = {
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
}, k = {
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
}, A = {
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
}, pe = {
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
}, me = new Map(m.map((e) => [k[e], pe[e]])), he = new Map(p.map((e) => [fe[e], e]));
function ge(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = me.get(n) ?? he.get(n);
		e && t.add(e);
	}
	return p.filter((e) => t.has(e));
}
function _e(e, t = Math.random()) {
	if (e.length !== 0) return e[Math.min(Math.floor(t * e.length), e.length - 1)];
}
//#endregion
//#region src/functions/critical-hits/table-keys.ts
function ve(e, t, n) {
	return `ech-crit-${e}-${t}-${n}`.toLowerCase();
}
function j(e) {
	let t = e.toLowerCase();
	if (t === "head" || t === "body") return t;
	if (t.endsWith("arm")) return "arm";
	if (t.endsWith("leg")) return "leg";
}
function ye(e) {
	return e ? "upInArms" : "core";
}
//#endregion
//#region src/module/wfrp4e/runtime-values.ts
function M(e) {
	return Array.isArray(e) ? e : [];
}
function N(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/quality-extraction.ts
function P(e) {
	let t = be(e);
	return {
		explicitCategories: ge(t),
		weaponPropertyKeys: t,
		weaponTypeKeys: xe(e)
	};
}
function be(e) {
	let t = N(e), n = N(t?.system), r = N(t?.properties), i = N(n?.properties), a = [N(r?.qualities), N(i?.qualities)], o = /* @__PURE__ */ new Set();
	for (let e of a) for (let t of Object.keys(e ?? {})) o.add(t);
	let s = M(N(n?.qualities)?.value);
	for (let e of s) {
		let t = N(e)?.name;
		typeof t == "string" && o.add(t);
	}
	return [...o];
}
function xe(e) {
	let t = N(N(e)?.system), n = /* @__PURE__ */ new Set();
	for (let e of [
		t?.weaponGroup,
		t?.group,
		t?.weaponType,
		t?.weaponClass,
		t?.ammunitionGroup,
		t?.ammoGroup,
		t?.category
	]) F(e, n);
	return [...n];
}
function F(e, t) {
	if (typeof e == "string") {
		t.add(e);
		return;
	}
	if (Array.isArray(e)) {
		for (let n of e) F(n, t);
		return;
	}
	let n = N(e);
	if (n) for (let e of [
		"key",
		"id",
		"name",
		"label",
		"value",
		"type"
	]) F(n[e], t);
}
//#endregion
//#region src/module/wfrp4e/critical-replacement.ts
var I = !1;
function Se() {
	if (I) return;
	let e = game.wfrp4e?.tables;
	if (!e || typeof e.findTable != "function" || typeof e.formatChatRoll != "function") return;
	let t = e.findTable.bind(e), n = e.formatChatRoll.bind(e);
	e.formatChatRoll = async (e, r = {}, i = null) => {
		if (!D() || !Oe(e)) return n(e, r, i);
		let a = Ee(e, r), o;
		try {
			o = await De(r);
		} catch (t) {
			return L("Expanded Critical Hits could not resolve the critical source item. See the browser console for details.", e, t);
		}
		let s = _e(ie({
			...P(o),
			inferFromWeaponProperties: ce(),
			inferFromWeaponTypes: le(),
			weaponPropertyMapping: ue(),
			weaponTypeMapping: de()
		}).categories);
		if (!a || !s) return n(e, r, i);
		let c = ve(ye(!!game.settings.get("wfrp4e", "uiaCrits")), s, a);
		if (!t(c)) return L(`Expanded Critical Hits table ${c} is missing from the module compendium.`, c);
		try {
			let e = await Ce(c, r, i);
			if (e !== void 0) return e;
		} catch (e) {
			return L(`Expanded Critical Hits could not roll ${c}. See the browser console for details.`, c, e);
		}
		return L(`Expanded Critical Hits could not use WFRP's RollTable API for ${c}.`, c);
	}, I = !0;
}
async function Ce(e, t, n) {
	let r = game.wfrp4e?.tables?.rollTable;
	if (typeof r != "function") return;
	let i = await r.call(game.wfrp4e.tables, e, t, n);
	if (await we(i, t)) return null;
	let a = z(i);
	return t.returnResult ? i : a?.result;
}
async function we(e, t) {
	let n = z(z(e)?.object)?.documentUuid;
	if (typeof n != "string") return !1;
	let r = Te(await fromUuid(n), t);
	if (!r) throw Error(`Could not resolve expanded critical item ${n}.`);
	return await r.postItem(void 0, { "flags.wfrp4e.sourceMessageId": t.messageId }), !0;
}
function Te(e, t) {
	if (!ke(e)) return;
	let n = t.criticalLocation;
	if (e.type !== "critical" || typeof n != "string") return e;
	let r = e.toObject, i = Item?.implementation;
	if (typeof r != "function" || typeof i != "function") return e;
	let a = r.call(e), o = B(B(a, "system"), "location"), s = game.wfrp4e?.config?.locations ?? {};
	return o.key = n, o.value = s[n] ?? n, new i(a);
}
function Ee(e, t) {
	let n = t.criticalLocation;
	return j(typeof n == "string" ? n : e.replace(/^crit/i, ""));
}
async function De(e) {
	let t = e.sourceItemUuid;
	if (typeof t == "string") return await fromUuid(t);
	let n = e.messageId;
	if (typeof n != "string") return;
	let r = z(z(game.messages.get(n)?.system)?.test), i = z(r?.preData);
	return r?.item ?? r?.weapon ?? i?.item;
}
function Oe(e) {
	return /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function L(t, n, r) {
	return i(`${e} | ${t}`, r), ui.notifications?.error(t), [
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
function z(e) {
	return typeof e == "object" && e ? e : void 0;
}
function B(e, t) {
	let n = z(e[t]);
	if (n) return n;
	let r = {};
	return e[t] = r, r;
}
function ke(e) {
	let t = e;
	return typeof t == "object" && !!t && typeof t.postItem == "function";
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/support.ts
var V = "ech-wounding-properties", Ae = new Set(Object.values(k));
function H(e) {
	let t = { ...e };
	for (let e of m) t[k[e]] = A[e];
	return t;
}
function U(e) {
	return Pe(e) || Fe(e);
}
function je(e) {
	return e?.type === "spell" || e?.type === "prayer";
}
function Me(e) {
	let t = M(N(N(e?.system)?.qualities)?.value), n = [];
	for (let e of t) {
		let t = N(e)?.name;
		if (typeof t != "string") continue;
		let r = Le(t);
		r && n.push(A[r]);
	}
	return n;
}
function W(e) {
	if (!(typeof e != "object" || !e)) return e;
}
function Ne(e) {
	if (typeof e != "object" || !e) return;
	let t = e;
	if (!(t.qualities !== void 0 && !Array.isArray(t.qualities))) return t;
}
function Pe(e) {
	return e?.type === "weapon" || e?.type === "ammunition" || e?.system?.isWeapon === !0;
}
function Fe(e) {
	return (e?.type === "spell" || e?.type === "prayer") && Ie(e.system);
}
function Ie(e) {
	let t = N(e?.damage), n = N(e?.magicMissile);
	return G(t?.value) || G(t?.dice) || t?.addSL === !0 || n?.value === !0;
}
function G(e) {
	return typeof e == "number" ? e !== 0 : typeof e == "string" && e.trim().length > 0;
}
function Le(e) {
	return m.find((t) => k[t] === e);
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/actions.ts
var Re = `.${V}__sheet-row a[data-ech-action="configureProperties"]`, K = /* @__PURE__ */ new Map(), ze = !1;
function Be() {
	ze ||= (document.addEventListener("click", Ue, !0), !0);
}
function Ve(e) {
	return e?.uuid;
}
function He(e, t) {
	K.set(e, t);
}
function q(e) {
	let t = Ke();
	!e || !t || new t(e).render(!0);
}
function Ue(e) {
	let t = We(e.target);
	t && (e.preventDefault(), e.stopPropagation(), Ge(t));
}
function We(e) {
	if (e instanceof Element) return e.closest(Re) ?? void 0;
}
async function Ge(e) {
	let t = e.closest(`.${V}__sheet-row`)?.dataset.echItemUuid;
	if (!t) return;
	let n = await fromUuid(t);
	if (!Je(n)) return;
	let r = K.get(t);
	if (r) {
		r(n);
		return;
	}
	q(n);
}
function Ke() {
	let e = game.wfrp4e?.apps?.ItemProperties;
	if (qe(e)) return e;
}
function qe(e) {
	return typeof e == "function";
}
function Je(e) {
	return typeof e == "object" && !!e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/sheet.ts
function Ye(e) {
	if (!(e instanceof HTMLElement)) return;
	let t = e.querySelector(".property-column");
	if (!t) return;
	let n = Ze(t);
	if (n.length === 0) return;
	let r = t.querySelector(`.${V}`), i = r ?? document.createElement("div");
	r || (i.classList.add(V), i.append(Qe()));
	for (let e of n) i.append(e);
	let a = t.querySelector("input[name=\"custom-quality\"]")?.parentElement;
	if (a) {
		a.before(i);
		return;
	}
	t.append(i);
}
function Xe(e, t) {
	if (!(t instanceof HTMLElement)) return;
	let n = W(e), r = n?.document ?? n?.item;
	if (!U(r)) return;
	let i = et(t);
	if (!i) {
		$e(e, t, r);
		return;
	}
	let a = i.querySelector(".field input");
	if (!a) return;
	let o = tt(a.value);
	o.wounding.length !== 0 && (a.value = o.normal.join(","), i.parentElement?.querySelector(`.${V}__sheet-row`)?.remove(), i.after(J(e, o.wounding, r)));
}
function Ze(e) {
	let t = e.querySelectorAll("input[type=\"checkbox\"]"), n = [];
	for (let e of t) {
		if (!Ae.has(e.name)) continue;
		let t = e.closest(".form-group");
		t && n.push(t);
	}
	return n;
}
function Qe() {
	let e = document.createElement("h2");
	return e.classList.add("property-header", `${V}__header`), e.textContent = "Damage Type", e;
}
function $e(e, t, n) {
	if (!je(n) || t.querySelector(".ech-wounding-properties__sheet-row")) return;
	let r = at(t);
	if (!r) return;
	let i = Me(n);
	r.after(J(e, i, n));
}
function et(e) {
	let t = e.querySelectorAll("a[data-action=\"configureProperties\"]");
	for (let e of t) if (e.textContent.trim().startsWith("Qualities")) return e.closest(".attribute-box") ?? void 0;
}
function tt(e) {
	let t = [], n = [], r = new Set(Object.values(A));
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
function J(e, t, n) {
	let r = document.createElement("div");
	r.classList.add("attribute-box", "top-label", `${V}__sheet-row`);
	let i = Ve(n);
	i && (r.dataset.echItemUuid = i, He(i, rt(e, n)));
	let a = document.createElement("div");
	a.classList.add("label"), a.style.gridColumn = "1 / span 12", a.innerHTML = "<label><a data-ech-action=\"configureProperties\">Damage Type <i class=\"fas fa-cog\"></i></a></label>";
	let o = document.createElement("div");
	o.classList.add("field"), o.style.gridColumn = "1 / span 12";
	let s = document.createElement("input");
	return s.type = "text", s.value = t.join(","), s.readOnly = !0, o.append(s), r.append(a, o), nt(r, n), r;
}
function nt(e, t) {
	e.querySelector("a[data-ech-action=\"configureProperties\"]")?.addEventListener("click", (e) => {
		e.preventDefault(), q(t);
	});
}
function rt(e, t) {
	return it(e) || ((e) => {
		q(e ?? t);
	});
}
function it(e) {
	if (typeof e != "object" || !e) return;
	let t = e.constructor?.DEFAULT_OPTIONS?.actions?.configureProperties;
	if (typeof t == "function") return (e) => {
		t.call({ document: e });
	};
}
function at(e) {
	let t = e.querySelectorAll("fieldset");
	for (let e of t) if (e.querySelector("legend")?.textContent.trim() === "Damage") return e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/display.ts
var ot = !1;
function st() {
	ot ||= (Be(), Hooks.on("preRenderItemProperties", (e, t) => {
		ct(e, t);
	}), Hooks.on("renderItemProperties", (e, t) => {
		Ye(t);
	}), Hooks.on("renderApplicationV2", (e, t) => {
		Xe(e, t);
	}), !0);
}
function ct(e, t) {
	let n = W(e), r = Ne(t);
	if (!(!n || !r || !U(n.document))) {
		n.qualities = H(n.qualities ?? {}), r.qualities ??= [];
		for (let e of m) {
			let t = k[e];
			r.qualities.some((e) => e.key === t) || r.qualities.push({
				existing: n.document?.originalProperties?.qualities?.[t],
				hasValue: !1,
				key: t,
				name: A[e]
			});
		}
	}
}
//#endregion
//#region src/module/wfrp4e/damage-qualities.ts
var Y = !1;
function lt() {
	let e = game.wfrp4e?.config;
	if (!e) return;
	let t = e.propertyHasValue, n = e.qualityDescriptions;
	if (!(!t || !n)) {
		for (let e of m) {
			let r = k[e];
			n[r] = "Expanded Critical Hits damage type marker. A critical hit may roll on the matching expanded critical table.", t[r] = !1;
		}
		ut(), st();
	}
}
function ut() {
	let e = game.wfrp4e?.utility, t = e?.qualityList;
	Y || !e || !t || (e.qualityList = function(e) {
		let n = t.call(this, e);
		return e === "armor" ? n : H(n);
	}, Y = !0);
}
//#endregion
//#region src/module/wfrp4e/zero-wound-critical-links.ts
var X = "data-ech-source-item-uuid", dt = "data-ech-critical-location", ft = !1;
function pt() {
	ft ||= (mt(), document.addEventListener("click", vt, !0), !0);
}
function mt() {
	let e = CONFIG.Actor?.documentClass?.prototype, t = e?.applyDamage;
	typeof t != "function" || !e || (e.applyDamage = async function(e, n = {}) {
		let r = await t.call(this, e, n), i = ht(n);
		return typeof r != "string" || !i || !r.includes("critical-roll") ? r : _t(r, i, gt(n));
	});
}
function ht(e) {
	let t = $($(e.sourceTest)?.item), n = $($($(e.opposedTest)?.attackerTest)?.item), r = $(e.sourceItem), i = t?.uuid ?? n?.uuid ?? r?.uuid;
	return typeof i == "string" ? i : void 0;
}
function gt(e) {
	let t = $($(e.opposedTest)?.result)?.hitloc, n = $(t)?.value, r = e.loc, i;
	return typeof n == "string" ? i = n : typeof r == "string" && (i = r), i && j(i) ? i : void 0;
}
function _t(e, t, n) {
	let r = [`${X}="${Q(t)}"`, n ? `${dt}="${Q(n)}"` : void 0].filter(Boolean).join(" ");
	return e.replaceAll(/<a\b(?![^>]*\bdata-ech-source-item-uuid=)(?=[^>]*\bcritical-roll\b)/g, `<a ${r}`);
}
function vt(e) {
	let t = e.target;
	if (!(t instanceof Element) || !D()) return;
	let n = t.closest(`[data-action="clickTable"][${X}]`);
	!(n instanceof HTMLElement) || !xt(n.dataset.table) || (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), yt(n).catch((e) => {
		bt("Expanded Critical Hits could not roll an annotated zero-wound critical. See the browser console for details.", e);
	}));
}
async function yt(e) {
	let t = e.dataset.table, n = game.wfrp4e?.tables?.formatChatRoll;
	if (!t || typeof n != "function") return;
	let r = e.closest("[data-message-id]")?.dataset.messageId, i = Number.parseInt(e.dataset.modifier ?? "0", 10) || 0, a = await n(t, {
		criticalLocation: e.dataset.echCriticalLocation ?? Z(r),
		messageId: r,
		modifier: i,
		showRoll: !0,
		sourceItemUuid: e.dataset.echSourceItemUuid
	}, e.dataset.column);
	if (typeof a != "string" || a.length === 0) return;
	let o = game.wfrp4e?.utility?.chatDataSetup, s = typeof o == "function" ? o("", game.settings.get("core", "rollMode"), !0) : { content: "" };
	s.content = a, await ChatMessage.create(s);
}
function bt(t, n) {
	i(`${e} | ${t}`, n), ui.notifications?.error(t);
}
function Z(e) {
	if (!e) return;
	let t = $($($(game.messages.get(e)?.system)?.test)?.result)?.hitloc, n = $(t)?.result;
	return typeof n == "string" ? n : void 0;
}
function xt(e) {
	return typeof e == "string" && /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function Q(e) {
	return e.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function $(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/hooks/register-module-hooks.ts
function St() {
	Hooks.once("init", () => {
		n(`${e} | Initializing`), oe(), lt();
	}), Hooks.once("ready", () => {
		Ct();
	});
}
async function Ct() {
	if (game.system.id !== "wfrp4e") {
		r(`${e} | Loaded outside ${t}; skipping WFRP integration.`);
		return;
	}
	te(), await se(), await c(), Se(), pt(), n(`${e} | Ready`);
}
//#endregion
//#region src/main.ts
St();
//#endregion

//# sourceMappingURL=wfrp4e-expanded-critical-hits.mjs.map