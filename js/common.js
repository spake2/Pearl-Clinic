$(function(){
  $("body").on("click","dl.tabs dt",function(){
    var $this=$(this);
    var $id=$this.data("id");
    $this.addClass("active").siblings().removeClass("active");
    $("ul.tab li#"+$id).addClass("active").siblings().removeClass("active");
  }).on("submit","form.jq_contact_form", function() {
      var $form=$(this);
      var $submit=$form.find("button[type='submit']");
      var $submit_val=$submit.html();
      $submit.attr("disabled",true).html($submit.data("wait"));
      $.post("form.php",$form.serialize(),function(data,textStatus,statusCode) {
        console.log(statusCode.status);
      if(statusCode.status==200 || statusCode.status==201) {
        console.log(data);
        $form.find("aside").addClass("success").html(data.content).show();
        $submit.attr("disabled",false).html($submit_val);
      }
      },'json').fail(function(e) {
        if(e.responseText.length>0) {
          alert(e.responseText);
         $form.find("aside").addClass("warn").html(e.responseText).show();
       }
       $submit.attr("disabled",false).html($submit_val);
     });
   return false;
 }).on("click","li#langs, p#langs",function(){
    var $x=$(this).offset();
    var $t=$("ul#langs").outerWidth()-$(this).outerWidth();
    var $a=$x.left-$t;
    $("ul#langs").css({"left": $a}).fadeIn();
    $("ul#langs").show();
    $(document).on("click",function(e){
      var tikla=$(e.target);
      if (tikla.closest("li#langs, p#langs").length==0) {
        $("ul#langs").hide();
        $(document).off("click.langs");
      }
    }).on('keydown',function(e){
      if (e.keyCode===27 ) {
        $(".popup").each(function(e){
          $(this).fadeOut();
          $(document).off("click");
        });
      }
    }).on("click", "p#langs",function(){
      window.scrollTo(0, 0);
      var $x=$(this).offset();
      var $l=$x.left;
      var $t=$("header.mobile").outerHeight();
      $("ul#langs").css({"left": $l, "top": $t}).fadeIn();
    });
  }).on("click","header.mobile img#menu",function(){
    var $this=$(this);
    var $x=$this.offset();
    var $t=$("header.mobile").outerHeight();
    var $r=($("header.mobile").outerWidth()-$x.left)-$this.outerWidth();
    if($this.hasClass("active")) {
      $this.removeClass("active").attr("src","images/hamburger.svg");
      $("nav.menu").fadeOut("slow").hide().show();
    }
    else {
      $this.addClass("active").attr("src","images/close.svg");
      $("nav.menu").css({"top": $t, "right": $r}).fadeIn("slow").show();
    }
  }).on("click",function(e){
    var tikla=$(e.target);
    if (tikla.closest("img#menu").length==0) {
        $("header.mobile img#menu").removeClass("active").attr("src","images/hamburger.svg");
      $("nav.menu").hide();
    }
  }).on("click","section.z_pattern details.tabs p",function(){
    var $this=$(this);
    var $id=$this.data("id");
    $this.addClass("active").siblings().removeClass("active");
    $("section.z_pattern ul li#"+$id).addClass("active").siblings().removeClass("active");
    $this.parents("details").removeAttr("open");
  });
});

$(window).bind("scroll",function(){
  if($("body").find("section.header_top").length>0) {
    var $top=$("body>section.header_top").outerHeight();
    if($(window).scrollTop()>$top) {
      $("body>header").addClass("fixed");
      $("body>ul#langs").css("display", "none")
    }
    else {
      $("body>header").removeClass("fixed");
    }
    }
    else {
    $("body>header").addClass("fixed");
    }
});
