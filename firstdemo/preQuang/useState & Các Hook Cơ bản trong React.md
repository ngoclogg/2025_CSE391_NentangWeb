# useState & Các Hook Cơ bản trong React

## Mục lục
1. [Lý thuyết về useState và các Hook cơ bản](#lý-thuyết-về-usestate-và-các-hook-cơ-bản)
2. [Demo useState](#demo-usestate)
3. [Demo useRef và useLayoutEffect](#demo-useref-và-uselayouteffect)
4. [Tổng kết](#tổng-kết)

## Lý thuyết về useState và các Hook cơ bản

### 1. Hook useState

#### Cú pháp
```jsx
const [value, setValue] = useState(initialValue);
```

- `initialValue`: Giá trị khởi tạo của state
- `value`: Biến state hiện tại
- `setValue`: Hàm để cập nhật state

#### Nguyên tắc cập nhật state bất đồng bộ
- React cập nhật state một cách bất đồng bộ để tối ưu hiệu suất
- Khi gọi hàm `setValue()`, React không cập nhật state ngay lập tức
- React sẽ lên lịch (schedule) việc cập nhật và thực hiện nó vào thời điểm thích hợp
- Nếu cần sử dụng giá trị state mới ngay sau khi cập nhật, nên sử dụng callback:

```jsx
setValue(prevValue => prevValue + 1);
```

### 2. Hook useRef

#### Cú pháp
```jsx
const refContainer = useRef(initialValue);
```

#### Đặc điểm và ứng dụng thực tiễn
- `useRef` tạo ra một đối tượng có thuộc tính `.current` lưu trữ giá trị
- Giá trị trong `useRef` được giữ nguyên giữa các lần render
- Thay đổi giá trị `.current` không gây ra re-render
- Ứng dụng thực tiễn:
  - Truy cập trực tiếp đến DOM elements
  - Lưu trữ giá trị trước đó của state
  - Lưu trữ biến mutable mà không gây re-render
  - Tự động focus vào input khi component mount

### 3. Hook useLayoutEffect

#### Cú pháp
```jsx
useLayoutEffect(() => {
  // Code thực thi đồng bộ sau khi DOM cập nhật
  // nhưng trước khi trình duyệt vẽ lại
  return () => {
    // Cleanup function (optional)
  };
}, [dependencies]);
```

#### Đặc điểm và ứng dụng thực tiễn
- Tương tự `useEffect` nhưng chạy đồng bộ sau khi DOM cập nhật và trước khi trình duyệt vẽ lại
- Phù hợp cho các tác vụ cần đọc layout từ DOM và thiết lập lại ngay lập tức
- Ứng dụng thực tiễn:
  - Đo kích thước element sau khi render
  - Tính toán vị trí của các element
  - Ngăn chặn nhấp nháy (flickering) khi cập nhật UI
  - Animations cần chạy ngay sau khi DOM cập nhật

## Demo useState

File demo: `usestate_demo.html`

Demo này minh họa hai khía cạnh quan trọng của useState:
1. **Cập nhật state realtime với input text**: Khi người dùng nhập văn bản vào ô input, state được cập nhật ngay lập tức và hiển thị trên giao diện.
2. **Cập nhật state bất đồng bộ**: Minh họa sự khác biệt giữa cách cập nhật state trực tiếp và cập nhật state thông qua callback function.

### Cách chạy demo
1. Mở file `usestate_demo.html` trong trình duyệt web
2. Thử nhập văn bản vào ô input để thấy state cập nhật realtime
3. Thử nhấn các nút trong phần "Demo Cập Nhật State Bất Đồng Bộ" để thấy sự khác biệt

### Đoạn code chính

```jsx
// Khai báo state với useState
const [text, setText] = React.useState('');

// Hàm xử lý khi input thay đổi
const handleChange = (e) => {
    setText(e.target.value);
};

// Cập nhật state không đúng cách
const incrementWrong = () => {
    setCount(count + 1);
    setCount(count + 1); // Vẫn sử dụng giá trị count cũ
};

// Cập nhật state đúng cách với callback
const incrementRight = () => {
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1); // Sử dụng giá trị mới nhất
};
```

## Demo useRef và useLayoutEffect

File demo: `useref_uselayouteffect_demo.html`

Demo này minh họa ba ứng dụng quan trọng:
1. **Auto Focus Input với useRef**: Tự động focus vào input khi component mount
2. **Lưu trữ giá trị giữa các render với useRef**: Theo dõi giá trị trước đó của state
3. **Đo và thay đổi DOM với useLayoutEffect**: Đọc kích thước element và thay đổi style trước khi trình duyệt vẽ lại

### Cách chạy demo
1. Mở file `useref_uselayouteffect_demo.html` trong trình duyệt web
2. Quan sát input tự động được focus khi trang tải
3. Thử nhấn nút "Tăng giá trị" để thấy cách useRef lưu trữ giá trị trước đó
4. Thử nhấn nút "Tăng kích thước" để thấy cách useLayoutEffect đọc và thay đổi DOM

### Đoạn code chính

```jsx
// useRef để tự động focus input
const inputRef = React.useRef(null);

React.useEffect(() => {
    // Focus vào input khi component mount
    inputRef.current.focus();
}, []);

// useRef để lưu trữ giá trị trước đó
const prevCountRef = React.useRef();

React.useEffect(() => {
    prevCountRef.current = count;
});

// useLayoutEffect để đo và thay đổi DOM
React.useLayoutEffect(() => {
    if (boxRef.current) {
        // Đọc kích thước hiện tại của box
        const currentWidth = boxRef.current.offsetWidth;
        
        // Thay đổi style dựa trên kích thước
        if (currentWidth > 200) {
            boxRef.current.style.backgroundColor = '#e74c3c';
        } else {
            boxRef.current.style.backgroundColor = '#3498db';
        }
    }
}, [width]);
```

## Tổng kết

- **useState** là hook đơn giản, phù hợp với hầu hết các nhu cầu state cơ bản trong React. Nó cho phép component lưu trữ và cập nhật dữ liệu, gây ra re-render khi dữ liệu thay đổi.

- **useRef** là hook mạnh mẽ giúp lưu trữ giá trị giữa các lần render mà không gây re-render. Nó đặc biệt hữu ích khi cần truy cập trực tiếp đến DOM elements hoặc lưu trữ các giá trị mutable.

- **useLayoutEffect** là phiên bản đồng bộ của useEffect, chạy sau khi DOM cập nhật nhưng trước khi trình duyệt vẽ lại. Nó hỗ trợ tối ưu render và thao tác với DOM, đặc biệt trong các trường hợp cần đọc layout và thay đổi UI ngay lập tức.

Các hook này là nền tảng quan trọng để xây dựng ứng dụng React hiệu quả, giúp quản lý state, tương tác với DOM và tối ưu hiệu suất render.
