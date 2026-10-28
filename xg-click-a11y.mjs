/**
 * 2026-10-28 AI검토 4차: 클릭만 되는 칸(div·li·p·span·dd·td·strong 에 @click)을 키보드로도 누를 수 있게 — 템플릿 컴파일 단계 변환 (4앱 같은 파일)
 *
 * 화면 곳곳에 버튼이 아닌 요소에 @click 만 걸려 있어(약 130곳) 마우스로만 누를 수 있었습니다.
 * - 이런 요소에 role="button"·tabindex="0"·data-xg-click 을 붙임(코드 수정 없이 빌드 때 일괄)
 * - Enter/Space → 클릭은 plugins/click-a11y.client.js 가 처리, 안쪽에 링크·버튼이 있는 칸은 실행 시 해제(중첩 방지)
 * - 제외: @click.self(팝업 배경 닫기), 이미 role/tabindex 가 있는 요소, class 에 modal/toast/dim/overlay/bg 가 든 요소
 * nuxt.config 의 vite.vue.template.compilerOptions.nodeTransforms 로 연결
 */
const TAGS = new Set(["div", "li", "p", "span", "dd", "dt", "td", "strong"]);
const SKIP_CLASS = /(^|\s|-)(modal|toast|dim|overlay|backdrop|bg)(\s|-|$)/i;

const attr = (name, content, loc) => ({ type: 6, name, nameLoc: loc, value: { type: 2, content, loc }, loc });

export function xgClickA11y(node) {
  if (node.type !== 1 || !TAGS.has(node.tag)) return;
  const props = node.props || [];
  const click = props.find((p) => p.type === 7 && p.name === "on" && p.arg && p.arg.content === "click");
  if (!click) return;
  const mods = (click.modifiers || []).map((m) => (typeof m === "string" ? m : m.content));
  if (mods.includes("self")) return;
  const has = (n) => props.some((p) => (p.type === 6 && p.name === n) || (p.type === 7 && p.name === "bind" && p.arg && p.arg.content === n));
  if (has("role") || has("tabindex") || has("data-xg-click")) return;
  const cls = props.find((p) => p.type === 6 && p.name === "class");
  if (cls && cls.value && SKIP_CLASS.test(cls.value.content)) return;
  props.push(attr("role", "button", node.loc), attr("tabindex", "0", node.loc), attr("data-xg-click", "", node.loc));
}
