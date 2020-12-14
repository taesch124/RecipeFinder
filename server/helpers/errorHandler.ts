import { APIFailure } from "../api.d/apiResponse";

export const generateAPIError = (errorContents): APIFailure => {
    return {
        success: false,
        error: errorContents
    }
}