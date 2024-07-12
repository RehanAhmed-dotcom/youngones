import {boolean, object, ref, string} from 'yup';
const loginValidationSchema = object({
  email: string()
    .email('Please enter valid email')
    .required('Email Address is required'),
  password: string()
    .min(8, ({min}) => `Password must be at least  ${min} character`)
    .required('Password is required'),
  remember: boolean(),
});
const signUpValidationSchema = object({
  name: string().required('First name is required'),
  lastname: string().required('Last name is required'),
  email: string()
    .email('Please enter valid email')
    .required('Email Address is required'),
  password: string()
    .min(8, ({min}) => `password must be at least  ${min} character`)
    .required('Password is required'),
  phoneNumber: string().required('Phone Number is required'),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Confirm Password must match')
    .min(8, ({min}) => `password must be at least  ${min} character`)
    .required('Confirm Password is required'),
  terms: boolean().required('Check Terms and Conditions'),
  // refer: string(),
  // remember: boolean(),
});
const GenderProfile = object({
  Gender: string()
    .oneOf(
      ['male', 'female', 'Male', 'Female'],
      'Gender must be either Male or Female',
    )
    .required('Gender is required'),
  Address: string().required('Address is required'),
  Education: string().required('Education is required'),
  Goals: string().required('Goals are required'),
  Image: string().required('Image is required'),
});
const sellerSignUpValidationSchema = object({
  name: string(),
  // .required('Full name is required')
  email: string().email('Please enter valid email'),
  // .required('Email Address is required')
  password: string().min(
    6,
    ({min}) => `password must be at least  ${min} character`,
  ),
  // .required('Password is required')
  phoneNumber: string(),
  // .required('Phone Number is required')
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Password must match')
    .min(6, ({min}) => `Password must be at least  ${min} character`),
  // .required('Confirm Password is required')
  terms: boolean()
    .oneOf([true], 'Please check Terms and Conditions')
    .required('Please check Terms and Conditions'),
});
const sellerSetupAccountValidationSchema = object({
  serviceName: string().required('Service Name is required'),
  serviceBio: string().required('Service Bio is required'),
  category: string().required('Category is required'),
  address: string().required('Address is required'),
  type: string().required('Type is required'),
  Price: string().required('Price is required'),
  image: string().required('Image is required'),
});
const sellerBVNValidationSchema = object({
  fullName: string().required('Full Name is required'),
  bankName: string().required('Bank Name is required'),
  bankDetails: string().required('Bank details are required'),
  bvnNumber: string().required('BVN Number is required'),
  gender: string().required('Gender is required'),
  dob: string().required('Date of birth is required'),
});
const changePasswordSchema = object({
  password: string()
    .min(8, ({min}) => `password must be at least  ${min} character`)
    .required('Password is required'),

  confirmPassword: string()
    .oneOf([ref('password'), null], 'Password must match')
    .min(8, ({min}) => `Password must be at least  ${min} character`)
    .required('Confirm Password is required'),
});
export {
  loginValidationSchema,
  sellerSignUpValidationSchema,
  signUpValidationSchema,
  sellerSetupAccountValidationSchema,
  sellerBVNValidationSchema,
  GenderProfile,
  changePasswordSchema,
};
