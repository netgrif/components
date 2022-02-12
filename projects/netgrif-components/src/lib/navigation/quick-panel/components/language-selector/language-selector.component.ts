import {Component} from '@angular/core';
import {AbstractLanguageSelectorComponent, LanguageService} from '@netgrif/components-core';

@Component({
    selector: 'nc-language-selector',
    templateUrl: './language-selector.component.html',
    styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent extends AbstractLanguageSelectorComponent {
    constructor(protected _select: LanguageService) {
        super(_select);
    }

    skFlag = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABAElEQVRYhWP4//8/w0DiAbV81AGjDkB2wECB' +
        'UQeMOgC/A34fO4ET08UBb2VU4BgE3mkZwfn/Pn6kngO4/Rb9R8dNNSvAFn2tb4H7GESD+CDxxrxZGHpIxXgdALIA5oBPodFgB4BoujsA5Os/V66' +
        'BHQCiQXy6OKC5aytGGkDmg6KIpg6wzN/y/6GN+/8a0+T/8dZF/7n8FoJpEP+BrtV/j6qdtHUACJf27gVbjI5B4pRajuKAdzKq/7HhDxYO/0vQHJ' +
        'HatO3/R3c/rOpJxQQdAMLvtYz/r22c+98dGOTr+leD+dSwnGgHIIcGtSwmywG0wKMOGDwOGEg86oBRBwy4AwD9AXxVUM8swgAAAABJRU5ErkJgg' +
        'g==';

    deFlag = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAPElEQVRYw+3WIREAMADDwPjXNk8ZnIQOBIQ/' +
        '6hWVZQQI8AUAcFGAAAHeDoCTAgT4B3BwUoAAAXrFAQIoF+hFdQp+ds+vAAAAAElFTkSuQmCC';

    gbFlag = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAByElEQVRYw+2WvUvDUBTFA04u7VTo0sGpf4Ao' +
        '1L2L4FApdHN01slBcFIEJ0EcFDqqFaGubkJdtIhVKWhBobjZwc5+NMeeSNI0vOTdpmId8uBt7+N3Ts69LwYAY5TTiAAigH8B8Fwo4LPVwvtHB6u' +
        '7VYxN7cOY3AucpgnU4nFcW0cAqdkD7Z7FjQpeNrdwn0rhrVSCA9BcWsZtIoF2uWwddlV/RXr++NcAJuYOcX5SwUMmg6dczhL71TF7ALysenSGej' +
        'oNqRtSAIVqPDbbmF447QFwIS9a276A1A0dgJ/q9eINxmeK1po+AHv2uZHP+7oRBBCk2n2XEkDqhgpAoloEIHHDC7CycylSPRCA1427ZNJxg8MN0' +
        'MhmRaqVAAg53AAhxw9ALRazDvrr6QCM4nKKHvoTWAd1P0OYYZqQhZBBYqAYLAaMQWPgVAAMKIPKwDK4ujdFC8ASYilxsLRYYiw1lpwXgKXJEiUk' +
        'S5alyxIOelN8AVSq2VzYZNhs2HS8AHbfYLOy3WATC3JDCeCnmu3VXuMHYPcNqRt9ADrV7o1BAO4uqnPDAZCoHhRA6Ub3qXe74QBIVIcB0LnhAEh' +
        'UDwPg50b0VxwBRACc37+H2GuakEPwAAAAAElFTkSuQmCC';

    getFlag(flagCode: string) {
        return flagCode === 'sk' ? this.skFlag : (flagCode === 'gb' ? this.gbFlag : this.deFlag);
    }
}
