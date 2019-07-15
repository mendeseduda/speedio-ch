<template>
  <div id="app">
    <top-bar></top-bar>
    <div class="container margin-body">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TopBar from './components/TopBar.vue'

@Component({
  components: {
    'top-bar': TopBar
  }
})
export default class App extends Vue {}
</script>

<style>
@font-face {
  src: url('~@/assets/Abel/Abel-Regular.ttf');
  font-family: 'Abel';
}

@font-face {
  src: url('~@/assets/Lato/Lato-Regular.ttf');
  font-family: 'Lato';
  font-weight: 400;
}

@font-face {
  src: url('~@/assets/Lato/Lato-Thin.ttf');
  font-family: 'Lato';
  font-weight: 300;
}

body {
  margin: 0;
}

.margin-body {
  margin-top: 80px;
}

@media screen and (min-width: 610px) {
  .container {
    margin-left: 15px;
    margin-right: 15px;
  }
}
</style>
