// Lấy các đối tượng 
var pole_1 = $('#pole_1');
var pole_2 = $('#pole_2');
var pole = $('.pole');
var bird = $('#bird');
var start = $('#start');
var container = $('.container');
var score = $('#score')

// Đổi các thông số của đối tượng thành số thực

// var position_top_container = container.offset().top;
// var position_top_bird = bird.offset().top;

var height_container = container.height();
var position_left_container = container.offset().left; // giá trị vị trí offset-left của container

var	height_bird = bird.height(); 

// pole
var left_pole = parseInt(pole.css('left')); // giá trị left ban đầu của pole
var outer_pole = pole.outerWidth(true); // width của pole bao gồm cả border padding 
var height_pole_1 = parseInt(pole_1.css('height')); // giá trị height hiện tại của pole_1
var height_pole_2 = parseInt(pole_2.css('height')); // giá trị height hiện tại của pole_2

var speedY = 10; 
// Các trạng thái trong game
var go_up = false;
var score_update = false;


function play_game() {
	var play_game = setInterval(function(){

		var top_bird = parseInt(bird.css('top')); // cập nhập lại top của con chim
		var left_current_pole = parseInt(pole.css('left')); // phải viết left ở trong setInterval mới giảm left của pole
		var position_left_pole = pole.offset().left; // phải viết vị trí offset-left của pole trong setInterval mới so  sánh được 
		var a = parseInt(Math.random() * 100);
		var text_score = parseInt(score.text());

		 	if (top_bird < 0 || top_bird > height_container - height_bird || vacham(bird,pole_1) || vacham(bird,pole_2)) {
		 		stop_the_game();
		 	} else {

		 		// cho pole chạy ngược lại
		 		pole.css('left',left_current_pole - speedY);

		 		if (position_left_pole < position_left_container - outer_pole) {
		 			pole.css('left', left_pole);
		 			pole_1.css('height', height_pole_1 + a);
		 			pole_2.css('height', height_pole_2 - a);

		 			if (score_update === false) {
		 				text_score++;
		 				score.text(text_score);
		 			}
 		 		}	

		 		if (go_up === false) {
		 			down();
		 		}
		 	}
		
	},40);


}

container.mouseup(function(){
	clearInterval(go_up);
	go_up = false;
})



container.mousedown(function(){
	go_up = setInterval(up,40);
})

function up() {
	bird.css('top', parseInt(bird.css('top')) - 20);
	bird.css('transform', 'rotate(-20deg)');
}

function down() {
	bird.css('top', parseInt(bird.css('top')) + 10);
	bird.css('transform', 'rotate(20deg)');
}


function stop_the_game() {
	clearInterval(play_game);
	container.unbind('mousedown');
	$('#restart').fadeIn();
}

start.click(function(){
	play_game();
});

$('#restart').click(function(){
	location.reload();
})

function vacham($div1,$div2) {
	// offset bird nhỏ hơn offset của pole
	var x1 = $div1.offset().left;
	var y1 = $div1.offset().top;
	var w1 = $div1.outerWidth(true);
	var h1 = $div1.outerHeight(true);
	var r1 = x1 + w1;
	var t1 = y1 + h1;

	var x2 = $div2.offset().left;
	var y2 = $div2.offset().top;
	var w2 = $div2.outerWidth(true);
	var h2 = $div2.outerHeight(true);
	var r2 = x2 + w2;
	var t2 = y2 + h2;


	if (t1 < y2 || y1 > t2 || r1 < x2 || x1 > r2) {
		return false;
	} else {
		return true;
	}
}