<style lang="less" scoped>
@header_h: 4rem;
.header-box {
  height: @header_h;
  position: relative;
  .common {
    padding-top: 1rem;
    display: flex;
    align-items: center;

    & > img {
      margin-left: 1rem;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
    }
    .user-info {
      margin-left: 0.7rem;
      font-size: 0.6rem;
      line-height: 1rem;
      .user-orgname {
        font-size: 0.4rem;
        line-height: 0.7rem;
      }
    }
  }
}
.cards {
  margin: 0.25rem 0.5rem;
  border: 1px solid #eee;
  box-shadow: 0px 0px 8px 1px #f1f1f1;
  .card {
    margin-top: 0.25rem;
    margin-left: 0.2rem;
    margin-bottom: 0.2rem;
    text-align: center;
    img {
      width: 1.5rem;
      height: 1.5rem;
    }
    .num {
      font-size: 0.7rem;
      margin-bottom: 0.2rem;
      color: #3071f2;
    }
    .descp {
      font-size: 0.4rem;
      color: #666;
    }
    &:first-child {
      border-right: 1px solid #eee;
    }
  }
}

.menus {
  padding: 0.4rem;
  font-size: 0.48rem;
  li {
    color: #333;
    padding: 0.5rem 0.35rem;
    border-bottom: 1px #eee solid;
  }
  .icon {
    margin-right: 0.35rem;
  }
}
</style>
<template>
  <div class>
    <div class="header-box">
      <div class="common" v-if="dduser">
        <img v-if="dduser.avatar==''" src="../assets/photo.png" />
        <img v-else :src="dduser.avatar" />
        <a class="user-info">
          <div class="user-name">{{dduser.name}}</div>
          <div class="user-orgname">{{dduser.departmentName}}</div>
        </a>
      </div>
    </div>
    <div class="cards ub">
      <div class="card ub" @click="onUnFinClick()">
        <img src="../assets/unfinishOrder.png" alt />
        <div class="pad">
          <div class="num">{{unFinCount}}</div>
          <div class="descp">未完成工单</div>
        </div>
      </div>
      <div class="card ub">
        <img src="../assets/finishOrder.png" alt />
        <div class="pad">
          <div class="num">{{finCount}}</div>
          <div class="descp">已完成工单</div>
        </div>
      </div>
    </div>
    <div>
      <ul class="menus">
        <!-- <li class="ub" @click="$createDialog({type: 'alert',title: '提示',content: '积分规则完善中，敬请期待！',icon: 'cubeic-alert'}).show()">
          <i class="font_family icon-jifen icon"></i>
          <span>积分榜单</span>        
        </li>-->
        <li class="ub" @click="$router.push({name:'OrderList'})">
          <i class="font_family icon-jifen icon"></i>
          <span>待办订单</span>
        </li>

        <li class="ub" @click="$router.push({name:'OrderAdd'})">
          <i class="font_family icon-tiaocha icon" aria-hidden="true"></i>
          <span>填写订单</span>
        </li>

        <li class="ub" @click="showUs()">
          <i class="font_family icon-guanyuwomen icon" aria-hidden="true"></i>
          <span>关于我们</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      unFinCount: 0,
      finCount: 0
    };
  },
  computed: {
    ...mapState(["dduser", "remote"])
  },
  created() {
    if (this.remote) {
      this.$root.$on("dduser-init", () => {
        this.init();
      });
    } else {
      this.init();
    }
  },
  mounted() {},
  methods: {
    init() {
      this.fetchMyOrderCount({ userid: this.dduser.userid }).then(data => {
        let map = data.itemMap;
        this.unFinCount = map.unfinCount;
        this.finCount = map.finCount;
      });
    },
    onUnFinClick() {
      this.$router.push({ name: "OrderList" });
    },
    onFinClick() {
      this.$router.push({ name: "OrderList" });
    },

    showUs() {
      this.$createDialog({
        type: "alert",
        title: "开发部门",
        content: "联通系统集成-软件研发部",
        icon: "cubeic-good"
      }).show();
    },
    ...mapMutations([]),
    ...mapActions(["fetchMyOrderCount"])
  }
};
</script>
