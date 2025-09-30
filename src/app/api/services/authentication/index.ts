import { ApiResponse, Payload } from "@/src/utils/types";
import request from "../../request";
import request2 from "../../request2";
import { API } from "@/src/utils/constants/api";

const login = (payload: Payload): Promise<any> => request.post({ payload, route: API.routes.authentication.login });

const recover = (payload: Payload): Promise<any> => request.post({ payload, route: API.routes.authentication.recover });

const signup = (payload: Payload): Promise<any> => request.post({ payload, route: API.routes.authentication.signup });

const verifyAccount = (payload: Payload): Promise<any> =>
    request.post({ payload, route: API.routes.authentication.verifyAccount });

const resetPassword = (payload: Payload): Promise<any> =>
    request.post({ payload, route: API.routes.authentication.resetPassword });

const merchantInfo = (): Promise<ApiResponse> => request2.get({ route: API.routes.authentication.merchantInfo });

const updateProfile = (payload: Payload): Promise<any> =>
    request2.post({ payload, route: API.routes.profile.updateProfile });

const updateSecurity = (payload: Payload): Promise<any> =>
    request2.post({ payload, route: API.routes.profile.updateSecurity });

const profileSettings = (): Promise<ApiResponse> => request2.get({ route: API.routes.profile.profileSettings });

const enableServices = (payload: Payload): Promise<any> =>
    request2.post({ payload, route: API.routes.profile.enableServices });

const updateNotification = (payload: Payload): Promise<any> =>
    request2.post({ payload, route: API.routes.profile.updateNotification });

const addSettlementAccount = (payload: Payload): Promise<ApiResponse> =>
    request2.post({ payload, route: API.routes.profile.addSettlementAccount });

const getSettlementAccounts = (): Promise<ApiResponse> =>
    request2.get({ route: API.routes.profile.settlementAccounts });

const getAllTeamMembers = (payload: Payload): Promise<ApiResponse> =>
    request.post({ payload, route: API.routes.profile.getTeamMembers });

const createTeamMember = (payload: Payload): Promise<ApiResponse> =>
    request.post({ payload, route: API.routes.profile.createTeamMember });

const deleteTeamMember = (payload: Payload): Promise<ApiResponse> =>
    request.post({ payload, route: API.routes.profile.deleteTeamMember });

const changeTeamMember = (payload: Payload): Promise<ApiResponse> =>
    request.post({ payload, route: API.routes.profile.changeTeamMember });

const whiteListIpAddress = (payload: Payload): Promise<ApiResponse> =>
    request2.post({ payload, route: API.routes.profile.whitelistIpAddress });

const createLiveWebhook = (payload: Payload): Promise<ApiResponse> =>
    request2.post({ payload, route: API.routes.profile.createLiveWebhook });

const accountTeamInvite = (payload: Payload): Promise<any> =>
    request.post({ payload, route: API.routes.profile.accountTeamInvite });

const getWebhook = (): Promise<ApiResponse> => request2.get({ route: API.routes.profile.getWebhook });

const switchBusinessAccounts = (payload: Payload): Promise<any> =>
    request2.post({ payload, route: API.routes.profile.switchBusinessAccounts });

const requestKeys = (payload: Payload): Promise<any> =>
    request.post({ payload, route: API.routes.profile.requestKeys });

const revealKeys = (payload: Payload): Promise<any> => request.post({ payload, route: API.routes.profile.revealKeys });

const generateKeys = (payload: Payload): Promise<any> =>
    request.post({ payload, route: API.routes.profile.generateKeys });

const customization = (payload: Payload): Promise<any> =>
    request2.post({ payload, route: API.routes.profile.customization });

const authentication = {
    signup,
    login,
    recover,
    verifyAccount,
    resetPassword,
    merchantInfo,
    updateProfile,
    updateSecurity,
    profileSettings,
    enableServices,
    updateNotification,
    addSettlementAccount,
    getSettlementAccounts,
    getAllTeamMembers,
    createTeamMember,
    deleteTeamMember,
    changeTeamMember,
    whiteListIpAddress,
    createLiveWebhook,
    getWebhook,
    accountTeamInvite,
    switchBusinessAccounts,
    requestKeys,
    revealKeys,
    generateKeys,
    customization,
};

export default authentication;
