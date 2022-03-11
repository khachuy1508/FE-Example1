<template>
  <div>
      <v-row>
        <div v-for="(item,index) in filterCovidData" :key="index">
          <v-col>
            <div>
              <v-card width="250px">
                <v-card-text>
                  <div>
                    <p class="text-overline mb-4 ">
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
</template>
<script lang="ts">
import { defineComponent, watch, useContext, computed, toRefs} from '@nuxtjs/composition-api'
import HighestDeath from './HighestDeath.vue'
import LeastRecoverd from './LeastRecoverd.vue'
import MostTotalcase from './MostTotalcase.vue'

export default defineComponent({
  components: {
    HighestDeath,
    LeastRecoverd,
    MostTotalcase,
  },
  
  props: {
    selectedTab: { type: String, default: '' },
  },

  setup(props) {
    const { store } = useContext(); 

    const filterCovidData = computed(() => store.getters['covid/dataCovid'])

    watch(
      () => props.selectedTab,
      (value) => {
        store.dispatch('covid/sortDataCovid', {title: value})
      },
      {immediate : true }
    )
  
    return { 
      filterCovidData,
     }

  },
  // watch:{
  //     renderTab: function(renderTab){
  //     console.log(1111,'change')

  //       // this.$store.dispatch('covid/sortDataCovid', {title: renderTab})
  //     }
  //   },
  // computed:{
  //   filterCovidData(): any {
  //     return this.$store.getters[`covid/dataCovid`]
  //   }}
})
</script>
