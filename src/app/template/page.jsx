<<<<<<< HEAD
import React, { Suspense } from "react";
=======
// app/template/page.jsx

import { Suspense } from "react";
>>>>>>> 125b761306369bac5c8985605a5017fe70f0a48c
import DynamicMenu from "./DynamicMenu";

export default function TemplatePage() {
  return (
<<<<<<< HEAD
    <Suspense fallback={<div>Loading menu...</div>}>
      <DynamicMenu />
    </Suspense>
  );
}
=======
    <main>
      <h1 className="text-3xl font-bold text-center my-8">Restaurant Menu</h1>
      <Suspense fallback={<div className="text-center py-20">Loading menu...</div>}>
        <DynamicMenu />
      </Suspense>
    </main>
  );
}
>>>>>>> 125b761306369bac5c8985605a5017fe70f0a48c
