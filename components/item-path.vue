<script>
module.exports = {
    props: ['i', 'tree'],
    render() {
        const renderIfMatch = (ii, prev = null) => {
            const t = (prev ? (prev + '>') : '') + ii.t;
            if (ii.id === this.i.id) {
                return this._v(t);
            }
            return (ii.c || []).reduce((prev, iii) => (prev ? prev : renderIfMatch(iii, t)), null);
        };
        return renderIfMatch(this.tree) || this._v(this.i.t); // root item or just text
    },
};
</script>