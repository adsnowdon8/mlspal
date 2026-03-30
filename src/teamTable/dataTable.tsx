import React, { useMemo } from "react";
import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Team, teamsEastJson, teamsWestJson } from "../Teams";
import { TeamLogoViewer } from "../playerTable/TeamLogoViewer";

const columnHelper = createColumnHelper<Team>();
const columns = [
  columnHelper.accessor("Points", {
    header: () => "Points",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("Team", {
    header: () => "Team",
    cell: (info) => (
      <>
        {info.getValue()}
        <TeamLogoViewer club={info.getValue()} />
      </>
    ),
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("Coach", {
    header: () => "Coach",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("Owner", {
    header: () => "Owner",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("GM", {
    header: () => <span>GM</span>,
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  // columnHelper.accessor("City", {
  //   header: "Location",
  //   footer: (info) => info.column.id,
  //   sortingFn: "alphanumeric",
  // }),
  columnHelper.accessor("Roster_Model", {
    header: "Roster Model",
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("Number_of_Roster_Slots_Filled", {
    header: "Number of Roster Slots Filled",
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("International_Slots_Filled", {
    header: "International Slots Filled",
    footer: (info) => info.column.id,
    sortingFn: "alphanumeric",
  }),
];

export const DataTable: React.FC<{
  conference: "east" | "west";
  /** Sticky header `top` offset (e.g. below a sticky section title). */
  stickyHeaderTop?: string;
}> = ({ conference, stickyHeaderTop = "0" }) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const data = conference === "east" ? teamsEastJson : teamsWestJson;
  const flatData = useMemo(() => {
    //sort data based on sorting state
    return data?.flatMap((page) => page) ?? [];
  }, [data]);

  const table = useReactTable({
    data: flatData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering

    onColumnFiltersChange: setColumnFilters,
    debugTable: true,
    initialState: {
      sorting: [
        {
          id: "Points",
          desc: true, // sort by name in descending order by default
        },
      ],
    },
    state: {
      columnFilters,
    },
  });

  const { rows } = table.getRowModel();
  return (
    <table className="w-full border">
      <thead
        style={{
          position: "sticky",
          top: stickyHeaderTop,
          zIndex: 10,
        }}
        className="bg-gray-100"
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="w-full border-b border-gray">
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                <div
                  {...{
                    className: header.column.getCanSort()
                      ? "cursor-pointer select-none "
                      : "",
                    onClick: header.column.getToggleSortingHandler(),
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted() as string] ?? null}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr
            key={row.id}
            className={`border-b border-grey-200 hover:border-gray-500 bg-opacity-50 ${index <= 7 ? "bg-green-100" : index === 8 ? "bg-blue-100" : ""}`}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-3">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
