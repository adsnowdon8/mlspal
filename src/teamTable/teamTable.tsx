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
        <div className="sticky top-0 z-20 border-b border-gray-300 bg-gray-100 pb-3 pt-1">
          <b className="text-xl"> Eastern Conference</b>
        </div>
        <DataTable conference="east" stickyHeaderTop="2.75rem" />
      </div>
      <div className="p-10">
        <div className="sticky top-0 z-20 border-b border-gray-300 bg-gray-100 pb-3 pt-1">
          <b className="text-xl"> Western Conference</b>
        </div>
        <DataTable conference="west" stickyHeaderTop="2.75rem" />
      </div>
    </div>
  );
}

export default TeamTable;
