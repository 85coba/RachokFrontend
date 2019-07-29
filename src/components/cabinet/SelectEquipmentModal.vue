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
                @click:close="remove"
              >{{ data.item.name }}</v-chip>
            </template>
          </v-autocomplete>
        </v-card-text>
        <v-btn outline color="primary" @click="show=false" dark>close</v-btn>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "SelectEquipmentModal",

  props: ["visible"],

  data() {
    return {
      equipments: ["Rachok"],
      listEquipments: [
          { name: "Rachok" },
          { name: "Traktor" },
          { name: "Exkavator" }
      
      ]
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
    remove() {
        console.log('Remove')
      const index = this.equipments.indexOf(item.name);
      console.log(index);
      if (index >= 0) this.equipments.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>