<template>
  <component
    :is="chartComponent"
    v-bind="chartProps"
    v-if="chartComponent"
  />
</template>

<script setup>
import BarChart from './BarChart.vue'
import PieChart from './PieChart.vue'
import LineChart from './LineChart.vue'

const props = defineProps({
  type: { type: String, required: true },
  chartData: { type: Object, required: true },
  chartOptions: { type: Object, default: () => ({}) }
})

const chartMap = {
  bar: BarChart,
  pie: PieChart,
  line: LineChart
}

const chartComponent = chartMap[props.type] || null
const chartProps = { chartData: props.chartData, chartOptions: props.chartOptions }
</script>
