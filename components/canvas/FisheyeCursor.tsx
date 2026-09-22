'use client';

import React, { useEffect, useRef } from 'react';

interface FisheyeCursorProps {
  active: boolean;
}

export default function FisheyeCursor({ active }: FisheyeCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vsSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = (position + 1.0) * 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      uniform float uRadius;
      uniform float uStrength;
      uniform float uFade;

      void main() {
        if (uFade <= 0.001) {
          gl_FragColor = vec4(0.0);
          return;
        }

        vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
        vec2 diff = (vUv - uMouse) * aspect;
        float dist = length(diff);

        if (dist < uRadius) {
          float normDist = dist / uRadius;
          float alpha = smoothstep(uRadius, uRadius * 0.2, dist) * 0.14 * uFade;
          vec3 lensTint = vec3(0.08, 0.07, 0.06);
          gl_FragColor = vec4(lensTint, alpha);
        } else {
          gl_FragColor = vec4(0.0);
        }
      }
    `;

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uMouseLoc = gl.getUniformLocation(program, 'uMouse');
    const uResolutionLoc = gl.getUniformLocation(program, 'uResolution');
    const uRadiusLoc = gl.getUniformLocation(program, 'uRadius');
    const uStrengthLoc = gl.getUniformLocation(program, 'uStrength');
    const uFadeLoc = gl.getUniformLocation(program, 'uFade');

    let mouseX = -100;
    let mouseY = -100;
    let curX = -100;
    let curY = -100;
    let currentFade = 0;

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = 1.0 - e.clientY / window.innerHeight;
    };

    window.addEventListener('mousemove', onMouseMove);

    let animId: number;
    const render = () => {
      animId = requestAnimationFrame(render);

      // Smooth lag
      curX += (mouseX - curX) * 0.18;
      curY += (mouseY - curY) * 0.18;

      // Smooth fade in / fade out based on activeRef
      const targetFade = activeRef.current ? 1.0 : 0.0;
      currentFade += (targetFade - currentFade) * 0.2;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      if (currentFade > 0.01) {
        gl.uniform2f(uMouseLoc, curX, curY);
        gl.uniform1f(uRadiusLoc, 0.09);
        gl.uniform1f(uStrengthLoc, 0.04);
        gl.uniform1f(uFadeLoc, currentFade);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40 h-full w-full"
      style={{ mixBlendMode: 'multiply' }}
      aria-hidden="true"
    />
  );
}
