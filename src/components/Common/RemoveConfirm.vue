<template lang="pug">
	v-flex
		v-card
			v-card-title.title Вы действительно хотите удалить {{name}}?
			v-card-actions
				v-btn.ml-2(color="error" @click="remove") Удалить
				v-btn(color="primary" @click="cancel") Отмена
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
