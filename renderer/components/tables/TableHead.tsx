type TableHeadProps = {
  headers: string[]
  actions?: boolean
}

const TableHead = ({ headers, actions }: TableHeadProps) => {
  return (
    <thead className='text-xs text-white uppercase bg-[#374c5e]'>
      <tr>
        {headers.map(header => (
          <th scope='col' className='px-6 py-3' key={header}>
            {header}
          </th>
        ))}
        {!actions && <th scope='col' className='px-6 py-3'></th>}
      </tr>
    </thead>
  )
}

export default TableHead
