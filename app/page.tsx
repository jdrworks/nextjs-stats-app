import React from "react";
import type {Metadata} from "next";
import Header from "@/app/components/header";
export const metadata: Metadata = {
    title: "Dashboard",
};
export default function Home() {
  return (
      <Header text={`Dashboard`}>Dashboard</Header>
  );
}
