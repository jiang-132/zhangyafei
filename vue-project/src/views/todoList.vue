<template>
    <div class="common-layout">
        <el-container>
            <el-header class="eheader">
                <h1>todoList</h1>
            </el-header>
            <el-main class="emain">
                <!-- 输入的表头 -->
                <el-row class="todoHeader">
                    <el-form :inline="true" :model="counter.inputForm" status-icon>
                        <el-form-item prop="counter.inputItem">
                            <el-input v-model="counter.inputPlan" placeholder="请输入你的计划" />
                        </el-form-item>
                        <el-form-item prop="counter.inputTime">
                            <el-input-number v-model="counter.inputTime" :min="1" :max="100" />
                            <!-- <el-input v-model="counter.inputTime" placeholder="请输入计划所用时间" /> -->
                        </el-form-item>
                        <el-form-item prop="desc">
                            <el-select v-model="counter.priority" placeholder="优先级">
                                <el-option v-for="item in counter.priorityList" :key="item.key" :value="item.grade" />
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button :span="5" type="primary" plain :disabled="counter.dis == false" @click="addTodo()">添加事项</el-button>
                            <el-button type="primary" @click="aescending">
                                <el-icon>
                                    <Top />
                                </el-icon>
                            </el-button>
                            <el-button type="primary" @click="descending">
                                <el-icon>
                                    <Bottom />
                                </el-icon>
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-row>
                <!-- 事项列表 -->
                <el-row class="todoMain">
                    <el-table :data="counter.todoItemList" row-key="title" style="width: 100%" max-height="350" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55" :reserve-selection="true" />
                        <!-- <el-table :data="todoItemList" style="width: 100%" max-height="350" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55" v-model="complete" /> -->
                        <el-table-column fixed label="代办事项" width="300">
                            <template #default="scope">
                                <el-input :disabled="scope.row.complete === true" v-model="scope.row.title" @change="modifyTodo(scope.row)" clearable />
                            </template>
                        </el-table-column>
                        <el-table-column prop="time" label="代办事项所需要时间" width="200">
                            <template #default="scope">
                                <el-input-number v-model="scope.row.time" :min="1" :max="100" :disabled="scope.row.complete === true" @change="modifyTime" />
                            </template>
                        </el-table-column>
                        <el-table-column label="优先级" width="200">
                            <template #default="scope">
                                <el-select :disabled="scope.row.complete === true" v-model="scope.row.levelName" @change="modifyPriority(scope.row)">
                                    <el-option v-for="item in counter.priorityList" :key="item.key" :value="item.grade" />
                                </el-select>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
                <!-- todolist底部按钮 -->
                <dis class="todoFooter">
                    <el-row :gutter="2">
                        <el-col :span="4">剩余{{ counter.ongoingNumber }}项未完成
                        </el-col>
                        <el-col :span="4">未完成时间总和{{ counter.ongoingTimeNumber }}
                        </el-col>
                        <el-col :span="4">全部时间总和{{ counter.timeNum }}
                        </el-col>
                    </el-row>
                    <el-row :gutter="2">
                        <el-col :span="4">
                            <el-button plain @click="allItem()">全部</el-button>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="success" plain @click="ongoing()">未完成</el-button>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="warning" plain @click="finished()">已完成</el-button>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="danger" @click="clearTodo()" plain>
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </el-button>
                        </el-col>
                    </el-row>
                </dis>
            </el-main>
        </el-container>
        <echarts :highNumber="counter.highNumber" :middleNumber="counter.middleNumber" :lowNumber="counter.lowNumber"></echarts>
        <bar :titleItem="counter.titleItem" :timeItem="counter.timeItem"></bar>
        <br><br><br><br>

    </div>
</template>
<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import storage from "../utils/Storage";
import echarts from './echarts.vue';
import bar from './bar.vue';
import { todos } from '../stores/counter';

const counter = todos();

function addTodo () {
    counter.addTodo();
    // storage.set("todolist", counter.allArray);
}
//获取数组中打勾的值
function handleSelectionChange (val) {
    counter.SelectionChange(val)
    storage.set("todolist", counter.allArray);
}

//清除已完成
function clearTodo () {
    counter.clear();
    storage.set("todolist", counter.allArray);
}

//全部显示的按钮
function allItem () {
    counter.todoItemList = counter.allArray;
}

//未完成按钮
function ongoing () {
    counter.todoItemList = counter.allArray.filter(item => !item.complete);
}

//已完成按钮
function finished () {
    counter.todoItemList = counter.allArray.filter(item => item.complete);
    storage.set("todolist", counter.allArray);
}

//升序
function descending () {
    counter.des();
}

//降序
function aescending () {
    counter.aes();
}

//判断修改的值
function modifyTodo () {
    counter.edit()
    storage.set("todolist", counter.allArray);
}

//返回数组元素是否出现重复项（等于0：没有，大于0：有）
function checkArrayElement (array) {
    counter.check();
}

//修改代办事项的时间
function modifyTime () {
    //没用
    storage.set("todolist", counter.allArray);
}

//修改优先级
function modifyPriority (item) {
    counter.editPriority(item);
    storage.set("todolist", counter.allArray);
}

onMounted(() => {
    if (localStorage.getItem("todolist")) {
        counter.allArray = JSON.parse(localStorage.getItem("todolist"));
        counter.todoItemList = counter.allArray
    }
});
</script>
<style>
* {
    margin: 0;
    padding: 0;
}
.todoFooter {
    margin-top: 4vh;
}
</style>