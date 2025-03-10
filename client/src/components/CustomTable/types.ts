export type TableActionsType = {
    buttonTitle: string;
    onClickAction: (id: number) => void;
};

export interface CustomTableProps {
    tableData: any[];
    tableConfig: any[];
    loading?: boolean;
    tableActions?: TableActionsType[];
}
