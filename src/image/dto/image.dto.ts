import { ApiModelProperty } from "@nestjs/swagger";
import { Image } from "../image.entity";

export class ImageDto {

    @ApiModelProperty()
    readonly filename: string;

    @ApiModelProperty()
    readonly path: string;

    @ApiModelProperty()
    readonly width: number;

    @ApiModelProperty()
    readonly height: number;

    @ApiModelProperty()
    readonly location: string;

    @ApiModelProperty()
    readonly date_created: Date;


    constructor(image: Image) {
        this.filename = image.filename;
        this.path = image.path;
        this.width = image.width;
        this.height = image.height;
        this.location = image.location;
        this.date_created = image.date_created;

    }
}
