<template>
<div>

  <div class="md w-full">
		<p class="text-2xl font-sans">Feedback</p>
  </div>
  <div class="my-2 bg-white p-2 shadow-md rounded">
    <div class="flex justify-center" v-if="feedbacks === undefined">
      <div class="ui active inline loader"></div>
    </div>
    <vue-good-table :columns="columns" :rows="feedbacks" :globalSearch="true" :lineNumbers="true" :paginate="true" v-else>
    </vue-good-table>
  </div>
</div>
</template>

<script>
import Devless from '../utils/devless'
import _ from 'lodash'

export default {
  data: () => ({
    columns: [
      {
        label: 'Name',
        field: 'name',
        filterable: true,
      },
      {
        label: 'Email',
        field: 'email',
        filterable: true,
      },
      {
        label: 'Feedback',
        field: 'feedback',
        filterable: true,
      },
      {
        label: 'Date',
        field: 'date',
        filterable: true,
      }
    ],
    feedbacks: undefined
  }),
  methods: {
    async fetchFeedbacks() {
      const res = await Devless.queryData('mkoo', 'feedback')
      if (res.status_code === 625) {
        this.feedbacks = _.reverse(res.payload.results)
        return
      }
      alert('Error retrieving feedbacks');
    }
  },
  mounted () {
    this.fetchFeedbacks()
  }
}
</script>
