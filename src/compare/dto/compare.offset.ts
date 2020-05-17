import { ApiModelProperty } from "@nestjs/swagger";
import { CompareDto } from "./compare.dto";

export class CompareOffset {
    @ApiModelProperty()
    readonly rows: CompareDto[];
    @ApiModelProperty()
    readonly count: number;

    constructor(compareOffset: CompareOffset) {
        this.rows = compareOffset.rows;
        this.count = compareOffset.count;
    }
}
