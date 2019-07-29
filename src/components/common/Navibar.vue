<template>
  <div>
    <v-app-bar app clipped-left dark color="blue darken-3">
      <v-app-bar-nav-icon v-if="isLoggedIn" @click.native="drawer = ! drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">
        <router-link :to="{name: 'home'}" class="tool-bar-link"><span>Рачок</span></router-link>
      </span>
      <v-spacer></v-spacer>
      <v-btn
        text
        to ="/cabinet"
      >
        <span class="mr-2">Мій кабінет</span>
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
            { icon: 'mdi-check', text: 'Show processed orders',  },
            { icon: 'mdi-plus', text: 'Show unprocessed orders' },
            { icon: 'mdi-delete', text: 'Show removed orders' },
            { icon: 'mdi-forklift', text: 'Select equipments' },
            { icon: 'mdi-map-marker', text: 'Select region'},
            { divider: true },
            { icon: 'mdi-sort-ascending', text: 'Sort order by date ascendig' },
            { icon: 'mdi-sort-descending', text: 'Sort order by date descending' },
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
                  this.fetchOrders({ page: 1 });
                  break;
                case 2:
                  this.fetchProcessedOrders({ page: 1 });
                  break;
                case 3:
                  this.fetchUnProcessedOrders( { page: 1 } );
                  break;
                case 4:
                  this.fetchRemovedOrders( { page: 1 } );
                  break;
                case 5:
                  this.equipmentModal = true;
                  break;
                case 6:
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
    .tool-bar-link {   
        color:rgb(247, 215, 73);
        text-decoration: none;
    }
</style>
