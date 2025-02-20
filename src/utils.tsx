import { SortingFn } from "@tanstack/react-table";

export function formatTextToHTML(text: string) {
  // Convert bold text (wrapped in **) to <strong> tags
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Convert headings (text ending with a colon) to <h3> tags
  text = text.replace(/^(.*?:)\s*/gm, "<h3>$1</h3>");

  return text;
}

export function splitOnPeriods(text: string) {
  // Use a lookahead assertion to split on periods but keep them
  return text.split(/(?<=\.)/);
}
