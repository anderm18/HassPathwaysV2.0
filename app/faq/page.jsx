import { SiDiscord, SiGithub } from "react-icons/si";
import Link from "next/link";
import * as Icon from "../components/utils/Icon";
import NavigationBar from "../components/navigation/NavigationBar";

async function getFAQ() {
  const res = await fetch("http://localhost:3000/api/faq");
  const faq = res.json();
  return faq;
}

const FAQ = async () => {
  const faqQuestions = await getFAQ();

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar className="flex" />
      <main className="flex-1 flex flex-col px-8 items-center w-full">
        <header className="py-12 md:py-24 flex flex-col gap-6 items-center w-full">
          <section className="flex flex-col gap-3 items-center">
            <p className="text-primary-700 text-md font-semibold">FAQs</p>
            <h1 className="text-display-sm md:text-display-lg font-semibold">
              Frequently asked questions
            </h1>
          </section>
          <p className="text-center text-md md:text-xl">
            Have questions? We're here to help.
          </p>
        </header>
        <section className="flex justify-center items-start gap-x-8 gap-y-16 flex-wrap mb-24">
          {faqQuestions.map((question) => {
            const IconComponent = Icon[question.icon];

            return (
              <section key={question.question} className="w-[384px]">
                <div className="mb-5 border-8 border-solid border-primary-50 bg-primary-100 rounded-full w-fit p-3 mx-auto flex items-center justify-center">
                  {IconComponent && (
                    <IconComponent className="w-6 h-6 path-primary-600" />
                  )}
                </div>
                <div>
                  <header className="text-xl font-semibold text-center text-gray-900 md-2">
                    {question.question}
                  </header>
                  <p className="text-center text-md text-gray-600">
                    {question.answer}
                  </p>
                </div>
              </section>
            );
          })}
        </section>
      </main>
      <footer className="footer bg-gray-100">
        <div className="flex gap-4">
          <SiDiscord className="icon" />
          <SiGithub className="icon" />
        </div>
        <div className="flex gap-12 text-md">
          <Link href="/faq">FAQ</Link>
          <Link href="/courses">My Courses</Link>
          <Link href="/pathways">My Pathways</Link>
        </div>
        <div className="text-md">&copy; 2023 Hass Pathways</div>
      </footer>
    </div>
  );
};

export default FAQ;
