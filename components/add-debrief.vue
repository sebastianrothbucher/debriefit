<template>
<dialog ref="myself" class="add-debrief">
    <div v-if="hasPresetI">{{selI.t}}</div>
    <div v-if="!hasPresetI" style="margin-bottom: 10px">
        <search-box :tree="tree" :keep-sel="true" @selected="selectParent($event)"></search-box>
    </div>
    <div style="margin-bottom: 10px">
        <label class="add-debrief-content matter-textfield-standard"><textarea ref="txt" :disabled="!selI" v-model="newContent" @keydown.ctrl.enter="addDebrief" @keydown.meta.enter="addDebrief" placeholder=" " style="min-width: 420px; min-height: 150px;"></textarea><span>Debrief content</span></label>
    </div>
    <div style="text-align: right; ">
        <button class="matter-button-outlined" @click="$refs.myself.close()">Cancel</button>
        <button class="matter-button-contained" :disabled="!canCreate" @click="addDebrief">Create</button>
    </div>
</dialog>
</template>
<script>
function uuid(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid)}; // thx, https://gist.github.com/jed/982883
module.exports = {
    props: ['i', 'tree', 'debriefs'],
    data: () => ({
        selI: null,
        newContent: '',
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
            return this.selI && this.newContent.trim();
        },
    },
    methods: {
        showAdd() {
            this.newContent = '';
            this.$refs.myself.showModal();
        },
        selectParent(i) {
            this.selI = i;
            this.$nextTick(() => this.$refs.txt.focus());
        },
        addDebrief() {
            if (!this.canCreate) { // could still happen with enter
                return;
            }
            this.debriefs.push({
                id: uuid(),
                l: [
                    {
                        tid: this.selI.id,
                        t: this.newContent.trim(),
                        status: null, // TODO: inquire
                    },
                ], // TODO: several
            });
            this.$refs.myself.close();
        },
    },
};
</script>