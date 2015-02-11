/***********************
* Adobe Edge Animate Composition Actions
*
* Edit this file with caution, being careful to preserve 
* function signatures and comments starting with 'Edge' to maintain the 
* ability to interact with these actions from within Adobe Edge Animate
*
***********************/
(function($, Edge, compId){
var Composition = Edge.Composition, Symbol = Edge.Symbol; // aliases for commonly used Edge classes

   //Edge symbol: 'stage'
   (function(symbolName) {
      
      
      Symbol.bindElementAction(compId, symbolName, "${Stage}", "click", function(sym, e) {
         

      });
      //Edge binding end

      Symbol.bindTimelineAction(compId, symbolName, "Default Timeline", "stop", function(sym, e) {
         

      });
      //Edge binding end

   })("stage");
   //Edge symbol end:'stage'

   //=========================================================
   
   //Edge symbol: 'click_url'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${click_url}", "click", function(sym, e) {
         sym.play();
         // play the timeline from the given position (ms or label)
         sym.play(0sym.play();
         );
         

      });
      //Edge binding end

   })("click_url");
   //Edge symbol end:'click_url'

})(window.jQuery || AdobeEdge.$, AdobeEdge, "EDGE-17441932");