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
	r.size === 0 && a(`${e} | No expanded critical RollTables were found in the module pack.`), t.findTable = (e, t) => n(e, t) || r.get(e.toLowerCase()), u = !0;
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
], v = {
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
}, y = {
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
}, b = {
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
}, x = {
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
}, ee = {
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
}, te = new Map(_.map((e) => [y[e], ee[e]])), ne = new Map(g.map((e) => [v[e], e]));
function re(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = te.get(n) ?? ne.get(n);
		e && t.add(e);
	}
	return g.filter((e) => t.has(e));
}
function ie(e, t = Math.random()) {
	if (e.length !== 0) return e[Math.min(Math.floor(t * e.length), e.length - 1)];
}
var ae = [
	"roll",
	"head",
	"lArm",
	"rArm",
	"body",
	"lLeg",
	"rLeg"
];
//#endregion
//#region src/functions/damage-console/request.ts
function oe(e) {
	return {
		...e,
		damageFormula: e.damageFormula.trim(),
		targetUuids: [...new Set(e.targetUuids.map((e) => e.trim()).filter(Boolean))]
	};
}
function se(e) {
	let t = [];
	return e.damageFormula.trim() || t.push("damageFormulaRequired"), ae.includes(e.hitLocation) || t.push("hitLocationInvalid"), e.targetUuids.every((e) => !e.trim()) && t.push("targetsRequired"), e.woundingType !== null && !_.includes(e.woundingType) && t.push("woundingTypeInvalid"), t;
}
//#endregion
//#region src/functions/damage-console/card.ts
function ce(e, t) {
	let n = oe(e), r = new Map(t.map((e) => [e.uuid, e]));
	return {
		damageFormula: n.damageFormula,
		hitLocation: n.hitLocation,
		ignoreArmour: n.ignoreArmour,
		ignoreToughness: n.ignoreToughness,
		minimumOne: n.minimumOne,
		targets: n.targetUuids.map((e) => {
			let t = r.get(e);
			if (!t) throw Error(`Damage console target ${e} could not be resolved.`);
			return {
				...t,
				result: null
			};
		}),
		version: 1,
		woundingType: n.woundingType
	};
}
function S(e, t, n) {
	let r = !1, i = e.targets.map((e) => {
		if (e.uuid !== t) return e;
		if (r = !0, e.result) throw Error(`Damage has already been applied to ${e.name}.`);
		return {
			...e,
			result: n
		};
	});
	if (!r) throw Error(`Damage console target ${t} is not part of this card.`);
	return {
		...e,
		targets: i
	};
}
function le(e) {
	if (e.woundingType) return {
		category: ee[e.woundingType],
		woundingType: e.woundingType
	};
}
function ue(e) {
	let t = he(e);
	if (t?.version !== 1 || typeof t.damageFormula != "string" || !pe(t.hitLocation) || typeof t.ignoreArmour != "boolean" || typeof t.ignoreToughness != "boolean" || typeof t.minimumOne != "boolean" || !me(t.woundingType) || !Array.isArray(t.targets)) return;
	let n = t.targets.map(de);
	if (!n.some((e) => !e)) return {
		damageFormula: t.damageFormula,
		hitLocation: t.hitLocation,
		ignoreArmour: t.ignoreArmour,
		ignoreToughness: t.ignoreToughness,
		minimumOne: t.minimumOne,
		targets: n,
		version: 1,
		woundingType: t.woundingType
	};
}
function de(e) {
	let t = he(e);
	if (typeof t?.uuid != "string" || typeof t.name != "string" || typeof t.img != "string") return;
	let n = t.result === null ? null : fe(t.result);
	if (n !== void 0) return {
		img: t.img,
		name: t.name,
		result: n,
		uuid: t.uuid
	};
}
function fe(e) {
	let t = he(e);
	if (!(typeof t?.appliedAt != "number" || typeof t.appliedBy != "string" || typeof t.damage != "number" || typeof t.hitLocation != "string" || typeof t.html != "string")) return {
		appliedAt: t.appliedAt,
		appliedBy: t.appliedBy,
		damage: t.damage,
		hitLocation: t.hitLocation,
		html: t.html
	};
}
function pe(e) {
	return typeof e == "string" && ae.includes(e);
}
function me(e) {
	return e === null || typeof e == "string" && _.includes(e);
}
function he(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/card-storage.ts
var ge = "damageConsole";
function _e(t) {
	return ue(t.getFlag(e, ge));
}
function ve(e) {
	if (typeof e != "string") return;
	let t = game.messages.get(e), n = t ? _e(t) : void 0;
	return n ? le(n) : void 0;
}
function ye(t, n) {
	let r = xe(t.flags) ?? {}, i = xe(r["wfrp4e-expanded-critical-hits"]) ?? {};
	t.flags = {
		...r,
		[e]: {
			...i,
			[ge]: n
		}
	};
}
function be(t) {
	return { [`flags.${e}.${ge}`]: t };
}
function xe(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/card-renderer.ts
function Se(e) {
	let t = e.woundingType ? x[e.woundingType] : C("damageConsole.unspecified"), n = [e.ignoreArmour ? C("damageConsole.ignoreArmour") : void 0, e.ignoreToughness ? C("damageConsole.ignoreToughness") : void 0].filter((e) => !!e), r = n.length ? n.join(", ") : C("damageConsole.none");
	return `<div class="wfrp4e chat-card ech-damage-console-card">
    <h3><i class="fa-solid fa-bolt"></i> ${De(C("damageConsole.cardTitle"))}</h3>
    <dl class="ech-damage-console-card__summary">
      ${we(C("damageConsole.damage"), e.damageFormula)}
      ${we(C("damageConsole.hitLocation"), Te(e.hitLocation))}
      ${we(C("damageConsole.woundingType"), t)}
      ${we(C("damageConsole.ignores"), r)}
      ${we(C("damageConsole.minimumOne"), Ee(e.minimumOne))}
    </dl>
    <div class="ech-damage-console-card__targets">
      ${e.targets.map(Ce).join("")}
    </div>
  </div>`;
}
function Ce(e) {
	let t = `<div class="ech-damage-console-card__identity">
    <img src="${Oe(e.img)}" alt="" />
    <strong>${De(e.name)}</strong>
  </div>`;
	return e.result ? `<section class="ech-damage-console-card__target ech-damage-console-card__target--applied">
    ${t}
    <p class="ech-damage-console-card__roll">
      ${De(C("damageConsole.rolled"))}: <strong>${e.result.damage}</strong>
      &middot; ${De(Te(e.result.hitLocation))}
    </p>
    <div class="ech-damage-console-card__result">${e.result.html}</div>
  </section>` : `<section class="ech-damage-console-card__target">
      ${t}
      <button type="button" class="chat-button chat-button-gm ech-damage-console-card__apply"
        data-ech-action="applyDamage" data-target-uuid="${Oe(e.uuid)}">
        <i class="fa-solid fa-bolt"></i> ${De(C("damageConsole.applyDamage"))}
      </button>
    </section>`;
}
function we(e, t) {
	return `<div><dt>${De(e)}</dt><dd>${De(t)}</dd></div>`;
}
function Te(e) {
	if (e === "roll") return game.i18n.localize("Roll");
	let t = game.wfrp4e?.config?.locations?.[e];
	return t ? game.i18n.localize(t) : e;
}
function Ee(e) {
	return C(e ? "damageConsole.yes" : "damageConsole.no");
}
function C(e) {
	return game.i18n.localize(`WFRP4E_EXPANDED_CRITICAL_HITS.${e}`);
}
function De(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#039;");
}
function Oe(e) {
	return De(e);
}
//#endregion
//#region src/module/wfrp4e/damage-console/targets.ts
function ke() {
	let e = [...game.user.targets].map(je).filter((e) => !!e);
	return [...new Map(e.map((e) => [e.uuid, e])).values()];
}
async function Ae(e) {
	let t = await fromUuid(e), n = t?.actor ?? t;
	if (!Me(n)) throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.targetUnavailable", { uuid: e }));
	return {
		actor: n,
		snapshot: {
			img: Ne(t?.texture?.src) ?? "icons/svg/mystery-man.svg",
			name: Ne(t?.name) ?? e,
			uuid: e
		}
	};
}
function je(e) {
	let t = e, n = t?.document, r = Ne(n?.uuid);
	if (!(!r || !Me(n?.actor ?? t?.actor))) return {
		img: Ne(n?.texture?.src) ?? Ne(t?.texture?.src) ?? "icons/svg/mystery-man.svg",
		name: Ne(t?.name) ?? Ne(n?.name) ?? r,
		uuid: r
	};
}
function Me(e) {
	return typeof e == "object" && !!e && typeof e.applyBasicDamage == "function";
}
function Ne(e) {
	return typeof e == "string" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/runtime.ts
async function Pe(e, t) {
	let { actor: n } = await Ae(t), r = await Fe(e.damageFormula), i = await Ie(e, n), a = Le(e.ignoreArmour, e.ignoreToughness), o = await n.applyBasicDamage(r, {
		damageType: a,
		loc: i,
		minimumOne: e.minimumOne,
		suppressMsg: !0
	});
	if (typeof o != "string" || !o) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.damageNotApplied"));
	return {
		appliedAt: Date.now(),
		appliedBy: game.user.name,
		damage: r,
		hitLocation: i,
		html: o
	};
}
async function Fe(e) {
	try {
		let t = await new Roll(e).evaluate(), n = Number(t.total);
		if (!Number.isInteger(n) || n < 0) throw Error("Damage must resolve to a non-negative whole number.");
		return n;
	} catch (t) {
		throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.invalidFormula", { formula: e }), { cause: t });
	}
}
async function Ie(e, t) {
	if (e.hitLocation !== "roll") return e.hitLocation;
	let n = ze(t.details?.hitLocationTable?.value) ?? ze(t.system?.details?.hitLocationTable?.value) ?? "hitloc", r = ze(Re(await game.wfrp4e?.tables?.rollTable?.(n, { hideDSN: !0 }))?.result);
	if (!r) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.hitLocationFailed"));
	return r;
}
function Le(e, t) {
	let n = game.wfrp4e?.config?.DAMAGE_TYPE;
	if (!n) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.damageApiUnavailable"));
	return e && t ? n.IGNORE_ALL : e ? n.IGNORE_AP : t ? n.IGNORE_TB : n.NORMAL;
}
function Re(e) {
	return typeof e == "object" && e ? e : void 0;
}
function ze(e) {
	return typeof e == "string" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/chat-actions.ts
var Be = /* @__PURE__ */ new Map();
function Ve() {
	Hooks.on("renderChatMessageHTML", (e, t) => {
		if (!We(e) || !(t instanceof HTMLElement) || !_e(e)) return;
		let n = t.querySelectorAll("[data-ech-action=\"applyDamage\"]");
		if (!game.user.isGM) {
			n.forEach((e) => e.remove());
			return;
		}
		n.forEach((t) => {
			t.addEventListener("click", (n) => {
				n.preventDefault(), t.disabled = !0;
				let r = t.dataset.targetUuid;
				r && He(e, r).catch((e) => {
					t.disabled = !1, ui.notifications?.error(Ge(e));
				});
			});
		});
	});
}
async function He(e, t) {
	let n = (Be.get(e.id) ?? Promise.resolve()).catch(() => void 0).then(async () => {
		await Ue(e, t);
	});
	Be.set(e.id, n);
	try {
		await n;
	} finally {
		Be.get(e.id) === n && Be.delete(e.id);
	}
}
async function Ue(e, t) {
	let n = _e(e);
	if (!n) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.cardUnavailable"));
	let r = n.targets.find((e) => e.uuid === t);
	if (!r) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.cardTargetUnavailable"));
	if (r.result) throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.alreadyApplied", { name: r.name }));
	let i = S(n, t, await Pe(n, t));
	await e.update({
		...be(i),
		content: Se(i)
	});
}
function We(e) {
	return typeof e == "object" && !!e && typeof e.getFlag == "function" && typeof e.update == "function";
}
function Ge(e) {
	return e instanceof Error ? e.message : String(e);
}
//#endregion
//#region node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function Ke(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var w = {}, qe = [], Je = () => {}, Ye = () => !1, Xe = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Ze = (e) => e.startsWith("onUpdate:"), T = Object.assign, Qe = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, $e = Object.prototype.hasOwnProperty, E = (e, t) => $e.call(e, t), D = Array.isArray, et = (e) => at(e) === "[object Map]", tt = (e) => at(e) === "[object Set]", nt = (e) => at(e) === "[object Date]", O = (e) => typeof e == "function", k = (e) => typeof e == "string", A = (e) => typeof e == "symbol", j = (e) => typeof e == "object" && !!e, rt = (e) => (j(e) || O(e)) && O(e.then) && O(e.catch), it = Object.prototype.toString, at = (e) => it.call(e), ot = (e) => at(e).slice(8, -1), st = (e) => at(e) === "[object Object]", ct = (e) => k(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, lt = /* @__PURE__ */ Ke(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), ut = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, dt = /-\w/g, M = ut((e) => e.replace(dt, (e) => e.slice(1).toUpperCase())), ft = /\B([A-Z])/g, pt = ut((e) => e.replace(ft, "-$1").toLowerCase()), mt = ut((e) => e.charAt(0).toUpperCase() + e.slice(1)), ht = ut((e) => e ? `on${mt(e)}` : ""), gt = (e, t) => !Object.is(e, t), _t = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, vt = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, yt = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, bt, xt = () => bt ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function St(e) {
	if (D(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = k(r) ? Et(r) : St(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	} else if (k(e) || j(e)) return e;
}
var Ct = /;(?![^(]*\))/g, wt = /:([^]+)/, Tt = /\/\*[^]*?\*\//g;
function Et(e) {
	let t = {};
	return e.replace(Tt, "").split(Ct).forEach((e) => {
		if (e) {
			let n = e.split(wt);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function Dt(e) {
	let t = "";
	if (k(e)) t = e;
	else if (D(e)) for (let n = 0; n < e.length; n++) {
		let r = Dt(e[n]);
		r && (t += r + " ");
	}
	else if (j(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var Ot = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", kt = /* @__PURE__ */ Ke(Ot);
Ot + "";
function At(e) {
	return !!e || e === "";
}
function jt(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = Mt(e[r], t[r]);
	return n;
}
function Mt(e, t) {
	if (e === t) return !0;
	let n = nt(e), r = nt(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = A(e), r = A(t), n || r) return e === t;
	if (n = D(e), r = D(t), n || r) return n && r ? jt(e, t) : !1;
	if (n = j(e), r = j(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !Mt(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
function Nt(e, t) {
	return e.findIndex((e) => Mt(e, t));
}
var Pt = (e) => !!(e && e.__v_isRef === !0), N = (e) => k(e) ? e : e == null ? "" : D(e) || j(e) && (e.toString === it || !O(e.toString)) ? Pt(e) ? N(e.value) : JSON.stringify(e, Ft, 2) : String(e), Ft = (e, t) => Pt(t) ? Ft(e, t.value) : et(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[It(t, r) + " =>"] = n, e), {}) } : tt(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => It(e)) } : A(t) ? It(t) : j(t) && !D(t) && !st(t) ? String(t) : t, It = (e, t = "") => A(e) ? `Symbol(${e.description ?? t})` : e, P, Lt = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && P && (P.active ? (this.parent = P, this.index = (P.scopes ||= []).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = !0;
			let e, t;
			if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].pause();
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
		}
	}
	resume() {
		if (this._active && this._isPaused) {
			this._isPaused = !1;
			let e, t;
			if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].resume();
			for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].resume();
		}
	}
	run(e) {
		if (this._active) {
			let t = P;
			try {
				return P = this, e();
			} finally {
				P = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = P, P = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (P === this) P = this.prevScope;
			else {
				let e = P;
				for (; e;) {
					if (e.prevScope === this) {
						e.prevScope = this.prevScope;
						break;
					}
					e = e.prevScope;
				}
			}
			this.prevScope = void 0;
		}
	}
	stop(e) {
		if (this._active) {
			this._active = !1;
			let t, n;
			for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
			for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
			if (this.cleanups.length = 0, this.scopes) {
				for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !e) {
				let e = this.parent.scopes.pop();
				e && e !== this && (this.parent.scopes[this.index] = e, e.index = this.index);
			}
			this.parent = void 0;
		}
	}
};
function Rt(e) {
	return new Lt(e);
}
function zt() {
	return P;
}
function Bt(e, t = !1) {
	P && P.cleanups.push(e);
}
var F, Vt = /* @__PURE__ */ new WeakSet(), Ht = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, P && (P.active ? P.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, Vt.has(this) && (Vt.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Kt(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, an(this), Yt(this);
		let e = F, t = I;
		F = this, I = !0;
		try {
			return this.fn();
		} finally {
			Xt(this), F = e, I = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) $t(e);
			this.deps = this.depsTail = void 0, an(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? Vt.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		Zt(this) && this.run();
	}
	get dirty() {
		return Zt(this);
	}
}, Ut = 0, Wt, Gt;
function Kt(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = Gt, Gt = e;
		return;
	}
	e.next = Wt, Wt = e;
}
function qt() {
	Ut++;
}
function Jt() {
	if (--Ut > 0) return;
	if (Gt) {
		let e = Gt;
		for (Gt = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; Wt;) {
		let t = Wt;
		for (Wt = void 0; t;) {
			let n = t.next;
			if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
				t.trigger();
			} catch (t) {
				e ||= t;
			}
			t = n;
		}
	}
	if (e) throw e;
}
function Yt(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Xt(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), $t(r), en(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function Zt(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Qt(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function Qt(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === on) || (e.globalVersion = on, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Zt(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = F, r = I;
	F = e, I = !0;
	try {
		Yt(e);
		let n = e.fn(e._value);
		(t.version === 0 || gt(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		F = n, I = r, Xt(e), e.flags &= -3;
	}
}
function $t(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) $t(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function en(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var I = !0, tn = [];
function nn() {
	tn.push(I), I = !1;
}
function rn() {
	let e = tn.pop();
	I = e === void 0 ? !0 : e;
}
function an(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = F;
		F = void 0;
		try {
			t();
		} finally {
			F = e;
		}
	}
}
var on = 0, sn = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, cn = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!F || !I || F === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== F) t = this.activeLink = new sn(F, this), F.deps ? (t.prevDep = F.depsTail, F.depsTail.nextDep = t, F.depsTail = t) : F.deps = F.depsTail = t, ln(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = F.depsTail, t.nextDep = void 0, F.depsTail.nextDep = t, F.depsTail = t, F.deps === t && (F.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, on++, this.notify(e);
	}
	notify(e) {
		qt();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			Jt();
		}
	}
};
function ln(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) ln(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var un = /* @__PURE__ */ new WeakMap(), dn = /* @__PURE__ */ Symbol(""), fn = /* @__PURE__ */ Symbol(""), pn = /* @__PURE__ */ Symbol("");
function L(e, t, n) {
	if (I && F) {
		let t = un.get(e);
		t || un.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new cn()), r.map = t, r.key = n), r.track();
	}
}
function mn(e, t, n, r, i, a) {
	let o = un.get(e);
	if (!o) {
		on++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (qt(), t === "clear") o.forEach(s);
	else {
		let i = D(e), a = i && ct(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === pn || !A(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(pn)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(dn)), et(e) && s(o.get(fn)));
				break;
			case "delete":
				i || (s(o.get(dn)), et(e) && s(o.get(fn)));
				break;
			case "set":
				et(e) && s(o.get(dn));
				break;
		}
	}
	Jt();
}
function hn(e, t) {
	let n = un.get(e);
	return n && n.get(t);
}
function gn(e) {
	let t = /* @__PURE__ */ z(e);
	return t === e ? t : (L(t, "iterate", pn), /* @__PURE__ */ R(e) ? t : t.map(rr));
}
function _n(e) {
	return L(e = /* @__PURE__ */ z(e), "iterate", pn), e;
}
function vn(e, t) {
	return /* @__PURE__ */ er(e) ? ir(/* @__PURE__ */ $n(e) ? rr(t) : t) : rr(t);
}
var yn = {
	__proto__: null,
	[Symbol.iterator]() {
		return bn(this, Symbol.iterator, (e) => vn(this, e));
	},
	concat(...e) {
		return gn(this).concat(...e.map((e) => D(e) ? gn(e) : e));
	},
	entries() {
		return bn(this, "entries", (e) => (e[1] = vn(this, e[1]), e));
	},
	every(e, t) {
		return Sn(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return Sn(this, "filter", e, t, (e) => e.map((e) => vn(this, e)), arguments);
	},
	find(e, t) {
		return Sn(this, "find", e, t, (e) => vn(this, e), arguments);
	},
	findIndex(e, t) {
		return Sn(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return Sn(this, "findLast", e, t, (e) => vn(this, e), arguments);
	},
	findLastIndex(e, t) {
		return Sn(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return Sn(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return wn(this, "includes", e);
	},
	indexOf(...e) {
		return wn(this, "indexOf", e);
	},
	join(e) {
		return gn(this).join(e);
	},
	lastIndexOf(...e) {
		return wn(this, "lastIndexOf", e);
	},
	map(e, t) {
		return Sn(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return Tn(this, "pop");
	},
	push(...e) {
		return Tn(this, "push", e);
	},
	reduce(e, ...t) {
		return Cn(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return Cn(this, "reduceRight", e, t);
	},
	shift() {
		return Tn(this, "shift");
	},
	some(e, t) {
		return Sn(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return Tn(this, "splice", e);
	},
	toReversed() {
		return gn(this).toReversed();
	},
	toSorted(e) {
		return gn(this).toSorted(e);
	},
	toSpliced(...e) {
		return gn(this).toSpliced(...e);
	},
	unshift(...e) {
		return Tn(this, "unshift", e);
	},
	values() {
		return bn(this, "values", (e) => vn(this, e));
	}
};
function bn(e, t, n) {
	let r = _n(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ R(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var xn = Array.prototype;
function Sn(e, t, n, r, i, a) {
	let o = _n(e), s = o !== e && !/* @__PURE__ */ R(e), c = o[t];
	if (c !== xn[t]) {
		let t = c.apply(e, a);
		return s ? rr(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, vn(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function Cn(e, t, n, r) {
	let i = _n(e), a = i !== e && !/* @__PURE__ */ R(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = vn(e, t)), n.call(this, t, vn(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? vn(e, c) : c;
}
function wn(e, t, n) {
	let r = /* @__PURE__ */ z(e);
	L(r, "iterate", pn);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ tr(n[0]) ? (n[0] = /* @__PURE__ */ z(n[0]), r[t](...n)) : i;
}
function Tn(e, t, n = []) {
	nn(), qt();
	let r = (/* @__PURE__ */ z(e))[t].apply(e, n);
	return Jt(), rn(), r;
}
var En = /* @__PURE__ */ Ke("__proto__,__v_isRef,__isVue"), Dn = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(A));
function On(e) {
	A(e) || (e = String(e));
	let t = /* @__PURE__ */ z(this);
	return L(t, "has", e), t.hasOwnProperty(e);
}
var kn = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? qn : Kn : i ? Gn : Wn).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = D(e);
		if (!r) {
			let e;
			if (a && (e = yn[t])) return e;
			if (t === "hasOwnProperty") return On;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ B(e) ? e : n);
		if ((A(t) ? Dn.has(t) : En(t)) || (r || L(e, "get", t), i)) return o;
		if (/* @__PURE__ */ B(o)) {
			let e = a && ct(t) ? o : o.value;
			return r && j(e) ? /* @__PURE__ */ Zn(e) : e;
		}
		return j(o) ? r ? /* @__PURE__ */ Zn(o) : /* @__PURE__ */ Yn(o) : o;
	}
}, An = class extends kn {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = D(e) && ct(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ er(i);
			if (!/* @__PURE__ */ R(n) && !/* @__PURE__ */ er(n) && (i = /* @__PURE__ */ z(i), n = /* @__PURE__ */ z(n)), !a && /* @__PURE__ */ B(i) && !/* @__PURE__ */ B(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : E(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ B(e) ? e : r);
		return e === /* @__PURE__ */ z(r) && (o ? gt(n, i) && mn(e, "set", t, n, i) : mn(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = E(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && mn(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!A(t) || !Dn.has(t)) && L(e, "has", t), n;
	}
	ownKeys(e) {
		return L(e, "iterate", D(e) ? "length" : dn), Reflect.ownKeys(e);
	}
}, jn = class extends kn {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, Mn = /* @__PURE__ */ new An(), Nn = /* @__PURE__ */ new jn(), Pn = /* @__PURE__ */ new An(!0), Fn = (e) => e, In = (e) => Reflect.getPrototypeOf(e);
function Ln(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ z(i), o = et(a), s = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, l = i[e](...r), u = n ? Fn : t ? ir : rr;
		return !t && L(a, "iterate", c ? fn : dn), T(Object.create(l), { next() {
			let { value: e, done: t } = l.next();
			return t ? {
				value: e,
				done: t
			} : {
				value: s ? [u(e[0]), u(e[1])] : u(e),
				done: t
			};
		} });
	};
}
function Rn(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function zn(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ z(r), a = /* @__PURE__ */ z(n);
			e || (gt(n, a) && L(i, "get", n), L(i, "get", a));
			let { has: o } = In(i), s = t ? Fn : e ? ir : rr;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && L(/* @__PURE__ */ z(t), "iterate", dn), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ z(n), i = /* @__PURE__ */ z(t);
			return e || (gt(t, i) && L(r, "has", t), L(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ z(a), s = t ? Fn : e ? ir : rr;
			return !e && L(o, "iterate", dn), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return T(n, e ? {
		add: Rn("add"),
		set: Rn("set"),
		delete: Rn("delete"),
		clear: Rn("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ z(this), r = In(n), i = /* @__PURE__ */ z(e), a = !t && !/* @__PURE__ */ R(e) && !/* @__PURE__ */ er(e) ? i : e;
			return r.has.call(n, a) || gt(e, a) && r.has.call(n, e) || gt(i, a) && r.has.call(n, i) || (n.add(a), mn(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ R(n) && !/* @__PURE__ */ er(n) && (n = /* @__PURE__ */ z(n));
			let r = /* @__PURE__ */ z(this), { has: i, get: a } = In(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ z(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? gt(n, s) && mn(r, "set", e, n, s) : mn(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ z(this), { has: n, get: r } = In(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ z(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && mn(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ z(this), t = e.size !== 0, n = e.clear();
			return t && mn(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = Ln(r, e, t);
	}), n;
}
function Bn(e, t) {
	let n = zn(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(E(n, r) && r in t ? n : t, r, i);
}
var Vn = { get: /* @__PURE__ */ Bn(!1, !1) }, Hn = { get: /* @__PURE__ */ Bn(!1, !0) }, Un = { get: /* @__PURE__ */ Bn(!0, !1) }, Wn = /* @__PURE__ */ new WeakMap(), Gn = /* @__PURE__ */ new WeakMap(), Kn = /* @__PURE__ */ new WeakMap(), qn = /* @__PURE__ */ new WeakMap();
function Jn(e) {
	switch (e) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
// @__NO_SIDE_EFFECTS__
function Yn(e) {
	return /* @__PURE__ */ er(e) ? e : Qn(e, !1, Mn, Vn, Wn);
}
// @__NO_SIDE_EFFECTS__
function Xn(e) {
	return Qn(e, !1, Pn, Hn, Gn);
}
// @__NO_SIDE_EFFECTS__
function Zn(e) {
	return Qn(e, !0, Nn, Un, Kn);
}
function Qn(e, t, n, r, i) {
	if (!j(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = Jn(ot(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function $n(e) {
	return /* @__PURE__ */ er(e) ? /* @__PURE__ */ $n(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function er(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function R(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function tr(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function z(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ z(t) : e;
}
function nr(e) {
	return !E(e, "__v_skip") && Object.isExtensible(e) && vt(e, "__v_skip", !0), e;
}
var rr = (e) => j(e) ? /* @__PURE__ */ Yn(e) : e, ir = (e) => j(e) ? /* @__PURE__ */ Zn(e) : e;
// @__NO_SIDE_EFFECTS__
function B(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function ar(e) {
	return or(e, !1);
}
function or(e, t) {
	return /* @__PURE__ */ B(e) ? e : new sr(e, t);
}
var sr = class {
	constructor(e, t) {
		this.dep = new cn(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ z(e), this._value = t ? e : rr(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ R(e) || /* @__PURE__ */ er(e);
		e = n ? e : /* @__PURE__ */ z(e), gt(e, t) && (this._rawValue = e, this._value = n ? e : rr(e), this.dep.trigger());
	}
};
function V(e) {
	return /* @__PURE__ */ B(e) ? e.value : e;
}
var cr = {
	get: (e, t, n) => t === "__v_raw" ? e : V(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ B(i) && !/* @__PURE__ */ B(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function lr(e) {
	return /* @__PURE__ */ $n(e) ? e : new Proxy(e, cr);
}
// @__NO_SIDE_EFFECTS__
function ur(e) {
	let t = D(e) ? Array(e.length) : {};
	for (let n in e) t[n] = fr(e, n);
	return t;
}
var dr = class {
	constructor(e, t, n) {
		this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = A(t) ? t : String(t), this._raw = /* @__PURE__ */ z(e);
		let r = !0, i = e;
		if (!D(e) || A(this._key) || !ct(this._key)) do
			r = !/* @__PURE__ */ tr(i) || /* @__PURE__ */ R(i);
		while (r && (i = i.__v_raw));
		this._shallow = r;
	}
	get value() {
		let e = this._object[this._key];
		return this._shallow && (e = V(e)), this._value = e === void 0 ? this._defaultValue : e;
	}
	set value(e) {
		if (this._shallow && /* @__PURE__ */ B(this._raw[this._key])) {
			let t = this._object[this._key];
			if (/* @__PURE__ */ B(t)) {
				t.value = e;
				return;
			}
		}
		this._object[this._key] = e;
	}
	get dep() {
		return hn(this._raw, this._key);
	}
};
function fr(e, t, n) {
	return new dr(e, t, n);
}
var pr = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new cn(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = on - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && F !== this) return Kt(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return Qt(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function mr(e, t, n = !1) {
	let r, i;
	return O(e) ? r = e : (r = e.get, i = e.set), new pr(r, i, n);
}
var hr = {}, gr = /* @__PURE__ */ new WeakMap(), _r = void 0;
function vr(e, t = !1, n = _r) {
	if (n) {
		let t = gr.get(n);
		t || gr.set(n, t = []), t.push(e);
	}
}
function yr(e, t, n = w) {
	let { immediate: r, deep: i, once: a, scheduler: o, augmentJob: s, call: c } = n, l = (e) => i ? e : /* @__PURE__ */ R(e) || i === !1 || i === 0 ? br(e, 1) : br(e), u, d, f, p, m = !1, h = !1;
	if (/* @__PURE__ */ B(e) ? (d = () => e.value, m = /* @__PURE__ */ R(e)) : /* @__PURE__ */ $n(e) ? (d = () => l(e), m = !0) : D(e) ? (h = !0, m = e.some((e) => /* @__PURE__ */ $n(e) || /* @__PURE__ */ R(e)), d = () => e.map((e) => {
		if (/* @__PURE__ */ B(e)) return e.value;
		if (/* @__PURE__ */ $n(e)) return l(e);
		if (O(e)) return c ? c(e, 2) : e();
	})) : d = O(e) ? t ? c ? () => c(e, 2) : e : () => {
		if (f) {
			nn();
			try {
				f();
			} finally {
				rn();
			}
		}
		let t = _r;
		_r = u;
		try {
			return c ? c(e, 3, [p]) : e(p);
		} finally {
			_r = t;
		}
	} : Je, t && i) {
		let e = d, t = i === !0 ? Infinity : i;
		d = () => br(e(), t);
	}
	let g = zt(), _ = () => {
		u.stop(), g && g.active && Qe(g.effects, u);
	};
	if (a && t) {
		let e = t;
		t = (...t) => {
			let n = e(...t);
			return _(), n;
		};
	}
	let v = h ? Array(e.length).fill(hr) : hr, y = (e) => {
		if (!(!(u.flags & 1) || !u.dirty && !e)) if (t) {
			let n = u.run();
			if (e || i || m || (h ? n.some((e, t) => gt(e, v[t])) : gt(n, v))) {
				f && f();
				let e = _r;
				_r = u;
				try {
					let e = [
						n,
						v === hr ? void 0 : h && v[0] === hr ? [] : v,
						p
					];
					v = n, c ? c(t, 3, e) : t(...e);
				} finally {
					_r = e;
				}
			}
		} else u.run();
	};
	return s && s(y), u = new Ht(d), u.scheduler = o ? () => o(y, !1) : y, p = (e) => vr(e, !1, u), f = u.onStop = () => {
		let e = gr.get(u);
		if (e) {
			if (c) c(e, 4);
			else for (let t of e) t();
			gr.delete(u);
		}
	}, t ? r ? y(!0) : v = u.run() : o ? o(y.bind(null, !0), !0) : u.run(), _.pause = u.pause.bind(u), _.resume = u.resume.bind(u), _.stop = _, _;
}
function br(e, t = Infinity, n) {
	if (t <= 0 || !j(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ B(e)) br(e.value, t, n);
	else if (D(e)) for (let r = 0; r < e.length; r++) br(e[r], t, n);
	else if (tt(e) || et(e)) e.forEach((e) => {
		br(e, t, n);
	});
	else if (st(e)) {
		for (let r in e) br(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && br(e[r], t, n);
	}
	return e;
}
//#endregion
//#region node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function xr(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		Cr(e, t, n);
	}
}
function Sr(e, t, n, r) {
	if (O(e)) {
		let i = xr(e, t, n, r);
		return i && rt(i) && i.catch((e) => {
			Cr(e, t, n);
		}), i;
	}
	if (D(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(Sr(e[a], t, n, r));
		return i;
	}
}
function Cr(e, t, n, r = !0) {
	let i = t ? t.vnode : null, { errorHandler: a, throwUnhandledErrorInProduction: o } = t && t.appContext.config || w;
	if (t) {
		let r = t.parent, i = t.proxy, o = `https://vuejs.org/error-reference/#runtime-${n}`;
		for (; r;) {
			let t = r.ec;
			if (t) {
				for (let n = 0; n < t.length; n++) if (t[n](e, i, o) === !1) return;
			}
			r = r.parent;
		}
		if (a) {
			nn(), xr(a, null, 10, [
				e,
				i,
				o
			]), rn();
			return;
		}
	}
	wr(e, n, i, r, o);
}
function wr(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var H = [], Tr = -1, Er = [], Dr = null, Or = 0, kr = /* @__PURE__ */ Promise.resolve(), Ar = null;
function jr(e) {
	let t = Ar || kr;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function Mr(e) {
	let t = Tr + 1, n = H.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = H[r], a = Rr(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function Nr(e) {
	if (!(e.flags & 1)) {
		let t = Rr(e), n = H[H.length - 1];
		!n || !(e.flags & 2) && t >= Rr(n) ? H.push(e) : H.splice(Mr(t), 0, e), e.flags |= 1, Pr();
	}
}
function Pr() {
	Ar ||= kr.then(zr);
}
function Fr(e) {
	D(e) ? Er.push(...e) : Dr && e.id === -1 ? Dr.splice(Or + 1, 0, e) : e.flags & 1 || (Er.push(e), e.flags |= 1), Pr();
}
function Ir(e, t, n = Tr + 1) {
	for (; n < H.length; n++) {
		let t = H[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			H.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function Lr(e) {
	if (Er.length) {
		let e = [...new Set(Er)].sort((e, t) => Rr(e) - Rr(t));
		if (Er.length = 0, Dr) {
			Dr.push(...e);
			return;
		}
		for (Dr = e, Or = 0; Or < Dr.length; Or++) {
			let e = Dr[Or];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		Dr = null, Or = 0;
	}
}
var Rr = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function zr(e) {
	try {
		for (Tr = 0; Tr < H.length; Tr++) {
			let e = H[Tr];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), xr(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; Tr < H.length; Tr++) {
			let e = H[Tr];
			e && (e.flags &= -2);
		}
		Tr = -1, H.length = 0, Lr(e), Ar = null, (H.length || Er.length) && zr(e);
	}
}
var U = null, Br = null;
function Vr(e) {
	let t = U;
	return U = e, Br = e && e.type.__scopeId || null, t;
}
function Hr(e, t = U, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && Ja(-1);
		let i = Vr(t), a;
		try {
			a = e(...n);
		} finally {
			Vr(i), r._d && Ja(1);
		}
		return a;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function Ur(e, t) {
	if (U === null) return e;
	let n = jo(U), r = e.dirs ||= [];
	for (let e = 0; e < t.length; e++) {
		let [i, a, o, s = w] = t[e];
		i && (O(i) && (i = {
			mounted: i,
			updated: i
		}), i.deep && br(a), r.push({
			dir: i,
			instance: n,
			value: a,
			oldValue: void 0,
			arg: o,
			modifiers: s
		}));
	}
	return e;
}
function Wr(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (nn(), Sr(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), rn());
	}
}
function Gr(e, t) {
	if (Z) {
		let n = Z.provides, r = Z.parent && Z.parent.provides;
		r === n && (n = Z.provides = Object.create(r)), n[e] = t;
	}
}
function Kr(e, t, n = !1) {
	let r = go();
	if (r || $i) {
		let i = $i ? $i._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && O(t) ? t.call(r && r.proxy) : t;
	}
}
function qr() {
	return !!(go() || $i);
}
var Jr = /* @__PURE__ */ Symbol.for("v-scx"), Yr = () => Kr(Jr);
function Xr(e, t, n) {
	return Zr(e, t, n);
}
function Zr(e, t, n = w) {
	let { immediate: r, deep: i, flush: a, once: o } = n, s = T({}, n), c = t && r || !t && a !== "post", l;
	if (So) {
		if (a === "sync") {
			let e = Yr();
			l = e.__watcherHandles ||= [];
		} else if (!c) {
			let e = () => {};
			return e.stop = Je, e.resume = Je, e.pause = Je, e;
		}
	}
	let u = Z;
	s.call = (e, t, n) => Sr(e, u, t, n);
	let d = !1;
	a === "post" ? s.scheduler = (e) => {
		G(e, u && u.suspense);
	} : a !== "sync" && (d = !0, s.scheduler = (e, t) => {
		t ? e() : Nr(e);
	}), s.augmentJob = (e) => {
		t && (e.flags |= 4), d && (e.flags |= 2, u && (e.id = u.uid, e.i = u));
	};
	let f = yr(e, t, s);
	return So && (l ? l.push(f) : c && f()), f;
}
function Qr(e, t, n) {
	let r = this.proxy, i = k(e) ? e.includes(".") ? $r(r, e) : () => r[e] : e.bind(r, r), a;
	O(t) ? a = t : (a = t.handler, n = t);
	let o = yo(this), s = Zr(i, a.bind(r), n);
	return o(), s;
}
function $r(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var ei = /* @__PURE__ */ Symbol("_vte"), ti = (e) => e.__isTeleport, ni = /* @__PURE__ */ Symbol("_leaveCb");
function ri(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, ri(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function ii(e, t) {
	return O(e) ? /* @__PURE__ */ T({ name: e.name }, t, { setup: e }) : e;
}
function ai(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function oi(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var si = /* @__PURE__ */ new WeakMap();
function ci(e, t, n, r, i = !1) {
	if (D(e)) {
		e.forEach((e, a) => ci(e, t && (D(t) ? t[a] : t), n, r, i));
		return;
	}
	if (di(r) && !i) {
		r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && ci(e, t, n, r.component.subTree);
		return;
	}
	let a = r.shapeFlag & 4 ? jo(r.component) : r.el, o = i ? null : a, { i: s, r: c } = e, l = t && t.r, u = s.refs === w ? s.refs = {} : s.refs, d = s.setupState, f = /* @__PURE__ */ z(d), p = d === w ? Ye : (e) => oi(u, e) ? !1 : E(f, e), m = (e, t) => !(t && oi(u, t));
	if (l != null && l !== c) {
		if (li(t), k(l)) u[l] = null, p(l) && (d[l] = null);
		else if (/* @__PURE__ */ B(l)) {
			let e = t;
			m(l, e.k) && (l.value = null), e.k && (u[e.k] = null);
		}
	}
	if (O(c)) xr(c, s, 12, [o, u]);
	else {
		let t = k(c), r = /* @__PURE__ */ B(c);
		if (t || r) {
			let s = () => {
				if (e.f) {
					let n = t ? p(c) ? d[c] : u[c] : m(c) || !e.k ? c.value : u[e.k];
					if (i) D(n) && Qe(n, a);
					else if (D(n)) n.includes(a) || n.push(a);
					else if (t) u[c] = [a], p(c) && (d[c] = u[c]);
					else {
						let t = [a];
						m(c, e.k) && (c.value = t), e.k && (u[e.k] = t);
					}
				} else t ? (u[c] = o, p(c) && (d[c] = o)) : r && (m(c, e.k) && (c.value = o), e.k && (u[e.k] = o));
			};
			if (o) {
				let t = () => {
					s(), si.delete(e);
				};
				t.id = -1, si.set(e, t), G(t, n);
			} else li(e), s();
		}
	}
}
function li(e) {
	let t = si.get(e);
	t && (t.flags |= 8, si.delete(e));
}
xt().requestIdleCallback, xt().cancelIdleCallback;
var di = (e) => !!e.type.__asyncLoader, fi = (e) => e.type.__isKeepAlive;
function pi(e, t) {
	hi(e, "a", t);
}
function mi(e, t) {
	hi(e, "da", t);
}
function hi(e, t, n = Z) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (_i(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) fi(e.parent.vnode) && gi(r, t, n, e), e = e.parent;
	}
}
function gi(e, t, n, r) {
	let i = _i(t, e, r, !0);
	wi(() => {
		Qe(r[t], i);
	}, n);
}
function _i(e, t, n = Z, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			nn();
			let i = yo(n), a = Sr(t, n, e, r);
			return i(), rn(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var vi = (e) => (t, n = Z) => {
	(!So || e === "sp") && _i(e, (...e) => t(...e), n);
}, yi = vi("bm"), bi = vi("m"), xi = vi("bu"), Si = vi("u"), Ci = vi("bum"), wi = vi("um"), Ti = vi("sp"), Ei = vi("rtg"), Di = vi("rtc");
function Oi(e, t = Z) {
	_i("ec", e, t);
}
var ki = /* @__PURE__ */ Symbol.for("v-ndc");
function Ai(e, t, n, r) {
	let i, a = n && n[r], o = D(e);
	if (o || k(e)) {
		let n = o && /* @__PURE__ */ $n(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ R(e), s = /* @__PURE__ */ er(e), e = _n(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? ir(rr(e[n])) : rr(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		i = Array(e);
		for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
	} else if (j(e)) if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
	else {
		let n = Object.keys(e);
		i = Array(n.length);
		for (let r = 0, o = n.length; r < o; r++) {
			let o = n[r];
			i[r] = t(e[o], o, r, a && a[r]);
		}
	}
	else i = [];
	return n && (n[r] = i), i;
}
var ji = (e) => e ? xo(e) ? jo(e) : ji(e.parent) : null, Mi = /* @__PURE__ */ T(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => ji(e.parent),
	$root: (e) => ji(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => Vi(e),
	$forceUpdate: (e) => e.f ||= () => {
		Nr(e.update);
	},
	$nextTick: (e) => e.n ||= jr.bind(e.proxy),
	$watch: (e) => Qr.bind(e)
}), Ni = (e, t) => e !== w && !e.__isScriptSetup && E(e, t), Pi = {
	get({ _: e }, t) {
		if (t === "__v_skip") return !0;
		let { ctx: n, setupState: r, data: i, props: a, accessCache: o, type: s, appContext: c } = e;
		if (t[0] !== "$") {
			let e = o[t];
			if (e !== void 0) switch (e) {
				case 1: return r[t];
				case 2: return i[t];
				case 4: return n[t];
				case 3: return a[t];
			}
			else if (Ni(r, t)) return o[t] = 1, r[t];
			else if (i !== w && E(i, t)) return o[t] = 2, i[t];
			else if (E(a, t)) return o[t] = 3, a[t];
			else if (n !== w && E(n, t)) return o[t] = 4, n[t];
			else Ii && (o[t] = 0);
		}
		let l = Mi[t], u, d;
		if (l) return t === "$attrs" && L(e.attrs, "get", ""), l(e);
		if ((u = s.__cssModules) && (u = u[t])) return u;
		if (n !== w && E(n, t)) return o[t] = 4, n[t];
		if (d = c.config.globalProperties, E(d, t)) return d[t];
	},
	set({ _: e }, t, n) {
		let { data: r, setupState: i, ctx: a } = e;
		return Ni(i, t) ? (i[t] = n, !0) : r !== w && E(r, t) ? (r[t] = n, !0) : E(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = n, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, props: a, type: o } }, s) {
		let c;
		return !!(n[s] || e !== w && s[0] !== "$" && E(e, s) || Ni(t, s) || E(a, s) || E(r, s) || E(Mi, s) || E(i.config.globalProperties, s) || (c = o.__cssModules) && c[s]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? E(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function Fi(e) {
	return D(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
var Ii = !0;
function Li(e) {
	let t = Vi(e), n = e.proxy, r = e.ctx;
	Ii = !1, t.beforeCreate && zi(t.beforeCreate, e, "bc");
	let { data: i, computed: a, methods: o, watch: s, provide: c, inject: l, created: u, beforeMount: d, mounted: f, beforeUpdate: p, updated: m, activated: h, deactivated: g, beforeDestroy: _, beforeUnmount: v, destroyed: y, unmounted: b, render: x, renderTracked: ee, renderTriggered: te, errorCaptured: ne, serverPrefetch: re, expose: ie, inheritAttrs: ae, components: oe, directives: se, filters: ce } = t;
	if (l && Ri(l, r, null), o) for (let e in o) {
		let t = o[e];
		O(t) && (r[e] = t.bind(n));
	}
	if (i) {
		let t = i.call(n, n);
		j(t) && (e.data = /* @__PURE__ */ Yn(t));
	}
	if (Ii = !0, a) for (let e in a) {
		let t = a[e], i = No({
			get: O(t) ? t.bind(n, n) : O(t.get) ? t.get.bind(n, n) : Je,
			set: !O(t) && O(t.set) ? t.set.bind(n) : Je
		});
		Object.defineProperty(r, e, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		});
	}
	if (s) for (let e in s) Bi(s[e], r, n, e);
	if (c) {
		let e = O(c) ? c.call(n) : c;
		Reflect.ownKeys(e).forEach((t) => {
			Gr(t, e[t]);
		});
	}
	u && zi(u, e, "c");
	function S(e, t) {
		D(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (S(yi, d), S(bi, f), S(xi, p), S(Si, m), S(pi, h), S(mi, g), S(Oi, ne), S(Di, ee), S(Ei, te), S(Ci, v), S(wi, b), S(Ti, re), D(ie)) if (ie.length) {
		let t = e.exposed ||= {};
		ie.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	x && e.render === Je && (e.render = x), ae != null && (e.inheritAttrs = ae), oe && (e.components = oe), se && (e.directives = se), re && ai(e);
}
function Ri(e, t, n = Je) {
	D(e) && (e = Ki(e));
	for (let n in e) {
		let r = e[n], i;
		i = j(r) ? "default" in r ? Kr(r.from || n, r.default, !0) : Kr(r.from || n) : Kr(r), /* @__PURE__ */ B(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function zi(e, t, n) {
	Sr(D(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Bi(e, t, n, r) {
	let i = r.includes(".") ? $r(n, r) : () => n[r];
	if (k(e)) {
		let n = t[e];
		O(n) && Xr(i, n);
	} else if (O(e)) Xr(i, e.bind(n));
	else if (j(e)) if (D(e)) e.forEach((e) => Bi(e, t, n, r));
	else {
		let r = O(e.handler) ? e.handler.bind(n) : t[e.handler];
		O(r) && Xr(i, r, e);
	}
}
function Vi(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => Hi(c, e, o, !0)), Hi(c, t, o)), j(t) && a.set(t, c), c;
}
function Hi(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && Hi(e, a, n, !0), i && i.forEach((t) => Hi(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = Ui[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Ui = {
	data: Wi,
	props: Ji,
	emits: Ji,
	methods: qi,
	computed: qi,
	beforeCreate: W,
	created: W,
	beforeMount: W,
	mounted: W,
	beforeUpdate: W,
	updated: W,
	beforeDestroy: W,
	beforeUnmount: W,
	destroyed: W,
	unmounted: W,
	activated: W,
	deactivated: W,
	errorCaptured: W,
	serverPrefetch: W,
	components: qi,
	directives: qi,
	watch: Yi,
	provide: Wi,
	inject: Gi
};
function Wi(e, t) {
	return t ? e ? function() {
		return T(O(e) ? e.call(this, this) : e, O(t) ? t.call(this, this) : t);
	} : t : e;
}
function Gi(e, t) {
	return qi(Ki(e), Ki(t));
}
function Ki(e) {
	if (D(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function W(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function qi(e, t) {
	return e ? T(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ji(e, t) {
	return e ? D(e) && D(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : T(/* @__PURE__ */ Object.create(null), Fi(e), Fi(t ?? {})) : t;
}
function Yi(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = T(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = W(e[r], t[r]);
	return n;
}
function Xi() {
	return {
		app: null,
		config: {
			isNativeTag: Ye,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: /* @__PURE__ */ Object.create(null),
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
var Zi = 0;
function Qi(e, t) {
	return function(n, r = null) {
		O(n) || (n = T({}, n)), r != null && !j(r) && (r = null);
		let i = Xi(), a = /* @__PURE__ */ new WeakSet(), o = [], s = !1, c = i.app = {
			_uid: Zi++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Po,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && O(e.install) ? (a.add(e), e.install(c, ...t)) : O(e) && (a.add(e), e(c, ...t))), c;
			},
			mixin(e) {
				return i.mixins.includes(e) || i.mixins.push(e), c;
			},
			component(e, t) {
				return t ? (i.components[e] = t, c) : i.components[e];
			},
			directive(e, t) {
				return t ? (i.directives[e] = t, c) : i.directives[e];
			},
			mount(a, o, l) {
				if (!s) {
					let u = c._ceVNode || to(n, r);
					return u.appContext = i, l === !0 ? l = "svg" : l === !1 && (l = void 0), o && t ? t(u, a) : e(u, a, l), s = !0, c._container = a, a.__vue_app__ = c, jo(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				s && (Sr(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, c;
			},
			runWithContext(e) {
				let t = $i;
				$i = c;
				try {
					return e();
				} finally {
					$i = t;
				}
			}
		};
		return c;
	};
}
var $i = null, ea = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${M(t)}Modifiers`] || e[`${pt(t)}Modifiers`];
function ta(e, t, ...n) {
	if (e.isUnmounted) return;
	let r = e.vnode.props || w, i = n, a = t.startsWith("update:"), o = a && ea(r, t.slice(7));
	o && (o.trim && (i = n.map((e) => k(e) ? e.trim() : e)), o.number && (i = n.map(yt)));
	let s, c = r[s = ht(t)] || r[s = ht(M(t))];
	!c && a && (c = r[s = ht(pt(t))]), c && Sr(c, e, 6, i);
	let l = r[s + "Once"];
	if (l) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[s]) return;
		e.emitted[s] = !0, Sr(l, e, 6, i);
	}
}
var na = /* @__PURE__ */ new WeakMap();
function ra(e, t, n = !1) {
	let r = n ? na : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, s = !1;
	if (!O(e)) {
		let r = (e) => {
			let n = ra(e, t, !0);
			n && (s = !0, T(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !s ? (j(e) && r.set(e, null), null) : (D(a) ? a.forEach((e) => o[e] = null) : T(o, a), j(e) && r.set(e, o), o);
}
function ia(e, t) {
	return !e || !Xe(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), E(e, t[0].toLowerCase() + t.slice(1)) || E(e, pt(t)) || E(e, t));
}
function aa(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: o, attrs: s, emit: c, render: l, renderCache: u, props: d, data: f, setupState: p, ctx: m, inheritAttrs: h } = e, g = Vr(e), _, v;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			_ = so(l.call(t, e, u, d, p, f, m)), v = s;
		} else {
			let e = t;
			_ = so(e.length > 1 ? e(d, {
				attrs: s,
				slots: o,
				emit: c
			}) : e(d, null)), v = t.props ? s : oa(s);
		}
	} catch (t) {
		Ga.length = 0, Cr(t, e, 1), _ = to(Ua);
	}
	let y = _;
	if (v && h !== !1) {
		let e = Object.keys(v), { shapeFlag: t } = y;
		e.length && t & 7 && (a && e.some(Ze) && (v = sa(v, a)), y = io(y, v, !1, !0));
	}
	return n.dirs && (y = io(y, null, !1, !0), y.dirs = y.dirs ? y.dirs.concat(n.dirs) : n.dirs), n.transition && ri(y, n.transition), _ = y, Vr(g), _;
}
var oa = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || Xe(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, sa = (e, t) => {
	let n = {};
	for (let r in e) (!Ze(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function ca(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? la(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (ua(o, r, n) && !ia(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? o ? la(r, o, l) : !0 : !!o;
	return !1;
}
function la(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (ua(t, e, a) && !ia(n, a)) return !0;
	}
	return !1;
}
function ua(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && j(r) && j(i) ? !Mt(r, i) : r !== i;
}
function da({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var fa = {}, pa = () => Object.create(fa), ma = (e) => Object.getPrototypeOf(e) === fa;
function ha(e, t, n, r = !1) {
	let i = {}, a = pa();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), _a(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	n ? e.props = r ? i : /* @__PURE__ */ Xn(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function ga(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ z(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (ia(e.emitsOptions, o)) continue;
				let u = t[o];
				if (c) if (E(a, o)) u !== a[o] && (a[o] = u, l = !0);
				else {
					let t = M(o);
					i[t] = va(c, s, t, u, e, !1);
				}
				else u !== a[o] && (a[o] = u, l = !0);
			}
		}
	} else {
		_a(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !E(t, a) && ((r = pt(a)) === a || !E(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = va(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !E(t, e)) && (delete a[e], l = !0);
	}
	l && mn(e.attrs, "set", "");
}
function _a(e, t, n, r) {
	let [i, a] = e.propsOptions, o = !1, s;
	if (t) for (let c in t) {
		if (lt(c)) continue;
		let l = t[c], u;
		i && E(i, u = M(c)) ? !a || !a.includes(u) ? n[u] = l : (s ||= {})[u] = l : ia(e.emitsOptions, c) || (!(c in r) || l !== r[c]) && (r[c] = l, o = !0);
	}
	if (a) {
		let t = /* @__PURE__ */ z(n), r = s || w;
		for (let o = 0; o < a.length; o++) {
			let s = a[o];
			n[s] = va(i, t, s, r[s], e, !E(r, s));
		}
	}
	return o;
}
function va(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = E(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && O(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = yo(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === pt(n)) && (r = !0));
	}
	return r;
}
var ya = /* @__PURE__ */ new WeakMap();
function ba(e, t, n = !1) {
	let r = n ? ya : t.propsCache, i = r.get(e);
	if (i) return i;
	let a = e.props, o = {}, s = [], c = !1;
	if (!O(e)) {
		let r = (e) => {
			c = !0;
			let [n, r] = ba(e, t, !0);
			T(o, n), r && s.push(...r);
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	if (!a && !c) return j(e) && r.set(e, qe), qe;
	if (D(a)) for (let e = 0; e < a.length; e++) {
		let t = M(a[e]);
		xa(t) && (o[t] = w);
	}
	else if (a) for (let e in a) {
		let t = M(e);
		if (xa(t)) {
			let n = a[e], r = o[t] = D(n) || O(n) ? { type: n } : T({}, n), i = r.type, c = !1, l = !0;
			if (D(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = O(t) && t.name;
				if (n === "Boolean") {
					c = !0;
					break;
				} else n === "String" && (l = !1);
			}
			else c = O(i) && i.name === "Boolean";
			r[0] = c, r[1] = l, (c || E(r, "default")) && s.push(t);
		}
	}
	let l = [o, s];
	return j(e) && r.set(e, l), l;
}
function xa(e) {
	return e[0] !== "$" && !lt(e);
}
var Sa = (e) => e === "_" || e === "_ctx" || e === "$stable", Ca = (e) => D(e) ? e.map(so) : [so(e)], wa = (e, t, n) => {
	if (t._n) return t;
	let r = Hr((...e) => Ca(t(...e)), n);
	return r._c = !1, r;
}, Ta = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (Sa(n)) continue;
		let i = e[n];
		if (O(i)) t[n] = wa(n, i, r);
		else if (i != null) {
			let e = Ca(i);
			t[n] = () => e;
		}
	}
}, Ea = (e, t) => {
	let n = Ca(t);
	e.slots.default = () => n;
}, Da = (e, t, n) => {
	for (let r in t) (n || !Sa(r)) && (e[r] = t[r]);
}, Oa = (e, t, n) => {
	let r = e.slots = pa();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Da(r, t, n), n && vt(r, "_", e, !0)) : Ta(t, r);
	} else t && Ea(e, t);
}, ka = (e, t, n) => {
	let { vnode: r, slots: i } = e, a = !0, o = w;
	if (r.shapeFlag & 32) {
		let e = t._;
		e ? n && e === 1 ? a = !1 : Da(i, t, n) : (a = !t.$stable, Ta(t, i)), o = t;
	} else t && (Ea(e, t), o = { default: 1 });
	if (a) for (let e in i) !Sa(e) && o[e] == null && delete i[e];
}, G = Va;
function Aa(e) {
	return ja(e);
}
function ja(e, t) {
	let n = xt();
	n.__VUE__ = !0;
	let { insert: r, remove: i, patchProp: a, createElement: o, createText: s, createComment: c, setText: l, setElementText: u, parentNode: d, nextSibling: f, setScopeId: p = Je, insertStaticContent: m } = e, h = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !Qa(e, t) && (r = be(e), he(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case Ha:
				g(e, t, n, r);
				break;
			case Ua:
				_(e, t, n, r);
				break;
			case Wa:
				e ?? v(t, n, r, o);
				break;
			case K:
				oe(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? x(e, t, n, r, i, a, o, s, c) : d & 6 ? se(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, Ce);
		}
		u != null && i ? ci(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && ci(e.ref, null, a, e, !0);
	}, g = (e, t, n, i) => {
		if (e == null) r(t.el = s(t.children), n, i);
		else {
			let n = t.el = e.el;
			t.children !== e.children && l(n, t.children);
		}
	}, _ = (e, t, n, i) => {
		e == null ? r(t.el = c(t.children || ""), n, i) : t.el = e.el;
	}, v = (e, t, n, r) => {
		[e.el, e.anchor] = m(e.children, t, n, r, e.el, e.anchor);
	}, y = ({ el: e, anchor: t }, n, i) => {
		let a;
		for (; e && e !== t;) a = f(e), r(e, n, i), e = a;
		r(t, n, i);
	}, b = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, x = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) ee(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), re(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, ee = (e, t, n, i, s, c, l, d) => {
		let f, p, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (f = e.el = o(e.type, c, m && m.is, m), h & 8 ? u(f, e.children) : h & 16 && ne(e.children, f, null, i, s, Ma(e, c), l, d), _ && Wr(e, null, i, "created"), te(f, e, e.scopeId, l, i), m) {
			for (let e in m) e !== "value" && !lt(e) && a(f, e, null, m[e], c, i);
			"value" in m && a(f, "value", null, m.value, c), (p = m.onVnodeBeforeMount) && fo(p, i, e);
		}
		_ && Wr(e, null, i, "beforeMount");
		let v = Pa(s, g);
		v && g.beforeEnter(f), r(f, t, n), ((p = m && m.onVnodeMounted) || v || _) && G(() => {
			try {
				p && fo(p, i, e), v && g.enter(f), _ && Wr(e, null, i, "mounted");
			} finally {}
		}, s);
	}, te = (e, t, n, r, i) => {
		if (n && p(e, n), r) for (let t = 0; t < r.length; t++) p(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || Ba(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				te(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, ne = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) h(null, e[l] = s ? co(e[l]) : so(e[l]), t, n, r, i, a, o, s);
	}, re = (e, t, n, r, i, o, s) => {
		let c = t.el = e.el, { patchFlag: l, dynamicChildren: d, dirs: f } = t;
		l |= e.patchFlag & 16;
		let p = e.props || w, m = t.props || w, h;
		if (n && Na(n, !1), (h = m.onVnodeBeforeUpdate) && fo(h, n, t, e), f && Wr(t, e, n, "beforeUpdate"), n && Na(n, !0), (p.innerHTML && m.innerHTML == null || p.textContent && m.textContent == null) && u(c, ""), d ? ie(e.dynamicChildren, d, c, n, r, Ma(t, i), o) : s || de(e, t, c, null, n, r, Ma(t, i), o, !1), l > 0) {
			if (l & 16) ae(c, p, m, n, i);
			else if (l & 2 && p.class !== m.class && a(c, "class", null, m.class, i), l & 4 && a(c, "style", p.style, m.style, i), l & 8) {
				let e = t.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let r = e[t], o = p[r], s = m[r];
					(s !== o || r === "value") && a(c, r, o, s, i, n);
				}
			}
			l & 1 && e.children !== t.children && u(c, t.children);
		} else !s && d == null && ae(c, p, m, n, i);
		((h = m.onVnodeUpdated) || f) && G(() => {
			h && fo(h, n, t, e), f && Wr(t, e, n, "updated");
		}, r);
	}, ie = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			h(c, l, c.el && (c.type === K || !Qa(c, l) || c.shapeFlag & 198) ? d(c.el) : n, null, r, i, a, o, !0);
		}
	}, ae = (e, t, n, r, i) => {
		if (t !== n) {
			if (t !== w) for (let o in t) !lt(o) && !(o in n) && a(e, o, t[o], null, i, r);
			for (let o in n) {
				if (lt(o)) continue;
				let s = n[o], c = t[o];
				s !== c && o !== "value" && a(e, o, c, s, i, r);
			}
			"value" in n && a(e, "value", t.value, n.value, i);
		}
	}, oe = (e, t, n, i, a, o, c, l, u) => {
		let d = t.el = e ? e.el : s(""), f = t.anchor = e ? e.anchor : s(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (l = l ? l.concat(h) : h), e == null ? (r(d, n, i), r(f, n, i), ne(t.children || [], n, f, a, o, c, l, u)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (ie(e.dynamicChildren, m, n, a, o, c, l), (t.key != null || a && t === a.subTree) && Fa(e, t, !0)) : de(e, t, n, f, a, o, c, l, u);
	}, se = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : ce(t, n, r, i, a, o, c) : S(e, t, c);
	}, ce = (e, t, n, r, i, a, o) => {
		let s = e.component = ho(e, r, i);
		if (fi(e) && (s.ctx.renderer = Ce), Co(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, le, o), !e.el) {
				let r = s.subTree = to(Ua);
				_(null, r, t, n), e.placeholder = r.el;
			}
		} else le(s, e, t, n, i, a, o);
	}, S = (e, t, n) => {
		let r = t.component = e.component;
		if (ca(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			ue(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, le = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = La(e);
					if (n) {
						t && (t.el = c.el, ue(e, t, o)), n.asyncDep.then(() => {
							G(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, f;
				Na(e, !1), t ? (t.el = c.el, ue(e, t, o)) : t = c, n && _t(n), (f = t.props && t.props.onVnodeBeforeUpdate) && fo(f, s, t, c), Na(e, !0);
				let p = aa(e), m = e.subTree;
				e.subTree = p, h(m, p, d(m.el), be(m), e, i, a), t.el = p.el, u === null && da(e, p.el), r && G(r, i), (f = t.props && t.props.onVnodeUpdated) && G(() => fo(f, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = di(t);
				if (Na(e, !1), l && _t(l), !m && (o = c && c.onVnodeBeforeMount) && fo(o, d, t), Na(e, !0), s && Te) {
					let t = () => {
						e.subTree = aa(e), Te(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = aa(e);
					h(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && G(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					G(() => fo(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && di(d.vnode) && d.vnode.shapeFlag & 256) && e.a && G(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Ht(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => Nr(u), Na(e, !0), l();
	}, ue = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, ga(e, t.props, r, n), ka(e, t.children, n), nn(), Ir(e), rn();
	}, de = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, d = e ? e.shapeFlag : 0, f = t.children, { patchFlag: p, shapeFlag: m } = t;
		if (p > 0) {
			if (p & 128) {
				pe(l, f, n, r, i, a, o, s, c);
				return;
			} else if (p & 256) {
				fe(l, f, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (d & 16 && ye(l, i, a), f !== l && u(n, f)) : d & 16 ? m & 16 ? pe(l, f, n, r, i, a, o, s, c) : ye(l, i, a, !0) : (d & 8 && u(n, ""), m & 16 && ne(f, n, r, i, a, o, s, c));
	}, fe = (e, t, n, r, i, a, o, s, c) => {
		e ||= qe, t ||= qe;
		let l = e.length, u = t.length, d = Math.min(l, u), f;
		for (f = 0; f < d; f++) {
			let r = t[f] = c ? co(t[f]) : so(t[f]);
			h(e[f], r, n, null, i, a, o, s, c);
		}
		l > u ? ye(e, i, a, !0, !1, d) : ne(t, n, r, i, a, o, s, c, d);
	}, pe = (e, t, n, r, i, a, o, s, c) => {
		let l = 0, u = t.length, d = e.length - 1, f = u - 1;
		for (; l <= d && l <= f;) {
			let r = e[l], u = t[l] = c ? co(t[l]) : so(t[l]);
			if (Qa(r, u)) h(r, u, n, null, i, a, o, s, c);
			else break;
			l++;
		}
		for (; l <= d && l <= f;) {
			let r = e[d], l = t[f] = c ? co(t[f]) : so(t[f]);
			if (Qa(r, l)) h(r, l, n, null, i, a, o, s, c);
			else break;
			d--, f--;
		}
		if (l > d) {
			if (l <= f) {
				let e = f + 1, d = e < u ? t[e].el : r;
				for (; l <= f;) h(null, t[l] = c ? co(t[l]) : so(t[l]), n, d, i, a, o, s, c), l++;
			}
		} else if (l > f) for (; l <= d;) he(e[l], i, a, !0), l++;
		else {
			let p = l, m = l, g = /* @__PURE__ */ new Map();
			for (l = m; l <= f; l++) {
				let e = t[l] = c ? co(t[l]) : so(t[l]);
				e.key != null && g.set(e.key, l);
			}
			let _, v = 0, y = f - m + 1, b = !1, x = 0, ee = Array(y);
			for (l = 0; l < y; l++) ee[l] = 0;
			for (l = p; l <= d; l++) {
				let r = e[l];
				if (v >= y) {
					he(r, i, a, !0);
					continue;
				}
				let u;
				if (r.key != null) u = g.get(r.key);
				else for (_ = m; _ <= f; _++) if (ee[_ - m] === 0 && Qa(r, t[_])) {
					u = _;
					break;
				}
				u === void 0 ? he(r, i, a, !0) : (ee[u - m] = l + 1, u >= x ? x = u : b = !0, h(r, t[u], n, null, i, a, o, s, c), v++);
			}
			let te = b ? Ia(ee) : qe;
			for (_ = te.length - 1, l = y - 1; l >= 0; l--) {
				let e = m + l, d = t[e], f = t[e + 1], p = e + 1 < u ? f.el || za(f) : r;
				ee[l] === 0 ? h(null, d, n, p, i, a, o, s, c) : b && (_ < 0 || l !== te[_] ? me(d, n, p, 2) : _--);
			}
		}
	}, me = (e, t, n, a, o = null) => {
		let { el: s, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			me(e.component.subTree, t, n, a);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, a);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, Ce);
			return;
		}
		if (c === K) {
			r(s, t, n);
			for (let e = 0; e < u.length; e++) me(u[e], t, n, a);
			r(e.anchor, t, n);
			return;
		}
		if (c === Wa) {
			y(e, t, n);
			return;
		}
		if (a !== 2 && d & 1 && l) if (a === 0) l.persisted && !s[ni] ? r(s, t, n) : (l.beforeEnter(s), r(s, t, n), G(() => l.enter(s), o));
		else {
			let { leave: a, delayLeave: o, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? i(s) : r(s, t, n);
			}, d = () => {
				let e = s._isLeaving || !!s[ni];
				s._isLeaving && s[ni](!0), l.persisted && !e ? u() : a(s, () => {
					u(), c && c();
				});
			};
			o ? o(s, u, d) : d();
		}
		else r(s, t, n);
	}, he = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if (d === -2 && (i = !1), s != null && (nn(), ci(s, null, n, e, !0), rn()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !di(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && fo(_, t, e), u & 6) ve(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Wr(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, Ce, r) : l && !l.hasOnce && (a !== K || d > 0 && d & 64) ? ye(l, t, n, !1, !0) : (a === K && d & 384 || !i && u & 16) && ye(c, t, n), r && ge(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && G(() => {
			_ && fo(_, t, e), h && Wr(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, ge = (e) => {
		let { type: t, el: n, anchor: r, transition: a } = e;
		if (t === K) {
			_e(n, r);
			return;
		}
		if (t === Wa) {
			b(e);
			return;
		}
		let o = () => {
			i(n), a && !a.persisted && a.afterLeave && a.afterLeave();
		};
		if (e.shapeFlag & 1 && a && !a.persisted) {
			let { leave: t, delayLeave: r } = a, i = () => t(n, o);
			r ? r(e.el, o, i) : i();
		} else o();
	}, _e = (e, t) => {
		let n;
		for (; e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, ve = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		Ra(c), Ra(l), r && _t(r), i.stop(), a && (a.flags |= 8, he(o, e, t, n)), s && G(s, t), G(() => {
			e.isUnmounted = !0;
		}, t);
	}, ye = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) he(e[o], t, n, r, i);
	}, be = (e) => {
		if (e.shapeFlag & 6) return be(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = f(e.anchor || e.el), n = t && t[ei];
		return n ? f(n) : t;
	}, xe = !1, Se = (e, t, n) => {
		let r;
		e == null ? t._vnode && (he(t._vnode, null, null, !0), r = t._vnode.component) : h(t._vnode || null, e, t, null, null, null, n), t._vnode = e, xe ||= (xe = !0, Ir(r), Lr(), !1);
	}, Ce = {
		p: h,
		um: he,
		m: me,
		r: ge,
		mt: ce,
		mc: ne,
		pc: de,
		pbc: ie,
		n: be,
		o: e
	}, we, Te;
	return t && ([we, Te] = t(Ce)), {
		render: Se,
		hydrate: we,
		createApp: Qi(Se, we)
	};
}
function Ma({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Na({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Pa(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Fa(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (D(r) && D(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = co(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Fa(t, a)), a.type === Ha && (a.patchFlag === -1 && (a = i[e] = co(a)), a.el = t.el), a.type === Ua && !a.el && (a.el = t.el);
	}
}
function Ia(e) {
	let t = e.slice(), n = [0], r, i, a, o, s, c = e.length;
	for (r = 0; r < c; r++) {
		let c = e[r];
		if (c !== 0) {
			if (i = n[n.length - 1], e[i] < c) {
				t[r] = i, n.push(r);
				continue;
			}
			for (a = 0, o = n.length - 1; a < o;) s = a + o >> 1, e[n[s]] < c ? a = s + 1 : o = s;
			c < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), n[a] = r);
		}
	}
	for (a = n.length, o = n[a - 1]; a-- > 0;) n[a] = o, o = t[o];
	return n;
}
function La(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : La(t);
}
function Ra(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function za(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? za(t.subTree) : null;
}
var Ba = (e) => e.__isSuspense;
function Va(e, t) {
	t && t.pendingBranch ? D(e) ? t.effects.push(...e) : t.effects.push(e) : Fr(e);
}
var K = /* @__PURE__ */ Symbol.for("v-fgt"), Ha = /* @__PURE__ */ Symbol.for("v-txt"), Ua = /* @__PURE__ */ Symbol.for("v-cmt"), Wa = /* @__PURE__ */ Symbol.for("v-stc"), Ga = [], q = null;
function J(e = !1) {
	Ga.push(q = e ? null : []);
}
function Ka() {
	Ga.pop(), q = Ga[Ga.length - 1] || null;
}
var qa = 1;
function Ja(e, t = !1) {
	qa += e, e < 0 && q && t && (q.hasOnce = !0);
}
function Ya(e) {
	return e.dynamicChildren = qa > 0 ? q || qe : null, Ka(), qa > 0 && q && q.push(e), e;
}
function Y(e, t, n, r, i, a) {
	return Ya(X(e, t, n, r, i, a, !0));
}
function Xa(e, t, n, r, i) {
	return Ya(to(e, t, n, r, i, !0));
}
function Za(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Qa(e, t) {
	return e.type === t.type && e.key === t.key;
}
var $a = ({ key: e }) => e ?? null, eo = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : k(e) || /* @__PURE__ */ B(e) || O(e) ? {
	i: U,
	r: e,
	k: t,
	f: !!n
} : e);
function X(e, t = null, n = null, r = 0, i = null, a = e === K ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && $a(t),
		ref: t && eo(t),
		scopeId: Br,
		slotScopeIds: null,
		children: n,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: a,
		patchFlag: r,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: U
	};
	return s ? (lo(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= k(n) ? 8 : 16), qa > 0 && !o && q && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && q.push(c), c;
}
var to = no;
function no(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === ki) && (e = Ua), Za(e)) {
		let r = io(e, t, !0);
		return n && lo(r, n), qa > 0 && !a && q && (r.shapeFlag & 6 ? q[q.indexOf(e)] = r : q.push(r)), r.patchFlag = -2, r;
	}
	if (Mo(e) && (e = e.__vccOpts), t) {
		t = ro(t);
		let { class: e, style: n } = t;
		e && !k(e) && (t.class = Dt(e)), j(n) && (/* @__PURE__ */ tr(n) && !D(n) && (n = T({}, n)), t.style = St(n));
	}
	let o = k(e) ? 1 : Ba(e) ? 128 : ti(e) ? 64 : j(e) ? 4 : O(e) ? 2 : 0;
	return X(e, t, n, r, i, o, a, !0);
}
function ro(e) {
	return e ? /* @__PURE__ */ tr(e) || ma(e) ? T({}, e) : e : null;
}
function io(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? uo(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && $a(l),
		ref: t && t.ref ? n && a ? D(a) ? a.concat(eo(t)) : [a, eo(t)] : eo(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== K ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && io(e.ssContent),
		ssFallback: e.ssFallback && io(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && ri(u, c.clone(u)), u;
}
function ao(e = " ", t = 0) {
	return to(Ha, null, e, t);
}
function oo(e = "", t = !1) {
	return t ? (J(), Xa(Ua, null, e)) : to(Ua, null, e);
}
function so(e) {
	return e == null || typeof e == "boolean" ? to(Ua) : D(e) ? to(K, null, e.slice()) : Za(e) ? co(e) : to(Ha, null, String(e));
}
function co(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : io(e);
}
function lo(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (D(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), lo(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !ma(t) ? t._ctx = U : r === 3 && U && (U.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else O(t) ? (t = {
		default: t,
		_ctx: U
	}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [ao(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n;
}
function uo(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = Dt([t.class, r.class]));
		else if (e === "style") t.style = St([t.style, r.style]);
		else if (Xe(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(D(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !Ze(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function fo(e, t, n, r = null) {
	Sr(e, t, 7, [n, r]);
}
var po = Xi(), mo = 0;
function ho(e, t, n) {
	let r = e.type, i = (t ? t.appContext : e.appContext) || po, a = {
		uid: mo++,
		vnode: e,
		type: r,
		parent: t,
		appContext: i,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new Lt(!0),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: t ? t.provides : Object.create(i.provides),
		ids: t ? t.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: ba(r, i),
		emitsOptions: ra(r, i),
		emit: null,
		emitted: null,
		propsDefaults: w,
		inheritAttrs: r.inheritAttrs,
		ctx: w,
		data: w,
		props: w,
		attrs: w,
		slots: w,
		refs: w,
		setupState: w,
		setupContext: null,
		suspense: n,
		suspenseId: n ? n.pendingId : 0,
		asyncDep: null,
		asyncResolved: !1,
		isMounted: !1,
		isUnmounted: !1,
		isDeactivated: !1,
		bc: null,
		c: null,
		bm: null,
		m: null,
		bu: null,
		u: null,
		um: null,
		bum: null,
		da: null,
		a: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	return a.ctx = { _: a }, a.root = t ? t.root : a, a.emit = ta.bind(null, a), e.ce && e.ce(a), a;
}
var Z = null, go = () => Z || U, _o, vo;
{
	let e = xt(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	_o = t("__VUE_INSTANCE_SETTERS__", (e) => Z = e), vo = t("__VUE_SSR_SETTERS__", (e) => So = e);
}
var yo = (e) => {
	let t = Z;
	return _o(e), e.scope.on(), () => {
		e.scope.off(), _o(t);
	};
}, bo = () => {
	Z && Z.scope.off(), _o(null);
};
function xo(e) {
	return e.vnode.shapeFlag & 4;
}
var So = !1;
function Co(e, t = !1, n = !1) {
	t && vo(t);
	let { props: r, children: i } = e.vnode, a = xo(e);
	ha(e, r, a, t), Oa(e, i, n || t);
	let o = a ? wo(e, t) : void 0;
	return t && vo(!1), o;
}
function wo(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Pi);
	let { setup: r } = n;
	if (r) {
		nn();
		let n = e.setupContext = r.length > 1 ? Ao(e) : null, i = yo(e), a = xr(r, e, 0, [e.props, n]), o = rt(a);
		if (rn(), i(), (o || e.sp) && !di(e) && ai(e), o) {
			if (a.then(bo, bo), t) return a.then((n) => {
				To(e, n, t);
			}).catch((t) => {
				Cr(t, e, 0);
			});
			e.asyncDep = a;
		} else To(e, a, t);
	} else Oo(e, t);
}
function To(e, t, n) {
	O(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : j(t) && (e.setupState = lr(t)), Oo(e, n);
}
var Eo, Do;
function Oo(e, t, n) {
	let r = e.type;
	if (!e.render) {
		if (!t && Eo && !r.render) {
			let t = r.template || Vi(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: i } = e.appContext.config, { delimiters: a, compilerOptions: o } = r;
				r.render = Eo(t, T(T({
					isCustomElement: n,
					delimiters: a
				}, i), o));
			}
		}
		e.render = r.render || Je, Do && Do(e);
	}
	{
		let t = yo(e);
		nn();
		try {
			Li(e);
		} finally {
			rn(), t();
		}
	}
}
var ko = { get(e, t) {
	return L(e, "get", ""), e[t];
} };
function Ao(e) {
	return {
		attrs: new Proxy(e.attrs, ko),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function jo(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(lr(nr(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in Mi) return Mi[n](e);
		},
		has(e, t) {
			return t in e || t in Mi;
		}
	}) : e.proxy;
}
function Mo(e) {
	return O(e) && "__vccOpts" in e;
}
var No = (e, t) => /* @__PURE__ */ mr(e, t, So), Po = "3.5.38", Fo = void 0, Io = typeof window < "u" && window.trustedTypes;
if (Io) try {
	Fo = /* @__PURE__ */ Io.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var Lo = Fo ? (e) => Fo.createHTML(e) : (e) => e, Ro = "http://www.w3.org/2000/svg", zo = "http://www.w3.org/1998/Math/MathML", Bo = typeof document < "u" ? document : null, Vo = Bo && /* @__PURE__ */ Bo.createElement("template"), Ho = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? Bo.createElementNS(Ro, e) : t === "mathml" ? Bo.createElementNS(zo, e) : n ? Bo.createElement(e, { is: n }) : Bo.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => Bo.createTextNode(e),
	createComment: (e) => Bo.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => Bo.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
		else {
			Vo.innerHTML = Lo(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Vo.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Uo = /* @__PURE__ */ Symbol("_vtc");
function Wo(e, t, n) {
	let r = e[Uo];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var Go = /* @__PURE__ */ Symbol("_vod"), Ko = /* @__PURE__ */ Symbol("_vsh"), qo = /* @__PURE__ */ Symbol(""), Jo = /(?:^|;)\s*display\s*:/;
function Yo(e, t, n) {
	let r = e.style, i = k(n), a = !1;
	if (n && !i) {
		if (t) if (k(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? Zo(r, t, "");
		}
		else for (let e in t) n[e] ?? Zo(r, e, "");
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? Zo(r, i, "") : ts(e, i, !k(t) && t ? t[i] : void 0, o) || Zo(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[qo];
			e && (n += ";" + e), r.cssText = n, a = Jo.test(n);
		}
	} else t && e.removeAttribute("style");
	Go in e && (e[Go] = a ? r.display : "", e[Ko] && (r.display = "none"));
}
var Xo = /\s*!important$/;
function Zo(e, t, n) {
	if (D(n)) n.forEach((n) => Zo(e, t, n));
	else if (n ??= "", t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = es(e, t);
		Xo.test(n) ? e.setProperty(pt(r), n.replace(Xo, ""), "important") : e[r] = n;
	}
}
var Qo = [
	"Webkit",
	"Moz",
	"ms"
], $o = {};
function es(e, t) {
	let n = $o[t];
	if (n) return n;
	let r = M(t);
	if (r !== "filter" && r in e) return $o[t] = r;
	r = mt(r);
	for (let n = 0; n < Qo.length; n++) {
		let i = Qo[n] + r;
		if (i in e) return $o[t] = i;
	}
	return t;
}
function ts(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && k(r) && n === r;
}
var ns = "http://www.w3.org/1999/xlink";
function rs(e, t, n, r, i, a = kt(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(ns, t.slice(6, t.length)) : e.setAttributeNS(ns, t, n) : n == null || a && !At(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : A(n) ? String(n) : n);
}
function is(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Lo(n) : n);
		return;
	}
	let a = e.tagName;
	if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
		let r = a === "OPTION" ? e.getAttribute("value") || "" : e.value, i = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
		(r !== i || !("_value" in e)) && (e.value = i), n ?? e.removeAttribute(t), e._value = n;
		return;
	}
	let o = !1;
	if (n === "" || n == null) {
		let r = typeof e[t];
		r === "boolean" ? n = At(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function as(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function os(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var ss = /* @__PURE__ */ Symbol("_vei");
function cs(e, t, n, r, i = null) {
	let a = e[ss] || (e[ss] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = us(t);
		r ? as(e, n, a[t] = ms(r, i), s) : o && (os(e, n, o, s), a[t] = void 0);
	}
}
var ls = /(?:Once|Passive|Capture)$/;
function us(e) {
	let t;
	if (ls.test(e)) {
		t = {};
		let n;
		for (; n = e.match(ls);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
	}
	return [e[2] === ":" ? e.slice(3) : pt(e.slice(2)), t];
}
var ds = 0, fs = /* @__PURE__ */ Promise.resolve(), ps = () => ds ||= (fs.then(() => ds = 0), Date.now());
function ms(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (D(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && Sr(e, t, 5, a);
			}
		} else Sr(r, t, 5, [e]);
	};
	return n.value = e, n.attached = ps(), n;
}
var hs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, gs = (e, t, n, r, i, a) => {
	let o = i === "svg";
	t === "class" ? Wo(e, r, o) : t === "style" ? Yo(e, n, r) : Xe(t) ? Ze(t) || cs(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : _s(e, t, r, o)) ? (is(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && rs(e, t, r, o, a, t !== "value")) : e._isVueCE && (vs(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !k(r))) ? is(e, M(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), rs(e, t, r, o));
};
function _s(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && hs(t) && O(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return hs(t) && k(n) ? !1 : t in e;
}
function vs(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = M(t);
	return Array.isArray(n) ? n.some((e) => M(e) === r) : Object.keys(n).some((e) => M(e) === r);
}
var ys = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return D(t) ? (e) => _t(t, e) : t;
};
function bs(e) {
	e.target.composing = !0;
}
function xs(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var Ss = /* @__PURE__ */ Symbol("_assign");
function Cs(e, t, n) {
	return t && (e = e.trim()), n && (e = yt(e)), e;
}
var ws = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e[Ss] = ys(i);
		let a = r || i.props && i.props.type === "number";
		as(e, t ? "change" : "input", (t) => {
			t.target.composing || e[Ss](Cs(e.value, n, a));
		}), (n || a) && as(e, "change", () => {
			e.value = Cs(e.value, n, a);
		}), t || (as(e, "compositionstart", bs), as(e, "compositionend", xs), as(e, "change", xs));
	},
	mounted(e, { value: t }) {
		e.value = t ?? "";
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[Ss] = ys(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? yt(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, Ts = {
	deep: !0,
	created(e, t, n) {
		e[Ss] = ys(n), as(e, "change", () => {
			let t = e._modelValue, n = ks(e), r = e.checked, i = e[Ss];
			if (D(t)) {
				let e = Nt(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (tt(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(As(e, r));
		});
	},
	mounted: Es,
	beforeUpdate(e, t, n) {
		e[Ss] = ys(n), Es(e, t, n);
	}
};
function Es(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (D(t)) i = Nt(t, r.props.value) > -1;
	else if (tt(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = Mt(t, As(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var Ds = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		let i = tt(t);
		as(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? yt(ks(e)) : ks(e));
			e[Ss](e.multiple ? i ? new Set(t) : t : t[0]), e._assigning = !0, jr(() => {
				e._assigning = !1;
			});
		}), e[Ss] = ys(r);
	},
	mounted(e, { value: t }) {
		Os(e, t);
	},
	beforeUpdate(e, t, n) {
		e[Ss] = ys(n);
	},
	updated(e, { value: t }) {
		e._assigning || Os(e, t);
	}
};
function Os(e, t) {
	let n = e.multiple, r = D(t);
	if (!(n && !r && !tt(t))) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = ks(a);
			if (n) if (r) {
				let e = typeof o;
				e === "string" || e === "number" ? a.selected = t.some((e) => String(e) === String(o)) : a.selected = Nt(t, o) > -1;
			} else a.selected = t.has(o);
			else if (Mt(ks(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function ks(e) {
	return "_value" in e ? e._value : e.value;
}
function As(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var js = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], Ms = {
	stop: (e) => e.stopPropagation(),
	prevent: (e) => e.preventDefault(),
	self: (e) => e.target !== e.currentTarget,
	ctrl: (e) => !e.ctrlKey,
	shift: (e) => !e.shiftKey,
	alt: (e) => !e.altKey,
	meta: (e) => !e.metaKey,
	left: (e) => "button" in e && e.button !== 0,
	middle: (e) => "button" in e && e.button !== 1,
	right: (e) => "button" in e && e.button !== 2,
	exact: (e, t) => js.some((n) => e[`${n}Key`] && !t.includes(n))
}, Ns = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = Ms[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, Ps = /* @__PURE__ */ T({ patchProp: gs }, Ho), Fs;
function Is() {
	return Fs ||= Aa(Ps);
}
var Ls = ((...e) => {
	let t = Is().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = zs(e);
		if (!r) return;
		let i = t._component;
		!O(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, Rs(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function Rs(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function zs(e) {
	return k(e) ? document.querySelector(e) : e;
}
//#endregion
//#region node_modules/pinia/dist/pinia.mjs
var Bs = typeof window < "u", Vs, Hs = (e) => Vs = e, Us = Symbol();
function Ws(e) {
	return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Gs;
(function(e) {
	e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Gs ||= {});
var Ks = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function qs(e, { autoBom: t = !1 } = {}) {
	return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["﻿", e], { type: e.type }) : e;
}
function Js(e, t, n) {
	let r = new XMLHttpRequest();
	r.open("GET", e), r.responseType = "blob", r.onload = function() {
		$s(r.response, t, n);
	}, r.onerror = function() {
		console.error("could not download file");
	}, r.send();
}
function Ys(e) {
	let t = new XMLHttpRequest();
	t.open("HEAD", e, !1);
	try {
		t.send();
	} catch {}
	return t.status >= 200 && t.status <= 299;
}
function Xs(e) {
	try {
		e.dispatchEvent(new MouseEvent("click"));
	} catch {
		let t = new MouseEvent("click", {
			bubbles: !0,
			cancelable: !0,
			view: window,
			detail: 0,
			screenX: 80,
			screenY: 20,
			clientX: 80,
			clientY: 20,
			ctrlKey: !1,
			altKey: !1,
			shiftKey: !1,
			metaKey: !1,
			button: 0,
			relatedTarget: null
		});
		e.dispatchEvent(t);
	}
}
var Zs = typeof navigator == "object" ? navigator : { userAgent: "" }, Qs = /Macintosh/.test(Zs.userAgent) && /AppleWebKit/.test(Zs.userAgent) && !/Safari/.test(Zs.userAgent), $s = Bs ? typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Qs ? ec : "msSaveOrOpenBlob" in Zs ? tc : nc : () => {};
function ec(e, t = "download", n) {
	let r = document.createElement("a");
	r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin === location.origin ? Xs(r) : Ys(r.href) ? Js(e, t, n) : (r.target = "_blank", Xs(r))) : (r.href = URL.createObjectURL(e), setTimeout(function() {
		URL.revokeObjectURL(r.href);
	}, 4e4), setTimeout(function() {
		Xs(r);
	}, 0));
}
function tc(e, t = "download", n) {
	if (typeof e == "string") if (Ys(e)) Js(e, t, n);
	else {
		let t = document.createElement("a");
		t.href = e, t.target = "_blank", setTimeout(function() {
			Xs(t);
		});
	}
	else navigator.msSaveOrOpenBlob(qs(e, n), t);
}
function nc(e, t, n, r) {
	if (r ||= open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string") return Js(e, t, n);
	let i = e.type === "application/octet-stream", a = /constructor/i.test(String(Ks.HTMLElement)) || "safari" in Ks, o = /CriOS\/[\d]+/.test(navigator.userAgent);
	if ((o || i && a || Qs) && typeof FileReader < "u") {
		let t = new FileReader();
		t.onloadend = function() {
			let e = t.result;
			if (typeof e != "string") throw r = null, Error("Wrong reader.result type");
			e = o ? e : e.replace(/^data:[^;]*;/, "data:attachment/file;"), r ? r.location.href = e : location.assign(e), r = null;
		}, t.readAsDataURL(e);
	} else {
		let t = URL.createObjectURL(e);
		r ? r.location.assign(t) : location.href = t, r = null, setTimeout(function() {
			URL.revokeObjectURL(t);
		}, 4e4);
	}
}
var { assign: rc } = Object;
function ic() {
	let e = Rt(!0), t = e.run(() => /* @__PURE__ */ ar({})), n = [], r = [], i = nr({
		install(e) {
			Hs(i), i._a = e, e.provide(Us, i), e.config.globalProperties.$pinia = i, r.forEach((e) => n.push(e)), r = [];
		},
		use(e) {
			return this._a ? n.push(e) : r.push(e), this;
		},
		_p: n,
		_a: null,
		_e: e,
		_s: /* @__PURE__ */ new Map(),
		state: t
	});
	return i;
}
var ac = () => {};
function oc(e, t, n, r = ac) {
	e.add(t);
	let i = () => {
		e.delete(t) && r();
	};
	return !n && zt() && Bt(i), i;
}
function sc(e, ...t) {
	e.forEach((e) => {
		e(...t);
	});
}
var cc = (e) => e(), lc = Symbol(), uc = Symbol();
function dc(e, t) {
	e instanceof Map && t instanceof Map ? t.forEach((t, n) => e.set(n, t)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
	for (let n in t) {
		if (!t.hasOwnProperty(n)) continue;
		let r = t[n], i = e[n];
		Ws(i) && Ws(r) && e.hasOwnProperty(n) && !/* @__PURE__ */ B(r) && !/* @__PURE__ */ $n(r) ? e[n] = dc(i, r) : e[n] = r;
	}
	return e;
}
var fc = Symbol();
function pc(e) {
	return !Ws(e) || !Object.prototype.hasOwnProperty.call(e, fc);
}
var { assign: mc } = Object;
function hc(e) {
	return !!(/* @__PURE__ */ B(e) && e.effect);
}
function gc(e, t, n, r) {
	let { state: i, actions: a, getters: o } = t, s = n.state.value[e], c;
	function l() {
		return s || (n.state.value[e] = i ? i() : {}), mc(/* @__PURE__ */ ur(n.state.value[e]), a, Object.keys(o || {}).reduce((t, r) => (t[r] = nr(No(() => {
			Hs(n);
			let t = n._s.get(e);
			return o[r].call(t, t);
		})), t), {}));
	}
	return c = _c(e, l, t, n, r, !0), c;
}
function _c(e, t, n = {}, r, i, a) {
	let o, s = mc({ actions: {} }, n), c = { deep: !0 }, l, u, d = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), p = r.state.value[e];
	!a && !p && (r.state.value[e] = {});
	let m;
	function h(t) {
		let n;
		l = u = !1, typeof t == "function" ? (t(r.state.value[e]), n = {
			type: Gs.patchFunction,
			storeId: e,
			events: void 0
		}) : (dc(r.state.value[e], t), n = {
			type: Gs.patchObject,
			payload: t,
			storeId: e,
			events: void 0
		});
		let i = m = Symbol();
		jr().then(() => {
			m === i && (l = !0);
		}), u = !0, sc(d, n, r.state.value[e]);
	}
	let g = a ? function() {
		let { state: e } = n, t = e ? e() : {};
		this.$patch((e) => {
			mc(e, t);
		});
	} : ac;
	function _() {
		o.stop(), d.clear(), f.clear(), r._s.delete(e);
	}
	let v = (t, n = "") => {
		if (lc in t) return t[uc] = n, t;
		let i = function() {
			Hs(r);
			let n = Array.from(arguments), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
			function s(e) {
				a.add(e);
			}
			function c(e) {
				o.add(e);
			}
			sc(f, {
				args: n,
				name: i[uc],
				store: y,
				after: s,
				onError: c
			});
			let l;
			try {
				l = t.apply(this && this.$id === e ? this : y, n);
			} catch (e) {
				throw sc(o, e), e;
			}
			return l instanceof Promise ? l.then((e) => (sc(a, e), e)).catch((e) => (sc(o, e), Promise.reject(e))) : (sc(a, l), l);
		};
		return i[lc] = !0, i[uc] = n, i;
	}, y = /* @__PURE__ */ Yn({
		_p: r,
		$id: e,
		$onAction: oc.bind(null, f),
		$patch: h,
		$reset: g,
		$subscribe(t, n = {}) {
			let i = oc(d, t, n.detached, () => a()), a = o.run(() => Xr(() => r.state.value[e], (r) => {
				(n.flush === "sync" ? u : l) && t({
					storeId: e,
					type: Gs.direct,
					events: void 0
				}, r);
			}, mc({}, c, n)));
			return i;
		},
		$dispose: _
	});
	r._s.set(e, y);
	let b = (r._a && r._a.runWithContext || cc)(() => r._e.run(() => (o = Rt()).run(() => t({ action: v }))));
	for (let t in b) {
		let n = b[t];
		/* @__PURE__ */ B(n) && !hc(n) || /* @__PURE__ */ $n(n) ? a || (p && pc(n) && (/* @__PURE__ */ B(n) ? n.value = p[t] : dc(n, p[t])), r.state.value[e][t] = n) : typeof n == "function" && (b[t] = v(n, t), s.actions[t] = n);
	}
	return mc(y, b), mc(/* @__PURE__ */ z(y), b), Object.defineProperty(y, "$state", {
		get: () => r.state.value[e],
		set: (e) => {
			h((t) => {
				mc(t, e);
			});
		}
	}), r._p.forEach((e) => {
		mc(y, o.run(() => e({
			store: y,
			app: r._a,
			pinia: r,
			options: s
		})));
	}), p && a && n.hydrate && n.hydrate(y.$state, p), l = !0, u = !0, y;
}
function vc(e, t, n) {
	let r, i = typeof t == "function";
	r = i ? n : t;
	function a(n, a) {
		let o = qr();
		return n ||= o ? Kr(Us, null) : null, n && Hs(n), n = Vs, n._s.has(e) || (i ? _c(e, t, r, n) : gc(e, r, n)), n._s.get(e);
	}
	return a.$id = e, a;
}
//#endregion
//#region src/state/damage-console/index.ts
var yc = vc("damageConsole", () => {
	let e = /* @__PURE__ */ ar("1d10"), t = /* @__PURE__ */ ar("roll"), n = /* @__PURE__ */ ar(!1), r = /* @__PURE__ */ ar(!1), i = /* @__PURE__ */ ar(!1), a = /* @__PURE__ */ ar(!0), o = /* @__PURE__ */ ar(""), s = /* @__PURE__ */ ar([]), c = /* @__PURE__ */ ar([]), l = /* @__PURE__ */ ar(null), u;
	function d(e, t) {
		s.value = e, u = t;
	}
	async function f() {
		if (!u || i.value) return;
		o.value = "";
		let d = oe({
			damageFormula: e.value,
			hitLocation: t.value,
			ignoreArmour: n.value,
			ignoreToughness: r.value,
			minimumOne: a.value,
			targetUuids: s.value.map((e) => e.uuid),
			woundingType: l.value
		});
		if (c.value = se(d), !c.value.length) {
			i.value = !0;
			try {
				await u(d);
			} catch (e) {
				o.value = e instanceof Error ? e.message : String(e);
			} finally {
				i.value = !1;
			}
		}
	}
	return {
		damageFormula: e,
		hitLocation: t,
		ignoreArmour: n,
		ignoreToughness: r,
		initialize: d,
		isPosting: i,
		minimumOne: a,
		runtimeError: o,
		submit: f,
		targets: s,
		validationErrors: c,
		woundingType: l
	};
}), bc = {
	key: 0,
	role: "alert",
	class: "tw:dui-alert tw:dui-alert-error tw:text-sm"
}, xc = { key: 0 }, Sc = { class: "tw:dui-card tw:dui-card-border tw:dui-card-sm" }, Cc = { class: "tw:dui-card-body" }, wc = { class: "tw:dui-card-title tw:text-base" }, Tc = { class: "tw:grid tw:grid-cols-1 tw:gap-2 tw:sm:grid-cols-2" }, Ec = ["src"], Dc = { class: "tw:min-w-0 tw:truncate" }, Oc = { class: "tw:grid tw:grid-cols-1 tw:gap-4 tw:md:grid-cols-2" }, kc = { class: "tw:dui-fieldset tw:min-w-0 tw:rounded-box tw:border tw:border-base-300 tw:p-4" }, Ac = { class: "tw:dui-fieldset-legend" }, jc = {
	class: "tw:dui-label",
	for: "ech-damage-formula"
}, Mc = { class: "tw:dui-label tw:whitespace-normal" }, Nc = {
	class: "tw:dui-label",
	for: "ech-hit-location"
}, Pc = ["value"], Fc = {
	class: "tw:dui-label",
	for: "ech-wounding-type"
}, Ic = ["value"], Lc = { class: "tw:dui-label tw:whitespace-normal" }, Rc = { class: "tw:dui-fieldset tw:min-w-0 tw:rounded-box tw:border tw:border-base-300 tw:p-4" }, zc = { class: "tw:dui-fieldset-legend" }, Bc = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, Vc = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, Hc = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, Uc = {
	role: "alert",
	class: "tw:dui-alert tw:mt-2 tw:text-sm"
}, Wc = { class: "tw:flex tw:justify-end tw:gap-2" }, Gc = ["disabled"], Kc = ["disabled"], qc = /* @__PURE__ */ ii({
	__name: "DamageConsoleApp",
	props: {
		hitLocationOptions: {},
		localize: { type: Function },
		onCancel: { type: Function },
		onPost: { type: Function },
		targets: {},
		woundingTypeOptions: {}
	},
	setup(e) {
		let t = e, n = yc();
		n.initialize(t.targets, t.onPost);
		function r(e) {
			return t.localize(`WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.${e}`);
		}
		return (e, i) => (J(), Y("form", {
			class: "tw:flex tw:flex-col tw:gap-4 tw:rounded-box tw:bg-base-100 tw:p-4 tw:text-base-content",
			onSubmit: i[7] ||= Ns((...e) => V(n).submit && V(n).submit(...e), ["prevent"])
		}, [
			V(n).validationErrors.length || V(n).runtimeError ? (J(), Y("div", bc, [i[8] ||= X("i", {
				class: "fa-solid fa-triangle-exclamation",
				"aria-hidden": "true"
			}, null, -1), X("div", null, [(J(!0), Y(K, null, Ai(V(n).validationErrors, (e) => (J(), Y("p", { key: e }, N(r(`validation.${e}`)), 1))), 128)), V(n).runtimeError ? (J(), Y("p", xc, N(V(n).runtimeError), 1)) : oo("", !0)])])) : oo("", !0),
			X("section", Sc, [X("div", Cc, [X("h2", wc, [i[9] ||= X("i", {
				class: "fa-solid fa-crosshairs",
				"aria-hidden": "true"
			}, null, -1), ao(" " + N(r("targets")), 1)]), X("div", Tc, [(J(!0), Y(K, null, Ai(V(n).targets, (e) => (J(), Y("div", {
				key: e.uuid,
				class: "tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:rounded-sm tw:bg-base-200 tw:p-2"
			}, [X("img", {
				src: e.img,
				alt: "",
				class: "tw:h-9 tw:w-9 tw:rounded-sm tw:object-cover"
			}, null, 8, Ec), X("strong", Dc, N(e.name), 1)]))), 128))])])]),
			X("div", Oc, [X("fieldset", kc, [
				X("legend", Ac, N(r("damageDetails")), 1),
				X("label", jc, N(r("damage")), 1),
				Ur(X("input", {
					id: "ech-damage-formula",
					"onUpdate:modelValue": i[0] ||= (e) => V(n).damageFormula = e,
					class: "tw:dui-input tw:w-full",
					name: "damageFormula",
					placeholder: "1d10",
					required: "",
					type: "text"
				}, null, 512), [[ws, V(n).damageFormula]]),
				X("p", Mc, N(r("damageHint")), 1),
				X("label", Nc, N(r("hitLocation")), 1),
				Ur(X("select", {
					id: "ech-hit-location",
					"onUpdate:modelValue": i[1] ||= (e) => V(n).hitLocation = e,
					class: "tw:dui-select tw:w-full",
					name: "hitLocation"
				}, [(J(!0), Y(K, null, Ai(t.hitLocationOptions, (e) => (J(), Y("option", {
					key: e.value,
					value: e.value
				}, N(e.label), 9, Pc))), 128))], 512), [[Ds, V(n).hitLocation]]),
				X("label", Fc, N(r("woundingType")), 1),
				Ur(X("select", {
					id: "ech-wounding-type",
					"onUpdate:modelValue": i[2] ||= (e) => V(n).woundingType = e,
					class: "tw:dui-select tw:w-full",
					name: "woundingType"
				}, [(J(!0), Y(K, null, Ai(t.woundingTypeOptions, (e) => (J(), Y("option", {
					key: e.value ?? "unspecified",
					value: e.value
				}, N(e.label), 9, Ic))), 128))], 512), [[Ds, V(n).woundingType]]),
				X("p", Lc, N(r("woundingTypeHint")), 1)
			]), X("fieldset", Rc, [
				X("legend", zc, N(r("damageOptions")), 1),
				X("label", Bc, [X("span", null, N(r("ignoreToughness")), 1), Ur(X("input", {
					"onUpdate:modelValue": i[3] ||= (e) => V(n).ignoreToughness = e,
					class: "tw:dui-checkbox",
					name: "ignoreToughness",
					type: "checkbox"
				}, null, 512), [[Ts, V(n).ignoreToughness]])]),
				X("label", Vc, [X("span", null, N(r("ignoreArmour")), 1), Ur(X("input", {
					"onUpdate:modelValue": i[4] ||= (e) => V(n).ignoreArmour = e,
					class: "tw:dui-checkbox",
					name: "ignoreArmour",
					type: "checkbox"
				}, null, 512), [[Ts, V(n).ignoreArmour]])]),
				X("label", Hc, [X("span", null, N(r("minimumOne")), 1), Ur(X("input", {
					"onUpdate:modelValue": i[5] ||= (e) => V(n).minimumOne = e,
					class: "tw:dui-checkbox",
					name: "minimumOne",
					type: "checkbox"
				}, null, 512), [[Ts, V(n).minimumOne]])]),
				X("div", Uc, [i[10] ||= X("i", {
					class: "fa-solid fa-circle-info",
					"aria-hidden": "true"
				}, null, -1), X("span", null, N(r("postHint")), 1)])
			])]),
			X("div", Wc, [X("button", {
				class: "tw:dui-btn",
				type: "button",
				disabled: V(n).isPosting,
				onClick: i[6] ||= (...e) => t.onCancel && t.onCancel(...e)
			}, N(r("cancel")), 9, Gc), X("button", {
				class: "tw:dui-btn tw:dui-btn-primary",
				type: "submit",
				disabled: V(n).isPosting
			}, [X("i", {
				class: Dt(V(n).isPosting ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-message"),
				"aria-hidden": "true"
			}, null, 2), ao(" " + N(r("post")), 1)], 8, Kc)])
		], 32));
	}
});
//#endregion
//#region src/module/wfrp4e/damage-console/posting.ts
async function Jc(e) {
	Yc();
	let t = oe(e), n = se(t);
	if (n.length) throw Error(game.i18n.localize(`WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.validation.${n[0]}`));
	let r = ce(t, await Promise.all(t.targetUuids.map(async (e) => (await Ae(e)).snapshot))), i = Se(r), a = game.wfrp4e?.utility?.chatDataSetup?.(i) ?? { content: i };
	return ye(a, r), (await ChatMessage.create(a))?.id;
}
function Yc() {
	if (!game.user.isGM) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.gmOnly"));
}
//#endregion
//#region src/module/apps/FoundryVueApplication.ts
var Xc = class extends foundry.applications.api.ApplicationV2 {
	#e;
	getVueProps() {}
	async _renderHTML(e, t) {
		let n = document.createElement("div");
		return n.classList.add("wfrp4e-expanded-critical-hits-root"), n.dataset.theme = "wfrp4e-expanded-critical-hits", n;
	}
	_replaceHTML(e, t, n) {
		this.unmountVue(), t.classList.add("wfrp4e-expanded-critical-hits-app"), t.replaceChildren(e), this.#e = Ls(this.getVueComponent(), this.getVueProps() ?? {}), this.#e.use(ic()), this.#e.mount(e);
	}
	async _preClose(e) {
		this.unmountVue(), await super._preClose(e);
	}
	unmountVue() {
		this.#e?.unmount(), this.#e = void 0;
	}
}, Zc = {
	body: "Body",
	head: "Head",
	lArm: "Left Arm",
	lLeg: "Left Leg",
	rArm: "Right Arm",
	rLeg: "Right Leg",
	roll: "Roll"
}, Qc = class extends Xc {
	static DEFAULT_OPTIONS = {
		id: `${e}-damage-console`,
		position: {
			height: "auto",
			width: 620
		},
		tag: "section",
		window: {
			icon: "fa-solid fa-bolt",
			resizable: !0,
			title: "WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.title"
		}
	};
	#e;
	constructor(e) {
		super(), this.#e = e;
	}
	getVueComponent() {
		return qc;
	}
	getVueProps() {
		return {
			hitLocationOptions: $c(),
			localize: (e) => game.i18n.localize(e),
			onCancel: () => void this.close(),
			onPost: async (e) => {
				await Jc(e), await this.close();
			},
			targets: this.#e,
			woundingTypeOptions: el()
		};
	}
};
function $c() {
	return ae.map((e) => ({
		label: game.i18n.localize(Zc[e]),
		value: e
	}));
}
function el() {
	return [{
		label: game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.unspecified"),
		value: null
	}, ..._.map((e) => ({
		label: x[e],
		value: e
	}))];
}
//#endregion
//#region src/module/wfrp4e/damage-console/launch.ts
async function tl() {
	if (!game.user.isGM) {
		ui.notifications?.warn(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.gmOnly"));
		return;
	}
	let e = ke();
	if (!e.length) {
		ui.notifications?.warn(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.targetsRequired"));
		return;
	}
	await new Qc(e).render(!0);
}
//#endregion
//#region src/module/wfrp4e/damage-console/scene-controls.ts
function nl() {
	Hooks.on("getSceneControlButtons", (e) => {
		let t = e?.tokens?.tools;
		t && (t.expandedCriticalDamageConsole = {
			button: !0,
			icon: "fa-solid fa-bolt",
			name: "expandedCriticalDamageConsole",
			onClick: () => void tl(),
			title: "WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.sceneControl",
			visible: game.user.isGM
		});
	});
}
//#endregion
//#region src/module/wfrp4e/damage-console/index.ts
var rl = !1;
function il() {
	rl ||= (Ve(), nl(), !0);
}
//#endregion
//#region src/functions/critical-hits/damage-inference/index.ts
var al = {
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
}, ol = {
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
function sl(e) {
	if (e.explicitCategories.length > 0) return {
		categories: pl(e.explicitCategories),
		matches: [],
		source: "explicit"
	};
	if (e.inferFromWeaponProperties) {
		let t = dl(e.weaponPropertyKeys, e.weaponPropertyMapping);
		if (t.length > 0) return {
			categories: fl(t),
			matches: t,
			source: "weaponProperty"
		};
	}
	if (e.inferFromWeaponTypes) {
		let t = dl(e.weaponTypeKeys, e.weaponTypeMapping);
		if (t.length > 0) return {
			categories: fl(t),
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
function cl(e) {
	return e.trim().toLowerCase().replaceAll(/[^a-z0-9]/g, "");
}
function ll(e) {
	let t = ul(e), n = {};
	for (let [e, r] of Object.entries(t ?? {})) hl(r) && (n[cl(e)] = r);
	return n;
}
function ul(e) {
	if (typeof e == "string") try {
		return ul(JSON.parse(e));
	} catch {
		return;
	}
	if (typeof e == "object" && e && !Array.isArray(e)) return e;
}
function dl(e, t) {
	let n = ll(t), r = e.flatMap((e) => {
		let t = n[cl(e)];
		return t && t !== "none" ? [{
			category: t,
			key: e
		}] : [];
	}), i = /* @__PURE__ */ new Set();
	return g.flatMap((e) => r.filter((t) => {
		let n = `${e}:${cl(t.key)}`;
		return t.category !== e || i.has(n) ? !1 : (i.add(n), !0);
	}));
}
function fl(e) {
	return pl(e.map((e) => e.category));
}
function pl(e) {
	let t = new Set(e);
	return g.filter((e) => t.has(e));
}
function ml(e) {
	return typeof e == "string" && g.includes(e);
}
function hl(e) {
	return e === "none" || ml(e);
}
//#endregion
//#region src/functions/critical-hits/natural-one-critical/index.ts
function gl(e) {
	let t = Number(e.roll), n = Number(e.target);
	return t === 1 && t <= n;
}
//#endregion
//#region src/functions/critical-hits/table-keys.ts
function _l(e, t, n) {
	return `ech-crit-${e}-${t}-${n}`.toLowerCase();
}
function vl(e) {
	let t = e.toLowerCase();
	if (t === "head" || t === "body") return t;
	if (t.endsWith("arm")) return "arm";
	if (t.endsWith("leg")) return "leg";
}
function yl(e) {
	return e ? "upInArms" : "core";
}
//#endregion
//#region src/module/settings.ts
var bl = "enableCriticalReplacement", xl = "enableNaturalOneCriticals", Sl = "inferDamageFromWeaponProperties", Cl = "inferDamageFromWeaponTypes", wl = "weaponPropertyDamageMapping", Tl = "weaponTypeDamageMapping", El = JSON.stringify(al), Dl = JSON.stringify(ol), Ol = JSON.stringify({
	hack: "cutting",
	impale: "piercing",
	pummel: "crushing",
	slash: "cutting"
});
function kl() {
	game.settings.register(e, n, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.debugConsoleLogging.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.debugConsoleLogging.hint",
		scope: "client",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, bl, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, xl, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableNaturalOneCriticals.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableNaturalOneCriticals.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, Sl, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponProperties.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponProperties.hint",
		scope: "world",
		config: !0,
		default: !0,
		type: Boolean
	}), game.settings.register(e, wl, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponPropertyDamageMapping.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponPropertyDamageMapping.hint",
		scope: "world",
		config: !1,
		default: El,
		type: String
	}), game.settings.register(e, Cl, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponTypes.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponTypes.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, Tl, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponTypeDamageMapping.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponTypeDamageMapping.hint",
		scope: "world",
		config: !1,
		default: Dl,
		type: String
	}), r(`${e} | Settings registered`, zl());
}
function Al() {
	return !!game.settings.get(e, bl);
}
function jl() {
	return !!game.settings.get(e, xl);
}
async function Ml() {
	if (!game.user.isGM) {
		r(`${e} | Skipping mapping setting normalization for non-GM user.`);
		return;
	}
	r(`${e} | Normalizing stored mapping settings.`), await Ll(wl, El), await Ll(Tl, Dl), r(`${e} | Mapping settings normalized`, zl());
}
function Nl() {
	return !!game.settings.get(e, Sl);
}
function Pl() {
	return !!game.settings.get(e, Cl);
}
function Fl() {
	return ll(game.settings.get(e, wl));
}
function Il() {
	return ll(game.settings.get(e, Tl));
}
async function Ll(t, n) {
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
	t === "weaponPropertyDamageMapping" && Rl(i, Ol) && (r(`${e} | Upgrading untouched weapon property mapping defaults`, { key: t }), await game.settings.set(e, t, n));
}
function Rl(e, t) {
	return JSON.stringify(ll(e)) === t;
}
function zl() {
	return {
		debugConsoleLogging: Vl(n),
		enableCriticalReplacement: Vl(bl),
		enableNaturalOneCriticals: Vl(xl),
		inferDamageFromWeaponProperties: Vl(Sl),
		inferDamageFromWeaponTypes: Vl(Cl),
		weaponPropertyDamageMapping: Bl(wl),
		weaponTypeDamageMapping: Bl(Tl)
	};
}
function Bl(e) {
	let t = Vl(e);
	return {
		key: e,
		type: typeof t,
		value: t
	};
}
function Vl(t) {
	try {
		return game.settings.settings.has(`wfrp4e-expanded-critical-hits.${t}`) ? game.settings.get(e, t) : "<not registered>";
	} catch (e) {
		return `<error: ${e instanceof Error ? e.message : String(e)}>`;
	}
}
//#endregion
//#region src/module/wfrp4e/natural-one-critical.ts
var Hl = Symbol.for(`${e}.naturalOneCriticalPatch`), Ul = {
	installed: !1,
	message: "Natural 1 critical patch has not run."
};
function Wl() {
	return { ...Ul };
}
function Gl() {
	let t = game.wfrp4e?.rolls;
	if (!t?.TestWFRP) {
		Ql(!1, "WFRP4e roll classes were not available.");
		return;
	}
	let n = Kl(t.TestWFRP), r = ql([t.WeaponTest, t.TraitTest]);
	Ul = {
		installed: n,
		message: n ? `Natural 1 critical patch installed. Attack wrappers installed: ${r}.` : "TestWFRP.isCriticalFumble could not be patched."
	}, n || a(`${e} | ${Ul.message}`);
}
function Kl(e) {
	let t = e.prototype;
	if (Zl(t).isCriticalFumble) return !0;
	let n = Object.getOwnPropertyDescriptor(t, "isCriticalFumble");
	return n?.get ? (Object.defineProperty(t, "isCriticalFumble", {
		configurable: n.configurable,
		enumerable: n.enumerable,
		get() {
			return Jl(this) ? "critical" : n.get?.call(this);
		}
	}), Xl(t, "isCriticalFumble"), !0) : !1;
}
function ql(e) {
	let t = 0;
	for (let n of e) {
		let e = n?.prototype;
		if (!e || Zl(e).computeProperties) continue;
		let r = e.computeProperties;
		r && (e.computeProperties = function(...e) {
			Jl(this) && Yl(this);
			let t = r.apply(this, e);
			return Jl(this) && Yl(this), t;
		}, Xl(e, "computeProperties"), t += 1);
	}
	return t;
}
function Jl(e) {
	return jl() && gl({
		roll: e.result?.roll,
		target: e.result?.target
	});
}
function Yl(e) {
	e.result && (e.result.color_green = !0, e.result.critical ||= game.i18n.localize("Critical"));
}
function Xl(e, t) {
	let n = Zl(e);
	n[t] = !0, Object.defineProperty(e, Hl, {
		configurable: !0,
		value: n
	});
}
function Zl(e) {
	return Object.prototype.hasOwnProperty.call(e, Hl) ? Reflect.get(e, Hl) : {};
}
function Ql(t, n) {
	Ul = {
		installed: t,
		message: n
	}, a(`${e} | ${n}`);
}
//#endregion
//#region src/module/api/create-module-api.ts
function $l() {
	return {
		getExpandedCriticalsCompendiumStatus: f,
		getNaturalOneCriticalPatchStatus: Wl,
		launchDamageConsole: tl,
		postDamageConsoleCard: Jc
	};
}
//#endregion
//#region src/module/api/register-module-api.ts
function eu() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let t = game.modules.get(e);
	if (!t) throw Error(`Foundry module registry entry was not found for ${e}.`);
	t.api = $l();
}
//#endregion
//#region src/module/wfrp4e/critical-replacement/debug.ts
function tu(e) {
	return {
		criticalLocation: e.criticalLocation,
		messageId: e.messageId,
		returnResult: e.returnResult,
		sourceItemUuid: e.sourceItemUuid
	};
}
function nu(e) {
	let t = ru(e);
	if (t) return {
		id: t.id,
		name: t.name,
		type: t.type,
		uuid: t.uuid
	};
}
function ru(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/critical-replacement/failure.ts
function iu(t, n, r) {
	return o(`${e} | ${t}`, r), ui.notifications?.error(t), [
		"<div class=\"wfrp4e chat-card\">",
		"<h3>Expanded Critical Hit Failed</h3>",
		`<p>${au(t)}</p>`,
		`<p><strong>Table:</strong> ${au(n)}</p>`,
		"</div>"
	].join("");
}
function au(e) {
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
function ou(e, t) {
	if (!lu(e)) return;
	let n = t.criticalLocation;
	if (e.type !== "critical" || typeof n != "string") return e;
	let r = e.toObject, i = Item?.implementation;
	if (typeof r != "function" || typeof i != "function") return e;
	let a = r.call(e), o = su(su(a, "system"), "location"), s = game.wfrp4e?.config?.locations ?? {};
	return o.key = n, o.value = s[n] ?? n, new i(a);
}
function su(e, t) {
	let n = cu(e[t]);
	if (n) return n;
	let r = {};
	return e[t] = r, r;
}
function cu(e) {
	return typeof e == "object" && e ? e : void 0;
}
function lu(e) {
	let t = e;
	return typeof t == "object" && !!t && typeof t.postItem == "function";
}
//#endregion
//#region src/module/wfrp4e/runtime-values.ts
function uu(e) {
	return Array.isArray(e) ? e : [];
}
function Q(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/quality-extraction.ts
function du(e) {
	let t = fu(e);
	return {
		explicitCategories: re(t),
		weaponPropertyKeys: t,
		weaponTypeKeys: hu(e)
	};
}
function fu(e) {
	let t = Q(e), n = Q(t?.system), r = Q(t?.properties), i = Q(n?.properties), a = [Q(r?.qualities), Q(i?.qualities)], o = /* @__PURE__ */ new Set();
	for (let e of a) for (let t of Object.keys(e ?? {})) o.add(t);
	let s = uu(Q(n?.qualities)?.value);
	for (let e of s) {
		let t = Q(e), n = t?.name;
		typeof n == "string" && pu(t) && o.add(n);
	}
	return [...o];
}
function pu(e) {
	let t = e?.group;
	return mu(t) ? e?.active === !0 : !0;
}
function mu(e) {
	return typeof e == "number" ? Number.isFinite(e) : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e));
}
function hu(e) {
	let t = Q(Q(e)?.system), n = /* @__PURE__ */ new Set();
	for (let e of [
		t?.weaponGroup,
		t?.group,
		t?.weaponType,
		t?.weaponClass,
		t?.ammunitionGroup,
		t?.ammoGroup,
		t?.category
	]) gu(e, n);
	return [...n];
}
function gu(e, t) {
	if (typeof e == "string") {
		t.add(e);
		return;
	}
	if (Array.isArray(e)) {
		for (let n of e) gu(n, t);
		return;
	}
	let n = Q(e);
	if (n) for (let e of [
		"key",
		"id",
		"name",
		"label",
		"value",
		"type"
	]) gu(n[e], t);
}
//#endregion
//#region src/module/wfrp4e/damage-category-resolution.ts
function _u(e) {
	let t = du(e);
	return {
		clues: t,
		resolution: sl({
			...t,
			inferFromWeaponProperties: Nl(),
			inferFromWeaponTypes: Pl(),
			weaponPropertyMapping: Fl(),
			weaponTypeMapping: Il()
		})
	};
}
//#endregion
//#region src/module/wfrp4e/critical-replacement.ts
var vu = !1;
function yu() {
	if (vu) {
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
		let s = wu(t);
		if (!Al() || !s) return s && r(`${e} | Critical replacement fallthrough`, {
			table: t,
			reason: "replacement disabled",
			options: tu(a)
		}), i(t, a, o);
		let c = Su(t, a), l = ve(a.messageId), u, d, f, p = l?.category;
		if (r(`${e} | Critical replacement inspecting WFRP critical roll`, {
			table: t,
			location: c,
			options: tu(a)
		}), !p) {
			try {
				u = await Cu(a);
			} catch (e) {
				return iu("Expanded Critical Hits could not resolve the critical source item. See the browser console for details.", t, e);
			}
			let e = _u(u);
			d = e.clues, f = e.resolution, p = ie(e.resolution.categories);
		}
		if (r(`${e} | Critical replacement damage category resolution`, {
			table: t,
			location: c,
			sourceItem: nu(u),
			categoryClues: d,
			categoryResolution: f,
			chosenCategory: p,
			damageConsoleSource: l,
			inferFromWeaponProperties: Nl(),
			inferFromWeaponTypes: Pl()
		}), !c || !p) return r(`${e} | Critical replacement fallthrough`, {
			table: t,
			reason: c ? "damage category unavailable" : "location unavailable"
		}), i(t, a, o);
		let m = yl(!!game.settings.get("wfrp4e", "uiaCrits")), h = _l(m, p, c);
		if (!n(h)) return iu(`Expanded Critical Hits table ${h} is missing from the module compendium.`, h);
		r(`${e} | Critical replacement rolling expanded table`, {
			table: t,
			expandedTableKey: h,
			ruleset: m,
			category: p,
			location: c
		});
		try {
			let e = await bu(h, a, o);
			if (e !== void 0) return e;
		} catch (e) {
			return iu(`Expanded Critical Hits could not roll ${h}. See the browser console for details.`, h, e);
		}
		return iu(`Expanded Critical Hits could not use WFRP's RollTable API for ${h}.`, h);
	}, vu = !0, r(`${e} | Critical replacement patch installed.`);
}
async function bu(e, t, n) {
	let r = game.wfrp4e?.tables?.rollTable;
	if (typeof r != "function") return;
	let i = await r.call(game.wfrp4e.tables, e, t, n);
	if (await xu(i, t)) return null;
	let a = Tu(i);
	return t.returnResult ? i : a?.result;
}
async function xu(t, n) {
	let i = Tu(Tu(t)?.object)?.documentUuid;
	if (typeof i != "string") return r(`${e} | Expanded critical result had no document UUID`, { result: t }), !1;
	let a = ou(await fromUuid(i), n);
	if (!a) throw Error(`Could not resolve expanded critical item ${i}.`);
	return r(`${e} | Posting expanded critical item`, {
		documentUuid: i,
		messageId: n.messageId,
		criticalLocation: n.criticalLocation
	}), await a.postItem(void 0, { "flags.wfrp4e.sourceMessageId": n.messageId }), !0;
}
function Su(e, t) {
	let n = t.criticalLocation;
	return vl(typeof n == "string" ? n : e.replace(/^crit/i, ""));
}
async function Cu(e) {
	let t = e.sourceItemUuid;
	if (typeof t == "string") return await fromUuid(t);
	let n = e.messageId;
	if (typeof n != "string") return;
	let r = Tu(Tu(game.messages.get(n)?.system)?.test), i = Tu(r?.preData);
	return r?.item ?? r?.weapon ?? i?.item;
}
function wu(e) {
	return /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function Tu(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/support.ts
var Eu = "ech-wounding-properties", Du = new Set(Object.values(y));
function Ou(e) {
	let t = { ...e };
	for (let e of _) t[y[e]] = x[e];
	return t;
}
function ku(e) {
	return Pu(e) || Fu(e);
}
function Au(e) {
	return e?.type === "spell" || e?.type === "prayer";
}
function ju(e) {
	let t = uu(Q(Q(e?.system)?.qualities)?.value), n = [];
	for (let e of t) {
		let t = Q(e)?.name;
		if (typeof t != "string") continue;
		let r = Ru(t);
		r && n.push(x[r]);
	}
	return n;
}
function Mu(e) {
	if (!(typeof e != "object" || !e)) return e;
}
function Nu(e) {
	if (typeof e != "object" || !e) return;
	let t = e;
	if (!(t.qualities !== void 0 && !Array.isArray(t.qualities))) return t;
}
function Pu(e) {
	return e?.type === "weapon" || e?.type === "ammunition" || e?.system?.isWeapon === !0;
}
function Fu(e) {
	return (e?.type === "spell" || e?.type === "prayer") && Iu(e.system);
}
function Iu(e) {
	let t = Q(e?.damage), n = Q(e?.magicMissile);
	return Lu(t?.value) || Lu(t?.dice) || t?.addSL === !0 || n?.value === !0;
}
function Lu(e) {
	return typeof e == "number" ? e !== 0 : typeof e == "string" && e.trim().length > 0;
}
function Ru(e) {
	return _.find((t) => y[t] === e);
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/actions.ts
var zu = `.${Eu}__sheet-row a[data-ech-action="configureProperties"]`, Bu = /* @__PURE__ */ new Map(), Vu = !1;
function Hu() {
	Vu ||= (document.addEventListener("click", Ku, !0), !0);
}
function Uu(e) {
	return e?.uuid;
}
function Wu(e, t) {
	Bu.set(e, t);
}
function Gu(e) {
	let t = Yu();
	!e || !t || new t(e).render(!0);
}
function Ku(e) {
	let t = qu(e.target);
	t && (e.preventDefault(), e.stopPropagation(), Ju(t));
}
function qu(e) {
	if (e instanceof Element) return e.closest(zu) ?? void 0;
}
async function Ju(e) {
	let t = e.closest(`.${Eu}__sheet-row`)?.dataset.echItemUuid;
	if (!t) return;
	let n = await fromUuid(t);
	if (!Zu(n)) return;
	let r = Bu.get(t);
	if (r) {
		r(n);
		return;
	}
	Gu(n);
}
function Yu() {
	let e = game.wfrp4e?.apps?.ItemProperties;
	if (Xu(e)) return e;
}
function Xu(e) {
	return typeof e == "function";
}
function Zu(e) {
	return typeof e == "object" && !!e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/actor-sheet.ts
var Qu = /* @__PURE__ */ new WeakSet();
function $u(e, t) {
	if (!(t instanceof HTMLElement)) return;
	let n = ed(t, "combat"), r = ed(t, "trappings");
	n && (td(n), nd(e, n)), r && (rd(e, r), !Qu.has(r) && (new MutationObserver(() => {
		rd(e, r);
	}).observe(r, {
		childList: !0,
		subtree: !0
	}), Qu.add(r)));
}
function ed(e, t) {
	return e.matches(`section[data-tab="${t}"]`) ? e : e.querySelector(`section[data-tab="${t}"]`) ?? void 0;
}
function td(e) {
	let t = new Set(Object.values(x)), n = e.querySelectorAll(".item-property-row a[data-action=\"itemPropertyDropdown\"][data-type=\"qualities\"]");
	for (let e of n) t.has(e.textContent.trim()) && e.classList.add("ech-wounding-property-combat-text");
}
function nd(e, t) {
	let n = t.querySelectorAll(".list-row[data-uuid] .item-property-row:not([data-ech-inference-checked=\"true\"])");
	for (let t of n) {
		t.dataset.echInferenceChecked = "true";
		let n = od(e, t);
		if (ld(n)) for (let e of n.categories) t.append(ud("combat", e, n));
	}
}
function rd(e, t) {
	id(t), ad(e, t);
}
function id(e) {
	let t = new Set(Object.values(x)), n = e.querySelectorAll(".tags .tag:not(.ech-inferred-damage-type)");
	for (let e of n) t.has(e.textContent.trim()) && e.classList.add("ech-wounding-property-trappings-badge");
}
function ad(e, t) {
	let n = t.querySelectorAll(".list-row[data-uuid] .tags:not([data-ech-inference-checked=\"true\"])");
	for (let t of n) {
		t.dataset.echInferenceChecked = "true";
		let n = od(e, t);
		if (ld(n)) for (let e of n.categories) t.append(ud("trappings", e, n));
	}
}
function od(t, n) {
	let i = n.closest(".list-row[data-uuid]")?.dataset.uuid;
	if (i) try {
		let n = sd(t, i);
		if (!cd(n)) {
			r(`${e} | Inferred damage display skipped for ${i}: item unavailable or unsupported.`);
			return;
		}
		let a = _u(n).resolution;
		return r(`${e} | Inferred damage display resolved ${i}: source=${a.source} categories=${a.categories.join(",") || "none"}`), a;
	} catch (t) {
		r(`${e} | Could not display inferred damage type`, {
			error: t,
			uuid: i
		});
		return;
	}
}
function sd(e, t) {
	let n = Q(e), r = Q((Q(n?.actor) ?? Q(n?.document))?.items), i = r?.get, a = t.split(".").at(-1);
	if (!(typeof i != "function" || !a)) return i.call(r, a);
}
function cd(e) {
	let t = Q(e), n = Q(t?.system);
	return t?.type === "weapon" || t?.type === "ammunition" || n?.isWeapon === !0;
}
function ld(e) {
	return e?.source === "weaponProperty" || e?.source === "weaponType";
}
function ud(e, t, n) {
	let r = document.createElement(e === "combat" ? "span" : "div"), i = dd(t, n.source, n.matches);
	return r.classList.add("ech-inferred-damage-type", `ech-inferred-damage-type--${e}`), e === "trappings" && r.classList.add("tag"), r.dataset.echDamageCategory = t, r.dataset.tooltip = i, r.setAttribute("aria-label", i), r.textContent = b[t], r;
}
function dd(e, t, n) {
	let r = n.filter((t) => t.category === e).map((e) => fd(e.key, t)), i = t === "weaponProperty" ? "item property" : "weapon type";
	return r.length > 0 ? `Inferred from ${r.join(", ")}` : `Inferred from ${i}`;
}
function fd(e, t) {
	if (t === "weaponProperty") {
		let t = game.wfrp4e?.utility?.qualityList?.() ?? {}, n = cl(e);
		for (let [e, r] of Object.entries(t)) if (cl(e) === n || cl(r) === n) return r;
	}
	return e.replaceAll(/([a-z])([A-Z])/g, "$1 $2").replaceAll(/[_-]+/g, " ").trim().replaceAll(/\b\w/g, (e) => e.toUpperCase());
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/debug.ts
function pd(e) {
	if (!(typeof e != "object" || !e)) return e.constructor?.name;
}
function md(e) {
	if (e) return {
		id: e.id,
		name: e.name,
		type: e.type,
		uuid: e.uuid
	};
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/sheet-box.ts
function hd(e, t, n) {
	let r = document.createElement("div");
	r.classList.add("attribute-box", "top-label", `${Eu}__sheet-row`);
	let i = Uu(n);
	i && (r.dataset.echItemUuid = i, Wu(i, _d(e, n)));
	let a = document.createElement("div");
	a.classList.add("label"), a.style.gridColumn = "1 / span 12", a.innerHTML = "<label><a data-ech-action=\"configureProperties\">Damage Type <i class=\"fas fa-cog\"></i></a></label>";
	let o = document.createElement("div");
	o.classList.add("field"), o.style.gridColumn = "1 / span 12";
	let s = document.createElement("input");
	return s.type = "text", s.value = t.join(","), s.readOnly = !0, o.append(s), r.append(a, o), gd(r, n), r;
}
function gd(e, t) {
	e.querySelector("a[data-ech-action=\"configureProperties\"]")?.addEventListener("click", (e) => {
		e.preventDefault(), Gu(t);
	});
}
function _d(e, t) {
	return vd(e) || ((e) => {
		Gu(e ?? t);
	});
}
function vd(e) {
	if (typeof e != "object" || !e) return;
	let t = e.constructor?.DEFAULT_OPTIONS?.actions?.configureProperties;
	if (typeof t == "function") return (e) => {
		t.call({ document: e });
	};
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/sheet.ts
function yd(t) {
	if (!(t instanceof HTMLElement)) {
		r(`${e} | ItemProperties render hook skipped: element is not HTMLElement`, { elementType: typeof t });
		return;
	}
	let n = t.querySelector(".property-column");
	if (!n) {
		r(`${e} | ItemProperties render hook skipped: quality column not found.`);
		return;
	}
	let i = xd(n);
	if (i.length === 0) {
		r(`${e} | ItemProperties render hook found no damage type rows`, { checkboxCount: n.querySelectorAll("input[type=\"checkbox\"]").length });
		return;
	}
	r(`${e} | Grouping ItemProperties damage type rows`, { woundingRowCount: i.length });
	let a = n.querySelector(`.${Eu}`), o = a ?? document.createElement("div");
	a || (o.classList.add(Eu), o.append(Sd()));
	for (let e of i) o.append(e);
	let s = n.querySelector("input[name=\"custom-quality\"]")?.parentElement;
	if (s) {
		s.before(o);
		return;
	}
	n.append(o);
}
function bd(t, n) {
	if (!(n instanceof HTMLElement)) {
		r(`${e} | Item sheet render hook skipped: element is not HTMLElement`, {
			applicationName: pd(t),
			elementType: typeof n
		});
		return;
	}
	let i = Mu(t), a = i?.document ?? i?.item;
	if (!ku(a)) {
		r(`${e} | Item sheet render hook skipped: unsupported document`, {
			applicationName: pd(t),
			document: md(a)
		});
		return;
	}
	r(`${e} | Item sheet render hook inspecting supported document`, {
		applicationName: pd(t),
		document: md(a)
	});
	let o = wd(n);
	if (!o) {
		r(`${e} | Item sheet qualities box not found; trying standalone damage row`, { document: md(a) }), Cd(t, n, a);
		return;
	}
	let s = o.querySelector(".field input");
	if (!s) {
		r(`${e} | Item sheet qualities input not found`, { document: md(a) });
		return;
	}
	let c = Td(s.value);
	if (c.wounding.length === 0) {
		r(`${e} | Item sheet qualities contain no damage type labels`, {
			document: md(a),
			displayedQualities: s.value
		});
		return;
	}
	r(`${e} | Splitting item sheet damage type labels into their own row`, {
		document: md(a),
		normalQualities: c.normal,
		woundingQualities: c.wounding
	}), s.value = c.normal.join(","), o.parentElement?.querySelector(`.${Eu}__sheet-row`)?.remove(), o.after(hd(t, c.wounding, a));
}
function xd(e) {
	let t = e.querySelectorAll("input[type=\"checkbox\"]"), n = [];
	for (let e of t) {
		if (!Du.has(e.name)) continue;
		let t = e.closest(".form-group");
		t && n.push(t);
	}
	return n;
}
function Sd() {
	let e = document.createElement("h2");
	return e.classList.add("property-header", `${Eu}__header`), e.textContent = "Damage Type", e;
}
function Cd(t, n, i) {
	if (!Au(i)) {
		r(`${e} | Standalone damage type row skipped: unsupported document`, { document: md(i) });
		return;
	}
	if (n.querySelector(".ech-wounding-properties__sheet-row")) {
		r(`${e} | Standalone damage type row skipped: row already exists`, { document: md(i) });
		return;
	}
	let a = Ed(n);
	if (!a) {
		r(`${e} | Standalone damage type row skipped: damage fieldset not found`, { document: md(i) });
		return;
	}
	let o = ju(i);
	r(`${e} | Appending standalone damage type row`, {
		document: md(i),
		labels: o
	}), a.after(hd(t, o, i));
}
function wd(e) {
	let t = e.querySelectorAll("a[data-action=\"configureProperties\"]");
	for (let e of t) if (e.textContent.trim().startsWith("Qualities")) return e.closest(".attribute-box") ?? void 0;
}
function Td(e) {
	let t = [], n = [], r = new Set(Object.values(x));
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
function Ed(e) {
	let t = e.querySelectorAll("fieldset");
	for (let e of t) if (e.querySelector("legend")?.textContent.trim() === "Damage") return e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/display.ts
var Dd = !1, Od = Symbol.for(`${e}.woundingPropertiesContextPatched`);
function kd() {
	if (Hu(), Md(), Dd) {
		r(`${e} | Wounding property display hooks already installed.`);
		return;
	}
	Hooks.on("renderItemProperties", (e, t) => {
		yd(t);
	}), Hooks.on("renderApplicationV2", (e, t) => {
		bd(e, t), $u(e, t), jd(e) && Ad(e);
	}), Hooks.on("renderBaseWFRP4eActorSheet", (e, t) => {
		$u(e, t), Ad(e);
	}), Dd = !0, r(`${e} | Wounding property display hooks installed.`);
}
function Ad(t, n = 5) {
	typeof t != "object" || !t || requestAnimationFrame(() => {
		let i = t.element;
		if (i instanceof HTMLElement && i.isConnected) {
			r(`${e} | Styling committed WFRP actor sheet with ${i.querySelectorAll(".item-property-row").length} property rows.`), $u(t, i);
			return;
		}
		if (n > 1) {
			Ad(t, n - 1);
			return;
		}
		r(`${e} | Committed WFRP actor sheet element was unavailable.`);
	});
}
function jd(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e.actor;
	return typeof t == "object" && !!t;
}
function Md() {
	let t = Nd()?.prototype, n = t?._prepareContext;
	if (!t || !n) {
		r(`${e} | ItemProperties context patch skipped: application unavailable.`);
		return;
	}
	if (Pd(n)) {
		r(`${e} | ItemProperties context patch already installed.`);
		return;
	}
	let i = async function(...e) {
		let t = this.document;
		ku(t) && (this.qualities = Ou(this.qualities ?? {}));
		let r = await n.apply(this, e);
		return Fd(this, r), r;
	};
	Object.defineProperty(i, Od, { value: !0 }), t._prepareContext = i, r(`${e} | ItemProperties context patch installed.`);
}
function Nd() {
	let e = game.wfrp4e?.apps?.ItemProperties;
	return typeof e == "function" ? e : void 0;
}
function Pd(e) {
	return !!e[Od];
}
function Fd(t, n) {
	let i = Mu(t), a = Nu(n), o = i?.document;
	if (!i || !a || !ku(o)) {
		r(`${e} | Skipping ItemProperties damage type context append`, {
			applicationName: Id(t),
			hasItemProperties: !!i,
			hasRenderContext: !!a,
			document: Ld(o),
			supportsDamageTypeProperties: ku(o)
		});
		return;
	}
	r(`${e} | Appending damage types to ItemProperties context`, {
		applicationName: Id(t),
		document: Ld(o),
		originalQualityCount: Object.keys(i.qualities ?? {}).length,
		renderedQualityCount: a.qualities?.length ?? 0
	}), i.qualities = Ou(i.qualities ?? {}), a.qualities ??= [];
	for (let e of _) {
		let t = y[e];
		a.qualities.some((e) => e.key === t) || a.qualities.push({
			existing: i.document?.originalProperties?.qualities?.[t],
			hasValue: !1,
			key: t,
			name: x[e]
		});
	}
	r(`${e} | ItemProperties context after damage type append`, {
		document: Ld(o),
		renderedQualityCount: a.qualities.length
	});
}
function Id(e) {
	if (!(typeof e != "object" || !e)) return e.constructor?.name;
}
function Ld(e) {
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
var Rd = !1;
function zd() {
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
		let t = y[e];
		i[t] = "Expanded Critical Hits damage type marker. A critical hit may roll on the matching expanded critical table.", n[t] = !1;
	}
	r(`${e} | Damage qualities registered`, {
		count: _.length,
		qualityKeys: _.map((e) => y[e])
	}), Bd(), kd();
}
function Bd() {
	let t = game.wfrp4e?.utility, n = t?.qualityList;
	if (Rd || !t || !n) {
		r(`${e} | Quality list patch skipped`, {
			qualityListPatchInstalled: Rd,
			hasUtility: !!t,
			hasOriginalQualityList: !!n
		});
		return;
	}
	t.qualityList = function(e) {
		let t = n.call(this, e);
		return e === "armor" ? t : Ou(t);
	}, Rd = !0, r(`${e} | Quality list patch installed.`);
}
//#endregion
//#region src/module/wfrp4e/zero-wound-critical-links.ts
var Vd = "data-ech-source-item-uuid", Hd = "data-ech-critical-location", Ud = !1;
function Wd() {
	Ud ||= (Gd(), document.addEventListener("click", Yd, !0), !0);
}
function Gd() {
	let e = CONFIG.Actor?.documentClass?.prototype, t = e?.applyDamage;
	typeof t != "function" || !e || (e.applyDamage = async function(e, n = {}) {
		let r = await t.call(this, e, n), i = Kd(n);
		return typeof r != "string" || !i || !r.includes("critical-roll") ? r : Jd(r, i, qd(n));
	});
}
function Kd(e) {
	let t = $($(e.sourceTest)?.item), n = $($($(e.opposedTest)?.attackerTest)?.item), r = $(e.sourceItem), i = t?.uuid ?? n?.uuid ?? r?.uuid;
	return typeof i == "string" ? i : void 0;
}
function qd(e) {
	let t = $($(e.opposedTest)?.result)?.hitloc, n = $(t)?.value, r = e.loc, i;
	return typeof n == "string" ? i = n : typeof r == "string" && (i = r), i && vl(i) ? i : void 0;
}
function Jd(e, t, n) {
	let r = [`${Vd}="${ef(t)}"`, n ? `${Hd}="${ef(n)}"` : void 0].filter(Boolean).join(" ");
	return e.replaceAll(/<a\b(?![^>]*\bdata-ech-source-item-uuid=)(?=[^>]*\bcritical-roll\b)/g, `<a ${r}`);
}
function Yd(e) {
	let t = e.target;
	if (!(t instanceof Element) || !Al()) return;
	let n = t.closest(`[data-action="clickTable"][${Vd}]`);
	!(n instanceof HTMLElement) || !$d(n.dataset.table) || (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), Xd(n).catch((e) => {
		Zd("Expanded Critical Hits could not roll an annotated zero-wound critical. See the browser console for details.", e);
	}));
}
async function Xd(e) {
	let t = e.dataset.table, n = game.wfrp4e?.tables?.formatChatRoll;
	if (!t || typeof n != "function") return;
	let r = e.closest("[data-message-id]")?.dataset.messageId, i = Number.parseInt(e.dataset.modifier ?? "0", 10) || 0, a = await n(t, {
		criticalLocation: e.dataset.echCriticalLocation ?? Qd(r),
		messageId: r,
		modifier: i,
		showRoll: !0,
		sourceItemUuid: e.dataset.echSourceItemUuid
	}, e.dataset.column);
	if (typeof a != "string" || a.length === 0) return;
	let o = game.wfrp4e?.utility?.chatDataSetup, s = typeof o == "function" ? o("", game.settings.get("core", "rollMode"), !0) : { content: "" };
	s.content = a, await ChatMessage.create(s);
}
function Zd(t, n) {
	o(`${e} | ${t}`, n), ui.notifications?.error(t);
}
function Qd(e) {
	if (!e) return;
	let t = $($($(game.messages.get(e)?.system)?.test)?.result)?.hitloc, n = $(t)?.result;
	return typeof n == "string" ? n : void 0;
}
function $d(e) {
	return typeof e == "string" && /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function ef(e) {
	return e.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function $(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/hooks/register-module-hooks.ts
function tf() {
	Hooks.once("init", () => {
		i(`${e} | Initializing`), kl(), r(`${e} | init hook running`, {
			foundryVersion: game.version,
			systemId: game.system?.id,
			userIsGM: game.user?.isGM
		}), kd(), il(), zd();
	}), Hooks.once("ready", () => {
		nf();
	});
}
async function nf() {
	if (r(`${e} | ready hook running`, {
		foundryVersion: game.version,
		systemId: game.system?.id,
		userIsGM: game.user?.isGM,
		settings: zl(),
		wfrpConfigAvailable: !!game.wfrp4e?.config,
		wfrpTablesAvailable: !!game.wfrp4e?.tables
	}), game.system.id !== "wfrp4e") {
		a(`${e} | Loaded outside ${t}; skipping WFRP integration.`);
		return;
	}
	eu(), await Ml(), r(`${e} | ready hook after mapping normalization`, { settings: zl() }), zd(), await d(), Gl(), yu(), Wd(), i(`${e} | Ready`);
}
//#endregion
//#region src/main.ts
tf();
//#endregion

//# sourceMappingURL=wfrp4e-expanded-critical-hits.mjs.map