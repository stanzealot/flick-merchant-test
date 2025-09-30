import { NextResponse } from "next/server";
import axios from "axios";
import { API } from "@/src/utils/constants/api";

export async function POST(request: Request) {
    try {
        const { message } = await request.json();
        await axios.post(API.SLACK_FRONTEND_ERRORS_WEBHOOK as string, { text: message });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error sending message to Slack:", error);
        return NextResponse.json({ error: "Failed to send message to Slack" }, { status: 500 });
    }
}
