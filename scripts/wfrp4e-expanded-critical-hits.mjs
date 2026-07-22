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
}, ee = {
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
}, b = {
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
}, te = {
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
}, ne = new Map(_.map((e) => [y[e], te[e]])), re = new Map(g.map((e) => [v[e], e]));
function ie(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = ne.get(n) ?? re.get(n);
		e && t.add(e);
	}
	return g.filter((e) => t.has(e));
}
function ae(e, t = Math.random()) {
	if (e.length !== 0) return e[Math.min(Math.floor(t * e.length), e.length - 1)];
}
var oe = [
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
function se(e) {
	return {
		...e,
		damageFormula: e.damageFormula.trim(),
		rollSeparately: e.rollSeparately !== !1,
		targetUuids: [...new Set(e.targetUuids.map((e) => e.trim()).filter(Boolean))]
	};
}
function ce(e) {
	let t = [];
	return e.damageFormula.trim() || t.push("damageFormulaRequired"), oe.includes(e.hitLocation) || t.push("hitLocationInvalid"), e.targetUuids.every((e) => !e.trim()) && t.push("targetsRequired"), e.woundingType !== null && !_.includes(e.woundingType) && t.push("woundingTypeInvalid"), t;
}
//#endregion
//#region src/functions/damage-console/card.ts
function le(e, t) {
	let n = se(e), r = new Map(t.map((e) => [e.uuid, e]));
	return {
		damageFormula: n.damageFormula,
		hitLocation: n.hitLocation,
		ignoreArmour: n.ignoreArmour,
		ignoreToughness: n.ignoreToughness,
		minimumOne: n.minimumOne,
		roll: null,
		rollSeparately: n.rollSeparately,
		targets: n.targetUuids.map((e) => {
			let t = r.get(e);
			if (!t) throw Error(`Damage console target ${e} could not be resolved.`);
			return {
				...t,
				result: null,
				roll: null
			};
		}),
		version: 2,
		woundingType: n.woundingType
	};
}
function x(e, t) {
	if (e.rollSeparately) throw Error("This damage card rolls separately for each target.");
	if (e.roll) throw Error("Damage has already been rolled for this card.");
	return {
		...e,
		roll: t
	};
}
function ue(e, t, n) {
	if (!e.rollSeparately) throw Error("This damage card uses one shared roll.");
	let r = !1, i = e.targets.map((e) => {
		if (e.uuid !== t) return e;
		if (r = !0, e.roll) throw Error(`Damage has already been rolled for ${e.name}.`);
		return {
			...e,
			roll: n
		};
	});
	if (!r) throw Error(`Damage console target ${t} is not part of this card.`);
	return {
		...e,
		targets: i
	};
}
function de(e, t, n) {
	let r = fe(e, t), i = !1, a = e.targets.map((e) => {
		if (e.uuid !== t) return e;
		if (i = !0, e.result) throw Error(`Damage has already been applied to ${e.name}.`);
		if (!r) throw Error(`Damage must be rolled before it can be applied to ${e.name}.`);
		return {
			...e,
			result: n
		};
	});
	if (!i) throw Error(`Damage console target ${t} is not part of this card.`);
	return {
		...e,
		targets: a
	};
}
function fe(e, t) {
	let n = e.targets.find((e) => e.uuid === t);
	return e.rollSeparately ? n?.roll : e.roll;
}
function pe(e) {
	if (e.woundingType) return {
		category: te[e.woundingType],
		woundingType: e.woundingType
	};
}
//#endregion
//#region src/functions/damage-console/card-parser.ts
function me(e) {
	let t = Se(e);
	if (t?.version !== 1 && t?.version !== 2 || typeof t.damageFormula != "string" || !be(t.hitLocation) || typeof t.ignoreArmour != "boolean" || typeof t.ignoreToughness != "boolean" || typeof t.minimumOne != "boolean" || !xe(t.woundingType) || !Array.isArray(t.targets)) return;
	let n = t.targets.map((e) => t.version === 1 ? ve(e) : he(e)), r = t.version === 1 ? !0 : t.rollSeparately, i = t.version === 1 || t.roll === null ? null : _e(t.roll);
	if (typeof r != "boolean" || i === void 0 || n.some((e) => !e)) return;
	let a = n;
	if (!(r && i || !r && a.some((e) => e.roll) || a.some((e) => e.result && !(r ? e.roll : i)))) return {
		damageFormula: t.damageFormula,
		hitLocation: t.hitLocation,
		ignoreArmour: t.ignoreArmour,
		ignoreToughness: t.ignoreToughness,
		minimumOne: t.minimumOne,
		roll: i,
		rollSeparately: r,
		targets: a,
		version: 2,
		woundingType: t.woundingType
	};
}
function he(e) {
	let t = Se(e), n = ye(t);
	if (!t || !n) return;
	let r = t.roll === null ? null : _e(t.roll), i = t.result === null ? null : ge(t.result);
	if (!(r === void 0 || i === void 0)) return {
		...n,
		result: i,
		roll: r
	};
}
function ge(e) {
	let t = Se(e);
	if (!(typeof t?.appliedAt != "number" || typeof t.appliedBy != "string" || typeof t.hitLocation != "string" || typeof t.html != "string")) return {
		appliedAt: t.appliedAt,
		appliedBy: t.appliedBy,
		hitLocation: t.hitLocation,
		html: t.html
	};
}
function _e(e) {
	let t = Se(e);
	if (!(typeof t?.damage != "number" || typeof t.rolledAt != "number" || typeof t.rolledBy != "string")) return {
		damage: t.damage,
		rolledAt: t.rolledAt,
		rolledBy: t.rolledBy
	};
}
function ve(e) {
	let t = Se(e), n = ye(t);
	if (!t || !n) return;
	if (t.result === null) return {
		...n,
		result: null,
		roll: null
	};
	let r = Se(t.result);
	if (!(typeof r?.appliedAt != "number" || typeof r.appliedBy != "string" || typeof r.damage != "number" || typeof r.hitLocation != "string" || typeof r.html != "string")) return {
		...n,
		result: {
			appliedAt: r.appliedAt,
			appliedBy: r.appliedBy,
			hitLocation: r.hitLocation,
			html: r.html
		},
		roll: {
			damage: r.damage,
			rolledAt: r.appliedAt,
			rolledBy: r.appliedBy
		}
	};
}
function ye(e) {
	if (!(typeof e?.uuid != "string" || typeof e.name != "string" || typeof e.img != "string")) return {
		img: e.img,
		name: e.name,
		uuid: e.uuid
	};
}
function be(e) {
	return typeof e == "string" && oe.includes(e);
}
function xe(e) {
	return e === null || typeof e == "string" && _.includes(e);
}
function Se(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/card-storage.ts
var Ce = "damageConsole";
function we(t) {
	return me(t.getFlag(e, Ce));
}
function Te(e) {
	if (typeof e != "string") return;
	let t = game.messages.get(e), n = t ? we(t) : void 0;
	return n ? pe(n) : void 0;
}
function Ee(t, n) {
	let r = Oe(t.flags) ?? {}, i = Oe(r["wfrp4e-expanded-critical-hits"]) ?? {};
	t.flags = {
		...r,
		[e]: {
			...i,
			[Ce]: n
		}
	};
}
function De(t) {
	return { [`flags.${e}.${Ce}`]: t };
}
function Oe(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/card-renderer.ts
function ke(e) {
	let t = e.woundingType ? b[e.woundingType] : S("damageConsole.unspecified"), n = [e.ignoreArmour ? S("damageConsole.ignoreArmour") : void 0, e.ignoreToughness ? S("damageConsole.ignoreToughness") : void 0].filter((e) => !!e), r = n.length ? n.join(", ") : S("damageConsole.none");
	return `<div class="wfrp4e chat-card ech-damage-console-card">
    <h3><i class="fa-solid fa-bolt"></i> ${Ie(S("damageConsole.cardTitle"))}</h3>
    <dl class="ech-damage-console-card__summary">
      ${Ne(S("damageConsole.damage"), e.damageFormula)}
      ${Ne(S("damageConsole.hitLocation"), Pe(e.hitLocation))}
      ${Ne(S("damageConsole.woundingType"), t)}
      ${Ne(S("damageConsole.ignores"), r)}
      ${Ne(S("damageConsole.minimumOne"), Fe(e.minimumOne))}
      ${Ne(S("damageConsole.rollMode"), S(e.rollSeparately ? "damageConsole.rollSeparately" : "damageConsole.rollTogether"))}
    </dl>
    ${Ae(e)}
    <div class="ech-damage-console-card__targets">
      ${e.targets.map((t) => je(e, t)).join("")}
    </div>
  </div>`;
}
function Ae(e) {
	return e.rollSeparately ? "" : e.roll ? Me(e.roll.damage) : `<button type="button" class="chat-button chat-button-gm ech-damage-console-card__action"
    data-ech-action="rollDamage">
    <i class="fa-solid fa-dice-d20"></i> ${Ie(S("damageConsole.rollDamage"))}
  </button>`;
}
function je(e, t) {
	let n = `<div class="ech-damage-console-card__identity">
    <img src="${Le(t.img)}" alt="" />
    <strong>${Ie(t.name)}</strong>
  </div>`, r = e.rollSeparately ? t.roll : e.roll;
	if (!r) return `<section class="ech-damage-console-card__target">
      ${n}
      ${e.rollSeparately ? `<button type="button" class="chat-button chat-button-gm ech-damage-console-card__action"
        data-ech-action="rollDamage" data-target-uuid="${Le(t.uuid)}">
        <i class="fa-solid fa-dice-d20"></i> ${Ie(S("damageConsole.rollDamage"))}
      </button>` : ""}
    </section>`;
	let i = Me(r.damage, t.result?.hitLocation);
	return t.result ? `<section class="ech-damage-console-card__target ech-damage-console-card__target--applied">
    ${n}
    ${i}
    <div class="ech-damage-console-card__result">${t.result.html}</div>
  </section>` : `<section class="ech-damage-console-card__target ech-damage-console-card__target--rolled">
    ${n}
    ${i}
    <button type="button" class="chat-button chat-button-gm ech-damage-console-card__action"
      data-ech-action="applyDamage" data-target-uuid="${Le(t.uuid)}">
      <i class="fa-solid fa-bolt"></i> ${Ie(S("damageConsole.applyDamage"))}
    </button>
  </section>`;
}
function Me(e, t) {
	let n = t ? ` &middot; ${Ie(Pe(t))}` : "";
	return `<p class="ech-damage-console-card__roll">
    ${Ie(S("damageConsole.rolled"))}: <strong>${e}</strong>${n}
  </p>`;
}
function Ne(e, t) {
	return `<div><dt>${Ie(e)}</dt><dd>${Ie(t)}</dd></div>`;
}
function Pe(e) {
	if (e === "roll") return game.i18n.localize("Roll");
	let t = game.wfrp4e?.config?.locations?.[e];
	return t ? game.i18n.localize(t) : e;
}
function Fe(e) {
	return S(e ? "damageConsole.yes" : "damageConsole.no");
}
function S(e) {
	return game.i18n.localize(`WFRP4E_EXPANDED_CRITICAL_HITS.${e}`);
}
function Ie(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#039;");
}
function Le(e) {
	return Ie(e);
}
//#endregion
//#region src/module/wfrp4e/damage-console/targets.ts
function Re() {
	let e = [...game.user.targets].map(Be).filter((e) => !!e);
	return [...new Map(e.map((e) => [e.uuid, e])).values()];
}
async function ze(e) {
	let t = await fromUuid(e), n = t?.actor ?? t;
	if (!Ve(n)) throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.targetUnavailable", { uuid: e }));
	return {
		actor: n,
		snapshot: {
			img: He(t?.texture?.src) ?? "icons/svg/mystery-man.svg",
			name: He(t?.name) ?? e,
			uuid: e
		}
	};
}
function Be(e) {
	let t = e, n = t?.document, r = He(n?.uuid);
	if (!(!r || !Ve(n?.actor ?? t?.actor))) return {
		img: He(n?.texture?.src) ?? He(t?.texture?.src) ?? "icons/svg/mystery-man.svg",
		name: He(t?.name) ?? He(n?.name) ?? r,
		uuid: r
	};
}
function Ve(e) {
	return typeof e == "object" && !!e && typeof e.applyBasicDamage == "function";
}
function He(e) {
	return typeof e == "string" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/runtime.ts
async function Ue(e, t) {
	let n = fe(e, t);
	if (!n) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.rollRequired"));
	let { actor: r } = await ze(t), i = await Ke(e, r), a = qe(e.ignoreArmour, e.ignoreToughness), o = await r.applyBasicDamage(n.damage, {
		damageType: a,
		loc: i,
		minimumOne: e.minimumOne,
		suppressMsg: !0
	});
	if (typeof o != "string" || !o) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.damageNotApplied"));
	return {
		appliedAt: Date.now(),
		appliedBy: game.user.name,
		hitLocation: i,
		html: o
	};
}
async function We(e) {
	let { damage: t, roll: n } = await Ge(e.damageFormula);
	return await n.toMessage({ flavor: game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.title") }), {
		damage: t,
		rolledAt: Date.now(),
		rolledBy: game.user.name
	};
}
async function Ge(e) {
	try {
		let t = await Roll.create(e).evaluate(), n = Number(t.total);
		if (!Number.isInteger(n) || n < 0) throw Error("Damage must resolve to a non-negative whole number.");
		return {
			damage: n,
			roll: t
		};
	} catch (t) {
		throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.invalidFormula", { formula: e }), { cause: t });
	}
}
async function Ke(e, t) {
	if (e.hitLocation !== "roll") return e.hitLocation;
	let n = Ye(t.details?.hitLocationTable?.value) ?? Ye(t.system?.details?.hitLocationTable?.value) ?? "hitloc", r = Ye(Je(await game.wfrp4e?.tables?.rollTable?.(n, { hideDSN: !0 }))?.result);
	if (!r) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.hitLocationFailed"));
	return r;
}
function qe(e, t) {
	let n = game.wfrp4e?.config?.DAMAGE_TYPE;
	if (!n) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.damageApiUnavailable"));
	return e && t ? n.IGNORE_ALL : e ? n.IGNORE_AP : t ? n.IGNORE_TB : n.NORMAL;
}
function Je(e) {
	return typeof e == "object" && e ? e : void 0;
}
function Ye(e) {
	return typeof e == "string" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/chat-actions.ts
var Xe = /* @__PURE__ */ new Map();
function Ze() {
	Hooks.on("renderChatMessageHTML", (e, t) => {
		if (!ot(e) || !(t instanceof HTMLElement) || !we(e)) return;
		let n = t.querySelectorAll("[data-ech-action]");
		if (!game.user.isGM) {
			n.forEach((e) => e.remove());
			return;
		}
		n.forEach((t) => {
			t.addEventListener("click", (n) => {
				n.preventDefault();
				let r = t.dataset.targetUuid, i = t.dataset.echAction;
				!at(i) || i === "applyDamage" && !r || (t.disabled = !0, Qe(e, r, i).catch((e) => {
					t.disabled = !1, ui.notifications?.error(st(e));
				}));
			});
		});
	});
}
async function Qe(e, t, n) {
	let r = (Xe.get(e.id) ?? Promise.resolve()).catch(() => void 0).then(async () => {
		if (n === "rollDamage") {
			await $e(e, t);
			return;
		}
		t && await et(e, t);
	});
	Xe.set(e.id, r);
	try {
		await r;
	} finally {
		Xe.get(e.id) === r && Xe.delete(e.id);
	}
}
async function $e(e, t) {
	let n = nt(e);
	if (!n.rollSeparately) {
		if (n.roll) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.alreadyRolledShared"));
		await it(e, x(n, await We(n)));
		return;
	}
	if (!t) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.cardTargetUnavailable"));
	let r = rt(n, t);
	if (r.roll) throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.alreadyRolled", { name: r.name }));
	await it(e, ue(n, t, await We(n)));
}
async function et(e, t) {
	let { card: n, target: r } = tt(e, t);
	if (!fe(n, t)) throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.rollRequired", { name: r.name }));
	if (r.result) throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.alreadyApplied", { name: r.name }));
	await it(e, de(n, t, await Ue(n, t)));
}
function tt(e, t) {
	let n = nt(e);
	return {
		card: n,
		target: rt(n, t)
	};
}
function nt(e) {
	let t = we(e);
	if (!t) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.cardUnavailable"));
	return t;
}
function rt(e, t) {
	let n = e.targets.find((e) => e.uuid === t);
	if (!n) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.cardTargetUnavailable"));
	return n;
}
async function it(e, t) {
	await e.update({
		...De(t),
		content: ke(t)
	});
}
function at(e) {
	return e === "applyDamage" || e === "rollDamage";
}
function ot(e) {
	return typeof e == "object" && !!e && typeof e.getFlag == "function" && typeof e.update == "function";
}
function st(e) {
	return e instanceof Error ? e.message : String(e);
}
//#endregion
//#region node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function ct(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var C = {}, lt = [], ut = () => {}, dt = () => !1, ft = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), pt = (e) => e.startsWith("onUpdate:"), w = Object.assign, mt = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, ht = Object.prototype.hasOwnProperty, T = (e, t) => ht.call(e, t), E = Array.isArray, gt = (e) => xt(e) === "[object Map]", _t = (e) => xt(e) === "[object Set]", vt = (e) => xt(e) === "[object Date]", D = (e) => typeof e == "function", O = (e) => typeof e == "string", k = (e) => typeof e == "symbol", A = (e) => typeof e == "object" && !!e, yt = (e) => (A(e) || D(e)) && D(e.then) && D(e.catch), bt = Object.prototype.toString, xt = (e) => bt.call(e), St = (e) => xt(e).slice(8, -1), Ct = (e) => xt(e) === "[object Object]", wt = (e) => O(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Tt = /* @__PURE__ */ ct(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Et = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, Dt = /-\w/g, Ot = Et((e) => e.replace(Dt, (e) => e.slice(1).toUpperCase())), kt = /\B([A-Z])/g, At = Et((e) => e.replace(kt, "-$1").toLowerCase()), jt = Et((e) => e.charAt(0).toUpperCase() + e.slice(1)), Mt = Et((e) => e ? `on${jt(e)}` : ""), Nt = (e, t) => !Object.is(e, t), Pt = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, Ft = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, It = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, Lt, Rt = () => Lt ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function zt(e) {
	if (E(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = O(r) ? Ut(r) : zt(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	} else if (O(e) || A(e)) return e;
}
var Bt = /;(?![^(]*\))/g, Vt = /:([^]+)/, Ht = /\/\*[^]*?\*\//g;
function Ut(e) {
	let t = {};
	return e.replace(Ht, "").split(Bt).forEach((e) => {
		if (e) {
			let n = e.split(Vt);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function Wt(e) {
	let t = "";
	if (O(e)) t = e;
	else if (E(e)) for (let n = 0; n < e.length; n++) {
		let r = Wt(e[n]);
		r && (t += r + " ");
	}
	else if (A(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var Gt = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Kt = /* @__PURE__ */ ct(Gt);
Gt + "";
function qt(e) {
	return !!e || e === "";
}
function Jt(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = Yt(e[r], t[r]);
	return n;
}
function Yt(e, t) {
	if (e === t) return !0;
	let n = vt(e), r = vt(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = k(e), r = k(t), n || r) return e === t;
	if (n = E(e), r = E(t), n || r) return n && r ? Jt(e, t) : !1;
	if (n = A(e), r = A(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !Yt(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
function Xt(e, t) {
	return e.findIndex((e) => Yt(e, t));
}
var Zt = (e) => !!(e && e.__v_isRef === !0), j = (e) => O(e) ? e : e == null ? "" : E(e) || A(e) && (e.toString === bt || !D(e.toString)) ? Zt(e) ? j(e.value) : JSON.stringify(e, Qt, 2) : String(e), Qt = (e, t) => Zt(t) ? Qt(e, t.value) : gt(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[$t(t, r) + " =>"] = n, e), {}) } : _t(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => $t(e)) } : k(t) ? $t(t) : A(t) && !E(t) && !Ct(t) ? String(t) : t, $t = (e, t = "") => k(e) ? `Symbol(${e.description ?? t})` : e, M, en = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && M && (M.active ? (this.parent = M, this.index = (M.scopes ||= []).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
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
			let t = M;
			try {
				return M = this, e();
			} finally {
				M = t;
			}
		}
	}
	on() {
		++this._on === 1 && (this.prevScope = M, M = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (M === this) M = this.prevScope;
			else {
				let e = M;
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
function tn(e) {
	return new en(e);
}
function nn() {
	return M;
}
function rn(e, t = !1) {
	M && M.cleanups.push(e);
}
var N, an = /* @__PURE__ */ new WeakSet(), on = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, M && (M.active ? M.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, an.has(this) && (an.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || un(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, Sn(this), pn(this);
		let e = N, t = P;
		N = this, P = !0;
		try {
			return this.fn();
		} finally {
			mn(this), N = e, P = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) _n(e);
			this.deps = this.depsTail = void 0, Sn(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? an.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		hn(this) && this.run();
	}
	get dirty() {
		return hn(this);
	}
}, sn = 0, cn, ln;
function un(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = ln, ln = e;
		return;
	}
	e.next = cn, cn = e;
}
function dn() {
	sn++;
}
function fn() {
	if (--sn > 0) return;
	if (ln) {
		let e = ln;
		for (ln = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; cn;) {
		let t = cn;
		for (cn = void 0; t;) {
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
function pn(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function mn(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), _n(r), vn(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function hn(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (gn(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function gn(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Cn) || (e.globalVersion = Cn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !hn(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = N, r = P;
	N = e, P = !0;
	try {
		pn(e);
		let n = e.fn(e._value);
		(t.version === 0 || Nt(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		N = n, P = r, mn(e), e.flags &= -3;
	}
}
function _n(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) _n(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function vn(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var P = !0, yn = [];
function bn() {
	yn.push(P), P = !1;
}
function xn() {
	let e = yn.pop();
	P = e === void 0 ? !0 : e;
}
function Sn(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = N;
		N = void 0;
		try {
			t();
		} finally {
			N = e;
		}
	}
}
var Cn = 0, wn = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, Tn = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
	}
	track(e) {
		if (!N || !P || N === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== N) t = this.activeLink = new wn(N, this), N.deps ? (t.prevDep = N.depsTail, N.depsTail.nextDep = t, N.depsTail = t) : N.deps = N.depsTail = t, En(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = N.depsTail, t.nextDep = void 0, N.depsTail.nextDep = t, N.depsTail = t, N.deps === t && (N.deps = e);
		}
		return t;
	}
	trigger(e) {
		this.version++, Cn++, this.notify(e);
	}
	notify(e) {
		dn();
		try {
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			fn();
		}
	}
};
function En(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) En(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
	}
}
var Dn = /* @__PURE__ */ new WeakMap(), On = /* @__PURE__ */ Symbol(""), kn = /* @__PURE__ */ Symbol(""), An = /* @__PURE__ */ Symbol("");
function F(e, t, n) {
	if (P && N) {
		let t = Dn.get(e);
		t || Dn.set(e, t = /* @__PURE__ */ new Map());
		let r = t.get(n);
		r || (t.set(n, r = new Tn()), r.map = t, r.key = n), r.track();
	}
}
function jn(e, t, n, r, i, a) {
	let o = Dn.get(e);
	if (!o) {
		Cn++;
		return;
	}
	let s = (e) => {
		e && e.trigger();
	};
	if (dn(), t === "clear") o.forEach(s);
	else {
		let i = E(e), a = i && wt(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === An || !k(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(An)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(On)), gt(e) && s(o.get(kn)));
				break;
			case "delete":
				i || (s(o.get(On)), gt(e) && s(o.get(kn)));
				break;
			case "set":
				gt(e) && s(o.get(On));
				break;
		}
	}
	fn();
}
function Mn(e, t) {
	let n = Dn.get(e);
	return n && n.get(t);
}
function Nn(e) {
	let t = /* @__PURE__ */ L(e);
	return t === e ? t : (F(t, "iterate", An), /* @__PURE__ */ I(e) ? t : t.map(R));
}
function Pn(e) {
	return F(e = /* @__PURE__ */ L(e), "iterate", An), e;
}
function Fn(e, t) {
	return /* @__PURE__ */ _r(e) ? br(/* @__PURE__ */ gr(e) ? R(t) : t) : R(t);
}
var In = {
	__proto__: null,
	[Symbol.iterator]() {
		return Ln(this, Symbol.iterator, (e) => Fn(this, e));
	},
	concat(...e) {
		return Nn(this).concat(...e.map((e) => E(e) ? Nn(e) : e));
	},
	entries() {
		return Ln(this, "entries", (e) => (e[1] = Fn(this, e[1]), e));
	},
	every(e, t) {
		return zn(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return zn(this, "filter", e, t, (e) => e.map((e) => Fn(this, e)), arguments);
	},
	find(e, t) {
		return zn(this, "find", e, t, (e) => Fn(this, e), arguments);
	},
	findIndex(e, t) {
		return zn(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return zn(this, "findLast", e, t, (e) => Fn(this, e), arguments);
	},
	findLastIndex(e, t) {
		return zn(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return zn(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return Vn(this, "includes", e);
	},
	indexOf(...e) {
		return Vn(this, "indexOf", e);
	},
	join(e) {
		return Nn(this).join(e);
	},
	lastIndexOf(...e) {
		return Vn(this, "lastIndexOf", e);
	},
	map(e, t) {
		return zn(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return Hn(this, "pop");
	},
	push(...e) {
		return Hn(this, "push", e);
	},
	reduce(e, ...t) {
		return Bn(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return Bn(this, "reduceRight", e, t);
	},
	shift() {
		return Hn(this, "shift");
	},
	some(e, t) {
		return zn(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return Hn(this, "splice", e);
	},
	toReversed() {
		return Nn(this).toReversed();
	},
	toSorted(e) {
		return Nn(this).toSorted(e);
	},
	toSpliced(...e) {
		return Nn(this).toSpliced(...e);
	},
	unshift(...e) {
		return Hn(this, "unshift", e);
	},
	values() {
		return Ln(this, "values", (e) => Fn(this, e));
	}
};
function Ln(e, t, n) {
	let r = Pn(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ I(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var Rn = Array.prototype;
function zn(e, t, n, r, i, a) {
	let o = Pn(e), s = o !== e && !/* @__PURE__ */ I(e), c = o[t];
	if (c !== Rn[t]) {
		let t = c.apply(e, a);
		return s ? R(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, Fn(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function Bn(e, t, n, r) {
	let i = Pn(e), a = i !== e && !/* @__PURE__ */ I(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = Fn(e, t)), n.call(this, t, Fn(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? Fn(e, c) : c;
}
function Vn(e, t, n) {
	let r = /* @__PURE__ */ L(e);
	F(r, "iterate", An);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ vr(n[0]) ? (n[0] = /* @__PURE__ */ L(n[0]), r[t](...n)) : i;
}
function Hn(e, t, n = []) {
	bn(), dn();
	let r = (/* @__PURE__ */ L(e))[t].apply(e, n);
	return fn(), xn(), r;
}
var Un = /* @__PURE__ */ ct("__proto__,__v_isRef,__isVue"), Wn = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(k));
function Gn(e) {
	k(e) || (e = String(e));
	let t = /* @__PURE__ */ L(this);
	return F(t, "has", e), t.hasOwnProperty(e);
}
var Kn = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? ur : lr : i ? cr : sr).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = E(e);
		if (!r) {
			let e;
			if (a && (e = In[t])) return e;
			if (t === "hasOwnProperty") return Gn;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ z(e) ? e : n);
		if ((k(t) ? Wn.has(t) : Un(t)) || (r || F(e, "get", t), i)) return o;
		if (/* @__PURE__ */ z(o)) {
			let e = a && wt(t) ? o : o.value;
			return r && A(e) ? /* @__PURE__ */ mr(e) : e;
		}
		return A(o) ? r ? /* @__PURE__ */ mr(o) : /* @__PURE__ */ fr(o) : o;
	}
}, qn = class extends Kn {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = E(e) && wt(t);
		if (!this._isShallow) {
			let e = /* @__PURE__ */ _r(i);
			if (!/* @__PURE__ */ I(n) && !/* @__PURE__ */ _r(n) && (i = /* @__PURE__ */ L(i), n = /* @__PURE__ */ L(n)), !a && /* @__PURE__ */ z(i) && !/* @__PURE__ */ z(n)) return e || (i.value = n), !0;
		}
		let o = a ? Number(t) < e.length : T(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ z(e) ? e : r);
		return e === /* @__PURE__ */ L(r) && (o ? Nt(n, i) && jn(e, "set", t, n, i) : jn(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = T(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && jn(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!k(t) || !Wn.has(t)) && F(e, "has", t), n;
	}
	ownKeys(e) {
		return F(e, "iterate", E(e) ? "length" : On), Reflect.ownKeys(e);
	}
}, Jn = class extends Kn {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return !0;
	}
	deleteProperty(e, t) {
		return !0;
	}
}, Yn = /* @__PURE__ */ new qn(), Xn = /* @__PURE__ */ new Jn(), Zn = /* @__PURE__ */ new qn(!0), Qn = (e) => e, $n = (e) => Reflect.getPrototypeOf(e);
function er(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ L(i), o = gt(a), s = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, l = i[e](...r), u = n ? Qn : t ? br : R;
		return !t && F(a, "iterate", c ? kn : On), w(Object.create(l), { next() {
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
function tr(e) {
	return function(...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function nr(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ L(r), a = /* @__PURE__ */ L(n);
			e || (Nt(n, a) && F(i, "get", n), F(i, "get", a));
			let { has: o } = $n(i), s = t ? Qn : e ? br : R;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && F(/* @__PURE__ */ L(t), "iterate", On), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ L(n), i = /* @__PURE__ */ L(t);
			return e || (Nt(t, i) && F(r, "has", t), F(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ L(a), s = t ? Qn : e ? br : R;
			return !e && F(o, "iterate", On), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return w(n, e ? {
		add: tr("add"),
		set: tr("set"),
		delete: tr("delete"),
		clear: tr("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ L(this), r = $n(n), i = /* @__PURE__ */ L(e), a = !t && !/* @__PURE__ */ I(e) && !/* @__PURE__ */ _r(e) ? i : e;
			return r.has.call(n, a) || Nt(e, a) && r.has.call(n, e) || Nt(i, a) && r.has.call(n, i) || (n.add(a), jn(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ I(n) && !/* @__PURE__ */ _r(n) && (n = /* @__PURE__ */ L(n));
			let r = /* @__PURE__ */ L(this), { has: i, get: a } = $n(r), o = i.call(r, e);
			o ||= (e = /* @__PURE__ */ L(e), i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? Nt(n, s) && jn(r, "set", e, n, s) : jn(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ L(this), { has: n, get: r } = $n(t), i = n.call(t, e);
			i ||= (e = /* @__PURE__ */ L(e), n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && jn(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ L(this), t = e.size !== 0, n = e.clear();
			return t && jn(e, "clear", void 0, void 0, void 0), n;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = er(r, e, t);
	}), n;
}
function rr(e, t) {
	let n = nr(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(T(n, r) && r in t ? n : t, r, i);
}
var ir = { get: /* @__PURE__ */ rr(!1, !1) }, ar = { get: /* @__PURE__ */ rr(!1, !0) }, or = { get: /* @__PURE__ */ rr(!0, !1) }, sr = /* @__PURE__ */ new WeakMap(), cr = /* @__PURE__ */ new WeakMap(), lr = /* @__PURE__ */ new WeakMap(), ur = /* @__PURE__ */ new WeakMap();
function dr(e) {
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
function fr(e) {
	return /* @__PURE__ */ _r(e) ? e : hr(e, !1, Yn, ir, sr);
}
// @__NO_SIDE_EFFECTS__
function pr(e) {
	return hr(e, !1, Zn, ar, cr);
}
// @__NO_SIDE_EFFECTS__
function mr(e) {
	return hr(e, !0, Xn, or, lr);
}
function hr(e, t, n, r, i) {
	if (!A(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = dr(St(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function gr(e) {
	return /* @__PURE__ */ _r(e) ? /* @__PURE__ */ gr(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function _r(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function I(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function vr(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function L(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ L(t) : e;
}
function yr(e) {
	return !T(e, "__v_skip") && Object.isExtensible(e) && Ft(e, "__v_skip", !0), e;
}
var R = (e) => A(e) ? /* @__PURE__ */ fr(e) : e, br = (e) => A(e) ? /* @__PURE__ */ mr(e) : e;
// @__NO_SIDE_EFFECTS__
function z(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function B(e) {
	return xr(e, !1);
}
function xr(e, t) {
	return /* @__PURE__ */ z(e) ? e : new Sr(e, t);
}
var Sr = class {
	constructor(e, t) {
		this.dep = new Tn(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ L(e), this._value = t ? e : R(e), this.__v_isShallow = t;
	}
	get value() {
		return this.dep.track(), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ I(e) || /* @__PURE__ */ _r(e);
		e = n ? e : /* @__PURE__ */ L(e), Nt(e, t) && (this._rawValue = e, this._value = n ? e : R(e), this.dep.trigger());
	}
};
function V(e) {
	return /* @__PURE__ */ z(e) ? e.value : e;
}
var Cr = {
	get: (e, t, n) => t === "__v_raw" ? e : V(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ z(i) && !/* @__PURE__ */ z(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function wr(e) {
	return /* @__PURE__ */ gr(e) ? e : new Proxy(e, Cr);
}
// @__NO_SIDE_EFFECTS__
function Tr(e) {
	let t = E(e) ? Array(e.length) : {};
	for (let n in e) t[n] = Dr(e, n);
	return t;
}
var Er = class {
	constructor(e, t, n) {
		this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = k(t) ? t : String(t), this._raw = /* @__PURE__ */ L(e);
		let r = !0, i = e;
		if (!E(e) || k(this._key) || !wt(this._key)) do
			r = !/* @__PURE__ */ vr(i) || /* @__PURE__ */ I(i);
		while (r && (i = i.__v_raw));
		this._shallow = r;
	}
	get value() {
		let e = this._object[this._key];
		return this._shallow && (e = V(e)), this._value = e === void 0 ? this._defaultValue : e;
	}
	set value(e) {
		if (this._shallow && /* @__PURE__ */ z(this._raw[this._key])) {
			let t = this._object[this._key];
			if (/* @__PURE__ */ z(t)) {
				t.value = e;
				return;
			}
		}
		this._object[this._key] = e;
	}
	get dep() {
		return Mn(this._raw, this._key);
	}
};
function Dr(e, t, n) {
	return new Er(e, t, n);
}
var Or = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new Tn(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Cn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && N !== this) return un(this, !0), !0;
	}
	get value() {
		let e = this.dep.track();
		return gn(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter && this.setter(e);
	}
};
// @__NO_SIDE_EFFECTS__
function kr(e, t, n = !1) {
	let r, i;
	return D(e) ? r = e : (r = e.get, i = e.set), new Or(r, i, n);
}
var Ar = {}, jr = /* @__PURE__ */ new WeakMap(), Mr = void 0;
function Nr(e, t = !1, n = Mr) {
	if (n) {
		let t = jr.get(n);
		t || jr.set(n, t = []), t.push(e);
	}
}
function Pr(e, t, n = C) {
	let { immediate: r, deep: i, once: a, scheduler: o, augmentJob: s, call: c } = n, l = (e) => i ? e : /* @__PURE__ */ I(e) || i === !1 || i === 0 ? Fr(e, 1) : Fr(e), u, d, f, p, m = !1, h = !1;
	if (/* @__PURE__ */ z(e) ? (d = () => e.value, m = /* @__PURE__ */ I(e)) : /* @__PURE__ */ gr(e) ? (d = () => l(e), m = !0) : E(e) ? (h = !0, m = e.some((e) => /* @__PURE__ */ gr(e) || /* @__PURE__ */ I(e)), d = () => e.map((e) => {
		if (/* @__PURE__ */ z(e)) return e.value;
		if (/* @__PURE__ */ gr(e)) return l(e);
		if (D(e)) return c ? c(e, 2) : e();
	})) : d = D(e) ? t ? c ? () => c(e, 2) : e : () => {
		if (f) {
			bn();
			try {
				f();
			} finally {
				xn();
			}
		}
		let t = Mr;
		Mr = u;
		try {
			return c ? c(e, 3, [p]) : e(p);
		} finally {
			Mr = t;
		}
	} : ut, t && i) {
		let e = d, t = i === !0 ? Infinity : i;
		d = () => Fr(e(), t);
	}
	let g = nn(), _ = () => {
		u.stop(), g && g.active && mt(g.effects, u);
	};
	if (a && t) {
		let e = t;
		t = (...t) => {
			let n = e(...t);
			return _(), n;
		};
	}
	let v = h ? Array(e.length).fill(Ar) : Ar, y = (e) => {
		if (!(!(u.flags & 1) || !u.dirty && !e)) if (t) {
			let n = u.run();
			if (e || i || m || (h ? n.some((e, t) => Nt(e, v[t])) : Nt(n, v))) {
				f && f();
				let e = Mr;
				Mr = u;
				try {
					let e = [
						n,
						v === Ar ? void 0 : h && v[0] === Ar ? [] : v,
						p
					];
					v = n, c ? c(t, 3, e) : t(...e);
				} finally {
					Mr = e;
				}
			}
		} else u.run();
	};
	return s && s(y), u = new on(d), u.scheduler = o ? () => o(y, !1) : y, p = (e) => Nr(e, !1, u), f = u.onStop = () => {
		let e = jr.get(u);
		if (e) {
			if (c) c(e, 4);
			else for (let t of e) t();
			jr.delete(u);
		}
	}, t ? r ? y(!0) : v = u.run() : o ? o(y.bind(null, !0), !0) : u.run(), _.pause = u.pause.bind(u), _.resume = u.resume.bind(u), _.stop = _, _;
}
function Fr(e, t = Infinity, n) {
	if (t <= 0 || !A(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ z(e)) Fr(e.value, t, n);
	else if (E(e)) for (let r = 0; r < e.length; r++) Fr(e[r], t, n);
	else if (_t(e) || gt(e)) e.forEach((e) => {
		Fr(e, t, n);
	});
	else if (Ct(e)) {
		for (let r in e) Fr(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && Fr(e[r], t, n);
	}
	return e;
}
//#endregion
//#region node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function Ir(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		Rr(e, t, n);
	}
}
function Lr(e, t, n, r) {
	if (D(e)) {
		let i = Ir(e, t, n, r);
		return i && yt(i) && i.catch((e) => {
			Rr(e, t, n);
		}), i;
	}
	if (E(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(Lr(e[a], t, n, r));
		return i;
	}
}
function Rr(e, t, n, r = !0) {
	let i = t ? t.vnode : null, { errorHandler: a, throwUnhandledErrorInProduction: o } = t && t.appContext.config || C;
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
			bn(), Ir(a, null, 10, [
				e,
				i,
				o
			]), xn();
			return;
		}
	}
	zr(e, n, i, r, o);
}
function zr(e, t, n, r = !0, i = !1) {
	if (i) throw e;
	console.error(e);
}
var H = [], Br = -1, Vr = [], Hr = null, Ur = 0, Wr = /* @__PURE__ */ Promise.resolve(), Gr = null;
function Kr(e) {
	let t = Gr || Wr;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function qr(e) {
	let t = Br + 1, n = H.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = H[r], a = $r(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function Jr(e) {
	if (!(e.flags & 1)) {
		let t = $r(e), n = H[H.length - 1];
		!n || !(e.flags & 2) && t >= $r(n) ? H.push(e) : H.splice(qr(t), 0, e), e.flags |= 1, Yr();
	}
}
function Yr() {
	Gr ||= Wr.then(ei);
}
function Xr(e) {
	E(e) ? Vr.push(...e) : Hr && e.id === -1 ? Hr.splice(Ur + 1, 0, e) : e.flags & 1 || (Vr.push(e), e.flags |= 1), Yr();
}
function Zr(e, t, n = Br + 1) {
	for (; n < H.length; n++) {
		let t = H[n];
		if (t && t.flags & 2) {
			if (e && t.id !== e.uid) continue;
			H.splice(n, 1), n--, t.flags & 4 && (t.flags &= -2), t(), t.flags & 4 || (t.flags &= -2);
		}
	}
}
function Qr(e) {
	if (Vr.length) {
		let e = [...new Set(Vr)].sort((e, t) => $r(e) - $r(t));
		if (Vr.length = 0, Hr) {
			Hr.push(...e);
			return;
		}
		for (Hr = e, Ur = 0; Ur < Hr.length; Ur++) {
			let e = Hr[Ur];
			e.flags & 4 && (e.flags &= -2), e.flags & 8 || e(), e.flags &= -2;
		}
		Hr = null, Ur = 0;
	}
}
var $r = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function ei(e) {
	try {
		for (Br = 0; Br < H.length; Br++) {
			let e = H[Br];
			e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), Ir(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2));
		}
	} finally {
		for (; Br < H.length; Br++) {
			let e = H[Br];
			e && (e.flags &= -2);
		}
		Br = -1, H.length = 0, Qr(e), Gr = null, (H.length || Vr.length) && ei(e);
	}
}
var U = null, ti = null;
function ni(e) {
	let t = U;
	return U = e, ti = e && e.type.__scopeId || null, t;
}
function ri(e, t = U, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && lo(-1);
		let i = ni(t), a;
		try {
			a = e(...n);
		} finally {
			ni(i), r._d && lo(1);
		}
		return a;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function ii(e, t) {
	if (U === null) return e;
	let n = Ko(U), r = e.dirs ||= [];
	for (let e = 0; e < t.length; e++) {
		let [i, a, o, s = C] = t[e];
		i && (D(i) && (i = {
			mounted: i,
			updated: i
		}), i.deep && Fr(a), r.push({
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
function ai(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (bn(), Lr(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), xn());
	}
}
function oi(e, t) {
	if (Z) {
		let n = Z.provides, r = Z.parent && Z.parent.provides;
		r === n && (n = Z.provides = Object.create(r)), n[e] = t;
	}
}
function si(e, t, n = !1) {
	let r = jo();
	if (r || ma) {
		let i = ma ? ma._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && D(t) ? t.call(r && r.proxy) : t;
	}
}
function ci() {
	return !!(jo() || ma);
}
var li = /* @__PURE__ */ Symbol.for("v-scx"), di = () => si(li);
function fi(e, t, n) {
	return pi(e, t, n);
}
function pi(e, t, n = C) {
	let { immediate: r, deep: i, flush: a, once: o } = n, s = w({}, n), c = t && r || !t && a !== "post", l;
	if (Lo) {
		if (a === "sync") {
			let e = di();
			l = e.__watcherHandles ||= [];
		} else if (!c) {
			let e = () => {};
			return e.stop = ut, e.resume = ut, e.pause = ut, e;
		}
	}
	let u = Z;
	s.call = (e, t, n) => Lr(e, u, t, n);
	let d = !1;
	a === "post" ? s.scheduler = (e) => {
		G(e, u && u.suspense);
	} : a !== "sync" && (d = !0, s.scheduler = (e, t) => {
		t ? e() : Jr(e);
	}), s.augmentJob = (e) => {
		t && (e.flags |= 4), d && (e.flags |= 2, u && (e.id = u.uid, e.i = u));
	};
	let f = Pr(e, t, s);
	return Lo && (l ? l.push(f) : c && f()), f;
}
function mi(e, t, n) {
	let r = this.proxy, i = O(e) ? e.includes(".") ? hi(r, e) : () => r[e] : e.bind(r, r), a;
	D(t) ? a = t : (a = t.handler, n = t);
	let o = Po(this), s = pi(i, a.bind(r), n);
	return o(), s;
}
function hi(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var gi = /* @__PURE__ */ Symbol("_vte"), _i = (e) => e.__isTeleport, vi = /* @__PURE__ */ Symbol("_leaveCb");
function yi(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, yi(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function bi(e, t) {
	return D(e) ? /* @__PURE__ */ w({ name: e.name }, t, { setup: e }) : e;
}
function xi(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
function Si(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var Ci = /* @__PURE__ */ new WeakMap();
function wi(e, t, n, r, i = !1) {
	if (E(e)) {
		e.forEach((e, a) => wi(e, t && (E(t) ? t[a] : t), n, r, i));
		return;
	}
	if (Ei(r) && !i) {
		r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && wi(e, t, n, r.component.subTree);
		return;
	}
	let a = r.shapeFlag & 4 ? Ko(r.component) : r.el, o = i ? null : a, { i: s, r: c } = e, l = t && t.r, u = s.refs === C ? s.refs = {} : s.refs, d = s.setupState, f = /* @__PURE__ */ L(d), p = d === C ? dt : (e) => Si(u, e) ? !1 : T(f, e), m = (e, t) => !(t && Si(u, t));
	if (l != null && l !== c) {
		if (Ti(t), O(l)) u[l] = null, p(l) && (d[l] = null);
		else if (/* @__PURE__ */ z(l)) {
			let e = t;
			m(l, e.k) && (l.value = null), e.k && (u[e.k] = null);
		}
	}
	if (D(c)) Ir(c, s, 12, [o, u]);
	else {
		let t = O(c), r = /* @__PURE__ */ z(c);
		if (t || r) {
			let s = () => {
				if (e.f) {
					let n = t ? p(c) ? d[c] : u[c] : m(c) || !e.k ? c.value : u[e.k];
					if (i) E(n) && mt(n, a);
					else if (E(n)) n.includes(a) || n.push(a);
					else if (t) u[c] = [a], p(c) && (d[c] = u[c]);
					else {
						let t = [a];
						m(c, e.k) && (c.value = t), e.k && (u[e.k] = t);
					}
				} else t ? (u[c] = o, p(c) && (d[c] = o)) : r && (m(c, e.k) && (c.value = o), e.k && (u[e.k] = o));
			};
			if (o) {
				let t = () => {
					s(), Ci.delete(e);
				};
				t.id = -1, Ci.set(e, t), G(t, n);
			} else Ti(e), s();
		}
	}
}
function Ti(e) {
	let t = Ci.get(e);
	t && (t.flags |= 8, Ci.delete(e));
}
Rt().requestIdleCallback, Rt().cancelIdleCallback;
var Ei = (e) => !!e.type.__asyncLoader, Di = (e) => e.type.__isKeepAlive;
function Oi(e, t) {
	Ai(e, "a", t);
}
function ki(e, t) {
	Ai(e, "da", t);
}
function Ai(e, t, n = Z) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (Mi(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) Di(e.parent.vnode) && ji(r, t, n, e), e = e.parent;
	}
}
function ji(e, t, n, r) {
	let i = Mi(t, e, r, !0);
	zi(() => {
		mt(r[t], i);
	}, n);
}
function Mi(e, t, n = Z, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			bn();
			let i = Po(n), a = Lr(t, n, e, r);
			return i(), xn(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	}
}
var Ni = (e) => (t, n = Z) => {
	(!Lo || e === "sp") && Mi(e, (...e) => t(...e), n);
}, Pi = Ni("bm"), Fi = Ni("m"), Ii = Ni("bu"), Li = Ni("u"), Ri = Ni("bum"), zi = Ni("um"), Bi = Ni("sp"), Vi = Ni("rtg"), Hi = Ni("rtc");
function Ui(e, t = Z) {
	Mi("ec", e, t);
}
var Wi = /* @__PURE__ */ Symbol.for("v-ndc");
function Gi(e, t, n, r) {
	let i, a = n && n[r], o = E(e);
	if (o || O(e)) {
		let n = o && /* @__PURE__ */ gr(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ I(e), s = /* @__PURE__ */ _r(e), e = Pn(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? br(R(e[n])) : R(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") {
		i = Array(e);
		for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
	} else if (A(e)) if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
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
var Ki = (e) => e ? Io(e) ? Ko(e) : Ki(e.parent) : null, qi = /* @__PURE__ */ w(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => e.props,
	$attrs: (e) => e.attrs,
	$slots: (e) => e.slots,
	$refs: (e) => e.refs,
	$parent: (e) => Ki(e.parent),
	$root: (e) => Ki(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => na(e),
	$forceUpdate: (e) => e.f ||= () => {
		Jr(e.update);
	},
	$nextTick: (e) => e.n ||= Kr.bind(e.proxy),
	$watch: (e) => mi.bind(e)
}), Ji = (e, t) => e !== C && !e.__isScriptSetup && T(e, t), Yi = {
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
			else if (Ji(r, t)) return o[t] = 1, r[t];
			else if (i !== C && T(i, t)) return o[t] = 2, i[t];
			else if (T(a, t)) return o[t] = 3, a[t];
			else if (n !== C && T(n, t)) return o[t] = 4, n[t];
			else Zi && (o[t] = 0);
		}
		let l = qi[t], u, d;
		if (l) return t === "$attrs" && F(e.attrs, "get", ""), l(e);
		if ((u = s.__cssModules) && (u = u[t])) return u;
		if (n !== C && T(n, t)) return o[t] = 4, n[t];
		if (d = c.config.globalProperties, T(d, t)) return d[t];
	},
	set({ _: e }, t, n) {
		let { data: r, setupState: i, ctx: a } = e;
		return Ji(i, t) ? (i[t] = n, !0) : r !== C && T(r, t) ? (r[t] = n, !0) : T(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (a[t] = n, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, props: a, type: o } }, s) {
		let c;
		return !!(n[s] || e !== C && s[0] !== "$" && T(e, s) || Ji(t, s) || T(a, s) || T(r, s) || T(qi, s) || T(i.config.globalProperties, s) || (c = o.__cssModules) && c[s]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? T(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
function Xi(e) {
	return E(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
var Zi = !0;
function Qi(e) {
	let t = na(e), n = e.proxy, r = e.ctx;
	Zi = !1, t.beforeCreate && ea(t.beforeCreate, e, "bc");
	let { data: i, computed: a, methods: o, watch: s, provide: c, inject: l, created: u, beforeMount: d, mounted: f, beforeUpdate: p, updated: m, activated: h, deactivated: g, beforeDestroy: _, beforeUnmount: v, destroyed: y, unmounted: ee, render: b, renderTracked: te, renderTriggered: ne, errorCaptured: re, serverPrefetch: ie, expose: ae, inheritAttrs: oe, components: se, directives: ce, filters: le } = t;
	if (l && $i(l, r, null), o) for (let e in o) {
		let t = o[e];
		D(t) && (r[e] = t.bind(n));
	}
	if (i) {
		let t = i.call(n, n);
		A(t) && (e.data = /* @__PURE__ */ fr(t));
	}
	if (Zi = !0, a) for (let e in a) {
		let t = a[e], i = Jo({
			get: D(t) ? t.bind(n, n) : D(t.get) ? t.get.bind(n, n) : ut,
			set: !D(t) && D(t.set) ? t.set.bind(n) : ut
		});
		Object.defineProperty(r, e, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		});
	}
	if (s) for (let e in s) ta(s[e], r, n, e);
	if (c) {
		let e = D(c) ? c.call(n) : c;
		Reflect.ownKeys(e).forEach((t) => {
			oi(t, e[t]);
		});
	}
	u && ea(u, e, "c");
	function x(e, t) {
		E(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (x(Pi, d), x(Fi, f), x(Ii, p), x(Li, m), x(Oi, h), x(ki, g), x(Ui, re), x(Hi, te), x(Vi, ne), x(Ri, v), x(zi, ee), x(Bi, ie), E(ae)) if (ae.length) {
		let t = e.exposed ||= {};
		ae.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	b && e.render === ut && (e.render = b), oe != null && (e.inheritAttrs = oe), se && (e.components = se), ce && (e.directives = ce), ie && xi(e);
}
function $i(e, t, n = ut) {
	E(e) && (e = sa(e));
	for (let n in e) {
		let r = e[n], i;
		i = A(r) ? "default" in r ? si(r.from || n, r.default, !0) : si(r.from || n) : si(r), /* @__PURE__ */ z(i) ? Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => i.value,
			set: (e) => i.value = e
		}) : t[n] = i;
	}
}
function ea(e, t, n) {
	Lr(E(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function ta(e, t, n, r) {
	let i = r.includes(".") ? hi(n, r) : () => n[r];
	if (O(e)) {
		let n = t[e];
		D(n) && fi(i, n);
	} else if (D(e)) fi(i, e.bind(n));
	else if (A(e)) if (E(e)) e.forEach((e) => ta(e, t, n, r));
	else {
		let r = D(e.handler) ? e.handler.bind(n) : t[e.handler];
		D(r) && fi(i, r, e);
	}
}
function na(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => ra(c, e, o, !0)), ra(c, t, o)), A(t) && a.set(t, c), c;
}
function ra(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && ra(e, a, n, !0), i && i.forEach((t) => ra(e, t, n, !0));
	for (let i in t) if (!(r && i === "expose")) {
		let r = ia[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var ia = {
	data: aa,
	props: la,
	emits: la,
	methods: ca,
	computed: ca,
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
	components: ca,
	directives: ca,
	watch: ua,
	provide: aa,
	inject: oa
};
function aa(e, t) {
	return t ? e ? function() {
		return w(D(e) ? e.call(this, this) : e, D(t) ? t.call(this, this) : t);
	} : t : e;
}
function oa(e, t) {
	return ca(sa(e), sa(t));
}
function sa(e) {
	if (E(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function W(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function ca(e, t) {
	return e ? w(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function la(e, t) {
	return e ? E(e) && E(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : w(/* @__PURE__ */ Object.create(null), Xi(e), Xi(t ?? {})) : t;
}
function ua(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = w(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = W(e[r], t[r]);
	return n;
}
function da() {
	return {
		app: null,
		config: {
			isNativeTag: dt,
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
var fa = 0;
function pa(e, t) {
	return function(n, r = null) {
		D(n) || (n = w({}, n)), r != null && !A(r) && (r = null);
		let i = da(), a = /* @__PURE__ */ new WeakSet(), o = [], s = !1, c = i.app = {
			_uid: fa++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Yo,
			get config() {
				return i.config;
			},
			set config(e) {},
			use(e, ...t) {
				return a.has(e) || (e && D(e.install) ? (a.add(e), e.install(c, ...t)) : D(e) && (a.add(e), e(c, ...t))), c;
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
					let u = c._ceVNode || _o(n, r);
					return u.appContext = i, l === !0 ? l = "svg" : l === !1 && (l = void 0), o && t ? t(u, a) : e(u, a, l), s = !0, c._container = a, a.__vue_app__ = c, Ko(u.component);
				}
			},
			onUnmount(e) {
				o.push(e);
			},
			unmount() {
				s && (Lr(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
			},
			provide(e, t) {
				return i.provides[e] = t, c;
			},
			runWithContext(e) {
				let t = ma;
				ma = c;
				try {
					return e();
				} finally {
					ma = t;
				}
			}
		};
		return c;
	};
}
var ma = null, ha = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ot(t)}Modifiers`] || e[`${At(t)}Modifiers`];
function ga(e, t, ...n) {
	if (e.isUnmounted) return;
	let r = e.vnode.props || C, i = n, a = t.startsWith("update:"), o = a && ha(r, t.slice(7));
	o && (o.trim && (i = n.map((e) => O(e) ? e.trim() : e)), o.number && (i = n.map(It)));
	let s, c = r[s = Mt(t)] || r[s = Mt(Ot(t))];
	!c && a && (c = r[s = Mt(At(t))]), c && Lr(c, e, 6, i);
	let l = r[s + "Once"];
	if (l) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[s]) return;
		e.emitted[s] = !0, Lr(l, e, 6, i);
	}
}
var _a = /* @__PURE__ */ new WeakMap();
function va(e, t, n = !1) {
	let r = n ? _a : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, s = !1;
	if (!D(e)) {
		let r = (e) => {
			let n = va(e, t, !0);
			n && (s = !0, w(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !s ? (A(e) && r.set(e, null), null) : (E(a) ? a.forEach((e) => o[e] = null) : w(o, a), A(e) && r.set(e, o), o);
}
function ya(e, t) {
	return !e || !ft(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), T(e, t[0].toLowerCase() + t.slice(1)) || T(e, At(t)) || T(e, t));
}
function ba(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: o, attrs: s, emit: c, render: l, renderCache: u, props: d, data: f, setupState: p, ctx: m, inheritAttrs: h } = e, g = ni(e), _, v;
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = e;
			_ = Co(l.call(t, e, u, d, p, f, m)), v = s;
		} else {
			let e = t;
			_ = Co(e.length > 1 ? e(d, {
				attrs: s,
				slots: o,
				emit: c
			}) : e(d, null)), v = t.props ? s : xa(s);
		}
	} catch (t) {
		oo.length = 0, Rr(t, e, 1), _ = _o(io);
	}
	let y = _;
	if (v && h !== !1) {
		let e = Object.keys(v), { shapeFlag: t } = y;
		e.length && t & 7 && (a && e.some(pt) && (v = Sa(v, a)), y = bo(y, v, !1, !0));
	}
	return n.dirs && (y = bo(y, null, !1, !0), y.dirs = y.dirs ? y.dirs.concat(n.dirs) : n.dirs), n.transition && yi(y, n.transition), _ = y, ni(g), _;
}
var xa = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || ft(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, Sa = (e, t) => {
	let n = {};
	for (let r in e) (!pt(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
};
function Ca(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? wa(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (Ta(o, r, n) && !ya(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? o ? wa(r, o, l) : !0 : !!o;
	return !1;
}
function wa(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (Ta(t, e, a) && !ya(n, a)) return !0;
	}
	return !1;
}
function Ta(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && A(r) && A(i) ? !Yt(r, i) : r !== i;
}
function Ea({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var Da = {}, Oa = () => Object.create(Da), ka = (e) => Object.getPrototypeOf(e) === Da;
function Aa(e, t, n, r = !1) {
	let i = {}, a = Oa();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), Ma(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	n ? e.props = r ? i : /* @__PURE__ */ pr(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function ja(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ L(i), [c] = e.propsOptions, l = !1;
	if ((r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (ya(e.emitsOptions, o)) continue;
				let u = t[o];
				if (c) if (T(a, o)) u !== a[o] && (a[o] = u, l = !0);
				else {
					let t = Ot(o);
					i[t] = Na(c, s, t, u, e, !1);
				}
				else u !== a[o] && (a[o] = u, l = !0);
			}
		}
	} else {
		Ma(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !T(t, a) && ((r = At(a)) === a || !T(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = Na(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !T(t, e)) && (delete a[e], l = !0);
	}
	l && jn(e.attrs, "set", "");
}
function Ma(e, t, n, r) {
	let [i, a] = e.propsOptions, o = !1, s;
	if (t) for (let c in t) {
		if (Tt(c)) continue;
		let l = t[c], u;
		i && T(i, u = Ot(c)) ? !a || !a.includes(u) ? n[u] = l : (s ||= {})[u] = l : ya(e.emitsOptions, c) || (!(c in r) || l !== r[c]) && (r[c] = l, o = !0);
	}
	if (a) {
		let t = /* @__PURE__ */ L(n), r = s || C;
		for (let o = 0; o < a.length; o++) {
			let s = a[o];
			n[s] = Na(i, t, s, r[s], e, !T(r, s));
		}
	}
	return o;
}
function Na(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = T(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && D(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = Po(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === At(n)) && (r = !0));
	}
	return r;
}
var Pa = /* @__PURE__ */ new WeakMap();
function Fa(e, t, n = !1) {
	let r = n ? Pa : t.propsCache, i = r.get(e);
	if (i) return i;
	let a = e.props, o = {}, s = [], c = !1;
	if (!D(e)) {
		let r = (e) => {
			c = !0;
			let [n, r] = Fa(e, t, !0);
			w(o, n), r && s.push(...r);
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	if (!a && !c) return A(e) && r.set(e, lt), lt;
	if (E(a)) for (let e = 0; e < a.length; e++) {
		let t = Ot(a[e]);
		Ia(t) && (o[t] = C);
	}
	else if (a) for (let e in a) {
		let t = Ot(e);
		if (Ia(t)) {
			let n = a[e], r = o[t] = E(n) || D(n) ? { type: n } : w({}, n), i = r.type, c = !1, l = !0;
			if (E(i)) for (let e = 0; e < i.length; ++e) {
				let t = i[e], n = D(t) && t.name;
				if (n === "Boolean") {
					c = !0;
					break;
				} else n === "String" && (l = !1);
			}
			else c = D(i) && i.name === "Boolean";
			r[0] = c, r[1] = l, (c || T(r, "default")) && s.push(t);
		}
	}
	let l = [o, s];
	return A(e) && r.set(e, l), l;
}
function Ia(e) {
	return e[0] !== "$" && !Tt(e);
}
var La = (e) => e === "_" || e === "_ctx" || e === "$stable", Ra = (e) => E(e) ? e.map(Co) : [Co(e)], za = (e, t, n) => {
	if (t._n) return t;
	let r = ri((...e) => Ra(t(...e)), n);
	return r._c = !1, r;
}, Ba = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (La(n)) continue;
		let i = e[n];
		if (D(i)) t[n] = za(n, i, r);
		else if (i != null) {
			let e = Ra(i);
			t[n] = () => e;
		}
	}
}, Va = (e, t) => {
	let n = Ra(t);
	e.slots.default = () => n;
}, Ha = (e, t, n) => {
	for (let r in t) (n || !La(r)) && (e[r] = t[r]);
}, Ua = (e, t, n) => {
	let r = e.slots = Oa();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Ha(r, t, n), n && Ft(r, "_", e, !0)) : Ba(t, r);
	} else t && Va(e, t);
}, Wa = (e, t, n) => {
	let { vnode: r, slots: i } = e, a = !0, o = C;
	if (r.shapeFlag & 32) {
		let e = t._;
		e ? n && e === 1 ? a = !1 : Ha(i, t, n) : (a = !t.$stable, Ba(t, i)), o = t;
	} else t && (Va(e, t), o = { default: 1 });
	if (a) for (let e in i) !La(e) && o[e] == null && delete i[e];
}, G = no;
function Ga(e) {
	return Ka(e);
}
function Ka(e, t) {
	let n = Rt();
	n.__VUE__ = !0;
	let { insert: r, remove: i, patchProp: a, createElement: o, createText: s, createComment: c, setText: l, setElementText: u, parentNode: d, nextSibling: f, setScopeId: p = ut, insertStaticContent: m } = e, h = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = !!t.dynamicChildren) => {
		if (e === t) return;
		e && !mo(e, t) && (r = xe(e), ge(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case ro:
				g(e, t, n, r);
				break;
			case io:
				_(e, t, n, r);
				break;
			case ao:
				e ?? v(t, n, r, o);
				break;
			case K:
				se(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? b(e, t, n, r, i, a, o, s, c) : d & 6 ? ce(e, t, n, r, i, a, o, s, c) : (d & 64 || d & 128) && l.process(e, t, n, r, i, a, o, s, c, we);
		}
		u != null && i ? wi(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && wi(e.ref, null, a, e, !0);
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
	}, ee = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, b = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) te(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), ie(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, te = (e, t, n, i, s, c, l, d) => {
		let f, p, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (f = e.el = o(e.type, c, m && m.is, m), h & 8 ? u(f, e.children) : h & 16 && re(e.children, f, null, i, s, qa(e, c), l, d), _ && ai(e, null, i, "created"), ne(f, e, e.scopeId, l, i), m) {
			for (let e in m) e !== "value" && !Tt(e) && a(f, e, null, m[e], c, i);
			"value" in m && a(f, "value", null, m.value, c), (p = m.onVnodeBeforeMount) && Do(p, i, e);
		}
		_ && ai(e, null, i, "beforeMount");
		let v = Ya(s, g);
		v && g.beforeEnter(f), r(f, t, n), ((p = m && m.onVnodeMounted) || v || _) && G(() => {
			try {
				p && Do(p, i, e), v && g.enter(f), _ && ai(e, null, i, "mounted");
			} finally {}
		}, s);
	}, ne = (e, t, n, r, i) => {
		if (n && p(e, n), r) for (let t = 0; t < r.length; t++) p(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (t === n || to(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				ne(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, re = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) h(null, e[l] = s ? wo(e[l]) : Co(e[l]), t, n, r, i, a, o, s);
	}, ie = (e, t, n, r, i, o, s) => {
		let c = t.el = e.el, { patchFlag: l, dynamicChildren: d, dirs: f } = t;
		l |= e.patchFlag & 16;
		let p = e.props || C, m = t.props || C, h;
		if (n && Ja(n, !1), (h = m.onVnodeBeforeUpdate) && Do(h, n, t, e), f && ai(t, e, n, "beforeUpdate"), n && Ja(n, !0), (p.innerHTML && m.innerHTML == null || p.textContent && m.textContent == null) && u(c, ""), d ? ae(e.dynamicChildren, d, c, n, r, qa(t, i), o) : s || fe(e, t, c, null, n, r, qa(t, i), o, !1), l > 0) {
			if (l & 16) oe(c, p, m, n, i);
			else if (l & 2 && p.class !== m.class && a(c, "class", null, m.class, i), l & 4 && a(c, "style", p.style, m.style, i), l & 8) {
				let e = t.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let r = e[t], o = p[r], s = m[r];
					(s !== o || r === "value") && a(c, r, o, s, i, n);
				}
			}
			l & 1 && e.children !== t.children && u(c, t.children);
		} else !s && d == null && oe(c, p, m, n, i);
		((h = m.onVnodeUpdated) || f) && G(() => {
			h && Do(h, n, t, e), f && ai(t, e, n, "updated");
		}, r);
	}, ae = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			h(c, l, c.el && (c.type === K || !mo(c, l) || c.shapeFlag & 198) ? d(c.el) : n, null, r, i, a, o, !0);
		}
	}, oe = (e, t, n, r, i) => {
		if (t !== n) {
			if (t !== C) for (let o in t) !Tt(o) && !(o in n) && a(e, o, t[o], null, i, r);
			for (let o in n) {
				if (Tt(o)) continue;
				let s = n[o], c = t[o];
				s !== c && o !== "value" && a(e, o, c, s, i, r);
			}
			"value" in n && a(e, "value", t.value, n.value, i);
		}
	}, se = (e, t, n, i, a, o, c, l, u) => {
		let d = t.el = e ? e.el : s(""), f = t.anchor = e ? e.anchor : s(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		h && (l = l ? l.concat(h) : h), e == null ? (r(d, n, i), r(f, n, i), re(t.children || [], n, f, a, o, c, l, u)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (ae(e.dynamicChildren, m, n, a, o, c, l), (t.key != null || a && t === a.subTree) && Xa(e, t, !0)) : fe(e, t, n, f, a, o, c, l, u);
	}, ce = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : le(t, n, r, i, a, o, c) : x(e, t, c);
	}, le = (e, t, n, r, i, a, o) => {
		let s = e.component = Ao(e, r, i);
		if (Di(e) && (s.ctx.renderer = we), Ro(s, !1, o), s.asyncDep) {
			if (i && i.registerDep(s, ue, o), !e.el) {
				let r = s.subTree = _o(io);
				_(null, r, t, n), e.placeholder = r.el;
			}
		} else ue(s, e, t, n, i, a, o);
	}, x = (e, t, n) => {
		let r = t.component = e.component;
		if (Ca(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			de(r, t, n);
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, ue = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = Qa(e);
					if (n) {
						t && (t.el = c.el, de(e, t, o)), n.asyncDep.then(() => {
							G(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, f;
				Ja(e, !1), t ? (t.el = c.el, de(e, t, o)) : t = c, n && Pt(n), (f = t.props && t.props.onVnodeBeforeUpdate) && Do(f, s, t, c), Ja(e, !0);
				let p = ba(e), m = e.subTree;
				e.subTree = p, h(m, p, d(m.el), xe(m), e, i, a), t.el = p.el, u === null && Ea(e, p.el), r && G(r, i), (f = t.props && t.props.onVnodeUpdated) && G(() => Do(f, s, t, c), i);
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = Ei(t);
				if (Ja(e, !1), l && Pt(l), !m && (o = c && c.onVnodeBeforeMount) && Do(o, d, t), Ja(e, !0), s && Ee) {
					let t = () => {
						e.subTree = ba(e), Ee(s, e.subTree, e, i, null);
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0);
					let o = e.subTree = ba(e);
					h(null, o, n, r, e, i, a), t.el = o.el;
				}
				if (u && G(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					G(() => Do(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && Ei(d.vnode) && d.vnode.shapeFlag & 256) && e.a && G(e.a, i), e.isMounted = !0, t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new on(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => Jr(u), Ja(e, !0), l();
	}, de = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, ja(e, t.props, r, n), Wa(e, t.children, n), bn(), Zr(e), xn();
	}, fe = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, d = e ? e.shapeFlag : 0, f = t.children, { patchFlag: p, shapeFlag: m } = t;
		if (p > 0) {
			if (p & 128) {
				me(l, f, n, r, i, a, o, s, c);
				return;
			} else if (p & 256) {
				pe(l, f, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (d & 16 && be(l, i, a), f !== l && u(n, f)) : d & 16 ? m & 16 ? me(l, f, n, r, i, a, o, s, c) : be(l, i, a, !0) : (d & 8 && u(n, ""), m & 16 && re(f, n, r, i, a, o, s, c));
	}, pe = (e, t, n, r, i, a, o, s, c) => {
		e ||= lt, t ||= lt;
		let l = e.length, u = t.length, d = Math.min(l, u), f;
		for (f = 0; f < d; f++) {
			let r = t[f] = c ? wo(t[f]) : Co(t[f]);
			h(e[f], r, n, null, i, a, o, s, c);
		}
		l > u ? be(e, i, a, !0, !1, d) : re(t, n, r, i, a, o, s, c, d);
	}, me = (e, t, n, r, i, a, o, s, c) => {
		let l = 0, u = t.length, d = e.length - 1, f = u - 1;
		for (; l <= d && l <= f;) {
			let r = e[l], u = t[l] = c ? wo(t[l]) : Co(t[l]);
			if (mo(r, u)) h(r, u, n, null, i, a, o, s, c);
			else break;
			l++;
		}
		for (; l <= d && l <= f;) {
			let r = e[d], l = t[f] = c ? wo(t[f]) : Co(t[f]);
			if (mo(r, l)) h(r, l, n, null, i, a, o, s, c);
			else break;
			d--, f--;
		}
		if (l > d) {
			if (l <= f) {
				let e = f + 1, d = e < u ? t[e].el : r;
				for (; l <= f;) h(null, t[l] = c ? wo(t[l]) : Co(t[l]), n, d, i, a, o, s, c), l++;
			}
		} else if (l > f) for (; l <= d;) ge(e[l], i, a, !0), l++;
		else {
			let p = l, m = l, g = /* @__PURE__ */ new Map();
			for (l = m; l <= f; l++) {
				let e = t[l] = c ? wo(t[l]) : Co(t[l]);
				e.key != null && g.set(e.key, l);
			}
			let _, v = 0, y = f - m + 1, ee = !1, b = 0, te = Array(y);
			for (l = 0; l < y; l++) te[l] = 0;
			for (l = p; l <= d; l++) {
				let r = e[l];
				if (v >= y) {
					ge(r, i, a, !0);
					continue;
				}
				let u;
				if (r.key != null) u = g.get(r.key);
				else for (_ = m; _ <= f; _++) if (te[_ - m] === 0 && mo(r, t[_])) {
					u = _;
					break;
				}
				u === void 0 ? ge(r, i, a, !0) : (te[u - m] = l + 1, u >= b ? b = u : ee = !0, h(r, t[u], n, null, i, a, o, s, c), v++);
			}
			let ne = ee ? Za(te) : lt;
			for (_ = ne.length - 1, l = y - 1; l >= 0; l--) {
				let e = m + l, d = t[e], f = t[e + 1], p = e + 1 < u ? f.el || eo(f) : r;
				te[l] === 0 ? h(null, d, n, p, i, a, o, s, c) : ee && (_ < 0 || l !== ne[_] ? he(d, n, p, 2) : _--);
			}
		}
	}, he = (e, t, n, a, o = null) => {
		let { el: s, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			he(e.component.subTree, t, n, a);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, a);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, we);
			return;
		}
		if (c === K) {
			r(s, t, n);
			for (let e = 0; e < u.length; e++) he(u[e], t, n, a);
			r(e.anchor, t, n);
			return;
		}
		if (c === ao) {
			y(e, t, n);
			return;
		}
		if (a !== 2 && d & 1 && l) if (a === 0) l.persisted && !s[vi] ? r(s, t, n) : (l.beforeEnter(s), r(s, t, n), G(() => l.enter(s), o));
		else {
			let { leave: a, delayLeave: o, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? i(s) : r(s, t, n);
			}, d = () => {
				let e = s._isLeaving || !!s[vi];
				s._isLeaving && s[vi](!0), l.persisted && !e ? u() : a(s, () => {
					u(), c && c();
				});
			};
			o ? o(s, u, d) : d();
		}
		else r(s, t, n);
	}, ge = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if (d === -2 && (i = !1), s != null && (bn(), wi(s, null, n, e, !0), xn()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !Ei(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && Do(_, t, e), u & 6) ye(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && ai(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, we, r) : l && !l.hasOnce && (a !== K || d > 0 && d & 64) ? be(l, t, n, !1, !0) : (a === K && d & 384 || !i && u & 16) && be(c, t, n), r && _e(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && G(() => {
			_ && Do(_, t, e), h && ai(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, _e = (e) => {
		let { type: t, el: n, anchor: r, transition: a } = e;
		if (t === K) {
			ve(n, r);
			return;
		}
		if (t === ao) {
			ee(e);
			return;
		}
		let o = () => {
			i(n), a && !a.persisted && a.afterLeave && a.afterLeave();
		};
		if (e.shapeFlag & 1 && a && !a.persisted) {
			let { leave: t, delayLeave: r } = a, i = () => t(n, o);
			r ? r(e.el, o, i) : i();
		} else o();
	}, ve = (e, t) => {
		let n;
		for (; e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, ye = (e, t, n) => {
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		$a(c), $a(l), r && Pt(r), i.stop(), a && (a.flags |= 8, ge(o, e, t, n)), s && G(s, t), G(() => {
			e.isUnmounted = !0;
		}, t);
	}, be = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) ge(e[o], t, n, r, i);
	}, xe = (e) => {
		if (e.shapeFlag & 6) return xe(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = f(e.anchor || e.el), n = t && t[gi];
		return n ? f(n) : t;
	}, Se = !1, Ce = (e, t, n) => {
		let r;
		e == null ? t._vnode && (ge(t._vnode, null, null, !0), r = t._vnode.component) : h(t._vnode || null, e, t, null, null, null, n), t._vnode = e, Se ||= (Se = !0, Zr(r), Qr(), !1);
	}, we = {
		p: h,
		um: ge,
		m: he,
		r: _e,
		mt: le,
		mc: re,
		pc: fe,
		pbc: ae,
		n: xe,
		o: e
	}, Te, Ee;
	return t && ([Te, Ee] = t(we)), {
		render: Ce,
		hydrate: Te,
		createApp: pa(Ce, Te)
	};
}
function qa({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ja({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Ya(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Xa(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (E(r) && E(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = wo(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && Xa(t, a)), a.type === ro && (a.patchFlag === -1 && (a = i[e] = wo(a)), a.el = t.el), a.type === io && !a.el && (a.el = t.el);
	}
}
function Za(e) {
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
function Qa(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Qa(t);
}
function $a(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function eo(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? eo(t.subTree) : null;
}
var to = (e) => e.__isSuspense;
function no(e, t) {
	t && t.pendingBranch ? E(e) ? t.effects.push(...e) : t.effects.push(e) : Xr(e);
}
var K = /* @__PURE__ */ Symbol.for("v-fgt"), ro = /* @__PURE__ */ Symbol.for("v-txt"), io = /* @__PURE__ */ Symbol.for("v-cmt"), ao = /* @__PURE__ */ Symbol.for("v-stc"), oo = [], q = null;
function J(e = !1) {
	oo.push(q = e ? null : []);
}
function so() {
	oo.pop(), q = oo[oo.length - 1] || null;
}
var co = 1;
function lo(e, t = !1) {
	co += e, e < 0 && q && t && (q.hasOnce = !0);
}
function uo(e) {
	return e.dynamicChildren = co > 0 ? q || lt : null, so(), co > 0 && q && q.push(e), e;
}
function Y(e, t, n, r, i, a) {
	return uo(X(e, t, n, r, i, a, !0));
}
function fo(e, t, n, r, i) {
	return uo(_o(e, t, n, r, i, !0));
}
function po(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function mo(e, t) {
	return e.type === t.type && e.key === t.key;
}
var ho = ({ key: e }) => e ?? null, go = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : O(e) || /* @__PURE__ */ z(e) || D(e) ? {
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
		key: t && ho(t),
		ref: t && go(t),
		scopeId: ti,
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
	return s ? (To(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= O(n) ? 8 : 16), co > 0 && !o && q && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && q.push(c), c;
}
var _o = vo;
function vo(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === Wi) && (e = io), po(e)) {
		let r = bo(e, t, !0);
		return n && To(r, n), co > 0 && !a && q && (r.shapeFlag & 6 ? q[q.indexOf(e)] = r : q.push(r)), r.patchFlag = -2, r;
	}
	if (qo(e) && (e = e.__vccOpts), t) {
		t = yo(t);
		let { class: e, style: n } = t;
		e && !O(e) && (t.class = Wt(e)), A(n) && (/* @__PURE__ */ vr(n) && !E(n) && (n = w({}, n)), t.style = zt(n));
	}
	let o = O(e) ? 1 : to(e) ? 128 : _i(e) ? 64 : A(e) ? 4 : D(e) ? 2 : 0;
	return X(e, t, n, r, i, o, a, !0);
}
function yo(e) {
	return e ? /* @__PURE__ */ vr(e) || ka(e) ? w({}, e) : e : null;
}
function bo(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? Eo(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && ho(l),
		ref: t && t.ref ? n && a ? E(a) ? a.concat(go(t)) : [a, go(t)] : go(t) : a,
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
		ssContent: e.ssContent && bo(e.ssContent),
		ssFallback: e.ssFallback && bo(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && yi(u, c.clone(u)), u;
}
function xo(e = " ", t = 0) {
	return _o(ro, null, e, t);
}
function So(e = "", t = !1) {
	return t ? (J(), fo(io, null, e)) : _o(io, null, e);
}
function Co(e) {
	return e == null || typeof e == "boolean" ? _o(io) : E(e) ? _o(K, null, e.slice()) : po(e) ? wo(e) : _o(ro, null, String(e));
}
function wo(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : bo(e);
}
function To(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (E(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), To(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !ka(t) ? t._ctx = U : r === 3 && U && (U.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else D(t) ? (t = {
		default: t,
		_ctx: U
	}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [xo(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n;
}
function Eo(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = Wt([t.class, r.class]));
		else if (e === "style") t.style = zt([t.style, r.style]);
		else if (ft(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(E(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !pt(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function Do(e, t, n, r = null) {
	Lr(e, t, 7, [n, r]);
}
var Oo = da(), ko = 0;
function Ao(e, t, n) {
	let r = e.type, i = (t ? t.appContext : e.appContext) || Oo, a = {
		uid: ko++,
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
		scope: new en(!0),
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
		propsOptions: Fa(r, i),
		emitsOptions: va(r, i),
		emit: null,
		emitted: null,
		propsDefaults: C,
		inheritAttrs: r.inheritAttrs,
		ctx: C,
		data: C,
		props: C,
		attrs: C,
		slots: C,
		refs: C,
		setupState: C,
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
	return a.ctx = { _: a }, a.root = t ? t.root : a, a.emit = ga.bind(null, a), e.ce && e.ce(a), a;
}
var Z = null, jo = () => Z || U, Mo, No;
{
	let e = Rt(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	Mo = t("__VUE_INSTANCE_SETTERS__", (e) => Z = e), No = t("__VUE_SSR_SETTERS__", (e) => Lo = e);
}
var Po = (e) => {
	let t = Z;
	return Mo(e), e.scope.on(), () => {
		e.scope.off(), Mo(t);
	};
}, Fo = () => {
	Z && Z.scope.off(), Mo(null);
};
function Io(e) {
	return e.vnode.shapeFlag & 4;
}
var Lo = !1;
function Ro(e, t = !1, n = !1) {
	t && No(t);
	let { props: r, children: i } = e.vnode, a = Io(e);
	Aa(e, r, a, t), Ua(e, i, n || t);
	let o = a ? zo(e, t) : void 0;
	return t && No(!1), o;
}
function zo(e, t) {
	let n = e.type;
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Yi);
	let { setup: r } = n;
	if (r) {
		bn();
		let n = e.setupContext = r.length > 1 ? Go(e) : null, i = Po(e), a = Ir(r, e, 0, [e.props, n]), o = yt(a);
		if (xn(), i(), (o || e.sp) && !Ei(e) && xi(e), o) {
			if (a.then(Fo, Fo), t) return a.then((n) => {
				Bo(e, n, t);
			}).catch((t) => {
				Rr(t, e, 0);
			});
			e.asyncDep = a;
		} else Bo(e, a, t);
	} else Uo(e, t);
}
function Bo(e, t, n) {
	D(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : A(t) && (e.setupState = wr(t)), Uo(e, n);
}
var Vo, Ho;
function Uo(e, t, n) {
	let r = e.type;
	if (!e.render) {
		if (!t && Vo && !r.render) {
			let t = r.template || na(e).template;
			if (t) {
				let { isCustomElement: n, compilerOptions: i } = e.appContext.config, { delimiters: a, compilerOptions: o } = r;
				r.render = Vo(t, w(w({
					isCustomElement: n,
					delimiters: a
				}, i), o));
			}
		}
		e.render = r.render || ut, Ho && Ho(e);
	}
	{
		let t = Po(e);
		bn();
		try {
			Qi(e);
		} finally {
			xn(), t();
		}
	}
}
var Wo = { get(e, t) {
	return F(e, "get", ""), e[t];
} };
function Go(e) {
	return {
		attrs: new Proxy(e.attrs, Wo),
		slots: e.slots,
		emit: e.emit,
		expose: (t) => {
			e.exposed = t || {};
		}
	};
}
function Ko(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(wr(yr(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in qi) return qi[n](e);
		},
		has(e, t) {
			return t in e || t in qi;
		}
	}) : e.proxy;
}
function qo(e) {
	return D(e) && "__vccOpts" in e;
}
var Jo = (e, t) => /* @__PURE__ */ kr(e, t, Lo), Yo = "3.5.38", Xo = void 0, Zo = typeof window < "u" && window.trustedTypes;
if (Zo) try {
	Xo = /* @__PURE__ */ Zo.createPolicy("vue", { createHTML: (e) => e });
} catch {}
var Qo = Xo ? (e) => Xo.createHTML(e) : (e) => e, $o = "http://www.w3.org/2000/svg", es = "http://www.w3.org/1998/Math/MathML", ts = typeof document < "u" ? document : null, ns = ts && /* @__PURE__ */ ts.createElement("template"), rs = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? ts.createElementNS($o, e) : t === "mathml" ? ts.createElementNS(es, e) : n ? ts.createElement(e, { is: n }) : ts.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => ts.createTextNode(e),
	createComment: (e) => ts.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => ts.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
		else {
			ns.innerHTML = Qo(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = ns.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, is = /* @__PURE__ */ Symbol("_vtc");
function as(e, t, n) {
	let r = e[is];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var os = /* @__PURE__ */ Symbol("_vod"), ss = /* @__PURE__ */ Symbol("_vsh"), cs = /* @__PURE__ */ Symbol(""), ls = /(?:^|;)\s*display\s*:/;
function us(e, t, n) {
	let r = e.style, i = O(n), a = !1;
	if (n && !i) {
		if (t) if (O(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? fs(r, t, "");
		}
		else for (let e in t) n[e] ?? fs(r, e, "");
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? fs(r, i, "") : gs(e, i, !O(t) && t ? t[i] : void 0, o) || fs(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[cs];
			e && (n += ";" + e), r.cssText = n, a = ls.test(n);
		}
	} else t && e.removeAttribute("style");
	os in e && (e[os] = a ? r.display : "", e[ss] && (r.display = "none"));
}
var ds = /\s*!important$/;
function fs(e, t, n) {
	if (E(n)) n.forEach((n) => fs(e, t, n));
	else if (n ??= "", t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = hs(e, t);
		ds.test(n) ? e.setProperty(At(r), n.replace(ds, ""), "important") : e[r] = n;
	}
}
var ps = [
	"Webkit",
	"Moz",
	"ms"
], ms = {};
function hs(e, t) {
	let n = ms[t];
	if (n) return n;
	let r = Ot(t);
	if (r !== "filter" && r in e) return ms[t] = r;
	r = jt(r);
	for (let n = 0; n < ps.length; n++) {
		let i = ps[n] + r;
		if (i in e) return ms[t] = i;
	}
	return t;
}
function gs(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && O(r) && n === r;
}
var _s = "http://www.w3.org/1999/xlink";
function vs(e, t, n, r, i, a = Kt(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(_s, t.slice(6, t.length)) : e.setAttributeNS(_s, t, n) : n == null || a && !qt(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : k(n) ? String(n) : n);
}
function ys(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Qo(n) : n);
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
		r === "boolean" ? n = qt(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch {}
	o && e.removeAttribute(i || t);
}
function bs(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function xs(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var Ss = /* @__PURE__ */ Symbol("_vei");
function Cs(e, t, n, r, i = null) {
	let a = e[Ss] || (e[Ss] = {}), o = a[t];
	if (r && o) o.value = r;
	else {
		let [n, s] = Ts(t);
		r ? bs(e, n, a[t] = ks(r, i), s) : o && (xs(e, n, o, s), a[t] = void 0);
	}
}
var ws = /(?:Once|Passive|Capture)$/;
function Ts(e) {
	let t;
	if (ws.test(e)) {
		t = {};
		let n;
		for (; n = e.match(ws);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
	}
	return [e[2] === ":" ? e.slice(3) : At(e.slice(2)), t];
}
var Es = 0, Ds = /* @__PURE__ */ Promise.resolve(), Os = () => Es ||= (Ds.then(() => Es = 0), Date.now());
function ks(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (E(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && Lr(e, t, 5, a);
			}
		} else Lr(r, t, 5, [e]);
	};
	return n.value = e, n.attached = Os(), n;
}
var As = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, js = (e, t, n, r, i, a) => {
	let o = i === "svg";
	t === "class" ? as(e, r, o) : t === "style" ? us(e, n, r) : ft(t) ? pt(t) || Cs(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ms(e, t, r, o)) ? (ys(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && vs(e, t, r, o, a, t !== "value")) : e._isVueCE && (Ns(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !O(r))) ? ys(e, Ot(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), vs(e, t, r, o));
};
function Ms(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && As(t) && D(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return As(t) && O(n) ? !1 : t in e;
}
function Ns(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = Ot(t);
	return Array.isArray(n) ? n.some((e) => Ot(e) === r) : Object.keys(n).some((e) => Ot(e) === r);
}
var Ps = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return E(t) ? (e) => Pt(t, e) : t;
};
function Fs(e) {
	e.target.composing = !0;
}
function Is(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var Ls = /* @__PURE__ */ Symbol("_assign");
function Rs(e, t, n) {
	return t && (e = e.trim()), n && (e = It(e)), e;
}
var zs = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e[Ls] = Ps(i);
		let a = r || i.props && i.props.type === "number";
		bs(e, t ? "change" : "input", (t) => {
			t.target.composing || e[Ls](Rs(e.value, n, a));
		}), (n || a) && bs(e, "change", () => {
			e.value = Rs(e.value, n, a);
		}), t || (bs(e, "compositionstart", Fs), bs(e, "compositionend", Is), bs(e, "change", Is));
	},
	mounted(e, { value: t }) {
		e.value = t ?? "";
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[Ls] = Ps(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? It(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, Bs = {
	deep: !0,
	created(e, t, n) {
		e[Ls] = Ps(n), bs(e, "change", () => {
			let t = e._modelValue, n = Ws(e), r = e.checked, i = e[Ls];
			if (E(t)) {
				let e = Xt(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (_t(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(Gs(e, r));
		});
	},
	mounted: Vs,
	beforeUpdate(e, t, n) {
		e[Ls] = Ps(n), Vs(e, t, n);
	}
};
function Vs(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (E(t)) i = Xt(t, r.props.value) > -1;
	else if (_t(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = Yt(t, Gs(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var Hs = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		let i = _t(t);
		bs(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? It(Ws(e)) : Ws(e));
			e[Ls](e.multiple ? i ? new Set(t) : t : t[0]), e._assigning = !0, Kr(() => {
				e._assigning = !1;
			});
		}), e[Ls] = Ps(r);
	},
	mounted(e, { value: t }) {
		Us(e, t);
	},
	beforeUpdate(e, t, n) {
		e[Ls] = Ps(n);
	},
	updated(e, { value: t }) {
		e._assigning || Us(e, t);
	}
};
function Us(e, t) {
	let n = e.multiple, r = E(t);
	if (!(n && !r && !_t(t))) {
		for (let i = 0, a = e.options.length; i < a; i++) {
			let a = e.options[i], o = Ws(a);
			if (n) if (r) {
				let e = typeof o;
				e === "string" || e === "number" ? a.selected = t.some((e) => String(e) === String(o)) : a.selected = Xt(t, o) > -1;
			} else a.selected = t.has(o);
			else if (Yt(Ws(a), t)) {
				e.selectedIndex !== i && (e.selectedIndex = i);
				return;
			}
		}
		!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function Ws(e) {
	return "_value" in e ? e._value : e.value;
}
function Gs(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var Ks = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], qs = {
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
	exact: (e, t) => Ks.some((n) => e[`${n}Key`] && !t.includes(n))
}, Js = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = qs[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, Ys = /* @__PURE__ */ w({ patchProp: js }, rs), Xs;
function Zs() {
	return Xs ||= Ga(Ys);
}
var Qs = ((...e) => {
	let t = Zs().createApp(...e), { mount: n } = t;
	return t.mount = (e) => {
		let r = ec(e);
		if (!r) return;
		let i = t._component;
		!D(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, $s(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function $s(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function ec(e) {
	return O(e) ? document.querySelector(e) : e;
}
//#endregion
//#region node_modules/pinia/dist/pinia.mjs
var tc = typeof window < "u", nc, rc = (e) => nc = e, ic = Symbol();
function ac(e) {
	return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var oc;
(function(e) {
	e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(oc ||= {});
var sc = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function cc(e, { autoBom: t = !1 } = {}) {
	return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["﻿", e], { type: e.type }) : e;
}
function lc(e, t, n) {
	let r = new XMLHttpRequest();
	r.open("GET", e), r.responseType = "blob", r.onload = function() {
		mc(r.response, t, n);
	}, r.onerror = function() {
		console.error("could not download file");
	}, r.send();
}
function uc(e) {
	let t = new XMLHttpRequest();
	t.open("HEAD", e, !1);
	try {
		t.send();
	} catch {}
	return t.status >= 200 && t.status <= 299;
}
function dc(e) {
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
var fc = typeof navigator == "object" ? navigator : { userAgent: "" }, pc = /Macintosh/.test(fc.userAgent) && /AppleWebKit/.test(fc.userAgent) && !/Safari/.test(fc.userAgent), mc = tc ? typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !pc ? hc : "msSaveOrOpenBlob" in fc ? gc : _c : () => {};
function hc(e, t = "download", n) {
	let r = document.createElement("a");
	r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin === location.origin ? dc(r) : uc(r.href) ? lc(e, t, n) : (r.target = "_blank", dc(r))) : (r.href = URL.createObjectURL(e), setTimeout(function() {
		URL.revokeObjectURL(r.href);
	}, 4e4), setTimeout(function() {
		dc(r);
	}, 0));
}
function gc(e, t = "download", n) {
	if (typeof e == "string") if (uc(e)) lc(e, t, n);
	else {
		let t = document.createElement("a");
		t.href = e, t.target = "_blank", setTimeout(function() {
			dc(t);
		});
	}
	else navigator.msSaveOrOpenBlob(cc(e, n), t);
}
function _c(e, t, n, r) {
	if (r ||= open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string") return lc(e, t, n);
	let i = e.type === "application/octet-stream", a = /constructor/i.test(String(sc.HTMLElement)) || "safari" in sc, o = /CriOS\/[\d]+/.test(navigator.userAgent);
	if ((o || i && a || pc) && typeof FileReader < "u") {
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
var { assign: vc } = Object;
function yc() {
	let e = tn(!0), t = e.run(() => /* @__PURE__ */ B({})), n = [], r = [], i = yr({
		install(e) {
			rc(i), i._a = e, e.provide(ic, i), e.config.globalProperties.$pinia = i, r.forEach((e) => n.push(e)), r = [];
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
var bc = () => {};
function xc(e, t, n, r = bc) {
	e.add(t);
	let i = () => {
		e.delete(t) && r();
	};
	return !n && nn() && rn(i), i;
}
function Sc(e, ...t) {
	e.forEach((e) => {
		e(...t);
	});
}
var Cc = (e) => e(), wc = Symbol(), Tc = Symbol();
function Ec(e, t) {
	e instanceof Map && t instanceof Map ? t.forEach((t, n) => e.set(n, t)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
	for (let n in t) {
		if (!t.hasOwnProperty(n)) continue;
		let r = t[n], i = e[n];
		ac(i) && ac(r) && e.hasOwnProperty(n) && !/* @__PURE__ */ z(r) && !/* @__PURE__ */ gr(r) ? e[n] = Ec(i, r) : e[n] = r;
	}
	return e;
}
var Dc = Symbol();
function Oc(e) {
	return !ac(e) || !Object.prototype.hasOwnProperty.call(e, Dc);
}
var { assign: kc } = Object;
function Ac(e) {
	return !!(/* @__PURE__ */ z(e) && e.effect);
}
function jc(e, t, n, r) {
	let { state: i, actions: a, getters: o } = t, s = n.state.value[e], c;
	function l() {
		return s || (n.state.value[e] = i ? i() : {}), kc(/* @__PURE__ */ Tr(n.state.value[e]), a, Object.keys(o || {}).reduce((t, r) => (t[r] = yr(Jo(() => {
			rc(n);
			let t = n._s.get(e);
			return o[r].call(t, t);
		})), t), {}));
	}
	return c = Mc(e, l, t, n, r, !0), c;
}
function Mc(e, t, n = {}, r, i, a) {
	let o, s = kc({ actions: {} }, n), c = { deep: !0 }, l, u, d = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), p = r.state.value[e];
	!a && !p && (r.state.value[e] = {});
	let m;
	function h(t) {
		let n;
		l = u = !1, typeof t == "function" ? (t(r.state.value[e]), n = {
			type: oc.patchFunction,
			storeId: e,
			events: void 0
		}) : (Ec(r.state.value[e], t), n = {
			type: oc.patchObject,
			payload: t,
			storeId: e,
			events: void 0
		});
		let i = m = Symbol();
		Kr().then(() => {
			m === i && (l = !0);
		}), u = !0, Sc(d, n, r.state.value[e]);
	}
	let g = a ? function() {
		let { state: e } = n, t = e ? e() : {};
		this.$patch((e) => {
			kc(e, t);
		});
	} : bc;
	function _() {
		o.stop(), d.clear(), f.clear(), r._s.delete(e);
	}
	let v = (t, n = "") => {
		if (wc in t) return t[Tc] = n, t;
		let i = function() {
			rc(r);
			let n = Array.from(arguments), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
			function s(e) {
				a.add(e);
			}
			function c(e) {
				o.add(e);
			}
			Sc(f, {
				args: n,
				name: i[Tc],
				store: y,
				after: s,
				onError: c
			});
			let l;
			try {
				l = t.apply(this && this.$id === e ? this : y, n);
			} catch (e) {
				throw Sc(o, e), e;
			}
			return l instanceof Promise ? l.then((e) => (Sc(a, e), e)).catch((e) => (Sc(o, e), Promise.reject(e))) : (Sc(a, l), l);
		};
		return i[wc] = !0, i[Tc] = n, i;
	}, y = /* @__PURE__ */ fr({
		_p: r,
		$id: e,
		$onAction: xc.bind(null, f),
		$patch: h,
		$reset: g,
		$subscribe(t, n = {}) {
			let i = xc(d, t, n.detached, () => a()), a = o.run(() => fi(() => r.state.value[e], (r) => {
				(n.flush === "sync" ? u : l) && t({
					storeId: e,
					type: oc.direct,
					events: void 0
				}, r);
			}, kc({}, c, n)));
			return i;
		},
		$dispose: _
	});
	r._s.set(e, y);
	let ee = (r._a && r._a.runWithContext || Cc)(() => r._e.run(() => (o = tn()).run(() => t({ action: v }))));
	for (let t in ee) {
		let n = ee[t];
		/* @__PURE__ */ z(n) && !Ac(n) || /* @__PURE__ */ gr(n) ? a || (p && Oc(n) && (/* @__PURE__ */ z(n) ? n.value = p[t] : Ec(n, p[t])), r.state.value[e][t] = n) : typeof n == "function" && (ee[t] = v(n, t), s.actions[t] = n);
	}
	return kc(y, ee), kc(/* @__PURE__ */ L(y), ee), Object.defineProperty(y, "$state", {
		get: () => r.state.value[e],
		set: (e) => {
			h((t) => {
				kc(t, e);
			});
		}
	}), r._p.forEach((e) => {
		kc(y, o.run(() => e({
			store: y,
			app: r._a,
			pinia: r,
			options: s
		})));
	}), p && a && n.hydrate && n.hydrate(y.$state, p), l = !0, u = !0, y;
}
function Nc(e, t, n) {
	let r, i = typeof t == "function";
	r = i ? n : t;
	function a(n, a) {
		let o = ci();
		return n ||= o ? si(ic, null) : null, n && rc(n), n = nc, n._s.has(e) || (i ? Mc(e, t, r, n) : jc(e, r, n)), n._s.get(e);
	}
	return a.$id = e, a;
}
//#endregion
//#region src/state/damage-console/index.ts
var Pc = Nc("damageConsole", () => {
	let e = /* @__PURE__ */ B("1d10"), t = /* @__PURE__ */ B("roll"), n = /* @__PURE__ */ B(!1), r = /* @__PURE__ */ B(!1), i = /* @__PURE__ */ B(!1), a = /* @__PURE__ */ B(!0), o = /* @__PURE__ */ B(!0), s = /* @__PURE__ */ B(""), c = /* @__PURE__ */ B([]), l = /* @__PURE__ */ B([]), u = /* @__PURE__ */ B(null), d;
	function f(e, t) {
		c.value = e, d = t;
	}
	async function p() {
		if (!d || i.value) return;
		s.value = "";
		let f = se({
			damageFormula: e.value,
			hitLocation: t.value,
			ignoreArmour: n.value,
			ignoreToughness: r.value,
			minimumOne: a.value,
			rollSeparately: o.value,
			targetUuids: c.value.map((e) => e.uuid),
			woundingType: u.value
		});
		if (l.value = ce(f), !l.value.length) {
			i.value = !0;
			try {
				await d(f);
			} catch (e) {
				s.value = e instanceof Error ? e.message : String(e);
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
		initialize: f,
		isPosting: i,
		minimumOne: a,
		runtimeError: s,
		rollSeparately: o,
		submit: p,
		targets: c,
		validationErrors: l,
		woundingType: u
	};
}), Fc = {
	key: 0,
	role: "alert",
	class: "tw:dui-alert tw:dui-alert-error tw:text-sm"
}, Ic = { key: 0 }, Lc = { class: "tw:dui-card tw:dui-card-border tw:dui-card-sm" }, Rc = { class: "tw:dui-card-body" }, zc = { class: "tw:dui-card-title tw:text-base" }, Bc = { class: "tw:grid tw:grid-cols-1 tw:gap-2 tw:sm:grid-cols-2" }, Vc = ["src"], Hc = { class: "tw:min-w-0 tw:truncate" }, Uc = { class: "tw:grid tw:grid-cols-1 tw:gap-4 tw:md:grid-cols-2" }, Wc = { class: "tw:dui-fieldset tw:min-w-0 tw:rounded-box tw:border tw:border-base-300 tw:p-4" }, Gc = { class: "tw:dui-fieldset-legend" }, Kc = {
	class: "tw:dui-label",
	for: "ech-damage-formula"
}, qc = { class: "tw:dui-label tw:whitespace-normal" }, Jc = {
	class: "tw:dui-label",
	for: "ech-hit-location"
}, Yc = ["value"], Xc = {
	class: "tw:dui-label",
	for: "ech-wounding-type"
}, Zc = ["value"], Qc = { class: "tw:dui-label tw:whitespace-normal" }, $c = { class: "tw:dui-fieldset tw:min-w-0 tw:rounded-box tw:border tw:border-base-300 tw:p-4" }, el = { class: "tw:dui-fieldset-legend" }, tl = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, nl = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, rl = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, il = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, al = {
	role: "alert",
	class: "tw:dui-alert tw:mt-2 tw:text-sm"
}, ol = { class: "tw:flex tw:justify-end tw:gap-2" }, sl = ["disabled"], cl = ["disabled"], ll = /* @__PURE__ */ bi({
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
		let t = e, n = Pc();
		n.initialize(t.targets, t.onPost);
		function r(e) {
			return t.localize(`WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.${e}`);
		}
		return (e, i) => (J(), Y("form", {
			class: "tw:flex tw:flex-col tw:gap-4 tw:rounded-box tw:bg-base-100 tw:p-4 tw:text-base-content",
			onSubmit: i[8] ||= Js((...e) => V(n).submit && V(n).submit(...e), ["prevent"])
		}, [
			V(n).validationErrors.length || V(n).runtimeError ? (J(), Y("div", Fc, [i[9] ||= X("i", {
				class: "fa-solid fa-triangle-exclamation",
				"aria-hidden": "true"
			}, null, -1), X("div", null, [(J(!0), Y(K, null, Gi(V(n).validationErrors, (e) => (J(), Y("p", { key: e }, j(r(`validation.${e}`)), 1))), 128)), V(n).runtimeError ? (J(), Y("p", Ic, j(V(n).runtimeError), 1)) : So("", !0)])])) : So("", !0),
			X("section", Lc, [X("div", Rc, [X("h2", zc, [i[10] ||= X("i", {
				class: "fa-solid fa-crosshairs",
				"aria-hidden": "true"
			}, null, -1), xo(" " + j(r("targets")), 1)]), X("div", Bc, [(J(!0), Y(K, null, Gi(V(n).targets, (e) => (J(), Y("div", {
				key: e.uuid,
				class: "tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:rounded-sm tw:bg-base-200 tw:p-2"
			}, [X("img", {
				src: e.img,
				alt: "",
				class: "tw:h-9 tw:w-9 tw:rounded-sm tw:object-cover"
			}, null, 8, Vc), X("strong", Hc, j(e.name), 1)]))), 128))])])]),
			X("div", Uc, [X("fieldset", Wc, [
				X("legend", Gc, j(r("damageDetails")), 1),
				X("label", Kc, j(r("damage")), 1),
				ii(X("input", {
					id: "ech-damage-formula",
					"onUpdate:modelValue": i[0] ||= (e) => V(n).damageFormula = e,
					class: "tw:dui-input tw:w-full",
					name: "damageFormula",
					placeholder: "1d10",
					required: "",
					type: "text"
				}, null, 512), [[zs, V(n).damageFormula]]),
				X("p", qc, j(r("damageHint")), 1),
				X("label", Jc, j(r("hitLocation")), 1),
				ii(X("select", {
					id: "ech-hit-location",
					"onUpdate:modelValue": i[1] ||= (e) => V(n).hitLocation = e,
					class: "tw:dui-select tw:w-full",
					name: "hitLocation"
				}, [(J(!0), Y(K, null, Gi(t.hitLocationOptions, (e) => (J(), Y("option", {
					key: e.value,
					value: e.value
				}, j(e.label), 9, Yc))), 128))], 512), [[Hs, V(n).hitLocation]]),
				X("label", Xc, j(r("woundingType")), 1),
				ii(X("select", {
					id: "ech-wounding-type",
					"onUpdate:modelValue": i[2] ||= (e) => V(n).woundingType = e,
					class: "tw:dui-select tw:w-full",
					name: "woundingType"
				}, [(J(!0), Y(K, null, Gi(t.woundingTypeOptions, (e) => (J(), Y("option", {
					key: e.value ?? "unspecified",
					value: e.value
				}, j(e.label), 9, Zc))), 128))], 512), [[Hs, V(n).woundingType]]),
				X("p", Qc, j(r("woundingTypeHint")), 1)
			]), X("fieldset", $c, [
				X("legend", el, j(r("damageOptions")), 1),
				X("label", tl, [X("span", null, j(r("rollSeparately")), 1), ii(X("input", {
					"onUpdate:modelValue": i[3] ||= (e) => V(n).rollSeparately = e,
					class: "tw:dui-checkbox",
					name: "rollSeparately",
					type: "checkbox"
				}, null, 512), [[Bs, V(n).rollSeparately]])]),
				X("label", nl, [X("span", null, j(r("ignoreToughness")), 1), ii(X("input", {
					"onUpdate:modelValue": i[4] ||= (e) => V(n).ignoreToughness = e,
					class: "tw:dui-checkbox",
					name: "ignoreToughness",
					type: "checkbox"
				}, null, 512), [[Bs, V(n).ignoreToughness]])]),
				X("label", rl, [X("span", null, j(r("ignoreArmour")), 1), ii(X("input", {
					"onUpdate:modelValue": i[5] ||= (e) => V(n).ignoreArmour = e,
					class: "tw:dui-checkbox",
					name: "ignoreArmour",
					type: "checkbox"
				}, null, 512), [[Bs, V(n).ignoreArmour]])]),
				X("label", il, [X("span", null, j(r("minimumOne")), 1), ii(X("input", {
					"onUpdate:modelValue": i[6] ||= (e) => V(n).minimumOne = e,
					class: "tw:dui-checkbox",
					name: "minimumOne",
					type: "checkbox"
				}, null, 512), [[Bs, V(n).minimumOne]])]),
				X("div", al, [i[11] ||= X("i", {
					class: "fa-solid fa-circle-info",
					"aria-hidden": "true"
				}, null, -1), X("span", null, j(r("postHint")), 1)])
			])]),
			X("div", ol, [X("button", {
				class: "tw:dui-btn",
				type: "button",
				disabled: V(n).isPosting,
				onClick: i[7] ||= (...e) => t.onCancel && t.onCancel(...e)
			}, j(r("cancel")), 9, sl), X("button", {
				class: "tw:dui-btn tw:dui-btn-primary",
				type: "submit",
				disabled: V(n).isPosting
			}, [X("i", {
				class: Wt(V(n).isPosting ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-message"),
				"aria-hidden": "true"
			}, null, 2), xo(" " + j(r("post")), 1)], 8, cl)])
		], 32));
	}
});
//#endregion
//#region src/module/wfrp4e/damage-console/posting.ts
async function ul(e) {
	dl();
	let t = se(e), n = ce(t);
	if (n.length) throw Error(game.i18n.localize(`WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.validation.${n[0]}`));
	let r = le(t, await Promise.all(t.targetUuids.map(async (e) => (await ze(e)).snapshot))), i = ke(r), a = game.wfrp4e?.utility?.chatDataSetup?.(i) ?? { content: i };
	return Ee(a, r), (await ChatMessage.create(a))?.id;
}
function dl() {
	if (!game.user.isGM) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.gmOnly"));
}
//#endregion
//#region src/module/apps/FoundryVueApplication.ts
var fl = class extends foundry.applications.api.ApplicationV2 {
	#e;
	getVueProps() {}
	async _renderHTML(e, t) {
		let n = document.createElement("div");
		return n.classList.add("wfrp4e-expanded-critical-hits-root"), n.dataset.theme = "wfrp4e-expanded-critical-hits", n;
	}
	_replaceHTML(e, t, n) {
		this.unmountVue(), t.classList.add("wfrp4e-expanded-critical-hits-app"), t.replaceChildren(e), this.#e = Qs(this.getVueComponent(), this.getVueProps() ?? {}), this.#e.use(yc()), this.#e.mount(e);
	}
	async _preClose(e) {
		this.unmountVue(), await super._preClose(e);
	}
	unmountVue() {
		this.#e?.unmount(), this.#e = void 0;
	}
}, pl = {
	body: "Body",
	head: "Head",
	lArm: "Left Arm",
	lLeg: "Left Leg",
	rArm: "Right Arm",
	rLeg: "Right Leg",
	roll: "Roll"
}, ml = class extends fl {
	static DEFAULT_OPTIONS = {
		id: `${e}-damage-console`,
		position: {
			height: 600,
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
		return ll;
	}
	getVueProps() {
		return {
			hitLocationOptions: hl(),
			localize: (e) => game.i18n.localize(e),
			onCancel: () => void this.close(),
			onPost: async (e) => {
				await ul(e), await this.close();
			},
			targets: this.#e,
			woundingTypeOptions: gl()
		};
	}
};
function hl() {
	return oe.map((e) => ({
		label: game.i18n.localize(pl[e]),
		value: e
	}));
}
function gl() {
	return [{
		label: game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.unspecified"),
		value: null
	}, ..._.map((e) => ({
		label: b[e],
		value: e
	}))];
}
//#endregion
//#region src/module/wfrp4e/damage-console/launch.ts
async function _l() {
	if (!game.user.isGM) {
		ui.notifications?.warn(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.gmOnly"));
		return;
	}
	let e = Re();
	if (!e.length) {
		ui.notifications?.warn(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.targetsRequired"));
		return;
	}
	await new ml(e).render(!0);
}
//#endregion
//#region src/module/wfrp4e/damage-console/scene-controls.ts
function vl() {
	Hooks.on("getSceneControlButtons", (e) => {
		let t = e?.tokens?.tools;
		t && (t.expandedCriticalDamageConsole = {
			button: !0,
			icon: "fa-solid fa-bolt",
			name: "expandedCriticalDamageConsole",
			onClick: () => void _l(),
			title: "WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.sceneControl",
			visible: game.user.isGM
		});
	});
}
//#endregion
//#region src/module/wfrp4e/damage-console/index.ts
var yl = !1;
function bl() {
	yl ||= (Ze(), vl(), !0);
}
//#endregion
//#region src/functions/critical-hits/damage-inference/index.ts
var xl = {
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
}, Sl = {
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
function Cl(e) {
	if (e.explicitCategories.length > 0) return {
		categories: kl(e.explicitCategories),
		matches: [],
		source: "explicit"
	};
	if (e.inferFromWeaponProperties) {
		let t = Dl(e.weaponPropertyKeys, e.weaponPropertyMapping);
		if (t.length > 0) return {
			categories: Ol(t),
			matches: t,
			source: "weaponProperty"
		};
	}
	if (e.inferFromWeaponTypes) {
		let t = Dl(e.weaponTypeKeys, e.weaponTypeMapping);
		if (t.length > 0) return {
			categories: Ol(t),
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
function wl(e) {
	return e.trim().toLowerCase().replaceAll(/[^a-z0-9]/g, "");
}
function Tl(e) {
	let t = El(e), n = {};
	for (let [e, r] of Object.entries(t ?? {})) jl(r) && (n[wl(e)] = r);
	return n;
}
function El(e) {
	if (typeof e == "string") try {
		return El(JSON.parse(e));
	} catch {
		return;
	}
	if (typeof e == "object" && e && !Array.isArray(e)) return e;
}
function Dl(e, t) {
	let n = Tl(t), r = e.flatMap((e) => {
		let t = n[wl(e)];
		return t && t !== "none" ? [{
			category: t,
			key: e
		}] : [];
	}), i = /* @__PURE__ */ new Set();
	return g.flatMap((e) => r.filter((t) => {
		let n = `${e}:${wl(t.key)}`;
		return t.category !== e || i.has(n) ? !1 : (i.add(n), !0);
	}));
}
function Ol(e) {
	return kl(e.map((e) => e.category));
}
function kl(e) {
	let t = new Set(e);
	return g.filter((e) => t.has(e));
}
function Al(e) {
	return typeof e == "string" && g.includes(e);
}
function jl(e) {
	return e === "none" || Al(e);
}
//#endregion
//#region src/functions/critical-hits/natural-one-critical/index.ts
function Ml(e) {
	let t = Number(e.roll), n = Number(e.target);
	return t === 1 && t <= n;
}
//#endregion
//#region src/functions/critical-hits/table-keys.ts
function Nl(e, t, n) {
	return `ech-crit-${e}-${t}-${n}`.toLowerCase();
}
function Pl(e) {
	let t = e.toLowerCase();
	if (t === "head" || t === "body") return t;
	if (t.endsWith("arm")) return "arm";
	if (t.endsWith("leg")) return "leg";
}
function Fl(e) {
	return e ? "upInArms" : "core";
}
//#endregion
//#region src/module/settings.ts
var Il = "enableCriticalReplacement", Ll = "enableNaturalOneCriticals", Rl = "inferDamageFromWeaponProperties", zl = "inferDamageFromWeaponTypes", Bl = "weaponPropertyDamageMapping", Vl = "weaponTypeDamageMapping", Hl = JSON.stringify(xl), Ul = JSON.stringify(Sl), Wl = JSON.stringify({
	hack: "cutting",
	impale: "piercing",
	pummel: "crushing",
	slash: "cutting"
});
function Gl() {
	game.settings.register(e, n, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.debugConsoleLogging.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.debugConsoleLogging.hint",
		scope: "client",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, Il, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, Ll, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableNaturalOneCriticals.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableNaturalOneCriticals.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, Rl, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponProperties.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponProperties.hint",
		scope: "world",
		config: !0,
		default: !0,
		type: Boolean
	}), game.settings.register(e, Bl, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponPropertyDamageMapping.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponPropertyDamageMapping.hint",
		scope: "world",
		config: !1,
		default: Hl,
		type: String
	}), game.settings.register(e, zl, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponTypes.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponTypes.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, Vl, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponTypeDamageMapping.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponTypeDamageMapping.hint",
		scope: "world",
		config: !1,
		default: Ul,
		type: String
	}), r(`${e} | Settings registered`, tu());
}
function Kl() {
	return !!game.settings.get(e, Il);
}
function ql() {
	return !!game.settings.get(e, Ll);
}
async function Jl() {
	if (!game.user.isGM) {
		r(`${e} | Skipping mapping setting normalization for non-GM user.`);
		return;
	}
	r(`${e} | Normalizing stored mapping settings.`), await $l(Bl, Hl), await $l(Vl, Ul), r(`${e} | Mapping settings normalized`, tu());
}
function Yl() {
	return !!game.settings.get(e, Rl);
}
function Xl() {
	return !!game.settings.get(e, zl);
}
function Zl() {
	return Tl(game.settings.get(e, Bl));
}
function Ql() {
	return Tl(game.settings.get(e, Vl));
}
async function $l(t, n) {
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
	t === "weaponPropertyDamageMapping" && eu(i, Wl) && (r(`${e} | Upgrading untouched weapon property mapping defaults`, { key: t }), await game.settings.set(e, t, n));
}
function eu(e, t) {
	return JSON.stringify(Tl(e)) === t;
}
function tu() {
	return {
		debugConsoleLogging: ru(n),
		enableCriticalReplacement: ru(Il),
		enableNaturalOneCriticals: ru(Ll),
		inferDamageFromWeaponProperties: ru(Rl),
		inferDamageFromWeaponTypes: ru(zl),
		weaponPropertyDamageMapping: nu(Bl),
		weaponTypeDamageMapping: nu(Vl)
	};
}
function nu(e) {
	let t = ru(e);
	return {
		key: e,
		type: typeof t,
		value: t
	};
}
function ru(t) {
	try {
		return game.settings.settings.has(`wfrp4e-expanded-critical-hits.${t}`) ? game.settings.get(e, t) : "<not registered>";
	} catch (e) {
		return `<error: ${e instanceof Error ? e.message : String(e)}>`;
	}
}
//#endregion
//#region src/module/wfrp4e/natural-one-critical.ts
var iu = Symbol.for(`${e}.naturalOneCriticalPatch`), au = {
	installed: !1,
	message: "Natural 1 critical patch has not run."
};
function ou() {
	return { ...au };
}
function su() {
	let t = game.wfrp4e?.rolls;
	if (!t?.TestWFRP) {
		mu(!1, "WFRP4e roll classes were not available.");
		return;
	}
	let n = cu(t.TestWFRP), r = lu([t.WeaponTest, t.TraitTest]);
	au = {
		installed: n,
		message: n ? `Natural 1 critical patch installed. Attack wrappers installed: ${r}.` : "TestWFRP.isCriticalFumble could not be patched."
	}, n || a(`${e} | ${au.message}`);
}
function cu(e) {
	let t = e.prototype;
	if (pu(t).isCriticalFumble) return !0;
	let n = Object.getOwnPropertyDescriptor(t, "isCriticalFumble");
	return n?.get ? (Object.defineProperty(t, "isCriticalFumble", {
		configurable: n.configurable,
		enumerable: n.enumerable,
		get() {
			return uu(this) ? "critical" : n.get?.call(this);
		}
	}), fu(t, "isCriticalFumble"), !0) : !1;
}
function lu(e) {
	let t = 0;
	for (let n of e) {
		let e = n?.prototype;
		if (!e || pu(e).computeProperties) continue;
		let r = e.computeProperties;
		r && (e.computeProperties = function(...e) {
			uu(this) && du(this);
			let t = r.apply(this, e);
			return uu(this) && du(this), t;
		}, fu(e, "computeProperties"), t += 1);
	}
	return t;
}
function uu(e) {
	return ql() && Ml({
		roll: e.result?.roll,
		target: e.result?.target
	});
}
function du(e) {
	e.result && (e.result.color_green = !0, e.result.critical ||= game.i18n.localize("Critical"));
}
function fu(e, t) {
	let n = pu(e);
	n[t] = !0, Object.defineProperty(e, iu, {
		configurable: !0,
		value: n
	});
}
function pu(e) {
	return Object.prototype.hasOwnProperty.call(e, iu) ? Reflect.get(e, iu) : {};
}
function mu(t, n) {
	au = {
		installed: t,
		message: n
	}, a(`${e} | ${n}`);
}
//#endregion
//#region src/module/api/create-module-api.ts
function hu() {
	return {
		getExpandedCriticalsCompendiumStatus: f,
		getNaturalOneCriticalPatchStatus: ou,
		launchDamageConsole: _l,
		postDamageConsoleCard: ul
	};
}
//#endregion
//#region src/module/api/register-module-api.ts
function gu() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let t = game.modules.get(e);
	if (!t) throw Error(`Foundry module registry entry was not found for ${e}.`);
	t.api = hu();
}
//#endregion
//#region src/module/wfrp4e/critical-replacement/debug.ts
function _u(e) {
	return {
		criticalLocation: e.criticalLocation,
		messageId: e.messageId,
		returnResult: e.returnResult,
		sourceItemUuid: e.sourceItemUuid
	};
}
function vu(e) {
	let t = yu(e);
	if (t) return {
		id: t.id,
		name: t.name,
		type: t.type,
		uuid: t.uuid
	};
}
function yu(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/critical-replacement/failure.ts
function bu(t, n, r) {
	return o(`${e} | ${t}`, r), ui.notifications?.error(t), [
		"<div class=\"wfrp4e chat-card\">",
		"<h3>Expanded Critical Hit Failed</h3>",
		`<p>${xu(t)}</p>`,
		`<p><strong>Table:</strong> ${xu(n)}</p>`,
		"</div>"
	].join("");
}
function xu(e) {
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
function Su(e, t) {
	if (!Tu(e)) return;
	let n = t.criticalLocation;
	if (e.type !== "critical" || typeof n != "string") return e;
	let r = e.toObject, i = Item?.implementation;
	if (typeof r != "function" || typeof i != "function") return e;
	let a = r.call(e), o = Cu(Cu(a, "system"), "location"), s = game.wfrp4e?.config?.locations ?? {};
	return o.key = n, o.value = s[n] ?? n, new i(a);
}
function Cu(e, t) {
	let n = wu(e[t]);
	if (n) return n;
	let r = {};
	return e[t] = r, r;
}
function wu(e) {
	return typeof e == "object" && e ? e : void 0;
}
function Tu(e) {
	let t = e;
	return typeof t == "object" && !!t && typeof t.postItem == "function";
}
//#endregion
//#region src/module/wfrp4e/runtime-values.ts
function Eu(e) {
	return Array.isArray(e) ? e : [];
}
function Q(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/quality-extraction.ts
function Du(e) {
	let t = Ou(e);
	return {
		explicitCategories: ie(t),
		weaponPropertyKeys: t,
		weaponTypeKeys: ju(e)
	};
}
function Ou(e) {
	let t = Q(e), n = Q(t?.system), r = Q(t?.properties), i = Q(n?.properties), a = [Q(r?.qualities), Q(i?.qualities)], o = /* @__PURE__ */ new Set();
	for (let e of a) for (let t of Object.keys(e ?? {})) o.add(t);
	let s = Eu(Q(n?.qualities)?.value);
	for (let e of s) {
		let t = Q(e), n = t?.name;
		typeof n == "string" && ku(t) && o.add(n);
	}
	return [...o];
}
function ku(e) {
	let t = e?.group;
	return Au(t) ? e?.active === !0 : !0;
}
function Au(e) {
	return typeof e == "number" ? Number.isFinite(e) : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e));
}
function ju(e) {
	let t = Q(Q(e)?.system), n = /* @__PURE__ */ new Set();
	for (let e of [
		t?.weaponGroup,
		t?.group,
		t?.weaponType,
		t?.weaponClass,
		t?.ammunitionGroup,
		t?.ammoGroup,
		t?.category
	]) Mu(e, n);
	return [...n];
}
function Mu(e, t) {
	if (typeof e == "string") {
		t.add(e);
		return;
	}
	if (Array.isArray(e)) {
		for (let n of e) Mu(n, t);
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
	]) Mu(n[e], t);
}
//#endregion
//#region src/module/wfrp4e/damage-category-resolution.ts
function Nu(e) {
	let t = Du(e);
	return {
		clues: t,
		resolution: Cl({
			...t,
			inferFromWeaponProperties: Yl(),
			inferFromWeaponTypes: Xl(),
			weaponPropertyMapping: Zl(),
			weaponTypeMapping: Ql()
		})
	};
}
//#endregion
//#region src/module/wfrp4e/critical-replacement.ts
var Pu = !1;
function Fu() {
	if (Pu) {
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
		let s = Bu(t);
		if (!Kl() || !s) return s && r(`${e} | Critical replacement fallthrough`, {
			table: t,
			reason: "replacement disabled",
			options: _u(a)
		}), i(t, a, o);
		let c = Ru(t, a), l = Te(a.messageId), u, d, f, p = l?.category;
		if (r(`${e} | Critical replacement inspecting WFRP critical roll`, {
			table: t,
			location: c,
			options: _u(a)
		}), !p) {
			try {
				u = await zu(a);
			} catch (e) {
				return bu("Expanded Critical Hits could not resolve the critical source item. See the browser console for details.", t, e);
			}
			let e = Nu(u);
			d = e.clues, f = e.resolution, p = ae(e.resolution.categories);
		}
		if (r(`${e} | Critical replacement damage category resolution`, {
			table: t,
			location: c,
			sourceItem: vu(u),
			categoryClues: d,
			categoryResolution: f,
			chosenCategory: p,
			damageConsoleSource: l,
			inferFromWeaponProperties: Yl(),
			inferFromWeaponTypes: Xl()
		}), !c || !p) return r(`${e} | Critical replacement fallthrough`, {
			table: t,
			reason: c ? "damage category unavailable" : "location unavailable"
		}), i(t, a, o);
		let m = Fl(!!game.settings.get("wfrp4e", "uiaCrits")), h = Nl(m, p, c);
		if (!n(h)) return bu(`Expanded Critical Hits table ${h} is missing from the module compendium.`, h);
		r(`${e} | Critical replacement rolling expanded table`, {
			table: t,
			expandedTableKey: h,
			ruleset: m,
			category: p,
			location: c
		});
		try {
			let e = await Iu(h, a, o);
			if (e !== void 0) return e;
		} catch (e) {
			return bu(`Expanded Critical Hits could not roll ${h}. See the browser console for details.`, h, e);
		}
		return bu(`Expanded Critical Hits could not use WFRP's RollTable API for ${h}.`, h);
	}, Pu = !0, r(`${e} | Critical replacement patch installed.`);
}
async function Iu(e, t, n) {
	let r = game.wfrp4e?.tables?.rollTable;
	if (typeof r != "function") return;
	let i = await r.call(game.wfrp4e.tables, e, t, n);
	if (await Lu(i, t)) return null;
	let a = Vu(i);
	return t.returnResult ? i : a?.result;
}
async function Lu(t, n) {
	let i = Vu(Vu(t)?.object)?.documentUuid;
	if (typeof i != "string") return r(`${e} | Expanded critical result had no document UUID`, { result: t }), !1;
	let a = Su(await fromUuid(i), n);
	if (!a) throw Error(`Could not resolve expanded critical item ${i}.`);
	return r(`${e} | Posting expanded critical item`, {
		documentUuid: i,
		messageId: n.messageId,
		criticalLocation: n.criticalLocation
	}), await a.postItem(void 0, { "flags.wfrp4e.sourceMessageId": n.messageId }), !0;
}
function Ru(e, t) {
	let n = t.criticalLocation;
	return Pl(typeof n == "string" ? n : e.replace(/^crit/i, ""));
}
async function zu(e) {
	let t = e.sourceItemUuid;
	if (typeof t == "string") return await fromUuid(t);
	let n = e.messageId;
	if (typeof n != "string") return;
	let r = Vu(Vu(game.messages.get(n)?.system)?.test), i = Vu(r?.preData);
	return r?.item ?? r?.weapon ?? i?.item;
}
function Bu(e) {
	return /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function Vu(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/support.ts
var Hu = "ech-wounding-properties", Uu = new Set(Object.values(y));
function Wu(e) {
	let t = { ...e };
	for (let e of _) t[y[e]] = b[e];
	return t;
}
function Gu(e) {
	return Xu(e) || Zu(e);
}
function Ku(e) {
	return e?.type === "spell" || e?.type === "prayer";
}
function qu(e) {
	let t = Eu(Q(Q(e?.system)?.qualities)?.value), n = [];
	for (let e of t) {
		let t = Q(e)?.name;
		if (typeof t != "string") continue;
		let r = ed(t);
		r && n.push(b[r]);
	}
	return n;
}
function Ju(e) {
	if (!(typeof e != "object" || !e)) return e;
}
function Yu(e) {
	if (typeof e != "object" || !e) return;
	let t = e;
	if (!(t.qualities !== void 0 && !Array.isArray(t.qualities))) return t;
}
function Xu(e) {
	return e?.type === "weapon" || e?.type === "ammunition" || e?.system?.isWeapon === !0;
}
function Zu(e) {
	return (e?.type === "spell" || e?.type === "prayer") && Qu(e.system);
}
function Qu(e) {
	let t = Q(e?.damage), n = Q(e?.magicMissile);
	return $u(t?.value) || $u(t?.dice) || t?.addSL === !0 || n?.value === !0;
}
function $u(e) {
	return typeof e == "number" ? e !== 0 : typeof e == "string" && e.trim().length > 0;
}
function ed(e) {
	return _.find((t) => y[t] === e);
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/actions.ts
var td = `.${Hu}__sheet-row a[data-ech-action="configureProperties"]`, nd = /* @__PURE__ */ new Map(), rd = !1;
function id() {
	rd ||= (document.addEventListener("click", cd, !0), !0);
}
function ad(e) {
	return e?.uuid;
}
function od(e, t) {
	nd.set(e, t);
}
function sd(e) {
	let t = dd();
	!e || !t || new t(e).render(!0);
}
function cd(e) {
	let t = ld(e.target);
	t && (e.preventDefault(), e.stopPropagation(), ud(t));
}
function ld(e) {
	if (e instanceof Element) return e.closest(td) ?? void 0;
}
async function ud(e) {
	let t = e.closest(`.${Hu}__sheet-row`)?.dataset.echItemUuid;
	if (!t) return;
	let n = await fromUuid(t);
	if (!pd(n)) return;
	let r = nd.get(t);
	if (r) {
		r(n);
		return;
	}
	sd(n);
}
function dd() {
	let e = game.wfrp4e?.apps?.ItemProperties;
	if (fd(e)) return e;
}
function fd(e) {
	return typeof e == "function";
}
function pd(e) {
	return typeof e == "object" && !!e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/actor-sheet.ts
var md = /* @__PURE__ */ new WeakSet();
function hd(e, t) {
	if (!(t instanceof HTMLElement)) return;
	let n = gd(t, "combat"), r = gd(t, "trappings");
	n && (_d(n), vd(e, n)), r && (yd(e, r), !md.has(r) && (new MutationObserver(() => {
		yd(e, r);
	}).observe(r, {
		childList: !0,
		subtree: !0
	}), md.add(r)));
}
function gd(e, t) {
	return e.matches(`section[data-tab="${t}"]`) ? e : e.querySelector(`section[data-tab="${t}"]`) ?? void 0;
}
function _d(e) {
	let t = new Set(Object.values(b)), n = e.querySelectorAll(".item-property-row a[data-action=\"itemPropertyDropdown\"][data-type=\"qualities\"]");
	for (let e of n) t.has(e.textContent.trim()) && e.classList.add("ech-wounding-property-combat-text");
}
function vd(e, t) {
	let n = t.querySelectorAll(".list-row[data-uuid] .item-property-row:not([data-ech-inference-checked=\"true\"])");
	for (let t of n) {
		t.dataset.echInferenceChecked = "true";
		let n = Sd(e, t);
		if (Td(n)) for (let e of n.categories) t.append(Ed("combat", e, n));
	}
}
function yd(e, t) {
	bd(t), xd(e, t);
}
function bd(e) {
	let t = new Set(Object.values(b)), n = e.querySelectorAll(".tags .tag:not(.ech-inferred-damage-type)");
	for (let e of n) t.has(e.textContent.trim()) && e.classList.add("ech-wounding-property-trappings-badge");
}
function xd(e, t) {
	let n = t.querySelectorAll(".list-row[data-uuid] .tags:not([data-ech-inference-checked=\"true\"])");
	for (let t of n) {
		t.dataset.echInferenceChecked = "true";
		let n = Sd(e, t);
		if (Td(n)) for (let e of n.categories) t.append(Ed("trappings", e, n));
	}
}
function Sd(t, n) {
	let i = n.closest(".list-row[data-uuid]")?.dataset.uuid;
	if (i) try {
		let n = Cd(t, i);
		if (!wd(n)) {
			r(`${e} | Inferred damage display skipped for ${i}: item unavailable or unsupported.`);
			return;
		}
		let a = Nu(n).resolution;
		return r(`${e} | Inferred damage display resolved ${i}: source=${a.source} categories=${a.categories.join(",") || "none"}`), a;
	} catch (t) {
		r(`${e} | Could not display inferred damage type`, {
			error: t,
			uuid: i
		});
		return;
	}
}
function Cd(e, t) {
	let n = Q(e), r = Q((Q(n?.actor) ?? Q(n?.document))?.items), i = r?.get, a = t.split(".").at(-1);
	if (!(typeof i != "function" || !a)) return i.call(r, a);
}
function wd(e) {
	let t = Q(e), n = Q(t?.system);
	return t?.type === "weapon" || t?.type === "ammunition" || n?.isWeapon === !0;
}
function Td(e) {
	return e?.source === "weaponProperty" || e?.source === "weaponType";
}
function Ed(e, t, n) {
	let r = document.createElement(e === "combat" ? "span" : "div"), i = Dd(t, n.source, n.matches);
	return r.classList.add("ech-inferred-damage-type", `ech-inferred-damage-type--${e}`), e === "trappings" && r.classList.add("tag"), r.dataset.echDamageCategory = t, r.dataset.tooltip = i, r.setAttribute("aria-label", i), r.textContent = ee[t], r;
}
function Dd(e, t, n) {
	let r = n.filter((t) => t.category === e).map((e) => Od(e.key, t)), i = t === "weaponProperty" ? "item property" : "weapon type";
	return r.length > 0 ? `Inferred from ${r.join(", ")}` : `Inferred from ${i}`;
}
function Od(e, t) {
	if (t === "weaponProperty") {
		let t = game.wfrp4e?.utility?.qualityList?.() ?? {}, n = wl(e);
		for (let [e, r] of Object.entries(t)) if (wl(e) === n || wl(r) === n) return r;
	}
	return e.replaceAll(/([a-z])([A-Z])/g, "$1 $2").replaceAll(/[_-]+/g, " ").trim().replaceAll(/\b\w/g, (e) => e.toUpperCase());
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/debug.ts
function kd(e) {
	if (!(typeof e != "object" || !e)) return e.constructor?.name;
}
function Ad(e) {
	if (e) return {
		id: e.id,
		name: e.name,
		type: e.type,
		uuid: e.uuid
	};
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/sheet-box.ts
function jd(e, t, n) {
	let r = document.createElement("div");
	r.classList.add("attribute-box", "top-label", `${Hu}__sheet-row`);
	let i = ad(n);
	i && (r.dataset.echItemUuid = i, od(i, Nd(e, n)));
	let a = document.createElement("div");
	a.classList.add("label"), a.style.gridColumn = "1 / span 12", a.innerHTML = "<label><a data-ech-action=\"configureProperties\">Damage Type <i class=\"fas fa-cog\"></i></a></label>";
	let o = document.createElement("div");
	o.classList.add("field"), o.style.gridColumn = "1 / span 12";
	let s = document.createElement("input");
	return s.type = "text", s.value = t.join(","), s.readOnly = !0, o.append(s), r.append(a, o), Md(r, n), r;
}
function Md(e, t) {
	e.querySelector("a[data-ech-action=\"configureProperties\"]")?.addEventListener("click", (e) => {
		e.preventDefault(), sd(t);
	});
}
function Nd(e, t) {
	return Pd(e) || ((e) => {
		sd(e ?? t);
	});
}
function Pd(e) {
	if (typeof e != "object" || !e) return;
	let t = e.constructor?.DEFAULT_OPTIONS?.actions?.configureProperties;
	if (typeof t == "function") return (e) => {
		t.call({ document: e });
	};
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/sheet.ts
function Fd(t) {
	if (!(t instanceof HTMLElement)) {
		r(`${e} | ItemProperties render hook skipped: element is not HTMLElement`, { elementType: typeof t });
		return;
	}
	let n = t.querySelector(".property-column");
	if (!n) {
		r(`${e} | ItemProperties render hook skipped: quality column not found.`);
		return;
	}
	let i = Ld(n);
	if (i.length === 0) {
		r(`${e} | ItemProperties render hook found no damage type rows`, { checkboxCount: n.querySelectorAll("input[type=\"checkbox\"]").length });
		return;
	}
	r(`${e} | Grouping ItemProperties damage type rows`, { woundingRowCount: i.length });
	let a = n.querySelector(`.${Hu}`), o = a ?? document.createElement("div");
	a || (o.classList.add(Hu), o.append(Rd()));
	for (let e of i) o.append(e);
	let s = n.querySelector("input[name=\"custom-quality\"]")?.parentElement;
	if (s) {
		s.before(o);
		return;
	}
	n.append(o);
}
function Id(t, n) {
	if (!(n instanceof HTMLElement)) {
		r(`${e} | Item sheet render hook skipped: element is not HTMLElement`, {
			applicationName: kd(t),
			elementType: typeof n
		});
		return;
	}
	let i = Ju(t), a = i?.document ?? i?.item;
	if (!Gu(a)) {
		r(`${e} | Item sheet render hook skipped: unsupported document`, {
			applicationName: kd(t),
			document: Ad(a)
		});
		return;
	}
	r(`${e} | Item sheet render hook inspecting supported document`, {
		applicationName: kd(t),
		document: Ad(a)
	});
	let o = Bd(n);
	if (!o) {
		r(`${e} | Item sheet qualities box not found; trying standalone damage row`, { document: Ad(a) }), zd(t, n, a);
		return;
	}
	let s = o.querySelector(".field input");
	if (!s) {
		r(`${e} | Item sheet qualities input not found`, { document: Ad(a) });
		return;
	}
	let c = Vd(s.value);
	if (c.wounding.length === 0) {
		r(`${e} | Item sheet qualities contain no damage type labels`, {
			document: Ad(a),
			displayedQualities: s.value
		});
		return;
	}
	r(`${e} | Splitting item sheet damage type labels into their own row`, {
		document: Ad(a),
		normalQualities: c.normal,
		woundingQualities: c.wounding
	}), s.value = c.normal.join(","), o.parentElement?.querySelector(`.${Hu}__sheet-row`)?.remove(), o.after(jd(t, c.wounding, a));
}
function Ld(e) {
	let t = e.querySelectorAll("input[type=\"checkbox\"]"), n = [];
	for (let e of t) {
		if (!Uu.has(e.name)) continue;
		let t = e.closest(".form-group");
		t && n.push(t);
	}
	return n;
}
function Rd() {
	let e = document.createElement("h2");
	return e.classList.add("property-header", `${Hu}__header`), e.textContent = "Damage Type", e;
}
function zd(t, n, i) {
	if (!Ku(i)) {
		r(`${e} | Standalone damage type row skipped: unsupported document`, { document: Ad(i) });
		return;
	}
	if (n.querySelector(".ech-wounding-properties__sheet-row")) {
		r(`${e} | Standalone damage type row skipped: row already exists`, { document: Ad(i) });
		return;
	}
	let a = Hd(n);
	if (!a) {
		r(`${e} | Standalone damage type row skipped: damage fieldset not found`, { document: Ad(i) });
		return;
	}
	let o = qu(i);
	r(`${e} | Appending standalone damage type row`, {
		document: Ad(i),
		labels: o
	}), a.after(jd(t, o, i));
}
function Bd(e) {
	let t = e.querySelectorAll("a[data-action=\"configureProperties\"]");
	for (let e of t) if (e.textContent.trim().startsWith("Qualities")) return e.closest(".attribute-box") ?? void 0;
}
function Vd(e) {
	let t = [], n = [], r = new Set(Object.values(b));
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
function Hd(e) {
	let t = e.querySelectorAll("fieldset");
	for (let e of t) if (e.querySelector("legend")?.textContent.trim() === "Damage") return e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/display.ts
var Ud = !1, Wd = Symbol.for(`${e}.woundingPropertiesContextPatched`);
function Gd() {
	if (id(), Jd(), Ud) {
		r(`${e} | Wounding property display hooks already installed.`);
		return;
	}
	Hooks.on("renderItemProperties", (e, t) => {
		Fd(t);
	}), Hooks.on("renderApplicationV2", (e, t) => {
		Id(e, t), hd(e, t), qd(e) && Kd(e);
	}), Hooks.on("renderBaseWFRP4eActorSheet", (e, t) => {
		hd(e, t), Kd(e);
	}), Ud = !0, r(`${e} | Wounding property display hooks installed.`);
}
function Kd(t, n = 5) {
	typeof t != "object" || !t || requestAnimationFrame(() => {
		let i = t.element;
		if (i instanceof HTMLElement && i.isConnected) {
			r(`${e} | Styling committed WFRP actor sheet with ${i.querySelectorAll(".item-property-row").length} property rows.`), hd(t, i);
			return;
		}
		if (n > 1) {
			Kd(t, n - 1);
			return;
		}
		r(`${e} | Committed WFRP actor sheet element was unavailable.`);
	});
}
function qd(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e.actor;
	return typeof t == "object" && !!t;
}
function Jd() {
	let t = Yd()?.prototype, n = t?._prepareContext;
	if (!t || !n) {
		r(`${e} | ItemProperties context patch skipped: application unavailable.`);
		return;
	}
	if (Xd(n)) {
		r(`${e} | ItemProperties context patch already installed.`);
		return;
	}
	let i = async function(...e) {
		let t = this.document;
		Gu(t) && (this.qualities = Wu(this.qualities ?? {}));
		let r = await n.apply(this, e);
		return Zd(this, r), r;
	};
	Object.defineProperty(i, Wd, { value: !0 }), t._prepareContext = i, r(`${e} | ItemProperties context patch installed.`);
}
function Yd() {
	let e = game.wfrp4e?.apps?.ItemProperties;
	return typeof e == "function" ? e : void 0;
}
function Xd(e) {
	return !!e[Wd];
}
function Zd(t, n) {
	let i = Ju(t), a = Yu(n), o = i?.document;
	if (!i || !a || !Gu(o)) {
		r(`${e} | Skipping ItemProperties damage type context append`, {
			applicationName: Qd(t),
			hasItemProperties: !!i,
			hasRenderContext: !!a,
			document: $d(o),
			supportsDamageTypeProperties: Gu(o)
		});
		return;
	}
	r(`${e} | Appending damage types to ItemProperties context`, {
		applicationName: Qd(t),
		document: $d(o),
		originalQualityCount: Object.keys(i.qualities ?? {}).length,
		renderedQualityCount: a.qualities?.length ?? 0
	}), i.qualities = Wu(i.qualities ?? {}), a.qualities ??= [];
	for (let e of _) {
		let t = y[e];
		a.qualities.some((e) => e.key === t) || a.qualities.push({
			existing: i.document?.originalProperties?.qualities?.[t],
			hasValue: !1,
			key: t,
			name: b[e]
		});
	}
	r(`${e} | ItemProperties context after damage type append`, {
		document: $d(o),
		renderedQualityCount: a.qualities.length
	});
}
function Qd(e) {
	if (!(typeof e != "object" || !e)) return e.constructor?.name;
}
function $d(e) {
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
var ef = !1;
function tf() {
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
	}), nf(), Gd();
}
function nf() {
	let t = game.wfrp4e?.utility, n = t?.qualityList;
	if (ef || !t || !n) {
		r(`${e} | Quality list patch skipped`, {
			qualityListPatchInstalled: ef,
			hasUtility: !!t,
			hasOriginalQualityList: !!n
		});
		return;
	}
	t.qualityList = function(e) {
		let t = n.call(this, e);
		return e === "armor" ? t : Wu(t);
	}, ef = !0, r(`${e} | Quality list patch installed.`);
}
//#endregion
//#region src/module/wfrp4e/zero-wound-critical-links.ts
var rf = "data-ech-source-item-uuid", af = "data-ech-critical-location", of = !1;
function sf() {
	of ||= (cf(), document.addEventListener("click", ff, !0), !0);
}
function cf() {
	let e = CONFIG.Actor?.documentClass?.prototype, t = e?.applyDamage;
	typeof t != "function" || !e || (e.applyDamage = async function(e, n = {}) {
		let r = await t.call(this, e, n), i = lf(n);
		return typeof r != "string" || !i || !r.includes("critical-roll") ? r : df(r, i, uf(n));
	});
}
function lf(e) {
	let t = $($(e.sourceTest)?.item), n = $($($(e.opposedTest)?.attackerTest)?.item), r = $(e.sourceItem), i = t?.uuid ?? n?.uuid ?? r?.uuid;
	return typeof i == "string" ? i : void 0;
}
function uf(e) {
	let t = $($(e.opposedTest)?.result)?.hitloc, n = $(t)?.value, r = e.loc, i;
	return typeof n == "string" ? i = n : typeof r == "string" && (i = r), i && Pl(i) ? i : void 0;
}
function df(e, t, n) {
	let r = [`${rf}="${_f(t)}"`, n ? `${af}="${_f(n)}"` : void 0].filter(Boolean).join(" ");
	return e.replaceAll(/<a\b(?![^>]*\bdata-ech-source-item-uuid=)(?=[^>]*\bcritical-roll\b)/g, `<a ${r}`);
}
function ff(e) {
	let t = e.target;
	if (!(t instanceof Element) || !Kl()) return;
	let n = t.closest(`[data-action="clickTable"][${rf}]`);
	!(n instanceof HTMLElement) || !gf(n.dataset.table) || (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), pf(n).catch((e) => {
		mf("Expanded Critical Hits could not roll an annotated zero-wound critical. See the browser console for details.", e);
	}));
}
async function pf(e) {
	let t = e.dataset.table, n = game.wfrp4e?.tables?.formatChatRoll;
	if (!t || typeof n != "function") return;
	let r = e.closest("[data-message-id]")?.dataset.messageId, i = Number.parseInt(e.dataset.modifier ?? "0", 10) || 0, a = await n(t, {
		criticalLocation: e.dataset.echCriticalLocation ?? hf(r),
		messageId: r,
		modifier: i,
		showRoll: !0,
		sourceItemUuid: e.dataset.echSourceItemUuid
	}, e.dataset.column);
	if (typeof a != "string" || a.length === 0) return;
	let o = game.wfrp4e?.utility?.chatDataSetup, s = typeof o == "function" ? o("", game.settings.get("core", "rollMode"), !0) : { content: "" };
	s.content = a, await ChatMessage.create(s);
}
function mf(t, n) {
	o(`${e} | ${t}`, n), ui.notifications?.error(t);
}
function hf(e) {
	if (!e) return;
	let t = $($($(game.messages.get(e)?.system)?.test)?.result)?.hitloc, n = $(t)?.result;
	return typeof n == "string" ? n : void 0;
}
function gf(e) {
	return typeof e == "string" && /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function _f(e) {
	return e.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function $(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/hooks/register-module-hooks.ts
function vf() {
	Hooks.once("init", () => {
		i(`${e} | Initializing`), Gl(), r(`${e} | init hook running`, {
			foundryVersion: game.version,
			systemId: game.system?.id,
			userIsGM: game.user?.isGM
		}), Gd(), bl(), tf();
	}), Hooks.once("ready", () => {
		yf();
	});
}
async function yf() {
	if (r(`${e} | ready hook running`, {
		foundryVersion: game.version,
		systemId: game.system?.id,
		userIsGM: game.user?.isGM,
		settings: tu(),
		wfrpConfigAvailable: !!game.wfrp4e?.config,
		wfrpTablesAvailable: !!game.wfrp4e?.tables
	}), game.system.id !== "wfrp4e") {
		a(`${e} | Loaded outside ${t}; skipping WFRP integration.`);
		return;
	}
	gu(), await Jl(), r(`${e} | ready hook after mapping normalization`, { settings: tu() }), tf(), await d(), su(), Fu(), sf(), i(`${e} | Ready`);
}
//#endregion
//#region src/main.ts
vf();
//#endregion

//# sourceMappingURL=wfrp4e-expanded-critical-hits.mjs.map