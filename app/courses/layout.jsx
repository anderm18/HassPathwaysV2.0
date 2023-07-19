import Footer from "../components/navigation/Footer";
import NavigationBar from "../components/navigation/NavigationBar";

export default function CourseLayout({ children }) {
  return (
    <div>
      <NavigationBar />
      <main className="grow p-8">{children}</main>
      <Footer />
    </div>
  );
}
