type TableProps = {
  children: React.ReactNode
}

const Table = ({ children }: TableProps) => {
  return (
    <table className='w-full text-sm text-left text-gray-400'>{children}</table>
  )
}

export default Table
