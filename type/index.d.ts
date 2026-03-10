interface contactSchemaProp extends mongoose.Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
}
interface FormProp {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;  
}
interface ContactGetProp {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
}