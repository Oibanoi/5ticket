import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Event details";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "#18181B",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "white",
          padding: "48px",
          gap: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            Đêm nhạc Minh Tuyết - Phạm Quỳnh Anh
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#A1A1AA",
            }}
          >
            05 tháng 09, 2025
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#A1A1AA",
            }}
          >
            Khu đô thị Vạn Phúc, TP.HCM
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 48,
            fontSize: 32,
            fontWeight: "bold",
            color: "#3B82F6",
          }}
        >
          5Ticket
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
