<template>
    <v-container fluid>
      <OrdersTable v-if="isLoggedIn"></OrdersTable>
  </v-container>
</template>

<script>
import { mapGetters} from 'vuex';
import OrdersTable from '../components/cabinet/OrdersTable';

export default {
  name: 'Cabinet',
  components: {
    OrdersTable
  },

  computed: {
    ...mapGetters(['isLoading']),
    ...mapGetters('auth', ['isLoggedIn'])
  },
}
</script>