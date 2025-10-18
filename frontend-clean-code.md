## 🧭 Frontend Clean Code

| **Hạng mục**                    | **Quy tắc chính**                                                                                                                                                                  | **Mục tiêu / Tư duy cần nhớ**                         |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **1️⃣ Cấu trúc file & thư mục**  | - File ≤ **300 dòng** <br> - Thư mục sâu ≤ **4 cấp** <br> - `Component = PascalCase`, `hook/util = camelCase` <br> - Không import vòng tròn <br> - Tên file dạng `kebab-case.jsx`  | Cấu trúc gọn, dễ tìm, tránh spaghetti import          |
| **2️⃣ Component**                | - Mỗi component **1 chức năng chính** <br> - JSX ≤ 100 dòng <br> - UI tách riêng logic <br> - Reusable UI vào `components/`                                                        | Dễ đọc, dễ test, tránh “God component”                |
| **3️⃣ Render Function**          | - Không viết logic trong `return` <br> - Tách hàm render phụ (`renderAvatar()`) <br> - JSX ngắn, rõ ràng                                                                           | JSX = declarative UI, không chứa business logic       |
| **4️⃣ Khi nào tách Component**   | - JSX lặp lại nhiều nơi → Reusable component <br> - Có state / lifecycle riêng → Subcomponent <br> - Dài > 100 dòng → Chia nhỏ                                                     | Tách khi có **UI độc lập** hoặc **state riêng**       |
| **5️⃣ Khi nào tách Hook**        | - Logic lặp lại ở nhiều nơi <br> - Có nhiều `useEffect` (≥3) <br> - Có state + side-effect gắn liền <br> - Dễ đặt tên “use + action”                                               | Tách khi có **logic có thể tái sử dụng / test riêng** |
| **6️⃣ TypeScript**               | - Ưu tiên `type` hơn `interface` (trừ khi extend) <br> - Đặt tên rõ: `User`, `UserDTO`, `UserProps` <br> - Dùng `Pick`, `Omit`, `Partial` thay vì copy <br> - Không dùng `any` bừa | Type rõ ràng = ít bug, dễ refactor                    |
| **7️⃣ Quy tắc đặt tên & import** | - Tên có ngữ nghĩa (`onLoginSubmit`, `userList`) <br> - Import theo thứ tự: React → lib → hooks → components → utils → styles                                                      | Tên thể hiện ý định, import gọn, đọc thuận mắt        |
| **8️⃣ Constants & Magic Values** | - Không hardcode string/số <br> - Dùng constant hoặc enum (`DEFAULT_LIMIT`, `ROUTE_PATH.LOGIN`)                                                                                    | Dễ đổi, tránh lỗi lặt vặt                             |
| **9️⃣ Comment & Code Smell**     | - Comment _tại sao_, không _làm gì_ <br> - Không để `console.log`, TODO chưa ticket hóa <br> - Không dead code                                                                     | Code sạch, reviewer đỡ khổ                            |
| **🔟 Clean Architecture**       | - Mỗi feature = 1 module độc lập (`features/user/…`) <br> - Không cross-import giữa feature <br> - Shared logic → `shared/` hoặc `lib/`                                            | Dễ scale, dễ maintain, tránh dependency ngược         |
| **11️⃣ Metric khuyến nghị**      | - File ≤ 300 dòng <br> - Cyclomatic complexity ≤ 10 <br> - Hook depth ≤ 3 <br> - Folder depth ≤ 4                                                                                  | Giữ code “vừa sức đọc” và “ít side-effect”            |
| **12️⃣ Tooling enforce**         | - ESLint + Prettier + Husky + Lint-staged <br> - `tsc --noEmit` trong CI <br> - Storybook / React Profiler                                                                         | Code đồng nhất, dễ debug hiệu năng                    |
| **13️⃣ 3 WHYs trước khi commit** | 1️⃣ Tại sao dòng này tồn tại? <br> 2️⃣ Tại sao đặt ở đây? <br> 3️⃣ Tại sao người khác hiểu được ngay?                                                                                 | Nếu không trả lời được → refactor ngay                |

---

## 🧠 Tư duy cốt lõi (để truyền cho team)

| **Nguyên tắc**                     | **Giải thích ngắn gọn**                     |
| ---------------------------------- | ------------------------------------------- |
| **1. SRP (Single Responsibility)** | Mỗi component/hook chỉ làm _một việc_       |
| **2. Separation of Concerns**      | UI ↔ Logic ↔ Data tách biệt               |
| **3. Consistency > Cleverness**    | Code dễ đọc > Code thông minh               |
| **4. Predictable Structure**       | Dự đoán được file, folder, type khi cần sửa |
| **5. Declarative UI**              | JSX mô tả UI, không chứa logic xử lý        |
