<template>
    <v-chart class="chart" :option="option" />
</template>

<script setup >
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
]);
import { ref, toRefs } from "vue";

const props = defineProps({
    highNumber: Number,
    middleNumber: Number,
    lowNumber: Number,
});
const { highNumber, middleNumber, lowNumber } = toRefs(props);
/* console.log("highNumber", highNumber); */
const option = ref({
    title: {
        text: "优先级占比",
        left: "center"
    },
    color: ['#F28665', '#FFCA0F', '#1263A1'],
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: "vertical",
        left: "left",
        data: ["高", "中", "低"]
    },
    series: [
        {
            name: "优先级占比",
            type: "pie",
            radius: [50, 140],
            center: ['50%', '50%'],
            roseType: 'radius',
            /*  center: ["50%", "60%"], */
            cursor: "default",
            data: [
                { value: highNumber, name: "高" },
                { value: middleNumber, name: "中" },
                { value: lowNumber, name: "低" },
            ],
            emphasis: {
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                    silent: true //禁用手势 不可用手势设置 取消鼠标小手指
                }
            }
        }
    ]
});
</script>
<style scoped>
.chart {
    height: 400px;
}
</style>