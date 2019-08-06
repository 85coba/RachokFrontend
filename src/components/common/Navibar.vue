<template>
  <div>
    <v-app-bar app clipped-left dark color="blue darken-3">
      <v-app-bar-nav-icon v-if="isLoggedIn" @click.native="drawer = ! drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link class="head-link" :to="{name: 'home'}"><span>Рачок</span></router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!isLoggedIn"
        text
        to ="/auth/sign-in"
      >
        <span class="mr-2">Sing In</span>
      </v-btn>
      <v-btn
        v-if="isLoggedIn"
        text
        @click="onSignOut()"
      >
        <span class="mr-2">Вихід</span>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-if="isLoggedIn"
      fixed
      clipped
      class="grey lighten-4"
      app
      v-model="drawer"
    >
      <v-list
        class="grey lighten-4"
      >
        <template v-for="(item, i) in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="i"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
          </v-layout>
          <v-divider
            dark
            v-else-if="item.divider"
            class="my-3"
            :key="i"
          ></v-divider>
          <v-list-item
            :key="i"
            v-else
            @click="onMenuClick(i)"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <SelectEquipmentModal :visible="equipmentModal" @close="equipmentModal = false"></SelectEquipmentModal>
    <SelectRegionModal :visible="regionModal" @close="regionModal = false" ></SelectRegionModal>
  </div>  
</template>
<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex';
    import { ORDERS_VIEW_TYPE, ORDERS_SET } from "@/store/modules/order/mutationTypes";
    import SelectEquipmentModal from '../cabinet/SelectEquipmentModal';
    import SelectRegionModal from '../cabinet/SelectRegionModal';
    export default {
        name: 'Navibar',
        components: {
          SelectRegionModal,
          SelectEquipmentModal
        },

        data: () => ({
          drawer: true,
          regionModal: false,
          equipmentModal: false,
          items: [
            { icon: 'mdi-home', text: 'Home' },
            { divider: true },
            { icon: 'mdi-format-list-bulleted', text: 'Show all',  },
            { icon: 'mdi-check', text: 'Show processed',  },
            { icon: 'mdi-plus', text: 'Show unprocessed' },
            { icon: 'mdi-delete', text: 'Show removed' },
            { icon: 'mdi-forklift', text: 'Select equipments' },
            { icon: 'mdi-map-marker', text: 'Select region'},
            { divider: true },
            { icon: 'mdi-settings', text: 'Settings' },
          ]
    }),

        computed: {
            ...mapGetters('auth', ['isLoggedIn']),
        },

        methods: {
            ...mapActions('auth', [ 'signOut' ]),
            ...mapActions('order', 
            [
              'fetchProcessedOrders', 
              'fetchUnProcessedOrders',
              'fetchRemovedOrders',
              'fetchOrders'
            ]),

            close() {
              alert('Chips closed')
            },

            async onSignOut() {
                await this.signOut();
                this.$router.push({ name: 'auth.signIn' });
            },

            onMenuClick(i) {
              if (this.$vuetify.breakpoint.name === 'xs') {
                 this.drawer = false;
              }
              switch (i) {
                case 0:
                  this.$router.push({ name: 'cabinet' });
                  break;
                case 2:
                  this.$store.commit(`order/${ORDERS_SET}`,[]);
                  this.$store.commit(`order/${ORDERS_VIEW_TYPE}`, 'All');
                  this.fetchOrders({ page: 1 });
                  break;
                case 3:
                  this.$store.commit(`order/${ORDERS_SET}`,[]);
                  this.$store.commit(`order/${ORDERS_VIEW_TYPE}`, 'Processed');
                  this.fetchProcessedOrders({ page: 1 });
                  break;
                case 4:
                  this.$store.commit(`order/${ORDERS_SET}`,[]);
                  this.$store.commit(`order/${ORDERS_VIEW_TYPE}`, 'UnProcessed');
                  this.fetchUnProcessedOrders( { page: 1 } );
                  break;
                case 5:
                  this.$store.commit(`order/${ORDERS_SET}`,[]);
                  this.$store.commit(`order/${ORDERS_VIEW_TYPE}`, 'Removed');
                  this.fetchRemovedOrders( { page: 1 } );
                  break;
                case 6:
                  this.equipmentModal = true;
                  break;
                case 7:
                  this.regionModal = true;
                  break;
                default:
                  break;
              }
              
            }
        }
    }
</script>

<style scope>
    .head-link {   
        color:rgb(247, 215, 73) !important;
        text-decoration: none;
    } 
</style>
