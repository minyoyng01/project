/**
 * Todo 아이템 타입 정의
 * @property {string} id - 고유 식별자
 * @property {string} text - 할 일 내용
 * @property {boolean} completed - 완료 여부
 * @property {Date} createdAt - 생성 날짜
 * @property {string} memo - 메모 (선택사항)
 * @property {string} imageUrl - 첨부 이미지 URL (선택사항)
 */
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  memo?: string;
  imageUrl?: string;
}
