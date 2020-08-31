import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Similarity } from "./similarity.entity";
import { CreateSimilarityDto } from "./dto/create-similarity.dto";

@Injectable()
export class SimilarityService {
    constructor(
        @Inject("similaritiesRepository")
        private readonly similaritiesRepository: typeof Similarity
    ) { }

    async findAll(): Promise<Similarity[]> {
        const similarities = await this.similaritiesRepository.findAll<Similarity>({
            include: [],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });
        return similarities;
    }

    async create(CreateDto: CreateSimilarityDto): Promise<Similarity> {
        const similarity = new Similarity();

        similarity.imageId = CreateDto.imageId;
        similarity.secondImageId = CreateDto.secondImageId;

        const similarities1 = await this.similaritiesRepository.findAll<Similarity>({
            where: { imageId: similarity.imageId, secondImageId: similarity.secondImageId },
            include: [],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });

        if (similarities1.length > 0) {
            throw new HttpException("This similarity exists!", HttpStatus.CONFLICT);
        }

        const similarities2 = await this.similaritiesRepository.findAll<Similarity>({
            where: { imageId: similarity.secondImageId, secondImageId: similarity.imageId },
            include: [],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });

        if (similarities2.length > 0) {
            throw new HttpException("This similarity exists!", HttpStatus.CONFLICT);
        }


        try {
            return await similarity.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
