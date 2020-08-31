import { ApiModelProperty } from "@nestjs/swagger";
import { SimilarityDto } from "./similarity.dto";

export class SimilarityOffset {
    @ApiModelProperty()
    readonly rows: SimilarityDto[];
    @ApiModelProperty()
    readonly count: number;

    constructor(similarityOffset: SimilarityOffset) {
        this.rows = similarityOffset.rows;
        this.count = similarityOffset.count;
    }
}
