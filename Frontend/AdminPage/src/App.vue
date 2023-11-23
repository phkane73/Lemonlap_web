<template>
  <div class="container-fluid">
    <div class="row">
      <RouterView />
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    auth() {
      if (sessionStorage.getItem("id") == null) {
        this.$router.push("/")
      }
    },
  },
  created() {
    this.auth()
  }
}
</script>