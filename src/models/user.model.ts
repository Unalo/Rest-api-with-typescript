import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import { boolean, string } from 'zod';
require('mongoose-type-email');

export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>
}

// schema definition
const userSchema = new mongoose.Schema({
    email: { type: mongoose.SchemaTypes.Email, required: true, unique: true },
    name: { type: string, required: true },
    password: { type: string, required: true }
}, {
    timestamps: true
})

userSchema.pre("save", async function (this: UserDocument, next) {
    // this: UserDocument;

    if (!this.isModified) {
        next();
    }
    const salt = await bcrypt.genSalt(config.get('saltWork'));
    const hash = await bcrypt.hashSync(this.password, salt);
    this.password = hash;
    return next();
})
userSchema.methods.comparePassword = async function (candidatePassword: string)
    : Promise<boolean> {
    const user = this as UserDocument;
    
    // check the user password (true) or false
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
}
const userModel = mongoose.model('userData', userSchema)

export default userModel;