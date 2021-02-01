<template>
  <div id="app">
    <PageView />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PageView from '@/components/layout/PageView.vue'
@Component({
  components: { PageView }
})
export default class App extends Vue {
  created() {
    console.log('this', this)
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
