import React from "react";
import Nav from "@/components/secondary/nav/Nav";
import AppLayout from "@/layouts/common/AppLayout";
import SEOMetaTags from "@/components/secondary/common/SEOMetaTags";

export default function Home() {
  return (
    <AppLayout>
      <SEOMetaTags title="Bookie | Home" />
      
      <Nav />

      Hello
    </AppLayout>
  );
}