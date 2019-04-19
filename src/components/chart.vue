<template>
    <div :id="id" :style="style"></div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "chart",
    data() {
      return {
        //echarts实例
        chart: ""
      };
    },
    props: {
      //父组件需要传递的参数：id，width，height，option
      id: {
        type: String
      },
      width: {
        type: String,
        default: "100%"
      },
      height: {
        type: String,
        default: "300px"
      },
      option: {
        type: Object,
        //Object类型的prop值一定要用函数return出来，不然会报错。原理和data是一样的，
        //使用闭包保证一个vue实例拥有自己的一份props
        default() {
          return {
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
                  { value: 1, name: '' },
                  { value: 0, name: '' },
                ]
              }
          }
        }
      }
    },
    created(){
      console.log(this.option)
    },
    computed: {
      style() {
        return {
          height: this.height,
          width: this.width
        };
      }
    },
    watch: {
      //观察option的变化
      option: {
        handler(newVal, oldVal) {
          console.log(newVal)
          console.log(oldVal)
          if (this.chart) {
            if (newVal) {
              this.chart.setOption(newVal);
            } else {
              this.chart.setOption(oldVal);
            }
          } else {
            this.init();
          }
        },
        deep: true, //对象内部属性的监听，关键。
        // immediate: true
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.chart = echarts.init(document.getElementById(this.id));
        this.chart.setOption(this.option);
      }
    }
  }
</script>

<style scoped>

</style>