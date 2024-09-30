import { Bounce, toast } from 'react-toastify';

export const errorToast = (message: string) => {
    toast.error(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
};

export const successToast = (message: string) => {
    toast.success(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        rtl: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
    });
};