import jwt from 'jsonwebtoken';

export const sendCookie = (userDoc, res) => {
    const token = jwt.sign({id: userDoc._id, name: userDoc.name, email: userDoc.email}, process.env.SECRET_KEY);

    res.status(201).cookie('token', token, {
        maxAge : 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'none', 
    }).json(userDoc);
}