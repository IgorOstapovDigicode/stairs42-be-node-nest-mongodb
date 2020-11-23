import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { throwError } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/data')
  async getData() {
    return await this.appService.getDataset()
      .then(
        data => {
          console.log(data)
        }
      )
      .catch(
        error => throwError(error)
      )
  }
}
