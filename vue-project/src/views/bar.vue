<template>
    <div>
        <BaseEcharts ref="echart" :options="option" />
    </div>
</template>
<script setup >

import { getCurrentInstance, nextTick, onMounted, ref, toRefs, watch } from "vue";
const props = defineProps({
    titleItem: String,
    timeItem: Number
});
const { proxy } = getCurrentInstance()
const { titleItem, timeItem } = toRefs(props);
watch(titleItem, (val) => {
    nextTick(() => {
        option.value.xAxis.data = val
        proxy.$refs.echart.renderEcharts(option.value)
    })
})
watch(timeItem, (val) => {
    nextTick(() => {
        option.value.series[0].data = val
        proxy.$refs.echart.renderEcharts(option.value)
    })
})
const option = ref({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: titleItem,
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: timeItem
        }
    ]
});
</script>
<style scoped>
.chart {
    display: flex;
    justify-content: center;
    text-align: center;
}
</style>