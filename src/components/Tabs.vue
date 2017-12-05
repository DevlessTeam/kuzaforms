<template>
  <div class="ui compact menu">
    <a v-for="tab in tabs" class="item" @click="selectTab(tab)">
      <i class="unhide" :class="icon"></i>
      {{tab.name}}
    </a>
  </div>
</template>

<script>
  export default {
    methods: {
      selectTab (tab) {
        console.log('tabs workings')
        console.log(tab)
      }
    }
  }
</script>