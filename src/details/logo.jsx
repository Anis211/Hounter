export default function Logo() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div
        style={{
          width: 32,
          height: 32,
          left: 0,
          top: 0,
          position: "absolute",
          background: "#F59E0B",
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          borderBottomRightRadius: 24,
          borderBottomLeftRadius: 4,
        }}
      />
      <div
        style={{
          width: 32,
          height: 32,
          left: 4,
          top: 4,
          position: "absolute",
          background: "#4BE4C9",
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          borderBottomRightRadius: 24,
          borderBottomLeftRadius: 4,
        }}
      />
    </div>
  );
}
