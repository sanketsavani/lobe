// LOBES: Tanstack Table — sticky headers, row hover, dense 36px rows

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'
import { cn } from '../../utils/cn'

export function DenseTable({ columns, data, getRowId }) {
  const table = useReactTable({
    data,
    columns,
    getRowId,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-auto rounded-lg border border-[var(--border-subtle)]">
      <table className="w-full border-collapse text-sm">
        <thead className="sticky top-0 z-10 bg-[var(--bg-elevated)]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b border-[var(--border-subtle)] px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="h-9 border-b border-[var(--border-subtle)] transition-colors hover:bg-[var(--bg-hover)]"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-3 py-0 font-mono text-[13px]">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DenseTable
