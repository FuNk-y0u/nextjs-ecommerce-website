import React from "react";

import { IconBrandInstagram } from "@tabler/icons-react";

export default function BottomBar() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="">
        <a target="_blank" href="https://www.instagram.com/amakashi.achaar/">
          <IconBrandInstagram></IconBrandInstagram>
        </a>
      </div>
    </div>
  );
}
