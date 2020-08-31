import {
    Body,
    Controller,
    Get,
    Post,
} from "@nestjs/common";
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiUseTags
} from "@nestjs/swagger";
import { CreateCompareDto } from "./dto/create-compare.dto";
import { Compare } from "./compare.entity";
import { CompareService } from "./compares.service";

@Controller("compares")
@ApiUseTags("compares")
export class CompareController {
    constructor(private readonly comparesService: CompareService) { }

    @Get()
    @ApiOkResponse({ type: [Compare] })
    findAll(): Promise<Compare[]> {
        return this.comparesService.findAll();
    }

    @Post()
    @ApiCreatedResponse({ type: Compare })
    create(@Body() createDto: CreateCompareDto): Promise<Compare> {
        return this.comparesService.create(createDto);
    }

}
