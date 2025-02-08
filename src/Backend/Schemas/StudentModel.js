import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    personalInformation: {
      name: { type: String, default: '' },
      register: { type: String, default: '' },
      dob: { type: Date, default: null },
      sex: { type: String, enum: ['M', 'F'], default: '' },
      blood: { type: String, enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'], default: '' },
      community: { type: String, enum: ['OC', 'BC', 'MBC', 'SC', 'ST'], default: '' },
      cutoff: { type: Number, min: 0, max: 100, default: null },
      splcategory: { type: String, enum: ['None', 'Ph', 'Sports', 'Ex-Service man', 'NRI', 'Other States', 'Any Other'], default: 'None' },
      scholarship: { type: String, default: '' },
      volunteer: { type: String, enum: ['None', 'NSS', 'NSO', 'YRC'], default: 'None' },
      contact: { type: String, default: '' },
      mail: { type: String, default: '' },
      fa: { type: String, default: 'None' },
      passportPhoto: { type: String, default: '' },
    },
  
    familyInformation: {
      fatherName: { type: String, default: '' },
      fatherOcc: { type: String, default: '' },
      fatherInc: { type: Number, default: null },
      motherName: { type: String, default: '' },
      motherOcc: { type: String, default: '' },
      motherInc: { type: Number, default: null },
      parentAddr: { type: String, default: '' },
      parentContact: { type: String, default: '' },
      parentMail: { type: String, default: '' },
      guardianAddr: { type: String, default: '' },
      guardianContact: { type: String, default: '' },
      guardianMail: { type: String, default: '' },
    },
  
    education: {
      ug: { type: String, enum: ['BE', 'Btech', 'Bsc', 'BCA',''], default: '' },
      ugCollege: { type: String, default: '' },
      ugYear: { type: Number, default: null },
      ugPercentage: { type: Number, default: null },
      ugProvisionalCertificate: { type: String, default: '' },
      xiiBoard: { type: String, enum: ['cbse', 'state-board', 'icse', 'others'], default: '' },
      xiiSchool: { type: String, default: '' },
      xiiYear: { type: Number, default: null },
      xiiPercentage: { type: Number, default: null },
      xiiMarksheet: { type: String, default: '' },
      xBoard: { type: String, enum: ['cbse', 'state-board', 'icse', 'others'], default: '' },
      xSchool: { type: String, default: '' },
      xYear: { type: Number, default: null },
      xPercentage: { type: Number, default: null },
      xMarksheet: { type: String, default: '' },
    },
  
    entranceAndWorkExperience: {
      entrance: { type: String, enum: ['TANCET', 'GATE',''], default: '' },
      entranceRegister: { type: String, default: '' },
      entranceScore: { type: Number, default: null },
      entranceYear: { type: Number, default: null },
      scorecard: { type: String, default: '' },
      workExperience: [{
        employerName: { type: String, default: '' },
        role: { type: String, default: '' },
        expYears: { type: Number, default: null },
        certificate: { type: String, default: '' },
      }],
    },
  
  }, { timestamps: true });

  const Student = mongoose.model("Student", StudentSchema);

  export default Student;