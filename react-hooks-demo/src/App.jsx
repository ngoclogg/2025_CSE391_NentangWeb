import Demo1_InputRealtime from "./components/Demo1_InputRealtime";
import Demo2_AutoFocusInput from "./components/Demo2_AutoFocusInput";
import Demo3_AdvancedHooks from "./components/Demo3_AdvancedHooks";

export default function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 main-heading">🎯 React Hooks Demo</h1>
      <Demo1_InputRealtime />
      <Demo2_AutoFocusInput />
      <Demo3_AdvancedHooks />
    </div>
  );
}
