import Email_Send from '../utility/emailUtility.js';
import {TokenDecode, TokenEncode} from '../utility/tokenUtility.js';


// Token Encode 
export const Token_Encode = async (req, res) => {
    const result = TokenEncode('example@gmail.com', 5007);
    
    res.json({status: result});
};


// Token Decode
export const Token_Decode = async (req, res) => {
    const result = TokenDecode(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAZ21haWwuY29tIiwidXNlcl9pZCI6NTAwNywiaWF0IjoxNzMxMTMwNjIwLCJleHAiOjE3MzM3MjI2MjB9.KdYPlfwwSZpo8m4FbFirQuJp3t4Xw7uP-Fr3aOEWYHE`);

    res.json({status: result});
};


// Email sender 
export const Email_Sender = async (req, res ) => {
    const EmailTo = 'mohammednayem507@gmail.com';
    const EmailSubject = 'Job Portal';
    const EmailText = '';
    const EmailHTMLBody =  `Are you a programmer?`;

  try {
        const result = await Email_Send(EmailTo, EmailText, EmailSubject, EmailHTMLBody);
        console.log(result);
        if (result) {
            res.json({ status: "Email sent successfully" });
        } else {
            res.status(500).json({ status: "Failed to send email" });
        }
    } catch (error) {
        res.status(500).json({ status: "Error occurred while sending email", error: error.message });
    };
};



// Authenticatin middleware check
export const Profile = async (req, res) => {
    res.json({status: "OK"});
};

// Cookie set
export const Cookie_Set = async (req, res) => {
    const cookieOptions = {
        expires: new Date(Date.now() + 3600 * 1000), // 1 Hour Expirations
        httpOnly:true,
        sameSite: true
    };
    const data = "nishanahmed13913@gmail.com";
    const name = "MERN07";

    res.cookie(name, data, cookieOptions);
    res.json({status: "Cookie set success"});
};

// Remove cookies
export const Cookie_Remove = async (req, res) => {
    const cookieOptions = {
        expires: new Date(Date.now() - 3600 * 1000), // 1 Hour Expirations
        httpOnly:true,
        sameSite: true
    };
    const data = "nishanahmed13913@gmail.com";
    const name = "MERN07";

    res.cookie(name, data, cookieOptions);
    res.json({status: "Cookie remove success"});
}