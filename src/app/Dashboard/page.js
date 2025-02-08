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
  {
    field: "name", // Field name matches the key in your userdata
    headerName: "Name",
    width: 150,
    editable: false,
  },
  {
    field: "email", // Field name matches the key in your userdata
    headerName: "Email",
    width: 150,
    editable: true,
  },
  {
    field: "role", // Field name matches the key in your userdata
    headerName: "Role",
    width: 110,
    editable: true,
  },
];

 function Dashboard() {
  const [users, setUsers] = useState([]);
  const [analyticsData, setAnalyticsData] = useState([]);

  // Fetch all users from API
  const getAllUsers = async () => {
    const resp = await fetch("/API/UserLogin", { method: "GET" });
    const userData = await resp.json();
    const allUsers = userData["data"].map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt, // Assuming `createdAt` exists in API data
    }));
    setUsers(allUsers);
    generateAnalytics(allUsers);
  };

  // Generate analytics for the current month
  const generateAnalytics = (allUsers) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Filter users added in the current month
    const usersThisMonth = allUsers.filter((user) => {
      const userDate = new Date(user.createdAt);
      return (
        userDate.getMonth() === currentMonth &&
        userDate.getFullYear() === currentYear
      );
    });

    // Group by day of the month
    const dailyCounts = Array(31).fill(0); // Initialize an array for each day
    usersThisMonth.forEach((user) => {
      const userDate = new Date(user.createdAt);
      const day = userDate.getDate(); // Get day of the month (1-31)
      dailyCounts[day - 1] += 1; // Increment count for the respective day
    });

    // Prepare data for LineChart
    const days = Array.from(
      { length: currentDate.getDate() }, // Current date determines the range
      (_, i) => i + 1
    );
    const chartData = {
      xAxis: days,
      series: dailyCounts.slice(0, days.length), // Slice up to today's date
    };
    setAnalyticsData(chartData);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <div>
        <Cards />
      </div>
      <div>
        <div className="w-full flex gap-3 flex-col justify-center lg:flex-row lg:justify-around mt-5 mb-5 px-7">
          {/* Analytics Chart */}
          <div className="lg:w-[60%] flex mt-5 border-[1px] border-gray-300 rounded-xl">
            <LineChart
              xAxis={[
                { data: analyticsData.xAxis || [], label: "Day of the Month" },
              ]}
              series={[
                {
                  data: analyticsData.series || [],
                  label: "Users Analysis",
                },
              ]}
              width={550}
              height={350}
              className="w-full lg:w-[100%] lg:h-[100%]"
            />
          </div>

          {/* Data Table */}
          <div className="mt-5 lg:w-[40%]">
            <Box sx={{ height: "100%", width: "100%" }}>
              <DataGrid
                rows={users}
                columns={columns}
                getRowId={(row) => row.id} // Use `id` as the row ID
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
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
        <div className="mt-10">
          <h1 className="text-center text-4xl tracking-wide font-semibold">
            Events
          </h1>
        </div>
        <div>
          <EventCards dashboard={true}/>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);