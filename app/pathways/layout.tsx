import NavigationBar from "../components/navigation/NavigationBar";
import Footer from "../components/navigation/Footer";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <main className="main-container flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
