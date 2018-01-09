<template>
  <div class="md">
    <p class="text-2xl font-sans">Ingredients</p>
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
          <tr v-for="(item, index) in items">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>
              <a class="bg-grey p-2 rounded hover:bg-black hover:text-white" @click="editModal(item, index)">
                <i class="fa fa-edit"></i>
              </a>
              <a class="bg-red-darker p-2 rounded text-white hover:bg-red hover:text-white" @click="deleteItem(index, item.id)">
                <i class="fa fa-remove"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="ui modal" id="items">
        <div class="header">Ingredient</div>
        <div class="content">
          <form class="ui form" @submit.prevent>
            <div class="field">
              <label>Name</label>
              <input type="text" v-model="name" placeholder="Name of Ingredient">
            </div>
            <div class="field">
              <label>Description</label>
              <input type="text" v-model="description" placeholder="Description of Ingredient">
            </div>
            <button v-show="!editMode" class="ui button" @click="addItem" :disabled="disabled"><i class="fa fa-spinner fa-spin mr-2" v-show="loading"></i>Save</button>
            <a v-show="editMode" class="ui button" @click="updateItem" :disabled="disabled"><i class="fa fa-spinner fa-spin mr-2" v-show="loading"></i>Save</a>
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
  import Devless from '@/utils/devless'

  export default {
    data() {
      return {
        items: [],
        id: {},
        msg: undefined,
        color: undefined,
        isActive: true,
        disabled: false,
        loading: false,
        name: '',
        description: '',
        editMode: false
      }
    },
    methods: {
      async fetchItems() {
        const res = await Devless.queryData('mkoo', 'item')
        this.items = res.payload.results;
        if (res.status_code === 625) {
          this.$nextTick(() => {
            if (res.payload.results.length !== 0) {
              this.isActive = !this.isActive
              $('#datatable').DataTable({
                "order": [[0, "asc"]]
              })
            } else {
              this.isActive = !this.isActive
              $('#datatable').DataTable({
                "order": [[0, "asc"]]
              })
            }
          })
          return
        }
        alert('Failed to retrieve data from server. Please reload the page.')
      },
      async deleteItem(index, id) {
        const res = await Devless.deleteData('mkoo', 'item', 'id', id)
        console.log(res)
        if (res.status_code === 636) {
          this.msg = 'Record deleted successfully'
          this.color = 'red'

          this.items.splice(index, 1);

          return
        }

        alert('An error occurred!')
      },
      showModal() {
        this.loading = false
        this.disabled = false
        this.editMode = false
        this.name = ''
        this.description = ''
        $('#items')
          .modal('setting', 'closable', false)
          .modal('show')
          ;
      },
      hideModal() {
        $('.ui.modal')
          .modal('hide')
          ;
      },
      editModal(item, index) {
        this.showModal()
        this.editMode = true
        this.name = item.name
        this.id.id = item.id
        this.id.index = index
        this.description = item.description
      },
      async addItem () {
        this.loading = true
        this.disabled = true
        const res = await Devless.addData('mkoo', 'item', {
          name: this.name,
          description: this.description
        })
        console.log(res)
        if(res.status_code === 609) {
          this.items.push({
            id: res.payload.entry_id,
            name: this.name,
            description: this.description
          });
          this.hideModal();

          this.msg = 'Record added successfully';
          this.color = 'positive'

          return true
        }

        alert(res.message)
      },
      async updateItem () {
        this.loading = true
        this.disabled = true
        const res = await Devless.updateData('mkoo', 'item', 'id', this.id.id, {
          name: this.name,
          description: this.description
        });
        console.log(res)

        if (res.status_code === 619) {
          this.items[this.id.index] = {
            id: this.id.id,
            name: this.name,
            description: this.description
          }

          this.hideModal()

          this.msg = 'Record updated successfully';
          this.color = 'positive'
          return true
        }

        alert('Error updating record')
      },
    },
    mounted() {
      this.fetchItems()
    }
  }
</script>