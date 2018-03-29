<template>
  <div class="md w-full">
    <p class="text-2xl font-sans">Menus</p>
    <div class="ui compact menu" v-show="newBtn">
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
    <div class="my-2 bg-white p-2 shadow-md rounded">
      <div class="flex justify-center" v-if="menus === undefined">
        <div class="ui active inline loader"></div>
      </div>
      <vue-good-table :columns="columns" :rows="menus" :globalSearch="true" :lineNumbers="true" :paginate="true" v-else>
        <template slot="table-row" slot-scope="props">
          <td>{{ formatUrl(props.row.link) }}</td>
          <td>{{ props.row.valid_until }}</td>
          <td>
						<button class="ui orange button" @click="viewMenu(props.row.link)"><i class="fa fa-eye"></i> View</button>
            <button class="ui blue button" v-clipboard:copy="formatUrl(props.row.link)" v-clipboard:success="onCopy">Copy</button>
            <router-link class="ui positive button" tag="button" :to="{name: 'MenuView', params: { id: props.row.id, details: props.row }}">
              <i class="fa fa-table"></i>
            </router-link>
            <button class="ui red button" @click="deleteMenu(props.row.originalIndex, props.row.id)">
              <i class="fa fa-remove"></i>
            </button>
          </td>
        </template>
      </vue-good-table>
      <div class="ui small modal" id="menu">
        <div class="header">Meals</div>
        <div class="content">
          <div class="w-full max-w-lg">
            <!--<div class="flex flex-wrap -mx-3 mb-6">
							<div class="w-full px-3">
								<label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
									Valid Until
								</label>
								<input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
								 id="grid-password" type="date" placeholder="Name of Meal" v-model="valid_until" required>
							</div>
						</div>
						<div class="ui divider"></div>
						<h3 class="ui header">Meals</h3>-->
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                  MONDAY (Lunch)
                </label>
                <div v-if="options.length !== 0">
                  <multiselect v-model="meals.monday.lunch" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
                  </multiselect>
                </div>
                <div v-else>
                  <i class="fa fa-spinner fa-spin"></i> Loading
                </div>
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                  MONDAY (Dinner)
                </label>
                <div v-if="options.length !== 0">
                  <multiselect v-model="meals.monday.dinner" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
                  </multiselect>
                </div>
                <div v-else>
                  <i class="fa fa-spinner fa-spin"></i> Loading
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                  tuesday (Lunch)
                </label>
                <div v-if="options.length !== 0">
                  <multiselect v-model="meals.tuesday.lunch" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
                  </multiselect>
                </div>
                <div v-else>
                  <i class="fa fa-spinner fa-spin"></i> Loading
                </div>
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                  tuesday (Dinner)
                </label>
                <div v-if="options.length !== 0">
                  <multiselect v-model="meals.tuesday.dinner" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
                  </multiselect>
                </div>
                <div v-else>
                  <i class="fa fa-spinner fa-spin"></i> Loading
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                  wednesday (Lunch)
                </label>
                <div v-if="options.length !== 0">
                  <multiselect v-model="meals.wednesday.lunch" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
                  </multiselect>
                </div>
                <div v-else>
                  <i class="fa fa-spinner fa-spin"></i> Loading
                </div>
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                  wednesday (Dinner)
                </label>
                <div v-if="options.length !== 0">
                  <multiselect v-model="meals.wednesday.dinner" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
                  </multiselect>
                </div>
                <div v-else>
                  <i class="fa fa-spinner fa-spin"></i> Loading
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                  thursday (Lunch)
                </label>
                <div v-if="options.length !== 0">
                  <multiselect v-model="meals.thursday.lunch" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
                  </multiselect>
                </div>
                <div v-else>
                  <i class="fa fa-spinner fa-spin"></i> Loading
                </div>
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                  thursday (Dinner)
                </label>
                <div v-if="options.length !== 0">
                  <multiselect v-model="meals.thursday.dinner" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
                  </multiselect>
                </div>
                <div v-else>
                  <i class="fa fa-spinner fa-spin"></i> Loading
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                  friday (Lunch)
                </label>
                <div v-if="options.length !== 0">
                  <multiselect v-model="meals.friday.lunch" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
                  </multiselect>
                </div>
                <div v-else>
                  <i class="fa fa-spinner fa-spin"></i> Loading
                </div>
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                  friday (Dinner)
                </label>
                <div v-if="options.length !== 0">
                  <multiselect v-model="meals.friday.dinner" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
                  </multiselect>
                </div>
                <div v-else>
                  <i class="fa fa-spinner fa-spin"></i> Loading
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                  saturday (Lunch)
                </label>
                <div v-if="options.length !== 0">
                  <multiselect v-model="meals.saturday.lunch" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
                  </multiselect>
                </div>
                <div v-else>
                  <i class="fa fa-spinner fa-spin"></i> Loading
                </div>
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                  saturday (Dinner)
                </label>
                <div v-if="options.length !== 0">
                  <multiselect v-model="meals.saturday.dinner" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
                  </multiselect>
                </div>
                <div v-else>
                  <i class="fa fa-spinner fa-spin"></i> Loading
                </div>
              </div>
            </div>

          </div>
          <button v-show="!editMode" class="ui button" @click="addMenu" :disabled="disabled">
            <i class="fa fa-spinner fa-spin mr-2" v-show="disabled"></i><span v-show="!disabled">Save</span><span v-show="disabled">Saving</span></button>
          <a class="ui button red" @click="hideModal">Close</a>
        </div>
      </div>
    </div>
      <div class="ui small modal" id="view-menu">
        <div class="header">Menu Details</div>
        <div class="content">
					<div class="flex justify-center" v-if="menuMeals === undefined">
						<div class="ui active inline loader"></div>
					</div>
          <div class="w-full max-w-lg" v-else>
						<div class="flex flex-wrap -mx-3 mb-6">
            <table class="ui celled padded table" >
  						<thead>
								<tr>
									<th>Days</th>
									<th>Lunch</th>
									<th>Dinner</th>
								</tr>
  						</thead>
							<tbody>
								<tr v-for="(meal, i) in menuMeals" :key="i">
									<td>{{ upperFirst(i) }}</td>
									<td>
										<span v-for="(m, d) in meal" :key="d">
											<p v-if="m.type === 'lunch'">{{ m.related.meal[0].name}}</p>
										</span>
									</td>
									<td>
										<span v-for="(m, d) in meal" :key="d">
											<p v-if="m.type === 'dinner'">{{ m.related.meal[0].name}}</p>
										</span>
									</td>
								</tr>
							</tbody>
            </table>
						</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import Devless from "@/utils/devless";
  import Multiselect from "vue-multiselect";
	import moment from "moment";
	import _ from 'lodash'

  export default {
    components: {
      Multiselect
    },
    data() {
      return {
        columns: [{
            label: "Shareable Link",
            field: "link",
            filterable: true
          },
          {
            label: "Valid Until",
            field: "valid_until",
            filterable: true
          },
          {
            label: "Actions",
            field: "actions",
            filterable: false
          }
				],
				menuMeals: undefined,
        menus: undefined,
        newBtn: true,
        editMode: false,
        msg: undefined,
        color: undefined,
        valid_until: "",
        disabled: false,
        meals: {
          monday: {
            dinner: [{
              description:"",
              devless_user_id:1,
              id:96,
              name:"Am Not Eating"
            }],
            lunch: [{
              description:"",
              devless_user_id:1,
              id:96,
              name:"Am Not Eating"
            }]
          },
          tuesday: {
            dinner: [{
              description:"",
              devless_user_id:1,
              id:96,
              name:"Am Not Eating"
            }],
            lunch: [{
              description:"",
              devless_user_id:1,
              id:96,
              name:"Am Not Eating"
            }]
          },
          wednesday: {
            dinner: [{
              description:"",
              devless_user_id:1,
              id:96,
              name:"Am Not Eating"
            }],
            lunch: [{
              description:"",
              devless_user_id:1,
              id:96,
              name:"Am Not Eating"
            }]
          },
          thursday: {
            dinner: [{
              description:"",
              devless_user_id:1,
              id:96,
              name:"Am Not Eating"
            }],
            lunch: [{
              description:"",
              devless_user_id:1,
              id:96,
              name:"Am Not Eating"
            }]
          },
          friday: {
            dinner: [{
              description:"",
              devless_user_id:1,
              id:96,
              name:"Am Not Eating"
            }],
            lunch: [{
              description:"",
              devless_user_id:1,
              id:96,
              name:"Am Not Eating"
            }]
          },
          saturday: {
            dinner: [{
              description:"",
              devless_user_id:1,
              id:96,
              name:"Am Not Eating"
            }],
            lunch: [{
              description:"",
              devless_user_id:1,
              id:96,
              name:"Am Not Eating"
            }]
          }
        },
        options: []
      };
    },
    methods: {
      showModal() {
        // this.value = []
        this.valid_until = "";
        $("#menu")
          .modal("setting", "closable", false)
          .modal("show");
      },
      hideModal() {
        $(".ui.modal").modal("hide");
      },
      formatUrl(link) {
        return `https://kuzapay.com/mkoo?link_id=${link}`;
      },
      onCopy() {
        this.msg = "Copied to clipboard";
        this.color = "violet";
        var self = this;
        setTimeout(function () {
          self.msg = undefined;
          self.color = undefined;
        }, 1000);
      },
      async fetchMenu() {
        const res = await Devless.queryData("mkoo", "menu");
        if (res.status_code === 625) {
          this.menus = res.payload.results;

          this.fetchMeals();
          return;
        }
        alert("Error retrieving menus");
      },
      async fetchMeals() {
        const res = await Devless.queryData("mkoo", "meal");
        if (res.status_code === 625) {
          this.options = res.payload.results;

          return;
        }
        alert("Error occurred retrieving meals");
      },
      async addMenu() {
        this.disabled = !this.disabled
        let _meals = [];
        for (var key in this.meals) {
          if (this.meals.hasOwnProperty(key)) {
            for (var i in this.meals[key]) {
              if (this.meals[key].hasOwnProperty(i)) {
                this.meals[key][i].map(item => {
                  _meals.push({
                    day: key,
                    type: i,
                    mkoo_menu_id: "",
                    mkoo_meal_id: item.id
                  });
                });
              }
            }
          }
        }

        this.valid_until = moment()
          .day(4)
          // .add(1, "week")
          .format("YYYY-MM-DD");

        const res = await Devless.addData("mkoo", "add_menu", {
          valid_until: this.valid_until,
          menu_meals: _meals
        });
        this.disabled = !this.disabled
        if (res.status_code === 609) {
          this.msg = res.message;
          this.color = "positive";

          this.fetchMenu();

          this.hideModal();
          return;
        }
        alert(res.message);
      },
      async deleteMenu(index, id) {
        if (confirm("Are you sure ?")) {
          const res = await Devless.deleteData("mkoo", "menu", "id", id);

          if (res.status_code === 636) {
            this.menus.splice(index, 1)
            this.msg = "Record deleted successfully";
            this.color = "red";

            return;
          }
          alert("Error deleting menu");
        }
			},
			async viewMenu (token) {
				const res = await Devless.addData('mkoo', 'meal_query', { token: token, email: '' })
          if (res.status_code === 625) {
						this.menuMeals = _.groupBy(res.payload, 'day');
						delete this.menuMeals['undefined']
    				$('#view-menu')
              .modal('show')
            this.$nextTick(() => {
              $('#view-menu').modal('refresh')
            })
						return;
					}
					alert('An error occurred')
			},
			upperFirst(key) {
				return _.upperFirst(key)
			}
    },
    mounted() {
      this.fetchMenu();
      if (
        moment()
        .isoWeekday("Sunday")
        .format("dddd") === moment().format("dddd")
      ) {
        this.newBtn = false;
      }
    }
  };

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
