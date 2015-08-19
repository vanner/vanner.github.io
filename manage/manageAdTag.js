var manageAdTag = window.manageAdTag || {
  adData: {}
};

manageAdTag.cbResults = {
  status: 'ERROR'
};

var mngConf = {
  bidder_host : 'http://appsponsor-vbidder.doc04.manage.com',
  bidder_path : '/2/bid',
  sdkv        : '3.3'
};

manageAdTag.loadAndPresentAd = function(params, cb){
  console.log('--- loadAndPresentAd ---');
  manageAdTag.load(params, cb);
  document.body.addEventListener('loadedAd', manageAdTag.presentAd, false);
};

manageAdTag.load = function(params, cb){
  console.log('--- load ---');
  console.log(params);

  var deviceInfo = mngUtil.deviceInfo(),
      os = deviceInfo.os,
      deviceIdentifier = '',
      deviceIdentifierPrefix = '';

  switch(os) {
    case 'iOS':
        deviceIdentifier = 'IDFA'
        deviceIdentifierPrefix = 'ifa:';
        break;
    case 'Android':
        deviceIdentifier = 'GAID'
        deviceIdentifierPrefix = 'gaid:';
        break;
    case 'Kindle':
        deviceIdentifier = 'Android ID'
        deviceIdentifierPrefix = 'android:';
        break;
    default:
  }

  var bid_params = {
    'tz'     : mngUtil.getTimeDiff(),
    'ts'     : mngUtil.getTimeEpoch(),
    'lang'   : mngUtil.getLanguage(),
    'bdn'    : params.bundleName ? params.bundleName : mngUtil.throwError('bundleName missing'),
    'bi'     : params.bundleID ? params.bundleID : mngUtil.throwError('bundleID missing'),
    'bidid'  : mngUtil.UUID(),
    'sdkv'   : mngConf.sdkv || '',
    'orient' : mngUtil.getDeviceOrientation(),
    'zid'    : params.zoneID ? params.zoneID : mngUtil.throwError('zoneID missing'),
    'os'     : os,
    'make'   : deviceInfo.make || '',
    'model'  : deviceInfo.model || '',
    'dpid'   : params.deviceID ? (deviceIdentifierPrefix + params.deviceID) : mngUtil.throwError('deviceID (' + os + ' ' + deviceIdentifier + ') missing'),
    'height' : mngUtil.getScreenHeight(),
    'width'  : mngUtil.getScreenWidth(),
    'jsSDK'  : '1'
  };

  if (params.adid) {
    bid_params['isTest'] = '1';
    bid_params['adid']   = params.adid;
  }

  if (params.debug) {
    bid_params['dpid'] = 'ifa:E334753F-AD6D-40C7-90A2-05D99372E7A6';
    bid_params['os']   = 'iOS';
  }

  console.log('--- params ---');
  console.log(bid_params);
  var bidder_url = mngConf.bidder_host + mngConf.bidder_path;
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
  console.log('--- loadedAd ---');
  console.log(data);
  manageAdTag.adData = data;
  manageAdTag.adData.loaded = true;
  manageAdTag.loadAdEvent = new CustomEvent('loadedAd');
  document.body.dispatchEvent(manageAdTag.loadAdEvent);
};

manageAdTag.getAd = function(params, cb){
  manageAdTag.requestData = params;
  manageAdTag.loadAndPresentAd(manageAdTag.requestData, cb);
  manageAdTag.presentAdEvent = new CustomEvent('presentedAd');
  document.body.addEventListener('presentedAd', function(){
    cb(manageAdTag.cbResults);
  }, false);

};

manageAdTag.presentAd = function(){
  console.log('--- presentAd ---');
  mngUtil.addMeta();
  mngUtil.addCss();
  console.log(manageAdTag.adData);
  if (manageAdTag.adData.html) {
    if (document.getElementById(manageAdTag.requestData.divID)) {
      document.getElementById(manageAdTag.requestData.divID).innerHTML = manageAdTag.adData.html;
    }
    else {
      var container = document.createElement('div');
      container.id  = 'manageAd';
      manageAdTag.requestData.divID = container.id;
      container.innerHTML = manageAdTag.adData.html;
      var body = document.body || document.getElementsByTagName('body')[0];
      body.appendChild(container);
    }
    container.innerHTML = manageAdTag.adData.html;
    manageAdTag.cbResults.status = 'SUCCESS';
    document.body.dispatchEvent(manageAdTag.presentAdEvent);
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
        parameters = parameters + key + '=' + options.data[ key ];
      }
    }
    else if (typeof options.data === 'string') {
      parameters = parameters + options.data;
    }
    var cbnum = Math.random().toString(16).slice(2),
        script = document.createElement('script');

    if (parameters.length > 0) {
      parameters = '?' + parameters + '&callback=cb' + cbnum;
    }
    else {
      parameters = '?callback=cb' + cbnum;
    }
    window['cb' + cbnum] = function(data) {
      try {
        console.log('--- callback ---');
        console.log(callback);
        callback(data);
      }
      finally {
        delete window['cb' + cbnum];
        if (script && script.parentNode) {
          script.parentNode.removeChild(script);
        }
      }
    }
    console.log('--- script ---');
    console.log(script);
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
          deviceType = 'Thone';
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
        'deviceType' : deviceType,
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

  addCss: function(){
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        cssString;
        style.type = 'text/css',
        cssString = '* {margin:0;padding:0}body{background-color:#000}';
        if (manageAdTag.requestData.divID){
          cssString += '#' + manageAdTag.requestData.divID + '{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);}';
        }
        style.innerHTML = cssString;
        head.appendChild(style);
  },

  end: function(){
  }

};
