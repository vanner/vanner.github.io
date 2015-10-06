var manageAdTag = window.manageAdTag || {
  refreshCount: 0,
  adData: {
    isInterstitial: true
  },
  cbResults: {
    success: false
  }
};

var mngConf = {
  BIDDER_HOST : 'http://appsponsor-vbidder.doc04.manage.com',
  BIDDER_PATH : '/2/bid',
  SDKV        : '3.3',
  CONSTANTS   : {
    DISPLAY   : 1,
    VAST      : 2,
    MRAID     : 4,
    NATIVE    : 5,
    RICHMEDIA : 6
  }
};

manageAdTag.refreshAd = function(){
  manageAdTag.$container.className = "fadeout";
  manageAdTag.refreshCount++;
  setTimeout(function(){
    if (manageAdTag.$container) {
      manageAdTag.$container.innerHTML = "";
      document.head.innerHTML = manageAdTag.docHeadHTML;
      manageAdTag.loadAndPresentAd();
    }
  }, 350);
};


manageAdTag.loadAndPresentAd = function(){
  manageAdTag.load();
  document.body.addEventListener('loadedAdEvent', manageAdTag.presentAd, false);
};

manageAdTag.load = function(){
  var params = manageAdTag.requestData,
      deviceInfo = mngUtil.deviceInfo(),
      os = deviceInfo.os,
      adSize = params.AD_SIZE,
      adWidth = '', adHeight = '', orientation = '', deviceIdentifier = '', deviceIdentifierPrefix = '', bid_params = {};

  switch(adSize) {
    case '1024x768':
      adWidth  = 1028; adHeight = 768; orientation = 'l';
      break;
    case '768x1024':
      adWidth  = 768; adHeight = 1024; orientation = 'p';
      break;
    case '750x560':
      adWidth  = 750; adHeight = 560; orientation = 'l';
      break;
     case '560x750':
      adWidth  = 560; adHeight = 750; orientation = 'p';
      break;
    case '480x320':
      adWidth  = 480; adHeight = 320; orientation = 'l';
      break;
    case '320x480':
      adWidth  = 320; adHeight = 480; orientation = 'p';
      break;
    case '800x480':
      adWidth  = 800; adHeight = 480; orientation = 'l';
      break;
    case '480x800':
      adWidth  = 480; adHeight = 800; orientation = 'p';
      break;
    case '300x250':
      adWidth  = 300; adHeight = 250; orientation = mngUtil.getDeviceOrientation();
      break;
    case '336x280':
      adWidth  = 336; adHeight = 280; orientation = mngUtil.getDeviceOrientation();
      break;
    case '320x50':
      adWidth  = 320; adHeight = 50; orientation = mngUtil.getDeviceOrientation();
      manageAdTag.adData.isInterstitial = false;
      break;
    case '728x90':
      adWidth  = 728; adHeight = 90; orientation = mngUtil.getDeviceOrientation();
      manageAdTag.adData.isInterstitial = false;
      break;
    case '468x60':
      adWidth  = 468; adHeight = 60; orientation = mngUtil.getDeviceOrientation();
      manageAdTag.adData.isInterstitial = false;
      break;
    default:
      if (params.debug) {}
      else {
        mngUtil.throwError('Invalid ad size: ' + adSize);
      }
  }

  if (params.debug && params.adid) {
    os = 'iOS';
  }

  switch(os) {
    case 'iOS':
      deviceIdentifier       = 'IDFA';
      deviceIdentifierPrefix = 'ifa:';
      break;
  case 'Android':
      deviceIdentifier       = 'GAID';
      deviceIdentifierPrefix = 'gaid:';
      break;
    case 'Kindle':
      deviceIdentifier       = 'Android ID';
      deviceIdentifierPrefix = 'android:';
      break;
    default:
  }

  if (params.DEVICE_ID == '' || params.DEVICE_ID == undefined) {
    mngUtil.throwError('DEVICE_ID (' + os + ' ' + deviceIdentifier + ') missing');
  }

  if (os == 'iOS' || os == 'Android'){
    var deviceRE = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/;
    if (!deviceRE.test(params.DEVICE_ID)) {
      mngUtil.throwError('DEVICE_ID (' + os + ' ' + deviceIdentifier + ') format invalid');
    }
  }

  bid_params = {
    'tz'     : mngUtil.getTimeDiff(),
    'ts'     : mngUtil.getTimeEpoch(),
    'lang'   : mngUtil.getLanguage(),
    'bdn'    : params.BUNDLE_NAME ? params.BUNDLE_NAME : mngUtil.throwError('BUNDLE_NAME missing'),
    'bi'     : params.BUNDLE_ID ? params.BUNDLE_ID : mngUtil.throwError('BUNDLE_ID missing'),
    'bidid'  : mngUtil.UUID(),
    'sdkv'   : mngConf.SDKV || '',
    'zid'    : params.ZONE_ID ? params.ZONE_ID : mngUtil.throwError('ZONE_ID missing'),
    'os'     : os,
    'make'   : deviceInfo.make  || '',
    'model'  : deviceInfo.model || '',
    'dpid'   : deviceIdentifierPrefix + params.DEVICE_ID,
    'screen_height' : mngUtil.getScreenHeight(),
    'screen_width'  : mngUtil.getScreenWidth(),
    'pixel_rato'    : mngUtil.getPixelRatio(),
    'height' : adHeight,
    'width'  : adWidth,
    'interstitial'  : manageAdTag.adData.isInterstitial,
    'device_orient' : mngUtil.getDeviceOrientation(),
    'orient' : orientation,
    'vast'   : '0', // Disable VAST until fully tested
    'mraid'  : params.MRAID_SUPPORT ? 1 : 0,
    'js_sdk' : '1'
  };
  if (manageAdTag.refreshCount > 0) {
    bid_params['reload_count'] = manageAdTag.refreshCount;
  }
  if (params.AD_REFRESH) {
    bid_params['refresh_rate'] = params.AD_REFRESH;
  }
  if (params.NETWORK_TYPE) {
    bid_params['network_type'] = params.NETWORK_TYPE;
  }
  if (params.GENDER) {
    bid_params['gender'] = params.GENDER;
  }
  if (params.AGE) {
    bid_params['age'] = params.AGE;
  }
  if (params.CITY) {
    bid_params['city'] = params.CITY;
  }
  if (params.COUNTRY) {
    bid_params['country'] = params.COUNTRY;
  }
  if (params.COUNTRY_CODE) {
    bid_params['country_code'] = params.COUNTRY_CODE;
  }
  if (params.REGION) {
    bid_params['region'] = params.REGION;
  }
  if (params.METRO) {
    bid_params['metro'] = params.METRO;
  }
  if (params.ZIP) {
    bid_params['network_type'] = params.ZIP;
  }
  if (params.LATITUDE) {
    bid_params['latitude'] = params.LATITUDE;
  }
  if (params.LONGITUDE) {
    bid_params['logitude'] = params.LONGITUDE;
  }
  if (params.KEYWORDS) {
    bid_params['keyword'] = params.KEYWORDS;
  }

  if (params.debug && params.adid) {
    bid_params['os']   = 'iOS';
    bid_params['isTest'] = '1';
    bid_params['adid']   = params.adid;
  }

  manageAdTag.bid_params = bid_params;

  var bidder_url = mngConf.BIDDER_HOST + mngConf.BIDDER_PATH;
  mngUtil.JSONP(bidder_url,{
      callback : manageAdTag.loadedAd,
      data : bid_params
    }
  );
};

