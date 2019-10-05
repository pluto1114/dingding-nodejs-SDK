<style lang="less" scoped>
li {
  border-bottom: 1px solid #ddd;
  line-height: 1.8;
}
.order-name {
  font-size: 0.5rem;
}
.time {
  font-size: 0.4rem;
}
</style>
<template>
  <div class>
    <ul>
      <li v-for="x of orders" :key="x.orderId" class="ub pad my-item">
        <div class="uf-1 ub-v">
          <div class="order-name">{{x.orderName}}</div>
          <div class="time">￥{{x.totalPrice}}</div>
          <div class="time">{{x.createtime}}</div>
        </div>
        <cube-button :inline="true" @click="onDone(x)">处理待办</cube-button>
      </li>
      <li v-if="!orders.length" class="empty">当前没有订单数据</li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      orders: []
    };
  },
  computed: {
    ...mapState(["dduser"])
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      this.fetchOrderList({
        userid: this.dduser.userid,
        orderStatus: "orderStart"
      }).then(data => {
        this.orders = data.items;
      });
    },
    onDone(order) {
      this.finishOrder(order).then(data => {
        this.init();
      });
    },
    ...mapMutations([]),
    ...mapActions(["fetchOrderList", "finishOrder"])
  },
  components: {}
};
</script>
