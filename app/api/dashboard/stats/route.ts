import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/lib/models/Event";

export async function GET() {
  try {
    await connectDB();

    // Aggregating counts for each event type
    const stats = await Event.aggregate([
      {
        $group: {
          _id: "$eventType",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          eventType: "$_id",
          count: 1,
        },
      },
    ]);

    // Format results as an object for easier consumption on the frontend
    const formattedStats = stats.reduce(
      (acc, item) => {
        acc[item.eventType] = item.count;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Ensure all event types are present in the response, even with 0 count
    const allTypes = [
      "visit_proposed",
      "visit_confirmed",
      "price_request",
      "vacancy_request",
      "conversation_closed_by_admin",
    ];

    allTypes.forEach((type) => {
      if (!(type in formattedStats)) {
        formattedStats[type] = 0;
      }
    });

    return NextResponse.json(formattedStats);
  } catch (error) {
    console.error("🔥 Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
