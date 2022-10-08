<template>
    <div ref="chartRef" :style="{ height }" />
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, onBeforeMount, onBeforeUnmount, nextTick } from "vue";
import * as echarts from "echarts";

let chartsArr = [];
export default defineComponent({
    name: "BaseEcharts",
    props: {
        height: {
            type: String,
            default: "300px",
        },
        options: {
            type: Object,
            default: () => ({})
        },
    },
    setup (props) {
        const { proxy } = getCurrentInstance();
        const initCharts = () => {
            //通过Promise异步操作,避免报错Initialize failed: invalid dom
            //1:新建一个promise对象
            let newPromise = new Promise((resolve) => {
                resolve();
            });
            //2:然后异步执行echarts的初始化函数
            newPromise.then(() => {
                const chart1 = echarts.init(proxy.$refs.chartRef);
                chart1.setOption(props.options);
                chartsArr.push(chart1);
            });
        };
        const handleChartResize = () => {
            for (let i of chartsArr) {
                chartsArr[i] && chartsArr[i].resize();
            }
        };
        const renderEcharts = (option) => {
            const chart1 = echarts.init(proxy.$refs.chartRef);
            chart1.setOption(option, true);
        };
        onBeforeMount(() => {
            nextTick(() => {
                initCharts();
            });
        });
        onMounted(() => {
            window.addEventListener("resize", handleChartResize);
        });
        onBeforeUnmount(() => {
            // 移除窗口resize事件
            window.removeEventListener('resize', handleChartResize);
        });
        return {
            initCharts,
            renderEcharts
        };
    }
});
</script>
