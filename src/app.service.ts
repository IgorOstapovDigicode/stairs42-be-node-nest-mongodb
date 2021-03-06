import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {

  constructor(
    private httpService: HttpService
  ) {}

  async getDataset() {
    return this.httpService.get('https://api.jsonbin.io/b/5ebb0cf58284f36af7ba1779/1')
      .pipe(
        map(res => res.data)
      )
      .toPromise()
  }
}
