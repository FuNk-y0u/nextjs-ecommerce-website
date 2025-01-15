import React from "react";

import { IconBrandInstagram } from "@tabler/icons-react";

export default function BottomBar() {
  return (
    <div className="bg-black md:h-[40vh] flex flex-col items-center justify-center text-white p-10 overflow-hidden gap-4 text-center">
      <h1 className="text-4xl font-bold text-white">Ama Kashi</h1>
      <a target="_blank" href="https://www.instagram.com/amakashi.achaar/">
        <IconBrandInstagram color="white"></IconBrandInstagram>
      </a>
      <p className="text-sm">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout.
      </p>
      <p className="text-sm">Contact: +977 9823233467 | +977 9823233467</p>
      <p className="text-sm">Website built with ❤️ by Robesckey D. Maharjan</p>
      <p className="text-sm">
        Issues reguarding website? robesckeydangol2006@gmail.com
      </p>
    </div>
  );
}
