<template>
    <v-container fluid>
    <v-layout row>
      <OrdersTable v-if="isLoggedIn"></OrdersTable>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import OrdersTable from '../components/cabinet/OrdersTable';
import Navibar from '../components/common/Navibar';

export default {
  name: 'Cabinet',
  components: {
    OrdersTable,
    Navibar
  },

  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('auth', ['isLoggedIn'])
  },
}
</script>