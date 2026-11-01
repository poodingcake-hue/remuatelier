// 사이트 콘텐츠. 실제 운영 전 작가님이 직접 고쳐 쓰는 것을 전제로 합니다.

export const STORE_URL = 'https://smartstore.naver.com/remuatelier';

/** 다음 예약 오픈 — 운영 시 이 값만 바꾸면 홈·예약 페이지가 함께 바뀝니다. */
export const NEXT_OPEN = {
  date: '2026-11-20',
  time: '20:00',
  slots: 10,
};

export type Product = {
  id: string;
  name: string;
  clothes: number | null; // 필요한 옷 벌 수 (확인 전이면 null)
  clothesNote?: string;
  price: number; // 스마트스토어 최대 할인가 기준 (2026-11-01 확인)
  desc: string;
  fabric: number;
  open: boolean;
};

export const products: Product[] = [
  { id: 'blanket-l', name: '패치워크 담요 (큰)', clothes: 17, price: 157000, desc: '열일곱 벌의 옷이 아이를 폭 덮는 담요가 됩니다. 의자에 걸어 두어도, 매일 덮어도 좋은 크기.', fabric: 7, open: false },
  { id: 'blanket-s', name: '패치워크 담요 (작은)', clothes: 7, price: 77000, desc: '신생아 시절 옷 일곱 벌로 만드는 애착 담요. 유모차나 낮잠 이불로 씁니다.', fabric: 0, open: false },
  { id: 'tote', name: '미니 토트백', clothes: null, clothesNote: '옷 수 상담', price: 54500, desc: '아이 옷 조각으로 만든 작은 가방. 외출할 때마다 그 시절을 들고 다닙니다.', fabric: 5, open: false },
  { id: 'doll', name: '자투리 동물 인형', clothes: null, clothesNote: '자투리 활용', price: 44130, desc: '담요를 만들고 남은 조각으로 아이 곁을 지킬 인형을 만듭니다.', fabric: 1, open: false },
  { id: 'pouch-bag', name: '복주머니', clothes: 3, price: 41220, desc: '옷 세 벌로 만드는 복주머니. 명절과 돌 선물로 많이 찾으세요.', fabric: 14, open: false },
  { id: 'basket', name: '패브릭 바구니', clothes: 1, price: 39280, desc: '단 한 벌로도 만들 수 있어요. 아이 방 작은 물건을 담아 둡니다.', fabric: 2, open: false },
  { id: 'zip-pouch', name: '지퍼 파우치', clothes: null, clothesNote: '자투리 활용', price: 24790, desc: '자투리 천으로 만드는 파우치. 가장 가볍게 시작하는 방법.', fabric: 12, open: true },
];

/** 실제 리뷰를 바탕으로 다시 쓴 샘플 문구입니다. 게재 전 고객 동의를 받아 원문으로 바꿔 주세요. */
export const stories = [
  {
    quote: '작아진 옷이 옷장 한쪽에서 짐처럼 느껴졌는데, 열어 보는 순간 그 시절이 통째로 돌아왔어요.',
    who: '첫째 엄마',
    item: '패치워크 담요 (작은)',
    from: [0, 5, 3, 9],
    to: 7,
  },
  {
    quote: '똑딱이 많아서 애먹던 옷, 리본이 자꾸 풀리던 배냇저고리. 조각마다 그날이 떠올라 담요를 안고 울었어요.',
    who: '돌 지난 아이 엄마',
    item: '패치워크 담요 (큰)',
    from: [2, 11, 6, 0],
    to: 8,
  },
  {
    quote: '한국에 잠깐 들어오는 일정에 맞춰 옷을 챙겨 왔어요. 부탁드린 자수 문구까지 그대로 담겨 왔네요.',
    who: '해외에 사는 가족',
    item: '패치워크 담요 (큰)',
    from: [9, 13, 4, 15],
    to: 0,
  },
];

export const steps = [
  { title: '예약 오픈일에 자리 잡기', body: '한 달에 한 번, 정해진 수량만 받아요. 알림을 신청하면 오픈 하루 전과 당일에 알려드립니다.' },
  { title: '옷 고르기', body: '면 100%에 가까운 옷이 잘 어울려요. 니트·기모처럼 두꺼운 옷은 함께 보내 주시면 작가가 쓸 수 있는지 봐 드려요.' },
  { title: '세탁 후 이야기와 함께 보내기', body: '한 번 세탁해 말린 옷을 보내 주세요. "이 옷을 입던 날"을 짧게 적어 함께 넣어 주시면 배치와 자수에 반영합니다.' },
  { title: '작업대 위의 한 달', body: '옷이 도착한 날부터 최대 한 달이 걸려요. 재단과 바느질 단계마다 작업 일지에 사진을 올려 드립니다.' },
  { title: '손편지와 함께 받기', body: '완성품과 작가의 손편지가 함께 갑니다. 여는 순간을 영상으로 남겨 보내 주시면 옷장 편지에 실어 드려요.' },
];

export const faqs = [
  { q: '옷이 몇 벌 있어야 하나요?', a: '바구니는 1벌, 복주머니는 3벌, 작은 담요는 7벌, 큰 담요는 17벌이 필요해요. 작품 페이지의 계산기로 확인해 보세요.' },
  { q: '얼룩이 있거나 해진 옷도 되나요?', a: '작은 얼룩은 그대로 두는 게 더 좋다는 분도 많아요. 크게 해진 부분은 피해서 재단하고, 어려운 경우 미리 연락드립니다.' },
  { q: '남은 옷은 돌려받을 수 있나요?', a: '쓰고 남은 조각은 원하시면 완성품과 함께 돌려보내 드려요. 자투리 인형이나 파우치로 만들 수도 있습니다.' },
  { q: '해외에서도 맡길 수 있나요?', a: '한국 주소로 옷을 보내고 받을 수 있다면 가능합니다. 한국 방문 일정이 있으면 예약 시 메모로 알려 주세요.' },
  { q: '결제는 어디서 하나요?', a: '결제와 리뷰는 네이버 스마트스토어에서 진행합니다. 예약 페이지의 버튼을 누르면 해당 상품으로 이동해요.' },
];

export const won = (n: number) => n.toLocaleString('ko-KR') + '원';

export const openLabel = () => {
  const [y, m, d] = NEXT_OPEN.date.split('-').map(Number);
  const wd = ['일', '월', '화', '수', '목', '금', '토'][new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return `${m}월 ${d}일 (${wd}) ${NEXT_OPEN.time}`;
};
