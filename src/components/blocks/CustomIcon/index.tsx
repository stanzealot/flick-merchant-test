import Image from "next/image";

interface IProps {
    className?: string;
    path: string;
    width?: number;
    height?: number;
    style?: any;
}

const CustomIcon: React.FC<IProps> = ({ path, className, width = 600, height = 600, style }) => {
    return (
        <div className={`${className} overflow-hidden`}>
            <Image src={path} alt="custom-icon" width={width} height={height} style={style} />
        </div>
    );
};

export default CustomIcon;
