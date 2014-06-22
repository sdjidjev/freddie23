$(document).ready(function(){
	var startGame = false;
	var alreadyShown = false;
	$('#')
	$('#start').click(function(){
		$('.dialogue').hide();
		$('img').css('opacity',1);
		startGame = true;
	});
	$('#replay').click(function(){
		$('.dialogue').hide();
		startGame = true;
		alreadyShown = false;
		$('img').css('opacity',1);
		for (elem in flyArray){
			$(flyArray[elem]).show();
		}
	});
	console.log(window.screen.availWidth);
	var flyArray = $('.fly').toArray();
	numFlies = flyArray.length;
	$('.fly').each(function(index){
		$(this).css('left', String(Math.random() * (window.screen.availWidth - 35) + 2)+"px");
		$(this).css('top', String(Math.random() * 500 + 2)+"px");
	});
	$('body').keydown(function(e) {
		if(e.keyCode == 37 && startGame) { 
			$('#chameleon-pic').attr('src', 'chameleon-left.png');
			$('#tongue').css('left','0px');
			if ($('.chameleon-container').position().left >= 20){
				$('.chameleon-container').css('left', String($('.chameleon-container').position().left-20)+"px");
			}
		}
		else if(e.keyCode == 39 && startGame) { 
			$('#chameleon-pic').attr('src', 'chameleon-right.png');
			$('#tongue').css('left','130px');
			if (($('.chameleon-container').position().left <= window.screen.availWidth - 170)) {
				$('.chameleon-container').css('left', String($('.chameleon-container').position().left+20)+"px");
			}
		}
		else if((e.keyCode == 13 && !startGame) || (e.keyCode == 13 && alreadyShown)){
			$('.dialogue').hide();
			$('img').css('opacity',1);
			startGame = true;
			alreadyShown = false;
			for (elem in flyArray){
				$(flyArray[elem]).show();
			}
			$('img').css('opacity',1);
		}
	});
	$('body').keyup(function(e) {
	 	if(e.keyCode == 32 && startGame) { 
			$('#tongue').show();
			setTimeout(function(){
				$('#tongue').hide();
			}, 200);
			var tonguePos = Number($('.chameleon-container').first().position().left) + Number($('#tongue').position().left);
			for (elem in flyArray){
				if ($(flyArray[elem]).position().left >= tonguePos-33 && $(flyArray[elem]).position().left <= tonguePos+8){
					$(flyArray[elem]).hide();
				}
			}
	  	}
	});
	setInterval(function(){
		if (!startGame)	{
		}	
		else if ($('.fly:visible').toArray().length == 0 && !alreadyShown) {
			$('#replay-dialogue').show();
			alreadyShown = true;
			startGame = false;
			$('#chameleon-pic').css('opacity',0.4);
		}
		else {
			$('.fly:visible').each(function(index){
				var num = Math.floor(Math.random()*4);
				if (num == 0) {
					if (($(this).position().left / $(this).parent().width())*100 <= 95){
						$(this).css('left',$(this).position().left+20);
						$(this).attr('src','fly-right.gif')
					}
					else{
						$(this).css('left',$(this).position().left-20);
						$(this).attr('src','fly-left.gif');
					}
				}
				else if (num == 1) {
					if ($(this).position().left >= 20){
						$(this).css('left',$(this).position().left-20);
						$(this).attr('src','fly-left.gif');
					}
					else{
						$(this).css('left',$(this).position().left+20);
						$(this).attr('src','fly-right.gif');
					}
				}
				else if (num == 2) {
					if (($(this).position().top / $(this).parent().height())*100 <= 97){
						$(this).css('top',$(this).position().top+15);
					}
					else{
						$(this).css('top',$(this).position().top-15);
					}
				}
				else if (num == 3) {
					if ($(this).position().top >= 15){
						$(this).css('top',$(this).position().top-15);
					}
					else{
						$(this).css('top',$(this).position().top+15);
					}
				}
			});
		}
	}, 200);
});