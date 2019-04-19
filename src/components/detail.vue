<template>
    <div>
        <div id="modalBody">
        </div>
        <div class="datarow" id="imgarea">
        </div>
    </div>
</template>

<script>
  import $ from 'jquery'
  import axios from 'axios'
  $.fn.ImgZoomIn = function () {
    $('.imgzoom').css("display","block");
    var imgsrc = $(this).attr("src");
    $('.imgzoom').css("backgroundImage","url("+imgsrc+")");
    var viewbig = "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=3"
    $("meta[name='viewport']").attr("content",viewbig);
  };

  export default {
    name: "detail",
    data() {
      return {
        data: {}
      }
    },
    mounted() {
      axios.get('http://www.doclever.cn:8090/mock/5ca2c535c273b90cd820e664/getDetail', {
        params: {}
      })
        .then((response) => {
          this.data = response.data.data
          var imgUrlGet = this.data.imgUrlGet;
          var dataStr = this.data.dataStr;

          // var typeStr = this.data.typeStr;
          // var types = JSON.parse(typeStr);
          var types = this.data.typeStr

          // var jbs = JSON.parse(dataStr);
          var jbs = dataStr;
//展示交班时上传的图片
          if (imgUrlGet !== "" && imgUrlGet != null) {
            var imggroup = imgUrlGet.split("|");
            var imghtml = "";
            for (let i = 0; i < imggroup.length; i++) {
              imghtml = imghtml +
                '<div class="xcimgarea">' +
                '<img src="' + imggroup[i] + '" class="xcimg" onclick="$(this).ImgZoomIn()">' +
                '</div>';
            }
            $('#imgarea').before('<p class="s_classtitle">现场图片</p>');
            $('#imgarea').html(imghtml);
            this.imgFixed();
            this.imgPaixu();
          }
          $('#modalBody').html('');

          var htmlType = "";

//生成分类div，后面根据这些div给数据分类填装
          for (let t in types) {
            htmlType += '<div id="' + types[t].fid + 'Div">' +
              '<p class="s_classtitle">' + types[t].chn + '</p>' +
              '</div>';
          }
// console.log(htmlType);
          $('#modalBody').html(htmlType);
          for (let ji in jbs) {
            if ("null" == jbs[ji].unit) {
              jbs[ji].unit = ""
            }
            ;
            if ("null" == jbs[ji].val) {
              jbs[ji].val = ""
            }
            ;
            for (let ti in types) {
              if (jbs[ji].clazz == types[ti].fid) {

                if ("simple" == jbs[ji].type) {
                  var htmlSon1 = $('#' + replaceSpecialSign(types[ti].fid) + 'Div').html() +
                    '<p class="datarow" index="' + ji + '">' +
                    '<span class="s_tname">' + jbs[ji].chn + '</span>' +
                    '<span class="s_tval">' + jbs[ji].val + '</span>' +
                    '<span class="s_tunit">' + jbs[ji].unit + '</span>' +
                    '</p>';

                  $('#' + replaceSpecialSign(types[ti].fid) + 'Div').html(htmlSon1);
                }
                if ("usual" == jbs[ji].type) {
                  var dataUals = jbs[ji].val.split("|");
                  var engUal = jbs[ji].eng.replace(/\//g, "\\/");
                  var htmlSon2 = "";
                  if ("2" == dataUals[0]) {//dataUals[1] val
                    htmlSon2 = $('#' + replaceSpecialSign(types[ti].fid) + 'Div').html() +
                      '<p class="datarow" index="' + ji + '">' +
                      '<span class="s_tname">' + jbs[ji].chn + '</span>' +
                      '<span class="s_tval">不正常 原因：' + dataUals[1] + '</span>' +
                      '<span class="s_tunit">' + jbs[ji].unit + '</span>' +
                      '</p>';
                  } else {
                    htmlSon2 = $('#' + replaceSpecialSign(types[ti].fid) + 'Div').html() +
                      '<p class="datarow" index="' + ji + '">' +
                      '<span class="s_tname">' + jbs[ji].chn + '</span>' +
                      '<span class="s_tval">正常</span>' +
                      '<span class="s_tunit">' + jbs[ji].unit + '</span>' +
                      '</p>';
                  }
                  $('#' + replaceSpecialSign(types[ti].fid) + 'Div').html(htmlSon2);
                }
                if ("good" == jbs[ji].type) {
                  var htmlSon3 = "";
                  if ("2" == jbs[ji].val) {
                    htmlSon3 = $('#' + replaceSpecialSign(types[ti].fid) + 'Div').html() +
                      '<p class="datarow" index="' + ji + '">' +
                      '<span class="s_tname">' + jbs[ji].chn + '</span>' +
                      '<span class="s_tval">良</span>' +
                      '<span class="s_tunit">' + jbs[ji].unit + '</span>' +
                      '</p>';
                  } else if ("3" == jbs[ji].val) {
                    htmlSon3 = $('#' + replaceSpecialSign(types[ti].fid) + 'Div').html() +
                      '<p class="datarow" index="' + ji + '">' +
                      '<span class="s_tname">' + jbs[ji].chn + '</span>' +
                      '<span class="s_tval">差</span>' +
                      '<span class="s_tunit">' + jbs[ji].unit + '</span>' +
                      '</p>';
                  } else {
                    htmlSon3 = $('#' + replaceSpecialSign(types[ti].fid) + 'Div').html() +
                      '<p class="datarow" index="' + ji + '">' +
                      '<span class="s_tname">' + jbs[ji].chn + '</span>' +
                      '<span class="s_tval">优</span>' +
                      '<span class="s_tunit">' + jbs[ji].unit + '</span>' +
                      '</p>';
                  }
                  $('#' + replaceSpecialSign(types[ti].fid) + 'Div').html(htmlSon3);
                }
                if ("textarea" == jbs[ji].type) {
                  var htmlSon4 = $('#' + replaceSpecialSign(types[ti].fid) + 'Div').html() +
                    '<p class="datarow" index="' + ji + '">' +
                    '<span class="s_tname">' + jbs[ji].chn + '</span>' +
                    '<span class="s_tval">' + jbs[ji].val + '</span>' +
                    '<span class="s_tunit">' + jbs[ji].unit + '</span>' +
                    '</p>';
                  $('#' + replaceSpecialSign(types[ti].fid) + 'Div').html(htmlSon4);
                }
              }
            }
          }
        })
    },
    methods: {
      imgFixed() {
        $('.xcimgarea').css("height", $('.xcimgarea').css("width"));
        var xcimg = $('.xcimg');
        for (var i = 0; i < xcimg.length; i++) {
          if ($(xcimg[i]).height() > $(xcimg[i]).width()) {
            $(xcimg[i]).height($('.xcimgarea').css("height"))
          }
          else {
            if ($(xcimg[i]).height() == $(xcimg[i]).width()) {
              $(xcimg[i]).css("height", "100%");
              $(xcimg[i]).css("width", "100%");
            }
            else {
              $(xcimg[i]).width($('.xcimgarea').css("height"))
              var hh = $('.xcimgarea').height() - $(xcimg[i]).height();
              $(xcimg[i]).css("marginTop", 0.5 * hh);
            }
          }
        }
      },
      imgPaixu(){
        var xcimgarea = $('.xcimgarea');
        var l = xcimgarea.length - 1;
        var j = 0;
        for(var i=0;i < xcimgarea.length;i++){
          if($(xcimgarea[i]).css("display") != "none"){
            j = j+1;
          }
        }
        $(xcimgarea[l]).css("marginBottom","1rem");
        if(j % 2 == 1){
          $(xcimgarea[l]).attr("class","xcimgarea single add");
        }
        else{
          $(xcimgarea[l]).attr("class","xcimgarea add");
        }                       //浏览器当前窗口文档的高度
      }
    }
  }
</script>

<style scoped>
    html, body, a, div, span, p, footer, textarea, button, input {
        margin: 0px;
        padding: 0px;
    }

    .s_classtitle {
        width: 90%;
        margin-left: 5%;
        font-size: 16px;
        border-bottom: 1px solid #3cbaff;
        margin-top: 10px;
    }

    .datarow {
        width: 80%;
        margin: 8px 0;
        margin-left: 10%;
        white-space: nowrap;
        max-height: 40px;
    }

    .s_tname {
        display: inline-block;
        width: auto;
        height: 23px;
        line-height: 23px;
        font-size: 14px;
    }

    .s_tval {
        margin: 0 10px;
        font-weight: 600;
        font-size: 16px;
    }

    .s_tunit {
        display: inline-block;
        width: auto;
        height: 23px;
        line-height: 23px;
        font-size: 14px;
    }

    .inputrow {
        width: 80%;
        margin: 8px 0;
        margin-left: 10%;
        white-space: nowrap;
    }

    .s_name {
        display: inline-block;
        width: auto;
        height: 23px;
        line-height: 23px;
        font-size: 14px;
    }

    .s_input {
        width: auto;
        display: inline-block;
        margin-left: 5px;
    }

    .s_text {
        width: auto;
        display: inline-block;
        height: 23px;
        line-height: 23px;
        border: 1px solid #ee9;
        border-radius: 5px;
        padding-left: 3px;
        margin-left: 5px;
        margin-right: 5px;
    }

    .s_label {
        font-weight: 500;
        margin-left: 5px;
    }

    .s_radio {

    }

    .s_textarea {
        resize: none;
    }

    .s_unit {
        display: inline-block;
        width: auto;
        height: 23px;
        line-height: 23px;
        font-size: 14px;

    }

    .btn {
        display: block;
        padding: 6px 12px;
        margin-bottom: 0;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.42857143;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-image: none;
        border: 1px solid transparent;
        border-radius: 4px;
    }

    .btn-data {
        width: 80%;
        margin-left: 10%;
        background-color: #e9ecf1;
    }

    .btn-sure {
        width: 100%;
        border-radius: 0;
        background-color: #fff;
        border-top: 8px solid #e9ecf1;
    }

    .btn-refuse {
        width: 100%;
        border-radius: 0;
        background-color: #fff;
        border-top: 8px solid #e9ecf1;
    }

    .comHtml {
        padding: 0;
        margin: 0;
    }

    .btn-imgupload {
        float: left;
        width: 100%;
        height: 40px;
        letter-spacing: 1px;
        font-size: 16px;
        font-weight: 400;
        background-color: #fff;
        border-top: 5px solid #e9ecf1;
    }

    .inputyuanyin {
        display: none;
    }






    .xcimgarea{
        width:49%;
        overflow:hidden;
        float:left;
        text-align:center;
        vertical-align:middle;
        background-color:rgba(0,0,0,.2);
        border:1px solid rgb(255,255,255);
        margin-left: 0.5%;
    }
    .single{
        clear:both;
        margin-left:25%;
    }
    .xcimg{

    }
    .imgzoom{
        position:fixed;
        width:100%;
        height:100%;
        background-color:rgba(0,0,0,.7);
        z-index:2000;
        display:none;
        background-repeat:no-repeat;
        background-size:contain;
        background-position:center;
        top: 0px;
    }
    .thisdel{
        display:block;
        position:absolute;
        margin-left:39%;
        width:38px;
        height:38px;
        background:url(/mbos/store/8385632/mboslky/close.png) center no-repeat;
        background-size:contain;
        z-index:100;
    }
    .btn-imgupload{
        float: left;
        width:100%;
        height: 40px;
        letter-spacing: 1px;
        font-size: 16px;
        font-weight:400;
        background-color:#fff;
        border-top: 5px solid #e9ecf1;
    }
</style>