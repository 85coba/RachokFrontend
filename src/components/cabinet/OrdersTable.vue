<template>
  <div>
    {{ type }}
    <v-list two-line>
      <transition-group name="slide-prev" tag="span">
        <template v-for="(item, index) in items" name="fade">
          <v-list-item :key="item.id + 'id'" ripple @click="toggle(item)">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-forklift</v-icon>
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle class="text--primary">{{ item.city }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ item.email }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text>{{ item.created | createdDate }}</v-list-item-action-text>
              <v-scroll-x-transition>
                <v-icon v-if="item.processed" color="success">mdi-check</v-icon>
              </v-scroll-x-transition>
            </v-list-item-action>
          </v-list-item>
          <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
        </template>
      </transition-group>
      <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler">
        <div slot="spinner">Loading...</div>
      </infinite-loading>
    </v-list>
    <v-layout row justify-center>
      <order-info :visible="isShowInfo" :item="item" @close="isShowInfo = false"></order-info>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { ORDER_ADD } from "@/store/modules/order/mutationTypes";
import OrderInfo from "@/components/cabinet/OrderInfo.vue";
import showStatusToast from "@/components/mixin/showStatusToast";
import InfiniteLoading from "vue-infinite-loading";
import { pusher } from '@/services/Pusher';

export default {
  name: "OrdrsTable",

  components: {
    OrderInfo,
    InfiniteLoading
  },

  mixins: [showStatusToast],

  data: () => ({
    page: 1,
    item: {},
    isShowInfo: false,
    infiniteId: 1,
  }),

  async created() {
    try {
      await this.fetchOrders({ page: this.page });
    } catch (error) {
      this.showErrorMessage(error.message);
    }

    let channel = pusher.subscribe("private-orders");
    channel.bind("order.added", data => {
    this.$store.commit(`order/${ORDER_ADD}`, data.order)
    });
  },

  watch: {
    type(newValue, oldValue) {
      this.page = 1;
      this.item = {};
      this.infiniteId += 1;
    }
  },

  computed: {
    ...mapGetters("order", {
      items: "ordersSortedByCreatedDate"
    }),
    ...mapGetters("order", {
      type: "typeView"
    }),
  },

  methods: {
    ...mapActions("order", [
      "fetchOrders", 
      "fetchOrdersPage",
      "fetchProcessedOrders",
      "fetchUnProcessedOrders",
      "fetchRemovedOrders"
    ]),

    toggle(item) {
      this.item = item;
      this.isShowInfo = true;
    },

    async infiniteHandler($state) {
      try {
        let orders = {};
        switch (this.type) {
        case "All":
          orders = await this.fetchOrdersPage({ page: this.page });
          break;
        case "Processed":
          orders = await this.fetchProcessedOrders({ page: this.page }); 
          break;
        case "UnProcessed":
          orders = await this.fetchUnProcessedOrders({ page: this.page });
          break;
        case "Removed":
          orders = await this.fetchRemovedOrders({ page: this.page });
          break;
      }

        if (orders.length) {
          this.page++;
          $state.loaded();
        } else {
          $state.complete();
        }
      } catch (error) {
        this.showErrorMessage(error);
        $state.complete();
      }

    }
  }
};
</script>
<style scope>
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: all 0.5s;
}
.slide-prev-enter,
.slide-prev-leave-to {
  opacity: 0;
  transform: translateX(230px);
}
</style>
