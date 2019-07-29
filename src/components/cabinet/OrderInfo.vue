<template>
  <v-dialog v-model="show" max-width="340">
    <v-card>
      <v-card-title class="headline justify-center">{{ item.title }}</v-card-title>
      <v-layout align-center justify-center>
        <v-icon large color="red darken-2">mdi-map-marker</v-icon>
        <span>{{ item.city }}, {{ item.region }}</span>
      </v-layout>
      <v-card-text>
        <h4>Додаткова інформація</h4>
        <v-divider></v-divider>
        <p>{{ item.info }}</p>
        <p v-for="(val, key) in item.features" :key="key">{{ key }}: {{ val }}</p>
        <h4>Контактна інформація</h4>
        <v-divider></v-divider>

        <v-layout align-center wrap ma-3>
          <v-icon class="mr-2" color="green darken-2">mdi-account-card-details</v-icon> 
          <span>{{ item.pib }}</span>
        </v-layout>
        <v-layout align-center wrap ma-3>
          <v-icon class="mr-2" color="green darken-2">mdi-phone</v-icon>
          <span>{{ item.phoneNumber }}</span>
        </v-layout>

        <v-layout align-center wrap ma-3>
          <v-icon class="mr-2" color="green darken-2">mdi-email</v-icon>
          <span>{{ item.email }}</span>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="onRemove(item.id)">
          <v-icon color="red large">mdi-delete</v-icon>
        </v-btn>
        <v-btn
          v-if="!item.processed"
          color="green darken-1"
          text
          @click="doProcessed(item.id)"
        >Оброблено</v-btn>
        <v-btn
          v-else
          color="green darken-1"
          text
          @click="doNotProcessed(item.id)"
        >Не оброблено</v-btn>
        <v-btn text @click="show = false">
          <v-icon color="grey">mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "OrderInfo",

    props: ['visible', 'item'],

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
  methods: {
    ...mapActions("order", [
      "processed",
      "unProcessed",
      "removeOrder"
    ]),

    doProcessed(id) {
      this.processed(id);
      this.show = false;
    },

    doNotProcessed(id) {
      this.unProcessed(id);
      this.show = false;
    },

    onRemove(id) {
      this.removeOrder(id);
      this.show = false;
    }
  }
};
</script>

<style scoped>
</style>