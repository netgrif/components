import { ProcessService } from '../../process/process.service';

export const ProcessServiceProvider = {
    provide: ProcessService,
    useClass: ProcessService
}
