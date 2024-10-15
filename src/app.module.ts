/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ProductModule } from "./product/product.module";
import { UserModule } from './user/user.module';
import { VendorModule } from './vendor/vendor.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Adhom:FhWoOau72GWC75sR@cluster0.jq3m2.mongodb.net/dinamo-db?retryWrites=true&w=majority'),
    UserModule,
    ProductModule,
    VendorModule, 
    OrderModule, 
    CategoryModule,
    CartModule
  ]
})
export class AppModule {}
