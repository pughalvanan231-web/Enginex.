import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { NotificationEmail } from "@/emails/notification"
import { ConfirmationEmail } from "@/emails/confirmation"

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, budget, projectType, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    const from = process.env.EMAIL_FROM || "EngineX.solution <onboarding@resend.dev>"
    const adminEmail = process.env.ADMIN_EMAIL || "pughalvanan231@gmail.com"

    const [notificationResult, confirmationResult] = await Promise.allSettled([
      resend.emails.send({
        from,
        to: adminEmail,
        subject: "New Lead from EngineX.solution Website",
        react: NotificationEmail({ name, email, phone, company, budget, projectType, message }),
      }),
      resend.emails.send({
        from,
        to: email,
        subject: "Thank You for Contacting EngineX.solution",
        react: ConfirmationEmail({ name }),
      }),
    ])

    const errors: string[] = []
    if (notificationResult.status === "rejected") {
      errors.push(`Notification failed: ${notificationResult.reason}`)
    }
    if (confirmationResult.status === "rejected") {
      errors.push(`Confirmation failed: ${confirmationResult.reason}`)
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join("; ") }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      notificationId:
        notificationResult.status === "fulfilled" && "data" in notificationResult.value
          ? notificationResult.value.data?.id ?? null
          : null,
      confirmationId:
        confirmationResult.status === "fulfilled" && "data" in confirmationResult.value
          ? confirmationResult.value.data?.id ?? null
          : null,
    })
  } catch (error) {
    console.error("Send email error:", error)
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
}
