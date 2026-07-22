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
}, S = new Map(_.map((e) => [y[e], ee[e]])), C = new Map(g.map((e) => [v[e], e]));
function te(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = S.get(n) ?? C.get(n);
		e && t.add(e);
	}
	return g.filter((e) => t.has(e));
}
function ne(e, t = Math.random()) {
	if (e.length !== 0) return e[Math.min(Math.floor(t * e.length), e.length - 1)];
}
var w = [
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
function re(e) {
	return {
		...e,
		damageFormula: e.damageFormula.trim(),
		targetUuids: [...new Set(e.targetUuids.map((e) => e.trim()).filter(Boolean))]
	};
}
function T(e) {
	let t = [];
	return e.damageFormula.trim() || t.push("damageFormulaRequired"), w.includes(e.hitLocation) || t.push("hitLocationInvalid"), e.targetUuids.every((e) => !e.trim()) && t.push("targetsRequired"), e.woundingType !== null && !_.includes(e.woundingType) && t.push("woundingTypeInvalid"), t;
}
//#endregion
//#region src/functions/damage-console/card.ts
function ie(e, t) {
	let n = re(e), r = new Map(t.map((e) => [e.uuid, e]));
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
function E(e, t, n) {
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
function ae(e) {
	if (e.woundingType) return {
		category: ee[e.woundingType],
		woundingType: e.woundingType
	};
}
function oe(e) {
	let t = de(e);
	if (t?.version !== 1 || typeof t.damageFormula != "string" || !le(t.hitLocation) || typeof t.ignoreArmour != "boolean" || typeof t.ignoreToughness != "boolean" || typeof t.minimumOne != "boolean" || !ue(t.woundingType) || !Array.isArray(t.targets)) return;
	let n = t.targets.map(se);
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
function se(e) {
	let t = de(e);
	if (typeof t?.uuid != "string" || typeof t.name != "string" || typeof t.img != "string") return;
	let n = t.result === null ? null : ce(t.result);
	if (n !== void 0) return {
		img: t.img,
		name: t.name,
		result: n,
		uuid: t.uuid
	};
}
function ce(e) {
	let t = de(e);
	if (!(typeof t?.appliedAt != "number" || typeof t.appliedBy != "string" || typeof t.damage != "number" || typeof t.hitLocation != "string" || typeof t.html != "string")) return {
		appliedAt: t.appliedAt,
		appliedBy: t.appliedBy,
		damage: t.damage,
		hitLocation: t.hitLocation,
		html: t.html
	};
}
function le(e) {
	return typeof e == "string" && w.includes(e);
}
function ue(e) {
	return e === null || typeof e == "string" && _.includes(e);
}
function de(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/card-storage.ts
var fe = "damageConsole";
function pe(t) {
	return oe(t.getFlag(e, fe));
}
function me(e) {
	if (typeof e != "string") return;
	let t = game.messages.get(e), n = t ? pe(t) : void 0;
	return n ? ae(n) : void 0;
}
function he(t, n) {
	let r = _e(t.flags) ?? {}, i = _e(r["wfrp4e-expanded-critical-hits"]) ?? {};
	t.flags = {
		...r,
		[e]: {
			...i,
			[fe]: n
		}
	};
}
function ge(t) {
	return { [`flags.${e}.${fe}`]: t };
}
function _e(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/card-renderer.ts
function ve(e) {
	let t = e.woundingType ? x[e.woundingType] : Ce("damageConsole.unspecified"), n = [e.ignoreArmour ? Ce("damageConsole.ignoreArmour") : void 0, e.ignoreToughness ? Ce("damageConsole.ignoreToughness") : void 0].filter((e) => !!e), r = n.length ? n.join(", ") : Ce("damageConsole.none");
	return `<div class="wfrp4e chat-card ech-damage-console-card">
    <h3><i class="fa-solid fa-bolt"></i> ${we(Ce("damageConsole.cardTitle"))}</h3>
    <dl class="ech-damage-console-card__summary">
      ${be(Ce("damageConsole.damage"), e.damageFormula)}
      ${be(Ce("damageConsole.hitLocation"), xe(e.hitLocation))}
      ${be(Ce("damageConsole.woundingType"), t)}
      ${be(Ce("damageConsole.ignores"), r)}
      ${be(Ce("damageConsole.minimumOne"), Se(e.minimumOne))}
    </dl>
    <div class="ech-damage-console-card__targets">
      ${e.targets.map(ye).join("")}
    </div>
  </div>`;
}
function ye(e) {
	let t = `<div class="ech-damage-console-card__identity">
    <img src="${Te(e.img)}" alt="" />
    <strong>${we(e.name)}</strong>
  </div>`;
	return e.result ? `<section class="ech-damage-console-card__target ech-damage-console-card__target--applied">
    ${t}
    <p class="ech-damage-console-card__roll">
      ${we(Ce("damageConsole.rolled"))}: <strong>${e.result.damage}</strong>
      &middot; ${we(xe(e.result.hitLocation))}
    </p>
    <div class="ech-damage-console-card__result">${e.result.html}</div>
  </section>` : `<section class="ech-damage-console-card__target">
      ${t}
      <button type="button" class="chat-button chat-button-gm ech-damage-console-card__apply"
        data-ech-action="applyDamage" data-target-uuid="${Te(e.uuid)}">
        <i class="fa-solid fa-bolt"></i> ${we(Ce("damageConsole.applyDamage"))}
      </button>
    </section>`;
}
function be(e, t) {
	return `<div><dt>${we(e)}</dt><dd>${we(t)}</dd></div>`;
}
function xe(e) {
	if (e === "roll") return game.i18n.localize("Roll");
	let t = game.wfrp4e?.config?.locations?.[e];
	return t ? game.i18n.localize(t) : e;
}
function Se(e) {
	return Ce(e ? "damageConsole.yes" : "damageConsole.no");
}
function Ce(e) {
	return game.i18n.localize(`WFRP4E_EXPANDED_CRITICAL_HITS.${e}`);
}
function we(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#039;");
}
function Te(e) {
	return we(e);
}
//#endregion
//#region src/module/wfrp4e/damage-console/targets.ts
function Ee() {
	let e = [...game.user.targets].map(Oe).filter((e) => !!e);
	return [...new Map(e.map((e) => [e.uuid, e])).values()];
}
async function De(e) {
	let t = await fromUuid(e), n = t?.actor ?? t;
	if (!ke(n)) throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.targetUnavailable", { uuid: e }));
	return {
		actor: n,
		snapshot: {
			img: Ae(t?.texture?.src) ?? "icons/svg/mystery-man.svg",
			name: Ae(t?.name) ?? e,
			uuid: e
		}
	};
}
function Oe(e) {
	let t = e, n = t?.document, r = Ae(n?.uuid);
	if (!(!r || !ke(n?.actor ?? t?.actor))) return {
		img: Ae(n?.texture?.src) ?? Ae(t?.texture?.src) ?? "icons/svg/mystery-man.svg",
		name: Ae(t?.name) ?? Ae(n?.name) ?? r,
		uuid: r
	};
}
function ke(e) {
	return typeof e == "object" && !!e && typeof e.applyBasicDamage == "function";
}
function Ae(e) {
	return typeof e == "string" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/runtime.ts
async function je(e, t) {
	let { actor: n } = await De(t), r = await Me(e.damageFormula), i = await Ne(e, n), a = Pe(e.ignoreArmour, e.ignoreToughness), o = await n.applyBasicDamage(r, {
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
async function Me(e) {
	try {
		let t = await new Roll(e).evaluate(), n = Number(t.total);
		if (!Number.isInteger(n) || n < 0) throw Error("Damage must resolve to a non-negative whole number.");
		return n;
	} catch (t) {
		throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.invalidFormula", { formula: e }), { cause: t });
	}
}
async function Ne(e, t) {
	if (e.hitLocation !== "roll") return e.hitLocation;
	let n = Ie(t.details?.hitLocationTable?.value) ?? Ie(t.system?.details?.hitLocationTable?.value) ?? "hitloc", r = Ie(Fe(await game.wfrp4e?.tables?.rollTable?.(n, { hideDSN: !0 }))?.result);
	if (!r) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.hitLocationFailed"));
	return r;
}
function Pe(e, t) {
	let n = game.wfrp4e?.config?.DAMAGE_TYPE;
	if (!n) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.damageApiUnavailable"));
	return e && t ? n.IGNORE_ALL : e ? n.IGNORE_AP : t ? n.IGNORE_TB : n.NORMAL;
}
function Fe(e) {
	return typeof e == "object" && e ? e : void 0;
}
function Ie(e) {
	return typeof e == "string" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/damage-console/chat-actions.ts
var Le = /* @__PURE__ */ new Map();
function Re() {
	Hooks.on("renderChatMessageHTML", (e, t) => {
		if (!Ve(e) || !(t instanceof HTMLElement) || !pe(e)) return;
		let n = t.querySelectorAll("[data-ech-action=\"applyDamage\"]");
		if (!game.user.isGM) {
			n.forEach((e) => e.remove());
			return;
		}
		n.forEach((t) => {
			t.addEventListener("click", (n) => {
				n.preventDefault(), t.disabled = !0;
				let r = t.dataset.targetUuid;
				r && ze(e, r).catch((e) => {
					t.disabled = !1, ui.notifications?.error(He(e));
				});
			});
		});
	});
}
async function ze(e, t) {
	let n = (Le.get(e.id) ?? Promise.resolve()).catch(() => void 0).then(async () => {
		await Be(e, t);
	});
	Le.set(e.id, n);
	try {
		await n;
	} finally {
		Le.get(e.id) === n && Le.delete(e.id);
	}
}
async function Be(e, t) {
	let n = pe(e);
	if (!n) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.cardUnavailable"));
	let r = n.targets.find((e) => e.uuid === t);
	if (!r) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.cardTargetUnavailable"));
	if (r.result) throw Error(game.i18n.format("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.alreadyApplied", { name: r.name }));
	let i = E(n, t, await je(n, t));
	await e.update({
		...ge(i),
		content: ve(i)
	});
}
function Ve(e) {
	return typeof e == "object" && !!e && typeof e.getFlag == "function" && typeof e.update == "function";
}
function He(e) {
	return e instanceof Error ? e.message : String(e);
}
//#endregion
//#region node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function Ue(e) {
	let t = /* @__PURE__ */ Object.create(null);
	for (let n of e.split(",")) t[n] = 1;
	return (e) => e in t;
}
var D = process.env.NODE_ENV === "production" ? {} : Object.freeze({}), We = process.env.NODE_ENV === "production" ? [] : Object.freeze([]), O = () => {}, Ge = () => !1, Ke = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), qe = (e) => e.startsWith("onUpdate:"), k = Object.assign, Je = (e, t) => {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}, Ye = Object.prototype.hasOwnProperty, A = (e, t) => Ye.call(e, t), j = Array.isArray, Xe = (e) => nt(e) === "[object Map]", Ze = (e) => nt(e) === "[object Set]", Qe = (e) => nt(e) === "[object Date]", M = (e) => typeof e == "function", N = (e) => typeof e == "string", $e = (e) => typeof e == "symbol", P = (e) => typeof e == "object" && !!e, et = (e) => (P(e) || M(e)) && M(e.then) && M(e.catch), tt = Object.prototype.toString, nt = (e) => tt.call(e), rt = (e) => nt(e).slice(8, -1), it = (e) => nt(e) === "[object Object]", at = (e) => N(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ot = /* @__PURE__ */ Ue(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), st = /* @__PURE__ */ Ue("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"), ct = (e) => {
	let t = /* @__PURE__ */ Object.create(null);
	return ((n) => t[n] || (t[n] = e(n)));
}, lt = /-\w/g, ut = ct((e) => e.replace(lt, (e) => e.slice(1).toUpperCase())), dt = /\B([A-Z])/g, ft = ct((e) => e.replace(dt, "-$1").toLowerCase()), pt = ct((e) => e.charAt(0).toUpperCase() + e.slice(1)), mt = ct((e) => e ? `on${pt(e)}` : ""), ht = (e, t) => !Object.is(e, t), gt = (e, ...t) => {
	for (let n = 0; n < e.length; n++) e[n](...t);
}, _t = (e, t, n, r = !1) => {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		writable: r,
		value: n
	});
}, vt = (e) => {
	let t = parseFloat(e);
	return isNaN(t) ? e : t;
}, yt, bt = () => yt ||= typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
function xt(e) {
	if (j(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = N(r) ? Tt(r) : xt(r);
			if (i) for (let e in i) t[e] = i[e];
		}
		return t;
	} else if (N(e) || P(e)) return e;
}
var St = /;(?![^(]*\))/g, Ct = /:([^]+)/, wt = /\/\*[^]*?\*\//g;
function Tt(e) {
	let t = {};
	return e.replace(wt, "").split(St).forEach((e) => {
		if (e) {
			let n = e.split(Ct);
			n.length > 1 && (t[n[0].trim()] = n[1].trim());
		}
	}), t;
}
function Et(e) {
	let t = "";
	if (N(e)) t = e;
	else if (j(e)) for (let n = 0; n < e.length; n++) {
		let r = Et(e[n]);
		r && (t += r + " ");
	}
	else if (P(e)) for (let n in e) e[n] && (t += n + " ");
	return t.trim();
}
var Dt = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", Ot = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", kt = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", At = /* @__PURE__ */ Ue(Dt), jt = /* @__PURE__ */ Ue(Ot), Mt = /* @__PURE__ */ Ue(kt), Nt = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Pt = /* @__PURE__ */ Ue(Nt);
Nt + "";
function Ft(e) {
	return !!e || e === "";
}
function It(e, t) {
	if (e.length !== t.length) return !1;
	let n = !0;
	for (let r = 0; n && r < e.length; r++) n = Lt(e[r], t[r]);
	return n;
}
function Lt(e, t) {
	if (e === t) return !0;
	let n = Qe(e), r = Qe(t);
	if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
	if (n = $e(e), r = $e(t), n || r) return e === t;
	if (n = j(e), r = j(t), n || r) return n && r ? It(e, t) : !1;
	if (n = P(e), r = P(t), n || r) {
		if (!n || !r || Object.keys(e).length !== Object.keys(t).length) return !1;
		for (let n in e) {
			let r = e.hasOwnProperty(n), i = t.hasOwnProperty(n);
			if (r && !i || !r && i || !Lt(e[n], t[n])) return !1;
		}
	}
	return String(e) === String(t);
}
function Rt(e, t) {
	return e.findIndex((e) => Lt(e, t));
}
var zt = (e) => !!(e && e.__v_isRef === !0), F = (e) => N(e) ? e : e == null ? "" : j(e) || P(e) && (e.toString === tt || !M(e.toString)) ? zt(e) ? F(e.value) : JSON.stringify(e, Bt, 2) : String(e), Bt = (e, t) => zt(t) ? Bt(e, t.value) : Xe(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n], r) => (e[Vt(t, r) + " =>"] = n, e), {}) } : Ze(t) ? { [`Set(${t.size})`]: [...t.values()].map((e) => Vt(e)) } : $e(t) ? Vt(t) : P(t) && !j(t) && !it(t) ? String(t) : t, Vt = (e, t = "") => $e(e) ? `Symbol(${e.description ?? t})` : e;
//#endregion
//#region node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
function Ht(e, ...t) {
	console.warn(`[Vue warn] ${e}`, ...t);
}
var I, Ut = class {
	constructor(e = !1) {
		this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && I && (I.active ? (this.parent = I, this.index = (I.scopes ||= []).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
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
			let t = I;
			try {
				return I = this, e();
			} finally {
				I = t;
			}
		} else process.env.NODE_ENV !== "production" && this._warnOnRun && Ht("cannot run an inactive effect scope.");
	}
	on() {
		++this._on === 1 && (this.prevScope = I, I = this);
	}
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (I === this) I = this.prevScope;
			else {
				let e = I;
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
function Wt(e) {
	return new Ut(e);
}
function Gt() {
	return I;
}
function Kt(e, t = !1) {
	I ? I.cleanups.push(e) : process.env.NODE_ENV !== "production" && !t && Ht("onScopeDispose() is called when there is no active effect scope to be associated with.");
}
var L, qt = /* @__PURE__ */ new WeakSet(), Jt = class {
	constructor(e) {
		this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, I && (I.active ? I.effects.push(this) : this.flags &= -2);
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		this.flags & 64 && (this.flags &= -65, qt.has(this) && (qt.delete(this), this.trigger()));
	}
	notify() {
		this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Qt(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2, fn(this), tn(this);
		let e = L, t = cn;
		L = this, cn = !0;
		try {
			return this.fn();
		} finally {
			process.env.NODE_ENV !== "production" && L !== this && Ht("Active effect was not restored correctly - this is likely a Vue internal bug."), nn(this), L = e, cn = t, this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let e = this.deps; e; e = e.nextDep) on(e);
			this.deps = this.depsTail = void 0, fn(this), this.onStop && this.onStop(), this.flags &= -2;
		}
	}
	trigger() {
		this.flags & 64 ? qt.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
	}
	runIfDirty() {
		rn(this) && this.run();
	}
	get dirty() {
		return rn(this);
	}
}, Yt = 0, Xt, Zt;
function Qt(e, t = !1) {
	if (e.flags |= 8, t) {
		e.next = Zt, Zt = e;
		return;
	}
	e.next = Xt, Xt = e;
}
function $t() {
	Yt++;
}
function en() {
	if (--Yt > 0) return;
	if (Zt) {
		let e = Zt;
		for (Zt = void 0; e;) {
			let t = e.next;
			e.next = void 0, e.flags &= -9, e = t;
		}
	}
	let e;
	for (; Xt;) {
		let t = Xt;
		for (Xt = void 0; t;) {
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
function tn(e) {
	for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function nn(e) {
	let t, n = e.depsTail, r = n;
	for (; r;) {
		let e = r.prevDep;
		r.version === -1 ? (r === n && (n = e), on(r), sn(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = e;
	}
	e.deps = t, e.depsTail = n;
}
function rn(e) {
	for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (an(t.dep.computed) || t.dep.version !== t.version)) return !0;
	return !!e._dirty;
}
function an(e) {
	if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === pn) || (e.globalVersion = pn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !rn(e)))) return;
	e.flags |= 2;
	let t = e.dep, n = L, r = cn;
	L = e, cn = !0;
	try {
		tn(e);
		let n = e.fn(e._value);
		(t.version === 0 || ht(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
	} catch (e) {
		throw t.version++, e;
	} finally {
		L = n, cn = r, nn(e), e.flags &= -3;
	}
}
function on(e, t = !1) {
	let { dep: n, prevSub: r, nextSub: i } = e;
	if (r && (r.nextSub = i, e.prevSub = void 0), i && (i.prevSub = r, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = i), n.subs === e && (n.subs = r, !r && n.computed)) {
		n.computed.flags &= -5;
		for (let e = n.computed.deps; e; e = e.nextDep) on(e, !0);
	}
	!t && !--n.sc && n.map && n.map.delete(n.key);
}
function sn(e) {
	let { prevDep: t, nextDep: n } = e;
	t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var cn = !0, ln = [];
function un() {
	ln.push(cn), cn = !1;
}
function dn() {
	let e = ln.pop();
	cn = e === void 0 ? !0 : e;
}
function fn(e) {
	let { cleanup: t } = e;
	if (e.cleanup = void 0, t) {
		let e = L;
		L = void 0;
		try {
			t();
		} finally {
			L = e;
		}
	}
}
var pn = 0, mn = class {
	constructor(e, t) {
		this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
}, hn = class {
	constructor(e) {
		this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
	}
	track(e) {
		if (!L || !cn || L === this.computed) return;
		let t = this.activeLink;
		if (t === void 0 || t.sub !== L) t = this.activeLink = new mn(L, this), L.deps ? (t.prevDep = L.depsTail, L.depsTail.nextDep = t, L.depsTail = t) : L.deps = L.depsTail = t, gn(t);
		else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
			let e = t.nextDep;
			e.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = e), t.prevDep = L.depsTail, t.nextDep = void 0, L.depsTail.nextDep = t, L.depsTail = t, L.deps === t && (L.deps = e);
		}
		return process.env.NODE_ENV !== "production" && L.onTrack && L.onTrack(k({ effect: L }, e)), t;
	}
	trigger(e) {
		this.version++, pn++, this.notify(e);
	}
	notify(e) {
		$t();
		try {
			if (process.env.NODE_ENV !== "production") for (let t = this.subsHead; t; t = t.nextSub) t.sub.onTrigger && !(t.sub.flags & 8) && t.sub.onTrigger(k({ effect: t.sub }, e));
			for (let e = this.subs; e; e = e.prevSub) e.sub.notify() && e.sub.dep.notify();
		} finally {
			en();
		}
	}
};
function gn(e) {
	if (e.dep.sc++, e.sub.flags & 4) {
		let t = e.dep.computed;
		if (t && !e.dep.subs) {
			t.flags |= 20;
			for (let e = t.deps; e; e = e.nextDep) gn(e);
		}
		let n = e.dep.subs;
		n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
	}
}
var _n = /* @__PURE__ */ new WeakMap(), vn = /* @__PURE__ */ Symbol(process.env.NODE_ENV === "production" ? "" : "Object iterate"), yn = /* @__PURE__ */ Symbol(process.env.NODE_ENV === "production" ? "" : "Map keys iterate"), bn = /* @__PURE__ */ Symbol(process.env.NODE_ENV === "production" ? "" : "Array iterate");
function R(e, t, n) {
	if (cn && L) {
		let r = _n.get(e);
		r || _n.set(e, r = /* @__PURE__ */ new Map());
		let i = r.get(n);
		i || (r.set(n, i = new hn()), i.map = r, i.key = n), process.env.NODE_ENV === "production" ? i.track() : i.track({
			target: e,
			type: t,
			key: n
		});
	}
}
function xn(e, t, n, r, i, a) {
	let o = _n.get(e);
	if (!o) {
		pn++;
		return;
	}
	let s = (o) => {
		o && (process.env.NODE_ENV === "production" ? o.trigger() : o.trigger({
			target: e,
			type: t,
			key: n,
			newValue: r,
			oldValue: i,
			oldTarget: a
		}));
	};
	if ($t(), t === "clear") o.forEach(s);
	else {
		let i = j(e), a = i && at(n);
		if (i && n === "length") {
			let e = Number(r);
			o.forEach((t, n) => {
				(n === "length" || n === bn || !$e(n) && n >= e) && s(t);
			});
		} else switch ((n !== void 0 || o.has(void 0)) && s(o.get(n)), a && s(o.get(bn)), t) {
			case "add":
				i ? a && s(o.get("length")) : (s(o.get(vn)), Xe(e) && s(o.get(yn)));
				break;
			case "delete":
				i || (s(o.get(vn)), Xe(e) && s(o.get(yn)));
				break;
			case "set":
				Xe(e) && s(o.get(vn));
				break;
		}
	}
	en();
}
function Sn(e, t) {
	let n = _n.get(e);
	return n && n.get(t);
}
function Cn(e) {
	let t = /* @__PURE__ */ B(e);
	return t === e ? t : (R(t, "iterate", bn), /* @__PURE__ */ z(e) ? t : t.map(mr));
}
function wn(e) {
	return R(e = /* @__PURE__ */ B(e), "iterate", bn), e;
}
function Tn(e, t) {
	return /* @__PURE__ */ dr(e) ? hr(/* @__PURE__ */ ur(e) ? mr(t) : t) : mr(t);
}
var En = {
	__proto__: null,
	[Symbol.iterator]() {
		return Dn(this, Symbol.iterator, (e) => Tn(this, e));
	},
	concat(...e) {
		return Cn(this).concat(...e.map((e) => j(e) ? Cn(e) : e));
	},
	entries() {
		return Dn(this, "entries", (e) => (e[1] = Tn(this, e[1]), e));
	},
	every(e, t) {
		return kn(this, "every", e, t, void 0, arguments);
	},
	filter(e, t) {
		return kn(this, "filter", e, t, (e) => e.map((e) => Tn(this, e)), arguments);
	},
	find(e, t) {
		return kn(this, "find", e, t, (e) => Tn(this, e), arguments);
	},
	findIndex(e, t) {
		return kn(this, "findIndex", e, t, void 0, arguments);
	},
	findLast(e, t) {
		return kn(this, "findLast", e, t, (e) => Tn(this, e), arguments);
	},
	findLastIndex(e, t) {
		return kn(this, "findLastIndex", e, t, void 0, arguments);
	},
	forEach(e, t) {
		return kn(this, "forEach", e, t, void 0, arguments);
	},
	includes(...e) {
		return jn(this, "includes", e);
	},
	indexOf(...e) {
		return jn(this, "indexOf", e);
	},
	join(e) {
		return Cn(this).join(e);
	},
	lastIndexOf(...e) {
		return jn(this, "lastIndexOf", e);
	},
	map(e, t) {
		return kn(this, "map", e, t, void 0, arguments);
	},
	pop() {
		return Mn(this, "pop");
	},
	push(...e) {
		return Mn(this, "push", e);
	},
	reduce(e, ...t) {
		return An(this, "reduce", e, t);
	},
	reduceRight(e, ...t) {
		return An(this, "reduceRight", e, t);
	},
	shift() {
		return Mn(this, "shift");
	},
	some(e, t) {
		return kn(this, "some", e, t, void 0, arguments);
	},
	splice(...e) {
		return Mn(this, "splice", e);
	},
	toReversed() {
		return Cn(this).toReversed();
	},
	toSorted(e) {
		return Cn(this).toSorted(e);
	},
	toSpliced(...e) {
		return Cn(this).toSpliced(...e);
	},
	unshift(...e) {
		return Mn(this, "unshift", e);
	},
	values() {
		return Dn(this, "values", (e) => Tn(this, e));
	}
};
function Dn(e, t, n) {
	let r = wn(e), i = r[t]();
	return r !== e && !/* @__PURE__ */ z(e) && (i._next = i.next, i.next = () => {
		let e = i._next();
		return e.done || (e.value = n(e.value)), e;
	}), i;
}
var On = Array.prototype;
function kn(e, t, n, r, i, a) {
	let o = wn(e), s = o !== e && !/* @__PURE__ */ z(e), c = o[t];
	if (c !== On[t]) {
		let t = c.apply(e, a);
		return s ? mr(t) : t;
	}
	let l = n;
	o !== e && (s ? l = function(t, r) {
		return n.call(this, Tn(e, t), r, e);
	} : n.length > 2 && (l = function(t, r) {
		return n.call(this, t, r, e);
	}));
	let u = c.call(o, l, r);
	return s && i ? i(u) : u;
}
function An(e, t, n, r) {
	let i = wn(e), a = i !== e && !/* @__PURE__ */ z(e), o = n, s = !1;
	i !== e && (a ? (s = r.length === 0, o = function(t, r, i) {
		return s && (s = !1, t = Tn(e, t)), n.call(this, t, Tn(e, r), i, e);
	}) : n.length > 3 && (o = function(t, r, i) {
		return n.call(this, t, r, i, e);
	}));
	let c = i[t](o, ...r);
	return s ? Tn(e, c) : c;
}
function jn(e, t, n) {
	let r = /* @__PURE__ */ B(e);
	R(r, "iterate", bn);
	let i = r[t](...n);
	return (i === -1 || i === !1) && /* @__PURE__ */ fr(n[0]) ? (n[0] = /* @__PURE__ */ B(n[0]), r[t](...n)) : i;
}
function Mn(e, t, n = []) {
	un(), $t();
	let r = (/* @__PURE__ */ B(e))[t].apply(e, n);
	return en(), dn(), r;
}
var Nn = /* @__PURE__ */ Ue("__proto__,__v_isRef,__isVue"), Pn = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter($e));
function Fn(e) {
	$e(e) || (e = String(e));
	let t = /* @__PURE__ */ B(this);
	return R(t, "has", e), t.hasOwnProperty(e);
}
var In = class {
	constructor(e = !1, t = !1) {
		this._isReadonly = e, this._isShallow = t;
	}
	get(e, t, n) {
		if (t === "__v_skip") return e.__v_skip;
		let r = this._isReadonly, i = this._isShallow;
		if (t === "__v_isReactive") return !r;
		if (t === "__v_isReadonly") return r;
		if (t === "__v_isShallow") return i;
		if (t === "__v_raw") return n === (r ? i ? rr : nr : i ? tr : er).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
		let a = j(e);
		if (!r) {
			let e;
			if (a && (e = En[t])) return e;
			if (t === "hasOwnProperty") return Fn;
		}
		let o = Reflect.get(e, t, /* @__PURE__ */ V(e) ? e : n);
		if (($e(t) ? Pn.has(t) : Nn(t)) || (r || R(e, "get", t), i)) return o;
		if (/* @__PURE__ */ V(o)) {
			let e = a && at(t) ? o : o.value;
			return r && P(e) ? /* @__PURE__ */ sr(e) : e;
		}
		return P(o) ? r ? /* @__PURE__ */ sr(o) : /* @__PURE__ */ ar(o) : o;
	}
}, Ln = class extends In {
	constructor(e = !1) {
		super(!1, e);
	}
	set(e, t, n, r) {
		let i = e[t], a = j(e) && at(t);
		if (!this._isShallow) {
			let r = /* @__PURE__ */ dr(i);
			if (!/* @__PURE__ */ z(n) && !/* @__PURE__ */ dr(n) && (i = /* @__PURE__ */ B(i), n = /* @__PURE__ */ B(n)), !a && /* @__PURE__ */ V(i) && !/* @__PURE__ */ V(n)) return r ? (process.env.NODE_ENV !== "production" && Ht(`Set operation on key "${String(t)}" failed: target is readonly.`, e[t]), !0) : (i.value = n, !0);
		}
		let o = a ? Number(t) < e.length : A(e, t), s = Reflect.set(e, t, n, /* @__PURE__ */ V(e) ? e : r);
		return e === /* @__PURE__ */ B(r) && (o ? ht(n, i) && xn(e, "set", t, n, i) : xn(e, "add", t, n)), s;
	}
	deleteProperty(e, t) {
		let n = A(e, t), r = e[t], i = Reflect.deleteProperty(e, t);
		return i && n && xn(e, "delete", t, void 0, r), i;
	}
	has(e, t) {
		let n = Reflect.has(e, t);
		return (!$e(t) || !Pn.has(t)) && R(e, "has", t), n;
	}
	ownKeys(e) {
		return R(e, "iterate", j(e) ? "length" : vn), Reflect.ownKeys(e);
	}
}, Rn = class extends In {
	constructor(e = !1) {
		super(!0, e);
	}
	set(e, t) {
		return process.env.NODE_ENV !== "production" && Ht(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
	}
	deleteProperty(e, t) {
		return process.env.NODE_ENV !== "production" && Ht(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
	}
}, zn = /* @__PURE__ */ new Ln(), Bn = /* @__PURE__ */ new Rn(), Vn = /* @__PURE__ */ new Ln(!0), Hn = /* @__PURE__ */ new Rn(!0), Un = (e) => e, Wn = (e) => Reflect.getPrototypeOf(e);
function Gn(e, t, n) {
	return function(...r) {
		let i = this.__v_raw, a = /* @__PURE__ */ B(i), o = Xe(a), s = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, l = i[e](...r), u = n ? Un : t ? hr : mr;
		return !t && R(a, "iterate", c ? yn : vn), k(Object.create(l), { next() {
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
function Kn(e) {
	return function(...t) {
		if (process.env.NODE_ENV !== "production") {
			let n = t[0] ? `on key "${t[0]}" ` : "";
			Ht(`${pt(e)} operation ${n}failed: target is readonly.`, /* @__PURE__ */ B(this));
		}
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function qn(e, t) {
	let n = {
		get(n) {
			let r = this.__v_raw, i = /* @__PURE__ */ B(r), a = /* @__PURE__ */ B(n);
			e || (ht(n, a) && R(i, "get", n), R(i, "get", a));
			let { has: o } = Wn(i), s = t ? Un : e ? hr : mr;
			if (o.call(i, n)) return s(r.get(n));
			if (o.call(i, a)) return s(r.get(a));
			r !== i && r.get(n);
		},
		get size() {
			let t = this.__v_raw;
			return !e && R(/* @__PURE__ */ B(t), "iterate", vn), t.size;
		},
		has(t) {
			let n = this.__v_raw, r = /* @__PURE__ */ B(n), i = /* @__PURE__ */ B(t);
			return e || (ht(t, i) && R(r, "has", t), R(r, "has", i)), t === i ? n.has(t) : n.has(t) || n.has(i);
		},
		forEach(n, r) {
			let i = this, a = i.__v_raw, o = /* @__PURE__ */ B(a), s = t ? Un : e ? hr : mr;
			return !e && R(o, "iterate", vn), a.forEach((e, t) => n.call(r, s(e), s(t), i));
		}
	};
	return k(n, e ? {
		add: Kn("add"),
		set: Kn("set"),
		delete: Kn("delete"),
		clear: Kn("clear")
	} : {
		add(e) {
			let n = /* @__PURE__ */ B(this), r = Wn(n), i = /* @__PURE__ */ B(e), a = !t && !/* @__PURE__ */ z(e) && !/* @__PURE__ */ dr(e) ? i : e;
			return r.has.call(n, a) || ht(e, a) && r.has.call(n, e) || ht(i, a) && r.has.call(n, i) || (n.add(a), xn(n, "add", a, a)), this;
		},
		set(e, n) {
			!t && !/* @__PURE__ */ z(n) && !/* @__PURE__ */ dr(n) && (n = /* @__PURE__ */ B(n));
			let r = /* @__PURE__ */ B(this), { has: i, get: a } = Wn(r), o = i.call(r, e);
			o ? process.env.NODE_ENV !== "production" && $n(r, i, e) : (e = /* @__PURE__ */ B(e), o = i.call(r, e));
			let s = a.call(r, e);
			return r.set(e, n), o ? ht(n, s) && xn(r, "set", e, n, s) : xn(r, "add", e, n), this;
		},
		delete(e) {
			let t = /* @__PURE__ */ B(this), { has: n, get: r } = Wn(t), i = n.call(t, e);
			i ? process.env.NODE_ENV !== "production" && $n(t, n, e) : (e = /* @__PURE__ */ B(e), i = n.call(t, e));
			let a = r ? r.call(t, e) : void 0, o = t.delete(e);
			return i && xn(t, "delete", e, void 0, a), o;
		},
		clear() {
			let e = /* @__PURE__ */ B(this), t = e.size !== 0, n = process.env.NODE_ENV === "production" ? void 0 : Xe(e) ? new Map(e) : new Set(e), r = e.clear();
			return t && xn(e, "clear", void 0, void 0, n), r;
		}
	}), [
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((r) => {
		n[r] = Gn(r, e, t);
	}), n;
}
function Jn(e, t) {
	let n = qn(e, t);
	return (t, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? t : Reflect.get(A(n, r) && r in t ? n : t, r, i);
}
var Yn = { get: /* @__PURE__ */ Jn(!1, !1) }, Xn = { get: /* @__PURE__ */ Jn(!1, !0) }, Zn = { get: /* @__PURE__ */ Jn(!0, !1) }, Qn = { get: /* @__PURE__ */ Jn(!0, !0) };
function $n(e, t, n) {
	let r = /* @__PURE__ */ B(n);
	if (r !== n && t.call(e, r)) {
		let t = rt(e);
		Ht(`Reactive ${t} contains both the raw and reactive versions of the same object${t === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
	}
}
var er = /* @__PURE__ */ new WeakMap(), tr = /* @__PURE__ */ new WeakMap(), nr = /* @__PURE__ */ new WeakMap(), rr = /* @__PURE__ */ new WeakMap();
function ir(e) {
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
function ar(e) {
	return /* @__PURE__ */ dr(e) ? e : lr(e, !1, zn, Yn, er);
}
// @__NO_SIDE_EFFECTS__
function or(e) {
	return lr(e, !1, Vn, Xn, tr);
}
// @__NO_SIDE_EFFECTS__
function sr(e) {
	return lr(e, !0, Bn, Zn, nr);
}
// @__NO_SIDE_EFFECTS__
function cr(e) {
	return lr(e, !0, Hn, Qn, rr);
}
function lr(e, t, n, r, i) {
	if (!P(e)) return process.env.NODE_ENV !== "production" && Ht(`value cannot be made ${t ? "readonly" : "reactive"}: ${String(e)}`), e;
	if (e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
	let a = i.get(e);
	if (a) return a;
	let o = ir(rt(e));
	if (o === 0) return e;
	let s = new Proxy(e, o === 2 ? r : n);
	return i.set(e, s), s;
}
// @__NO_SIDE_EFFECTS__
function ur(e) {
	return /* @__PURE__ */ dr(e) ? /* @__PURE__ */ ur(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function dr(e) {
	return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function z(e) {
	return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function fr(e) {
	return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function B(e) {
	let t = e && e.__v_raw;
	return t ? /* @__PURE__ */ B(t) : e;
}
function pr(e) {
	return !A(e, "__v_skip") && Object.isExtensible(e) && _t(e, "__v_skip", !0), e;
}
var mr = (e) => P(e) ? /* @__PURE__ */ ar(e) : e, hr = (e) => P(e) ? /* @__PURE__ */ sr(e) : e;
// @__NO_SIDE_EFFECTS__
function V(e) {
	return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function gr(e) {
	return _r(e, !1);
}
function _r(e, t) {
	return /* @__PURE__ */ V(e) ? e : new vr(e, t);
}
var vr = class {
	constructor(e, t) {
		this.dep = new hn(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ B(e), this._value = t ? e : mr(e), this.__v_isShallow = t;
	}
	get value() {
		return process.env.NODE_ENV === "production" ? this.dep.track() : this.dep.track({
			target: this,
			type: "get",
			key: "value"
		}), this._value;
	}
	set value(e) {
		let t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ z(e) || /* @__PURE__ */ dr(e);
		e = n ? e : /* @__PURE__ */ B(e), ht(e, t) && (this._rawValue = e, this._value = n ? e : mr(e), process.env.NODE_ENV === "production" ? this.dep.trigger() : this.dep.trigger({
			target: this,
			type: "set",
			key: "value",
			newValue: e,
			oldValue: t
		}));
	}
};
function H(e) {
	return /* @__PURE__ */ V(e) ? e.value : e;
}
var yr = {
	get: (e, t, n) => t === "__v_raw" ? e : H(Reflect.get(e, t, n)),
	set: (e, t, n, r) => {
		let i = e[t];
		return /* @__PURE__ */ V(i) && !/* @__PURE__ */ V(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r);
	}
};
function br(e) {
	return /* @__PURE__ */ ur(e) ? e : new Proxy(e, yr);
}
// @__NO_SIDE_EFFECTS__
function xr(e) {
	process.env.NODE_ENV !== "production" && !/* @__PURE__ */ fr(e) && Ht("toRefs() expects a reactive object but received a plain one.");
	let t = j(e) ? Array(e.length) : {};
	for (let n in e) t[n] = Tr(e, n);
	return t;
}
var Sr = class {
	constructor(e, t, n) {
		this._object = e, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._key = $e(t) ? t : String(t), this._raw = /* @__PURE__ */ B(e);
		let r = !0, i = e;
		if (!j(e) || $e(this._key) || !at(this._key)) do
			r = !/* @__PURE__ */ fr(i) || /* @__PURE__ */ z(i);
		while (r && (i = i.__v_raw));
		this._shallow = r;
	}
	get value() {
		let e = this._object[this._key];
		return this._shallow && (e = H(e)), this._value = e === void 0 ? this._defaultValue : e;
	}
	set value(e) {
		if (this._shallow && /* @__PURE__ */ V(this._raw[this._key])) {
			let t = this._object[this._key];
			if (/* @__PURE__ */ V(t)) {
				t.value = e;
				return;
			}
		}
		this._object[this._key] = e;
	}
	get dep() {
		return Sn(this._raw, this._key);
	}
}, Cr = class {
	constructor(e) {
		this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
	}
	get value() {
		return this._value = this._getter();
	}
};
// @__NO_SIDE_EFFECTS__
function wr(e, t, n) {
	return /* @__PURE__ */ V(e) ? e : M(e) ? new Cr(e) : P(e) && arguments.length > 1 ? Tr(e, t, n) : /* @__PURE__ */ gr(e);
}
function Tr(e, t, n) {
	return new Sr(e, t, n);
}
var Er = class {
	constructor(e, t, n) {
		this.fn = e, this.setter = t, this._value = void 0, this.dep = new hn(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = pn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
	}
	notify() {
		if (this.flags |= 16, !(this.flags & 8) && L !== this) return Qt(this, !0), !0;
		process.env.NODE_ENV;
	}
	get value() {
		let e = process.env.NODE_ENV === "production" ? this.dep.track() : this.dep.track({
			target: this,
			type: "get",
			key: "value"
		});
		return an(this), e && (e.version = this.dep.version), this._value;
	}
	set value(e) {
		this.setter ? this.setter(e) : process.env.NODE_ENV !== "production" && Ht("Write operation failed: computed value is readonly");
	}
};
// @__NO_SIDE_EFFECTS__
function Dr(e, t, n = !1) {
	let r, i;
	M(e) ? r = e : (r = e.get, i = e.set);
	let a = new Er(r, i, n);
	return process.env.NODE_ENV !== "production" && t && !n && (a.onTrack = t.onTrack, a.onTrigger = t.onTrigger), a;
}
var Or = {}, kr = /* @__PURE__ */ new WeakMap(), Ar = void 0;
function jr(e, t = !1, n = Ar) {
	if (n) {
		let t = kr.get(n);
		t || kr.set(n, t = []), t.push(e);
	} else process.env.NODE_ENV !== "production" && !t && Ht("onWatcherCleanup() was called when there was no active watcher to associate with.");
}
function Mr(e, t, n = D) {
	let { immediate: r, deep: i, once: a, scheduler: o, augmentJob: s, call: c } = n, l = (e) => {
		(n.onWarn || Ht)("Invalid watch source: ", e, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
	}, u = (e) => i ? e : /* @__PURE__ */ z(e) || i === !1 || i === 0 ? Nr(e, 1) : Nr(e), d, f, p, m, h = !1, g = !1;
	if (/* @__PURE__ */ V(e) ? (f = () => e.value, h = /* @__PURE__ */ z(e)) : /* @__PURE__ */ ur(e) ? (f = () => u(e), h = !0) : j(e) ? (g = !0, h = e.some((e) => /* @__PURE__ */ ur(e) || /* @__PURE__ */ z(e)), f = () => e.map((e) => {
		if (/* @__PURE__ */ V(e)) return e.value;
		if (/* @__PURE__ */ ur(e)) return u(e);
		if (M(e)) return c ? c(e, 2) : e();
		process.env.NODE_ENV !== "production" && l(e);
	})) : M(e) ? f = t ? c ? () => c(e, 2) : e : () => {
		if (p) {
			un();
			try {
				p();
			} finally {
				dn();
			}
		}
		let t = Ar;
		Ar = d;
		try {
			return c ? c(e, 3, [m]) : e(m);
		} finally {
			Ar = t;
		}
	} : (f = O, process.env.NODE_ENV !== "production" && l(e)), t && i) {
		let e = f, t = i === !0 ? Infinity : i;
		f = () => Nr(e(), t);
	}
	let _ = Gt(), v = () => {
		d.stop(), _ && _.active && Je(_.effects, d);
	};
	if (a && t) {
		let e = t;
		t = (...t) => {
			let n = e(...t);
			return v(), n;
		};
	}
	let y = g ? Array(e.length).fill(Or) : Or, b = (e) => {
		if (!(!(d.flags & 1) || !d.dirty && !e)) if (t) {
			let n = d.run();
			if (e || i || h || (g ? n.some((e, t) => ht(e, y[t])) : ht(n, y))) {
				p && p();
				let e = Ar;
				Ar = d;
				try {
					let e = [
						n,
						y === Or ? void 0 : g && y[0] === Or ? [] : y,
						m
					];
					y = n, c ? c(t, 3, e) : t(...e);
				} finally {
					Ar = e;
				}
			}
		} else d.run();
	};
	return s && s(b), d = new Jt(f), d.scheduler = o ? () => o(b, !1) : b, m = (e) => jr(e, !1, d), p = d.onStop = () => {
		let e = kr.get(d);
		if (e) {
			if (c) c(e, 4);
			else for (let t of e) t();
			kr.delete(d);
		}
	}, process.env.NODE_ENV !== "production" && (d.onTrack = n.onTrack, d.onTrigger = n.onTrigger), t ? r ? b(!0) : y = d.run() : o ? o(b.bind(null, !0), !0) : d.run(), v.pause = d.pause.bind(d), v.resume = d.resume.bind(d), v.stop = v, v;
}
function Nr(e, t = Infinity, n) {
	if (t <= 0 || !P(e) || e.__v_skip || (n ||= /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
	if (n.set(e, t), t--, /* @__PURE__ */ V(e)) Nr(e.value, t, n);
	else if (j(e)) for (let r = 0; r < e.length; r++) Nr(e[r], t, n);
	else if (Ze(e) || Xe(e)) e.forEach((e) => {
		Nr(e, t, n);
	});
	else if (it(e)) {
		for (let r in e) Nr(e[r], t, n);
		for (let r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && Nr(e[r], t, n);
	}
	return e;
}
//#endregion
//#region node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var Pr = [];
function Fr(e) {
	Pr.push(e);
}
function Ir() {
	Pr.pop();
}
var Lr = !1;
function U(e, ...t) {
	if (Lr) return;
	Lr = !0, un();
	let n = Pr.length ? Pr[Pr.length - 1].component : null, r = n && n.appContext.config.warnHandler, i = Rr();
	if (r) Wr(r, n, 11, [
		e + t.map((e) => e.toString?.call(e) ?? JSON.stringify(e)).join(""),
		n && n.proxy,
		i.map(({ vnode: e }) => `at <${Sc(n, e.type)}>`).join("\n"),
		i
	]);
	else {
		let n = [`[Vue warn]: ${e}`, ...t];
		i.length && n.push("\n", ...zr(i)), console.warn(...n);
	}
	dn(), Lr = !1;
}
function Rr() {
	let e = Pr[Pr.length - 1];
	if (!e) return [];
	let t = [];
	for (; e;) {
		let n = t[0];
		n && n.vnode === e ? n.recurseCount++ : t.push({
			vnode: e,
			recurseCount: 0
		});
		let r = e.component && e.component.parent;
		e = r && r.vnode;
	}
	return t;
}
function zr(e) {
	let t = [];
	return e.forEach((e, n) => {
		t.push(...n === 0 ? [] : ["\n"], ...Br(e));
	}), t;
}
function Br({ vnode: e, recurseCount: t }) {
	let n = t > 0 ? `... (${t} recursive calls)` : "", r = e.component ? e.component.parent == null : !1, i = ` at <${Sc(e.component, e.type, r)}`, a = ">" + n;
	return e.props ? [
		i,
		...Vr(e.props),
		a
	] : [i + a];
}
function Vr(e) {
	let t = [], n = Object.keys(e);
	return n.slice(0, 3).forEach((n) => {
		t.push(...Hr(n, e[n]));
	}), n.length > 3 && t.push(" ..."), t;
}
function Hr(e, t, n) {
	return N(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : /* @__PURE__ */ V(t) ? (t = Hr(e, /* @__PURE__ */ B(t.value), !0), n ? t : [
		`${e}=Ref<`,
		t,
		">"
	]) : M(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = /* @__PURE__ */ B(t), n ? t : [`${e}=`, t]);
}
var Ur = {
	sp: "serverPrefetch hook",
	bc: "beforeCreate hook",
	c: "created hook",
	bm: "beforeMount hook",
	m: "mounted hook",
	bu: "beforeUpdate hook",
	u: "updated",
	bum: "beforeUnmount hook",
	um: "unmounted hook",
	a: "activated hook",
	da: "deactivated hook",
	ec: "errorCaptured hook",
	rtc: "renderTracked hook",
	rtg: "renderTriggered hook",
	0: "setup function",
	1: "render function",
	2: "watcher getter",
	3: "watcher callback",
	4: "watcher cleanup function",
	5: "native event handler",
	6: "component event handler",
	7: "vnode hook",
	8: "directive hook",
	9: "transition hook",
	10: "app errorHandler",
	11: "app warnHandler",
	12: "ref function",
	13: "async component loader",
	14: "scheduler flush",
	15: "component update",
	16: "app unmount cleanup function"
};
function Wr(e, t, n, r) {
	try {
		return r ? e(...r) : e();
	} catch (e) {
		Kr(e, t, n);
	}
}
function Gr(e, t, n, r) {
	if (M(e)) {
		let i = Wr(e, t, n, r);
		return i && et(i) && i.catch((e) => {
			Kr(e, t, n);
		}), i;
	}
	if (j(e)) {
		let i = [];
		for (let a = 0; a < e.length; a++) i.push(Gr(e[a], t, n, r));
		return i;
	} else process.env.NODE_ENV !== "production" && U(`Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`);
}
function Kr(e, t, n, r = !0) {
	let i = t ? t.vnode : null, { errorHandler: a, throwUnhandledErrorInProduction: o } = t && t.appContext.config || D;
	if (t) {
		let r = t.parent, i = t.proxy, o = process.env.NODE_ENV === "production" ? `https://vuejs.org/error-reference/#runtime-${n}` : Ur[n];
		for (; r;) {
			let t = r.ec;
			if (t) {
				for (let n = 0; n < t.length; n++) if (t[n](e, i, o) === !1) return;
			}
			r = r.parent;
		}
		if (a) {
			un(), Wr(a, null, 10, [
				e,
				i,
				o
			]), dn();
			return;
		}
	}
	qr(e, n, i, r, o);
}
function qr(e, t, n, r = !0, i = !1) {
	if (process.env.NODE_ENV !== "production") {
		let i = Ur[t];
		if (n && Fr(n), U(`Unhandled error${i ? ` during execution of ${i}` : ""}`), n && Ir(), r) throw e;
		console.error(e);
	} else if (i) throw e;
	else console.error(e);
}
var Jr = [], Yr = -1, Xr = [], Zr = null, Qr = 0, $r = /* @__PURE__ */ Promise.resolve(), ei = null, ti = 100;
function ni(e) {
	let t = ei || $r;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function ri(e) {
	let t = Yr + 1, n = Jr.length;
	for (; t < n;) {
		let r = t + n >>> 1, i = Jr[r], a = li(i);
		a < e || a === e && i.flags & 2 ? t = r + 1 : n = r;
	}
	return t;
}
function ii(e) {
	if (!(e.flags & 1)) {
		let t = li(e), n = Jr[Jr.length - 1];
		!n || !(e.flags & 2) && t >= li(n) ? Jr.push(e) : Jr.splice(ri(t), 0, e), e.flags |= 1, ai();
	}
}
function ai() {
	ei ||= $r.then(di);
}
function oi(e) {
	j(e) ? Xr.push(...e) : Zr && e.id === -1 ? Zr.splice(Qr + 1, 0, e) : e.flags & 1 || (Xr.push(e), e.flags |= 1), ai();
}
function si(e, t, n = Yr + 1) {
	for (process.env.NODE_ENV !== "production" && (t ||= /* @__PURE__ */ new Map()); n < Jr.length; n++) {
		let r = Jr[n];
		if (r && r.flags & 2) {
			if (e && r.id !== e.uid || process.env.NODE_ENV !== "production" && fi(t, r)) continue;
			Jr.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
		}
	}
}
function ci(e) {
	if (Xr.length) {
		let t = [...new Set(Xr)].sort((e, t) => li(e) - li(t));
		if (Xr.length = 0, Zr) {
			Zr.push(...t);
			return;
		}
		for (Zr = t, process.env.NODE_ENV !== "production" && (e ||= /* @__PURE__ */ new Map()), Qr = 0; Qr < Zr.length; Qr++) {
			let t = Zr[Qr];
			process.env.NODE_ENV !== "production" && fi(e, t) || (t.flags & 4 && (t.flags &= -2), t.flags & 8 || t(), t.flags &= -2);
		}
		Zr = null, Qr = 0;
	}
}
var li = (e) => e.id == null ? e.flags & 2 ? -1 : Infinity : e.id;
function di(e) {
	process.env.NODE_ENV !== "production" && (e ||= /* @__PURE__ */ new Map());
	let t = process.env.NODE_ENV === "production" ? O : (t) => fi(e, t);
	try {
		for (Yr = 0; Yr < Jr.length; Yr++) {
			let e = Jr[Yr];
			if (e && !(e.flags & 8)) {
				if (process.env.NODE_ENV !== "production" && t(e)) continue;
				e.flags & 4 && (e.flags &= -2), Wr(e, e.i, e.i ? 15 : 14), e.flags & 4 || (e.flags &= -2);
			}
		}
	} finally {
		for (; Yr < Jr.length; Yr++) {
			let e = Jr[Yr];
			e && (e.flags &= -2);
		}
		Yr = -1, Jr.length = 0, ci(e), ei = null, (Jr.length || Xr.length) && di(e);
	}
}
function fi(e, t) {
	let n = e.get(t) || 0;
	if (n > ti) {
		let e = t.i, n = e && xc(e.type);
		return Kr(`Maximum recursive updates exceeded${n ? ` in component <${n}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`, null, 10), !0;
	}
	return e.set(t, n + 1), !1;
}
var pi = !1, mi = (e) => {
	try {
		return pi;
	} finally {
		pi = e;
	}
}, hi = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (bt().__VUE_HMR_RUNTIME__ = {
	createRecord: wi(yi),
	rerender: wi(xi),
	reload: wi(Si)
});
var gi = /* @__PURE__ */ new Map();
function _i(e) {
	let t = e.type.__hmrId, n = gi.get(t);
	n ||= (yi(t, e.type), gi.get(t)), n.instances.add(e);
}
function vi(e) {
	gi.get(e.type.__hmrId).instances.delete(e);
}
function yi(e, t) {
	return gi.has(e) ? !1 : (gi.set(e, {
		initialDef: bi(t),
		instances: /* @__PURE__ */ new Set()
	}), !0);
}
function bi(e) {
	return Cc(e) ? e.__vccOpts : e;
}
function xi(e, t) {
	let n = gi.get(e);
	n && (n.initialDef.render = t, [...n.instances].forEach((e) => {
		t && (e.render = t, bi(e.type).render = t), e.renderCache = [], pi = !0, e.job.flags & 8 || e.update(), pi = !1;
	}));
}
function Si(e, t) {
	let n = gi.get(e);
	if (!n) return;
	t = bi(t), Ci(n.initialDef, t);
	let r = [...n.instances];
	for (let e = 0; e < r.length; e++) {
		let i = r[e], a = bi(i.type), o = hi.get(a);
		o || (a !== n.initialDef && Ci(a, t), hi.set(a, o = /* @__PURE__ */ new Set())), o.add(i), i.appContext.propsCache.delete(i.type), i.appContext.emitsCache.delete(i.type), i.appContext.optionsCache.delete(i.type), i.ceReload ? (o.add(i), i.ceReload(t.styles), o.delete(i)) : i.parent ? ii(() => {
			i.job.flags & 8 || (pi = !0, i.parent.update(), pi = !1, o.delete(i));
		}) : i.appContext.reload ? i.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required."), i.root.ce && i !== i.root && i.root.ce._removeChildStyle(a);
	}
	oi(() => {
		hi.clear();
	});
}
function Ci(e, t) {
	k(e, t);
	for (let n in e) n !== "__file" && !(n in t) && delete e[n];
}
function wi(e) {
	return (t, n) => {
		try {
			return e(t, n);
		} catch (e) {
			console.error(e), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
		}
	};
}
var Ti, Ei = [], Di = !1;
function Oi(e, ...t) {
	Ti ? Ti.emit(e, ...t) : Di || Ei.push({
		event: e,
		args: t
	});
}
function ki(e, t) {
	Ti = e, Ti ? (Ti.enabled = !0, Ei.forEach(({ event: e, args: t }) => Ti.emit(e, ...t)), Ei = []) : typeof window < "u" && window.HTMLElement && !(window.navigator?.userAgent)?.includes("jsdom") ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((e) => {
		ki(e, t);
	}), setTimeout(() => {
		Ti || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Di = !0, Ei = []);
	}, 3e3)) : (Di = !0, Ei = []);
}
function Ai(e, t) {
	Oi("app:init", e, t, {
		Fragment: ys,
		Text: bs,
		Comment: xs,
		Static: Ss
	});
}
function ji(e) {
	Oi("app:unmount", e);
}
var Mi = /* @__PURE__ */ Ii("component:added"), Ni = /* @__PURE__ */ Ii("component:updated"), Pi = /* @__PURE__ */ Ii("component:removed"), Fi = (e) => {
	Ti && typeof Ti.cleanupBuffer == "function" && !Ti.cleanupBuffer(e) && Pi(e);
};
// @__NO_SIDE_EFFECTS__
function Ii(e) {
	return (t) => {
		Oi(e, t.appContext.app, t.uid, t.parent ? t.parent.uid : void 0, t);
	};
}
var Li = /* @__PURE__ */ zi("perf:start"), Ri = /* @__PURE__ */ zi("perf:end");
function zi(e) {
	return (t, n, r) => {
		Oi(e, t.appContext.app, t.uid, t, n, r);
	};
}
function Bi(e, t, n) {
	Oi("component:emit", e.appContext.app, e, t, n);
}
var W = null, Vi = null;
function Hi(e) {
	let t = W;
	return W = e, Vi = e && e.type.__scopeId || null, t;
}
function Ui(e, t = W, n) {
	if (!t || e._n) return e;
	let r = (...n) => {
		r._d && Os(-1);
		let i = Hi(t), a;
		try {
			a = e(...n);
		} finally {
			Hi(i), r._d && Os(1);
		}
		return process.env.NODE_ENV !== "production" && Ni(t), a;
	};
	return r._n = !0, r._c = !0, r._d = !0, r;
}
function Wi(e) {
	st(e) && U("Do not use built-in directive ids as custom directive id: " + e);
}
function Gi(e, t) {
	if (W === null) return process.env.NODE_ENV !== "production" && U("withDirectives can only be used inside render functions."), e;
	let n = vc(W), r = e.dirs ||= [];
	for (let e = 0; e < t.length; e++) {
		let [i, a, o, s = D] = t[e];
		i && (M(i) && (i = {
			mounted: i,
			updated: i
		}), i.deep && Nr(a), r.push({
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
function Ki(e, t, n, r) {
	let i = e.dirs, a = t && t.dirs;
	for (let o = 0; o < i.length; o++) {
		let s = i[o];
		a && (s.oldValue = a[o].value);
		let c = s.dir[r];
		c && (un(), Gr(c, n, 8, [
			e.el,
			s,
			e,
			t
		]), dn());
	}
}
function qi(e, t) {
	if (process.env.NODE_ENV !== "production" && (!K || K.isMounted) && U("provide() can only be used inside setup()."), K) {
		let n = K.provides, r = K.parent && K.parent.provides;
		r === n && (n = K.provides = Object.create(r)), n[e] = t;
	}
}
function Ji(e, t, n = !1) {
	let r = $s();
	if (r || so) {
		let i = so ? so._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return n && M(t) ? t.call(r && r.proxy) : t;
		process.env.NODE_ENV !== "production" && U(`injection "${String(e)}" not found.`);
	} else process.env.NODE_ENV !== "production" && U("inject() can only be used inside setup() or functional components.");
}
function Yi() {
	return !!($s() || so);
}
var Xi = /* @__PURE__ */ Symbol.for("v-scx"), Zi = () => {
	{
		let e = Ji(Xi);
		return e || process.env.NODE_ENV !== "production" && U("Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."), e;
	}
};
function Qi(e, t, n) {
	return process.env.NODE_ENV !== "production" && !M(t) && U("`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."), $i(e, t, n);
}
function $i(e, t, n = D) {
	let { immediate: r, deep: i, flush: a, once: o } = n;
	process.env.NODE_ENV !== "production" && !t && (r !== void 0 && U("watch() \"immediate\" option is only respected when using the watch(source, callback, options?) signature."), i !== void 0 && U("watch() \"deep\" option is only respected when using the watch(source, callback, options?) signature."), o !== void 0 && U("watch() \"once\" option is only respected when using the watch(source, callback, options?) signature."));
	let s = k({}, n);
	process.env.NODE_ENV !== "production" && (s.onWarn = U);
	let c = t && r || !t && a !== "post", l;
	if (sc) {
		if (a === "sync") {
			let e = Zi();
			l = e.__watcherHandles ||= [];
		} else if (!c) {
			let e = () => {};
			return e.stop = O, e.resume = O, e.pause = O, e;
		}
	}
	let u = K;
	s.call = (e, t, n) => Gr(e, u, t, n);
	let d = !1;
	a === "post" ? s.scheduler = (e) => {
		os(e, u && u.suspense);
	} : a !== "sync" && (d = !0, s.scheduler = (e, t) => {
		t ? e() : ii(e);
	}), s.augmentJob = (e) => {
		t && (e.flags |= 4), d && (e.flags |= 2, u && (e.id = u.uid, e.i = u));
	};
	let f = Mr(e, t, s);
	return sc && (l ? l.push(f) : c && f()), f;
}
function ea(e, t, n) {
	let r = this.proxy, i = N(e) ? e.includes(".") ? ta(r, e) : () => r[e] : e.bind(r, r), a;
	M(t) ? a = t : (a = t.handler, n = t);
	let o = nc(this), s = $i(i, a.bind(r), n);
	return o(), s;
}
function ta(e, t) {
	let n = t.split(".");
	return () => {
		let t = e;
		for (let e = 0; e < n.length && t; e++) t = t[n[e]];
		return t;
	};
}
var na = /* @__PURE__ */ Symbol("_vte"), ra = (e) => e.__isTeleport, ia = /* @__PURE__ */ Symbol("_leaveCb");
function aa(e, t) {
	e.shapeFlag & 6 && e.component ? (e.transition = t, aa(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function oa(e, t) {
	return M(e) ? /* @__PURE__ */ k({ name: e.name }, t, { setup: e }) : e;
}
function sa(e) {
	e.ids = [
		e.ids[0] + e.ids[2]++ + "-",
		0,
		0
	];
}
var ca = /* @__PURE__ */ new WeakSet();
function la(e, t) {
	let n;
	return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var ua = /* @__PURE__ */ new WeakMap();
function da(e, t, n, r, i = !1) {
	if (j(e)) {
		e.forEach((e, a) => da(e, t && (j(t) ? t[a] : t), n, r, i));
		return;
	}
	if (pa(r) && !i) {
		r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && da(e, t, n, r.component.subTree);
		return;
	}
	let a = r.shapeFlag & 4 ? vc(r.component) : r.el, o = i ? null : a, { i: s, r: c } = e;
	if (process.env.NODE_ENV !== "production" && !s) {
		U("Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.");
		return;
	}
	let l = t && t.r, u = s.refs === D ? s.refs = {} : s.refs, d = s.setupState, f = /* @__PURE__ */ B(d), p = d === D ? Ge : (e) => process.env.NODE_ENV !== "production" && (A(f, e) && !/* @__PURE__ */ V(f[e]) && U(`Template ref "${e}" used on a non-ref value. It will not work in the production build.`), ca.has(f[e])) || la(u, e) ? !1 : A(f, e), m = (e, t) => !(process.env.NODE_ENV !== "production" && ca.has(e) || t && la(u, t));
	if (l != null && l !== c) {
		if (fa(t), N(l)) u[l] = null, p(l) && (d[l] = null);
		else if (/* @__PURE__ */ V(l)) {
			let e = t;
			m(l, e.k) && (l.value = null), e.k && (u[e.k] = null);
		}
	}
	if (M(c)) Wr(c, s, 12, [o, u]);
	else {
		let t = N(c), r = /* @__PURE__ */ V(c);
		if (t || r) {
			let s = () => {
				if (e.f) {
					let n = t ? p(c) ? d[c] : u[c] : m(c) || !e.k ? c.value : u[e.k];
					if (i) j(n) && Je(n, a);
					else if (j(n)) n.includes(a) || n.push(a);
					else if (t) u[c] = [a], p(c) && (d[c] = u[c]);
					else {
						let t = [a];
						m(c, e.k) && (c.value = t), e.k && (u[e.k] = t);
					}
				} else t ? (u[c] = o, p(c) && (d[c] = o)) : r ? (m(c, e.k) && (c.value = o), e.k && (u[e.k] = o)) : process.env.NODE_ENV !== "production" && U("Invalid template ref type:", c, `(${typeof c})`);
			};
			if (o) {
				let t = () => {
					s(), ua.delete(e);
				};
				t.id = -1, ua.set(e, t), os(t, n);
			} else fa(e), s();
		} else process.env.NODE_ENV !== "production" && U("Invalid template ref type:", c, `(${typeof c})`);
	}
}
function fa(e) {
	let t = ua.get(e);
	t && (t.flags |= 8, ua.delete(e));
}
bt().requestIdleCallback, bt().cancelIdleCallback;
var pa = (e) => !!e.type.__asyncLoader, ma = (e) => e.type.__isKeepAlive;
function ha(e, t) {
	_a(e, "a", t);
}
function ga(e, t) {
	_a(e, "da", t);
}
function _a(e, t, n = K) {
	let r = e.__wdc ||= () => {
		let t = n;
		for (; t;) {
			if (t.isDeactivated) return;
			t = t.parent;
		}
		return e();
	};
	if (ya(t, r, n), n) {
		let e = n.parent;
		for (; e && e.parent;) ma(e.parent.vnode) && va(r, t, n, e), e = e.parent;
	}
}
function va(e, t, n, r) {
	let i = ya(t, e, r, !0);
	Ea(() => {
		Je(r[t], i);
	}, n);
}
function ya(e, t, n = K, r = !1) {
	if (n) {
		let i = n[e] || (n[e] = []), a = t.__weh ||= (...r) => {
			un();
			let i = nc(n), a = Gr(t, n, e, r);
			return i(), dn(), a;
		};
		return r ? i.unshift(a) : i.push(a), a;
	} else process.env.NODE_ENV !== "production" && U(`${mt(Ur[e].replace(/ hook$/, ""))} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
}
var ba = (e) => (t, n = K) => {
	(!sc || e === "sp") && ya(e, (...e) => t(...e), n);
}, xa = ba("bm"), Sa = ba("m"), Ca = ba("bu"), wa = ba("u"), Ta = ba("bum"), Ea = ba("um"), Da = ba("sp"), Oa = ba("rtg"), ka = ba("rtc");
function Aa(e, t = K) {
	ya("ec", e, t);
}
var ja = /* @__PURE__ */ Symbol.for("v-ndc");
function Ma(e, t, n, r) {
	let i, a = n && n[r], o = j(e);
	if (o || N(e)) {
		let n = o && /* @__PURE__ */ ur(e), r = !1, s = !1;
		n && (r = !/* @__PURE__ */ z(e), s = /* @__PURE__ */ dr(e), e = wn(e)), i = Array(e.length);
		for (let n = 0, o = e.length; n < o; n++) i[n] = t(r ? s ? hr(mr(e[n])) : mr(e[n]) : e[n], n, void 0, a && a[n]);
	} else if (typeof e == "number") if (process.env.NODE_ENV !== "production" && (!Number.isInteger(e) || e < 0)) U(`The v-for range expects a positive integer value but got ${e}.`), i = [];
	else {
		i = Array(e);
		for (let n = 0; n < e; n++) i[n] = t(n + 1, n, void 0, a && a[n]);
	}
	else if (P(e)) if (e[Symbol.iterator]) i = Array.from(e, (e, n) => t(e, n, void 0, a && a[n]));
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
var Na = (e) => e ? oc(e) ? vc(e) : Na(e.parent) : null, Pa = /* @__PURE__ */ k(/* @__PURE__ */ Object.create(null), {
	$: (e) => e,
	$el: (e) => e.vnode.el,
	$data: (e) => e.data,
	$props: (e) => process.env.NODE_ENV === "production" ? e.props : /* @__PURE__ */ cr(e.props),
	$attrs: (e) => process.env.NODE_ENV === "production" ? e.attrs : /* @__PURE__ */ cr(e.attrs),
	$slots: (e) => process.env.NODE_ENV === "production" ? e.slots : /* @__PURE__ */ cr(e.slots),
	$refs: (e) => process.env.NODE_ENV === "production" ? e.refs : /* @__PURE__ */ cr(e.refs),
	$parent: (e) => Na(e.parent),
	$root: (e) => Na(e.root),
	$host: (e) => e.ce,
	$emit: (e) => e.emit,
	$options: (e) => Ja(e),
	$forceUpdate: (e) => e.f ||= () => {
		ii(e.update);
	},
	$nextTick: (e) => e.n ||= ni.bind(e.proxy),
	$watch: (e) => ea.bind(e)
}), Fa = (e) => e === "_" || e === "$", Ia = (e, t) => e !== D && !e.__isScriptSetup && A(e, t), La = {
	get({ _: e }, t) {
		if (t === "__v_skip") return !0;
		let { ctx: n, setupState: r, data: i, props: a, accessCache: o, type: s, appContext: c } = e;
		if (process.env.NODE_ENV !== "production" && t === "__isVue") return !0;
		if (t[0] !== "$") {
			let e = o[t];
			if (e !== void 0) switch (e) {
				case 1: return r[t];
				case 2: return i[t];
				case 4: return n[t];
				case 3: return a[t];
			}
			else if (Ia(r, t)) return o[t] = 1, r[t];
			else if (i !== D && A(i, t)) return o[t] = 2, i[t];
			else if (A(a, t)) return o[t] = 3, a[t];
			else if (n !== D && A(n, t)) return o[t] = 4, n[t];
			else Ua && (o[t] = 0);
		}
		let l = Pa[t], u, d;
		if (l) return t === "$attrs" ? (R(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && ho()) : process.env.NODE_ENV !== "production" && t === "$slots" && R(e, "get", t), l(e);
		if ((u = s.__cssModules) && (u = u[t])) return u;
		if (n !== D && A(n, t)) return o[t] = 4, n[t];
		if (d = c.config.globalProperties, A(d, t)) return d[t];
		process.env.NODE_ENV !== "production" && W && (!N(t) || t.indexOf("__v") !== 0) && (i !== D && Fa(t[0]) && A(i, t) ? U(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === W && U(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
	},
	set({ _: e }, t, n) {
		let { data: r, setupState: i, ctx: a } = e;
		return Ia(i, t) ? (i[t] = n, !0) : process.env.NODE_ENV !== "production" && i.__isScriptSetup && A(i, t) ? (U(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : r !== D && A(r, t) ? (r[t] = n, !0) : A(e.props, t) ? (process.env.NODE_ENV !== "production" && U(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && U(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(a, t, {
			enumerable: !0,
			configurable: !0,
			value: n
		}) : a[t] = n, !0);
	},
	has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, props: a, type: o } }, s) {
		let c;
		return !!(n[s] || e !== D && s[0] !== "$" && A(e, s) || Ia(t, s) || A(a, s) || A(r, s) || A(Pa, s) || A(i.config.globalProperties, s) || (c = o.__cssModules) && c[s]);
	},
	defineProperty(e, t, n) {
		return n.get == null ? A(n, "value") && this.set(e, t, n.value, null) : e._.accessCache[t] = 0, Reflect.defineProperty(e, t, n);
	}
};
process.env.NODE_ENV !== "production" && (La.ownKeys = (e) => (U("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
function Ra(e) {
	let t = {};
	return Object.defineProperty(t, "_", {
		configurable: !0,
		enumerable: !1,
		get: () => e
	}), Object.keys(Pa).forEach((n) => {
		Object.defineProperty(t, n, {
			configurable: !0,
			enumerable: !1,
			get: () => Pa[n](e),
			set: O
		});
	}), t;
}
function za(e) {
	let { ctx: t, propsOptions: [n] } = e;
	n && Object.keys(n).forEach((n) => {
		Object.defineProperty(t, n, {
			enumerable: !0,
			configurable: !0,
			get: () => e.props[n],
			set: O
		});
	});
}
function Ba(e) {
	let { ctx: t, setupState: n } = e;
	Object.keys(/* @__PURE__ */ B(n)).forEach((e) => {
		if (!n.__isScriptSetup) {
			if (Fa(e[0])) {
				U(`setup() return property ${JSON.stringify(e)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
				return;
			}
			Object.defineProperty(t, e, {
				enumerable: !0,
				configurable: !0,
				get: () => n[e],
				set: O
			});
		}
	});
}
function Va(e) {
	return j(e) ? e.reduce((e, t) => (e[t] = null, e), {}) : e;
}
function Ha() {
	let e = /* @__PURE__ */ Object.create(null);
	return (t, n) => {
		e[n] ? U(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
	};
}
var Ua = !0;
function Wa(e) {
	let t = Ja(e), n = e.proxy, r = e.ctx;
	Ua = !1, t.beforeCreate && Ka(t.beforeCreate, e, "bc");
	let { data: i, computed: a, methods: o, watch: s, provide: c, inject: l, created: u, beforeMount: d, mounted: f, beforeUpdate: p, updated: m, activated: h, deactivated: g, beforeDestroy: _, beforeUnmount: v, destroyed: y, unmounted: b, render: x, renderTracked: ee, renderTriggered: S, errorCaptured: C, serverPrefetch: te, expose: ne, inheritAttrs: w, components: re, directives: T, filters: ie } = t, E = process.env.NODE_ENV === "production" ? null : Ha();
	if (process.env.NODE_ENV !== "production") {
		let [t] = e.propsOptions;
		if (t) for (let e in t) E("Props", e);
	}
	if (l && Ga(l, r, E), o) for (let e in o) {
		let t = o[e];
		M(t) ? (process.env.NODE_ENV === "production" ? r[e] = t.bind(n) : Object.defineProperty(r, e, {
			value: t.bind(n),
			configurable: !0,
			enumerable: !0,
			writable: !0
		}), process.env.NODE_ENV !== "production" && E("Methods", e)) : process.env.NODE_ENV !== "production" && U(`Method "${e}" has type "${typeof t}" in the component definition. Did you reference the function correctly?`);
	}
	if (i) {
		process.env.NODE_ENV !== "production" && !M(i) && U("The data option must be a function. Plain object usage is no longer supported.");
		let t = i.call(n, n);
		if (process.env.NODE_ENV !== "production" && et(t) && U("data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."), !P(t)) process.env.NODE_ENV !== "production" && U("data() should return an object.");
		else if (e.data = /* @__PURE__ */ ar(t), process.env.NODE_ENV !== "production") for (let e in t) E("Data", e), Fa(e[0]) || Object.defineProperty(r, e, {
			configurable: !0,
			enumerable: !0,
			get: () => t[e],
			set: O
		});
	}
	if (Ua = !0, a) for (let e in a) {
		let t = a[e], i = M(t) ? t.bind(n, n) : M(t.get) ? t.get.bind(n, n) : O;
		process.env.NODE_ENV !== "production" && i === O && U(`Computed property "${e}" has no getter.`);
		let o = wc({
			get: i,
			set: !M(t) && M(t.set) ? t.set.bind(n) : process.env.NODE_ENV === "production" ? O : () => {
				U(`Write operation failed: computed property "${e}" is readonly.`);
			}
		});
		Object.defineProperty(r, e, {
			enumerable: !0,
			configurable: !0,
			get: () => o.value,
			set: (e) => o.value = e
		}), process.env.NODE_ENV !== "production" && E("Computed", e);
	}
	if (s) for (let e in s) qa(s[e], r, n, e);
	if (c) {
		let e = M(c) ? c.call(n) : c;
		Reflect.ownKeys(e).forEach((t) => {
			qi(t, e[t]);
		});
	}
	u && Ka(u, e, "c");
	function ae(e, t) {
		j(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n));
	}
	if (ae(xa, d), ae(Sa, f), ae(Ca, p), ae(wa, m), ae(ha, h), ae(ga, g), ae(Aa, C), ae(ka, ee), ae(Oa, S), ae(Ta, v), ae(Ea, b), ae(Da, te), j(ne)) if (ne.length) {
		let t = e.exposed ||= {};
		ne.forEach((e) => {
			Object.defineProperty(t, e, {
				get: () => n[e],
				set: (t) => n[e] = t,
				enumerable: !0
			});
		});
	} else e.exposed ||= {};
	x && e.render === O && (e.render = x), w != null && (e.inheritAttrs = w), re && (e.components = re), T && (e.directives = T), te && sa(e);
}
function Ga(e, t, n = O) {
	j(e) && (e = $a(e));
	for (let r in e) {
		let i = e[r], a;
		a = P(i) ? "default" in i ? Ji(i.from || r, i.default, !0) : Ji(i.from || r) : Ji(i), /* @__PURE__ */ V(a) ? Object.defineProperty(t, r, {
			enumerable: !0,
			configurable: !0,
			get: () => a.value,
			set: (e) => a.value = e
		}) : t[r] = a, process.env.NODE_ENV !== "production" && n("Inject", r);
	}
}
function Ka(e, t, n) {
	Gr(j(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function qa(e, t, n, r) {
	let i = r.includes(".") ? ta(n, r) : () => n[r];
	if (N(e)) {
		let n = t[e];
		M(n) ? Qi(i, n) : process.env.NODE_ENV !== "production" && U(`Invalid watch handler specified by key "${e}"`, n);
	} else if (M(e)) Qi(i, e.bind(n));
	else if (P(e)) if (j(e)) e.forEach((e) => qa(e, t, n, r));
	else {
		let r = M(e.handler) ? e.handler.bind(n) : t[e.handler];
		M(r) ? Qi(i, r, e) : process.env.NODE_ENV !== "production" && U(`Invalid watch handler specified by key "${e.handler}"`, r);
	}
	else process.env.NODE_ENV !== "production" && U(`Invalid watch option: "${r}"`, e);
}
function Ja(e) {
	let t = e.type, { mixins: n, extends: r } = t, { mixins: i, optionsCache: a, config: { optionMergeStrategies: o } } = e.appContext, s = a.get(t), c;
	return s ? c = s : !i.length && !n && !r ? c = t : (c = {}, i.length && i.forEach((e) => Ya(c, e, o, !0)), Ya(c, t, o)), P(t) && a.set(t, c), c;
}
function Ya(e, t, n, r = !1) {
	let { mixins: i, extends: a } = t;
	a && Ya(e, a, n, !0), i && i.forEach((t) => Ya(e, t, n, !0));
	for (let i in t) if (r && i === "expose") process.env.NODE_ENV !== "production" && U("\"expose\" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.");
	else {
		let r = Xa[i] || n && n[i];
		e[i] = r ? r(e[i], t[i]) : t[i];
	}
	return e;
}
var Xa = {
	data: Za,
	props: no,
	emits: no,
	methods: to,
	computed: to,
	beforeCreate: eo,
	created: eo,
	beforeMount: eo,
	mounted: eo,
	beforeUpdate: eo,
	updated: eo,
	beforeDestroy: eo,
	beforeUnmount: eo,
	destroyed: eo,
	unmounted: eo,
	activated: eo,
	deactivated: eo,
	errorCaptured: eo,
	serverPrefetch: eo,
	components: to,
	directives: to,
	watch: ro,
	provide: Za,
	inject: Qa
};
function Za(e, t) {
	return t ? e ? function() {
		return k(M(e) ? e.call(this, this) : e, M(t) ? t.call(this, this) : t);
	} : t : e;
}
function Qa(e, t) {
	return to($a(e), $a(t));
}
function $a(e) {
	if (j(e)) {
		let t = {};
		for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
		return t;
	}
	return e;
}
function eo(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function to(e, t) {
	return e ? k(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function no(e, t) {
	return e ? j(e) && j(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : k(/* @__PURE__ */ Object.create(null), Va(e), Va(t ?? {})) : t;
}
function ro(e, t) {
	if (!e) return t;
	if (!t) return e;
	let n = k(/* @__PURE__ */ Object.create(null), e);
	for (let r in t) n[r] = eo(e[r], t[r]);
	return n;
}
function io() {
	return {
		app: null,
		config: {
			isNativeTag: Ge,
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
var ao = 0;
function oo(e, t) {
	return function(n, r = null) {
		M(n) || (n = k({}, n)), r != null && !P(r) && (process.env.NODE_ENV !== "production" && U("root props passed to app.mount() must be an object."), r = null);
		let i = io(), a = /* @__PURE__ */ new WeakSet(), o = [], s = !1, c = i.app = {
			_uid: ao++,
			_component: n,
			_props: r,
			_container: null,
			_context: i,
			_instance: null,
			version: Ec,
			get config() {
				return i.config;
			},
			set config(e) {
				process.env.NODE_ENV !== "production" && U("app.config cannot be replaced. Modify individual options instead.");
			},
			use(e, ...t) {
				return a.has(e) ? process.env.NODE_ENV !== "production" && U("Plugin has already been applied to target app.") : e && M(e.install) ? (a.add(e), e.install(c, ...t)) : M(e) ? (a.add(e), e(c, ...t)) : process.env.NODE_ENV !== "production" && U("A plugin must either be a function or an object with an \"install\" function."), c;
			},
			mixin(e) {
				return i.mixins.includes(e) ? process.env.NODE_ENV !== "production" && U("Mixin has already been applied to target app" + (e.name ? `: ${e.name}` : "")) : i.mixins.push(e), c;
			},
			component(e, t) {
				return process.env.NODE_ENV !== "production" && ac(e, i.config), t ? (process.env.NODE_ENV !== "production" && i.components[e] && U(`Component "${e}" has already been registered in target app.`), i.components[e] = t, c) : i.components[e];
			},
			directive(e, t) {
				return process.env.NODE_ENV !== "production" && Wi(e), t ? (process.env.NODE_ENV !== "production" && i.directives[e] && U(`Directive "${e}" has already been registered in target app.`), i.directives[e] = t, c) : i.directives[e];
			},
			mount(a, o, l) {
				if (s) process.env.NODE_ENV !== "production" && U("App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`");
				else {
					process.env.NODE_ENV !== "production" && a.__vue_app__ && U("There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first.");
					let u = c._ceVNode || Rs(n, r);
					return u.appContext = i, l === !0 ? l = "svg" : l === !1 && (l = void 0), process.env.NODE_ENV !== "production" && (i.reload = () => {
						let t = Vs(u);
						t.el = null, e(t, a, l);
					}), o && t ? t(u, a) : e(u, a, l), s = !0, c._container = a, a.__vue_app__ = c, process.env.NODE_ENV !== "production" && (c._instance = u.component, Ai(c, Ec)), vc(u.component);
				}
			},
			onUnmount(e) {
				process.env.NODE_ENV !== "production" && typeof e != "function" && U(`Expected function as first argument to app.onUnmount(), but got ${typeof e}`), o.push(e);
			},
			unmount() {
				s ? (Gr(o, c._instance, 16), e(null, c._container), process.env.NODE_ENV !== "production" && (c._instance = null, ji(c)), delete c._container.__vue_app__) : process.env.NODE_ENV !== "production" && U("Cannot unmount an app that is not mounted.");
			},
			provide(e, t) {
				return process.env.NODE_ENV !== "production" && e in i.provides && (A(i.provides, e) ? U(`App already provides property with key "${String(e)}". It will be overwritten with the new value.`) : U(`App already provides property with key "${String(e)}" inherited from its parent element. It will be overwritten with the new value.`)), i.provides[e] = t, c;
			},
			runWithContext(e) {
				let t = so;
				so = c;
				try {
					return e();
				} finally {
					so = t;
				}
			}
		};
		return c;
	};
}
var so = null, co = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${ut(t)}Modifiers`] || e[`${ft(t)}Modifiers`];
function lo(e, t, ...n) {
	if (e.isUnmounted) return;
	let r = e.vnode.props || D;
	if (process.env.NODE_ENV !== "production") {
		let { emitsOptions: r, propsOptions: [i] } = e;
		if (r) if (!(t in r)) (!i || !(mt(ut(t)) in i)) && U(`Component emitted event "${t}" but it is neither declared in the emits option nor as an "${mt(ut(t))}" prop.`);
		else {
			let e = r[t];
			M(e) && (e(...n) || U(`Invalid event arguments: event validation failed for event "${t}".`));
		}
	}
	let i = n, a = t.startsWith("update:"), o = a && co(r, t.slice(7));
	if (o && (o.trim && (i = n.map((e) => N(e) ? e.trim() : e)), o.number && (i = n.map(vt))), process.env.NODE_ENV !== "production" && Bi(e, t, i), process.env.NODE_ENV !== "production") {
		let n = t.toLowerCase();
		n !== t && r[mt(n)] && U(`Event "${n}" is emitted in component ${Sc(e, e.type)} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${ft(t)}" instead of "${t}".`);
	}
	let s, c = r[s = mt(t)] || r[s = mt(ut(t))];
	!c && a && (c = r[s = mt(ft(t))]), c && Gr(c, e, 6, i);
	let l = r[s + "Once"];
	if (l) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[s]) return;
		e.emitted[s] = !0, Gr(l, e, 6, i);
	}
}
var uo = /* @__PURE__ */ new WeakMap();
function fo(e, t, n = !1) {
	let r = n ? uo : t.emitsCache, i = r.get(e);
	if (i !== void 0) return i;
	let a = e.emits, o = {}, s = !1;
	if (!M(e)) {
		let r = (e) => {
			let n = fo(e, t, !0);
			n && (s = !0, k(o, n));
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	return !a && !s ? (P(e) && r.set(e, null), null) : (j(a) ? a.forEach((e) => o[e] = null) : k(o, a), P(e) && r.set(e, o), o);
}
function po(e, t) {
	return !e || !Ke(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), A(e, t[0].toLowerCase() + t.slice(1)) || A(e, ft(t)) || A(e, t));
}
var mo = !1;
function ho() {
	mo = !0;
}
function go(e) {
	let { type: t, vnode: n, proxy: r, withProxy: i, propsOptions: [a], slots: o, attrs: s, emit: c, render: l, renderCache: u, props: d, data: f, setupState: p, ctx: m, inheritAttrs: h } = e, g = Hi(e), _, v;
	process.env.NODE_ENV !== "production" && (mo = !1);
	try {
		if (n.shapeFlag & 4) {
			let e = i || r, t = process.env.NODE_ENV !== "production" && p.__isScriptSetup ? new Proxy(e, { get(e, t, n) {
				return U(`Property '${String(t)}' was accessed via 'this'. Avoid using 'this' in templates.`), Reflect.get(e, t, n);
			} }) : e;
			_ = Gs(l.call(t, e, u, process.env.NODE_ENV === "production" ? d : /* @__PURE__ */ cr(d), p, f, m)), v = s;
		} else {
			let e = t;
			process.env.NODE_ENV !== "production" && s === d && ho(), _ = Gs(e.length > 1 ? e(process.env.NODE_ENV === "production" ? d : /* @__PURE__ */ cr(d), process.env.NODE_ENV === "production" ? {
				attrs: s,
				slots: o,
				emit: c
			} : {
				get attrs() {
					return ho(), /* @__PURE__ */ cr(s);
				},
				slots: o,
				emit: c
			}) : e(process.env.NODE_ENV === "production" ? d : /* @__PURE__ */ cr(d), null)), v = t.props ? s : yo(s);
		}
	} catch (t) {
		Cs.length = 0, Kr(t, e, 1), _ = Rs(xs);
	}
	let y = _, b;
	if (process.env.NODE_ENV !== "production" && _.patchFlag > 0 && _.patchFlag & 2048 && ([y, b] = _o(_)), v && h !== !1) {
		let e = Object.keys(v), { shapeFlag: t } = y;
		if (e.length) {
			if (t & 7) a && e.some(qe) && (v = bo(v, a)), y = Vs(y, v, !1, !0);
			else if (process.env.NODE_ENV !== "production" && !mo && y.type !== xs) {
				let e = Object.keys(s), t = [], n = [];
				for (let r = 0, i = e.length; r < i; r++) {
					let i = e[r];
					Ke(i) ? qe(i) || t.push(i[2].toLowerCase() + i.slice(3)) : n.push(i);
				}
				n.length && U(`Extraneous non-props attributes (${n.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`), t.length && U(`Extraneous non-emits event listeners (${t.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
			}
		}
	}
	return n.dirs && (process.env.NODE_ENV !== "production" && !xo(y) && U("Runtime directive used on component with non-element root node. The directives will not function as intended."), y = Vs(y, null, !1, !0), y.dirs = y.dirs ? y.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !xo(y) && U("Component inside <Transition> renders non-element root node that cannot be animated."), aa(y, n.transition)), process.env.NODE_ENV !== "production" && b ? b(y) : _ = y, Hi(g), _;
}
var _o = (e) => {
	let t = e.children, n = e.dynamicChildren, r = vo(t, !1);
	if (!r) return [e, void 0];
	if (process.env.NODE_ENV !== "production" && r.patchFlag > 0 && r.patchFlag & 2048) return _o(r);
	let i = t.indexOf(r), a = n ? n.indexOf(r) : -1;
	return [Gs(r), (r) => {
		t[i] = r, n && (a > -1 ? n[a] = r : r.patchFlag > 0 && (e.dynamicChildren = [...n, r]));
	}];
};
function vo(e, t = !0) {
	let n;
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		if (Ms(i)) {
			if (i.type !== xs || i.children === "v-if") {
				if (n) return;
				if (n = i, process.env.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048) return vo(n.children);
			}
		} else return;
	}
	return n;
}
var yo = (e) => {
	let t;
	for (let n in e) (n === "class" || n === "style" || Ke(n)) && ((t ||= {})[n] = e[n]);
	return t;
}, bo = (e, t) => {
	let n = {};
	for (let r in e) (!qe(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
	return n;
}, xo = (e) => e.shapeFlag & 7 || e.type === xs;
function So(e, t, n) {
	let { props: r, children: i, component: a } = e, { props: o, children: s, patchFlag: c } = t, l = a.emitsOptions;
	if (process.env.NODE_ENV !== "production" && (i || s) && pi || t.dirs || t.transition) return !0;
	if (n && c >= 0) {
		if (c & 1024) return !0;
		if (c & 16) return r ? Co(r, o, l) : !!o;
		if (c & 8) {
			let e = t.dynamicProps;
			for (let t = 0; t < e.length; t++) {
				let n = e[t];
				if (wo(o, r, n) && !po(l, n)) return !0;
			}
		}
	} else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? o ? Co(r, o, l) : !0 : !!o;
	return !1;
}
function Co(e, t, n) {
	let r = Object.keys(t);
	if (r.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < r.length; i++) {
		let a = r[i];
		if (wo(t, e, a) && !po(n, a)) return !0;
	}
	return !1;
}
function wo(e, t, n) {
	let r = e[n], i = t[n];
	return n === "style" && P(r) && P(i) ? !Lt(r, i) : r !== i;
}
function To({ vnode: e, parent: t, suspense: n }, r) {
	for (; t;) {
		let n = t.subTree;
		if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = r, e = n), n === e) (e = t.vnode).el = r, t = t.parent;
		else break;
	}
	n && n.activeBranch === e && (n.vnode.el = r);
}
var Eo = {}, Do = () => Object.create(Eo), Oo = (e) => Object.getPrototypeOf(e) === Eo;
function ko(e, t, n, r = !1) {
	let i = {}, a = Do();
	e.propsDefaults = /* @__PURE__ */ Object.create(null), Mo(e, t, i, a);
	for (let t in e.propsOptions[0]) t in i || (i[t] = void 0);
	process.env.NODE_ENV !== "production" && Ro(t || {}, i, e), n ? e.props = r ? i : /* @__PURE__ */ or(i) : e.type.props ? e.props = i : e.props = a, e.attrs = a;
}
function Ao(e) {
	for (; e;) {
		if (e.type.__hmrId) return !0;
		e = e.parent;
	}
}
function jo(e, t, n, r) {
	let { props: i, attrs: a, vnode: { patchFlag: o } } = e, s = /* @__PURE__ */ B(i), [c] = e.propsOptions, l = !1;
	if (!(process.env.NODE_ENV !== "production" && Ao(e)) && (r || o > 0) && !(o & 16)) {
		if (o & 8) {
			let n = e.vnode.dynamicProps;
			for (let r = 0; r < n.length; r++) {
				let o = n[r];
				if (po(e.emitsOptions, o)) continue;
				let u = t[o];
				if (c) if (A(a, o)) u !== a[o] && (a[o] = u, l = !0);
				else {
					let t = ut(o);
					i[t] = No(c, s, t, u, e, !1);
				}
				else u !== a[o] && (a[o] = u, l = !0);
			}
		}
	} else {
		Mo(e, t, i, a) && (l = !0);
		let r;
		for (let a in s) (!t || !A(t, a) && ((r = ft(a)) === a || !A(t, r))) && (c ? n && (n[a] !== void 0 || n[r] !== void 0) && (i[a] = No(c, s, a, void 0, e, !0)) : delete i[a]);
		if (a !== s) for (let e in a) (!t || !A(t, e)) && (delete a[e], l = !0);
	}
	l && xn(e.attrs, "set", ""), process.env.NODE_ENV !== "production" && Ro(t || {}, i, e);
}
function Mo(e, t, n, r) {
	let [i, a] = e.propsOptions, o = !1, s;
	if (t) for (let c in t) {
		if (ot(c)) continue;
		let l = t[c], u;
		i && A(i, u = ut(c)) ? !a || !a.includes(u) ? n[u] = l : (s ||= {})[u] = l : po(e.emitsOptions, c) || (!(c in r) || l !== r[c]) && (r[c] = l, o = !0);
	}
	if (a) {
		let t = /* @__PURE__ */ B(n), r = s || D;
		for (let o = 0; o < a.length; o++) {
			let s = a[o];
			n[s] = No(i, t, s, r[s], e, !A(r, s));
		}
	}
	return o;
}
function No(e, t, n, r, i, a) {
	let o = e[n];
	if (o != null) {
		let e = A(o, "default");
		if (e && r === void 0) {
			let e = o.default;
			if (o.type !== Function && !o.skipFactory && M(e)) {
				let { propsDefaults: a } = i;
				if (n in a) r = a[n];
				else {
					let o = nc(i);
					r = a[n] = e.call(null, t), o();
				}
			} else r = e;
			i.ce && i.ce._setProp(n, r);
		}
		o[0] && (a && !e ? r = !1 : o[1] && (r === "" || r === ft(n)) && (r = !0));
	}
	return r;
}
var Po = /* @__PURE__ */ new WeakMap();
function Fo(e, t, n = !1) {
	let r = n ? Po : t.propsCache, i = r.get(e);
	if (i) return i;
	let a = e.props, o = {}, s = [], c = !1;
	if (!M(e)) {
		let r = (e) => {
			c = !0;
			let [n, r] = Fo(e, t, !0);
			k(o, n), r && s.push(...r);
		};
		!n && t.mixins.length && t.mixins.forEach(r), e.extends && r(e.extends), e.mixins && e.mixins.forEach(r);
	}
	if (!a && !c) return P(e) && r.set(e, We), We;
	if (j(a)) for (let e = 0; e < a.length; e++) {
		process.env.NODE_ENV !== "production" && !N(a[e]) && U("props must be strings when using array syntax.", a[e]);
		let t = ut(a[e]);
		Io(t) && (o[t] = D);
	}
	else if (a) {
		process.env.NODE_ENV !== "production" && !P(a) && U("invalid props options", a);
		for (let e in a) {
			let t = ut(e);
			if (Io(t)) {
				let n = a[e], r = o[t] = j(n) || M(n) ? { type: n } : k({}, n), i = r.type, c = !1, l = !0;
				if (j(i)) for (let e = 0; e < i.length; ++e) {
					let t = i[e], n = M(t) && t.name;
					if (n === "Boolean") {
						c = !0;
						break;
					} else n === "String" && (l = !1);
				}
				else c = M(i) && i.name === "Boolean";
				r[0] = c, r[1] = l, (c || A(r, "default")) && s.push(t);
			}
		}
	}
	let l = [o, s];
	return P(e) && r.set(e, l), l;
}
function Io(e) {
	return e[0] !== "$" && !ot(e) ? !0 : (process.env.NODE_ENV !== "production" && U(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function Lo(e) {
	return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Ro(e, t, n) {
	let r = /* @__PURE__ */ B(t), i = n.propsOptions[0], a = Object.keys(e).map((e) => ut(e));
	for (let e in i) {
		let t = i[e];
		t != null && zo(e, r[e], t, process.env.NODE_ENV === "production" ? r : /* @__PURE__ */ cr(r), !a.includes(e));
	}
}
function zo(e, t, n, r, i) {
	let { type: a, required: o, validator: s, skipCheck: c } = n;
	if (o && i) {
		U("Missing required prop: \"" + e + "\"");
		return;
	}
	if (!(t == null && !o)) {
		if (a != null && a !== !0 && !c) {
			let n = !1, r = j(a) ? a : [a], i = [];
			for (let e = 0; e < r.length && !n; e++) {
				let { valid: a, expectedType: o } = Vo(t, r[e]);
				i.push(o || ""), n = a;
			}
			if (!n) {
				U(Ho(e, t, i));
				return;
			}
		}
		s && !s(t, r) && U("Invalid prop: custom validator check failed for prop \"" + e + "\".");
	}
}
var Bo = /* @__PURE__ */ Ue("String,Number,Boolean,Function,Symbol,BigInt");
function Vo(e, t) {
	let n, r = Lo(t);
	if (r === "null") n = e === null;
	else if (Bo(r)) {
		let i = typeof e;
		n = i === r.toLowerCase(), !n && i === "object" && (n = e instanceof t);
	} else n = r === "Object" ? P(e) : r === "Array" ? j(e) : e instanceof t;
	return {
		valid: n,
		expectedType: r
	};
}
function Ho(e, t, n) {
	if (n.length === 0) return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
	let r = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(pt).join(" | ")}`, i = n[0], a = rt(t), o = Uo(t, i), s = Uo(t, a);
	return n.length === 1 && Wo(i) && Go(i, a) && (r += ` with value ${o}`), r += `, got ${a} `, Wo(a) && (r += `with value ${s}.`), r;
}
function Uo(e, t) {
	return $e(e) ? e.toString() : t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function Wo(e) {
	return [
		"string",
		"number",
		"boolean"
	].some((t) => e.toLowerCase() === t);
}
function Go(...e) {
	return e.every((e) => {
		let t = e.toLowerCase();
		return t !== "boolean" && t !== "symbol";
	});
}
var Ko = (e) => e === "_" || e === "_ctx" || e === "$stable", qo = (e) => j(e) ? e.map(Gs) : [Gs(e)], Jo = (e, t, n) => {
	if (t._n) return t;
	let r = Ui((...r) => (process.env.NODE_ENV !== "production" && K && !(n === null && W) && !(n && n.root !== K.root) && U(`Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`), qo(t(...r))), n);
	return r._c = !1, r;
}, Yo = (e, t, n) => {
	let r = e._ctx;
	for (let n in e) {
		if (Ko(n)) continue;
		let i = e[n];
		if (M(i)) t[n] = Jo(n, i, r);
		else if (i != null) {
			process.env.NODE_ENV !== "production" && U(`Non-function value encountered for slot "${n}". Prefer function slots for better performance.`);
			let e = qo(i);
			t[n] = () => e;
		}
	}
}, Xo = (e, t) => {
	process.env.NODE_ENV !== "production" && !ma(e.vnode) && U("Non-function value encountered for default slot. Prefer function slots for better performance.");
	let n = qo(t);
	e.slots.default = () => n;
}, Zo = (e, t, n) => {
	for (let r in t) (n || !Ko(r)) && (e[r] = t[r]);
}, Qo = (e, t, n) => {
	let r = e.slots = Do();
	if (e.vnode.shapeFlag & 32) {
		let e = t._;
		e ? (Zo(r, t, n), n && _t(r, "_", e, !0)) : Yo(t, r);
	} else t && Xo(e, t);
}, $o = (e, t, n) => {
	let { vnode: r, slots: i } = e, a = !0, o = D;
	if (r.shapeFlag & 32) {
		let r = t._;
		r ? process.env.NODE_ENV !== "production" && pi ? (Zo(i, t, n), xn(e, "set", "$slots")) : n && r === 1 ? a = !1 : Zo(i, t, n) : (a = !t.$stable, Yo(t, i)), o = t;
	} else t && (Xo(e, t), o = { default: 1 });
	if (a) for (let e in i) !Ko(e) && o[e] == null && delete i[e];
}, es, ts;
function ns(e, t) {
	e.appContext.config.performance && is() && ts.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && Li(e, t, is() ? ts.now() : Date.now());
}
function rs(e, t) {
	if (e.appContext.config.performance && is()) {
		let n = `vue-${t}-${e.uid}`, r = n + ":end", i = `<${Sc(e, e.type)}> ${t}`;
		ts.mark(r), ts.measure(i, n, r), ts.clearMeasures(i), ts.clearMarks(n), ts.clearMarks(r);
	}
	process.env.NODE_ENV !== "production" && Ri(e, t, is() ? ts.now() : Date.now());
}
function is() {
	return es === void 0 && (typeof window < "u" && window.performance ? (es = !0, ts = window.performance) : es = !1), es;
}
function as() {
	let e = [];
	if (process.env.NODE_ENV !== "production" && e.length) {
		let t = e.length > 1;
		console.warn(`Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
	}
}
var os = vs;
function ss(e) {
	return cs(e);
}
function cs(e, t) {
	as();
	let n = bt();
	n.__VUE__ = !0, process.env.NODE_ENV !== "production" && ki(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
	let { insert: r, remove: i, patchProp: a, createElement: o, createText: s, createComment: c, setText: l, setElementText: u, parentNode: d, nextSibling: f, setScopeId: p = O, insertStaticContent: m } = e, h = (e, t, n, r = null, i = null, a = null, o = void 0, s = null, c = process.env.NODE_ENV !== "production" && pi ? !1 : !!t.dynamicChildren) => {
		if (e === t) return;
		e && !Ns(e, t) && (r = _e(e), fe(e, i, a, !0), e = null), t.patchFlag === -2 && (c = !1, t.dynamicChildren = null);
		let { type: l, ref: u, shapeFlag: d } = t;
		switch (l) {
			case bs:
				g(e, t, n, r);
				break;
			case xs:
				_(e, t, n, r);
				break;
			case Ss:
				e == null ? v(t, n, r, o) : process.env.NODE_ENV !== "production" && y(e, t, n, o);
				break;
			case ys:
				T(e, t, n, r, i, a, o, s, c);
				break;
			default: d & 1 ? ee(e, t, n, r, i, a, o, s, c) : d & 6 ? ie(e, t, n, r, i, a, o, s, c) : d & 64 || d & 128 ? l.process(e, t, n, r, i, a, o, s, c, be) : process.env.NODE_ENV !== "production" && U("Invalid VNode type:", l, `(${typeof l})`);
		}
		u != null && i ? da(u, e && e.ref, a, t || e, !t) : u == null && e && e.ref != null && da(e.ref, null, a, e, !0);
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
	}, y = (e, t, n, r) => {
		if (t.children !== e.children) {
			let i = f(e.anchor);
			x(e), [t.el, t.anchor] = m(t.children, n, i, r);
		} else t.el = e.el, t.anchor = e.anchor;
	}, b = ({ el: e, anchor: t }, n, i) => {
		let a;
		for (; e && e !== t;) a = f(e), r(e, n, i), e = a;
		r(t, n, i);
	}, x = ({ el: e, anchor: t }) => {
		let n;
		for (; e && e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, ee = (e, t, n, r, i, a, o, s, c) => {
		if (t.type === "svg" ? o = "svg" : t.type === "math" && (o = "mathml"), e == null) S(t, n, r, i, a, o, s, c);
		else {
			let n = e.el && e.el._isVueCE ? e.el : null;
			try {
				n && n._beginPatch(), ne(e, t, i, a, o, s, c);
			} finally {
				n && n._endPatch();
			}
		}
	}, S = (e, t, n, i, s, c, l, d) => {
		let f, p, { props: m, shapeFlag: h, transition: g, dirs: _ } = e;
		if (f = e.el = o(e.type, c, m && m.is, m), h & 8 ? u(f, e.children) : h & 16 && te(e.children, f, null, i, s, ls(e, c), l, d), _ && Ki(e, null, i, "created"), C(f, e, e.scopeId, l, i), m) {
			for (let e in m) e !== "value" && !ot(e) && a(f, e, null, m[e], c, i);
			"value" in m && a(f, "value", null, m.value, c), (p = m.onVnodeBeforeMount) && Ys(p, i, e);
		}
		process.env.NODE_ENV !== "production" && (_t(f, "__vnode", e, !0), _t(f, "__vueParentComponent", i, !0)), _ && Ki(e, null, i, "beforeMount");
		let v = ds(s, g);
		if (v && g.beforeEnter(f), r(f, t, n), (p = m && m.onVnodeMounted) || v || _) {
			let t = process.env.NODE_ENV !== "production" && pi;
			os(() => {
				let n;
				process.env.NODE_ENV !== "production" && (n = mi(t));
				try {
					p && Ys(p, i, e), v && g.enter(f), _ && Ki(e, null, i, "mounted");
				} finally {
					process.env.NODE_ENV !== "production" && mi(n);
				}
			}, s);
		}
	}, C = (e, t, n, r, i) => {
		if (n && p(e, n), r) for (let t = 0; t < r.length; t++) p(e, r[t]);
		if (i) {
			let n = i.subTree;
			if (process.env.NODE_ENV !== "production" && n.patchFlag > 0 && n.patchFlag & 2048 && (n = vo(n.children) || n), t === n || _s(n.type) && (n.ssContent === t || n.ssFallback === t)) {
				let t = i.vnode;
				C(e, t, t.scopeId, t.slotScopeIds, i.parent);
			}
		}
	}, te = (e, t, n, r, i, a, o, s, c = 0) => {
		for (let l = c; l < e.length; l++) h(null, e[l] = s ? Ks(e[l]) : Gs(e[l]), t, n, r, i, a, o, s);
	}, ne = (e, t, n, r, i, o, s) => {
		let c = t.el = e.el;
		process.env.NODE_ENV !== "production" && (c.__vnode = t);
		let { patchFlag: l, dynamicChildren: d, dirs: f } = t;
		l |= e.patchFlag & 16;
		let p = e.props || D, m = t.props || D, h;
		if (n && us(n, !1), (h = m.onVnodeBeforeUpdate) && Ys(h, n, t, e), f && Ki(t, e, n, "beforeUpdate"), n && us(n, !0), process.env.NODE_ENV !== "production" && pi && (l = 0, s = !1, d = null), (p.innerHTML && m.innerHTML == null || p.textContent && m.textContent == null) && u(c, ""), d ? (w(e.dynamicChildren, d, c, n, r, ls(t, i), o), process.env.NODE_ENV !== "production" && fs(e, t)) : s || ce(e, t, c, null, n, r, ls(t, i), o, !1), l > 0) {
			if (l & 16) re(c, p, m, n, i);
			else if (l & 2 && p.class !== m.class && a(c, "class", null, m.class, i), l & 4 && a(c, "style", p.style, m.style, i), l & 8) {
				let e = t.dynamicProps;
				for (let t = 0; t < e.length; t++) {
					let r = e[t], o = p[r], s = m[r];
					(s !== o || r === "value") && a(c, r, o, s, i, n);
				}
			}
			l & 1 && e.children !== t.children && u(c, t.children);
		} else !s && d == null && re(c, p, m, n, i);
		((h = m.onVnodeUpdated) || f) && os(() => {
			h && Ys(h, n, t, e), f && Ki(t, e, n, "updated");
		}, r);
	}, w = (e, t, n, r, i, a, o) => {
		for (let s = 0; s < t.length; s++) {
			let c = e[s], l = t[s];
			h(c, l, c.el && (c.type === ys || !Ns(c, l) || c.shapeFlag & 198) ? d(c.el) : n, null, r, i, a, o, !0);
		}
	}, re = (e, t, n, r, i) => {
		if (t !== n) {
			if (t !== D) for (let o in t) !ot(o) && !(o in n) && a(e, o, t[o], null, i, r);
			for (let o in n) {
				if (ot(o)) continue;
				let s = n[o], c = t[o];
				s !== c && o !== "value" && a(e, o, c, s, i, r);
			}
			"value" in n && a(e, "value", t.value, n.value, i);
		}
	}, T = (e, t, n, i, a, o, c, l, u) => {
		let d = t.el = e ? e.el : s(""), f = t.anchor = e ? e.anchor : s(""), { patchFlag: p, dynamicChildren: m, slotScopeIds: h } = t;
		process.env.NODE_ENV !== "production" && (pi || p & 2048) && (p = 0, u = !1, m = null), h && (l = l ? l.concat(h) : h), e == null ? (r(d, n, i), r(f, n, i), te(t.children || [], n, f, a, o, c, l, u)) : p > 0 && p & 64 && m && e.dynamicChildren && e.dynamicChildren.length === m.length ? (w(e.dynamicChildren, m, n, a, o, c, l), process.env.NODE_ENV === "production" ? (t.key != null || a && t === a.subTree) && fs(e, t, !0) : fs(e, t)) : ce(e, t, n, f, a, o, c, l, u);
	}, ie = (e, t, n, r, i, a, o, s, c) => {
		t.slotScopeIds = s, e == null ? t.shapeFlag & 512 ? i.ctx.activate(t, n, r, o, c) : E(t, n, r, i, a, o, c) : ae(e, t, c);
	}, E = (e, t, n, r, i, a, o) => {
		let s = e.component = Qs(e, r, i);
		if (process.env.NODE_ENV !== "production" && s.type.__hmrId && _i(s), process.env.NODE_ENV !== "production" && (Fr(e), ns(s, "mount")), ma(e) && (s.ctx.renderer = be), process.env.NODE_ENV !== "production" && ns(s, "init"), cc(s, !1, o), process.env.NODE_ENV !== "production" && rs(s, "init"), process.env.NODE_ENV !== "production" && pi && (e.el = null), s.asyncDep) {
			if (i && i.registerDep(s, oe, o), !e.el) {
				let r = s.subTree = Rs(xs);
				_(null, r, t, n), e.placeholder = r.el;
			}
		} else oe(s, e, t, n, i, a, o);
		process.env.NODE_ENV !== "production" && (Ir(), rs(s, "mount"));
	}, ae = (e, t, n) => {
		let r = t.component = e.component;
		if (So(e, t, n)) if (r.asyncDep && !r.asyncResolved) {
			process.env.NODE_ENV !== "production" && Fr(t), se(r, t, n), process.env.NODE_ENV !== "production" && Ir();
			return;
		} else r.next = t, r.update();
		else t.el = e.el, r.vnode = t;
	}, oe = (e, t, n, r, i, a, o) => {
		let s = () => {
			if (e.isMounted) {
				let { next: t, bu: n, u: r, parent: s, vnode: c } = e;
				{
					let n = ms(e);
					if (n) {
						t && (t.el = c.el, se(e, t, o)), n.asyncDep.then(() => {
							os(() => {
								e.isUnmounted || l();
							}, i);
						});
						return;
					}
				}
				let u = t, f;
				process.env.NODE_ENV !== "production" && Fr(t || e.vnode), us(e, !1), t ? (t.el = c.el, se(e, t, o)) : t = c, n && gt(n), (f = t.props && t.props.onVnodeBeforeUpdate) && Ys(f, s, t, c), us(e, !0), process.env.NODE_ENV !== "production" && ns(e, "render");
				let p = go(e);
				process.env.NODE_ENV !== "production" && rs(e, "render");
				let m = e.subTree;
				e.subTree = p, process.env.NODE_ENV !== "production" && ns(e, "patch"), h(m, p, d(m.el), _e(m), e, i, a), process.env.NODE_ENV !== "production" && rs(e, "patch"), t.el = p.el, u === null && To(e, p.el), r && os(r, i), (f = t.props && t.props.onVnodeUpdated) && os(() => Ys(f, s, t, c), i), process.env.NODE_ENV !== "production" && Ni(e), process.env.NODE_ENV !== "production" && Ir();
			} else {
				let o, { el: s, props: c } = t, { bm: l, m: u, parent: d, root: f, type: p } = e, m = pa(t);
				if (us(e, !1), l && gt(l), !m && (o = c && c.onVnodeBeforeMount) && Ys(o, d, t), us(e, !0), s && Se) {
					let t = () => {
						process.env.NODE_ENV !== "production" && ns(e, "render"), e.subTree = go(e), process.env.NODE_ENV !== "production" && rs(e, "render"), process.env.NODE_ENV !== "production" && ns(e, "hydrate"), Se(s, e.subTree, e, i, null), process.env.NODE_ENV !== "production" && rs(e, "hydrate");
					};
					m && p.__asyncHydrate ? p.__asyncHydrate(s, e, t) : t();
				} else {
					f.ce && f.ce._hasShadowRoot() && f.ce._injectChildStyle(p, e.parent ? e.parent.type : void 0), process.env.NODE_ENV !== "production" && ns(e, "render");
					let o = e.subTree = go(e);
					process.env.NODE_ENV !== "production" && rs(e, "render"), process.env.NODE_ENV !== "production" && ns(e, "patch"), h(null, o, n, r, e, i, a), process.env.NODE_ENV !== "production" && rs(e, "patch"), t.el = o.el;
				}
				if (u && os(u, i), !m && (o = c && c.onVnodeMounted)) {
					let e = t;
					os(() => Ys(o, d, e), i);
				}
				(t.shapeFlag & 256 || d && pa(d.vnode) && d.vnode.shapeFlag & 256) && e.a && os(e.a, i), e.isMounted = !0, process.env.NODE_ENV !== "production" && Mi(e), t = n = r = null;
			}
		};
		e.scope.on();
		let c = e.effect = new Jt(s);
		e.scope.off();
		let l = e.update = c.run.bind(c), u = e.job = c.runIfDirty.bind(c);
		u.i = e, u.id = e.uid, c.scheduler = () => ii(u), us(e, !0), process.env.NODE_ENV !== "production" && (c.onTrack = e.rtc ? (t) => gt(e.rtc, t) : void 0, c.onTrigger = e.rtg ? (t) => gt(e.rtg, t) : void 0), l();
	}, se = (e, t, n) => {
		t.component = e;
		let r = e.vnode.props;
		e.vnode = t, e.next = null, jo(e, t.props, r, n), $o(e, t.children, n), un(), si(e), dn();
	}, ce = (e, t, n, r, i, a, o, s, c = !1) => {
		let l = e && e.children, d = e ? e.shapeFlag : 0, f = t.children, { patchFlag: p, shapeFlag: m } = t;
		if (p > 0) {
			if (p & 128) {
				ue(l, f, n, r, i, a, o, s, c);
				return;
			} else if (p & 256) {
				le(l, f, n, r, i, a, o, s, c);
				return;
			}
		}
		m & 8 ? (d & 16 && ge(l, i, a), f !== l && u(n, f)) : d & 16 ? m & 16 ? ue(l, f, n, r, i, a, o, s, c) : ge(l, i, a, !0) : (d & 8 && u(n, ""), m & 16 && te(f, n, r, i, a, o, s, c));
	}, le = (e, t, n, r, i, a, o, s, c) => {
		e ||= We, t ||= We;
		let l = e.length, u = t.length, d = Math.min(l, u), f;
		for (f = 0; f < d; f++) {
			let r = t[f] = c ? Ks(t[f]) : Gs(t[f]);
			h(e[f], r, n, null, i, a, o, s, c);
		}
		l > u ? ge(e, i, a, !0, !1, d) : te(t, n, r, i, a, o, s, c, d);
	}, ue = (e, t, n, r, i, a, o, s, c) => {
		let l = 0, u = t.length, d = e.length - 1, f = u - 1;
		for (; l <= d && l <= f;) {
			let r = e[l], u = t[l] = c ? Ks(t[l]) : Gs(t[l]);
			if (Ns(r, u)) h(r, u, n, null, i, a, o, s, c);
			else break;
			l++;
		}
		for (; l <= d && l <= f;) {
			let r = e[d], l = t[f] = c ? Ks(t[f]) : Gs(t[f]);
			if (Ns(r, l)) h(r, l, n, null, i, a, o, s, c);
			else break;
			d--, f--;
		}
		if (l > d) {
			if (l <= f) {
				let e = f + 1, d = e < u ? t[e].el : r;
				for (; l <= f;) h(null, t[l] = c ? Ks(t[l]) : Gs(t[l]), n, d, i, a, o, s, c), l++;
			}
		} else if (l > f) for (; l <= d;) fe(e[l], i, a, !0), l++;
		else {
			let p = l, m = l, g = /* @__PURE__ */ new Map();
			for (l = m; l <= f; l++) {
				let e = t[l] = c ? Ks(t[l]) : Gs(t[l]);
				e.key != null && (process.env.NODE_ENV !== "production" && g.has(e.key) && U("Duplicate keys found during update:", JSON.stringify(e.key), "Make sure keys are unique."), g.set(e.key, l));
			}
			let _, v = 0, y = f - m + 1, b = !1, x = 0, ee = Array(y);
			for (l = 0; l < y; l++) ee[l] = 0;
			for (l = p; l <= d; l++) {
				let r = e[l];
				if (v >= y) {
					fe(r, i, a, !0);
					continue;
				}
				let u;
				if (r.key != null) u = g.get(r.key);
				else for (_ = m; _ <= f; _++) if (ee[_ - m] === 0 && Ns(r, t[_])) {
					u = _;
					break;
				}
				u === void 0 ? fe(r, i, a, !0) : (ee[u - m] = l + 1, u >= x ? x = u : b = !0, h(r, t[u], n, null, i, a, o, s, c), v++);
			}
			let S = b ? ps(ee) : We;
			for (_ = S.length - 1, l = y - 1; l >= 0; l--) {
				let e = m + l, d = t[e], f = t[e + 1], p = e + 1 < u ? f.el || gs(f) : r;
				ee[l] === 0 ? h(null, d, n, p, i, a, o, s, c) : b && (_ < 0 || l !== S[_] ? de(d, n, p, 2) : _--);
			}
		}
	}, de = (e, t, n, a, o = null) => {
		let { el: s, type: c, transition: l, children: u, shapeFlag: d } = e;
		if (d & 6) {
			de(e.component.subTree, t, n, a);
			return;
		}
		if (d & 128) {
			e.suspense.move(t, n, a);
			return;
		}
		if (d & 64) {
			c.move(e, t, n, be);
			return;
		}
		if (c === ys) {
			r(s, t, n);
			for (let e = 0; e < u.length; e++) de(u[e], t, n, a);
			r(e.anchor, t, n);
			return;
		}
		if (c === Ss) {
			b(e, t, n);
			return;
		}
		if (a !== 2 && d & 1 && l) if (a === 0) l.persisted && !s[ia] ? r(s, t, n) : (l.beforeEnter(s), r(s, t, n), os(() => l.enter(s), o));
		else {
			let { leave: a, delayLeave: o, afterLeave: c } = l, u = () => {
				e.ctx.isUnmounted ? i(s) : r(s, t, n);
			}, d = () => {
				let e = s._isLeaving || !!s[ia];
				s._isLeaving && s[ia](!0), l.persisted && !e ? u() : a(s, () => {
					u(), c && c();
				});
			};
			o ? o(s, u, d) : d();
		}
		else r(s, t, n);
	}, fe = (e, t, n, r = !1, i = !1) => {
		let { type: a, props: o, ref: s, children: c, dynamicChildren: l, shapeFlag: u, patchFlag: d, dirs: f, cacheIndex: p, memo: m } = e;
		if (d === -2 && (i = !1), s != null && (un(), da(s, null, n, e, !0), dn()), p != null && (t.renderCache[p] = void 0), u & 256) {
			t.ctx.deactivate(e);
			return;
		}
		let h = u & 1 && f, g = !pa(e), _;
		if (g && (_ = o && o.onVnodeBeforeUnmount) && Ys(_, t, e), u & 6) he(e.component, n, r);
		else {
			if (u & 128) {
				e.suspense.unmount(n, r);
				return;
			}
			h && Ki(e, null, t, "beforeUnmount"), u & 64 ? e.type.remove(e, t, n, be, r) : l && !l.hasOnce && (a !== ys || d > 0 && d & 64) ? ge(l, t, n, !1, !0) : (a === ys && d & 384 || !i && u & 16) && ge(c, t, n), r && pe(e);
		}
		let v = m != null && p == null;
		(g && (_ = o && o.onVnodeUnmounted) || h || v) && os(() => {
			_ && Ys(_, t, e), h && Ki(e, null, t, "unmounted"), v && (e.el = null);
		}, n);
	}, pe = (e) => {
		let { type: t, el: n, anchor: r, transition: a } = e;
		if (t === ys) {
			process.env.NODE_ENV !== "production" && e.patchFlag > 0 && e.patchFlag & 2048 && a && !a.persisted ? e.children.forEach((e) => {
				e.type === xs ? i(e.el) : pe(e);
			}) : me(n, r);
			return;
		}
		if (t === Ss) {
			x(e);
			return;
		}
		let o = () => {
			i(n), a && !a.persisted && a.afterLeave && a.afterLeave();
		};
		if (e.shapeFlag & 1 && a && !a.persisted) {
			let { leave: t, delayLeave: r } = a, i = () => t(n, o);
			r ? r(e.el, o, i) : i();
		} else o();
	}, me = (e, t) => {
		let n;
		for (; e !== t;) n = f(e), i(e), e = n;
		i(t);
	}, he = (e, t, n) => {
		process.env.NODE_ENV !== "production" && e.type.__hmrId && vi(e);
		let { bum: r, scope: i, job: a, subTree: o, um: s, m: c, a: l } = e;
		hs(c), hs(l), r && gt(r), i.stop(), a && (a.flags |= 8, fe(o, e, t, n)), s && os(s, t), os(() => {
			e.isUnmounted = !0;
		}, t), process.env.NODE_ENV !== "production" && Fi(e);
	}, ge = (e, t, n, r = !1, i = !1, a = 0) => {
		for (let o = a; o < e.length; o++) fe(e[o], t, n, r, i);
	}, _e = (e) => {
		if (e.shapeFlag & 6) return _e(e.component.subTree);
		if (e.shapeFlag & 128) return e.suspense.next();
		let t = f(e.anchor || e.el), n = t && t[na];
		return n ? f(n) : t;
	}, ve = !1, ye = (e, t, n) => {
		let r;
		e == null ? t._vnode && (fe(t._vnode, null, null, !0), r = t._vnode.component) : h(t._vnode || null, e, t, null, null, null, n), t._vnode = e, ve ||= (ve = !0, si(r), ci(), !1);
	}, be = {
		p: h,
		um: fe,
		m: de,
		r: pe,
		mt: E,
		mc: te,
		pc: ce,
		pbc: w,
		n: _e,
		o: e
	}, xe, Se;
	return t && ([xe, Se] = t(be)), {
		render: ye,
		hydrate: xe,
		createApp: oo(ye, xe)
	};
}
function ls({ type: e, props: t }, n) {
	return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function us({ effect: e, job: t }, n) {
	n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function ds(e, t) {
	return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function fs(e, t, n = !1) {
	let r = e.children, i = t.children;
	if (j(r) && j(i)) for (let e = 0; e < r.length; e++) {
		let t = r[e], a = i[e];
		a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = i[e] = Ks(i[e]), a.el = t.el), !n && a.patchFlag !== -2 && fs(t, a)), a.type === bs && (a.patchFlag === -1 && (a = i[e] = Ks(a)), a.el = t.el), a.type === xs && !a.el && (a.el = t.el), process.env.NODE_ENV !== "production" && a.el && (a.el.__vnode = a);
	}
}
function ps(e) {
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
function ms(e) {
	let t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : ms(t);
}
function hs(e) {
	if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function gs(e) {
	if (e.placeholder) return e.placeholder;
	let t = e.component;
	return t ? gs(t.subTree) : null;
}
var _s = (e) => e.__isSuspense;
function vs(e, t) {
	t && t.pendingBranch ? j(e) ? t.effects.push(...e) : t.effects.push(e) : oi(e);
}
var ys = /* @__PURE__ */ Symbol.for("v-fgt"), bs = /* @__PURE__ */ Symbol.for("v-txt"), xs = /* @__PURE__ */ Symbol.for("v-cmt"), Ss = /* @__PURE__ */ Symbol.for("v-stc"), Cs = [], ws = null;
function Ts(e = !1) {
	Cs.push(ws = e ? null : []);
}
function Es() {
	Cs.pop(), ws = Cs[Cs.length - 1] || null;
}
var Ds = 1;
function Os(e, t = !1) {
	Ds += e, e < 0 && ws && t && (ws.hasOnce = !0);
}
function ks(e) {
	return e.dynamicChildren = Ds > 0 ? ws || We : null, Es(), Ds > 0 && ws && ws.push(e), e;
}
function As(e, t, n, r, i, a) {
	return ks(G(e, t, n, r, i, a, !0));
}
function js(e, t, n, r, i) {
	return ks(Rs(e, t, n, r, i, !0));
}
function Ms(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Ns(e, t) {
	if (process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
		let n = hi.get(t.type);
		if (n && n.has(e.component)) return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
	}
	return e.type === t.type && e.key === t.key;
}
var Ps, Fs = (...e) => zs(...Ps ? Ps(e, W) : e), Is = ({ key: e }) => e ?? null, Ls = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e == null ? null : N(e) || /* @__PURE__ */ V(e) || M(e) ? {
	i: W,
	r: e,
	k: t,
	f: !!n
} : e);
function G(e, t = null, n = null, r = 0, i = null, a = e === ys ? 0 : 1, o = !1, s = !1) {
	let c = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Is(t),
		ref: t && Ls(t),
		scopeId: Vi,
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
		ctx: W
	};
	return s ? (qs(c, n), a & 128 && e.normalize(c)) : n && (c.shapeFlag |= N(n) ? 8 : 16), process.env.NODE_ENV !== "production" && c.key !== c.key && U("VNode created with invalid key (NaN). VNode type:", c.type), Ds > 0 && !o && ws && (c.patchFlag > 0 || a & 6) && c.patchFlag !== 32 && ws.push(c), c;
}
var Rs = process.env.NODE_ENV === "production" ? zs : Fs;
function zs(e, t = null, n = null, r = 0, i = null, a = !1) {
	if ((!e || e === ja) && (process.env.NODE_ENV !== "production" && !e && U(`Invalid vnode type when creating vnode: ${e}.`), e = xs), Ms(e)) {
		let r = Vs(e, t, !0);
		return n && qs(r, n), Ds > 0 && !a && ws && (r.shapeFlag & 6 ? ws[ws.indexOf(e)] = r : ws.push(r)), r.patchFlag = -2, r;
	}
	if (Cc(e) && (e = e.__vccOpts), t) {
		t = Bs(t);
		let { class: e, style: n } = t;
		e && !N(e) && (t.class = Et(e)), P(n) && (/* @__PURE__ */ fr(n) && !j(n) && (n = k({}, n)), t.style = xt(n));
	}
	let o = N(e) ? 1 : _s(e) ? 128 : ra(e) ? 64 : P(e) ? 4 : M(e) ? 2 : 0;
	return process.env.NODE_ENV !== "production" && o & 4 && /* @__PURE__ */ fr(e) && (e = /* @__PURE__ */ B(e), U("Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", "\nComponent that was made reactive: ", e)), G(e, t, n, r, i, o, a, !0);
}
function Bs(e) {
	return e ? /* @__PURE__ */ fr(e) || Oo(e) ? k({}, e) : e : null;
}
function Vs(e, t, n = !1, r = !1) {
	let { props: i, ref: a, patchFlag: o, children: s, transition: c } = e, l = t ? Js(i || {}, t) : i, u = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: l,
		key: l && Is(l),
		ref: t && t.ref ? n && a ? j(a) ? a.concat(Ls(t)) : [a, Ls(t)] : Ls(t) : a,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: process.env.NODE_ENV !== "production" && o === -1 && j(s) ? s.map(Hs) : s,
		target: e.target,
		targetStart: e.targetStart,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== ys ? o === -1 ? 16 : o | 16 : o,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: c,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && Vs(e.ssContent),
		ssFallback: e.ssFallback && Vs(e.ssFallback),
		placeholder: e.placeholder,
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce
	};
	return c && r && aa(u, c.clone(u)), u;
}
function Hs(e) {
	let t = Vs(e);
	return j(e.children) && (t.children = e.children.map(Hs)), t;
}
function Us(e = " ", t = 0) {
	return Rs(bs, null, e, t);
}
function Ws(e = "", t = !1) {
	return t ? (Ts(), js(xs, null, e)) : Rs(xs, null, e);
}
function Gs(e) {
	return e == null || typeof e == "boolean" ? Rs(xs) : j(e) ? Rs(ys, null, e.slice()) : Ms(e) ? Ks(e) : Rs(bs, null, String(e));
}
function Ks(e) {
	return e.el === null && e.patchFlag !== -1 || e.memo ? e : Vs(e);
}
function qs(e, t) {
	let n = 0, { shapeFlag: r } = e;
	if (t == null) t = null;
	else if (j(t)) n = 16;
	else if (typeof t == "object") if (r & 65) {
		let n = t.default;
		n && (n._c && (n._d = !1), qs(e, n()), n._c && (n._d = !0));
		return;
	} else {
		n = 32;
		let r = t._;
		!r && !Oo(t) ? t._ctx = W : r === 3 && W && (W.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
	}
	else M(t) ? (t = {
		default: t,
		_ctx: W
	}, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Us(t)]) : n = 8);
	e.children = t, e.shapeFlag |= n;
}
function Js(...e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (let e in r) if (e === "class") t.class !== r.class && (t.class = Et([t.class, r.class]));
		else if (e === "style") t.style = xt([t.style, r.style]);
		else if (Ke(e)) {
			let n = t[e], i = r[e];
			i && n !== i && !(j(n) && n.includes(i)) ? t[e] = n ? [].concat(n, i) : i : i == null && n == null && !qe(e) && (t[e] = i);
		} else e !== "" && (t[e] = r[e]);
	}
	return t;
}
function Ys(e, t, n, r = null) {
	Gr(e, t, 7, [n, r]);
}
var Xs = io(), Zs = 0;
function Qs(e, t, n) {
	let r = e.type, i = (t ? t.appContext : e.appContext) || Xs, a = {
		uid: Zs++,
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
		scope: new Ut(!0),
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
		propsOptions: Fo(r, i),
		emitsOptions: fo(r, i),
		emit: null,
		emitted: null,
		propsDefaults: D,
		inheritAttrs: r.inheritAttrs,
		ctx: D,
		data: D,
		props: D,
		attrs: D,
		slots: D,
		refs: D,
		setupState: D,
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
	return process.env.NODE_ENV === "production" ? a.ctx = { _: a } : a.ctx = Ra(a), a.root = t ? t.root : a, a.emit = lo.bind(null, a), e.ce && e.ce(a), a;
}
var K = null, $s = () => K || W, ec, tc;
{
	let e = bt(), t = (t, n) => {
		let r;
		return (r = e[t]) || (r = e[t] = []), r.push(n), (e) => {
			r.length > 1 ? r.forEach((t) => t(e)) : r[0](e);
		};
	};
	ec = t("__VUE_INSTANCE_SETTERS__", (e) => K = e), tc = t("__VUE_SSR_SETTERS__", (e) => sc = e);
}
var nc = (e) => {
	let t = K;
	return ec(e), e.scope.on(), () => {
		e.scope.off(), ec(t);
	};
}, rc = () => {
	K && K.scope.off(), ec(null);
}, ic = /* @__PURE__ */ Ue("slot,component");
function ac(e, { isNativeTag: t }) {
	(ic(e) || t(e)) && U("Do not use built-in or reserved HTML elements as component id: " + e);
}
function oc(e) {
	return e.vnode.shapeFlag & 4;
}
var sc = !1;
function cc(e, t = !1, n = !1) {
	t && tc(t);
	let { props: r, children: i } = e.vnode, a = oc(e);
	ko(e, r, a, t), Qo(e, i, n || t);
	let o = a ? lc(e, t) : void 0;
	return t && tc(!1), o;
}
function lc(e, t) {
	let n = e.type;
	if (process.env.NODE_ENV !== "production") {
		if (n.name && ac(n.name, e.appContext.config), n.components) {
			let t = Object.keys(n.components);
			for (let n = 0; n < t.length; n++) ac(t[n], e.appContext.config);
		}
		if (n.directives) {
			let e = Object.keys(n.directives);
			for (let t = 0; t < e.length; t++) Wi(e[t]);
		}
		n.compilerOptions && pc() && U("\"compilerOptions\" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.");
	}
	e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, La), process.env.NODE_ENV !== "production" && za(e);
	let { setup: r } = n;
	if (r) {
		un();
		let i = e.setupContext = r.length > 1 ? _c(e) : null, a = nc(e), o = Wr(r, e, 0, [process.env.NODE_ENV === "production" ? e.props : /* @__PURE__ */ cr(e.props), i]), s = et(o);
		if (dn(), a(), (s || e.sp) && !pa(e) && sa(e), s) {
			if (o.then(rc, rc), t) return o.then((n) => {
				uc(e, n, t);
			}).catch((t) => {
				Kr(t, e, 0);
			});
			e.asyncDep = o, process.env.NODE_ENV !== "production" && !e.suspense && U(`Component <${Sc(e, n)}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
		} else uc(e, o, t);
	} else mc(e, t);
}
function uc(e, t, n) {
	M(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : P(t) ? (process.env.NODE_ENV !== "production" && Ms(t) && U("setup() should not return VNodes directly - return a render function instead."), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = br(t), process.env.NODE_ENV !== "production" && Ba(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && U(`setup() should return an object. Received: ${t === null ? "null" : typeof t}`), mc(e, n);
}
var dc, fc, pc = () => !dc;
function mc(e, t, n) {
	let r = e.type;
	if (!e.render) {
		if (!t && dc && !r.render) {
			let t = r.template || Ja(e).template;
			if (t) {
				process.env.NODE_ENV !== "production" && ns(e, "compile");
				let { isCustomElement: n, compilerOptions: i } = e.appContext.config, { delimiters: a, compilerOptions: o } = r;
				r.render = dc(t, k(k({
					isCustomElement: n,
					delimiters: a
				}, i), o)), process.env.NODE_ENV !== "production" && rs(e, "compile");
			}
		}
		e.render = r.render || O, fc && fc(e);
	}
	{
		let t = nc(e);
		un();
		try {
			Wa(e);
		} finally {
			dn(), t();
		}
	}
	process.env.NODE_ENV !== "production" && !r.render && e.render === O && !t && (!dc && r.template ? U("Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias \"vue\" to \"vue/dist/vue.esm-bundler.js\".") : U("Component is missing template or render function: ", r));
}
var hc = process.env.NODE_ENV === "production" ? { get(e, t) {
	return R(e, "get", ""), e[t];
} } : {
	get(e, t) {
		return ho(), R(e, "get", ""), e[t];
	},
	set() {
		return U("setupContext.attrs is readonly."), !1;
	},
	deleteProperty() {
		return U("setupContext.attrs is readonly."), !1;
	}
};
function gc(e) {
	return new Proxy(e.slots, { get(t, n) {
		return R(e, "get", "$slots"), t[n];
	} });
}
function _c(e) {
	let t = (t) => {
		if (process.env.NODE_ENV !== "production" && (e.exposed && U("expose() should be called only once per setup()."), t != null)) {
			let e = typeof t;
			e === "object" && (j(t) ? e = "array" : /* @__PURE__ */ V(t) && (e = "ref")), e !== "object" && U(`expose() should be passed a plain object, received ${e}.`);
		}
		e.exposed = t || {};
	};
	if (process.env.NODE_ENV !== "production") {
		let n, r;
		return Object.freeze({
			get attrs() {
				return n ||= new Proxy(e.attrs, hc);
			},
			get slots() {
				return r ||= gc(e);
			},
			get emit() {
				return (t, ...n) => e.emit(t, ...n);
			},
			expose: t
		});
	} else return {
		attrs: new Proxy(e.attrs, hc),
		slots: e.slots,
		emit: e.emit,
		expose: t
	};
}
function vc(e) {
	return e.exposed ? e.exposeProxy ||= new Proxy(br(pr(e.exposed)), {
		get(t, n) {
			if (n in t) return t[n];
			if (n in Pa) return Pa[n](e);
		},
		has(e, t) {
			return t in e || t in Pa;
		}
	}) : e.proxy;
}
var yc = /(?:^|[-_])\w/g, bc = (e) => e.replace(yc, (e) => e.toUpperCase()).replace(/[-_]/g, "");
function xc(e, t = !0) {
	return M(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Sc(e, t, n = !1) {
	let r = xc(t);
	if (!r && t.__file) {
		let e = t.__file.match(/([^/\\]+)\.\w+$/);
		e && (r = e[1]);
	}
	if (!r && e) {
		let n = (e) => {
			for (let n in e) if (e[n] === t) return n;
		};
		r = n(e.components) || e.parent && n(e.parent.type.components) || n(e.appContext.components);
	}
	return r ? bc(r) : n ? "App" : "Anonymous";
}
function Cc(e) {
	return M(e) && "__vccOpts" in e;
}
var wc = (e, t) => {
	let n = /* @__PURE__ */ Dr(e, t, sc);
	if (process.env.NODE_ENV !== "production") {
		let e = $s();
		e && e.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
	}
	return n;
};
function Tc() {
	if (process.env.NODE_ENV === "production" || typeof window > "u") return;
	let e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, r = { style: "color:#eb2f96" }, i = {
		__vue_custom_formatter: !0,
		header(t) {
			if (!P(t)) return null;
			if (t.__isVue) return [
				"div",
				e,
				"VueInstance"
			];
			if (/* @__PURE__ */ V(t)) {
				un();
				let n = t.value;
				return dn(), [
					"div",
					{},
					[
						"span",
						e,
						u(t)
					],
					"<",
					s(n),
					">"
				];
			} else if (/* @__PURE__ */ ur(t)) return [
				"div",
				{},
				[
					"span",
					e,
					/* @__PURE__ */ z(t) ? "ShallowReactive" : "Reactive"
				],
				"<",
				s(t),
				`>${/* @__PURE__ */ dr(t) ? " (readonly)" : ""}`
			];
			else if (/* @__PURE__ */ dr(t)) return [
				"div",
				{},
				[
					"span",
					e,
					/* @__PURE__ */ z(t) ? "ShallowReadonly" : "Readonly"
				],
				"<",
				s(t),
				">"
			];
			return null;
		},
		hasBody(e) {
			return e && e.__isVue;
		},
		body(e) {
			if (e && e.__isVue) return [
				"div",
				{},
				...a(e.$)
			];
		}
	};
	function a(e) {
		let t = [];
		e.type.props && e.props && t.push(o("props", /* @__PURE__ */ B(e.props))), e.setupState !== D && t.push(o("setup", e.setupState)), e.data !== D && t.push(o("data", /* @__PURE__ */ B(e.data)));
		let n = c(e, "computed");
		n && t.push(o("computed", n));
		let i = c(e, "inject");
		return i && t.push(o("injected", i)), t.push([
			"div",
			{},
			[
				"span",
				{ style: r.style + ";opacity:0.66" },
				"$ (internal): "
			],
			["object", { object: e }]
		]), t;
	}
	function o(e, t) {
		return t = k({}, t), Object.keys(t).length ? [
			"div",
			{ style: "line-height:1.25em;margin-bottom:0.6em" },
			[
				"div",
				{ style: "color:#476582" },
				e
			],
			[
				"div",
				{ style: "padding-left:1.25em" },
				...Object.keys(t).map((e) => [
					"div",
					{},
					[
						"span",
						r,
						e + ": "
					],
					s(t[e], !1)
				])
			]
		] : ["span", {}];
	}
	function s(e, i = !0) {
		return typeof e == "number" ? [
			"span",
			t,
			e
		] : typeof e == "string" ? [
			"span",
			n,
			JSON.stringify(e)
		] : typeof e == "boolean" ? [
			"span",
			r,
			e
		] : P(e) ? ["object", { object: i ? /* @__PURE__ */ B(e) : e }] : [
			"span",
			n,
			String(e)
		];
	}
	function c(e, t) {
		let n = e.type;
		if (M(n)) return;
		let r = {};
		for (let i in e.ctx) l(n, i, t) && (r[i] = e.ctx[i]);
		return r;
	}
	function l(e, t, n) {
		let r = e[n];
		if (j(r) && r.includes(t) || P(r) && t in r || e.extends && l(e.extends, t, n) || e.mixins && e.mixins.some((e) => l(e, t, n))) return !0;
	}
	function u(e) {
		return /* @__PURE__ */ z(e) ? "ShallowRef" : e.effect ? "ComputedRef" : "Ref";
	}
	window.devtoolsFormatters ? window.devtoolsFormatters.push(i) : window.devtoolsFormatters = [i];
}
var Ec = "3.5.38", Dc = process.env.NODE_ENV === "production" ? O : U;
process.env.NODE_ENV, process.env.NODE_ENV;
//#endregion
//#region node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
var Oc = void 0, kc = typeof window < "u" && window.trustedTypes;
if (kc) try {
	Oc = /* @__PURE__ */ kc.createPolicy("vue", { createHTML: (e) => e });
} catch (e) {
	process.env.NODE_ENV !== "production" && Dc(`Error creating trusted types policy: ${e}`);
}
var Ac = Oc ? (e) => Oc.createHTML(e) : (e) => e, jc = "http://www.w3.org/2000/svg", Mc = "http://www.w3.org/1998/Math/MathML", Nc = typeof document < "u" ? document : null, Pc = Nc && /* @__PURE__ */ Nc.createElement("template"), Fc = {
	insert: (e, t, n) => {
		t.insertBefore(e, n || null);
	},
	remove: (e) => {
		let t = e.parentNode;
		t && t.removeChild(e);
	},
	createElement: (e, t, n, r) => {
		let i = t === "svg" ? Nc.createElementNS(jc, e) : t === "mathml" ? Nc.createElementNS(Mc, e) : n ? Nc.createElement(e, { is: n }) : Nc.createElement(e);
		return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
	},
	createText: (e) => Nc.createTextNode(e),
	createComment: (e) => Nc.createComment(e),
	setText: (e, t) => {
		e.nodeValue = t;
	},
	setElementText: (e, t) => {
		e.textContent = t;
	},
	parentNode: (e) => e.parentNode,
	nextSibling: (e) => e.nextSibling,
	querySelector: (e) => Nc.querySelector(e),
	setScopeId(e, t) {
		e.setAttribute(t, "");
	},
	insertStaticContent(e, t, n, r, i, a) {
		let o = n ? n.previousSibling : t.lastChild;
		if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)););
		else {
			Pc.innerHTML = Ac(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
			let i = Pc.content;
			if (r === "svg" || r === "mathml") {
				let e = i.firstChild;
				for (; e.firstChild;) i.appendChild(e.firstChild);
				i.removeChild(e);
			}
			t.insertBefore(i, n);
		}
		return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
	}
}, Ic = /* @__PURE__ */ Symbol("_vtc");
function Lc(e, t, n) {
	let r = e[Ic];
	r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var Rc = /* @__PURE__ */ Symbol("_vod"), zc = /* @__PURE__ */ Symbol("_vsh"), Bc = /* @__PURE__ */ Symbol(process.env.NODE_ENV === "production" ? "" : "CSS_VAR_TEXT"), Vc = /(?:^|;)\s*display\s*:/;
function Hc(e, t, n) {
	let r = e.style, i = N(n), a = !1;
	if (n && !i) {
		if (t) if (N(t)) for (let e of t.split(";")) {
			let t = e.slice(0, e.indexOf(":")).trim();
			n[t] ?? Gc(r, t, "");
		}
		else for (let e in t) n[e] ?? Gc(r, e, "");
		for (let i in n) {
			i === "display" && (a = !0);
			let o = n[i];
			o == null ? Gc(r, i, "") : Yc(e, i, !N(t) && t ? t[i] : void 0, o) || Gc(r, i, o);
		}
	} else if (i) {
		if (t !== n) {
			let e = r[Bc];
			e && (n += ";" + e), r.cssText = n, a = Vc.test(n);
		}
	} else t && e.removeAttribute("style");
	Rc in e && (e[Rc] = a ? r.display : "", e[zc] && (r.display = "none"));
}
var Uc = /[^\\];\s*$/, Wc = /\s*!important$/;
function Gc(e, t, n) {
	if (j(n)) n.forEach((n) => Gc(e, t, n));
	else if (n ??= "", process.env.NODE_ENV !== "production" && Uc.test(n) && Dc(`Unexpected semicolon at the end of '${t}' style value: '${n}'`), t.startsWith("--")) e.setProperty(t, n);
	else {
		let r = Jc(e, t);
		Wc.test(n) ? e.setProperty(ft(r), n.replace(Wc, ""), "important") : e[r] = n;
	}
}
var Kc = [
	"Webkit",
	"Moz",
	"ms"
], qc = {};
function Jc(e, t) {
	let n = qc[t];
	if (n) return n;
	let r = ut(t);
	if (r !== "filter" && r in e) return qc[t] = r;
	r = pt(r);
	for (let n = 0; n < Kc.length; n++) {
		let i = Kc[n] + r;
		if (i in e) return qc[t] = i;
	}
	return t;
}
function Yc(e, t, n, r) {
	return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && N(r) && n === r;
}
var Xc = "http://www.w3.org/1999/xlink";
function Zc(e, t, n, r, i, a = Pt(t)) {
	r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Xc, t.slice(6, t.length)) : e.setAttributeNS(Xc, t, n) : n == null || a && !Ft(n) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : $e(n) ? String(n) : n);
}
function Qc(e, t, n, r, i) {
	if (t === "innerHTML" || t === "textContent") {
		n != null && (e[t] = t === "innerHTML" ? Ac(n) : n);
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
		r === "boolean" ? n = Ft(n) : n == null && r === "string" ? (n = "", o = !0) : r === "number" && (n = 0, o = !0);
	}
	try {
		e[t] = n;
	} catch (e) {
		process.env.NODE_ENV !== "production" && !o && Dc(`Failed setting prop "${t}" on <${a.toLowerCase()}>: value ${n} is invalid.`, e);
	}
	o && e.removeAttribute(i || t);
}
function $c(e, t, n, r) {
	e.addEventListener(t, n, r);
}
function el(e, t, n, r) {
	e.removeEventListener(t, n, r);
}
var tl = /* @__PURE__ */ Symbol("_vei");
function nl(e, t, n, r, i = null) {
	let a = e[tl] || (e[tl] = {}), o = a[t];
	if (r && o) o.value = process.env.NODE_ENV === "production" ? r : ll(r, t);
	else {
		let [n, s] = il(t);
		r ? $c(e, n, a[t] = cl(process.env.NODE_ENV === "production" ? r : ll(r, t), i), s) : o && (el(e, n, o, s), a[t] = void 0);
	}
}
var rl = /(?:Once|Passive|Capture)$/;
function il(e) {
	let t;
	if (rl.test(e)) {
		t = {};
		let n;
		for (; n = e.match(rl);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
	}
	return [e[2] === ":" ? e.slice(3) : ft(e.slice(2)), t];
}
var al = 0, ol = /* @__PURE__ */ Promise.resolve(), sl = () => al ||= (ol.then(() => al = 0), Date.now());
function cl(e, t) {
	let n = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= n.attached) return;
		let r = n.value;
		if (j(r)) {
			let n = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				n.call(e), e._stopped = !0;
			};
			let i = r.slice(), a = [e];
			for (let n = 0; n < i.length && !e._stopped; n++) {
				let e = i[n];
				e && Gr(e, t, 5, a);
			}
		} else Gr(r, t, 5, [e]);
	};
	return n.value = e, n.attached = sl(), n;
}
function ll(e, t) {
	return M(e) || j(e) ? e : (Dc(`Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`), O);
}
var ul = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, dl = (e, t, n, r, i, a) => {
	let o = i === "svg";
	t === "class" ? Lc(e, r, o) : t === "style" ? Hc(e, n, r) : Ke(t) ? qe(t) || nl(e, t, n, r, a) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : fl(e, t, r, o)) ? (Qc(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Zc(e, t, r, o, a, t !== "value")) : e._isVueCE && (pl(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !N(r))) ? Qc(e, ut(t), r, a, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), Zc(e, t, r, o));
};
function fl(e, t, n, r) {
	if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && ul(t) && M(n));
	if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
	if (t === "width" || t === "height") {
		let t = e.tagName;
		if (t === "IMG" || t === "VIDEO" || t === "CANVAS" || t === "SOURCE") return !1;
	}
	return ul(t) && N(n) ? !1 : t in e;
}
function pl(e, t) {
	let n = e._def.props;
	if (!n) return !1;
	let r = ut(t);
	return Array.isArray(n) ? n.some((e) => ut(e) === r) : Object.keys(n).some((e) => ut(e) === r);
}
var ml = (e) => {
	let t = e.props["onUpdate:modelValue"] || !1;
	return j(t) ? (e) => gt(t, e) : t;
};
function hl(e) {
	e.target.composing = !0;
}
function gl(e) {
	let t = e.target;
	t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var _l = /* @__PURE__ */ Symbol("_assign");
function vl(e, t, n) {
	return t && (e = e.trim()), n && (e = vt(e)), e;
}
var yl = {
	created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
		e[_l] = ml(i);
		let a = r || i.props && i.props.type === "number";
		$c(e, t ? "change" : "input", (t) => {
			t.target.composing || e[_l](vl(e.value, n, a));
		}), (n || a) && $c(e, "change", () => {
			e.value = vl(e.value, n, a);
		}), t || ($c(e, "compositionstart", hl), $c(e, "compositionend", gl), $c(e, "change", gl));
	},
	mounted(e, { value: t }) {
		e.value = t ?? "";
	},
	beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: a } }, o) {
		if (e[_l] = ml(o), e.composing) return;
		let s = (a || e.type === "number") && !/^0\d/.test(e.value) ? vt(e.value) : e.value, c = t ?? "";
		if (s === c) return;
		let l = e.getRootNode();
		(l instanceof Document || l instanceof ShadowRoot) && l.activeElement === e && e.type !== "range" && (r && t === n || i && e.value.trim() === c) || (e.value = c);
	}
}, bl = {
	deep: !0,
	created(e, t, n) {
		e[_l] = ml(n), $c(e, "change", () => {
			let t = e._modelValue, n = wl(e), r = e.checked, i = e[_l];
			if (j(t)) {
				let e = Rt(t, n), a = e !== -1;
				if (r && !a) i(t.concat(n));
				else if (!r && a) {
					let n = [...t];
					n.splice(e, 1), i(n);
				}
			} else if (Ze(t)) {
				let e = new Set(t);
				r ? e.add(n) : e.delete(n), i(e);
			} else i(Tl(e, r));
		});
	},
	mounted: xl,
	beforeUpdate(e, t, n) {
		e[_l] = ml(n), xl(e, t, n);
	}
};
function xl(e, { value: t, oldValue: n }, r) {
	e._modelValue = t;
	let i;
	if (j(t)) i = Rt(t, r.props.value) > -1;
	else if (Ze(t)) i = t.has(r.props.value);
	else {
		if (t === n) return;
		i = Lt(t, Tl(e, !0));
	}
	e.checked !== i && (e.checked = i);
}
var Sl = {
	deep: !0,
	created(e, { value: t, modifiers: { number: n } }, r) {
		let i = Ze(t);
		$c(e, "change", () => {
			let t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => n ? vt(wl(e)) : wl(e));
			e[_l](e.multiple ? i ? new Set(t) : t : t[0]), e._assigning = !0, ni(() => {
				e._assigning = !1;
			});
		}), e[_l] = ml(r);
	},
	mounted(e, { value: t }) {
		Cl(e, t);
	},
	beforeUpdate(e, t, n) {
		e[_l] = ml(n);
	},
	updated(e, { value: t }) {
		e._assigning || Cl(e, t);
	}
};
function Cl(e, t) {
	let n = e.multiple, r = j(t);
	if (n && !r && !Ze(t)) {
		process.env.NODE_ENV !== "production" && Dc(`<select multiple v-model> expects an Array or Set value for its binding, but got ${Object.prototype.toString.call(t).slice(8, -1)}.`);
		return;
	}
	for (let i = 0, a = e.options.length; i < a; i++) {
		let a = e.options[i], o = wl(a);
		if (n) if (r) {
			let e = typeof o;
			e === "string" || e === "number" ? a.selected = t.some((e) => String(e) === String(o)) : a.selected = Rt(t, o) > -1;
		} else a.selected = t.has(o);
		else if (Lt(wl(a), t)) {
			e.selectedIndex !== i && (e.selectedIndex = i);
			return;
		}
	}
	!n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
}
function wl(e) {
	return "_value" in e ? e._value : e.value;
}
function Tl(e, t) {
	let n = t ? "_trueValue" : "_falseValue";
	return n in e ? e[n] : t;
}
var El = [
	"ctrl",
	"shift",
	"alt",
	"meta"
], Dl = {
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
	exact: (e, t) => El.some((n) => e[`${n}Key`] && !t.includes(n))
}, Ol = (e, t) => {
	if (!e) return e;
	let n = e._withMods ||= {}, r = t.join(".");
	return n[r] || (n[r] = ((n, ...r) => {
		for (let e = 0; e < t.length; e++) {
			let r = Dl[t[e]];
			if (r && r(n, t)) return;
		}
		return e(n, ...r);
	}));
}, kl = /* @__PURE__ */ k({ patchProp: dl }, Fc), Al;
function jl() {
	return Al ||= ss(kl);
}
var Ml = ((...e) => {
	let t = jl().createApp(...e);
	process.env.NODE_ENV !== "production" && (Pl(t), Fl(t));
	let { mount: n } = t;
	return t.mount = (e) => {
		let r = Il(e);
		if (!r) return;
		let i = t._component;
		!M(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
		let a = n(r, !1, Nl(r));
		return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), a;
	}, t;
});
function Nl(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Pl(e) {
	Object.defineProperty(e.config, "isNativeTag", {
		value: (e) => At(e) || jt(e) || Mt(e),
		writable: !1
	});
}
function Fl(e) {
	if (pc()) {
		let t = e.config.isCustomElement;
		Object.defineProperty(e.config, "isCustomElement", {
			get() {
				return t;
			},
			set() {
				Dc("The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead.");
			}
		});
		let n = e.config.compilerOptions, r = "The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka \"full build\"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader's `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc";
		Object.defineProperty(e.config, "compilerOptions", {
			get() {
				return Dc(r), n;
			},
			set() {
				Dc(r);
			}
		});
	}
}
function Il(e) {
	if (N(e)) {
		let t = document.querySelector(e);
		return process.env.NODE_ENV !== "production" && !t && Dc(`Failed to mount app: mount target selector "${e}" returned null.`), t;
	}
	return process.env.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && Dc("mounting on a ShadowRoot with `{mode: \"closed\"}` may lead to unpredictable bugs"), e;
}
//#endregion
//#region node_modules/vue/dist/vue.runtime.esm-bundler.js
function Ll() {
	Tc();
}
process.env.NODE_ENV !== "production" && Ll();
//#endregion
//#region node_modules/@vue/devtools-shared/dist/index.js
var Rl = Object.create, zl = Object.defineProperty, Bl = Object.getOwnPropertyDescriptor, Vl = Object.getOwnPropertyNames, Hl = Object.getPrototypeOf, Ul = Object.prototype.hasOwnProperty, Wl = (e, t) => function() {
	return e && (t = (0, e[Vl(e)[0]])(e = 0)), t;
}, Gl = (e, t) => function() {
	return t || (0, e[Vl(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, Kl = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (let i of Vl(t)) !Ul.call(e, i) && i !== n && zl(e, i, {
		get: () => t[i],
		enumerable: !(r = Bl(t, i)) || r.enumerable
	});
	return e;
}, ql = (e, t, n) => (n = e == null ? {} : Rl(Hl(e)), Kl(t || !e || !e.__esModule ? zl(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), Jl = Wl({ "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {} }), Yl = Gl({ "../../node_modules/.pnpm/rfdc@1.4.1/node_modules/rfdc/index.js"(e, t) {
	Jl(), t.exports = r;
	function n(e) {
		return e instanceof Buffer ? Buffer.from(e) : new e.constructor(e.buffer.slice(), e.byteOffset, e.length);
	}
	function r(e) {
		if (e ||= {}, e.circles) return i(e);
		let t = /* @__PURE__ */ new Map();
		if (t.set(Date, (e) => new Date(e)), t.set(Map, (e, t) => new Map(a(Array.from(e), t))), t.set(Set, (e, t) => new Set(a(Array.from(e), t))), e.constructorHandlers) for (let n of e.constructorHandlers) t.set(n[0], n[1]);
		let r = null;
		return e.proto ? s : o;
		function a(e, i) {
			let a = Object.keys(e), o = Array(a.length);
			for (let s = 0; s < a.length; s++) {
				let c = a[s], l = e[c];
				typeof l != "object" || !l ? o[c] = l : l.constructor !== Object && (r = t.get(l.constructor)) ? o[c] = r(l, i) : ArrayBuffer.isView(l) ? o[c] = n(l) : o[c] = i(l);
			}
			return o;
		}
		function o(e) {
			if (typeof e != "object" || !e) return e;
			if (Array.isArray(e)) return a(e, o);
			if (e.constructor !== Object && (r = t.get(e.constructor))) return r(e, o);
			let i = {};
			for (let a in e) {
				if (Object.hasOwnProperty.call(e, a) === !1) continue;
				let s = e[a];
				typeof s != "object" || !s ? i[a] = s : s.constructor !== Object && (r = t.get(s.constructor)) ? i[a] = r(s, o) : ArrayBuffer.isView(s) ? i[a] = n(s) : i[a] = o(s);
			}
			return i;
		}
		function s(e) {
			if (typeof e != "object" || !e) return e;
			if (Array.isArray(e)) return a(e, s);
			if (e.constructor !== Object && (r = t.get(e.constructor))) return r(e, s);
			let i = {};
			for (let a in e) {
				let o = e[a];
				typeof o != "object" || !o ? i[a] = o : o.constructor !== Object && (r = t.get(o.constructor)) ? i[a] = r(o, s) : ArrayBuffer.isView(o) ? i[a] = n(o) : i[a] = s(o);
			}
			return i;
		}
	}
	function i(e) {
		let t = [], r = [], i = /* @__PURE__ */ new Map();
		if (i.set(Date, (e) => new Date(e)), i.set(Map, (e, t) => new Map(o(Array.from(e), t))), i.set(Set, (e, t) => new Set(o(Array.from(e), t))), e.constructorHandlers) for (let t of e.constructorHandlers) i.set(t[0], t[1]);
		let a = null;
		return e.proto ? c : s;
		function o(e, o) {
			let s = Object.keys(e), c = Array(s.length);
			for (let l = 0; l < s.length; l++) {
				let u = s[l], d = e[u];
				if (typeof d != "object" || !d) c[u] = d;
				else if (d.constructor !== Object && (a = i.get(d.constructor))) c[u] = a(d, o);
				else if (ArrayBuffer.isView(d)) c[u] = n(d);
				else {
					let e = t.indexOf(d);
					e === -1 ? c[u] = o(d) : c[u] = r[e];
				}
			}
			return c;
		}
		function s(e) {
			if (typeof e != "object" || !e) return e;
			if (Array.isArray(e)) return o(e, s);
			if (e.constructor !== Object && (a = i.get(e.constructor))) return a(e, s);
			let c = {};
			t.push(e), r.push(c);
			for (let o in e) {
				if (Object.hasOwnProperty.call(e, o) === !1) continue;
				let l = e[o];
				if (typeof l != "object" || !l) c[o] = l;
				else if (l.constructor !== Object && (a = i.get(l.constructor))) c[o] = a(l, s);
				else if (ArrayBuffer.isView(l)) c[o] = n(l);
				else {
					let e = t.indexOf(l);
					e === -1 ? c[o] = s(l) : c[o] = r[e];
				}
			}
			return t.pop(), r.pop(), c;
		}
		function c(e) {
			if (typeof e != "object" || !e) return e;
			if (Array.isArray(e)) return o(e, c);
			if (e.constructor !== Object && (a = i.get(e.constructor))) return a(e, c);
			let s = {};
			t.push(e), r.push(s);
			for (let o in e) {
				let l = e[o];
				if (typeof l != "object" || !l) s[o] = l;
				else if (l.constructor !== Object && (a = i.get(l.constructor))) s[o] = a(l, c);
				else if (ArrayBuffer.isView(l)) s[o] = n(l);
				else {
					let e = t.indexOf(l);
					e === -1 ? s[o] = c(l) : s[o] = r[e];
				}
			}
			return t.pop(), r.pop(), s;
		}
	}
} });
Jl(), Jl(), Jl();
var Xl = typeof navigator < "u", q = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : {};
q.chrome !== void 0 && q.chrome.devtools, Xl && (q.self, q.top), typeof navigator < "u" && navigator.userAgent?.toLowerCase().includes("electron"), typeof window < "u" && window.__NUXT__, Jl();
var Zl = ql(Yl(), 1), Ql = /(?:^|[-_/])(\w)/g;
function $l(e, t) {
	return t ? t.toUpperCase() : "";
}
function eu(e) {
	return e && `${e}`.replace(Ql, $l);
}
function tu(e, t) {
	let n = e.replace(/^[a-z]:/i, "").replace(/\\/g, "/");
	n.endsWith(`index${t}`) && (n = n.replace(`/index${t}`, t));
	let r = n.lastIndexOf("/"), i = n.substring(r + 1);
	if (t) {
		let e = i.lastIndexOf(t);
		return i.substring(0, e);
	}
	return "";
}
var nu = (0, Zl.default)({ circles: !0 }), ru = { trailing: !0 };
function iu(e, t = 25, n = {}) {
	if (n = {
		...ru,
		...n
	}, !Number.isFinite(t)) throw TypeError("Expected `wait` to be a finite number");
	let r, i, a = [], o, s, c = (t, r) => (o = au(e, t, r), o.finally(() => {
		if (o = null, n.trailing && s && !i) {
			let e = c(t, s);
			return s = null, e;
		}
	}), o);
	return function(...e) {
		return o ? (n.trailing && (s = e), o) : new Promise((o) => {
			let s = !i && n.leading;
			clearTimeout(i), i = setTimeout(() => {
				i = null;
				let t = n.leading ? r : c(this, e);
				for (let e of a) e(t);
				a = [];
			}, t), s ? (r = c(this, e), o(r)) : a.push(o);
		});
	};
}
async function au(e, t, n) {
	return await e.apply(t, n);
}
//#endregion
//#region node_modules/hookable/dist/index.mjs
function ou(e, t = {}, n) {
	for (let r in e) {
		let i = e[r], a = n ? `${n}:${r}` : r;
		typeof i == "object" && i ? ou(i, t, a) : typeof i == "function" && (t[a] = i);
	}
	return t;
}
var su = { run: (e) => e() }, cu = console.createTask === void 0 ? () => su : console.createTask;
function lu(e, t) {
	let n = cu(t.shift());
	return e.reduce((e, r) => e.then(() => n.run(() => r(...t))), Promise.resolve());
}
function uu(e, t) {
	let n = cu(t.shift());
	return Promise.all(e.map((e) => n.run(() => e(...t))));
}
function du(e, t) {
	for (let n of [...e]) n(t);
}
var fu = class {
	constructor() {
		this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
	}
	hook(e, t, n = {}) {
		if (!e || typeof t != "function") return () => {};
		let r = e, i;
		for (; this._deprecatedHooks[e];) i = this._deprecatedHooks[e], e = i.to;
		if (i && !n.allowDeprecated) {
			let e = i.message;
			e ||= `${r} hook has been deprecated` + (i.to ? `, please use ${i.to}` : ""), this._deprecatedMessages ||= /* @__PURE__ */ new Set(), this._deprecatedMessages.has(e) || (console.warn(e), this._deprecatedMessages.add(e));
		}
		if (!t.name) try {
			Object.defineProperty(t, "name", {
				get: () => "_" + e.replace(/\W+/g, "_") + "_hook_cb",
				configurable: !0
			});
		} catch {}
		return this._hooks[e] = this._hooks[e] || [], this._hooks[e].push(t), () => {
			t &&= (this.removeHook(e, t), void 0);
		};
	}
	hookOnce(e, t) {
		let n, r = (...e) => (typeof n == "function" && n(), n = void 0, r = void 0, t(...e));
		return n = this.hook(e, r), n;
	}
	removeHook(e, t) {
		if (this._hooks[e]) {
			let n = this._hooks[e].indexOf(t);
			n !== -1 && this._hooks[e].splice(n, 1), this._hooks[e].length === 0 && delete this._hooks[e];
		}
	}
	deprecateHook(e, t) {
		this._deprecatedHooks[e] = typeof t == "string" ? { to: t } : t;
		let n = this._hooks[e] || [];
		delete this._hooks[e];
		for (let t of n) this.hook(e, t);
	}
	deprecateHooks(e) {
		Object.assign(this._deprecatedHooks, e);
		for (let t in e) this.deprecateHook(t, e[t]);
	}
	addHooks(e) {
		let t = ou(e), n = Object.keys(t).map((e) => this.hook(e, t[e]));
		return () => {
			for (let e of n.splice(0, n.length)) e();
		};
	}
	removeHooks(e) {
		let t = ou(e);
		for (let e in t) this.removeHook(e, t[e]);
	}
	removeAllHooks() {
		for (let e in this._hooks) delete this._hooks[e];
	}
	callHook(e, ...t) {
		return t.unshift(e), this.callHookWith(lu, e, ...t);
	}
	callHookParallel(e, ...t) {
		return t.unshift(e), this.callHookWith(uu, e, ...t);
	}
	callHookWith(e, t, ...n) {
		let r = this._before || this._after ? {
			name: t,
			args: n,
			context: {}
		} : void 0;
		this._before && du(this._before, r);
		let i = e(t in this._hooks ? [...this._hooks[t]] : [], n);
		return i instanceof Promise ? i.finally(() => {
			this._after && r && du(this._after, r);
		}) : (this._after && r && du(this._after, r), i);
	}
	beforeEach(e) {
		return this._before = this._before || [], this._before.push(e), () => {
			if (this._before !== void 0) {
				let t = this._before.indexOf(e);
				t !== -1 && this._before.splice(t, 1);
			}
		};
	}
	afterEach(e) {
		return this._after = this._after || [], this._after.push(e), () => {
			if (this._after !== void 0) {
				let t = this._after.indexOf(e);
				t !== -1 && this._after.splice(t, 1);
			}
		};
	}
};
function pu() {
	return new fu();
}
//#endregion
//#region node_modules/@vue/devtools-kit/dist/index.js
var mu = Object.create, hu = Object.defineProperty, gu = Object.getOwnPropertyDescriptor, _u = Object.getOwnPropertyNames, vu = Object.getPrototypeOf, yu = Object.prototype.hasOwnProperty, bu = (e, t) => function() {
	return e && (t = (0, e[_u(e)[0]])(e = 0)), t;
}, xu = (e, t) => function() {
	return t || (0, e[_u(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, Su = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (let i of _u(t)) !yu.call(e, i) && i !== n && hu(e, i, {
		get: () => t[i],
		enumerable: !(r = gu(t, i)) || r.enumerable
	});
	return e;
}, Cu = (e, t, n) => (n = e == null ? {} : mu(vu(e)), Su(t || !e || !e.__esModule ? hu(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), J = bu({ "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {} }), wu = xu({ "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/lib/speakingurl.js"(e, t) {
	J(), (function(e) {
		var n = {
			À: "A",
			Á: "A",
			Â: "A",
			Ã: "A",
			Ä: "Ae",
			Å: "A",
			Æ: "AE",
			Ç: "C",
			È: "E",
			É: "E",
			Ê: "E",
			Ë: "E",
			Ì: "I",
			Í: "I",
			Î: "I",
			Ï: "I",
			Ð: "D",
			Ñ: "N",
			Ò: "O",
			Ó: "O",
			Ô: "O",
			Õ: "O",
			Ö: "Oe",
			Ő: "O",
			Ø: "O",
			Ù: "U",
			Ú: "U",
			Û: "U",
			Ü: "Ue",
			Ű: "U",
			Ý: "Y",
			Þ: "TH",
			ß: "ss",
			à: "a",
			á: "a",
			â: "a",
			ã: "a",
			ä: "ae",
			å: "a",
			æ: "ae",
			ç: "c",
			è: "e",
			é: "e",
			ê: "e",
			ë: "e",
			ì: "i",
			í: "i",
			î: "i",
			ï: "i",
			ð: "d",
			ñ: "n",
			ò: "o",
			ó: "o",
			ô: "o",
			õ: "o",
			ö: "oe",
			ő: "o",
			ø: "o",
			ù: "u",
			ú: "u",
			û: "u",
			ü: "ue",
			ű: "u",
			ý: "y",
			þ: "th",
			ÿ: "y",
			ẞ: "SS",
			ا: "a",
			أ: "a",
			إ: "i",
			آ: "aa",
			ؤ: "u",
			ئ: "e",
			ء: "a",
			ب: "b",
			ت: "t",
			ث: "th",
			ج: "j",
			ح: "h",
			خ: "kh",
			د: "d",
			ذ: "th",
			ر: "r",
			ز: "z",
			س: "s",
			ش: "sh",
			ص: "s",
			ض: "dh",
			ط: "t",
			ظ: "z",
			ع: "a",
			غ: "gh",
			ف: "f",
			ق: "q",
			ك: "k",
			ل: "l",
			م: "m",
			ن: "n",
			ه: "h",
			و: "w",
			ي: "y",
			ى: "a",
			ة: "h",
			ﻻ: "la",
			ﻷ: "laa",
			ﻹ: "lai",
			ﻵ: "laa",
			گ: "g",
			چ: "ch",
			پ: "p",
			ژ: "zh",
			ک: "k",
			ی: "y",
			"َ": "a",
			"ً": "an",
			"ِ": "e",
			"ٍ": "en",
			"ُ": "u",
			"ٌ": "on",
			"ْ": "",
			"٠": "0",
			"١": "1",
			"٢": "2",
			"٣": "3",
			"٤": "4",
			"٥": "5",
			"٦": "6",
			"٧": "7",
			"٨": "8",
			"٩": "9",
			"۰": "0",
			"۱": "1",
			"۲": "2",
			"۳": "3",
			"۴": "4",
			"۵": "5",
			"۶": "6",
			"۷": "7",
			"۸": "8",
			"۹": "9",
			က: "k",
			ခ: "kh",
			ဂ: "g",
			ဃ: "ga",
			င: "ng",
			စ: "s",
			ဆ: "sa",
			ဇ: "z",
			စျ: "za",
			ည: "ny",
			ဋ: "t",
			ဌ: "ta",
			ဍ: "d",
			ဎ: "da",
			ဏ: "na",
			တ: "t",
			ထ: "ta",
			ဒ: "d",
			ဓ: "da",
			န: "n",
			ပ: "p",
			ဖ: "pa",
			ဗ: "b",
			ဘ: "ba",
			မ: "m",
			ယ: "y",
			ရ: "ya",
			လ: "l",
			ဝ: "w",
			သ: "th",
			ဟ: "h",
			ဠ: "la",
			အ: "a",
			"ြ": "y",
			"ျ": "ya",
			"ွ": "w",
			"ြွ": "yw",
			"ျွ": "ywa",
			"ှ": "h",
			ဧ: "e",
			"၏": "-e",
			ဣ: "i",
			ဤ: "-i",
			ဉ: "u",
			ဦ: "-u",
			ဩ: "aw",
			သြော: "aw",
			ဪ: "aw",
			"၀": "0",
			"၁": "1",
			"၂": "2",
			"၃": "3",
			"၄": "4",
			"၅": "5",
			"၆": "6",
			"၇": "7",
			"၈": "8",
			"၉": "9",
			"္": "",
			"့": "",
			"း": "",
			č: "c",
			ď: "d",
			ě: "e",
			ň: "n",
			ř: "r",
			š: "s",
			ť: "t",
			ů: "u",
			ž: "z",
			Č: "C",
			Ď: "D",
			Ě: "E",
			Ň: "N",
			Ř: "R",
			Š: "S",
			Ť: "T",
			Ů: "U",
			Ž: "Z",
			ހ: "h",
			ށ: "sh",
			ނ: "n",
			ރ: "r",
			ބ: "b",
			ޅ: "lh",
			ކ: "k",
			އ: "a",
			ވ: "v",
			މ: "m",
			ފ: "f",
			ދ: "dh",
			ތ: "th",
			ލ: "l",
			ގ: "g",
			ޏ: "gn",
			ސ: "s",
			ޑ: "d",
			ޒ: "z",
			ޓ: "t",
			ޔ: "y",
			ޕ: "p",
			ޖ: "j",
			ޗ: "ch",
			ޘ: "tt",
			ޙ: "hh",
			ޚ: "kh",
			ޛ: "th",
			ޜ: "z",
			ޝ: "sh",
			ޞ: "s",
			ޟ: "d",
			ޠ: "t",
			ޡ: "z",
			ޢ: "a",
			ޣ: "gh",
			ޤ: "q",
			ޥ: "w",
			"ަ": "a",
			"ާ": "aa",
			"ި": "i",
			"ީ": "ee",
			"ު": "u",
			"ޫ": "oo",
			"ެ": "e",
			"ޭ": "ey",
			"ޮ": "o",
			"ޯ": "oa",
			"ް": "",
			ა: "a",
			ბ: "b",
			გ: "g",
			დ: "d",
			ე: "e",
			ვ: "v",
			ზ: "z",
			თ: "t",
			ი: "i",
			კ: "k",
			ლ: "l",
			მ: "m",
			ნ: "n",
			ო: "o",
			პ: "p",
			ჟ: "zh",
			რ: "r",
			ს: "s",
			ტ: "t",
			უ: "u",
			ფ: "p",
			ქ: "k",
			ღ: "gh",
			ყ: "q",
			შ: "sh",
			ჩ: "ch",
			ც: "ts",
			ძ: "dz",
			წ: "ts",
			ჭ: "ch",
			ხ: "kh",
			ჯ: "j",
			ჰ: "h",
			α: "a",
			β: "v",
			γ: "g",
			δ: "d",
			ε: "e",
			ζ: "z",
			η: "i",
			θ: "th",
			ι: "i",
			κ: "k",
			λ: "l",
			μ: "m",
			ν: "n",
			ξ: "ks",
			ο: "o",
			π: "p",
			ρ: "r",
			σ: "s",
			τ: "t",
			υ: "y",
			φ: "f",
			χ: "x",
			ψ: "ps",
			ω: "o",
			ά: "a",
			έ: "e",
			ί: "i",
			ό: "o",
			ύ: "y",
			ή: "i",
			ώ: "o",
			ς: "s",
			ϊ: "i",
			ΰ: "y",
			ϋ: "y",
			ΐ: "i",
			Α: "A",
			Β: "B",
			Γ: "G",
			Δ: "D",
			Ε: "E",
			Ζ: "Z",
			Η: "I",
			Θ: "TH",
			Ι: "I",
			Κ: "K",
			Λ: "L",
			Μ: "M",
			Ν: "N",
			Ξ: "KS",
			Ο: "O",
			Π: "P",
			Ρ: "R",
			Σ: "S",
			Τ: "T",
			Υ: "Y",
			Φ: "F",
			Χ: "X",
			Ψ: "PS",
			Ω: "O",
			Ά: "A",
			Έ: "E",
			Ί: "I",
			Ό: "O",
			Ύ: "Y",
			Ή: "I",
			Ώ: "O",
			Ϊ: "I",
			Ϋ: "Y",
			ā: "a",
			ē: "e",
			ģ: "g",
			ī: "i",
			ķ: "k",
			ļ: "l",
			ņ: "n",
			ū: "u",
			Ā: "A",
			Ē: "E",
			Ģ: "G",
			Ī: "I",
			Ķ: "k",
			Ļ: "L",
			Ņ: "N",
			Ū: "U",
			Ќ: "Kj",
			ќ: "kj",
			Љ: "Lj",
			љ: "lj",
			Њ: "Nj",
			њ: "nj",
			Тс: "Ts",
			тс: "ts",
			ą: "a",
			ć: "c",
			ę: "e",
			ł: "l",
			ń: "n",
			ś: "s",
			ź: "z",
			ż: "z",
			Ą: "A",
			Ć: "C",
			Ę: "E",
			Ł: "L",
			Ń: "N",
			Ś: "S",
			Ź: "Z",
			Ż: "Z",
			Є: "Ye",
			І: "I",
			Ї: "Yi",
			Ґ: "G",
			є: "ye",
			і: "i",
			ї: "yi",
			ґ: "g",
			ă: "a",
			Ă: "A",
			ș: "s",
			Ș: "S",
			ț: "t",
			Ț: "T",
			ţ: "t",
			Ţ: "T",
			а: "a",
			б: "b",
			в: "v",
			г: "g",
			д: "d",
			е: "e",
			ё: "yo",
			ж: "zh",
			з: "z",
			и: "i",
			й: "i",
			к: "k",
			л: "l",
			м: "m",
			н: "n",
			о: "o",
			п: "p",
			р: "r",
			с: "s",
			т: "t",
			у: "u",
			ф: "f",
			х: "kh",
			ц: "c",
			ч: "ch",
			ш: "sh",
			щ: "sh",
			ъ: "",
			ы: "y",
			ь: "",
			э: "e",
			ю: "yu",
			я: "ya",
			А: "A",
			Б: "B",
			В: "V",
			Г: "G",
			Д: "D",
			Е: "E",
			Ё: "Yo",
			Ж: "Zh",
			З: "Z",
			И: "I",
			Й: "I",
			К: "K",
			Л: "L",
			М: "M",
			Н: "N",
			О: "O",
			П: "P",
			Р: "R",
			С: "S",
			Т: "T",
			У: "U",
			Ф: "F",
			Х: "Kh",
			Ц: "C",
			Ч: "Ch",
			Ш: "Sh",
			Щ: "Sh",
			Ъ: "",
			Ы: "Y",
			Ь: "",
			Э: "E",
			Ю: "Yu",
			Я: "Ya",
			ђ: "dj",
			ј: "j",
			ћ: "c",
			џ: "dz",
			Ђ: "Dj",
			Ј: "j",
			Ћ: "C",
			Џ: "Dz",
			ľ: "l",
			ĺ: "l",
			ŕ: "r",
			Ľ: "L",
			Ĺ: "L",
			Ŕ: "R",
			ş: "s",
			Ş: "S",
			ı: "i",
			İ: "I",
			ğ: "g",
			Ğ: "G",
			ả: "a",
			Ả: "A",
			ẳ: "a",
			Ẳ: "A",
			ẩ: "a",
			Ẩ: "A",
			đ: "d",
			Đ: "D",
			ẹ: "e",
			Ẹ: "E",
			ẽ: "e",
			Ẽ: "E",
			ẻ: "e",
			Ẻ: "E",
			ế: "e",
			Ế: "E",
			ề: "e",
			Ề: "E",
			ệ: "e",
			Ệ: "E",
			ễ: "e",
			Ễ: "E",
			ể: "e",
			Ể: "E",
			ỏ: "o",
			ọ: "o",
			Ọ: "o",
			ố: "o",
			Ố: "O",
			ồ: "o",
			Ồ: "O",
			ổ: "o",
			Ổ: "O",
			ộ: "o",
			Ộ: "O",
			ỗ: "o",
			Ỗ: "O",
			ơ: "o",
			Ơ: "O",
			ớ: "o",
			Ớ: "O",
			ờ: "o",
			Ờ: "O",
			ợ: "o",
			Ợ: "O",
			ỡ: "o",
			Ỡ: "O",
			Ở: "o",
			ở: "o",
			ị: "i",
			Ị: "I",
			ĩ: "i",
			Ĩ: "I",
			ỉ: "i",
			Ỉ: "i",
			ủ: "u",
			Ủ: "U",
			ụ: "u",
			Ụ: "U",
			ũ: "u",
			Ũ: "U",
			ư: "u",
			Ư: "U",
			ứ: "u",
			Ứ: "U",
			ừ: "u",
			Ừ: "U",
			ự: "u",
			Ự: "U",
			ữ: "u",
			Ữ: "U",
			ử: "u",
			Ử: "ư",
			ỷ: "y",
			Ỷ: "y",
			ỳ: "y",
			Ỳ: "Y",
			ỵ: "y",
			Ỵ: "Y",
			ỹ: "y",
			Ỹ: "Y",
			ạ: "a",
			Ạ: "A",
			ấ: "a",
			Ấ: "A",
			ầ: "a",
			Ầ: "A",
			ậ: "a",
			Ậ: "A",
			ẫ: "a",
			Ẫ: "A",
			ắ: "a",
			Ắ: "A",
			ằ: "a",
			Ằ: "A",
			ặ: "a",
			Ặ: "A",
			ẵ: "a",
			Ẵ: "A",
			"⓪": "0",
			"①": "1",
			"②": "2",
			"③": "3",
			"④": "4",
			"⑤": "5",
			"⑥": "6",
			"⑦": "7",
			"⑧": "8",
			"⑨": "9",
			"⑩": "10",
			"⑪": "11",
			"⑫": "12",
			"⑬": "13",
			"⑭": "14",
			"⑮": "15",
			"⑯": "16",
			"⑰": "17",
			"⑱": "18",
			"⑲": "18",
			"⑳": "18",
			"⓵": "1",
			"⓶": "2",
			"⓷": "3",
			"⓸": "4",
			"⓹": "5",
			"⓺": "6",
			"⓻": "7",
			"⓼": "8",
			"⓽": "9",
			"⓾": "10",
			"⓿": "0",
			"⓫": "11",
			"⓬": "12",
			"⓭": "13",
			"⓮": "14",
			"⓯": "15",
			"⓰": "16",
			"⓱": "17",
			"⓲": "18",
			"⓳": "19",
			"⓴": "20",
			"Ⓐ": "A",
			"Ⓑ": "B",
			"Ⓒ": "C",
			"Ⓓ": "D",
			"Ⓔ": "E",
			"Ⓕ": "F",
			"Ⓖ": "G",
			"Ⓗ": "H",
			"Ⓘ": "I",
			"Ⓙ": "J",
			"Ⓚ": "K",
			"Ⓛ": "L",
			"Ⓜ": "M",
			"Ⓝ": "N",
			"Ⓞ": "O",
			"Ⓟ": "P",
			"Ⓠ": "Q",
			"Ⓡ": "R",
			"Ⓢ": "S",
			"Ⓣ": "T",
			"Ⓤ": "U",
			"Ⓥ": "V",
			"Ⓦ": "W",
			"Ⓧ": "X",
			"Ⓨ": "Y",
			"Ⓩ": "Z",
			"ⓐ": "a",
			"ⓑ": "b",
			"ⓒ": "c",
			"ⓓ": "d",
			"ⓔ": "e",
			"ⓕ": "f",
			"ⓖ": "g",
			"ⓗ": "h",
			"ⓘ": "i",
			"ⓙ": "j",
			"ⓚ": "k",
			"ⓛ": "l",
			"ⓜ": "m",
			"ⓝ": "n",
			"ⓞ": "o",
			"ⓟ": "p",
			"ⓠ": "q",
			"ⓡ": "r",
			"ⓢ": "s",
			"ⓣ": "t",
			"ⓤ": "u",
			"ⓦ": "v",
			"ⓥ": "w",
			"ⓧ": "x",
			"ⓨ": "y",
			"ⓩ": "z",
			"“": "\"",
			"”": "\"",
			"‘": "'",
			"’": "'",
			"∂": "d",
			ƒ: "f",
			"™": "(TM)",
			"©": "(C)",
			œ: "oe",
			Œ: "OE",
			"®": "(R)",
			"†": "+",
			"℠": "(SM)",
			"…": "...",
			"˚": "o",
			º: "o",
			ª: "a",
			"•": "*",
			"၊": ",",
			"။": ".",
			$: "USD",
			"€": "EUR",
			"₢": "BRN",
			"₣": "FRF",
			"£": "GBP",
			"₤": "ITL",
			"₦": "NGN",
			"₧": "ESP",
			"₩": "KRW",
			"₪": "ILS",
			"₫": "VND",
			"₭": "LAK",
			"₮": "MNT",
			"₯": "GRD",
			"₱": "ARS",
			"₲": "PYG",
			"₳": "ARA",
			"₴": "UAH",
			"₵": "GHS",
			"¢": "cent",
			"¥": "CNY",
			元: "CNY",
			円: "YEN",
			"﷼": "IRR",
			"₠": "EWE",
			"฿": "THB",
			"₨": "INR",
			"₹": "INR",
			"₰": "PF",
			"₺": "TRY",
			"؋": "AFN",
			"₼": "AZN",
			лв: "BGN",
			"៛": "KHR",
			"₡": "CRC",
			"₸": "KZT",
			ден: "MKD",
			zł: "PLN",
			"₽": "RUB",
			"₾": "GEL"
		}, r = ["်", "ް"], i = {
			"ာ": "a",
			"ါ": "a",
			"ေ": "e",
			"ဲ": "e",
			"ိ": "i",
			"ီ": "i",
			"ို": "o",
			"ု": "u",
			"ူ": "u",
			"ေါင်": "aung",
			"ော": "aw",
			"ော်": "aw",
			"ေါ": "aw",
			"ေါ်": "aw",
			"်": "်",
			က်: "et",
			"ိုက်": "aik",
			"ောက်": "auk",
			င်: "in",
			"ိုင်": "aing",
			"ောင်": "aung",
			စ်: "it",
			ည်: "i",
			တ်: "at",
			"ိတ်": "eik",
			"ုတ်": "ok",
			"ွတ်": "ut",
			"ေတ်": "it",
			ဒ်: "d",
			"ိုဒ်": "ok",
			"ုဒ်": "ait",
			န်: "an",
			"ာန်": "an",
			"ိန်": "ein",
			"ုန်": "on",
			"ွန်": "un",
			ပ်: "at",
			"ိပ်": "eik",
			"ုပ်": "ok",
			"ွပ်": "ut",
			န်ုပ်: "nub",
			မ်: "an",
			"ိမ်": "ein",
			"ုမ်": "on",
			"ွမ်": "un",
			ယ်: "e",
			"ိုလ်": "ol",
			ဉ်: "in",
			"ံ": "an",
			"ိံ": "ein",
			"ုံ": "on",
			"ައް": "ah",
			"ަށް": "ah"
		}, a = {
			en: {},
			az: {
				ç: "c",
				ə: "e",
				ğ: "g",
				ı: "i",
				ö: "o",
				ş: "s",
				ü: "u",
				Ç: "C",
				Ə: "E",
				Ğ: "G",
				İ: "I",
				Ö: "O",
				Ş: "S",
				Ü: "U"
			},
			cs: {
				č: "c",
				ď: "d",
				ě: "e",
				ň: "n",
				ř: "r",
				š: "s",
				ť: "t",
				ů: "u",
				ž: "z",
				Č: "C",
				Ď: "D",
				Ě: "E",
				Ň: "N",
				Ř: "R",
				Š: "S",
				Ť: "T",
				Ů: "U",
				Ž: "Z"
			},
			fi: {
				ä: "a",
				Ä: "A",
				ö: "o",
				Ö: "O"
			},
			hu: {
				ä: "a",
				Ä: "A",
				ö: "o",
				Ö: "O",
				ü: "u",
				Ü: "U",
				ű: "u",
				Ű: "U"
			},
			lt: {
				ą: "a",
				č: "c",
				ę: "e",
				ė: "e",
				į: "i",
				š: "s",
				ų: "u",
				ū: "u",
				ž: "z",
				Ą: "A",
				Č: "C",
				Ę: "E",
				Ė: "E",
				Į: "I",
				Š: "S",
				Ų: "U",
				Ū: "U"
			},
			lv: {
				ā: "a",
				č: "c",
				ē: "e",
				ģ: "g",
				ī: "i",
				ķ: "k",
				ļ: "l",
				ņ: "n",
				š: "s",
				ū: "u",
				ž: "z",
				Ā: "A",
				Č: "C",
				Ē: "E",
				Ģ: "G",
				Ī: "i",
				Ķ: "k",
				Ļ: "L",
				Ņ: "N",
				Š: "S",
				Ū: "u",
				Ž: "Z"
			},
			pl: {
				ą: "a",
				ć: "c",
				ę: "e",
				ł: "l",
				ń: "n",
				ó: "o",
				ś: "s",
				ź: "z",
				ż: "z",
				Ą: "A",
				Ć: "C",
				Ę: "e",
				Ł: "L",
				Ń: "N",
				Ó: "O",
				Ś: "S",
				Ź: "Z",
				Ż: "Z"
			},
			sv: {
				ä: "a",
				Ä: "A",
				ö: "o",
				Ö: "O"
			},
			sk: {
				ä: "a",
				Ä: "A"
			},
			sr: {
				љ: "lj",
				њ: "nj",
				Љ: "Lj",
				Њ: "Nj",
				đ: "dj",
				Đ: "Dj"
			},
			tr: {
				Ü: "U",
				Ö: "O",
				ü: "u",
				ö: "o"
			}
		}, o = {
			ar: {
				"∆": "delta",
				"∞": "la-nihaya",
				"♥": "hob",
				"&": "wa",
				"|": "aw",
				"<": "aqal-men",
				">": "akbar-men",
				"∑": "majmou",
				"¤": "omla"
			},
			az: {},
			ca: {
				"∆": "delta",
				"∞": "infinit",
				"♥": "amor",
				"&": "i",
				"|": "o",
				"<": "menys que",
				">": "mes que",
				"∑": "suma dels",
				"¤": "moneda"
			},
			cs: {
				"∆": "delta",
				"∞": "nekonecno",
				"♥": "laska",
				"&": "a",
				"|": "nebo",
				"<": "mensi nez",
				">": "vetsi nez",
				"∑": "soucet",
				"¤": "mena"
			},
			de: {
				"∆": "delta",
				"∞": "unendlich",
				"♥": "Liebe",
				"&": "und",
				"|": "oder",
				"<": "kleiner als",
				">": "groesser als",
				"∑": "Summe von",
				"¤": "Waehrung"
			},
			dv: {
				"∆": "delta",
				"∞": "kolunulaa",
				"♥": "loabi",
				"&": "aai",
				"|": "noonee",
				"<": "ah vure kuda",
				">": "ah vure bodu",
				"∑": "jumula",
				"¤": "faisaa"
			},
			en: {
				"∆": "delta",
				"∞": "infinity",
				"♥": "love",
				"&": "and",
				"|": "or",
				"<": "less than",
				">": "greater than",
				"∑": "sum",
				"¤": "currency"
			},
			es: {
				"∆": "delta",
				"∞": "infinito",
				"♥": "amor",
				"&": "y",
				"|": "u",
				"<": "menos que",
				">": "mas que",
				"∑": "suma de los",
				"¤": "moneda"
			},
			fa: {
				"∆": "delta",
				"∞": "bi-nahayat",
				"♥": "eshgh",
				"&": "va",
				"|": "ya",
				"<": "kamtar-az",
				">": "bishtar-az",
				"∑": "majmooe",
				"¤": "vahed"
			},
			fi: {
				"∆": "delta",
				"∞": "aarettomyys",
				"♥": "rakkaus",
				"&": "ja",
				"|": "tai",
				"<": "pienempi kuin",
				">": "suurempi kuin",
				"∑": "summa",
				"¤": "valuutta"
			},
			fr: {
				"∆": "delta",
				"∞": "infiniment",
				"♥": "Amour",
				"&": "et",
				"|": "ou",
				"<": "moins que",
				">": "superieure a",
				"∑": "somme des",
				"¤": "monnaie"
			},
			ge: {
				"∆": "delta",
				"∞": "usasruloba",
				"♥": "siqvaruli",
				"&": "da",
				"|": "an",
				"<": "naklebi",
				">": "meti",
				"∑": "jami",
				"¤": "valuta"
			},
			gr: {},
			hu: {
				"∆": "delta",
				"∞": "vegtelen",
				"♥": "szerelem",
				"&": "es",
				"|": "vagy",
				"<": "kisebb mint",
				">": "nagyobb mint",
				"∑": "szumma",
				"¤": "penznem"
			},
			it: {
				"∆": "delta",
				"∞": "infinito",
				"♥": "amore",
				"&": "e",
				"|": "o",
				"<": "minore di",
				">": "maggiore di",
				"∑": "somma",
				"¤": "moneta"
			},
			lt: {
				"∆": "delta",
				"∞": "begalybe",
				"♥": "meile",
				"&": "ir",
				"|": "ar",
				"<": "maziau nei",
				">": "daugiau nei",
				"∑": "suma",
				"¤": "valiuta"
			},
			lv: {
				"∆": "delta",
				"∞": "bezgaliba",
				"♥": "milestiba",
				"&": "un",
				"|": "vai",
				"<": "mazak neka",
				">": "lielaks neka",
				"∑": "summa",
				"¤": "valuta"
			},
			my: {
				"∆": "kwahkhyaet",
				"∞": "asaonasme",
				"♥": "akhyait",
				"&": "nhin",
				"|": "tho",
				"<": "ngethaw",
				">": "kyithaw",
				"∑": "paungld",
				"¤": "ngwekye"
			},
			mk: {},
			nl: {
				"∆": "delta",
				"∞": "oneindig",
				"♥": "liefde",
				"&": "en",
				"|": "of",
				"<": "kleiner dan",
				">": "groter dan",
				"∑": "som",
				"¤": "valuta"
			},
			pl: {
				"∆": "delta",
				"∞": "nieskonczonosc",
				"♥": "milosc",
				"&": "i",
				"|": "lub",
				"<": "mniejsze niz",
				">": "wieksze niz",
				"∑": "suma",
				"¤": "waluta"
			},
			pt: {
				"∆": "delta",
				"∞": "infinito",
				"♥": "amor",
				"&": "e",
				"|": "ou",
				"<": "menor que",
				">": "maior que",
				"∑": "soma",
				"¤": "moeda"
			},
			ro: {
				"∆": "delta",
				"∞": "infinit",
				"♥": "dragoste",
				"&": "si",
				"|": "sau",
				"<": "mai mic ca",
				">": "mai mare ca",
				"∑": "suma",
				"¤": "valuta"
			},
			ru: {
				"∆": "delta",
				"∞": "beskonechno",
				"♥": "lubov",
				"&": "i",
				"|": "ili",
				"<": "menshe",
				">": "bolshe",
				"∑": "summa",
				"¤": "valjuta"
			},
			sk: {
				"∆": "delta",
				"∞": "nekonecno",
				"♥": "laska",
				"&": "a",
				"|": "alebo",
				"<": "menej ako",
				">": "viac ako",
				"∑": "sucet",
				"¤": "mena"
			},
			sr: {},
			tr: {
				"∆": "delta",
				"∞": "sonsuzluk",
				"♥": "ask",
				"&": "ve",
				"|": "veya",
				"<": "kucuktur",
				">": "buyuktur",
				"∑": "toplam",
				"¤": "para birimi"
			},
			uk: {
				"∆": "delta",
				"∞": "bezkinechnist",
				"♥": "lubov",
				"&": "i",
				"|": "abo",
				"<": "menshe",
				">": "bilshe",
				"∑": "suma",
				"¤": "valjuta"
			},
			vn: {
				"∆": "delta",
				"∞": "vo cuc",
				"♥": "yeu",
				"&": "va",
				"|": "hoac",
				"<": "nho hon",
				">": "lon hon",
				"∑": "tong",
				"¤": "tien te"
			}
		}, s = [
			";",
			"?",
			":",
			"@",
			"&",
			"=",
			"+",
			"$",
			",",
			"/"
		].join(""), c = [
			";",
			"?",
			":",
			"@",
			"&",
			"=",
			"+",
			"$",
			","
		].join(""), l = [
			".",
			"!",
			"~",
			"*",
			"'",
			"(",
			")"
		].join(""), u = function(e, t) {
			var u = "-", d = "", m = "", h = !0, g = {}, _, v, y, b, x, ee, S, C, te, ne, w, re, T, ie, E = "";
			if (typeof e != "string") return "";
			if (typeof t == "string" && (u = t), S = o.en, C = a.en, typeof t == "object") for (w in _ = t.maintainCase || !1, g = t.custom && typeof t.custom == "object" ? t.custom : g, y = +t.truncate > 1 && t.truncate || !1, b = t.uric || !1, x = t.uricNoSlash || !1, ee = t.mark || !1, h = !(t.symbols === !1 || t.lang === !1), u = t.separator || u, b && (E += s), x && (E += c), ee && (E += l), S = t.lang && o[t.lang] && h ? o[t.lang] : h ? o.en : {}, C = t.lang && a[t.lang] ? a[t.lang] : t.lang === !1 || t.lang === !0 ? {} : a.en, t.titleCase && typeof t.titleCase.length == "number" && Array.prototype.toString.call(t.titleCase) ? (t.titleCase.forEach(function(e) {
				g[e + ""] = e + "";
			}), v = !0) : v = !!t.titleCase, t.custom && typeof t.custom.length == "number" && Array.prototype.toString.call(t.custom) && t.custom.forEach(function(e) {
				g[e + ""] = e + "";
			}), Object.keys(g).forEach(function(t) {
				var n = t.length > 1 ? RegExp("\\b" + f(t) + "\\b", "gi") : new RegExp(f(t), "gi");
				e = e.replace(n, g[t]);
			}), g) E += w;
			for (E += u, E = f(E), e = e.replace(/(^\s+|\s+$)/g, ""), T = !1, ie = !1, ne = 0, re = e.length; ne < re; ne++) w = e[ne], p(w, g) ? T = !1 : C[w] ? (w = T && C[w].match(/[A-Za-z0-9]/) ? " " + C[w] : C[w], T = !1) : w in n ? (ne + 1 < re && r.indexOf(e[ne + 1]) >= 0 ? (m += w, w = "") : ie === !0 ? (w = i[m] + n[w], m = "") : w = T && n[w].match(/[A-Za-z0-9]/) ? " " + n[w] : n[w], T = !1, ie = !1) : w in i ? (m += w, w = "", ne === re - 1 && (w = i[m]), ie = !0) : S[w] && !(b && s.indexOf(w) !== -1) && !(x && c.indexOf(w) !== -1) ? (w = T || d.substr(-1).match(/[A-Za-z0-9]/) ? u + S[w] : S[w], w += e[ne + 1] !== void 0 && e[ne + 1].match(/[A-Za-z0-9]/) ? u : "", T = !0) : (ie === !0 ? (w = i[m] + w, m = "", ie = !1) : T && (/[A-Za-z0-9]/.test(w) || d.substr(-1).match(/A-Za-z0-9]/)) && (w = " " + w), T = !1), d += w.replace(RegExp("[^\\w\\s" + E + "_-]", "g"), u);
			return v && (d = d.replace(/(\w)(\S*)/g, function(e, t, n) {
				var r = t.toUpperCase() + (n === null ? "" : n);
				return Object.keys(g).indexOf(r.toLowerCase()) < 0 ? r : r.toLowerCase();
			})), d = d.replace(/\s+/g, u).replace(RegExp("\\" + u + "+", "g"), u).replace(RegExp("(^\\" + u + "+|\\" + u + "+$)", "g"), ""), y && d.length > y && (te = d.charAt(y) === u, d = d.slice(0, y), te || (d = d.slice(0, d.lastIndexOf(u)))), !_ && !v && (d = d.toLowerCase()), d;
		}, d = function(e) {
			return function(t) {
				return u(t, e);
			};
		}, f = function(e) {
			return e.replace(/[-\\^$*+?.()|[\]{}\/]/g, "\\$&");
		}, p = function(e, t) {
			for (var n in t) if (t[n] === e) return !0;
		};
		if (t !== void 0 && t.exports) t.exports = u, t.exports.createSlug = d;
		else if (typeof define < "u" && define.amd) define([], function() {
			return u;
		});
		else try {
			if (e.getSlug || e.createSlug) throw "speakingurl: globals exists /(getSlug|createSlug)/";
			e.getSlug = u, e.createSlug = d;
		} catch {}
	})(e);
} }), Tu = xu({ "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/index.js"(e, t) {
	J(), t.exports = wu();
} });
J(), J(), J(), J(), J(), J(), J(), J();
function Eu(e) {
	let t = e.name || e._componentTag || e.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ || e.__name;
	return t === "index" && e.__file?.endsWith("index.vue") ? "" : t;
}
function Du(e) {
	let t = e.__file;
	if (t) return eu(tu(t, ".vue"));
}
function Ou(e, t) {
	return e.type.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ = t, t;
}
function ku(e) {
	if (e.__VUE_DEVTOOLS_NEXT_APP_RECORD__) return e.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
	if (e.root) return e.appContext.app.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
}
function Au(e) {
	let t = e.subTree?.type, n = ku(e);
	return n ? n?.types?.Fragment === t : !1;
}
function ju(e) {
	let t = Eu(e?.type || {});
	if (t) return t;
	if (e?.root === e) return "Root";
	for (let t in e.parent?.type?.components) if (e.parent.type.components[t] === e?.type) return Ou(e, t);
	for (let t in e.appContext?.components) if (e.appContext.components[t] === e?.type) return Ou(e, t);
	return Du(e?.type || {}) || "Anonymous Component";
}
function Mu(e) {
	return `${e?.appContext?.app?.__VUE_DEVTOOLS_NEXT_APP_RECORD_ID__ ?? 0}:${e === e?.root ? "root" : e.uid}`;
}
function Nu(e, t) {
	return t ||= `${e.id}:root`, e.instanceMap.get(t) || e.instanceMap.get(":root");
}
function Pu() {
	let e = {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		get width() {
			return e.right - e.left;
		},
		get height() {
			return e.bottom - e.top;
		}
	};
	return e;
}
var Fu;
function Iu(e) {
	return Fu ||= document.createRange(), Fu.selectNode(e), Fu.getBoundingClientRect();
}
function Lu(e) {
	let t = Pu();
	if (!e.children) return t;
	for (let n = 0, r = e.children.length; n < r; n++) {
		let r = e.children[n], i;
		if (r.component) i = Bu(r.component);
		else if (r.el) {
			let e = r.el;
			e.nodeType === 1 || e.getBoundingClientRect ? i = e.getBoundingClientRect() : e.nodeType === 3 && e.data.trim() && (i = Iu(e));
		}
		i && Ru(t, i);
	}
	return t;
}
function Ru(e, t) {
	return (!e.top || t.top < e.top) && (e.top = t.top), (!e.bottom || t.bottom > e.bottom) && (e.bottom = t.bottom), (!e.left || t.left < e.left) && (e.left = t.left), (!e.right || t.right > e.right) && (e.right = t.right), e;
}
var zu = {
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	width: 0,
	height: 0
};
function Bu(e) {
	let t = e.subTree.el;
	return typeof window > "u" ? zu : Au(e) ? Lu(e.subTree) : t?.nodeType === 1 ? t?.getBoundingClientRect() : e.subTree.component ? Bu(e.subTree.component) : zu;
}
J();
function Vu(e) {
	return Au(e) ? Hu(e.subTree) : e.subTree ? [e.subTree.el] : [];
}
function Hu(e) {
	if (!e.children) return [];
	let t = [];
	return e.children.forEach((e) => {
		e.component ? t.push(...Vu(e.component)) : e?.el && t.push(e.el);
	}), t;
}
var Uu = "__vue-devtools-component-inspector__", Wu = "__vue-devtools-component-inspector__card__", Gu = "__vue-devtools-component-inspector__name__", Ku = "__vue-devtools-component-inspector__indicator__", qu = {
	display: "block",
	zIndex: 2147483640,
	position: "fixed",
	backgroundColor: "#42b88325",
	border: "1px solid #42b88350",
	borderRadius: "5px",
	transition: "all 0.1s ease-in",
	pointerEvents: "none"
}, Ju = {
	fontFamily: "Arial, Helvetica, sans-serif",
	padding: "5px 8px",
	borderRadius: "4px",
	textAlign: "left",
	position: "absolute",
	left: 0,
	color: "#e9e9e9",
	fontSize: "14px",
	fontWeight: 600,
	lineHeight: "24px",
	backgroundColor: "#42b883",
	boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
}, Yu = {
	display: "inline-block",
	fontWeight: 400,
	fontStyle: "normal",
	fontSize: "12px",
	opacity: .7
};
function Xu() {
	return document.getElementById(Uu);
}
function Zu() {
	return document.getElementById(Wu);
}
function Qu() {
	return document.getElementById(Ku);
}
function $u() {
	return document.getElementById(Gu);
}
function ed(e) {
	return {
		left: `${Math.round(e.left * 100) / 100}px`,
		top: `${Math.round(e.top * 100) / 100}px`,
		width: `${Math.round(e.width * 100) / 100}px`,
		height: `${Math.round(e.height * 100) / 100}px`
	};
}
function td(e) {
	let t = document.createElement("div");
	t.id = e.elementId ?? Uu, Object.assign(t.style, {
		...qu,
		...ed(e.bounds),
		...e.style
	});
	let n = document.createElement("span");
	n.id = Wu, Object.assign(n.style, {
		...Ju,
		top: e.bounds.top < 35 ? 0 : "-35px"
	});
	let r = document.createElement("span");
	r.id = Gu, r.innerHTML = `&lt;${e.name}&gt;&nbsp;&nbsp;`;
	let i = document.createElement("i");
	return i.id = Ku, i.innerHTML = `${Math.round(e.bounds.width * 100) / 100} x ${Math.round(e.bounds.height * 100) / 100}`, Object.assign(i.style, Yu), n.appendChild(r), n.appendChild(i), t.appendChild(n), document.body.appendChild(t), t;
}
function nd(e) {
	let t = Xu(), n = Zu(), r = $u(), i = Qu();
	t && (Object.assign(t.style, {
		...qu,
		...ed(e.bounds)
	}), Object.assign(n.style, { top: e.bounds.top < 35 ? 0 : "-35px" }), r.innerHTML = `&lt;${e.name}&gt;&nbsp;&nbsp;`, i.innerHTML = `${Math.round(e.bounds.width * 100) / 100} x ${Math.round(e.bounds.height * 100) / 100}`);
}
function rd(e) {
	let t = Bu(e);
	if (!t.width && !t.height) return;
	let n = ju(e);
	Xu() ? nd({
		bounds: t,
		name: n
	}) : td({
		bounds: t,
		name: n
	});
}
function id() {
	let e = Xu();
	e && (e.style.display = "none");
}
var ad = null;
function od(e) {
	let t = e.target;
	if (t) {
		let e = t.__vueParentComponent;
		if (e && (ad = e, e.vnode.el)) {
			let t = Bu(e), n = ju(e);
			Xu() ? nd({
				bounds: t,
				name: n
			}) : td({
				bounds: t,
				name: n
			});
		}
	}
}
function sd(e, t) {
	e.preventDefault(), e.stopPropagation(), ad && t(Mu(ad));
}
var cd = null;
function ld() {
	id(), window.removeEventListener("mouseover", od), window.removeEventListener("click", cd, !0), cd = null;
}
function ud() {
	return window.addEventListener("mouseover", od), new Promise((e) => {
		function t(n) {
			n.preventDefault(), n.stopPropagation(), sd(n, (n) => {
				window.removeEventListener("click", t, !0), cd = null, window.removeEventListener("mouseover", od);
				let r = Xu();
				r && (r.style.display = "none"), e(JSON.stringify({ id: n }));
			});
		}
		cd = t, window.addEventListener("click", t, !0);
	});
}
function dd(e) {
	let t = Nu(Wd.value, e.id);
	if (t) {
		let [n] = Vu(t);
		if (typeof n.scrollIntoView == "function") n.scrollIntoView({ behavior: "smooth" });
		else {
			let e = Bu(t), n = document.createElement("div"), r = {
				...ed(e),
				position: "absolute"
			};
			Object.assign(n.style, r), document.body.appendChild(n), n.scrollIntoView({ behavior: "smooth" }), setTimeout(() => {
				document.body.removeChild(n);
			}, 2e3);
		}
		setTimeout(() => {
			let n = Bu(t);
			if (n.width || n.height) {
				let r = ju(t), i = Xu();
				i ? nd({
					...e,
					name: r,
					bounds: n
				}) : td({
					...e,
					name: r,
					bounds: n
				}), setTimeout(() => {
					i && (i.style.display = "none");
				}, 1500);
			}
		}, 1200);
	}
}
J();
var fd;
(fd = q).__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__ ?? (fd.__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__ = !0);
function pd(e) {
	let t = 0, n = setInterval(() => {
		q.__VUE_INSPECTOR__ && (clearInterval(n), t += 30, e()), t >= 5e3 && clearInterval(n);
	}, 30);
}
function md() {
	let e = q.__VUE_INSPECTOR__, t = e.openInEditor;
	e.openInEditor = async (...n) => {
		e.disable(), t(...n);
	};
}
function hd() {
	return new Promise((e) => {
		function t() {
			md(), e(q.__VUE_INSPECTOR__);
		}
		q.__VUE_INSPECTOR__ ? t() : pd(() => {
			t();
		});
	});
}
J(), J();
function gd(e) {
	return !!(e && e.__v_isReadonly);
}
function _d(e) {
	return gd(e) ? _d(e.__v_raw) : !!(e && e.__v_isReactive);
}
function vd(e) {
	return !!(e && e.__v_isRef === !0);
}
function yd(e) {
	let t = e && e.__v_raw;
	return t ? yd(t) : e;
}
var bd = class {
	constructor() {
		this.refEditor = new xd();
	}
	set(e, t, n, r) {
		let i = Array.isArray(t) ? t : t.split(".");
		for (; i.length > 1;) {
			let t = i.shift();
			e = e instanceof Map ? e.get(t) : e instanceof Set ? Array.from(e.values())[t] : e[t], this.refEditor.isRef(e) && (e = this.refEditor.get(e));
		}
		let a = i[0], o = this.refEditor.get(e)[a];
		r ? r(e, a, n) : this.refEditor.isRef(o) ? this.refEditor.set(o, n) : e[a] = n;
	}
	get(e, t) {
		let n = Array.isArray(t) ? t : t.split(".");
		for (let t = 0; t < n.length; t++) if (e = e instanceof Map ? e.get(n[t]) : e[n[t]], this.refEditor.isRef(e) && (e = this.refEditor.get(e)), !e) return;
		return e;
	}
	has(e, t, n = !1) {
		if (e === void 0) return !1;
		let r = Array.isArray(t) ? t.slice() : t.split("."), i = n ? 2 : 1;
		for (; e && r.length > i;) {
			let t = r.shift();
			e = e[t], this.refEditor.isRef(e) && (e = this.refEditor.get(e));
		}
		return e != null && Object.prototype.hasOwnProperty.call(e, r[0]);
	}
	createDefaultSetCallback(e) {
		return (t, n, r) => {
			if ((e.remove || e.newKey) && (Array.isArray(t) ? t.splice(n, 1) : yd(t) instanceof Map ? t.delete(n) : yd(t) instanceof Set ? t.delete(Array.from(t.values())[n]) : Reflect.deleteProperty(t, n)), !e.remove) {
				let i = t[e.newKey || n];
				this.refEditor.isRef(i) ? this.refEditor.set(i, r) : yd(t) instanceof Map ? t.set(e.newKey || n, r) : yd(t) instanceof Set ? t.add(r) : t[e.newKey || n] = r;
			}
		};
	}
}, xd = class {
	set(e, t) {
		if (vd(e)) e.value = t;
		else {
			if (e instanceof Set && Array.isArray(t)) {
				e.clear(), t.forEach((t) => e.add(t));
				return;
			}
			let n = Object.keys(t);
			if (e instanceof Map) {
				let r = new Set(e.keys());
				n.forEach((n) => {
					e.set(n, Reflect.get(t, n)), r.delete(n);
				}), r.forEach((t) => e.delete(t));
				return;
			}
			let r = new Set(Object.keys(e));
			n.forEach((n) => {
				Reflect.set(e, n, Reflect.get(t, n)), r.delete(n);
			}), r.forEach((t) => Reflect.deleteProperty(e, t));
		}
	}
	get(e) {
		return vd(e) ? e.value : e;
	}
	isRef(e) {
		return vd(e) || _d(e);
	}
};
new bd(), J(), J(), J();
var Sd = "__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS_STATE__";
function Cd() {
	if (typeof window > "u" || !Xl || typeof localStorage > "u" || localStorage === null) return {
		recordingState: !1,
		mouseEventEnabled: !1,
		keyboardEventEnabled: !1,
		componentEventEnabled: !1,
		performanceEventEnabled: !1,
		selected: ""
	};
	let e = localStorage.getItem === void 0 ? null : localStorage.getItem(Sd);
	return e ? JSON.parse(e) : {
		recordingState: !1,
		mouseEventEnabled: !1,
		keyboardEventEnabled: !1,
		componentEventEnabled: !1,
		performanceEventEnabled: !1,
		selected: ""
	};
}
J(), J(), J();
var wd;
(wd = q).__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS ?? (wd.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS = []);
var Td = new Proxy(q.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS, { get(e, t, n) {
	return Reflect.get(e, t, n);
} });
function Ed(e, t) {
	Y.timelineLayersState[t.id] = !1, Td.push({
		...e,
		descriptorId: t.id,
		appRecord: ku(t.app)
	});
}
var Dd;
(Dd = q).__VUE_DEVTOOLS_KIT_INSPECTOR__ ?? (Dd.__VUE_DEVTOOLS_KIT_INSPECTOR__ = []);
var Od = new Proxy(q.__VUE_DEVTOOLS_KIT_INSPECTOR__, { get(e, t, n) {
	return Reflect.get(e, t, n);
} }), kd = iu(() => {
	Of.hooks.callHook("sendInspectorToClient", jd());
});
function Ad(e, t) {
	Od.push({
		options: e,
		descriptor: t,
		treeFilterPlaceholder: e.treeFilterPlaceholder ?? "Search tree...",
		stateFilterPlaceholder: e.stateFilterPlaceholder ?? "Search state...",
		treeFilter: "",
		selectedNodeId: "",
		appRecord: ku(t.app)
	}), kd();
}
function jd() {
	return Od.filter((e) => e.descriptor.app === Wd.value.app).filter((e) => e.descriptor.id !== "components").map((e) => {
		let t = e.descriptor, n = e.options;
		return {
			id: n.id,
			label: n.label,
			logo: t.logo,
			icon: `custom-ic-baseline-${(n?.icon)?.replace(/_/g, "-")}`,
			packageName: t.packageName,
			homepage: t.homepage,
			pluginId: t.id
		};
	});
}
function Md(e, t) {
	return Od.find((n) => n.options.id === e && (t ? n.descriptor.app === t : !0));
}
function Nd() {
	let e = pu();
	e.hook("addInspector", ({ inspector: e, plugin: t }) => {
		Ad(e, t.descriptor);
	});
	let t = iu(async ({ inspectorId: t, plugin: n }) => {
		if (!t || !n?.descriptor?.app || Y.highPerfModeEnabled) return;
		let r = Md(t, n.descriptor.app), i = {
			app: n.descriptor.app,
			inspectorId: t,
			filter: r?.treeFilter || "",
			rootNodes: []
		};
		await new Promise((t) => {
			e.callHookWith(async (e) => {
				await Promise.all(e.map((e) => e(i))), t();
			}, "getInspectorTree");
		}), e.callHookWith(async (e) => {
			await Promise.all(e.map((e) => e({
				inspectorId: t,
				rootNodes: i.rootNodes
			})));
		}, "sendInspectorTreeToClient");
	}, 120);
	e.hook("sendInspectorTree", t);
	let n = iu(async ({ inspectorId: t, plugin: n }) => {
		if (!t || !n?.descriptor?.app || Y.highPerfModeEnabled) return;
		let r = Md(t, n.descriptor.app), i = {
			app: n.descriptor.app,
			inspectorId: t,
			nodeId: r?.selectedNodeId || "",
			state: null
		}, a = { currentTab: `custom-inspector:${t}` };
		i.nodeId && await new Promise((t) => {
			e.callHookWith(async (e) => {
				await Promise.all(e.map((e) => e(i, a))), t();
			}, "getInspectorState");
		}), e.callHookWith(async (e) => {
			await Promise.all(e.map((e) => e({
				inspectorId: t,
				nodeId: i.nodeId,
				state: i.state
			})));
		}, "sendInspectorStateToClient");
	}, 120);
	return e.hook("sendInspectorState", n), e.hook("customInspectorSelectNode", ({ inspectorId: e, nodeId: t, plugin: n }) => {
		let r = Md(e, n.descriptor.app);
		r && (r.selectedNodeId = t);
	}), e.hook("timelineLayerAdded", ({ options: e, plugin: t }) => {
		Ed(e, t.descriptor);
	}), e.hook("timelineEventAdded", ({ options: t, plugin: n }) => {
		Y.highPerfModeEnabled || !Y.timelineLayersState?.[n.descriptor.id] && ![
			"performance",
			"component-event",
			"keyboard",
			"mouse"
		].includes(t.layerId) || e.callHookWith(async (e) => {
			await Promise.all(e.map((e) => e(t)));
		}, "sendTimelineEventToClient");
	}), e.hook("getComponentInstances", async ({ app: e }) => {
		let t = e.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
		if (!t) return null;
		let n = t.id.toString();
		return [...t.instanceMap].filter(([e]) => e.split(":")[0] === n).map(([, e]) => e);
	}), e.hook("getComponentBounds", async ({ instance: e }) => Bu(e)), e.hook("getComponentName", ({ instance: e }) => ju(e)), e.hook("componentHighlight", ({ uid: e }) => {
		let t = Wd.value.instanceMap.get(e);
		t && rd(t);
	}), e.hook("componentUnhighlight", () => {
		id();
	}), e;
}
var Pd;
(Pd = q).__VUE_DEVTOOLS_KIT_APP_RECORDS__ ?? (Pd.__VUE_DEVTOOLS_KIT_APP_RECORDS__ = []);
var Fd;
(Fd = q).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ ?? (Fd.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = {});
var Id;
(Id = q).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ ?? (Id.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = "");
var Ld;
(Ld = q).__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ ?? (Ld.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ = []);
var Rd;
(Rd = q).__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ ?? (Rd.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ = []);
var zd = "__VUE_DEVTOOLS_KIT_GLOBAL_STATE__";
function Bd() {
	return {
		connected: !1,
		clientConnected: !1,
		vitePluginDetected: !0,
		appRecords: [],
		activeAppRecordId: "",
		tabs: [],
		commands: [],
		highPerfModeEnabled: !0,
		devtoolsClientDetected: {},
		perfUniqueGroupId: 0,
		timelineLayersState: Cd()
	};
}
var Vd;
(Vd = q)[zd] ?? (Vd[zd] = Bd());
var Hd = iu((e) => {
	Of.hooks.callHook("devtoolsStateUpdated", { state: e });
});
iu((e, t) => {
	Of.hooks.callHook("devtoolsConnectedUpdated", {
		state: e,
		oldState: t
	});
});
var Ud = new Proxy(q.__VUE_DEVTOOLS_KIT_APP_RECORDS__, { get(e, t, n) {
	return t === "value" ? q.__VUE_DEVTOOLS_KIT_APP_RECORDS__ : q.__VUE_DEVTOOLS_KIT_APP_RECORDS__[t];
} }), Wd = new Proxy(q.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__, { get(e, t, n) {
	return t === "value" ? q.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ : t === "id" ? q.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ : q.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__[t];
} });
function Gd() {
	Hd({
		...q[zd],
		appRecords: Ud.value,
		activeAppRecordId: Wd.id,
		tabs: q.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__,
		commands: q.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__
	});
}
function Kd(e) {
	q.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = e, Gd();
}
function qd(e) {
	q.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = e, Gd();
}
var Y = new Proxy(q[zd], {
	get(e, t) {
		return t === "appRecords" ? Ud : t === "activeAppRecordId" ? Wd.id : t === "tabs" ? q.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ : t === "commands" ? q.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ : q[zd][t];
	},
	deleteProperty(e, t) {
		return delete e[t], !0;
	},
	set(e, t, n) {
		return { ...q[zd] }, e[t] = n, q[zd][t] = n, !0;
	}
});
function Jd(e = {}) {
	let { file: t, host: n, baseUrl: r = window.location.origin, line: i = 0, column: a = 0 } = e;
	if (t) {
		if (n === "chrome-extension") {
			let e = t.replace(/\\/g, "\\\\"), n = window.VUE_DEVTOOLS_CONFIG?.openInEditorHost ?? "/";
			fetch(`${n}__open-in-editor?file=${encodeURI(t)}`).then((t) => {
				if (!t.ok) {
					let t = `Opening component ${e} failed`;
					console.log(`%c${t}`, "color:red");
				}
			});
		} else if (Y.vitePluginDetected) {
			let e = q.__VUE_DEVTOOLS_OPEN_IN_EDITOR_BASE_URL__ ?? r;
			q.__VUE_INSPECTOR__.openInEditor(e, t, i, a);
		}
	}
}
J(), J(), J(), J(), J();
var Yd;
(Yd = q).__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__ ?? (Yd.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__ = []);
var Xd = new Proxy(q.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__, { get(e, t, n) {
	return Reflect.get(e, t, n);
} });
function Zd(e) {
	let t = {};
	return Object.keys(e).forEach((n) => {
		t[n] = e[n].defaultValue;
	}), t;
}
function Qd(e) {
	return `__VUE_DEVTOOLS_NEXT_PLUGIN_SETTINGS__${e}__`;
}
function $d(e) {
	return (Xd.find((t) => t[0].id === e && !!t[0]?.settings)?.[0] ?? null)?.settings ?? null;
}
function ef(e, t) {
	let n = Qd(e);
	if (n) {
		let e = localStorage.getItem(n);
		if (e) return JSON.parse(e);
	}
	return Zd(e ? (Xd.find((t) => t[0].id === e)?.[0] ?? null)?.settings ?? {} : t);
}
function tf(e, t) {
	let n = Qd(e);
	localStorage.getItem(n) || localStorage.setItem(n, JSON.stringify(Zd(t)));
}
function nf(e, t, n) {
	let r = Qd(e), i = localStorage.getItem(r), a = JSON.parse(i || "{}"), o = {
		...a,
		[t]: n
	};
	localStorage.setItem(r, JSON.stringify(o)), Of.hooks.callHookWith((r) => {
		r.forEach((r) => r({
			pluginId: e,
			key: t,
			oldValue: a[t],
			newValue: n,
			settings: o
		}));
	}, "setPluginSettings");
}
J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J();
var rf, af = (rf = q).__VUE_DEVTOOLS_HOOK ?? (rf.__VUE_DEVTOOLS_HOOK = pu()), of = {
	on: {
		vueAppInit(e) {
			af.hook("app:init", e);
		},
		vueAppUnmount(e) {
			af.hook("app:unmount", e);
		},
		vueAppConnected(e) {
			af.hook("app:connected", e);
		},
		componentAdded(e) {
			return af.hook("component:added", e);
		},
		componentEmit(e) {
			return af.hook("component:emit", e);
		},
		componentUpdated(e) {
			return af.hook("component:updated", e);
		},
		componentRemoved(e) {
			return af.hook("component:removed", e);
		},
		setupDevtoolsPlugin(e) {
			af.hook("devtools-plugin:setup", e);
		},
		perfStart(e) {
			return af.hook("perf:start", e);
		},
		perfEnd(e) {
			return af.hook("perf:end", e);
		}
	},
	setupDevToolsPlugin(e, t) {
		return af.callHook("devtools-plugin:setup", e, t);
	}
}, sf = class {
	constructor({ plugin: e, ctx: t }) {
		this.hooks = t.hooks, this.plugin = e;
	}
	get on() {
		return {
			visitComponentTree: (e) => {
				this.hooks.hook("visitComponentTree", e);
			},
			inspectComponent: (e) => {
				this.hooks.hook("inspectComponent", e);
			},
			editComponentState: (e) => {
				this.hooks.hook("editComponentState", e);
			},
			getInspectorTree: (e) => {
				this.hooks.hook("getInspectorTree", e);
			},
			getInspectorState: (e) => {
				this.hooks.hook("getInspectorState", e);
			},
			editInspectorState: (e) => {
				this.hooks.hook("editInspectorState", e);
			},
			inspectTimelineEvent: (e) => {
				this.hooks.hook("inspectTimelineEvent", e);
			},
			timelineCleared: (e) => {
				this.hooks.hook("timelineCleared", e);
			},
			setPluginSettings: (e) => {
				this.hooks.hook("setPluginSettings", e);
			}
		};
	}
	notifyComponentUpdate(e) {
		if (Y.highPerfModeEnabled) return;
		let t = jd().find((e) => e.packageName === this.plugin.descriptor.packageName);
		if (t?.id) {
			if (e) {
				let t = [
					e.appContext.app,
					e.uid,
					e.parent?.uid,
					e
				];
				af.callHook("component:updated", ...t);
			} else af.callHook("component:updated");
			this.hooks.callHook("sendInspectorState", {
				inspectorId: t.id,
				plugin: this.plugin
			});
		}
	}
	addInspector(e) {
		this.hooks.callHook("addInspector", {
			inspector: e,
			plugin: this.plugin
		}), this.plugin.descriptor.settings && tf(e.id, this.plugin.descriptor.settings);
	}
	sendInspectorTree(e) {
		Y.highPerfModeEnabled || this.hooks.callHook("sendInspectorTree", {
			inspectorId: e,
			plugin: this.plugin
		});
	}
	sendInspectorState(e) {
		Y.highPerfModeEnabled || this.hooks.callHook("sendInspectorState", {
			inspectorId: e,
			plugin: this.plugin
		});
	}
	selectInspectorNode(e, t) {
		this.hooks.callHook("customInspectorSelectNode", {
			inspectorId: e,
			nodeId: t,
			plugin: this.plugin
		});
	}
	visitComponentTree(e) {
		return this.hooks.callHook("visitComponentTree", e);
	}
	now() {
		return Y.highPerfModeEnabled ? 0 : Date.now();
	}
	addTimelineLayer(e) {
		this.hooks.callHook("timelineLayerAdded", {
			options: e,
			plugin: this.plugin
		});
	}
	addTimelineEvent(e) {
		Y.highPerfModeEnabled || this.hooks.callHook("timelineEventAdded", {
			options: e,
			plugin: this.plugin
		});
	}
	getSettings(e) {
		return ef(e ?? this.plugin.descriptor.id, this.plugin.descriptor.settings);
	}
	getComponentInstances(e) {
		return this.hooks.callHook("getComponentInstances", { app: e });
	}
	getComponentBounds(e) {
		return this.hooks.callHook("getComponentBounds", { instance: e });
	}
	getComponentName(e) {
		return this.hooks.callHook("getComponentName", { instance: e });
	}
	highlightElement(e) {
		let t = e.__VUE_DEVTOOLS_NEXT_UID__;
		return this.hooks.callHook("componentHighlight", { uid: t });
	}
	unhighlightElement() {
		return this.hooks.callHook("componentUnhighlight");
	}
};
J(), J(), J(), J();
var cf = "__vue_devtool_undefined__", lf = "__vue_devtool_infinity__", uf = "__vue_devtool_negative_infinity__", df = "__vue_devtool_nan__";
J(), J(), Object.entries({
	[cf]: "undefined",
	[df]: "NaN",
	[lf]: "Infinity",
	[uf]: "-Infinity"
}).reduce((e, [t, n]) => (e[n] = t, e), {}), J(), J(), J(), J(), J();
var ff;
(ff = q).__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__ ?? (ff.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__ = /* @__PURE__ */ new Set());
function pf(e, t) {
	return of.setupDevToolsPlugin(e, t);
}
function mf(e, t) {
	let [n, r] = e;
	if (n.app !== t) return;
	let i = new sf({
		plugin: {
			setupFn: r,
			descriptor: n
		},
		ctx: Of
	});
	n.packageName === "vuex" && i.on.editInspectorState((e) => {
		i.sendInspectorState(e.inspectorId);
	}), r(i);
}
function hf(e, t) {
	q.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.has(e) || Y.highPerfModeEnabled && !t?.inspectingComponent || (q.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.add(e), Xd.forEach((t) => {
		mf(t, e);
	}));
}
J(), J();
var gf = "__VUE_DEVTOOLS_ROUTER__", _f = "__VUE_DEVTOOLS_ROUTER_INFO__", vf;
(vf = q).__VUE_DEVTOOLS_ROUTER_INFO__ ?? (vf.__VUE_DEVTOOLS_ROUTER_INFO__ = {
	currentRoute: null,
	routes: []
});
var yf;
(yf = q).__VUE_DEVTOOLS_ROUTER__ ?? (yf.__VUE_DEVTOOLS_ROUTER__ = {}), new Proxy(q[_f], { get(e, t) {
	return q[_f][t];
} }), new Proxy(q[gf], { get(e, t) {
	if (t === "value") return q[gf];
} });
function bf(e) {
	let t = /* @__PURE__ */ new Map();
	return (e?.getRoutes() || []).filter((e) => !t.has(e.path) && t.set(e.path, 1));
}
function xf(e) {
	return e.map((e) => {
		let { path: t, name: n, children: r, meta: i } = e;
		return r?.length && (r = xf(r)), {
			path: t,
			name: n,
			children: r,
			meta: i
		};
	});
}
function Sf(e) {
	if (e) {
		let { fullPath: t, hash: n, href: r, path: i, name: a, matched: o, params: s, query: c } = e;
		return {
			fullPath: t,
			hash: n,
			href: r,
			path: i,
			name: a,
			params: s,
			query: c,
			matched: xf(o)
		};
	}
	return e;
}
function Cf(e, t) {
	function n() {
		let t = e.app?.config.globalProperties.$router, n = Sf(t?.currentRoute.value), r = xf(bf(t)), i = console.warn;
		console.warn = () => {}, q[_f] = {
			currentRoute: n ? nu(n) : {},
			routes: nu(r)
		}, q[gf] = t, console.warn = i;
	}
	n(), of.on.componentUpdated(iu(() => {
		t.value?.app === e.app && (n(), !Y.highPerfModeEnabled && Of.hooks.callHook("routerInfoUpdated", { state: q[_f] }));
	}, 200));
}
function wf(e) {
	return {
		async getInspectorTree(t) {
			let n = {
				...t,
				app: Wd.value.app,
				rootNodes: []
			};
			return await new Promise((t) => {
				e.callHookWith(async (e) => {
					await Promise.all(e.map((e) => e(n))), t();
				}, "getInspectorTree");
			}), n.rootNodes;
		},
		async getInspectorState(t) {
			let n = {
				...t,
				app: Wd.value.app,
				state: null
			}, r = { currentTab: `custom-inspector:${t.inspectorId}` };
			return await new Promise((t) => {
				e.callHookWith(async (e) => {
					await Promise.all(e.map((e) => e(n, r))), t();
				}, "getInspectorState");
			}), n.state;
		},
		editInspectorState(t) {
			let n = new bd(), r = {
				...t,
				app: Wd.value.app,
				set: (e, r = t.path, i = t.state.value, a) => {
					n.set(e, r, i, a || n.createDefaultSetCallback(t.state));
				}
			};
			e.callHookWith((e) => {
				e.forEach((e) => e(r));
			}, "editInspectorState");
		},
		sendInspectorState(t) {
			let n = Md(t);
			e.callHook("sendInspectorState", {
				inspectorId: t,
				plugin: {
					descriptor: n.descriptor,
					setupFn: () => ({})
				}
			});
		},
		inspectComponentInspector() {
			return ud();
		},
		cancelInspectComponentInspector() {
			return ld();
		},
		getComponentRenderCode(e) {
			let t = Nu(Wd.value, e);
			if (t) return typeof t?.type == "function" ? t.type.toString() : t.render.toString();
		},
		scrollToComponent(e) {
			return dd({ id: e });
		},
		openInEditor: Jd,
		getVueInspector: hd,
		toggleApp(e, t) {
			let n = Ud.value.find((t) => t.id === e);
			n && (qd(e), Kd(n), Cf(n, Wd), kd(), hf(n.app, t));
		},
		inspectDOM(e) {
			let t = Nu(Wd.value, e);
			if (t) {
				let [e] = Vu(t);
				e && (q.__VUE_DEVTOOLS_INSPECT_DOM_TARGET__ = e);
			}
		},
		updatePluginSettings(e, t, n) {
			nf(e, t, n);
		},
		getPluginSettings(e) {
			return {
				options: $d(e),
				values: ef(e)
			};
		}
	};
}
J();
var Tf;
(Tf = q).__VUE_DEVTOOLS_ENV__ ?? (Tf.__VUE_DEVTOOLS_ENV__ = { vitePluginDetected: !1 });
var Ef = Nd(), Df;
(Df = q).__VUE_DEVTOOLS_KIT_CONTEXT__ ?? (Df.__VUE_DEVTOOLS_KIT_CONTEXT__ = {
	hooks: Ef,
	get state() {
		return {
			...Y,
			activeAppRecordId: Wd.id,
			activeAppRecord: Wd.value,
			appRecords: Ud.value
		};
	},
	api: wf(Ef)
});
var Of = q.__VUE_DEVTOOLS_KIT_CONTEXT__;
J(), Cu(Tu(), 1);
var kf;
(kf = q).__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__ ?? (kf.__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__ = {
	id: 0,
	appIds: /* @__PURE__ */ new Set()
}), J(), J();
function Af(e) {
	Y.highPerfModeEnabled = e ?? !Y.highPerfModeEnabled, !e && Wd.value && hf(Wd.value.app);
}
J(), J(), J();
function jf(e) {
	Y.devtoolsClientDetected = {
		...Y.devtoolsClientDetected,
		...e
	}, Af(!Object.values(Y.devtoolsClientDetected).some(Boolean));
}
var Mf;
(Mf = q).__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__ ?? (Mf.__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__ = jf), J(), J(), J(), J(), J(), J(), J();
var Nf = class {
	constructor() {
		this.keyToValue = /* @__PURE__ */ new Map(), this.valueToKey = /* @__PURE__ */ new Map();
	}
	set(e, t) {
		this.keyToValue.set(e, t), this.valueToKey.set(t, e);
	}
	getByKey(e) {
		return this.keyToValue.get(e);
	}
	getByValue(e) {
		return this.valueToKey.get(e);
	}
	clear() {
		this.keyToValue.clear(), this.valueToKey.clear();
	}
}, Pf = class {
	constructor(e) {
		this.generateIdentifier = e, this.kv = new Nf();
	}
	register(e, t) {
		this.kv.getByValue(e) || (t ||= this.generateIdentifier(e), this.kv.set(t, e));
	}
	clear() {
		this.kv.clear();
	}
	getIdentifier(e) {
		return this.kv.getByValue(e);
	}
	getValue(e) {
		return this.kv.getByKey(e);
	}
}, Ff = class extends Pf {
	constructor() {
		super((e) => e.name), this.classToAllowedProps = /* @__PURE__ */ new Map();
	}
	register(e, t) {
		typeof t == "object" ? (t.allowProps && this.classToAllowedProps.set(e, t.allowProps), super.register(e, t.identifier)) : super.register(e, t);
	}
	getAllowedProps(e) {
		return this.classToAllowedProps.get(e);
	}
};
J(), J();
function If(e) {
	if ("values" in Object) return Object.values(e);
	let t = [];
	for (let n in e) e.hasOwnProperty(n) && t.push(e[n]);
	return t;
}
function Lf(e, t) {
	let n = If(e);
	if ("find" in n) return n.find(t);
	let r = n;
	for (let e = 0; e < r.length; e++) {
		let n = r[e];
		if (t(n)) return n;
	}
}
function Rf(e, t) {
	Object.entries(e).forEach(([e, n]) => t(n, e));
}
function zf(e, t) {
	return e.indexOf(t) !== -1;
}
function Bf(e, t) {
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (t(r)) return r;
	}
}
var Vf = class {
	constructor() {
		this.transfomers = {};
	}
	register(e) {
		this.transfomers[e.name] = e;
	}
	findApplicable(e) {
		return Lf(this.transfomers, (t) => t.isApplicable(e));
	}
	findByName(e) {
		return this.transfomers[e];
	}
};
J(), J();
var Hf = (e) => Object.prototype.toString.call(e).slice(8, -1), Uf = (e) => e === void 0, Wf = (e) => e === null, Gf = (e) => typeof e != "object" || !e || e === Object.prototype ? !1 : Object.getPrototypeOf(e) === null ? !0 : Object.getPrototypeOf(e) === Object.prototype, Kf = (e) => Gf(e) && Object.keys(e).length === 0, qf = (e) => Array.isArray(e), Jf = (e) => typeof e == "string", Yf = (e) => typeof e == "number" && !isNaN(e), Xf = (e) => typeof e == "boolean", Zf = (e) => e instanceof RegExp, Qf = (e) => e instanceof Map, $f = (e) => e instanceof Set, ep = (e) => Hf(e) === "Symbol", tp = (e) => e instanceof Date && !isNaN(e.valueOf()), np = (e) => e instanceof Error, rp = (e) => typeof e == "number" && isNaN(e), ip = (e) => Xf(e) || Wf(e) || Uf(e) || Yf(e) || Jf(e) || ep(e), ap = (e) => typeof e == "bigint", op = (e) => e === Infinity || e === -Infinity, sp = (e) => ArrayBuffer.isView(e) && !(e instanceof DataView), cp = (e) => e instanceof URL;
J();
var lp = (e) => e.replace(/\./g, "\\."), up = (e) => e.map(String).map(lp).join("."), dp = (e) => {
	let t = [], n = "";
	for (let r = 0; r < e.length; r++) {
		let i = e.charAt(r);
		if (i === "\\" && e.charAt(r + 1) === ".") {
			n += ".", r++;
			continue;
		}
		if (i === ".") {
			t.push(n), n = "";
			continue;
		}
		n += i;
	}
	let r = n;
	return t.push(r), t;
};
J();
function fp(e, t, n, r) {
	return {
		isApplicable: e,
		annotation: t,
		transform: n,
		untransform: r
	};
}
var pp = [
	fp(Uf, "undefined", () => null, () => void 0),
	fp(ap, "bigint", (e) => e.toString(), (e) => typeof BigInt < "u" ? BigInt(e) : (console.error("Please add a BigInt polyfill."), e)),
	fp(tp, "Date", (e) => e.toISOString(), (e) => new Date(e)),
	fp(np, "Error", (e, t) => {
		let n = {
			name: e.name,
			message: e.message
		};
		return t.allowedErrorProps.forEach((t) => {
			n[t] = e[t];
		}), n;
	}, (e, t) => {
		let n = Error(e.message);
		return n.name = e.name, n.stack = e.stack, t.allowedErrorProps.forEach((t) => {
			n[t] = e[t];
		}), n;
	}),
	fp(Zf, "regexp", (e) => "" + e, (e) => {
		let t = e.slice(1, e.lastIndexOf("/")), n = e.slice(e.lastIndexOf("/") + 1);
		return new RegExp(t, n);
	}),
	fp($f, "set", (e) => [...e.values()], (e) => new Set(e)),
	fp(Qf, "map", (e) => [...e.entries()], (e) => new Map(e)),
	fp((e) => rp(e) || op(e), "number", (e) => rp(e) ? "NaN" : e > 0 ? "Infinity" : "-Infinity", Number),
	fp((e) => e === 0 && 1 / e == -Infinity, "number", () => "-0", Number),
	fp(cp, "URL", (e) => e.toString(), (e) => new URL(e))
];
function mp(e, t, n, r) {
	return {
		isApplicable: e,
		annotation: t,
		transform: n,
		untransform: r
	};
}
var hp = mp((e, t) => ep(e) ? !!t.symbolRegistry.getIdentifier(e) : !1, (e, t) => ["symbol", t.symbolRegistry.getIdentifier(e)], (e) => e.description, (e, t, n) => {
	let r = n.symbolRegistry.getValue(t[1]);
	if (!r) throw Error("Trying to deserialize unknown symbol");
	return r;
}), gp = [
	Int8Array,
	Uint8Array,
	Int16Array,
	Uint16Array,
	Int32Array,
	Uint32Array,
	Float32Array,
	Float64Array,
	Uint8ClampedArray
].reduce((e, t) => (e[t.name] = t, e), {}), _p = mp(sp, (e) => ["typed-array", e.constructor.name], (e) => [...e], (e, t) => {
	let n = gp[t[1]];
	if (!n) throw Error("Trying to deserialize unknown typed array");
	return new n(e);
});
function vp(e, t) {
	return e?.constructor ? !!t.classRegistry.getIdentifier(e.constructor) : !1;
}
var yp = mp(vp, (e, t) => ["class", t.classRegistry.getIdentifier(e.constructor)], (e, t) => {
	let n = t.classRegistry.getAllowedProps(e.constructor);
	if (!n) return { ...e };
	let r = {};
	return n.forEach((t) => {
		r[t] = e[t];
	}), r;
}, (e, t, n) => {
	let r = n.classRegistry.getValue(t[1]);
	if (!r) throw Error(`Trying to deserialize unknown class '${t[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`);
	return Object.assign(Object.create(r.prototype), e);
}), bp = mp((e, t) => !!t.customTransformerRegistry.findApplicable(e), (e, t) => ["custom", t.customTransformerRegistry.findApplicable(e).name], (e, t) => t.customTransformerRegistry.findApplicable(e).serialize(e), (e, t, n) => {
	let r = n.customTransformerRegistry.findByName(t[1]);
	if (!r) throw Error("Trying to deserialize unknown custom value");
	return r.deserialize(e);
}), xp = [
	yp,
	hp,
	bp,
	_p
], Sp = (e, t) => {
	let n = Bf(xp, (n) => n.isApplicable(e, t));
	if (n) return {
		value: n.transform(e, t),
		type: n.annotation(e, t)
	};
	let r = Bf(pp, (n) => n.isApplicable(e, t));
	if (r) return {
		value: r.transform(e, t),
		type: r.annotation
	};
}, Cp = {};
pp.forEach((e) => {
	Cp[e.annotation] = e;
});
var wp = (e, t, n) => {
	if (qf(t)) switch (t[0]) {
		case "symbol": return hp.untransform(e, t, n);
		case "class": return yp.untransform(e, t, n);
		case "custom": return bp.untransform(e, t, n);
		case "typed-array": return _p.untransform(e, t, n);
		default: throw Error("Unknown transformation: " + t);
	}
	else {
		let r = Cp[t];
		if (!r) throw Error("Unknown transformation: " + t);
		return r.untransform(e, n);
	}
};
J();
var Tp = (e, t) => {
	if (t > e.size) throw Error("index out of bounds");
	let n = e.keys();
	for (; t > 0;) n.next(), t--;
	return n.next().value;
};
function Ep(e) {
	if (zf(e, "__proto__")) throw Error("__proto__ is not allowed as a property");
	if (zf(e, "prototype")) throw Error("prototype is not allowed as a property");
	if (zf(e, "constructor")) throw Error("constructor is not allowed as a property");
}
var Dp = (e, t) => {
	Ep(t);
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		if ($f(e)) e = Tp(e, +r);
		else if (Qf(e)) {
			let i = +r, a = +t[++n] == 0 ? "key" : "value", o = Tp(e, i);
			switch (a) {
				case "key":
					e = o;
					break;
				case "value":
					e = e.get(o);
					break;
			}
		} else e = e[r];
	}
	return e;
}, Op = (e, t, n) => {
	if (Ep(t), t.length === 0) return n(e);
	let r = e;
	for (let e = 0; e < t.length - 1; e++) {
		let n = t[e];
		if (qf(r)) {
			let e = +n;
			r = r[e];
		} else if (Gf(r)) r = r[n];
		else if ($f(r)) {
			let e = +n;
			r = Tp(r, e);
		} else if (Qf(r)) {
			if (e === t.length - 2) break;
			let i = +n, a = +t[++e] == 0 ? "key" : "value", o = Tp(r, i);
			switch (a) {
				case "key":
					r = o;
					break;
				case "value":
					r = r.get(o);
					break;
			}
		}
	}
	let i = t[t.length - 1];
	if (qf(r) ? r[+i] = n(r[+i]) : Gf(r) && (r[i] = n(r[i])), $f(r)) {
		let e = Tp(r, +i), t = n(e);
		e !== t && (r.delete(e), r.add(t));
	}
	if (Qf(r)) {
		let e = +t[t.length - 2], a = Tp(r, e);
		switch (+i == 0 ? "key" : "value") {
			case "key": {
				let e = n(a);
				r.set(e, r.get(a)), e !== a && r.delete(a);
				break;
			}
			case "value":
				r.set(a, n(r.get(a)));
				break;
		}
	}
	return e;
};
function kp(e, t, n = []) {
	if (!e) return;
	if (!qf(e)) {
		Rf(e, (e, r) => kp(e, t, [...n, ...dp(r)]));
		return;
	}
	let [r, i] = e;
	i && Rf(i, (e, r) => {
		kp(e, t, [...n, ...dp(r)]);
	}), t(r, n);
}
function Ap(e, t, n) {
	return kp(t, (t, r) => {
		e = Op(e, r, (e) => wp(e, t, n));
	}), e;
}
function jp(e, t) {
	function n(t, n) {
		let r = Dp(e, dp(n));
		t.map(dp).forEach((t) => {
			e = Op(e, t, () => r);
		});
	}
	if (qf(t)) {
		let [r, i] = t;
		r.forEach((t) => {
			e = Op(e, dp(t), () => e);
		}), i && Rf(i, n);
	} else Rf(t, n);
	return e;
}
var Mp = (e, t) => Gf(e) || qf(e) || Qf(e) || $f(e) || vp(e, t);
function Np(e, t, n) {
	let r = n.get(e);
	r ? r.push(t) : n.set(e, [t]);
}
function Pp(e, t) {
	let n = {}, r;
	return e.forEach((e) => {
		if (e.length <= 1) return;
		t || (e = e.map((e) => e.map(String)).sort((e, t) => e.length - t.length));
		let [i, ...a] = e;
		i.length === 0 ? r = a.map(up) : n[up(i)] = a.map(up);
	}), r ? Kf(n) ? [r] : [r, n] : Kf(n) ? void 0 : n;
}
var Fp = (e, t, n, r, i = [], a = [], o = /* @__PURE__ */ new Map()) => {
	let s = ip(e);
	if (!s) {
		Np(e, i, t);
		let n = o.get(e);
		if (n) return r ? { transformedValue: null } : n;
	}
	if (!Mp(e, n)) {
		let t = Sp(e, n), r = t ? {
			transformedValue: t.value,
			annotations: [t.type]
		} : { transformedValue: e };
		return s || o.set(e, r), r;
	}
	if (zf(a, e)) return { transformedValue: null };
	let c = Sp(e, n), l = c?.value ?? e, u = qf(l) ? [] : {}, d = {};
	Rf(l, (s, c) => {
		if (c === "__proto__" || c === "constructor" || c === "prototype") throw Error(`Detected property ${c}. This is a prototype pollution risk, please remove it from your object.`);
		let l = Fp(s, t, n, r, [...i, c], [...a, e], o);
		u[c] = l.transformedValue, qf(l.annotations) ? d[c] = l.annotations : Gf(l.annotations) && Rf(l.annotations, (e, t) => {
			d[lp(c) + "." + t] = e;
		});
	});
	let f = Kf(d) ? {
		transformedValue: u,
		annotations: c ? [c.type] : void 0
	} : {
		transformedValue: u,
		annotations: c ? [c.type, d] : d
	};
	return s || o.set(e, f), f;
};
J(), J();
function Ip(e) {
	return Object.prototype.toString.call(e).slice(8, -1);
}
function Lp(e) {
	return Ip(e) === "Array";
}
function Rp(e) {
	if (Ip(e) !== "Object") return !1;
	let t = Object.getPrototypeOf(e);
	return !!t && t.constructor === Object && t === Object.prototype;
}
function zp(e, t, n, r, i) {
	let a = {}.propertyIsEnumerable.call(r, t) ? "enumerable" : "nonenumerable";
	a === "enumerable" && (e[t] = n), i && a === "nonenumerable" && Object.defineProperty(e, t, {
		value: n,
		enumerable: !1,
		writable: !0,
		configurable: !0
	});
}
function Bp(e, t = {}) {
	if (Lp(e)) return e.map((e) => Bp(e, t));
	if (!Rp(e)) return e;
	let n = Object.getOwnPropertyNames(e), r = Object.getOwnPropertySymbols(e);
	return [...n, ...r].reduce((n, r) => {
		if (Lp(t.props) && !t.props.includes(r)) return n;
		let i = e[r];
		return zp(n, r, Bp(i, t), e, t.nonenumerable), n;
	}, {});
}
var X = class {
	constructor({ dedupe: e = !1 } = {}) {
		this.classRegistry = new Ff(), this.symbolRegistry = new Pf((e) => e.description ?? ""), this.customTransformerRegistry = new Vf(), this.allowedErrorProps = [], this.dedupe = e;
	}
	serialize(e) {
		let t = /* @__PURE__ */ new Map(), n = Fp(e, t, this, this.dedupe), r = { json: n.transformedValue };
		n.annotations && (r.meta = {
			...r.meta,
			values: n.annotations
		});
		let i = Pp(t, this.dedupe);
		return i && (r.meta = {
			...r.meta,
			referentialEqualities: i
		}), r;
	}
	deserialize(e) {
		let { json: t, meta: n } = e, r = Bp(t);
		return n?.values && (r = Ap(r, n.values, this)), n?.referentialEqualities && (r = jp(r, n.referentialEqualities)), r;
	}
	stringify(e) {
		return JSON.stringify(this.serialize(e));
	}
	parse(e) {
		return this.deserialize(JSON.parse(e));
	}
	registerClass(e, t) {
		this.classRegistry.register(e, t);
	}
	registerSymbol(e, t) {
		this.symbolRegistry.register(e, t);
	}
	registerCustom(e, t) {
		this.customTransformerRegistry.register({
			name: t,
			...e
		});
	}
	allowErrorProps(...e) {
		this.allowedErrorProps.push(...e);
	}
};
X.defaultInstance = new X(), X.serialize = X.defaultInstance.serialize.bind(X.defaultInstance), X.deserialize = X.defaultInstance.deserialize.bind(X.defaultInstance), X.stringify = X.defaultInstance.stringify.bind(X.defaultInstance), X.parse = X.defaultInstance.parse.bind(X.defaultInstance), X.registerClass = X.defaultInstance.registerClass.bind(X.defaultInstance), X.registerSymbol = X.defaultInstance.registerSymbol.bind(X.defaultInstance), X.registerCustom = X.defaultInstance.registerCustom.bind(X.defaultInstance), X.allowErrorProps = X.defaultInstance.allowErrorProps.bind(X.defaultInstance), X.serialize, X.deserialize, X.stringify, X.parse, X.registerClass, X.registerCustom, X.registerSymbol, X.allowErrorProps, J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J(), J();
var Vp;
(Vp = q).__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__ ?? (Vp.__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__ = []);
var Hp;
(Hp = q).__VUE_DEVTOOLS_KIT_RPC_CLIENT__ ?? (Hp.__VUE_DEVTOOLS_KIT_RPC_CLIENT__ = null);
var Up;
(Up = q).__VUE_DEVTOOLS_KIT_RPC_SERVER__ ?? (Up.__VUE_DEVTOOLS_KIT_RPC_SERVER__ = null);
var Wp;
(Wp = q).__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__ ?? (Wp.__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__ = null);
var Gp;
(Gp = q).__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__ ?? (Gp.__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__ = null);
var Kp;
(Kp = q).__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__ ?? (Kp.__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__ = null), J(), J(), J(), J(), J(), J(), J();
//#endregion
//#region node_modules/pinia/dist/pinia.mjs
var qp = typeof window < "u", Jp, Yp = (e) => Jp = e;
process.env.NODE_ENV;
var Xp = process.env.NODE_ENV === "production" ? Symbol() : Symbol("pinia");
function Zp(e) {
	return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Qp;
(function(e) {
	e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Qp ||= {});
var $p = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function em(e, { autoBom: t = !1 } = {}) {
	return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["﻿", e], { type: e.type }) : e;
}
function tm(e, t, n) {
	let r = new XMLHttpRequest();
	r.open("GET", e), r.responseType = "blob", r.onload = function() {
		om(r.response, t, n);
	}, r.onerror = function() {
		console.error("could not download file");
	}, r.send();
}
function nm(e) {
	let t = new XMLHttpRequest();
	t.open("HEAD", e, !1);
	try {
		t.send();
	} catch {}
	return t.status >= 200 && t.status <= 299;
}
function rm(e) {
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
var im = typeof navigator == "object" ? navigator : { userAgent: "" }, am = /Macintosh/.test(im.userAgent) && /AppleWebKit/.test(im.userAgent) && !/Safari/.test(im.userAgent), om = qp ? typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !am ? sm : "msSaveOrOpenBlob" in im ? cm : lm : () => {};
function sm(e, t = "download", n) {
	let r = document.createElement("a");
	r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin === location.origin ? rm(r) : nm(r.href) ? tm(e, t, n) : (r.target = "_blank", rm(r))) : (r.href = URL.createObjectURL(e), setTimeout(function() {
		URL.revokeObjectURL(r.href);
	}, 4e4), setTimeout(function() {
		rm(r);
	}, 0));
}
function cm(e, t = "download", n) {
	if (typeof e == "string") if (nm(e)) tm(e, t, n);
	else {
		let t = document.createElement("a");
		t.href = e, t.target = "_blank", setTimeout(function() {
			rm(t);
		});
	}
	else navigator.msSaveOrOpenBlob(em(e, n), t);
}
function lm(e, t, n, r) {
	if (r ||= open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string") return tm(e, t, n);
	let i = e.type === "application/octet-stream", a = /constructor/i.test(String($p.HTMLElement)) || "safari" in $p, o = /CriOS\/[\d]+/.test(navigator.userAgent);
	if ((o || i && a || am) && typeof FileReader < "u") {
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
function Z(e, t) {
	let n = "🍍 " + e;
	typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function um(e) {
	return "_a" in e && "install" in e;
}
function dm() {
	if (!("clipboard" in navigator)) return Z("Your browser doesn't support the Clipboard API", "error"), !0;
}
function fm(e) {
	return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (Z("You need to activate the \"Emulate a focused page\" setting in the \"Rendering\" panel of devtools.", "warn"), !0) : !1;
}
async function pm(e) {
	if (!dm()) try {
		await navigator.clipboard.writeText(JSON.stringify(e.state.value)), Z("Global state copied to clipboard.");
	} catch (e) {
		if (fm(e)) return;
		Z("Failed to serialize the state. Check the console for more details.", "error"), console.error(e);
	}
}
async function mm(e) {
	if (!dm()) try {
		ym(e, JSON.parse(await navigator.clipboard.readText())), Z("Global state pasted from clipboard.");
	} catch (e) {
		if (fm(e)) return;
		Z("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(e);
	}
}
async function hm(e) {
	try {
		om(new Blob([JSON.stringify(e.state.value)], { type: "text/plain;charset=utf-8" }), "pinia-state.json");
	} catch (e) {
		Z("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(e);
	}
}
var gm;
function _m() {
	gm || (gm = document.createElement("input"), gm.type = "file", gm.accept = ".json");
	function e() {
		return new Promise((e, t) => {
			gm.onchange = async () => {
				let t = gm.files;
				if (!t) return e(null);
				let n = t.item(0);
				return e(n ? {
					text: await n.text(),
					file: n
				} : null);
			}, gm.oncancel = () => e(null), gm.onerror = t, gm.click();
		});
	}
	return e;
}
async function vm(e) {
	try {
		let t = await _m()();
		if (!t) return;
		let { text: n, file: r } = t;
		ym(e, JSON.parse(n)), Z(`Global state imported from "${r.name}".`);
	} catch (e) {
		Z("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(e);
	}
}
function ym(e, t) {
	for (let n in t) {
		let r = e.state.value[n];
		r ? Object.assign(r, t[n]) : e.state.value[n] = t[n];
	}
}
function bm(e) {
	return { _custom: { display: e } };
}
var xm = "🍍 Pinia (root)", Sm = "_root";
function Cm(e) {
	return um(e) ? {
		id: Sm,
		label: xm
	} : {
		id: e.$id,
		label: e.$id
	};
}
function wm(e) {
	if (um(e)) {
		let t = Array.from(e._s.keys()), n = e._s;
		return {
			state: t.map((t) => ({
				editable: !0,
				key: t,
				value: e.state.value[t]
			})),
			getters: t.filter((e) => n.get(e)._getters).map((e) => {
				let t = n.get(e);
				return {
					editable: !1,
					key: e,
					value: t._getters.reduce((e, n) => (e[n] = t[n], e), {})
				};
			})
		};
	}
	let t = { state: Object.keys(e.$state).map((t) => ({
		editable: !0,
		key: t,
		value: e.$state[t]
	})) };
	return e._getters && e._getters.length && (t.getters = e._getters.map((t) => ({
		editable: !1,
		key: t,
		value: e[t]
	}))), e._customProperties.size && (t.customProperties = Array.from(e._customProperties).map((t) => ({
		editable: !0,
		key: t,
		value: e[t]
	}))), t;
}
function Tm(e) {
	return e ? Array.isArray(e) ? e.reduce((e, t) => (e.keys.push(t.key), e.operations.push(t.type), e.oldValue[t.key] = t.oldValue, e.newValue[t.key] = t.newValue, e), {
		oldValue: {},
		keys: [],
		operations: [],
		newValue: {}
	}) : {
		operation: bm(e.type),
		key: bm(e.key),
		oldValue: e.oldValue,
		newValue: e.newValue
	} : {};
}
function Em(e) {
	switch (e) {
		case Qp.direct: return "mutation";
		case Qp.patchFunction: return "$patch";
		case Qp.patchObject: return "$patch";
		default: return "unknown";
	}
}
var Dm = !0, Om = [], km = "pinia:mutations", Q = "pinia", { assign: Am } = Object, jm = (e) => "🍍 " + e;
function Mm(e, t) {
	pf({
		id: "dev.esm.pinia",
		label: "Pinia 🍍",
		logo: "https://pinia.vuejs.org/logo.svg",
		packageName: "pinia",
		homepage: "https://pinia.vuejs.org",
		componentStateTypes: Om,
		app: e
	}, (n) => {
		typeof n.now != "function" && Z("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
			id: km,
			label: "Pinia 🍍",
			color: 15064968
		}), n.addInspector({
			id: Q,
			label: "Pinia 🍍",
			icon: "storage",
			treeFilterPlaceholder: "Search stores",
			actions: [
				{
					icon: "content_copy",
					action: () => {
						pm(t);
					},
					tooltip: "Serialize and copy the state"
				},
				{
					icon: "content_paste",
					action: async () => {
						await mm(t), n.sendInspectorTree(Q), n.sendInspectorState(Q);
					},
					tooltip: "Replace the state with the content of your clipboard"
				},
				{
					icon: "save",
					action: () => {
						hm(t);
					},
					tooltip: "Save the state as a JSON file"
				},
				{
					icon: "folder_open",
					action: async () => {
						await vm(t), n.sendInspectorTree(Q), n.sendInspectorState(Q);
					},
					tooltip: "Import the state from a JSON file"
				}
			],
			nodeActions: [{
				icon: "restore",
				tooltip: "Reset the state (with \"$reset\")",
				action: (e) => {
					let n = t._s.get(e);
					n ? typeof n.$reset == "function" ? (n.$reset(), Z(`Store "${e}" reset.`)) : Z(`Cannot reset "${e}" store because it doesn't have a "$reset" method implemented.`, "warn") : Z(`Cannot reset "${e}" store because it wasn't found.`, "warn");
				}
			}]
		}), n.on.inspectComponent((e) => {
			let t = e.componentInstance && e.componentInstance.proxy;
			if (t && t._pStores) {
				let t = e.componentInstance.proxy._pStores;
				Object.values(t).forEach((t) => {
					e.instanceData.state.push({
						type: jm(t.$id),
						key: "state",
						editable: !0,
						value: t._isOptionsAPI ? { _custom: {
							value: /* @__PURE__ */ B(t.$state),
							actions: [{
								icon: "restore",
								tooltip: "Reset the state of this store",
								action: () => t.$reset()
							}]
						} } : Object.keys(t.$state).reduce((e, n) => (e[n] = t.$state[n], e), {})
					}), t._getters && t._getters.length && e.instanceData.state.push({
						type: jm(t.$id),
						key: "getters",
						editable: !1,
						value: t._getters.reduce((e, n) => {
							try {
								e[n] = t[n];
							} catch (t) {
								e[n] = t;
							}
							return e;
						}, {})
					});
				});
			}
		}), n.on.getInspectorTree((n) => {
			if (n.app === e && n.inspectorId === Q) {
				let e = [t];
				e = e.concat(Array.from(t._s.values())), n.rootNodes = (n.filter ? e.filter((e) => "$id" in e ? e.$id.toLowerCase().includes(n.filter.toLowerCase()) : xm.toLowerCase().includes(n.filter.toLowerCase())) : e).map(Cm);
			}
		}), globalThis.$pinia = t, n.on.getInspectorState((n) => {
			if (n.app === e && n.inspectorId === Q) {
				let e = n.nodeId === Sm ? t : t._s.get(n.nodeId);
				if (!e) return;
				e && (n.nodeId !== Sm && (globalThis.$store = /* @__PURE__ */ B(e)), n.state = wm(e));
			}
		}), n.on.editInspectorState((n) => {
			if (n.app === e && n.inspectorId === Q) {
				let e = n.nodeId === Sm ? t : t._s.get(n.nodeId);
				if (!e) return Z(`store "${n.nodeId}" not found`, "error");
				let { path: r } = n;
				um(e) ? r.unshift("state") : (r.length !== 1 || !e._customProperties.has(r[0]) || r[0] in e.$state) && r.unshift("$state"), Dm = !1, n.set(e, r, n.state.value), Dm = !0;
			}
		}), n.on.editComponentState((e) => {
			if (e.type.startsWith("🍍")) {
				let n = e.type.replace(/^🍍\s*/, ""), r = t._s.get(n);
				if (!r) return Z(`store "${n}" not found`, "error");
				let { path: i } = e;
				if (i[0] !== "state") return Z(`Invalid path for store "${n}":\n${i}\nOnly state can be modified.`);
				i[0] = "$state", Dm = !1, e.set(r, i, e.state.value), Dm = !0;
			}
		});
	});
}
function Nm(e, t) {
	Om.includes(jm(t.$id)) || Om.push(jm(t.$id)), pf({
		id: "dev.esm.pinia",
		label: "Pinia 🍍",
		logo: "https://pinia.vuejs.org/logo.svg",
		packageName: "pinia",
		homepage: "https://pinia.vuejs.org",
		componentStateTypes: Om,
		app: e,
		settings: { logStoreChanges: {
			label: "Notify about new/deleted stores",
			type: "boolean",
			defaultValue: !0
		} }
	}, (e) => {
		let n = typeof e.now == "function" ? e.now.bind(e) : Date.now;
		t.$onAction(({ after: r, onError: i, name: a, args: o }) => {
			let s = Pm++;
			e.addTimelineEvent({
				layerId: km,
				event: {
					time: n(),
					title: "🛫 " + a,
					subtitle: "start",
					data: {
						store: bm(t.$id),
						action: bm(a),
						args: o
					},
					groupId: s
				}
			}), r((r) => {
				Fm = void 0, e.addTimelineEvent({
					layerId: km,
					event: {
						time: n(),
						title: "🛬 " + a,
						subtitle: "end",
						data: {
							store: bm(t.$id),
							action: bm(a),
							args: o,
							result: r
						},
						groupId: s
					}
				});
			}), i((r) => {
				Fm = void 0, e.addTimelineEvent({
					layerId: km,
					event: {
						time: n(),
						logType: "error",
						title: "💥 " + a,
						subtitle: "end",
						data: {
							store: bm(t.$id),
							action: bm(a),
							args: o,
							error: r
						},
						groupId: s
					}
				});
			});
		}, !0), t._customProperties.forEach((r) => {
			Qi(() => H(t[r]), (t, i) => {
				e.notifyComponentUpdate(), e.sendInspectorState(Q), Dm && e.addTimelineEvent({
					layerId: km,
					event: {
						time: n(),
						title: "Change",
						subtitle: r,
						data: {
							newValue: t,
							oldValue: i
						},
						groupId: Fm
					}
				});
			}, { deep: !0 });
		}), t.$subscribe(({ events: r, type: i }, a) => {
			if (e.notifyComponentUpdate(), e.sendInspectorState(Q), !Dm) return;
			let o = {
				time: n(),
				title: Em(i),
				data: Am({ store: bm(t.$id) }, Tm(r)),
				groupId: Fm
			};
			i === Qp.patchFunction ? o.subtitle = "⤵️" : i === Qp.patchObject ? o.subtitle = "🧩" : r && !Array.isArray(r) && (o.subtitle = r.type), r && (o.data["rawEvent(s)"] = { _custom: {
				display: "DebuggerEvent",
				type: "object",
				tooltip: "raw DebuggerEvent[]",
				value: r
			} }), e.addTimelineEvent({
				layerId: km,
				event: o
			});
		}, {
			detached: !0,
			flush: "sync"
		});
		let r = t._hotUpdate;
		t._hotUpdate = pr((i) => {
			r(i), e.addTimelineEvent({
				layerId: km,
				event: {
					time: n(),
					title: "🔥 " + t.$id,
					subtitle: "HMR update",
					data: {
						store: bm(t.$id),
						info: bm("HMR update")
					}
				}
			}), e.notifyComponentUpdate(), e.sendInspectorTree(Q), e.sendInspectorState(Q);
		});
		let { $dispose: i } = t;
		t.$dispose = () => {
			i(), e.notifyComponentUpdate(), e.sendInspectorTree(Q), e.sendInspectorState(Q), e.getSettings().logStoreChanges && Z(`Disposed "${t.$id}" store 🗑`);
		}, e.notifyComponentUpdate(), e.sendInspectorTree(Q), e.sendInspectorState(Q), e.getSettings().logStoreChanges && Z(`"${t.$id}" store installed 🆕`);
	});
}
var Pm = 0, Fm;
function Im(e, t, n) {
	let r = t.reduce((t, n) => (t[n] = (/* @__PURE__ */ B(e))[n], t), {});
	for (let t in r) e[t] = function() {
		let i = Pm, a = n ? new Proxy(e, {
			get(...e) {
				return Fm = i, Reflect.get(...e);
			},
			set(...e) {
				return Fm = i, Reflect.set(...e);
			}
		}) : e;
		Fm = i;
		let o = r[t].apply(a, arguments);
		return Fm = void 0, o;
	};
}
function Lm({ app: e, store: t, options: n }) {
	if (!t.$id.startsWith("__hot:")) {
		if (t._isOptionsAPI = !!n.state, !t._p._testing) {
			Im(t, Object.keys(n.actions), t._isOptionsAPI);
			let e = t._hotUpdate;
			(/* @__PURE__ */ B(t))._hotUpdate = function(n) {
				e.apply(this, arguments), Im(t, Object.keys(n._hmrPayload.actions), !!t._isOptionsAPI);
			};
		}
		Nm(e, t);
	}
}
function Rm() {
	let e = Wt(!0), t = e.run(() => /* @__PURE__ */ gr({})), n = [], r = [], i = pr({
		install(e) {
			Yp(i), i._a = e, e.provide(Xp, i), e.config.globalProperties.$pinia = i, process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && qp && Mm(e, i), r.forEach((e) => n.push(e)), r = [];
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
	return process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && qp && typeof Proxy < "u" && i.use(Lm), i;
}
function zm(e, t) {
	for (let n in t) {
		let r = t[n];
		if (!(n in e)) continue;
		let i = e[n];
		Zp(i) && Zp(r) && !/* @__PURE__ */ V(r) && !/* @__PURE__ */ ur(r) ? e[n] = zm(i, r) : e[n] = r;
	}
	return e;
}
var Bm = () => {};
function Vm(e, t, n, r = Bm) {
	e.add(t);
	let i = () => {
		e.delete(t) && r();
	};
	return !n && Gt() && Kt(i), i;
}
function Hm(e, ...t) {
	e.forEach((e) => {
		e(...t);
	});
}
var Um = (e) => e(), Wm = Symbol(), Gm = Symbol();
function Km(e, t) {
	e instanceof Map && t instanceof Map ? t.forEach((t, n) => e.set(n, t)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
	for (let n in t) {
		if (!t.hasOwnProperty(n)) continue;
		let r = t[n], i = e[n];
		Zp(i) && Zp(r) && e.hasOwnProperty(n) && !/* @__PURE__ */ V(r) && !/* @__PURE__ */ ur(r) ? e[n] = Km(i, r) : e[n] = r;
	}
	return e;
}
var qm = process.env.NODE_ENV === "production" ? Symbol() : Symbol("pinia:skipHydration");
function Jm(e) {
	return !Zp(e) || !Object.prototype.hasOwnProperty.call(e, qm);
}
var { assign: Ym } = Object;
function Xm(e) {
	return !!(/* @__PURE__ */ V(e) && e.effect);
}
function Zm(e, t, n, r) {
	let { state: i, actions: a, getters: o } = t, s = n.state.value[e], c;
	function l() {
		!s && (process.env.NODE_ENV === "production" || !r) && (n.state.value[e] = i ? i() : {});
		let t = process.env.NODE_ENV !== "production" && r ? /* @__PURE__ */ xr((/* @__PURE__ */ gr(i ? i() : {})).value) : /* @__PURE__ */ xr(n.state.value[e]);
		return Ym(t, a, Object.keys(o || {}).reduce((r, i) => (process.env.NODE_ENV !== "production" && i in t && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${i}" in store "${e}".`), r[i] = pr(wc(() => {
			Yp(n);
			let t = n._s.get(e);
			return o[i].call(t, t);
		})), r), {}));
	}
	return c = Qm(e, l, t, n, r, !0), c;
}
function Qm(e, t, n = {}, r, i, a) {
	let o, s = Ym({ actions: {} }, n);
	/* istanbul ignore if */
	if (process.env.NODE_ENV !== "production" && !r._e.active) throw Error("Pinia destroyed");
	let c = { deep: !0 };
	/* istanbul ignore else */
	process.env.NODE_ENV !== "production" && (c.onTrigger = (e) => {
		/* istanbul ignore else */
		l ? p = e : l == 0 && !S._hotUpdating && (Array.isArray(p) ? p.push(e) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
	});
	let l, u, d = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), p, m = r.state.value[e];
	!a && !m && (process.env.NODE_ENV === "production" || !i) && (r.state.value[e] = {});
	let h = /* @__PURE__ */ gr({}), g;
	function _(t) {
		let n;
		l = u = !1, process.env.NODE_ENV !== "production" && (p = []), typeof t == "function" ? (t(r.state.value[e]), n = {
			type: Qp.patchFunction,
			storeId: e,
			events: p
		}) : (Km(r.state.value[e], t), n = {
			type: Qp.patchObject,
			payload: t,
			storeId: e,
			events: p
		});
		let i = g = Symbol();
		ni().then(() => {
			g === i && (l = !0);
		}), u = !0, Hm(d, n, r.state.value[e]);
	}
	let v = a ? function() {
		let { state: e } = n, t = e ? e() : {};
		this.$patch((e) => {
			Ym(e, t);
		});
	} : process.env.NODE_ENV === "production" ? Bm : () => {
		throw Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
	};
	function y() {
		o.stop(), d.clear(), f.clear(), r._s.delete(e);
	}
	let b = (t, n = "") => {
		if (Wm in t) return t[Gm] = n, t;
		let i = function() {
			Yp(r);
			let n = Array.from(arguments), a = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
			function s(e) {
				a.add(e);
			}
			function c(e) {
				o.add(e);
			}
			Hm(f, {
				args: n,
				name: i[Gm],
				store: S,
				after: s,
				onError: c
			});
			let l;
			try {
				l = t.apply(this && this.$id === e ? this : S, n);
			} catch (e) {
				throw Hm(o, e), e;
			}
			return l instanceof Promise ? l.then((e) => (Hm(a, e), e)).catch((e) => (Hm(o, e), Promise.reject(e))) : (Hm(a, l), l);
		};
		return i[Wm] = !0, i[Gm] = n, i;
	}, x = /*#__PURE__*/ pr({
		actions: {},
		getters: {},
		state: [],
		hotState: h
	}), ee = {
		_p: r,
		$id: e,
		$onAction: Vm.bind(null, f),
		$patch: _,
		$reset: v,
		$subscribe(t, n = {}) {
			let i = Vm(d, t, n.detached, () => a()), a = o.run(() => Qi(() => r.state.value[e], (r) => {
				(n.flush === "sync" ? u : l) && t({
					storeId: e,
					type: Qp.direct,
					events: p
				}, r);
			}, Ym({}, c, n)));
			return i;
		},
		$dispose: y
	}, S = /* @__PURE__ */ ar(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && qp ? Ym({
		_hmrPayload: x,
		_customProperties: pr(/* @__PURE__ */ new Set())
	}, ee) : ee);
	r._s.set(e, S);
	let C = (r._a && r._a.runWithContext || Um)(() => r._e.run(() => (o = Wt()).run(() => t({ action: b }))));
	for (let t in C) {
		let o = C[t];
		/* @__PURE__ */ V(o) && !Xm(o) || /* @__PURE__ */ ur(o) ? (process.env.NODE_ENV !== "production" && i ? h.value[t] = /* @__PURE__ */ wr(C, t) : a || (m && Jm(o) && (/* @__PURE__ */ V(o) ? o.value = m[t] : Km(o, m[t])), r.state.value[e][t] = o), process.env.NODE_ENV !== "production" && x.state.push(t)) : typeof o == "function" ? (C[t] = process.env.NODE_ENV !== "production" && i ? o : b(o, t), process.env.NODE_ENV !== "production" && (x.actions[t] = o), s.actions[t] = o) : process.env.NODE_ENV !== "production" && Xm(o) && (x.getters[t] = a ? n.getters[t] : o, qp && (C._getters ||= pr([])).push(t));
	}
	if (Ym(S, C), Ym(/* @__PURE__ */ B(S), C), Object.defineProperty(S, "$state", {
		get: () => process.env.NODE_ENV !== "production" && i ? h.value : r.state.value[e],
		set: (e) => {
			/* istanbul ignore if */
			if (process.env.NODE_ENV !== "production" && i) throw Error("cannot set hotState");
			_((t) => {
				Ym(t, e);
			});
		}
	}), process.env.NODE_ENV !== "production" && (S._hotUpdate = pr((t) => {
		S._hotUpdating = !0, t._hmrPayload.state.forEach((e) => {
			if (e in S.$state) {
				let n = t.$state[e], r = S.$state[e];
				typeof n == "object" && Zp(n) && Zp(r) ? zm(n, r) : t.$state[e] = r;
			}
			S[e] = /* @__PURE__ */ wr(t.$state, e);
		}), Object.keys(S.$state).forEach((e) => {
			e in t.$state || delete S[e];
		}), l = !1, u = !1, r.state.value[e] = /* @__PURE__ */ wr(t._hmrPayload, "hotState"), u = !0, ni().then(() => {
			l = !0;
		});
		for (let e in t._hmrPayload.actions) {
			let n = t[e];
			S[e] = b(n, e);
		}
		for (let e in t._hmrPayload.getters) {
			let n = t._hmrPayload.getters[e];
			S[e] = a ? wc(() => (Yp(r), n.call(S, S))) : n;
		}
		Object.keys(S._hmrPayload.getters).forEach((e) => {
			e in t._hmrPayload.getters || delete S[e];
		}), Object.keys(S._hmrPayload.actions).forEach((e) => {
			e in t._hmrPayload.actions || delete S[e];
		}), S._hmrPayload = t._hmrPayload, S._getters = t._getters, S._hotUpdating = !1;
	})), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && qp) {
		let e = {
			writable: !0,
			configurable: !0,
			enumerable: !1
		};
		[
			"_p",
			"_hmrPayload",
			"_getters",
			"_customProperties"
		].forEach((t) => {
			Object.defineProperty(S, t, Ym({ value: S[t] }, e));
		});
	}
	return r._p.forEach((e) => {
		/* istanbul ignore else */
		if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && qp) {
			let t = o.run(() => e({
				store: S,
				app: r._a,
				pinia: r,
				options: s
			}));
			Object.keys(t || {}).forEach((e) => S._customProperties.add(e)), Ym(S, t);
		} else Ym(S, o.run(() => e({
			store: S,
			app: r._a,
			pinia: r,
			options: s
		})));
	}), process.env.NODE_ENV !== "production" && S.$state && typeof S.$state == "object" && typeof S.$state.constructor == "function" && !S.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${S.$id}".`), m && a && n.hydrate && n.hydrate(S.$state, m), l = !0, u = !0, S;
}
function $m(e, t, n) {
	let r, i = typeof t == "function";
	r = i ? n : t;
	function a(n, o) {
		let s = Yi();
		if (n = (process.env.NODE_ENV === "test" && Jp && Jp._testing ? null : n) || (s ? Ji(Xp, null) : null), n && Yp(n), process.env.NODE_ENV !== "production" && !Jp) throw Error("[🍍]: \"getActivePinia()\" was called but there was no active Pinia. Are you trying to use a store before calling \"app.use(pinia)\"?\nSee https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.\nThis will fail in production.");
		n = Jp, n._s.has(e) || (i ? Qm(e, t, r, n) : Zm(e, r, n), process.env.NODE_ENV !== "production" && (a._pinia = n));
		let c = n._s.get(e);
		if (process.env.NODE_ENV !== "production" && o) {
			let a = "__hot:" + e, s = i ? Qm(a, t, r, n, !0) : Zm(a, Ym({}, r), n, !0);
			o._hotUpdate(s), delete n.state.value[a], n._s.delete(a);
		}
		if (process.env.NODE_ENV !== "production" && qp) {
			let t = $s();
			if (t && t.proxy && !o) {
				let n = t.proxy, r = "_pStores" in n ? n._pStores : n._pStores = {};
				r[e] = c;
			}
		}
		return c;
	}
	return a.$id = e, a;
}
//#endregion
//#region src/state/damage-console/index.ts
var eh = $m("damageConsole", () => {
	let e = /* @__PURE__ */ gr("1d10"), t = /* @__PURE__ */ gr("roll"), n = /* @__PURE__ */ gr(!1), r = /* @__PURE__ */ gr(!1), i = /* @__PURE__ */ gr(!1), a = /* @__PURE__ */ gr(!0), o = /* @__PURE__ */ gr(""), s = /* @__PURE__ */ gr([]), c = /* @__PURE__ */ gr([]), l = /* @__PURE__ */ gr(null), u;
	function d(e, t) {
		s.value = e, u = t;
	}
	async function f() {
		if (!u || i.value) return;
		o.value = "";
		let d = re({
			damageFormula: e.value,
			hitLocation: t.value,
			ignoreArmour: n.value,
			ignoreToughness: r.value,
			minimumOne: a.value,
			targetUuids: s.value.map((e) => e.uuid),
			woundingType: l.value
		});
		if (c.value = T(d), !c.value.length) {
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
}), th = {
	key: 0,
	role: "alert",
	class: "tw:dui-alert tw:dui-alert-error tw:text-sm"
}, nh = { key: 0 }, rh = { class: "tw:dui-card tw:dui-card-border tw:dui-card-sm" }, ih = { class: "tw:dui-card-body" }, ah = { class: "tw:dui-card-title tw:text-base" }, oh = { class: "tw:grid tw:grid-cols-1 tw:gap-2 tw:sm:grid-cols-2" }, sh = ["src"], ch = { class: "tw:min-w-0 tw:truncate" }, lh = { class: "tw:grid tw:grid-cols-1 tw:gap-4 tw:md:grid-cols-2" }, uh = { class: "tw:dui-fieldset tw:min-w-0 tw:rounded-box tw:border tw:border-base-300 tw:p-4" }, dh = { class: "tw:dui-fieldset-legend" }, fh = {
	class: "tw:dui-label",
	for: "ech-damage-formula"
}, ph = { class: "tw:dui-label tw:whitespace-normal" }, mh = {
	class: "tw:dui-label",
	for: "ech-hit-location"
}, hh = ["value"], gh = {
	class: "tw:dui-label",
	for: "ech-wounding-type"
}, _h = ["value"], vh = { class: "tw:dui-label tw:whitespace-normal" }, yh = { class: "tw:dui-fieldset tw:min-w-0 tw:rounded-box tw:border tw:border-base-300 tw:p-4" }, bh = { class: "tw:dui-fieldset-legend" }, xh = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, Sh = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, Ch = { class: "tw:dui-label tw:cursor-pointer tw:justify-between tw:gap-4 tw:whitespace-normal" }, wh = {
	role: "alert",
	class: "tw:dui-alert tw:mt-2 tw:text-sm"
}, Th = { class: "tw:flex tw:justify-end tw:gap-2" }, Eh = ["disabled"], Dh = ["disabled"], Oh = /* @__PURE__ */ oa({
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
		let t = e, n = eh();
		n.initialize(t.targets, t.onPost);
		function r(e) {
			return t.localize(`WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.${e}`);
		}
		return (e, i) => (Ts(), As("form", {
			class: "tw:flex tw:flex-col tw:gap-4 tw:rounded-box tw:bg-base-100 tw:p-4 tw:text-base-content",
			onSubmit: i[7] ||= Ol((...e) => H(n).submit && H(n).submit(...e), ["prevent"])
		}, [
			H(n).validationErrors.length || H(n).runtimeError ? (Ts(), As("div", th, [i[8] ||= G("i", {
				class: "fa-solid fa-triangle-exclamation",
				"aria-hidden": "true"
			}, null, -1), G("div", null, [(Ts(!0), As(ys, null, Ma(H(n).validationErrors, (e) => (Ts(), As("p", { key: e }, F(r(`validation.${e}`)), 1))), 128)), H(n).runtimeError ? (Ts(), As("p", nh, F(H(n).runtimeError), 1)) : Ws("", !0)])])) : Ws("", !0),
			G("section", rh, [G("div", ih, [G("h2", ah, [i[9] ||= G("i", {
				class: "fa-solid fa-crosshairs",
				"aria-hidden": "true"
			}, null, -1), Us(" " + F(r("targets")), 1)]), G("div", oh, [(Ts(!0), As(ys, null, Ma(H(n).targets, (e) => (Ts(), As("div", {
				key: e.uuid,
				class: "tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:rounded-sm tw:bg-base-200 tw:p-2"
			}, [G("img", {
				src: e.img,
				alt: "",
				class: "tw:h-9 tw:w-9 tw:rounded-sm tw:object-cover"
			}, null, 8, sh), G("strong", ch, F(e.name), 1)]))), 128))])])]),
			G("div", lh, [G("fieldset", uh, [
				G("legend", dh, F(r("damageDetails")), 1),
				G("label", fh, F(r("damage")), 1),
				Gi(G("input", {
					id: "ech-damage-formula",
					"onUpdate:modelValue": i[0] ||= (e) => H(n).damageFormula = e,
					class: "tw:dui-input tw:w-full",
					name: "damageFormula",
					placeholder: "1d10",
					required: "",
					type: "text"
				}, null, 512), [[yl, H(n).damageFormula]]),
				G("p", ph, F(r("damageHint")), 1),
				G("label", mh, F(r("hitLocation")), 1),
				Gi(G("select", {
					id: "ech-hit-location",
					"onUpdate:modelValue": i[1] ||= (e) => H(n).hitLocation = e,
					class: "tw:dui-select tw:w-full",
					name: "hitLocation"
				}, [(Ts(!0), As(ys, null, Ma(t.hitLocationOptions, (e) => (Ts(), As("option", {
					key: e.value,
					value: e.value
				}, F(e.label), 9, hh))), 128))], 512), [[Sl, H(n).hitLocation]]),
				G("label", gh, F(r("woundingType")), 1),
				Gi(G("select", {
					id: "ech-wounding-type",
					"onUpdate:modelValue": i[2] ||= (e) => H(n).woundingType = e,
					class: "tw:dui-select tw:w-full",
					name: "woundingType"
				}, [(Ts(!0), As(ys, null, Ma(t.woundingTypeOptions, (e) => (Ts(), As("option", {
					key: e.value ?? "unspecified",
					value: e.value
				}, F(e.label), 9, _h))), 128))], 512), [[Sl, H(n).woundingType]]),
				G("p", vh, F(r("woundingTypeHint")), 1)
			]), G("fieldset", yh, [
				G("legend", bh, F(r("damageOptions")), 1),
				G("label", xh, [G("span", null, F(r("ignoreToughness")), 1), Gi(G("input", {
					"onUpdate:modelValue": i[3] ||= (e) => H(n).ignoreToughness = e,
					class: "tw:dui-checkbox",
					name: "ignoreToughness",
					type: "checkbox"
				}, null, 512), [[bl, H(n).ignoreToughness]])]),
				G("label", Sh, [G("span", null, F(r("ignoreArmour")), 1), Gi(G("input", {
					"onUpdate:modelValue": i[4] ||= (e) => H(n).ignoreArmour = e,
					class: "tw:dui-checkbox",
					name: "ignoreArmour",
					type: "checkbox"
				}, null, 512), [[bl, H(n).ignoreArmour]])]),
				G("label", Ch, [G("span", null, F(r("minimumOne")), 1), Gi(G("input", {
					"onUpdate:modelValue": i[5] ||= (e) => H(n).minimumOne = e,
					class: "tw:dui-checkbox",
					name: "minimumOne",
					type: "checkbox"
				}, null, 512), [[bl, H(n).minimumOne]])]),
				G("div", wh, [i[10] ||= G("i", {
					class: "fa-solid fa-circle-info",
					"aria-hidden": "true"
				}, null, -1), G("span", null, F(r("postHint")), 1)])
			])]),
			G("div", Th, [G("button", {
				class: "tw:dui-btn",
				type: "button",
				disabled: H(n).isPosting,
				onClick: i[6] ||= (...e) => t.onCancel && t.onCancel(...e)
			}, F(r("cancel")), 9, Eh), G("button", {
				class: "tw:dui-btn tw:dui-btn-primary",
				type: "submit",
				disabled: H(n).isPosting
			}, [G("i", {
				class: Et(H(n).isPosting ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-message"),
				"aria-hidden": "true"
			}, null, 2), Us(" " + F(r("post")), 1)], 8, Dh)])
		], 32));
	}
});
//#endregion
//#region src/module/wfrp4e/damage-console/posting.ts
async function kh(e) {
	Ah();
	let t = re(e), n = T(t);
	if (n.length) throw Error(game.i18n.localize(`WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.validation.${n[0]}`));
	let r = ie(t, await Promise.all(t.targetUuids.map(async (e) => (await De(e)).snapshot))), i = ve(r), a = game.wfrp4e?.utility?.chatDataSetup?.(i) ?? { content: i };
	return he(a, r), (await ChatMessage.create(a))?.id;
}
function Ah() {
	if (!game.user.isGM) throw Error(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.gmOnly"));
}
//#endregion
//#region src/module/apps/FoundryVueApplication.ts
var jh = class extends foundry.applications.api.ApplicationV2 {
	#e;
	getVueProps() {}
	async _renderHTML(e, t) {
		let n = document.createElement("div");
		return n.classList.add("wfrp4e-expanded-critical-hits-root"), n.dataset.theme = "wfrp4e-expanded-critical-hits", n;
	}
	_replaceHTML(e, t, n) {
		this.unmountVue(), t.classList.add("wfrp4e-expanded-critical-hits-app"), t.replaceChildren(e), this.#e = Ml(this.getVueComponent(), this.getVueProps() ?? {}), this.#e.use(Rm()), this.#e.mount(e);
	}
	async _preClose(e) {
		this.unmountVue(), await super._preClose(e);
	}
	unmountVue() {
		this.#e?.unmount(), this.#e = void 0;
	}
}, Mh = {
	body: "Body",
	head: "Head",
	lArm: "Left Arm",
	lLeg: "Left Leg",
	rArm: "Right Arm",
	rLeg: "Right Leg",
	roll: "Roll"
}, Nh = class extends jh {
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
		return Oh;
	}
	getVueProps() {
		return {
			hitLocationOptions: Ph(),
			localize: (e) => game.i18n.localize(e),
			onCancel: () => void this.close(),
			onPost: async (e) => {
				await kh(e), await this.close();
			},
			targets: this.#e,
			woundingTypeOptions: Fh()
		};
	}
};
function Ph() {
	return w.map((e) => ({
		label: game.i18n.localize(Mh[e]),
		value: e
	}));
}
function Fh() {
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
async function Ih() {
	if (!game.user.isGM) {
		ui.notifications?.warn(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.gmOnly"));
		return;
	}
	let e = Ee();
	if (!e.length) {
		ui.notifications?.warn(game.i18n.localize("WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.errors.targetsRequired"));
		return;
	}
	await new Nh(e).render(!0);
}
//#endregion
//#region src/module/wfrp4e/damage-console/scene-controls.ts
function Lh() {
	Hooks.on("getSceneControlButtons", (e) => {
		let t = e?.tokens?.tools;
		t && (t.expandedCriticalDamageConsole = {
			button: !0,
			icon: "fa-solid fa-bolt",
			name: "expandedCriticalDamageConsole",
			onClick: () => void Ih(),
			title: "WFRP4E_EXPANDED_CRITICAL_HITS.damageConsole.sceneControl",
			visible: game.user.isGM
		});
	});
}
//#endregion
//#region src/module/wfrp4e/damage-console/index.ts
var Rh = !1;
function zh() {
	Rh ||= (Re(), Lh(), !0);
}
//#endregion
//#region src/functions/critical-hits/damage-inference/index.ts
var Bh = {
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
}, Vh = {
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
function Hh(e) {
	if (e.explicitCategories.length > 0) return {
		categories: Jh(e.explicitCategories),
		matches: [],
		source: "explicit"
	};
	if (e.inferFromWeaponProperties) {
		let t = Kh(e.weaponPropertyKeys, e.weaponPropertyMapping);
		if (t.length > 0) return {
			categories: qh(t),
			matches: t,
			source: "weaponProperty"
		};
	}
	if (e.inferFromWeaponTypes) {
		let t = Kh(e.weaponTypeKeys, e.weaponTypeMapping);
		if (t.length > 0) return {
			categories: qh(t),
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
function Uh(e) {
	return e.trim().toLowerCase().replaceAll(/[^a-z0-9]/g, "");
}
function Wh(e) {
	let t = Gh(e), n = {};
	for (let [e, r] of Object.entries(t ?? {})) Xh(r) && (n[Uh(e)] = r);
	return n;
}
function Gh(e) {
	if (typeof e == "string") try {
		return Gh(JSON.parse(e));
	} catch {
		return;
	}
	if (typeof e == "object" && e && !Array.isArray(e)) return e;
}
function Kh(e, t) {
	let n = Wh(t), r = e.flatMap((e) => {
		let t = n[Uh(e)];
		return t && t !== "none" ? [{
			category: t,
			key: e
		}] : [];
	}), i = /* @__PURE__ */ new Set();
	return g.flatMap((e) => r.filter((t) => {
		let n = `${e}:${Uh(t.key)}`;
		return t.category !== e || i.has(n) ? !1 : (i.add(n), !0);
	}));
}
function qh(e) {
	return Jh(e.map((e) => e.category));
}
function Jh(e) {
	let t = new Set(e);
	return g.filter((e) => t.has(e));
}
function Yh(e) {
	return typeof e == "string" && g.includes(e);
}
function Xh(e) {
	return e === "none" || Yh(e);
}
//#endregion
//#region src/functions/critical-hits/natural-one-critical/index.ts
function Zh(e) {
	let t = Number(e.roll), n = Number(e.target);
	return t === 1 && t <= n;
}
//#endregion
//#region src/functions/critical-hits/table-keys.ts
function Qh(e, t, n) {
	return `ech-crit-${e}-${t}-${n}`.toLowerCase();
}
function $h(e) {
	let t = e.toLowerCase();
	if (t === "head" || t === "body") return t;
	if (t.endsWith("arm")) return "arm";
	if (t.endsWith("leg")) return "leg";
}
function eg(e) {
	return e ? "upInArms" : "core";
}
//#endregion
//#region src/module/settings.ts
var tg = "enableCriticalReplacement", ng = "enableNaturalOneCriticals", rg = "inferDamageFromWeaponProperties", ig = "inferDamageFromWeaponTypes", ag = "weaponPropertyDamageMapping", og = "weaponTypeDamageMapping", sg = JSON.stringify(Bh), cg = JSON.stringify(Vh), lg = JSON.stringify({
	hack: "cutting",
	impale: "piercing",
	pummel: "crushing",
	slash: "cutting"
});
function ug() {
	game.settings.register(e, n, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.debugConsoleLogging.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.debugConsoleLogging.hint",
		scope: "client",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, tg, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableCriticalReplacement.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, ng, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableNaturalOneCriticals.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.enableNaturalOneCriticals.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, rg, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponProperties.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponProperties.hint",
		scope: "world",
		config: !0,
		default: !0,
		type: Boolean
	}), game.settings.register(e, ag, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponPropertyDamageMapping.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponPropertyDamageMapping.hint",
		scope: "world",
		config: !1,
		default: sg,
		type: String
	}), game.settings.register(e, ig, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponTypes.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.inferDamageFromWeaponTypes.hint",
		scope: "world",
		config: !0,
		default: !1,
		type: Boolean
	}), game.settings.register(e, og, {
		name: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponTypeDamageMapping.name",
		hint: "WFRP4E_EXPANDED_CRITICAL_HITS.settings.weaponTypeDamageMapping.hint",
		scope: "world",
		config: !1,
		default: cg,
		type: String
	}), r(`${e} | Settings registered`, bg());
}
function dg() {
	return !!game.settings.get(e, tg);
}
function fg() {
	return !!game.settings.get(e, ng);
}
async function pg() {
	if (!game.user.isGM) {
		r(`${e} | Skipping mapping setting normalization for non-GM user.`);
		return;
	}
	r(`${e} | Normalizing stored mapping settings.`), await vg(ag, sg), await vg(og, cg), r(`${e} | Mapping settings normalized`, bg());
}
function mg() {
	return !!game.settings.get(e, rg);
}
function hg() {
	return !!game.settings.get(e, ig);
}
function gg() {
	return Wh(game.settings.get(e, ag));
}
function _g() {
	return Wh(game.settings.get(e, og));
}
async function vg(t, n) {
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
	t === "weaponPropertyDamageMapping" && yg(i, lg) && (r(`${e} | Upgrading untouched weapon property mapping defaults`, { key: t }), await game.settings.set(e, t, n));
}
function yg(e, t) {
	return JSON.stringify(Wh(e)) === t;
}
function bg() {
	return {
		debugConsoleLogging: Sg(n),
		enableCriticalReplacement: Sg(tg),
		enableNaturalOneCriticals: Sg(ng),
		inferDamageFromWeaponProperties: Sg(rg),
		inferDamageFromWeaponTypes: Sg(ig),
		weaponPropertyDamageMapping: xg(ag),
		weaponTypeDamageMapping: xg(og)
	};
}
function xg(e) {
	let t = Sg(e);
	return {
		key: e,
		type: typeof t,
		value: t
	};
}
function Sg(t) {
	try {
		return game.settings.settings.has(`wfrp4e-expanded-critical-hits.${t}`) ? game.settings.get(e, t) : "<not registered>";
	} catch (e) {
		return `<error: ${e instanceof Error ? e.message : String(e)}>`;
	}
}
//#endregion
//#region src/module/wfrp4e/natural-one-critical.ts
var Cg = Symbol.for(`${e}.naturalOneCriticalPatch`), wg = {
	installed: !1,
	message: "Natural 1 critical patch has not run."
};
function Tg() {
	return { ...wg };
}
function Eg() {
	let t = game.wfrp4e?.rolls;
	if (!t?.TestWFRP) {
		Ng(!1, "WFRP4e roll classes were not available.");
		return;
	}
	let n = Dg(t.TestWFRP), r = Og([t.WeaponTest, t.TraitTest]);
	wg = {
		installed: n,
		message: n ? `Natural 1 critical patch installed. Attack wrappers installed: ${r}.` : "TestWFRP.isCriticalFumble could not be patched."
	}, n || a(`${e} | ${wg.message}`);
}
function Dg(e) {
	let t = e.prototype;
	if (Mg(t).isCriticalFumble) return !0;
	let n = Object.getOwnPropertyDescriptor(t, "isCriticalFumble");
	return n?.get ? (Object.defineProperty(t, "isCriticalFumble", {
		configurable: n.configurable,
		enumerable: n.enumerable,
		get() {
			return kg(this) ? "critical" : n.get?.call(this);
		}
	}), jg(t, "isCriticalFumble"), !0) : !1;
}
function Og(e) {
	let t = 0;
	for (let n of e) {
		let e = n?.prototype;
		if (!e || Mg(e).computeProperties) continue;
		let r = e.computeProperties;
		r && (e.computeProperties = function(...e) {
			kg(this) && Ag(this);
			let t = r.apply(this, e);
			return kg(this) && Ag(this), t;
		}, jg(e, "computeProperties"), t += 1);
	}
	return t;
}
function kg(e) {
	return fg() && Zh({
		roll: e.result?.roll,
		target: e.result?.target
	});
}
function Ag(e) {
	e.result && (e.result.color_green = !0, e.result.critical ||= game.i18n.localize("Critical"));
}
function jg(e, t) {
	let n = Mg(e);
	n[t] = !0, Object.defineProperty(e, Cg, {
		configurable: !0,
		value: n
	});
}
function Mg(e) {
	return Object.prototype.hasOwnProperty.call(e, Cg) ? Reflect.get(e, Cg) : {};
}
function Ng(t, n) {
	wg = {
		installed: t,
		message: n
	}, a(`${e} | ${n}`);
}
//#endregion
//#region src/module/api/create-module-api.ts
function Pg() {
	return {
		getExpandedCriticalsCompendiumStatus: f,
		getNaturalOneCriticalPatchStatus: Tg,
		launchDamageConsole: Ih,
		postDamageConsoleCard: kh
	};
}
//#endregion
//#region src/module/api/register-module-api.ts
function Fg() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let t = game.modules.get(e);
	if (!t) throw Error(`Foundry module registry entry was not found for ${e}.`);
	t.api = Pg();
}
//#endregion
//#region src/module/wfrp4e/critical-replacement/debug.ts
function Ig(e) {
	return {
		criticalLocation: e.criticalLocation,
		messageId: e.messageId,
		returnResult: e.returnResult,
		sourceItemUuid: e.sourceItemUuid
	};
}
function Lg(e) {
	let t = Rg(e);
	if (t) return {
		id: t.id,
		name: t.name,
		type: t.type,
		uuid: t.uuid
	};
}
function Rg(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/critical-replacement/failure.ts
function zg(t, n, r) {
	return o(`${e} | ${t}`, r), ui.notifications?.error(t), [
		"<div class=\"wfrp4e chat-card\">",
		"<h3>Expanded Critical Hit Failed</h3>",
		`<p>${Bg(t)}</p>`,
		`<p><strong>Table:</strong> ${Bg(n)}</p>`,
		"</div>"
	].join("");
}
function Bg(e) {
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
function Vg(e, t) {
	if (!Wg(e)) return;
	let n = t.criticalLocation;
	if (e.type !== "critical" || typeof n != "string") return e;
	let r = e.toObject, i = Item?.implementation;
	if (typeof r != "function" || typeof i != "function") return e;
	let a = r.call(e), o = Hg(Hg(a, "system"), "location"), s = game.wfrp4e?.config?.locations ?? {};
	return o.key = n, o.value = s[n] ?? n, new i(a);
}
function Hg(e, t) {
	let n = Ug(e[t]);
	if (n) return n;
	let r = {};
	return e[t] = r, r;
}
function Ug(e) {
	return typeof e == "object" && e ? e : void 0;
}
function Wg(e) {
	let t = e;
	return typeof t == "object" && !!t && typeof t.postItem == "function";
}
//#endregion
//#region src/module/wfrp4e/runtime-values.ts
function Gg(e) {
	return Array.isArray(e) ? e : [];
}
function $(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/quality-extraction.ts
function Kg(e) {
	let t = qg(e);
	return {
		explicitCategories: te(t),
		weaponPropertyKeys: t,
		weaponTypeKeys: Xg(e)
	};
}
function qg(e) {
	let t = $(e), n = $(t?.system), r = $(t?.properties), i = $(n?.properties), a = [$(r?.qualities), $(i?.qualities)], o = /* @__PURE__ */ new Set();
	for (let e of a) for (let t of Object.keys(e ?? {})) o.add(t);
	let s = Gg($(n?.qualities)?.value);
	for (let e of s) {
		let t = $(e), n = t?.name;
		typeof n == "string" && Jg(t) && o.add(n);
	}
	return [...o];
}
function Jg(e) {
	let t = e?.group;
	return Yg(t) ? e?.active === !0 : !0;
}
function Yg(e) {
	return typeof e == "number" ? Number.isFinite(e) : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e));
}
function Xg(e) {
	let t = $($(e)?.system), n = /* @__PURE__ */ new Set();
	for (let e of [
		t?.weaponGroup,
		t?.group,
		t?.weaponType,
		t?.weaponClass,
		t?.ammunitionGroup,
		t?.ammoGroup,
		t?.category
	]) Zg(e, n);
	return [...n];
}
function Zg(e, t) {
	if (typeof e == "string") {
		t.add(e);
		return;
	}
	if (Array.isArray(e)) {
		for (let n of e) Zg(n, t);
		return;
	}
	let n = $(e);
	if (n) for (let e of [
		"key",
		"id",
		"name",
		"label",
		"value",
		"type"
	]) Zg(n[e], t);
}
//#endregion
//#region src/module/wfrp4e/damage-category-resolution.ts
function Qg(e) {
	let t = Kg(e);
	return {
		clues: t,
		resolution: Hh({
			...t,
			inferFromWeaponProperties: mg(),
			inferFromWeaponTypes: hg(),
			weaponPropertyMapping: gg(),
			weaponTypeMapping: _g()
		})
	};
}
//#endregion
//#region src/module/wfrp4e/critical-replacement.ts
var $g = !1;
function e_() {
	if ($g) {
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
		let s = a_(t);
		if (!dg() || !s) return s && r(`${e} | Critical replacement fallthrough`, {
			table: t,
			reason: "replacement disabled",
			options: Ig(a)
		}), i(t, a, o);
		let c = r_(t, a), l = me(a.messageId), u, d, f, p = l?.category;
		if (r(`${e} | Critical replacement inspecting WFRP critical roll`, {
			table: t,
			location: c,
			options: Ig(a)
		}), !p) {
			try {
				u = await i_(a);
			} catch (e) {
				return zg("Expanded Critical Hits could not resolve the critical source item. See the browser console for details.", t, e);
			}
			let e = Qg(u);
			d = e.clues, f = e.resolution, p = ne(e.resolution.categories);
		}
		if (r(`${e} | Critical replacement damage category resolution`, {
			table: t,
			location: c,
			sourceItem: Lg(u),
			categoryClues: d,
			categoryResolution: f,
			chosenCategory: p,
			damageConsoleSource: l,
			inferFromWeaponProperties: mg(),
			inferFromWeaponTypes: hg()
		}), !c || !p) return r(`${e} | Critical replacement fallthrough`, {
			table: t,
			reason: c ? "damage category unavailable" : "location unavailable"
		}), i(t, a, o);
		let m = eg(!!game.settings.get("wfrp4e", "uiaCrits")), h = Qh(m, p, c);
		if (!n(h)) return zg(`Expanded Critical Hits table ${h} is missing from the module compendium.`, h);
		r(`${e} | Critical replacement rolling expanded table`, {
			table: t,
			expandedTableKey: h,
			ruleset: m,
			category: p,
			location: c
		});
		try {
			let e = await t_(h, a, o);
			if (e !== void 0) return e;
		} catch (e) {
			return zg(`Expanded Critical Hits could not roll ${h}. See the browser console for details.`, h, e);
		}
		return zg(`Expanded Critical Hits could not use WFRP's RollTable API for ${h}.`, h);
	}, $g = !0, r(`${e} | Critical replacement patch installed.`);
}
async function t_(e, t, n) {
	let r = game.wfrp4e?.tables?.rollTable;
	if (typeof r != "function") return;
	let i = await r.call(game.wfrp4e.tables, e, t, n);
	if (await n_(i, t)) return null;
	let a = o_(i);
	return t.returnResult ? i : a?.result;
}
async function n_(t, n) {
	let i = o_(o_(t)?.object)?.documentUuid;
	if (typeof i != "string") return r(`${e} | Expanded critical result had no document UUID`, { result: t }), !1;
	let a = Vg(await fromUuid(i), n);
	if (!a) throw Error(`Could not resolve expanded critical item ${i}.`);
	return r(`${e} | Posting expanded critical item`, {
		documentUuid: i,
		messageId: n.messageId,
		criticalLocation: n.criticalLocation
	}), await a.postItem(void 0, { "flags.wfrp4e.sourceMessageId": n.messageId }), !0;
}
function r_(e, t) {
	let n = t.criticalLocation;
	return $h(typeof n == "string" ? n : e.replace(/^crit/i, ""));
}
async function i_(e) {
	let t = e.sourceItemUuid;
	if (typeof t == "string") return await fromUuid(t);
	let n = e.messageId;
	if (typeof n != "string") return;
	let r = o_(o_(game.messages.get(n)?.system)?.test), i = o_(r?.preData);
	return r?.item ?? r?.weapon ?? i?.item;
}
function a_(e) {
	return /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function o_(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/support.ts
var s_ = "ech-wounding-properties", c_ = new Set(Object.values(y));
function l_(e) {
	let t = { ...e };
	for (let e of _) t[y[e]] = x[e];
	return t;
}
function u_(e) {
	return h_(e) || g_(e);
}
function d_(e) {
	return e?.type === "spell" || e?.type === "prayer";
}
function f_(e) {
	let t = Gg($($(e?.system)?.qualities)?.value), n = [];
	for (let e of t) {
		let t = $(e)?.name;
		if (typeof t != "string") continue;
		let r = y_(t);
		r && n.push(x[r]);
	}
	return n;
}
function p_(e) {
	if (!(typeof e != "object" || !e)) return e;
}
function m_(e) {
	if (typeof e != "object" || !e) return;
	let t = e;
	if (!(t.qualities !== void 0 && !Array.isArray(t.qualities))) return t;
}
function h_(e) {
	return e?.type === "weapon" || e?.type === "ammunition" || e?.system?.isWeapon === !0;
}
function g_(e) {
	return (e?.type === "spell" || e?.type === "prayer") && __(e.system);
}
function __(e) {
	let t = $(e?.damage), n = $(e?.magicMissile);
	return v_(t?.value) || v_(t?.dice) || t?.addSL === !0 || n?.value === !0;
}
function v_(e) {
	return typeof e == "number" ? e !== 0 : typeof e == "string" && e.trim().length > 0;
}
function y_(e) {
	return _.find((t) => y[t] === e);
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/actions.ts
var b_ = `.${s_}__sheet-row a[data-ech-action="configureProperties"]`, x_ = /* @__PURE__ */ new Map(), S_ = !1;
function C_() {
	S_ ||= (document.addEventListener("click", D_, !0), !0);
}
function w_(e) {
	return e?.uuid;
}
function T_(e, t) {
	x_.set(e, t);
}
function E_(e) {
	let t = A_();
	!e || !t || new t(e).render(!0);
}
function D_(e) {
	let t = O_(e.target);
	t && (e.preventDefault(), e.stopPropagation(), k_(t));
}
function O_(e) {
	if (e instanceof Element) return e.closest(b_) ?? void 0;
}
async function k_(e) {
	let t = e.closest(`.${s_}__sheet-row`)?.dataset.echItemUuid;
	if (!t) return;
	let n = await fromUuid(t);
	if (!M_(n)) return;
	let r = x_.get(t);
	if (r) {
		r(n);
		return;
	}
	E_(n);
}
function A_() {
	let e = game.wfrp4e?.apps?.ItemProperties;
	if (j_(e)) return e;
}
function j_(e) {
	return typeof e == "function";
}
function M_(e) {
	return typeof e == "object" && !!e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/actor-sheet.ts
var N_ = /* @__PURE__ */ new WeakSet();
function P_(e, t) {
	if (!(t instanceof HTMLElement)) return;
	let n = F_(t, "combat"), r = F_(t, "trappings");
	n && (I_(n), L_(e, n)), r && (R_(e, r), !N_.has(r) && (new MutationObserver(() => {
		R_(e, r);
	}).observe(r, {
		childList: !0,
		subtree: !0
	}), N_.add(r)));
}
function F_(e, t) {
	return e.matches(`section[data-tab="${t}"]`) ? e : e.querySelector(`section[data-tab="${t}"]`) ?? void 0;
}
function I_(e) {
	let t = new Set(Object.values(x)), n = e.querySelectorAll(".item-property-row a[data-action=\"itemPropertyDropdown\"][data-type=\"qualities\"]");
	for (let e of n) t.has(e.textContent.trim()) && e.classList.add("ech-wounding-property-combat-text");
}
function L_(e, t) {
	let n = t.querySelectorAll(".list-row[data-uuid] .item-property-row:not([data-ech-inference-checked=\"true\"])");
	for (let t of n) {
		t.dataset.echInferenceChecked = "true";
		let n = V_(e, t);
		if (W_(n)) for (let e of n.categories) t.append(G_("combat", e, n));
	}
}
function R_(e, t) {
	z_(t), B_(e, t);
}
function z_(e) {
	let t = new Set(Object.values(x)), n = e.querySelectorAll(".tags .tag:not(.ech-inferred-damage-type)");
	for (let e of n) t.has(e.textContent.trim()) && e.classList.add("ech-wounding-property-trappings-badge");
}
function B_(e, t) {
	let n = t.querySelectorAll(".list-row[data-uuid] .tags:not([data-ech-inference-checked=\"true\"])");
	for (let t of n) {
		t.dataset.echInferenceChecked = "true";
		let n = V_(e, t);
		if (W_(n)) for (let e of n.categories) t.append(G_("trappings", e, n));
	}
}
function V_(t, n) {
	let i = n.closest(".list-row[data-uuid]")?.dataset.uuid;
	if (i) try {
		let n = H_(t, i);
		if (!U_(n)) {
			r(`${e} | Inferred damage display skipped for ${i}: item unavailable or unsupported.`);
			return;
		}
		let a = Qg(n).resolution;
		return r(`${e} | Inferred damage display resolved ${i}: source=${a.source} categories=${a.categories.join(",") || "none"}`), a;
	} catch (t) {
		r(`${e} | Could not display inferred damage type`, {
			error: t,
			uuid: i
		});
		return;
	}
}
function H_(e, t) {
	let n = $(e), r = $(($(n?.actor) ?? $(n?.document))?.items), i = r?.get, a = t.split(".").at(-1);
	if (!(typeof i != "function" || !a)) return i.call(r, a);
}
function U_(e) {
	let t = $(e), n = $(t?.system);
	return t?.type === "weapon" || t?.type === "ammunition" || n?.isWeapon === !0;
}
function W_(e) {
	return e?.source === "weaponProperty" || e?.source === "weaponType";
}
function G_(e, t, n) {
	let r = document.createElement(e === "combat" ? "span" : "div"), i = K_(t, n.source, n.matches);
	return r.classList.add("ech-inferred-damage-type", `ech-inferred-damage-type--${e}`), e === "trappings" && r.classList.add("tag"), r.dataset.echDamageCategory = t, r.dataset.tooltip = i, r.setAttribute("aria-label", i), r.textContent = b[t], r;
}
function K_(e, t, n) {
	let r = n.filter((t) => t.category === e).map((e) => q_(e.key, t)), i = t === "weaponProperty" ? "item property" : "weapon type";
	return r.length > 0 ? `Inferred from ${r.join(", ")}` : `Inferred from ${i}`;
}
function q_(e, t) {
	if (t === "weaponProperty") {
		let t = game.wfrp4e?.utility?.qualityList?.() ?? {}, n = Uh(e);
		for (let [e, r] of Object.entries(t)) if (Uh(e) === n || Uh(r) === n) return r;
	}
	return e.replaceAll(/([a-z])([A-Z])/g, "$1 $2").replaceAll(/[_-]+/g, " ").trim().replaceAll(/\b\w/g, (e) => e.toUpperCase());
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/debug.ts
function J_(e) {
	if (!(typeof e != "object" || !e)) return e.constructor?.name;
}
function Y_(e) {
	if (e) return {
		id: e.id,
		name: e.name,
		type: e.type,
		uuid: e.uuid
	};
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/sheet-box.ts
function X_(e, t, n) {
	let r = document.createElement("div");
	r.classList.add("attribute-box", "top-label", `${s_}__sheet-row`);
	let i = w_(n);
	i && (r.dataset.echItemUuid = i, T_(i, Q_(e, n)));
	let a = document.createElement("div");
	a.classList.add("label"), a.style.gridColumn = "1 / span 12", a.innerHTML = "<label><a data-ech-action=\"configureProperties\">Damage Type <i class=\"fas fa-cog\"></i></a></label>";
	let o = document.createElement("div");
	o.classList.add("field"), o.style.gridColumn = "1 / span 12";
	let s = document.createElement("input");
	return s.type = "text", s.value = t.join(","), s.readOnly = !0, o.append(s), r.append(a, o), Z_(r, n), r;
}
function Z_(e, t) {
	e.querySelector("a[data-ech-action=\"configureProperties\"]")?.addEventListener("click", (e) => {
		e.preventDefault(), E_(t);
	});
}
function Q_(e, t) {
	return $_(e) || ((e) => {
		E_(e ?? t);
	});
}
function $_(e) {
	if (typeof e != "object" || !e) return;
	let t = e.constructor?.DEFAULT_OPTIONS?.actions?.configureProperties;
	if (typeof t == "function") return (e) => {
		t.call({ document: e });
	};
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/sheet.ts
function ev(t) {
	if (!(t instanceof HTMLElement)) {
		r(`${e} | ItemProperties render hook skipped: element is not HTMLElement`, { elementType: typeof t });
		return;
	}
	let n = t.querySelector(".property-column");
	if (!n) {
		r(`${e} | ItemProperties render hook skipped: quality column not found.`);
		return;
	}
	let i = nv(n);
	if (i.length === 0) {
		r(`${e} | ItemProperties render hook found no damage type rows`, { checkboxCount: n.querySelectorAll("input[type=\"checkbox\"]").length });
		return;
	}
	r(`${e} | Grouping ItemProperties damage type rows`, { woundingRowCount: i.length });
	let a = n.querySelector(`.${s_}`), o = a ?? document.createElement("div");
	a || (o.classList.add(s_), o.append(rv()));
	for (let e of i) o.append(e);
	let s = n.querySelector("input[name=\"custom-quality\"]")?.parentElement;
	if (s) {
		s.before(o);
		return;
	}
	n.append(o);
}
function tv(t, n) {
	if (!(n instanceof HTMLElement)) {
		r(`${e} | Item sheet render hook skipped: element is not HTMLElement`, {
			applicationName: J_(t),
			elementType: typeof n
		});
		return;
	}
	let i = p_(t), a = i?.document ?? i?.item;
	if (!u_(a)) {
		r(`${e} | Item sheet render hook skipped: unsupported document`, {
			applicationName: J_(t),
			document: Y_(a)
		});
		return;
	}
	r(`${e} | Item sheet render hook inspecting supported document`, {
		applicationName: J_(t),
		document: Y_(a)
	});
	let o = av(n);
	if (!o) {
		r(`${e} | Item sheet qualities box not found; trying standalone damage row`, { document: Y_(a) }), iv(t, n, a);
		return;
	}
	let s = o.querySelector(".field input");
	if (!s) {
		r(`${e} | Item sheet qualities input not found`, { document: Y_(a) });
		return;
	}
	let c = ov(s.value);
	if (c.wounding.length === 0) {
		r(`${e} | Item sheet qualities contain no damage type labels`, {
			document: Y_(a),
			displayedQualities: s.value
		});
		return;
	}
	r(`${e} | Splitting item sheet damage type labels into their own row`, {
		document: Y_(a),
		normalQualities: c.normal,
		woundingQualities: c.wounding
	}), s.value = c.normal.join(","), o.parentElement?.querySelector(`.${s_}__sheet-row`)?.remove(), o.after(X_(t, c.wounding, a));
}
function nv(e) {
	let t = e.querySelectorAll("input[type=\"checkbox\"]"), n = [];
	for (let e of t) {
		if (!c_.has(e.name)) continue;
		let t = e.closest(".form-group");
		t && n.push(t);
	}
	return n;
}
function rv() {
	let e = document.createElement("h2");
	return e.classList.add("property-header", `${s_}__header`), e.textContent = "Damage Type", e;
}
function iv(t, n, i) {
	if (!d_(i)) {
		r(`${e} | Standalone damage type row skipped: unsupported document`, { document: Y_(i) });
		return;
	}
	if (n.querySelector(".ech-wounding-properties__sheet-row")) {
		r(`${e} | Standalone damage type row skipped: row already exists`, { document: Y_(i) });
		return;
	}
	let a = sv(n);
	if (!a) {
		r(`${e} | Standalone damage type row skipped: damage fieldset not found`, { document: Y_(i) });
		return;
	}
	let o = f_(i);
	r(`${e} | Appending standalone damage type row`, {
		document: Y_(i),
		labels: o
	}), a.after(X_(t, o, i));
}
function av(e) {
	let t = e.querySelectorAll("a[data-action=\"configureProperties\"]");
	for (let e of t) if (e.textContent.trim().startsWith("Qualities")) return e.closest(".attribute-box") ?? void 0;
}
function ov(e) {
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
function sv(e) {
	let t = e.querySelectorAll("fieldset");
	for (let e of t) if (e.querySelector("legend")?.textContent.trim() === "Damage") return e;
}
//#endregion
//#region src/module/wfrp4e/wounding-properties/display.ts
var cv = !1, lv = Symbol.for(`${e}.woundingPropertiesContextPatched`);
function uv() {
	if (C_(), pv(), cv) {
		r(`${e} | Wounding property display hooks already installed.`);
		return;
	}
	Hooks.on("renderItemProperties", (e, t) => {
		ev(t);
	}), Hooks.on("renderApplicationV2", (e, t) => {
		tv(e, t), P_(e, t), fv(e) && dv(e);
	}), Hooks.on("renderBaseWFRP4eActorSheet", (e, t) => {
		P_(e, t), dv(e);
	}), cv = !0, r(`${e} | Wounding property display hooks installed.`);
}
function dv(t, n = 5) {
	typeof t != "object" || !t || requestAnimationFrame(() => {
		let i = t.element;
		if (i instanceof HTMLElement && i.isConnected) {
			r(`${e} | Styling committed WFRP actor sheet with ${i.querySelectorAll(".item-property-row").length} property rows.`), P_(t, i);
			return;
		}
		if (n > 1) {
			dv(t, n - 1);
			return;
		}
		r(`${e} | Committed WFRP actor sheet element was unavailable.`);
	});
}
function fv(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e.actor;
	return typeof t == "object" && !!t;
}
function pv() {
	let t = mv()?.prototype, n = t?._prepareContext;
	if (!t || !n) {
		r(`${e} | ItemProperties context patch skipped: application unavailable.`);
		return;
	}
	if (hv(n)) {
		r(`${e} | ItemProperties context patch already installed.`);
		return;
	}
	let i = async function(...e) {
		let t = this.document;
		u_(t) && (this.qualities = l_(this.qualities ?? {}));
		let r = await n.apply(this, e);
		return gv(this, r), r;
	};
	Object.defineProperty(i, lv, { value: !0 }), t._prepareContext = i, r(`${e} | ItemProperties context patch installed.`);
}
function mv() {
	let e = game.wfrp4e?.apps?.ItemProperties;
	return typeof e == "function" ? e : void 0;
}
function hv(e) {
	return !!e[lv];
}
function gv(t, n) {
	let i = p_(t), a = m_(n), o = i?.document;
	if (!i || !a || !u_(o)) {
		r(`${e} | Skipping ItemProperties damage type context append`, {
			applicationName: _v(t),
			hasItemProperties: !!i,
			hasRenderContext: !!a,
			document: vv(o),
			supportsDamageTypeProperties: u_(o)
		});
		return;
	}
	r(`${e} | Appending damage types to ItemProperties context`, {
		applicationName: _v(t),
		document: vv(o),
		originalQualityCount: Object.keys(i.qualities ?? {}).length,
		renderedQualityCount: a.qualities?.length ?? 0
	}), i.qualities = l_(i.qualities ?? {}), a.qualities ??= [];
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
		document: vv(o),
		renderedQualityCount: a.qualities.length
	});
}
function _v(e) {
	if (!(typeof e != "object" || !e)) return e.constructor?.name;
}
function vv(e) {
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
var yv = !1;
function bv() {
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
	}), xv(), uv();
}
function xv() {
	let t = game.wfrp4e?.utility, n = t?.qualityList;
	if (yv || !t || !n) {
		r(`${e} | Quality list patch skipped`, {
			qualityListPatchInstalled: yv,
			hasUtility: !!t,
			hasOriginalQualityList: !!n
		});
		return;
	}
	t.qualityList = function(e) {
		let t = n.call(this, e);
		return e === "armor" ? t : l_(t);
	}, yv = !0, r(`${e} | Quality list patch installed.`);
}
//#endregion
//#region src/module/wfrp4e/zero-wound-critical-links.ts
var Sv = "data-ech-source-item-uuid", Cv = "data-ech-critical-location", wv = !1;
function Tv() {
	wv ||= (Ev(), document.addEventListener("click", Av, !0), !0);
}
function Ev() {
	let e = CONFIG.Actor?.documentClass?.prototype, t = e?.applyDamage;
	typeof t != "function" || !e || (e.applyDamage = async function(e, n = {}) {
		let r = await t.call(this, e, n), i = Dv(n);
		return typeof r != "string" || !i || !r.includes("critical-roll") ? r : kv(r, i, Ov(n));
	});
}
function Dv(e) {
	let t = Iv(Iv(e.sourceTest)?.item), n = Iv(Iv(Iv(e.opposedTest)?.attackerTest)?.item), r = Iv(e.sourceItem), i = t?.uuid ?? n?.uuid ?? r?.uuid;
	return typeof i == "string" ? i : void 0;
}
function Ov(e) {
	let t = Iv(Iv(e.opposedTest)?.result)?.hitloc, n = Iv(t)?.value, r = e.loc, i;
	return typeof n == "string" ? i = n : typeof r == "string" && (i = r), i && $h(i) ? i : void 0;
}
function kv(e, t, n) {
	let r = [`${Sv}="${Fv(t)}"`, n ? `${Cv}="${Fv(n)}"` : void 0].filter(Boolean).join(" ");
	return e.replaceAll(/<a\b(?![^>]*\bdata-ech-source-item-uuid=)(?=[^>]*\bcritical-roll\b)/g, `<a ${r}`);
}
function Av(e) {
	let t = e.target;
	if (!(t instanceof Element) || !dg()) return;
	let n = t.closest(`[data-action="clickTable"][${Sv}]`);
	!(n instanceof HTMLElement) || !Pv(n.dataset.table) || (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), jv(n).catch((e) => {
		Mv("Expanded Critical Hits could not roll an annotated zero-wound critical. See the browser console for details.", e);
	}));
}
async function jv(e) {
	let t = e.dataset.table, n = game.wfrp4e?.tables?.formatChatRoll;
	if (!t || typeof n != "function") return;
	let r = e.closest("[data-message-id]")?.dataset.messageId, i = Number.parseInt(e.dataset.modifier ?? "0", 10) || 0, a = await n(t, {
		criticalLocation: e.dataset.echCriticalLocation ?? Nv(r),
		messageId: r,
		modifier: i,
		showRoll: !0,
		sourceItemUuid: e.dataset.echSourceItemUuid
	}, e.dataset.column);
	if (typeof a != "string" || a.length === 0) return;
	let o = game.wfrp4e?.utility?.chatDataSetup, s = typeof o == "function" ? o("", game.settings.get("core", "rollMode"), !0) : { content: "" };
	s.content = a, await ChatMessage.create(s);
}
function Mv(t, n) {
	o(`${e} | ${t}`, n), ui.notifications?.error(t);
}
function Nv(e) {
	if (!e) return;
	let t = Iv(Iv(Iv(game.messages.get(e)?.system)?.test)?.result)?.hitloc, n = Iv(t)?.result;
	return typeof n == "string" ? n : void 0;
}
function Pv(e) {
	return typeof e == "string" && /^crit(?:head|body|arm|leg|larm|rarm|lleg|rleg)$/i.test(e);
}
function Fv(e) {
	return e.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function Iv(e) {
	return typeof e == "object" && e ? e : void 0;
}
//#endregion
//#region src/module/hooks/register-module-hooks.ts
function Lv() {
	Hooks.once("init", () => {
		i(`${e} | Initializing`), ug(), r(`${e} | init hook running`, {
			foundryVersion: game.version,
			systemId: game.system?.id,
			userIsGM: game.user?.isGM
		}), uv(), zh(), bv();
	}), Hooks.once("ready", () => {
		Rv();
	});
}
async function Rv() {
	if (r(`${e} | ready hook running`, {
		foundryVersion: game.version,
		systemId: game.system?.id,
		userIsGM: game.user?.isGM,
		settings: bg(),
		wfrpConfigAvailable: !!game.wfrp4e?.config,
		wfrpTablesAvailable: !!game.wfrp4e?.tables
	}), game.system.id !== "wfrp4e") {
		a(`${e} | Loaded outside ${t}; skipping WFRP integration.`);
		return;
	}
	Fg(), await pg(), r(`${e} | ready hook after mapping normalization`, { settings: bg() }), bv(), await d(), Eg(), e_(), Tv(), i(`${e} | Ready`);
}
//#endregion
//#region src/main.ts
Lv();
//#endregion

//# sourceMappingURL=wfrp4e-expanded-critical-hits.mjs.map