import style from './CustomTable.module.scss';
import { CustomTableProps } from './types';

const CustomTable = ({ tableData, tableConfig, tableActions, loading }: CustomTableProps) => {
    const getHeadTitle = (fieldName: string): string | null => {
        let headTitle = '';

        for (const configElement of tableConfig) {
            if (configElement.field === fieldName) {
                headTitle = configElement.title;
            }
        }

        if (headTitle.length > 0) {
            return headTitle;
        }
        return null;
    };

    if (loading) {
        return <div>Загрузка..</div>;
    }

    console.log('tableData', JSON.stringify(tableData));

    if (tableData.length === 0) {
        return <div>Данные не найдены</div>;
    }

    return (
        <table className={style.table}>
            <thead>
                <tr>
                    {!!tableActions &&
                        tableActions.map((action) => {
                            return (
                                <th key={action.buttonTitle} className={style.actionTableHead}>
                                    {}
                                </th>
                            );
                        })}
                    {tableData.length > 0 &&
                        Object.keys(tableData[0]).map((field) => {
                            if (getHeadTitle(field)) {
                                return <th key={field}>{getHeadTitle(field)}</th>;
                            }
                            return null;
                        })}
                </tr>
            </thead>
            <tbody>
                {tableData.length > 0 &&
                    tableData.map((rowData) => {
                        return (
                            <tr key={rowData.id}>
                                {tableActions?.map((tableAction) => {
                                    return (
                                        <td key={tableAction.buttonTitle}>
                                            <button
                                                className={style.tableButton}
                                                onClick={() =>
                                                    tableAction.onClickAction(rowData.id)
                                                }>
                                                {tableAction.buttonTitle}
                                            </button>
                                        </td>
                                    );
                                })}
                                {Object.keys(rowData).map((columnField) => {
                                    if (tableConfig.map((el) => el.field).includes(columnField)) {
                                        return <td key={columnField}>{rowData[columnField]}</td>;
                                    }
                                    return null;
                                })}
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
};

export default CustomTable;
