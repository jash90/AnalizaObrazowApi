import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Algorithm } from "../algorithm/algorithm.entity";
import { AlgorithmDto } from "../algorithm/dto/algorithm.dto";
import { CreateAlgorithmDto } from "../algorithm/dto/create-algorithm.dto";
import { UpdateAlgorithmDto } from "../algorithm/dto/update-algorithm.dto";
import { AlgorithmOffset } from "../algorithm/dto/algorithm.offset";

@Injectable()
export class AlgorithmService {
    constructor(
        @Inject("AlgorithmsRepository")
        private readonly algorithmsRepository: typeof Algorithm
    ) { }

    async findAll(): Promise<AlgorithmDto[]> {
        const algorithms = await this.algorithmsRepository.findAll<Algorithm>({
            include: [],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });
        return algorithms.map(algorithm => {
            return new AlgorithmDto(algorithm);
        });
    }

    async findOne(id: number): Promise<AlgorithmDto> {
        const algorithm = await this.algorithmsRepository.findByPk<Algorithm>(id, {
            include: [],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });
        if (!algorithm) {
            throw new HttpException("No algorithm found", HttpStatus.NOT_FOUND);
        }

        return new AlgorithmDto(algorithm);
    }

    async create(CreateDto: CreateAlgorithmDto): Promise<Algorithm> {
        const algorithm = new Algorithm();

        algorithm.name = CreateDto.name;
        algorithm.parameters = CreateDto.parameters;

        const algorithmDatabase = await this.algorithmsRepository.findOne<Algorithm>({
            where: { name: algorithm.name, parameters: algorithm.parameters },
            include: [],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });

        if (algorithmDatabase) {
            throw new HttpException("This algorytm exists!", HttpStatus.CONFLICT);
        }


        try {
            return await algorithm.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async getAlgorithm(id: number): Promise<Algorithm> {
        const algorithm = await this.algorithmsRepository.findByPk<Algorithm>(id, {
            include: [],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });
        if (!algorithm) {
            throw new HttpException("No algorithm found", HttpStatus.NOT_FOUND);
        }

        return algorithm;
    }

    async update(id: number, UpdateDto: UpdateAlgorithmDto): Promise<Algorithm> {
        const algorithm = await this.getAlgorithm(id);

        algorithm.name = UpdateDto.name || algorithm.name;
        algorithm.parameters = UpdateDto.parameters || algorithm.parameters;


        try {
            return await algorithm.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number): Promise<Algorithm> {
        const algorithm = await this.getAlgorithm(id);
        await algorithm.destroy();
        return algorithm;
    }

    async offset(index: number = 0): Promise<AlgorithmOffset> {
        const algorithms = await this.algorithmsRepository.findAndCountAll({
            include: [],
            limit: 100,
            offset: index * 100,
            order: ["id"],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });

        const AlgorithmDto = algorithms.rows.map(privilege => {
            return new AlgorithmDto(privilege);
        });

        return { rows: AlgorithmDto, count: AlgorithmDto.count };
    }
}
