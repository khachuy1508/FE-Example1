<template>
  <div v-if="renderTab === 'MostTotal'">
      <v-row>
        <div v-for="(item,index) in filterCovidData" :key="index">
          <v-col>
            <div>
              <v-card min-width="200px">
                <v-card-text>
                  <div>
                    <p >
                      {{item.Country}}
                    </p>
                  </div>
                  <p>
                    Total: {{item.TotalConfirmed}}
                  </p>
                  <p>Total death: {{item.TotalDeaths}}</p>
                  <p>Total recovered: {{item.TotalRecovered}}</p>
                  <p>New recovered: {{item.NewRecovered}}</p>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </div>

      </v-row>
        
  </div>
  <div v-else-if="renderTab === 'HighestNumber'"><highest-death /></div>
  <div v-else-if="renderTab === 'LeastRecoverd'"><least-recoverd /></div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import HighestDeath from './HighestDeath.vue'
import LeastRecoverd from './LeastRecoverd.vue'
import MostTotalcase from './MostTotalcase.vue'
import {useContext} from '@nuxtjs/composition-api';
import {onMounted} from '@nuxtjs/composition-api'
export default defineComponent({
  components: {
    HighestDeath,
    LeastRecoverd,
    MostTotalcase,
  },
  
  props: {
    selectedTab: { type: String, default: 'MostTotal' },
  },
  setup(props) {
    const { store } = useContext();
    const renderTab = props.selectedTab
    function filterData() {
      store.dispatch('covid/getDataCovid')
    }
    onMounted(() => {
      filterData()
    })
    return { renderTab }


  },
  computed:{
    filterCovidData(): any {
      return this.$store.getters[`covid/ListCovid`]
    }}
})
</script>
