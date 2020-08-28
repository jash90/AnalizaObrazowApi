import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Similarity } from "./similarity.entity";
import { SimilarityDto } from "./dto/similarity.dto";
import { CreateSimilarityDto } from "./dto/create-similarity.dto";
import { UpdateSimilarityDto } from "./dto/update-similarity.dto";
import { SimilarityOffset } from "./dto/similarity.offset";

@Injectable()
export class SimilarityService {
    constructor(
        @Inject("similaritiesRepository")
        private readonly similaritiesRepository: typeof Similarity
    ) { }

    async findAll(): Promise<SimilarityDto[]> {
        const similarities = await this.similaritiesRepository.findAll<Similarity>({
            include: [],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });
        return similarities.map(similarity => {
            return new SimilarityDto(similarity);
        });
    }

    async findOne(id: number): Promise<SimilarityDto> {
        const similarity = await this.similaritiesRepository.findByPk<Similarity>(id, {
            include: [],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });
        if (!similarity) {
            throw new HttpException("No similarity found", HttpStatus.NOT_FOUND);
        }

        return new SimilarityDto(similarity);
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

        if (similarities1.length> 0) {
            throw new HttpException("This similarity exists!", HttpStatus.CONFLICT);
        }

        const similarities2 = await this.similaritiesRepository.findAll<Similarity>({
            where: { imageId: similarity.secondImageId, secondImageId: similarity.imageId },
            include: [],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });

        if (similarities2.length> 0) {
            throw new HttpException("This similarity exists!", HttpStatus.CONFLICT);
        }


        try {
            return await similarity.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async getSimilarity(id: number): Promise<Similarity> {
        const similarity = await this.similaritiesRepository.findByPk<Similarity>(id, {
            include: [],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });
        if (!similarity) {
            throw new HttpException("No similarity found", HttpStatus.NOT_FOUND);
        }

        return similarity;
    }

    async update(id: number, UpdateDto: UpdateSimilarityDto): Promise<Similarity> {
        const similarity = await this.getSimilarity(id);

        similarity.imageId = UpdateDto.imageId || similarity.imageId;
        similarity.secondImageId = UpdateDto.secondImageId || similarity.secondImageId;


        try {
            return await similarity.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number): Promise<Similarity> {
        const similarity = await this.getSimilarity(id);
        await similarity.destroy();
        return similarity;
    }

    async offset(index: number = 0): Promise<SimilarityOffset> {
        const similarities = await this.similaritiesRepository.findAndCountAll({
            include: [],
            limit: 100,
            offset: index * 100,
            order: ["id"],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });

        const SimilarityDto = similarities.rows.map(privilege => {
            return new SimilarityDto(privilege);
        });

        return { rows: SimilarityDto, count: SimilarityDto.count };
    }
}
