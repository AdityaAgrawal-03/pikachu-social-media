import { parseISO, formatDistanceToNow } from "date-fns";

export function TimeAgo({ timestamp }) {
  let timeAgo = "";

  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <small>
     | {timeAgo}
    </small>
  );
}
