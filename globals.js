let edgeLength = 100000;
let input_A;
let input_B;
let input_C;
let AB;
let BC;
let AC;
let ABC;
let BCA;
let CAB;
let trueMouseX;
let trueMouseY;

let controls = {
    showCircumcircle: true,
    showBisectors: false,
    showSegments: true,
    showMidpoints: false,
    showIntersection: false,
    showSites: true,
    showLabels: true
};

palette = { 
    backgroundColor: "#0e0e16",
    circumcircleColor: "#ffffff",
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

let n = 10; // number of inputs
let samplePoints = [];
let inputPoints = [];
let validTriangles = [];

