import { ApiModelProperty } from "@nestjs/swagger";
import { IsNumber,IsBoolean } from "class-validator";

export class CreateCompareDto {

@ApiModelProperty()
@IsNumber()
readonly imageId: number;

@ApiModelProperty()
@IsNumber()
readonly secondImageId: number;

@ApiModelProperty()
@IsNumber()
readonly similarity: number;

@ApiModelProperty()
@IsBoolean()
readonly correct: boolean;

@ApiModelProperty()
@IsNumber()
readonly versionAlgorithmId: number;

}
