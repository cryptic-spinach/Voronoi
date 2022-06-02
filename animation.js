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

  draw_circumcircle_explorer();

  // if (controls.showSites) {
  //   inputPoints.forEach(p => p.show())
  // }

  // if(controls.showLabels) {
  //   inputPoints.forEach(p => p.showLabel())
  // }
  
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


function construct_delaunay() {
  for (let i = 0; i < n; i++) {
    let invalidTriangles = [];
    let newPoint = new PointObj(random(-windowWidth/2 + 100, windowWidth/2 - 100), random(-windowHeight/2 + 100, windowHeight/2 - 100), i.toString());
    inputPoints.push(newPoint);
    validTriangles.forEach(t => {
      if (t.pointIsInCircumcircle(newPoint)) {
        invalidTriangles.push(t)
      }
    });
    let pointCloud = get_point_cloud(invalidTriangles);
  }
  
}

function get_point_cloud(triangles) {
  let ret = [];
  triangles.forEach(t => {
    ret.push(t.pair_1.site_1)
    ret.push(t.pair_1.site_2)
    ret.push(t.pair_2.site_2)
  });
  console.log(ret);
}
