var screenX, screenY;
var slowSwiping = false;
var swipeStartPanel = $("#searchPanel"); // jQuery object
var swipeDirection;

document.addEventListener('deviceready', function(e) {
	initializeApp(e);
});

function initializeApp(e) {
	$(".panel").hammer().on("swipeleft", function(e) {
		userSwipeLeft(this, e);
	});

	$(".panel").hammer().on("swiperight", function(e) {
		userSwipeRight(this, e);
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

	// swipe animations
	if(slowSwiping) {
		if(swipeDirection == "right") {
			switch (swipeStartPanel.attr("id")) {
			// swipe in search panel
			case "closetPanel":
				$("#closetPanel").zIndex(888);
				$("#searchPanel").zIndex(999);
				$("#closetPanel").css("left", map_range(screenX, 0, 320, 0, 25) + "%");
				$("#searchPanel").css("left", map_range(screenX, 0, 320, -100, 0) + "%");
				break;
			// swipe in feed panel
			case "searchPanel":
				$("#searchPanel").zIndex(888);
				$("#feedPanel").zIndex(999);
				$("#searchPanel").css("left", map_range(screenX, 0, 320, 0, 25) + "%");
				$("#feedPanel").css("left", map_range(screenX, 0, 320, -100, 0) + "%");
				break;
			// can't swipe, do bounce animation
			case "feedPanel":
				//$("#feedPanel").transition({left: map_range(touchX, 0, 320, 0, 5) + "%"});
			}
		}
	}
}

function stopSwipe(e) {
	slowSwiping = false;
	if(swipeDirection == "right" && screenX > 160) {
		userSwipeRight(swipeStartPanel);
	}
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function userSwipeLeft(element, e) {
	switch ($(element).attr("id")) {
		// swipe in search panel
		case "feedPanel":
			$("#feedPanel").zIndex(888);
			$("#searchPanel").zIndex(999);
			$("#feedPanel").transition({left: "-25%"}, function() {
				$("#feedPanel").transition({left: "-100%", duration: 0});
			});
			$("#searchPanel").transition({left: "0%"});
			break;
		// swipe in closet panel
		case "searchPanel":
			$("#searchPanel").zIndex(888);
			$("#closetPanel").zIndex(999);
			$("#searchPanel").transition({left: "-25%"}, function() {
				$("#searchPanel").transition({left: "-100%", duration: 0});
			});
			$("#closetPanel").transition({left: "0%"});
			break;
		// can't swipe, do bounce animation
		case "closetPanel":
			$("#closetPanel").transition({left: "-5%", easing: "in", duration: 100}).transition({left: "0%", easing: "out", duration: 50});
	}
}

function userSwipeRight(element, e) {
	switch ($(element).attr("id")) {
		// swipe in search panel
		case "closetPanel":
			$("#closetPanel").zIndex(888);
			$("#searchPanel").zIndex(999);
			$("#closetPanel").transition({left: "25%"}, function() {
				$("#closetPanel").transition({left: "100%", duration: 0});
			});
			$("#searchPanel").transition({left: "0%"});
			break;
		// swipe in feed panel
		case "searchPanel":
			$("#searchPanel").zIndex(888);
			$("#feedPanel").zIndex(999);
			$("#searchPanel").transition({left: "25%"}, function() {
				$("#searchPanel").transition({left: "100%", duration: 0});
			});
			$("#feedPanel").transition({left: "0%"});
			break;
		// can't swipe, do bounce animation
		case "feedPanel":
			$("#feedPanel").transition({left: "5%", easing: "in", duration: 100}).transition({left: "0%", easing: "out", duration: 50});
	}
}

// Change panel focus from oldFocus to newFocus, accomplishing transition animation in the process
// oldFocus and newFocus should be jQuery objects of class ".panel"
function changeFocus (oldFocus, newFocus) {
	
}