<template>
  <v-row justify="center" align="center">
    <v-col md="12"><Header /> </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Header from '~/components/Header.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { Header },
})
</script>
