var manageVastPlayer = {
  video_container: null,
  video_player: null,
  vast_url: '',
  vast_data: '',
  vast_click_url: '#',
  vast_obj: {},

  addMeta: function() {
    var viewport = document.querySelector('meta[name=viewport]'),
      viewportContent = 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0';
    if (viewport === null) {
      var head = document.head || document.getElementsByTagName('head')[0];
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      head.appendChild(viewport);
    }
    viewport.setAttribute('content', viewportContent);
  },

  addCss: function(container_id) {
    var head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style'),
      cssString;
    style.type = 'text/css',
      cssString = '*{margin:0;padding:0}body{background-color:#000}';
    if (container_id) {
      cssString += '#' + container_id + '{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);}'
    }
    style.innerHTML = cssString;
    head.appendChild(style);
  },

  parseVast: function() {
    vast_url = this.vast_url;
    vast_data = this.vast_data;
    var num = Math.random().toString(16).slice(2);
    vast_url = vast_url.replace("[timestamp]", num);
    var xmlHttpReq, xmlDoc;
    if (window.XMLHttpRequest) {
      xmlHttpReq = new XMLHttpRequest();
    } else {
      xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlHttpReq.open("GET", vast_url, false);
    xmlHttpReq.send();
    xmlDoc = xmlHttpReq.responseXML;
    if (!xmlDoc) {
      return;
    }
    var vast_obj = {};
    var impression = xmlDoc.getElementsByTagName("Impression");
    if (impression != null) {
      vast_obj.impression = impression;
    }

    var creative = xmlDoc.getElementsByTagName("Creative");
    var media_files;
    var tracking_events;
    for (var i = 0; i < creative.length; i++) {
      var creative_linear = creative[i].getElementsByTagName("Linear");
      if (creative_linear != null) {
        for (var j = 0; j < creative_linear.length; j++) {

          var creative_linear_mediafiles = creative_linear[j].getElementsByTagName("MediaFiles");
          if (creative_linear_mediafiles != null) {
            for (var k = 0; k < creative_linear_mediafiles.length; k++) {
              var creative_linear_mediafiles_mediafile = creative_linear_mediafiles[k].getElementsByTagName("MediaFile");
              if (creative_linear_mediafiles_mediafile != null) {
                media_files = creative_linear_mediafiles_mediafile;
              }
            }
          }

          var creative_linear_videoclicks = creative_linear[j].getElementsByTagName("VideoClicks");
          if (creative_linear_videoclicks != null) {
            for (var k = 0; k < creative_linear_videoclicks.length; k++) {
              var creative_linear_videoclicks_clickthrough = creative_linear_videoclicks[k].getElementsByTagName("ClickThrough")[0].childNodes[0].nodeValue;
              var creative_linear_videoclicks_clickthrough_tracking = creative_linear_videoclicks[k].getElementsByTagName("ClickTracking");
              if (creative_linear_videoclicks_clickthrough != null) {
                vast_obj.clickthrough_url = creative_linear_videoclicks_clickthrough;
              }
              if (creative_linear_videoclicks_clickthrough_tracking != null) {
                vast_obj.clickthrough_tracking = creative_linear_videoclicks_clickthrough_tracking;
              }
            }
          }

          var creative_linear_trackingevents = creative_linear[j].getElementsByTagName("TrackingEvents");
          if (creative_linear_trackingevents != null) {
            for (var k = 0; k < creative_linear_trackingevents.length; k++) {
              var creative_linear_trackingevents_tracking = creative_linear_trackingevents[k].getElementsByTagName("Tracking");
              if (creative_linear_trackingevents_tracking != null) {
                tracking_events = creative_linear_trackingevents_tracking;
              }
            }
          }

          var creative_linear_duration = creative_linear[j].getElementsByTagName("Duration")[0];
          if (creative_linear_duration != null) {
            vast_obj.duration = creative_linear_duration.childNodes[0].nodeValue;
            var arrD = vast_obj.duration.split(':');
            var strSecs = (+arrD[0]) * 60 * 60 + (+arrD[1]) * 60 + (+arrD[2]);
            vast_obj.duration = strSecs;
          }
        }
      }

      var companion_ads = creative[i].getElementsByTagName("CompanionAds");
      if (companion_ads != null) {
        var companions = creative[i].getElementsByTagName("Companion");
        if (companions != null) {
          for (var j = 0; j < companions.length; j++) {
            var width = companions[j].getAttribute('width') || null;
            var height = companions[j].getAttribute('height') || null;
            var static_resources = companions[j].getElementsByTagName("StaticResource");
            for (var k = 0; k < static_resources.length; k++) {
              if (static_resources[k].childNodes[0].nodeValue) {
                vast_obj.static_end_card = static_resources[k].childNodes[0].nodeValue;
                if (width) {
                  vast_obj.static_end_card_width = companions[j].getAttribute('width');
                }
                if (height) {
                  vast_obj.static_end_card_height = companions[j].getAttribute('height');
                }
                break;
              }
            }
            var end_card_tracking_events = companions[j].getElementsByTagName("TrackingEvents");
            for (var k = 0; k < end_card_tracking_events.length; k++) {
              var end_card_trackings = end_card_tracking_events[k].getElementsByTagName("Tracking");
              for (var l = 0; l < end_card_trackings.length; l++) {
                if (end_card_trackings[l].getAttribute('event') == "creativeView") {
                  vast_obj.end_card_impression = end_card_trackings[l].childNodes[0].nodeValue;
                }
              }

            }
            var end_card_clickthrough = companions[j].getElementsByTagName("CompanionClickThrough");
            for (var k = 0; k < end_card_clickthrough.length; k++) {
              if (end_card_clickthrough[k].childNodes[0].nodeValue) {
                vast_obj.end_card_clickthrough_url  = end_card_clickthrough[k].childNodes[0].nodeValue
                break;
              }
            }

            var html_resources = companions[j].getElementsByTagName("HTMLResource");
            for (var k = 0; k < html_resources.length; k++) {
              if (html_resources[k].childNodes[0].nodeValue) {
                vast_obj.html_end_card = html_resources[k].childNodes[0].nodeValue;
                if (width) {
                  vast_obj.html_end_card_width = companions[j].getAttribute('width');
                }
                if (height) {
                  vast_obj.html_end_card_height = companions[j].getAttribute('height');
                }
                break;
              }
            }
          }
        }
      }
    }

    for (var i = 0; i < media_files.length; i++) {
      if (media_files[i].getAttribute('type') == 'video/mp4') {
        vast_obj.media_file_mp4 = media_files[i].childNodes[0].nodeValue;
      }
      if (media_files[i].getAttribute('type') == 'video/webm') {
        vast_obj.media_file_webm = media_files[i].childNodes[0].nodeValue;
      }
    }

    for (var i = 0; i < tracking_events.length; i++) {
      if (tracking_events[i].getAttribute('event') == "creativeView") {
        if (vast_obj.tracking_creative_view != null) {
          vast_obj.tracking_creative_view += "|" + tracking_events[i].childNodes[0].nodeValue;
        }
        else {
          vast_obj.tracking_creative_view = tracking_events[i].childNodes[0].nodeValue;
        }
        if (vast_data.creativeView) {
          vast_obj.tracking_creative_view += "|" + vast_data.creativeView;
        }
        vast_obj.tracking_creative_view_tracked = false;
      }
      if (tracking_events[i].getAttribute('event') == "start") {
        if (vast_obj.tracking_start != null) {
          vast_obj.tracking_start += "|" + tracking_events[i].childNodes[0].nodeValue;
        }
        else {
          vast_obj.tracking_start = tracking_events[i].childNodes[0].nodeValue;
        }
        vast_obj.tracking_start_tracked = false;
      }
      if (tracking_events[i].getAttribute('event') == "firstQuartile") {
        if (vast_obj.tracking_first_quartile != null) {
          vast_obj.tracking_first_quartile += "|" + tracking_events[i].childNodes[0].nodeValue;
        }
        else {
          vast_obj.tracking_first_quartile = tracking_events[i].childNodes[0].nodeValue;
        }
        if (vast_data.firstQuartile) {
          vast_obj.tracking_first_quartile += "|" + vast_data.firstQuartile;
        }
        vast_obj.tracking_first_quartile_tracked = false;
      }
      if (tracking_events[i].getAttribute('event') == "midpoint") {
        if (vast_obj.tracking_midpoint != null) {
          vast_obj.tracking_midpoint += "|" + tracking_events[i].childNodes[0].nodeValue;
        }
        else {
          vast_obj.tracking_midpoint = tracking_events[i].childNodes[0].nodeValue;
        }
        if (vast_data.midpoint) {
          vast_obj.tracking_midpoint += "|" + vast_data.midpoint;
        }
        vast_obj.tracking_midpoint_tracked = false;
      }
      if (tracking_events[i].getAttribute('event') == "thirdQuartile") {
        if (vast_obj.tracking_third_quartile != null) {
          vast_obj.tracking_third_quartile += " " + tracking_events[i].childNodes[0].nodeValue;
        }
        else {
          vast_obj.tracking_third_quartile = tracking_events[i].childNodes[0].nodeValue;
        }
        if (vast_data.thirdQuartile) {
          vast_obj.tracking_third_quartile += "|" + vast_data.thirdQuartile;
        }
        vast_obj.tracking_third_quartile_tracked = false;
      }
      if (tracking_events[i].getAttribute('event') == "complete") {
        if (vast_obj.tracking_complete != null) {
          vast_obj.tracking_complete += "|" + tracking_events[i].childNodes[0].nodeValue;
        }
        else {
          vast_obj.tracking_complete = tracking_events[i].childNodes[0].nodeValue;
        }
        if (vast_data.complete) {
          vast_obj.tracking_complete += "|" + vast_data.complete;
        }
        vast_obj.tracking_complete_tracked = false;
      }
      if (tracking_events[i].getAttribute('event') == "mute") {
        if (vast_obj.tracking_mute != null) {
          vast_obj.tracking_mute += "|" + tracking_events[i].childNodes[0].nodeValue;
        }
        else {
          vast_obj.tracking_mute = tracking_events[i].childNodes[0].nodeValue;
        }
        vast_obj.tracking_mute_tracked = false;
      }
      if (tracking_events[i].getAttribute('event') == "unmute") {
        if (vast_obj.tracking_unmute != null) {
          vast_obj.tracking_unmute += "|" + tracking_events[i].childNodes[0].nodeValue;
        }
        else {
          vast_obj.tracking_unmute = tracking_events[i].childNodes[0].nodeValue;
        }
        vast_obj.tracking_unmute_tracked = false;
      }
      if (tracking_events[i].getAttribute('event') == "pause") {
        if (vast_obj.tracking_pause != null) {
          vast_obj.tracking_pause += "|" + tracking_events[i].childNodes[0].nodeValue;
        }
        else {
          vast_obj.tracking_pause = tracking_events[i].childNodes[0].nodeValue;
        }
        vast_obj.tracking_pause_tracked = false;
      }
      if (tracking_events[i].getAttribute('event') == "resume") {
        if (vast_obj.tracking_resume != null) {
          vast_obj.tracking_resume += "|" + tracking_events[i].childNodes[0].nodeValue;
        }
        else {
          vast_obj.tracking_resume = tracking_events[i].childNodes[0].nodeValue;
        }
        vast_obj.tracking_resume_tracked = false;
      }
      if (tracking_events[i].getAttribute('event') == "fullscreen") {
        if (vast_obj.tracking_fullscreen != null) {
          vast_obj.tracking_fullscreen += "|" + tracking_events[i].childNodes[0].nodeValue;
        }
        else {
          vast_obj.tracking_fullscreen = tracking_events[i].childNodes[0].nodeValue;
        }
        vast_obj.tracking_fullscreen_tracked = false;
      }
    }
    manageVastPlayer.vast_obj = vast_obj;
    window.dispatchEvent(this.vastLoadEvent);
  },

  timeUpdate: function(event) {
    var vast_obj = manageVastPlayer.vast_obj;
    var video_player = manageVastPlayer.video_player;
    var img_track = new Image();
    var current_time = Math.floor(video_player.currentTime);
    if ((current_time == 0)) {
      if (vast_obj.tracking_start_tracked == false) {
        if (vast_obj.tracking_start != null) {
          var arrTrack = vast_obj.tracking_start.split("|");
          for (var i = 0; i < arrTrack.length; i++) {
            var img_track = new Image();
            img_track.src = arrTrack[i];
          }
        }
        vast_obj.tracking_start_tracked = true;
      }
    }
    if ((current_time == (Math.floor(vast_obj.duration / 4)))) {
      if (vast_obj.tracking_first_quartile_tracked == false) {
        if (vast_obj.tracking_first_quartile != null) {
          var arrTrack = vast_obj.tracking_first_quartile.split("|");
          for (var i = 0; i < arrTrack.length; i++) {
            var img_track = new Image();
            img_track.src = arrTrack[i];
          }
        }
        vast_obj.tracking_first_quartile_tracked = true;
      }
    }
    if ((current_time == (Math.floor(vast_obj.duration / 2)))) {
      if (vast_obj.tracking_midpoint_tracked == false) {
        if (vast_obj.tracking_midpoint != null) {
          var arrTrack = vast_obj.tracking_midpoint.split("|");
          for (var i = 0; i < arrTrack.length; i++) {
            var img_track = new Image();
            img_track.src = arrTrack[i];
          }
        }
        vast_obj.tracking_midpoint_tracked = true;
      }
    }
    if ((current_time == ((Math.floor(vast_obj.duration / 2)) + (Math.floor(vast_obj.duration / 4))))) {
      if (vast_obj.tracking_third_quartile_tracked == false) {
        if (vast_obj.tracking_third_quartile != null) {
          var arrTrack = vast_obj.tracking_third_quartile.split("|");
          for (var i = 0; i < arrTrack.length; i++) {
            var img_track = new Image();
            img_track.src = arrTrack[i];
          }
        }
        vast_obj.tracking_third_quartile_tracked = true;
      }
    }
    if ((current_time >= (vast_obj.duration - 1))) {
      if (vast_obj.tracking_complete_tracked == false) {
        if (vast_obj.tracking_complete != null) {
          var arrTrack = vast_obj.tracking_complete.split("|");
          for (var i = 0; i < arrTrack.length; i++) {
            var img_track = new Image();
            img_track.src = arrTrack[i];
          }
        }
        vast_obj.tracking_complete_tracked = true;
      }
      manageVastPlayer.video_player.removeEventListener('timeupdate', manageVastPlayer.timeUpdate);
    }
  },

  pingTrackingPixel: function(url) {
    var image = new Image(1, 1);
    image.src = url;
  },

  videoComplete: function() {
    var vast_obj = manageVastPlayer.vast_obj,
        container = manageVastPlayer.video_container,
        isTouchDevice = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch),
        eventType = (isTouchDevice) ? 'touchend' : 'click';

    if (vast_obj.static_end_card) {
      var end_card = document.createElement("div"),
          img = document.createElement("img");
      end_card.id = 'manageEndCard';
      img.src = vast_obj.static_end_card;
      if (vast_obj.static_end_card_height && vast_obj.static_end_card_width) {
        img.width  = vast_obj.static_end_card_width;
        img.height = vast_obj.static_end_card_height;
      }
      container.innerHTML = '';
      end_card.appendChild(img);
      container.appendChild(end_card);

      if (vast_obj.end_card_impression) {
        manageVastPlayer.pingTrackingPixel(vast_obj.end_card_impression);
      }

      if (MANAGE.adData.clickUrl && vast_obj.end_card_clickthrough_url) {
        manageVastPlayer.vast_click_url = MANAGE.adData.clickUrl + '&-ru=' + encodeURI(vast_obj.end_card_clickthrough_url);
      }
      else if (MANAGE.adData.clickUrl) {
        manageVastPlayer.vast_click_url = MANAGE.adData.clickUrl;
      }
      else if (vast_obj.end_card_clickthrough_url) {
        manageVastPlayer.vast_click_url = vast_obj.end_card_clickthrough_url;
      }

      container.addEventListener(eventType, function(){
        manageVastPlayer.openSite(manageVastPlayer.vast_click_url);
      });
    }
  },

  buildVideo: function() {
    vast_obj = manageVastPlayer.vast_obj;
    if (!vast_obj) {
      return;
    }
    var $video_container = document.createElement('div'),
        $video_player = document.createElement('video'),
        isTouchDevice = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch),
        eventType = (isTouchDevice) ? 'touchend' : 'click';
    $video_container.id = 'manageAd';
    $video_player.id = 'manageVideo';
    $video_player.setAttribute('webkit-playsinline', '');
    $video_player.setAttribute('autoplay', '');
    if (vast_obj.media_file_webm) {
      var webm = document.createElement('source');
      webm.src = vast_obj.media_file_webm;
      webm.type = 'video/webm';
      $video_player.appendChild(webm);
    }
    if (vast_obj.media_file_mp4) {
      var mp4 = document.createElement('source');
      mp4.src = vast_obj.media_file_mp4;
      mp4.type = 'video/mp4';
      $video_player.appendChild(mp4);
    }
    $video_container.appendChild($video_player);
    document.body.appendChild($video_container);
    // Remove controls
    if ($video_player.hasAttribute('controls')) {
      $video_player.removeAttribute('controls');
    }
    // Load close button if MRAID
    if (typeof (mraid) !== 'undefined') {
      manageVastPlayer.buildCloseButton();
    }
    manageVastPlayer.video_container = $video_container;
    manageVastPlayer.video_player = $video_player;
    // Run timeUpdate during duration of video
    manageVastPlayer.video_player.addEventListener('timeupdate', manageVastPlayer.timeUpdate);
    // Video complete
    manageVastPlayer.video_player.addEventListener('ended', manageVastPlayer.videoComplete);

    // Click event for video
    if (MANAGE.adData.clickUrl && vast_obj.clickthrough_url) {
      manageVastPlayer.vast_click_url = MANAGE.adData.clickUrl + '&-ru=' + encodeURI(vast_obj.clickthrough_url);
    }
    else if (MANAGE.adData.clickUrl) {
      manageVastPlayer.vast_click_url = MANAGE.adData.clickUrl;
    }
    else if (vast_obj.clickthrough_url) {
      manageVastPlayer.vast_click_url = vast_obj.clickthrough_url;
    }

    // Video Click
    manageVastPlayer.video_player.addEventListener(eventType, function(){
      if (vast_obj.clickthrough_tracking){
        manageVastPlayer.pingTrackingPixel(vast_obj.clickthrough_tracking);
      }
      manageVastPlayer.openSite(manageVastPlayer.vast_click_url);
    });

    // Fire Impressions
    if (vast_obj.impression != null){
      for(var k = 0; k < vast_obj.impression.length; k++){
        manageVastPlayer.pingTrackingPixel(vast_obj.impression[k].childNodes[0].nodeValue);
      }
    }
    manageVastPlayer.video_player.play();
    //manageVastPlayer.video_player.muted = true;

    // Fire CreativeView
    if (vast_obj.tracking_creative_view) {
      var creative_view = vast_obj.tracking_creative_view.split("|");
      for (var i = 0; i < creative_view.length; i++) {
        var img_track = new Image();
        img_track.src = creative_view[i];
      }
    }
  },

  buildCloseButton: function() {
    var $head = document.head || document.getElementsByTagName('head')[0],
        $container = document.getElementById('manageAd'),
        $closeBtn = document.createElement('div'),
        isTouchDevice = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch),
        eventType = (isTouchDevice) ? 'touchend' : 'click';
    $closeBtn.id = 'manage-close';
    $closeBtn.style.display = 'none';
    if (MANAGE.adData.customClose.position) {
      $closeBtn.classList.add(MANAGE.adData.customClose.position);
    }
    $container.appendChild($closeBtn);
    if (MANAGE.adData.customClose.style) {
      var customCloseCssHost = MANAGE.cssHost || "https://cdn.manage.com/assets/css/mraid/";
      var $closeCSS  = document.createElement('link');
      $closeCSS.rel  = 'stylesheet';
      $closeCSS.type = 'text/css';
      $closeCSS.href = customCloseCssHost + 'close-' + MANAGE.adData.customClose.style + '.css';
      $closeCSS.media = 'all';
      $head.appendChild($closeCSS);
      $closeBtn.classList.add(MANAGE.adData.customClose.style);
    }
    $closeBtn.addEventListener(eventType, function() {
      if (typeof(mraid) !== 'undefined') {
        mraid.close();
      }
      manageVastPlayer.video_player.pause();
    });
  },

  loadVast: function(vast_url, vast_data) {
    this.vast_url = vast_url;
    try {
      var obj = JSON.parse(vast_data);
      if (obj && typeof obj === "object" && obj !== null) {
        this.vast_data = obj;
      }
    }
    catch (e) {}
    this.addMeta();
    this.addCss('manageAd');
    this.vastLoadEvent = new CustomEvent('vastLoadEvent');
    window.addEventListener('vastLoadEvent', this.buildVideo, false);
    this.parseVast();
  },

  openSite: function(url) {
    if (typeof (mraid) !== 'undefined') {
      mraid.open(url);
    }
    else {
      window.location = url;
    }
  },

  throwError: function(error) {
    throw new Error(error);
  }
}

function mraidIsReady(){
  mraid.removeEventListener("ready", mraidIsReady);
  manageVastPlayer.loadVast(MANAGE.adData.vastUrl, MANAGE.adData.vastData);
}

function doReadyCheck(){
  if (mraid.getState() == 'loading') {
    mraid.addEventListener("ready", mraidIsReady);
  }
  else {
    manageVastPlayer.loadVast(MANAGE.adData.vastUrl, MANAGE.adData.vastData);
  }
}

if (MANAGE.adData.vastUrl) {
  if (typeof mraid != "undefined") {
    doReadyCheck();
  }
  else {
    window.addEventListener("DOMContentLoaded", function() {
      manageVastPlayer.loadVast(MANAGE.adData.vastUrl, MANAGE.adData.vastData);
    });
  }
}
else {
  manageVastPlayer.throwError("Missing vastUrl");
}
