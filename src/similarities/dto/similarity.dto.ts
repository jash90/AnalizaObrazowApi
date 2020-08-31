import { ApiModelProperty } from "@nestjs/swagger";
import { Similarity } from "../similarity.entity";

export class SimilarityDto {

    @ApiModelProperty()
    readonly imageId: number;

    @ApiModelProperty()
    readonly secondImageId: number;


    constructor(similarity: Similarity) {
        this.imageId = similarity.imageId;
        this.secondImageId = similarity.secondImageId;

    }
}
