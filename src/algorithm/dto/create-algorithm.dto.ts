import { ApiModelProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateAlgorithmDto {

    @ApiModelProperty()
    @IsString()
    readonly name: string;

    @ApiModelProperty()
    @IsString()
    readonly parameters: string;

}
