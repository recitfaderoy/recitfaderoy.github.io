(() => {
    var e = {
            453: (e, t, s) => {
                const i = s(95);

                function r() {
                    this.map = (new THREE.TextureLoader).load("assets/images/" + i.meta.image)
                }
                r.prototype = {
                    getUVConverters: function (e) {
                        return e ? (e = e.replace("brushes/", ""), {
                            convertU: function (t) {
                                var s = i.meta.size,
                                    r = i.frames[e];
                                return (t > 1 || t < 0) && (t = 0), r.frame.x / s.w + t * r.frame.w / s.w
                            },
                            convertV: function (t) {
                                var s = i.meta.size,
                                    r = i.frames[e];
                                return (t > 1 || t < 0) && (t = 0), 1 - (r.frame.y / s.h + t * r.frame.h / s.h)
                            }
                        }) : {
                            convertU: function (e) {
                                return e
                            },
                            convertV: function (e) {
                                return e
                            }
                        }
                    }
                }, window.atlas = new r
            },
            967: () => {
                window.BinaryManager = function (e) {
                    this.dataview = new DataView(e), this.offset = 0, this.isLittleEndian = !0
                }, window.BinaryManager.prototype = {
                    readQuaternion: function () {
                        return new THREE.Quaternion(this.readFloat(), this.readFloat(), this.readFloat(), this.readFloat())
                    },
                    readVector3: function () {
                        return new THREE.Vector3(this.readFloat(), this.readFloat(), this.readFloat())
                    },
                    readString: function () {
                        for (var e = this.dataview.getUint8(this.offset++, !0), t = "", s = 0; s < e; s++) t += String.fromCharCode(this.dataview.getUint8(this.offset++, !0));
                        return t
                    },
                    readColor: function () {
                        return new THREE.Color(this.readFloat(), this.readFloat(), this.readFloat())
                    },
                    readFloat: function () {
                        var e = this.dataview.getFloat32(this.offset, !0);
                        return this.offset += 4, e
                    },
                    readUint32: function () {
                        var e = this.dataview.getUint32(this.offset, !0);
                        return this.offset += 4, e
                    },
                    readUint16: function () {
                        var e = this.dataview.getUint16(this.offset, !0);
                        return this.offset += 2, e
                    },
                    readUint8: function () {
                        var e = this.dataview.getUint8(this.offset, !0);
                        return this.offset++, e
                    },
                    writeVector: function (e) {
                        this.writeFloat32Array(e.toArray())
                    },
                    writeColor: function (e) {
                        this.writeFloat32Array(e.toArray())
                    },
                    writeString: function (e) {
                        this.writeUint8(e.length);
                        for (var t = 0; t < e.length; t++) this.writeUint8(e.charCodeAt(t))
                    },
                    writeUint8: function (e) {
                        this.dataview.setUint8(this.offset, e, this.isLittleEndian), this.offset++
                    },
                    writeUint16: function (e) {
                        this.dataview.setUint16(this.offset, e, this.isLittleEndian), this.offset += 2
                    },
                    writeUint32: function (e) {
                        this.dataview.setUint32(this.offset, e, this.isLittleEndian), this.offset += 4
                    },
                    writeFloat32: function (e) {
                        this.dataview.setFloat32(this.offset, e, this.isLittleEndian), this.offset += 4
                    },
                    writeFloat32Array: function (e) {
                        for (var t = 0; t < e.length; t++) this.writeFloat32(e[t])
                    },
                    getDataView: function () {
                        return this.dataview
                    }
                }
            },
            830: () => {
                AFRAME.registerBrush("cubes", {
                    init: function (e, t) {
                        this.material = new THREE.MeshStandardMaterial({
                            color: this.data.color,
                            roughness: .5,
                            metalness: .5,
                            side: THREE.DoubleSide,
                            flatShading: !0
                        }), this.geometry = new THREE.BoxGeometry(1, 1, 1), this.drawingEl = document.querySelector(".a-drawing"), this.drawingEl.object3D.add(this.object3D)
                    },
                    addPoint: function (e, t, s, i, r) {
                        var a = new THREE.Mesh(this.geometry, this.material),
                            n = i * this.data.size * Math.random();
                        return a.scale.set(n, n, n), a.position.copy(s), a.quaternion.copy(t), this.object3D.add(a), !0
                    },
                    undo: function () {
                        this.drawingEl.object3D.children.pop()
                    }
                }, {
                    thumbnail: "brushes/thumb_cubes.gif",
                    spacing: .01
                })
            },
            295: (e, t, s) => {
                var i = s(297),
                    r = s(51);
                ! function () {
                    r((function () {
                        var e = {
                                vertexColors: THREE.VertexColors,
                                side: THREE.DoubleSide
                            },
                            t = {
                                roughness: .75,
                                metalness: .25,
                                vertexColors: THREE.VertexColors,
                                map: window.atlas.map,
                                side: THREE.DoubleSide
                            },
                            s = {
                                roughness: .75,
                                metalness: .25,
                                vertexColors: THREE.VertexColors,
                                side: THREE.DoubleSide,
                                map: window.atlas.map,
                                transparent: !0,
                                alphaTest: .5
                            };
                        i.addSharedBuffer("strip-flat", new THREE.MeshBasicMaterial(e)), i.addSharedBuffer("strip-shaded", new THREE.MeshStandardMaterial(t)), i.addSharedBuffer("strip-textured", new THREE.MeshStandardMaterial(s))
                    }));
                    for (var e, t, s, a, n, o, h = {
                            init: function (e, t) {
                                this.sharedBuffer = i.getSharedBuffer("strip-" + this.materialOptions.type), this.sharedBuffer.restartPrimitive(), this.sharedBuffer.strip = !0, this.prevIdx = Object.assign({}, this.sharedBuffer.idx), this.idx = Object.assign({}, this.sharedBuffer.idx), this.first = !0
                            },
                            remove: function () {
                                this.sharedBuffer.remove(this.prevIdx, this.idx)
                            },
                            undo: function () {
                                this.sharedBuffer.undo(this.prevIdx)
                            },
                            addPoint: (o = new THREE.Vector3, function (e, t, s, i, r) {
                                var a = this.materialOptions.converter;
                                o.set(1, 0, 0), o.applyQuaternion(t), o.normalize();
                                var n = s.clone(),
                                    h = s.clone(),
                                    u = this.data.size * i;
                                if (n.add(o.clone().multiplyScalar(u / 2)), h.add(o.clone().multiplyScalar(-u / 2)), this.first && this.prevIdx.position > 0 && (this.first = !1, this.sharedBuffer.addVertex(n.x, n.y, n.z), this.sharedBuffer.idx.normal++, this.sharedBuffer.idx.color++, this.sharedBuffer.idx.uv++, this.idx = Object.assign({}, this.sharedBuffer.idx)), this.sharedBuffer.addVertex(n.x, n.y, n.z), this.sharedBuffer.addVertex(h.x, h.y, h.z), this.sharedBuffer.idx.normal += 2, this.sharedBuffer.addColor(this.data.color.r, this.data.color.g, this.data.color.b), this.sharedBuffer.addColor(this.data.color.r, this.data.color.g, this.data.color.b), "textured" === this.materialOptions.type) {
                                    this.sharedBuffer.idx.uv += 2;
                                    for (var l, d, c = this.sharedBuffer.current.attributes.uv.array, m = 0; m < this.data.numPoints + 1; m++) l = m / this.data.numPoints, d = 4 * m, 0 !== this.prevIdx.uv && (d += 2 * (this.prevIdx.uv + 1)), c[d] = a.convertU(l), c[d + 1] = a.convertV(0), c[d + 2] = a.convertU(l), c[d + 3] = a.convertV(1)
                                }
                                return this.idx = Object.assign({}, this.sharedBuffer.idx), this.sharedBuffer.update(), this.computeVertexNormals(), !0
                            }),
                            computeVertexNormals: (e = new THREE.Vector3, t = new THREE.Vector3, s = new THREE.Vector3, a = new THREE.Vector3, n = new THREE.Vector3, function () {
                                for (var i = 0 === this.prevIdx.position ? 0 : 3 * (this.prevIdx.position + 1), r = 3 * this.idx.position, o = this.sharedBuffer.current.attributes.position.array, h = this.sharedBuffer.current.attributes.normal.array, u = i; u <= r; u++) h[u] = 0;
                                var l = !0;
                                for (u = i; u < r - 6; u += 3) l ? (e.fromArray(o, u), t.fromArray(o, u + 3), s.fromArray(o, u + 6)) : (t.fromArray(o, u), s.fromArray(o, u + 6), e.fromArray(o, u + 3)), l = !l, a.subVectors(s, t), n.subVectors(e, t), a.cross(n), a.normalize(), h[u] += a.x, h[u + 1] += a.y, h[u + 2] += a.z, h[u + 3] += a.x, h[u + 4] += a.y, h[u + 5] += a.z, h[u + 6] += a.x, h[u + 7] += a.y, h[u + 8] += a.z;
                                for (u = i + 6; u < r - 6; u++) h[u] = h[u] / 3;
                                h[i + 3] = h[i + 3] / 2, h[i + 3 + 1] = h[i + 3 + 1] / 2, h[i + 3 + 2] = h[i + 3 + 2] / 2, h[r - 6] = h[r - 6] / 2, h[r - 6 + 1] = h[r - 6 + 1] / 2, h[r - 6 + 2] = h[r - 6 + 2] / 2
                            })
                        }, u = [{
                            name: "flat",
                            materialOptions: {
                                type: "flat"
                            },
                            thumbnail: "brushes/thumb_flat.gif"
                        }, {
                            name: "smooth",
                            materialOptions: {
                                type: "shaded"
                            },
                            thumbnail: "brushes/thumb_smooth.gif"
                        }, {
                            name: "squared-textured",
                            materialOptions: {
                                type: "textured",
                                textureSrc: "brushes/squared_textured.png"
                            },
                            thumbnail: "brushes/thumb_squared_textured.gif"
                        }, {
                            name: "line-gradient",
                            materialOptions: {
                                type: "textured",
                                textureSrc: "brushes/line_gradient.png"
                            },
                            thumbnail: "brushes/thumb_line_gradient.gif"
                        }, {
                            name: "silky-flat",
                            materialOptions: {
                                type: "textured",
                                textureSrc: "brushes/silky_flat.png"
                            },
                            thumbnail: "brushes/thumb_silky_flat.gif"
                        }, {
                            name: "silky-textured",
                            materialOptions: {
                                type: "textured",
                                textureSrc: "brushes/silky_textured.png"
                            },
                            thumbnail: "brushes/thumb_silky_textured.gif"
                        }, {
                            name: "lines1",
                            materialOptions: {
                                type: "textured",
                                textureSrc: "brushes/lines1.png"
                            },
                            thumbnail: "brushes/thumb_lines1.gif"
                        }, {
                            name: "lines2",
                            materialOptions: {
                                type: "textured",
                                textureSrc: "brushes/lines2.png"
                            },
                            thumbnail: "brushes/thumb_lines2.gif"
                        }, {
                            name: "lines3",
                            materialOptions: {
                                type: "textured",
                                textureSrc: "brushes/lines3.png"
                            },
                            thumbnail: "brushes/thumb_lines3.gif"
                        }, {
                            name: "lines4",
                            materialOptions: {
                                type: "textured",
                                textureSrc: "brushes/lines4.png"
                            },
                            thumbnail: "brushes/thumb_lines4.gif"
                        }, {
                            name: "lines5",
                            materialOptions: {
                                type: "textured",
                                textureSrc: "brushes/lines5.png"
                            },
                            thumbnail: "brushes/thumb_lines5.gif"
                        }, {
                            name: "line-grunge1",
                            materialOptions: {
                                type: "textured",
                                textureSrc: "brushes/line_grunge1.png"
                            },
                            thumbnail: "brushes/thumb_line_grunge1.gif"
                        }, {
                            name: "line-grunge2",
                            materialOptions: {
                                type: "textured",
                                textureSrc: "brushes/line_grunge2.png"
                            },
                            thumbnail: "brushes/thumb_line_grunge2.gif"
                        }, {
                            name: "line-grunge3",
                            materialOptions: {
                                type: "textured",
                                textureSrc: "brushes/line_grunge3.png"
                            },
                            thumbnail: "brushes/thumb_line_grunge3.gif"
                        }], l = 0; l < u.length; l++) {
                        var d = u[l];
                        d.materialOptions.textureSrc ? d.materialOptions.converter = window.atlas.getUVConverters(d.materialOptions.textureSrc) : d.materialOptions.converter = window.atlas.getUVConverters(null), AFRAME.registerBrush(d.name, Object.assign({}, h, {
                            materialOptions: d.materialOptions
                        }), {
                            thumbnail: d.thumbnail,
                            maxPoints: 3e3
                        })
                    }
                }()
            },
            775: () => {
                var e, t, s, r, a;
                a = new THREE.ShaderMaterial({
                    vertexShader: "varying vec2 vUv;     void main() {       vUv = uv;       gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );     }",
                    fragmentShader: "uniform sampler2D tDiffuse;     uniform float amount;     uniform float time;     varying vec2 vUv;         vec3 hsv2rgb(vec3 c) {         vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);         vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);         return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);     }         void main() {       float h = mod(vUv.x - time / 3000.0, 1.0);       vec4 color = vec4(hsv2rgb(vec3(h, 1.0, 0.5)), 1.0);       gl_FragColor = color;     }",
                    side: THREE.DoubleSide,
                    uniforms: {
                        time: {
                            type: "f",
                            value: 0
                        }
                    }
                }), AFRAME.registerBrush("line-rainbow", {
                    init: function (e, t) {
                        this.idx = 0, this.geometry = new THREE.BufferGeometry, this.vertices = new Float32Array(3 * this.options.maxPoints * 3), this.indices = new Uint32Array(4.5 * this.options.maxPoints * 4.5), this.uvs = new Float32Array(2 * this.options.maxPoints * 2), this.linepositions = new Float32Array(this.options.maxPoints), this.geometry.setDrawRange(0, 0), this.geometry.setAttribute("position", new THREE.BufferAttribute(this.vertices, 3).setUsage(THREE.DynamicDrawUsage)), this.geometry.setIndex(new THREE.BufferAttribute(this.indices, 3).setUsage(THREE.DynamicDrawUsage)), this.geometry.setAttribute("uv", new THREE.BufferAttribute(this.uvs, 2).setUsage(THREE.DynamicDrawUsage)), this.geometry.setAttribute("lineposition", new THREE.BufferAttribute(this.linepositions, 1).setUsage(THREE.DynamicDrawUsage)), this.material = a;
                        var s = new THREE.Mesh(this.geometry, this.material);
                        s.frustumCulled = !1, s.vertices = this.vertices, this.object3D.add(s), this.drawing = document.querySelector(".a-drawing"), this.drawing.object3D.add(this.object3D)
                    },
                    addPoint: (e = new THREE.Vector3, t = new THREE.Vector3, s = new THREE.Vector3, r = new THREE.Vector3, function (a, n, o, h, u) {
                        var l = 0;
                        for (i = 0; i < this.data.numPoints; i++) this.uvs[l++] = i / (this.data.numPoints - 1), this.uvs[l++] = 0, this.uvs[l++] = i / (this.data.numPoints - 1), this.uvs[l++] = 1;
                        e.set(1, 0, 0), e.applyQuaternion(n), e.normalize(), t.copy(o), s.copy(o);
                        var d = this.data.size * h;
                        return t.add(r.copy(e).multiplyScalar(d / 2)), s.add(r.copy(e).multiplyScalar(-d / 2)), this.vertices[this.idx++] = t.x, this.vertices[this.idx++] = t.y, this.vertices[this.idx++] = t.z, this.vertices[this.idx++] = s.x, this.vertices[this.idx++] = s.y, this.vertices[this.idx++] = s.z, this.idx > 6 && (this.geometry.index.setXYZ(this.idx / 3 - 4, this.idx / 3 - 4, this.idx / 3 - 3, this.idx / 3 - 2), this.geometry.index.setXYZ(this.idx / 3 - 3, this.idx / 3 - 2, this.idx / 3 - 3, this.idx / 3 - 1)), this.geometry.attributes.position.needsUpdate = !0, this.geometry.index.needsUpdate = !0, this.geometry.attributes.uv.needsUpdate = !0, this.geometry.setDrawRange(0, 2 * this.data.numPoints * 6), !0
                    }),
                    tick: function (e, t) {
                        this.material.uniforms.time.value = e
                    },
                    undo: function () {
                        this.drawing.object3D.children.pop()
                    }
                }, {
                    thumbnail: "brushes/thumb_rainbow.png",
                    maxPoints: 3e3
                })
            },
            891: () => {
                AFRAME.registerBrush("single-sphere", {
                    init: function (e, t) {
                        this.material = new THREE.MeshStandardMaterial({
                            color: this.data.color,
                            roughness: .6,
                            metalness: .2,
                            side: THREE.FrontSide,
                            flatShading: !0
                        }), this.geometry = new THREE.IcosahedronGeometry(1, 2), this.mesh = new THREE.Mesh(this.geometry, this.material), this.object3D.add(this.mesh), this.mesh.visible = !1, this.drawingEl = document.querySelector(".a-drawing"), this.drawingEl.object3D.add(this.object3D)
                    },
                    addPoint: function (e, t, s, i, r) {
                        this.firstPoint || (this.firstPoint = s.clone(), this.mesh.position.set(this.firstPoint.x, this.firstPoint.y, this.firstPoint.z)), this.mesh.visible = !0;
                        var a = this.firstPoint.distanceTo(s);
                        return this.mesh.scale.set(a, a, a), !0
                    },
                    undo: function () {
                        this.drawingEl.object3D.children.pop()
                    }
                }, {
                    thumbnail: "brushes/thumb_single_sphere.png",
                    spacing: 0
                })
            },
            988: () => {
                AFRAME.registerBrush("spheres", {
                    init: function (e, t) {
                        this.material = new THREE.MeshStandardMaterial({
                            color: this.data.color,
                            roughness: .5,
                            metalness: .5,
                            side: THREE.DoubleSide,
                            flatShading: !0
                        }), this.geometry = new THREE.IcosahedronGeometry(1, 0), this.drawingEl = document.querySelector(".a-drawing"), this.drawingEl.object3D.add(this.object3D)
                    },
                    addPoint: function (e, t, s, i, r) {
                        var a = new THREE.Mesh(this.geometry, this.material),
                            n = this.data.size / 2 * i;
                        return a.scale.set(n, n, n), a.initialScale = a.scale.clone(), a.phase = Math.random() * Math.PI * 2, a.position.copy(s), a.quaternion.copy(t), this.object3D.add(a), !0
                    },
                    tick: function (e, t) {
                        for (var s = 0; s < this.object3D.children.length; s++) {
                            var i = this.object3D.children[s],
                                r = (Math.sin(i.phase + e / 500) + 1) / 2 + .1;
                            i.scale.copy(i.initialScale).multiplyScalar(r)
                        }
                    },
                    undo: function () {
                        this.drawingEl.object3D.children.pop()
                    }
                }, {
                    thumbnail: "brushes/thumb_spheres.gif",
                    spacing: .01
                })
            },
            623: (e, t, s) => {
                var i = s(297),
                    r = s(51);
                ! function () {
                    r((function () {
                        var e = new THREE.MeshStandardMaterial({
                                side: THREE.DoubleSide,
                                map: window.atlas.map,
                                vertexColors: THREE.VertexColors,
                                transparent: !0,
                                alphaTest: .5,
                                roughness: .75,
                                metalness: .25
                            }),
                            t = new THREE.MeshBasicMaterial({
                                side: THREE.DoubleSide,
                                map: window.atlas.map,
                                vertexColors: THREE.VertexColors,
                                transparent: !0,
                                alphaTest: .5
                            });
                        i.addSharedBuffer("tris-flat", t), i.addSharedBuffer("tris-shaded", e)
                    }));
                    for (var e, t, s, a, n, o, h, u, l = {
                            init: function (e, t) {
                                this.sharedBuffer = i.getSharedBuffer("tris-" + this.materialOptions.type), this.prevIdx = Object.assign({}, this.sharedBuffer.idx), this.idx = Object.assign({}, this.sharedBuffer.idx), this.sharedBuffer.strip = !1, this.currAngle = 0, this.subTextures = 1, this.angleJitter = 0, this.autoRotate = !1, void 0 !== this.materialOptions.subTextures && (this.subTextures = this.materialOptions.subTextures), !0 === this.materialOptions.autoRotate && (this.autoRotate = !0), void 0 !== this.materialOptions.angleJitter && (this.angleJitter = this.materialOptions.angleJitter, this.angleJitter = 2 * this.angleJitter - this.angleJitter)
                            },
                            remove: function () {
                                this.sharedBuffer.remove(this.prevIdx, this.idx)
                            },
                            undo: function () {
                                this.sharedBuffer.undo(this.prevIdx)
                            },
                            addPoint: (e = new THREE.Vector3, t = new THREE.Vector3, s = new THREE.Vector3, a = new THREE.Vector3, n = new THREE.Vector3, o = new THREE.Vector3, h = new THREE.Vector3, u = Math.PI / 2, function (i, r, l, d, c) {
                                t.set(1, 0, 0), t.applyQuaternion(r), t.normalize(), e.set(0, 1, 0), e.applyQuaternion(r), e.normalize();
                                var m = this.data.size * d / 2,
                                    p = Math.PI / 4 + Math.random() * this.angleJitter;
                                this.autoRotate && (this.currAngle += .1, p += this.currAngle), s.copy(l).add(h.copy(t.applyAxisAngle(e, p)).multiplyScalar(m)), a.copy(l).add(h.copy(t.applyAxisAngle(e, u)).multiplyScalar(m)), n.copy(l).add(h.copy(t.applyAxisAngle(e, u)).multiplyScalar(m)), o.copy(l).add(t.applyAxisAngle(e, u).multiplyScalar(m)), this.idx.position, this.idx.position, this.sharedBuffer.addVertex(s.x, s.y, s.z), this.sharedBuffer.addVertex(a.x, a.y, a.z), this.sharedBuffer.addVertex(n.x, n.y, n.z), this.sharedBuffer.addVertex(n.x, n.y, n.z), this.sharedBuffer.addVertex(o.x, o.y, o.z), this.sharedBuffer.addVertex(s.x, s.y, s.z);
                                for (var f = 0; f < 6; f++) this.sharedBuffer.addNormal(e.x, e.y, e.z), this.sharedBuffer.addColor(this.data.color.r, this.data.color.g, this.data.color.b);
                                this.data.numPoints;
                                var g = 0,
                                    b = 1;
                                if (this.subTextures > 1) {
                                    var v = Math.floor(Math.random() * this.subTextures);
                                    b = (g = 1 / this.subTextures * v) + 1 / this.subTextures
                                }
                                var y = this.materialOptions.converter;
                                return this.sharedBuffer.addUV(y.convertU(g), y.convertV(1)), this.sharedBuffer.addUV(y.convertU(g), y.convertV(0)), this.sharedBuffer.addUV(y.convertU(b), y.convertV(0)), this.sharedBuffer.addUV(y.convertU(b), y.convertV(0)), this.sharedBuffer.addUV(y.convertU(b), y.convertV(1)), this.sharedBuffer.addUV(y.convertU(g), y.convertV(1)), this.idx = Object.assign({}, this.sharedBuffer.idx), this.sharedBuffer.update(), !0
                            })
                        }, d = [{
                            name: "dots",
                            materialOptions: {
                                type: "shaded",
                                textureSrc: "brushes/stamp_dots.png"
                            },
                            thumbnail: "brushes/thumb_stamp_dots.gif",
                            spacing: .01
                        }, {
                            name: "squares",
                            materialOptions: {
                                type: "shaded",
                                textureSrc: "brushes/stamp_squares.png"
                            },
                            thumbnail: "brushes/thumb_stamp_squares.gif",
                            spacing: .01
                        }, {
                            name: "column",
                            materialOptions: {
                                type: "shaded",
                                autoRotate: !0,
                                textureSrc: "brushes/stamp_column.png"
                            },
                            thumbnail: "brushes/thumb_stamp_column.gif",
                            spacing: .01
                        }, {
                            name: "gear1",
                            materialOptions: {
                                type: "shaded",
                                angleJitter: 2 * Math.PI,
                                subTextures: 2,
                                textureSrc: "brushes/stamp_gear.png"
                            },
                            thumbnail: "brushes/thumb_stamp_gear.gif",
                            spacing: .05
                        }, {
                            name: "grunge1",
                            materialOptions: {
                                type: "shaded",
                                angleJitter: 2 * Math.PI,
                                textureSrc: "brushes/stamp_grunge1.png"
                            },
                            thumbnail: "brushes/stamp_grunge1.png",
                            spacing: .02
                        }, {
                            name: "grunge2",
                            materialOptions: {
                                type: "shaded",
                                angleJitter: 2 * Math.PI,
                                textureSrc: "brushes/stamp_grunge2.png"
                            },
                            thumbnail: "brushes/stamp_grunge2.png",
                            spacing: .02
                        }, {
                            name: "grunge3",
                            materialOptions: {
                                type: "shaded",
                                angleJitter: 2 * Math.PI,
                                textureSrc: "brushes/stamp_grunge3.png"
                            },
                            thumbnail: "brushes/stamp_grunge3.png",
                            spacing: .02
                        }, {
                            name: "grunge4",
                            materialOptions: {
                                type: "shaded",
                                angleJitter: 2 * Math.PI,
                                textureSrc: "brushes/stamp_grunge4.png"
                            },
                            thumbnail: "brushes/stamp_grunge4.png",
                            spacing: .02
                        }, {
                            name: "grunge5",
                            materialOptions: {
                                type: "shaded",
                                angleJitter: 2 * Math.PI,
                                textureSrc: "brushes/stamp_grunge5.png"
                            },
                            thumbnail: "brushes/thumb_stamp_grunge5.gif",
                            spacing: .02
                        }, {
                            name: "leaf1",
                            materialOptions: {
                                type: "shaded",
                                angleJitter: Math.PI,
                                textureSrc: "brushes/stamp_leaf1.png"
                            },
                            thumbnail: "brushes/stamp_leaf1.png",
                            spacing: .03
                        }, {
                            name: "leaf2",
                            materialOptions: {
                                type: "shaded",
                                angleJitter: 60 * Math.PI / 180,
                                textureSrc: "brushes/stamp_leaf2.png"
                            },
                            thumbnail: "brushes/thumb_stamp_leaf2.gif",
                            spacing: .03
                        }, {
                            name: "leaf3",
                            materialOptions: {
                                type: "shaded",
                                angleJitter: 60 * Math.PI / 180,
                                textureSrc: "brushes/stamp_leaf3.png"
                            },
                            thumbnail: "brushes/thumb_stamp_leaf3.gif",
                            spacing: .03
                        }, {
                            name: "fur1",
                            materialOptions: {
                                type: "shaded",
                                angleJitter: 40 * Math.PI / 180,
                                subTextures: 2,
                                textureSrc: "brushes/stamp_fur1.png"
                            },
                            thumbnail: "brushes/stamp_fur1.png",
                            spacing: .01
                        }, {
                            name: "fur2",
                            materialOptions: {
                                type: "shaded",
                                angleJitter: 10 * Math.PI / 180,
                                subTextures: 3,
                                textureSrc: "brushes/stamp_fur2.png"
                            },
                            thumbnail: "brushes/stamp_fur2.png",
                            spacing: .01
                        }, {
                            name: "grass",
                            materialOptions: {
                                type: "shaded",
                                angleJitter: 10 * Math.PI / 180,
                                subTextures: 3,
                                textureSrc: "brushes/stamp_grass.png"
                            },
                            thumbnail: "brushes/thumb_stamp_grass.png",
                            spacing: .03
                        }, {
                            name: "bush",
                            materialOptions: {
                                type: "shaded",
                                subTextures: 2,
                                textureSrc: "brushes/stamp_bush.png"
                            },
                            thumbnail: "brushes/thumb_stamp_bush.gif",
                            spacing: .04
                        }, {
                            name: "star",
                            materialOptions: {
                                type: "shaded",
                                textureSrc: "brushes/stamp_star.png"
                            },
                            thumbnail: "brushes/thumb_stamp_star.png",
                            spacing: .06
                        }, {
                            name: "snow",
                            materialOptions: {
                                type: "shaded",
                                angleJitter: 2 * Math.PI,
                                textureSrc: "brushes/stamp_snow.png"
                            },
                            thumbnail: "brushes/thumb_stamp_snow.png",
                            spacing: .06
                        }], c = 0; c < d.length; c++) {
                        var m = d[c];
                        m.materialOptions.textureSrc && (m.materialOptions.map = window.atlas.map, m.materialOptions.converter = window.atlas.getUVConverters(m.materialOptions.textureSrc), delete m.materialOptions.textureSrc), AFRAME.registerBrush(m.name, Object.assign({}, l, {
                            materialOptions: m.materialOptions
                        }), {
                            thumbnail: m.thumbnail,
                            spacing: m.spacing,
                            maxPoints: 3e3
                        })
                    }
                }()
            },
            142: () => {
                AFRAME.registerComponent("brush-tip", {
                    schema: {
                        controller: {
                            type: "string"
                        },
                        hand: {
                            type: "string",
                            oneOf: ["left", "right"]
                        }
                    },
                    init: function () {
                        var e = e => THREE.MathUtils.degToRad(e);
                        this.controllers = {
                            "oculus-touch-controller-v3": {
                                left: {
                                    positionOffset: {
                                        x: 0,
                                        y: -.025,
                                        z: -.042
                                    },
                                    rotationOffset: {
                                        x: e(-45),
                                        y: e(7),
                                        z: e(-7)
                                    }
                                },
                                right: {
                                    positionOffset: {
                                        x: 0,
                                        y: -.025,
                                        z: -.042
                                    },
                                    rotationOffset: {
                                        x: e(-45),
                                        y: e(-7),
                                        z: e(7)
                                    }
                                }
                            }
                        }, this.data.controller && this.setController(this.data.controller, this.data.hand)
                    },
                    setController: function (e, t) {
                        e in this.controllers ? (this.el.object3D.position.set(this.controllers[e][t].positionOffset.x, this.controllers[e][t].positionOffset.y, this.controllers[e][t].positionOffset.z), this.el.object3D.rotation.set(this.controllers[e][t].rotationOffset.x, this.controllers[e][t].rotationOffset.y, this.controllers[e][t].rotationOffset.z)) : console.error(`${e} is not present in the controllers list!`)
                    }
                })
            },
            620: () => {
                var e, t, s;
                AFRAME.registerComponent("brush", {
                    schema: {
                        color: {
                            type: "color",
                            default: "#ef2d5e"
                        },
                        size: {
                            default: .01,
                            min: .001,
                            max: .3
                        },
                        brush: {
                            default: "smooth"
                        },
                        enabled: {
                            default: !0
                        }
                    },
                    init: function () {
                        var e = this.data;
                        this.color = new THREE.Color(e.color), this.el.emit("brushcolor-changed", {
                            color: this.color
                        }), this.el.emit("brushsize-changed", {
                            brushSize: e.size
                        }), this.active = !1, this.obj = this.el.object3D, this.currentStroke = null, this.strokeEntities = [], this.sizeModifier = 0, this.textures = {}, this.currentMap = 0, this.model = this.el.getObject3D("mesh"), this.drawing = !1;
                        var t = this;
                        this.el.addEventListener("undo", (function (e) {
                            t.data.enabled && (t.system.undo(), document.getElementById("ui_undo").play())
                        })), this.el.addEventListener("paint", (function (e) {
                            if (t.data.enabled) {
                                var s = e.detail.value;
                                t.sizeModifier = s, s > .1 ? t.active || (t.startNewStroke(), t.active = !0) : (t.active && (t.previousEntity = t.currentEntity, t.currentStroke = null), t.active = !1)
                            }
                        })), this.hand = "right-hand" === this.el.id ? "right" : "left"
                    },
                    update: function (e) {
                        var t = this.data;
                        e.color !== t.color && (this.color.set(t.color), this.el.emit("brushcolor-changed", {
                            color: this.color
                        })), e.size !== t.size && this.el.emit("brushsize-changed", {
                            size: t.size
                        })
                    },
                    tick: (e = new THREE.Vector3, t = new THREE.Quaternion, s = new THREE.Vector3, function (i, r) {
                        if (this.currentStroke && this.active) {
                            this.obj.matrixWorld.decompose(e, t, s);
                            var a = this.system.getPointerPosition(e, t, this.hand);
                            this.currentStroke.addPoint(e, t, a, this.sizeModifier, i)
                        }
                    }),
                    startNewStroke: function () {
                        document.getElementById("ui_paint").play(), this.currentStroke = this.system.addNewStroke(this.data.brush, this.color, this.data.size), this.el.emit("stroke-started", {
                            entity: this.el,
                            stroke: this.currentStroke
                        })
                    }
                })
            },
            510: () => {
                AFRAME.registerComponent("json-model", {
                    schema: {
                        src: {
                            type: "asset"
                        }
                    },
                    init: function () {
                        this.objectLoader = new THREE.ObjectLoader, this.objectLoader.setCrossOrigin("")
                    },
                    update: function (e) {
                        var t = this,
                            s = this.data.src;
                        s && s !== e.src && this.objectLoader.load(this.data.src, (function (e) {
                            var i = (new THREE.Matrix4).makeRotationX(-Math.PI / 2);
                            e.traverse((function (e) {
                                e instanceof THREE.Mesh && e.position.applyMatrix4(i)
                            })), t.el.setObject3D("mesh", e), t.el.emit("model-loaded", {
                                format: "json",
                                model: e,
                                src: s
                            })
                        }))
                    }
                })
            },
            788: () => {
                AFRAME.registerComponent("logo-model", {
                    schema: {
                        opacity: {
                            default: 1
                        }
                    },
                    init: function () {
                        this.model = null, this.el.setAttribute("obj-model", "obj: #logoobj; mtl: #logomtl"), this.el.addEventListener("model-loaded", this.setModel.bind(this))
                    },
                    setModel: function (e) {
                        this.model = e.detail.model
                    },
                    update: function () {
                        null != this.model && (this.model.children[0].material.opacity = this.data.opacity)
                    }
                })
            },
            101: () => {
                AFRAME.registerSystem("paint-controls", {
                    numberStrokes: 0
                }), AFRAME.registerComponent("paint-controls", {
                    dependencies: ["brush"],
                    schema: {
                        hand: {
                            default: "left"
                        }
                    },
                    init: function () {
                        var e = this.el,
                            t = this,
                            s = "assets/images/controller-pressed.png",
                            i = null;
                        this.controller = null, this.modelLoaded = !1, this.onEnterVR = this.onEnterVR.bind(this), e.sceneEl.addEventListener("enter-vr", this.onEnterVR), e.object3D.visible = !1, this.onModelLoaded = this.onModelLoaded.bind(this), e.addEventListener("model-loaded", this.onModelLoaded), e.addEventListener("changeBrushSizeAbs", (function (s) {
                            if (0 !== s.detail.axis[1] || 0 !== s.detail.axis[3]) {
                                var i = (s.detail.axis[1] || s.detail.axis[3]) / 300,
                                    r = e.components.brush.schema.size,
                                    a = THREE.Math.clamp(t.el.getAttribute("brush").size - i, r.min, r.max);
                                t.el.setAttribute("brush", "size", a)
                            }
                        })), e.addEventListener("changeBrushSizeInc", (function (s) {
                            if (0 !== s.detail.axis[1] || 0 !== s.detail.axis[3]) {
                                var i = s.detail.axis[1] || s.detail.axis[3];
                                t.touchStarted && (t.touchStarted = !1, t.startAxis = (i + 1) / 2);
                                var r = (i + 1) / 2,
                                    a = (t.startAxis - r) / 2;
                                t.startAxis = r;
                                var n = t.el.getAttribute("brush").size,
                                    o = e.components.brush.schema.size,
                                    h = THREE.Math.clamp(n - a, o.min, o.max);
                                t.el.setAttribute("brush", "size", h)
                            }
                        })), t.touchStarted = !1, e.addEventListener("startChangeBrushSize", (function () {
                            t.touchStarted = !0
                        })), e.addEventListener("controllerconnected", (function (s) {
                            var r = s.detail.name,
                                a = s.detail.component.data.hand;
                            const n = (s, i) => {
                                this.brushTip = document.createElement("a-entity"), this.brushTip.id = `${i}-tip`, this.brushTip.setAttribute("gltf-model", "#tipObj"), this.brushTip.setAttribute("brush-tip", `controller: ${s}; hand: ${i}`), this.brushTip.addEventListener("model-loaded", t.onModelLoaded), e.appendChild(this.brushTip)
                            };
                            if ("windows-motion-controls" === r) {
                                var o = s.detail.component.el.components["gltf-model"].data;
                                const e = "045E-065D";
                                o && o.indexOf(e) >= 0 && (r = "windows-motion-samsung-controls")
                            }
                            if (i = Utils.getTooltips(r), r.indexOf("windows-motion") >= 0);
                            else if ("oculus-touch-controls" === r) {
                                const t = e.components[r].displayModel[a].modelUrl;
                                n(/[^\/]*(?=-(?:left|right)\.)/.exec(t)[0], a)
                            } else {
                                if ("vive-controls" !== r) return;
                                e.setAttribute("gltf-model", "url(assets/models/vive-controller.glb)")
                            }
                            i && i.forEach((function (e) {
                                e.setAttribute("visible", !0);
                                Array.prototype.slice.call(e.querySelectorAll("[tooltip]")).forEach((function (e) {
                                    e.setAttribute("animation", {
                                        dur: 1e3,
                                        delay: 2e3,
                                        property: "tooltip.opacity",
                                        from: 1,
                                        to: 0,
                                        startEvents: "tooltip-fade"
                                    })
                                }))
                            })), this.controller = r
                        })), e.addEventListener("brushsize-changed", (function (e) {
                            t.changeBrushSize(e.detail.size)
                        })), e.addEventListener("brushcolor-changed", (function (e) {
                            t.changeBrushColor(e.detail.color)
                        })), e.sceneEl.systems.material.loadTexture(s, {
                            src: s
                        }, (function (e) {
                            var s = t.highLightMaterial = new THREE.MeshBasicMaterial;
                            s.map = e, s.needsUpdate = !0
                        })), this.startAxis = 0, this.numberStrokes = 0, document.addEventListener("stroke-started", (function (e) {
                            if (e.detail.entity.components["paint-controls"] === t && (t.numberStrokes++, t.system.numberStrokes++, 3 === t.system.numberStrokes)) {
                                Array.prototype.slice.call(document.querySelectorAll("[tooltip]")).forEach((function (e) {
                                    e.emit("tooltip-fade")
                                }))
                            }
                        }))
                    },
                    changeBrushColor: function (e) {
                        this.modelLoaded && this.buttonMeshes.sizeHint && (this.buttonMeshes.colorTip.material.color.copy(e), this.buttonMeshes.sizeHint.material.color.copy(e))
                    },
                    changeBrushSize: function (e) {
                        var t = e / 2 * 10;
                        this.modelLoaded && this.buttonMeshes.sizeHint && this.buttonMeshes.sizeHint.scale.set(t, 1, t)
                    },
                    mapping: {
                        axis0: "trackpad",
                        axis1: "trackpad",
                        button0: "trackpad",
                        button1: "trigger",
                        button2: "grip",
                        button3: "menu",
                        button4: "system"
                    },
                    update: function () {
                        var e = this.data,
                            t = this.el;
                        t.setAttribute("vive-controls", {
                            hand: e.hand,
                            model: !1
                        }), t.setAttribute("oculus-touch-controls", {
                            hand: e.hand,
                            model: !0
                        }), t.setAttribute("windows-motion-controls", {
                            hand: e.hand
                        })
                    },
                    play: function () {},
                    pause: function () {},
                    onEnterVR: function () {
                        this.el.object3D.visible = !0
                    },
                    onModelLoaded: function (e) {
                        if ((e.target === this.el || e.target.id.includes("-tip")) && !this.buttonMeshes) {
                            var t, s = e.detail.model;
                            (t = this.buttonMeshes = {}).sizeHint = s.getObjectByName("sizehint"), t.colorTip = s.getObjectByName("tip"), this.modelLoaded = !0, this.changeBrushSize(this.el.components.brush.data.size), this.changeBrushColor(this.el.components.brush.color)
                        }
                    },
                    onButtonEvent: function (e, t) {
                        var s = this.mapping["button" + e];
                        this.el.emit(s + t), this.updateModel(s, t)
                    },
                    updateModel: function (e, t) {
                        var s = "up" === t ? this.material : this.highLightMaterial,
                            i = this.buttonMeshes,
                            r = i && i[e];
                        if ("down" === t && r && !this.material && (s = this.material = r.material), s) return "grip" === e ? (i.grip.left.material = s, void(i.grip.right.material = s)) : void(r && (r.material = s))
                    }
                })
            },
            579: () => {
                var e, t, s;
                AFRAME.registerComponent("ui-raycaster", {
                    schema: {
                        far: {
                            default: 1 / 0
                        },
                        interval: {
                            default: 100
                        },
                        near: {
                            default: 0
                        },
                        objects: {
                            default: ""
                        },
                        recursive: {
                            default: !0
                        },
                        rotation: {
                            default: 0
                        }
                    },
                    init: function () {
                        this.direction = new THREE.Vector3, this.intersectedEls = [], this.objects = null, this.prevCheckTime = void 0, this.raycaster = new THREE.Raycaster, this.updateOriginDirection(), this.refreshObjects = this.refreshObjects.bind(this)
                    },
                    play: function () {
                        this.el.sceneEl.addEventListener("child-attached", this.refreshObjects), this.el.sceneEl.addEventListener("child-detached", this.refreshObjects)
                    },
                    pause: function () {
                        this.el.sceneEl.removeEventListener("child-attached", this.refreshObjects), this.el.sceneEl.removeEventListener("child-detached", this.refreshObjects)
                    },
                    update: function () {
                        var e = this.data,
                            t = this.raycaster;
                        t.far = e.far, t.near = e.near, this.refreshObjects()
                    },
                    refreshObjects: function () {
                        var e, t, s = this.data;
                        if (s.objects)
                            for (t = this.el.sceneEl.querySelectorAll(s.objects), this.objects = [], e = 0; e < t.length; e++) this.objects.push(t[e].object3D);
                        else this.objects = this.el.sceneEl.object3D.children
                    },
                    tick: function (e) {
                        var t, s, i, r = this.el,
                            a = this.data,
                            n = this.prevCheckTime;
                        n && e - n < a.interval || (i = this.intersectedEls.slice(), this.updateOriginDirection(), s = (s = this.raycaster.intersectObjects(this.objects, a.recursive)).filter((function (e) {
                            return !!e.object.el
                        })), t = this.intersectedEls = s.map((function (e) {
                            return e.object.el
                        })), s.forEach((function (e) {
                            e.object.el.emit("raycaster-intersected", {
                                el: r,
                                intersection: e
                            })
                        })), s.length && r.emit("raycaster-intersection", {
                            els: t,
                            intersections: s
                        }), i.forEach((function (e) {
                            -1 === t.indexOf(e) && (r.emit("raycaster-intersection-cleared", {
                                el: e
                            }), e.emit("raycaster-intersected-cleared", {
                                el: r
                            }))
                        })))
                    },
                    updateOriginDirection: (e = new THREE.Quaternion, t = new THREE.Vector3, s = new THREE.Vector3, function () {
                        var i = this.el,
                            r = this.direction,
                            a = i.object3D;
                        a.updateMatrixWorld(), a.matrixWorld.decompose(t, e, s), r.set(0, 0, -1), r.applyAxisAngle(new THREE.Vector3(1, 0, 0), this.data.rotation / 360 * 2 * Math.PI), r.applyQuaternion(e), this.raycaster.set(t, r)
                    })
                })
            },
            688: () => {
                var e, t, s, i, r, a;
                AFRAME.registerComponent("ui", {
                    schema: {
                        brightness: {
                            default: 1,
                            max: 1,
                            min: 0
                        },
                        opacity: {
                            default: 0
                        }
                    },
                    dependencies: ["ui-raycaster"],
                    init: function () {
                        var e = this.el,
                            t = this.uiEl = document.createElement("a-entity"),
                            s = this.rayEl = document.createElement("a-entity");
                        this.closed = !0, this.isTooltipPaused = !1, this.colorStack = ["#272727", "#727272", "#FFFFFF", "#24CAFF", "#249F90", "#F2E646", "#EF2D5E"], this.bindMethods(), this.colorHasChanged = !0, this.highlightMaterials = {}, this.intersectedObjects = [], this.hoveredOffObjects = [], this.hoveredOnObjects = [], this.pressedObjects = {}, this.selectedObjects = {}, this.unpressedObjects = {}, this.brushButtonsMapping = {}, this.brushRegexp = /^(?!.*(fg|bg)$)brush[0-9]+/, this.colorHistoryRegexp = /^(?!.*(fg|bg)$)colorhistory[0-9]+$/, this.hsv = {
                            h: 0,
                            s: 0,
                            v: 1
                        }, this.rayAngle = 45, this.rayDistance = .2, this.cursorOffset = new THREE.Vector3(.06409, .01419, -.10242), t.setAttribute("material", {
                            color: "#ffffff",
                            flatShading: !0,
                            shader: "flat",
                            transparent: !0,
                            fog: !1,
                            src: "#uinormal"
                        }), t.setAttribute("obj-model", "obj:#uiobj"), t.setAttribute("position", "0 0.04 -0.15"), t.setAttribute("scale", "0 0 0"), t.setAttribute("visible", !1), t.classList.add("apainter-ui"), e.appendChild(t), s.setAttribute("line", ""), e.appendChild(s), e.setAttribute("ui-raycaster", {
                            far: this.rayDistance,
                            objects: ".apainter-ui",
                            rotation: -this.rayAngle
                        }), this.controller = null;
                        var i = this;
                        e.addEventListener("controllerconnected", (function (s) {
                            var r = s.detail.name;
                            i.tooltips = Utils.getTooltips(r), i.controller = {
                                name: r,
                                hand: s.detail.component.data.hand
                            }, "oculus-touch-controls" === r ? (i.uiEl.setAttribute("rotation", "45 0 0"), t.setAttribute("position", "0 0.13 -0.08"), i.rayAngle = 0, e.setAttribute("ui-raycaster", {
                                rotation: 0
                            })) : "windows-motion-controls" === r && (i.rayAngle = 25, i.rayDistance = 1, e.setAttribute("ui-raycaster", {
                                rotation: -30,
                                far: i.rayDistance
                            })), i.el.isPlaying && i.addToggleEvent()
                        }))
                    },
                    initColorWheel: function () {
                        var e = this.objects.hueWheel,
                            t = new THREE.ShaderMaterial({
                                uniforms: {
                                    brightness: {
                                        type: "f",
                                        value: this.hsv.v
                                    }
                                },
                                vertexShader: "      varying vec2 vUv;      void main() {        vUv = uv;        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);        gl_Position = projectionMatrix * mvPosition;      }      ",
                                fragmentShader: "      #define M_PI2 6.28318530718\n       uniform float brightness;      varying vec2 vUv;      vec3 hsb2rgb(in vec3 c){          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0,                            0.0,                            1.0 );          rgb = rgb * rgb * (3.0 - 2.0 * rgb);          return c.z * mix( vec3(1.0), rgb, c.y);      }            void main() {        vec2 toCenter = vec2(0.5) - vUv;        float angle = atan(toCenter.y, toCenter.x);        float radius = length(toCenter) * 2.0;        vec3 color = hsb2rgb(vec3((angle / M_PI2) + 0.5, radius, brightness));        gl_FragColor = vec4(color, 1.0);      }      "
                            });
                        e.material = t
                    },
                    bindMethods: function () {
                        this.onComponentChanged = this.onComponentChanged.bind(this), this.onTriggerChanged = this.onTriggerChanged.bind(this), this.onIntersection = this.onIntersection.bind(this), this.onIntersected = this.onIntersected.bind(this), this.onIntersectionCleared = this.onIntersectionCleared.bind(this), this.onIntersectedCleared = this.onIntersectedCleared.bind(this), this.onModelLoaded = this.onModelLoaded.bind(this), this.onStrokeStarted = this.onStrokeStarted.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.open = this.open.bind(this), this.close = this.close.bind(this)
                    },
                    tick: function () {
                        !this.closed && this.handEl && (this.updateIntersections(), this.handleHover(), this.handlePressedButtons())
                    },
                    update: function () {
                        this.messagesMaterial && (this.messagesMaterial.opacity = this.data.opacity)
                    },
                    onTriggerChanged: function (e) {
                        var t = e.detail.value;
                        this.lastTriggerValue = t, e.detail.value >= .25 ? this.triggeredPressed = !0 : (this.triggeredPressed = !1, this.handleButtonUp())
                    },
                    handleButtonDown: function (e, t) {
                        var s = e.name;
                        if (!this.activeWidget || this.activeWidget === s) {
                            switch (this.activeWidget = s, !0) {
                                case "brightness" === s:
                                    this.onBrightnessDown(t);
                                    break;
                                case "brushnext" === s:
                                    this.pressedObjects[s] || this.nextPage();
                                    break;
                                case "brushprev" === s:
                                    this.pressedObjects[s] || this.previousPage();
                                    break;
                                case "clear" === s:
                                    this.pressedObjects[s] || (this.el.sceneEl.systems.brush.clear(), this.playSound("ui_click1"));
                                    break;
                                case "copy" === s:
                                    this.pressedObjects[s] || (this.copyBrush(), this.playSound("ui_click1"));
                                    break;
                                case "hue" === s:
                                    this.onHueDown(t);
                                    break;
                                case "save" === s:
                                    this.pressedObjects[s] || (this.el.sceneEl.systems.painter.upload(), this.playSound("ui_click1"));
                                    break;
                                case "sizebg" === s:
                                    this.onBrushSizeBackgroundDown(t);
                                    break;
                                case this.brushRegexp.test(s):
                                    this.onBrushDown(s);
                                    break;
                                case this.colorHistoryRegexp.test(s):
                                    this.onColorHistoryButtonDown(e);
                                    break;
                                default:
                                    this.activeWidget = void 0
                            }
                            this.pressedObjects[s] = e
                        }
                    },
                    copyBrush: function () {
                        var e = this.el.getAttribute("brush");
                        this.handEl.setAttribute("brush", "brush", e.brush), this.handEl.setAttribute("brush", "color", e.color), this.handEl.setAttribute("brush", "size", e.size), this.colorHasChanged = !0
                    },
                    handleButtonUp: function () {
                        var e = this.pressedObjects,
                            t = this.unpressedObjects;
                        this.activeWidget = void 0, Object.keys(e).forEach((function (s) {
                            var i = e[s].name;
                            t[i] = e[i], delete e[i]
                        }))
                    },
                    handlePressedButtons: function () {
                        var e = this;
                        this.triggeredPressed && this.hoveredOnObjects.forEach((function (t) {
                            e.handleButtonDown(t.object, t.point)
                        }))
                    },
                    onColorHistoryButtonDown: function (e) {
                        var t = e.material.color.getHexString();
                        this.handEl.setAttribute("brush", "color", "#" + t), this.playSound("ui_click0", e.name)
                    },
                    onBrushDown: function (e) {
                        var t = this.brushButtonsMapping[e];
                        t && (this.selectBrushButton(e), this.handEl.setAttribute("brush", "brush", t.toLowerCase()))
                    },
                    selectBrushButton: function (e) {
                        var t = this.uiEl.getObject3D("mesh").getObjectByName(e + "bg"),
                            s = this.selectedObjects,
                            i = this.selectedBrush;
                        i && (this.highlightMaterials[i.name] || this.initHighlightMaterial(t), i.material = this.highlightMaterials[i.name].normal, delete s[i.name]), s[t.name] = t, this.selectedBrush = t, this.playSound("ui_click1", e)
                    },
                    onHueDown: function (e) {
                        var t, s = this.objects.hueWheel,
                            i = this.colorWheelSize;
                        s.updateMatrixWorld(), s.worldToLocal(e), this.objects.hueCursor.position.copy(e);
                        var r = ((t = {
                            r: Math.sqrt(e.x * e.x + e.z * e.z),
                            theta: Math.PI + Math.atan2(-e.z, e.x)
                        }).theta * (180 / Math.PI) + 180) % 360;
                        this.hsv.h = r / 360, this.hsv.s = t.r / i, this.updateColor(), this.playSound("ui_click0", "hue")
                    },
                    updateColor: function () {
                        var e = this.hsv2rgb(this.hsv),
                            t = "rgb(" + e.r + ", " + e.g + ", " + e.b + ")";
                        this.handEl.setAttribute("brush", "color", t), this.colorHasChanged = !0
                    },
                    hsv2rgb: function (e) {
                        var t, s, i, r, a, n, o, h, u = THREE.Math.clamp(e.h, 0, 1),
                            l = THREE.Math.clamp(e.s, 0, 1),
                            d = e.v;
                        switch (n = d * (1 - l), o = d * (1 - (a = 6 * u - (r = Math.floor(6 * u))) * l), h = d * (1 - (1 - a) * l), r % 6) {
                            case 0:
                                t = d, s = h, i = n;
                                break;
                            case 1:
                                t = o, s = d, i = n;
                                break;
                            case 2:
                                t = n, s = d, i = h;
                                break;
                            case 3:
                                t = n, s = o, i = d;
                                break;
                            case 4:
                                t = h, s = n, i = d;
                                break;
                            case 5:
                                t = d, s = n, i = o
                        }
                        return {
                            r: Math.round(255 * t),
                            g: Math.round(255 * s),
                            b: Math.round(255 * i)
                        }
                    },
                    rgb2hsv: function (e, t, s) {
                        var i, r = Math.max(e, t, s),
                            a = Math.min(e, t, s),
                            n = r - a,
                            o = 0 === r ? 0 : n / r,
                            h = r;
                        switch (1 === arguments.length && (t = e.g, s = e.b, e = e.r), r) {
                            case a:
                                i = 0;
                                break;
                            case e:
                                i = t - s + n * (t < s ? 6 : 0), i /= 6 * n;
                                break;
                            case t:
                                i = s - e + 2 * n, i /= 6 * n;
                                break;
                            case s:
                                i = e - t + 4 * n, i /= 6 * n
                        }
                        return {
                            h: i,
                            s: o,
                            v: h
                        }
                    },
                    onBrightnessDown: function (e) {
                        var t = this.objects.brightnessSlider,
                            s = t.geometry.boundingBox,
                            i = s.max.z - s.min.z;
                        t.updateMatrixWorld(), t.worldToLocal(e);
                        var r = 1 - (e.z - s.min.z) / i;
                        r = THREE.Math.clamp(1.29 * r - .12, 0, 1), this.objects.hueWheel.material.uniforms.brightness.value = r, this.objects.brightnessCursor.rotation.y = 1.5 * r - 1.5, this.hsv.v = r, this.updateColor(), this.playSound("ui_click0", "brightness")
                    },
                    onBrushSizeBackgroundDown: function (e) {
                        var t = this.objects.sizeSlider,
                            s = t.geometry.boundingBox,
                            i = s.max.x - s.min.x;
                        t.updateMatrixWorld(), t.worldToLocal(e);
                        var r = (e.x - s.min.x) / i;
                        r *= AFRAME.components.brush.schema.size.max, this.handEl.setAttribute("brush", "size", r), this.playSound("ui_click0", "sizebg")
                    },
                    handleHover: function () {
                        this.updateHoverObjects(), this.updateMaterials()
                    },
                    updateHoverObjects: function () {
                        var e = this.intersectedObjects;
                        e = e.filter((function (e) {
                            return "bb" !== e.object.name && "msg_save" !== e.object.name
                        })), this.hoveredOffObjects = this.hoveredOnObjects.filter((function (t) {
                            return -1 === e.indexOf(t)
                        })), this.hoveredOnObjects = e
                    },
                    updateMaterials: (a = new THREE.Vector3, function () {
                        var e = this,
                            t = this.pressedObjects,
                            s = this.unpressedObjects,
                            i = this.selectedObjects;
                        this.hoveredOffObjects.forEach((function (t) {
                            var s = t.object;
                            s.material = e.highlightMaterials[s.name].normal
                        })), this.hoveredOnObjects.forEach((function (t) {
                            var s = t.object;
                            a.copy(t.point), e.highlightMaterials[s.name] || e.initHighlightMaterial(s), e.handRayEl.object3D.worldToLocal(a), e.handRayEl.setAttribute("line", "end", a), s.material = e.highlightMaterials[s.name].hover
                        })), Object.keys(t).forEach((function (s) {
                            var i = t[s],
                                r = e.highlightMaterials[i.name];
                            i.material = r.pressed || i.material
                        })), Object.keys(s).forEach((function (t) {
                            var i = s[t],
                                r = e.highlightMaterials[i.name];
                            i.material = r.normal, delete s[t]
                        })), Object.keys(i).forEach((function (t) {
                            var s = i[t],
                                r = e.highlightMaterials[s.name];
                            r && (s.material = r.selected)
                        }))
                    }),
                    addToggleEvent: function () {
                        this.el.addEventListener("toggleMenu", this.toggleMenu)
                    },
                    removeToggleEvent: function () {
                        this.el.removeEventListener("toggleMenu", this.toggleMenu)
                    },
                    play: function () {
                        var e = this.el,
                            t = this.handEl;
                        this.controller && this.addToggleEvent(), e.addEventListener("model-loaded", this.onModelLoaded), e.addEventListener("raycaster-intersection", this.onIntersection), e.addEventListener("raycaster-intersection-cleared", this.onIntersectionCleared), e.addEventListener("raycaster-intersected", this.onIntersected), e.addEventListener("raycaster-intersected-cleared", this.onIntersectedCleared), t && this.addHandListeners()
                    },
                    pause: function () {
                        var e = this.el,
                            t = this.handEl;
                        this.controller && this.removeToggleEvent(), e.removeEventListener("raycaster-intersection", this.onIntersection), e.removeEventListener("raycaster-intersection-cleared", this.onIntersectionCleared), e.removeEventListener("raycaster-intersected", this.onIntersected), e.removeEventListener("raycaster-intersected-cleared", this.onIntersectedCleared), t && this.removeHandListeners()
                    },
                    onModelLoaded: function (e) {
                        var t = this.uiEl.getObject3D("mesh");
                        if (t = e.detail.model, "obj" === e.detail.format && t.getObjectByName("brightnesscursor")) {
                            this.objects = {}, this.objects.brightnessCursor = t.getObjectByName("brightnesscursor"), this.objects.brightnessSlider = t.getObjectByName("brightness"), this.objects.brightnessSlider.geometry.computeBoundingBox(), this.objects.previousPage = t.getObjectByName("brushprev"), this.objects.nextPage = t.getObjectByName("brushnext"), this.objects.hueCursor = t.getObjectByName("huecursor"), this.objects.hueWheel = t.getObjectByName("hue"), this.objects.hueWheel.geometry.computeBoundingSphere(), this.colorWheelSize = this.objects.hueWheel.geometry.boundingSphere.radius, this.objects.sizeCursor = t.getObjectByName("size"), this.objects.sizeCursor.position.copy(this.cursorOffset), this.objects.colorHistory = [];
                            for (var s = 0; s < 7; s++) this.objects.colorHistory[s] = t.getObjectByName("colorhistory" + s);
                            this.objects.currentColor = t.getObjectByName("currentcolor"), this.objects.sizeSlider = t.getObjectByName("sizebg"), this.objects.sizeSlider.geometry.computeBoundingBox(), t.getObjectByName("bb").material = new THREE.MeshBasicMaterial({
                                color: 2395940,
                                alphaTest: 0,
                                visible: !1
                            });
                            var i = this;
                            this.messagesMaterial = new THREE.MeshBasicMaterial({
                                map: null,
                                transparent: !0,
                                opacity: 0
                            }), this.objects.messageSave = t.getObjectByName("msg_save"), this.objects.messageSave.material = this.messagesMaterial, this.objects.messageSave.visible = !1, this.objects.messageError = t.getObjectByName("msg_error"), this.objects.messageError.visible = !1, this.objects.messageError.material = this.messagesMaterial;
                            var r = "assets/images/messages.png";
                            this.el.sceneEl.systems.material.loadTexture(r, {
                                src: r
                            }, (function (e) {
                                var t = i.messagesMaterial;
                                t.map = e, t.needsUpdate = !0
                            })), this.el.setAttribute("animation__showmessage", {
                                dur: 500,
                                property: "ui.opacity",
                                from: 0,
                                to: 1,
                                startEvents: "showmessage"
                            }), this.el.setAttribute("animation__hidemessage", {
                                dur: 500,
                                delay: 3e3,
                                property: "ui.opacity",
                                from: 1,
                                to: 0,
                                startEvents: "animationcomplete__showmessage"
                            }), this.el.sceneEl.addEventListener("drawing-upload-completed", (function (e) {
                                a(i.objects.messageSave)
                            })), this.el.sceneEl.addEventListener("drawing-upload-error", (function (e) {
                                a(i.objects.messageError)
                            })), this.initColorWheel(), this.initColorHistory(), this.initBrushesMenu(), this.setCursorTransparency(), this.updateColorUI(this.el.getAttribute("brush").color), this.updateSizeSlider(this.el.getAttribute("brush").size)
                        }

                        function a(e) {
                            e.visible = !0, i.el.emit("showmessage")
                        }
                    },
                    initBrushesMenu: function () {
                        var e = this.objects.previousPage,
                            t = this.objects.nextPage,
                            s = Object.keys(AFRAME.BRUSHES);
                        this.initHighlightMaterial(t), this.initHighlightMaterial(e), e.visible = !1, t.visible = !1, this.brushesPerPage = 15, this.brushesPagesNum = Math.ceil(s.length / this.brushesPerPage), this.brushesPage = 0, this.loadBrushes(this.brushesPage, this.brushesPerPage)
                    },
                    setCursorTransparency: function () {
                        var e = this.objects.hueCursor,
                            t = this.objects.brightnessCursor,
                            s = this.objects.sizeCursor;
                        s.material.alphaTest = .5, e.material.alphaTest = .5, t.material.alphaTest = .5, s.material.transparent = !0, e.material.transparent = !0, t.material.transparent = !0
                    },
                    loadBrushes: (r = {}, function (e, t) {
                        var s, i, a = 0,
                            n = this.uiEl.getObject3D("mesh"),
                            o = Object.keys(AFRAME.BRUSHES),
                            h = this;
                        if (!(e < 0 || e >= this.brushesPagesNum))
                            for (this.objects.previousPage.visible = 0 !== e, e === this.brushesPagesNum - 1 ? this.objects.nextPage.visible = !1 : this.objects.nextPage.visible = !0, i = 0; i < t; i++) u(s = o[e * t + i], a, s && AFRAME.BRUSHES[s].prototype.options.thumbnail), a += 1;

                        function u(e, t, s) {
                            var i = e ? (e.charAt(0).toUpperCase() + e.slice(1)).toLowerCase() : void 0;

                            function a(e) {
                                var s = n.getObjectByName("brush" + t);
                                h.brushButtonsMapping["brush" + t] = i,
                                    function (e, t) {
                                        var s = h.brushButtonsMapping[t.name],
                                            i = r[s] || new THREE.MeshBasicMaterial;
                                        e ? (i.map = e, i.alphaTest = .5, i.transparent = !0) : r[s] || (i.visible = !1), r[s] = i, h.highlightMaterials[t.name] = {
                                            normal: i,
                                            hover: i,
                                            pressed: i,
                                            selected: i
                                        }, t.material = i
                                    }(e, s)
                            }!s || r[i] ? a() : h.el.sceneEl.systems.material.loadTexture(s, {
                                src: s
                            }, a)
                        }
                    }),
                    nextPage: function () {
                        this.brushesPage >= this.brushesPagesNum - 1 || (this.brushesPage++, this.loadBrushes(this.brushesPage, this.brushesPerPage), this.playSound("ui_click1"))
                    },
                    previousPage: function () {
                        0 !== this.brushesPage && (this.brushesPage--, this.loadBrushes(this.brushesPage, this.brushesPerPage), this.playSound("ui_click1"))
                    },
                    initHighlightMaterial: function (e) {
                        var t = e.name,
                            s = this.brushRegexp.test(t),
                            i = -1 !== t.indexOf("history"),
                            r = "hue" === t || "huecursor" === t,
                            a = {
                                normal: e.material,
                                hover: e.material,
                                pressed: e.material,
                                selected: e.material
                            };
                        s || i || r || (a.normal = e.material, a.hover = e.material.clone(), a.hover.map = this.system.hoverTexture, a.selected = e.material.clone(), a.selected.map = this.system.pressedTexture, a.pressed = e.material.clone(), a.pressed.map = this.system.pressedTexture), this.highlightMaterials[t] = a
                    },
                    toggleMenu: function (e) {
                        this.closed ? (this.system.closeAll(), this.open(), this.system.opened = this.el) : (this.close(), this.system.opened = void 0)
                    },
                    open: function () {
                        var e = this.uiEl;
                        if (this.closed) {
                            if (this.uiEl.setAttribute("visible", !0), this.uiEl.setAttribute("animation", {
                                    dur: 100,
                                    easing: "easeOutExpo",
                                    property: "scale",
                                    from: {
                                        x: 0,
                                        y: 0,
                                        z: 0
                                    },
                                    to: {
                                        x: 1,
                                        y: 1,
                                        z: 1
                                    }
                                }), this.el.setAttribute("brush", "enabled", !1), this.rayEl.setAttribute("visible", !1), this.closed = !1, this.tooltips) {
                                var t = this;
                                this.tooltips.forEach((function (s) {
                                    s.getAttribute("visible") && e.parentEl.id !== s.parentEl.id && (t.isTooltipPaused = !0, s.setAttribute("visible", !1))
                                }))
                            }
                            this.playSound("ui_menu")
                        }
                    },
                    updateIntersections: function () {
                        var e = this.raycaster = new THREE.Raycaster;
                        return function (t) {
                            this.updateRaycaster(e), this.intersectedObjects = e.intersectObjects(this.menuEls, !0)
                        }
                    }(),
                    onIntersection: function (e) {
                        var t = this.closed && this.system.opened;
                        this.el.components.brush.active || (this.rayEl.setAttribute("visible", !!t), this.el.setAttribute("brush", "enabled", !1))
                    },
                    onIntersected: function (e) {
                        var t = e.detail.el;
                        this.handEl && this.removeHandListeners(), this.handEl = t, this.handRayEl = this.handEl.components.ui.rayEl, this.menuEls = this.uiEl.object3D.children, this.syncUI(), this.addHandListeners()
                    },
                    addHandListeners: function () {
                        var e = this.handEl;
                        e.addEventListener("componentchanged", this.onComponentChanged), e.addEventListener("stroke-started", this.onStrokeStarted), e.addEventListener("triggerchanged", this.onTriggerChanged)
                    },
                    removeHandListeners: function () {
                        var e = this.handEl;
                        e.removeEventListener("componentchanged", this.onComponentChanged), e.removeEventListener("stroke-started", this.onStrokeStarted), e.removeEventListener("triggerchanged", this.onTriggerChanged)
                    },
                    onComponentChanged: function (e) {
                        "brush" === e.detail.name && this.syncUI()
                    },
                    syncUI: function () {
                        var e;
                        this.handEl && this.objects && (e = this.handEl.getAttribute("brush"), this.updateSizeSlider(e.size), this.updateColorUI(e.color), this.updateColorHistory())
                    },
                    initColorHistory: function () {
                        for (var e, t = this.objects.currentColor, s = 0; s < this.objects.colorHistory.length; s++)(e = this.objects.colorHistory[s]).material = e.material.clone(), e.material.map = this.system.selectedTexture;
                        t.material = t.material.clone(), t.material.map = this.system.selectedTexture, this.updateColorHistory()
                    },
                    updateColorHistory: function () {
                        var e = this.handEl && this.handEl.getAttribute("brush").color,
                            t = this.colorStack;
                        e || (e = this.el.components.brush.schema.color.default), this.objects.currentColor.material.color.set(e);
                        for (var s = 0; s < t.length; s++) e = t[t.length - s - 1], this.objects.colorHistory[s].material.color.set(e)
                    },
                    updateSizeSlider: function (e) {
                        var t = this.objects.sizeSlider.geometry.boundingBox,
                            s = this.objects.sizeCursor,
                            i = t.max.x - t.min.x,
                            r = e / AFRAME.components.brush.schema.size.max,
                            a = r * i;
                        s.position.setX(a - this.cursorOffset.x);
                        var n = r + .3;
                        s.scale.set(n, 1, n)
                    },
                    updateColorUI: function (e) {
                        var t = new THREE.Color(e),
                            s = this.hsv = this.rgb2hsv(t.r, t.g, t.b),
                            i = 2 * s.h * Math.PI,
                            r = s.s * this.colorWheelSize,
                            a = r * Math.cos(i),
                            n = r * Math.sin(i);
                        this.objects.hueCursor.position.setX(a), this.objects.hueCursor.position.setZ(-n), this.objects.hueWheel.material.uniforms.brightness.value = this.hsv.v, this.objects.brightnessCursor.rotation.y = 1.5 * this.hsv.v - 1.5
                    },
                    updateBrushSelector: function (e) {
                        var t = this,
                            s = Object.keys(this.brushButtonsMapping),
                            i = this.brushButtonsMapping;
                        s.forEach((function (s) {
                            i[s] === e && t.selectBrushButton(s)
                        }))
                    },
                    onIntersectionCleared: function () {
                        this.checkMenuIntersections = !1, this.rayEl.setAttribute("visible", !1), this.el.setAttribute("brush", "enabled", !0)
                    },
                    onIntersectedCleared: function (e) {
                        this.handEl && this.handEl.removeEventListener("triggerchanged", this.onTriggerChanged)
                    },
                    onStrokeStarted: function () {
                        var e, t = this.colorStack;
                        this.colorHasChanged && (e = this.handEl.getAttribute("brush").color, this.colorHasChanged = !1, 7 === t.length && t.shift(), t.push(e), this.syncUI())
                    },
                    updateRaycaster: (e = new THREE.Vector3, t = new THREE.Quaternion, s = new THREE.Vector3, i = new THREE.Vector3, function (r) {
                        var a = this.handEl.object3D;
                        a.updateMatrixWorld(), a.matrixWorld.decompose(i, t, s), e.set(0, 0, -1), e.applyAxisAngle(new THREE.Vector3(1, 0, 0), -this.rayAngle / 360 * 2 * Math.PI), e.applyQuaternion(t), r.far = this.rayDistance, r.set(i, e)
                    }),
                    close: function () {
                        this.closed || (this.uiEl.setAttribute("animation", {
                            dur: 100,
                            easing: "easeOutExpo",
                            property: "scale",
                            from: {
                                x: 1,
                                y: 1,
                                z: 1
                            },
                            to: {
                                x: 0,
                                y: 0,
                                z: 0
                            }
                        }), this.el.setAttribute("brush", "enabled", !0), this.closed = !0, this.tooltips && this.isTooltipPaused && (this.isTooltipPaused = !1, this.tooltips.forEach((function (e) {
                            e.setAttribute("visible", !0)
                        }))), this.playSound("ui_menu"))
                    },
                    playSound: function (e, t) {
                        void 0 !== t && this.pressedObjects[t] || document.getElementById(e).play()
                    }
                })
            },
            821: () => {
                window.addEventListener("load", (function (e) {
                    var t = document.body;
                    t.addEventListener("dragover", (function (e) {
                        e.stopPropagation(), e.preventDefault(), e.dataTransfer.dropEffect = "copy"
                    }), !1), t.addEventListener("drop", (function (e) {
                        e.stopPropagation(), e.preventDefault();
                        for (var t = e.dataTransfer.files, s = 0; s < t.length; s++) {
                            var i = t[s];
                            if (".apa" === i.name.substring(i.name.length - 4).toLowerCase())(r = new FileReader).onload = function (e) {
                                document.querySelector("a-scene").systems.brush.loadBinary(e.target.result)
                            }, r.readAsArrayBuffer(i);
                            else if (".json" === i.name.substring(i.name.length - 5).toLowerCase()) {
                                var r;
                                (r = new FileReader).onload = function (e) {
                                    document.querySelector("a-scene").systems.brush.loadJSON(JSON.parse(e.target.result))
                                }, r.readAsText(i)
                            } else ".obj" === i.name.substring(i.name.length - 4).toLowerCase() ? ((r = new FileReader).onload = function (e) {
                                for (var t = (new AFRAME.THREE.OBJLoader).parse(e.target.result), s = document.createElement("a-entity"), i = 0; i < t.children.length; i++) {
                                    var r = t.children[i];
                                    r.material.constructor === Array ? r.material.forEach((e => {
                                        e.color.set("#333")
                                    })) : r.material.color.set("#333")
                                }
                                s.setObject3D("mesh", t), s.className = "templateitem", document.querySelector("a-scene").appendChild(s)
                            }, r.readAsText(i)) : i.type.match(/image.*/) && ((r = new FileReader).onload = function (e) {
                                var t = new Image;
                                t.src = e.target.result, t.onload = () => {
                                    var s, i;
                                    t.width > t.height ? (s = 1, i = t.height / t.width) : (i = 1, s = t.width / t.height);
                                    var r = [3 * Math.random() - 1.5, 1 + Math.random() - .5, .2 * Math.random() - 1.4],
                                        a = document.createElement("a-image");
                                    a.setAttribute("src", e.target.result), a.setAttribute("position", r.join(" ")), a.setAttribute("width", s), a.setAttribute("height", i), a.className = "templateitem", document.querySelector("a-scene").appendChild(a)
                                }
                            }, r.readAsDataURL(i))
                        }
                    }), !1)
                }))
            },
            51: e => {
                e.exports = function (e) {
                    function t() {
                        var t = document.querySelector("a-scene");
                        t.hasLoaded ? e() : t.addEventListener("loaded", e())
                    }
                    "complete" === document.readyState || "loaded" === document.readyState ? t() : document.addEventListener("DOMContentLoaded", t)
                }
            },
            115: e => {
                function t(e) {
                    this.material = e, this.maxBufferSize = 1e6, this.geometries = [], this.current = null, this.strip = !0, this.addBuffer(!1)
                }
                t.prototype = {
                    restartPrimitive: function () {
                        if (this.idx.position >= this.current.attributes.position.count) this.addBuffer(!1);
                        else if (0 !== this.idx.position) {
                            var e = 3 * (this.idx.position - 1),
                                t = this.current.attributes.position.array;
                            this.addVertex(t[e++], t[e++], t[e++]), this.idx.color++, this.idx.normal++, this.idx.uv++
                        }
                    },
                    remove: function (e, t) {
                        var s = this.current.attributes.position.array;
                        if (this.idx.position > t.position)
                            for (key in this.idx)
                                for (var i = "uv" === key ? 2 : 3, r = (s = e[key] * i, (t[key] + 1) * i), a = this.idx[key] * i, n = r; n < a; n++) this.current.attributes[key].array[s++] = this.current.attributes[key].array[n];
                        for (key in this.idx) {
                            var o = t[key] - e[key];
                            this.idx[key] -= o
                        }
                        this.update()
                    },
                    undo: function (e) {
                        for (let t = e.position; t < this.idx.position; t++) this.current.attributes.position.setXYZ(t, 0, 0, 0), this.current.index.setXYZ(t, 0, 0, 0);
                        this.idx = e, this.update()
                    },
                    addBuffer: function (e) {
                        var t = new THREE.BufferGeometry,
                            s = new Float32Array(3 * this.maxBufferSize),
                            i = new Uint32Array(4.5 * this.maxBufferSize),
                            r = new Float32Array(3 * this.maxBufferSize),
                            a = new Float32Array(2 * this.maxBufferSize),
                            n = new Float32Array(3 * this.maxBufferSize),
                            o = new THREE.Mesh(t, this.material);
                        o.frustumCulled = !1, o.vertices = s, this.object3D = new THREE.Object3D;
                        var h = document.querySelector(".a-drawing");
                        if (h || ((h = document.createElement("a-entity")).className = "a-drawing", document.querySelector("a-scene").appendChild(h)), h.object3D.add(this.object3D), this.object3D.add(o), t.setDrawRange(0, 0), t.setAttribute("position", new THREE.BufferAttribute(s, 3).setUsage(THREE.DynamicDrawUsage)), t.attributes.position.updateRange.count = 0, t.setIndex(new THREE.BufferAttribute(i, 3).setUsage(THREE.DynamicDrawUsage)), t.index.updateRange.count = 0, t.setAttribute("uv", new THREE.BufferAttribute(a, 2).setUsage(THREE.DynamicDrawUsage)), t.attributes.uv.updateRange.count = 0, t.setAttribute("normal", new THREE.BufferAttribute(r, 3).setUsage(THREE.DynamicDrawUsage)), t.attributes.normal.updateRange.count = 0, t.setAttribute("color", new THREE.BufferAttribute(n, 3).setUsage(THREE.DynamicDrawUsage)), t.attributes.color.updateRange.count = 0, this.previous = null, this.geometries.length > 0 && (this.previous = this.current), this.idx = {
                                position: 0,
                                uv: 0,
                                normal: 0,
                                color: 0
                            }, this.geometries.push(t), this.current = t, this.previous && e) {
                            var u = 3 * (this.maxBufferSize - 2),
                                l = 3 * (this.maxBufferSize - 2),
                                d = (this.maxBufferSize, 3 * (this.maxBufferSize - 2)),
                                c = this.previous.attributes.position.array;
                            this.addVertex(c[u++], c[u++], c[u++]), this.addVertex(c[u++], c[u++], c[u++]);
                            var m = this.previous.attributes.normal.array;
                            this.addNormal(m[d++], m[d++], m[d++]), this.addNormal(m[d++], m[d++], m[d++]);
                            var p = this.previous.attributes.color.array;
                            this.addColor(p[l++], p[l++], p[l++]), this.addColor(p[l++], p[l++], p[l++]);
                            a = this.previous.attributes.uv.array
                        }
                    },
                    addColor: function (e, t, s) {
                        this.current.attributes.color.setXYZ(this.idx.color++, e, t, s)
                    },
                    addNormal: function (e, t, s) {
                        this.current.attributes.normal.setXYZ(this.idx.normal++, e, t, s)
                    },
                    addVertex: function (e, t, s) {
                        var i = this.current.attributes.position;
                        this.idx.position === i.count && (this.addBuffer(!0), i = this.current.attributes.position), i.setXYZ(this.idx.position++, e, t, s), this.strip ? (this.idx.position + 1) % 2 == 0 && this.idx.position > 1 && (this.current.index.setXYZ(this.idx.position - 3, this.idx.position - 3, this.idx.position - 2, this.idx.position - 1), this.current.index.setXYZ(this.idx.position - 2, this.idx.position - 1, this.idx.position - 2, this.idx.position)) : (this.idx.position + 1) % 3 == 0 && this.current.index.setXYZ(this.idx.position, this.idx.position - 2, this.idx.position - 1, this.idx.position)
                    },
                    addUV: function (e, t) {
                        this.current.attributes.uv.setXY(this.idx.uv++, e, t)
                    },
                    update: function () {
                        this.current.setDrawRange(0, 3 * this.idx.position - 4), this.current.attributes.color.updateRange.count = 3 * this.idx.position, this.current.attributes.color.needsUpdate = !0, this.current.attributes.normal.updateRange.count = 3 * this.idx.position, this.current.attributes.normal.needsUpdate = !0, this.current.attributes.position.updateRange.count = 3 * this.idx.position, this.current.attributes.position.needsUpdate = !0, this.current.attributes.uv.updateRange.count = 2 * this.idx.position, this.current.attributes.uv.needsUpdate = !0, this.current.index.updateRange.count = 3 * this.idx.position, this.current.index.needsUpdate = !0
                    }
                }, e.exports = t
            },
            297: (e, t, s) => {
                var i = s(115);

                function r() {
                    this.sharedBuffers = {}
                }
                r.prototype = {
                    addSharedBuffer: function (e, t) {
                        var s = new i(t);
                        this.sharedBuffers[e] = s
                    },
                    getSharedBuffer: function (e) {
                        return this.sharedBuffers[e]
                    }
                }, e.exports = new r
            },
            796: () => {
                var e, t;
                AFRAME.BRUSHES = {}, APAINTER_STATS = {
                    brushes: {}
                }, AFRAME.registerBrush = function (e, t, s) {
                    var i = {};
                    if (Object.keys(t).forEach((function (e) {
                            i[e] = {
                                value: t[e],
                                writable: !0
                            }
                        })), AFRAME.BRUSHES[e]) throw new Error("The brush `" + e + "` has been already registered. Check that you are not loading two versions of the same brush or two different brushes of the same name.");
                    var r = function () {};
                    r.prototype = {
                        options: Object.assign({
                            spacing: 0,
                            maxPoints: 0
                        }, s),
                        reset: function () {},
                        tick: function (e, t) {},
                        undo: function () {},
                        remove: function () {},
                        addPoint: function (e, t, s, i, r) {},
                        getJSON: function (e) {
                            for (var t = [], s = 0; s < this.data.points.length; s++) {
                                var i = this.data.points[s];
                                t.push({
                                    orientation: Utils.arrayNumbersToFixed(i.orientation.toArray()),
                                    position: Utils.arrayNumbersToFixed(i.position.toArray()),
                                    pressure: Utils.numberToFixed(i.pressure),
                                    timestamp: i.timestamp
                                })
                            }
                            return {
                                brush: {
                                    index: e.getUsedBrushes().indexOf(this.brushName),
                                    color: Utils.arrayNumbersToFixed(this.data.color.toArray()),
                                    size: Utils.numberToFixed(this.data.size)
                                },
                                points: t
                            }
                        },
                        getBinary: function (e) {
                            var t = 21 + 36 * this.data.points.length,
                                s = new BinaryManager(new ArrayBuffer(t));
                            s.writeUint8(e.getUsedBrushes().indexOf(this.brushName)), s.writeColor(this.data.color), s.writeFloat32(this.data.size), s.writeUint32(this.data.points.length);
                            for (var i = 0; i < this.data.points.length; i++) {
                                var r = this.data.points[i];
                                s.writeFloat32Array(r.position.toArray()), s.writeFloat32Array(r.orientation.toArray()), s.writeFloat32(r.pressure), s.writeUint32(r.timestamp)
                            }
                            return s.getDataView()
                        }
                    };
                    var a, n, o = function () {};
                    return (o.prototype = Object.create(r.prototype, i)).brushName = e, o.prototype.constructor = o, o.prototype.init = (a = o.prototype.init, function (e, t, s, i) {
                        this.object3D = new THREE.Object3D, this.data = {
                            points: [],
                            size: t,
                            prevPosition: null,
                            prevPointerPosition: null,
                            numPoints: 0,
                            color: e.clone(),
                            timestamp: i,
                            owner: s
                        }, a.call(this, e, t)
                    }), o.prototype.addPoint = (n = o.prototype.addPoint, function (e, t, s, i, r) {
                        this.data.prevPosition && this.data.prevPosition.distanceTo(e) <= this.options.spacing || 0 !== this.options.maxPoints && this.data.numPoints >= this.options.maxPoints || n.call(this, e, t, s, i, r) && (this.data.numPoints++, this.data.points.push({
                            position: e.clone(),
                            orientation: t.clone(),
                            pressure: i,
                            timestamp: r
                        }), this.data.prevPosition = e.clone(), this.data.prevPointerPosition = s.clone())
                    }), AFRAME.BRUSHES[e] = o, o.used = !1, o
                }, AFRAME.registerSystem("brush", {
                    schema: {},
                    brushes: {},
                    strokes: [],
                    getUsedBrushes: function () {
                        return Object.keys(AFRAME.BRUSHES).filter((function (e) {
                            return AFRAME.BRUSHES[e].used
                        }))
                    },
                    getBrushByName: function (e) {
                        return AFRAME.BRUSHES[e]
                    },
                    undo: function () {
                        for (var e, t = this.strokes.length - 1; t >= 0; t--)
                            if ("local" === this.strokes[t].data.owner) {
                                e = this.strokes.splice(t, 1)[0];
                                break
                            } e && (e.undo(), document.querySelector(".a-drawing").emit("stroke-removed", {
                            stroke: e
                        }))
                    },
                    removeById: function (e) {
                        var t = this.strokes[1];
                        if (console.log(t, this.strokes), t) {
                            for (var s = this.strokes.length - 1; s > 1; s--)
                                if (stroke = this.strokes[s], t.sharedBuffer === stroke.sharedBuffer) {
                                    for (key in console.log(">>>", stroke.prevIdx, "->", stroke.idx, "target", t.prevIdx, "->", t.idx), t.idx) {
                                        var i = t.idx[key] - t.prevIdx[key];
                                        stroke.idx[key] -= i, stroke.prevIdx[key] -= i
                                    }
                                    console.log("<<<", stroke.idx, stroke.prevIdx)
                                } this.strokes.splice(1, 1)[0].remove()
                        }
                    },
                    clear: function () {
                        for (var e = this.strokes.length - 1; e >= 0; e--)
                            if ("local" === this.strokes[e].data.owner) {
                                var t = this.strokes[e];
                                t.undo(), document.querySelector(".a-drawing").emit("stroke-removed", {
                                    stroke: t
                                })
                            } Object.keys(AFRAME.BRUSHES).forEach((function (e) {
                            AFRAME.BRUSHES[e].used = !1
                        })), this.strokes = []
                    },
                    init: function () {
                        this.version = 1, this.clear(), this.controllerName = null;
                        var e = this;
                        this.sceneEl.addEventListener("controllerconnected", (function (t) {
                            e.controllerName = t.detail.name
                        }))
                    },
                    tick: function (e, t) {
                        if (this.strokes.length)
                            for (var s = 0; s < this.strokes.length; s++) this.strokes[s].tick(e, t)
                    },
                    generateTestLines: function () {
                        var e = Object.keys(AFRAME.BRUSHES);
                        brushesNames2 = ["leaf1", "fur2", "star", "squared-textured", "flat", "squared-textured", "lines5"];
                        var t = -.6 * e.length / 2;
                        t = 0;
                        e.forEach((function (e) {
                            var s = new THREE.Color(Math.random(), Math.random(), Math.random()),
                                i = this.addNewStroke(e, s, .5),
                                r = document.querySelector("#left-hand");
                            r.emit("stroke-started", {
                                entity: r,
                                stroke: i
                            });
                            for (var a = new THREE.Vector3(t, 0, -2), n = new THREE.Vector3, o = 0; o < 4; o++) {
                                var h = new THREE.Quaternion;
                                n.set(0, .75, .1);
                                var u = new THREE.Euler(0, Math.PI, 0);
                                h.setFromEuler(u), a = a.add(n);
                                var l = this.getPointerPosition(a, h);
                                i.addPoint(a, h, l, 1, 0)
                            }
                            t += .6
                        }))
                    },
                    generateRandomStrokes: function (e) {
                        function t() {
                            return 2 * Math.random() - 1
                        }
                        for (var s = document.querySelector("#left-hand"), i = Object.keys(AFRAME.BRUSHES), r = 0; r < e; r++) {
                            var a = i[parseInt(13 * Math.random())],
                                n = new THREE.Color(Math.random(), Math.random(), Math.random()),
                                o = .3 * Math.random(),
                                h = parseInt(500 * Math.random()),
                                u = this.addNewStroke(a, n, o);
                            s.emit("stroke-started", {
                                entity: s,
                                stroke: u
                            });
                            for (var l = new THREE.Vector3(t(), t(), t()), d = new THREE.Vector3, c = new THREE.Quaternion, m = .2, p = 0; p < h; p++) {
                                d.set(t(), t(), t()), d.multiplyScalar(t() / 20), c.setFromUnitVectors(l.clone().normalize(), d.clone().normalize()), (l = l.add(d)).y < 0 && (l.y = -l.y);
                                (m += 1 - 2 * Math.random()) < 0 && (m = .2), m > 1 && (m = 1);
                                var f = this.getPointerPosition(l, c);
                                u.addPoint(l, c, f, m, 0)
                            }
                        }
                    },
                    addNewStroke: function (e, t, s, i, r) {
                        APAINTER_STATS.brushes[e] || (APAINTER_STATS.brushes[e] = 0), APAINTER_STATS.brushes[e]++, i = i || "local", r = r || Date.now();
                        var a = this.getBrushByName(e);
                        if (!a) {
                            var n = Object.keys(AFRAME.BRUSHES)[0];
                            a = AFRAME.BRUSHES[n], console.warn("Invalid brush name: `" + e + "` using `" + n + "`")
                        }
                        a.used = !0;
                        var o = new a;
                        o.brush = a, o.init(t, s, i, r), this.strokes.push(o);
                        var h = document.querySelector(".a-drawing");
                        return h || ((h = document.createElement("a-entity")).className = "a-drawing", document.querySelector("a-scene").appendChild(h)), o
                    },
                    getJSON: function () {
                        var e = {
                            version: 1,
                            strokes: [],
                            author: "",
                            brushes: this.getUsedBrushes()
                        };
                        for (i = 0; i < this.strokes.length; i++) e.strokes.push(this.strokes[i].getJSON(this));
                        return e
                    },
                    getBinary: function () {
                        var e = [],
                            t = "apainter",
                            s = this.getUsedBrushes(),
                            i = t.length + s.join(" ").length + 9,
                            r = new BinaryManager(new ArrayBuffer(i));
                        r.writeString(t), r.writeUint16(1), r.writeUint8(s.length);
                        for (var a = 0; a < s.length; a++) r.writeString(s[a]);
                        for (r.writeUint32(this.strokes.length), e.push(r.getDataView()), a = 0; a < this.strokes.length; a++) e.push(this.strokes[a].getBinary(this));
                        return e
                    },
                    getPointerPosition: (e = new THREE.Vector3, t = {
                        "vive-controls": {
                            vec: {
                                left: new THREE.Vector3(0, .7, 1),
                                right: new THREE.Vector3(0, .7, 1)
                            },
                            mult: -.03
                        },
                        "oculus-touch-controls": {
                            vec: {
                                left: new THREE.Vector3(-2, 0, 2.8),
                                right: new THREE.Vector3(2, 0, 2.8)
                            },
                            mult: -.025
                        },
                        "windows-motion-controls": {
                            vec: {
                                left: new THREE.Vector3(0, 0, 1),
                                right: new THREE.Vector3(0, 0, 1)
                            },
                            mult: -.12
                        }
                    }, function (s, i, r) {
                        if (!this.controllerName) return s;
                        var a = t[this.controllerName],
                            n = a.vec[r].clone().applyQuaternion(i).normalize().multiplyScalar(a.mult);
                        return e.copy(s).add(n), e
                    }),
                    loadJSON: function (e) {
                        1 !== e.version && console.error("Invalid version: ", e.version, "(Expected: 1)"), console.time("JSON Loading");
                        for (var t = 0; t < e.strokes.length; t++)
                            for (var s = e.strokes[t], i = s.brush, r = this.addNewStroke(e.brushes[i.index], (new THREE.Color).fromArray(i.color), i.size), a = 0; a < s.points.length; a++) {
                                var n = s.points[a],
                                    o = (new THREE.Vector3).fromArray(n.position),
                                    h = (new THREE.Quaternion).fromArray(n.orientation),
                                    u = n.pressure,
                                    l = n.timestamp,
                                    d = this.getPointerPosition(o, h);
                                r.addPoint(o, h, d, u, l)
                            }
                        console.timeEnd("JSON Loading")
                    },
                    loadBinary: function (e) {
                        var t = new BinaryManager(e);
                        if ("apainter" === t.readString()) {
                            var s = t.readUint16();
                            1 !== s && console.error("Invalid version: ", s, "(Expected: 1)"), console.time("Binary Loading");
                            for (var i = t.readUint8(), r = [], a = 0; a < i; a++) r.push(t.readString());
                            for (var n = t.readUint32(), o = 0; o < n; o++)
                                for (var h = t.readUint8(), u = t.readColor(), l = t.readFloat(), d = t.readUint32(), c = this.addNewStroke(r[h], u, l), m = 0; m < d; m++) {
                                    var p = t.readVector3(),
                                        f = t.readQuaternion(),
                                        g = t.readFloat(),
                                        b = t.readUint32(),
                                        v = this.getPointerPosition(p, f);
                                    c.addPoint(p, f, v, g, b)
                                }
                            console.timeEnd("Binary Loading")
                        } else console.error("Invalid `magic` header")
                    },
                    loadFromUrl: function (e, t) {
                        var s = new THREE.XHRLoader(this.manager);
                        s.crossOrigin = "anonymous", !0 === t && s.setResponseType("arraybuffer");
                        var i = this;
                        s.load(e, (function (e) {
                            !0 === t ? i.loadBinary(e) : i.loadJSON(JSON.parse(e))
                        }))
                    }
                })
            },
            810: (e, t, s) => {
                var i = s(618).saveAs;
                AFRAME.registerSystem("painter", {
                    init: function () {
                        var e = {
                            behaviours: {},
                            mappings: {
                                painting: {
                                    common: {
                                        "grip.down": "undo",
                                        "trigger.changed": "paint"
                                    },
                                    "vive-controls": {
                                        axismove: "changeBrushSizeInc",
                                        "trackpad.touchstart": "startChangeBrushSize",
                                        "menu.down": "toggleMenu",
                                        "trackpad.down": "aim",
                                        "trackpad.up": "teleport"
                                    },
                                    "oculus-touch-controls": {
                                        axismove: "changeBrushSizeAbs",
                                        "abutton.down": "toggleMenu",
                                        "xbutton.down": "toggleMenu",
                                        "ybutton.down": "aim",
                                        "ybutton.up": "teleport",
                                        "bbutton.down": "aim",
                                        "bbutton.up": "teleport"
                                    },
                                    "windows-motion-controls": {
                                        axismove: "changeBrushSizeAbs",
                                        "menu.down": "toggleMenu",
                                        "trackpad.down": "aim",
                                        "trackpad.up": "teleport"
                                    }
                                }
                            }
                        };
                        this.sceneEl.addEventListener("loaded", (function () {
                            AFRAME.registerInputMappings(e), AFRAME.currentInputMapping = "painting"
                        })), this.version = "1.2", this.brushSystem = this.sceneEl.systems.brush, this.showTemplateItems = !0;
                        var t = function () {
                            var e, t = /\+/g,
                                s = /([^&=]+)=?([^&]*)/g,
                                i = function (e) {
                                    return decodeURIComponent(e.replace(t, " "))
                                },
                                r = window.location.search.substring(1),
                                a = {};
                            for (e = s.exec(r); e;) a[i(e[1])] = i(e[2]), e = s.exec(r);
                            return a
                        }();
                        if (t.url || t.urljson) {
                            var s = void 0 === t.urljson;
                            this.brushSystem.loadFromUrl(t.url || t.urljson, s), document.getElementById("logo").setAttribute("visible", !1), document.getElementById("acamera").setAttribute("orbit-controls", "initialPosition: 0 1.6 3"), document.getElementById("apainter-logo").classList.remove("hidden")
                        } else {
                            document.getElementById("acamera").setAttribute("position", "0 1.6 0")
                        }
                        void 0 !== t.bgcolor && (document.body.style.backgroundColor = "#" + t.bgcolor), void 0 !== t.sky && this.sceneEl.addEventListener("loaded", (function (e) {
                            "" === t.sky ? document.getElementById("sky").setAttribute("visible", !1) : document.getElementById("sky").setAttribute("material", "src", t.sky)
                        })), void 0 !== t.floor && this.sceneEl.addEventListener("loaded", (function (e) {
                            "" === t.floor ? document.getElementById("ground").setAttribute("visible", !1) : document.getElementById("ground").setAttribute("material", "src", t.floor)
                        })), this.paintingStarted = !1;
                        var i = this;
                        document.addEventListener("stroke-started", (function (e) {
                            if (!i.paintingStarted) {
                                document.getElementById("logo").emit("painting-started"), i.paintingStarted = !0
                            }
                        })), document.addEventListener("keyup", (function (e) {
                            if (!e.shiftKey && !e.ctrlKey) {
                                if (8 === e.keyCode && i.brushSystem.undo(), 67 === e.keyCode && i.brushSystem.clear(), 71 === e.keyCode) {
                                    var t = document.querySelector(".a-drawing");
                                    i.sceneEl.systems["gltf-exporter"].export(t)
                                }
                                if (78 === e.keyCode) {
                                    var s = document.querySelectorAll("[paint-controls]"),
                                        r = Object.keys(AFRAME.BRUSHES),
                                        a = r.indexOf(s[0].components.brush.data.brush);
                                    a = (a + 1) % r.length, [].forEach.call(s, (function (e) {
                                        e.setAttribute("brush", "brush", r[a])
                                    }))
                                }
                                if (84 === e.keyCode && i.brushSystem.generateTestLines(), 82 === e.keyCode && i.brushSystem.generateRandomStrokes(1), 76 === e.keyCode && i.brushSystem.loadFromUrl("demo.apa", !0), 85 === e.keyCode && i.upload(), 86 === e.keyCode && i.save(), 74 === e.keyCode && i.saveJSON(), 79 === e.keyCode) {
                                    i.showTemplateItems = !i.showTemplateItems;
                                    for (var n = document.querySelectorAll(".templateitem"), o = 0; o < n.length; o++) n[o].setAttribute("visible", i.showTemplateItems)
                                }
                                88 === e.keyCode && i.brushSystem.removeById(2)
                            }
                        })), console.info("A-PAINTER Version: " + this.version)
                    },
                    saveJSON: function () {
                        var e = this.brushSystem.getJSON(),
                            t = new Blob([JSON.stringify(e)], {
                                type: "application/json"
                            });
                        i(t, "demo.json")
                    },
                    save: function () {
                        var e = this.brushSystem.getBinary(),
                            t = new Blob(e, {
                                type: "application/octet-binary"
                            });
                        i(t, "demo.apa")
                    },
                    upload: function () {
                        this.sceneEl.emit("drawing-upload-started");
                        var e = this,
                            t = "https://aframe.io/a-painter/?url=",
                            s = this.brushSystem.getBinary(),
                            i = new Blob(s, {
                                type: "application/octet-binary"
                            });
                        const r = new FormData;
                        r.append("upload_preset", "upload_painting"), r.append("file", i), fetch("https://api.cloudinary.com/v1_1/a-painter/upload", {
                            method: "POST",
                            body: r
                        }).then((e => {
                            if (!e.ok) throw new Error(`Network request failed with status ${e.status}: ${e.statusText}`);
                            return e.json()
                        })).then((s => {
                            console.log("Uploaded link: ", t + s.secure_url), e.sceneEl.emit("drawing-upload-completed", {
                                url: t + s.secure_url
                            })
                        })).catch((t => {
                            console.error(t), e.sceneEl.emit("drawing-upload-error", {
                                errorInfo: t
                            })
                        }))
                    }
                })
            },
            493: () => {
                AFRAME.registerSystem("ui", {
                    init: function () {
                        this.initTextures()
                    },
                    initTextures: function () {
                        var e = this,
                            t = "assets/images/ui-hover.png",
                            s = "assets/images/ui-pressed.png";
                        this.sceneEl.systems.material.loadTexture(t, {
                            src: t
                        }, (function (t) {
                            e.hoverTexture = t
                        })), this.sceneEl.systems.material.loadTexture(s, {
                            src: s
                        }, (function (t) {
                            e.pressedTexture = t
                        }))
                    },
                    closeAll: function () {
                        var e, t = document.querySelectorAll("[ui]");
                        for (e = 0; e < t.length; e++) t[e].components.ui.close()
                    }
                })
            },
            369: () => {
                window.addEventListener("load", (function (e) {
                    var t = document.getElementById("apainter-ui"),
                        s = document.querySelector("#apainter-ui .share"),
                        i = document.getElementById("apainter-share-url"),
                        r = document.querySelector("#apainter-ui .progress"),
                        a = document.querySelector("#apainter-ui .bar");
                    document.addEventListener("drawing-upload-completed", (function (e) {
                        s.classList.remove("hide"), r.classList.add("hide"), i.value = e.detail.url
                    })), document.addEventListener("drawing-upload-started", (function (e) {
                        t.style.display = "block", s.classList.add("hide"), r.classList.remove("hide")
                    })), document.addEventListener("drawing-upload-progress", (function (e) {
                        a.style.width = Math.floor(100 * e.detail.progress) + "%"
                    })), new Clipboard(".button.copy").on("error", (function (e) {
                        console.error("Error copying to clipboard:", e.action, e.trigger)
                    }))
                }))
            },
            555: () => {
                window.Utils = function () {
                    function e(e) {
                        return parseFloat(e.toFixed(6))
                    }
                    return {
                        numberToFixed: e,
                        arrayNumbersToFixed: function (t) {
                            for (var s = 0; s < t.length; s++) t[s] = e(t[s]);
                            return t
                        },
                        getTooltips: function (e) {
                            var t;
                            switch (e) {
                                case "windows-motion-samsung-controls":
                                    t = ".windows-motion-samsung-tooltips";
                                    break;
                                case "windows-motion-controls":
                                    t = ".windows-motion-tooltips";
                                    break;
                                case "oculus-touch-controls":
                                    t = ".oculus-tooltips";
                                    break;
                                case "vive-controls":
                                    t = ".vive-tooltips"
                            }
                            return Array.prototype.slice.call(document.querySelectorAll(t))
                        }
                    }
                }()
            },
            618: function (e, t, s) {
                var i, r = r || function (e) {
                    "use strict";
                    if (!(void 0 === e || "undefined" != typeof navigator && /MSIE [1-9]\./.test(navigator.userAgent))) {
                        var t = e.document,
                            s = function () {
                                return e.URL || e.webkitURL || e
                            },
                            i = t.createElementNS("http://www.w3.org/1999/xhtml", "a"),
                            r = "download" in i,
                            a = /constructor/i.test(e.HTMLElement),
                            n = /CriOS\/[\d]+/.test(navigator.userAgent),
                            o = function (t) {
                                (e.setImmediate || e.setTimeout)((function () {
                                    throw t
                                }), 0)
                            },
                            h = function (e) {
                                setTimeout((function () {
                                    "string" == typeof e ? s().revokeObjectURL(e) : e.remove()
                                }), 4e4)
                            },
                            u = function (e, t, s) {
                                for (var i = (t = [].concat(t)).length; i--;) {
                                    var r = e["on" + t[i]];
                                    if ("function" == typeof r) try {
                                        r.call(e, s || e)
                                    } catch (e) {
                                        o(e)
                                    }
                                }
                            },
                            l = function (e) {
                                return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob([String.fromCharCode(65279), e], {
                                    type: e.type
                                }) : e
                            },
                            d = function (t, o, d) {
                                d || (t = l(t));
                                var c, m = this,
                                    p = "application/octet-stream" === t.type,
                                    f = function () {
                                        u(m, "writestart progress write writeend".split(" "))
                                    };
                                if (m.readyState = m.INIT, r) return c = s().createObjectURL(t), void setTimeout((function () {
                                    i.href = c, i.download = o,
                                        function (e) {
                                            var t = new MouseEvent("click");
                                            e.dispatchEvent(t)
                                        }(i), f(), h(c), m.readyState = m.DONE
                                }));
                                ! function () {
                                    if ((n || p && a) && e.FileReader) {
                                        var i = new FileReader;
                                        return i.onloadend = function () {
                                            var t = n ? i.result : i.result.replace(/^data:[^;]*;/, "data:attachment/file;");
                                            e.open(t, "_blank") || (e.location.href = t), t = void 0, m.readyState = m.DONE, f()
                                        }, i.readAsDataURL(t), void(m.readyState = m.INIT)
                                    }(c || (c = s().createObjectURL(t)), p) ? e.location.href = c: e.open(c, "_blank") || (e.location.href = c);
                                    m.readyState = m.DONE, f(), h(c)
                                }()
                            },
                            c = d.prototype;
                        return "undefined" != typeof navigator && navigator.msSaveOrOpenBlob ? function (e, t, s) {
                            return t = t || e.name || "download", s || (e = l(e)), navigator.msSaveOrOpenBlob(e, t)
                        } : (c.abort = function () {}, c.readyState = c.INIT = 0, c.WRITING = 1, c.DONE = 2, c.error = c.onwritestart = c.onprogress = c.onwrite = c.onabort = c.onerror = c.onwriteend = null, function (e, t, s) {
                            return new d(e, t || e.name || "download", s)
                        })
                    }
                }("undefined" != typeof self && self || "undefined" != typeof window && window || this.content); /*!@source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js*/
                e.exports ? e.exports.saveAs = r : null !== s.amdD && null !== s.amdO && (void 0 === (i = function () {
                    return r
                }.apply(t, [])) || (e.exports = i))
            },
            95: e => {
                "use strict";
                e.exports = JSON.parse('{"meta":{"image":"brush_atlas.png","size":{"w":3584,"h":2944},"scale":"1"},"frames":{"stamp_grass.png":{"frame":{"x":0,"y":128,"w":1536,"h":512},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":1536,"h":512},"sourceSize":{"w":1536,"h":512}},"lines4.png":{"frame":{"x":0,"y":0,"w":2048,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":2048,"h":128},"sourceSize":{"w":2048,"h":128}},"stamp_fur2.png":{"frame":{"x":0,"y":640,"w":1536,"h":512},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":1536,"h":512},"sourceSize":{"w":1536,"h":512}},"stamp_bush.png":{"frame":{"x":0,"y":1152,"w":1024,"h":512},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":1024,"h":512},"sourceSize":{"w":1024,"h":512}},"stamp_gear.png":{"frame":{"x":1024,"y":1152,"w":1024,"h":512},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":1024,"h":512},"sourceSize":{"w":1024,"h":512}},"stamp_fur1.png":{"frame":{"x":2048,"y":0,"w":1024,"h":512},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":1024,"h":512},"sourceSize":{"w":1024,"h":512}},"lines3.png":{"frame":{"x":2048,"y":512,"w":1024,"h":256},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":1024,"h":256},"sourceSize":{"w":1024,"h":256}},"line_gradient.png":{"frame":{"x":2048,"y":768,"w":1024,"h":256},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":1024,"h":256},"sourceSize":{"w":1024,"h":256}},"lines5.png":{"frame":{"x":2048,"y":1024,"w":1024,"h":256},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":1024,"h":256},"sourceSize":{"w":1024,"h":256}},"silky_flat.png":{"frame":{"x":2048,"y":1280,"w":1024,"h":256},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":1024,"h":256},"sourceSize":{"w":1024,"h":256}},"silky_textured.png":{"frame":{"x":0,"y":1664,"w":1024,"h":256},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":1024,"h":256},"sourceSize":{"w":1024,"h":256}},"squared_textured.png":{"frame":{"x":1024,"y":1664,"w":1024,"h":256},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":1024,"h":256},"sourceSize":{"w":1024,"h":256}},"line_grunge2.png":{"frame":{"x":2048,"y":1664,"w":1024,"h":256},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":1024,"h":256},"sourceSize":{"w":1024,"h":256}},"line_grunge3.png":{"frame":{"x":0,"y":1920,"w":1024,"h":256},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":1024,"h":256},"sourceSize":{"w":1024,"h":256}},"line_grunge1.png":{"frame":{"x":1024,"y":1920,"w":1024,"h":256},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":1024,"h":256},"sourceSize":{"w":1024,"h":256}},"lines2.png":{"frame":{"x":2048,"y":1920,"w":1024,"h":256},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":1024,"h":256},"sourceSize":{"w":1024,"h":256}},"stamp_leaf3.png":{"frame":{"x":1536,"y":128,"w":512,"h":512},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":512,"h":512},"sourceSize":{"w":512,"h":512}},"stamp_dots.png":{"frame":{"x":1536,"y":640,"w":512,"h":512},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":512,"h":512},"sourceSize":{"w":512,"h":512}},"thumb_stamp_star.png":{"frame":{"x":2304,"y":1536,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128}},"stamp_grunge1.png":{"frame":{"x":512,"y":2176,"w":512,"h":512},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":512,"h":512},"sourceSize":{"w":512,"h":512}},"stamp_grunge2.png":{"frame":{"x":1024,"y":2176,"w":512,"h":512},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":512,"h":512},"sourceSize":{"w":512,"h":512}},"stamp_grunge3.png":{"frame":{"x":1536,"y":2176,"w":512,"h":512},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":512,"h":512},"sourceSize":{"w":512,"h":512}},"stamp_grunge4.png":{"frame":{"x":2048,"y":2176,"w":512,"h":512},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":512,"h":512},"sourceSize":{"w":512,"h":512}},"stamp_grunge5.png":{"frame":{"x":2560,"y":2176,"w":512,"h":512},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":512,"h":512},"sourceSize":{"w":512,"h":512}},"stamp_leaf1.png":{"frame":{"x":3072,"y":0,"w":512,"h":512},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":512,"h":512},"sourceSize":{"w":512,"h":512}},"stamp_leaf2.png":{"frame":{"x":3072,"y":512,"w":512,"h":512},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":512,"h":512},"sourceSize":{"w":512,"h":512}},"stamp_column.png":{"frame":{"x":3072,"y":1024,"w":512,"h":512},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":512,"h":512},"sourceSize":{"w":512,"h":512}},"stamp_snow.png":{"frame":{"x":3072,"y":1536,"w":512,"h":512},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":512,"h":512},"sourceSize":{"w":512,"h":512}},"stamp_squares.png":{"frame":{"x":3072,"y":2048,"w":512,"h":512},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":512,"h":512},"sourceSize":{"w":512,"h":512}},"lines1.png":{"frame":{"x":0,"y":2688,"w":256,"h":256},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":256,"h":256},"sourceSize":{"w":256,"h":256}},"thumb_rainbow.png":{"frame":{"x":3072,"y":2560,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128}},"thumb_single_sphere.png":{"frame":{"x":3200,"y":2560,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128}},"thumb_stamp_fur1.png":{"frame":{"x":3328,"y":2560,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128}},"thumb_stamp_fur2.png":{"frame":{"x":3456,"y":2560,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128}},"thumb_stamp_grass.png":{"frame":{"x":2048,"y":1536,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128}},"thumb_stamp_snow.png":{"frame":{"x":2176,"y":1536,"w":128,"h":128},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":128,"h":128},"sourceSize":{"w":128,"h":128}},"stamp_star.png":{"frame":{"x":0,"y":2176,"w":512,"h":512},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":512,"h":512},"sourceSize":{"w":512,"h":512}}}}')
            }
        },
        t = {};

    function s(i) {
        var r = t[i];
        if (void 0 !== r) return r.exports;
        var a = t[i] = {
            exports: {}
        };
        return e[i].call(a.exports, a, a.exports, s), a.exports
    }
    s.amdD = function () {
        throw new Error("define cannot be used indirect")
    }, s.amdO = {}, window.saveAs = s(618).saveAs, s(453), s(821), s(967), s(297), s(115), s(555), s(369), s(796), s(493), s(810), s(620), s(142), s(510), s(101), s(688), s(579), s(788), s(295), s(623), s(988), s(830), s(775), s(891)
})();