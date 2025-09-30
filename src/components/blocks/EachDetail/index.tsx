const EachDetail = ({
    title,
    description,
    position = "left",
}: {
    title: string;
    description: string;
    position: string;
}) => {
    return (
        <div className={`${position === "left" ? "text-left" : "text-right"}`}>
            <p className="text-xs text-[#666666] font-light mb-1">{title}</p>
            <h1 className="text-sm text-[#1A1A1A] font-semibold">{description}</h1>
        </div>
    );
};

export default EachDetail;
