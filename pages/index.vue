<template>
  <v-row justify="center" align="center">
    <v-col md="12"><main-file /> </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import MainFile from '~/components/MainFile.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { MainFile },
})
</script>
