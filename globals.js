let edgeLength;
let site_A;
let site_B;
let site_C;
let AB;
let BC;
let AC;
let ABC;
let BCA;
let CAB;
let trueMouseX;
let trueMouseY;

let controls = {
    showCircumcircle: false,
    showBisectors: false,
    showSegments: false,
    showMidpoints: false,
    showIntersection: false,
    showSites: true,
    showLabels: true
};

palette = { 
    backgroundColor: "#0e0e16",
    circumcircleColor: "#b31a1a",
    bisectorColor: "#7181ff",
    segmentColor: "#20c5c5",
    midpointColor: "#00ff91",
    intersectionColor: "#ffffff", 
    siteColor: "#ff970c", 
    labelColor: "#1fced9" 
}

let hiddenControls = {
    showArrowTip: false
};