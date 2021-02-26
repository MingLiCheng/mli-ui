<template>
  <div class="custom-theme-components-home">
    <div class="box">
      <div class="left">
        <transition name="fade">
          <span v-if="isShowTran">
            <h1 class="title" key="h1">{{ pageInfo.heroText }}</h1>
            <p class="description" key="description">{{ pageInfo.tagline }}</p>
            <p v-if="pageInfo.actionText && pageInfo.actionLink" class="action" key="action">
              <NavLink class="action-button" :item="actionLink" />
            </p>
          </span>
        </transition>
      </div>
      <div class="right"></div>
    </div>
    <div v-if="pageInfo.footer" class="footer">
      {{ pageInfo.footer }}
    </div>
  </div>
</template>

<script lang="ts">
import NavLink from '@theme/components/NavLink.vue'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: { NavLink }
})
export default class Home extends Vue {
  isShowTran = false
  get pageInfo() {
    return this.$page.frontmatter
  }
  get actionLink() {
    return {
      link: this.pageInfo.actionLink,
      text: this.pageInfo.actionText
    }
  }

  mounted() {
    this.isShowTran = true
  }
}
</script>


<style lang="less" scoped>
.custom-theme-components-home {
  .box {
    padding-top: 3.6rem;
    display: flex;
    width: 100%;
    height: calc(100vh - 3.6rem - 2.5rem - 1rem);
    .left {
      flex: 5;
      border: 1px solid #eaecef;
      margin: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      h1,
      p {
        transform: translateY(0rem);
      }
      .action-button {
        display: inline-block;
        font-size: 1rem;
        color: #5da7f1;
        &:hover {
          color: #409eff;
        }
      }
      .fade-enter-active,
      .fade-leave-active {
        transition: all 1s;
      }
      .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateY(1.4rem);
      }
    }
    .right {
      flex: 7;
      border: 1px solid #eaecef;
      margin: 12px;
      margin-left: 0px;
      background-image: url(../../public/images/undraw_web_developer_p3e5.svg);
      background-size: 100% 88%;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  .footer {
    margin-top: 0.75rem;
    padding: 2.5rem;
    border-top: 1px solid #eaecef;
    text-align: center;
    color: #4e6e8e;
  }
  @media (max-width: 719px) {
    .box {
      flex-direction: column;
      .right {
        margin-left: 12px;
      }
    }
  }
}
</style>
