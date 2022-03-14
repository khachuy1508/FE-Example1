<template>
  <v-card>
    <v-toolbar color="primary" dark>{{
      filterDataCountry.name.common
    }}</v-toolbar>
    <v-card-text>
      <v-row class="row-custom-title">
        <p class="text-overline mb-4">
          Official: {{ filterDataCountry.name.official }}
        </p></v-row
      >
      <v-row class="row-custom">
        <v-col cols="6"
          ><p>Capital: {{ filterDataCountry.capital[0] }}</p></v-col
        >
        <v-col cols="6"
          ><p>Region: {{ filterDataCountry.region }}</p></v-col
        >
        <v-col cols="6"
          ><p>Subregion: {{ filterDataCountry.subregion }}</p></v-col
        >
        <v-col cols="6"
          ><p>Population: {{ filterDataCountry.population }}</p></v-col
        >
      </v-row>

      <v-img :src="filterDataCountry.flags.png"></v-img>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn text @click="dialog = false">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { CountryType } from 'store/covid'

export default defineComponent({
  props: {
    filterDataCountry: { type: Object as PropType<CountryType> },
  },
  setup() {},
})
</script>
