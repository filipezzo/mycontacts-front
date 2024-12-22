import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export function Layout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-900 p-5 text-white">
      <main className="mx-auto w-full max-w-[500px] pt-12">
        <header className="mb-8">
          <h1 className="text-center text-3xl font-bold">
            My<span className="font-bold text-indigo-700">Contacts</span>
          </h1>
        </header>
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}
