<template>
<div :style="{marginLeft: (indent > 0 ? '10px' : null)}">
    <div>{{i.t || '-'}} <span v-for="(ss, ii) in latestStatus" :key="ii" :title="ss.t" :style="{fontSize: '70%'}">{{ss.s || ss.t}}</span></div>
    <div v-for="(tt, ii) in debriefTexts" :key="ii" :style="{fontStyle: 'italic', fontSize: 'small'}">{{tt}}</div>
    <tree-item v-for="cc in (i.c || [])" :key="cc.id" :i="cc" 
        :indent="indent+1" :debriefs="debriefs" :symbols="symbols"/>
</div>
</template>
<script>
module.exports = {
    props: ['i', 'indent', 'debriefs', 'symbols'],
    data: () => ({
    }),
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