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
                        <div class="date-wrap">
                            <input type="date" @input="changeDate">
                            <i class="icon"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="scorll-wrap" ref="scroll">
                <div class="list-wrap">
                    <div class="list-item" v-for="item in listArray">
                        <div class="top">
                            <div class="left">
                                <span>{{item.name}}</span>
                                <span v-if="item.itemList.length !== 0">(交接班执行率{{Math.round((getTotal(item.itemList,'shijiao')+getTotal(item.itemList,'shijie'))/(getTotal(item.itemList,'yingjiao')+getTotal(item.itemList,'yingjie'))*100)}}%)</span>
                                <span v-else>该组织暂无交接数据</span>
                            </div>
                            <div class="right">
                                <!--<a href="">查看班组</a>-->

                                <router-link v-if="item.isSpecific === 0 && item.itemList.length !== 0" :to="{name: 'list',
                              params: {
                                orgNum: item.number,
                                name:item.name,
                                date:date
                              },
                              query: {random: Math.random(),orgNum:item.number}
                            }">查看详情</router-link>
                                <router-link v-else-if="item.isSpecific === 1 && item.itemList.length !== 0" :to="{name: 'ban',
                              params: {
                                id: item.id,
                                name:item.name,
                                date:date,
                                isThree:item.isThree
                              }
                            }">查看班组</router-link>
                                <i class="icon" v-if="item.itemList.length !== 0"></i>
                            </div>
                        </div>
                        <div class="body" v-if="item.itemList.length !== 0">
                            <div class="line">
                                <div class="left">
                                    <span>应交班记录</span>
                                    <span>{{getTotal(item.itemList,'yingjiao')}}人</span>
                                </div>
                                <div class="icon"></div>
                                <div class="right">
                                    <span>实际交班记录</span>
                                    <span>{{getTotal(item.itemList,'shijiao')}}人</span>
                                </div>
                            </div>
                            <div class="line">
                                <div class="left">
                                    <span>应接班记录</span>
                                    <span>{{getTotal(item.itemList,'yingjie')}}人</span>
                                </div>
                                <i class="icon"></i>
                                <div class="right">
                                    <span>实际接班记录</span>
                                    <span>{{getTotal(item.itemList,'shijie')}}人</span>
                                </div>
                            </div>
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
    name: "index",
    components:{
      Error
    },
    data() {
      return {
        orgNum: '',
        name:'',
        date:'',
        subArray: [],
        listArray:[],
        msgError: '',
        visibleError: false,
        code:40000,
        interfaceName:'',
        scroll:null
      }
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        console.log('beforeRouteEnter')
        console.log('from.path', from.path);

        if (from.path === '/') {
          console.log('vm.$route.params.orgNum', vm.$route.params.orgNum);
          if (vm.$route.params.orgNum) {
            // let orgNum = vm.$route.params.orgNum
            let {orgNum,name,date} = vm.$route.params
            vm.orgNum = orgNum
            vm.name = name
            vm.date = date
            localStorage.setItem('orgNum', orgNum)
            localStorage.setItem('name', name)
            localStorage.setItem('date', date)
          } else {
            vm.orgNum = localStorage.getItem('orgNum')
            vm.name = localStorage.getItem('name')
            vm.date = localStorage.getItem('date')
          }
        } else {
          vm.orgNum = localStorage.getItem('orgNum')
          vm.name = localStorage.getItem('name')
          vm.date = localStorage.getItem('date')
        }

        // axios.get('http://www.doclever.cn:8090/mock/5ca2c535c273b90cd820e664/getSubList', {
        let url = `http://${vm.$url.domain}:${vm.$url.port}/rcapp/org/next`
        axios.get(url, {
          params: {
            orgNum: vm.orgNum
            // orgNum: 'LT'
          }
        })
          .then((response) => {
            vm.code = response.data.code
            if(response.data.code === 0){
              vm.subArray = response.data.data.dataArray
              // axios.get('http://www.doclever.cn:8090/mock/5ca2c535c273b90cd820e664/queryByNumbers', {
              let url = `http://${vm.$url.domain}:${vm.$url.port}/rcapp/forms/queryByNumbers`
              axios.get(url, {
                params: {
                  chejianNumbers: encodeURIComponent(JSON.stringify(vm.subArray.map(a => a.organizationNum))),
                  date: vm.date
                }
              })
                .then((response) => {
                  vm.code = response.data.code
                  if(response.data.code === 0){
                    vm.listArray = response.data.data.dataArray

                    vm.listArray.forEach((listItem) => {
                      vm.subArray.forEach((subItem)=>{
                        if(subItem.organizationNum === listItem.number){
                          vm.$set(listItem, 'name', subItem.name);
                          vm.$set(listItem, 'isThree', subItem.isThree);
                          vm.$set(listItem, 'isSpecific', subItem.isSpecific);
                          vm.$set(listItem, 'id', subItem.id);
                        }
                      })
                    })

                    vm.$nextTick(() => {
                      if (!vm.scroll) {
                        vm.scroll = new BScroll(vm.$refs.scroll, {
                          click: true
                        })
                      } else {
                        vm.scroll.refresh()
                      }
                    })
                  }
                }).catch((error) => {
                vm.msgError = '服务器数据接口地址更换，请联系管理员更新'
                vm.visibleError = true
              }).finally(()=>{
                vm.interfaceName = 'queryByNumbers'
              })
            }else{
              vm.msgError = response.data.outerMessage
              vm.visibleError = true
            }

          }).catch((error) => {
          vm.msgError = '服务器数据接口地址更换，请联系管理员更新'
          vm.visibleError = true
        }).finally(()=>{
          vm.interfaceName = 'getSubList'
        })

        // localStorage
      })
    },
    beforeRouteUpdate (to, from, next) {
      if (from.path === '/' || from.path === '/list') {
        console.log('this.$route.params.orgNum', this.$route.params.orgNum);
        console.log('this.$route.params.orgNum', this.$route.query.orgNum);
        console.log('this.$route.params.orgNum', this.$route.query);
        console.log('from。query', from.query);
        console.log('from。params', from.params);
        console.log('to。params', to.query);
        console.log('to。params', to.params);
        if (to.params.orgNum) {
          // let orgNum = this.$route.params.orgNum
          let {orgNum,name,date} = to.params
          this.orgNum = orgNum
          this.name = name
          this.date = date
          localStorage.setItem('orgNum', orgNum)
          localStorage.setItem('name', name)
          localStorage.setItem('date', date)
        } else {
          this.orgNum = localStorage.getItem('orgNum')
          this.name = localStorage.getItem('name')
          this.date = localStorage.getItem('date')
        }
      } else {
        this.orgNum = localStorage.getItem('orgNum')
        this.name = localStorage.getItem('name')
        this.date = localStorage.getItem('date')
      }
      // alert('beforeRouteUpdate')
      // axios.get('http://www.doclever.cn:8090/mock/5ca2c535c273b90cd820e664/getSubList', {
      let url = `http://${this.$url.domain}:${this.$url.port}/rcapp/org/next`
      axios.get(url, {
        params: {
          orgNum: this.orgNum
        }
      })
        .then((response) => {
          this.code = response.data.code
          if(this.code === 0){
            this.subArray = response.data.data.dataArray

            let url = `http://${this.$url.domain}:${this.$url.port}/rcapp/forms/queryByNumbers`
            axios.get(url, {
              params: {
                chejianNumbers: encodeURIComponent(JSON.stringify(this.subArray.map(a => a.organizationNum))),
                date: this.date
              }
            })
              .then((response) => {
                this.listArray = response.data.data.dataArray

                this.listArray.forEach((listItem) => {
                  this.subArray.forEach((subItem)=>{
                    if(subItem.organizationNum === listItem.number){
                      this.$set(listItem, 'name', subItem.name);
                      this.$set(listItem, 'isThree', subItem.isThree);
                      this.$set(listItem, 'isSpecific', subItem.isSpecific);
                      this.$set(listItem, 'id', subItem.id);
                    }
                  })
                })

                this.$nextTick(() => {
                  if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.scroll, {
                      click: true
                    })
                  } else {
                    this.scroll.refresh()
                  }
                })
                next()
              }).catch((error) => {
              this.msgError = '服务器数据接口地址更换，请联系管理员更新'
              this.visibleError = true
            }).finally(()=>{
              this.interfaceName = 'queryByNumbers'
            })
          }else{
            this.msgError = response.data.outerMessage
            this.visibleError = true
          }

        }).catch((error) => {
        this.msgError = '服务器数据接口地址更换，请联系管理员更新'
        this.visibleError = true
      }).finally(()=>{
        this.interfaceName = 'org/next'
      })
    },
    methods:{
      getTotal(list, attribute) {
        return list.reduce((prev, current) => {
          let x = 0
          if (current[attribute] && current[attribute] !== 'undefined' && current[attribute] !== 'null') {
            x = Number(current[attribute])
          }
          return prev + x
        }, 0)
      },
      changeDate($event) {
        this.date = $event.target.value
        this.loadData(this.orgNum, this.date)
      },
      loadData(currentNum, date) {
        let url = `http://${this.$url.domain}:${this.$url.port}/rcapp/forms/queryByNumbers`
        axios.get(url, {
          params: {
            // chejianNumbers: encodeURIComponent(JSON.stringify([currentNum])),
            chejianNumbers: encodeURIComponent(JSON.stringify(this.subArray.map(a => a.organizationNum))),
            date: date
          }
        })
          .then((response) => {
            this.listArray = response.data.data.dataArray

            this.listArray.forEach((listItem) => {
              this.subArray.forEach((subItem)=>{
                if(subItem.organizationNum === listItem.number){
                  this.$set(listItem, 'name', subItem.name);
                  this.$set(listItem, 'isThree', subItem.isThree);
                  this.$set(listItem, 'isSpecific', subItem.isSpecific);
                  this.$set(listItem, 'id', subItem.id);
                }
              })
            })
          }).catch((error) => {
          this.msgError = '服务器数据接口地址更换，请联系管理员更新'
          this.visibleError = true
        }).finally(()=>{
          this.interfaceName = 'queryByNumbers'
        })
      },
    }
  }
