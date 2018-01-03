<template>
  <div class="md p-4">
    <p class="text-2xl font-sans tracking-tight">Menu # {{ $route.params.id }}</p>
    <p class="text-xl font-sans tracking-tight">Link: https://kuzaforms.com/mkoo?link_id={{ $route.params.details.link }}</p>
    <div class="container">
      <!--<div class="ui compact menu">
        <a class="item">
          <i class="unhide icon"></i>
          View
        </a>
        <a class="item" :class="{active: isEdit}" @click="selectTab('edit')">
          <i class="edit icon"></i>
          Edit
        </a>
        <a class="item">
          <i class="remove icon"></i>
          Delete
        </a>
      </div>-->
    </div>

    <div class="my-2 bg-white p-2 shadow-md rounded">
      <!-- <p class="text-xl">Customer Details</p> -->
      <table class="ui celled table" id="datatable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <!--<th>Option</th>-->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders">
            <td>{{ index }}</td>
            <td>{{ getEmail(order) }}</td>
            <td>
              <p><b>Lunch: </b>{{ getLunch(order, 'monday') }}</p>
              <p><b>Dinner: </b>{{ getLunch(order, 'monday') }}</p>
            </td>
            <td>
              <p><b>Lunch: </b>{{ getLunch(order, 'tuesday') }}</p>
              <p><b>Dinner: </b>{{ getLunch(order, 'tuesday') }}</p>
            </td>
            <td>
              <p><b>Lunch: </b>{{ getLunch(order, 'wednesday') }}</p>
              <p><b>Dinner: </b>{{ getLunch(order, 'wednesday') }}</p>
            </td>
            <td>
              <p><b>Lunch: </b>{{ getLunch(order, 'thursday') }}</p>
              <p><b>Dinner: </b>{{ getLunch(order, 'thursday') }}</p>
            </td>
            <td>
              <p><b>Lunch: </b>{{ getLunch(order, 'friday') }}</p>
              <p><b>Dinner: </b>{{ getLunch(order, 'friday') }}</p>
            </td>
            <td>
              <p><b>Lunch: </b>{{ getLunch(order, 'saturday') }}</p>
              <p><b>Dinner: </b>{{ getLunch(order, 'saturday') }}</p>
            </td>
            <!--<td>
              <button class="button ui red">
                <i class="fa fa-remove"></i>
              </button>
            </td>-->
          </tr>
        </tbody>
      </table>
      <div class="flex justify-center" v-show="orders.length === 0">
        <div class="ui active inline loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Devless from '@/utils/devless'
  import _ from 'lodash'

  export default {
    data: () => ({
      orders: []
    }),
    methods: {
      async fetchOrders() {
        const resp = await Devless.queryData('mkoo', 'order', {
          where: ['mkoo_menu_id,' + this.$route.params.id],
          related: 'meal'
        })

        if (resp.status_code === 625) {
          
          let res = _.groupBy(resp.payload.results, 'name')
          let resz = _.forEach(res, function (val, key) {
            res[key] = _.groupBy(res[key], 'day')
          })

          _.forEach(resz, function (val, key) {
            _.forEach(val, function (v, i) {
              resz[key][i] = _.groupBy(res[key][i], 'type')
            })
          })

          this.orders = resz;

          this.$nextTick(function () {
            $('#datatable').DataTable();
          })

          return
        }
        alert('Error retrieving orders')
      },
      getEmail(item){
        let obj = item[Object.keys(item)[0]]
        return obj[Object.keys(obj)[0]][0].email
      },
      getLunch(item, key) {
        return item[key].lunch[0].related.meal[0].name
      },
      getDinner(item, key) {
        return item[key].dinner[0].related.meal[0].name
      },
      async deleteOrder (id) {
        const res = await Devless.deleteData('mkoo', 'order')
      }
    },
    mounted() {
      this.fetchOrders();
    }
  }
</script>