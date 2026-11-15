import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const MechanicalCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x131416, 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const crimsonLight = new THREE.PointLight(0x800606, 8, 30);
    crimsonLight.position.set(-5, 5, 5);
    scene.add(crimsonLight);

    const orangeLight = new THREE.PointLight(0xf26522, 10, 30);
    orangeLight.position.set(5, -4, 5);
    scene.add(orangeLight);

    const whiteHighlight = new THREE.DirectionalLight(0xffffff, 1.4);
    whiteHighlight.position.set(0, 10, 10);
    scene.add(whiteHighlight);

    const mainGroup = new THREE.Group();
    mainGroup.position.set(1.8, 0, -1.5);
    scene.add(mainGroup);

    // 1. Central 12-tooth Mechanical Gear Core
    const gearShape = new THREE.Shape();
    const teeth = 12;
    const outerRadius = 2.2;
    const innerRadius = 1.8;
    const holeRadius = 0.8;

    for (let i = 0; i < teeth; i++) {
      const angle1 = (i / teeth) * Math.PI * 2;
      const angle2 = ((i + 0.3) / teeth) * Math.PI * 2;
      const angle3 = ((i + 0.5) / teeth) * Math.PI * 2;
      const angle4 = ((i + 0.8) / teeth) * Math.PI * 2;

      if (i === 0) {
        gearShape.moveTo(
          Math.cos(angle1) * innerRadius,
          Math.sin(angle1) * innerRadius
        );
      }
      gearShape.lineTo(
        Math.cos(angle2) * innerRadius,
        Math.sin(angle2) * innerRadius
      );
      gearShape.lineTo(
        Math.cos(angle2) * outerRadius,
        Math.sin(angle2) * outerRadius
      );
      gearShape.lineTo(
        Math.cos(angle3) * outerRadius,
        Math.sin(angle3) * outerRadius
      );
      gearShape.lineTo(
        Math.cos(angle4) * innerRadius,
        Math.sin(angle4) * innerRadius
      );
    }

    const holePath = new THREE.Path();
    holePath.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
    gearShape.holes.push(holePath);

    const gearGeometry = new THREE.ExtrudeGeometry(gearShape, {
      steps: 1,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.05,
      bevelSegments: 3,
    });
    gearGeometry.center();

    const metallicMaterial = new THREE.MeshStandardMaterial({
      color: 0x22252a,
      metalness: 0.9,
      roughness: 0.25,
    });

    const mainGear = new THREE.Mesh(gearGeometry, metallicMaterial);
    mainGroup.add(mainGear);

    const wireframeGeo = new THREE.WireframeGeometry(gearGeometry);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xf26522,
      opacity: 0.35,
      transparent: true,
    });
    const gearWireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
    mainGear.add(gearWireframe);

    // 2. Orbital Torus Rings
    const torusGeo1 = new THREE.TorusGeometry(3.2, 0.05, 16, 100);
    const torusMat1 = new THREE.MeshStandardMaterial({
      color: 0x800606,
      metalness: 0.8,
      roughness: 0.3,
      emissive: 0x800606,
      emissiveIntensity: 0.4,
    });
    const ring1 = new THREE.Mesh(torusGeo1, torusMat1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const torusGeo2 = new THREE.TorusGeometry(3.8, 0.035, 16, 100);
    const torusMat2 = new THREE.MeshStandardMaterial({
      color: 0xf26522,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0xf26522,
      emissiveIntensity: 0.45,
    });
    const ring2 = new THREE.Mesh(torusGeo2, torusMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    mainGroup.add(ring2);

    // 3. Secondary Smaller Gears
    const createSmallGear = (
      radius: number,
      x: number,
      y: number,
      z: number,
      color: number
    ) => {
      const smallGeo = new THREE.CylinderGeometry(radius, radius, 0.2, 16);
      const smallMat = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.85,
        roughness: 0.35,
      });
      const smallGear = new THREE.Mesh(smallGeo, smallMat);
      smallGear.position.set(x, y, z);
      smallGear.rotation.x = Math.PI / 2;
      return smallGear;
    };

    const subGear1 = createSmallGear(0.8, -2.4, 2.0, -0.5, 0x313235);
    const subGear2 = createSmallGear(0.6, 2.6, -1.8, 0.5, 0x800606);
    mainGroup.add(subGear1);
    mainGroup.add(subGear2);

    // 4. CAD Node Particle Cloud
    const particlesCount = 180;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 12;
      const isOrange = Math.random() > 0.5;
      colors[i] = isOrange ? 0.95 : 0.5;
      colors[i + 1] = isOrange ? 0.4 : 0.02;
      colors[i + 2] = isOrange ? 0.13 : 0.02;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.075,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const particlesCloud = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesCloud);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
    };

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      if (!prefersReducedMotion) {
        frameId = requestAnimationFrame(animate);
      }

      const elapsedTime = clock.getElapsedTime();
      mainGear.rotation.z = elapsedTime * 0.25;
      ring1.rotation.z = -elapsedTime * 0.18;
      ring1.rotation.y = elapsedTime * 0.14;
      ring2.rotation.x = elapsedTime * 0.22;
      subGear1.rotation.y = -elapsedTime * 0.7;
      subGear2.rotation.y = elapsedTime * 1.0;
      particlesCloud.rotation.y = elapsedTime * 0.04;

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      mainGroup.rotation.y = targetX * 1.3;
      mainGroup.rotation.x = targetY * 1.3;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      gearGeometry.dispose();
      wireframeGeo.dispose();
      torusGeo1.dispose();
      torusGeo2.dispose();
      particlesGeo.dispose();
      metallicMaterial.dispose();
      wireframeMat.dispose();
      torusMat1.dispose();
      torusMat2.dispose();
      particlesMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-35"
    />
  );
};
