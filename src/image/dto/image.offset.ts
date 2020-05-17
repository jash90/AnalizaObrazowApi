import { ApiModelProperty } from "@nestjs/swagger";
import { ImageDto } from "./image.dto";

export class ImageOffset {
    @ApiModelProperty()
    readonly rows: ImageDto[];
    @ApiModelProperty()
    readonly count: number;

    constructor(imageOffset: ImageOffset) {
        this.rows = imageOffset.rows;
        this.count = imageOffset.count;
    }
}
