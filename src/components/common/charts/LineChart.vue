<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  LineElement, PointElement,
  LinearScale, CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale)

defineProps({
  chartData: { type: Object, required: true },
  chartOptions: { type: Object, default: () => ({ responsive: true, maintainAspectRatio: false }) }
})
</script>
