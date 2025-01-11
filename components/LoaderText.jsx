import { Loader } from "@mantine/core";
import React from "react";

export default function LoaderText(props) {
  if (props.loading) {
    return <Loader size="xs" color={props.black ? "black" : "white"} />;
  } else {
    return props.text;
  }
}
