<template>
  <div>
    <p class="text-2xl font-sans">Meals</p>
    <div class="ui compact menu">
      <a class="item" @click="showModal">
        <i class="plus icon"></i>
        New
      </a>
    </div>
    <div class="w-1/2 my-2">
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
            <td>{{ index + 1 }}</td>
            <td>{{ meal.name }}</td>
            <td>{{ meal.description }}</td>
            <td>
              <a class="bg-grey p-2 rounded hover:bg-black hover:text-white" @click="showMeal(meal)">
                <i class="fa fa-eye"></i>
              </a>
              <a class="bg-red-darker p-2 rounded text-white hover:bg-red hover:text-white" @click="deleteItem(index, meal.id)">
                <i class="fa fa-remove"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="ui small modal" id="meal">
        <div class="header">Meal</div>
        <div class="content">
          <form class="w-full max-w-lg" @submit.prevent>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                  Name
                </label>
                <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="grid-password" type="text" placeholder="Name of Meal" v-model="name" required>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                  Description
                </label>
                <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                 type="text" placeholder="Description of Meal" v-model="description">
              </div>
            </div>
            <div class="ui divider"></div>
            <h3 class="ui header">Meal Ingredients</h3>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                  Select an ingredient
                </label>
                <div v-if="!loading"> 
                  <multiselect 
                    v-model="value" 
                    :options="options"
                    :multiple="true"
                    track-by="name"
                    label="name"
                    placeholder="Select an Ingredient"
                    :disabled="editMode"
                    >
                  </multiselect>
                </div>
                <div v-else>
                  <i class="fa fa-spinner fa-spin"></i> Loading
                </div>
              </div>
            </div>
            <button v-show="!editMode" class="ui button" @click="addMeal" :disabled="disabled">
                <i class="fa fa-spinner fa-spin mr-2" v-show="disabled"></i>Save</button>
            <button v-show="editMode" class="ui button" @click="updateMeal" :disabled="disabled">
                <i class="fa fa-spinner fa-spin mr-2" v-show="disabled"></i>Update</button>
              <a class="ui button red" @click="hideModal" onclick="$('.ui.modal').modal('hide')">
                Close</a>
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
        id: '',
        meals: [],
        msg: undefined,
        color: undefined,
        isActive: true,
        name: '',
        description: '',
        loading: true,
        editMode: false,
        disabled: true,
        value: [],
        options: [],
      }
    },
    methods: {
      showModal() {
        this.editMode = false
        this.value = []
        this.name = ''
        this.description = ''
        $('#meal')
          .modal('setting', 'closable', false)
          .modal('show')
          ;
      },
      hideModal() {
        $('#meal')
          .modal('hide')
          ;
      },
      async fetchData() {
        const res = await Devless.queryData('mkoo', 'meal')

        if (res.status_code === 625) {

          this.meals = res.payload.results
          this.fetchItems()

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
          this.options = res.payload.results
          this.loading = false
          this.disabled = false

          return
        }
      },
      async addMeal() {
        this.disabled = true
        if (this.value.length !== 0) {
          let items = [];
          this.value.map(function(item) {
            items.push(item.id)
          })
          
          const res = await Devless.addData('mkoo', 'add_meal', { 
            name: this.name,
            description: this.description,
            item_ids: items
          })

          if (res.status_code === 609) {
            this.color = 'positive'
            this.msg = res.message
            this.disabled = false
            this.meals.push({
              id: res.payload.add_meal.payload.entry_id,
              name: this.name,
              description: this.description
            })
            this.hideModal()

            return true
          }
          alert ('Error adding meal');
        } else {
          alert('Select at least one ingredient')
        }
        
      },
      async updateMeal() {
        const res = await Devless.updateData('mkoo', 'meal', 'id', this.id, {
          name: this.name,
          description: this.description
        })

        if(res.status_code === 619) {
          this.msg = 'Record updated successfully'
          this.color = 'positive'
          this.hideModal();
          
          return
        }
        this.hideModal();
        
        alert(res.message)
      },
      async showMeal(el) {
        this.showModal()
        this.loading = true
        this.name = el.name
        this.editMode = true
        this.description = el.description
        this.id = el.id
        const res = await Devless.queryData('mkoo', 'meal_items', {
          where: ['mkoo_meal_id,'+el.id],
          related: 'item'
        })
        if(res.status_code === 625) {
          this.loading = false
          for (let index = 0; index < res.payload.results.length; index++) {
            const element = res.payload.results[index];
            this.value.push(element.related.item[0])
          }
        }
      },
      async deleteItem(index, id) {
        if (confirm("Are you sure?")) {
          const res = await Devless.deleteData('mkoo', 'meal', 'id', id)

          if (res.status_code === 636) {

            this.msg = 'Record deleted successfully'
            this.color = 'red'

            this.meals.splice(index, 1)

            return
          }

          alert('Error deleting record')
        }
      }
    },
    mounted() {
      this.fetchData()
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>