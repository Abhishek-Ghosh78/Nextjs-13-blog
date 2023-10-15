import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

export default function DatePicker() {
  const [startDate, setStartDate] = useState<any>(null);
  return (
    <Datetime
      value={startDate}
      onChange={(date) => setStartDate(date)}
      className="p-2 border border-gray-400"
    />
  );
}
