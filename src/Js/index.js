$(function() {
  $(".shop-list figure").hover(function() {
    $(this).addClass("on").siblings("figure").removeClass("on");
  }).eq(0).addClass("on");
  //首页banner
  var i = 0;
  var L = $('.show-slide-list figure').length;
  for (var i = 1; i <= L; i++) {
    var html = "<span> </span>";
    $(".show-slide .paging").append(html);
  }
  function autoPlay() {
    if (i == L - 1) { //判断是不是显示到最后一张，如果是下一张就显示第一张
      i = 0;
    } else { //如果不是现实最后一张，就显示下一张，索引值+1
      i++;
    }
    show(); //执行动画
  }
  
  //淡入淡出动画
  function show() {
    clearInterval(timer);
    if (timer2) {
      clearTimeout(timer2);
    }
    $('.show-slide-list figure').eq(i).stop(true, true).fadeIn("slow").siblings().hide();
    $('.show-slide .paging span').eq(i).addClass("on").siblings().removeClass("on");
    timer2 = setTimeout(function() {
      timer = setInterval(autoPlay, 3500);
    },
    1000);
  }
  show();
  //自动切换
  var timer = setInterval(autoPlay, 3500),
  timer2;
  
  $('.show-slide .paging span').each(function(index) {
    $(this).mouseover(function() {
      i = index;
      show(500);
    });
    i = 0;
    show(500);
  });
  //hover暂停动画
 $('.show-slide-list figure').hover(function(){
    clearInterval(timer);
    if (timer2) {
      clearTimeout(timer2);
    }
 },function(){
    timer2 = setTimeout(function() {
      timer = setInterval(autoPlay, 3500);
    },
    1000);
 })
 
  //带左右箭头的
  $(".show-slide .prev").click(function() {
    i = i - 1 < 0 ? L - 1 : i - 1;
    show();
  });
  $(".show-slide .next").click(function() {
    i = i + 1 > L - 1 ? 0 : i + 1;
    show();
  });

  //特价商品左右切换
  $(".spectial-pro-list .pro-content").width("2000000000px");
  var n=0;
  var a=Math.ceil($(".spectial-pro-list .pro-item").length/4);
  function spl(n){
   $(".spectial-pro-list .pro-content").animate({marginLeft: -1226 * n + "px"},1000); 
   if (n==0) {
     $(".pro-list-pagging .last").hide();
   }
   else if(n+1>=a){
     $(".pro-list-pagging .next").hide();
   }
   else{
     $(".pro-list-pagging .last").show();
     $(".pro-list-pagging .next").show();
   }
  }
  //初始化
 spl(0);
$(".pro-list-pagging .last").click(function(){
   if (n==0) {
     return false;
   }
   else{
  spl(--n);
   }
  })
$(".pro-list-pagging .next").click(function(){
   if (n+1>=a) {
     return false;
   }
   else{
     spl(++n);
   }
  })

//产品搜索块hover显示
$('.pro-item-search').css('opacity',0);
$(".pro-list .pro-item").hover(function(){
  $(this).addClass("show");
  $('.pro-item-search',this).stop().animate({
    top:'35%',
    opacity:'1'
  },600)
},function(){
  $('.pro-item-search',this).stop().animate({
    top:'0',
    opacity:'0'
  },0)
})


//table滚动
        var speed = 50;
                            orderList2.innerHTML = orderList1.innerHTML;

                            var position = orderList2.offsetTop - orderList.scrollTop - orderList1.offsetHeight;

                            function Marquee() {
                                if (orderList2.offsetTop - orderList.scrollTop <= position)
                                    orderList.scrollTop -= orderList1.offsetHeight;
                                else {
                                    orderList.scrollTop++;
                                }
                            }
                            var MyMar = setInterval(Marquee, speed);
                            orderList.onmouseover = function() {
                                clearInterval(MyMar);
                            }
                            orderList.onmouseout = function() {
                                MyMar = setInterval(Marquee, speed);
                            }

});

