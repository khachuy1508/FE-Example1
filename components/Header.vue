<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2 basil--text">EXAMPLE</h1>
    </v-card-title>

    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item.content">
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab">
        <v-card color="basil" flat>
          <v-card-text
            ><tab-selected :selected-tab="items[tab].content"  />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang="ts">
import TabSelected from './TabSelected.vue'
import {useContext, onMounted, ref, defineComponent, } from '@nuxtjs/composition-api';
export default defineComponent({
  components: { TabSelected },
  
  setup(){
    const tab = ref<number>(0)
    
    const items = [
        { tab: 'The most total confirmed cases', content: 'MostTotal' },
        { tab: 'The highest number of deaths', content: 'HighestNumber' },
        {
          tab: 'The least number of recovered cases',
          content: 'LeastRecoverd',
        },
      ]

    const { store } = useContext();
    function filterData() {
      store.dispatch('covid/getDataCovid')
    }


    onMounted(() => {
      filterData()
    })

    return {
      tab,
      items,
    }
  }
})
</script>

<style>
/* Helper classes */
.basil {
  background-color: #000000 !important;
}
.basil--text {
  color: #00ff73 !important;
}
</style>
