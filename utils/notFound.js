// 2026-10-27 AI검토 4차: 없는(삭제된) 번호로 상세 화면에 들어오면 빈 틀 + 오류 토스트 대신 404 안내 화면 (aimember 와 같게)
//   err: api 함수가 reject 한 백엔드 본문({ code: 400, message }) 또는 FetchError(statusCode)
//   401(로그인 만료)은 api/fetch.js 가 로그인으로 보내므로 여기서 다루지 않음
import { showError, createError } from "#app";

// api 래퍼 대부분이 { success:false, message } 로 다시 던져 code 가 빠짐 → 백엔드의 '없음/권한 없음' 문구로도 판별
const NOT_FOUND_MSG = /not found|no permission|invalid \w*_pk|잘못된 접근|존재하지 않/i;

export function isNotFoundError(err) {
  const c = Number(err?.code ?? err?.statusCode ?? err?.status);
  if ([300, 400, 403, 404].includes(c)) return true;
  return err?.success === false && NOT_FOUND_MSG.test(String(err?.message || ""));
}

export function showNotFound(message) {
  document.body?.classList.remove("is-hidden"); // 토스트용 스크롤 잠금이 남지 않게
  showError(createError({ statusCode: 404, statusMessage: message || "요청하신 내용을 찾을 수 없습니다." }));
}
