import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Image } from "../image/image.entity";
import { ImageDto } from "../image/dto/image.dto";
import { CreateImageDto } from "../image/dto/create-image.dto";
import { UpdateImageDto } from "../image/dto/update-image.dto";
import { ImageOffset } from "../image/dto/image.offset";

@Injectable()
export class ImageService {
    constructor(
        @Inject("ImagesRepository")
        private readonly imagesRepository: typeof Image
    ) { }

    async findAll(): Promise<ImageDto[]> {
        const images = await this.imagesRepository.findAll<Image>({
            include: [],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });
        return images
    }

    async findOne(id: number): Promise<ImageDto> {
        const image = await this.imagesRepository.findByPk<Image>(id, {
            include: [],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });
        if (!image) {
            throw new HttpException("No image found", HttpStatus.NOT_FOUND);
        }

        return new ImageDto(image);
    }

    async findByFilename(filename: string): Promise<ImageDto> {
        const image = await this.imagesRepository.findOne<Image>({
            where: {filename},
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

    private async getImage(id: number): Promise<Image> {
        const image = await this.imagesRepository.findByPk<Image>(id, {
            include: [],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });
        if (!image) {
            throw new HttpException("No image found", HttpStatus.NOT_FOUND);
        }

        return image;
    }

    async update(id: number, UpdateDto: UpdateImageDto): Promise<Image> {
        const image = await this.getImage(id);

        image.filename = UpdateDto.filename || image.filename;
        image.path = UpdateDto.path || image.path;
        image.width = UpdateDto.width || image.width;
        image.height = UpdateDto.height || image.height;
        image.location = UpdateDto.location || image.location;
        image.date_created = UpdateDto.date_created || new Date(image.date_created);


        try {
            return await image.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number): Promise<Image> {
        const image = await this.getImage(id);
        await image.destroy();
        return image;
    }

    async offset(index: number = 0): Promise<ImageOffset> {
        const images = await this.imagesRepository.findAndCountAll({
            include: [],
            limit: 100,
            offset: index * 100,
            order: ["id"],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        });

        const ImageDto = images.rows.map(privilege => {
            return new ImageDto(privilege);
        });

        return { rows: ImageDto, count: ImageDto.count };
    }
}
