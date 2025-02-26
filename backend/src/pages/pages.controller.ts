import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PageConfig } from "../page-config.model";

@Controller("pages")
export class PagesController {
  private readonly logger = new Logger(PagesController.name); // Logger for debugging

  constructor(
    @InjectRepository(PageConfig)
    private readonly pageConfigRepository: Repository<PageConfig>
  ) {}

  @Get(":pageId")
  async getPageConfig(@Param("pageId") pageId: string): Promise<PageConfig> {
    this.logger.log(`Fetching page config for pageId: ${pageId}`);

    const pageConfig = await this.pageConfigRepository.findOne({
      where: { pageId },
    });

    if (!pageConfig) {
      this.logger.warn(`Page not found: ${pageId}`);
      throw new NotFoundException("Page not found");
    }

    return pageConfig;
  }

  // Fetch all pages - Uncomment if needed
  // @Get()
  // async getAllPages(): Promise<PageConfig[]> {
  //   return this.pageConfigRepository.find();
  // }
}
