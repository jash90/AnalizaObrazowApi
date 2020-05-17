import { ApiModelProperty } from "@nestjs/swagger";
import { IsNumber,IsBoolean,IsOptional } from "class-validator";

export class UpdateCompareDto {

@ApiModelProperty()
@IsNumber()
@IsOptional()
readonly imageId?: number;

@ApiModelProperty()
@IsNumber()
@IsOptional()
readonly secondImageId?: number;

@ApiModelProperty()
@IsNumber()
@IsOptional()
readonly similarity?: number;

@ApiModelProperty()
@IsBoolean()
@IsOptional()
readonly correct?: boolean;

@ApiModelProperty()
@IsNumber()
@IsOptional()
readonly versionAlgorithmId?: number;

}
