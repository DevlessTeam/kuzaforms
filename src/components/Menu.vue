<template>
	<div class="md w-full">
		<p class="text-2xl font-sans">Menus</p>
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
		<div class="my-2 bg-white p-2 shadow-md rounded">
			<table class="ui celled table" id="datatable">
				<thead>
					<tr>
						<th>#</th>
						<th>Sharable Link</th>
						<th>Valid Until</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(menu, index) in menus">
						<td>{{ menu.id }}</td>
						<td>https://kuzaforms.com/mkoo?link_id={{ menu.link }}</td>
						<td>{{ menu.valid_until }}</td>
						<td>
							<button class="ui blue button">
								<i class="fa fa-eye"></i>
							</button>
							<router-link class="ui positive button" tag="button" :to="{name: 'MenuView', params: { id: menu.id, details: menu }}">
									<i class="fa fa-table"></i>
							</router-link>
							<button class="ui red button" @click="deleteMenu(index, menu.id)">
								<i class="fa fa-remove"></i>
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="ui small modal" id="menu">
				<div class="header">Menu</div>
				<div class="content">
					<div class="w-full max-w-lg">
						<div class="flex flex-wrap -mx-3 mb-6">
							<div class="w-full px-3">
								<label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
									Name
								</label>
								<input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
								 id="grid-password" type="date" placeholder="Name of Meal" v-model="valid_until" required>
							</div>
						</div>
						<div class="ui divider"></div>
						<h3 class="ui header">Meals</h3>
						<div class="flex flex-wrap -mx-3 mb-6">
							<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
									MONDAY (Lunch)
								</label>
								<div v-if="options.length !== 0">
									<multiselect :max="2" v-model="meals.monday.lunch" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
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
									<multiselect :max="2" v-model="meals.monday.dinner" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
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
									<multiselect :max="2" v-model="meals.tuesday.lunch" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
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
									<multiselect :max="2" v-model="meals.tuesday.dinner" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
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
									<multiselect :max="2" v-model="meals.wednesday.lunch" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
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
									<multiselect :max="2" v-model="meals.wednesday.dinner" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
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
									<multiselect :max="2" v-model="meals.thursday.lunch" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
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
									<multiselect :max="2" v-model="meals.thursday.dinner" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
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
									<multiselect :max="2" v-model="meals.saturday.lunch" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
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
									<multiselect :max="2" v-model="meals.saturday.dinner" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
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
									<multiselect :max="2" v-model="meals.friday.lunch" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
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
									<multiselect :max="2" v-model="meals.friday.dinner" :options="options" :multiple="true" track-by="name" label="name" placeholder="Add meal">
									</multiselect>
								</div>
								<div v-else>
									<i class="fa fa-spinner fa-spin"></i> Loading
								</div>
							</div>
						</div>
					</div>
					<button v-show="!editMode" class="ui button" @click="addMenu" :disabled="disabled">
						<i class="fa fa-spinner fa-spin mr-2" v-show="disabled"></i>Add Menu</button>
					<a class="ui button red" @click="hideModal">Close</a>
				</div>
			</div>
			<div class="flex justify-center" v-show="menus.length === 0">
				<div class="ui active inline loader"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import Devless from '@/utils/devless'
	import Multiselect from 'vue-multiselect';

	export default {
		components: { Multiselect },
		data() {
			return {
				menus: [],
				editMode: false,
				msg: undefined,
				color: undefined,
				valid_until: '',
				disabled: false,
				meals: {
					monday: {
						dinner: [],
						lunch: []
					},
					tuesday: {
						dinner: [],
						lunch: []
					},
					wednesday: {
						dinner: [],
						lunch: []
					},
					thursday: {
						dinner: [],
						lunch: []
					},
					friday: {
						dinner: [],
						lunch: []
					},
					saturday: {
						dinner: [],
						lunch: []
					}
				},
				options: []
			}
		},
		methods: {
			showModal() {
				// this.value = []
				this.valid_until = ''
				$('#menu')
					.modal('setting', 'closable', false)
					.modal('show')
					;
			},
			hideModal() {
				$('.ui.modal')
					.modal('hide')
					;
			},
			async fetchMenu() {
				const res = await Devless.queryData('mkoo', 'menu')
				if (res.status_code === 625) {
					this.menus = res.payload.results;
					this.$nextTick(() => {
						$('#datatable').DataTable({
							"order": [[0, "desc"]]
						})
					})

					this.fetchMeals()
					return
				}
				alert('Error retrieving menus')
			},
			async fetchMeals() {
				const res = await Devless.queryData('mkoo', 'meal')
				if (res.status_code === 625) {
					this.options = res.payload.results

					return
				}
				console.log(this.options)
				alert('Error occurred retrieving meals')
			},
			async addMenu() {
				let _meals = []
				for(var key in this.meals) {
    			if(this.meals.hasOwnProperty(key)) {
						for(var i in this.meals[key]) {
    					if(this.meals[key].hasOwnProperty(i)) {
								this.meals[key][i].map((item) => {
									_meals.push({
										day: key,
										type: i,
										mkoo_menu_id: '',
										mkoo_meal_id: item.id
									})
								})
							}
						}
					}
				}
				
				const res = await Devless.addData('mkoo', 'add_menu', {
					valid_until: this.valid_until,
					menu_meals: _meals
				})
				if(res.status_code === 609) {
					this.menus.push({
						id: res.payload.add_meal.payload.entry_id,
						link: res.payload.link,
						valid_until: this.valid_until
					})
					this.msg = res.message
					this.color = 'positive'

					this.hideModal();
					return
				}
				alert(res.message)
			},
			async deleteMenu(index, id) {
				if (confirm("Are you sure ?")) {
					const res = await Devless.deleteData('mkoo', 'menu', 'id', id)

					if (res.status_code === 636) {
						this.msg = 'Record deleted successfully'
						this.color = 'red'

						return
					}
					alert('Error deleting menu')
				}
			}
		},
		mounted() {
			this.fetchMenu()
		}
	}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>