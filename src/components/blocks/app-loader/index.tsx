import { BarLoader } from "react-spinners";

export default function AppLoader() {
  return (
    <div className="w-screen min-h-screen overflow-hidden flex items-center justify-center">
      <BarLoader color="#35977F" />
    </div>
  );
}
