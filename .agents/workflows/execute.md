---
description: /execute
---

# Workflow: /execute

Khi user gọi `/execute` kèm theo file plan (hoặc đề cập đến file plan trong `src/docs/plan/`), thực hiện đầy đủ các bước sau theo đúng thứ tự. **Không được bỏ qua bất kỳ bước nào.**

---

## Bước 0: Chuẩn bị — Đọc Rules (BẮT BUỘC)

Trước khi bắt đầu bất kỳ task nào, đọc toàn bộ các file rules trong `.agents/rules/`:

- `00-overview.md` — Tổng quan kiến trúc
- `01-folder-structure.md` — Cấu trúc thư mục
- `02-naming-convention.md` — Quy tắc đặt tên
- `03-component-pattern.md` — Pattern cho component
- `04-state-management.md` — Zustand + TanStack Query
- `05-api-pattern.md` — Axios client + API functions
- `06-feature-module.md` — Cấu trúc feature module
- `07-type-convention.md` — TypeScript types
- `08-i18n-convention.md` — Đa ngôn ngữ
- `09-utils-hooks.md` — Utils và custom hooks
- `10-styling-convention.md` — CSS / Tailwind

> ⛔ **Không được bỏ qua bước này.** Mọi code được tạo ra phải tuân thủ rules.

---

## Bước 1: Đọc file plan

- Xác định file plan được user đề cập (ví dụ: `src/docs/plan/feature-xyz.md`).
- Đọc toàn bộ nội dung plan.
- Xác nhận lại với user danh sách tasks sẽ thực hiện trước khi bắt đầu.

---

## Bước 2: Thực thi tuần tự từng task

Thực hiện **từng task một** theo thứ tự trong plan. Sau mỗi task:

1. Cập nhật trạng thái trong file plan:
   - `- [ ]` → `- [🔄]` khi đang làm
   - `- [🔄]` → `- [x]` khi hoàn thành
2. Báo cáo ngắn gọn cho user: task vừa hoàn thành là gì, file nào đã tạo/sửa.
3. Chỉ chuyển sang task tiếp theo sau khi task hiện tại đã hoàn chỉnh.

### Quy tắc thực thi

| Quy tắc | Mô tả |
|---------|-------|
| **Tuần tự** | Không làm nhiều task cùng lúc. Hoàn thành task trước mới chuyển sang task sau. |
| **Sử dụng lại** | Task sau phải import và dùng đúng model/hook/component đã tạo ở task trước — không tạo lại. |
| **Không tự ý mở rộng** | Chỉ thực hiện đúng những gì plan mô tả. Nếu cần thay đổi scope, báo user trước. |
| **Tuân thủ rules** | Mọi file tạo ra phải đúng naming convention, folder structure, và code pattern theo `.agents/rules/`. |

---

## Bước 3: Xử lý lỗi

Nếu gặp lỗi trong quá trình thực hiện (file không tồn tại, dependency thiếu, type conflict, v.v.):

1. **Dừng lại** — không tiếp tục sang task tiếp theo.
2. Cập nhật trạng thái task trong plan thành `- [❌]` kèm ghi chú lỗi.
3. Báo cáo lỗi rõ ràng cho user: lỗi gì, ở đâu, nguyên nhân có thể.
4. **Hỏi user** cách xử lý trước khi tiếp tục.

---

## Bước 4: Hoàn thành

Khi tất cả tasks trong plan đã được đánh dấu `[x]`:

1. Tổng kết ngắn gọn: bao nhiêu file đã tạo mới, bao nhiêu file đã sửa.
2. Liệt kê các file quan trọng nhất với đường dẫn cụ thể.
3. Đề xuất bước kiểm tra tiếp theo nếu cần (ví dụ: chạy dev server, kiểm tra UI).

---

## Ký hiệu trạng thái trong plan

| Ký hiệu | Ý nghĩa |
|---------|---------|
| `- [ ]` | Chưa thực hiện |
| `- [🔄]` | Đang thực hiện |
| `- [x]` | Hoàn thành |
| `- [❌]` | Lỗi — cần xử lý |

---

## Ngôn ngữ

- Ghi chú, báo cáo tiến độ, và thông báo lỗi: **tiếng Việt**
- Thuật ngữ kỹ thuật (component, hook, query, mutation, store, v.v.): giữ nguyên **tiếng Anh**
