//var vol=$("#yol")
//var vi=$("#vi")
//vi.on('touchend',false)
//vol.on('touchend',function(e){
//	var offsetX=e.originalEvent.changedTouches[0]
//})
//
//
//vi.on("touchstart",function(){
//	var offset=e.originalEvent.changedTouches[0].clientX-vi.offset().left;
//	var start=r-offsetX;
//	$(document).on('touchmove',function(){
//		var pos=e.originalEvent.changedTouches[0].clientX-vol.offset().left+start;
//		var r=vi.width()/2;
//		audio.volume=pos/vol.width();
//	})
//})
//
//
//
//
//$audio.on('volumechange',function(){
//	vi.css('left',vol.width()* audio.volume-vi.width()/2)
//})

$(function(){
	var audio=$("#audio").get(0);
	var play=$(".play1")
    var song=$(".song")
    song.on('click',false);
	var music=[
		{
			name:"up",
			author:"EXID",
			src:"up.mp3",
			img:"img/4.jpg",
		},
		{
			name:"Booty music",
			author:"Git Freach",
			src:"Booty Music.mp3",
			img:"img/1.jpg"
		},
		{
			name:"天后",
			author:"陈势安",
			src:"天后.mp3",
			img:"img/3.jpg"
		},
		{
			name:"Hate",
			author:"4 minute",
			src:"hate.mp3",
			img:"img/2.jpg"
		}
	]
	var currentIndex=1;
//	開始与暂停
	var play1=$(".playfirst")
	play.click(function(){
		if(audio.paused){
			audio.play();
			$(".baosec").attr( "src", "img/播放1.png");
		}else{
			audio.pause();
			$(".baosec").attr( "src", "img/播放.png");
		}
		
	})
	play1.click(function(){
		if(audio.paused){
			audio.play();
			$(".baosec").attr( "src", "img/播放1.png");
		}else{
			audio.pause();
			$(".baosec").attr( "src", "img/播放.png");
		}
		
	})
	var hidden=$(".head-zuo").eq(0);
	var back=$(".back")
	var back1=$(".back1")
	
	hidden.on('touchend',function(){
		back.addClass("move")
		back1.css("display","block")
		
		
	})
	var head_left=$(".head-zuo").eq(1)
	head_left.on("touchend",function(){
		back.removeClass("move")
		back1.css("display","none")
		$(".lists-hidden").animate({bottom:"-5rem"},300)
	})
	var author=$(".author")
//	渲染
	function  render(){
		$(".fengmian").empty();
		$.each(music,function(i,v) {
			$(".author").empty();
			var c=(i===currentIndex)?"image":"";
			$("<img src='"+v.img+"' class='"+c+"'>").appendTo(".fengmian");				
			audio.play();	
		});
	}
	
		
	
//	下一首
	var next1=$('.anniu').eq(1);
	var next2=$(".playyuan").eq(1);	
	function next(){
		currentIndex+=1;
		if(currentIndex===music.length){
			currentIndex=0;			
		}
		audio.src=music[currentIndex].src;	
		
		render();
		 audio.play();  
	}
	next1.on("touchend",next)
	next2.on("touchend",next)
	
	
//	上一首
	var prev1=$('.anniu').eq(2);
	var prev2=$(".playyuan").eq(0);
	function prev(){
            currentIndex-=1;
            if(currentIndex===-1){
                currentIndex=music.length-1;
            }
            audio.src=music[currentIndex].src;
            render();
             audio.play();  
    }
	prev1.on("touchend",prev)
	prev2.on("touchend",prev)	
	//	歌曲播放过程中的时间改变
	function format(v){
					v=Math.floor (v);
					var s = v % 60;
					s=(s<10)?("0"+s):s;
					var m=Math.floor(v/60);
					return m + ":" + s;
	}	
	var progress=$(".bofangtiao .singtiao ul li")
    console.log( progress)
	$(audio).on("timeupdate",function(){
		var starttime=$(".starttime").eq(0);
		var endtime=$(".starttime").eq(1);		
		starttime.html(format(audio.currentTime))
		endtime.html(format(audio.duration))
			
		//	随着歌曲进度条的移动
	var width=$(".singtiao").width();
    var move=width * audio.currentTime/audio.duration
    progress.css("width",move);
})
	
	
	
//	进度拖拽
    var tzs=$(".singtiao")
    var cir=$(".singtiao").find(".i")
	tzs.on("touchstart",function(e){
        var offsetX=e.originalEvent.changedTouches[0].clientX -tzs.offset().left;
        var ir=cir.width()/2;
        // console.log(offsetX)
        var start= ir - offsetX;
	    $(document).on('touchstart',function(e){
            var left=e.originalEvent.changedTouches[0].clientX - progress.position().left +start;
            var c= left/progress.width()*audio.duration;
            if(c>=audio.duration || c<=0){
                return;
            }
            audio.currentTime =c;
            console.log(c)
            console.log(left)
            // console.log(progress)
        })
        return false;
    })

    $(document).on("touchend",function(){
        $(document).off("touchmove")
    });


    tzs.on("touchend",function(e){
        var offsetX=e.originalEvent.changedTouches[0].clientX -tzs.offset().left+cir.width()/2;
        console.log(tzs.offset().left)
        audio.currentTime=offsetX/ tzs.width()*audio.duration;


    });
    tzs.on("touchend",false)
// 	var td=$(".singtiao")
// 	progress.on("click",false)
// 	progress.on("mousedown",function(e){
// 		$(document).on("mousemove",function(e){
// 			var width=progress.width();
// 			var c=width/td.width()*audio.duration;
// 			console.log(width,c)
// 			if(c>=audio.duration||c<=0){
// 				return;
// 			}
// 			audio.currentTime=c;
// 		})
// 		return false;
// 	})
// 	$(document).on("mouseup",function(){
//         $(document).off("mousemove");
//     })
//	
	
//	播放列表
 $(".bottom").on("touchend","img",function(){
 	$(".lists-hidden").animate({bottom:0},600)
 	
 })
	var start;
	$(document).on("touchstart",function(e){
		 start=e.originalEvent.changedTouches[0].clientY;
//		 console.log(start)
	})
	$(document).on("touchend",function(e){
		 var end=e.originalEvent.changedTouches[0].clientY;
//		 console.log(end)
		 if(end-start>50){
 			$(".lists-hidden").animate({bottom:"-5rem"},600)		 	
		 }
	})
	
	
	//	删除
//	var ul=$(".lists-hidden")
//	ul.on("touchend",".like1",function(){
//		 var li=$(this).closest("li");
//		 var index=li.index();
//       music.splice(index,1);
//        if(index===currentIndex){
//              if(music[currentIndex]){
//                  audio.src=music[currentIndex].src;
//              }else{
//                  audio.src="";
//              }
//          }else if(index>currentIndex){
//              //不用管
//          }else if(index<currentIndex){
//              currentIndex-=1;
//          }
//          render();
//	})
	
		var red=$(".anniu").eq(0).on("touchend",function(){
			red.find("img").toggleClass("img1")
		})
	
	
	  $(audio).on("loadstart",function(){
            $(".author").html(music[currentIndex].author)
            $(".head-zong").html(music[currentIndex].name);
			$(".baosec").attr( "src", "img/播放1.png");  
			$(".sings").find("span").eq(0).html(music[currentIndex].name);
            console.log('loadstart');
        })
	
	
	$(audio).on("canplay",function(){           
            
   })
	$(audio).on("ended",function(){
		
	})
})
