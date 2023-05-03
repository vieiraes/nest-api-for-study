import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories as CategoriesModelPrisma } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService
    ) { } //VAZIO

    @Get('')
    async getCategories():Promise<CategoriesModelPrisma[]>{
        return this.categoriesService.getAllCategories()
    }



}
