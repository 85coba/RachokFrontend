<template>
  <div>
    <v-app-bar class="white" flat app clipped-left>
      <v-app-bar-nav-icon to="/home">
        <img src="../../assets/logo.jpg" alt="Vuetify.js" height="50px" />
      </v-app-bar-nav-icon>
      <v-toolbar-title>Rachok</v-toolbar-title>
      <v-app-bar-nav-icon v-if="$route.name === 'cabinet'" @click.native="drawer = ! drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>


      <language-switcher></language-switcher>
        <v-btn text class="lighten-3" v-if="!isLoggedIn" to="/auth/sign-in">
          <span class="mr-2">{{ $t('home.btn.sing_up')}}</span>
        </v-btn>
        <v-btn v-if="isLoggedIn" text @click="onSignOut()">
          <span class="mr-2">{{ $t('home.btn.sign_out')}}</span>
        </v-btn>
        <v-btn v-if="isLoggedIn && ($route.name !== 'cabinet')" text :to="{name: 'cabinet'}">
          <span class="mr-2">{{ $t('home.btn.cabinet')}}</span>
        </v-btn>
    
    </v-app-bar>
    <v-navigation-drawer v-if="isLoggedIn && ($route.name === 'cabinet')"  v-model="drawer" clipped app>
      <v-list>
        <template v-for="(item, i) in items">
          <v-layout row v-if="item.heading" align-center :key="i">
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
          </v-layout>
          <v-divider dark v-else-if="item.divider" class="my-3" :key="i"></v-divider>
          <v-list-item :key="i" v-else @click="onMenuClick(i)">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <SelectEquipmentModal
      v-if="isLoggedIn"
      :visible="equipmentModal"
      @close="equipmentModal = false"
    ></SelectEquipmentModal>
    <SelectRegionModal :visible="regionModal" @close="regionModal = false"></SelectRegionModal>
    <UserSettingsModal v-if="isLoggedIn" :visible="settingsModal" @close="settingsModal = false"></UserSettingsModal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  ORDERS_VIEW_TYPE,
  ORDERS_SET
} from "@/store/modules/order/mutationTypes";
import SelectEquipmentModal from "../cabinet/SelectEquipmentModal";
import SelectRegionModal from "../cabinet/SelectRegionModal";
import UserSettingsModal from "../cabinet/UserSettingsModal";
import LanguageSwitcher from '../common/LanguageSwitcher';
export default {
  name: "Navibar",
  components: {
    SelectRegionModal,
    SelectEquipmentModal,
    UserSettingsModal,
    LanguageSwitcher
  },

  data: () => ({
    drawer: true,
    regionModal: false,
    equipmentModal: false,
    settingsModal: false,
    items: [
      { icon: "mdi-home", text: "Home" },
      { divider: true },
      { icon: "mdi-format-list-bulleted", text: "Show all" },
      { icon: "mdi-check", text: "Show processed" },
      { icon: "mdi-plus", text: "Show unprocessed" },
      { icon: "mdi-delete", text: "Show removed" },
      { icon: "mdi-forklift", text: "Select equipments" },
      { icon: "mdi-map-marker", text: "Select region" },
      { divider: true },
      { icon: "mdi-settings", text: "Settings" }
    ]
  }),

  computed: {
    ...mapGetters("auth", ["isLoggedIn"]),
    ...mapGetters("order", {
      type: "typeView"
    })
  },

  methods: {
    ...mapActions("auth", ["signOut"]),
    ...mapActions("order", [
      "fetchProcessedOrders",
      "fetchUnProcessedOrders",
      "fetchRemovedOrders",
      "fetchOrders"
    ]),

    close() {
      alert("Chips closed");
    },

    async onSignOut() {
      await this.signOut();
      this.$router.push({ name: "auth.signIn" });
    },

    onMenuClick(i) {
      if (this.$vuetify.breakpoint.name === "xs") {
        this.drawer = false;
      }
      switch (i) {
        case 0:
          this.$router.push({ name: "cabinet" });
          break;
        case 2:
          if (this.type !== "All") {
            this.$store.commit(`order/${ORDERS_SET}`, []);
            this.$store.commit(`order/${ORDERS_VIEW_TYPE}`, "All");
            this.fetchOrders({ page: 1 });
          }
          break;
        case 3:
          if (this.type !== "Processed") {
            this.$store.commit(`order/${ORDERS_SET}`, []);
            this.$store.commit(`order/${ORDERS_VIEW_TYPE}`, "Processed");
            this.fetchProcessedOrders({ page: 1 });
          }
          break;
        case 4:
          if (this.type !== "UnProcessed") {
            this.$store.commit(`order/${ORDERS_SET}`, []);
            this.$store.commit(`order/${ORDERS_VIEW_TYPE}`, "UnProcessed");
            this.fetchUnProcessedOrders({ page: 1 });
          }
          break;
        case 5:
          if (this.type !== "Removed") {
            this.$store.commit(`order/${ORDERS_SET}`, []);
            this.$store.commit(`order/${ORDERS_VIEW_TYPE}`, "Removed");
            this.fetchRemovedOrders({ page: 1 });
          }
          break;
        case 6:
          this.equipmentModal = true;
          break;
        case 7:
          this.regionModal = true;
          break;
        case 9:
          this.settingsModal = true;
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scope>
.head-link {
  color: rgb(247, 215, 73) !important;
  text-decoration: none;
}
</style>
