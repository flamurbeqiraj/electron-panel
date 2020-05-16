const elLoader  =  document.querySelector('.page--loader');
const elPanel   =  document.querySelector('.page--main');
var elCurrent	= '';
var getWidth    = parseFloat($("#logoText").width()) + 2;
$("#logoText").css({"width": "0px", "display": "block"});
setTimeout(function() {
    $("#logoText").animate({width: getWidth}, 150 );
}, 1500);
setTimeout(function() {
    elLoader.classList.add('animated', 'bounceOut', 'faster');
    elLoader.addEventListener('animationend', function() {
		this.classList.remove('animated', 'bounceOut', 'faster');
        this.style.display = 'none';
        elPanel.style.display = 'flex';
		elPanel.classList.add('animated', 'bounceIn', "faster");
		elPanel.addEventListener('animationend', function() {
			this.classList.remove('animated', 'bounceIn', "faster");
		});
    });
}, 4000);

$(document).on("click", ".mainCube", function() {
	var thePage		= $(this).data("page");
	elCurrent	= $('.page--'+thePage);
	$(".page--main").fadeOut(100, function() {
		elCurrent.fadeIn(100);
	});
});
$(document).on("click", ".backBtn", function() {
	elCurrent.fadeOut(100, function() {
		$(".page--main").fadeIn(100);
	});
});

$(document).ready( function () {
	// $('.pyetsori').DataTable();
	window.$('#example').DataTable();
});