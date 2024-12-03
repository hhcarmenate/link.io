import mongoose from "mongoose"
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10

export class User {
    constructor() {
        const schema = new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required:  true,
                unique: true
            },
            password: {
                type: String,
                required: true
            },
            created_at: {
                type: Date,
                default: Date.now()
            },
            update_at: {
                type: Date,
                default: Date.now()
            }
        })

        schema.pre('save', async function (next) {
            if (this.isModified('password')) {
                this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
            }
            next();
        });

        schema.methods.comparePassword = function(candidatePassword) {
            return bcrypt.compare(candidatePassword, this.password)
        }

        this.model = mongoose.model('User', schema, 'users')
    }

    /**
     * Creates a new user with the provided user data.
     *
     * @param {Object} userData - The data of the user to be created.
     *
     * @return {Promise<Object>} A promise that resolves to the newly created user object.
     */
    async createUser(userData) {
        try {
            const user = new this.model(userData);
            const savedUser = await user.save();

            const userObject = savedUser.toObject();
            delete userObject.password;

            return userObject;
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * Retrieves a list of users from the database.
     *
     * @return {Promise<Array>} A Promise that resolves to an Array of user objects excluding their passwords.
     */
    async getUsers(){
        return this.model.find().select('-password')
    }

    async getUserById(userId) {
        return this.model.findById(userId).select('-password')
    }


    async updateUser(userId, updateData) {
        updateData.updated_at = Date.now()
        return this.model.findByIdAndUpdate(userId, updateData, {
            new: true,
            runValidators: true
        }).select('-password')
    }

    async deleteUser(userId) {
        return this.model.findByIdAndDelete(userId, {
            new: true
        })
    }

    async comparePassword(user, candidatePassword){
        return user.comparePassword(candidatePassword)
    }

}

export default new User()
