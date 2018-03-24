<template>
  <div class="flex flex-col container mx-auto h-screen h-full justify-center w-1/3">
    <div class="w-full">

      <div class="ui center aligned grid">
        <div class="column">
          <h2 class="ui image header">
            <img src="static/logo.jpg" class="ui image">
            <div class="content">
              <p class="text-grey-darker">Log-in to your account</p>
            </div>
          </h2>
          <div class="ui error message" v-show="errorState">
            <ul class="list">
              <li>Incorrect credentials</li>
              <li>Please try again</li>
            </ul>
          </div>
          <div class="ui error message" v-show="$route.params.msg">
            <div class="header">
              {{ $route.params.msg }}
            </div>
          </div>
          <form class="ui fluid form" @submit.prevent="validateBeforeSubmit">
            <div class="ui stacked segment">
              <div class="field">
                <div class="ui left icon input">
                  <i class="mail icon"></i>
                  <input type="email" name="email" placeholder="johndoe@example.com" v-model="email"  v-validate="'required|email'" data-vv-delay="1000">
                  <div class="ui left pointing label" v-show="errors.has('email')">
                      <p class="text-red text-xs italic">{{ errors.first('email') }}</p>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="ui left icon input">
                  <i class="lock icon"></i>
                  <input type="password" name="password" placeholder="*********" v-model="password" v-validate="'required|min:6'" data-vv-delay="1000">
                  <div class="ui left pointing label" v-show="errors.has('password')">
                      <p class="text-red text-xs italic">{{ errors.first('password') }}</p>
                  </div>
                </div>
              </div>
              <button class="ui fluid large submit button" :disabled="disabled">Login</button>
            </div>
            <div class="ui error message"></div>
          </form>
          <!-- <div class="ui message"> -->
            <!-- <span class="text-grey">New to us?</span> -->
            <!--<router-link :to="{name: 'Register'}" class="text-black font-semibold">Sign Up</router-link>-->
            <!-- <a href="http://kuzaforms.com" target="_blank" class="text-black font-semibold">Sign Up</a> -->
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Devless from '@/utils/devless'
  // import store from '@/store'
  import Cookies from 'js-cookie';

  export default {
    data: () => ({
        disabled: false,
        email: undefined,
        password: undefined,
        errorState: false
    }),
    methods: {
      validateBeforeSubmit() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            // eslint-disable-next-line
            this.disabled = true;
            this.login()
            // this.$store.dispatch('login')
            return;
          }
          this.disabled = false;
          this.errorState = !this.errorState
        });
      },
      async login () {
        const response = await Devless.call('devless', 'login', ['', this.email, '', this.password])
        if (response.status_code === 637) {
          if (response.payload.result) {
            localStorage.setItem('token', response.payload.result.token)
            Cookies.set('token', response.payload.result.token);
            // Devless.setToken(response.payload.result.token)
            this.$store.dispatch('login')
            return true
          }
          this.disabled = false;
          this.errorState = !this.errorState
        } else {
          alert('An unexpected error. Contact Adminstrator!')
        }
      }
    },
    created() {
      if (this.$store.state.authState) {
        return this.$router.push('/');
      }
    }
  }
</script>