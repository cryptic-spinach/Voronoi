function setup() {
  createCanvas(windowWidth, windowHeight);
  edgeLength = 100000;

  controls_init();

  site_A = new Site(150, 150, 'A');
  site_B = new Site(-150, -150, 'B');
  site_C = new Site(500, -100, 'C');
}
  
function draw() {
  background(palette.backgroundColor);
  translate(windowWidth/2, windowHeight/2);
  scale(1, -1);

  trueMouseX = (mouseX - windowWidth/2);
  trueMouseY = -(mouseY - windowHeight/2);

  AB = new SitePair(site_A, site_B);
  BC = new SitePair(site_B, site_C);
  CA = new SitePair(site_C, site_A);

  ABC = new Intersection(AB, BC);
  BCA = new Intersection(BC, CA);
  CAB = new Intersection(CA, AB);


  if (controls.showCircumcircle) ABC.drawCircumcircle(); // This method can be called on ony permutation of ABC

  if (controls.showBisectors){
    ABC.drawBisectorFromIntersection();
    BCA.drawBisectorFromIntersection();
    CAB.drawBisectorFromIntersection();
  }

  if (controls.showSegments) {
    AB.drawSlopeVec();
    BC.drawSlopeVec();
    CA.drawSlopeVec();  
  }

  if (controls.showMidpoints) {
    AB.drawMidpoint();
    BC.drawMidpoint();
    CA.drawMidpoint();
  }
  
  if (controls.showIntersection) ABC.drawIntersection(); // This method can be called on ony permutation of ABC

  if (controls.showSites) {
    site_A.show();
    site_B.show();
    site_C.show();
  }

  if(controls.showLabels) {
    site_A.showLabel();
    site_B.showLabel();
    site_C.showLabel();
  }
  
}