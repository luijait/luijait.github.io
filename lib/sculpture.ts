import * as THREE from 'three';
import { createSceneRuntime } from '@/lib/scene-runtime';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// A single, lazy-loaded scene. No models, textures or third-party requests.
export function createSculpture(host: HTMLElement, onReady: () => void) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio,
      matchMedia('(max-width: 700px)').matches ? 1.5 : 2,
    ),
  );
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
  camera.position.set(0, 0.2, 8.8);
  const makeEnvironment = () => {
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const map = pmrem.fromScene(room, 0.04);
    room.dispose();
    pmrem.dispose();
    return map;
  };
  let environment = makeEnvironment();
  scene.environment = environment.texture;
  scene.add(new THREE.HemisphereLight(0xffffff, 0x515156, 2));
  const key = new THREE.DirectionalLight(0xffffff, 4);
  key.position.set(-3, 4, 5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffb7a5, 1.5);
  fill.position.set(4, -2, 1);
  scene.add(fill);

  const silver = new THREE.MeshStandardMaterial({
    color: 0xbfc2c4,
    metalness: 1,
    roughness: 0.21,
  });
  const red = new THREE.MeshStandardMaterial({
    color: 0xcc2b22,
    metalness: 0.4,
    roughness: 0.27,
  });
  const graphite = new THREE.MeshStandardMaterial({
    color: 0x24272b,
    metalness: 0.8,
    roughness: 0.25,
  });
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x62666b,
    transparent: true,
    opacity: 0.65,
  });
  const assembly = new THREE.Group();
  scene.add(assembly);
  const forms = [new THREE.Group(), new THREE.Group(), new THREE.Group()];
  forms.forEach((form) => assembly.add(form));

  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.18, 0.285, 192, 28, 2, 3),
    silver,
  );
  knot.rotation.set(0.55, -0.45, -0.25);
  forms[0].add(knot);
  const seed = new THREE.Mesh(new THREE.IcosahedronGeometry(0.37, 0), red);
  forms[0].add(seed);

  const dummy = new THREE.Object3D();
  const blockGeometry = new RoundedBoxGeometry(0.61, 0.61, 0.61, 3, 0.055);
  const blockHomes: THREE.Vector3[][] = [[], [], []];
  for (let x = -1; x <= 1; x++)
    for (let y = -1; y <= 1; y++)
      for (let z = -1; z <= 1; z++) {
        const group = x === 0 && z === 1 ? 0 : y === -1 ? 1 : 2;
        blockHomes[group].push(new THREE.Vector3(x * 0.76, y * 0.76, z * 0.76));
      }
  const blocks = blockHomes.map((homes, i) => {
    const mesh = new THREE.InstancedMesh(
      blockGeometry,
      [red, graphite, silver][i],
      homes.length,
    );
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.frustumCulled = false;
    forms[1].add(mesh);
    return mesh;
  });
  forms[1].rotation.set(0.4, -0.6, 0.08);

  const latticeGeometry = new THREE.IcosahedronGeometry(1.68, 1);
  const network = new THREE.LineSegments(
    new THREE.WireframeGeometry(latticeGeometry),
    lineMaterial,
  );
  forms[2].add(network);
  const positions = latticeGeometry.getAttribute('position');
  const unique = new Map<string, THREE.Vector3>();
  for (let i = 0; i < positions.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(positions, i);
    unique.set(
      v
        .toArray()
        .map((n) => n.toFixed(3))
        .join(','),
      v,
    );
  }
  const pointGeometry = new THREE.SphereGeometry(0.065, 12, 8);
  const pointGroups: THREE.Vector3[][] = [[], []];
  unique.forEach((v, key) => pointGroups[key.startsWith('0.') ? 0 : 1].push(v));
  pointGroups.forEach((points, i) => {
    const mesh = new THREE.InstancedMesh(
      pointGeometry,
      i === 0 ? red : silver,
      points.length,
    );
    points.forEach((v, index) => {
      dummy.position.copy(v);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    });
    forms[2].add(mesh);
  });
  latticeGeometry.dispose();
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.54, 0), red);
  forms[2].add(core);

  const orbit = new THREE.Mesh(
    new THREE.TorusGeometry(2.15, 0.012, 8, 160),
    red,
  );
  orbit.rotation.set(1.04, -0.4, 0.25);
  assembly.add(orbit);
  const satellite = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 12), red);
  assembly.add(satellite);

  let mode = 0,
    targetX = 0,
    targetY = 0;
  const weights = [1, 0, 0];
  forms[1].scale.setScalar(0.001);
  forms[2].scale.setScalar(0.001);
  const runtime = createSceneRuntime(host, {
    resize(width, height, ratio) {
      renderer.setPixelRatio(ratio);
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.position.z = camera.aspect < 0.85 ? 10 : 8.8;
      camera.updateProjectionMatrix();
    },
    draw({ delta, time, motion: playing }) {
      const ease = 1 - Math.exp(-delta * 6);
      forms.forEach((form, i) => {
        const target = i === mode ? 1 : 0;
        weights[i] = playing
          ? THREE.MathUtils.lerp(weights[i], target, ease)
          : target;
        form.visible = weights[i] > 0.006;
        form.scale.setScalar(Math.max(0.001, weights[i]));
      });
      assembly.rotation.x = playing
        ? THREE.MathUtils.lerp(assembly.rotation.x, targetX * 0.25, ease)
        : targetX * 0.25;
      assembly.rotation.y = playing
        ? THREE.MathUtils.lerp(
            assembly.rotation.y,
            targetY * 0.45 + time * 0.085,
            ease,
          )
        : targetY * 0.45;
      assembly.position.y = playing ? Math.sin(time * 0.6) * 0.07 : 0;
      knot.rotation.z = -0.25 + time * 0.06;
      seed.rotation.y = time * 0.25;
      core.rotation.set(time * 0.12, time * 0.18, 0);
      orbit.rotation.z = 0.25 + time * 0.045;
      satellite.position.set(
        Math.cos(time * 0.28) * 2.15,
        Math.sin(time * 0.28) * 1.05,
        Math.sin(time * 0.28) * 1.87,
      );
      const expand = 1 + (Math.sin(time * 0.65) * 0.5 + 0.5) * 0.24;
      if (forms[1].visible)
        blocks.forEach((mesh, i) => {
          blockHomes[i].forEach((home, index) => {
            dummy.position.copy(home).multiplyScalar(expand);
            dummy.updateMatrix();
            mesh.setMatrixAt(index, dummy.matrix);
          });
          mesh.instanceMatrix.needsUpdate = true;
        });
      renderer.render(scene, camera);
    },
  });
  const contextLost = (event: Event) => {
    event.preventDefault();
    host.dataset.lost = 'true';
    runtime.setEnabled(false);
    // Release the old target while its context is lost, before a new one exists.
    scene.environment = null;
    environment.dispose();
  };
  const contextRestored = () => {
    // Render targets lose their pixel contents along with the GPU context.
    // Rebuild the reflection map instead of showing black metal on recovery.
    try {
      const recovered = makeEnvironment();
      scene.environment = recovered.texture;
      environment = recovered;
      delete host.dataset.lost;
      runtime.setEnabled(true);
    } catch {
      host.dataset.lost = 'true';
    }
  };
  renderer.domElement.addEventListener('webglcontextlost', contextLost);
  renderer.domElement.addEventListener('webglcontextrestored', contextRestored);
  onReady();

  return {
    setMode(value: number) {
      mode = value;
      runtime.invalidate();
    },
    setPlaying(value: boolean) {
      runtime.setMotion(value);
    },
    point(x: number, y: number) {
      targetX = y;
      targetY = x;
      runtime.invalidate();
    },
    dispose() {
      runtime.dispose();
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      renderer.domElement.removeEventListener(
        'webglcontextrestored',
        contextRestored,
      );
      const geometries = new Set<THREE.BufferGeometry>();
      scene.traverse((object) => {
        if (object instanceof THREE.InstancedMesh) object.dispose();
        if ('geometry' in object)
          geometries.add(object.geometry as THREE.BufferGeometry);
      });
      geometries.forEach((geometry) => geometry.dispose());
      [silver, red, graphite, lineMaterial].forEach((material) =>
        material.dispose(),
      );
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
