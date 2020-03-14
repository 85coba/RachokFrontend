<template>
  <div>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">Choose equipemnt</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2">Extra information</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 3" step="3">Contact information</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-combobox
            ref="equipmentInput"
            v-model="title"
            :hide-no-data="!search"
            :items="items"
            item-text="name"
            :search-input.sync="search"
            label="Введіть назву техніки (bobcat чи екскаватор)"
            return-object
            prepend-icon="mdi-magnify"
            hide-selected
          ></v-combobox>

          <v-btn color="primary" @click="step = 2">Next</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-flex v-for="(field, i) in fields" :key="i">
            <v-text-field
              v-model="order.features[field.key]"
              :label="field.key"
              placeholder=" "
              outline
              ma-5
            ></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              v-model="order.features.ExtraInfo"
              label="Додаткова інформація"
              placeholder=" "
              outline
              ma-5
            ></v-text-field>
          </v-flex>

          <v-btn color="primary" @click="step = 3">Next</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card>
            <v-card-title class="headline blue darken-3">
              <span class="white--text">Введіть контактні дані</span>
            </v-card-title>
            <v-card-text>
              <v-flex>
                <v-text-field
                  v-model="order.pib"
                  label="ПІБ"
                  placeholder=" "
                  outline
                  ma-5
                  :rules="[rules.required]"
                ></v-text-field>

                <v-text-field
                  v-model="order.email"
                  label="Email"
                  placeholder=" "
                  outline
                  :rules="[rules.required, rules.email]"
                  ma-5
                ></v-text-field>
                <v-text-field
                  v-model="order.phoneNumber"
                  label="Номер телефону"
                  placeholder=" "
                  prefix="+38 "
                  v-mask="mask"
                  :rules="[rules.required]"
                  outline
                  ma-5
                ></v-text-field>
                <vue-google-autocomplete
                  types="(cities)"
                  id="map"
                  class="form-control"
                  placeholder="Start typing"
                  v-on:placechanged="getAddressData"
                  country="ua"
                ></vue-google-autocomplete>
              </v-flex>
            </v-card-text>
          </v-card>

          <v-btn :disabled="isOk" color="green lighten-1" @click="onOk">
            OK
            <v-icon right>mdi-check-circle</v-icon>
          </v-btn>
          <v-btn :disabled="!title" color="blue-grey lighten-1" @click="onClear">
            Clear
            <v-icon right>mdi-close-circle</v-icon>
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
import VueGoogleAutocomplete from "../common/VueGoogleAutocomplete";
import { mapActions } from "vuex";
import showStatusToast from "@/components/mixin/showStatusToast";
import { mask } from "vue-the-mask";

export default {
  name: "RequestForm",

  mixins: [showStatusToast],

  components: {
    VueGoogleAutocomplete
  },

  directives: {
    mask
  },

  data: () => ({
    mask: "(###) ###-##-##",
    order: {
      title: "",
      info: "",
      features: {},
      pib: "",
      region: "",
      city: "",
      email: "",
      phoneNumber: ""
    },

    step: 1,
    title: null,
    search: null,
    rules: {
      required: value => !!value || "Required.",
      counter: value =>
        (value.length <= 30 && value.length >= 3) || "Min 3 Max 30 characters",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    },
    entries: [],
    next: false
  }),

  computed: {
    fields() {

      if (! this.title) return [];
      if (typeof this.title === "string") return [];
      if (!this.title.options) return [];

      return this.title.options.map(key => {
        return {
          key
        };
      });
    },

    items() {
      return this.entries.map(entry => {
        const Type = entry.Type;

        return Object.assign({}, entry, { Type });
      });
    },

    isOk() {
      if (!this.title) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    async onOk() {
      if (this.next === false) {
        this.next = true;
      } else {
        this.order.title = this.title.name ? this.title.name : this.title;
        this.order.features = JSON.stringify(this.order.features);
        try {
          await this.addOrder(this.order);
          this.showSuccessMessage("Ваш запит додано!");
          this.onClear();
        } catch (error) {
          this.showErrorMessage(error.message);
        }
      }
    },

    onClear() {
      this.title = null;
      this.next = false;
    },

    getAddressData: function(addressData, placeResultData, id) {
      this.order.region = addressData.administrative_area_level_1;
      this.order.city = addressData.locality;
    },

    ...mapActions("order", ["addOrder", "fetchEquipments"])
  },

  watch: {
    search(val) {
      this.$refs.equipmentInput.blur.prevent;
      if (this.items.length > 0) return;
      this.fetchEquipments()
        .then(response => {
          this.entries = [...response];

          this.$refs.equipmentInput.focus();
        })
        .catch(e => {
          this.showErrorMessage(e.message);
        });
    }
  }
};
</script>