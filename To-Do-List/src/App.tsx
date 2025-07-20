import { Toaster } from "react-hot-toast";
import TodoApp from "./components/TodoApp";

export default function App() {
  return (
    <>
      <TodoApp />
      <Toaster />
    </>
  );
}
