<template>
  <div>
    <h1>Register goes here</h1>
  </div>
</template>

<script>
  export default {
    created () {
      if (this.$store.state.authState) {
        return this.$router.push('/');
      }
    }
  }
</script>