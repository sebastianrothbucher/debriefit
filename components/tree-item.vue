<template>
<div class="tree-item" :style="{marginLeft: (indent > 0 ? '10px' : null)}">
    <div tabindex="0" ref="myself" class="tree-item-title">
        <span v-if="collapsed[i.id]" @click="$emit('expanded', i)" class="link little-symbol" :style="{'visibility': (hasChildren ? null : 'hidden')}" title="expand">➡️</span>
        <span v-if="!collapsed[i.id]" @click="$emit('collapsed', i)" class="link little-symbol" :style="{'visibility': (hasChildren ? null : 'hidden')}" title="collapse">↘️</span>
        {{i.t || '-'}} <span v-for="(ss, ii) in latestStatus" :key="ii" :title="ss.t" class="tree-item-title-status little-symbol">{{ss.s || ss.t}}</span>
        <span class="link little-symbol focus-only" title="add">➕</span><!-- TODO: call dialog for debrief / children -->
    </div>
    <div v-if="hasDebriefs" class="tree-item-debriefs">
        <div v-for="(tt, ii) in debriefTexts" :key="ii">{{tt}}</div><!-- TODO: hide on no focus / hover -->
    </div>
    <div v-if="(!collapsed[i.id]) && hasChildren" class="tree-item-children">
        <tree-item v-for="cc in (i.c || [])" :key="cc.id" :i="cc" 
            :indent="indent+1" :debriefs="debriefs" :symbols="symbols" :collapsed="collapsed" :selected="selected"
            @collapsed="$emit('collapsed', $event)" @expanded="$emit('expanded', $event)"></tree-item>
    </div>
</div>
</template>
<script>
module.exports = {
    props: ['i', 'indent', 'debriefs', 'symbols', 'collapsed', 'selected'],
    data: () => ({
    }),
    watch: {
        selected(curr) {
            if (curr === this.i) {
                this.$nextTick(() => this.$refs.myself.focus());
            }
        },
    },
    computed: {
        matchingDebriefLines() {
            return this.debriefs.map(dd => {
                const foundLine = dd.l.filter(dl => dl.tid === this.i.id)[0]; // (only one matches)
                return foundLine ? {_debriefId: dd.id, _t: dd.t, ...foundLine} : null;
            }).filter(dl => (!!dl));
        },
        latestStatus() {
            return (([...this.matchingDebriefLines].pop() || {}).status || [])
                .map(ss => (this.symbols[ss] || {t: ss}));
        },
        debriefTexts() {
            return this.matchingDebriefLines.map(dl => dl._t).reverse();
        },
        hasDebriefs() {
            return this.debriefTexts.length > 0;
        },
        hasChildren() {
            return (this.i.c || []).length > 0;
        },
    },
    methods: {
    },
};
</script>