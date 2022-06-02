function controls_init() {
    gui = new dat.GUI();
    gui.width = 300;

    gui.add(controls, "showCircumcircle").name("Circumcircle");
    gui.add(controls, "showBisectors").name("Bisectors");
    gui.add(controls, "showSegments").name("Segments");
    gui.add(controls, "showMidpoints").name("Midpoints");
    gui.add(controls, "showIntersection").name("Circumcenter");
    gui.add(controls, "showSites").name("Sites");
    gui.add(controls, "showLabels").name("Labels");

    // gui.addColor(palette, "backgroundColor").name("Background");

    // gui.addColor(palette, "circumcircleColor").name("Circumcircle");
    // gui.addColor(palette, "bisectorColor").name("Bisector");
    // gui.addColor(palette, "intersectionColor").name("Intersection");
    // gui.addColor(palette, "segmentColor").name("Segments");
    // gui.addColor(palette, "midpointColor").name("Midpoint");
    // gui.addColor(palette, "siteColor").name("Site");
    // gui.addColor(palette, "labelColor").name("Label");
    
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    if (dist(input_A.x, input_A.y, trueMouseX, trueMouseY) < input_A.r) {
        input_A.selected = true;
    }
    if (dist(input_B.x, input_B.y, trueMouseX, trueMouseY) < input_B.r) {
        input_B.selected = true;
    }
    if (dist(input_C.x, input_C.y, trueMouseX, trueMouseY) < input_C.r) {
        input_C.selected = true;
    }
}

function mouseDragged() {
    if (input_A.selected) {
        input_A.x = trueMouseX;
        input_A.y = trueMouseY;
    }
    if (input_B.selected) {
        input_B.x = trueMouseX;
        input_B.y = trueMouseY;
    }
    if (input_C.selected) {
        input_C.x = trueMouseX;
        input_C.y = trueMouseY;
    }
}

function mouseReleased() {
    input_A.selected = false;
    input_B.selected = false;
    input_C.selected = false;
}