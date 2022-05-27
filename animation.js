function setup() {
  createCanvas(windowWidth, windowHeight);
  edgeLength = 100000;

  controls_init();


  let vec = createVector(0, 300);

  vec.rotate(0);
  input_A = new PointObj(vec.x, vec.y, 'A');
  vec.rotate(2 * PI / 3);
  input_B = new PointObj(vec.x, vec.y, 'B');
  vec.rotate(2 * PI / 3);
  input_C = new PointObj(vec.x, vec.y, 'C');
}
  
function draw() {
  background(palette.backgroundColor);
  translate(windowWidth/2, windowHeight/2);
  scale(1, -1);

  trueMouseX = (mouseX - windowWidth/2);
  trueMouseY = -(mouseY - windowHeight/2);

  AB = new SegmentObj(input_A, input_B);
  BC = new SegmentObj(input_B, input_C);
  CA = new SegmentObj(input_C, input_A);

  ABC = new TriangleObj(AB, BC);
  BCA = new TriangleObj(BC, CA);
  CAB = new TriangleObj(CA, AB);


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
    input_A.show();
    input_B.show();
    input_C.show();
  }

  if(controls.showLabels) {
    input_A.showLabel();
    input_B.showLabel();
    input_C.showLabel();
  }
  
}