manageAdTag.isReady = function(){
  return (manageAdTag.adData && manageAdTag.adData.loaded);
};

manageAdTag.loadedAd = function(data){
  if (data.error) {
    clearInterval(manageAdTag.refreshAdInterval);
    if (typeof manageAdTag.callbacks === "object" && manageAdTag.callbacks.noAdAvailable) {
      manageAdTag.callbacks.noAdAvailable(manageAdTag.cbResults);
    }
    if (manageAdTag.requestData.PASSBACK) {
      console.log(manageAdTag.requestData.PASSBACK);
      postscribe("#" + manageAdTag.requestData.DIV_ID, manageAdTag.requestData.PASSBACK);
      return;
    }
  }
  else {
    manageAdTag.adData = data;
    manageAdTag.adData.loaded = true;

    var callback = null;
    if (typeof manageAdTag.callbacks === "object" && manageAdTag.callbacks.onAdLoaded) {
      manageAdTag.callbacks.onAdLoaded(manageAdTag.cbResults);
    }
    else if (typeof manageAdTag.callbacks === "function") {
      manageAdTag.callbacks(manageAdTag.cbResults);
    }
    manageAdTag.loadedAdEvent = new CustomEvent('loadedAdEvent');
    document.body.dispatchEvent(manageAdTag.loadedAdEvent);
  }
};

