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


    inputPoints[0] = new PointObj(trueMouseX, trueMouseY, "A");
    let pointCloud = new PointCloud(inputPoints);

    pointCloud.drawConvexHull();
  
    if (controls.showSites) {
      inputPoints.forEach(p => p.show())
    }
  
    // if(controls.showLabels) {
    //   inputPoints.forEach(p => p.showLabel())
    // }
  }

}

