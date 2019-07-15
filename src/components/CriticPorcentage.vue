<template>
  <div :class="{'big': big}" class="critic">
    <div class="critic__content">{{critics}}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class CriticPorcentage extends Vue {
    @Prop()
    private label!: number;

    @Prop()
    private big!: boolean;

    private get critics (): String {
      return `${this.label * 10}%`
    }
}
</script>

<style scoped>
.critic {
  border-radius: 50%;
  background-color: #126191;
  border: 3px solid transparent;
  box-sizing: border-box;
}

.critic__content {
  background-color: #126191;
  color: #64e6d6;
  border-radius: 50%;
  border: 4px solid #64e6d6;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-family: "Abel";
}

.big.critic .critic__content {
  width: 80px;
  height: 80px;
  font-size: 32px;
}
</style>
