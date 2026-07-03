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
	let i = await te();
	i.size === 0 && r(`${e} | No expanded critical RollTables were found in the module pack.`), t.findTable = (e) => n(e) || i.get(e.toLowerCase()), s = !0;
}
async function ee() {
	return {
		criticalItems: await u(a, "Items"),
		criticalTables: await u(o, "Tables")
	};
}
function l(t) {
	return `${e}.${t}`;
}
async function te() {
	let e = /* @__PURE__ */ new Map(), t = game.packs.get(l(o));
	if (!t) return e;
	let n = await t.getDocuments();
	for (let t of n) {
		let n = t.getFlag("wfrp4e", "key");
		typeof n == "string" && e.set(n.toLowerCase(), t);
	}
	return e;
}
async function u(e, t) {
	let n = l(e), r = game.packs.get(n);
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
var d = [
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
], f = [
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
}, p = {
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
}, m = {
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
}, ie = new Map(f.map((e) => [p[e], re[e]])), ae = new Map(d.map((e) => [ne[e], e]));
function oe(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = ie.get(n) ?? ae.get(n);
		e && t.add(e);
	}
	return d.filter((e) => t.has(e));
}
function se(e, t = Math.random()) {
	if (e.length !== 0) return e[Math.min(Math.floor(t * e.length), e.length - 1)];
}
//#endregion
//#region src/functions/critical-hits/damage-inference/index.ts
var ce = {
	hack: "cutting",
	impale: "piercing",
	pummel: "crushing",
	slash: "cutting"
}, le = {
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
function ue(e) {
	if (e.explicitCategories.length > 0) return {
		categories: v(e.explicitCategories),
		source: "explicit"
	};
	if (e.inferFromWeaponProperties) {
		let t = _(e.weaponPropertyKeys, e.weaponPropertyMapping);
		if (t.length > 0) return {
			categories: t,
			source: "weaponProperty"
		};
	}
	if (e.inferFromWeaponTypes) {
		let t = _(e.weaponTypeKeys, e.weaponTypeMapping);
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
	let t = de(e), n = {};
	for (let [e, r] of Object.entries(t ?? {})) fe(r) && (n[h(e)] = r);
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
function _(e, t) {
	let n = g(t);
	return v(e.flatMap((e) => {
		let t = n[h(e)];
		return t ? [t] : [];
	}));
}
function v(e) {
	let t = new Set(e);
	return d.filter((e) => t.has(e));
}
function fe(e) {
	return typeof e == "string" && d.includes(e);
}
//#endregion
//#region src/functions/critical-hits/natural-one-critical/index.ts
function pe(e) {
	let t = Number(e.roll), n = Number(e.target);
	return t === 1 && t <= n;
}
//#endregion
//#region src/functions/critical-hits/table-keys.ts
function me(e, t, n) {
	return `ech-crit-${e}-${t}-${n}`.toLowerCase();
}
function y(e) {
	let t = e.toLowerCase();
	if (t === "head" || t === "body") return t;
	if (t.endsWith("arm")) return "arm";
	if (t.endsWith("leg")) return "leg";
}
function he(e) {
	return e ? "upInArms" : "core";
}
//#endregion
//#region src/module/settings.ts
var b = "enableCriticalReplacement", x = "enableNaturalOneCriticals", S = "inferDamageFromWeaponProperties", C = "inferDamageFromWeaponTypes", w = "weaponPropertyDamageMapping", T = "weaponTypeDamageMapping", E = JSON.stringify(ce), D = JSON.stringify(le);
function ge() {
	game.settings.register(e, b, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, x, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableNaturalOneCriticals.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableNaturalOneCriticals.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, S, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponProperties.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponProperties.hint",
		scope: "world",
		config: !0,
		default: !0,
		type: Boolean
	}), game.settings.register(e, w, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponPropertyDamageMapping.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponPropertyDamageMapping.hint",
		scope: "world",
		config: !0,
		default: E,
		type: String
	}), game.settings.register(e, C, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponTypes.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponTypes.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, T, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponTypeDamageMapping.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponTypeDamageMapping.hint",
		scope: "world",
		config: !0,
		default: D,
		type: String
	});
}
function O() {
	return !!game.settings.get(e, b);
}
function _e() {
	return !!game.settings.get(e, x);
}
async function ve() {
	game.user.isGM && (await k(w, E), await k(T, D));
}
function ye() {
	return !!game.settings.get(e, S);
}
function be() {
	return !!game.settings.get(e, C);
}
function xe() {
	return g(game.settings.get(e, w));
}
function Se() {
	return g(game.settings.get(e, T));
}
async function k(t, n) {
	let r = game.settings.get(e, t);
	if (typeof r == "object" && r) {
		await game.settings.set(e, t, JSON.stringify(r));
		return;
	}
	r === "[object Object]" && await game.settings.set(e, t, n);
}
//#endregion
//#region src/module/wfrp4e/natural-one-critical.ts
var A = Symbol.for(`${e}.naturalOneCriticalPatch`), j = {
	installed: !1,
	message: "Natural 1 critical patch has not run."
};
function Ce() {
	return { ...j };
}
function we() {
	let t = game.wfrp4e?.rolls;
	if (!t?.TestWFRP) {
		De(!1, "WFRP4e roll classes were not available.");
		return;
	}
	let n = Te(t.TestWFRP), i = Ee([t.WeaponTest, t.TraitTest]);
	j = {
		installed: n,
		message: n ? `Natural 1 critical patch installed. Attack wrappers installed: ${i}.` : "TestWFRP.isCriticalFumble could not be patched."
	}, n || r(`${e} | ${j.message}`);
}
function Te(e) {
	let t = e.prototype;
	if (F(t).isCriticalFumble) return !0;
	let n = Object.getOwnPropertyDescriptor(t, "isCriticalFumble");
	return n?.get ? (Object.defineProperty(t, "isCriticalFumble", {
		configurable: n.configurable,
		enumerable: n.enumerable,
		get() {
			return M(this) ? "critical" : n.get?.call(this);
		}
	}), P(t, "isCriticalFumble"), !0) : !1;
}
function Ee(e) {
	let t = 0;
	for (let n of e) {
		let e = n?.prototype;
		if (!e || F(e).computeProperties) continue;
		let r = e.computeProperties;
		r && (e.computeProperties = function(...e) {
			M(this) && N(this);
			let t = r.apply(this, e);
			return M(this) && N(this), t;
		}, P(e, "computeProperties"), t += 1);
	}
	return t;
}
function M(e) {
	return _e() && pe({
		roll: e.result?.roll,
		target: e.result?.target
	});
}
function N(e) {
	e.result && (e.result.color_green = !0, e.result.critical ||= game.i18n.localize("Critical"));
}
function P(e, t) {
	let n = F(e);
	n[t] = !0, Object.defineProperty(e, A, {
		configurable: !0,
		value: n
	});
}
function F(e) {
	return Object.prototype.hasOwnProperty.call(e, A) ? Reflect.get(e, A) : {};
}
function De(t, n) {
	j = {
		installed: t,
		message: n
	}, r(`${e} | ${n}`);
}
//#endregion
//#region src/module/api/create-module-api.ts
function Oe() {
	return {
		getExpandedCriticalsCompendiumStatus: ee,
		getNaturalOneCriticalPatchStatus: Ce
	};
}
//#endregion
//#region src/module/api/register-module-api.ts
function ke() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let t = game.modules.get(e);
	if (!t) throw Error(`Foundry module registry entry was not found for ${e}.`);
	t.api = Oe();
}
//#endregion
//#region src/module/wfrp4e/runtime-values.ts
function I(e) {
	return Array.isArray(e) ? e : [];
}
function L(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/quality-extraction.ts
function Ae(e) {
	let t = je(e);
	return {
		explicitCategories: oe(t),
		weaponPropertyKeys: t,
		weaponTypeKeys: Me(e)
	};
}
function je(e) {
	let t = L(e), n = L(t?.system), r = L(t?.properties), i = L(n?.properties), a = [L(r?.qualities), L(i?.qualities)], o = /* @__PURE__ */ new Set();
	for (let e of a) for (let t of Object.keys(e ?? {})) o.add(t);
	let s = I(L(n?.qualities)?.value);
	for (let e of s) {
		let t = L(e)?.name;
		typeof t == "string" && o.add(t);
	}
	return [...o];
}
function Me(e) {
	let t = L(L(e)?.system), n = /* @__PURE__ */ new Set();
	for (let e of [
		t?.weaponGroup,
		t?.group,
		t?.weaponType,
		t?.weaponClass,
		t?.ammunitionGroup,
		t?.ammoGroup,
		t?.category
	]) R(e, n);
	return [...n];
}
function R(e, t) {
	if (typeof e == "string") {
		t.add(e);
		return;
	}
	if (Array.isArray(e)) {
		for (let n of e) R(n, t);
		return;
	}
	let n = L(e);
	if (n) for (let e of [
		"key",
		"id",
		"name",
		"label",
		"value",
		"type"
	]) R(n[e], t);
}
//#endregion
//#region src/module/wfrp4e/critical-replacement.ts
var z = !1;
function Ne() {
	if (z) return;
	let e = game.wfrp4e?.tables;
	if (!e || typeof e.findTable != "function" || typeof e.formatChatRoll != "function") return;
	let t = e.findTable.bind(e), n = e.formatChatRoll.bind(e);
	e.formatChatRoll = async (e, r = {}, i = null) => {
		if (!O() || !ze(e)) return n(e, r, i);
		let a = Le(e, r), o;
		try {
			o = await Re(r);
		} catch (t) {
			return B("Expanded Critical Hits could not resolve the critical source item. See the browser console for details.", e, t);
		}
		let s = se(ue({
			...Ae(o),
			inferFromWeaponProperties: ye(),
			inferFromWeaponTypes: be(),
			weaponPropertyMapping: xe(),
			weaponTypeMapping: Se()
		}).categories);
		if (!a || !s) return n(e, r, i);
		let c = me(he(!!game.settings.get("wfrp4e", "uiaCrits")), s, a);
		if (!t(c)) return B(`Expanded Critical Hits table ${c} is missing from the module compendium.`, c);
		try {
			let e = await Pe(c, r, i);
			if (e !== void 0) return e;
		} catch (e) {
			return B(`Expanded Critical Hits could not roll ${c}. See the browser console for details.`, c, e);
		}
		return B(`Expanded Critical Hits could not use WFRP's RollTable API for ${c}.`, c);
	}, z = !0;
}
async function Pe(e, t, n) {
	let r = game.wfrp4e?.tables?.rollTable;
	if (typeof r != "function") return;
	let i = await r.call(game.wfrp4e.tables, e, t, n);
	if (await Fe(i, t)) return null;
	let a = H(i);
	return t.returnResult ? i : a?.result;
}
async function Fe(e, t) {
	let n = H(H(e)?.object)?.documentUuid;
	if (typeof n != "string") return !1;
	let r = Ie(await fromUuid(n), t);
	if (!r) throw Error(`Could not resolve expanded critical item ${n}.`);
	return await r.postItem(void 0, { "flags.wfrp4e.sourceMessageId": t.messageId }), !0;
}
function Ie(e, t) {
	if (!Be(e)) return;
	let n = t.criticalLocation;
	if (e.type !== "critical" || typeof n != "string") return e;
	let r = e.toObject, i = Item?.implementation;
	if (typeof r != "function" || typeof i != "function") return e;
	let a = r.call(e), o = U(U(a, "system"), "location"), s = game.wfrp4e?.config?.locations ?? {};
	return o.key = n, o.value = s[n] ?? n, new i(a);
}
function Le(e, t) {
	let n = t.criticalLocation;
	return y(typeof n == "string" ? n : e.replace(/^crit/i, ""));
}
async function Re(e) {
	let t = e.sourceItemUuid;
	if (typeof t == "string") return await fromUuid(t);
	let n = e.messageId;
	if (typeof n != "string") return;
	let r = H(H(game.messages.get(n)?.system)?.test), i = H(r?.preData);
	return r?.item ?? r?.weapon ?? i?.item;
}
function ze(e) {
	return /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function B(t, n, r) {
	return i(`${e} | ${t}`, r), ui.notifications?.error(t), [
		"<div class=\"wfrp4e chat-card\">",
		"<h3>Expanded Critical Hit Failed</h3>",
		`<p>${V(t)}</p>`,
		`<p><strong>Table:</strong> ${V(n)}</p>`,
		"</div>"
	].join("");
}
function V(e) {
	return e.replace(/[&<>"']/g, (e) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#39;"
	})[e] ?? e);
}
function H(e) {
	return typeof e == "object" && e ? e : void 0;
}
function U(e, t) {
	let n = H(e[t]);
	if (n) return n;
	let r = {};
	return e[t] = r, r;
}
function Be(e) {
	let t = e;
	return typeof t == "object" && !!t && typeof t.postItem == "function";
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/support.ts
var W = "ech-wounding-properties", Ve = new Set(Object.values(p));
function G(e) {
	let t = { ...e };
	for (let e of f) t[p[e]] = m[e];
	return t;
}
function K(e) {
	return Ge(e) || Ke(e);
}
function He(e) {
	return e?.type === "spell" || e?.type === "prayer";
}
function Ue(e) {
	let t = I(L(L(e?.system)?.qualities)?.value), n = [];
	for (let e of t) {
		let t = L(e)?.name;
		if (typeof t != "string") continue;
		let r = Je(t);
		r && n.push(m[r]);
	}
	return n;
}
function q(e) {
	if (!(typeof e != "object" || !e)) return e;
}
function We(e) {
	if (typeof e != "object" || !e) return;
	let t = e;
	if (!(t.qualities !== void 0 && !Array.isArray(t.qualities))) return t;
}
function Ge(e) {
	return e?.type === "weapon" || e?.type === "ammunition" || e?.system?.isWeapon === !0;
}
function Ke(e) {
	return (e?.type === "spell" || e?.type === "prayer") && qe(e.system);
}
function qe(e) {
	let t = L(e?.damage), n = L(e?.magicMissile);
	return J(t?.value) || J(t?.dice) || t?.addSL === !0 || n?.value === !0;
}
function J(e) {
	return typeof e == "number" ? e !== 0 : typeof e == "string" && e.trim().length > 0;
}
function Je(e) {
	return f.find((t) => p[t] === e);
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/actions.ts
var Ye = `.${W}__sheet-row a[data-ech-action="configureProperties"]`, Y = /* @__PURE__ */ new Map(), Xe = !1;
function Ze() {
	Xe ||= (document.addEventListener("click", et, !0), !0);
}
function Qe(e) {
	return e?.uuid;
}
function $e(e, t) {
	Y.set(e, t);
}
function X(e) {
	let t = rt();
	!e || !t || new t(e).render(!0);
}
function et(e) {
	let t = tt(e.target);
	t && (e.preventDefault(), e.stopPropagation(), nt(t));
}
function tt(e) {
	if (e instanceof Element) return e.closest(Ye) ?? void 0;
}
async function nt(e) {
	let t = e.closest(`.${W}__sheet-row`)?.dataset.echItemUuid;
	if (!t) return;
	let n = await fromUuid(t);
	if (!at(n)) return;
	let r = Y.get(t);
	if (r) {
		r(n);
		return;
	}
	X(n);
}
function rt() {
	let e = game.wfrp4e?.apps?.ItemProperties;
	if (it(e)) return e;
}
function it(e) {
	return typeof e == "function";
}
function at(e) {
	return typeof e == "object" && !!e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/sheet.ts
function ot(e) {
	if (!(e instanceof HTMLElement)) return;
	let t = e.querySelector(".property-column");
	if (!t) return;
	let n = ct(t);
	if (n.length === 0) return;
	let r = t.querySelector(`.${W}`), i = r ?? document.createElement("div");
	r || (i.classList.add(W), i.append(lt()));
	for (let e of n) i.append(e);
	let a = t.querySelector("input[name=\"custom-quality\"]")?.parentElement;
	if (a) {
		a.before(i);
		return;
	}
	t.append(i);
}
function st(e, t) {
	if (!(t instanceof HTMLElement)) return;
	let n = q(e), r = n?.document ?? n?.item;
	if (!K(r)) return;
	let i = dt(t);
	if (!i) {
		ut(e, t, r);
		return;
	}
	let a = i.querySelector(".field input");
	if (!a) return;
	let o = ft(a.value);
	o.wounding.length !== 0 && (a.value = o.normal.join(","), i.parentElement?.querySelector(`.${W}__sheet-row`)?.remove(), i.after(Z(e, o.wounding, r)));
}
function ct(e) {
	let t = e.querySelectorAll("input[type=\"checkbox\"]"), n = [];
	for (let e of t) {
		if (!Ve.has(e.name)) continue;
		let t = e.closest(".form-group");
		t && n.push(t);
	}
	return n;
}
function lt() {
	let e = document.createElement("h2");
	return e.classList.add("property-header", `${W}__header`), e.textContent = "Damage Type", e;
}
function ut(e, t, n) {
	if (!He(n) || t.querySelector(".ech-wounding-properties__sheet-row")) return;
	let r = gt(t);
	if (!r) return;
	let i = Ue(n);
	r.after(Z(e, i, n));
}
function dt(e) {
	let t = e.querySelectorAll("a[data-action=\"configureProperties\"]");
	for (let e of t) if (e.textContent.trim().startsWith("Qualities")) return e.closest(".attribute-box") ?? void 0;
}
function ft(e) {
	let t = [], n = [], r = new Set(Object.values(m));
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
function Z(e, t, n) {
	let r = document.createElement("div");
	r.classList.add("attribute-box", "top-label", `${W}__sheet-row`);
	let i = Qe(n);
	i && (r.dataset.echItemUuid = i, $e(i, mt(e, n)));
	let a = document.createElement("div");
	a.classList.add("label"), a.style.gridColumn = "1 / span 12", a.innerHTML = "<label><a data-ech-action=\"configureProperties\">Damage Type <i class=\"fas fa-cog\"></i></a></label>";
	let o = document.createElement("div");
	o.classList.add("field"), o.style.gridColumn = "1 / span 12";
	let s = document.createElement("input");
	return s.type = "text", s.value = t.join(","), s.readOnly = !0, o.append(s), r.append(a, o), pt(r, n), r;
}
function pt(e, t) {
	e.querySelector("a[data-ech-action=\"configureProperties\"]")?.addEventListener("click", (e) => {
		e.preventDefault(), X(t);
	});
}
function mt(e, t) {
	return ht(e) || ((e) => {
		X(e ?? t);
	});
}
function ht(e) {
	if (typeof e != "object" || !e) return;
	let t = e.constructor?.DEFAULT_OPTIONS?.actions?.configureProperties;
	if (typeof t == "function") return (e) => {
		t.call({ document: e });
	};
}
function gt(e) {
	let t = e.querySelectorAll("fieldset");
	for (let e of t) if (e.querySelector("legend")?.textContent.trim() === "Damage") return e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/display.ts
var _t = !1;
function Q() {
	_t ||= (Ze(), Hooks.on("preRenderItemProperties", (e, t) => {
		vt(e, t);
	}), Hooks.on("renderItemProperties", (e, t) => {
		ot(t);
	}), Hooks.on("renderApplicationV2", (e, t) => {
		st(e, t);
	}), !0);
}
function vt(e, t) {
	let n = q(e), r = We(t);
	if (!(!n || !r || !K(n.document))) {
		n.qualities = G(n.qualities ?? {}), r.qualities ??= [];
		for (let e of f) {
			let t = p[e];
			r.qualities.some((e) => e.key === t) || r.qualities.push({
				existing: n.document?.originalProperties?.qualities?.[t],
				hasValue: !1,
				key: t,
				name: m[e]
			});
		}
	}
}
//#endregion
//#region src/module/wfrp4e/damage-qualities.ts
var yt = !1;
function bt() {
	let e = game.wfrp4e?.config;
	if (!e) return;
	let t = e.propertyHasValue, n = e.qualityDescriptions;
	if (!(!t || !n)) {
		for (let e of f) {
			let r = p[e];
			n[r] = "Expanded Critical Hits damage type marker. A critical hit may roll on the matching expanded critical table.", t[r] = !1;
		}
		xt(), Q();
	}
}
function xt() {
	let e = game.wfrp4e?.utility, t = e?.qualityList;
	yt || !e || !t || (e.qualityList = function(e) {
		let n = t.call(this, e);
		return e === "armor" ? n : G(n);
	}, yt = !0);
}
//#endregion
//#region src/module/wfrp4e/zero-wound-critical-links.ts
var St = "data-ech-source-item-uuid", Ct = "data-ech-critical-location", wt = !1;
function Tt() {
	wt ||= (Et(), document.addEventListener("click", At, !0), !0);
}
function Et() {
	let e = CONFIG.Actor?.documentClass?.prototype, t = e?.applyDamage;
	typeof t != "function" || !e || (e.applyDamage = async function(e, n = {}) {
		let r = await t.call(this, e, n), i = Dt(n);
		return typeof r != "string" || !i || !r.includes("critical-roll") ? r : kt(r, i, Ot(n));
	});
}
function Dt(e) {
	let t = $($(e.sourceTest)?.item), n = $($($(e.opposedTest)?.attackerTest)?.item), r = $(e.sourceItem), i = t?.uuid ?? n?.uuid ?? r?.uuid;
	return typeof i == "string" ? i : void 0;
}
function Ot(e) {
	let t = $($(e.opposedTest)?.result)?.hitloc, n = $(t)?.value, r = e.loc, i;
	return typeof n == "string" ? i = n : typeof r == "string" && (i = r), i && y(i) ? i : void 0;
}
function kt(e, t, n) {
	let r = [`${St}="${Ft(t)}"`, n ? `${Ct}="${Ft(n)}"` : void 0].filter(Boolean).join(" ");
	return e.replaceAll(/<a\b(?![^>]*\bdata-ech-source-item-uuid=)(?=[^>]*\bcritical-roll\b)/g, `<a ${r}`);
}
function At(e) {
	let t = e.target;
	if (!(t instanceof Element) || !O()) return;
	let n = t.closest(`[data-action="clickTable"][${St}]`);
	!(n instanceof HTMLElement) || !Pt(n.dataset.table) || (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), jt(n).catch((e) => {
		Mt("Expanded Critical Hits could not roll an annotated zero-wound critical. See the browser console for details.", e);
	}));
}
async function jt(e) {
	let t = e.dataset.table, n = game.wfrp4e?.tables?.formatChatRoll;
	if (!t || typeof n != "function") return;
	let r = e.closest("[data-message-id]")?.dataset.messageId, i = Number.parseInt(e.dataset.modifier ?? "0", 10) || 0, a = await n(t, {
		criticalLocation: e.dataset.echCriticalLocation ?? Nt(r),
		messageId: r,
		modifier: i,
		showRoll: !0,
		sourceItemUuid: e.dataset.echSourceItemUuid
	}, e.dataset.column);
	if (typeof a != "string" || a.length === 0) return;
	let o = game.wfrp4e?.utility?.chatDataSetup, s = typeof o == "function" ? o("", game.settings.get("core", "rollMode"), !0) : { content: "" };
	s.content = a, await ChatMessage.create(s);
}
function Mt(t, n) {
	i(`${e} | ${t}`, n), ui.notifications?.error(t);
}
function Nt(e) {
	if (!e) return;
	let t = $($($(game.messages.get(e)?.system)?.test)?.result)?.hitloc, n = $(t)?.result;
	return typeof n == "string" ? n : void 0;
}
function Pt(e) {
	return typeof e == "string" && /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function Ft(e) {
	return e.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function $(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/hooks/register-module-hooks.ts
function It() {
	Hooks.once("init", () => {
		n(`${e} | Initializing`), ge(), Q(), bt();
	}), Hooks.once("ready", () => {
		Lt();
	});
}
async function Lt() {
	if (game.system.id !== "wfrp4e") {
		r(`${e} | Loaded outside ${t}; skipping WFRP integration.`);
		return;
	}
	ke(), await ve(), bt(), await c(), we(), Ne(), Tt(), n(`${e} | Ready`);
}
//#endregion
//#region src/main.ts
It();
//#endregion

//# sourceMappingURL=wfrp4e-expanded-critical-hits.mjs.map