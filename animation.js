function setup() {
  createCanvas(windowWidth, windowHeight);;
  controls_init();
  input_points_init();
  user_input_init();
  valid_triangles_init();
}
  
function draw() {
  background(palette.backgroundColor);
  translate(windowWidth/2, windowHeight/2);
  scale(1, -1);

  trueMouseX = (mouseX - windowWidth/2);
  trueMouseY = -(mouseY - windowHeight/2);

  if (projectMode.circumcircleExplorer) draw_circumcircle_explorer();
  if (projectMode.convexHull) convex_hull_explorer();


  if (projectMode.delaunayTriangulation) 
  {
    background(0);
    construct_delaunay();

    if (controls.showSegments) {
      validTriangles.forEach(t => t.show())
    }

    if (controls.showCircumcircle) {
      validTriangles.forEach(t => t.drawCircumcircle())
    };
  

    if (controls.showSites) {
      inputPoints.forEach(p => p.show())
    }
  
    if(controls.showLabels) {
      inputPoints.forEach(p => p.showLabel())
    }

    noLoop();
  }

}

