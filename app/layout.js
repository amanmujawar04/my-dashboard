import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Sidebar />
        <div className="ml-60">
      <Header />
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}