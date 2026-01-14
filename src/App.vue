<template>
  <div id="app">
    <DefaultLayout>
      <router-view />
    </DefaultLayout>
    <CookieBanner />
  </div>
</template>

<script>
import DefaultLayout from './layouts/DefaultLayout.vue'
import CookieBanner from './components/common/CookieBanner.vue'

export default {
  name: 'App',
  components: {
    DefaultLayout,
    CookieBanner
  }
}
</script>