import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { storySlug, storyTitle, storyLevel, reportType, message, username } = await request.json();

    if (!storySlug || !reportType) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    // Save to Supabase
    await supabaseAdmin.from("story_reports").insert({
      story_slug: storySlug,
      story_title: storyTitle,
      story_level: storyLevel,
      report_type: reportType,
      message: message || null,
      username: username || null,
    });

    // Send email if Gmail credentials are configured
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: "lexistory.fr@gmail.com",
        subject: `[LexiStory] Signalement — ${reportType}`,
        text: [
          `Histoire : ${storyTitle} (${storySlug})`,
          `Niveau : ${storyLevel}`,
          `Type : ${reportType}`,
          `Signalé par : ${username || "Anonyme"}`,
          `Message : ${message || "(aucun)"}`,
        ].join("\n"),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
