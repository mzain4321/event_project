import { connectDB } from "@/app/lib/MongoConfig";
import userLogin from "@/app/Models/userLogin";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";


export async function GET(req) {
    try {

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        await connectDB();
        if (!id) 
        {
            // Fetch all records from the adminLogin collection
            const resp = await userLogin.find({});
            return NextResponse.json({ message: "Data fetched successfully", data: resp });

        }
        const resp = await userLogin.find({ "_id": new ObjectId(id) })
        return NextResponse.json({ message: `Data with id ${id} is fetched successfully!!`, data: resp });

    } catch (error) {
        console.error("Error fetching data:", error.message);
        return NextResponse.json({ message: "Error fetching data", error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const data = await req.json();

        await connectDB();
        // Validate required fields
        if (!data.name || !data.email || !data.password) {
            return NextResponse.json({ message: "Invalid Data", error: "Missing required fields" }, { status: 500 });
        }

        const result = await userLogin.create(data); // Use create instead of insertMany
        return NextResponse.json({ message: "Data inserted successfully", data: result });
    }
    catch (error) {
        console.error("Error parsing JSON:", error.message);
        return NextResponse.json({ message: "Invalid JSON Data", error: error.message }, { status: 500 });
    }
}