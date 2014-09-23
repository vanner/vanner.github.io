(function () {
    window.AppSponsorPlayer = window.AppSponsorPlayer || {};
        var $video;
        var video;
        var isPlaying, isClosed, didClick, closeButtonShown, trackAt, isFinished, noSkippable, endTime;

    AppSponsorPlayer.init = function (forceNoSkippable, jumpToTime) {
        $video = $("#appSponsorVideoTag");
        video = $video[0];
        isPlaying = false;
        isFinished = false;
        isClosed = false;
        didClick = false;
        isFinished = false;
        closeButtonShown = false;
        trackAt = 0;
        endTime = 0;
        noSkippable = forceNoSkippable || false;
        goToFrame = jumpToTime || false;
 
        $video.on('playing', function () {
            if(goToFrame) {
               video.currentTime = goToFrame;
	           video.pause();
            } else {
               isPlaying = true;	
               executeNativeCall('videoStart');
	        }
        });

        $video.on('error', function (e) {
            executeNativeCall('videoError');
        });

        $video.on('ended', function (e) {
            isPlaying = false;
            isFinished = true;
            endTime = video.currentTime;
            executeNativeCall('videoEnd');
        });

        $("#appSponsorVideoDiv").on('touchend', function () {
            if (closeButtonShown || isFinished || goToFrame) {
                didClick = true;
                executeNativeCall('videoTouchend');
            }
        });

        $video.on('timeupdate', function (e) {
            if (goToFrame) return; //do not allow to trigger event tracking again
                  
            var currentTime = video.currentTime;
            if (!noSkippable  && currentTime >= timeToShowCloseButton(video) && !closeButtonShown) {
                showCloseButton('showCloseButtonTimer');
            }  else if(video.hasOwnProperty('duration')) {
                if (trackAt < 75 && currentTime >= (0.75 * video.duration)) {
                    executeNativeCall('videoStateTrack75');
                    trackAt = 75;
                } else if (trackAt < 50 && currentTime >= (0.50 * video.duration)) {
                    executeNativeCall('videoStateTrack50');
                    trackAt = 50;
                } else if (trackAt < 25 && currentTime >= (0.25 * video.duration)) {
                    executeNativeCall('videoStateTrack25');
                    trackAt = 25;
                } else {
                    setTimeout(function () { //handle edge case when video stall that video currentTime has not changed much
                        if (isPlaying && !closeButtonShown && Math.abs(currentTime - video.currentTime) < 0.01) {
                            showCloseButton('showCloseButtonStall');
                        }
                    }, 1000);
                }
            }
        });
    };

    AppSponsorPlayer.resign = function () {
        if (video != null && isPlaying) {
            video.pause();
            isPlaying = false;
        }
    };

    AppSponsorPlayer.ready = function (forceNoSkippable) {
        if (video != null) {
            if(!isFinished) {
               video.play();
            }
	    } else if (video == null) {
            AppSponsorPlayer.init(forceNoSkippable);
            video.play();
        } else {
            showCloseButton('playVideoFailed');
	    }
    };

    AppSponsorPlayer.lastFrame = function (jumpTo) {
	    if (video == null) {
            AppSponsorPlayer.init(false, jumpTo);
            video.play();
        } else {
            showCloseButton('playVideoFailed');
	    }
    };

    var timeToShowCloseButton = function(video) {
        if(video.hasOwnProperty('duration')) {
            if(video.duration > 16) { //if it is long video, show close btn after 5 sec
            	
                return 5;
            } else { //video length is less than 15 sec
                return 300; //should not show close btn at all
            }
        } else {
        executeNativeCall(encodeURIComponent(video.getOwnPropertyNames(arr).sort()));
            return 12; //edge case, should not happen
        }
    };

    var showCloseButton = function(action){
        if (!closeButtonShown) {
            executeNativeCall(action);
            closeButtonShown = true;
        }
    };

    var executeNativeCall = function(action){
        window.location = 'appsponsor://' + action;
    };

})();
