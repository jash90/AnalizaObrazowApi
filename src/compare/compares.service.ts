import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Compare } from "../compare/compare.entity";
import { CreateCompareDto } from "../compare/dto/create-compare.dto";

@Injectable()
export class CompareService {
    constructor(
        @Inject("ComparesRepository")
        private readonly comparesRepository: typeof Compare
    ) { }

    async findAll(): Promise<Compare[]> {
        const compares = await this.comparesRepository.findAll<Compare>({
            include: [],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });
        return compares;
    }

    async create(CreateDto: CreateCompareDto): Promise<Compare> {
        const compare = new Compare();

        compare.imageId = CreateDto.imageId;
        compare.secondImageId = CreateDto.secondImageId;
        compare.similarity = CreateDto.similarity;
        compare.correct = CreateDto.correct;
        compare.versionAlgorithmId = CreateDto.versionAlgorithmId;

        try {
            return await compare.save();
        } catch (err) {
            console.log(err);
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
