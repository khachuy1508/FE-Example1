<template>
  <div>
    <v-row>
      <div v-for="(item, index) in filterCovidData" :key="index">
        <v-col>
          <div>
            <v-card width="250px">
              <v-card-text>
                <div class="title">
                  <p class="text-overline mb-4 text-center justify-center">
                    {{ item.Country }}
                  </p>
                </div>
                <p>Total: {{ item.TotalConfirmed }}</p>
                <p>Total death: {{ item.TotalDeaths }}</p>
                <p>Total recovered: {{ item.TotalRecovered }}</p>
                <p>New recovered: {{ item.NewRecovered }}</p>
                <div>
                  <v-row>
                    <v-col cols="4">
                      <Dialog :country-code="item.CountryCode" />
                    </v-col>
                    <v-col cols="8" class="button-right">
                      <v-btn text icon color="blue lighten-2">
                        <v-icon>mdi-bookmark-check-outline</v-icon>
                      </v-btn>
                      <v-btn text icon color="blue lighten-2">
                        <v-icon @click="handleRemove(item.CountryCode)"
                          >mdi-delete</v-icon
                        >
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </div>
    </v-row>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  watch,
  useContext,
  computed,
} from '@nuxtjs/composition-api'
import Dialog from './Dialog.vue'

export default defineComponent({
  components: {
    Dialog,
  },

  props: {
    selectedTab: { type: String, default: '' },
  },

  setup(props) {
    const { store } = useContext()

    const filterCovidData = computed(() => store.getters['covid/dataCovid'])

    const handleRemove = (countryCode: string) => {
      store.dispatch('covid/removeDataCovid', { countryCode })
    }

    watch(
      () => props.selectedTab,
      (value) => {
        store.dispatch('covid/sortDataCovid', { title: value })
      },
      { immediate: true }
    )

    return {
      filterCovidData,
      handleRemove,
    }
  },
})
</script>
<style scoped>
.button-right {
  text-align: right;
}
.title > p {
  height: 50px !important;
}
</style>
