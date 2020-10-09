<template>
  <b-container>
    <div class="login">
      <h3>Sign In</h3>
      <b-alert :show="!!error" variant="danger">{{ error }}</b-alert>

      <b-form class="mb-3" @submit.prevent="login">
        <b-form-group id="fieldset-1" label="Email" label-for="email">
          <b-form-input id="email" v-model="email"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldset-1" label="Password" label-for="password">
          <b-form-input
            id="password"
            v-model="password"
            type="password"
          ></b-form-input>
        </b-form-group>
        <div class="d-flex justify-content-end">
          <b-button variant="primary" type="submit">Login</b-button>
        </div>
      </b-form>
      <div class="d-flex justify-content-center">
        <b-button pill @click="googleLogin">
          <inline-svg
            :src="require('@/assets/img/icons/social/google.svg')"
            class="icon"
          >
          </inline-svg>
        </b-button>
        <b-button pill @click="appleLogin">
          <inline-svg
            :src="require('@/assets/img/icons/social/apple.svg')"
            class="icon"
          >
          </inline-svg>
        </b-button>
      </div>
    </div>
  </b-container>
</template>

<script>
import firebase from '~/utils/firebase'
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            this.updateUserAPI(user, null)
          },
          (err) => {
            this.error = err.message
          }
        )
    },

    async updateUserAPI(user) {
      const optimizedUser = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        token: user.stsTokenManager,
      }
      const { data } = await this.$axios.post('/api/user', {
        user: optimizedUser,
      })

      this.$store.dispatch('auth/setUser', data)
      this.$router.push('/profile')
    },

    processResponse(loginPromise) {
      loginPromise
        .then((result) => {
          const token = result.credential.accessToken
          const user = result.user
          this.updateUserAPI(user, token)
        })
        .catch((error) => {
          if (error && error.message) this.error = error.message
          else this.error = JSON.stringify(error)
        })
    },

    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      this.processResponse(firebase.auth().signInWithPopup(provider))
    },

    appleLogin() {
      const provider = new firebase.auth.OAuthProvider('apple.com')
      this.processResponse(firebase.auth().signInWithPopup(provider))
    },
  },
}
</script>
