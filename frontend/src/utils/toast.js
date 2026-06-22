import { toast as hotToast } from "react-hot-toast";

const toast = {
  success: (msg) => hotToast.success(msg, { duration: 3000 }),
  error: (msg) => hotToast.error(msg, { duration: 4000 }),
  info: (msg) => hotToast(msg, { duration: 3000 }),
  warning: (msg) => hotToast(msg, { duration: 3000 }),
  loading: (msg) => hotToast.loading(msg),
  dismiss: (id) => hotToast.dismiss(id),
};

export default toast;
