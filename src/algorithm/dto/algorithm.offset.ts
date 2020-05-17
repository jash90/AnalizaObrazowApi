import { ApiModelProperty } from "@nestjs/swagger";
import { AlgorithmDto } from "./algorithm.dto";

export class AlgorithmOffset {
    @ApiModelProperty()
    readonly rows: AlgorithmDto[];
    @ApiModelProperty()
    readonly count: number;

    constructor(algorithmOffset: AlgorithmOffset) {
        this.rows = algorithmOffset.rows;
        this.count = algorithmOffset.count;
    }
}
