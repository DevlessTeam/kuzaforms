<template>
  <div>
    <p class="text-2xl font-sans">Accounts</p>
    <div class="">
      <div class="bg-white p-4 shadow-md rounded">
        <form class="ui form">
          <div class="fields two">
            <div class="field">
              <label>Full Name</label>
              <input type="text" name="name" placeholder="John Doe">
            </div>
            <div class="field">
              <label>Username</label>
              <input type="text" name="username" placeholder="johndoe">
            </div>
          </div>
          <div class="fields two">
            <div class="field">
              <label>Email</label>
              <input type="email" name="email" placeholder="johndoe@example.com">
            </div>
            <div class="field">
              <label>Organization Name</label>
              <input type="text" name="organ-name" placeholder="KuzaForms">
            </div>
          </div>
          <div class="field">
            <label>Password</label>
            <input type="password" name="password" placeholder="************">
          </div>
          <button class="ui button" type="submit">Cancel</button>
          <button class="ui button secondary" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>