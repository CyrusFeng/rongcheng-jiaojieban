<template>
    <div>
        <div v-if="!visibleError">
            <div class="background" :class="{active:isVisible}">
                <div class="bar-wrap">
                    <div class="bar">
                        <div class="select-wrap" v-show="!isVisible">
                            <span>{{selectedName||'请下拉选择厂进行查询'}}</span>
                            <div class="select-block">
                                <i class="triangle-down"></i>
                                <select v-model="organizationNum" @change="changeSelect">
                                    <option value="">无</option>
                                    <option :value="item.organizationNum" v-for="item in rangeArray">{{item.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="date-wrap">
                            <input type="date" @input="changeDate">
                            <i class="icon"></i>
                        </div>
                    </div>
                </div>
                <div class="head">
                    <div class="title">{{currentName}}交接班情况</div>
                    <!--<div class="subtitle" v-if="shijiao&&yingjiao&&shijie&yingjie">-->
                    <div class="subtitle">
                        {{date}}交接班执行率{{(yingjiao+yingjie) == 0? 0:Math.round((shijiao+shijie)/(yingjiao+yingjie)*100)}}%
                    </div>
                </div>
            </div>
            <div class="chart-wrap">
                <div class="chart-item">
                    <div class="left">
                        <div class="charts-block">
                            <div class="percent">{{yingjiao == 0?0:Math.round(shijiao/yingjiao*100)}}%</div>
                            <!--<div id="main1" style="width: 0.88rem;height:0.88rem;"></div>-->
                            <Chart id="main1" :option="option1" width="0.88rem" height="0.88rem"></Chart>
                        </div>
                        <p class="desc">交班完成率</p>
                    </div>
                    <div class="right">
                        <div class="top">
                            <span>应交班记录</span>
                            <span>{{yingjiao}}人</span>
                        </div>
                        <div class="bottom">
                            <span>实交班记录</span>
                            <span>{{shijiao}}人</span>
                        </div>
                    </div>
                </div>
                <div class="chart-item">
                    <div class="left">
                        <div class="charts-block">
                            <div class="percent">{{yingjie == 0?0:Math.round(shijie/yingjie*100)}}%</div>
                            <!--<div id="main2" style="width: 0.88rem;height:0.88rem;"></div>-->
                            <Chart id="main2" :option="option2" width="0.88rem" height="0.88rem"></Chart>
                        </div>
                        <p class="desc">接班完成率</p>
                    </div>
                    <div class="right">
                        <div class="top">
                            <span>应接班记录</span>
                            <span>{{yingjie}}人</span>
                        </div>
                        <div class="bottom">
                            <span>实接班记录</span>
                            <span>{{shijie}}人</span>
                        </div>
                    </div>
                </div>
            </div>
            <!--<div class="btn" @click="jump">查看车间详情</div>-->
            <!--<router-link :to="{name: 'list',-->
                  <!--params: {-->
                    <!--orgNum: currentNum[0],-->
                    <!--name:currentName,-->
                    <!--date:date-->
                  <!--}-->
                <!--}" tag="div" class="btn">查看车间详情-->
            <!--</router-link>-->
            <router-link :to="{path: '/list/123',
                  query: {
                    orgNum: currentNum[0],
                    name:currentName,
                    date:date
                  }
                }" tag="div" class="btn">查看车间详情
            </router-link>


        </div>
        <Error :msg="msgError" :visible="visibleError" :code="code" :name="interfaceName"></Error>
        <Tips :msg="msgTip" :visible="visibleTip"></Tips>
    </div>

</template>

