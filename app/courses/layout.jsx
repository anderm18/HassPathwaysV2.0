import Footer from "../components/navigation/Footer";
import NavigationBar from "../components/navigation/NavigationBar";

export default function CourseLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <main className="main-container">{children}</main>
      <Footer />
    </div>
  );
}
