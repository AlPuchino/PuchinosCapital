import socket from "socket.io-client";
import { NextApiRequest, NextApiResponse } from "next";

const io = socket("http://localhost:4000");

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    const { method } = req;
    
    if (method === "GET") {
        io.on("connect", () => {
        console.log("connected");
        });
        io.on("message", (data) => {
        console.log(data);
        return res.status(200).json(data);
        });
    }
    }

// Path: puchinoscapital\src\pages\api\listings.ts