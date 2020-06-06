import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class UpdateAlgorithmDto {

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    readonly name?: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    readonly parameters?: string;

}
