import bcrypt from "bcryptjs"

const users = [
    {
        username: "John Doe",
        email: "john@email.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
        profilePicture: "/images/profile.jpeg",
        coverPicture: "/images/cover.jpeg",
        desc: "Hello there I am john doe",
        city: "Johnannesburg",
        from: "South Africa",
        relationship: "Single",
    },
    {
        username: "Jane Doe",
        email: "jane@email.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
        profilePicture: "/images/profile.jpeg",
        coverPicture: "/images/cover.jpeg",
        desc: "Hello there I am Jane doe",
        city: "Johnannesburg",
        from: "South Africa",
        relationship: "Single",
    },

]

export default users