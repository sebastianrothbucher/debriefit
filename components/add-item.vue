<template>
<dialog ref="myself" class="add-item">
    <div v-if="hasPresetI">{{selI.t}}</div>
    <div v-if="!hasPresetI" style="margin-bottom: 10px">
        <search-box :tree="tree" :keep-sel="true" @selected="selectParent($event)"></search-box>
    </div>
    <div style="margin-bottom: 10px">
        <label class="add-item-title matter-textfield-standard"><input type="text" ref="txt" size="50" :disabled="!selI" v-model="newTitle" @keydown.meta.enter="addItem" placeholder=" "/><span>Title</span></label>
    </div>
    <div style="text-align: right; ">
        <button class="matter-button-outlined" @click="$refs.myself.close()">Cancel</button>
        <button class="matter-button-contained" :disabled="!canCreate" @click="addItem">Create</button>
    </div>
</dialog>
</template>
<script>
function uuid(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid)}; // thx, https://gist.github.com/jed/982883
module.exports = {
    props: ['i', 'tree'],
    data: () => ({
        selI: null,
        newTitle: '',
    }),
    watch: {
        i(curr, old) {
            if (curr && (curr !== old)) { // be VERY sure
                this.selI = curr;
            }
        },
    },
    computed: {
        hasPresetI() {
            return !!this.i;
        },
        canCreate() {
            return this.selI && this.newTitle.trim();
        },
    },
    methods: {
        showAdd() {
            this.newTitle = '';
            this.$refs.myself.showModal();
        },
        selectParent(i) {
            this.selI = i;
            this.$nextTick(() => this.$refs.txt.focus());
        },
        addItem() {
            if (!this.canCreate) { // could still happen with enter
                return;
            }
            this.$store.dispatch('addItem', {parent: this.selI, item: {
                id: uuid(),
                t: this.newTitle.trim(),
                c: [],
            }});
            this.$refs.myself.close();
        },
    },
};
</script>