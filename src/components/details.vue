<template>
    <div>
        <div class="wrap" v-if="!visibleError">
            <div class="block" v-for="itemType in typeArray">
                <p>{{itemType.chn}}</p>
                <ul>
                    <li v-for="item in itemType.subData">
                        <span>{{item.chn}}</span>
                        <span v-if="item.type === 'good' && item.val==='1'">优</span>
                        <span v-else-if="item.type === 'good' && item.val==='2'">良</span>
                        <span v-else-if="item.type === 'good' && item.val==='3'">差</span>
                        <span v-else-if="item.type === 'usual' && item.val==='1'">正常</span>
                        <span v-else-if="item.type === 'usual' && item.val==='2'">异常</span>
                        <span v-else>{{item.val}}</span>
                        <span>{{item.unit}}</span>
                    </li>
                </ul>
            </div>
            <div class="bottom">
                <p>现场图片</p>
                <div class="img-wrap">
                    <div class="img-item" v-for="item in imgUrlArray" @click="showImg(item)">
                        <img :src="item" alt="">
                    </div>
                </div>
            </div>
            <div class="show-img" v-if="visible" @click="hidden">
                <img :src="src" alt="">
            </div>
        </div>
        <Error :msg="msgError" :visible="visibleError" :code="code" :name="interfaceName"></Error>
    </div>
</template>

<script>
  import axios from 'axios'
  import Error from './error'

  export default {
    name: "details",
    components:{
      Error
    },
    data() {
      return {
        data: {},
        imgUrlArray: [],
        dataArray: [],
        typeArray: [],
        src: '',
        visible: false,
        code:40000,
        msgError:'',
        visibleError:false,
        interfaceName:''
      }
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        if (from.path === '/ban') {

          if (vm.$route.params.jlid) {
            let {jlid} = vm.$route.params
            vm.jlid = jlid
            localStorage.setItem('jlid', jlid)
          } else {
            vm.jlid = localStorage.getItem('jlid')
          }
        } else {
          vm.jlid = localStorage.getItem('jlid')
        }

        let url = `http://${vm.$url.domain}:${vm.$url.port}/rcapp/report/jilu`
        axios.get(url, {
          params: {
            // id: 'Kx0AAAGntFpbE95s'
            id: vm.jlid
          }
        })
          .then((response) => {
            vm.code = response.data.code
            if(vm.code === 0){
              vm.data = response.data.data
              vm.imgUrlArray = vm.data.imgUrl == null ? [] : vm.data.imgUrl.split('|');
              vm.dataArray = vm.data.dataArray == null ? [] : vm.data.dataArray;
              vm.typeArray = vm.data.type == null ? [] : vm.data.type

              vm.typeArray.forEach((typeItem) => {
                vm.$set(typeItem, 'subData', [])
                vm.dataArray.forEach((dataItem) => {
                  if (typeItem.fid === dataItem.clazz) {
                    typeItem.subData.push(dataItem)
                    // this.$set(typeItem.dataArray,'dataArray',dataItem)
                  }
                })
              })
            }else{
              vm.msgError = response.data.outerMessage
              vm.visibleError = true
            }
console.log(vm.visibleError)
          }).catch((error) => {
          vm.msgError = '服务器数据接口地址更换，请联系管理员更新'
          vm.visibleError = true
        }).finally(()=>{
          vm.interfaceName = 'report/jilu'
        })
        console.log(vm.visibleError)
        // localStorage
      })
    },
    mounted() {

    },
    methods: {
      showImg(src) {
        this.visible = true
        this.src = src
      },
      hidden() {
        this.visible = false
      }

    }
  }
</script>

<style scoped lang="scss">
    .wrap {
        background-color: #F2F6F9;
    }

    .block {
        margin-bottom: 0.1rem;
        padding-left: 0.12rem;
        background-color: #fff;
        p {
            padding-top: 0.12rem;
            padding-bottom: 0.12rem;
            font-size: 0.16rem;
            color: #000000;
            border-bottom: 1px solid #f0f0f0;
        }
        ul {
            li {
                padding-top: 0.12rem;
                padding-bottom: 0.12rem;
                span {
                    font-size: 0.16rem;
                    color: #666666;
                    &:first-child {
                        padding-right: 0.2rem;
                    }
                    &:nth-child(2) {
                        font-weight: bold;
                        color: #000;
                    }
                    &:last-child {
                        padding-left: 0.2rem;
                    }
                }
            }
        }
    }

    .bottom {
        padding-left: 0.12rem;
        background-color: #fff;
        p {
            padding-top: 0.12rem;
            padding-bottom: 0.12rem;
            font-size: 0.16rem;
            color: #000000;
            border-bottom: 1px solid #f0f0f0;
            background-color: #fff;
        }
    }

    .img-wrap {
        padding-top: 0.12rem;
        padding-bottom: 0.12rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #fff;

        .img-item {
            /*width:100%;*/
            /*height:0.9rem;*/
            height: 0.9rem;
            background-color: #ebebeb;
            img {
                border-radius: 50%;
                width: auto;
                height: 100%;
            }
        }
    }

    .show-img {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;
        img {
            width: 100%;
            height: auto;
        }
    }
</style>