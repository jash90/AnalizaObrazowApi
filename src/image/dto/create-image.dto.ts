import { ApiModelProperty } from "@nestjs/swagger";
import { IsString,IsNumber,IsDate } from "class-validator";

export class CreateImageDto {

@ApiModelProperty()
@IsString()
readonly filename: string;

@ApiModelProperty()
@IsString()
readonly path: string;

@ApiModelProperty()
@IsNumber()
readonly width: number;

@ApiModelProperty()
@IsNumber()
readonly height: number;

@ApiModelProperty()
@IsString()
readonly location: string;

@ApiModelProperty()
@IsDate()
readonly data_create: Date;

}
