<template lang="pug">
	v-app(light)
		toolbar
		menu-panel
		v-content
			v-container(fluid id="container")
				router-view
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //
    };
  }
};
</script>
