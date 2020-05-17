import { ApiModelProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateSimilarityDto {

@ApiModelProperty()
@IsNumber()
readonly imageId: number;

@ApiModelProperty()
@IsNumber()
readonly secondImageId: number;

}
