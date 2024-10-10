<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebGL Boxes</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
        #controls {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 100;
        }
        #glCanvas {
            position: absolute;
            top: 0;
            left: 0;
        }
    </style>
</head>
<body>
    <div id="controls">
        <button id="add-box">Add Box</button>
        <button id="remove-box">Remove Selected Box</button>
    </div>
    <canvas id="glCanvas"></canvas>

    <script>
        const glCanvas = document.getElementById('glCanvas');
        const gl = glCanvas.getContext('webgl');

        if (!gl) {
            alert('WebGL not supported');
            throw new Error('WebGL not supported');
        }

        const vertexShaderSource = `
            attribute vec2 a_position;
            attribute vec4 a_color;
            uniform vec2 u_resolution;
            varying vec4 v_color;
            void main() {
                vec2 zeroToOne = a_position / u_resolution;
                vec2 zeroToTwo = zeroToOne * 2.0;
                vec2 clipSpace = zeroToTwo - 1.0;
                gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
                v_color = a_color;
            }
        `;

        const fragmentShaderSource = `
            precision mediump float;
            varying vec4 v_color;
            void main() {
                gl_FragColor = v_color;
            }
        `;

        function createShader(gl, type, source) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Shader compile error:', gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        }

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program));
            throw new Error('Program link error');
        }

        const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
        const colorAttributeLocation = gl.getAttribLocation(program, 'a_color');
        const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');

        const positionBuffer = gl.createBuffer();
        const colorBuffer = gl.createBuffer();

        Math.mix = function(a, b, m) {
            m = m || 0; return a + (b - a) * m;
        };

        let boxes = [];
        let nextId = 0;

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }
        
        function createBox(parent = null, isText = false) {
            const parentWidth = parent ? parent.width : glCanvas.width;
            const parentHeight = parent ? parent.height : glCanvas.height;

            return {
                id: nextId++,
                width: isText ? 50 : getRandomArbitrary(parentWidth * 0.2, parentWidth * 0.3),
                height: isText ? 20 : getRandomArbitrary(parentHeight * 0.15, parentHeight * 0.2),
                color: isText ? [1, 1, 1, 1] : [Math.random(), Math.random(), Math.random(), 1],
                selected: false,
                children: [],
                parent: parent,
                x: 0,
                y: 0,
                isText: isText,
                text: isText ? `ID: ${nextId - 1}` : '',
                isHovered: false // Added hover state
            };
        }

        function renderBox(box, x, y) {
            box.x = x;
            box.y = y;

            const opacity = box.isHovered ? 0.5 : 1.0; // Change opacity on hover

            const positions = new Float32Array([
                box.x, box.y,
                box.x + box.width, box.y,
                box.x, box.y + box.height,
                box.x, box.y + box.height,
                box.x + box.width, box.y,
                box.x + box.width, box.y + box.height
            ]);

            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

            const color = box.selected && !box.isText ? [...box.color.slice(0, 3), 0.5] : [...box.color.slice(0, 3), opacity];
            const colors = new Float32Array(Array(6).fill(color).flat());
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
            gl.enableVertexAttribArray(colorAttributeLocation);
            gl.vertexAttribPointer(colorAttributeLocation, 4, gl.FLOAT, false, 0, 0);

            gl.drawArrays(gl.TRIANGLES, 0, 6);

            if (box.isText) {
                renderText(box);
            }
        }

        function renderText(box) {
            const ctx = glCanvas.getContext('2d');
            ctx.font = '12px Arial';
            ctx.fillStyle = 'black';
            const textX = box.x + (box.width - ctx.measureText(box.text).width) / 2; // Center text horizontally
            const textY = box.y + (box.height + 12) / 2; // Center text vertically
            ctx.fillText(box.text, textX, textY);
        }

        function arrangeBoxes(boxes, parentWidth) {
            const lines = [];
            let currentLine = [];
            let currentLineWidth = 0;

            boxes.forEach(box => {
                if (currentLineWidth + box.width > parentWidth) {
                    lines.push(currentLine);
                    currentLine = [];
                    currentLineWidth = 0;
                }
                currentLine.push(box);
                currentLineWidth += box.width;
            });
            if (currentLine.length > 0) {
                lines.push(currentLine);
            }

            return lines;
        }

        function render() {
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(program);
            gl.uniform2f(resolutionUniformLocation, glCanvas.width, glCanvas.height);

            const lines = arrangeBoxes(boxes, glCanvas.width);
            const totalHeight = lines.reduce((sum, line) => sum + Math.max(...line.map(box => box.height)), 0);
            let y = (glCanvas.height - totalHeight) / 2;

            lines.forEach(line => {
                const lineHeight = Math.max(...line.map(box => box.height));
                let x = (glCanvas.width - line.reduce((sum, box) => sum + box.width, 0)) / 2;

                line.forEach(box => {
                    const boxY = Math.mix(y, y + lineHeight, 0.5) - box.height / 2; // Centering box vertically
                    renderBox(box, x, boxY);
                    x += box.width;
                });

                y += lineHeight;
            });

            // Render children boxes within their parent
            boxes.forEach(box => {
                if (box.children.length > 0) {
                    const childLines = arrangeBoxes(box.children, box.width);
                    let childTotalHeight = childLines.reduce((sum, line) => sum + Math.max(...line.map(child => child.height)), 0);
                    let childY = box.y + (box.height - childTotalHeight) / 2; // Center child lines vertically within parent

                    childLines.forEach(childLine => {
                        const childLineHeight = Math.max(...childLine.map(child => child.height));
                        let childX = box.x + (box.width - childLine.reduce((sum, child) => sum + child.width, 0)) / 2; // Center child line horizontally

                        childLine.forEach(child => {
                            const childBoxY = Math.mix(childY, childY + childLineHeight, 0.5) - child.height / 2; // Center child vertically
                            renderBox(child, childX, childBoxY);
                            childX += child.width;
                        });

                        childY += childLineHeight;
                    });
                }
            });
        }

        function findBoxAt(x, y, boxesToSearch) {
            for (let i = boxesToSearch.length - 1; i >= 0; i--) {
                const box = boxesToSearch[i];
                if (x >= box.x && x <= box.x + box.width &&
                    y >= box.y && y <= box.y + box.height) {
                    const childBox = findBoxAt(x, y, box.children);
                    return childBox || box;
                }
            }
            return null;
        }

        function removeSelectedBoxes() {
            boxes = boxes.filter(box => {
                if (box.selected) {
                    return false; // Remove this box
                }
                // Remove children of selected boxes
                box.children = box.children.filter(child => !child.selected);
                return true; // Keep this box
            });
        }

        function resizeCanvas() {
            glCanvas.width = window.innerWidth;
            glCanvas.height = window.innerHeight;
            gl.viewport(0, 0, glCanvas.width, glCanvas.height);
            render();
        }

        glCanvas.addEventListener('click', (event) => {
            const rect = glCanvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const clickedBox = findBoxAt(x, y, boxes);
            if (clickedBox) {
                clickedBox.selected = !clickedBox.selected;
            } else {
                boxes.forEach(box => box.selected = false);
            }

            render();
        });

        // Add mousemove event listeners for hover effects
        glCanvas.addEventListener('mousemove', (event) => {
            const rect = glCanvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            let isHovering = false;

            boxes.forEach(box => {
                box.isHovered = x >= box.x && x <= box.x + box.width &&
                               y >= box.y && y <= box.y + box.height;
                if (box.isHovered) isHovering = true;
            });

            // Change cursor style based on hover state
            glCanvas.style.cursor = isHovering ? 'pointer' : 'default';

            render();
        });

        document.getElementById('add-box').addEventListener('click', () => {
            const selectedBoxes = boxes.filter(box => box.selected);
            if (selectedBoxes.length > 0) {
                selectedBoxes.forEach(selectedBox => {
                    const newBox = createBox(selectedBox);
                    selectedBox.children.push(newBox);
                });
            } else {
                boxes.push(createBox());
            }
            render();
        });

        document.getElementById('remove-box').addEventListener('click', () => {
            removeSelectedBoxes();
            render();
        });

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
    </script>
</body>
</html>
