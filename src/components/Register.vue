<template>
  <div class="flex flex-col container mx-auto h-screen h-full justify-center w-1/3">
    <div class="w-full">

      <div class="ui center aligned grid">
        <div class="column">
          <h2 class="ui teal image header">
            <img src="http://kuzaforms.com/images/logo.png" class="image">
            <div class="content">
              <p class="text-grey-darker">Register your account</p>
            </div>
          </h2>
          <div class="ui error message" v-show="errorState">
            <ul class="list">
              <li>Oops!! An error occurred</li>
              <li>Please try again</li>
            </ul>
          </div>
          <form class="ui fluid form" @submit.prevent="validateBeforeSubmit">
            <div class="ui stacked segment">
              <div class="field">
                <div class="ui left icon input">
                  <i class="user icon"></i>
                  <input type="text" name="name" placeholder="John Doe" v-model="name"  v-validate="'required|alpha_spaces'" data-vv-delay="1000">
                  <div class="ui left pointing label" v-show="errors.has('name')">
                      <p class="text-red text-xs italic">{{ errors.first('name') }}</p>
                  </div>
                </div>
              </div>
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
              <button class="ui fluid large submit button">Register</button>
            </div>
            <div class="ui error message"></div>
          </form>
          <div class="ui message">
            <span class="text-grey">Already a user?</span>
            <router-link :to="{name: 'Login'}" class="text-black font-semibold">Sign In</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
        name: undefined,
        email: undefined,
        password: undefined,
        errorState: false
    }),
    methods: {
      validateBeforeSubmit() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            // eslint-disable-next-line
            this.$store.dispatch('register')
            return true
          }
  
          this.errorState = !this.errorState
        });
      }
    },
    created () {
      if (this.$store.state.authState) {
        return this.$router.push('/');
      }
    }
  }
</script>