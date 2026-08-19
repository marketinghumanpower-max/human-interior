# 📋 Kế hoạch thực hiện: Nâng cấp Hiệu Ứng 3D & Animation Theo Scroll (Phong Cách Modern Web Showcase)

## Tổng quan
Nâng cấp toàn bộ chuyển động 3D Camera, Parallax và Animation của các phần tử UI khi người dùng scroll trang web (dựa trên trải nghiệm scroll-driven trong video hướng dẫn thiết kế website 3D cao cấp):
1. **3D Camera & Layer Movement**: Camera 3D trong React Three Fiber di chuyển theo quỹ đạo mượt mà (dolly in/out, pan nhẹ, xoay góc nghiêng) phụ thuộc chính xác vào tiến trình cuộn trang (`scrollProgress`).
2. **Smooth Scroll Interpolation**: Sử dụng lò xò vật lý (`useSpring` với stiffness/damping chuẩn) giúp camera và layer 3D phản hồi cực kỳ êm ái, không bị khựng hay giật lag khi cuộn nhanh/chậm.
3. **Chuyển cảnh 3D Crossfade mượt giữa các Section**: Khi cuộn đến từng section (`Hero` → `About` → `Projects` → `Process` → `Testimonials` → `Contact`), không gian 3D mờ dần (crossfade) sang góc nhìn/ảnh không gian mới.
4. **Staggered UI Scroll Reveal**: Các thẻ nội dung, chữ, nút CTA và hotspot đính kèm biến đổi vị trí (y offset), độ mờ (opacity), và tỉ lệ scale đồng bộ theo góc nhìn camera 3D.

---

## Danh sách công việc

### 1. 3D Engine & Camera Movement (`GlobalImageScene.tsx`)
> [MODIFY] `src/features/homepage/components/GlobalImageScene.tsx`

- [x] Chuẩn hóa đường cong nội suy Camera Path (quỹ đạo di chuyển 3D):
  - `Hero` (0% -> 20% scroll): Camera dolly tiến gần không gian (`z: 5.0 → 4.1`), nghiêng góc nhẹ (`rotation.x: 0 → -0.03`, `rotation.y: 0 → 0.05`).
  - `About` (20% -> 40% scroll): Camera chuyển hướng nhẹ sang trái/phải tạo cảm giác tham quan phòng.
  - `Projects` (40% -> 60% scroll): Mở rộng góc nhìn toàn cảnh (zoom out nhẹ) để tôn lên các tác phẩm dự án.
  - `Process` & `Testimonials` (60% -> 85% scroll): Di chuyển chiều sâu 3D vừa phải làm nổi bật quy trình & đánh giá.
  - `Contact` (85% -> 100% scroll): Settle camera về vị trí cân bằng, tĩnh lặng.
- [x] Tối ưu tốc độ lerp vật lý (`0.04 - 0.06`) giúp góc nhìn 3D chuyển động mượt mà như góc quay cinematic.

### 2. Smooth Scroll Spring & State Provider (`GlobalBackgroundCanvas.tsx` & `SceneContext.tsx`)
> [MODIFY] `src/features/homepage/components/GlobalBackgroundCanvas.tsx`
> [MODIFY] `src/features/homepage/components/SceneContext.tsx`

- [x] Cấu hình lại `useSpring` cho `scrollYProgress` toàn trang với thông số tối ưu: `stiffness: 50, damping: 28, mass: 0.5`.
- [x] Truyền giá trị `scrollProgress` mượt này vào Canvas 3D để mọi chuyển động đồng bộ 100%.

### 3. Tối ưu IntersectionObserver Chuyển Ảnh 3D (`useSceneObserver.ts`)
> [MODIFY] `src/features/homepage/components/useSceneObserver.ts`

- [x] Tinh chỉnh ngưỡng kích hoạt `threshold: [0.2, 0.4, 0.6]` giúp ảnh 3D chuyển vùng mượt mà ngay trước khi người dùng cuộn tới giữa section.

### 4. Đồng Bộ Animation UI Theo Scroll (`HeroSection.tsx`, `AboutSection.tsx`, `ProjectsSection.tsx`, v.v.)
> [MODIFY] `src/features/homepage/components/HeroSection.tsx`
> [MODIFY] `src/features/homepage/components/AboutSection.tsx`
> [MODIFY] `src/features/homepage/components/ProjectsSection.tsx`

- [x] Thêm hiệu ứng cuộn ngược hướng nhẹ (Counter-Parallax) giữa nội dung chữ/UI và nền 3D.
- [x] Thêm hiệu ứng xuất hiện cuộn mượt (Scroll-driven reveal) cho thẻ Bento Grid, Timeline quy trình và Form tư vấn.

---

## Thứ tự thực hiện khuyến nghị
1. Cấu hình Spring Scroll Progress trong `GlobalBackgroundCanvas.tsx`
2. Cập nhật Camera Travel Path & Lerp trong `GlobalImageScene.tsx`
3. Tinh chỉnh Observer Trigger Thresholds trong `useSceneObserver.ts`
4. Cập nhật hiệu ứng UI Parallax trong các Section components
5. Kiểm tra Build & Chạy thử nghiệm scroll thực tế — ✅ Hoàn tất 0 lỗi

---

## Ghi chú
- **Không thay đổi cấu trúc HTML/JSX nền tảng**, chỉ tập trung nâng cấp trải nghiệm chuyển động (Animation & Camera 3D) khi scroll.
- Giữ nguyên độ sắc nét 100% của texture (flat plane 1x1, anisotropic filtering, toneMapped=false).