<script>
  import echarts from 'echarts'
  import Chart from './chart'
  import axios from 'axios'
  import Error from './error'
  import Tips from './tips'

  export default {
    name: "index",
    components: {
      Chart,
      Error,
      Tips
    },
    data() {
      return {
        rangeArray: [],
        isVisible: false,
        selectedName: '',
        organizationNum: '',
        currentNum: [],
        currentName: '',
        date: '',
        listArray: [],
        yingjiao: 0,
        yingjie: 0,
        shijiao: 0,
        shijie: 0,
        weijie:0,
        weijiao:0,
        option1: {
          title: {
            text: '',
            textStyle: {
              color: 'red'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              return params.name + "：" + params.value + "人";
            },
            position: ['0%', '50%'],
          },
          // color: ['#ff605f', '#ffd6d6'],
          color: ['#ffd6d6', '#ff605f'],
          series:
            {
              hoverAnimation: false,
              name: '',
              type: 'pie',
              radius: ['70%', '100%'],

              label: {
                normal: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                { value: this.weijiao, name: '未交班人数' },
                { value: this.shijiao, name: '实际交班人数' },
              ]
            }
        },
        option2: {
          title: {
            text: '',
            textStyle: {
              color: 'red'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              return params.name + "：" + params.value + "人";
            },
            position: ['0%', '50%'],
          },
          // color: ['#3e82ee', '#cce8fc'],
          color: ['#cce8fc', '#3e82ee'],
          series:
            {
              hoverAnimation: false,
              name: '',
              type: 'pie',
              radius: ['70%', '100%'],

              label: {
                normal: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                { value: this.weijie, name: '未接班人数' },
                { value: this.shijie, name: '实际接班人数' },
              ]
            }
        },
        msgError: '',
        msgTip: '',
        visibleError: false,
        visibleTip: false,
        code:40000,
        interfaceName:''
      }
    },
    created() {
      this.date = this.initDate(0)

   // axios.get('http://www.doclever.cn:8090/mock/5ca2c535c273b90cd820e664/range', {
   //    axios.get('/api/rcapp/org/range', {
      console.log(this.$url)
      let url = `http://${this.$url.domain}:${this.$url.port}/rcapp/org/range`
      console.log(url)
      axios.get(url, {
        params: {
          sessionId:this.$route.query.sessionId
        }
      })
        .then((response) => {
          this.code = response.data.code
          if(this.code === 0){
            this.rangeArray = response.data.data.dataArray
            if(this.rangeArray.length<=1){
              this.isVisible = true
            }

            this.currentName = this.rangeArray[0].name
            this.currentNum.length = 0
            this.currentNum.push(this.rangeArray[0].organizationNum)
            // axios.get('http://www.doclever.cn:8090/mock/5ca2c535c273b90cd820e664/queryByNumbers', {
            //   params: {
            //     chejianNumbers:this.currentNum,
            //     date:this.date
            //   }
            // })
            //   .then((response) => {
            //     this.listArray = response.data.data.dataArray
            //
            //
            //   })
            this.loadData(this.currentNum, this.date)
          }else{
            this.msgError = response.data.outerMessage
            this.visibleError = true
          }

        }).catch((error) => {
        this.msgError = '服务器数据接口地址更换，请联系管理员更新'
        this.visibleError = true
      }).finally(()=>{
        this.interfaceName = 'range'
      })


    },
    watch: {
      organizationNum() {
        this.rangeArray.forEach((item) => {
          if (this.organizationNum === item.organizationNum) {
            this.selectedName = item.name
          } else if (this.organizationNum === '') {
            this.selectedName = '无'
          }
        })
      },
      selectedName() {
        if (this.selectedName !== '无') {
          this.currentNum.length = 0
          this.currentNum.push(this.organizationNum)
          this.currentName = this.selectedName

          this.loadData(this.currentNum, this.date)
        }

      }
    },
    methods: {
      changeDate($event) {
        this.date = $event.target.value
        this.loadData(this.currentNum, this.date)
      },
      changeSelect() {
        console.log(this.currentNum)
        // this.currentName = this.selectedName

      },
      loadData(currentNum, date) {
        this.yingjiao = 0
        this.yingjie = 0
        this.shijiao = 0
        this.shijie = 0
        // axios.get('http://www.doclever.cn:8090/mock/5ca2c535c273b90cd820e664/queryByNumbers', {
        let url = `http://${this.$url.domain}:${this.$url.port}/rcapp/forms/queryByNumbers`
        axios.get(url, {
          params: {
            chejianNumbers: encodeURIComponent(JSON.stringify(currentNum)),
            date: date
          }
        })
          .then((response) => {
            this.code = response.data.code
            if(response.data.code === 0){
              this.listArray = response.data.data.dataArray
              this.listArray.forEach((xxx) => {
                xxx.itemList.forEach((yyy) => {
                  this.yingjiao += yyy.yingjiao
                  this.yingjie += yyy.yingjie
                  this.shijiao += yyy.shijiao
                  this.shijie += yyy.shijie
                })
              })

              this.weijiao = this.yingjiao - this.shijiao
              this.weijie = this.yingjie - this.shijie

              this.option1.series.data[0].value = this.weijiao;
              this.option1.series.data[1].value = this.shijiao;

              this.option2.series.data[0].value = this.weijie;
              this.option2.series.data[1].value = this.shijie;

            }else{
              this.msgError = response.data.outerMessage
              this.visibleError = true
            }

          }).catch((error) => {
          this.msgError = '服务器数据接口地址更换，请联系管理员更新'
          this.visibleError = true
        }).finally(()=>{
          this.interfaceName = 'queryByNumbers'
        })
      },
      initDate(days) {
        let date = new Date();
        date = date.setDate(date.getDate() + days);
        date = new Date(date);

        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        return year + seperator1 + month + seperator1 + strDate;
      },
      // jump(){
      //   let id = Math.random() + 1;
      //   let start = window.location.href.indexOf("/list");
      //   let relUrl = window.location.href.slice(0, start);
      //
      //   let query = `?orgNum=${item.number}&name=${item.name}&date=${this.date}`;
      //
      //   window.location.href = relUrl + "/list/" + id + query;
      //
      //   this.$router.push({ path: '/list/123', params: { jlid: item.jlid }})
      // }
    }
  }
