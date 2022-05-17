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
    if (dist(site_A.x, site_A.y, trueMouseX, trueMouseY) < site_A.r) {
        site_A.selected = true;
    }
    if (dist(site_B.x, site_B.y, trueMouseX, trueMouseY) < site_B.r) {
        site_B.selected = true;
    }
    if (dist(site_C.x, site_C.y, trueMouseX, trueMouseY) < site_C.r) {
        site_C.selected = true;
    }
}

function mouseDragged() {
    if (site_A.selected) {
        site_A.x = trueMouseX;
        site_A.y = trueMouseY;
    }
    if (site_B.selected) {
        site_B.x = trueMouseX;
        site_B.y = trueMouseY;
    }
    if (site_C.selected) {
        site_C.x = trueMouseX;
        site_C.y = trueMouseY;
    }
}

function mouseReleased() {
    site_A.selected = false;
    site_B.selected = false;
    site_C.selected = false;
}