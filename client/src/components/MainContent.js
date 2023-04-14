import { useState, useEffect } from "react";

export default function MainContent() {
  const [msg, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/mailing_lists")
      .then((res) => res.json())
      .then((data) => setMessage(data));
  }, []);

//  const msg = ["achats", "dev", "alerts", "internal", "monitoring","apt", "github"];
  console.log(msg);
  msg.sort();

  return (
    <div>
      <h1>Main</h1>
      <table>
        <tbody>
          {msg.map(ml => {
            return (
              <tr><td key={ml.id}>{ml}</td></tr>
            ) 
          }
          )}
        </tbody>
      </table>
    </div>
  )
}
/*



*/