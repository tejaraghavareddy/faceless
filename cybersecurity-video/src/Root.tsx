import React from "react";
import { CyberSecurityVideo } from "./CyberSecurityVideo";

export const Root: React.FC<{ title?: string }> = ({ title }) => {
  return <CyberSecurityVideo title={title ?? "CYBER SECURITY IN 30 SECONDS"} />;
};
