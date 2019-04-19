<template>
    <div style="height: 100%;">
        <div v-if="!visibleError" style="height: 100%;">
            <div class="background">
                <div class="bar-wrap">
                    <div class="bar">
                        <div class="title-wrap">
                            <p class="title">{{name}}车间交接班情况</p>
                            <p class="subtitle">{{date}}</p>
                        </div>
                        <div class="select-wrap">
                            <span>{{selectedTime||'8:00'}}</span>
                            <div class="select-block">
                                <i class="triangle-down"></i>
                                <select v-model="selectedTime" @change="changeSelect">
                                    <!--<option value="">无</option>-->
                                    <option :value="item" v-for="item in timeArray">{{item}}</option>
                                </select>
                            </div>
                        </div>
                        <!--<div class="select-wrap">-->
                        <!--<span>8:00</span>-->
                        <!--<div class="select-block">-->
                        <!--<i class="triangle-down"></i>-->
                        <!--<select>-->
                        <!--<option>xxx</option>-->
                        <!--</select>-->
                        <!--</div>-->
                        <!--</div>-->
                    </div>
                </div>
            </div>
            <div class="scroll-wrap" ref="scroll">
                <div class="list-wrap">
                    <div class="item">
                        <div class="title">
                            <div class="left">
                                <span>{{jiaoban.name}}</span>
                                <span>(应交班{{jiaoban.jobList?jiaoban.jobList.length:0}}条|已交班{{jiaoban.jobList?jiaoban.jobList.filter((item)=>{
	return item.state === 1
}).length:0}}条)</span>
                            </div>
                            <div class="right" @click="visible1 = !visible1">
                                <span>查看班组</span>
                                <i class="icon" :class="visible1?'icon-down':'icon-right'"></i>
                            </div>
                        </div>
                        <div style="overflow: hidden">
                            <transition name="fade">
                                <div v-if="visible1" class="panel">
                                    <!--<router-link tag="div" class="line" v-for="(item,index) in jiaoban.jobList"-->
                                                 <!--:key="index" :to="{name: 'details',-->
                              <!--params: {-->
                                <!--jlid: item.jlid-->
                              <!--}-->
                            <!--}">-->
                                        <!--<div class="left">-->
                                            <!--<span>{{item.name}}</span>-->
                                        <!--</div>-->
                                        <!--<div class="right">-->
                                            <!--<span>{{item.state===1?'已':'未'}}交班</span>-->
                                            <!--<i :class="item.state===1?'icon':'icon-error'"></i>-->
                                        <!--</div>-->
                                    <!--</router-link>-->
                                    <div class="line" v-for="item in jiaoban.jobList" @click="link(item)" :class="item.state===0?'disabled':''">
                                        <div class="left">
                                            <span>{{item.name}}</span>
                                        </div>
                                        <div class="right">
                                            <span>{{item.state===1?'已':'未'}}交班</span>
                                            <i :class="item.state===1?'icon':'icon-error'"></i>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>

                    </div>
                    <div class="item">
                        <div class="title">
                            <div class="left">
                                <span>{{jieban.name}}</span>
                                <span>(应接班{{jieban.jobList?jieban.jobList.length:0}}条|已接班{{jieban.jobList?jieban.jobList.filter((item)=>{
	return item.state === 1
}).length:0}}条)</span>
                            </div>
                            <div class="right" @click="visible2 = !visible2">
                                <span>查看班组</span>
                                <i class="icon" :class="visible2?'icon-down':'icon-right'"></i>
                            </div>
                        </div>
                        <div style="overflow: hidden">
                            <transition name="fade">
                                <div v-if="visible2" class="panel">
                                    <!--<router-link tag="div" class="line" v-for="(item,index) in jieban.jobList" :key="index" :to="{name: 'details',-->
                                    <!--params: {-->
                                    <!--jlid: item.jlid-->
                                    <!--}-->
                                    <!--}">-->
                                    <!--<div class="left">-->
                                    <!--<span>{{item.name}}</span>-->
                                    <!--</div>-->
                                    <!--<div class="right">-->
                                    <!--<span>{{item.state===1?'已':'未'}}交班</span>-->
                                    <!--<i :class="item.state===1?'icon':'icon-error'"></i>-->
                                    <!--</div>-->
                                    <!--</router-link>-->
                                    <div class="line" v-for="item in jieban.jobList" @click="link(item)" :class="item.state===0?'disabled':''">
                                        <div class="left">
                                            <span>{{item.name}}</span>
                                        </div>
                                        <div class="right">
                                            <span>{{item.state===1?'已':'未'}}接班</span>
                                            <i :class="item.state===1?'icon':'icon-error'"></i>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>

                    </div>
                </div>
            </div>

        </div>
        <Error :msg="msgError" :visible="visibleError" :code="code" :name="interfaceName"></Error>
    </div>

