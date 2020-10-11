export default function ({ store, redirect, req }) {
  if (process.server && req.session && req.session.user_id) {
    console.log(req.session, req.session.user_id)
    store.commit('auth/SETE_AUTHENTICATED')
  } else if (!store.state.auth.isAuthenticated) {
    redirect('/login')
  }
}
