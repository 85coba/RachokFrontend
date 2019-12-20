<template>
  <v-app light>
    <div>
      <v-toolbar class="white" flat>
        <v-app-bar-nav-icon to='/home'><img src="./assets/logo.jpg" alt="Vuetify.js" height="60px"></v-app-bar-nav-icon>
        <v-toolbar-title class="mx-0"></v-toolbar-title>
        <p>Beta</p>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text>Open jobs</v-btn>
          <v-btn 
            text 
            class="lighten-3"
            v-if="!isLoggedIn"
            to ="/auth/sign-in"
          >
            Sign In
          </v-btn>
        </v-toolbar-items>
    </v-toolbar>

      <v-content>
        <router-view/>  
      </v-content>
      
    <Loading></Loading>
    </div>
  </v-app>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';
import { USER_LOGOUT } from './store/modules/auth/mutationTypes';
import { EventEmitter, TOKEN_EXPIRED_EVENT } from './services/EventEmitter';
import Loading from './components/common/Loading';
import Navibar from './components/common/Navibar';


export default {
  name: 'App',

  components: {
    Loading,
    Navibar
  },

  created() {
    EventEmitter.$on(TOKEN_EXPIRED_EVENT, () => {
            this.logout();
            this.$router.push({ name: 'auth.signIn' });
        });
  },

  computed: {
        ...mapGetters([
            'isLoading'
        ]),
        ...mapGetters('auth', [
            'isLoggedIn',
        ]),
  },

   methods: {
    ...mapMutations('auth', {
      logout: USER_LOGOUT
    }),
   }
}
</script>


