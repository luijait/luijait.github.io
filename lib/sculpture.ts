import * as THREE from 'three';
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
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
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

  const blocks: THREE.Mesh[] = [];
  const blockGeometry = new RoundedBoxGeometry(0.61, 0.61, 0.61, 3, 0.055);
  for (let x = -1; x <= 1; x++)
    for (let y = -1; y <= 1; y++)
      for (let z = -1; z <= 1; z++) {
        const block = new THREE.Mesh(
          blockGeometry,
          x === 0 && z === 1 ? red : y === -1 ? graphite : silver,
        );
        block.position.set(x * 0.76, y * 0.76, z * 0.76);
        block.userData.home = block.position.clone();
        blocks.push(block);
        forms[1].add(block);
      }
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
  unique.forEach((v, key) => {
    const point = new THREE.Mesh(
      pointGeometry,
      key.startsWith('0.') ? red : silver,
    );
    point.position.copy(v);
    forms[2].add(point);
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
    playing = false,
    visible = false,
    disposed = false;
  let frame = 0,
    previous = 0,
    time = 0;
  let targetX = 0,
    targetY = 0;
  const weights = [1, 0, 0];
  forms[1].scale.setScalar(0.001);
  forms[2].scale.setScalar(0.001);

  function draw(now: number) {
    frame = 0;
    if (disposed || !visible || document.hidden) {
      previous = 0;
      return;
    }
    const delta = Math.min(previous ? (now - previous) / 1000 : 0.016, 0.04);
    previous = now;
    if (playing) time += delta;
    const ease = 1 - Math.exp(-delta * 6);
    let settling = false;
    forms.forEach((form, i) => {
      const target = i === mode ? 1 : 0;
      weights[i] = playing
        ? THREE.MathUtils.lerp(weights[i], target, ease)
        : target;
      if (Math.abs(weights[i] - target) > 0.001) settling = true;
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
    blocks.forEach((block) =>
      block.position.copy(block.userData.home).multiplyScalar(expand),
    );
    renderer.render(scene, camera);
    if (playing || settling) frame = requestAnimationFrame(draw);
  }
  const schedule = () => {
    if (!frame && !disposed) frame = requestAnimationFrame(draw);
  };
  const resize = new ResizeObserver(() => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.position.z = camera.aspect < 0.85 ? 10 : 8.8;
    camera.updateProjectionMatrix();
    schedule();
  });
  resize.observe(host);
  const intersection = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
        previous = 0;
      }
    },
    { rootMargin: '100px' },
  );
  intersection.observe(host);
  const visibility = () => {
    if (!document.hidden) schedule();
  };
  document.addEventListener('visibilitychange', visibility);
  const contextLost = (event: Event) => {
    event.preventDefault();
    host.dataset.lost = 'true';
    cancelAnimationFrame(frame);
    frame = 0;
  };
  const contextRestored = () => {
    delete host.dataset.lost;
    schedule();
  };
  renderer.domElement.addEventListener('webglcontextlost', contextLost);
  renderer.domElement.addEventListener('webglcontextrestored', contextRestored);
  onReady();

  return {
    setMode(value: number) {
      mode = value;
      schedule();
    },
    setPlaying(value: boolean) {
      playing = value;
      previous = 0;
      schedule();
    },
    point(x: number, y: number) {
      targetX = y;
      targetY = x;
      schedule();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      renderer.domElement.removeEventListener(
        'webglcontextrestored',
        contextRestored,
      );
      const geometries = new Set<THREE.BufferGeometry>();
      scene.traverse((object) => {
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
