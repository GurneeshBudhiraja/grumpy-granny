import { Router } from "express";
import getRandomPassword from "../utils/getRandomPassword";

const router = Router()


router.get("/api/getPasswordHints", (_req, res) => {
  try {
    const {
      info
    } = getRandomPassword()
    res.status(200).json({
      success: true,
      info
    })
    return
  } catch (error) {
    console.log("Error in `getRandomPassword`")
    res.status(500).json({
      success: false,
    })
    return
  }
})

export default router