import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Play, MapPin, ShieldCheck, Users, Layers, Award } from "lucide-react";
import HomeContent from "@/components/home-content/page";

export const metadata = {
  title: "Home",
  description:
    "Bakyson - Design and Build ELV services provider for Sub-Saharan Africa. Affordable, cutting-edge ICT solutions for Hospitality, Healthcare, Corporates, and Learning Institutions.",
};

export default function Home() {
  return <HomeContent />;
}
