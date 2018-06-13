import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

var UserSchema = new mongoose.Schema({
  email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
  password: {
        type: String,
        required: true,
        select: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function (next) {
    var user = this;
    user.password = await bcrypt.hash(user.password, 10);

    next();
});

// UserSchema.comparePassword = function (passw, cb) {
//     compare(passw, this.password, function (err, isMatch) {
//         if (err) {
//             return cb(err);
//         }
//         cb(null, isMatch);
//     });
// };

export default mongoose.model('User', UserSchema);