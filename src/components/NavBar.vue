<template>
  <div>
    <nav class="flex items-center justify-between flex-wrap p-6">
      <div class="flex items-center flex-no-shrink text-black mr-6">
        <logo></logo>
        <!--<span class="font-semibold text-xl tracking-tight">Farmable</span>-->
      </div>
      <div class="block lg:hidden">
        <button class="flex items-center px-3 py-2 border rounded text-blue-lighter border-blue-light hover:text-white hover:border-white">
          <svg class="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <!--<a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-blue hover:text-white mr-4">
            Docs
          </a>
          <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-blue hover:text-white mr-4">
            Examples
          </a>
          <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-blue hover:text-white">
            Blog
          </a>-->
        </div>
        <div>
          <a class="inline-block text-sm px-4 py-2 text-black bg-white leading-none border rounded border-black hover:border-transparent hover:text-black hover:bg-blue mt-4 lg:mt-0" @click="logout">
            <span v-if="!loading">Logout</span>
            <span v-else>logging out</span>
            </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import Logo from '@/components/Logo'

  export default {
    components: {
      Logo
    },
    data: () => ({
      loading: false
    }),
    methods: {
      async logout () {
        this.loading = !this.loading
        const result = await this.$store.dispatch('logout')
        this.loading = !this.loading
        if(result)
          this.$router.push('/login')
        }
    }
  }
</script>