import {AxiosError} from "axios";

function sanitizeAxiosErrorMessage(err: AxiosError<any>) {
    if (err.response && err.response.data && typeof err.response.data?.message === "string") {
        return err.response.data.message as string;
    }

    return err.message || null;
}

function sanitizeErrorMessage(err: any) {
    if (err instanceof AxiosError) {
        return sanitizeAxiosErrorMessage(err);
    }
    if (err instanceof Error) {
        return err.message || null;
    }

    return null;
}

export default sanitizeErrorMessage;