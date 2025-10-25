import { NextRequest, NextResponse } from 'next/server';
import axios from "axios";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const SLACK_RESERVATION_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

        await axios.post(SLACK_RESERVATION_WEBHOOK_URL!, { text: body.text });

        return NextResponse.json({ success: true });
    } catch (err: unknown) {
        console.error(err);

        let message = "Unknown error";

        if (err instanceof Error) {
            // Handle general errors
            message = err.message;
        } else if (typeof err === "string") {
            // Sometimes libraries throw strings
            message = err;
        }

        return NextResponse.json({ success: false, error: message });
    }
}