manageAdTag.getAd = function(params, cb){
  manageAdTag.requestData = params;
  manageAdTag.callbacks = cb;
  if (document.getElementById(manageAdTag.requestData.DIV_ID)){
    manageAdTag.$container = document.getElementById(manageAdTag.requestData.DIV_ID);
    manageAdTag.$container.className = 'fadeout';
  }
  else {
    manageAdTag.$container = document.createElement('div');
    manageAdTag.$container.id  = manageAdTag.requestData.DIV_ID ? manageAdTag.requestData.DIV_ID : 'manageAd';
  }
  var pageScripts = document.getElementsByTagName("script");
  for (var i = 0; i  < pageScripts.length; i++) {
    if (pageScripts[i].className == "") {
      pageScripts[i].className = "manageAdPre";
    }
  }
  var styleSheets = document.styleSheets;
  for (var i = 0; i  < styleSheets.length; i++) {
    if (styleSheets[i].className == "") {
      styleSheets[i].className = "manageAdPre";
    }
  }
  mngUtil.addMeta();
  mngUtil.addCss();
  manageAdTag.fetchAd();
  manageAdTag.refreshAdInterval = null;
  if (params.AD_REFRESH) {
    var refreshRate = parseInt(params.AD_REFRESH);
    refreshRate = refreshRate >= 15 ? refreshRate * 1000 : 15000;
    manageAdTag.refreshAdInterval = setInterval(function(){
      manageAdTag.refreshAd();
    }, refreshRate);
  }
};

manageAdTag.fetchAd = function(){
  manageAdTag.docHeadHTML = document.head.innerHTML;
  manageAdTag.loadAndPresentAd(manageAdTag.requestData, manageAdTag.callbacks);
  manageAdTag.presentAdEvent = new CustomEvent('presentedAd');
  var callback = null;
  if (typeof manageAdTag.callbacks === "object" && manageAdTag.callbacks.onAdViewed) {
    callback = manageAdTag.callbacks.onAdViewed;
  }
  else if (typeof manageAdTag.callbacks === "function") {
    callback = manageAdTag.callbacks;
  }
  if (callback) {
    document.body.addEventListener('presentedAd', function(){
      setTimeout(function(){
        document.body.removeEventListener('presentedAd', function(){});
      }, 50);
      callback(manageAdTag.cbResults);
      if (typeof manageAdTag.callbacks === "object" && manageAdTag.callbacks.success) {
        manageAdTag.callbacks.success(manageAdTag.cbResults);
      }
    }, false);
  }
};

manageAdTag.presentAd = function(){
  setTimeout(function(){
    document.body.removeEventListener('loadedAdEvent', function(){});
  }, 50);

  if (manageAdTag.adData.ad_type == mngConf.CONSTANTS.DISPLAY
    || manageAdTag.adData.ad_type == mngConf.CONSTANTS.RICHMEDIA
    || manageAdTag.adData.ad_type == mngConf.CONSTANTS.MRAID
    ){
    postscribe("#" + manageAdTag.requestData.DIV_ID, manageAdTag.adData.html);
    manageAdTag.$container.className = "fadein";

    // Fire win_url
    manageAdTag.cbResults.success = true;
    document.body.dispatchEvent(manageAdTag.presentAdEvent);
  }
  else if (manageAdTag.adData.ad_type == mngConf.CONSTANTS.VAST) {
    var click_url = manageAdTag.adData.click_url;
    if (manageAdTag.adData.external_args){
      var external_args   = JSON.parse(manageAdTag.adData.external_args),
          vast_media_file = external_args.vast_media_file || null,
          webm_media_file = external_args.webm_media_file || null,
          vast_end_card   = external_args.vast_end_card || false,
          end_card_html   = external_args.end_card_html || '';
          vast_duration   = external_args.vast_duration || 0,
          current_time    = 0;

      var video_link = document.createElement('a');
          video = document.createElement('video'),
          webm  = document.createElement('source'),
          mp4   = document.createElement('source');
      video_link.href = click_url;
      video.id  = 'manageVideo';
      video.setAttribute('webkit-playsinline', '');
      webm.src  = webm_media_file; webm.type = 'video/webm';
      mp4.src   = vast_media_file; mp4.type  = 'video/mp4';
      video.appendChild(webm); video.appendChild(mp4);
      video_link.appendChild(video);
      manageAdTag.$container.appendChild(video_link);
      manageAdTag.$container.className = "fadein";

      duration = video.duration ? video.duration : vast_duration;
      video.addEventListener("timeupdate", function(event) {
        current_time = video.currentTime;
      });
      video.addEventListener("seeking", function(event) {
        if (video.currentTime > current_time)
            video.currentTime = current_time;
      });

      if (video.hasAttribute('controls')) {
        video.removeAttribute('controls');
      }
      video.play();

      // Show End Card HTML
      video.onended = function(e){
        if(vast_end_card && end_card_html){
          manageAdTag.$container.innerHTML = end_card_html;
        }
      }
    }
  }
};

