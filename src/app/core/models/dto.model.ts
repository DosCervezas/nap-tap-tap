export interface Dto<T> {
  success: boolean;
  alarm?: T;
  items?: T;
}
