<template lang="pug">
  v-card
    v-card-title Папка: {{folderName}}
    v-card-text
      v-text-field(
        v-model="folderName"
        label="Введите название папки"
        :error-messages="folderNameErrors"
        @input="$v.folderName.$touch()"
        @blur="$v.folderName.$touch()"
      )
    v-card-actions
      v-btn.ml-2(@click="createFolder" color="primary") Создать
      v-btn(@click="cancel") Отмена
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    folderName: { required, minLength: minLength(3) }
  },
  props: ["isActive"],
  data() {
    return {
      folderName: ""
    };
  },
  computed: {
    folderNameErrors() {
      const errors = [];
      if (!this.$v.folderName.$dirty) return errors;
      !this.$v.folderName.minLength &&
        errors.push("Название директории должно быть не менее 3 символов");
      !this.$v.folderName.required && errors.push("Обязательное поле");
      return errors;
    }
  },
  methods: {
    createFolder() {
      this.$v.$touch();
      if (this.$v.$error) {
        return;
      }
      this.$emit("createFolder", this.folderName);
      this.folderName = "";
    },
    cancel() {
      this.folderName = "";
      this.$emit("update:isActive", false);
    }
  }
};
</script>
