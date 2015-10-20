/*!
 * llll - JS for Debug
 * @licence llll - v1.0.0 (2015-10-20)
 * http://blog.csdn.net/jennieji | Licence: MIT
 */
$(function() {
 //导航滑块
 if($("#pos").length){
   $(".nav-list li a").append('<span class="slide-red"></span>');
  $('.nav-list li').not('.on').find('a').hover(function(){
    $('span',this).animate({
      left:'0',
      width:'100%',
      right:'0'
    },200);
  },function(){    
    $('span',this).animate({
      left:'50%',
      width:'0'
    },200);
  });
 }

  $(".goTop").hide();
  $(window).scroll(function() {
            //获取滚动条的滑动距离
            var scrollH = $(this).scrollTop();
            if (scrollH >= 10) {
             $(".goTop").show();
            }
            else{
              $(".goTop").hide();
            }
          })
})
/*!
 * llll - JS for Debug
 * @licence llll - v1.0.0 (2015-10-20)
 * http://blog.csdn.net/jennieji | Licence: MIT
 */
$(function() {
 //导航滑块
 if($("#pos").length){
   $(".nav-list li a").append('<span class="slide-red"></span>');
  $('.nav-list li').not('.on').find('a').hover(function(){
    $('span',this).animate({
      left:'0',
      width:'100%',
      right:'0'
    },200);
  },function(){    
    $('span',this).animate({
      left:'50%',
      width:'0'
    },200);
  });
 }

  $(".goTop").hide();
  $(window).scroll(function() {
            //获取滚动条的滑动距离
            var scrollH = $(this).scrollTop();
            if (scrollH >= 10) {
             $(".goTop").show();
            }
            else{
              $(".goTop").hide();
            }
          })
})
// JavaScript Document
$(function() {
    //nav切换事件
    $(".pro-show-item").hide().eq(0).show();
    $(".paging span").eq(0).addClass("on");
    $(".paging span").click(function() {
        var index = $(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        $(this).parents().find(".pro-show-item").eq(index).show().siblings().hide();
    })

    //数量加减
    
    $(".plus").click(function() {
      var number = parseInt($(".buy-number input").val()/100);
        $(".buy-number input").val(++number*100);
    })
    $(".minus").click(function() {
      var number = parseInt($(".buy-number input").val()/100);
        if (number == 1) {
            return flase;
        } else {
            $(".buy-number input").html($(".buy-number input").val(--number*100));
        }
    })
    $(".buy-number input").blur(function(){
      var number = parseInt($(this).val()/100);
      $(this).val(number*100)
    })

    //变量声明
    var tabContentHtml = "<div class='select-list-content'>" + "<dl class='select-item'>" + "<dt>纸张类型：</dt>" + "<dd><span>铜版纸</span><span>哑粉纸</span><span>双胶纸</span></dd>" + "</dl>" + "<dl class='select-item'>" + "<dt>纸张克重：</dt>" + "<dd><span>70</span><span>80</span><span>100</span><span>120</span><span>150</span><span>105</span><span>128</span><span>157</span><span>200</span><span>250</span><span>300</span><span>350</span></dd>" + "</dl>" + "<dl class='select-item'>" + "<dt>内文P数：</dt>" + "<dd><span>4</span><span>8</span><span>12</span><span>16</span><span>20</span><span>24</span><span>28</span><span>32</span><span>36</span><span>40</span><span>44</span><span>48</span><span>52</span><span>56</span><span>60</span><span>64</span><span>68</span><span>72</span><span>76</span><span>80</span></dd>" + "</dl>" + "<dl class='select-item'>" + "<dt>印刷颜色：</dt>" + "<dd><span>双面四色</span><span>双面单黑</span></dd>" + "</dl>" + "<dl class='select-item'>" + "<dt>覆膜过油：</dt>" + "<dd><span>无</span><span>单面亮膜</span><span>单面亚膜</span><span>双面亮膜</span><span>双面亚膜</span><span>双面过油</span></dd>" + "</dl>" + "</div>";


    //tab切换函数
    function tab(n) {
        // alert(TabContent.eq(n).html())
        $(".select-list-title h4").removeClass("on").eq(n).addClass("on");
        $(".pro-select-list .select-list-content").hide().eq(n).show();
    };
    //判断新增内页按钮是否隐藏
    function tabButton(length) {
        if (length > 7) {
            $(".add").hide();
        } else {
            $(".add").show();
        }
    };

    //新增内页函数
    function tabAdd(n, index) {
        $("<h4 class='newPage'>内文" + n + "<span class='close'>×</span></h4>").insertBefore(".add");
        $(".select-list-title h4").eq(index).addClass("on").siblings().removeClass("on");
        $(".pro-select-list").append(tabContentHtml);
        tab(index);
    };

    //删除内页函数
    function tabDel(n) {
        $(".select-list-title h4").eq(n).remove();
        $(".pro-select-list .select-list-content").eq(n).remove();

    };

    //重置内页参数
    function tabItemSelect(n) {
        $(".select-list-content").eq(n).find(".select-item").each(function() {
            $(this).find("span").eq(0).addClass("on");
            $(this).find("span").click(function() {
                $(this).addClass("on").siblings().removeClass("on");
            })
        })
    };
    //初始化
    (function init() {
        tab(0);
        $(".select-list-title h4").click(function() {
            tab($(this).index());
        });
        tabItemSelect(0);
        tabItemSelect(1)
    }());



    //增加内文
    var n = 0;
    $(".add").click(function() {
        n++;
        var index = $(this).index();
        var length = $(".select-list-title h4").length;
        //新增
        tabAdd(n, index);
        //增加按钮是否隐藏
        tabButton(length);
        //产品参数重置
        tabItemSelect(index);
            //tab切换事件        
        $(".select-list-title h4").click(function() {
                tab($(this).index());
            });
            //删除Tab内文事件
        $(".close").click(function() {
            var index = $(this).parent().index();

            if (index > 1) {
                tabDel(index);
                tab(index - 1);
                tabButton(-1);
            };
        });
    });




    //产品详情tab切换
    function proTab(n){
      $(".pro-detail-title h4").eq(n).addClass("on").siblings().removeClass("on");
    $(".pro-detail-content figure").eq(n).show().siblings().hide();
    }
    //初始化
    proTab(0);
    $(".pro-detail-title h4").click(function() {
            var index = $(this).index();
            n=index;
            proTab(index);
        })
    //左右箭头切换
    var L=$(".pro-detail-title h4").length;
    $(".nav-page-next").click(function(){
        if (n>=L-1) {
            return false;
        }
        else{
            proTab(++n);
        }       
    })    
    $(".nav-page-prev").click(function(){
        if(n==0){
            return false;
        }
        else{
            proTab(--n);
        }       
    })
        //滚动至浏览器顶部定位
    function scrollNav() {
        //获取要定位元素距离浏览器顶部的距离
        var navH = $(".pro-detail-title").offset().top;
        //滚动条事件
        $(window).scroll(function() {
            //获取滚动条的滑动距离
            var scroH = $(this).scrollTop();
            //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
            if (scroH >= navH) {
                $(".pro-detail-title").css({
                    "position": "fixed",
                    "top": 0,
                    "left": "0",
                    "width":"100%"
                });
            } else if (scroH < navH) {
                $(".pro-detail-title").css({
                    "position": "static",
                    "width": "100%"
                });
            }
        })
    }
    scrollNav()

   
})
