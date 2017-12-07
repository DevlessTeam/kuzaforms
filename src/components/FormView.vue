<template>
  <div class="md p-4">
    <p class="text-2xl font-sans tracking-tight">Order # {{ $route.params.id }}</p>
    <div class="container">
      <div class="ui compact menu">
        <a class="item" :class="{active: isView}" @click="selectTab('view')">
          <i class="unhide icon"></i>
          View
        </a>
        <a class="item" :class="{active: isEdit}" @click="selectTab('edit')">
          <i class="edit icon"></i>
          Edit
        </a>
        <a class="item" @click="deleteRecord">
          <i class="remove icon"></i>
          Delete
        </a>
      <div class="item" v-show="isEdit"><a class="ui button green" @click="updateRecord">Update</a></div>
      </div>
      <div class="float-right">
        <a class="ui teal right ribbon label">Payment completed</a>
      </div>
    </div>

    <div class="my-2 bg-white p-2 shadow-md rounded">
      <div class="ui message" :class="{'success': success, 'error': error}" v-show="msgAlert">
        <div class="header">
          <span v-show="success">{{ success }}</span>
          <span v-show="error">{{ error }}</span>
        </div>
      </div>
      <div class="flex flex-wrap -mx-4">
        <div class="w-full md:w-1/3 px-4 border-r">
          <div class="p-4">
            <form class="ui form">
              <h4 class="ui dividing header">Customer Details</h4>

              <div class="field">
                <label>Name</label>
                <div class="field">
                  <input type="text" v-model="record.name" :readonly="!isEdit">
                </div>
              </div>
              <div class="field">
                <label>Phone Number</label>
                <div class="field">
                  <input type="tel" v-model="'0' + record.number" :readonly="!isEdit">
                </div>
              </div>
              <div class="field">
                <label>Email</label>
                <div class="field">
                  <input type="email" v-model="record.email" :readonly="!isEdit">
                </div>
              </div>
              <div class="two fields">
                <div class="field">
                  <label>Delivery Locaiton</label>
                  <input type="text" placeholder="Madina" v-model="record.delivery_location" :readonly="!isEdit">
                </div>
                <div class="field">
                  <label>Delivery Time</label>
                  <input type="text" placeholder="12:00" v-model="record.delivery_time" :readonly="!isEdit">
                </div>
              </div>
              <!-- <div class="ui button" tabindex="0">Submit Order</div> -->
            </form>
          </div>
        </div>
        <div class="w-full md:w-2/3 px-4">
          <div class="p-4">
            <h4 class="ui dividing header">Order Details</h4>
            <table class="ui celled table">
              <thead>
                <tr>
                  <th>Cut</th>
                  <th>Quantity (KG)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="field in fieldTypes" v-show="record[field.name] !== null">
                  <td>
                    <input type="text" class="no-input-border" :value="field.name" readonly v-if="field.type === undefined">
                    <input type="text" class="no-input-border" v-model="record[field.name]" :readonly="!isEdit" v-else>
                  </td>
                  <td><input type="number" class="no-input-border" v-model="record[field.tag]" :readonly="!isEdit"></td>
                </tr>
              </tbody>
            </table>
            <div class="text-xl font-semibold font-sans">
              <p>
                <span>Total Quantity (KG): </span>{{ record.total_quantity }}</p>
              <p>Total Price (GH&#8373;): {{ formatPrice(record.total_payable) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Devless from '@/utils/devless'

  export default {
    data: () => ({
      record: {},
      msgAlert: false,
      success: undefined,
      error: undefined,
      isView: true,
      isEdit: false,
      fieldTypes: [
        {
          name: 'Boneless Stewing Beef',
          tag: 'boneless_stewing_beef'
        },
        {
          name: 'Bone In Stewing beef',
          tag: 'bone_in_stewing_beef'
        },
        {
          name: 'Ribs',
          tag: 'ribs',
        },
        {
          name: 'Mince',
          tag: 'mince'
        },
        {
          name: 'Steak Boneless',
          tag: 'steak_bonless'
        },
        {
          name: 'Steak Bone In',
          tag: 'steak_bone_in'
        },
        {
          name: 'Wele',
          tag: 'wele'
        },
        {
          name: 'off_cut_part',
          type: 'variable',
          tag: 'off_cut'
        },
        {
          name: 'offal_part',
          type: 'variable',
          tag: 'offal'
        }
      ]
    }),
    created () {
      if ( this.$route.params.data !== undefined) {
        this.record = this.$route.params.data
      } else {
        this.fetchData()
      }
    },
    methods: {
      selectTab (tab) {
        if (tab === 'view') {
          this.isView = true;
          this.isEdit = false;
        } else {
          this.isView = false;
          this.isEdit = true;
        }
      },
      async fetchData () {
        const response = await Devless.queryData('farmable', 'orders', {
          where: `id,${this.$route.params.id}`
        })
        this.record = response.payload.results[0]
      },
      formatPrice(value) {
        let val = (value/1).toFixed(2).replace(',', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
      async deleteRecord () {
        if (confirm('Are you sure?')) {
          
          const token = localStorage.getItem('token')
          Devless.setToken(token)

          const response = await Devless.deleteData('farmable', 'orders', 'id', this.$route.params.id)
          if (response.status_code === 636) {
            this.$router.go({name: 'DataForm', params: { id: 1, msg: 'Record deleted successfully'}})
            return 
          }

          alert('unexpected error occurred! Please try again')
        }
      },
      async updateRecord () {
        
        const token = localStorage.getItem('token')
        Devless.setToken(token)
        
        const response = await Devless.updateData('farmable', 'orders', 'id', this.$route.params.id, this.record)
        this.msgAlert = true;
        
        if( response.status_code === 619 ) {
          this.success = 'Order updated successfully!'
          this.isEdit = false
          this.error = undefined
          return true
        }

        this.success = undefined
        this.error = 'An error occurred!'
      }
    }
  }
</script>

<style lang="css" scoped>
  .no-input-border {
    border: 0 !important;
  }
</style>