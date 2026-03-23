import { DataTable } from "./dataTable";

function TeamTable() {
  return (
    <div
      className="text-center w-full h-full border min-w-0"
      style={{
        overflow: "auto",
        position: "relative",
        height: "100%",
      }}
    >
      <div className="p-10">
        <b className="text-xl"> Eastern Conference</b>
        <DataTable conference="east" />
      </div>
      <div className="p-10">
        <b className="text-xl"> Western Conference</b>
        <DataTable conference="west" />
      </div>
    </div>
  );
}

export default TeamTable;
