<template>
  <div class="top-bar">
      <h1 :style="$route.path === '/' ? 'cursor: default': 'cursor: pointer'" class="top-bar__title" @click="home">Movies</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class TopBar extends Vue {
  private home (): void {
    this.$router.push({
      name: 'home'
    })
  }
}
</script>

<style scoped>
.top-bar {
    display: flex;
    height: 80px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #126192;
    z-index: 100;
}

.top-bar__title {
    text-align: center;
    color: #64eae5;
    font-family: 'Abel';
    font-weight: 300;
    font-size: 38px;
    margin: auto;
}
</style>
