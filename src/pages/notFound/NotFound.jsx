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
      <SectionHead title="INBLOCARE" subtitle="INUCOME" />
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
        </div>
        <div className="incomeRight">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  domain={[0, 100000]} // Setează domeniul pentru a include toate valorile de pe axa Y
                  ticks={[
                    0, 2500, 5000, 7500, 10000, 15000, 20000, 25000, 50000,
                    100000,
                  ]} // Extinde valorile pentru etichetele axei Y
                />
                <Tooltip />
                <Bar dataKey="Total" fill="#7312d0" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        {error && <p className="error-message">Error: {error}</p>}
      </div>
    </section>
  );
};

export default IncomeMY;
