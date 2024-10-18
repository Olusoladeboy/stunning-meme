export const PHONE_REX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/;
export const EMAIL_REX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const TEN_DIGITS = /[0-9]{10}/;
export const TEN_CHARACTERS = /[0-9a-zA-Z]{10}/;
export const PASSWORD_REX =
	/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
