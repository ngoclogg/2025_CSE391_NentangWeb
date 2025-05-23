# useState & Các Hook Cơ bản trong React

## 1. Hook useState

### Cú pháp
```jsx
const [value, setValue] = useState(initialValue);
```

- `initialValue`: Giá trị khởi tạo của state
- `value`: Biến state hiện tại
- `setValue`: Hàm để cập nhật state

### Nguyên tắc cập nhật state bất đồng bộ
- React cập nhật state một cách bất đồng bộ để tối ưu hiệu suất
- Khi gọi hàm `setValue()`, React không cập nhật state ngay lập tức
- React sẽ lên lịch (schedule) việc cập nhật và thực hiện nó vào thời điểm thích hợp
- Nếu cần sử dụng giá trị state mới ngay sau khi cập nhật, nên sử dụng callback:

```jsx
setValue(prevValue => prevValue + 1);
```

## 2. Hook useRef

### Cú pháp
```jsx
const refContainer = useRef(initialValue);
```

### Đặc điểm và ứng dụng thực tiễn
- `useRef` tạo ra một đối tượng có thuộc tính `.current` lưu trữ giá trị
- Giá trị trong `useRef` được giữ nguyên giữa các lần render
- Thay đổi giá trị `.current` không gây ra re-render
- Ứng dụng thực tiễn:
  - Truy cập trực tiếp đến DOM elements
  - Lưu trữ giá trị trước đó của state
  - Lưu trữ biến mutable mà không gây re-render
  - Tự động focus vào input khi component mount

## 3. Hook useLayoutEffect

### Cú pháp
```jsx
useLayoutEffect(() => {
  // Code thực thi đồng bộ sau khi DOM cập nhật
  // nhưng trước khi trình duyệt vẽ lại
  return () => {
    // Cleanup function (optional)
  };
}, [dependencies]);
```

### Đặc điểm và ứng dụng thực tiễn
- Tương tự `useEffect` nhưng chạy đồng bộ sau khi DOM cập nhật và trước khi trình duyệt vẽ lại
- Phù hợp cho các tác vụ cần đọc layout từ DOM và thiết lập lại ngay lập tức
- Ứng dụng thực tiễn:
  - Đo kích thước element sau khi render
  - Tính toán vị trí của các element
  - Ngăn chặn nhấp nháy (flickering) khi cập nhật UI
  - Animations cần chạy ngay sau khi DOM cập nhật

## Tổng kết
- `useState` đơn giản, phù hợp với hầu hết các nhu cầu state cơ bản
- `useRef` giúp lưu trữ giá trị giữa các lần render mà không gây re-render
- `useLayoutEffect` hỗ trợ tối ưu render và thao tác với DOM đồng bộ
- Các hook này là nền tảng quan trọng để xây dựng ứng dụng React hiệu quả