var mngUtil = {

  throwError: function(error){
    throw new Error(error);
  },

  UUID: function(){
    var self = {};
    var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
    var d0 = Math.random()*0xffffffff|0;
    var d1 = Math.random()*0xffffffff|0;
    var d2 = Math.random()*0xffffffff|0;
    var d3 = Math.random()*0xffffffff|0;
    return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
      lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
      lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
      lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
  },

  JSONP: function (url, options){
    if (!url) {
      return mngUtil.throwError('JSONP url missing');
    }
    var parameters = '', callback = false;
    if (typeof options.callback === 'function') {
      callback = options.callback;
    }
    else if (typeof options.callback === 'string') {
      callback = window[options.callback];
    }
    if (options.data instanceof Object) {
      for (key in options.data) {
        if (parameters.length > 0) parameters = parameters + '&';
        parameters = parameters + key + '=' + encodeURIComponent(options.data[key]);
      }
    }
    else if (typeof options.data === 'string') {
      parameters = parameters + encodeURIComponent(options.data);
    }
    var cbnum = Math.random().toString(16).slice(2),
        script = document.createElement('script');

    if (parameters.length > 0) {
      parameters = '?' + parameters + '&callback=jsonp_' + cbnum;
    }
    else {
      parameters = '?callback=jsonp_' + cbnum;
    }
    window['jsonp_' + cbnum] = function(data) {
      try {
        callback(data);
      }
      finally {
        delete window['jsonp_' + cbnum];
        if (script && script.parentNode) {
          script.parentNode.removeChild(script);
        }
      }
    }
    script.src = url + parameters;
    document.body.appendChild(script);
  },

  deviceInfo: function(){
    var os = '', osVersion = '', device = '', deviceType = '', make = '', model = '',
        userAgent = navigator.userAgent,
        device = (navigator.userAgent).match(/Android|iPhone|iPad|iPod|Silk/i);

      // Kindle
      if (/Silk/i.test(device)) {
        if (!/mobile/i.test(userAgent)) {
          deviceType = 'tablet';
        }
        else {
          deviceType = 'phone';
        }
        osVersion = (userAgent).match(/Android\s+([\d\.]+)/i);
        osVersion = osVersion[0] ? osVersion[0] : '';
        osVersion = osVersion.replace('Android ', '');
        os        = 'Kindle';
        make      = 'Amazon';
        model     = 'Kindle ' + deviceType;
    }
    else if (/Android/i.test(device)) {
        if (!/mobile/i.test(userAgent)) {
          deviceType = 'Tablet';
        }
        else {
          deviceType = 'Phone';
        }
        osVersion = (userAgent).match(/Android\s+([\d\.]+)/i);
        osVersion = osVersion[0] ? osVersion[0] : '';
        osVersion = osVersion.replace('Android ', '');
        os        = 'Android';
        model     = 'Android ' + deviceType;
    }
    else if (/iPhone/i.test(device)) {
        deviceType = 'phone';
        osVersion  = (userAgent).match(/OS\s+([\d\_]+)/i);
        osVersion  = osVersion[0] ? osVersion[0] : '';
        osVersion  = osVersion.replace(/_/g, '.');
        osVersion  = osVersion.replace('OS ', '');
        os         = 'iOS';
        make       = 'Apple';
        model      = 'iPhone';
    }
    else if (/iPad/i.test(device)) {
        deviceType = 'tablet';
        osVersion  = (userAgent).match(/OS\s+([\d\_]+)/i);
        osVersion  = osVersion[0] ? osVersion[0] : '';
        osVersion  = osVersion.replace(/_/g, '.');
        osVersion  = osVersion.replace('OS ', '');
        os         = 'iOS';
        make       = 'Apple';
        model      = 'iPad';
    }
    return {
        'os'         : os,
        'osVersion'  : osVersion,
        'device'     : device,
        'model'      : model,
        'userAgent'  : userAgent,
        'deviceType' : deviceType
    };
  },

  getUserAgent: function(){
    return window.navigator.userAgent.toLowerCase();
  },

  getLanguage: function(){
    return navigator.language || navigator.userLanguage;
  },

  getDeviceOrientation: function(){
    return Math.abs(window.orientation) === 90 ? 'l' : 'p';
  },

  getTimeEpoch: function(){
    return new Date().valueOf();
  },

  getTimeDiff: function(){
    return new Date().getTimezoneOffset() / 60;
  },

  getScreenHeight: function(){
    return screen.height;
  },

  getScreenWidth: function(){
    return screen.width;
  },

  getPixelRatio: function() {
    return window.devicePixelRatio;
  },

  getAdHeight: function(){
  },

  getAdWidth: function(){
  },

  addMeta: function(){
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

  addMRAID: function() {
    var head = document.head || document.getElementsByTagName('head')[0],
      js = document.createElement('script'),
      s = 'mraid.js';
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', s);
    head.appendChild(js);
  },

  addJS: function(src, className){
    var head = document.head || document.getElementsByTagName('head')[0],
    js = document.createElement('script');
    js.type = 'text/javascript';
    js.className = className ? className : '';
    js.async = true;
    js.src = src;
    head.appendChild(js);
  },

  addCss: function(){
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        cssString;
        style.className = 'manageAdPre';
        style.type = 'text/css',
        cssString = '*{margin:0;padding:0}body{background-color:#000}';
        if (manageAdTag.requestData.DIV_ID){
          cssString += '#' + manageAdTag.requestData.DIV_ID + '{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);opacity:0;transition:all 0.5s linear;}';
          cssString += '#' + manageAdTag.requestData.DIV_ID + '.fadeout{opacity:0;}';
          cssString += '#' + manageAdTag.requestData.DIV_ID + '.fadein{opacity:1;}';
        }
        style.innerHTML = cssString;
        head.appendChild(style);
  },

  destroy: function(){
    if (manageAdTag.$container){
      manageAdTag.$container.parentNode.removeChild(manageAdTag.$container);
    }
  }
};
!function(){function a(a,h){a=a||"",h=h||{};for(var i in b)b.hasOwnProperty(i)&&(h.autoFix&&(h["fix_"+i]=!0),h.fix=h.fix||h["fix_"+i]);var j=[],k=document.createElement("div"),l=function(a){return"string"==typeof a&&-1!==a.indexOf("&")?(k.innerHTML=a,k.textContent||k.innerText||a):a},m=function(b){a+=b},n=function(b){a=b+a},o={comment:/^<!--/,endTag:/^<\//,atomicTag:/^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,startTag:/^</,chars:/^[^<]/},p={comment:function(){var b=a.indexOf("-->");return b>=0?{content:a.substr(4,b),length:b+3}:void 0},endTag:function(){var b=a.match(d);return b?{tagName:b[1],length:b[0].length}:void 0},atomicTag:function(){var b=p.startTag();if(b){var c=a.slice(b.length);if(c.match(new RegExp("</\\s*"+b.tagName+"\\s*>","i"))){var d=c.match(new RegExp("([\\s\\S]*?)</\\s*"+b.tagName+"\\s*>","i"));if(d)return{tagName:b.tagName,attrs:b.attrs,content:d[1],length:d[0].length+b.length}}}},startTag:function(){var b=a.indexOf(">");if(-1===b)return null;var d=a.match(c);if(d){var g={},h={},i=d[2];return d[2].replace(e,function(a,b){if(arguments[2]||arguments[3]||arguments[4]||arguments[5])if(arguments[5])g[arguments[5]]="",h[b]=!0;else{var c=arguments[2]||arguments[3]||arguments[4]||f.test(b)&&b||"";g[b]=l(c)}else g[b]=null;i=i.replace(a,"")}),{tagName:d[1],attrs:g,booleanAttrs:h,rest:i,unary:!!d[3],length:d[0].length}}},chars:function(){var b=a.indexOf("<");return{length:b>=0?b:a.length}}},q=function(){for(var b in o)if(o[b].test(a)){g&&console.log("suspected "+b);var c=p[b]();return c?(g&&console.log("parsed "+b,c),c.type=c.type||b,c.text=a.substr(0,c.length),a=a.slice(c.length),c):null}},r=function(a){for(var b;b=q();)if(a[b.type]&&a[b.type](b)===!1)return},s=function(){var b=a;return a="",b},t=function(){return a};return h.fix&&!function(){var b=/^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i,c=/^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i,d=[];d.last=function(){return this[this.length-1]},d.lastTagNameEq=function(a){var b=this.last();return b&&b.tagName&&b.tagName.toUpperCase()===a.toUpperCase()},d.containsTagName=function(a){for(var b,c=0;b=this[c];c++)if(b.tagName===a)return!0;return!1};var e=function(a){return a&&"startTag"===a.type&&(a.unary=b.test(a.tagName)||a.unary,a.html5Unary=!/\/>$/.test(a.text)),a},f=q,g=function(){var b=a,c=e(f());return a=b,c},i=function(){var a=d.pop();n("</"+a.tagName+">")},j={startTag:function(a){var b=a.tagName;"TR"===b.toUpperCase()&&d.lastTagNameEq("TABLE")?(n("<TBODY>"),l()):h.fix_selfClose&&c.test(b)&&d.containsTagName(b)?d.lastTagNameEq(b)?i():(n("</"+a.tagName+">"),l()):a.unary||d.push(a)},endTag:function(a){var b=d.last();b?h.fix_tagSoup&&!d.lastTagNameEq(a.tagName)?i():d.pop():h.fix_tagSoup&&k()}},k=function(){f(),l()},l=function(){var a=g();a&&j[a.type]&&j[a.type](a)};q=function(){return l(),e(f())}}(),{append:m,readToken:q,readTokens:r,clear:s,rest:t,stack:j}}var b=function(){var a,b={},c=this.document.createElement("div");return a="<P><I></P></I>",c.innerHTML=a,b.tagSoup=c.innerHTML!==a,c.innerHTML="<P><i><P></P></i></P>",b.selfClose=2===c.childNodes.length,b}(),c=/^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,d=/^<\/([\-A-Za-z0-9_]+)[^>]*>/,e=/(?:([\-A-Za-z0-9_]+)\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))|(?:([\-A-Za-z0-9_]+)(\s|$)+)/g,f=/^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i,g=!1;a.supports=b,a.tokenToString=function(a){var b={comment:function(a){return"<!--"+a.content},endTag:function(a){return"</"+a.tagName+">"},atomicTag:function(a){return g&&console.log(a),b.startTag(a)+a.content+b.endTag(a)},startTag:function(a){var b="<"+a.tagName;for(var c in a.attrs){b+=" "+c;var d=a.attrs[c];("undefined"==typeof a.booleanAttrs||"undefined"==typeof a.booleanAttrs[c])&&(b+='="'+(d?d.replace(/(^|[^\\])"/g,'$1\\"'):"")+'"')}return a.rest&&(b+=a.rest),b+(a.unary&&!a.html5Unary?"/>":">")},chars:function(a){return a.text}};return b[a.type](a)},a.escapeAttributes=function(a){var b={};for(var c in a){var d=a[c];b[c]=d&&d.replace(/(^|[^\\])"/g,'$1\\"')}return b};for(var h in b)a.browserHasFlaw=a.browserHasFlaw||!b[h]&&h;this.htmlParser=a}(),function(){function a(){}function b(a){return a!==m&&null!==a}function c(a){return"function"==typeof a}function d(a,b,c){var d,e=a&&a.length||0;for(d=0;e>d;d++)b.call(c,a[d],d)}function e(a,b,c){var d;for(d in a)a.hasOwnProperty(d)&&b.call(c,d,a[d])}function f(a,b){return e(b,function(b,c){a[b]=c}),a}function g(a,c){return a=a||{},e(c,function(c,d){b(a[c])||(a[c]=d)}),a}function h(a){try{return o.call(a)}catch(b){var c=[];return d(a,function(a){c.push(a)}),c}}function i(a){return a&&"tagName"in a?!!~a.tagName.toLowerCase().indexOf("script"):!1}function j(a){return a&&"tagName"in a?!!~a.tagName.toLowerCase().indexOf("style"):!1}var k={afterAsync:a,afterDequeue:a,afterStreamStart:a,afterWrite:a,autoFix:!0,beforeEnqueue:a,beforeWriteToken:function(a){return a},beforeWrite:function(a){return a},done:a,error:function(a){throw a},releaseAsync:!1},l=this,m=void 0;if(!l.postscribe){var n=!1,o=Array.prototype.slice,p=function(a){return a[a.length-1]},q=function(){function a(a,c,d){var e=k+c;if(2===arguments.length){var f=a.getAttribute(e);return b(f)?String(f):f}b(d)&&""!==d?a.setAttribute(e,d):a.removeAttribute(e)}function g(b,c){var d=b.ownerDocument;f(this,{root:b,options:c,win:d.defaultView||d.parentWindow,doc:d,parser:htmlParser("",{autoFix:c.autoFix}),actuals:[b],proxyHistory:"",proxyRoot:d.createElement(b.nodeName),scriptStack:[],writeQueue:[]}),a(this.proxyRoot,"proxyof",0)}var k="data-ps-";return g.prototype.write=function(){[].push.apply(this.writeQueue,arguments);for(var a;!this.deferredRemote&&this.writeQueue.length;)a=this.writeQueue.shift(),c(a)?this.callFunction(a):this.writeImpl(a)},g.prototype.callFunction=function(a){var b={type:"function",value:a.name||a.toString()};this.onScriptStart(b),a.call(this.win,this.doc),this.onScriptDone(b)},g.prototype.writeImpl=function(a){this.parser.append(a);for(var b,c,d,e=[];(b=this.parser.readToken())&&!(c=i(b))&&!(d=j(b));)b=this.options.beforeWriteToken(b),b&&e.push(b);this.writeStaticTokens(e),c&&this.handleScriptToken(b),d&&this.handleStyleToken(b)},g.prototype.writeStaticTokens=function(a){var b=this.buildChunk(a);if(b.actual)return b.html=this.proxyHistory+b.actual,this.proxyHistory+=b.proxy,this.proxyRoot.innerHTML=b.html,n&&(b.proxyInnerHTML=this.proxyRoot.innerHTML),this.walkChunk(),n&&(b.actualInnerHTML=this.root.innerHTML),b},g.prototype.buildChunk=function(a){var b=this.actuals.length,c=[],e=[],f=[];return d(a,function(a){var d=htmlParser.tokenToString(a);if(c.push(d),a.attrs){if(!/^noscript$/i.test(a.tagName)){var g=b++;e.push(d.replace(/(\/?>)/," "+k+"id="+g+" $1")),"ps-script"!==a.attrs.id&&"ps-style"!==a.attrs.id&&f.push("atomicTag"===a.type?"":"<"+a.tagName+" "+k+"proxyof="+g+(a.unary?" />":">"))}}else e.push(d),f.push("endTag"===a.type?d:"")}),{tokens:a,raw:c.join(""),actual:e.join(""),proxy:f.join("")}},g.prototype.walkChunk=function(){for(var c,d=[this.proxyRoot];b(c=d.shift());){var e=1===c.nodeType,f=e&&a(c,"proxyof");if(!f){e&&(this.actuals[a(c,"id")]=c,a(c,"id",null));var g=c.parentNode&&a(c.parentNode,"proxyof");g&&this.actuals[g].appendChild(c)}d.unshift.apply(d,h(c.childNodes))}},g.prototype.handleScriptToken=function(a){var b=this.parser.clear();if(b&&this.writeQueue.unshift(b),a.src=a.attrs.src||a.attrs.SRC,a=this.options.beforeWriteToken(a)){a.src&&this.scriptStack.length?this.deferredRemote=a:this.onScriptStart(a);var c=this;this.writeScriptToken(a,function(){c.onScriptDone(a)})}},g.prototype.handleStyleToken=function(a){var b=this.parser.clear();b&&this.writeQueue.unshift(b),a.type=a.attrs.type||a.attrs.TYPE||"text/css",a=this.options.beforeWriteToken(a),a&&this.writeStyleToken(a),b&&this.write()},g.prototype.writeStyleToken=function(a){var b=this.buildStyle(a);this.insertStyle(b),a.content&&(b.styleSheet&&!b.sheet?b.styleSheet.cssText=a.content:b.appendChild(this.doc.createTextNode(a.content)))},g.prototype.buildStyle=function(a){var b=this.doc.createElement(a.tagName);return b.setAttribute("type",a.type),e(a.attrs,function(a,c){b.setAttribute(a,c)}),b},g.prototype.insertStyle=function(a){this.writeImpl('<span id="ps-style"/>');var b=this.doc.getElementById("ps-style");b.parentNode.replaceChild(a,b)},g.prototype.onScriptStart=function(a){a.outerWrites=this.writeQueue,this.writeQueue=[],this.scriptStack.unshift(a)},g.prototype.onScriptDone=function(a){return a!==this.scriptStack[0]?void this.options.error({message:"Bad script nesting or script finished twice"}):(this.scriptStack.shift(),this.write.apply(this,a.outerWrites),void(!this.scriptStack.length&&this.deferredRemote&&(this.onScriptStart(this.deferredRemote),this.deferredRemote=null)))},g.prototype.writeScriptToken=function(a,b){var c=this.buildScript(a),d=this.shouldRelease(c),e=this.options.afterAsync;a.src&&(c.src=a.src,this.scriptLoadHandler(c,d?e:function(){b(),e()}));try{this.insertScript(c),(!a.src||d)&&b()}catch(f){this.options.error(f),b()}},g.prototype.buildScript=function(a){var b=this.doc.createElement(a.tagName);return e(a.attrs,function(a,c){b.setAttribute(a,c)}),a.content&&(b.text=a.content),b},g.prototype.insertScript=function(a){this.writeImpl('<span id="ps-script"/>');var b=this.doc.getElementById("ps-script");b.parentNode.replaceChild(a,b)},g.prototype.scriptLoadHandler=function(a,b){function c(){a=a.onload=a.onreadystatechange=a.onerror=null}function d(){c(),b()}function e(a){c(),g(a),b()}var g=this.options.error;f(a,{onload:function(){d()},onreadystatechange:function(){/^(loaded|complete)$/.test(a.readyState)&&d()},onerror:function(){e({message:"remote script failed "+a.src})}})},g.prototype.shouldRelease=function(a){var b=/^script$/i.test(a.nodeName);return!b||!!(this.options.releaseAsync&&a.src&&a.hasAttribute("async"))},g}();l.postscribe=function(){function b(){var a,b=j.shift();b&&(a=p(b),a.afterDequeue(),b.stream=d.apply(null,b),a.afterStreamStart())}function d(c,d,g){function j(a){a=g.beforeWrite(a),m.write(a),g.afterWrite(a)}m=new q(c,g),m.id=i++,m.name=g.name||m.id,e.streams[m.name]=m;var k=c.ownerDocument,l={close:k.close,open:k.open,write:k.write,writeln:k.writeln};f(k,{close:a,open:a,write:function(){return j(h(arguments).join(""))},writeln:function(){return j(h(arguments).join("")+"\n")}});var n=m.win.onerror||a;return m.win.onerror=function(a,b,c){g.error({msg:a+" - "+b+":"+c}),n.apply(m.win,arguments)},m.write(d,function(){f(k,l),m.win.onerror=n,g.done(),m=null,b()}),m}function e(d,e,f){c(f)&&(f={done:f}),f=g(f,k),d=/^#/.test(d)?l.document.getElementById(d.substr(1)):d.jquery?d[0]:d;var h=[d,e,f];return d.postscribe={cancel:function(){h.stream?h.stream.abort():h[1]=a}},f.beforeEnqueue(h),j.push(h),m||b(),d.postscribe}var i=0,j=[],m=null;return f(e,{streams:{},queue:j,WriteStream:q})}()}}();

