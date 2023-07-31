"use client";

import { NextComponentType } from "next";
import React, { useSyncExternalStore } from "react";

interface MobileLayoutProps {
  mobile?: NextComponentType;
  desktop?: NextComponentType;
  threshold: number;
}

const MobileLayout = ({ mobile, desktop, threshold }: MobileLayoutProps) => {
  const windowWidth = useSyncExternalStore(
    (listener) => {
      window.addEventListener("resize", listener);

      return () => {
        window.removeEventListener("resize", listener);
      };
    },
    () => window.innerWidth
  );

  const MobileComponent: NextComponentType = mobile || (() => <></>);
  const DesktopComponent: NextComponentType = desktop || (() => <></>);

  return windowWidth < threshold ? <MobileComponent /> : <DesktopComponent />;
};

export default MobileLayout;
