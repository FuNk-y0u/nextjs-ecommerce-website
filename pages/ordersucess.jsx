import { Button } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import React from "react";

export default function ordersucess() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh] gap-2">
      <IconCircleCheck color="green" size={100}></IconCircleCheck>
      <p className="text-xl">Your order has been recorded!</p>
      <p className="text-sm">
        Do watch out for any emails or phone calls from us!
      </p>
      <Button
        variant="outline"
        color="black"
        onClick={() => {
          globalThis.router.push("/");
        }}
      >
        Go to Homepage
      </Button>
    </div>
  );
}
