import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const W = window.innerWidth;
    const H = window.innerHeight;

    // ── Renderer ──────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
    camera.position.set(0, 0, 30);

    // ── Monochrome palette — whites / light blues ──────
    const palette = [
      0xffffff, // white
      0xe8f0fe, // near-white
      0xc5d8ff, // light blue
      0x9bbcf5, // soft blue
      0x6699e8, // mid blue
      0x1a3a8a, // dark navy accent
    ];

    const getMat = (opacity = 1, wireframe = false) => {
      const color = palette[Math.floor(Math.random() * palette.length)];
      return new THREE.MeshStandardMaterial({
        color,
        transparent: true,
        opacity: wireframe ? opacity * 0.18 : opacity * 0.22,
        wireframe,
        roughness: 0.35,
        metalness: 0.55,
      });
    };

    // ── Geometries pool ───────────────────────────────
    const geos = [
      new THREE.TetrahedronGeometry(1.4, 0),
      new THREE.OctahedronGeometry(1.2, 0),
      new THREE.IcosahedronGeometry(1.1, 0),
      new THREE.BoxGeometry(1.6, 1.6, 1.6),
      new THREE.TorusGeometry(0.9, 0.3, 6, 8),
      new THREE.ConeGeometry(0.9, 2, 5),
      new THREE.DodecahedronGeometry(1.1, 0),
    ];

    // ── Create meshes ─────────────────────────────────
    type MeshData = {
      mesh: THREE.Mesh;
      rotSpeed: THREE.Vector3;
      floatSpeed: number;
      floatAmp: number;
      floatOffset: number;
    };

    const meshData: MeshData[] = [];
    const COUNT = 38;

    for (let i = 0; i < COUNT; i++) {
      const geo = geos[Math.floor(Math.random() * geos.length)];
      const useWire = Math.random() > 0.55;
      const mat = getMat(Math.random() * 0.6 + 0.3, useWire);
      const mesh = new THREE.Mesh(geo, mat);

      const scale = Math.random() * 2.2 + 0.5;
      mesh.scale.setScalar(scale);

      mesh.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40 - 5,
      );

      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      );

      scene.add(mesh);
      meshData.push({
        mesh,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.005,
        ),
        floatSpeed: Math.random() * 0.4 + 0.15,
        floatAmp:   Math.random() * 1.8 + 0.4,
        floatOffset: Math.random() * Math.PI * 2,
      });
    }

    // ── Lights ────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x8fb8ff, 1.2);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x3366cc, 1.4, 80);
    pointLight.position.set(-20, -10, 10);
    scene.add(pointLight);

    // ── Mouse parallax ────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ── Resize ────────────────────────────────────────
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ── Animation loop ────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow camera parallax
      camera.position.x += (mouse.x * 3 - camera.position.x) * 0.025;
      camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.025;
      camera.lookAt(0, 0, 0);

      meshData.forEach(({ mesh, rotSpeed, floatSpeed, floatAmp, floatOffset }) => {
        mesh.rotation.x += rotSpeed.x;
        mesh.rotation.y += rotSpeed.y;
        mesh.rotation.z += rotSpeed.z;
        // gentle float on Y
        mesh.position.y += Math.sin(elapsed * floatSpeed + floatOffset) * 0.004 * floatAmp;
      });

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geos.forEach(g => g.dispose());
      scene.clear();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}