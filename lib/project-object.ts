import * as THREE from 'three';
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
    transmission: 0.75,
    thickness: 0.8,
    ior: 1.35,
    transparent: true,
    opacity: 0.85,
  });
  const assembly = new THREE.Group();
  scene.add(assembly);
  const pieces: THREE.Object3D[] = [];
  const details: THREE.Object3D[] = [];
  if (kind === 'lens') {
    for (let i = 0; i < 4; i++) {
      const ring = new THREE.Group();
      const radius = 1.15 + i * 0.24;
      const body = new THREE.Mesh(
        new THREE.TorusGeometry(radius, i % 2 ? 0.045 : 0.12, 16, 96),
        i % 2 ? dark : silver,
      );
      ring.add(body);
      for (let j = 0; j < 12; j++) {
        const marker = new THREE.Mesh(
          new THREE.BoxGeometry(0.025, 0.09, 0.035),
          accent,
        );
        const angle = (j / 12) * Math.PI * 2;
        marker.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0.13,
        );
        marker.rotation.z = angle - Math.PI / 2;
        ring.add(marker);
      }
      pieces.push(ring);
      assembly.add(ring);
    }
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.79, 40, 32), glass);
    assembly.add(core);
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
    for (let i = 0; i < 3; i++) {
      const layer = new THREE.Group();
      layer.add(new THREE.Mesh(geometry, i === 1 ? accent : silver));
      const inset = new THREE.Mesh(
        new RoundedBoxGeometry(2.32, 0.012, 1.62, 2, 0.1),
        dark,
      );
      inset.position.y = 0.128;
      layer.add(inset);
      for (let j = 0; j < 5; j++) {
        const stripe = new THREE.Mesh(
          new THREE.BoxGeometry(0.08, 0.02, 0.7 + (j % 3) * 0.15),
          i === 1 ? silver : accent,
        );
        stripe.position.set(-0.8 + j * 0.4, 0.15, 0);
        layer.add(stripe);
      }
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
  let frame = 0,
    previous = 0,
    time = 0,
    playing = false,
    visible = false,
    disposed = false,
    lost = false;
  let selection = 0,
    spread = 0,
    turn = 0,
    pointerX = 0,
    pointerY = 0;
  function draw(now: number) {
    frame = 0;
    if (disposed || lost || !visible || document.hidden) {
      previous = 0;
      return;
    }
    const dt = Math.min(previous ? (now - previous) / 1000 : 0.016, 0.05);
    previous = now;
    if (playing) time += dt;
    const ease = playing ? 1 - Math.exp(-dt * 5) : 1;
    spread = THREE.MathUtils.lerp(spread, selection, ease);
    const rect = host.getBoundingClientRect();
    const passage = playing
      ? THREE.MathUtils.clamp(
          (window.innerHeight / 2 - rect.top) / window.innerHeight,
          -0.5,
          1,
        )
      : 0;
    const targetY =
      (kind === 'lens' ? -0.35 : -0.58) +
      pointerX * 0.35 +
      turn +
      passage * 0.25;
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
    pieces.forEach((piece, i) => {
      if (kind === 'lens') {
        piece.position.z = (i - 1.5) * (0.16 + spread * 0.65);
        piece.rotation.x =
          Math.sin(time * 0.25 + i * 0.3) * (0.05 + spread * 0.18);
        piece.rotation.y = Math.cos(time * 0.2 + i * 0.45) * spread * 0.3;
        piece.rotation.z = time * (i % 2 ? -0.05 : 0.08);
      } else {
        piece.position.y = (i - 1) * (0.38 + spread * 0.43);
        piece.rotation.y =
          Math.sin(time * 0.45 + i) * 0.035 + (i - 1) * spread * 0.04;
      }
    });
    details.forEach((piece, i) => {
      piece.rotation.z = time * (i ? 0.08 : -0.2);
    });
    renderer.render(scene, camera);
    if (playing) frame = requestAnimationFrame(draw);
  }
  function schedule() {
    if (!frame && !disposed && !lost) frame = requestAnimationFrame(draw);
  }
  const resize = new ResizeObserver(() => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.position.z = camera.aspect < 1 ? 11.5 : 9.8;
    camera.updateProjectionMatrix();
    schedule();
  });
  resize.observe(host);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) schedule();
    else {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
    }
  });
  observer.observe(host);
  const visibility = () => {
    if (!document.hidden) schedule();
  };
  document.addEventListener('visibilitychange', visibility);
  const contextLost = (event: Event) => {
    event.preventDefault();
    lost = true;
    host.dataset.lost = 'true';
    cancelAnimationFrame(frame);
    frame = 0;
  };
  const contextRestored = () => {
    try {
      const next = makeEnvironment();
      environment.dispose();
      environment = next;
      scene.environment = next.texture;
      lost = false;
      delete host.dataset.lost;
      schedule();
    } catch {
      host.dataset.lost = 'true';
    }
  };
  renderer.domElement.addEventListener('webglcontextlost', contextLost);
  renderer.domElement.addEventListener('webglcontextrestored', contextRestored);
  host.dataset.ready = 'true';
  return {
    select(value: number) {
      selection = value;
      schedule();
    },
    play(value: boolean) {
      playing = value;
      previous = 0;
      schedule();
    },
    point(x: number, y: number) {
      pointerX = x;
      pointerY = y;
      schedule();
    },
    rotate() {
      turn += Math.PI / 4;
      schedule();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      renderer.domElement.removeEventListener(
        'webglcontextrestored',
        contextRestored,
      );
      const geometries = new Set<THREE.BufferGeometry>();
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
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      delete host.dataset.ready;
    },
  };
}
