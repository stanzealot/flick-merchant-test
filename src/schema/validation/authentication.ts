import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
    business_email: yup.string().email().required("Business email is required"),
    password: yup.string().required("Password is required"),
});

export const recoverValidationSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
});

export const signUpValidationSchema = yup.object().shape({
    name: yup.string().required("Please enter your name."),
    business_email: yup
        .string()
        .email("Please enter a valid business email address.")
        .required("A business email address is required."),
    phone: yup.string().required("Please enter your phone number."),
    password: yup.string().required("A password is required for sign-up."),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Please confirm your password."),
});

export const inviteMemberValidation = yup.object().shape({
    fullName: yup.string().required("Please enter your name."),
    password: yup.string().required("A password is required for sign-up."),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Please confirm your password."),
});

export const businessValidationSchema = yup.object().shape({
    business_name: yup.string().required("Please enter your Business name."),
    business_type: yup.string().required("Please select Business type"),
});

export const resetPasswordValidationSchema = yup.object().shape({
    password: yup.string().required("A password is required.").min(8, "Password must be at least 8 characters."),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Please confirm your password."),
});

export const addIpAddressValidation = yup.object().shape({
    ip: yup.string().required("IP address is required."),
});

export const liveWebhookValidationSchema = yup.object().shape({
    secretHash: yup.string().required("Secret Hash is required."),
    customHookUrl: yup.string().notRequired(),
    url: yup.string().notRequired(),
});
