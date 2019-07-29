<template>
    <v-combobox
    hide-no-data
    hide-selected
    :search-input.sync="search"
    :items = "items"
    item-text="description"
    outline
    label="Введіть назву населеного пункту"
    id="googleregion"
    placeholder="placeholder"
    v-model="autocompleteText"
  ></v-combobox>
</template>

<script>
    
    export default {
        name: 'VueGoogleRegion',

        data() {
          return {
            search: "",
            items: [],
            autocompleteText: '',
            options: {
              types: ['(regions)'],
              componentRestrictions: {country: "ua"},
              input: '',            
              },
            service: new google.maps.places.AutocompleteService()
          }
        },

        methods: {
          callback(result, status) {
            console.log(result,status);
            this.items = result.filter((item) => {
              return item.types.indexOf('administrative_area_level_1') != -1;
            });
            console.log(this.items);
          },
        },

        watch: {
          search(val) {
            console.log(val);
            if (val) {
            this.options.input = val;
            this.service.getPlacePredictions( this.options , this.callback)
            }
          }
        },

    }
</script>
