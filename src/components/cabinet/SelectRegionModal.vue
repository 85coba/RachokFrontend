<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" max-width="340px" transition="dialog-transition">
      <v-card>
        <v-card-title class="headline justify-center">Select region for overview</v-card-title>
        <v-card-text>
          <VueGoogleAutocomplete
            id="selectFilterCity"
            types="(regions)"
            class="form-control"
            v-on:placechanged="getAdressData"
            country="ua"
            :issetPlace="place.city"
            ref="googlePlace"
          ></VueGoogleAutocomplete>
          <v-switch v-model="isAllRegion" :label="`Show all region of this city`"></v-switch>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="onSave">save</v-btn>
          <v-btn color="info" @click="onClear">clean</v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="show=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
import VueGoogleAutocomplete from "../common/VueGoogleAutocomplete";
export default {
  name: "SelectRegionModal",

  components: {
    VueGoogleAutocomplete
  },

  props: ["visible"],

  data() {
    return {
      isAllRegion: false,
      filterResponse: [],
      place: {}
    };
  },

  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("close");
      }
    }
  },

  watch: {
    show: function() {
      if (this.show) {
        this.fillSettings();
      }
    }
  },

  methods: {
    ...mapActions("order", ["fetchOrders"]),
    ...mapActions("auth", ["addSettings", "fetchSettings"]),

    getAdressData(addressData, placeResultData) {
      this.place.region = addressData.administrative_area_level_1;
      this.place.city = addressData.locality;
    },

    async onSave() {
      let chose = {};

      if (
        this.isAllRegion ||
        (this.place.region && this.place.city === undefined)
      ) {
        if (this.place.region === undefined) {
          return this.onClear();
        }
        chose = { region: [this.place.region], city: [] };
      } else {
        if (this.place.city === undefined) {
          return this.onClear();
        }
        chose = { city: [this.place.city], region: [] };
      }

      await this.addSettings(chose);
      await this.fetchOrders({ page: 1 });
      this.show = false;
    },

    async onClear() {
      await this.addSettings({ city: [], region: [] });
      await this.fetchOrders({ page: 1 });
      this.filterResponse = undefined;
      this.$refs.googlePlace.clear();
      this.show = false;
    },

    async fillSettings() {
      await this.fetchSettings().then(response => {
        this.filterResponse = [...response];
      });

      this.filterResponse = this.filterResponse.find(filters => {
        return Object.keys(filters) == "city";
      });

    if (this.filterResponse){ 
           this.$refs.googlePlace.update(this.filterResponse.city[0])
        }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>