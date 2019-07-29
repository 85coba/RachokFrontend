<template>
  <v-container>
    <v-list two-line>
      <transition-group name="slide-prev" tag="span">
        <template v-for="(item, index) in items" name="fade">
          <v-list-item :key="item.id + 'id'" ripple @click="toggle(item)">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-forklift</v-icon>
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle class="text--primary">{{ item.email }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ item.city }}</v-list-item-subtitle>
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
    </v-list>

    <v-layout row justify-center>
      <OrderInfo :visible="isShowInfo" :item="item" @close="isShowInfo = false"></OrderInfo>
    </v-layout>
  </v-container>
</template>
 <script>
import { mapGetters, mapActions } from "vuex";
import OrderInfo from '@/components/cabinet/OrderInfo.vue';
import showStatusToast from "@/components/mixin/showStatusToast";
export default {
  name: "OrdrsTables",

  components: {
    OrderInfo,
  },

  mixins: [showStatusToast],

  data: () => ({
    item: {},
    selected: [],
    isShowInfo: false
  }),

  async created() {
    try {
      await this.fetchOrders({ page: 1 });
    } catch (error) {
      this.showErrorMessage(error.message);
    }
  },

  computed: {
    ...mapGetters("order", {
      items: "ordersSortedByCreatedDate"
    })
  },

  methods: {
    ...mapActions("order", [
      "fetchOrders",
    ]),

    toggle(item) {
      this.item = item;
      this.isShowInfo = true;
    },
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
