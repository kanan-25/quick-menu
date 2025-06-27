// app/template/page.jsx

import { Suspense } from "react";
import DynamicMenu from "./DynamicMenu";

export default function TemplatePage() {
  return (
    <main>
      <h1 className="text-3xl font-bold text-center my-8">Restaurant Menu</h1>
      <Suspense fallback={<div className="text-center py-20">Loading menu...</div>}>
        <DynamicMenu />
      </Suspense>
    </main>
  );
}
