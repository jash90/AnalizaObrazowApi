import { ApiModelProperty } from "@nestjs/swagger";
import { Algorithm } from "../algorithm.entity";

export class AlgorithmDto {
    
@ApiModelProperty()
readonly name: string;

@ApiModelProperty()
readonly parameters: string;
 

    constructor(algorithm: Algorithm) {
        this.name = algorithm.name;
this.parameters = algorithm.parameters;

    }
}
