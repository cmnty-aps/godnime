import { ScheduleAnilist } from "@/lib/Anilistfunction";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl?.searchParams || new URL(req.url).searchParams;
    const day = searchParams.get("day");
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");

    let fromTimestamp;
    let toTimestamp;

    if (fromParam && toParam && !isNaN(parseInt(fromParam, 10)) && !isNaN(parseInt(toParam, 10))) {
      fromTimestamp = parseInt(fromParam, 10);
      toTimestamp = parseInt(toParam, 10);
    } else {
      const now = new Date();
      const currentDay = now.getDay(); // 0 is Sunday, 1 is Monday...
      const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;

      const monday = new Date(now);
      monday.setDate(now.getDate() + diffToMonday);
      monday.setHours(0, 0, 0, 0);

      const parsedDay = day !== null && day !== undefined ? parseInt(day, 10) : (currentDay === 0 ? 6 : currentDay - 1);
      const dayOffset = isNaN(parsedDay) ? 0 : Math.max(0, Math.min(6, parsedDay));

      const targetDayStart = new Date(monday);
      targetDayStart.setDate(monday.getDate() + dayOffset);
      targetDayStart.setHours(0, 0, 0, 0);

      fromTimestamp = Math.floor(targetDayStart.getTime() / 1000);
      toTimestamp = fromTimestamp + 86399;
    }

    const schedules = await ScheduleAnilist(fromTimestamp, toTimestamp, 1, 100);

    return NextResponse.json(
      {
        from: fromTimestamp,
        to: toTimestamp,
        schedules: Array.isArray(schedules) ? schedules : [],
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("Error in schedule route:", error);
    return NextResponse.json(
      {
        from: 0,
        to: 0,
        schedules: [],
        error: "Failed to fetch airing schedule",
      },
      {
        status: 200, // Return 200 with empty schedules so client never crashes on unexpected HTML error!
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
