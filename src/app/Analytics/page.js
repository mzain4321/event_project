"use client";
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import Cards from "@/app/Reuseable Components/Cards";
import { useEffect, useState } from 'react';

const chartSetting = {
    yAxis: [
        {
            label: 'Events Evaluation',
        },
    ],
    xAxis: [
        {
            label: 'Days',
        },
    ],
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-20px, 0)',
        },
    },
    width: 700,
    height: 500,
};

export default function Page() {
    const [analyticsData, setAnalyticsData] = useState(null);

    // Function to fetch events data
    const getAllEvents = async () => {
        const resp = await fetch("/API/Events", { method: "GET" });
        const eventsData = await resp.json();
        const allEvents = eventsData["data"];
        generateAnalytics(allEvents);
    };

    // Generate chart data based on events
    const generateAnalytics = (allEvents) => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
    
        const eventsThisMonth = allEvents.filter((event) => {
            const eventDate = new Date(event.createdAt);
            return (
                eventDate.getMonth() === currentMonth &&
                eventDate.getFullYear() === currentYear
            );
        });
    
        const dailyCounts = Array(31).fill(0);
        eventsThisMonth.forEach((event) => {
            const eventDate = new Date(event.createdAt);
            const day = eventDate.getDate();
            dailyCounts[day - 1] += 1;
        });
    
        const cumulativeEvents = dailyCounts.reduce((acc, count, index) => {
            const total = (acc[index - 1] || 0) + count;
            return [...acc, total];
        }, []);
    
        const days = Array.from({ length: currentDate.getDate() }, (_, i) => i + 1);
    
        const chartData = {
            xAxis: days, // Days of the month
            series: [
                {
                    datasetKeys: { id: 'dailyCounts', x: 'day', y: 'dailyCounts' },
                    label: 'Daily Events',
                    data: days.map((day, index) => ({
                        id: `daily-dataset-${index}`, // Add dataset context
                        day: day,
                        dailyCounts: dailyCounts[day - 1] || 0,
                    })),
                },
                {
                    datasetKeys: { id: 'cumulativeEvents', x: 'day', y: 'cumulativeEvents' },
                    label: 'Cumulative Events',
                    data: days.map((day, index) => ({
                        id: `cumulative-dataset-${index}`, // Add dataset context
                        day: day,
                        cumulativeEvents: cumulativeEvents[index] || 0,
                    })),
                },
            ],
        };
        
    
        setAnalyticsData(chartData);
    };

    // Set up polling for new data every 30 seconds
    useEffect(() => {
        getAllEvents(); // Initial data fetch

        const intervalId = setInterval(() => {
            getAllEvents(); // Fetch new data periodically
        }, 30000); // Adjust polling interval as needed (30 seconds in this case)

        return () => clearInterval(intervalId); // Clean up polling on component unmount
    }, []);

    return (
        <div>
            <div>
                <Cards />
            </div>
            <div className="mb-5 px-8">
                <div className="mt-10">
                    <h1 className="text-2xl lg:text-4xl text-center font-bold tracking-wide">Analytics</h1>
                </div>

                <div className='w-full lg:w-[100%] flex justify-center mt-10'>
                    <div className='w-full lg:w-[80%] flex justify-center border-[1px] border-gray-300 rounded-xl'>
                        {analyticsData && (
                            <ScatterChart
                                dataset={analyticsData.series[0].data} // Default dataset
                                series={analyticsData.series} // Include both daily and cumulative events
                                {...chartSetting}
                                className="w-full"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}