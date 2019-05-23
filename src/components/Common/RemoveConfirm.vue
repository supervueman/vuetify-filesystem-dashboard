<template lang="pug">
	v-flex
		v-card
			v-card-title.title Do you really want to delete {{name}}?
			v-card-actions
				v-btn.ml-2(color="error" @click="remove") Delete
				v-btn(color="primary" @click="cancel") Cancel
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ""
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    remove() {
      this.$emit("remove");
      this.$emit("update:isActive", false);
    },
    cancel() {
      this.$emit("update:isActive", false);
    }
  }
};
</script>
