import { useEffect } from "react";
import axios from "axios";

function Test() {
  useEffect(() => {
    axios.get("/api/hello").then((response) => {
      console.log(response);
    });
  }, []);
}

export default Test;
