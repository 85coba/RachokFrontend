<template>
    <v-layout row justify-center>
        <v-dialog
            v-model="show"
            max-width="340px"
            transition="dialog-transition"
        >
        <v-card>
            <v-card-title class="headline justify-center">Select region for overview</v-card-title>
            <v-card-text>
                 <v-select
                    
                    outlined
                    label="Select region"
                ></v-select>
                <VueGoogleAutocomplete
                    id="selectFilterCity"
                    types="(cities)"
                    classname="form-control"
                    placeholder="Start typing"
                    v-on:placechanged="getAdressData"
                    country="ua"
                ></VueGoogleAutocomplete>

            </v-card-text>
            <v-btn color="primary" @click="show=false" dark>close</v-btn>
        </v-card>
        
        </v-dialog>
    </v-layout>
</template>

<script>
    import VueGoogleAutocomplete from '../common/VueGoogleAutocomplete';
    export default {
        name: 'SelectRegionModal',

        components: {
            VueGoogleAutocomplete,
        },

        props: ['visible'],

        computed: {
            show: {
                get() {
                    return this.visible
                },
                set(value) {
                    this.$emit('close')
                }                
            }
        },

        methods: {
            getAdressData() {
                
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>