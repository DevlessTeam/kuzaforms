<template>
  <div>
    <!--<div class="md w-5/6 p-4">-->
    <div class="ui message success" v-show="$route.params.msg">
      <div class="header">{{ $route.params.msg }}</div>
    </div>
    <p class="text-2xl font-sans">Farmable Orders</p>
    <div class="my-2 bg-white p-2 shadow-md rounded">
      <table class="ui celled table" id="datatable">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Delivery Location</th>
            <th>Delivery Time</th>
            <th>Total Quantity (kg)</th>
            <th>Total Amount (GH&#8373;)</th>
            <th>Timestamp</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in tableData">
            <td>{{ record.id }}</td>
            <td>{{ record.name }}</td>
            <td>0{{ record.number }}</td>
            <td>{{ record.email }}</td>
            <td>{{ record.delivery_location }}</td>
            <td>{{ record.delivery_time }}</td>
            <td>{{ record.total_quantity }}</td>
            <td>{{ record.total_payable }}</td>
            <td>{{ record.created_at }}</td>
            <td>
              <router-link :to="{name: 'FormView', params: { id: record.id, data: record }}">
                <a class="bg-grey p-2 rounded hover:bg-blue hover:text-white">
                  <i class="fa fa-eye"></i>
                </a>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-center" v-show="isActive">
        <div class="ui active inline loader"></div>
      </div>
    </div>
  </div>
  <!--</div>-->
</template>

<script>
  import Devless from '@/utils/devless'

  export default {
    data: () => ({
      isActive: true,
      tableData: []
    }),
    mounted() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        const response = await Devless.queryData('farmable', 'orders')
        if (response.status_code === 625) {
          this.tableData = response.payload.results
          this.$nextTick(() => {
            if (response.payload.results.length !== 0) {
              this.isActive = !this.isActive
              $('#datatable').DataTable({
                  "order": [[ 0, "desc" ]]
              })
            } else {
              this.isActive = !this.isActive
              $('#datatable').DataTable({
                  "order": [[ 0, "desc" ]]
              })
            }
          })

          return true
        }
        alert('Failed to retrieve data from server. Please reload the page.')
      }
    }
  }
</script>