</template>

<script>
  import axios from 'axios'
  import Error from './error'
  import BScroll from 'better-scroll'

  export default {
    name: "detail",
    components: {
      Error
    },
    data() {
      return {
        visible1: true,
        visible2: true,
        id: '',
        name: '',
        date: '',
        time: '',
        isThree: '',
        jieban: {},
        jiaoban: {},
        timeArray: [],
        selectedTime: '',
        code: 40000,
        msgError: '',
        visibleError: false,
        interfaceName: '',
        scroll: null
      }
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        console.log('beforeRouteEnter')
        console.log(from.path);
        if (from.path === '/list') {
          if (vm.$route.params.id) {
            // let {id,name,date,isThree} = vm.$route.params
            vm.id = vm.$route.params.id || ''
            vm.name = vm.$route.params.name || ''
            vm.date = vm.$route.params.date || ''
            vm.isThree = vm.$route.params.isThree || ''
            localStorage.setItem('banId', vm.id)
            localStorage.setItem('banName', vm.name)
            localStorage.setItem('banDate', vm.date)
            localStorage.setItem('isThree', vm.isThree)
          } else {
            vm.id = localStorage.getItem('banId')
            vm.name = localStorage.getItem('banName')
            vm.date = localStorage.getItem('banDate')
            vm.isThree = localStorage.getItem('isThree')
          }
        } else {
          vm.id = localStorage.getItem('banId')
          vm.name = localStorage.getItem('banName')
          vm.date = localStorage.getItem('banDate')
          vm.isThree = localStorage.getItem('isThree')
        }

        if (vm.isThree === '1') {
          vm.timeArray = ['08:00:00', '16:00:00', '00:00:00(次日)']
        } else if (vm.isThree === '0') {
          vm.timeArray = ['08:00:00', '20:00:00']
        }

        // axios.get('http://www.doclever.cn:8090/mock/5ca2c535c273b90cd820e664/banzu', {

        let url = `http://${vm.$url.domain}:${vm.$url.port}/rcapp/forms/getShowList`
        axios.get(url, {
          params: {
            chejianId: vm.id,
            date: vm.date,
            time: '08:00:00'
          }
        })
          .then((response) => {
            vm.code = response.data.code
            if (vm.code === 0) {
              vm.jiaoban = response.data.data.jiaoban
              vm.jieban = response.data.data.jieban
            } else {
              vm.msgError = response.data.outerMessage
              vm.visibleError = true
            }

            vm.$nextTick(() => {
              if (!vm.scroll) {
                vm.scroll = new BScroll(vm.$refs.scroll, {
                  click: true
                })
              } else {
                vm.scroll.refresh()
              }
            })

          }).catch((error) => {
          vm.msgError = '服务器数据接口地址更换，请联系管理员更新'
          vm.visibleError = true
        }).finally(() => {
          vm.interfaceName = 'getShowList'
        })
        // localStorage
      })
    },
    methods: {
      changeSelect() {
        let url = `http://${this.$url.domain}:${this.$url.port}/rcapp/forms/getShowList`
        axios.get(url, {
          params: {
            chejianId: this.id,
            date: this.date,
            time: this.selectedTime
          }
        })
          .then((response) => {
            this.jiaoban = response.data.data.jiaoban
            this.jieban = response.data.data.jieban
          })
      },
      link(item){
        if(item.state === 1){
          this.$router.push({ name: 'details', params: { jlid: item.jlid }})
        }
      }
    }
  }
</script>

