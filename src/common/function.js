import { Modal } from "antd";

export const showMessageSuccess = (msg, onOk) => {
    Modal.success({
        content: msg,
        onOk: onOk || null,
        className: "modal-success",
        okText: "Xác nhận"
    });
};
