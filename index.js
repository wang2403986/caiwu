currentIndex = 0;
var isSwipeNext;
var mainPreviewPages = $('#mainPreview>article');
var scaleFactor = window.innerHeight / 512;
$('#root').css({width : innerWidth + 'px', height : innerHeight + 'px'});
$('#mainPreview').css(
		{
			'transform' : 'scale(' + scaleFactor.toFixed(5) + ', '
					+ scaleFactor.toFixed(5) + ')', width : '512px',height : '320px',
			left : ((innerWidth - 320 * scaleFactor) / 2) + 'px'
		});
for (var i00 = 0; i00 < mainPreviewPages.length; i00++) {
	mainPreviewPages[i00] = $(mainPreviewPages[i00]);
}
var hammer = new Hammer(document.getElementById('mainPreview'), { direction:
	 Hammer.DIRECTION_ALL });
hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

hammer.on("swipe", swiped);

function keyPressed() {
	if (keyCode === RIGHT_ARROW) {
		currentIndex++;
	}
	if (keyCode === LEFT_ARROW) {
		currentIndex--;
	}
	if (currentIndex >= people.length) {
		currentIndex = 0;
	}
	if (currentIndex < 0) {
		currentIndex = people.length - 1;
	}
}

function showElement(e) {
	clearTimeout(e._hidden);
	e.show();
}
function hideElement(e) {
	clearTimeout(e._hidden);
	e._hidden = setTimeout(function() {
		e.hide();
	}, 2000);
}
function swiped(event) {
	console.log(event);
	var pre = mainPreviewPages[currentIndex];
	isSwipeNext = undefined;
	if (event.direction == 2 || event.direction == 8) {
		msg = "you swiped right";
		currentIndex++;
		isSwipeNext = true;
	} else if (event.direction == 4 || event.direction == 16) {
		msg = "you swiped left";
		currentIndex--;
		isSwipeNext = 0;
	}
	if (currentIndex >= mainPreviewPages.length) {
		currentIndex = 0;
	}
	if (currentIndex < 0) {
		currentIndex = mainPreviewPages.length - 1;
	}
	if (isSwipeNext === undefined)
		return;
	var next = mainPreviewPages[currentIndex];
	if (isSwipeNext) {
		next.css('animation', 'oid_global_slideinup 1s ease 0ms 1 both')
		showElement(next);
		pre.css('animation', 'oid_global_slideup 1s ease 0ms 1 both')
		hideElement(pre)
	}

	else {
		next.css('animation', 'oid_global_slideindown 1s ease 0ms 1 both')
		pre.css('animation', 'oid_global_slidedown 1s ease 0ms 1 both')
		showElement(next);
		hideElement(pre)
	}

}