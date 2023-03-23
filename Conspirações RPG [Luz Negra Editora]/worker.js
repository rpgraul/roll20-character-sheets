<script type="text/worker">(function () {
    "use strict";
    "use strict";
    on("clicked:rest", function() {
        setAttrs( {
            bruises_x1: 0, bruises_x2:0, madness_x1:0, resilience:0
        }
        )
    }
    ), on("clicked:recover", function() {
        setAttrs( {
            bruises_x1: 0, bruises_x2:0, wounds_x3:0, wounds_x6:0, madness_x1:0, resilience:0
        }
        )
    }
    ), on("clicked:damage_dice_1", function() {
        setAttrs( {
            damage_dice: 1
        }
        )
    }
    ), on("clicked:damage_dice_2", function() {
        setAttrs( {
            damage_dice: 2
        }
        )
    }
    ), on("clicked:damage_dice_3", function() {
        setAttrs( {
            damage_dice: 3
        }
        )
    }
    ), on("clicked:close_options", function() {
        setAttrs( {
            options_toggle: 0
        }
        )
    }
    );
    var calculateAbilityMod=function(t) {
        return t<4?-2: t<7?-1:t<14?0:t<18?1:2
    }
    ;
    function numberArrowIncrement(t, e) {
        getAttrs([t, "".concat(t, "_max"), "".concat(t, "_min")], function(n) {
            var c;
            setAttrs(((c= {}
            )[t]=Math.max(Math.min((parseInt(n[t])||0)+e, parseInt(n["".concat(t, "_max")])||100), parseInt(n["".concat(t, "_min")])||0), c))
        }
        )
    }
    function setAdvSkillsLines(t) {}
    function startActionRoll(t, e) {
        var n=t.ability, c=t.difficulty, o=t.title, i=t.useExtra, s=t.template, r=void 0===s?"ability": s;
        myStartRoll(r, {
            title:null !==o&&void 0 !==o?o:"Action Roll", charname:"@{character_name}"
        }
        , i? {
            difficulty:"".concat(null !==c&&void 0 !==c?c:"@{ability_difficulty}"), successes: "".concat(n, "d10"), setback:"0", extra_successes:"0"
        }
        : {
            difficulty:"".concat(null !==c&&void 0 !==c?c:"@{ability_difficulty}"), successes: "".concat(n, "d10")
        }
        , e)
    }
    function processActionRoll(t) {
        var e=t.successes.dice.map(function(t) {
            return 10===t?2: t>7?1:0
        }
        ).reduce(function(t, e) {
            return t+e
        }
        , 0);
        return {
            successes: e, difficulty:t.difficulty.result, setback:t.successes.dice[0], extra_successes:e-t.difficulty.result
        }
    }
    function rollActionDice(t, e, n, c, o, i) {
        void 0===n&&(n="Action Roll"), void 0===c&&(c= !0), void 0===o&&(o= !0), void 0===i&&(i="ability"), startActionRoll( {
            ability: t, difficulty:e, title:n, useExtra:c, template:i
        }
        , function(t) {
            var e=t.rollId, n=t.results, c=processActionRoll(n);
            finishRoll(e, c), o&&setAttrs( {
                last_roll: btoa(JSON.stringify(n))
            }
            )
        }
        )
    }
    function myStartRoll(t, e, n, c) {
        startRoll("&{template:".concat(t, "} ").concat(Object.entries(e).map(function(t) {
            var e=t[0], n=t[1];
            return"{{".concat(e, "=").concat(n, "}}")
        }
        ).join(" "), " ").concat(Object.entries(n).map(function(t) {
            var e=t[0], n=t[1];
            return"{{".concat(e, "=[[").concat(n, "]]}}")
        }
        ).join(" ")), c)
    }
    function showHideAbility(t, e) {
        e<4?$20(".".concat(t, "-4, .").concat(t, "-5")).addClass("hidden"): e<5?($20(".".concat(t, "-5")).addClass("hidden"), $20(".".concat(t, "-4")).removeClass("hidden")):$20(".".concat(t, "-4, .").concat(t, "-5")).removeClass("hidden")
    }
    function showHideDents(t) {
        $20([2, 3, 4, 5, 6].filter(function(e) {
            return e<=t
        }
        ).map(function(t) {
            return".dented-".concat(t)
        }
        ).join(", ")).removeClass("hidden"), $20([2, 3, 4, 5, 6].filter(function(e) {
            return e>t
        }
        ).map(function(t) {
            return".dented-".concat(t)
        }
        ).join(", ")||"this-does-not-exist").addClass("hidden")
    }
    function showHideResilience(t) {
        $20([2, 4, 6, 8, 10].filter(function(e) {
            return e<=t
        }
        ).map(function(t) {
            return".resilience-".concat(t)
        }
        ).join(", ")).removeClass("hidden"), $20([2, 4, 6, 8, 10].filter(function(e) {
            return e>t
        }
        ).map(function(t) {
            return".resilience-".concat(t)
        }
        ).join(", ")||"this-does-not-exist").addClass("hidden")
    }
    function toggleActiveTab(t) {
        $20(".header .tabs label").removeClass("active"), $20(".header .tabs .tab-".concat(t)).addClass("active")
    }
    $20(".decrement").on("click", function(t) {
        numberArrowIncrement(t.htmlAttributes.class.split(" ")[0], -1)
    }
    ), $20(".increment").on("click", function(t) {
        numberArrowIncrement(t.htmlAttributes.class.split(" ")[0], 1)
    }
    ), $20(".decrement2").on("click", function(t) {
        numberArrowIncrement(t.htmlAttributes.class.split(" ")[0], -2)
    }
    ), $20(".increment2").on("click", function(t) {
        numberArrowIncrement(t.htmlAttributes.class.split(" ")[0], 2)
    }
    ), $20(".number-input-arrows input").on("change", function(t) {
        numberArrowIncrement(t.htmlAttributes.name.slice(5), 0)
    }
    ), $20(".advskills textarea").on("change", function(t) {
        setAdvSkillsLines(t.htmlAttributes.id)
    }
    ), on("sheet:opened", function() {
        return[0, 1, 2, 3, 4, 5, 6, 7].forEach(function(t) {
            return setAdvSkillsLines("advskill_".concat(t, "_name"))
        }
        )
    }
    ), ["strength", "toughness", "insight"].map(function(t) {
        return on("change:".concat(t), function(t) {
            return showHideAbility(t.sourceAttribute, parseInt(t.newValue))
        }
        )
    }
    ), [0, 1, 2, 3, 4, 5].map(function(t) {
        return on("change:skill_custom_".concat(t), function(t) {
            var e;
            return parseInt(t.newValue)<1&&setAttrs(((e= {}
            )["".concat(t.sourceAttribute)]=1, e))
        }
        )
    }
    ), [0, 1, 2, 3, 4, 5].map(function(t) {
        return on("change:skill_advskill_".concat(t, "_value"), function(t) {
            var e;
            return parseInt(t.newValue)<1&&setAttrs(((e= {}
            )["".concat(t.sourceAttribute)]=1, e))
        }
        )
    }
    ), on("change:armor_max_dents", function(t) {
        return showHideDents(parseInt(t.newValue))
    }
    ), on("change:armor_max_resilience", function(t) {
        return showHideResilience(parseInt(t.newValue)||0)
    }
    ), on("change:tab", function(t) {
        return toggleActiveTab(t.newValue)
    }
    ), on("sheet:opened", function(t) {
        var e=["strength", "toughness", "insight"];
        getAttrs(e, function(t) {
            e.forEach(function(e) {
                return showHideAbility(e, parseInt(t[e]))
            }
            )
        }
        ), getAttrs(["armor_max_dents", "armor_max_resilience"], function(t) {
            showHideDents(parseInt(t.armor_max_dents)), showHideResilience(parseInt(t.armor_max_resilience))
        }
        ), getAttrs(["tab"], function(t) {
            return toggleActiveTab(t.tab)
        }
        ), [0, 1, 2, 3, 4, 5].map(function(t) {
            return getAttrs(["skill_custom_".concat(t)], function(e) {
                var n;
                return parseInt(e["skill_custom_".concat(t)])<1&&setAttrs(((n= {}
                )["skill_custom_".concat(t)]=1, n))
            }
            )
        }
        ), [0, 1, 2, 3, 4, 5].map(function(t) {
            return getAttrs(["skill_advskill_".concat(t, "_value")], function(e) {
                var n;
                return parseInt(e["skill_advskill_".concat(t, "_value")])<1&&setAttrs(((n= {}
                )["skill_advskill_".concat(t, "_value")]=1, n))
            }
            )
        }
        )
    }
    ), on("clicked:roll_action_dice", function(t) {
        return rollActionDice(parseInt(t.htmlAttributes.value||"1")||1)
    }
    ), on("clicked:roll_damage_h_l", function() {
        myStartRoll("damage", {
            title:"DAMAGE", dice:"H+L", charname:"@{character_name}"
        }
        , {
            damage: "3d6"
        }
        , function(t) {
            var e=t.rollId, n=t.results;
            finishRoll(e, {
                roll:n.damage.dice.sort().filter(function(t, e) {
                    return 1 !=e
                }
                ).reduce(function(t, e) {
                    return t+e
                }
                , 0)
            }
            )
        }
        )
    }
    ), on("clicked:roll_doom_roll5", function() {
        getAttrs(["doom_points"], function(t) {
            var e=t.doom_points;
            (parseInt(e)||0)>0&&(setAttrs( {
                doom_points: parseInt(e)-1
            }
            ), rollActionDice(5, void 0, "ACTION ROLL 5"))
        }
        )
    }
    ), on("clicked:roll_doom_reroll", function() {
        getAttrs(["last_roll", "doom_points"], function(t) {
            if(t.last_roll)if((parseInt(t.doom_points)||0)<1)console.log("Not enough Doom Points!");
            else {
                setAttrs( {
                    doom_points: parseInt(t.doom_points)-1
                }
                );
                var e=JSON.parse(atob(t.last_roll)), n=processActionRoll(e);
                startActionRoll( {
                    ability:e.successes.dice.filter(function(t) {
                        return t<8
                    }
                    ).length, difficulty:e.difficulty.result, title:"Action Reroll", useExtra: !0
                }
                , function(t) {
                    var e=t.rollId, c=t.results, o=processActionRoll(c);
                    finishRoll(e, {
                        successes: n.successes+o.successes, setback:n.setback>7?n.setback:o.setback, extra_successes:n.successes+o.successes-c.difficulty.result
                    }
                    )
                }
                )
            }
            else console.log("You must roll something before you can reroll it!")
        }
        )
    }
    ), on("clicked:doom_roll", function() {
        getAttrs(["doom_points"], function(t) {
            var e=t.doom_points;
            rollActionDice(parseInt(e)||0, 2, "Doom Roll",  !1,  !1, "doom")
        }
        )
    }
    );
}

)();
</script>