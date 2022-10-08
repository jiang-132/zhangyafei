import { defineStore } from "pinia";

export const todos = defineStore("todos", {
  state: () => ({
    filter: 'all',
    count: 0,
    timeNumber: 0,
    dis1:false,
    allArray: [],
    todoItemList: [],
    planItemList: [],
    ongoingArr: [],
    timeItemArr:[],
    interimArr: [],
    newArr:[],
    newTimeArr: [],
    state: [],
    titleItemArr: [],
    titletiemList:[],
    timeItemList:[],
    ongoingTime: 0,
    i: 0,
    inputPlan: "",
    inputTime: "",
    priority: "",
    priorityList: ([     //优先级数组
      {
        grade: "高",
        key: "1",
      },
      {
        grade: "中",
        key: "2",
      },
      {
        grade: "低",
        key: "3",
      },
    ]),
  }),
  persist: {
    //这里存储默认使用的是session
      enabled: true,
      strategies: [
        {
          //key的名称
          key: 'my_user',
          //更改默认存储，我更改为localStorage
          storage: localStorage,
          // 可以选择哪些进入local存储，这样就不用全部都进去存储了
          // 默认是全部进去存储
          paths: ['list']
        }
      ]
    },
 

  getters: {
    //如果三项都未输入就禁用按钮
     dis () {
        if (this.inputPlan == "" || this.inputTime == "" || this.priority == "") {
            return this.dis1;
        } else {
            return !this.dis1;
        }
    },
    //计算全部事项的时间
    timeNum(){
      this.newArr=[];
      this.timeNumber=0
      this.allArray.forEach(e=>{
        this.newArr.push(e.time);
      });
      this.newArr.forEach(e=>{
        this.timeNumber += Number(e);
      });
      return this.timeNumber;
    },
    //计算未完成事项的时间
    ongoingTimeNumber(){
      this.newArr=[];
      this.ongoingTime=0
      this.ongoingArr=this.allArray.filter(c => !c.complete == true);
      this.ongoingArr.forEach(e=>{
        this.ongoingTime += Number(e.time);
      });
      return this.ongoingTime;
    },
    titleItem(){
      this.titleItemArr=[];
      this.titletiemList=[];
      this.titleItemArr=this.allArray.filter(c => !c.complete == true);
      this.titleItemArr.forEach(c=>{
        this.titletiemList.push(c.title);
      });
      return this.titletiemList;
    },
    timeItem(){
      this.timeItemArr=[];
      this.timeItemList=[];
      this.timeItemArr=this.allArray.filter(c => !c.complete == true);
      this.timeItemArr.forEach(c=>{
        this.timeItemList.push(c.time);
      });
      console.log("this.timeItemList",this.timeItemList);
      
      return this.timeItemList;
    },
    //用计算属性计算未完成
    ongoingNumber() {
      return this.allArray.filter(c => !c.complete == true).length;
    },
    //用计算属性计算高优先级的事项
    highNumber() {
      console.log("this.allArray.filter(c => !c.complete == true).length;",this.allArray.filter(c => c.levelValue == "1"))
      return this.allArray.filter(c => c.levelValue == "1").length;
    },
    //用计算属性计算中优先级的事项
    middleNumber(){
      return this.allArray.filter(c => c.levelValue == "2").length;
    },
    //用计算属性计算中优先级的事项
    lowNumber(){
      return this.allArray.filter(c => c.levelValue == "3").length;
    }
  },

  actions: {
    //添加已完成选项
    addTodo() {
      let flag = this.allArray.some((c) => c.title == this.inputPlan);
      if (flag) {
        alert("有重复的事项");
        return;
      }
      if (this.inputPlan == "" || this.inputTime == "" || this.priority == "") {
        alert("请检查输入内容");
      } else {
        this.allArray.push({
          title: this.inputPlan,
          time: this.inputTime,
          levelName: this.priority,
          levelValue: this.priorityList.filter((c) => c.grade == this.priority)[0].key,
          complete: false,
        })
        this.todoItemList = this.allArray;
        this.inputPlan = "";
        this.inputTime = "";
        this.priority = "";
      }
    },
    //清除已完成
    clear() {
      this.allArray = this.allArray.filter((item) => !item.complete);
      this.todoItemList = this.allArray;
    },
    //编辑
    edit() {
      this.interimArr = this.allArray.map(c => c.title)
      this.count = this.check(this.interimArr);
      if (this.count > 0) {
        alert("有重复项")
        return
      }
    },
    //判断返回数组元素是否出现重复项（等于0：没有，大于0：有）
    check(array) {
      array.sort();  //数组排序
      var reNum = 0;  //返回结果
      //遍历整个数组对象
      for (var i = 0; i < array.length; i++) {
        //跳过最后一个元素的比较
        if (i + 1 == array.length) {
          continue;
        }
        //判断相邻的元素是否相同
        if (array[i] == array[i + 1]) {
          reNum += 1;
        }
      }
      return reNum;
    },
    //获取数组中打勾的值
    SelectionChange(val) {
      val.forEach((v) => {
        this.i = this.allArray.indexOf(v)
        this.state[this.i] = this.i;
        this.allArray[this.i].complete = true;
      });
    },
    //升序
    des() {
      this.allArray.sort(function (a, b) {
        return a.levelValue - b.levelValue;
      });
    },
    //降序
    aes() {
      this.allArray.sort(function (a, b) {
        return b.levelValue - a.levelValue;
      });
    },
    //修改
    editPriority(item) {
      item.levelValue = this.priorityList.filter((c) => c.grade == item.levelName)[0].key;
    },
  }
});

