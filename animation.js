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

  if (projectMode.circumcircleExplorer) draw_circumcircle_explorer();

  if (projectMode.convexHull) 
  {
    let pointCloud = new PointCloud(inputPoints)
    pointCloud.getConvexHull();
  
    if (controls.showSites) {
      inputPoints.forEach(p => p.show())
    }
  
    // if(controls.showLabels) {
    //   inputPoints.forEach(p => p.showLabel())
    // }
  }


  
  
}


function construct_delaunay() {
  for (let i = 0; i < n; i++) {
    let invalidTriangles = [];
    let bufferX = 200;
    let bufferY = 100;
    let newPoint = new PointObj(random(-windowWidth/2 + bufferX, windowWidth/2 - bufferX), random(-windowHeight/2 + bufferY, windowHeight/2 - bufferY), i.toString());
    inputPoints.push(newPoint);
    // validTriangles.forEach(t => {
    //   if (t.pointIsInCircumcircle(newPoint)) {
    //     invalidTriangles.push(t)
    //   }
    // });
    // let invalidTriangulation = new Triangulation(invalidTriangles)
    // let pointCloud = invalidTriangulation.getPointCloud();
  }
}

