import { FC } from "react";
import { Table, TableProps } from "antd";

interface IProps extends TableProps {
    className: string;
    columns: {}[] | any;
    dataSource?: {}[] | any;
    width: number;
    loading?: any;
}

const FlickTable: FC<IProps> = (props: any) => {
    const { className, columns, dataSource, width, loading, ...rest } = props;

    const dataSourceWithKeys = dataSource?.map((item: any, index: number) => ({
        ...item,
        key: item.key || index,
    }));

    return (
        <Table
            columns={columns}
            dataSource={dataSourceWithKeys}
            loading={loading}
            {...rest}
            scroll={{ x: width }}
            className={className}
        />
    );
};

export default FlickTable;
