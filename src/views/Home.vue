<!--
 * @Description: 
 * @Author: gaoyunpeng
 * @Date: 2021-10-18 09:19:05
 * @LastEditors: gaoyunpeng
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  private getSS(tep: any) {}

  private list: any[] = [];
  private getTime(data: [], key: string) {
    console.log(1);
  }
}
</script>
