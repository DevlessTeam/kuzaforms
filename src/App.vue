<template>
  <div id="app">
    <header>
      <nav-bar></nav-bar>
    </header>
    <main>
      <div class="flex flex-wrap h-screen">
        <side-bar></side-bar>
        <div class="md w-5/6 p-4">
          <router-view></router-view>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar'

export default {
  name: 'app',
  components: {
    NavBar,
    SideBar
  }
}
</script>

<style src="./styles/main.css"></style>