import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/index'
import List from './components/list'
import Ban from './components/ban'
import Detail from './components/detail'
import Details from './components/details'
import Error from './components/error'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        index: 0
      }
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        index: 0
      }
    },
    {
      path: '/list',
      name: 'list',
      component: List,
      meta: {
        index: 1
      }
    },
    {
      path: '/ban',
      name: 'ban',
      component: Ban,
      meta: {
        index: 2
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
      meta: {
        index: 3
      }
    },
    {
      path: '/details',
      name: 'details',
      component: Details,
      meta: {
        index: 3
      }
    },
    {
      path: '/error',
      name: 'error',
      component: Error,
      meta: {
        index: 4
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})


//员工接班数据
var jiaojson = [{
  "eng": "dianqixiton",
  "chn": "电器系统",
  "val": "",
  "unit": "",
  "type": "good",
  "clazz": "Kx0AAABga6/blXdN"
}, {
  "eng": "gongyizhibiaozxqk",
  "chn": "工艺指标执行情况",
  "val": "",
  "unit": "",
  "type": "good",
  "clazz": "Kx0AAABiirTblXdN"
}, {
  "eng": "lukuang",
  "chn": "炉况",
  "val": "1",
  "unit": "",
  "type": "good",
  "clazz": "Kx0AAABiirXblXdN"
}, {
  "eng": "lukuang",
  "chn": "炉况执行情况",
  "val": "",
  "unit": "",
  "type": "execute",
  "clazz": "Kx0AAABiirXblXdN"
}, {
  "eng": "luqianpingtaiweisheng",
  "chn": "炉前平台卫生",
  "val": "2",
  "unit": "",
  "type": "good",
  "clazz": "Kx0AAABga7bblXdN"
}, {
  "eng": "luxiaweisheng",
  "chn": "炉下卫生",
  "val": "",
  "unit": "",
  "type": "good",
  "clazz": "Kx0AAABga7bblXdN"
}, {
  "eng": "shengchanqingkuang",
  "chn": "生产情况",
  "val": "",
  "unit": "",
  "type": "good",
  "clazz": "Kx0AAABiirbblXdN"
}, {
  "eng": "xiuxishiweisheng",
  "chn": "休息室卫生",
  "val": "",
  "unit": "",
  "type": "good",
  "clazz": "Kx0AAABga7bblXdN"
}, {
  "eng": "yangqiang",
  "chn": "氧枪",
  "val": "",
  "unit": "",
  "type": "good",
  "clazz": "Kx0AAABga6/blXdN"
}, {
  "eng": "yeliangangzhong",
  "chn": "冶炼钢种",
  "val": "",
  "unit": "",
  "type": "good",
  "clazz": "Kx0AAABiirXblXdN"
}, {
  "eng": "zhuanlubenti",
  "chn": "转炉本体",
  "val": "",
  "unit": "",
  "type": "good",
  "clazz": "Kx0AAABga6/blXdN"
}, {
  "eng": "zhukongshiweisheng",
  "chn": "主控室卫生",
  "val": "",
  "unit": "",
  "type": "good",
  "clazz": "Kx0AAABga7bblXdN"
}, {
  "eng": "gangshuizhiliang",
  "chn": "钢水质量",
  "val": "1",
  "unit": "%",
  "type": "simple",
  "clazz": "Kx0AAABiirbblXdN"
}, {
  "eng": "tiehaowancheng",
  "chn": "铁耗完成",
  "val": "23",
  "unit": "%",
  "type": "simple",
  "clazz": "Kx0AAABiirbblXdN"
}, {
  "eng": "zhuangruliang",
  "chn": "装入量",
  "val": "12",
  "unit": "t",
  "type": "simple",
  "clazz": "Kx0AAABiirbblXdN"
}, {
  "eng": "zhuanluyemian",
  "chn": "转炉液面",
  "val": "12",
  "unit": "mm",
  "type": "simple",
  "clazz": "Kx0AAABiirbblXdN"
}, {
  "eng": "qitaqingkuang",
  "chn": "其他情况",
  "val": "fvvf",
  "unit": "",
  "type": "textarea",
  "clazz": "Kx0AAABhPqfblXdN"
}, {
  "eng": "shagnjiyaoqiuherenwuchuandan",
  "chn": "上级要求和任务传达",
  "val": "",
  "unit": "",
  "type": "textarea",
  "clazz": "Kx0AAABhH4jblXdN"
}, {
  "eng": "anquansheshi",
  "chn": "安全设施",
  "val": "",
  "unit": "",
  "type": "usual",
  "clazz": "Kx0AAABga7XblXdN"
}, {
  "eng": "diannaoxianshi",
  "chn": "电脑显示",
  "val": "",
  "unit": "",
  "type": "usual",
  "clazz": "Kx0AAABga6/blXdN"
}, {
  "eng": "fanghuqiju",
  "chn": "防护器具",
  "val": "",
  "unit": "",
  "type": "usual",
  "clazz": "Kx0AAABga7XblXdN"
}, {
  "eng": "shuixitong",
  "chn": "水系统",
  "val": "",
  "unit": "",
  "type": "usual",
  "clazz": "Kx0AAABga6/blXdN"
}, { "eng": "xiaofangqicai", "chn": "消防器材", "val": "", "unit": "", "type": "usual", "clazz": "Kx0AAABga7XblXdN" }];
//所有交接数据项所属分类
var leixing = [{ "chn": "主要工作、操作变化及处理过程，产品质量情况", "fid": "Kx0AAABiirbblXdN" }, {
  "chn": "主要设备运行情况",
  "fid": "Kx0AAABga6/blXdN"
}, { "chn": "安全情况", "fid": "Kx0AAABga7XblXdN" }, {
  "chn": "主要生产情况           ",
  "fid": "Kx0AAABhPqfblXdN"
}, { "chn": "工艺指标和产品要求", "fid": "Kx0AAABiirTblXdN" }, {
  "chn": "卫生情况",
  "fid": "Kx0AAABga7bblXdN"
}, { "chn": "上级要求与任务传达", "fid": "Kx0AAABhH4jblXdN" }, { "chn": "交班主要操作条件和下班应注意的问题", "fid": "Kx0AAABiirXblXdN" }];


var json = {
  "data": {
    "imgUrlGet": "http://do.yunzhijia.com/pubacc/public/data/XT-900cc145-1b6f-4001-a97a-984dc2bafeea/1495711289212_jjorder.png|http://do.yunzhijia.com/pubacc/public/data/XT-900cc145-1b6f-4001-a97a-984dc2bafeea/1495711289212_jjorder.png|http://do.yunzhijia.com/pubacc/public/data/XT-900cc145-1b6f-4001-a97a-984dc2bafeea/1495711289212_jjorder.png",
    "typeStr": [{ "chn": "主要工作、操作变化及处理过程，产品质量情况", "fid": "Kx0AAABiirbblXdN" }, {
      "chn": "主要设备运行情况",
      "fid": "Kx0AAABga6/blXdN"
    }, { "chn": "安全情况", "fid": "Kx0AAABga7XblXdN" }, {
      "chn": "主要生产情况           ",
      "fid": "Kx0AAABhPqfblXdN"
    }, { "chn": "工艺指标和产品要求", "fid": "Kx0AAABiirTblXdN" }, {
      "chn": "卫生情况",
      "fid": "Kx0AAABga7bblXdN"
    }, { "chn": "上级要求与任务传达", "fid": "Kx0AAABhH4jblXdN" }, { "chn": "交班主要操作条件和下班应注意的问题", "fid": "Kx0AAABiirXblXdN" }],
    "dataStr": [{
      "eng": "DWDGDGGXTD",
      "chn": "过钢系统情况",
      "val": "正常",
      "unit": "",
      "type": "textarea",
      "clazz": "Kx0AAABheCvblXdN"
    }, {
      "eng": "ZGBMQKJDCHGQK",
      "chn": "轧辊情况",
      "val": "正常",
      "unit": "",
      "type": "textarea",
      "clazz": "Kx0AAABheCvblXdN"
    }, {
      "eng": "banzhongsheng",
      "chn": "班中生产情况",
      "val": "正常",
      "unit": "",
      "type": "textarea",
      "clazz": "Kx0AAABheCvblXdN"
    }, {
      "eng": "anhuanfanghucuoshi",
      "chn": "安环防护设施",
      "val": "",
      "unit": "",
      "type": "usual",
      "clazz": "Kx0AAABheCrblXdN"
    }, {
      "eng": "chicunjilu",
      "chn": "尺寸记录",
      "val": "",
      "unit": "",
      "type": "usual",
      "clazz": "Kx0AAABheCrblXdN"
    }, {
      "eng": "dianjianjiluka",
      "chn": "点检记录卡",
      "val": "",
      "unit": "",
      "type": "usual",
      "clazz": "Kx0AAABheCrblXdN"
    }, {
      "eng": "gonggongweisheng",
      "chn": "公共卫生",
      "val": "",
      "unit": "",
      "type": "usual",
      "clazz": "Kx0AAABheCrblXdN"
    }, {
      "eng": "huanguigongju",
      "chn": "换辊工具",
      "val": "",
      "unit": "",
      "type": "usual",
      "clazz": "Kx0AAABheCrblXdN"
    }, {
      "eng": "qigegongju",
      "chn": "气割工具",
      "val": "",
      "unit": "",
      "type": "usual",
      "clazz": "Kx0AAABheCrblXdN"
    }]
  },
  "code": 10404,
  "innerMessage": "xxxxx",
  "outerMessage": "您sdfsdfxxx"
}
//good 单选优良差 simple input-text usual 正常不正常单选按钮组 不正常的话弹出输入原因的文本框
var a = {
  "errorCode": 0,
  "msg": "success",
  "data": {
    "dataArray": [
      {
        "eng": "DWDGDGGXTD",
        "chn": "过钢系统情况",
        "val": "正常",
        "unit": "",
        "type": "textarea",
        "clazz": "Kx0AAABheCvblXdN"
      },
      {
        "eng": "ZGBMQKJDCHGQK",
        "chn": "轧辊情况",
        "val": "正常",
        "unit": "",
        "type": "textarea",
        "clazz": "Kx0AAABheCvblXdN"
      },
      {
        "eng": "banzhongsheng",
        "chn": "班中生产情况",
        "val": "正常",
        "unit": "",
        "type": "textarea",
        "clazz": "Kx0AAABheCvblXdN"
      },
      {
        "eng": "anhuanfanghucuoshi",
        "chn": "安环防护设施",
        "val": "",
        "unit": "",
        "type": "usual",
        "clazz": "Kx0AAABheCrblXdN"
      },
      {
        "eng": "chicunjilu",
        "chn": "尺寸记录",
        "val": "",
        "unit": "",
        "type": "usual",
        "clazz": "Kx0AAABheCrblXdN"
      },
      {
        "eng": "dianjianjiluka",
        "chn": "点检记录卡",
        "val": "",
        "unit": "",
        "type": "usual",
        "clazz": "Kx0AAABheCrblXdN"
      },
      {
        "eng": "gonggongweisheng",
        "chn": "公共卫生",
        "val": "",
        "unit": "",
        "type": "usual",
        "clazz": "Kx0AAABheCrblXdN"
      },
      {
        "eng": "huanguigongju",
        "chn": "换辊工具",
        "val": "",
        "unit": "",
        "type": "usual",
        "clazz": "Kx0AAABheCrblXdN"
      },
      {
        "eng": "qigegongju",
        "chn": "气割工具",
        "val": "",
        "unit": "",
        "type": "usual",
        "clazz": "Kx0AAABheCrblXdN"
      }
    ],
    "imgUrl": null,
    "type": [
      {
        "fid": "Kx0AAABheCvblXdN",
        "chn": "生产工艺内容"
      },
      {
        "fid": "Kx0AAABheCrblXdN",
        "chn": "基本内容"
      }
    ]
  }
}

