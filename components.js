class PointObj {
    constructor (x, y, label = "") {
        this.x = x;
        this.y = y;
        this.r = 15;
        this.label = label
        this.selected = false;
    }

    show() {
        push();
        fill(palette.siteFillColor);
        stroke(palette.siteColor);
        strokeWeight(3);
        ellipse(this.x, this.y, this.r, this.r);
        pop();
    }

    showLabel() {
        push();
        
        translate(this.x, this.y)
        scale(1, -1);

        noStroke();
        fill(palette.labelColor);
        textSize(32);
        text(this.label, 30, 0)

        pop();
    }


}

class SegmentObj {
    constructor (site_1, site_2, label = "") {
        this.site_1 = site_1;
        this.site_2 = site_2;
        this.coeffiecients = this.getStandardFormOfBisector();
    }


    getMidpointVec() {
        let midx = (this.site_1.x + this.site_2.x)/2;
        let midy = (this.site_1.y + this.site_2.y)/2;
        return createVector(midx, midy);
    }

    getNumericSlope(vec) {
        return vec.y/vec.x;
    }

    getPerpendicularVec() {
        return this.getSlopeVec().rotate(-PI/2);
    }

    getSlopeVec() {
        return createVector(this.site_2.x - this.site_1.x, this.site_2.y - this.site_1.y);
    }

    getSegmentLength() {
        let slopeVec = this.getSlopeVec();
        return Math.sqrt(Math.pow(slopeVec.x, 2) + Math.pow(slopeVec.y, 2));
    }

    getStandardFormOfBisector() {
        let A;
        let B;
        let C;

        let perpendicularVec = this.getPerpendicularVec();
        let midpoint = this.getMidpointVec();

        // If the x component of the vector is 0
        // then there is no difference between the x values of the sites
        // therefore the line is vertical
        if (perpendicularVec.x == 0) {
            A = 1;
            B = 0;
            C = midpoint.x;
        }
        else {
            A = -this.getNumericSlope(perpendicularVec);
            B = 1;
            C = -this.getNumericSlope(perpendicularVec) * midpoint.x + midpoint.y; // y intercept =  -mx + y
        }

        return {A: A, B: B, C: C}; // Ax + By = C
    }    
    
    drawMidpoint() {
        push();
        let midpoint = this.getMidpointVec();
        fill(0);
        stroke(palette.midpointColor);
        strokeWeight(2);
        ellipse(midpoint.x, midpoint.y, 15, 15);
        pop();
    }

    drawSlopeVec() {
        let slopeVec = this.getSlopeVec();
        this.drawVec(this.site_2, slopeVec, palette.segmentColor)
    }

    drawVec(base, vec, myColor) {
        push();
        stroke(myColor);
        strokeWeight(1);
        fill(myColor);
        translate(base.x, base.y);
        rotate(PI);
        line(0, 0, vec.x, vec.y);
        if(hiddenControls.showArrowTip) {
            rotate(vec.heading());
            let arrowSize = 20;
            translate(vec.mag() - arrowSize, 0);
            triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        }
        pop();
    }

}

class TriangleObj {
    constructor (pair_1, pair_2) {
        this.pair_1 = pair_1;
        this.pair_2 = pair_2;
        this.pair_3 = new SegmentObj(pair_1.site_1, pair_2.site_2);
        this.label = this.getLabel();
        this.circumcenter = this.getIntersection();
        this.circumcircleRadius = this.getCircumcirleRadius()
    }

    show() {
        this.pair_1.drawSlopeVec();
        this.pair_2.drawSlopeVec();
        this.pair_3.drawSlopeVec();
    }

    getLabel() {
        return this.pair_1.site_1.label + "-" + this.pair_1.site_2.label + "-" + this.pair_2.site_2.label;
    }

    getIntersection() {
        let A = math.matrix([[this.pair_1.coeffiecients.A, this.pair_1.coeffiecients.B], [this.pair_2.coeffiecients.A, this.pair_2.coeffiecients.B]]);
        
        let intersection;

        if (math.det(A) != 0) {
            let Ainv = math.inv(A);
            let b = math.matrix([[this.pair_1.coeffiecients.C],[this.pair_2.coeffiecients.C]]);
            intersection = math.multiply(Ainv, b);
        } 
        else {
            intersection = null;
            return null;
        }

        return createVector(intersection._data[0][0], intersection._data[1][0]);
    }

    drawIntersection() {
        let intersection = this.getIntersection()

        if (intersection != null) {
            push();
            fill(0);
            stroke(palette.intersectionColor);
            strokeWeight(2);
            ellipse(intersection.x, intersection.y, 15, 15);
            pop();
        }

    }

    drawBisectorFromIntersection() {
        let intersection = this.getIntersection();
        if (intersection != null) {
            let intersectToMidpointVec = this.getIntersectToMidpointVec();
            this.drawLine(intersection, intersectToMidpointVec, palette.bisectorColor);
        }
        else {
            console.log('Intersection is null');
        }
    }

