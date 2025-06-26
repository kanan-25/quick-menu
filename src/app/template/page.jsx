import React, { Suspense } from "react";
import DynamicMenu from "./DynamicMenu";

export default function TemplatePage() {
  return (
    <Suspense fallback={<div>Loading menu...</div>}>
      <DynamicMenu />
    </Suspense>
  );
}