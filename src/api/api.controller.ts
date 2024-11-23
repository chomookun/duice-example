import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {ApiService} from "./api.service";

@Controller('api')
export class ApiController {

    constructor(private readonly apiService: ApiService) {}

    @Get("users")
    getUsers(
        @Query() search?: any,
        @Query("_size") size?: number,
        @Query("_page") page?: number
    ): Promise<object[]> {
        console.log("size,page", size, page);
        return this.apiService.getUsers(search, size, page);
    }

    @Get("users/:id")
    getUser(@Param("id") id: string): object {
        return this.apiService.getUser(id);
    }

    @Post("users")
    createUser(@Body() user: Object): object {
        return this.apiService.saveUser(user);
    }

    @Put("users/:id")
    modifyUser(@Body() user: object): object {
        return this.apiService.saveUser(user);
    }

    @Delete("users/:id")
    deleteUser(@Param("id") id: string): void {
        this.apiService.deleteUser(id);
    }

}
