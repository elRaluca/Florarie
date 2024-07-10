import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./inconeMY.css";

import SectionHead from "../../components/SectionHead";

const IncomeMY = () => {
  const [data, setData] = useState([]);
  const [totalSales, setTotalSales] = useState(0); // Stare pentru totalul veniturilor
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMonthlySales = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `http://localhost:8060/admin/total-for-month?year=${year}&month=${month}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const total = await response.json();
        setData([{ name: `Month ${month}`, Total: total }]);
        setTotalSales(total); // Actualizează totalul veniturilor
      } catch (err) {
        setError("Failed to fetch data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlySales();
  }, [year, month]);

  return (
    <section className="income">
      <SectionHead title="INCOME" subtitle="INCOME" />
      <div className="income-container">
        <div className="incomeLeft">
          <h1>
            Income Statistics for {month}/{year}
          </h1>
          {totalSales && (
            <h2 className="total-sales">Total Sales: ${totalSales}</h2>
          )}
          <div className="selectors">
            <label>
              Year:
              <select value={year} onChange={(e) => setYear(e.target.value)}>
                {Array.from(
                  { length: 10 },
                  (_, i) => new Date().getFullYear() - i
                ).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Month:
              <select value={month} onChange={(e) => setMonth(e.target.value)}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {error && <p className="error-message">Error: {error}</p>}
        </div>
        <div className="incomeRight">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ResponsiveContainer>
              <BarChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#666666"
                  vertical={false}
                  horizontal={true}
                />
                <XAxis stroke="#000000" dataKey="name" />
                <YAxis
                  stroke="#000000"
                  className="yaxis"
                  domain={[0, 5000]}
                  ticks={[0, 250, 500, 750, 1000, 1500, 2000, 2500, 5000]}
                />

                <Bar dataKey="Total" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </section>
  );
};

export default IncomeMY;
