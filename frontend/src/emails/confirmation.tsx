interface ConfirmationEmailProps {
  name: string
}

export function ConfirmationEmail({ name }: ConfirmationEmailProps) {
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
            <h2 style={{ color: "#1A1A1A", fontSize: 18, fontWeight: 600, margin: "0 0 12px" }}>
              Thank You for Contacting Us, {name}!
            </h2>

            <p style={{ color: "#6B6B6B", fontSize: 14, lineHeight: 1.7, margin: "0 0 16px" }}>
              We have received your message and wanted to let you know that our team is already reviewing it.
            </p>

            <p style={{ color: "#6B6B6B", fontSize: 14, lineHeight: 1.7, margin: "0 0 16px" }}>
              One of our experts will get back to you within <strong>24 hours</strong> to discuss your project and how we can help drive measurable results for your business.
            </p>

            <div style={{ background: "#FF8C38/05", border: "1px solid #FF8C38/10", borderRadius: 8, padding: 16, marginTop: 24 }}>
              <p style={{ color: "#6B6B6B", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                <strong style={{ color: "#1A1A1A" }}>In the meantime:</strong><br />
                Browse our <a href="https://enginex.solutions/portfolio" style={{ color: "#FF8C38" }}>portfolio</a> to see our recent work.<br />
                Check out our <a href="https://enginex.solutions/services" style={{ color: "#FF8C38" }}>services</a> to learn more about what we offer.
              </p>
            </div>

            <p style={{ color: "#B0B0B0", fontSize: 13, lineHeight: 1.6, marginTop: 24 }}>
              Best regards,<br />
              <strong style={{ color: "#1A1A1A" }}>The EngineX.solution Team</strong>
            </p>
          </div>

          <p style={{ color: "#B0B0B0", fontSize: 12, textAlign: "center", marginTop: 16 }}>
            EngineX.solution &bull; Delivering measurable business results
          </p>
        </div>
      </body>
    </html>
  )
}
