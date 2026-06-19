import { toast as hotToast } from "react-hot-toast";

const toast = {
  success: (msg) => hotToast.success(msg),
  error: (msg) => hotToast.error(msg),
  info: (msg) => hotToast(msg),
  warning: (msg) => hotToast(msg),
  loading: (msg) => hotToast.loading(msg),
  dismiss: (id) => hotToast.dismiss(id),
};

export default toast;