<style scoped lang="scss">

    .fade-enter-active, .fade-leave-active {
        transition: all 1s;
    }

    .fade-enter, .fade-leave-to {
        transform: translateY(-100%);
        opacity: 0;
    }

    .rotate-enter-active, .rotate-leave-active {
        transition: all 1s;
    }

    .rotate-enter, .rotate-leave-to {
        transform: rotate(180deg);
        opacity: 0;
    }

    .background {
        overflow: hidden;
        background-image: linear-gradient(-231deg, #498ef9 24%, #498ef9 29%, #296ed9 100%);
        width: 3.75rem;
        height: 0.84rem;
        .bar-wrap {
            margin-top: 0.2rem;
            .bar {
                padding-left: 0.12rem;
                padding-right: 0.12rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .title-wrap {
                    .title {
                        font-size: 0.18rem;
                        color: #ffffff;
                    }
                    .subtitle {
                        margin-top: 0.06rem;
                        font-size: 0.14rem;
                        color: #ffffff;
                    }
                }
                .date-wrap {
                    padding: 0.08rem 0.16rem;
                    position: relative;
                    background-color: #fff;
                    border-top-left-radius: 0.21rem;
                    border-bottom-left-radius: 0.21rem;
                    .icon {
                        display: inline-block;
                        width: 0.2rem;
                        height: 0.2rem;
                        background: url("../assets/date.png") no-repeat;
                        background-size: contain;
                    }
                    input {
                        position: absolute;
                        top: 0.08rem;
                        left: 0.16rem;
                        width: 0.28rem;
                        height: 0.28rem;
                        opacity: 0;
                        font-size: 0.12rem;
                    }
                }
            }
        }
    }

    .select-wrap {
        margin-left: 0.12rem;
        padding-left: 0.35rem;
        padding-bottom: 0.1rem;
        padding-top: 0.1rem;
        width: 1.1rem;

        opacity: 0.8;
        background: #ffffff;
        border-radius: 0.2rem;
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
                font-size: 0.12rem;
                z-index: 111;
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

    .scroll-wrap {
        height: calc(100% - 0.84rem);
        overflow: hidden;
    }

    .list-wrap {
        .item {
            /*box-shadow:0 2px 4px 0 #e3eef5;*/
            background-color: #fff;
            .title {
                padding-right: 0.12rem;
                margin-left: 0.12rem;
                padding-top: 0.14rem;
                padding-bottom: 0.14rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #f0f0f0;
                .left {
                    > span {
                        &:first-child {
                            margin-right: 0.05rem;
                            font-size: 0.16rem;
                            color: #000000;
                        }
                        &:last-child {
                            color: #676767;
                            font-size: 0.14rem;
                        }
                    }
                }
                .right {
                    span {
                        margin-right: 0.1rem;
                        font-size: 0.12rem;
                        color: #4489f4;
                    }
                    .icon {
                        display: inline-block;
                        width: 0.12rem;
                        height: 0.067rem;
                        background: url("../assets/arrow.png") no-repeat;
                        background-size: contain;
                        transform: rotate(90deg);
                        transition: transform .3s linear;
                    }
                    .icon-down {
                        transform: rotate(180deg) !important;
                    }
                    .icon-right {
                        transform: rotate(90deg) !important;
                    }
                }

            }
            .panel {
                margin-left: 0.12rem;
                .line {
                    padding-right: 0.12rem;
                    padding-top: 0.14rem;
                    padding-bottom: 0.14rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #f0f0f0;
                    .left {
                        > span {
                            font-size: 0.16rem;
                            color: #666666;
                        }
                    }
                    .right {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        > span {
                            margin-right: 0.1rem;
                            font-size: 0.15rem;
                            color: #000000;
                        }
                        .icon {
                            display: inline-block;
                            width: 0.16rem;
                            height: 0.16rem;
                            background: url("../assets/right.png") no-repeat;
                            background-size: contain;
                        }
                        .icon-error {
                            display: inline-block;
                            width: 0.16rem;
                            height: 0.16rem;
                            background: url("../assets/error.png") no-repeat;
                            background-size: contain;
                        }
                    }
                    &:last-child {
                        border: 0;
                        /*box-shadow: 0 2px 4px 0 #e3eef5;*/
                    }
                    &.disabled{
                        color: #ccc !important;
                        .left {
                            > span {
                                font-size: 0.16rem;
                                color: #ddd;
                            }
                        }
                        .right {
                            > span {
                                color: #ddd;
                            }
                        }
                    }
                }
            }
        }
    }
</style>