var screenX, screenY;
var slowSwiping = false;
var swipeStartPanel = $("#searchPanel"); // jQuery object
var swipeDirection;

document.addEventListener('deviceready', function(e) {
	initializeApp(e);
});

function initializeApp(e) {
	$(".panel").hammer().on("swipeleft", function(e) {
		userSwipe($(this), e, "left");
	});

	$(".panel").hammer().on("swiperight", function(e) {
		userSwipe($(this), e, "right");
	});

	document.addEventListener("touchstart", function(e) {
		if(e.touches[0].screenX <= 10 || e.touches[0].screenX >= 310) {
			$("#statusbar").css("background-color", "green");
			slowSwiping = true;
			if(e.touches[0].screenX <= 5) {
				swipeDirection = "right";
			} else {
				swipeDirection = "left";
			}
		}
	});

	document.addEventListener("touchmove", function(e) {
		updateTouchXY(e);
	});

	document.addEventListener("touchend", function(e) {
		stopSwipe(e);
	});
}

function updateTouchXY(e) {
	// update global touch xy variables
	screenX = e.touches[0].screenX;
	screenY = e.touches[0].screenY;
}

function stopSwipe(e) {
	slowSwiping = false;
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function userSwipe(element, e, direction) {
	var newFocus;
	if(direction == "left" && element.attr("id") == "searchPanel") {
		newFocus = $("#closetPanel");
	} else if (direction == "right" && element.attr("id") == "searchPanel") {
		newFocus = $("#feedPanel");
	} else {
		newFocus = $("#searchPanel");
	}
	changeFocus(element, newFocus);
}

// Change panel focus from oldFocus to newFocus, accomplishing transition animation in the process
// oldFocus and newFocus should be jQuery objects of class ".panel"
function changeFocus(oldFocus, newFocus) {
	// stop all previous transitions
	$(".panel").stop();

	newFocus.addClass("focused");
	oldFocus.removeClass("focused");

	// previously focused panel either slides to the left or right depending on context
	var swipeOutTarget;
	if(oldFocus.attr("id") == "feedPanel" || newFocus.attr("id") == "closetPanel") {
		swipeOutTarget = -25;
	} else {
		swipeOutTarget = 25;
	}

	// slide new focused panel in
	newFocus.transition({left: "0%"});
	// slide old focused panel out
	oldFocus.transition({left: swipeOutTarget + "%"}).transition({left: (swipeOutTarget * 4) + "%", duration: 0});

}





