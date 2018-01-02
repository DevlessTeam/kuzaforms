<template>
  <div>
    <p class="text-2xl font-sans">Meals</p>
    <div class="ui compact menu">
      <a class="item" @click="showModal">
        <i class="plus icon"></i>
        New
      </a>
    </div>
    <div class="w-1/2 mt-2">
      <div class="ui message" :class="[color]" v-show="msg">
        <div class="header">
          {{ msg }}
        </div>
      </div>
    </div>
    <div class="bg-white p-4 shadow-md rounded">
      <table class="ui celled table" id="datatable">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(meal, index) in meals">
            <td>{{ meal.id }}</td>
            <td>{{ meal.name }}</td>
            <td>{{ meal.description }}</td>
            <td>
              <a class="bg-grey p-2 rounded hover:bg-black hover:text-white">
                <i class="fa fa-eye"></i>
              </a>
              <a class="bg-red-darker p-2 rounded text-white hover:bg-red hover:text-white" @click="deleteItem(index, meal.id)">
                <i class="fa fa-remove"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="ui modal">
        <div class="header">Meal</div>
        <div class="content">
          <form class="ui form" @submit.prevent="addMeal">
            <div class="field">
              <label>Name</label>
              <input type="text" v-model="name" placeholder="Name of Meal">
            </div>
            <div class="field">
              <label>Description</label>
              <input type="text" v-model="description" placeholder="Description of Meal">
            </div>
            <div class="ui divider"></div>
            <h3 class="ui header">Meal Ingredients</h3>
            <div>
              <multiselect 
                v-model="value" 
                :options="options"
                :multiple="true"
                track-by="library"
                :custom-label="customLabel"
                >
              </multiselect>
            </div>
            <button v-show="!editMode" class="ui button" @click="addMeal" :disabled="disabled">
              <i class="fa fa-spinner fa-spin mr-2" v-show="loading"></i>Add Meal</button>
            <a v-show="editMode" class="ui button" @click="updateMeal" :disabled="disabled">
              <i class="fa fa-spinner fa-spin mr-2" v-show="loading"></i>Submit Meal</a>
          </form>
        </div>
      </div>
      <div class="flex justify-center" v-show="isActive">
        <div class="ui active inline loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Devless from '@/utils/devless';
  import Multiselect from 'vue-multiselect';

  export default {
    components: { Multiselect },
    data() {
      return {
        meals: [],
        msg: undefined,
        color: undefined,
        isActive: true,
        name: '',
        description: '',
        items: [],
        loading: false,
        editMode: false,
        disabled: false,
        value: { language: 'JavaScript', library: 'Vue-Multiselect' },
        options: [{	language: 'JavaScript', library: 'Vue.js' },
      { language: 'JavaScript', library: 'Vue-Multiselect' },
      { language: 'JavaScript', library: 'Vuelidate' }]
      }
    },
    methods: {
      customLabel (option) {
      return `${option.library} - ${option.language}`
    },
      showModal() {
        $('.ui.modal')
          .modal('show')
          ;
      },
      hideModal() {
        $('.ui.modal')
          .modal('hide')
          ;
      },
      async fetchData() {
        const res = await Devless.queryData('mkoo', 'meal')
        console.log(res)

        if (res.status_code === 625) {

          this.meals = res.payload.results

          this.$nextTick(() => {
            this.isActive = !this.isActive
            $('#datatable').DataTable({
              "order": [[0, "asc"]]
            })
          })
          return
        }
        alert('Failed to retrieve data from server. Please reload the page.')
      },
      async fetchItems() {
        const res = await Devless.queryData('mkoo', 'item')
        if (res.status_code === 625) {
          this.items = res.payload.results
          this.loading = false

          return
        }
      },
      async addMeal() {
        const res = await Devless.addData('mkoo', 'meal', {
          name: this.name,
          description: this.description
        })
      },
      async updateMeal () {

      },
      async deleteItem(index, id) {
        const res = await Devless.deleteData('mkoo', 'meal')

        if (res.status_code === 636) {

          this.msg = 'Record deleted successfully'
          this.color = 'red'

          this.meals.splice(index, 1)

          return
        }

        alert('Error deleting record')
      }
    },
    mounted() {
      this.fetchData()
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>