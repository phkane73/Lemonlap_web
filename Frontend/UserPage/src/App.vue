<template>
  <Header v-if="this.$route.path != '/login' && this.$route.path != '/register'"></Header>
  <RouterView />
  <Footer v-if="this.$route.path != '/login' && this.$route.path != '/register'"></Footer>
</template>

<script>
import Header from "./components/header.vue"
import Footer from "./components/footer.vue"
export default {
  components: {
    Header,
    Footer
  },
  methods: {
    scroll() {
      window.scroll({
        top: 0
      })
    },
  },
  created() {
    this.scroll()
  }
}

</script>