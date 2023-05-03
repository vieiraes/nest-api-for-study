import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'
import { Categories, Prisma } from "@prisma/client"

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) { }

    async getAllCategories(): Promise<Categories[]> {
        return this.prisma.categories.findMany({ orderBy: { createdAt: 'desc' } })

    }

    // async postCategories() { }

    // async getCategoriesById() { }

    // async deleteCategoriesById() { }


}
