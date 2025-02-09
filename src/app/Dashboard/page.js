"use client";
import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Cards from "@/app/Reuseable Components/Cards";
import EventCards from "../Reuseable Components/EventCards";
import withAuth from "../Reuseable Components/WithAuth";

const columns = [
  { field: "id", headerName: "Id", width: 90 },
  { field: "name", headerName: "Name", width: 150, editable: false },
  { field: "email", headerName: "Email", width: 150, editable: true },
  { field: "role", headerName: "Role", width: 110, editable: true },
];

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({ xAxis: [], series: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const resp = await fetch("/API/UserLogin", { method: "GET" });
        if (!resp.ok) throw new Error("Failed to fetch users");
        const userData = await resp.json();

        const allUsers = userData?.data?.map((user) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        })) || [];

        setUsers(allUsers);
        generateAnalytics(allUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    const generateAnalytics = (allUsers) => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const usersThisMonth = allUsers.filter((user) => {
        const userDate = new Date(user.createdAt);
        return userDate.getMonth() === currentMonth && userDate.getFullYear() === currentYear;
      });

      const dailyCounts = Array(31).fill(0);
      usersThisMonth.forEach((user) => {
        const day = new Date(user.createdAt).getDate();
        dailyCounts[day - 1] += 1;
      });

      const days = Array.from({ length: currentDate.getDate() }, (_, i) => i + 1);
      setAnalyticsData({
        xAxis: days,
        series: dailyCounts.slice(0, days.length),
      });
    };

    getAllUsers();
  }, []);

  return (
    <div>
      <Cards />

      <div className="w-full flex flex-col lg:flex-row gap-3 justify-center lg:justify-around mt-5 mb-5 px-7">
        {/* Analytics Chart */}
        <div className="lg:w-[60%] flex mt-5 border border-gray-300 rounded-xl p-3">
          <LineChart
            xAxis={[{ data: analyticsData.xAxis, label: "Day of the Month" }]}
            series={[{ data: analyticsData.series, label: "Users Analysis" }]}
            width={550}
            height={350}
          />
        </div>

        {/* Data Table */}
        <div className="mt-5 lg:w-[40%]">
          <Box sx={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={users}
              columns={columns}
              getRowId={(row) => row.id}
              loading={loading}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
              className="rounded-xl"
            />
          </Box>
        </div>
      </div>

      {/* Events Section */}
      <h1 className="text-center text-4xl font-semibold mt-10">Events</h1>
      <EventCards dashboard={true} />
    </div>
  );
}

export default withAuth(Dashboard);
