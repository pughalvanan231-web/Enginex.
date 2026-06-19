interface NotificationEmailProps {
  name: string
  email: string
  phone: string
  company: string
  budget: string
  projectType: string
  message: string
}

const budgetLabels: Record<string, string> = {
  "under-20k": "Under ₹20,000",
  "20k-50k": "₹20,000 - ₹50,000",
  "50k-1.5l": "₹50,000 - ₹1,50,000",
  "1.5l-3l": "₹1,50,000 - ₹3,00,000",
  "3l+": "₹3,00,000+",
  "not-sure": "Not Sure",
}

const projectTypeLabels: Record<string, string> = {
  web: "Web Development",
  mobile: "Mobile App",
  ai: "AI Solutions",
  design: "UI/UX Design",
  software: "Custom Software",
  cloud: "Cloud Solutions",
  automation: "Automation",
  other: "Other",
}

export function NotificationEmail({
  name,
  email,
  phone,
  company,
  budget,
  projectType,
  message,
}: NotificationEmailProps) {
  return (
    <html>
      <body style={{ fontFamily: "Inter, sans-serif", background: "#f5f5f5", margin: 0, padding: 0 }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: 32 }}>
          <div style={{ background: "#1A1A1A", padding: 24, borderRadius: "12px 12px 0 0" }}>
            <h1 style={{ color: "#FF8C38", fontSize: 20, fontWeight: 700, margin: 0 }}>
              Engine<span style={{ color: "#fff" }}>X</span>.solution
            </h1>
          </div>

          <div style={{ background: "#fff", padding: 32, borderRadius: "0 0 12px 12px" }}>
            <h2 style={{ color: "#1A1A1A", fontSize: 18, fontWeight: 600, margin: "0 0 4px" }}>
              New Lead from Website
            </h2>
            <p style={{ color: "#6B6B6B", fontSize: 14, margin: "0 0 24px" }}>
              A new contact form submission has been received.
            </p>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {[
                  ["Name", name],
                  ["Email", email],
                  ["Phone", phone],
                  ["Company", company],
                  ["Budget", budgetLabels[budget] || budget],
                  ["Project Type", projectTypeLabels[projectType] || projectType],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td style={{ padding: "10px 12px", borderBottom: "1px solid #f0f0f0", color: "#6B6B6B", fontSize: 13, fontWeight: 500, width: 120, verticalAlign: "top" }}>
                      {label}
                    </td>
                    <td style={{ padding: "10px 12px", borderBottom: "1px solid #f0f0f0", color: "#1A1A1A", fontSize: 14 }}>
                      {value || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: 24 }}>
              <h3 style={{ color: "#1A1A1A", fontSize: 14, fontWeight: 600, margin: "0 0 8px" }}>Message</h3>
              <p style={{ color: "#6B6B6B", fontSize: 14, lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>
                {message}
              </p>
            </div>
          </div>

          <p style={{ color: "#B0B0B0", fontSize: 12, textAlign: "center", marginTop: 16 }}>
            EngineX.solution &bull; Delivering measurable business results
          </p>
        </div>
      </body>
    </html>
  )
}
