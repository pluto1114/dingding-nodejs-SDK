<style lang="less" scoped>
.content{
  height:5rem;
  padding-top: 1rem;
  text-align: center;
}
.srccess{
  width: 2.4rem;
  margin-bottom: 1rem;
}
</style>

<template>
    <div>
        <div class="content">
            <img class="srccess" src="../assets/success.png" alt="">
            <h4>恭喜! 信息提交成功</h4>
        </div>
        <div class="pad ub">
          <cube-button @click="jumpTo">回到首页</cube-button>
        </div>
    </div>
</template>
<script>

import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: {
    
  },
  methods: {
    jumpTo() {
      this.$router.replace("/");           
    },
    ...mapMutations([]),
  },
  data() {
    return {
      description: "稍后将会有工作人员与您联系，请保持手机开机",
      icon: ""
    };
  },
  computed: {
    ...mapState(["host", "dduser"])
  },
};
</script>