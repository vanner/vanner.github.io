var manageVastPlayer = {

  video_player: null,
  vast_url: '',
  options: '',
  vast_obj: {},

  throwError: function(error) {
    throw new Error(error);
  },

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

  addJS: function(src, className) {
    var head = document.head || document.getElementsByTagName('head')[0],
      js = document.createElement('script');
    js.type = 'text/javascript';
    js.className = className ? className : '';
    js.async = true;
    js.src = src;
    head.appendChild(js);
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
    var me = this;
    vast_url = me.vast_url;
    options = me.options;
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
        for (var j = 0; j < companion_ads.length; j++) {
          console.log()
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
      if (tracking_events[i].getAttribute('event') == "start") {
        if (vast_obj.tracking_start != null) {
          vast_obj.tracking_start += "|" + tracking_events[i].childNodes[0].nodeValue;
        } else {
          vast_obj.tracking_start = tracking_events[i].childNodes[0].nodeValue;
        }
        vast_obj.tracking_start_tracked = false;
      }
      if (tracking_events[i].getAttribute('event') == "firstQuartile") {
        if (vast_obj.tracking_first_quartile != null) {
          vast_obj.tracking_first_quartile += "|" + tracking_events[i].childNodes[0].nodeValue;
        } else {
          vast_obj.tracking_first_quartile = tracking_events[i].childNodes[0].nodeValue;
        }
        if (options.vastEvents && options.vastEvents.view25_url) {
          vast_obj.tracking_first_quartile += " " + options.vastEvents.view25_url;
        }
        vast_obj.tracking_first_quartile_tracked = false;
      }
      if (tracking_events[i].getAttribute('event') == "midpoint") {
        if (vast_obj.tracking_midpoint != null) {
          vast_obj.tracking_midpoint += "|" + tracking_events[i].childNodes[0].nodeValue;
        } else {
          vast_obj.tracking_midpoint = tracking_events[i].childNodes[0].nodeValue;
        }
        if (options.vastEvents && options.vastEvents.view50_url) {
          vast_obj.tracking_midpoint += "|" + options.vastEvents.view50_url;
        }
        vast_obj.tracking_midpoint_tracked = false;
      }
      if (tracking_events[i].getAttribute('event') == "thirdQuartile") {
        if (vast_obj.tracking_third_quartile != null) {
          vast_obj.tracking_third_quartile += " " + tracking_events[i].childNodes[0].nodeValue;
        } else {
          vast_obj.tracking_third_quartile = tracking_events[i].childNodes[0].nodeValue;
        }
        if (options.vastEvents && options.vastEvents.view75_url) {
          vast_obj.tracking_third_quartile += "|" + options.vastEvents.view75_url;
        }
        vast_obj.tracking_third_quartile_tracked = false;
      }
      if (tracking_events[i].getAttribute('event') == "complete") {
        if (vast_obj.tracking_complete != null) {
          vast_obj.tracking_complete += "|" + tracking_events[i].childNodes[0].nodeValue;
        } else {
          vast_obj.tracking_complete = tracking_events[i].childNodes[0].nodeValue;
        }
        if (options.vastEvents && options.vastEvents.view100_url) {
          vast_obj.tracking_complete += " " + options.vastEvents.view100_url;
        }
        vast_obj.tracking_complete_tracked = false;
      }
      if (tracking_events[i].getAttribute('event') == "mute") {
        if (vast_obj.tracking_mute != null) {
          vast_obj.tracking_mute += "|" + tracking_events[i].childNodes[0].nodeValue;
        } else {
          vast_obj.tracking_mute = tracking_events[i].childNodes[0].nodeValue;
        }
        vast_obj.tracking_mute_tracked = false;
      }
      if (tracking_events[i].getAttribute('event') == "unmute") {
        if (vast_obj.tracking_unmute != null) {
          vast_obj.tracking_unmute += "|" + tracking_events[i].childNodes[0].nodeValue;
        } else {
          vast_obj.tracking_unmute = tracking_events[i].childNodes[0].nodeValue;
        }
        vast_obj.tracking_unmute_tracked = false;
      }
      if (tracking_events[i].getAttribute('event') == "pause") {
        if (vast_obj.tracking_pause != null) {
          vast_obj.tracking_pause += "|" + tracking_events[i].childNodes[0].nodeValue;
        } else {
          vast_obj.tracking_pause = tracking_events[i].childNodes[0].nodeValue;
        }
        vast_obj.tracking_pause_tracked = false;
      }
      if (tracking_events[i].getAttribute('event') == "resume") {
        if (vast_obj.tracking_resume != null) {
          vast_obj.tracking_resume += "|" + tracking_events[i].childNodes[0].nodeValue;
        } else {
          vast_obj.tracking_resume = tracking_events[i].childNodes[0].nodeValue;
        }
        vast_obj.tracking_resume_tracked = false;
      }
      if (tracking_events[i].getAttribute('event') == "fullscreen") {
        if (vast_obj.tracking_fullscreen != null) {
          vast_obj.tracking_fullscreen += "|" + tracking_events[i].childNodes[0].nodeValue;
        } else {
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
            console.log(arrTrack[i]);
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
            console.log(arrTrack[i]);
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
            console.log(arrTrack[i]);
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
            console.log(arrTrack[i]);
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
            console.log(arrTrack[i]);
            img_track.src = arrTrack[i];
          }
        }
        vast_obj.tracking_complete_tracked = true;
      }
      manageVastPlayer.video_player.removeEventListener('timeupdate', manageVastPlayer.timeUpdate);
    }
  },

  loadVast: function(vast_url, options) {
    this.vast_url = vast_url;
    this.options = options;
    this.addMeta();
    this.addCss('manageVideo');
    this.vastLoadEvent = new CustomEvent('vastLoadEvent');
    window.addEventListener('vastLoadEvent', this.buildVideo, false);
    this.parseVast();
  },

  buildVideo: function() {
    vast_obj = manageVastPlayer.vast_obj;
    if (!vast_obj) {
      return;
    }
    var video_link = document.createElement('a'),
      video_player = document.createElement('video');
    video_player.id = 'manageVideo';
    video_player.setAttribute('webkit-playsinline', '');
    if (vast_obj.media_file_webm) {
      var webm = document.createElement('source');
      webm.src = vast_obj.media_file_webm;
      webm.type = 'video/webm';
      video_player.appendChild(webm);
    }
    if (vast_obj.media_file_mp4) {
      var mp4 = document.createElement('source');
      mp4.src = vast_obj.media_file_mp4;
      mp4.type = 'video/mp4';
      video_player.appendChild(mp4);
    }
    video_link.appendChild(video_player);
    document.body.appendChild(video_player);

    if (video_player.hasAttribute('controls')) {
      video_player.removeAttribute('controls');
    }
    manageVastPlayer.video_player = video_player;
    manageVastPlayer.video_player.addEventListener('timeupdate', manageVastPlayer.timeUpdate);
    manageVastPlayer.video_player.play();
  },

  pingPixel: function(url) {
    var image = new Image(1, 1);
    image.src = url;
  }

}