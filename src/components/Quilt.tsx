import { fabric } from '@/lib/fabrics';

// 열여섯 조각이 흩어져 있다가 한 장의 담요로 꿰매어지는 첫 화면.
// 흩어지는 방향과 각도는 고정값이라 서버·클라이언트 렌더가 같습니다.
const scatter = [
  [-30, -40, -14], [10, -50, 9], [-20, -30, 6], [40, -45, -11],
  [-50, 0, 12], [-10, 20, -6], [30, -10, 14], [55, 10, -9],
  [-45, 30, -10], [15, 45, 7], [-15, 35, -13], [45, 30, 10],
  [-35, 55, 8], [5, 60, -12], [25, 50, 11], [50, 55, -7],
];

export default function Quilt() {
  const order = [0, 7, 2, 9, 5, 3, 14, 1, 8, 13, 4, 11, 6, 15, 10, 12];
  return (
    <figure style={{ margin: 0 }}>
      <div className="quilt" role="img" aria-label="아기옷 열여섯 조각을 이어 만든 패치워크 담요 그림">
        {order.map((f, i) => {
          const [dx, dy, r] = scatter[i];
          return (
            <div
              key={i}
              className="fabric"
              style={{ ...fabric(f), ['--i' as string]: i, ['--dx' as string]: `${dx}px`, ['--dy' as string]: `${dy}px`, ['--r' as string]: `${r}deg` }}
            />
          );
        })}
      </div>
      <figcaption className="quilt-label">아기옷 16벌, 큰 담요 한 장</figcaption>
    </figure>
  );
}
