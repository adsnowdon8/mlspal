import { SortingFn } from "@tanstack/react-table";
import { ReactElement } from "react";

export function formatTextToHTML(text: string) {
  // Convert bold text (wrapped in **) to <strong> tags
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Convert headings (text ending with a colon) to <h3> tags
  text = text.replace(/^(.*?:)\s*/gm, "<h3>$1</h3>");

  // Convert bullets (lines starting with a single asterisk) to <ul> and <li> tags
  text = text.replace(/^(\* .*)$/gm, "<ul><li>$1</li></ul>");

  return text;
}

export function splitOnPeriods(text: string) {
  // Use a lookahead assertion to split on periods but keep them
  return text.split(/(?<=\.)/);
}
