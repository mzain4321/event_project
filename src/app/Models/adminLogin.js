import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    role: { type: String, default: "admin" },
},
{
    timestamps: true,
});

// Explicitly set the collection name
adminSchema.set('collection', 'adminLogin');

const adminLogin =
    mongoose.models?.adminLogin || mongoose.model('adminLogin', adminSchema);

export default adminLogin;