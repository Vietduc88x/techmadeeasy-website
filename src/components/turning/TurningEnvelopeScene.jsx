import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const STATUS_COLORS = { fail: 0xfb7185, tight: 0xfbbf24, pass: 0x34d399 };

function annularGeometry(innerRadius, outerRadius, segments = 72) {
  const shape = new THREE.Shape();
  shape.moveTo(outerRadius, 0);
  shape.absarc(0, 0, outerRadius, 0, Math.PI / 2, false);
  shape.lineTo(0, innerRadius);
  shape.absarc(0, 0, innerRadius, Math.PI / 2, 0, true);
  shape.closePath();
  const geometry = new THREE.ShapeGeometry(shape, segments);
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

function arcPoints(radius, height, segments = 72) {
  return Array.from({ length: segments + 1 }, (_, index) => {
    const angle = (index / segments) * (Math.PI / 2);
    return new THREE.Vector3(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
  });
}

function replaceGeometry(object, geometry) {
  object.geometry.dispose();
  object.geometry = geometry;
}

function replaceArc(line, radius, height = 0.12) {
  replaceGeometry(line, new THREE.BufferGeometry().setFromPoints(arcPoints(radius, height)));
  line.computeLineDistances?.();
}

function disposeMaterial(material, disposed) {
  if (Array.isArray(material)) material.forEach((item) => disposeMaterial(item, disposed));
  else if (material && !disposed.has(material)) {
    material.dispose();
    disposed.add(material);
  }
}

function positionVehicle(world, progress) {
  const { scenario, vehicle, marker } = world;
  const angle = 0.08 + progress * (Math.PI / 2 - 0.16);
  vehicle.position.set(Math.cos(angle) * scenario.pathRadius, 0, Math.sin(angle) * scenario.pathRadius);
  vehicle.rotation.y = -angle - Math.PI / 2;
  marker.position.x = Math.cos(angle) * scenario.rearWheelPathRadius;
  marker.position.z = Math.sin(angle) * scenario.rearWheelPathRadius;
}

function updateCamera(world) {
  const roadOuter = world.scenario.inputs.insideRadius + world.scenario.inputs.roadWidth;
  const center = roadOuter / 2;
  world.camera.position.set(center, 70, center + 0.001);
  world.camera.up.set(0, 0, -1);
  world.camera.lookAt(center, 0, center);
  world.viewSize = Math.max(34, roadOuter * 1.34);
}

function applyScenario(world, scenario, vehicleLength) {
  world.scenario = scenario;
  const roadInner = scenario.inputs.insideRadius;
  const roadOuter = roadInner + scenario.inputs.roadWidth;

  replaceGeometry(world.road, annularGeometry(roadInner, roadOuter));
  replaceGeometry(world.envelope, annularGeometry(
    Math.max(0.5, scenario.requiredInnerRadius),
    scenario.requiredOuterRadius,
  ));
  replaceArc(world.innerBoundary, roadInner);
  replaceArc(world.outerBoundary, roadOuter);
  replaceArc(world.assumedPath, scenario.pathRadius, 0.16);
  replaceArc(world.rearWheelPath, scenario.rearWheelPathRadius, 0.18);
  replaceGeometry(world.body, new THREE.BoxGeometry(vehicleLength, 1.7, scenario.vehicleWidth));
  replaceGeometry(world.cab, new THREE.BoxGeometry(
    Math.max(2.6, vehicleLength * 0.18),
    2.15,
    scenario.vehicleWidth,
  ));
  world.cab.position.set(vehicleLength * 0.39, 1.35, 0);

  const color = STATUS_COLORS[scenario.status];
  world.envelope.material.color.setHex(color);
  world.marker.material.color.setHex(color);
  world.road.material.opacity = 1;
  world.envelope.material.opacity = 0.3;
  world.scanGroup.visible = false;
  positionVehicle(world, 0.58);
  updateCamera(world);
  world.resize();
  world.renderer.render(world.scene, world.camera);
}

function updateScanGeometry(world) {
  const { scenario } = world;
  const radii = [
    scenario.inputs.insideRadius,
    scenario.inputs.insideRadius + scenario.inputs.roadWidth,
    scenario.requiredInnerRadius,
    scenario.requiredOuterRadius,
  ];
  world.scanGroup.children.forEach((line, index) => {
    replaceArc(line, Math.max(0.5, radii[index]), 0.2);
  });
}

function restartAnimation(world) {
  cancelAnimationFrame(world.frameId);
  world.startTime = performance.now();
  world.scanGroup.visible = !world.reducedMotion;
  world.road.material.opacity = world.reducedMotion ? 1 : 0;
  world.envelope.material.opacity = world.reducedMotion ? 0.3 : 0;
  world.scanMaterial.opacity = world.reducedMotion ? 0 : 0.9;
  positionVehicle(world, world.reducedMotion ? 0.58 : 0.03);

  if (world.reducedMotion || !world.visible || !world.pageVisible) {
    world.renderer.render(world.scene, world.camera);
    return;
  }
  world.frameId = requestAnimationFrame(world.renderFrame);
}

export function TurningEnvelopeScene({ scenario, vehicleLength, runToken, onUnavailable }) {
  const hostRef = useRef(null);
  const worldRef = useRef(null);
  const scenarioRef = useRef(scenario);
  const vehicleLengthRef = useRef(vehicleLength);
  const onUnavailableRef = useRef(onUnavailable);
  const initialRunTokenRef = useRef(runToken);

  scenarioRef.current = scenario;
  vehicleLengthRef.current = vehicleLength;
  onUnavailableRef.current = onUnavailable;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07111f);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    } catch {
      onUnavailableRef.current?.();
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(-25, 25, 25, -25, 0.1, 160);
    scene.add(new THREE.HemisphereLight(0xdbeafe, 0x172033, 2.2));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(24, 40, 18);
    scene.add(keyLight);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(58, 80),
      new THREE.MeshStandardMaterial({ color: 0x0d1b2a, roughness: 1 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.08;
    scene.add(ground);

    const road = new THREE.Mesh(
      new THREE.BufferGeometry(),
      new THREE.MeshStandardMaterial({ color: 0x34465d, roughness: 0.93, transparent: true }),
    );
    scene.add(road);
    const envelope = new THREE.Mesh(
      new THREE.BufferGeometry(),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.3, depthWrite: false, side: THREE.DoubleSide }),
    );
    envelope.position.y = 0.045;
    scene.add(envelope);

    const boundaryMaterial = new THREE.LineBasicMaterial({ color: 0xe2e8f0, transparent: true, opacity: 0.9 });
    const innerBoundary = new THREE.Line(new THREE.BufferGeometry(), boundaryMaterial);
    const outerBoundary = new THREE.Line(new THREE.BufferGeometry(), boundaryMaterial);
    scene.add(innerBoundary, outerBoundary);

    const assumedPath = new THREE.Line(
      new THREE.BufferGeometry(),
      new THREE.LineDashedMaterial({ color: 0x38bdf8, dashSize: 0.7, gapSize: 0.45 }),
    );
    const rearWheelPath = new THREE.Line(
      new THREE.BufferGeometry(),
      new THREE.LineDashedMaterial({ color: 0xfbbf24, dashSize: 0.45, gapSize: 0.35 }),
    );
    scene.add(assumedPath, rearWheelPath);

    const scanGroup = new THREE.Group();
    const scanMaterial = new THREE.LineBasicMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0 });
    for (let index = 0; index < 4; index += 1) {
      scanGroup.add(new THREE.Line(new THREE.BufferGeometry(), scanMaterial));
    }
    scene.add(scanGroup);

    const vehicle = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BufferGeometry(),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.48, metalness: 0.12 }),
    );
    body.position.y = 1.12;
    vehicle.add(body);
    const cab = new THREE.Mesh(
      new THREE.BufferGeometry(),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.45 }),
    );
    vehicle.add(cab);
    scene.add(vehicle);

    const marker = new THREE.Mesh(
      new THREE.RingGeometry(0.42, 0.68, 24),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.95 }),
    );
    marker.rotation.x = -Math.PI / 2;
    marker.position.y = 0.2;
    scene.add(marker);

    const world = {
      host, scene, renderer, camera, road, envelope, innerBoundary, outerBoundary,
      assumedPath, rearWheelPath, scanGroup, scanMaterial, vehicle, body, cab, marker,
      scenario: scenarioRef.current,
      reducedMotion,
      visible: false,
      pageVisible: !document.hidden,
      frameId: undefined,
      startTime: performance.now(),
      viewSize: 50,
      lastRunToken: initialRunTokenRef.current,
      resize: () => {},
      renderFrame: () => {},
    };

    world.resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.min(Math.max(host.clientHeight, 320), 900);
      const aspect = width / height;
      const halfHeight = world.viewSize / 2;
      camera.left = -halfHeight * aspect;
      camera.right = halfHeight * aspect;
      camera.top = halfHeight;
      camera.bottom = -halfHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    world.renderFrame = (time) => {
      const elapsed = time - world.startTime;
      const reveal = Math.min(elapsed / 900, 1);
      road.material.opacity = reveal;
      envelope.material.opacity = reveal * 0.3;
      scanMaterial.opacity = Math.max(0, 0.9 * (1 - Math.max(0, (reveal - 0.55) / 0.45)));
      positionVehicle(world, Math.min(Math.max((elapsed - 250) / 3000, 0), 1));
      if (reveal === 1) scanGroup.visible = false;
      renderer.render(scene, camera);
      if (elapsed < 3400 && world.visible && world.pageVisible) {
        world.frameId = requestAnimationFrame(world.renderFrame);
      }
    };

    worldRef.current = world;
    applyScenario(world, scenarioRef.current, vehicleLengthRef.current);
    updateScanGeometry(world);

    const resizeObserver = new ResizeObserver(world.resize);
    resizeObserver.observe(host);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      const wasVisible = world.visible;
      world.visible = entry.isIntersecting;
      if (world.visible && !wasVisible) restartAnimation(world);
      if (!world.visible) cancelAnimationFrame(world.frameId);
    }, { rootMargin: '120px' });
    intersectionObserver.observe(host);

    const onVisibility = () => {
      world.pageVisible = !document.hidden;
      if (world.pageVisible && world.visible) restartAnimation(world);
      else cancelAnimationFrame(world.frameId);
    };
    const onContextLost = (event) => {
      event.preventDefault();
      onUnavailableRef.current?.();
    };
    document.addEventListener('visibilitychange', onVisibility);
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    return () => {
      cancelAnimationFrame(world.frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      const disposed = new Set();
      scene.traverse((object) => {
        object.geometry?.dispose();
        disposeMaterial(object.material, disposed);
      });
      renderer.dispose();
      renderer.domElement.remove();
      worldRef.current = null;
    };
  }, []);

  useEffect(() => {
    const world = worldRef.current;
    if (!world) return;
    applyScenario(world, scenario, vehicleLength);
    updateScanGeometry(world);
  }, [scenario, vehicleLength]);

  useEffect(() => {
    const world = worldRef.current;
    if (!world || world.lastRunToken === runToken) return;
    world.lastRunToken = runToken;
    restartAnimation(world);
  }, [runToken]);

  return <div ref={hostRef} className="h-[420px] w-full overflow-hidden rounded-2xl sm:h-[560px] lg:h-[680px]" />;
}
