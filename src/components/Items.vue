<template>
	<div class="md">
		<p class="text-2xl font-sans">Ingredients</p>
		<div class="ui compact menu">
			<a class="item">
				<i class="plus icon"></i>
				New
			</a>
		</div>
		<div class="my-2 bg-white p-2 shadow-md rounded">
     <table class="ui celled table" id="datatable">
       <thead>
         <tr>
           <th>#</th>
           <th>Name</th>
           <th>Description</th>
           <th>Option</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>
              <router-link :to="{name: 'FormView', params: { id: 1 }}" class="bg-grey p-2 rounded hover:bg-black hover:text-white">
                <i class="fa fa-eye"></i>
              </router-link>
            </td>
          </tr>
        </tbody>
     </table>
   </div>
	</div>
</template>

<script>
  import Devless from '@/utils/devless'

  export default {
    data () {
      return {
        items: []
      }
    },
    methods: {
      async fetchItems () {
        const res = await Devless.queryData('mkoo', 'item')
        this.items = res.payload.results;
        $('table').DataTable()
      } 
    },
    mounted () {
      this.fetchItems()
    }
  }
</script>