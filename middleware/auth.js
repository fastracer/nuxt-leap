export default function ({ store, redirect }) {
  if (!store.state.auth.isAuthenticated) {
    redirect('/login')
  }
}
