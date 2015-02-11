/*jslint */
/*global AdobeEdge: false, window: false, document: false, console:false, alert: false */
(function (compId) {

    "use strict";
    var im='images/',
        aud='media/',
        vid='media/',
        js='js/',
        fonts = {
        },
        opts = {
            'gAudioPreloadPreference': 'auto',
            'gVideoPreloadPreference': 'auto'
        },
        resources = [
        ],
        scripts = [
        ],
        symbols = {
            "stage": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'newsfeed_frame',
                            type: 'image',
                            rect: ['0px', '0px', '400px', '600px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"newsfeed_frame.jpg",'0px','0px']
                        },
                        {
                            id: 'twitter_feed',
                            type: 'image',
                            rect: ['6px', '73px', '387px', '1582px', 'auto', 'auto'],
                            clip: 'rect(0px 387.3835144043px 479px 0px)',
                            fill: ["rgba(0,0,0,0)",im+"twitter_feed.jpg",'0px','-1087.6149900937px']
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '400px', '600px', 'auto', 'auto'],
                            overflow: 'hidden',
                            fill: ["rgba(255,255,255,1)"]
                        }
                    }
                },
                timeline: {
                    duration: 11000,
                    autoPlay: true,
                    data: [
                        [
                            "eid17",
                            "background-position",
                            1000,
                            10000,
                            "linear",
                            "${twitter_feed}",
                            [0,0],
                            [0,-1087.6149900937],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1",
                            "left",
                            1000,
                            0,
                            "linear",
                            "${twitter_feed}",
                            '6px',
                            '6px'
                        ],
                        [
                            "eid16",
                            "top",
                            1000,
                            0,
                            "linear",
                            "${twitter_feed}",
                            '73px',
                            '73px'
                        ],
                        [
                            "eid15",
                            "clip",
                            1000,
                            0,
                            "linear",
                            "${twitter_feed}",
                            [0,387.3835144043,479,0],
                            [0,387.3835144043,479,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("newsfeed_animate_edgeActions.js");
})("EDGE-1384113");
