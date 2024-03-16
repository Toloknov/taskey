export function autoSize(el: HTMLTextAreaElement) {
  el.style.height = el.scrollHeight + "px";
}
export const getPadTime = (time: number) => time.toString().padStart(2, "0");
export function createArray(n: number) {
  return Array(n)
    .fill(1)
    .map((_, index) => index + 1);
}


