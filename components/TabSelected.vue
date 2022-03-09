<template>
  <div v-if="renderTab === 'MostTotal'"><most-totalcase /></div>
  <div v-else-if="renderTab === 'HighestNumber'"><highest-death /></div>
  <div v-else-if="renderTab === 'LeastRecoverd'"><least-recoverd /></div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
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
    selectedTab: { type: String, default: 'MostTotal' },
  },
  setup(props) {
    const renderTab = props.selectedTab
    return { renderTab }
  },
})
</script>
