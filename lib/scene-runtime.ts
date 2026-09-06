/** One animation clock for all visible sculptures; DOM measurements only on layout events. */
type Frame = { delta: number; time: number; motion: boolean; progress: number };
type Options = {
  draw: (frame: Frame) => void;
  resize: (width: number, height: number, pixelRatio: number) => void;
};
const jobs = new Set<(now: number) => boolean>();
let clock = 0;
function tick(now: number) {
  clock = 0;
  for (const job of jobs) if (!job(now)) jobs.delete(job);
  if (jobs.size) clock = requestAnimationFrame(tick);
}
function enqueue(job: (now: number) => boolean) {
  jobs.add(job);
  if (!clock) clock = requestAnimationFrame(tick);
}

export function createSceneRuntime(host: HTMLElement, options: Options) {
  const coarse = matchMedia('(pointer: coarse)').matches;
  const interval = 1000 / (coarse ? 30 : 60);
  const ceiling = Math.min(devicePixelRatio || 1, coarse ? 1.5 : 1.75);
  let ratio = ceiling,
    width = 0,
    height = 0,
    progress = 0;
  let rect = { left: 0, top: 0, width: 1, height: 1 };
  let motion = false,
    visible = false,
    uncovered = true,
    enabled = true,
    disposed = false;
  let dirty = true,
    last = 0,
    time = 0,
    measureFrame = 0,
    slowFrames = 0;
  const card = host.closest('.stack-card');
  const nextCard = card?.nextElementSibling;
  const allowed = () =>
    !disposed && enabled && visible && uncovered && !document.hidden;
  function step(now: number) {
    if (!allowed()) {
      last = 0;
      return false;
    }
    const elapsed = last ? now - last : interval;
    if (!dirty && elapsed < interval - 1) return true;
    const delta = Math.min(elapsed / 1000, 0.05);
    if (motion) {
      time += delta;
      // Adapt conservatively to sustained frame pressure, not a single compilation frame.
      slowFrames =
        elapsed > interval * 1.65
          ? slowFrames + 1
          : Math.max(0, slowFrames - 0.5);
      if (slowFrames > 24 && ratio > 1) {
        ratio = Math.max(1, ratio - 0.25);
        slowFrames = 0;
        options.resize(width, height, ratio);
      }
    }
    last = now;
    dirty = false;
    options.draw({ delta, time, motion, progress: motion ? progress : 0 });
    return motion || dirty;
  }
  function invalidate() {
    dirty = true;
    if (allowed()) enqueue(step);
  }
  function measure() {
    measureFrame = 0;
    rect = host.getBoundingClientRect();
    progress = Math.max(
      -0.5,
      Math.min(1, (innerHeight / 2 - rect.top) / innerHeight),
    );
    uncovered = !(
      nextCard instanceof HTMLElement &&
      nextCard.classList.contains('stack-card') &&
      nextCard.getBoundingClientRect().top <= rect.top
    );
    if (
      rect.width &&
      rect.height &&
      (width !== rect.width || height !== rect.height)
    ) {
      width = rect.width;
      height = rect.height;
      options.resize(width, height, ratio);
    }
    if (allowed()) {
      if (motion || dirty) enqueue(step);
    } else {
      jobs.delete(step);
      last = 0;
    }
  }
  const onScroll = () => {
    if (visible && !measureFrame) measureFrame = requestAnimationFrame(measure);
  };
  const resize = new ResizeObserver(() => {
    dirty = true;
    measure();
    invalidate();
  });
  resize.observe(host);
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) {
      dirty = true;
      measure();
      invalidate();
    } else {
      jobs.delete(step);
      last = 0;
    }
  });
  intersection.observe(host);
  const visibility = () => {
    last = 0;
    if (document.hidden) jobs.delete(step);
    else {
      measure();
      invalidate();
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  document.addEventListener('visibilitychange', visibility);
  const parent = host.parentElement;
  parent?.addEventListener('animationend', measure);
  return {
    invalidate,
    setMotion(value: boolean) {
      if (motion === value) return;
      motion = value;
      last = 0;
      invalidate();
    },
    setEnabled(value: boolean) {
      enabled = value;
      last = 0;
      if (value) invalidate();
      else jobs.delete(step);
    },
    point(clientX: number, clientY: number) {
      return {
        x: ((clientX - rect.left) / rect.width) * 2 - 1,
        y: ((clientY - rect.top) / rect.height) * 2 - 1,
      };
    },
    dispose() {
      disposed = true;
      jobs.delete(step);
      cancelAnimationFrame(measureFrame);
      if (!jobs.size) {
        cancelAnimationFrame(clock);
        clock = 0;
      }
      resize.disconnect();
      intersection.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('visibilitychange', visibility);
      parent?.removeEventListener('animationend', measure);
    },
  };
}
