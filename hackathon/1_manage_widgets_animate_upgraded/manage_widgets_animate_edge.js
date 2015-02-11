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
            js+"jquery-1.7.1.min.js"
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
                            id: 'manage_m',
                            type: 'image',
                            rect: ['145', '161', '124px', '141px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"manage_m.png",'0px','0px'],
                            transform: [[],['360']]
                        },
                        {
                            id: 'manage',
                            type: 'image',
                            rect: ['301', '209', '345px', '66px', 'auto', 'auto'],
                            clip: 'rect(0px 345px 66px 0px)',
                            fill: ["rgba(0,0,0,0)",im+"manage.png",'0px','0px']
                        },
                        {
                            id: 'widgets2',
                            type: 'image',
                            rect: ['298', '194', '357px', '80px', 'auto', 'auto'],
                            clip: 'rect(0px 357px 80px 0px)',
                            fill: ["rgba(0,0,0,0)",im+"idgets.png",'-362.77734375px','0px']
                        },
                        {
                            id: 'w',
                            type: 'image',
                            rect: ['296px', '210px', '76px', '49px', 'auto', 'auto'],
                            clip: 'rect(0px 76px 49px 0px)',
                            fill: ["rgba(0,0,0,0)",im+"w.png",'-77.89599609375px','0px'],
                            transform: [[],['180']]
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '800', '500', 'auto', 'auto'],
                            overflow: 'hidden',
                            fill: ["rgba(0,0,0,1.00)"]
                        }
                    }
                },
                timeline: {
                    duration: 7000,
                    autoPlay: true,
                    data: [
                        [
                            "eid9",
                            "clip",
                            2000,
                            0,
                            "linear",
                            "${widgets2}",
                            [0,357,80,0],
                            [0,357,80,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid17",
                            "clip",
                            4000,
                            0,
                            "linear",
                            "${widgets2}",
                            [0,357,80,0],
                            [0,357,80,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid10",
                            "rotateZ",
                            2000,
                            0,
                            "linear",
                            "${manage_m}",
                            '0deg',
                            '0deg'
                        ],
                        [
                            "eid25",
                            "rotateZ",
                            2750,
                            500,
                            "linear",
                            "${manage_m}",
                            '0deg',
                            '180deg'
                        ],
                        [
                            "eid45",
                            "rotateZ",
                            6500,
                            500,
                            "linear",
                            "${manage_m}",
                            '180deg',
                            '360deg'
                        ],
                        [
                            "eid13",
                            "background-position",
                            2000,
                            500,
                            "linear",
                            "${manage}",
                            [0,0],
                            [-348.2578125,0],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid30",
                            "clip",
                            2000,
                            0,
                            "linear",
                            "${w}",
                            [0,76,49,0],
                            [0,76,49,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid37",
                            "clip",
                            4412,
                            0,
                            "linear",
                            "${w}",
                            [0,76,49,0],
                            [0,76,49,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid43",
                            "clip",
                            6500,
                            0,
                            "linear",
                            "${w}",
                            [0,76,49,0],
                            [0,76,49,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid32",
                            "rotateZ",
                            2000,
                            0,
                            "linear",
                            "${w}",
                            '0deg',
                            '0deg'
                        ],
                        [
                            "eid35",
                            "rotateZ",
                            4412,
                            0,
                            "linear",
                            "${w}",
                            '0deg',
                            '0deg'
                        ],
                        [
                            "eid46",
                            "rotateZ",
                            6500,
                            500,
                            "linear",
                            "${w}",
                            '0deg',
                            '180deg'
                        ],
                        [
                            "eid2",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${widgets2}",
                            '194px',
                            '194px'
                        ],
                        [
                            "eid15",
                            "top",
                            4000,
                            0,
                            "linear",
                            "${widgets2}",
                            '194px',
                            '194px'
                        ],
                        [
                            "eid28",
                            "left",
                            2000,
                            0,
                            "linear",
                            "${w}",
                            '296px',
                            '296px'
                        ],
                        [
                            "eid33",
                            "left",
                            4412,
                            0,
                            "linear",
                            "${w}",
                            '296px',
                            '296px'
                        ],
                        [
                            "eid39",
                            "left",
                            6500,
                            0,
                            "linear",
                            "${w}",
                            '296px',
                            '296px'
                        ],
                        [
                            "eid1",
                            "left",
                            2000,
                            0,
                            "linear",
                            "${widgets2}",
                            '298px',
                            '298px'
                        ],
                        [
                            "eid22",
                            "left",
                            4000,
                            0,
                            "linear",
                            "${widgets2}",
                            '298px',
                            '298px'
                        ],
                        [
                            "eid23",
                            "left",
                            4500,
                            0,
                            "linear",
                            "${widgets2}",
                            '298px',
                            '298px'
                        ],
                        [
                            "eid3",
                            "background-position",
                            2000,
                            0,
                            "linear",
                            "${widgets2}",
                            [-362.77734375,0],
                            [-362.77734375,0],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid20",
                            "background-position",
                            4000,
                            500,
                            "linear",
                            "${widgets2}",
                            [-362.777344,0],
                            [0.96093724999997,0],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid8",
                            "clip",
                            2000,
                            0,
                            "linear",
                            "${manage}",
                            [0,345,66,0],
                            [0,345,66,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid31",
                            "background-position",
                            2000,
                            0,
                            "linear",
                            "${w}",
                            [-77.89599609375,0],
                            [-77.89599609375,0],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid38",
                            "background-position",
                            4412,
                            88,
                            "linear",
                            "${w}",
                            [-77.895996,0],
                            [1.41894540625,0],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid42",
                            "background-position",
                            6500,
                            0,
                            "linear",
                            "${w}",
                            [1.41894540625,0],
                            [1.41894540625,0],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid7",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${manage}",
                            '209px',
                            '209px'
                        ],
                        [
                            "eid29",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${w}",
                            '210px',
                            '210px'
                        ],
                        [
                            "eid34",
                            "top",
                            4412,
                            0,
                            "linear",
                            "${w}",
                            '210px',
                            '210px'
                        ],
                        [
                            "eid40",
                            "top",
                            6500,
                            0,
                            "linear",
                            "${w}",
                            '210px',
                            '210px'
                        ],
                        [
                            "eid6",
                            "left",
                            2000,
                            0,
                            "linear",
                            "${manage}",
                            '301px',
                            '301px'
                        ]
                    ]
                }
            },
            "click_url": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            id: 'click_url',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            rect: [0, 0, '800px', '500px', 'auto', 'auto'],
                            fill: ['rgba(192,192,192,0.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 800, 500]
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [
                        [
                            "eid26",
                            "background-color",
                            0,
                            0,
                            "linear",
                            "${click_url}",
                            'rgba(192,192,192,0.00)',
                            'rgba(192,192,192,0.00)'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("manage_widgets_animate_edgeActions.js");
})("EDGE-17441932");
