<template>
<div class="tree-item" :style="{marginLeft: (indent > 0 ? '10px' : null)}">
    <div tabindex="0" ref="myself" class="tree-item-title">
        {{i.t || '-'}} <span v-for="(ss, ii) in latestStatus" :key="ii" :title="ss.t" class="tree-item-title-status">{{ss.s || ss.t}}</span>
    </div>
    <div v-if="debriefTexts.length>0" class="tree-item-debriefs">
        <div v-for="(tt, ii) in debriefTexts" :key="ii">{{tt}}</div><!-- TODO: hide on no focus / hover; TODO: reverse (newest top) -->
    </div>
    <div class="tree-item-children">
        <tree-item v-for="cc in (i.c || [])" :key="cc.id" :i="cc" 
            :indent="indent+1" :debriefs="debriefs" :symbols="symbols" :selected="selected"></tree-item>
    </div>
</div>
</template>
<script>
module.exports = {
    props: ['i', 'indent', 'debriefs', 'symbols', 'selected'],
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
        matchingDebriefLines() { // carry fw texts if need be, return l(ines) w/ debrief ID
            return this.debriefs.map(dd => {
                const foundLine = dd.l.filter(dl => dl.tid === this.i.id)[0]; // (only one matches)
                return foundLine ? {_debriefId: dd.id, ...foundLine} : null;
            }).filter(dl => (!!dl));
        },
        latestStatus() {
            return (([...this.matchingDebriefLines].pop() || {}).status || [])
                .map(ss => (this.symbols[ss] || {t: ss}));
        },
        debriefTexts() {
            return this.matchingDebriefLines.map(dl => dl.t);
        },
    },
    methods: {
    },
};
</script>