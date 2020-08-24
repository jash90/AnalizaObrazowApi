import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiImplicitParam,
    ApiOkResponse,
    ApiUseTags
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { AlgorithmDto } from "./dto/algorithm.dto";
import { CreateAlgorithmDto } from "./dto/create-algorithm.dto";
import { UpdateAlgorithmDto } from "./dto/update-algorithm.dto";
import { AlgorithmOffset } from "./dto/algorithm.offset";
import { Algorithm } from "./algorithm.entity";
import { AlgorithmService } from "./algorithms.service";

@Controller("algorithms")
@ApiUseTags("algorithms")
export class AlgorithmController {
    constructor(private readonly algorithmsService: AlgorithmService) { }

    @Get()
    @ApiOkResponse({ type: [AlgorithmDto] })
    findAll(): Promise<AlgorithmDto[]> {
        return this.algorithmsService.findAll();
    }

    @Get(":id")
    @ApiOkResponse({ type: AlgorithmDto })
    @ApiImplicitParam({ name: "id", required: true })
    findOne(@Param("id", new ParseIntPipe()) id: number): Promise<AlgorithmDto> {
        return this.algorithmsService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ type: Algorithm })
    create(@Body() createDto: CreateAlgorithmDto): Promise<Algorithm> {
        return this.algorithmsService.create(createDto);
    }

    @Put(":id")
    @ApiOkResponse({ type: Algorithm })
    @ApiImplicitParam({ name: "id", required: true })
    update(
        @Param("id", new ParseIntPipe()) id: number,
        @Body() UpdateDto: UpdateAlgorithmDto
    ): Promise<Algorithm> {
        return this.algorithmsService.update(id, UpdateDto);
    }

    @Delete(":id")
    @ApiOkResponse({ type: Algorithm })
    @ApiImplicitParam({ name: "id", required: true })
    delete(@Param("id", new ParseIntPipe()) id: number): Promise<Algorithm> {
        return this.algorithmsService.delete(id);
    }

    @Get("offset/:id")
    @ApiOkResponse({ type: AlgorithmOffset })
    offset(
        @Param("id", new ParseIntPipe()) index: number = 0
    ): Promise<AlgorithmOffset> {
        return this.algorithmsService.offset(index);
    }
}