    getIntersectToMidpointVec() {
        let intersection = this.getIntersection();
        let midpoint = this.pair_3.getMidpointVec();
        return createVector(intersection.x - midpoint.x, intersection.y -  midpoint.y);
    }

    drawLine(base, vec, myColor) {
        push();
        stroke(myColor);
        strokeWeight(2);
        fill(myColor);
        translate(base.x, base.y);
        rotate(PI);
        let edgeLength = 100000;
        vec.setMag(edgeLength);

        let needsFlip = this.getNeedsFlip();

        if (needsFlip) {
            line(0, 0, -vec.x, -vec.y);
        }
        else {
            line(0, 0, vec.x, vec.y);
        }
        pop();
    }

    getNeedsFlip() {
        let angle = this.getAngleBetween();
        return (angle > -PI && angle < -PI/2) || (angle > PI/2 && angle < PI);
    }

    getAngleBetween() {
        let v1 = this.pair_1.getSlopeVec().mult(-1);
        let v2 = this.pair_2.getSlopeVec();
        let angle = v1.angleBetween(v2);
        return angle;
    }

    displayAngleBetweenValue() {
        let angle = this.getAngleBetween();
        push();
        stroke(255);
        fill(255);
        scale(1, -1);
        textSize(32);
        text(parseFloat(angle).toFixed(2), -600, -200);
        pop();
    }


    drawCircumcircle() {
        let intersection = this.getIntersection();
        if (intersection != null) {
            push();
            noFill();
            stroke(palette.circumcircleColor);
            let r = this.getCircumcirleRadius();
            ellipse(intersection.x, intersection.y, 2*r, 2*r)
            pop();
        }
    }


    getCircumcirleRadius() {
        let x = this.pair_1.site_1.x;
        let y = this.pair_1.site_1.y;
        // Null reference bug discovered while stress testing
        return Math.sqrt(Math.pow(this.circumcenter.x - x, 2) + Math.pow(this.circumcenter.y - y, 2)); 
    }

    pointIsInCircumcircle(testPoint) {
        return dist(testPoint.x, testPoint.y, this.circumcenter.x, this.circumcenter.y) < this.circumcircleRadius
    }
    
}

class PointCloud {
    constructor(points) {
        this.points = points;
    }

    getInitialVertex() {
        let leftMost = this.points[0];
        this.points.forEach(p => {
            if (p.x < leftMost.x) leftMost = p
        });
        return leftMost;
    }

    getConvexHull() {
        if (this.points.length < 3) 
        {
            return;
        }

        let convexHullPoints = [];
        let convexHullEdges = [];

        let initialVertex = this.getInitialVertex();
        let currentVertex = initialVertex;
        let nextVertex = this.points.filter(p => p != initialVertex)[0];

        for (let i = 0; i < this.points.length + 1; i++) {
            if (nextVertex == initialVertex) 
            {
                convexHullPoints.push(nextVertex);
                break;
            }
            else 
            {
                this.points.forEach(candidateVertex =>
                    {
                        if (this.reassignNext(nextVertex, currentVertex, candidateVertex)) {
                            nextVertex = candidateVertex;
                        }
                    });
                    convexHullPoints.push(currentVertex)
                    convexHullEdges.push(new SegmentObj(currentVertex, nextVertex))
                    currentVertex = nextVertex;
            }

        }
        return {"points": convexHullPoints, "edges": convexHullEdges};
        
    }

    drawConvexHull() {
        beginShape();
        noFill();
        stroke("#ffffff");
        strokeWeight(2);
        let convexHull = this.getConvexHull()
        convexHull.points.forEach(p => vertex(p.x, p.y))
        endShape();
    }

    drawEdge(v1, v2, color) {
        push();
        stroke(color);
        strokeWeight(2)
        line(v1.x, v1.y, v2.x, v2.y);
        pop();
    }


    reassignNext(next, current, candidate) {
        let nextVertexVec = createVector(next.x, next.y)
        let currentVertexVec = createVector(current.x, current.y)
        let candidateVertexVec = createVector(candidate.x, candidate.y)

        let a = p5.Vector.sub(nextVertexVec, currentVertexVec);
        let b = p5.Vector.sub(candidateVertexVec, currentVertexVec);
        let cross = a.cross(b);
        return cross.z < 0 || current == next
    }
    
}

class Triangulation {
    constructor(triangles) {
        this.triangles = triangles;
    }

    getPointCloud() {
        let ret = [];
        this.triangles.forEach(t => {
          ret.push(t.pair_1.site_1)
          ret.push(t.pair_1.site_2)
          ret.push(t.pair_2.site_2)
        });
        
        return new PointCloud(ret);
    }
}
  
