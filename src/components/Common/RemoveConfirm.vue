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
  props: ["name", "isActive"],
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
