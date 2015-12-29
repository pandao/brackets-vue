<template>
    <h1>Hello Vue.js</h1>
    <div class="box">
        <h1>{{msg}}</h1>
        <comp-a></comp-a>
        <comp-b></comp-b>
        <counter></counter>
    </div>
    <p>Text</p>
</template>

<script>
import CompA from './components/a.vue'
import CompB from './components/b.vue'
import Counter from './components/counter.vue'

export default {
  data () {
    return {
      msg: 'Hello from vue-loader!'
    }
  },
  components: {
    CompA,
    CompB,
    Counter
  }
}
</script>

<style lang="sass" scoped>
.container {
  padding: 6px 12px;
  margin-bottom: 15px;

  h2 {
    font-size: 14px;
  }
}
body {background:#fff}
</style>
