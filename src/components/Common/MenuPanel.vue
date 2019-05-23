<template lang="pug">
  v-navigation-drawer(
    :mini-variant="mini"
    v-model="drawer"
    width="200"
    :hide-overlay="hide_overlay"
    fixed
    app
    mobile-break-point="600"
    stateless
  )
    v-toolbar(class="primary" dark)
      v-btn(@click.stop="mini = !mini" class="mr-1" flat fab small)
        v-icon menu
    v-list
      v-list-tile(to="/")
        v-list-tile-action
          v-icon(color="primary") folder
        v-list-tile-content
          v-list-tile-title Filesystem
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      mini: true,
      right: null,
      hide_overlay: true
    };
  }
};
</script>

<style lang="sass">
.theme--light.application
	.v-list__tile__action
		min-width: 48px
	.v-navigation-drawer--open
		.v-list__tile__action
			justify-content: center
</style>

