<template>
  <div>home

    <h1>{{ token }}</h1>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    ...mapMutations(['LOGOUT'])

  }
}
</script>

<style>

</style>
