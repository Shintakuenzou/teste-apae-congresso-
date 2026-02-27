import { linkOptions } from "@tanstack/react-router";

export const navItems = linkOptions([
  {
    to: "/quem-somos",
    label: "Quem Somos",
  },
  {
    to: "/palestrantes",
    label: "Palestrantes",
  },
  {
    to: "/palestras",
    label: "Programação",
  },
  {
    to: "/galeria",
    label: "Galeria",
  },
]);
