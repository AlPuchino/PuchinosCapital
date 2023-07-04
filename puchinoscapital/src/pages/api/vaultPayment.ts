import { NextApiHandler } from "next";


interface CartItem {
  price: number;
}

interface RequestBody {
  cart: CartItem[];
}

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method === "POST") {
    const { cart }: RequestBody = req.body;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    console.log("total", total);
    res.status(200).json({ total, success: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end(`Method ${method} Not Allowed`); // Method Not Allowed
  }
};

export default handler;
