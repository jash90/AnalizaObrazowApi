import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Image } from "../image/image.entity";
import { CreateImageDto } from "../image/dto/create-image.dto";

@Injectable()
export class ImageService {
    constructor(
        @Inject("ImagesRepository")
        private readonly imagesRepository: typeof Image
    ) { }

    async findAll(): Promise<Image[]> {
        const images = await this.imagesRepository.findAll<Image>({
            include: [],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });
        return images
    }

    async findByFilename(filename: string): Promise<Image> {
        const image = await this.imagesRepository.findOne<Image>({
            where: { filename },
            include: [],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });
        if (!image) {
            throw new HttpException("No image found", HttpStatus.NOT_FOUND);
        }

        return image;
    }

    async create(CreateDto: CreateImageDto): Promise<Image> {
        const image = new Image();

        image.filename = CreateDto.filename;
        image.path = CreateDto.path;
        image.width = CreateDto.width;
        image.height = CreateDto.height;
        image.location = CreateDto.location;
        image.date_created = new Date(CreateDto.date_created);


        try {
            return await image.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
