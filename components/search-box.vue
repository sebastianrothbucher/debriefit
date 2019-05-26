<template>
<div>
    <label><input type="search" size="50" v-model="search"/></label>
    <div v-for="ll in filteredList" :key="ll.i.id">{{ll.t}}</div><!-- TODO: quick add -->
</div>
</template>
<script>
module.exports = {
    props: ['tree'],
    data: () => ({
        search: '',
    }),
    computed: {
        lookupList() {
            res = [];
            const proc = (i, prev = null) => { // depth-first tree (i.e. read along fully expanded)
                const t = (prev ? (prev + '>') : '') + i.t;
                res = [...res, {t, i}];
                (i.c || []).forEach(ii => proc(ii, t));
            };
            proc(this.tree); // (root item)
            return res;
        },
        filteredList() { // match all parts in order (case-insensitive; no further sort so far - might be limited / sliced)
            if (!this.search.trim()) {
                return []; // needs at least sth
            }
            const searchParts = this.search.trim().split(/\s+/g);
            const matchRemain = (t, p) => {
                const currPos = t.toLowerCase().indexOf(p[0].toLowerCase());
                if ((currPos >= 0) && (p.length > 1)) {
                    return matchRemain(t.substring(currPos+p[0].length), p.slice(1));
                } else {
                    return (currPos >= 0);
                }
            };
            return this.lookupList.filter(l => matchRemain(l.t, searchParts));
        },
    },
    methods: { // TODO: event on choose
    },
};
</script>