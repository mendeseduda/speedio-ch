<template>
  <span class="chip" :style="{backgroundColor: background, color: color}">{{label}}</span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Chip extends Vue {
  @Prop({
    required: true
  })
  private label!: String;

  @Prop()
  private color!: String;

  @Prop()
  private background!: String;
}
</script>

<style scoped>
.chip {
  display: inline-block;
  border-radius: 28px;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  height: 28px;
  margin: 4px;
  background-color: #ffffff;
  color: #4f88ae;
  border: 2px solid #4f88ae;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  font-size: 14px;
  font-family: "Lato";
  line-height: 28px;
}
</style>
