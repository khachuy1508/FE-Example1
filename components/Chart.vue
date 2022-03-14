<template>
  <div id="chart">
    <client-only>
      <apexcharts
        type="line"
        width="600"
        :options="chartOptions"
        :series="series"
      ></apexcharts>
    </client-only>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ref } from '@nuxtjs/composition-api'
import {CountryPeriod} from 'store/covid'
import {
watch,
} from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    dataCountryPeriod: { type: Array as PropType<CountryPeriod[]>},
    countryName: {type: String}
  },
  setup(props) {
    let Confirmed: Number[] = []
    let Deaths: Number[] = []
    let Recovered: Number[] = []
    const DateConfirm: Date[] = []

  watch(
      () => props.dataCountryPeriod,
      (value) => {
        Confirmed = []
        Deaths = []
        Recovered = []
        value?.map((item) => {
          Confirmed.push(item.Confirmed)
          Deaths.push(item.Deaths)
          Recovered.push(item.Recovered)
          DateConfirm.push(item.Date)
        })
      },
      { immediate: true }
    )

    
    const series = ref([
      {
        name: 'Confirmed',
        data: Confirmed,
      },
      {
        name: 'Deaths',
        data: Deaths,
      },
      {
        name: 'Recovered',
        data: Recovered,
      },
    ])

    const chartOptions = ref({
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [4, 4, 4],
        curve: 'straight',
        dashArray: [0, 0, 0],
      },
      title: {
        text: props.countryName,
        align: 'left',
      },
      legend: {
        tooltipHoverFormatter: function (val: string, opts: any) {
          return (
            val +
            ' - ' +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            ''
          )
        },
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        categories: DateConfirm
      },
      tooltip: {
        theme: "dark",
        y: [
          {
            title: {
              formatter: function (val: string) {
                return val 
              },
            },
          },
          {
            title: {
              formatter: function (val: string) {
                return val 
              },
            },
          },
          {
            title: {
              formatter: function (val: string) {
                return val
              },
            },
          },
        ],
      },
      grid: {
        borderColor: '#f1f1f1',
      },
    })
    return {
      series,
      chartOptions,
    }
  },
})
</script>