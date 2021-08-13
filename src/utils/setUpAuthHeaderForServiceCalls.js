import axios from "axios";

export function setUpAuthHeaderForServiceCalls(token) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  return (axios.defaults.headers.common["Authorization"] = null);
}