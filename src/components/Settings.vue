<template>
  <div>
    <p class="text-2xl font-sans">Accounts</p>
    <div class="">
    <div class="ui message" :class="{'success': success, 'error': !success}" v-show="msg">
      <div class="header">
        {{ msg }}
      </div>
    </div>
      <div class="bg-white p-4 shadow-md rounded">
        <form class="ui form" @submit.prevent>
          <div class="fields two">
            <div class="field">
              <label>Full Name</label>
              <input type="text" name="name" placeholder="John Doe" v-model="user.first_name">
            </div>
            <div class="field">
              <label>Username</label>
              <input type="text" name="username" placeholder="johndoe" v-model="user.username">
            </div>
          </div>
          <div class="fields two">
            <div class="field">
              <label>Email</label>
              <input type="email" name="email" placeholder="johndoe@example.com" v-model="user.email">
            </div>
            <div class="field">
              <label>Organization Name</label>
              <input type="text" name="organ-name" placeholder="KuzaForms" v-model="user.last_name">
            </div>
          </div>
          <div class="field">
            <label>Password</label>
            <input type="password" name="password" placeholder="************" v-model="password">
          </div>
          <button class="ui button" type="submit">Cancel</button>
          <button class="ui button secondary" type="submit" @click="updateProfile">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import Devless from '@/utils/devless'

  export default {
    data: () => ({
      user: {},
      password: '',
      success: false,
      msg: undefined
    }),
    mounted () {
      this.checkAuthStatus();
    },
    methods: {
      async checkAuthStatus () {
        const token = localStorage.getItem('token')
        Devless.setToken(token)
        const response = await Devless.call('devless', 'profile')
        if (response.status_code === 637 && response.payload.result !== false) {
          this.user = response.payload.result
          return true
        }

        this.$router.push({ name: 'Login', params: { msg: 'Your session expired. Please login to continue'}})
    
      },
      async updateProfile () {
        
        const response = await Devless.call('devless', 'updateProfile', [
          this.user.email, 
          this.password, 
          this.user.username, 
          '', 
          this.user.first_name,
          this.user.last_name
        ])

        if(response.payload.result) {

          this.msg = 'Profile update successful.';
          this.success = true;
          return true
        } 

        this.msg = 'Profile update failed. Try again';
        this.success = false;
      }
    }
  }
</script>