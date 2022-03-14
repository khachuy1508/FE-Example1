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
        <v-carousel hide-delimiter-background show-arrows-on-hover>
          <v-carousel-item>
            <v-sheet>
              <v-row class="fill-height" align="center" justify="center">
                <div>
                  <detail-country
                    :filter-data-country="filterDataCountry"
                  ></detail-country>
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>

          <v-carousel-item>
            <v-sheet>
              <v-row class="row-custom" align="center" justify="center">
                <div>
                  <chart
                    :data-country-period="filterDataCountryPeriod"
                    :country-name="filterDataCountry.name.common"
                  ></chart>
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
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
import Chart from './Chart.vue'
import DetailCountry from './DetailCountry.vue'

export default defineComponent({
  props: {
    CountryCode: { type: String, default: '' },
    Slug: { type: String, defaule: '' },
  },
  components: {
    Chart,
    DetailCountry,
  },
  setup(props) {
    const { store } = useContext()

    const dialog = ref<boolean>(false)

    const filterDataCountry = computed(() => store.getters['covid/dataCountry'])
    const filterDataCountryPeriod = computed(
      () => store.getters['covid/dataCountryPeriod']
    )
    const handleOpenDialog = async () => {
      await getDataCountry()
      dialog.value = true
      getDataCountryPeriod()
    }
    const getDataCountry = () =>
      store.dispatch('covid/getDataCountry', { countryCode: props.CountryCode })

    const getDataCountryPeriod = () =>
      store.dispatch('covid/getDataPeriod', { Slug: props.Slug })

    return {
      filterDataCountry,
      getDataCountry,
      dialog,
      filterDataCountryPeriod,
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
