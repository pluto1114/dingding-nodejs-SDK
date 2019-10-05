<template>
  <div id="app" style="height:100%;">
    <transition :name="'fade'">
      <router-view class="router-view"></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "app",
  computed: {
    ...mapState(["dduser", "jsconfig"])
  },
  created(){
  
  },
  mounted() {
    if (!this.dduser) {
      this.fetchCorpid().then(data => {
        /* eslint-disable */
        requestAuthCode(data.itemMap.corpid, result => {
          console.log(result);
          this.fetchUserinfo(result).then(data => {
            if (data.errcode == "0") {
              let user = data.itemMap.user;
              console.log("fetch dduser success", user);
              this.updateDduser(user);
              this.$root.$emit('dduser-init')
            }
          });
        });
      });
    }
    
  },
  methods: {
    ...mapMutations(["updateDduser", "updateJsconfig"]),
    ...mapActions([
      "fetchCorpid",
      "fetchUserinfo",
      "fetchComps",
      "fetchJsconfig"
    ])
  }
};
</script>

<style lang="less">

.b-fixed {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;
}
.content {
  padding: .6rem;
}

.empty {
  padding: 1rem;
  text-align: center;
}
</style>
<style lang="less">
[v-cloak] {
  display: none;
}
.fade-enter-active {
  transition: opacity 0.8s ease;
}

.fade-enter {
  opacity: 0;
}
.fadex-enter-active {
  transition: opacity 0.5s;
}
.fadex-leave-active {
  transition: opacity 0.5s;
}
.fadex-enter, .fadex-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
li.my-item {
  margin-bottom: .4rem;
}
.my-item {
  // opacity: 0;
  animation-name: animationStyle1;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  cursor: pointer;
}
.my-item-x {
  // opacity: 0;
  animation-name: animationStyle2;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  cursor: pointer;
}

.shown-loop(@n, @i: 1) when (@i <=@n) {
  .my-item:nth-child(@{i}) {
    animation-duration: @i*200ms;
  }
  .my-item-x:nth-child(@{i}) {
    animation-duration: @i*400ms;
  }

  .shown-loop(@n, (@i + 1));
}

.shown-loop(15);

@keyframes animationStyle1 {
  0% {
    opacity: 0;
    transform: rotateY(-90deg) translate3d(0, 30px, 0);
  }
  100% {
    opacity: 1;
    transform: rotate(0deg) translate3d(0, 0, 0);
  }
}
@keyframes animationStyle2 {
  0% {
    opacity: 0;
    transform: rotateX(-90deg) translate3d(0, 30px, 0);
  }
  100% {
    opacity: 1;
    transform: rotate(0deg) translate3d(0, 0, 0);
  }
}
</style>