</script>

<style scoped lang="scss">
    .background {
        overflow: hidden;
        background-image: linear-gradient(-231deg, #498ef9 24%, #498ef9 29%, #296ed9 100%);
        width: 3.75rem;
        height: 1.54rem;
        .bar-wrap {
            margin-top: 0.2rem;
            .bar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .title-wrap {
                    padding-left: 0.23rem;
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
    .scorll-wrap{
        height: calc(100% - 0.84rem);
        overflow: hidden;
        margin-top: -0.7rem;
    }
    .list-wrap {
        .list-item {
            margin: 0 0.12rem 0.1rem 0.12rem;
            padding: 0.22rem 0.34rem;
            display: flex;
            justify-content: space-between;
            /*align-items: center;*/
            flex-direction: column;
            background: #ffffff;
            box-shadow: 0 3px 3px 0 #e3eef5;
            border-radius: 0.08rem;
            .top {
                padding-bottom: 0.14rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left {
                    > span {
                        &:first-child {
                            font-size: 0.15rem;
                            color: #000000;
                        }
                        &:last-child {
                            font-size: 0.12rem;
                            color: #666666;
                        }
                    }
                }
                .right {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    a {
                        font-size: 0.09rem;
                        color: #2b70db;
                    }
                    .icon {
                        display: inline-block;
                        width: 0.12rem;
                        height: 0.067rem;
                        background: url("../assets/arrow.png") no-repeat;
                        background-size: contain;
                        transform: rotate(90deg);
                    }
                }
            }
            .body {
                .line {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    > div {
                        /*padding-left: 0.02rem;*/
                        /*padding-right: 0.02rem;*/
                        span {
                            &:first-child {
                                font-size: 0.14rem;
                                color: #666666;
                            }
                            &:last-child {
                                font-size: 0.14rem;
                                color: #3f3f3f;
                            }
                        }
                    }
                    .icon {
                        display: inline-block;
                        width: 0.16rem;
                        height: 0.16rem;
                        background: url("../assets/jiaoban.png") no-repeat;
                        background-size: contain;
                    }
                    &:first-child {
                        > div {
                            &:first-child {
                                padding-bottom: 0.1rem;
                                border-bottom: 1px solid #f0f0f0;
                            }
                            &:last-child {
                                padding-bottom: 0.1rem;
                                border-bottom: 1px solid #f0f0f0;
                            }
                        }
                        .icon {
                            margin-bottom: 0.1rem;
                            display: inline-block;
                            width: 0.16rem;
                            height: 0.16rem;
                            background: url("../assets/jiaoban.png") no-repeat;
                            background-size: contain;
                        }
                    }
                    &:last-child {
                        > div {
                            &:first-child {
                                padding-top: 0.1rem;
                            }
                            &:last-child {
                                padding-top: 0.1rem;
                            }
                        }
                        .icon {
                            margin-top: 0.1rem;
                            display: inline-block;
                            width: 0.16rem;
                            height: 0.16rem;
                            background: url("../assets/jieban.png") no-repeat;
                            background-size: contain;
                        }
                    }
                }
            }

        }
    }
</style>