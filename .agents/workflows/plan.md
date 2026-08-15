---
description: /plan
---

# Workflow: /plan

Khi user gõ `/plan`, thực hiện các bước sau theo đúng thứ tự. **Không áp dụng bất kỳ thay đổi code nào** cho đến khi user xác nhận thực hiện.

---

## Bước 1: Thu thập thông tin

- Đọc toàn bộ nội dung cuộc hội thoại hiện tại để hiểu rõ yêu cầu, mục tiêu, và các chi tiết kỹ thuật mà user đã thảo luận.
- Xác định các file, feature, API, model, hook, component hoặc thành phần liên quan được đề cập trong cuộc chat.
- Nếu user đề cập đến file cụ thể, đọc nội dung file đó để hiểu context đầy đủ.
- Đọc các rules liên quan trong `.agents/rules/` nếu task liên quan đến pattern chuẩn của dự án.

---

## Bước 2: Phân tích và lập kế hoạch

Dựa trên thông tin thu thập được, tổ chức kế hoạch theo cấu trúc Markdown sau và **xuất ra cho user xem**:

```markdown
# 📋 Kế hoạch thực hiện: [Tên tính năng / Task]

## Tổng quan
[Mô tả ngắn gọn mục tiêu, phạm vi, và kết quả mong đợi]

---

## Danh sách công việc

### 1. [Nhóm 1 — ví dụ: Types & Model]
> [NEW / MODIFY / DELETE]

- [ ] [Hành động cụ thể] — `path/to/file.ts`
- [ ] [Hành động cụ thể] — `path/to/file.ts`

### 2. [Nhóm 2 — ví dụ: API Layer]
> [NEW / MODIFY / DELETE]

- [ ] [Hành động cụ thể] — `path/to/file.ts`

### 3. [Nhóm 3 — ví dụ: Query Hooks]
> [NEW / MODIFY / DELETE]

- [ ] [Hành động cụ thể] — `path/to/hooks/useXxxQuery.ts`

### 4. [Nhóm 4 — ví dụ: Components / UI]
> [NEW / MODIFY / DELETE]

- [ ] [Hành động cụ thể] — `path/to/components/XxxComponent.tsx`

### 5. [Nhóm 5 — ví dụ: Router / Integration]
> [MODIFY]

- [ ] [Hành động cụ thể] — `src/router/index.tsx`

---

## Thứ tự thực hiện khuyến nghị
1. Types & Model → đảm bảo contract rõ ràng trước
2. API functions → pure async, không phụ thuộc UI
3. Query / Mutation hooks → wrap TanStack Query
4. Components → dùng hooks đã có
5. Router / tích hợp → kết nối cuối cùng

---

## Ghi chú
- [Các lưu ý kỹ thuật, dependency, hoặc rủi ro nếu có]
```

---

## Bước 3: Lưu kế hoạch ra file

Sau khi kế hoạch đã được trình bày ở Bước 2, **tạo file lưu trữ kế hoạch** với đường dẫn:

```
.agents/code/<tên-thực-hiện>.md
```

- `<tên-thực-hiện>`: đặt theo kebab-case, mô tả ngắn gọn tính năng/task đang thực hiện.
  - Ví dụ: `tach-header-footer.md`, `them-api-candidates.md`, `refactor-form-login.md`
- Nội dung file **giống hệt kế hoạch** đã xuất ra ở Bước 2 (copy nguyên văn).
- File này dùng để **tracking tiến độ** và **tham chiếu** khi thực hiện — không cần user tạo thủ công.

> ⚠️ Tạo file **trước khi chờ user xác nhận**. Đây là bước ghi lại kế hoạch, không phải áp dụng code.

---

## Quy tắc bắt buộc

1. **Checklist phải rõ ràng**: Mỗi item là một hành động cụ thể, có thể đánh dấu hoàn thành (`- [ ]`).
2. **Gắn file path**: Mỗi task gắn với đường dẫn file cụ thể cần tạo hoặc sửa.
3. **Đánh dấu NEW / MODIFY / DELETE**: Mỗi nhóm công việc phải ghi rõ loại thao tác.
4. **Thứ tự ưu tiên**: Sắp xếp theo thứ tự phụ thuộc — model/types trước → API → hooks → UI.
5. **Ngôn ngữ**: Viết plan bằng **tiếng Việt**, các thuật ngữ kỹ thuật giữ nguyên tiếng Anh.
6. **Thực tế**: Chỉ lên kế hoạch những gì thực sự cần làm dựa trên nội dung chat, không thêm thắt.
7. **Không áp dụng code**: Chỉ trình bày kế hoạch — **chờ user xác nhận "thực hiện" hoặc "ok" mới bắt đầu code**.
8. **Tạo file lưu trữ**: Luôn tạo file `.agents/code/<tên-thực-hiện>.md` ngay sau khi xuất kế hoạch ở Bước 2, trước khi chờ user xác nhận.
