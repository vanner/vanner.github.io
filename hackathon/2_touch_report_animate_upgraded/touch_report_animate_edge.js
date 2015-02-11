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
                            id: 'background_frame',
                            type: 'image',
                            rect: ['0', '0', '600px', '250px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"background_frame.jpg",'0px','0px']
                        },
                        {
                            id: 'numbers_1',
                            display: 'block',
                            type: 'image',
                            rect: ['68', '-162px', '50px', '433px', 'auto', 'auto'],
                            clip: 'rect(169px 50px 369px 0px)',
                            fill: ["rgba(0,0,0,0)",im+"numbers_1.png",'0px','0px']
                        },
                        {
                            id: 'numbers_2',
                            display: 'block',
                            type: 'image',
                            rect: ['182', '-27', '48px', '434px', 'auto', 'auto'],
                            clip: 'rect(53px 48px 251px 0px)',
                            fill: ["rgba(0,0,0,0)",im+"numbers_2.png",'0px','0px']
                        },
                        {
                            id: 'numbers_blur',
                            display: 'none',
                            type: 'image',
                            rect: ['182px', '18px', '48px', '500px', 'auto', 'auto'],
                            clip: 'rect(4px 48px 208px 0px)',
                            fill: ["rgba(0,0,0,0)",im+"numbers_blur.png",'0px','0px']
                        },
                        {
                            id: 'numbers_blurCopy',
                            display: 'none',
                            type: 'image',
                            rect: ['70px', '18px', '48px', '500px', 'auto', 'auto'],
                            clip: 'rect(4px 48px 208px 0px)',
                            fill: ["rgba(0,0,0,0)",im+"numbers_blur.png",'0px','0px']
                        },
                        {
                            id: 'numbers_22',
                            display: 'none',
                            type: 'image',
                            rect: ['70px', '18px', '48px', '434px', 'auto', 'auto'],
                            clip: 'rect(13px 48px 208px 0px)',
                            fill: ["rgba(0,0,0,0)",im+"numbers_2.png",'0px','0px']
                        },
                        {
                            id: 'numbers_22Copy2',
                            display: 'none',
                            type: 'image',
                            rect: ['182px', '18px', '48px', '434px', 'auto', 'auto'],
                            clip: 'rect(13px 48px 208px 0px)',
                            fill: ["rgba(0,0,0,0)",im+"numbers_2.png",'0px','0px']
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '600', '250', 'auto', 'auto'],
                            overflow: 'hidden',
                            fill: ["rgba(255,255,255,1)"]
                        }
                    }
                },
                timeline: {
                    duration: 8000,
                    autoPlay: true,
                    data: [
                        [
                            "eid11",
                            "left",
                            0,
                            0,
                            "linear",
                            "${numbers_2}",
                            '182px',
                            '182px'
                        ],
                        [
                            "eid13",
                            "left",
                            4000,
                            0,
                            "linear",
                            "${numbers_2}",
                            '182px',
                            '182px'
                        ],
                        [
                            "eid33",
                            "left",
                            6500,
                            0,
                            "linear",
                            "${numbers_2}",
                            '182px',
                            '182px'
                        ],
                        [
                            "eid1",
                            "top",
                            0,
                            0,
                            "linear",
                            "${numbers_1}",
                            '-144px',
                            '-144px'
                        ],
                        [
                            "eid17",
                            "top",
                            4000,
                            0,
                            "linear",
                            "${numbers_1}",
                            '-144px',
                            '-144px'
                        ],
                        [
                            "eid25",
                            "top",
                            5000,
                            0,
                            "linear",
                            "${numbers_1}",
                            '-144px',
                            '-144px'
                        ],
                        [
                            "eid36",
                            "top",
                            6500,
                            0,
                            "linear",
                            "${numbers_1}",
                            '-144px',
                            '-144px'
                        ],
                        [
                            "eid10",
                            "top",
                            0,
                            0,
                            "linear",
                            "${numbers_2}",
                            '-27px',
                            '-27px'
                        ],
                        [
                            "eid14",
                            "top",
                            4000,
                            0,
                            "linear",
                            "${numbers_2}",
                            '-27px',
                            '-27px'
                        ],
                        [
                            "eid34",
                            "top",
                            6500,
                            0,
                            "linear",
                            "${numbers_2}",
                            '-27px',
                            '-27px'
                        ],
                        [
                            "eid48",
                            "scaleY",
                            7000,
                            0,
                            "linear",
                            "${numbers_blurCopy}",
                            '1',
                            '1'
                        ],
                        [
                            "eid44",
                            "scaleY",
                            7500,
                            0,
                            "linear",
                            "${numbers_blurCopy}",
                            '1',
                            '1'
                        ],
                        [
                            "eid98",
                            "display",
                            0,
                            0,
                            "linear",
                            "${numbers_22}",
                            'none',
                            'none'
                        ],
                        [
                            "eid100",
                            "display",
                            7500,
                            0,
                            "linear",
                            "${numbers_22}",
                            'none',
                            'block'
                        ],
                        [
                            "eid85",
                            "background-position",
                            7500,
                            424,
                            "linear",
                            "${numbers_22Copy2}",
                            [0,0],
                            [0,-31.000943546875],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid88",
                            "background-position",
                            7924,
                            76,
                            "linear",
                            "${numbers_22Copy2}",
                            [0,-31.000943546875],
                            [0,-44.97509765625],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid22",
                            "background-position",
                            4000,
                            880,
                            "easeInQuad",
                            "${numbers_2}",
                            [0,0],
                            [0,-127.37217725],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid23",
                            "background-position",
                            4880,
                            120,
                            "linear",
                            "${numbers_2}",
                            [0,-127.37217725],
                            [0,-118.59375],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid37",
                            "background-position",
                            6500,
                            500,
                            "linear",
                            "${numbers_2}",
                            [0,-118.59375],
                            [0,-162.19653320312],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid97",
                            "display",
                            0,
                            0,
                            "linear",
                            "${numbers_22Copy2}",
                            'none',
                            'none'
                        ],
                        [
                            "eid99",
                            "display",
                            7500,
                            0,
                            "linear",
                            "${numbers_22Copy2}",
                            'none',
                            'block'
                        ],
                        [
                            "eid82",
                            "clip",
                            7500,
                            0,
                            "linear",
                            "${numbers_22Copy2}",
                            [13,48,208,0],
                            [13,48,208,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid91",
                            "clip",
                            8000,
                            0,
                            "linear",
                            "${numbers_22Copy2}",
                            [13,48,208,0],
                            [13,48,208,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid2",
                            "left",
                            0,
                            0,
                            "linear",
                            "${numbers_1}",
                            '68px',
                            '68px'
                        ],
                        [
                            "eid16",
                            "left",
                            4000,
                            0,
                            "linear",
                            "${numbers_1}",
                            '68px',
                            '68px'
                        ],
                        [
                            "eid26",
                            "left",
                            5000,
                            0,
                            "linear",
                            "${numbers_1}",
                            '68px',
                            '68px'
                        ],
                        [
                            "eid29",
                            "left",
                            6500,
                            0,
                            "linear",
                            "${numbers_1}",
                            '68px',
                            '68px'
                        ],
                        [
                            "eid95",
                            "display",
                            0,
                            0,
                            "linear",
                            "${numbers_blurCopy}",
                            'none',
                            'none'
                        ],
                        [
                            "eid69",
                            "display",
                            7000,
                            0,
                            "linear",
                            "${numbers_blurCopy}",
                            'none',
                            'block'
                        ],
                        [
                            "eid71",
                            "display",
                            7500,
                            0,
                            "linear",
                            "${numbers_blurCopy}",
                            'block',
                            'block'
                        ],
                        [
                            "eid73",
                            "display",
                            7648,
                            0,
                            "linear",
                            "${numbers_blurCopy}",
                            'block',
                            'none'
                        ],
                        [
                            "eid47",
                            "scaleX",
                            7000,
                            0,
                            "linear",
                            "${numbers_blurCopy}",
                            '1',
                            '1'
                        ],
                        [
                            "eid46",
                            "scaleX",
                            7500,
                            0,
                            "linear",
                            "${numbers_blurCopy}",
                            '1',
                            '1'
                        ],
                        [
                            "eid96",
                            "display",
                            0,
                            0,
                            "linear",
                            "${numbers_blur}",
                            'none',
                            'none'
                        ],
                        [
                            "eid70",
                            "display",
                            7000,
                            0,
                            "linear",
                            "${numbers_blur}",
                            'none',
                            'block'
                        ],
                        [
                            "eid72",
                            "display",
                            7500,
                            0,
                            "linear",
                            "${numbers_blur}",
                            'block',
                            'block'
                        ],
                        [
                            "eid74",
                            "display",
                            7648,
                            0,
                            "linear",
                            "${numbers_blur}",
                            'block',
                            'none'
                        ],
                        [
                            "eid55",
                            "display",
                            4000,
                            0,
                            "linear",
                            "${numbers_2}",
                            'block',
                            'block'
                        ],
                        [
                            "eid58",
                            "display",
                            6500,
                            0,
                            "linear",
                            "${numbers_2}",
                            'block',
                            'block'
                        ],
                        [
                            "eid59",
                            "display",
                            7105,
                            0,
                            "linear",
                            "${numbers_2}",
                            'block',
                            'none'
                        ],
                        [
                            "eid84",
                            "left",
                            7500,
                            0,
                            "linear",
                            "${numbers_22Copy2}",
                            '182px',
                            '182px'
                        ],
                        [
                            "eid89",
                            "left",
                            8000,
                            0,
                            "linear",
                            "${numbers_22Copy2}",
                            '182px',
                            '182px'
                        ],
                        [
                            "eid67",
                            "clip",
                            7500,
                            0,
                            "linear",
                            "${numbers_22}",
                            [13,48,208,0],
                            [13,48,208,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid94",
                            "clip",
                            8000,
                            0,
                            "linear",
                            "${numbers_22}",
                            [13,48,208,0],
                            [13,48,208,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid40",
                            "background-position",
                            6500,
                            500,
                            "linear",
                            "${numbers_1}",
                            [0,0],
                            [0,-26.365966796875],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid51",
                            "scaleY",
                            7000,
                            0,
                            "linear",
                            "${numbers_blur}",
                            '1',
                            '1'
                        ],
                        [
                            "eid43",
                            "scaleY",
                            7500,
                            0,
                            "linear",
                            "${numbers_blur}",
                            '1',
                            '1'
                        ],
                        [
                            "eid54",
                            "background-position",
                            7000,
                            500,
                            "linear",
                            "${numbers_blurCopy}",
                            [0,0],
                            [0,-42.2578125],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid86",
                            "background-position",
                            7500,
                            424,
                            "linear",
                            "${numbers_22}",
                            [0,0],
                            [0,-54.261133203125],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid87",
                            "background-position",
                            7924,
                            76,
                            "linear",
                            "${numbers_22}",
                            [0,-54.261133203125],
                            [0,-44.6875],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid5",
                            "clip",
                            0,
                            0,
                            "linear",
                            "${numbers_1}",
                            [169,50,369,0],
                            [169,50,369,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid18",
                            "clip",
                            4000,
                            0,
                            "linear",
                            "${numbers_1}",
                            [169,50,369,0],
                            [169,50,369,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid24",
                            "clip",
                            5000,
                            0,
                            "linear",
                            "${numbers_1}",
                            [169,50,369,0],
                            [169,50,369,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid27",
                            "clip",
                            6500,
                            0,
                            "linear",
                            "${numbers_1}",
                            [169,50,369,0],
                            [169,50,369,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid50",
                            "scaleX",
                            7000,
                            0,
                            "linear",
                            "${numbers_blur}",
                            '1',
                            '1'
                        ],
                        [
                            "eid45",
                            "scaleX",
                            7500,
                            0,
                            "linear",
                            "${numbers_blur}",
                            '1',
                            '1'
                        ],
                        [
                            "eid62",
                            "top",
                            7500,
                            0,
                            "linear",
                            "${numbers_22}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid93",
                            "top",
                            8000,
                            0,
                            "linear",
                            "${numbers_22}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid53",
                            "background-position",
                            7000,
                            500,
                            "linear",
                            "${numbers_blur}",
                            [0,0],
                            [0,-33.61962890625],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid79",
                            "top",
                            7500,
                            0,
                            "linear",
                            "${numbers_22Copy2}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid90",
                            "top",
                            8000,
                            0,
                            "linear",
                            "${numbers_22Copy2}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid68",
                            "left",
                            7500,
                            0,
                            "linear",
                            "${numbers_22}",
                            '70px',
                            '70px'
                        ],
                        [
                            "eid92",
                            "left",
                            8000,
                            0,
                            "linear",
                            "${numbers_22}",
                            '70px',
                            '70px'
                        ],
                        [
                            "eid12",
                            "clip",
                            0,
                            0,
                            "linear",
                            "${numbers_2}",
                            [53,48,251,0],
                            [53,48,251,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid15",
                            "clip",
                            4000,
                            0,
                            "linear",
                            "${numbers_2}",
                            [53,48,251,0],
                            [53,48,251,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid30",
                            "clip",
                            6500,
                            0,
                            "linear",
                            "${numbers_2}",
                            [53,48,251,0],
                            [53,48,251,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid56",
                            "display",
                            4000,
                            0,
                            "linear",
                            "${numbers_1}",
                            'block',
                            'block'
                        ],
                        [
                            "eid57",
                            "display",
                            6500,
                            0,
                            "linear",
                            "${numbers_1}",
                            'block',
                            'block'
                        ],
                        [
                            "eid60",
                            "display",
                            7105,
                            0,
                            "linear",
                            "${numbers_1}",
                            'block',
                            'none'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("touch_report_animate_edgeActions.js");
})("EDGE-25100281");
