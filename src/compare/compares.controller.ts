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
import { CompareDto } from "./dto/compare.dto";
import { CreateCompareDto } from "./dto/create-compare.dto";
import { UpdateCompareDto } from "./dto/update-compare.dto";
import { CompareOffset } from "./dto/compare.offset";
import { Compare } from "./compare.entity";
import { CompareService } from "./compares.service";

@Controller("compares")
@ApiUseTags("compares")
export class CompareController {
    constructor(private readonly comparesService: CompareService) { }

    @Get()
    @ApiOkResponse({ type: [CompareDto] })
    findAll(): Promise<CompareDto[]> {
        return this.comparesService.findAll();
    }

    @Get(":id")
    @ApiOkResponse({ type: CompareDto })
    @ApiImplicitParam({ name: "id", required: true })
    findOne(@Param("id", new ParseIntPipe()) id: number): Promise<CompareDto> {
        return this.comparesService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ type: Compare })
    create(@Body() createDto: CreateCompareDto): Promise<Compare> {
        return this.comparesService.create(createDto);
    }

    @Put(":id")
    @ApiOkResponse({ type: Compare })
    @ApiImplicitParam({ name: "id", required: true })
    update(
        @Param("id", new ParseIntPipe()) id: number,
        @Body() UpdateDto: UpdateCompareDto
    ): Promise<Compare> {
        return this.comparesService.update(id, UpdateDto);
    }

    @Delete(":id")
    @ApiOkResponse({ type: Compare })
    @ApiImplicitParam({ name: "id", required: true })
    delete(@Param("id", new ParseIntPipe()) id: number): Promise<Compare> {
        return this.comparesService.delete(id);
    }

    @Get("offset/:id")
    @ApiOkResponse({ type: CompareOffset })
    offset(
        @Param("id", new ParseIntPipe()) index: number = 0
    ): Promise<CompareOffset> {
        return this.comparesService.offset(index);
    }
}
