<template lang="pug">
  v-card
    v-card-title Folder: {{folderName}}
    v-card-text
      v-text-field(
        v-model="folderName"
        label="Enter folder name"
        :error-messages="folderNameErrors"
        @input="$v.folderName.$touch()"
        @blur="$v.folderName.$touch()"
      )
    v-card-actions
      v-btn.ml-2(@click="createFolder" color="primary") Create
      v-btn(@click="cancel") Cancel
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    folderName: { required, minLength: minLength(3) }
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
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
        errors.push("Directory name must be at least 3 characters");
      !this.$v.folderName.required && errors.push("Required field");
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
