import { ApiModelProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class UpdateSimilarityDto {

    @ApiModelProperty()
    @IsNumber()
    @IsOptional()
    readonly imageId?: number;

    @ApiModelProperty()
    @IsNumber()
    @IsOptional()
    readonly secondImageId?: number;

}
