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
	let i = await u();
	i.size === 0 && r(`${e} | No expanded critical RollTables were found in the module pack.`), t.findTable = (e) => n(e) || i.get(e.toLowerCase()), s = !0;
}
async function ee() {
	return {
		criticalItems: await d(a, "Items"),
		criticalTables: await d(o, "Tables")
	};
}
function l(t) {
	return `${e}.${t}`;
}
async function u() {
	let e = /* @__PURE__ */ new Map(), t = game.packs.get(l(o));
	if (!t) return e;
	let n = await t.getDocuments();
	for (let t of n) {
		let n = t.getFlag("wfrp4e", "key");
		typeof n == "string" && e.set(n.toLowerCase(), t);
	}
	return e;
}
async function d(e, t) {
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
//#region src/module/api/create-module-api.ts
function te() {
	return { getExpandedCriticalsCompendiumStatus: ee };
}
//#endregion
//#region src/module/api/register-module-api.ts
function ne() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let t = game.modules.get(e);
	if (!t) throw Error(`Foundry module registry entry was not found for ${e}.`);
	t.api = te();
}
//#endregion
//#region src/module/settings.ts
var f = "enableCriticalReplacement";
function p() {
	game.settings.register(e, f, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	});
}
function m() {
	return !!game.settings.get(e, f);
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
], re = {
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
}, y = {
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
}, b = new Map(g.map((e) => [_[e], y[e]])), x = new Map(h.map((e) => [re[e], e]));
function S(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = b.get(n) ?? x.get(n);
		e && t.add(e);
	}
	return h.filter((e) => t.has(e));
}
function C(e, t = Math.random()) {
	if (e.length !== 0) return e[Math.min(Math.floor(t * e.length), e.length - 1)];
}
//#endregion
//#region src/functions/critical-hits/table-keys.ts
function w(e, t, n) {
	return `ech-crit-${e}-${t}-${n}`.toLowerCase();
}
function T(e) {
	let t = e.toLowerCase();
	if (t === "head" || t === "body") return t;
	if (t.endsWith("arm")) return "arm";
	if (t.endsWith("leg")) return "leg";
}
function ie(e) {
	return e ? "upInArms" : "core";
}
//#endregion
//#region src/module/wfrp4e/runtime-values.ts
function E(e) {
	return Array.isArray(e) ? e : [];
}
function D(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/quality-extraction.ts
function ae(e) {
	return S(oe(e));
}
function oe(e) {
	let t = D(e), n = D(t?.system), r = D(t?.properties), i = D(n?.properties), a = [D(r?.qualities), D(i?.qualities)], o = /* @__PURE__ */ new Set();
	for (let e of a) for (let t of Object.keys(e ?? {})) o.add(t);
	let s = E(D(n?.qualities)?.value);
	for (let e of s) {
		let t = D(e)?.name;
		typeof t == "string" && o.add(t);
	}
	return [...o];
}
//#endregion
//#region src/module/wfrp4e/critical-replacement.ts
var O = !1;
function se() {
	if (O) return;
	let e = game.wfrp4e?.tables;
	if (!e || typeof e.findTable != "function" || typeof e.formatChatRoll != "function") return;
	let t = e.findTable.bind(e), n = e.formatChatRoll.bind(e);
	e.formatChatRoll = async (e, r = {}, i = null) => {
		if (!m() || !M(e)) return n(e, r, i);
		let a = A(e, r), o;
		try {
			o = await j(r);
		} catch (t) {
			return N("Expanded Critical Hits could not resolve the critical source item. See the browser console for details.", e, t);
		}
		let s = C(ae(o));
		if (!a || !s) return n(e, r, i);
		let c = w(ie(!!game.settings.get("wfrp4e", "uiaCrits")), s, a);
		if (!t(c)) return N(`Expanded Critical Hits table ${c} is missing from the module compendium.`, c);
		try {
			let e = await ce(c, r, i);
			if (e !== void 0) return e;
		} catch (e) {
			return N(`Expanded Critical Hits could not roll ${c}. See the browser console for details.`, c, e);
		}
		return N(`Expanded Critical Hits could not use WFRP's RollTable API for ${c}.`, c);
	}, O = !0;
}
async function ce(e, t, n) {
	let r = game.wfrp4e?.tables?.rollTable;
	if (typeof r != "function") return;
	let i = await r.call(game.wfrp4e.tables, e, t, n);
	if (await le(i, t)) return null;
	let a = F(i);
	return t.returnResult ? i : a?.result;
}
async function le(e, t) {
	let n = F(F(e)?.object)?.documentUuid;
	if (typeof n != "string") return !1;
	let r = k(await fromUuid(n), t);
	if (!r) throw Error(`Could not resolve expanded critical item ${n}.`);
	return await r.postItem(void 0, { "flags.wfrp4e.sourceMessageId": t.messageId }), !0;
}
function k(e, t) {
	if (!L(e)) return;
	let n = t.criticalLocation;
	if (e.type !== "critical" || typeof n != "string") return e;
	let r = e.toObject, i = Item?.implementation;
	if (typeof r != "function" || typeof i != "function") return e;
	let a = r.call(e), o = I(I(a, "system"), "location"), s = game.wfrp4e?.config?.locations ?? {};
	return o.key = n, o.value = s[n] ?? n, new i(a);
}
function A(e, t) {
	let n = t.criticalLocation;
	return T(typeof n == "string" ? n : e.replace(/^crit/i, ""));
}
async function j(e) {
	let t = e.sourceItemUuid;
	if (typeof t == "string") return await fromUuid(t);
	let n = e.messageId;
	if (typeof n != "string") return;
	let r = F(F(game.messages.get(n)?.system)?.test), i = F(r?.preData);
	return r?.item ?? r?.weapon ?? i?.item;
}
function M(e) {
	return /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function N(t, n, r) {
	return i(`${e} | ${t}`, r), ui.notifications?.error(t), [
		"<div class=\"wfrp4e chat-card\">",
		"<h3>Expanded Critical Hit Failed</h3>",
		`<p>${P(t)}</p>`,
		`<p><strong>Table:</strong> ${P(n)}</p>`,
		"</div>"
	].join("");
}
function P(e) {
	return e.replace(/[&<>"']/g, (e) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#39;"
	})[e] ?? e);
}
function F(e) {
	return typeof e == "object" && e ? e : void 0;
}
function I(e, t) {
	let n = F(e[t]);
	if (n) return n;
	let r = {};
	return e[t] = r, r;
}
function L(e) {
	let t = e;
	return typeof t == "object" && !!t && typeof t.postItem == "function";
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/support.ts
var R = "ech-wounding-properties", z = new Set(Object.values(_));
function B(e) {
	let t = { ...e };
	for (let e of g) t[_[e]] = v[e];
	return t;
}
function V(e) {
	return de(e) || fe(e);
}
function H(e) {
	return e?.type === "spell" || e?.type === "prayer";
}
function U(e) {
	let t = E(D(D(e?.system)?.qualities)?.value), n = [];
	for (let e of t) {
		let t = D(e)?.name;
		if (typeof t != "string") continue;
		let r = me(t);
		r && n.push(v[r]);
	}
	return n;
}
function W(e) {
	if (!(typeof e != "object" || !e)) return e;
}
function ue(e) {
	if (typeof e != "object" || !e) return;
	let t = e;
	if (!(t.qualities !== void 0 && !Array.isArray(t.qualities))) return t;
}
function de(e) {
	return e?.type === "weapon" || e?.type === "ammunition" || e?.system?.isWeapon === !0;
}
function fe(e) {
	return (e?.type === "spell" || e?.type === "prayer") && pe(e.system);
}
function pe(e) {
	let t = D(e?.damage), n = D(e?.magicMissile);
	return G(t?.value) || G(t?.dice) || t?.addSL === !0 || n?.value === !0;
}
function G(e) {
	return typeof e == "number" ? e !== 0 : typeof e == "string" && e.trim().length > 0;
}
function me(e) {
	return g.find((t) => _[t] === e);
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/actions.ts
var he = `.${R}__sheet-row a[data-ech-action="configureProperties"]`, K = /* @__PURE__ */ new Map(), ge = !1;
function _e() {
	ge ||= (document.addEventListener("click", be, !0), !0);
}
function ve(e) {
	return e?.uuid;
}
function ye(e, t) {
	K.set(e, t);
}
function q(e) {
	let t = Ce();
	!e || !t || new t(e).render(!0);
}
function be(e) {
	let t = xe(e.target);
	t && (e.preventDefault(), e.stopPropagation(), Se(t));
}
function xe(e) {
	if (e instanceof Element) return e.closest(he) ?? void 0;
}
async function Se(e) {
	let t = e.closest(`.${R}__sheet-row`)?.dataset.echItemUuid;
	if (!t) return;
	let n = await fromUuid(t);
	if (!Te(n)) return;
	let r = K.get(t);
	if (r) {
		r(n);
		return;
	}
	q(n);
}
function Ce() {
	let e = game.wfrp4e?.apps?.ItemProperties;
	if (we(e)) return e;
}
function we(e) {
	return typeof e == "function";
}
function Te(e) {
	return typeof e == "object" && !!e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/sheet.ts
function Ee(e) {
	if (!(e instanceof HTMLElement)) return;
	let t = e.querySelector(".property-column");
	if (!t) return;
	let n = Oe(t);
	if (n.length === 0) return;
	let r = t.querySelector(`.${R}`), i = r ?? document.createElement("div");
	r || (i.classList.add(R), i.append(ke()));
	for (let e of n) i.append(e);
	let a = t.querySelector("input[name=\"custom-quality\"]")?.parentElement;
	if (a) {
		a.before(i);
		return;
	}
	t.append(i);
}
function De(e, t) {
	if (!(t instanceof HTMLElement)) return;
	let n = W(e), r = n?.document ?? n?.item;
	if (!V(r)) return;
	let i = je(t);
	if (!i) {
		Ae(e, t, r);
		return;
	}
	let a = i.querySelector(".field input");
	if (!a) return;
	let o = Me(a.value);
	o.wounding.length !== 0 && (a.value = o.normal.join(","), i.parentElement?.querySelector(`.${R}__sheet-row`)?.remove(), i.after(J(e, o.wounding, r)));
}
function Oe(e) {
	let t = e.querySelectorAll("input[type=\"checkbox\"]"), n = [];
	for (let e of t) {
		if (!z.has(e.name)) continue;
		let t = e.closest(".form-group");
		t && n.push(t);
	}
	return n;
}
function ke() {
	let e = document.createElement("h2");
	return e.classList.add("property-header", `${R}__header`), e.textContent = "Damage Type", e;
}
function Ae(e, t, n) {
	if (!H(n) || t.querySelector(".ech-wounding-properties__sheet-row")) return;
	let r = Ie(t);
	if (!r) return;
	let i = U(n);
	r.after(J(e, i, n));
}
function je(e) {
	let t = e.querySelectorAll("a[data-action=\"configureProperties\"]");
	for (let e of t) if (e.textContent.trim().startsWith("Qualities")) return e.closest(".attribute-box") ?? void 0;
}
function Me(e) {
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
function J(e, t, n) {
	let r = document.createElement("div");
	r.classList.add("attribute-box", "top-label", `${R}__sheet-row`);
	let i = ve(n);
	i && (r.dataset.echItemUuid = i, ye(i, Pe(e, n)));
	let a = document.createElement("div");
	a.classList.add("label"), a.style.gridColumn = "1 / span 12", a.innerHTML = "<label><a data-ech-action=\"configureProperties\">Damage Type <i class=\"fas fa-cog\"></i></a></label>";
	let o = document.createElement("div");
	o.classList.add("field"), o.style.gridColumn = "1 / span 12";
	let s = document.createElement("input");
	return s.type = "text", s.value = t.join(","), s.readOnly = !0, o.append(s), r.append(a, o), Ne(r, n), r;
}
function Ne(e, t) {
	e.querySelector("a[data-ech-action=\"configureProperties\"]")?.addEventListener("click", (e) => {
		e.preventDefault(), q(t);
	});
}
function Pe(e, t) {
	return Fe(e) || ((e) => {
		q(e ?? t);
	});
}
function Fe(e) {
	if (typeof e != "object" || !e) return;
	let t = e.constructor?.DEFAULT_OPTIONS?.actions?.configureProperties;
	if (typeof t == "function") return (e) => {
		t.call({ document: e });
	};
}
function Ie(e) {
	let t = e.querySelectorAll("fieldset");
	for (let e of t) if (e.querySelector("legend")?.textContent.trim() === "Damage") return e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/display.ts
var Le = !1;
function Re() {
	Le ||= (_e(), Hooks.on("preRenderItemProperties", (e, t) => {
		ze(e, t);
	}), Hooks.on("renderItemProperties", (e, t) => {
		Ee(t);
	}), Hooks.on("renderApplicationV2", (e, t) => {
		De(e, t);
	}), !0);
}
function ze(e, t) {
	let n = W(e), r = ue(t);
	if (!(!n || !r || !V(n.document))) {
		n.qualities = B(n.qualities ?? {}), r.qualities ??= [];
		for (let e of g) {
			let t = _[e];
			r.qualities.some((e) => e.key === t) || r.qualities.push({
				existing: n.document?.originalProperties?.qualities?.[t],
				hasValue: !1,
				key: t,
				name: v[e]
			});
		}
	}
}
//#endregion
//#region src/module/wfrp4e/damage-qualities.ts
var Y = !1;
function Be() {
	let e = game.wfrp4e?.config;
	if (!e) return;
	let t = e.propertyHasValue, n = e.qualityDescriptions;
	if (!(!t || !n)) {
		for (let e of g) {
			let r = _[e];
			n[r] = "Expanded Critical Hits damage type marker. A critical hit may roll on the matching expanded critical table.", t[r] = !1;
		}
		Ve(), Re();
	}
}
function Ve() {
	let e = game.wfrp4e?.utility, t = e?.qualityList;
	Y || !e || !t || (e.qualityList = function(e) {
		let n = t.call(this, e);
		return e === "armor" ? n : B(n);
	}, Y = !0);
}
//#endregion
//#region src/module/wfrp4e/zero-wound-critical-links.ts
var X = "data-ech-source-item-uuid", He = "data-ech-critical-location", Ue = !1;
function Z() {
	Ue ||= (We(), document.addEventListener("click", Je, !0), !0);
}
function We() {
	let e = CONFIG.Actor?.documentClass?.prototype, t = e?.applyDamage;
	typeof t != "function" || !e || (e.applyDamage = async function(e, n = {}) {
		let r = await t.call(this, e, n), i = Ge(n);
		return typeof r != "string" || !i || !r.includes("critical-roll") ? r : qe(r, i, Ke(n));
	});
}
function Ge(e) {
	let t = $($(e.sourceTest)?.item), n = $($($(e.opposedTest)?.attackerTest)?.item), r = $(e.sourceItem), i = t?.uuid ?? n?.uuid ?? r?.uuid;
	return typeof i == "string" ? i : void 0;
}
function Ke(e) {
	let t = $($(e.opposedTest)?.result)?.hitloc, n = $(t)?.value, r = e.loc, i;
	return typeof n == "string" ? i = n : typeof r == "string" && (i = r), i && T(i) ? i : void 0;
}
function qe(e, t, n) {
	let r = [`${X}="${Q(t)}"`, n ? `${He}="${Q(n)}"` : void 0].filter(Boolean).join(" ");
	return e.replaceAll(/<a\b(?![^>]*\bdata-ech-source-item-uuid=)(?=[^>]*\bcritical-roll\b)/g, `<a ${r}`);
}
function Je(e) {
	let t = e.target;
	if (!(t instanceof Element) || !m()) return;
	let n = t.closest(`[data-action="clickTable"][${X}]`);
	!(n instanceof HTMLElement) || !Qe(n.dataset.table) || (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), Ye(n).catch((e) => {
		Xe("Expanded Critical Hits could not roll an annotated zero-wound critical. See the browser console for details.", e);
	}));
}
async function Ye(e) {
	let t = e.dataset.table, n = game.wfrp4e?.tables?.formatChatRoll;
	if (!t || typeof n != "function") return;
	let r = e.closest("[data-message-id]")?.dataset.messageId, i = Number.parseInt(e.dataset.modifier ?? "0", 10) || 0, a = await n(t, {
		criticalLocation: e.dataset.echCriticalLocation ?? Ze(r),
		messageId: r,
		modifier: i,
		showRoll: !0,
		sourceItemUuid: e.dataset.echSourceItemUuid
	}, e.dataset.column);
	if (typeof a != "string" || a.length === 0) return;
	let o = game.wfrp4e?.utility?.chatDataSetup, s = typeof o == "function" ? o("", game.settings.get("core", "rollMode"), !0) : { content: "" };
	s.content = a, await ChatMessage.create(s);
}
function Xe(t, n) {
	i(`${e} | ${t}`, n), ui.notifications?.error(t);
}
function Ze(e) {
	if (!e) return;
	let t = $($($(game.messages.get(e)?.system)?.test)?.result)?.hitloc, n = $(t)?.result;
	return typeof n == "string" ? n : void 0;
}
function Qe(e) {
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
function $e() {
	Hooks.once("init", () => {
		n(`${e} | Initializing`), p(), Be();
	}), Hooks.once("ready", () => {
		et();
	});
}
async function et() {
	if (game.system.id !== "wfrp4e") {
		r(`${e} | Loaded outside ${t}; skipping WFRP integration.`);
		return;
	}
	ne(), await c(), se(), Z(), n(`${e} | Ready`);
}
//#endregion
//#region src/main.ts
$e();
//#endregion

//# sourceMappingURL=wfrp4e-expanded-critical-hits.mjs.map