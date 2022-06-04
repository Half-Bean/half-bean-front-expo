import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BackBtn = () => {
  return (
    <MaterialCommunityIcons
      name="arrow-left"
      size={30}
      style={{ paddingLeft: 10 }}
    />
  );
};
export default BackBtn;
