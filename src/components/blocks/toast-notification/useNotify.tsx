import { useNotification } from "@/src/components/blocks/toast-notification";

type Props = {
    message: string;
    type: "success" | "info" | "warning" | "error";
    description?: string;
};

const useNotify = () => {
    const openNotification = useNotification();

    const notify = ({ message, type, description = "" }: Props) => {
        openNotification({
            type,
            message,
            description,
            placement: "topRight",
        });
    };

    return notify;
};

export default useNotify;
