"use client";
import { useEffect, useState } from "react";

export default function DateLabel() {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(new Date().toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }));
  }, []);

  return <p className="date-label">{date}</p>;
}