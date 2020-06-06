import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Compare } from "../compare/compare.entity";
import { CompareDto } from "../compare/dto/compare.dto";
import { CreateCompareDto } from "../compare/dto/create-compare.dto";
import { UpdateCompareDto } from "../compare/dto/update-compare.dto";
import { CompareOffset } from "../compare/dto/compare.offset";

@Injectable()
export class CompareService {
    constructor(
        @Inject("ComparesRepository")
        private readonly comparesRepository: typeof Compare
    ) { }

    async findAll(): Promise<CompareDto[]> {
        const compares = await this.comparesRepository.findAll<Compare>({
            include: [],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });
        return compares.map(compare => {
            return new CompareDto(compare);
        });
    }

    async findOne(id: number): Promise<CompareDto> {
        const compare = await this.comparesRepository.findByPk<Compare>(id, {
            include: [],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });
        if (!compare) {
            throw new HttpException("No compare found", HttpStatus.NOT_FOUND);
        }

        return new CompareDto(compare);
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
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async getCompare(id: number): Promise<Compare> {
        const compare = await this.comparesRepository.findByPk<Compare>(id, {
            include: [],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });
        if (!compare) {
            throw new HttpException("No compare found", HttpStatus.NOT_FOUND);
        }

        return compare;
    }

    async update(id: number, UpdateDto: UpdateCompareDto): Promise<Compare> {
        const compare = await this.getCompare(id);

        compare.imageId = UpdateDto.imageId || compare.imageId;
        compare.secondImageId = UpdateDto.secondImageId || compare.secondImageId;
        compare.similarity = UpdateDto.similarity || compare.similarity;
        compare.correct = UpdateDto.correct || compare.correct;
        compare.versionAlgorithmId = UpdateDto.versionAlgorithmId || compare.versionAlgorithmId;


        try {
            return await compare.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number): Promise<Compare> {
        const compare = await this.getCompare(id);
        await compare.destroy();
        return compare;
    }

    async offset(index: number = 0): Promise<CompareOffset> {
        const compares = await this.comparesRepository.findAndCountAll({
            include: [],
            limit: 100,
            offset: index * 100,
            order: ["id"],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });

        const CompareDto = compares.rows.map(privilege => {
            return new CompareDto(privilege);
        });

        return { rows: CompareDto, count: CompareDto.count };
    }
}
