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
                            id: 'engineering_alerts',
                            type: 'image',
                            rect: ['0px', '0px', '400px', '600px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"engineering_alerts.jpg",'0px','0px']
                        },
                        {
                            id: 'alert_feed',
                            type: 'image',
                            rect: ['8px', '73px', '385px', '800px', 'auto', 'auto'],
                            clip: 'rect(0px 382px 478px 3px)',
                            fill: ["rgba(0,0,0,0)",im+"alert_feed.jpg",'0px','-304.87475595313px']
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: [undefined, undefined, '400px', '600px'],
                            overflow: 'hidden',
                            fill: ["rgba(255,255,255,1)"]
                        }
                    }
                },
                timeline: {
                    duration: 7000,
                    autoPlay: true,
                    data: [
                        [
                            "eid2",
                            "top",
                            1000,
                            0,
                            "linear",
                            "${alert_feed}",
                            '73px',
                            '73px'
                        ],
                        [
                            "eid21",
                            "clip",
                            1000,
                            0,
                            "linear",
                            "${alert_feed}",
                            [0,382,478,3],
                            [0,382,478,3],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid1",
                            "left",
                            1000,
                            0,
                            "linear",
                            "${alert_feed}",
                            '8px',
                            '8px'
                        ],
                        [
                            "eid22",
                            "background-position",
                            1000,
                            6000,
                            "linear",
                            "${alert_feed}",
                            [0,0],
                            [0,-304.87475595313],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("engineering_alerts_animate_edgeActions.js");
})("EDGE-11408374");
