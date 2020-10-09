<template>
  <b-container>
    <div class="login">
      <h3>User Status</h3>
      <b-form>
        <b-form-group label="Status">
          <b-form-input :value="data.status" readonly></b-form-input>
        </b-form-group>
      </b-form>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'Profile',
  middleware: 'auth',
  async asyncData({ $axios, redirect }) {
    try {
      const data = await $axios.$get('/api/status')
      return {
        data,
      }
    } catch (e) {
      redirect('/login')
    }
  },
}
</script>
