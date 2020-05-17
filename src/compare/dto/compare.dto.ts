import { ApiModelProperty } from "@nestjs/swagger";
import { Compare } from "../compare.entity";

export class CompareDto {
    
@ApiModelProperty()
readonly imageId: number;

@ApiModelProperty()
readonly secondImageId: number;

@ApiModelProperty()
readonly similarity: number;

@ApiModelProperty()
readonly correct: boolean;

@ApiModelProperty()
readonly versionAlgorithmId: number;
 

    constructor(compare: Compare) {
        this.imageId = compare.imageId;
this.secondImageId = compare.secondImageId;
this.similarity = compare.similarity;
this.correct = compare.correct;
this.versionAlgorithmId = compare.versionAlgorithmId;

    }
}
