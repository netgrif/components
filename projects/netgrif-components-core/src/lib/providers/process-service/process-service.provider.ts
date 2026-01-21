import { ProcessService } from '../../process/process.service';
import { PetriNetResourceService } from '../../resources/engine-endpoint/petri-net-resource.service';
import { LoggerService } from '../../logger/services/logger.service';

export const ProcessServiceProvider = {
    provide: ProcessService,
    useFactory: (petriNetResource: PetriNetResourceService,
                 loggerService: LoggerService) => {
        return new ProcessService(petriNetResource, loggerService);
    },
    deps: [
        PetriNetResourceService,
        LoggerService
    ]
}
