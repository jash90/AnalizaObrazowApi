import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsDate, IsOptional } from "class-validator";

export class UpdateImageDto {

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    readonly filename?: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    readonly path?: string;

    @ApiModelProperty()
    @IsNumber()
    @IsOptional()
    readonly width?: number;

    @ApiModelProperty()
    @IsNumber()
    @IsOptional()
    readonly height?: number;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    readonly location?: string;

    @ApiModelProperty()
    @IsDate()
    @IsOptional()
    readonly data_create?: Date;

}
