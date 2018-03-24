<template>
  <div class="md p-4">
    <p class="text-2xl font-sans tracking-tight">Menu # {{ $route.params.id }}</p>
    <!--<p class="text-xl font-sans tracking-tight">Link: https://kuzaforms.com/mkoo?link_id={{ $route.params.details.link }}</p>-->
    <div class="mb-4">
      <button class="ui button primary" v-if="!visible" @click="getSummary">Get Summary</button>
      <button class="ui button red" v-else @click="visible = !visible">Close Summary</button>
    </div>
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
    <div class="mb-4">
    <div class="ui cards" v-if="visible">
      <div class="card teal">
        <div class="content">
          <div class="header">Monday</div>
          <div class="meta" v-if="summary.monday">Lunch: <b>{{ summary.monday.lunch }}</b></div>
          <div class="meta" v-if="summary.monday">Dinner: <b>{{ summary.monday.dinner }}</b></div>
        </div>
      </div>
      <div class="card blue">
        <div class="content">
          <div class="header">Tuesday</div>
          <div class="meta" v-if="summary.tuesday">Lunch: <b>{{ summary.tuesday.lunch }}</b></div>
          <div class="meta" v-if="summary.tuesday">Dinner: <b>{{ summary.tuesday.dinner }}</b></div>
        </div>
      </div>
      <div class="card violet">
        <div class="content">
          <div class="header">Wednesday</div>
          <div class="meta" v-if="summary.wednesday">Lunch: <b>{{ summary.wednesday.lunch }}</b></div>
          <div class="meta" v-if="summary.wednesday">Dinner: <b>{{ summary.wednesday.dinner }}</b></div>
        </div>
      </div>
      <div class="card yellow">
        <div class="content">
          <div class="header">Thursday</div>
          <div class="meta"  v-if="summary.thursday">Lunch: <b>{{ summary.thursday.lunch }}</b></div>
          <div class="meta" v-if="summary.thursday">Dinner: <b>{{ summary.thursday.dinner }}</b></div>
        </div>
      </div>
      <div class="card green">
        <div class="content">
          <div class="header">Friday</div>
          <div class="meta" v-if="summary.friday">Lunch: <b>{{ summary.friday.lunch }}</b></div>
          <div class="meta"  v-if="summary.friday">Dinner: <b>{{ summary.friday.dinner }}</b></div>
        </div>
      </div>
      <div class="card red">
        <div class="content">
          <div class="header">Saturday</div>
          <div class="meta" v-if="summary.saturday">Lunch: <b>{{ summary.saturday.lunch }}</b></div>
          <div class="meta" v-if="summary.saturday">Dinner: <b>{{ summary.saturday.dinner }}</b></div>
        </div>
      </div>
    </div>
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
          <tr v-for="(order, index) in orders" :key="index">
            <td>{{ getName(order) }}</td>
            <td>{{ index }}</td>
            <td>
              <p>
                <b>Lunch: </b>{{ getLunch(order, 'monday') }}</p>
              <p>
                <b>Dinner: </b>{{ getDinner(order, 'monday') }}</p>
            </td>
            <td>
              <p>
                <b>Lunch: </b>{{ getLunch(order, 'tuesday') }}</p>
              <p>
                <b>Dinner: </b>{{ getDinner(order, 'tuesday') }}</p>
            </td>
            <td>
              <p>
                <b>Lunch: </b>{{ getLunch(order, 'wednesday') }}</p>
              <p>
                <b>Dinner: </b>{{ getDinner(order, 'wednesday') }}</p>
            </td>
            <td>
              <p>
                <b>Lunch: </b>{{ getLunch(order, 'thursday') }}</p>
              <p>
                <b>Dinner: </b>{{ getDinner(order, 'thursday') }}</p>
            </td>
            <td>
              <p>
                <b>Lunch: </b>{{ getLunch(order, 'friday') }}</p>
              <p>
                <b>Dinner: </b>{{ getDinner(order, 'friday') }}</p>
            </td>
            <td>
              <p>
                <b>Lunch: </b>{{ getLunch(order, 'saturday') }}</p>
              <p>
                <b>Dinner: </b>{{ getDinner(order, 'saturday') }}</p>
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
      orders: [],
      summary: {},
      visible: false
    }),
    methods: {
      async fetchOrders() {
        const resp = await Devless.queryData('mkoo', 'order', {
          where: ['mkoo_menu_id,' + this.$route.params.id],
          related: 'meal'
        })


        if (resp.status_code === 625) {

          let res = _.groupBy(resp.payload.results, 'email')
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
            var table = $('#datatable').DataTable({
              buttons: [
                'excel',
                'csv',
                'pdf'
              ],
              lengthChange: false,
            });

            table.buttons().container()
              .appendTo($('div.eight.column:eq(0)', table.table().container()));
          })

          return
        }
        alert('Error retrieving orders')
      },
      async getSummary() {
        const res = await Devless.addData('mkoo', 'stats', {
          "menu_id": this.$route.params.id
        })
        if(res.status_code === 1000) {
          this.summary = res.payload
          this.visible = !this.visible
        }
      },
      getName(item) {
        let obj = item[Object.keys(item)[0]]
        return obj[Object.keys(obj)[0]][0].name
      },
      getLunch(item, key) {
        if(item.hasOwnProperty(key) && item[key].lunch !== undefined) {
          return item[key].lunch[0].related.meal[0].name
        }

        return 'unavailable'
      },
      getDinner(item, key) {
        if(item.hasOwnProperty(key) && item[key].dinner !== undefined) {
          return item[key].dinner[0].related.meal[0].name
        }

        return 'unavailable'
      },
      async deleteOrder(id) {
        const res = await Devless.deleteData('mkoo', 'order')
      }
    },
    mounted() {
      this.fetchOrders();
    }
  }
</script>