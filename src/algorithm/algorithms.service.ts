import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Algorithm } from "../algorithm/algorithm.entity";
import { CreateAlgorithmDto } from "../algorithm/dto/create-algorithm.dto";

@Injectable()
export class AlgorithmService {
    constructor(
        @Inject("AlgorithmsRepository")
        private readonly algorithmsRepository: typeof Algorithm
    ) { }

    async findAll(): Promise<Algorithm[]> {
        const algorithms = await this.algorithmsRepository.findAll<Algorithm>({
            include: [],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });
        return algorithms;
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
}
