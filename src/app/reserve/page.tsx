import { AlertForm, TrackForm, LetterForm } from '@/components/ReserveForms';
import { NEXT_OPEN, openLabel, STORE_URL } from '@/lib/data';

export const metadata = { title: '예약' };

export default function Reserve() {
  return (
    <>
      <section className="wrap page-head">
        <h1>다음 바느질은 {openLabel()}에 시작해요</h1>
        <p className="lead">이번 달은 {NEXT_OPEN.slots}자리를 받아요. 결제는 오픈 시각에 스마트스토어에서 진행됩니다.</p>
        <div><a className="btn btn-line" href={STORE_URL} target="_blank" rel="noreferrer">스마트스토어 열기</a></div>
      </section>

      <section className="section">
        <div className="wrap two">
          <div className="stack" style={{ gap: 12, alignContent: 'start' }}>
            <h2>오픈 알림 받기</h2>
            <p className="muted">하루 전 저녁과 오픈 10분 전에 문자로 알려드려요. 이번 달 작업대가 가득 차면 다음 자리를 먼저 알려드립니다.</p>
          </div>
          <AlertForm />
        </div>
      </section>

      <section className="section">
        <div className="wrap two">
          <div className="stack" style={{ gap: 12, alignContent: 'start' }}>
            <h2>작업 일지</h2>
            <p className="muted">옷이 도착하면 작업 번호를 문자로 보내 드려요. 지금 어느 단계인지, 작업대 위 사진과 함께 확인할 수 있어요.</p>
            <p className="small muted">미리 보기용 번호: REMU-0001</p>
          </div>
          <TrackForm />
        </div>
      </section>

      <section className="section" id="letter">
        <div className="wrap two">
          <div className="stack" style={{ gap: 12, alignContent: 'start' }}>
            <h2>사연 보내기</h2>
            <p className="muted">옷을 보내기 전에 적어 주시면 조각의 배치와 자수 문구에 반영해요. 받은 뒤의 한마디도 여기로 보내 주세요.</p>
          </div>
          <LetterForm />
        </div>
      </section>
    </>
  );
}
