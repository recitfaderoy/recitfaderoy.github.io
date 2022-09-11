(() => {
  // src/CSG/CSG.js
  var CSG = class {
    constructor() {
      this.polygons = [];
      this.material = [];
    }
    setFromGeometry(geometry) {
      if (!(geometry instanceof BufferGeometry)) {
        console.error("This library only works with three.js BufferGeometry");
        return;
      }
      if (geometry.index !== null) {
        geometry = geometry.toNonIndexed();
      }
      const positions = geometry.attributes.position;
      const normals = geometry.attributes.normal;
      const uvs = geometry.attributes.uv;
      function createVertex(index) {
        const position = new Vector3(positions.getX(index), positions.getY(index), positions.getZ(index));
        const normal = normals ? new Vector3(normals.getX(index), normals.getY(index), normals.getZ(index)) : null;
        const uv = uvs ? new Vector2(uvs.getX(index), uvs.getY(index)) : null;
        return new Vertex(position, normal, uv);
      }
      for (let i = 0; i < positions.count; i += 3) {
        const v1 = createVertex(i);
        const v2 = createVertex(i + 1);
        const v3 = createVertex(i + 2);
        this.polygons.push(new Polygon([v1, v2, v3]));
      }
      return this;
    }
    setFromMesh(mesh) {
      mesh.updateWorldMatrix();
      const transformedGeometry = mesh.geometry.clone();
      transformedGeometry.applyMatrix4(mesh.matrix);
      this.material.push(mesh.material);
      this.setFromGeometry(transformedGeometry);
      return this;
    }
    setPolygons(polygons) {
      this.polygons = polygons;
      return this;
    }
    toMesh() {
      return new Mesh(this.toGeometry(), this.material[0]);
    }
    toGeometry() {
      const geometry = new BufferGeometry();
      const positions = [];
      const normals = [];
      const uvs = [];
      const createFace = (a, b, c) => {
        positions.push(a.pos.x, a.pos.y, a.pos.z, b.pos.x, b.pos.y, b.pos.z, c.pos.x, c.pos.y, c.pos.z);
        if (a.normal) {
          normals.push(a.normal.x, a.normal.y, a.normal.z, b.normal.x, b.normal.y, b.normal.z, c.normal.x, c.normal.y, c.normal.z);
        }
        if (a.uv) {
          uvs.push(a.uv.x, a.uv.y, b.uv.x, b.uv.y, c.uv.x, c.uv.y);
        }
      };
      for (const polygon of this.polygons) {
        for (let i = 0; i <= polygon.vertices.length - 3; i++) {
          createFace(polygon.vertices[0], polygon.vertices[i + 1], polygon.vertices[i + 2]);
        }
      }
      geometry.setAttribute("position", new BufferAttribute(new Float32Array(positions), 3));
      if (normals.length) {
        geometry.setAttribute("normal", new BufferAttribute(new Float32Array(normals), 3));
      }
      if (uvs.length) {
        geometry.setAttribute("uv", new BufferAttribute(new Float32Array(uvs), 2));
      }
      return geometry;
    }
    clone() {
      const csg = new CSG();
      csg.polygons = this.polygons.map(function(p) {
        return p.clone();
      });
      return csg;
    }
    union(operands) {
      for (const operand of operands) {
        if (!this.polygons.length) {
          this.setFromMesh(operand);
        } else {
          this.material.push(operand.material);
          this.unionOperand(new CSG().setFromMesh(operand));
        }
      }
      return this;
    }
    unionOperand(operand) {
      const a = new BSPNode(this.polygons);
      const b = new BSPNode(operand.polygons);
      a.clipTo(b);
      b.clipTo(a);
      b.invert();
      b.clipTo(a);
      b.invert();
      a.build(b.allPolygons());
      this.polygons = a.allPolygons();
      return this;
    }
    subtract(operands) {
      for (const operand of operands) {
        if (!this.polygons.length) {
          this.setFromMesh(operand);
        } else {
          this.material.push(operand.material);
          this.subtractOperand(new CSG().setFromMesh(operand));
        }
      }
      return this;
    }
    subtractOperand(operand) {
      this.complement().unionOperand(operand).complement();
    }
    intersect(operands) {
      for (const operand of operands) {
        if (!this.polygons.length) {
          this.setFromMesh(operand);
        } else {
          this.material.push(operand.material);
          this.intersectOperand(new CSG().setFromMesh(operand));
        }
      }
      return this;
    }
    intersectOperand(operand) {
      const a = new BSPNode(this.polygons);
      const b = new BSPNode(operand.polygons);
      const d = new BSPNode(this.clone().polygons);
      const c = new BSPNode(operand.clone().polygons);
      a.invert();
      b.clipTo(a);
      b.invert();
      a.clipTo(b);
      b.clipTo(a);
      a.build(b.allPolygons());
      a.invert();
      c.invert();
      d.clipTo(c);
      d.invert();
      c.clipTo(d);
      d.clipTo(c);
      c.build(d.allPolygons());
      c.invert();
      this.polygons = c.allPolygons().concat(a.allPolygons());
    }
    complement() {
      this.polygons.map((p) => {
        p.negate();
      });
      return this;
    }
  };
})();
