import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsDateString } from "class-validator";

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
    @IsDateString()
    readonly date_created: Date;

}
