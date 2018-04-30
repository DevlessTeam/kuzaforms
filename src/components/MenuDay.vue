<template>
  <div class="flex md p-4 mt-4 justify-center">
    <div class="my-2 bg-white p-2 shadow-md rounded">
      <p class="text-xl">{{`${toUpper(day)} - ${toUpper(type)}`}}</p>
      <table class="ui celled table" id="datatable">
        <thead>
          <tr>
            <th>Email (Name)</th>
            <th v-for="(m, i) in meals" :key="i">{{ m }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="index">
            <td>{{`${order.email} (${order.name})`}}</td>
            <td v-for="(m, i) in meals" :key="i">
              <i class="fa fa-check-circle" style="color: #4ba351;" v-if="m === order.related.meal[0].name"></i>
              <i class="fa fa-times-circle" v-else></i>
            </td>
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
  import _ from 'lodash'
  import Devless from '@/utils/devless'

  export default {
    data: () => ({
      day: '',
      id: '',
      type: '',
      orders: [],
      meals: []
    }),
    methods: {
      toUpper(day) {
        return day.toUpperCase();
      },
      async fetchOrders() {
        const resp = await Devless.queryData('mkoo', 'order', {
          where: ['mkoo_menu_id,' + this.id, `day,${this.day}`, `type,${this.type}`],
          related: 'meal'
        })
        console.log(resp)
        let meals = []
        if (resp.status_code === 625) {
          _.map(resp.payload.results, function (v) {
            if(meals.indexOf(v.related.meal[0]['name']) === -1) {
              meals.push(v.related.meal[0]['name'])
            }
          })
          this.meals = meals.reverse();
          this.orders = resp.payload.results;
          // let res = _.groupBy(resp.payload.results, 'email')
          // let resz = _.forEach(res, function (val, key) {
          //   res[key] = _.groupBy(res[key], 'day')
          // })

          // _.forEach(resz, function (val, key) {
          //   _.forEach(val, function (v, i) {
          //     resz[key][i] = _.groupBy(res[key][i], 'type')
          //   })
          // })

          // this.orders = resz;

          // this.$nextTick(function () {
          //   var table = $('#datatable').DataTable({
          //     buttons: [
          //       'excel',
          //       'csv',
          //       'pdf'
          //     ],
          //     lengthChange: false,
          //   });

          //   table.buttons().container()
          //     .appendTo($('div.eight.column:eq(0)', table.table().container()));
          //   $('.ui.stackable.grid').css('width', "102%")
          // })

          return
        }
        console.log(resp)
        alert('Error retrieving orders')
      },
      getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
      },
      getName(item) {
        let obj = item[Object.keys(item)[0]]
        return obj[Object.keys(obj)[0]][0].name
      },
      getLunch(item, key) {
        if (item.hasOwnProperty(key) && item[key].lunch !== undefined) {
          return item[key].lunch[0].related.meal[0].name
        }

        return 'unavailable'
      },
      getDinner(item, key) {
        if (item.hasOwnProperty(key) && item[key].dinner !== undefined) {
          return item[key].dinner[0].related.meal[0].name
        }

        return 'unavailable'
      },
    },
    mounted() {
      this.day = this.getParameterByName("d", location.href)
      this.id = this.getParameterByName("q", location.href)
      this.type = this.getParameterByName("t", location.href)
      this.fetchOrders()
    }
  }

</script>

<style scoped>

</style>
