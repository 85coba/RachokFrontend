<template>
  <v-app light>
    <div>
      
      <Navibar></Navibar>
      <v-content>
        <router-view />
      </v-content>
      <Loading></Loading>
    </div>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { USER_LOGOUT } from "./store/modules/auth/mutationTypes";
import { EventEmitter, TOKEN_EXPIRED_EVENT } from "./services/EventEmitter";
import Loading from "./components/common/Loading";
import Navibar from "./components/common/Navibar";

export default {
  name: "App",

  components: {
    Loading,
    Navibar
  },

  created() {
    EventEmitter.$on(TOKEN_EXPIRED_EVENT, () => {
      this.logout();
      this.$router.push({ name: "auth.signIn" });
    });
  },

  computed: {
    ...mapGetters(["isLoading"]),
    ...mapGetters("auth", ["isLoggedIn"])
  },

  methods: {
    ...mapMutations("auth", {
      logout: USER_LOGOUT
    }),
    ...mapActions("auth", ["signOut"]),

    async onSignOut() {
      await this.signOut();
      this.$router.push({ name: "auth.signIn" });
    }
  }
};
</script>


