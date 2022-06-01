function setup() {
  createCanvas(windowWidth, windowHeight);
  controls_init();
  input_points_init();
  valid_triangles_init();
  construct_delaunay();
}
  
function draw() {
  background(palette.backgroundColor);
  translate(windowWidth/2, windowHeight/2);
  scale(1, -1);

  trueMouseX = (mouseX - windowWidth/2);
  trueMouseY = -(mouseY - windowHeight/2);

  update_super_triangle();

  if (controls.showCircumcircle) ABC.drawCircumcircle(); // This method can be called on ony permutation of ABC

  // if (controls.showBisectors){
  //   ABC.drawBisectorFromIntersection();
  //   BCA.drawBisectorFromIntersection();
  //   CAB.drawBisectorFromIntersection();
  // }

  if (controls.showSegments) {
    AB.drawSlopeVec();
    BC.drawSlopeVec();
    CA.drawSlopeVec();  
  }

  // if (controls.showMidpoints) {
  //   AB.drawMidpoint();
  //   BC.drawMidpoint();
  //   CA.drawMidpoint();
  // }
  
  // if (controls.showIntersection) ABC.drawIntersection(); // This method can be called on ony permutation of ABC

  if (controls.showSites) {
    inputPoints.forEach(p => p.show())
  }

  if(controls.showLabels) {
    input_A.showLabel();
    input_B.showLabel();
    input_C.showLabel();
  }
  
}

function input_points_init() {
  let vec = createVector(0, 300);
  
  vec.rotate(2 * PI / 3);
  input_A = new PointObj(vec.x, vec.y, 'A');
  inputPoints.push(input_A);

  vec.rotate(2 * PI / 3);
  input_B = new PointObj(vec.x, vec.y, 'B');
  inputPoints.push(input_B);

  vec.rotate(2 * PI / 3);
  input_C = new PointObj(vec.x, vec.y, 'C');
  inputPoints.push(input_C);
}

function valid_triangles_init() {
  AB = new SegmentObj(input_A, input_B);
  BC = new SegmentObj(input_B, input_C);
  ABC = new TriangleObj(AB, BC);
  validTriangles.push(ABC);
}

// Used to update anything that is instantiated with inputs A, B, or C
function update_super_triangle() {
  AB = new SegmentObj(input_A, input_B);
  BC = new SegmentObj(input_B, input_C);
  CA = new SegmentObj(input_C, input_A);

  ABC = new TriangleObj(AB, BC);
  BCA = new TriangleObj(BC, CA);
  CAB = new TriangleObj(CA, AB);
}

function construct_delaunay() {
  for (let i = 0; i < n; i++) {
    let newPoint = new PointObj(random(-windowWidth/2, windowWidth/2), random(-windowHeight/2, windowHeight/2));
    inputPoints.push(newPoint);
    validTriangles.forEach(t => {
      if (t.pointIsInCircumcircle(newPoint)) {
        console.log(true);
      }
    })
  }
}