
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
        const forwarded = req.headers.get("x-forwarded-for");
        const ip = forwarded ? forwarded.split(",")[0] : null;
        const clientIp = ip || "8.8.8.8";
        const geoRes = await axios.get(`https://ipapi.co/${clientIp}/json/`);
        const country = geoRes.data.country_name || "Unknown";

        return NextResponse.json({ browser, os, device, country });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Could not get client info" }, { status: 500 });
    }
}