</script>

<style scoped lang="scss">
    .background {
        overflow: hidden;
        background-image: linear-gradient(-231deg, #498ef9 24%, #498ef9 29%, #296ed9 100%);
        width: 3.75rem;
        height: 2.25rem;
        .bar-wrap {
            margin-top: 0.1rem;
            .bar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .select-wrap {
                    flex: 1 1 auto;

                    margin-left: 0.12rem;
                    margin-right: 0.12rem;
                    padding-left: 0.12rem;
                    padding-bottom: 0.1rem;
                    padding-top: 0.1rem;
                    width: 3rem;

                    opacity: 0.95;
                    background: #f7fcff;
                    border-radius: 0.16rem;
                    font-size: 0;
                    /*height:31px;*/

                    /*height: 100%;*/
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #f0f0f0;
                    > span {
                        /*padding-left: 0.12rem;*/
                        display: inline-block;
                        width: 10em;
                        font-size: 0.12rem;
                        color: #6b6b6b;
                    }
                    .select-block {
                        margin-right: 0.12rem;
                        position: relative;
                        select {
                            height: 0.2rem;
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                            right: 0;
                            opacity: 0;
                        }
                        .triangle-down {
                            display: inline-block;
                            width: 0.12rem;
                            height: 0.07rem;
                            background: url("../assets/triangle-down.png") no-repeat;
                            background-size: contain;
                        }
                    }
                }
                .date-wrap {
                    margin-right: 0.16rem;
                    position: relative;
                    z-index: 0;
                    width: 0.28rem;
                    height: 0.28rem;
                    .icon {
                        display: inline-block;
                        width: 0.28rem;
                        height: 0.28rem;
                        background: url("../assets/riqi.png") no-repeat;
                        background-size: contain;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 1;
                    }
                    input {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 2;
                        width: 0.28rem;
                        height: 0.28rem;
                        opacity: 0;
                        font-size: 0.12rem;
                    }
                }
            }
        }
        .head {
            margin-top: 0.22rem;
            .title {
                font-size: 0.26rem;
                color: #ffffff;
                text-align: center;
            }
            .subtitle {
                margin-top: 0.06rem;
                font-size: 0.14rem;
                color: #ffffff;
                text-align: center;
            }
            &.active {
                margin-top: 0;
            }
        }
        &.active {
            height: 2.03rem;
            .bar {
                justify-content: flex-end;
                .date-wrap {
                    margin: 0;
                    width: 0.49rem;
                    height: 0.38rem;
                    opacity: 0.95;
                    background: #ffffff;
                    border-top-left-radius: 0.2rem;
                    border-bottom-left-radius: 0.2rem;
                    .icon {
                        width: 0.2rem;
                        height: 0.2rem;
                        background: url("../assets/date.png") no-repeat;
                        background-size: contain;
                    }
                }
            }
            .head {
                margin-top: 0;
            }
        }
    }

    .chart-wrap {
        margin-top: -0.8rem;
        .chart-item {
            margin: 0 0.12rem 0.1rem 0.12rem;
            padding: 0.22rem 0.34rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            background: #ffffff;
            box-shadow: 0 3px 3px 0 #e3eef5;
            border-radius: 0.08rem;
            /*width:351px;*/
            /*height:155px;*/
            .left {
                /*margin-right: 0.44rem;*/
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .charts-block {
                    display: inline-block;
                    position: relative;
                    .percent {
                        text-align: center;
                        font-size: 0.22rem;
                        color: #3f3f3f;

                        width: 1.2rem;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                    > div {
                        display: inline-block;
                    }
                }
                .desc {
                    margin-top: 0.06rem;
                    text-align: center;
                    font-size: 0.12rem;
                    color: #3f3f3f;
                }
            }
            .right {
                > div {
                    padding-left: 0.02rem;
                    padding-right: 0.02rem;
                    &:first-child {
                        padding-bottom: 0.1rem;
                        border-bottom: 1px solid #f0f0f0;
                    }
                    &:last-child {
                        padding-top: 0.1rem;
                    }
                    span {
                        &:first-child {
                            padding-right: 0.44rem;
                            font-size: 0.14rem;
                            color: #666666;
                        }
                        &:last-child {
                            font-size: 0.14rem;
                            color: #3f3f3f;
                        }
                    }
                }
            }
        }
    }

    .btn {
        margin: 0.3rem auto 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: linear-gradient(-138deg, #478bf7 0%, #2469d4 100%);
        border: 1px solid #498ef9;
        border-radius: 0.2rem;
        width: 1.28rem;
        height: 0.4rem;
        font-size: 0.14rem;
        color: #ffffff;
    }
</style>