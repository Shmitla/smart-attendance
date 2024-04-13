import mongoose from "mongoose";

type User = {
    username: string;
    email: string;
    password: string;
    photo?: {
        filename: string;
        filepath: string;
    };
    school: string;
};

const userSchema = new mongoose.Schema<User>({
    username:{
        type: String,
        required: [true,"Must provide a username."],
        unique: true
    },
    email:{
        type: String,
        required: [true,"Must provide an email."],
        unique: true
    },
    password:{
        type:String,
        required: [true,"Must provide a password."],
    },
    photo: {
        filename: String,
        filepath: String,
        type: String,
        default: ''
    },
    school:{
        type: String,
        required: [true,"Must provide school."],
        unique: true
    }
},
{
    timestamps: true
});

const UserModel: mongoose.Model<User> = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
