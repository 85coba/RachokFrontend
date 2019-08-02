<template>
  <v-layout row justify-center>
    <v-dialog v-model="show" max-width="340px" transition="dialog-transition">
      <v-card>
       
        <v-card-title class="headline justify-center">Select equipment</v-card-title>
        <v-card-text>
          <v-autocomplete
            v-model="equipments"
            :items="listEquipments"
            filled
            chips
            color="blue-grey lighten-2"
            label="Select"
            item-text="name"
            item-value="name"
            multiple
          >
            <template v-slot:selection="data">
              <v-chip
                color="accent"
                dark
                v-bind="data.attrs"
                close
                @click:close="remove(data.item)"
              >{{ data.item.name }}</v-chip>
            </template>
          </v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" dark @click="onSave">Save</v-btn>
          <v-btn color="grey" dark @click="onClear">Clear</v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="black" @click="show=false" dark>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import showStatusToast from '@/components/mixin/showStatusToast';

export default {
  name: "SelectEquipmentModal",

  mixins: [showStatusToast],

  props: ["visible"],
  
  async mounted () {
    this.fetchEquipments()
        .then((response) => { 
          this.listEquipments = [...response]; 
        })
        .catch((e) => { this.showErrorMessage(e.message); });

    await this.fetchSettings()
        .then((response) => {
          this.filterResponse = [...response];
      });

      this.filterResponse = this.filterResponse.find((filters) => {
        return Object.keys(filters) == 'title';
      });

      this.equipments = (this.filterResponse) ? (this.filterResponse.title) ? this.filterResponse.title : [] : [];
  },

  data() {
    return {
      filterResponse: [],
      equipments: [],
      listEquipments: []
    };
  },

  computed: {
    ...mapGetters('auth', ['getSettings']),

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
    ...mapActions('order',['fetchEquipments', 'fetchOrders']),
    ...mapActions('auth', ['addSettings', 'fetchSettings']),

    remove(item) {
      const index = this.equipments.indexOf(item.name);
      if (index >= 0) this.equipments.splice(index, 1);
    },

    async onSave() {
      await this.addSettings( { 'title': this.equipments } )
      await this.fetchOrders({ page: 1 });
      this.show = false;
    },

    onClear() {
      this.equipments = [];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>