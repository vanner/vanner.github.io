/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
//images folder
var im='images/';

var fonts = {};


var resources = [
];
var symbols = {
"stage": {
   version: "2.0.1",
   minimumCompatibleVersion: "2.0.0",
   build: "2.0.1.268",
   baseState: "Base State",
   initialState: "Base State",
   gpuAccelerate: false,
   resizeInstances: false,
   content: {
         dom: [
         {
            id:'background',
            type:'image',
            rect:['-16px','13px','300px','339px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"background.png",'0px','0px']
         },
         {
            id:'fred_head',
            type:'image',
            rect:['-68px','21px','66px','93px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"fred_head.png",'0px','0px']
         },
         {
            id:'frame',
            type:'image',
            rect:['-2px','0px','294px','394px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"frame.png",'0px','0px']
         },
         {
            id:'AdultFredFinder_logo',
            type:'image',
            rect:['6px','331px','205px','25px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"AdultFredFinder_logo.png",'0px','0px']
         },
         {
            id:'button_blue',
            type:'image',
            rect:['220px','314px','64px','66px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"button_blue.png",'0px','0px']
         },
         {
            id:'button_red',
            type:'image',
            rect:['220px','314px','64px','66px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"button_red.png",'0px','0px']
         }],
         symbolInstances: [

         ]
      },
   states: {
      "Base State": {
         "${_AdultFredFinder_logo}": [
            ["style", "left", '6px'],
            ["style", "top", '331px']
         ],
         "${_fred_head}": [
            ["style", "top", '21px'],
            ["style", "left", '-68px'],
            ["style", "display", 'block']
         ],
         "${_button_red}": [
            ["style", "top", '314px'],
            ["style", "opacity", '1'],
            ["style", "left", '220px'],
            ["style", "display", 'block']
         ],
         "${_Stage}": [
            ["color", "background-color", 'rgba(255,255,255,0.00)'],
            ["style", "overflow", 'hidden'],
            ["style", "height", '394px'],
            ["gradient", "background-image", [270,[['rgba(255,255,255,0.00)',0],['rgba(255,255,255,1.00)',100]]]],
            ["style", "width", '292px']
         ],
         "${_frame}": [
            ["style", "left", '-2px'],
            ["style", "top", '0px']
         ],
         "${_background}": [
            ["style", "left", '-16px'],
            ["style", "top", '13px']
         ],
         "${_button_blue}": [
            ["style", "top", '314px'],
            ["style", "left", '220px'],
            ["style", "display", 'block']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 9500,
         autoPlay: true,
         timeline: [
            { id: "eid26", tween: [ "style", "${_button_blue}", "display", 'block', { fromValue: 'block'}], position: 0, duration: 0 },
            { id: "eid5", tween: [ "style", "${_Stage}", "height", '394px', { fromValue: '394px'}], position: 0, duration: 0 },
            { id: "eid4", tween: [ "style", "${_Stage}", "width", '292px', { fromValue: '292px'}], position: 0, duration: 0 },
            { id: "eid6", tween: [ "style", "${_fred_head}", "display", 'block', { fromValue: 'block'}], position: 0, duration: 0 },
            { id: "eid7", tween: [ "style", "${_fred_head}", "top", '21px', { fromValue: '21px'}], position: 0, duration: 0 },
            { id: "eid14", tween: [ "style", "${_fred_head}", "top", '155px', { fromValue: '21px'}], position: 2000, duration: 1000 },
            { id: "eid18", tween: [ "style", "${_fred_head}", "top", '155px', { fromValue: '155px'}], position: 5000, duration: 0 },
            { id: "eid22", tween: [ "style", "${_fred_head}", "top", '21px', { fromValue: '322px'}], position: 5500, duration: 2000 },
            { id: "eid25", tween: [ "style", "${_fred_head}", "top", '17px', { fromValue: '21px'}], position: 9000, duration: 0 },
            { id: "eid12", tween: [ "style", "${_fred_head}", "left", '178px', { fromValue: '-68px'}], position: 0, duration: 2000 },
            { id: "eid16", tween: [ "style", "${_fred_head}", "left", '-74px', { fromValue: '178px'}], position: 3000, duration: 2000 },
            { id: "eid20", tween: [ "style", "${_fred_head}", "left", '178px', { fromValue: '-74px'}], position: 5500, duration: 0 },
            { id: "eid24", tween: [ "style", "${_fred_head}", "left", '-68px', { fromValue: '178px'}], position: 7500, duration: 1500 },
            { id: "eid29", tween: [ "style", "${_button_red}", "opacity", '0', { fromValue: '1'}], position: 0, duration: 500 },
            { id: "eid44", tween: [ "style", "${_button_red}", "opacity", '1', { fromValue: '0'}], position: 1000, duration: 500 },
            { id: "eid47", tween: [ "style", "${_button_red}", "opacity", '0', { fromValue: '1'}], position: 2000, duration: 500 },
            { id: "eid48", tween: [ "style", "${_button_red}", "opacity", '1', { fromValue: '0'}], position: 3000, duration: 500 },
            { id: "eid51", tween: [ "style", "${_button_red}", "opacity", '0', { fromValue: '1'}], position: 4000, duration: 500 },
            { id: "eid52", tween: [ "style", "${_button_red}", "opacity", '1', { fromValue: '0'}], position: 5000, duration: 500 },
            { id: "eid55", tween: [ "style", "${_button_red}", "opacity", '0', { fromValue: '1'}], position: 6000, duration: 500 },
            { id: "eid56", tween: [ "style", "${_button_red}", "opacity", '1', { fromValue: '0'}], position: 7000, duration: 500 },
            { id: "eid59", tween: [ "style", "${_button_red}", "opacity", '0', { fromValue: '1'}], position: 8000, duration: 500 },
            { id: "eid60", tween: [ "style", "${_button_red}", "opacity", '1', { fromValue: '0'}], position: 9000, duration: 500 },
            { id: "eid2", tween: [ "color", "${_Stage}", "background-color", 'rgba(255,255,255,0.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,255,255,0.00)'}], position: 0, duration: 0 },
            { id: "eid27", tween: [ "style", "${_button_red}", "display", 'block', { fromValue: 'block'}], position: 0, duration: 0 },
            { id: "eid43", tween: [ "style", "${_button_red}", "display", 'block', { fromValue: 'block'}], position: 1000, duration: 0 },
            { id: "eid45", tween: [ "style", "${_button_red}", "display", 'block', { fromValue: 'block'}], position: 2000, duration: 0 },
            { id: "eid46", tween: [ "style", "${_button_red}", "display", 'block', { fromValue: 'block'}], position: 3000, duration: 0 },
            { id: "eid49", tween: [ "style", "${_button_red}", "display", 'block', { fromValue: 'block'}], position: 4000, duration: 0 },
            { id: "eid50", tween: [ "style", "${_button_red}", "display", 'block', { fromValue: 'block'}], position: 5000, duration: 0 },
            { id: "eid53", tween: [ "style", "${_button_red}", "display", 'block', { fromValue: 'block'}], position: 6000, duration: 0 },
            { id: "eid54", tween: [ "style", "${_button_red}", "display", 'block', { fromValue: 'block'}], position: 7000, duration: 0 },
            { id: "eid57", tween: [ "style", "${_button_red}", "display", 'block', { fromValue: 'block'}], position: 8000, duration: 0 },
            { id: "eid58", tween: [ "style", "${_button_red}", "display", 'block', { fromValue: 'block'}], position: 9000, duration: 0 }         ]
      }
   }
}
};


Edge.registerCompositionDefn(compId, symbols, fonts, resources);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     Edge.launchComposition(compId);
});
})(jQuery, AdobeEdge, "MANAGE");
