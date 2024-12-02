export interface Bookmark {
  id: number;
  title: string;
  url: string;
  timestamp: string;
  category?: "today" | "yesterday" | "older";
}