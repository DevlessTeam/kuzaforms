<template>
  <div class="md w-1/6 h-full bg-transparent">
    <div class="p-4">
      <p class="text-grey-darker font-bold font-sans">Main Menu</p>
      <ul class="list-reset text-grey">

        <!--<router-link class="p-2 rounded" exact active-class="bg-white border font-semibold shadow-lg" tag='li' :to="{name: 'Dashboard'}">
          <a class='btn text-grey-darker no-underline' href="/">
            <i class="fa fa-tachometer mr-2"></i> Dashboard</a>
        </router-link>-->
        <router-link class="p-2 rounded my-4" exact active-class="bg-white border font-semibold shadow-lg" tag="li" :to="{name: 'Menu'}">
          <a class='text-grey-darker no-underline'>
            <i class="fa fa-list mr-2"></i>Menus
          </a>
        </router-link>
        <router-link tag='li' :to="{name: 'Meal'}" active-class="bg-white border font-semibold shadow-lg" class="my-4 p-2 rounded">
          <a class='new text-grey-darker no-underline'>
            <i class="fa fa-coffee mr-2"></i> Meals
          </a>
        </router-link>
        <router-link class="p-2 rounded my-4" active-class="bg-white border font-semibold shadow-lg" :to="{name: 'Items'}" tag="li">
          <a class='text-grey-darker no-underline'>
            <i class="fa fa-cutlery mr-2"></i> Ingredients</a>
        </router-link>
        <router-link tag='li' :to="{name: 'Settings'}" active-class="bg-white border font-semibold shadow-lg" class="my-4 p-2 rounded">
          <a class='new text-grey-darker no-underline'>
            <i class="fa fa-user mr-2"></i> Account
          </a>
        </router-link>
      </ul>
    </div>
  </div>
</template>