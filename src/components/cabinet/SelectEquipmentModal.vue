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
                v-bind="data.attrs"
                close
                @click:close="remove(data.item)"
              >{{ data.item.name }}</v-chip>
            </template>
          </v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" dark>Show</v-btn>
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
import { mapActions } from 'vuex';
import showStatusToast from '@/components/mixin/showStatusToast';

export default {
  name: "SelectEquipmentModal",

  mixins: [showStatusToast],

  props: ["visible"],
  
  mounted () {
    this.fetchEquipments()
        .then((response) => { 
          this.listEquipments = [...response]; 
        })
        .catch((e) => { this.showErrorMessage(e.message); });
  },

  data() {
    return {
      equipments: [],
      listEquipments: []
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
  
  methods: {
    ...mapActions('order',['fetchEquipments']),

    remove(item) {
      const index = this.equipments.indexOf(item.name);
      if (index >= 0) this.equipments.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>