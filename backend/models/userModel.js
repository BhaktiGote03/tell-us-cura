import mongoose, { model} from 'mongoose'
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true,'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: 6
  },
  phoneNumber: {
    type: String,
    required: [true, 'phone number is required']
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
}, {
  timestamps: true
});

//ENCRYPTING PASSWORD
userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password,7)
});

userSchema.methods.method1 = function () {
  console.log(`Hello ${this.fullName}`);
};

const User = mongoose.model('User', userSchema);

export default user

//hello bhakti