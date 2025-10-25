
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import {UAParser} from "ua-parser-js";

export async function GET(req: NextRequest) {
    try {
        // Detect browser/device from user-agent
        const ua = req.headers.get("user-agent") || "";
        const parser = new UAParser(ua);
        const uaResult = parser.getResult();
        const browser = `${uaResult.browser.name || "Unknown"} ${uaResult.browser.version || ""}`;
        const os = `${uaResult.os.name || "Unknown"} ${uaResult.os.version || ""}`;
        const device = uaResult.device.model || "Desktop";

        // Detect country via IP
        const ip = req.headers.get("x-forwarded-for") || req.ip || "8.8.8.8"; // fallback
        const geoRes = await axios.get(`https://ipapi.co/${ip}/json/`);
        const country = geoRes.data.country_name || "Unknown";

        return NextResponse.json({ browser, os, device, country });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Could not get client info" }, { status: 500 });
    }
}
