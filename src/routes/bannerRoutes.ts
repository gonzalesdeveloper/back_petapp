import { Router } from "express";
import { bannerController } from "../controllers/bannerController";

class BannerRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/list', bannerController.getListBanners);
    }
}

const bannerRoutes = new BannerRoutes();
export default bannerRoutes.router;