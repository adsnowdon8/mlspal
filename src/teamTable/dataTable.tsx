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
import {
  mlsTeamColorClasses,
  Team,
  teamsEastJson,
  teamsWestJson,
} from "../Teams";

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
    cell: (info) => info.getValue(),
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

export const DataTable: React.FC<{ conference: "east" | "west" }> = ({
  conference,
}) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const data = conference === "east" ? teamsEastJson : teamsWestJson;
  const flatData = useMemo(() => {
    //sort data based on s orting state
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
          top: "0",
          zIndex: 1,
          // background: "white",
        }}
        className="bg-gray-100"
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="w-full border-b border-gray-100">
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
                    header.getContext()
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
        {rows.map((row) => (
          <tr
            key={row.id}
            className={`border-b border-grey-200  hover:border-black hover:border-gray-500 ${
              mlsTeamColorClasses[
                row.original.Team as keyof typeof mlsTeamColorClasses
              ]
            } bg-opacity-50`}
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
