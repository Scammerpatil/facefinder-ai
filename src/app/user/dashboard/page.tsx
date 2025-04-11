"use client";
import { User } from "@/types/user";
import { IconClock, IconFile, IconShield } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Dashboard() {
  const [data, setData] = useState({
    user: 0,
    activeCases: 0,
    missingpeopleCount: 0,
    solvedCases: 0,
    differencePercentage: 0,
  });

  const fetchUser = async () => {
    const response = await axios.get("/api/dashboard/admin");
    setData(response.data.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center uppercase">
        Dashboard
      </h1>

      <div className="stats shadow w-full bg-base-300">
        <div className="stat">
          <div className="stat-figure text-primary">
            <IconFile size={40} />
          </div>
          <div className="stat-title">Total User</div>
          <div className="stat-value text-primary">{data.user}</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <IconClock size={40} />
          </div>
          <div className="stat-title">Total Active Cases</div>
          <div className="stat-value text-secondary">{data.activeCases}</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <IconShield size={40} />
          </div>
          <div className="stat-title">Total Missing People</div>
          <div className="stat-value text-success">
            {data.missingpeopleCount}
          </div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/9703/9703596.png"
                  alt="user"
                />
              </div>
            </div>
          </div>
          <div className="stat-value">{data.differencePercentage} %</div>
          <div className="stat-title">Cases Pending</div>
          <div className="stat-desc text-secondary">31 tasks remaining</div>
        </div>
      </div>
    </>
  );
}
