<template>
  <v-dialog v-model="show" scrollable max-width="500px" transition="dialog-transition">
    <v-card>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title class="font-weight-light">User Profile</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="yellow darken-3" fab small @click="isEditing = !isEditing">
          <v-icon v-if="isEditing">mdi-close</v-icon>
          <v-icon v-else>mdi-pencil</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-text-field v-model="user.firstName" label="First name" :disabled="!isEditing"></v-text-field>
        <v-text-field v-model="user.lastName" label="Last name" :disabled="!isEditing"></v-text-field>
        <v-text-field v-model="user.nickname" label="Company name" :disabled="!isEditing"></v-text-field>
        <v-text-field v-model="user.email" label="Email" :disabled="!isEditing"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="onSave" :disabled="!isEditing">save</v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click="show=false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import showStatusToast from "@/components/mixin/showStatusToast";

export default {
  name: "UserSettingsModal",

  mixins: [showStatusToast],

  props: ["visible"],

  async mounted() {
    try {
      await this.fetchAuthenticatedUser();
      let user = this.getAuthenticatedUser;
      this.user.firstName = user.firstName;
      this.user.lastName = user.lastName;
      this.user.nickname = user.nickname;
      this.user.email = user.email;
    } catch (error) {
      this.showErrorMessage(error.message);
    }
  },

  data() {
    return {
      user: {},
      isEditing: false
    };
  },

  computed: {
    ...mapGetters("auth", ["getAuthenticatedUser"]),

    show: {
      get() {
        return this.visible;
      },
      set() {
        this.isEditing = false;
        this.$emit("close");
      }
    }
  },

  methods: {
    ...mapActions("auth", ["fetchAuthenticatedUser", "updateProfile"]),

    async onSave() {
      try {
        console.log(this.user);
        await this.updateProfile(this.user);
        this.showSuccessMessage("Profile updated");
      } catch (error) {
        this.showErrorMessage(error.message);
      }
      this.show = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>