import {
  columnsDataColumns,
} from "./variables/columnsData";
import tableDataColumns from "./variables/tableDataColumns.json";
import ColumnsTable from "./components/ColumnsTable";


const Tables = () => {
  return (
    <div>
     <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />
    </div>
  );
};

export default Tables;
