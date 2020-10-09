<template>
  <b-container>
    <div class="login">
      <h3>Profile</h3>
      <b-form v-if="user">
        <img :src="user.photoURL" width="50" height="50" />
        <b-form-group label="Display Name">
          <b-form-input :value="user.displayName" readonly></b-form-input>
        </b-form-group>
        <b-form-group label="Email">
          <b-form-input :value="user.email" readonly></b-form-input>
        </b-form-group>

        <b-form-group label="Phone Number">
          <b-form-input :value="user.phoneNumber" readonly></b-form-input>
        </b-form-group>
        <div class="d-flex">
          <nuxt-link to="/status">Status</nuxt-link>
        </div>
      </b-form>
      <b-alert v-else show variant="danger">User Limit is reached</b-alert>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'Profile',
  middleware: 'auth',
  async asyncData({ $axios }) {
    try {
      const user = await $axios.$get('/api/user')
      return {
        user,
      }
    } catch (e) {
      return {
        user: false,
      }
    }
  },
}
</script>
