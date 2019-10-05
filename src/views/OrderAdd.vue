<style lang="less" scoped>
.time {
  font-size: 0.8em;
  color: #999;
}
.avatar {
  width: 1.8em;
  height: 1.8em;
  margin-right: 0.6em;
}
.suggestion {
  width: 100%;
  min-height: 6em;
}
</style>
<template>
  <div class="pad">
    <div class="pad time">{{time}}</div>
    <div class="pad ub">
      <img src="../assets/photo.png" alt class="avatar" />
      <div class="uf-1 ub-v">
        <cube-input v-model="orderName" placeholder="请填写订单名称"></cube-input>
        <div style="padding-top:1em;">
          <cube-input v-model="totalPrice" type="number" placeholder="请填写订单总价"></cube-input>
        </div>
        <div style="padding-top:1em;">
          <cube-button @click="onSubmit">提交</cube-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      orderName: "",
      time: "",
      totalPrice: ""
    };
  },
  computed: {
    ...mapState(["dduser"])
  },
  created() {
    this.time = new Date().format("yyyy-MM-dd hh:mm");
  },
  mounted() {},
  methods: {
    onSubmit() {
      if (this.orderName == ""||this.totalPrice=="") {
        const toast = this.$createToast({
          type: "warn",
          txt: "请填写必要信息"
        });
        toast.show();
        return;
      }
      this.saveOrder({
        orderName: this.orderName,
        userid: this.dduser.userid,
        totalPrice: this.totalPrice
      }).then(res => {
        this.$router.replace({ name: "Result" });
      });
    },
    ...mapMutations([]),
    ...mapActions(["saveOrder"])
  },
  components: {}
};
</script>
