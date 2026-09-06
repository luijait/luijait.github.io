import * as THREE from 'three';
import { createSceneRuntime } from '@/lib/scene-runtime';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export type ObjectKind = 'lens' | 'layers';
export type ProjectObjectEngine = ReturnType<typeof createProjectObject>;

/** Small, independently suspended scenes. No product data or simulated results. */
export function createProjectObject(host: HTMLElement, kind: ObjectKind) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
  camera.position.set(0, 0.15, 10);
  const makeEnvironment = () => {
    const room = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const result = pmrem.fromScene(room, 0.04);
    room.dispose();
    pmrem.dispose();
    return result;
  };
  let environment = makeEnvironment();
  scene.environment = environment.texture;
  scene.add(new THREE.HemisphereLight(0xffffff, 0x353c40, 2));
  const light = new THREE.DirectionalLight(0xffffff, 4);
  light.position.set(-4, 5, 6);
  scene.add(light);
  const accent = new THREE.MeshStandardMaterial({
    color: kind === 'lens' ? 0x313b27 : 0xd7f875,
    metalness: 0.55,
    roughness: 0.25,
  });
  const silver = new THREE.MeshStandardMaterial({
    color: 0xe2e4de,
    metalness: 1,
    roughness: 0.18,
  });
  const dark = new THREE.MeshStandardMaterial({
    color: 0x252a29,
    metalness: 0.85,
    roughness: 0.24,
  });
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0xc4e991,
    metalness: 0.08,
    roughness: 0.15,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    transparent: true,
    opacity: 0.32,
  });
  const assembly = new THREE.Group();
  scene.add(assembly);
  const pieces: THREE.Object3D[] = [];
  const details: THREE.Object3D[] = [];
  const dummy = new THREE.Object3D();
  const bladeGeometry = new THREE.BoxGeometry(0.4, 0.15, 0.055);
  const blades = new THREE.InstancedMesh(bladeGeometry, dark, 8);
  blades.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const markerGeometry = new THREE.BoxGeometry(0.025, 0.09, 0.035);
  if (kind === 'lens') {
    for (let i = 0; i < 4; i++) {
      const ring = new THREE.Group();
      const radius = 1.15 + i * 0.24;
      const body = new THREE.Mesh(
        new THREE.TorusGeometry(radius, i % 2 ? 0.045 : 0.12, 16, 96),
        i % 2 ? dark : silver,
      );
      ring.add(body);
      const markers = new THREE.InstancedMesh(markerGeometry, accent, 12);
      for (let j = 0; j < 12; j++) {
        const angle = (j / 12) * Math.PI * 2;
        dummy.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0.13,
        );
        dummy.rotation.set(0, 0, angle - Math.PI / 2);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        markers.setMatrixAt(j, dummy.matrix);
      }
      ring.add(markers);
      pieces.push(ring);
      assembly.add(ring);
    }
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.79, 40, 32), glass);
    assembly.add(core, blades);
    const seed = new THREE.Mesh(new THREE.IcosahedronGeometry(0.33, 0), dark);
    assembly.add(seed);
    details.push(seed);
    const arc = new THREE.Mesh(
      new THREE.TorusGeometry(2.05, 0.015, 8, 120, Math.PI * 1.65),
      accent,
    );
    arc.rotation.x = 0.7;
    assembly.add(arc);
    details.push(arc);
  } else {
    const geometry = new RoundedBoxGeometry(2.65, 0.24, 1.95, 3, 0.1);
    const insetGeometry = new RoundedBoxGeometry(2.32, 0.012, 1.62, 2, 0.1);
    const stripeGeometry = new THREE.BoxGeometry(0.08, 0.02, 1);
    for (let i = 0; i < 3; i++) {
      const layer = new THREE.Group();
      layer.add(new THREE.Mesh(geometry, i === 1 ? accent : silver));
      const inset = new THREE.Mesh(insetGeometry, dark);
      inset.position.y = 0.128;
      layer.add(inset);
      const stripes = new THREE.InstancedMesh(
        stripeGeometry,
        i === 1 ? silver : accent,
        5,
      );
      for (let j = 0; j < 5; j++) {
        dummy.position.set(-0.8 + j * 0.4, 0.15, 0);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1, 1, 0.7 + (j % 3) * 0.15);
        dummy.updateMatrix();
        stripes.setMatrixAt(j, dummy.matrix);
      }
      layer.add(stripes);
      pieces.push(layer);
      assembly.add(layer);
    }
    const points = [
      new THREE.Vector3(0, -1.8, 0),
      new THREE.Vector3(0, 1.8, 0),
    ];
    const axis = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineDashedMaterial({
        color: 0xb5c998,
        dashSize: 0.07,
        gapSize: 0.08,
        transparent: true,
        opacity: 0.6,
      }),
    );
    axis.computeLineDistances();
    assembly.add(axis);
  }
  let selection = 0,
    spread = 0,
    turn = 0,
    pointerX = 0,
    pointerY = 0;
  const runtime = createSceneRuntime(host, {
    resize(width, height, ratio) {
      renderer.setPixelRatio(ratio);
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.position.z = camera.aspect < 1 ? 11.5 : 9.8;
      camera.updateProjectionMatrix();
    },
    draw({ delta: dt, time, motion: playing, progress: passage }) {
      const ease = playing ? 1 - Math.exp(-dt * 5) : 1;
      spread = THREE.MathUtils.lerp(spread, selection, ease);
      const targetY =
        (kind === 'lens' ? -0.35 : -0.58) +
        pointerX * 0.35 +
        turn +
        passage * 0.38;
      assembly.rotation.y = THREE.MathUtils.lerp(
        assembly.rotation.y,
        targetY,
        ease,
      );
      assembly.rotation.x = THREE.MathUtils.lerp(
        assembly.rotation.x,
        (kind === 'lens' ? 0.16 : 0.4) + pointerY * 0.16,
        ease,
      );
      assembly.position.y = Math.sin(time * 0.6) * 0.055;
      if (kind === 'lens') {
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const aperture = 0.57 + spread * 0.11;
          dummy.position.set(
            Math.cos(angle) * aperture,
            Math.sin(angle) * aperture,
            0.35,
          );
          dummy.rotation.set(0, 0, angle + 0.5 + spread * 0.32);
          dummy.scale.setScalar(1);
          dummy.updateMatrix();
          blades.setMatrixAt(i, dummy.matrix);
        }
        blades.instanceMatrix.needsUpdate = true;
      }
      pieces.forEach((piece, i) => {
        if (kind === 'lens') {
          piece.position.z = (i - 1.5) * (0.16 + spread * 0.44);
          piece.rotation.x =
            Math.sin(time * 0.25 + i * 0.3) * (0.05 + spread * 0.18);
          piece.rotation.y = Math.cos(time * 0.2 + i * 0.45) * spread * 0.3;
          piece.rotation.z = time * (i % 2 ? -0.05 : 0.08);
        } else {
          piece.position.y = (i - 1) * (0.38 + spread * 0.43);
          piece.position.x = Math.sin((spread * Math.PI) / 2) * (i - 1) * 0.2;
          piece.rotation.z = Math.sin(time * 0.3 + i) * 0.02;
          piece.rotation.y =
            Math.sin(time * 0.45 + i) * 0.035 + (i - 1) * spread * 0.04;
        }
      });
      details.forEach((piece, i) => {
        piece.rotation.z = time * (i ? 0.08 : -0.2);
      });
      renderer.render(scene, camera);
    },
  });
  const contextLost = (event: Event) => {
    event.preventDefault();
    host.dataset.lost = 'true';
    runtime.setEnabled(false);
    scene.environment = null;
    environment.dispose();
  };
  const contextRestored = () => {
    try {
      const next = makeEnvironment();
      environment = next;
      scene.environment = next.texture;
      delete host.dataset.lost;
      runtime.setEnabled(true);
    } catch {
      host.dataset.lost = 'true';
    }
  };
  renderer.domElement.addEventListener('webglcontextlost', contextLost);
  renderer.domElement.addEventListener('webglcontextrestored', contextRestored);
  host.dataset.ready = 'true';
  return {
    select(value: number) {
      selection = Math.max(0, Math.min(2, value));
      runtime.invalidate();
    },
    play(value: boolean) {
      runtime.setMotion(value);
    },
    point(x: number, y: number) {
      pointerX = x;
      pointerY = y;
      runtime.invalidate();
    },
    pointClient(x: number, y: number) {
      const point = runtime.point(x, y);
      pointerX = point.x;
      pointerY = point.y;
      runtime.invalidate();
    },
    rotate() {
      turn += Math.PI / 4;
      runtime.invalidate();
    },
    dispose() {
      runtime.dispose();
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      renderer.domElement.removeEventListener(
        'webglcontextrestored',
        contextRestored,
      );
      const geometries = new Set<THREE.BufferGeometry>([
        bladeGeometry,
        markerGeometry,
      ]);
      const materials = new Set<THREE.Material>([accent, silver, dark, glass]);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          geometries.add(object.geometry);
          (Array.isArray(object.material)
            ? object.material
            : [object.material]
          ).forEach((material) => materials.add(material));
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      if (kind === 'layers') blades.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.InstancedMesh) object.dispose();
      });
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      delete host.dataset.ready;
    },
  };
}
