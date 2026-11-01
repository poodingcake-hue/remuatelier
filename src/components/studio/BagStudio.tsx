'use client';
import { Canvas, type ThreeEvent } from '@react-three/fiber';
import { ContactShadows, Decal, OrbitControls, RoundedBox } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import * as THREE from 'three';
import { download, makeSticker, SHAPES, type Shape, type Upload } from '@/lib/patch';

type Patch = { id: string; src: string; pos: [number, number, number]; size: number; rot: number };

const BAG = { w: 1.5, h: 1.7, d: 0.42 };

function useTexture(src: string) {
  const tex = useMemo(() => {
    const t = new THREE.TextureLoader().load(src);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }, [src]);
  useEffect(() => () => tex.dispose(), [tex]);
  return tex;
}

function PatchDecal({ p, active }: { p: Patch; active: boolean }) {
  const map = useTexture(p.src);
  return (
    <Decal position={p.pos} rotation={p.rot} scale={[p.size, p.size, 0.3]} map={map} depthTest polygonOffsetFactor={-4 - (active ? 1 : 0)}>
      <meshStandardMaterial map={map} transparent polygonOffset polygonOffsetFactor={-4} roughness={0.85} />
    </Decal>
  );
}

/** 캔버스 천을 흉내 낸 아주 옅은 결 텍스처 */
function useCanvasWeave() {
  return useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#f6efe1';
    ctx.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 128; i += 2) {
      ctx.fillStyle = i % 4 ? 'rgba(255,255,255,.18)' : 'rgba(120,100,70,.06)';
      ctx.fillRect(i, 0, 1, 128);
      ctx.fillRect(0, i, 128, 1);
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(6, 6);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

function Tote({ patches, activeId, onPick }: { patches: Patch[]; activeId: string | null; onPick: (e: ThreeEvent<MouseEvent>) => void }) {
  const weave = useCanvasWeave();
  const handle = (z: number) => (
    <mesh position={[0, BAG.h / 2 - 0.02, z]}>
      <torusGeometry args={[0.36, 0.035, 12, 48, Math.PI]} />
      <meshStandardMaterial color="#c9b897" roughness={0.9} />
    </mesh>
  );
  return (
    <group position={[0, 0.05, 0]}>
      <RoundedBox args={[BAG.w, BAG.h, BAG.d]} radius={0.07} smoothness={6} onClick={onPick} castShadow>
        <meshStandardMaterial map={weave} roughness={0.95} />
        {patches.map((p) => <PatchDecal key={p.id} p={p} active={p.id === activeId} />)}
      </RoundedBox>
      {handle(BAG.d / 2 - 0.06)}
      {handle(-BAG.d / 2 + 0.06)}
    </group>
  );
}

export default function BagStudio({ uploads, selected, tray }: { uploads: Upload[]; selected: string | null; tray: ReactNode }) {
  const [shape, setShape] = useState<Shape>('round');
  const [patches, setPatches] = useState<Patch[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [moving, setMoving] = useState(false);
  const gl = useRef<HTMLCanvasElement | null>(null);

  const active = patches.find((p) => p.id === activeId) ?? null;
  const update = (patch: Partial<Patch>) => setPatches((ps) => ps.map((p) => (p.id === activeId ? { ...p, ...patch } : p)));

  const onPick = (e: ThreeEvent<MouseEvent>) => {
    if (e.delta > 6) return; // 돌려 보던 중이면 무시
    e.stopPropagation();
    const local = e.object.worldToLocal(e.point.clone());
    const pos: [number, number, number] = [local.x, local.y, local.z];
    if (moving && active) {
      update({ pos });
      setMoving(false);
      return;
    }
    const u = uploads.find((x) => x.id === selected);
    if (!u) return;
    const p: Patch = { id: crypto.randomUUID(), src: makeSticker(u.img, shape), pos, size: 0.5, rot: 0 };
    setPatches((ps) => [...ps, p]);
    setActiveId(p.id);
  };

  const save = () => {
    if (gl.current) download(gl.current.toDataURL('image/png'), 'remu-bag.png');
  };

  return (
    <div className="studio">
      <div className="stack" style={{ gap: 12 }}>
        <div className="canvas3d">
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0.3, 3.6], fov: 38 }}
            gl={{ preserveDrawingBuffer: true, antialias: true }}
            onCreated={({ gl: r }) => { gl.current = r.domElement; }}
          >
            <color attach="background" args={['#f6f1e7']} />
            <hemisphereLight args={['#fffdf8', '#e6dac2', 1.5]} />
            <directionalLight position={[2.5, 3, 3]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
            <directionalLight position={[-3, 1, -2]} intensity={0.5} />
            <Tote patches={patches} activeId={activeId} onPick={onPick} />
            <ContactShadows position={[0, -0.85, 0]} opacity={0.35} scale={4} blur={2.4} far={1.2} />
            <OrbitControls enablePan={false} minDistance={2.4} maxDistance={5} minPolarAngle={0.6} maxPolarAngle={1.9} />
          </Canvas>
        </div>
        <p className="small muted">
          {moving ? '옮길 자리를 가방 위에서 눌러 주세요.' : '끌어서 돌려 보고, 눌러서 조각을 붙여요. 앞뒤 어디든 붙일 수 있어요.'}
        </p>
      </div>

      <div className="stack" style={{ gap: 16 }}>
        <div className="stack" style={{ gap: 8 }}>
          <p className="small muted">오려낼 모양</p>
          <div className="shape-row" role="group" aria-label="오려낼 모양">
            {SHAPES.map((s) => (
              <button key={s.id} aria-pressed={shape === s.id} onClick={() => setShape(s.id)}>{s.label}</button>
            ))}
          </div>
        </div>
        {tray}
        {active && (
          <div className="panel">
            <p style={{ fontWeight: 600 }}>고른 조각 다듬기</p>
            <label className="range-row">크기
              <input type="range" min={0.2} max={1.1} step={0.01} value={active.size} onChange={(e) => update({ size: Number(e.target.value) })} />
            </label>
            <label className="range-row">기울기
              <input type="range" min={-Math.PI} max={Math.PI} step={0.01} value={active.rot} onChange={(e) => update({ rot: Number(e.target.value) })} />
            </label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="btn btn-line" aria-pressed={moving} onClick={() => setMoving((m) => !m)}>{moving ? '옮기기 취소' : '자리 옮기기'}</button>
              <button className="btn btn-line" onClick={() => { setPatches((ps) => ps.filter((p) => p.id !== activeId)); setActiveId(null); setMoving(false); }}>떼어내기</button>
            </div>
            {patches.length > 1 && (
              <div className="shape-row" role="group" aria-label="다듬을 조각 고르기">
                {patches.map((p, i) => (
                  <button key={p.id} aria-pressed={p.id === activeId} onClick={() => setActiveId(p.id)}>{i + 1}번 조각</button>
                ))}
              </div>
            )}
          </div>
        )}
        <button className="btn" onClick={save} disabled={!patches.length}>그림으로 저장</button>
      </div>
    </div>
  );
}
