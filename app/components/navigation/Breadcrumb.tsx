import BreadcrumbChevron from "@/public/assets/svg/breadcrumb-chevron-right.svg?svgr";
import BreadcrumbHome from "@/public/assets/svg/breadcrumb-home.svg?svgr";
import Link from "next/link";

interface BreadcrumbLink {
  display: string;
  link: string;
}

interface BreadcrumbProps {
  path: Array<BreadcrumbLink>;
}

const BreadCrumb = ({ path }: BreadcrumbProps) => {
  return (
    <div className="flex gap-3 items-center">
      <Link href="/">
        <BreadcrumbHome />
      </Link>
      {path.map((link, index) => {
        if (index !== 0 && index !== path.length - 1) {
          if (index === 1)
            return (
              <>
                <BreadcrumbChevron />
                <Link href={link.link}>
                  <span className="text-sm ml-3 text-gray-600 font-medium">
                    ...
                  </span>
                </Link>
              </>
            );
          return null;
        }
        return (
          <>
            <BreadcrumbChevron
              className={
                index === path.length - 1 ? undefined : "hidden fold:block"
              }
            />
            <Link href={link.link}>
              <span
                className={`text-sm ml-3 ${
                  index === path.length - 1
                    ? "text-primary-700 font-semibold"
                    : "text-gray-600 font-medium hidden fold:block"
                }`}
              >
                {link.display}
              </span>
            </Link>
          </>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
