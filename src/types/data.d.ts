/**
 * Data namespace chứa các interface core của ứng dụng
 * Được sử dụng để extend NextAuth types và maintain consistency
 */
export namespace Data {
  /**
   * User interface - Cấu trúc dữ liệu người dùng chuẩn
   *
   * Được sử dụng bởi:
   * - NextAuth User type (extend)
   * - Session user data
   * - API responses từ backend
   */
  export interface User {
    /** ID người dùng (string format theo yêu cầu của NextAuth) */
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }
}
