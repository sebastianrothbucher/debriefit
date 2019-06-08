<template>
<div class="search-box" style="position: relative" @focusin="startShow" @focusout="startHide">
    <label class="search-box matter-textfield-standard"><input type="search" size="50" v-model="search" @focus="selectedLine=-1" @keyup.down="moveSelect(+1, $event)" @keyup.up="moveSelect(-1, $event)" @keyup.enter="selectedLine>=0 && (filteredList.length-1)>=selectedLine && selectItem(filteredList[selectedLine])" placeholder=" "/><span title="find">🔍</span></label>
    <div v-if="optionsShown && filteredList.length>0" class="search-box-list" style="position: absolute; top: 100%; left: 0; ">
        <div :class="{'virtual-focus': selectedLine===ii}" tabindex="0" class="link" v-for="(ll, ii) in filteredList" :key="ll.i.id" @click="selectItem(ll)" @keyup.enter="selectItem(ll.i)">{{ll.t}}</div><!-- TODO: quick add -->
    </div>
</div>
</template>
<script>
module.exports = {
    props: ['tree', 'keepSel'],
    data: () => ({
        search: '',
        selectedLine: -1,
        optionsShown: false,
        blurTimeout: null, 
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
    methods: {
        moveSelect(dir, evnt) {
            evnt.preventDefault();
            this.selectedLine += dir;
        },
        selectItem(ll) {
            this.search = this.keepSel ? ll.t : '';
            this.optionsShown = false;
            this.$emit('selected', ll.i);
        },
        startShow() {
            clearTimeout(this.blurTimeout);
            this.optionsShown = true;
        },
        startHide() {
            this.blurTimeout = setTimeout(() => { // tab = blur & new focus
                this.optionsShown = false;
            }, 100);
        },
    },
};
</script>