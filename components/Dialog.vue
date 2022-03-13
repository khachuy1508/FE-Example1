<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ attrs }">
          <v-btn v-bind="attrs" @click="handleOpenDialog">Detail</v-btn>
        </template>
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
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  computed,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    CountryCode: { type: String, default: '' },
  },

  setup(props) {
    const { store } = useContext()

    const dialog = ref<boolean>(false)

    const filterDataCountry = computed(() => store.getters['covid/dataCountry'])

    const handleOpenDialog = async () => {
      await getDataCountry()
      dialog.value = true
    }
    const getDataCountry = () =>
      store.dispatch('covid/getDataCountry', { countryCode: props.CountryCode })

    return {
      filterDataCountry,
      getDataCountry,
      dialog,

      handleOpenDialog,
    }
  },
})
</script>
<style>
.row-custom-title {
  margin-top: 0px !important;
  justify-content: center;
  text-align: center;
}
.row-custom {
  margin-top: 0px !important;
}
</style>
