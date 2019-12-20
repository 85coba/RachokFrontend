<template>
  <v-container pa-0 fluid>
    <v-parallax
      height="800"
      src="../assets/background.jpg"
      jumbotron
    >
      <!-- <RequestForm/> -->
    </v-parallax>
  </v-container>
</template>

<script>
import RequestForm from '../components/home/RequestForm';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    RequestForm,
  },

  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('auth', ['isLoggedIn'])
  },
}
</script>

<style scoped>
.v-parallax__image {
  transform: none !important;
  width: 100% !important;
}
</style>
