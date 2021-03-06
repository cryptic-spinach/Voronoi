function input_points_init() {
    let vec = createVector(0, r);
    
    vec.rotate(2 * PI / 3);
    input_A = new PointObj(vec.x, vec.y, 'A');
    
    vec.rotate(2 * PI / 3);
    input_B = new PointObj(vec.x, vec.y, 'B');
    
    vec.rotate(2 * PI / 3);
    input_C = new PointObj(vec.x, vec.y, 'C');   

    inputPoints.push(input_A);
    inputPoints.push(input_B);
    inputPoints.push(input_C); 

    generate_inputs(hiddenControls.generateRadially);
  }

  function generate_inputs(radial) {
    if (radial) 
    {
      for (let i = 0; i < n; i++) {
        let vec = createVector(random(-1, 1), random(-1, 1));
        vec.setMag(random(r - 20));
        let newPoint = new PointObj(vec.x, vec.y, i.toString());
        inputPoints.push(newPoint);
      }
    } 
    else 
    {
      for (let i = 0; i < n; i++) {
        let bufferX = 400;
        let bufferY = 200;
        let newPoint = new PointObj(random(-windowWidth/2 + bufferX, windowWidth/2 - bufferX), random(-windowHeight/2 + bufferY, windowHeight/2 - bufferY), i.toString());
        inputPoints.push(newPoint);
      }
    }
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

function draw_circumcircle_explorer() {
    update_super_triangle();

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

function convex_hull_explorer() {
  inputPoints[0] = new PointObj(trueMouseX, trueMouseY, "A");
  let pointCloud = new PointCloud(inputPoints);

  pointCloud.drawConvexHull();

  if (controls.showSites) {
    inputPoints.forEach(p => p.show())
  }

  if(controls.showLabels) {
    inputPoints.forEach(p => p.showLabel())
  }
}

function construct_delaunay() {
  let inputPointCloud = new PointCloud(inputPoints);
  let inputPointHull = inputPointCloud.getConvexHull();
  let inputPointHullLabels = inputPointHull.edges.map(p => p.site_1.label)

  for (let i = 0; i < inputPoints.length; i++) {
    let invalidTriangles = [];
    let newPoint = inputPoints[i];

    if (!inputPointHullLabels.includes(newPoint.label)) 
    {
      // Get deletes
      validTriangles.forEach(t => {
        if (t.pointIsInCircumcircle(newPoint)) {
          invalidTriangles.push(t); 
        }
      });
      
      // Get adds
      let newTriangles = invalid_to_valid(invalidTriangles, newPoint);

      // Delete
      validTriangles = validTriangles.filter(t => !invalidTriangles.includes(t));
      
      // Add
      newTriangles.forEach(t => {
        validTriangles.push(t)
      })
    }
    else 
    {
      // console.log(newPoint.label + " is on the hull")
      get_outer_triangle(newPoint, inputPointHull, inputPointHullLabels);
    }
  }
  
}

function get_outer_triangle(newPoint, inputPointHull, inputPointHullLabels) {
  let outerTriangleIndex = inputPointHullLabels.indexOf(newPoint.label)
  // let seg_1 = new SegmentObj(inputPointHull)
  // console.log(outerTriangleIndex);
  // console.log(inputPointHullLabels);
}

function invalid_to_valid(invalidTriangles, newPoint) {
  let invalidTriangulation = new Triangulation(invalidTriangles)
  let pointCloud = invalidTriangulation.getPointCloud();
  let hull = pointCloud.getConvexHull();
  let newTriangles = construct_replacement_triangles(hull, newPoint);
  return newTriangles;
}


function construct_replacement_triangles(hull, newPoint) {
  if (hull != null) 
  {
    let newTriangles = [];
    for (let j = 0; j < hull.edges.length; j++) {
      let seg_1 = new SegmentObj(hull.edges[j].site_1, newPoint);
      let seg_2 = new SegmentObj(newPoint, hull.edges[j].site_2);
      newTriangles.push(new TriangleObj(seg_1, seg_2));
    }

    return newTriangles;
  }
  else {
    return []
  }
}