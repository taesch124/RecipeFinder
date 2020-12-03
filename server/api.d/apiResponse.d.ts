interface APIResponse {
    success: boolean;
}

interface APISuccess extends APIResponse{
    data: any;
}

interface APIFailure extends APIResponse {
    error: any;
}

export {
    APISuccess,
    APIFailure,
}