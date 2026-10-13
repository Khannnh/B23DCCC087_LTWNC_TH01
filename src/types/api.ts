// src/types/api.ts
//  Generic wrapper cho API Response
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}