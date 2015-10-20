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